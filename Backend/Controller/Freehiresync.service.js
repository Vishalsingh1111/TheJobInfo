import Job from "../Modal/Job.modal.js";
import sanitizeHtml from "sanitize-html";
import { generateJobContent } from "./Geminijob.service.js";
import { isPopularCompany } from "./Popularcompanies.js";
import { getTelegramSkipReason, postJobToTelegram, shouldPostToTelegram } from "./Telegram.service.js";
import {
    createDedupeKey,
    createCandidateSearchPlans,
    deriveJobLevel,
    deriveWorkMode,
    normalizeCity,
    normalizeJobKeyPart,
    selectPreferredJobLevel,
    areDuplicateJobListings,
    validateImportedJob,
} from "../Utils/jobMetadata.js";

const BASE_URL = process.env.OPENAPI_BASE_URL || "https://freehire.me/api/v1/jobs/search";
const configuredMixWindow = Number.parseInt(process.env.MIX_WINDOW || "50", 10);
const mixWindowSetting = Number.isInteger(configuredMixWindow) && configuredMixWindow > 0
    ? configuredMixWindow
    : 50;

// ── Config (override with env vars, no code change needed) ───────────────────
const CONFIG = {
    jobsPerRun: 1,
    publishMode: process.env.PUBLISH_MODE || "popular_only",
    pageSize: 20,                                                      // jobs checked per API call
    maxPagesPerSearch: 3,                                              // pages checked per search (a run may do up to 4 searches, see "plans" below)
    countries: process.env.FREEHIRE_COUNTRIES ?? "IN",                 // "" = worldwide, or "IN,US"
    workMode: process.env.FREEHIRE_WORK_MODE || "",                    // "", "remote", "hybrid", "onsite"

    // Only look at recent postings. Keep these SHORTER than expireAfterDays so a job that was deleted
    // after its retention period is older than this window and never gets re-imported.
    postedWithinDays: Number(process.env.FREEHIRE_POSTED_WITHIN_DAYS || 2),
    popularPostedWithinDays: Number(process.env.FREEHIRE_POPULAR_POSTED_WITHIN_DAYS || 2),  // the API works in whole days, so 2 days = the 48-hour window
    maxAgeHours: Number(process.env.FREEHIRE_MAX_AGE_HOURS || 48),     // exact cut-off on top of the days filter: older postings are ignored
    expireAfterDays: Number(process.env.FREEHIRE_EXPIRE_DAYS || 30),   // each job stays this long after it was imported

    // "Popular companies" = the list in popularCompanies.js (TCS, Infosys, Google, Microsoft ...).
    popularFirst: process.env.FREEHIRE_POPULAR_FIRST !== "false",   // set FREEHIRE_POPULAR_FIRST=false to turn popular-first off
    popularPageSize: 100,                                           // the popular search reads big pages (freehire max is 100), because only some jobs are on the list
    popularMaxPages: 3,                                             // 3 x 100 = up to 300 recent jobs checked per popular search

    // Keep imported fresher and internship jobs near 80% of the rolling mix.
    fresherShare: 0.8,
    mixWindow: Number.isFinite(mixWindowSetting) ? Math.max(1, mixWindowSetting) : 50,

    delayMs: 1000,
    userAgent: process.env.FREEHIRE_USER_AGENT || "MyJobPortal/1.0",
};

// jobType values that count as fresher-friendly for imported-job summaries

// ── Categories: freehire tech categories grouped into YOUR category labels ───
// ⚠️ EDIT the group names / membership to match your category filter values.
// Only categories listed here are fetched, which is what keeps the import tech-only.
const CATEGORY_GROUPS = {
    "Software Engineering": [
        "software_engineering", "backend", "frontend", "fullstack", "mobile",
        "embedded", "blockchain", "architecture", "data_engineering", "ml_ai", "ai_engineering",
    ],
    "IT": ["devops", "sre", "network_engineering", "security", "qa"],
    "Analyst": ["data_analytics", "data_science"],
};
const CATEGORY_LABEL = {};
for (const [label, cats] of Object.entries(CATEGORY_GROUPS)) cats.forEach((c) => (CATEGORY_LABEL[c] = label));
const TECH_CATEGORIES = Object.keys(CATEGORY_LABEL);

// ── Job Type = your dropdown: "Freshers/ Experienced" | "Freshers" | "Experienced" | "Internship" | "Part-Time" ──
// Fallback used only if generated content contains a value outside the list.
const SENIOR_LEVELS = new Set(["middle", "senior", "lead", "staff", "principal", "c_level"]);
export function resolveJobType(e = {}) {
    if (e.employment_type === "internship" || e.employment_type === "fellowship" || e.seniority === "intern") return "Internship";
    if (e.employment_type === "part_time") return "Part-Time";
    const min = e.experience_years_min;
    const max = e.experience_years_max;
    if (min === 0) return max != null && max >= 2 ? "Freshers/ Experienced" : "Freshers";
    if (min === 1) return "Freshers/ Experienced";
    if (min >= 2) return "Experienced";
    if (e.seniority === "junior") return "Freshers/ Experienced";
    if (SENIOR_LEVELS.has(e.seniority)) return "Experienced";
    return "Freshers/ Experienced";
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
let running = false;
let aiPausedUntil = 0;
let freehirePausedUntil = 0;

function getRetryAfterMs(value) {
    const seconds = Number(value);
    if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;
    const retryAt = Date.parse(value || "");
    return Number.isFinite(retryAt) ? Math.max(0, retryAt - Date.now()) : null;
}

// ── Retry transient errors, but do not hold a scheduled run for a long 429 ──
async function fetchPage(qs, attempt = 1) {
    if (Date.now() < freehirePausedUntil) {
        throw new Error(`Freehire API is rate-limited until ${new Date(freehirePausedUntil).toISOString()}`);
    }
    const res = await fetch(`${BASE_URL}?${qs}`, {
        headers: { Accept: "application/json", "User-Agent": CONFIG.userAgent },
    });
    if (res.status === 429) {
        const retryAfter = getRetryAfterMs(res.headers.get("retry-after")) ?? 60_000;
        freehirePausedUntil = Date.now() + retryAfter;
        throw new Error(`Freehire API rate-limited; pausing until ${new Date(freehirePausedUntil).toISOString()}`);
    }
    if (res.status >= 500 && attempt < 3) {
        await sleep(1000 * (2 ** (attempt - 1)));
        return fetchPage(qs, attempt + 1);
    }
    if (!res.ok) throw new Error(`freehire responded ${res.status}`);
    return res.json();
}

// ── Apply link: remove the utm_source=freehire(.me) tag, keep everything else ─
export function cleanApplyLink(url) {
    if (!url) return "";
    return String(url).replace(
        /([?&])utm_source=freehire(?:\.me)?(&|#|$)/gi,
        (m, lead, tail) => (tail === "&" ? lead : tail)
    );
}

// ── Salary: INR yearly/monthly -> "10-12 LPA"; other currencies keep the full amount ──
const fmtNum = (n) => Number(n).toLocaleString("en-US");
const LAKH = 100000;
const trimNum = (n) => String(Number(n.toFixed(2))); // 10 -> "10", 3.6 -> "3.6"
const ANNUAL_FACTOR = { year: 1, month: 12 };

export function formatSalary(e = {}) {
    const min = Number(e.salary_min) || 0;
    const max = Number(e.salary_max) || 0;
    if (!min && !max) return "Not disclosed";

    const currency = String(e.salary_currency || "").toUpperCase();
    const period = e.salary_period || "year";

    if (currency === "INR" && ANNUAL_FACTOR[period]) {
        const f = ANNUAL_FACTOR[period];
        const lo = min ? (min * f) / LAKH : 0;
        const hi = max ? (max * f) / LAKH : 0;
        if (lo && hi) return trimNum(lo) === trimNum(hi) ? `${trimNum(lo)} LPA` : `${trimNum(lo)}-${trimNum(hi)} LPA`;
        if (lo) return `${trimNum(lo)}+ LPA`;
        return `Up to ${trimNum(hi)} LPA`;
    }

    const range = min && max ? `${fmtNum(min)} - ${fmtNum(max)}` : fmtNum(min || max);
    const per = e.salary_period ? ` / ${e.salary_period}` : "";
    return `${currency} ${range}${per}`.trim();
}

// ── Experience in years: "Fresher", "1 year", "0-2 years", "3-5 years", "5+ years" ──
// Fallback used only if generated content does not match that shape.
const SENIORITY_YEARS = {
    intern: "Fresher", junior: "0-2 years", middle: "2-5 years", senior: "5+ years",
    lead: "8+ years", staff: "8+ years", principal: "10+ years", c_level: "10+ years",
};
export function formatExperience(e = {}) {
    const min = e.experience_years_min;
    const max = e.experience_years_max;
    const yrs = (n) => `${n} ${n === 1 ? "year" : "years"}`;
    if (min != null && max != null && max > min) return `${min}-${max} years`;
    if (min != null && max != null && max === min) return min === 0 ? "Fresher" : yrs(min);
    if (min != null) return min === 0 ? "Fresher" : min === 1 ? "1 year" : `${min}+ years`;
    if (max != null) return max === 0 ? "Fresher" : `0-${max} years`;
    return SENIORITY_YEARS[e.seniority] || "0-2 years";
}

// ── Location: "Bengaluru, India; Chennai, India; Pune, India" -> "Bengaluru, Chennai, Pune, India" ──
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const countryName = (code) => { try { return regionNames.of(code) || code; } catch { return code; } };

const REGION_ONLY = /^(?:asia[\s-]*pacific|apac|emea|europe|north america|latin america|latam|middle east(?: & north africa)?|mena|africa|cis|global|worldwide)$/i;
const stripRegions = (seg) => {
    const bits = seg.split(",").map((b) => b.trim()).filter(Boolean);
    while (bits.length && REGION_ONLY.test(bits[bits.length - 1])) bits.pop();
    return bits.join(", ");
};

export function formatLocation(j) {
    let segments = (j.location || "").split(/\s*[;|]\s*/).map(stripRegions).filter(Boolean);

    if (!segments.length) {
        const cities = j.cities || [];
        const countries = (j.countries || []).map(countryName);
        segments = cities.length
            ? cities.map((c) => (countries.length === 1 ? `${c}, ${countries[0]}` : c))
            : countries;
    }

    const byCountry = new Map(); // country -> { country, cities[] }
    const standalone = [];
    for (const seg of segments) {
        const bits = seg.split(",").map((b) => b.trim()).filter(Boolean);
        if (bits.length >= 2) {
            const country = bits[bits.length - 1];
            const city = bits[0]; // "City, State, Country" -> City
            const key = country.toLowerCase();
            if (!byCountry.has(key)) byCountry.set(key, { country, cities: [] });
            const group = byCountry.get(key);
            if (!group.cities.some((c) => c.toLowerCase() === city.toLowerCase())) group.cities.push(city);
        } else if (bits.length === 1) {
            standalone.push(bits[0]);
        }
    }

    const out = [...byCountry.values()].map((g) => `${g.cities.join(", ")}, ${g.country}`);
    for (const s of standalone) {
        const dup = byCountry.has(s.toLowerCase()) || out.some((o) => o.toLowerCase() === s.toLowerCase());
        if (!dup) out.push(s);
    }

    const loc = out.join("; ");
    if (!loc && j.work_mode === "remote") return "Remote";
    return loc;
}

// ── Skills: nicely cased, one per entry ──────────────────────────────────────
const SKILL_CASE = {
    javascript: "JavaScript", typescript: "TypeScript", nodejs: "Node.js", "node.js": "Node.js", node: "Node.js",
    react: "React", reactjs: "React", "react.js": "React", vue: "Vue.js", vuejs: "Vue.js", angular: "Angular",
    nextjs: "Next.js", "next.js": "Next.js", express: "Express.js", python: "Python", java: "Java",
    go: "Go", golang: "Go", rust: "Rust", ruby: "Ruby", php: "PHP", csharp: "C#", "c#": "C#", cpp: "C++", "c++": "C++",
    c: "C", kotlin: "Kotlin", swift: "Swift", scala: "Scala", dotnet: ".NET", ".net": ".NET",
    sql: "SQL", nosql: "NoSQL", mysql: "MySQL", postgresql: "PostgreSQL", postgres: "PostgreSQL", mongodb: "MongoDB",
    redis: "Redis", graphql: "GraphQL", rest: "REST API", restapi: "REST API", api: "API", apis: "APIs",
    html: "HTML", css: "CSS", aws: "AWS", gcp: "GCP", azure: "Azure", docker: "Docker", kubernetes: "Kubernetes",
    terraform: "Terraform", linux: "Linux", git: "Git", "ci/cd": "CI/CD", cicd: "CI/CD", devops: "DevOps",
    ios: "iOS", android: "Android", flutter: "Flutter", tensorflow: "TensorFlow", pytorch: "PyTorch",
    ml: "ML", ai: "AI", nlp: "NLP", llm: "LLM", etl: "ETL", sre: "SRE", qa: "QA", bigquery: "BigQuery",
    spark: "Spark", kafka: "Kafka", hadoop: "Hadoop", airflow: "Airflow", snowflake: "Snowflake",
    tableau: "Tableau", powerbi: "Power BI", excel: "Excel", jira: "Jira", selenium: "Selenium",
    springboot: "Spring Boot", spring: "Spring", django: "Django", flask: "Flask", fastapi: "FastAPI",
};
export function formatSkills(skills) {
    const seen = new Set();
    const out = [];
    for (const raw of skills || []) {
        const key = String(raw).trim().toLowerCase();
        if (!key) continue;
        const label = SKILL_CASE[key] ||
            key.split(/[-_\s]+/).filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        if (!seen.has(label.toLowerCase())) {
            seen.add(label.toLowerCase());
            out.push(label);
        }
    }
    return out;
}

// ── Description: third-party HTML -> clean PLAIN TEXT with \n (your frontend shows tags literally) ─
const H_OPEN = "\u0001";   // temporary markers around headings (removed before saving)
const H_CLOSE = "\u0002";

const SANITIZE = {
    allowedTags: ["p", "br", "strong", "em", "ul", "ol", "li"],
    allowedAttributes: {},
    transformTags: {
        b: "strong", h1: "strong", h2: "strong", h3: "strong", h4: "strong", h5: "strong", h6: "strong", i: "em",
    },
};

// A heading starts a block: at the very start, after a line break, after a list, or glued to the end of a sentence.
const HEAD_START = String.raw`(^|<br>|<\/ul>|<\/ol>|[.!?:;])`;
// <strong>Heading</strong> sitting on its own line
const HEADING_ALONE = new RegExp(
    HEAD_START + String.raw`\s*<strong>([^<]{1,100}?)<\/strong>\s*(?:(?:<br>\s*)+|(?=$|<ul>|<ol>))`, "gi");
// ...sentence.<strong>Heading</strong>Text glued straight onto the next sentence
const HEADING_GLUED = new RegExp(
    HEAD_START + String.raw`\s*<strong>([^<]{1,100}?)<\/strong>(?=[^\s<])`, "gi");
// <strong>Heading:</strong> followed by text on the same line
const HEADING_COLON = new RegExp(
    HEAD_START + String.raw`\s*<strong>([^<]{1,100}?:)<\/strong>\s*(?=[^<\s])`, "gi");

const decodeEntities = (s) => s
    .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'").replace(/&#(\d+);/g, (m, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&");

function descriptionToText(raw) {
    if (!raw) return "";
    let html = String(raw).replace(/\r\n?/g, "\n").trim();

    html = html.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>"); // markdown bold -> strong
    html = html.replace(/<\/(div|section)>/gi, "<br>");
    html = sanitizeHtml(html, SANITIZE);                                // strips scripts, styles, event handlers, links
    html = html.replace(/<br\s*\/?>/gi, "<br>");

    // paragraphs -> blank-line flow
    html = html.replace(/<\/p>\s*<p>/gi, "<br><br>").replace(/<\/?p>/gi, "");

    // plain text keeps its line breaks; real HTML ignores raw newlines
    html = /<(br|ul|ol|li)>/i.test(html) ? html.replace(/\s*\n\s*/g, " ") : html.replace(/\n/g, "<br>");

    // headings: blank line BEFORE, single line break AFTER
    const spacer = (before) => (/^<\/(ul|ol)>$/i.test(before) ? "<br>" : "<br><br>");
    const asHeading = (m, before, text) => `${before}${spacer(before)}${H_OPEN}${text.trim()}${H_CLOSE}<br>`;
    html = html.replace(HEADING_ALONE, asHeading).replace(HEADING_GLUED, asHeading).replace(HEADING_COLON, asHeading);

    // lists -> one "• item" per line
    html = html
        .replace(/<br>\s*(<ul>|<ol>)/gi, "$1")
        .replace(/<li>/gi, "<br>• ")
        .replace(/<\/li>/gi, "")
        .replace(/<(?:ul|ol)>/gi, "")
        .replace(/<\/(?:ul|ol)>/gi, "<br>");

    let text = html.replace(/<br>/gi, "\n").replace(/<[^>]+>/g, ""); // drop inline <strong>/<em> etc.
    text = decodeEntities(text);

    return text
        .split("\n")
        .map((l) => l.trim().replace(/^•\s+/, "• "))
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

// "About us", "About the company", "Company overview", "About <CompanyName>" ... but NOT "About the role/job/team"
const ABOUT_ROLE = /^about\s+(the\s+|this\s+|your\s+)?(role|job|position|opportunity|team|you|internship|vacancy|work|project)\b/i;
const ABOUT_COMPANY = /^(about\s+(us|our\s+company|the\s+company|company|the\s+organi[sz]ation|the\s+firm)|company\s+(overview|description|profile|background)|who\s+we\s+are|our\s+company|our\s+story)\b/i;

function isAboutCompanyHeading(heading, company) {
    const t = heading.replace(/[:\-–—\s]+$/, "").trim();
    if (ABOUT_ROLE.test(t)) return false;
    if (ABOUT_COMPANY.test(t)) return true;
    const names = [company, (company || "").split(/\s+/)[0]].filter((n) => n && n.length >= 3);
    return names.some((n) => new RegExp(`^about\\s+${escapeRegex(n)}\\b`, "i").test(t));
}

// Returns { description, aboutCompany }: the "About us / About <company>" section is moved into aboutCompany.
export function parseDescription(raw, company = "") {
    const text = descriptionToText(raw);
    if (!text) return { description: "", aboutCompany: "" };

    const sections = [];
    let cur = { heading: null, lines: [] };
    for (const line of text.split("\n")) {
        if (line.startsWith(H_OPEN) && line.endsWith(H_CLOSE)) {
            sections.push(cur);
            cur = { heading: line.slice(1, -1).trim(), lines: [] };
        } else {
            cur.lines.push(line);
        }
    }
    sections.push(cur);

    const body = (s) => s.lines.join("\n").trim();
    const about = sections.filter((s) => s.heading && isAboutCompanyHeading(s.heading, company));
    const aboutCompany = about.map(body).filter(Boolean).join("\n\n");

    const description = sections
        .filter((s) => !about.includes(s))
        .map((s) => [s.heading, body(s)].filter(Boolean).join("\n"))
        .filter(Boolean)
        .join("\n\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    return { description, aboutCompany };
}

// ── Same slug style as your controller: title-company-id ─────────────────────
const generateSlug = (title, company, id) =>
    `${title}-${company}-${id}`
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

// ── Next numeric id: highest id in your database + 1 (same as adding a job by hand) ──
async function nextJobId() {
    const last = await Job.findOne({ id: { $gt: 0 } }).sort({ id: -1 }).select("id").lean();
    return (last?.id || 0) + 1;
}

// ── Facts sent to the AI providers (job data only, no secrets) ────────────────
function buildFacts(j, location, salary) {
    const e = j.enrichment || {};
    const company = j.company || "Unknown";
    const { description, aboutCompany } = parseDescription(j.description, company);
    return {
        title: j.title,
        company,
        location,
        salary_text: salary === "Not disclosed" ? null : salary,
        applyLink: cleanApplyLink(j.url),
        work_mode: j.work_mode || null,
        level: deriveJobLevel({
            title: j.title,
            employment_type: e.employment_type || j.employment_type,
            seniority: e.seniority || j.seniority,
            experience_years_min: e.experience_years_min,
            experience_years_max: e.experience_years_max,
        }),
        employment_type: e.employment_type || null,
        seniority: e.seniority || null,
        experience_years_min: e.experience_years_min ?? null,
        experience_years_max: e.experience_years_max ?? null,
        education_level: e.education_level || null,
        english_level: e.english_level || null,
        visa_sponsorship: e.visa_sponsorship ?? null,
        relocation: e.relocation || null,
        domains: e.domains || [],
        company_type: e.company_type || null,
        company_size: e.company_size || null,
        skills: formatSkills(j.skills),
        summary: e.summary || null,
        posted_at: j.posted_at || null,
        description_text: [aboutCompany && `About the company:\n${aboutCompany}`, description].filter(Boolean).join("\n\n"),
    };
}

// Gemini generates the full listing; Groq is used only if Gemini generation fails.
async function enrich(j) {
    const e = j.enrichment || {};
    const facts = buildFacts(j, formatLocation(j), formatSalary(e));
    const fallbacks = {
        jobType: resolveJobType(e),
        experience: formatExperience(e),
        category: CATEGORY_LABEL[e.category] || "Software Engineering",
    };
    return generateJobContent(facts, fallbacks);
}

async function findDuplicate(doc) {
    const fields = "externalId dedupeKey company title city location applyLink";
    const exactMatches = await Job.find({
        $or: [
            { externalId: doc.externalId },
            { dedupeKey: doc.dedupeKey },
            { applyLink: doc.applyLink },
        ],
    }).select(fields).limit(30).lean();
    const exactDuplicate = exactMatches.find((job) => areDuplicateJobListings(job, doc));
    if (exactDuplicate) return exactDuplicate;

    const companyKey = normalizeJobKeyPart(doc.company);
    const candidates = await Job.find({
        postedAt: { $gte: new Date(Date.now() - 14 * 86400000) },
        $or: [
            { company: new RegExp(`^${escapeRegex(doc.company)}$`, "i") },
            { dedupeKey: new RegExp(`^${escapeRegex(companyKey)}:`) },
        ],
    }).select(fields).sort({ postedAt: -1 }).limit(100).lean();
    return candidates.find((job) => areDuplicateJobListings(job, doc)) || null;
}

// ── Final document in your Job model shape ───────────────────────────────────
// Exact data comes from the API (id, slug, location, salary, applyLink, externalId, postedAt);
// all generated content comes from the configured AI provider. Timestamps are added by mongoose.
export function mapJob(j, id, content) {
    const company = j.company || "Unknown";
    const location = formatLocation(j);
    const city = normalizeCity(location);
    const level = deriveJobLevel({
        title: j.title,
        employment_type: j.employment_type || j.enrichment?.employment_type,
        seniority: j.seniority || j.enrichment?.seniority,
        experience_years_min: j.enrichment?.experience_years_min,
        experience_years_max: j.enrichment?.experience_years_max,
    });
    const postedAt = j.posted_at ? new Date(j.posted_at) : new Date();
    const salary = formatSalary(j.enrichment);
    const jobType = level === "internship"
        ? "Internship"
        : level === "experienced"
            ? "Experienced"
            : level === "dual"
                ? "Freshers/Experienced"
                : "Freshers";
    const applyLink = cleanApplyLink(j.url);
    return {
        id,
        slug: generateSlug(content.title, company, id),
        title: content.title,
        company,
        location,
        salary: salary === "Not disclosed" ? "" : salary,
        salaryNote: content.salaryNote,
        jobType,
        experience: content.experience,
        category: content.category,
        website: content.website,
        applyLink,
        lastDate: content.lastDate,
        aboutCompany: content.aboutCompany,
        description: content.description,
        responsibilities: content.responsibilities,
        eligibility: content.eligibility,
        requiredSkills: content.requiredSkills,
        seoTitle: content.seoTitle,
        metaDescription: content.metaDescription,
        specialNote: content.specialNote,
        applyIf: content.applyIf,
        selectionProcess: content.selectionProcess,
        benefits: content.benefits,
        applySteps: content.applySteps,
        summary: content.summary,
        prepTips: content.prepTips,
        prepGuide: content.prepGuide,
        faqs: content.faqs,
        city,
        workMode: deriveWorkMode(j.work_mode || location),
        level,
        dedupeKey: createDedupeKey({ company, title: content.title, city }),
        expiresAt: new Date(postedAt.getTime() + CONFIG.expireAfterDays * 86400000),
        contentProvider: content.contentProvider,
        aiStatus: content.aiStatus,
        aiModelUsed: content.aiModelUsed,
        aiAttempts: content.aiAttempts,
        aiError: content.aiError,
        aiGeneratedAt: content.aiGeneratedAt,
        imageUrl: "",
        imagePublicId: "",

        source: "freehire",
        externalId: j.public_slug, // freehire id: identifies imported jobs and prevents duplicates
        postedAt,
    };
}

// Tech only (the category filter already narrows the query; this is a safety net).
// Must have an apply link and must not be closed.
const isFresh = (j) => {
    const t = Date.parse(j.posted_at);
    return !Number.isNaN(t) && Date.now() - t <= CONFIG.maxAgeHours * 3600000;
};
const isUsable = (j) =>
    j.public_slug && j.title && j.url && !j.closed_at && isFresh(j) && (!j.is_tech || j.is_tech === "tech");

const IMPORTED = { externalId: { $exists: true, $ne: null } };

// Delete imported jobs once they have been on your site for expireAfterDays.
// Your own manual jobs have no externalId, so they are never touched.
async function cleanup() {
    const cutoff = new Date(Date.now() - CONFIG.expireAfterDays * 86400000);
    const r = await Job.deleteMany({ ...IMPORTED, $or: [{ expiresAt: { $lte: new Date() } }, { expiresAt: { $exists: false }, createdAt: { $lt: cutoff } }] });
    return r.deletedCount || 0;
}

// ── Steer the mix using the levels on the latest imported jobs ───────────────
async function wantFresher() {
    const recent = await Job.find({ source: "freehire" })
        .sort({ createdAt: -1 })
        .limit(CONFIG.mixWindow)
        .select("level")
        .lean();
    return selectPreferredJobLevel(recent, CONFIG.fresherShare) === "fresher";
}

// ── Main sync ────────────────────────────────────────────────────────────────
const EXTRA_CANDIDATES = 4;                          // spare jobs to try if AI generation fails on some
const RETRY_FAILED_AFTER_MS = 6 * 60 * 60 * 1000;    // a job that failed generation is skipped for 6 hours
const failedAt = new Map();                          // public_slug -> time of last Gemini failure

// One search against freehire: up to `need` NEW usable jobs (not in your DB yet, not recently failed).
// popular = true: read bigger pages and keep only companies from popularCompanies.js.
const levelMatchesTarget = (job, targetLevel) => {
    const enrichment = job.enrichment || {};
    const detected = deriveJobLevel({
        title: job.title,
        jobType: resolveJobType(enrichment),
        employment_type: enrichment.employment_type || job.employment_type,
        seniority: enrichment.seniority || job.seniority,
        experience_years_min: enrichment.experience_years_min,
        experience_years_max: enrichment.experience_years_max,
    });
    return targetLevel === "fresher"
        ? detected === "fresher" || detected === "internship" || detected === "dual"
        : detected === "experienced" || detected === "dual";
};

async function findCandidates({ seniority, popular, targetLevel }, need, seen) {
    const items = [];
    let scanned = 0;
    const days = popular ? CONFIG.popularPostedWithinDays : CONFIG.postedWithinDays;
    const size = popular ? CONFIG.popularPageSize : CONFIG.pageSize;
    const maxPages = popular ? CONFIG.popularMaxPages : CONFIG.maxPagesPerSearch;

    for (let page = 0; page < maxPages && items.length < need; page++) {
        const params = new URLSearchParams({
            category: TECH_CATEGORIES.join(","),
            posted_within_days: String(days),
            sort: "posted_at",
            order: "desc",
            limit: String(size),
            offset: String(page * size),
        });
        if (seniority) params.set("seniority", seniority);
        if (CONFIG.countries) params.set("countries", CONFIG.countries);
        if (CONFIG.workMode) params.set("work_mode", CONFIG.workMode);

        const body = await fetchPage(params.toString());
        if (body.meta?.ignored_params?.length) {
            console.warn("[freehire] ignored params:", body.meta.ignored_params);
        }

        const all = body.data || [];
        scanned += all.length;
        const usable = all.filter((job) => isUsable(job) && levelMatchesTarget(job, targetLevel));
        const rows = popular ? usable.filter((j) => isPopularCompany(j.company, j.company_slug)) : usable;
        const have = new Set(
            (await Job.find({ externalId: { $in: rows.map((j) => j.public_slug) } }).select("externalId").lean())
                .map((d) => d.externalId)
        );
        const companyNames = [...new Set(rows.map((job) => String(job.company || "").trim()).filter(Boolean))];
        const companyConditions = [
            ...companyNames.map((company) => ({ company: new RegExp(`^${escapeRegex(company)}$`, "i") })),
            ...[...new Set(companyNames.map(normalizeJobKeyPart))]
                .map((company) => ({ dedupeKey: new RegExp(`^${escapeRegex(company)}:`) })),
        ];
        const recentCompanyJobs = companyConditions.length
            ? await Job.find({
                source: "freehire",
                postedAt: { $gte: new Date(Date.now() - 14 * 86400000) },
                $or: companyConditions,
            }).select("_id externalId dedupeKey company title city location applyLink").limit(500).lean()
            : [];

        for (const j of rows) {
            if (items.length >= need) break;
            if (seen.has(j.public_slug) || have.has(j.public_slug)) continue;
            const location = formatLocation(j);
            const city = normalizeCity(location);
            const candidate = {
                externalId: j.public_slug,
                company: j.company || "Unknown",
                title: j.title,
                location,
                city,
                applyLink: cleanApplyLink(j.url),
                dedupeKey: createDedupeKey({ company: j.company || "Unknown", title: j.title, city }),
            };
            const similarJob = recentCompanyJobs.find((job) => areDuplicateJobListings(job, candidate));
            if (similarJob) {
                console.log(`[freehire] duplicate candidate skipped "${j.public_slug}" (matches ${similarJob._id})`);
                continue;
            }
            const failed = failedAt.get(j.public_slug);
            if (failed && Date.now() - failed < RETRY_FAILED_AFTER_MS) continue;
            seen.add(j.public_slug);
            items.push(j);
        }

        const total = body.meta?.total ?? 0;
        if (all.length < size || (page + 1) * size >= total) break;
        await sleep(CONFIG.delayMs);
    }
    return { items, scanned };
}

export async function syncFreehireJobs() {
    const pausedUntil = Math.max(aiPausedUntil, freehirePausedUntil);
    if (Date.now() < pausedUntil) {
        console.log(`[freehire] sync paused until ${new Date(pausedUntil).toISOString()}`);
        return { paused: true, pausedUntil: new Date(pausedUntil) };
    }
    if (running) {
        console.log("[freehire] sync already running, skipping");
        return { skipped: true };
    }
    running = true;

    try {
        // Prefer whichever level is furthest below its configured share.
        const fresher = await wantFresher();
        const kind = fresher ? "fresher" : "experienced";
        const preferredLevel = kind;
        const otherKind = fresher ? "experienced" : "fresher";

        // Prefer popular companies, then widen to other companies before switching levels.
        const plans = createCandidateSearchPlans(preferredLevel, CONFIG.publishMode, CONFIG.popularFirst);

        console.log(`[freehire] looking for a ${kind} job (target fresher ratio ${Math.round(CONFIG.fresherShare * 100)}%)`);

        // Search group by group. The next group is searched only if the current one gave no usable job.
        // A job is saved only when generated content passes validation.
        const ready = [];        // { j, plan, content }
        const seen = new Set();
        let scanned = 0;
        let aiSkipped = 0;
        let pauseForAiFailure = false;
        const funnel = { fetched: 0, freshness: 0, popular: 0, duplicate: 0, quota: 0, aiSuccess: 0, published: 0, telegramSent: 0 };
        const rejections = new Map();
        for (const plan of plans) {
            if (pauseForAiFailure) break;
            if (ready.length >= CONFIG.jobsPerRun) break;
            const r = await findCandidates(plan, CONFIG.jobsPerRun - ready.length + EXTRA_CANDIDATES, seen);
            scanned += r.scanned;
            funnel.fetched += r.scanned;
            for (const j of r.items) {
                if (ready.length >= CONFIG.jobsPerRun) break;
                try {
                    if (plan.mixFallback) console.log(`[freehire] mix fallback: using ${plan.popular ? "popular" : "any-company"} ${plan.targetLevel} candidate`);
                    const content = await enrich(j);
                    if (content?.contentProvider === "basic") {
                        const requestedPause = Date.parse(content.aiRetryAfter);
                        aiPausedUntil = Number.isFinite(requestedPause) && requestedPause > Date.now()
                            ? requestedPause
                            : Date.now() + 60 * 60 * 1000;
                        pauseForAiFailure = true;
                        rejections.set(j.public_slug, content.aiError || "AI providers did not produce valid content");
                        throw new Error(content.aiError || "AI providers did not produce valid content");
                    }
                    ready.push({ j, plan: plan.label, content });
                    funnel.aiSuccess += 1;
                    failedAt.delete(j.public_slug);
                } catch (err) {
                    aiSkipped++;
                    rejections.set(j.public_slug, err.message || "AI generation failed");
                    failedAt.set(j.public_slug, Date.now());
                    console.error(`[freehire] skipped "${j.public_slug}": ${err.message}`);
                    if (pauseForAiFailure) {
                        console.warn(`[freehire] pausing further job generation until ${new Date(aiPausedUntil).toISOString()}`);
                        break;
                    }
                }
            }
        }
        if (rejections.size) {
            for (const [slug, reason] of rejections.entries()) {
                console.log(`[freehire-funnel] rejected ${slug}: ${reason}`);
            }
        }
        console.log(`[freehire-funnel] fetched=${funnel.fetched} freshness=${funnel.freshness} popular=${funnel.popular} duplicate=${funnel.duplicate} quota=${funnel.quota} aiSuccess=${funnel.aiSuccess} published=${funnel.published} telegramSent=${funnel.telegramSent}`);

        let inserted = 0;
        if (ready.length) {
            // oldest of the batch gets the lower id, so the newest posting ends up with the highest id (top of your list)
            const firstId = await nextJobId();
            const batch = ready.slice().reverse();
            const docs = [];
            for (const [i, record] of batch.entries()) {
                const doc = mapJob(record.j, firstId + i, record.content);
                const reason = validateImportedJob({
                    ...doc,
                    is_tech: record.j.is_tech,
                    postedAt: record.j.posted_at,
                });
                if (reason) {
                    console.log(`[freehire] skipped "${record.j.public_slug}": ${reason}`);
                    rejections.set(record.j.public_slug, reason);
                    continue;
                }
                if (record.content?.contentProvider === "basic") {
                    console.log(`[freehire] raw-content fallback rejected "${record.j.public_slug}"`);
                    rejections.set(record.j.public_slug, "AI fallback used raw source content");
                    continue;
                }
                const duplicate = await findDuplicate(doc);
                if (duplicate) {
                    console.log(`[freehire] duplicate skipped "${record.j.public_slug}" (matches ${duplicate._id})`);
                    rejections.set(record.j.public_slug, `duplicate of ${duplicate._id}`);
                    continue;
                }
                docs.push(doc);
            }
            if (!docs.length) {
                console.log("[freehire] no quality-approved unique jobs to save");
            } else {
                try {
                    const res = await Job.insertMany(docs, { ordered: false });
                    inserted = res.length;
                    funnel.published = inserted;
                    res.forEach((job) => {
                        if (!shouldPostToTelegram(job)) {
                            console.log(`[telegram] skipped: ${getTelegramSkipReason(job)}`);
                            return;
                        }
                        funnel.telegramSent += 1;
                        void postJobToTelegram(job).catch((error) =>
                            console.error("[freehire] Telegram post failed:", error.message)
                        );
                    });
                    docs.forEach((job) => console.log(`[freehire] saved "${job.title}" at ${job.company}`));
                } catch (err) {
                    inserted = err.insertedDocs?.length ?? 0;
                    console.error("[freehire] insert had errors:", err.writeErrors?.length || err.message);
                }
            }
        }

        const expired = await cleanup();
        console.log(`[freehire] checked ${scanned} job(s), added ${inserted}, skipped ${aiSkipped} (AI), removed ${expired} expired`);
        return {
            scanned,
            inserted,
            aiSkipped,
            expired,
            ...(pauseForAiFailure ? { pausedUntil: new Date(aiPausedUntil) } : {}),
        };
    } catch (err) {
        console.error("[freehire] sync failed:", err.message);
        return { error: err.message };
    } finally {
        running = false;
    }
}