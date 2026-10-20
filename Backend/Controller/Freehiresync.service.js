// // // import Job from "../Modal/Job.modal.js";
// // // import sanitizeHtml from "sanitize-html";

// // // const BASE_URL = "https://freehire.me/api/v1/jobs/search";

// // // // ── Config (override with env vars, no code change needed) ───────────────────
// // // const CONFIG = {
// // //     jobsPerRun: Number(process.env.FREEHIRE_JOBS_PER_RUN || 2),        // new jobs added per run (cron runs hourly)
// // //     pageSize: 50,
// // //     maxPagesPerRun: 6,                                                 // how deep to look for jobs you don't have yet
// // //     countries: process.env.FREEHIRE_COUNTRIES ?? "IN",                 // "" = worldwide, or "IN,US"
// // //     workMode: process.env.FREEHIRE_WORK_MODE || "",                    // "", "remote", "hybrid", "onsite"
// // //     // Only look at recent postings. Keep this SHORTER than expireAfterDays so a job that was deleted
// // //     // after its retention period is older than this window and never gets re-imported.
// // //     postedWithinDays: Number(process.env.FREEHIRE_POSTED_WITHIN_DAYS || 4),
// // //     expireAfterDays: Number(process.env.FREEHIRE_EXPIRE_DAYS || 30),   // each job stays this long after it was imported
// // //     delayMs: 1000,
// // //     userAgent: process.env.FREEHIRE_USER_AGENT || "MyJobPortal/1.0",
// // // };

// // // // ── Categories: freehire tech categories grouped into YOUR category labels ───
// // // // ⚠️ EDIT the group names / membership to match your category filter values.
// // // // Only categories listed here are fetched, which is what keeps the import tech-only.
// // // const CATEGORY_GROUPS = {
// // //     "Software Engineering": [
// // //         "software_engineering", "backend", "frontend", "fullstack", "mobile",
// // //         "embedded", "blockchain", "architecture", "data_engineering", "ml_ai", "ai_engineering",
// // //     ],
// // //     "IT": ["devops", "sre", "network_engineering", "security", "qa"],
// // //     "Analyst": ["data_analytics", "data_science"],
// // // };
// // // const CATEGORY_LABEL = {};
// // // for (const [label, cats] of Object.entries(CATEGORY_GROUPS)) cats.forEach((c) => (CATEGORY_LABEL[c] = label));
// // // const TECH_CATEGORIES = Object.keys(CATEGORY_LABEL);

// // // // ── Job Type: free text, built from the work mode / employment type in the API ─
// // // // ⚠️ Edit the labels to taste. Default is "Full Time".
// // // const JOB_TYPE_LABELS = {
// // //     default: "Full Time",
// // //     remote: "Remote / Work From Home",
// // //     hybrid: "Hybrid",
// // //     part_time: "Part Time",
// // //     contract: "Contract",
// // //     internship: "Internship",
// // //     fellowship: "Fellowship",
// // // };
// // // export function resolveJobType(e = {}, workMode) {
// // //     // a non-full-time employment type wins (an internship is an internship, remote or not)
// // //     if (e.employment_type === "internship" || e.seniority === "intern") return JOB_TYPE_LABELS.internship;
// // //     if (e.employment_type === "fellowship") return JOB_TYPE_LABELS.fellowship;
// // //     if (e.employment_type === "part_time") return JOB_TYPE_LABELS.part_time;
// // //     if (e.employment_type === "contract") return JOB_TYPE_LABELS.contract;
// // //     // otherwise the work mode
// // //     if (workMode === "remote") return JOB_TYPE_LABELS.remote;
// // //     if (workMode === "hybrid") return JOB_TYPE_LABELS.hybrid;
// // //     return JOB_TYPE_LABELS.default;
// // // }

// // // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// // // const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// // // let running = false;

// // // // ── HTTP with small retry on 429 / 5xx ───────────────────────────────────────
// // // async function fetchPage(qs, attempt = 1) {
// // //     const res = await fetch(`${BASE_URL}?${qs}`, {
// // //         headers: { Accept: "application/json", "User-Agent": CONFIG.userAgent },
// // //     });
// // //     if ((res.status === 429 || res.status >= 500) && attempt <= 3) {
// // //         const retryAfter = Number(res.headers.get("retry-after")) || 2 * attempt;
// // //         await sleep(retryAfter * 1000);
// // //         return fetchPage(qs, attempt + 1);
// // //     }
// // //     if (!res.ok) throw new Error(`freehire responded ${res.status}`);
// // //     return res.json();
// // // }

// // // // ── Apply link: remove the utm_source=freehire(.me) tag, keep everything else ─
// // // export function cleanApplyLink(url) {
// // //     if (!url) return "";
// // //     return String(url).replace(
// // //         /([?&])utm_source=freehire(?:\.me)?(&|#|$)/gi,
// // //         (m, lead, tail) => (tail === "&" ? lead : tail)
// // //     );
// // // }

// // // // ── Salary / experience ──────────────────────────────────────────────────────
// // // const fmtNum = (n) => Number(n).toLocaleString("en-US");

// // // function formatSalary(e = {}) {
// // //     if (!e.salary_min && !e.salary_max) return "Not disclosed";
// // //     const range = e.salary_min && e.salary_max
// // //         ? `${fmtNum(e.salary_min)} - ${fmtNum(e.salary_max)}`
// // //         : fmtNum(e.salary_min || e.salary_max);
// // //     const per = e.salary_period ? ` / ${e.salary_period}` : "";
// // //     return `${e.salary_currency || ""} ${range}${per}`.trim();
// // // }

// // // function formatExperience(e = {}) {
// // //     if (e.experience_years_min == null) return "";
// // //     return e.experience_years_min === 0 ? "Fresher" : `${e.experience_years_min}+ years`;
// // // }

// // // // ── Location = location + region merged, without repeating words ─────────────
// // // const REGION_LABELS = {
// // //     global: "Global", north_america: "North America", latam: "Latin America", eu: "Europe",
// // //     uk: "United Kingdom", mena: "Middle East & North Africa", africa: "Africa", apac: "Asia Pacific", cis: "CIS",
// // // };
// // // const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
// // // const countryName = (code) => { try { return regionNames.of(code) || code; } catch { return code; } };
// // // const mentions = (text, ...needles) =>
// // //     needles.some((n) => n && new RegExp(`\\b${escapeRegex(n)}\\b`, "i").test(text));

// // // export function formatLocation(j) {
// // //     const parts = [];
// // //     let base = (j.location || "").trim();
// // //     if (!base) base = [...(j.cities || []), ...(j.countries || []).map(countryName)].join(", ");
// // //     if (base) parts.push(base);

// // //     for (const r of j.regions || []) {
// // //         const label = REGION_LABELS[r];
// // //         if (!label) continue;
// // //         if (r === "global" && base) continue; // "Bangalore, Global" would be contradictory
// // //         if (mentions(parts.join(", "), label, r.replace(/_/g, " "))) continue;
// // //         parts.push(label);
// // //     }

// // //     const loc = parts.join(", ");
// // //     if (!loc && j.work_mode === "remote") return "Remote";
// // //     return loc;
// // // }

// // // // ── Description: sanitize third-party HTML + give <strong> headings breathing room ─
// // // const SANITIZE = {
// // //     allowedTags: ["p", "br", "strong", "em", "ul", "ol", "li", "a"],
// // //     allowedAttributes: { a: ["href", "target", "rel"] },
// // //     allowedSchemes: ["http", "https", "mailto"],
// // //     transformTags: {
// // //         b: "strong", h1: "strong", h2: "strong", h3: "strong", h4: "strong", h5: "strong", h6: "strong",
// // //         i: "em",
// // //         a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer nofollow" }),
// // //     },
// // // };

// // // // A heading starts a block: at the very start, after a line break, after a list, or glued to the end of a sentence.
// // // const HEAD_START = String.raw`(^|<br>|<\/ul>|<\/ol>|[.!?:;])`;
// // // // <strong>Heading</strong> sitting on its own line
// // // const HEADING_ALONE = new RegExp(
// // //     HEAD_START + String.raw`\s*<strong>([^<]{1,100}?)<\/strong>\s*(?:(?:<br>\s*)+|(?=$|<ul>|<ol>))`, "gi");
// // // // ...sentence.<strong>Heading</strong>Text glued straight onto the next sentence
// // // const HEADING_GLUED = new RegExp(
// // //     HEAD_START + String.raw`\s*<strong>([^<]{1,100}?)<\/strong>(?=[^\s<])`, "gi");
// // // // <strong>Heading:</strong> followed by text on the same line
// // // const HEADING_COLON = new RegExp(
// // //     HEAD_START + String.raw`\s*<strong>([^<]{1,100}?:)<\/strong>\s*(?=[^<\s])`, "gi");

// // // export function formatDescription(raw) {
// // //     if (!raw) return "";
// // //     let html = String(raw).replace(/\r\n?/g, "\n").trim();

// // //     html = html.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>"); // markdown bold -> strong
// // //     html = html.replace(/<\/(div|section)>/gi, "<br>");
// // //     html = sanitizeHtml(html, SANITIZE);                                // strips scripts, styles, event handlers
// // //     html = html.replace(/<br\s*\/?>/gi, "<br>");

// // //     // paragraphs -> blank-line flow
// // //     html = html.replace(/<\/p>\s*<p>/gi, "<br><br>").replace(/<\/?p>/gi, "");

// // //     // plain text keeps its line breaks; real HTML ignores raw newlines
// // //     html = /<(br|ul|ol|li)>/i.test(html) ? html.replace(/\s*\n\s*/g, " ") : html.replace(/\n/g, "<br>");

// // //     // headings: blank line BEFORE, single line break AFTER
// // //     const spacer = (before) => (/^<\/(ul|ol)>$/i.test(before) ? "<br>" : "<br><br>");
// // //     const asHeading = (m, before, text) => `${before}${spacer(before)}<strong>${text.trim()}</strong><br>`;
// // //     html = html.replace(HEADING_ALONE, asHeading).replace(HEADING_GLUED, asHeading).replace(HEADING_COLON, asHeading);

// // //     return html
// // //         .replace(/<br>\s*(<ul>|<ol>)/gi, "$1")        // lists carry their own spacing
// // //         .replace(/(?:<br>\s*){3,}/gi, "<br><br>")      // never more than one blank line
// // //         .replace(/^(?:\s*<br>)+\s*/i, "")              // no leading breaks
// // //         .replace(/(?:<br>\s*)+$/i, "")                 // no trailing breaks
// // //         .trim();
// // // }

// // // // ── Numeric id (your model requires one and getJob sorts by id desc) ─────────
// // // // Imported jobs get a NEGATIVE id: your own jobs always sort first, and among imports
// // // // newer postings get a larger (closer to 0) id so they sort first.
// // // function hash32(str) {
// // //     let h = 0x811c9dc5;
// // //     for (let i = 0; i < str.length; i++) {
// // //         h ^= str.charCodeAt(i);
// // //         h = Math.imul(h, 0x01000193);
// // //     }
// // //     return h >>> 0;
// // // }
// // // function makeNumericId(externalId, postedAt) {
// // //     const ageDays = Math.max(0, Math.floor((Date.now() - postedAt.getTime()) / 86400000));
// // //     return -(ageDays * 1_000_000 + (hash32(externalId) % 1_000_000) + 1);
// // // }

// // // // ── Mapping: freehire job -> your Job model shape ────────────────────────────
// // // export function mapJob(j) {
// // //     const e = j.enrichment || {};
// // //     const skills = Array.isArray(j.skills) ? j.skills : [];
// // //     const postedAt = j.posted_at ? new Date(j.posted_at) : new Date();
// // //     const company = j.company || "Unknown";

// // //     return {
// // //         id: makeNumericId(j.public_slug, postedAt),
// // //         slug: j.public_slug,
// // //         title: j.title,
// // //         company,
// // //         location: formatLocation(j),
// // //         salary: formatSalary(e),
// // //         salaryNote: "",
// // //         jobType: resolveJobType(e, j.work_mode),
// // //         experience: formatExperience(e),
// // //         category: CATEGORY_LABEL[e.category] || "Software Engineering",
// // //         website: "",
// // //         applyLink: cleanApplyLink(j.url),
// // //         lastDate: "",
// // //         aboutCompany: "",
// // //         description: formatDescription(j.description), // responsibilities stay inside the description
// // //         responsibilities: "",
// // //         eligibility: "",
// // //         requiredSkills: skills.join(", "),
// // //         applyIf: "",
// // //         dontApplyIf: "",
// // //         selectionProcess: "",
// // //         benefits: "",
// // //         applySteps: "",
// // //         imageUrl: "",
// // //         imagePublicId: "",

// // //         source: company,
// // //         externalId: j.public_slug, // internal marker: identifies imported jobs
// // //         postedAt,
// // //     };
// // // }

// // // // Tech only (the category filter already narrows the query; this is a safety net).
// // // // Must have an apply link and must not be closed.
// // // const isUsable = (j) =>
// // //     j.public_slug && j.title && j.url && !j.closed_at && (!j.is_tech || j.is_tech === "tech");

// // // const IMPORTED = { externalId: { $exists: true, $ne: null } };

// // // // Delete imported jobs once they have been on your site for expireAfterDays.
// // // // Your own manual jobs have no externalId, so they are never touched.
// // // async function cleanup() {
// // //     const cutoff = new Date(Date.now() - CONFIG.expireAfterDays * 86400000);
// // //     const r = await Job.deleteMany({ ...IMPORTED, createdAt: { $lt: cutoff } });
// // //     return r.deletedCount || 0;
// // // }

// // // // ── Main sync: add the newest few jobs you don't have yet ────────────────────
// // // export async function syncFreehireJobs() {
// // //     if (running) {
// // //         console.log("[freehire] sync already running, skipping");
// // //         return { skipped: true };
// // //     }
// // //     running = true;

// // //     try {
// // //         const picked = [];

// // //         for (let page = 0; page < CONFIG.maxPagesPerRun && picked.length < CONFIG.jobsPerRun; page++) {
// // //             const params = new URLSearchParams({
// // //                 category: TECH_CATEGORIES.join(","),
// // //                 posted_within_days: String(CONFIG.postedWithinDays),
// // //                 sort: "posted_at",
// // //                 order: "desc",
// // //                 limit: String(CONFIG.pageSize),
// // //                 offset: String(page * CONFIG.pageSize),
// // //             });
// // //             if (CONFIG.countries) params.set("countries", CONFIG.countries);
// // //             if (CONFIG.workMode) params.set("work_mode", CONFIG.workMode);

// // //             const body = await fetchPage(params.toString());
// // //             if (body.meta?.ignored_params?.length) {
// // //                 console.warn("[freehire] ignored params:", body.meta.ignored_params);
// // //             }

// // //             const all = body.data || [];
// // //             const rows = all.filter(isUsable);
// // //             const have = new Set(
// // //                 (await Job.find({ externalId: { $in: rows.map((j) => j.public_slug) } }).select("externalId").lean())
// // //                     .map((d) => d.externalId)
// // //             );

// // //             for (const j of rows) {
// // //                 if (picked.length >= CONFIG.jobsPerRun) break;
// // //                 if (!have.has(j.public_slug)) picked.push(j);
// // //             }

// // //             const total = body.meta?.total ?? 0;
// // //             if (all.length < CONFIG.pageSize || (page + 1) * CONFIG.pageSize >= total) break;
// // //             await sleep(CONFIG.delayMs);
// // //         }

// // //         let inserted = 0;
// // //         if (picked.length) {
// // //             try {
// // //                 const res = await Job.insertMany(picked.map(mapJob), { ordered: false });
// // //                 inserted = res.length;
// // //             } catch (err) {
// // //                 // e.g. slug clash with one of your own jobs: log it, keep the rest
// // //                 inserted = err.insertedDocs?.length ?? 0;
// // //                 console.error("[freehire] insert had errors:", err.writeErrors?.length || err.message);
// // //             }
// // //         }

// // //         const expired = await cleanup();
// // //         console.log(`[freehire] added ${inserted} job(s), removed ${expired} expired`);
// // //         return { inserted, expired };
// // //     } catch (err) {
// // //         console.error("[freehire] sync failed:", err.message);
// // //         return { error: err.message };
// // //     } finally {
// // //         running = false;
// // //     }
// // // }



// // import Job from "../Modal/Job.modal.js";
// // import sanitizeHtml from "sanitize-html";

// // const BASE_URL = "https://freehire.me/api/v1/jobs/search";

// // // ── Config (override with env vars, no code change needed) ───────────────────
// // const CONFIG = {
// //     jobsPerRun: Number(process.env.FREEHIRE_JOBS_PER_RUN || 2),        // new jobs added per run (cron runs hourly)
// //     pageSize: 20,                                                      // jobs checked per API call
// //     maxPagesPerRun: 6,                                                 // if a page doesn't give enough NEW tech jobs, check the next page (up to 6 x 20 = 120 jobs)
// //     countries: process.env.FREEHIRE_COUNTRIES ?? "IN",                 // "" = worldwide, or "IN,US"
// //     workMode: process.env.FREEHIRE_WORK_MODE || "",                    // "", "remote", "hybrid", "onsite"
// //     // Only look at recent postings. Keep this SHORTER than expireAfterDays so a job that was deleted
// //     // after its retention period is older than this window and never gets re-imported.
// //     postedWithinDays: Number(process.env.FREEHIRE_POSTED_WITHIN_DAYS || 4),
// //     expireAfterDays: Number(process.env.FREEHIRE_EXPIRE_DAYS || 30),   // each job stays this long after it was imported
// //     delayMs: 1000,
// //     userAgent: process.env.FREEHIRE_USER_AGENT || "MyJobPortal/1.0",
// // };

// // // ── Categories: freehire tech categories grouped into YOUR category labels ───
// // // ⚠️ EDIT the group names / membership to match your category filter values.
// // // Only categories listed here are fetched, which is what keeps the import tech-only.
// // const CATEGORY_GROUPS = {
// //     "Software Engineering": [
// //         "software_engineering", "backend", "frontend", "fullstack", "mobile",
// //         "embedded", "blockchain", "architecture", "data_engineering", "ml_ai", "ai_engineering",
// //     ],
// //     "IT": ["devops", "sre", "network_engineering", "security", "qa"],
// //     "Analyst": ["data_analytics", "data_science"],
// // };
// // const CATEGORY_LABEL = {};
// // for (const [label, cats] of Object.entries(CATEGORY_GROUPS)) cats.forEach((c) => (CATEGORY_LABEL[c] = label));
// // const TECH_CATEGORIES = Object.keys(CATEGORY_LABEL);

// // // ── Job Type: free text, built from the work mode / employment type in the API ─
// // // ⚠️ Edit the labels to taste. Default is "Full Time".
// // const JOB_TYPE_LABELS = {
// //     default: "Full Time",
// //     remote: "Remote / Work From Home",
// //     hybrid: "Hybrid",
// //     part_time: "Part Time",
// //     contract: "Contract",
// //     internship: "Internship",
// //     fellowship: "Fellowship",
// // };
// // export function resolveJobType(e = {}, workMode) {
// //     // a non-full-time employment type wins (an internship is an internship, remote or not)
// //     if (e.employment_type === "internship" || e.seniority === "intern") return JOB_TYPE_LABELS.internship;
// //     if (e.employment_type === "fellowship") return JOB_TYPE_LABELS.fellowship;
// //     if (e.employment_type === "part_time") return JOB_TYPE_LABELS.part_time;
// //     if (e.employment_type === "contract") return JOB_TYPE_LABELS.contract;
// //     // otherwise the work mode
// //     if (workMode === "remote") return JOB_TYPE_LABELS.remote;
// //     if (workMode === "hybrid") return JOB_TYPE_LABELS.hybrid;
// //     return JOB_TYPE_LABELS.default;
// // }

// // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// // const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// // let running = false;

// // // ── HTTP with small retry on 429 / 5xx ───────────────────────────────────────
// // async function fetchPage(qs, attempt = 1) {
// //     const res = await fetch(`${BASE_URL}?${qs}`, {
// //         headers: { Accept: "application/json", "User-Agent": CONFIG.userAgent },
// //     });
// //     if ((res.status === 429 || res.status >= 500) && attempt <= 3) {
// //         const retryAfter = Number(res.headers.get("retry-after")) || 2 * attempt;
// //         await sleep(retryAfter * 1000);
// //         return fetchPage(qs, attempt + 1);
// //     }
// //     if (!res.ok) throw new Error(`freehire responded ${res.status}`);
// //     return res.json();
// // }

// // // ── Apply link: remove the utm_source=freehire(.me) tag, keep everything else ─
// // export function cleanApplyLink(url) {
// //     if (!url) return "";
// //     return String(url).replace(
// //         /([?&])utm_source=freehire(?:\.me)?(&|#|$)/gi,
// //         (m, lead, tail) => (tail === "&" ? lead : tail)
// //     );
// // }

// // // ── Salary / experience ──────────────────────────────────────────────────────
// // const fmtNum = (n) => Number(n).toLocaleString("en-US");

// // function formatSalary(e = {}) {
// //     if (!e.salary_min && !e.salary_max) return "Not disclosed";
// //     const range = e.salary_min && e.salary_max
// //         ? `${fmtNum(e.salary_min)} - ${fmtNum(e.salary_max)}`
// //         : fmtNum(e.salary_min || e.salary_max);
// //     const per = e.salary_period ? ` / ${e.salary_period}` : "";
// //     return `${e.salary_currency || ""} ${range}${per}`.trim();
// // }

// // function formatExperience(e = {}) {
// //     if (e.experience_years_min == null) return "";
// //     return e.experience_years_min === 0 ? "Fresher" : `${e.experience_years_min}+ years`;
// // }

// // // ── Location = location + region merged, without repeating words ─────────────
// // const REGION_LABELS = {
// //     global: "Global", north_america: "North America", latam: "Latin America", eu: "Europe",
// //     uk: "United Kingdom", mena: "Middle East & North Africa", africa: "Africa", apac: "Asia Pacific", cis: "CIS",
// // };
// // const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
// // const countryName = (code) => { try { return regionNames.of(code) || code; } catch { return code; } };
// // const mentions = (text, ...needles) =>
// //     needles.some((n) => n && new RegExp(`\\b${escapeRegex(n)}\\b`, "i").test(text));

// // export function formatLocation(j) {
// //     const parts = [];
// //     let base = (j.location || "").trim();
// //     if (!base) base = [...(j.cities || []), ...(j.countries || []).map(countryName)].join(", ");
// //     if (base) parts.push(base);

// //     for (const r of j.regions || []) {
// //         const label = REGION_LABELS[r];
// //         if (!label) continue;
// //         if (r === "global" && base) continue; // "Bangalore, Global" would be contradictory
// //         if (mentions(parts.join(", "), label, r.replace(/_/g, " "))) continue;
// //         parts.push(label);
// //     }

// //     const loc = parts.join(", ");
// //     if (!loc && j.work_mode === "remote") return "Remote";
// //     return loc;
// // }

// // // ── Description: sanitize third-party HTML + give <strong> headings breathing room ─
// // const SANITIZE = {
// //     allowedTags: ["p", "br", "strong", "em", "ul", "ol", "li", "a"],
// //     allowedAttributes: { a: ["href", "target", "rel"] },
// //     allowedSchemes: ["http", "https", "mailto"],
// //     transformTags: {
// //         b: "strong", h1: "strong", h2: "strong", h3: "strong", h4: "strong", h5: "strong", h6: "strong",
// //         i: "em",
// //         a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer nofollow" }),
// //     },
// // };

// // // A heading starts a block: at the very start, after a line break, after a list, or glued to the end of a sentence.
// // const HEAD_START = String.raw`(^|<br>|<\/ul>|<\/ol>|[.!?:;])`;
// // // <strong>Heading</strong> sitting on its own line
// // const HEADING_ALONE = new RegExp(
// //     HEAD_START + String.raw`\s*<strong>([^<]{1,100}?)<\/strong>\s*(?:(?:<br>\s*)+|(?=$|<ul>|<ol>))`, "gi");
// // // ...sentence.<strong>Heading</strong>Text glued straight onto the next sentence
// // const HEADING_GLUED = new RegExp(
// //     HEAD_START + String.raw`\s*<strong>([^<]{1,100}?)<\/strong>(?=[^\s<])`, "gi");
// // // <strong>Heading:</strong> followed by text on the same line
// // const HEADING_COLON = new RegExp(
// //     HEAD_START + String.raw`\s*<strong>([^<]{1,100}?:)<\/strong>\s*(?=[^<\s])`, "gi");

// // export function formatDescription(raw) {
// //     if (!raw) return "";
// //     let html = String(raw).replace(/\r\n?/g, "\n").trim();

// //     html = html.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>"); // markdown bold -> strong
// //     html = html.replace(/<\/(div|section)>/gi, "<br>");
// //     html = sanitizeHtml(html, SANITIZE);                                // strips scripts, styles, event handlers
// //     html = html.replace(/<br\s*\/?>/gi, "<br>");

// //     // paragraphs -> blank-line flow
// //     html = html.replace(/<\/p>\s*<p>/gi, "<br><br>").replace(/<\/?p>/gi, "");

// //     // plain text keeps its line breaks; real HTML ignores raw newlines
// //     html = /<(br|ul|ol|li)>/i.test(html) ? html.replace(/\s*\n\s*/g, " ") : html.replace(/\n/g, "<br>");

// //     // headings: blank line BEFORE, single line break AFTER
// //     const spacer = (before) => (/^<\/(ul|ol)>$/i.test(before) ? "<br>" : "<br><br>");
// //     const asHeading = (m, before, text) => `${before}${spacer(before)}<strong>${text.trim()}</strong><br>`;
// //     html = html.replace(HEADING_ALONE, asHeading).replace(HEADING_GLUED, asHeading).replace(HEADING_COLON, asHeading);

// //     return html
// //         .replace(/<br>\s*(<ul>|<ol>)/gi, "$1")        // lists carry their own spacing
// //         .replace(/(?:<br>\s*){3,}/gi, "<br><br>")      // never more than one blank line
// //         .replace(/^(?:\s*<br>)+\s*/i, "")              // no leading breaks
// //         .replace(/(?:<br>\s*)+$/i, "")                 // no trailing breaks
// //         .trim();
// // }

// // // ── Numeric id (your model requires one and getJob sorts by id desc) ─────────
// // // Imported jobs get a NEGATIVE id: your own jobs always sort first, and among imports
// // // newer postings get a larger (closer to 0) id so they sort first.
// // function hash32(str) {
// //     let h = 0x811c9dc5;
// //     for (let i = 0; i < str.length; i++) {
// //         h ^= str.charCodeAt(i);
// //         h = Math.imul(h, 0x01000193);
// //     }
// //     return h >>> 0;
// // }
// // function makeNumericId(externalId, postedAt) {
// //     const ageDays = Math.max(0, Math.floor((Date.now() - postedAt.getTime()) / 86400000));
// //     return -(ageDays * 1_000_000 + (hash32(externalId) % 1_000_000) + 1);
// // }

// // // ── Mapping: freehire job -> your Job model shape ────────────────────────────
// // export function mapJob(j) {
// //     const e = j.enrichment || {};
// //     const skills = Array.isArray(j.skills) ? j.skills : [];
// //     const postedAt = j.posted_at ? new Date(j.posted_at) : new Date();
// //     const company = j.company || "Unknown";

// //     return {
// //         id: makeNumericId(j.public_slug, postedAt),
// //         slug: j.public_slug,
// //         title: j.title,
// //         company,
// //         location: formatLocation(j),
// //         salary: formatSalary(e),
// //         salaryNote: "",
// //         jobType: resolveJobType(e, j.work_mode),
// //         experience: formatExperience(e),
// //         category: CATEGORY_LABEL[e.category] || "Software Engineering",
// //         website: "",
// //         applyLink: cleanApplyLink(j.url),
// //         lastDate: "",
// //         aboutCompany: "",
// //         description: formatDescription(j.description), // responsibilities stay inside the description
// //         responsibilities: "",
// //         eligibility: "",
// //         requiredSkills: skills.join(", "),
// //         applyIf: "",
// //         dontApplyIf: "",
// //         selectionProcess: "",
// //         benefits: "",
// //         applySteps: "",
// //         imageUrl: "",
// //         imagePublicId: "",

// //         source: company,
// //         externalId: j.public_slug, // internal marker: identifies imported jobs
// //         postedAt,
// //     };
// // }

// // // Tech only (the category filter already narrows the query; this is a safety net).
// // // Must have an apply link and must not be closed.
// // const isUsable = (j) =>
// //     j.public_slug && j.title && j.url && !j.closed_at && (!j.is_tech || j.is_tech === "tech");

// // const IMPORTED = { externalId: { $exists: true, $ne: null } };

// // // Delete imported jobs once they have been on your site for expireAfterDays.
// // // Your own manual jobs have no externalId, so they are never touched.
// // async function cleanup() {
// //     const cutoff = new Date(Date.now() - CONFIG.expireAfterDays * 86400000);
// //     const r = await Job.deleteMany({ ...IMPORTED, createdAt: { $lt: cutoff } });
// //     return r.deletedCount || 0;
// // }

// // // ── Main sync: add the newest few jobs you don't have yet ────────────────────
// // export async function syncFreehireJobs() {
// //     if (running) {
// //         console.log("[freehire] sync already running, skipping");
// //         return { skipped: true };
// //     }
// //     running = true;

// //     try {
// //         const picked = [];
// //         let scanned = 0;

// //         for (let page = 0; page < CONFIG.maxPagesPerRun && picked.length < CONFIG.jobsPerRun; page++) {
// //             const params = new URLSearchParams({
// //                 category: TECH_CATEGORIES.join(","),
// //                 posted_within_days: String(CONFIG.postedWithinDays),
// //                 sort: "posted_at",
// //                 order: "desc",
// //                 limit: String(CONFIG.pageSize),
// //                 offset: String(page * CONFIG.pageSize),
// //             });
// //             if (CONFIG.countries) params.set("countries", CONFIG.countries);
// //             if (CONFIG.workMode) params.set("work_mode", CONFIG.workMode);

// //             const body = await fetchPage(params.toString());
// //             if (body.meta?.ignored_params?.length) {
// //                 console.warn("[freehire] ignored params:", body.meta.ignored_params);
// //             }

// //             const all = body.data || [];
// //             scanned += all.length;
// //             const rows = all.filter(isUsable);
// //             const have = new Set(
// //                 (await Job.find({ externalId: { $in: rows.map((j) => j.public_slug) } }).select("externalId").lean())
// //                     .map((d) => d.externalId)
// //             );

// //             for (const j of rows) {
// //                 if (picked.length >= CONFIG.jobsPerRun) break;
// //                 if (!have.has(j.public_slug)) picked.push(j);
// //             }

// //             const total = body.meta?.total ?? 0;
// //             if (all.length < CONFIG.pageSize || (page + 1) * CONFIG.pageSize >= total) break;
// //             await sleep(CONFIG.delayMs);
// //         }

// //         let inserted = 0;
// //         if (picked.length) {
// //             try {
// //                 const res = await Job.insertMany(picked.map(mapJob), { ordered: false });
// //                 inserted = res.length;
// //             } catch (err) {
// //                 // e.g. slug clash with one of your own jobs: log it, keep the rest
// //                 inserted = err.insertedDocs?.length ?? 0;
// //                 console.error("[freehire] insert had errors:", err.writeErrors?.length || err.message);
// //             }
// //         }

// //         const expired = await cleanup();
// //         console.log(`[freehire] checked ${scanned} job(s), added ${inserted}, removed ${expired} expired`);
// //         return { scanned, inserted, expired };
// //     } catch (err) {
// //         console.error("[freehire] sync failed:", err.message);
// //         return { error: err.message };
// //     } finally {
// //         running = false;
// //     }
// // }

// import Job from "../Modal/Job.modal.js";
// import sanitizeHtml from "sanitize-html";

// const BASE_URL = "https://freehire.me/api/v1/jobs/search";

// // ── Config (override with env vars, no code change needed) ───────────────────
// const CONFIG = {
//     jobsPerRun: Number(process.env.FREEHIRE_JOBS_PER_RUN || 2),        // new jobs added per run
//     pageSize: 20,                                                      // jobs checked per API call
//     maxPagesPerRun: 6,                                                 // if a page doesn't give enough NEW tech jobs, check the next page (up to 6 x 20 = 120 jobs)
//     countries: process.env.FREEHIRE_COUNTRIES ?? "IN",                 // "" = worldwide, or "IN,US"
//     workMode: process.env.FREEHIRE_WORK_MODE || "",                    // "", "remote", "hybrid", "onsite"
//     // Only look at recent postings. Keep this SHORTER than expireAfterDays so a job that was deleted
//     // after its retention period is older than this window and never gets re-imported.
//     postedWithinDays: Number(process.env.FREEHIRE_POSTED_WITHIN_DAYS || 4),
//     expireAfterDays: Number(process.env.FREEHIRE_EXPIRE_DAYS || 30),   // each job stays this long after it was imported
//     delayMs: 1000,
//     userAgent: process.env.FREEHIRE_USER_AGENT || "MyJobPortal/1.0",
// };

// // ── Categories: freehire tech categories grouped into YOUR category labels ───
// // ⚠️ EDIT the group names / membership to match your category filter values.
// // Only categories listed here are fetched, which is what keeps the import tech-only.
// const CATEGORY_GROUPS = {
//     "Software Engineering": [
//         "software_engineering", "backend", "frontend", "fullstack", "mobile",
//         "embedded", "blockchain", "architecture", "data_engineering", "ml_ai", "ai_engineering",
//     ],
//     "IT": ["devops", "sre", "network_engineering", "security", "qa"],
//     "Analyst": ["data_analytics", "data_science"],
// };
// const CATEGORY_LABEL = {};
// for (const [label, cats] of Object.entries(CATEGORY_GROUPS)) cats.forEach((c) => (CATEGORY_LABEL[c] = label));
// const TECH_CATEGORIES = Object.keys(CATEGORY_LABEL);

// // ── Job Type: free text, built from the work mode / employment type in the API ─
// // ⚠️ Edit the labels to taste. Default is "Full Time".
// const JOB_TYPE_LABELS = {
//     default: "Full Time",
//     remote: "Remote / Work From Home",
//     hybrid: "Hybrid",
//     part_time: "Part Time",
//     contract: "Contract",
//     internship: "Internship",
//     fellowship: "Fellowship",
// };
// export function resolveJobType(e = {}, workMode) {
//     // a non-full-time employment type wins (an internship is an internship, remote or not)
//     if (e.employment_type === "internship" || e.seniority === "intern") return JOB_TYPE_LABELS.internship;
//     if (e.employment_type === "fellowship") return JOB_TYPE_LABELS.fellowship;
//     if (e.employment_type === "part_time") return JOB_TYPE_LABELS.part_time;
//     if (e.employment_type === "contract") return JOB_TYPE_LABELS.contract;
//     // otherwise the work mode
//     if (workMode === "remote") return JOB_TYPE_LABELS.remote;
//     if (workMode === "hybrid") return JOB_TYPE_LABELS.hybrid;
//     return JOB_TYPE_LABELS.default;
// }

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// let running = false;

// // ── HTTP with small retry on 429 / 5xx ───────────────────────────────────────
// async function fetchPage(qs, attempt = 1) {
//     const res = await fetch(`${BASE_URL}?${qs}`, {
//         headers: { Accept: "application/json", "User-Agent": CONFIG.userAgent },
//     });
//     if ((res.status === 429 || res.status >= 500) && attempt <= 3) {
//         const retryAfter = Number(res.headers.get("retry-after")) || 2 * attempt;
//         await sleep(retryAfter * 1000);
//         return fetchPage(qs, attempt + 1);
//     }
//     if (!res.ok) throw new Error(`freehire responded ${res.status}`);
//     return res.json();
// }

// // ── Apply link: remove the utm_source=freehire(.me) tag, keep everything else ─
// export function cleanApplyLink(url) {
//     if (!url) return "";
//     return String(url).replace(
//         /([?&])utm_source=freehire(?:\.me)?(&|#|$)/gi,
//         (m, lead, tail) => (tail === "&" ? lead : tail)
//     );
// }

// // ── Salary / experience ──────────────────────────────────────────────────────
// const fmtNum = (n) => Number(n).toLocaleString("en-US");

// function formatSalary(e = {}) {
//     if (!e.salary_min && !e.salary_max) return "Not disclosed";
//     const range = e.salary_min && e.salary_max
//         ? `${fmtNum(e.salary_min)} - ${fmtNum(e.salary_max)}`
//         : fmtNum(e.salary_min || e.salary_max);
//     const per = e.salary_period ? ` / ${e.salary_period}` : "";
//     return `${e.salary_currency || ""} ${range}${per}`.trim();
// }

// function formatExperience(e = {}) {
//     if (e.experience_years_min == null) return "";
//     return e.experience_years_min === 0 ? "Fresher" : `${e.experience_years_min}+ years`;
// }

// // ── Location: "Bengaluru, India; Chennai, India; Pune, India" -> "Bengaluru, Chennai, Pune, India" ──
// const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
// const countryName = (code) => { try { return regionNames.of(code) || code; } catch { return code; } };

// export function formatLocation(j) {
//     let segments = (j.location || "").split(/\s*[;|]\s*/).map((s) => s.trim()).filter(Boolean);

//     if (!segments.length) {
//         const cities = j.cities || [];
//         const countries = (j.countries || []).map(countryName);
//         segments = cities.length
//             ? cities.map((c) => (countries.length === 1 ? `${c}, ${countries[0]}` : c))
//             : countries;
//     }

//     const byCountry = new Map(); // country -> { country, cities[] }
//     const standalone = [];
//     for (const seg of segments) {
//         const bits = seg.split(",").map((b) => b.trim()).filter(Boolean);
//         if (bits.length >= 2) {
//             const country = bits[bits.length - 1];
//             const city = bits[0]; // "City, State, Country" -> City
//             const key = country.toLowerCase();
//             if (!byCountry.has(key)) byCountry.set(key, { country, cities: [] });
//             const group = byCountry.get(key);
//             if (!group.cities.some((c) => c.toLowerCase() === city.toLowerCase())) group.cities.push(city);
//         } else if (bits.length === 1) {
//             standalone.push(bits[0]);
//         }
//     }

//     const out = [...byCountry.values()].map((g) => `${g.cities.join(", ")}, ${g.country}`);
//     for (const s of standalone) {
//         const dup = byCountry.has(s.toLowerCase()) || out.some((o) => o.toLowerCase() === s.toLowerCase());
//         if (!dup) out.push(s);
//     }

//     const loc = out.join("; ");
//     if (!loc && j.work_mode === "remote") return "Remote";
//     return loc;
// }

// // ── Skills: one per line, nicely cased (same shape as your CSV: "JavaScript\nReact\nNode.js") ──
// const SKILL_CASE = {
//     javascript: "JavaScript", typescript: "TypeScript", nodejs: "Node.js", "node.js": "Node.js", node: "Node.js",
//     react: "React", reactjs: "React", "react.js": "React", vue: "Vue.js", vuejs: "Vue.js", angular: "Angular",
//     nextjs: "Next.js", "next.js": "Next.js", express: "Express.js", python: "Python", java: "Java",
//     go: "Go", golang: "Go", rust: "Rust", ruby: "Ruby", php: "PHP", csharp: "C#", "c#": "C#", cpp: "C++", "c++": "C++",
//     c: "C", kotlin: "Kotlin", swift: "Swift", scala: "Scala", dotnet: ".NET", ".net": ".NET",
//     sql: "SQL", nosql: "NoSQL", mysql: "MySQL", postgresql: "PostgreSQL", postgres: "PostgreSQL", mongodb: "MongoDB",
//     redis: "Redis", graphql: "GraphQL", rest: "REST API", restapi: "REST API", api: "API", apis: "APIs",
//     html: "HTML", css: "CSS", aws: "AWS", gcp: "GCP", azure: "Azure", docker: "Docker", kubernetes: "Kubernetes",
//     terraform: "Terraform", linux: "Linux", git: "Git", "ci/cd": "CI/CD", cicd: "CI/CD", devops: "DevOps",
//     ios: "iOS", android: "Android", flutter: "Flutter", tensorflow: "TensorFlow", pytorch: "PyTorch",
//     ml: "ML", ai: "AI", nlp: "NLP", llm: "LLM", etl: "ETL", sre: "SRE", qa: "QA", bigquery: "BigQuery",
//     spark: "Spark", kafka: "Kafka", hadoop: "Hadoop", airflow: "Airflow", snowflake: "Snowflake",
//     tableau: "Tableau", powerbi: "Power BI", excel: "Excel", jira: "Jira", selenium: "Selenium",
//     springboot: "Spring Boot", spring: "Spring", django: "Django", flask: "Flask", fastapi: "FastAPI",
// };
// export function formatSkills(skills) {
//     const seen = new Set();
//     const out = [];
//     for (const raw of skills || []) {
//         const key = String(raw).trim().toLowerCase();
//         if (!key) continue;
//         const label = SKILL_CASE[key] ||
//             key.split(/[-_\s]+/).filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
//         if (!seen.has(label.toLowerCase())) {
//             seen.add(label.toLowerCase());
//             out.push(label);
//         }
//     }
//     return out;
// }

// // ── Description: third-party HTML -> clean PLAIN TEXT with \n (your frontend shows tags literally) ─
// const H_OPEN = "\u0001";   // temporary markers around headings (removed before saving)
// const H_CLOSE = "\u0002";

// const SANITIZE = {
//     allowedTags: ["p", "br", "strong", "em", "ul", "ol", "li"],
//     allowedAttributes: {},
//     transformTags: {
//         b: "strong", h1: "strong", h2: "strong", h3: "strong", h4: "strong", h5: "strong", h6: "strong", i: "em",
//     },
// };

// // A heading starts a block: at the very start, after a line break, after a list, or glued to the end of a sentence.
// const HEAD_START = String.raw`(^|<br>|<\/ul>|<\/ol>|[.!?:;])`;
// // <strong>Heading</strong> sitting on its own line
// const HEADING_ALONE = new RegExp(
//     HEAD_START + String.raw`\s*<strong>([^<]{1,100}?)<\/strong>\s*(?:(?:<br>\s*)+|(?=$|<ul>|<ol>))`, "gi");
// // ...sentence.<strong>Heading</strong>Text glued straight onto the next sentence
// const HEADING_GLUED = new RegExp(
//     HEAD_START + String.raw`\s*<strong>([^<]{1,100}?)<\/strong>(?=[^\s<])`, "gi");
// // <strong>Heading:</strong> followed by text on the same line
// const HEADING_COLON = new RegExp(
//     HEAD_START + String.raw`\s*<strong>([^<]{1,100}?:)<\/strong>\s*(?=[^<\s])`, "gi");

// const decodeEntities = (s) => s
//     .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
//     .replace(/&#39;|&#x27;/g, "'").replace(/&#(\d+);/g, (m, n) => String.fromCharCode(Number(n)))
//     .replace(/&amp;/g, "&");

// function descriptionToText(raw) {
//     if (!raw) return "";
//     let html = String(raw).replace(/\r\n?/g, "\n").trim();

//     html = html.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>"); // markdown bold -> strong
//     html = html.replace(/<\/(div|section)>/gi, "<br>");
//     html = sanitizeHtml(html, SANITIZE);                                // strips scripts, styles, event handlers, links
//     html = html.replace(/<br\s*\/?>/gi, "<br>");

//     // paragraphs -> blank-line flow
//     html = html.replace(/<\/p>\s*<p>/gi, "<br><br>").replace(/<\/?p>/gi, "");

//     // plain text keeps its line breaks; real HTML ignores raw newlines
//     html = /<(br|ul|ol|li)>/i.test(html) ? html.replace(/\s*\n\s*/g, " ") : html.replace(/\n/g, "<br>");

//     // headings: blank line BEFORE, single line break AFTER
//     const spacer = (before) => (/^<\/(ul|ol)>$/i.test(before) ? "<br>" : "<br><br>");
//     const asHeading = (m, before, text) => `${before}${spacer(before)}${H_OPEN}${text.trim()}${H_CLOSE}<br>`;
//     html = html.replace(HEADING_ALONE, asHeading).replace(HEADING_GLUED, asHeading).replace(HEADING_COLON, asHeading);

//     // lists -> one "• item" per line
//     html = html
//         .replace(/<br>\s*(<ul>|<ol>)/gi, "$1")
//         .replace(/<li>/gi, "<br>• ")
//         .replace(/<\/li>/gi, "")
//         .replace(/<(?:ul|ol)>/gi, "")
//         .replace(/<\/(?:ul|ol)>/gi, "<br>");

//     let text = html.replace(/<br>/gi, "\n").replace(/<[^>]+>/g, ""); // drop inline <strong>/<em> etc.
//     text = decodeEntities(text);

//     return text
//         .split("\n")
//         .map((l) => l.trim().replace(/^•\s+/, "• "))
//         .join("\n")
//         .replace(/\n{3,}/g, "\n\n")
//         .trim();
// }

// // "About us", "About the company", "Company overview", "About <CompanyName>" ... but NOT "About the role/job/team"
// const ABOUT_ROLE = /^about\s+(the\s+|this\s+|your\s+)?(role|job|position|opportunity|team|you|internship|vacancy|work|project)\b/i;
// const ABOUT_COMPANY = /^(about\s+(us|our\s+company|the\s+company|company|the\s+organi[sz]ation|the\s+firm)|company\s+(overview|description|profile|background)|who\s+we\s+are|our\s+company|our\s+story)\b/i;

// function isAboutCompanyHeading(heading, company) {
//     const t = heading.replace(/[:\-–—\s]+$/, "").trim();
//     if (ABOUT_ROLE.test(t)) return false;
//     if (ABOUT_COMPANY.test(t)) return true;
//     const names = [company, (company || "").split(/\s+/)[0]].filter((n) => n && n.length >= 3);
//     return names.some((n) => new RegExp(`^about\\s+${escapeRegex(n)}\\b`, "i").test(t));
// }

// // Returns { description, aboutCompany }: the "About us / About <company>" section is moved into aboutCompany.
// export function parseDescription(raw, company = "") {
//     const text = descriptionToText(raw);
//     if (!text) return { description: "", aboutCompany: "" };

//     const sections = [];
//     let cur = { heading: null, lines: [] };
//     for (const line of text.split("\n")) {
//         if (line.startsWith(H_OPEN) && line.endsWith(H_CLOSE)) {
//             sections.push(cur);
//             cur = { heading: line.slice(1, -1).trim(), lines: [] };
//         } else {
//             cur.lines.push(line);
//         }
//     }
//     sections.push(cur);

//     const body = (s) => s.lines.join("\n").trim();
//     const about = sections.filter((s) => s.heading && isAboutCompanyHeading(s.heading, company));
//     const aboutCompany = about.map(body).filter(Boolean).join("\n\n");

//     const description = sections
//         .filter((s) => !about.includes(s))
//         .map((s) => [s.heading, body(s)].filter(Boolean).join("\n"))
//         .filter(Boolean)
//         .join("\n\n")
//         .replace(/\n{3,}/g, "\n\n")
//         .trim();

//     return { description, aboutCompany };
// }

// // ── Same slug style as your controller: title-company-id ─────────────────────
// const generateSlug = (title, company, id) =>
//     `${title}-${company}-${id}`
//         .toLowerCase()
//         .replace(/[^a-z0-9\s-]/g, "")
//         .trim()
//         .replace(/\s+/g, "-")
//         .replace(/-+/g, "-");

// // ── Next numeric id: highest id in your database + 1 (same as adding a job by hand) ──
// async function nextJobId() {
//     const last = await Job.findOne({ id: { $gt: 0 } }).sort({ id: -1 }).select("id").lean();
//     return (last?.id || 0) + 1;
// }

// // ── Mapping: freehire job -> your Job model shape ────────────────────────────
// export function mapJob(j, id) {
//     const e = j.enrichment || {};
//     const postedAt = j.posted_at ? new Date(j.posted_at) : new Date();
//     const company = j.company || "Unknown";
//     const { description, aboutCompany } = parseDescription(j.description, company);

//     return {
//         id,
//         slug: generateSlug(j.title, company, id),
//         title: j.title,
//         company,
//         location: formatLocation(j),
//         salary: formatSalary(e),
//         salaryNote: "",
//         jobType: resolveJobType(e, j.work_mode),
//         experience: formatExperience(e),
//         category: CATEGORY_LABEL[e.category] || "Software Engineering",
//         website: company,
//         applyLink: cleanApplyLink(j.url),
//         lastDate: "",
//         aboutCompany,
//         description, // responsibilities stay inside the description
//         responsibilities: "",
//         eligibility: "",
//         requiredSkills: formatSkills(j.skills).join("\n"),
//         applyIf: "",
//         dontApplyIf: "",
//         selectionProcess: "",
//         benefits: "",
//         applySteps: "",
//         imageUrl: "",
//         imagePublicId: "",

//         source: company,
//         externalId: j.public_slug, // internal marker: identifies imported jobs and prevents duplicates
//         postedAt,
//     };
// }

// // Tech only (the category filter already narrows the query; this is a safety net).
// // Must have an apply link and must not be closed.
// const isUsable = (j) =>
//     j.public_slug && j.title && j.url && !j.closed_at && (!j.is_tech || j.is_tech === "tech");

// const IMPORTED = { externalId: { $exists: true, $ne: null } };

// // Delete imported jobs once they have been on your site for expireAfterDays.
// // Your own manual jobs have no externalId, so they are never touched.
// async function cleanup() {
//     const cutoff = new Date(Date.now() - CONFIG.expireAfterDays * 86400000);
//     const r = await Job.deleteMany({ ...IMPORTED, createdAt: { $lt: cutoff } });
//     return r.deletedCount || 0;
// }

// // ── Main sync: add the newest few jobs you don't have yet ────────────────────
// export async function syncFreehireJobs() {
//     if (running) {
//         console.log("[freehire] sync already running, skipping");
//         return { skipped: true };
//     }
//     running = true;

//     try {
//         const picked = [];
//         let scanned = 0;

//         for (let page = 0; page < CONFIG.maxPagesPerRun && picked.length < CONFIG.jobsPerRun; page++) {
//             const params = new URLSearchParams({
//                 category: TECH_CATEGORIES.join(","),
//                 posted_within_days: String(CONFIG.postedWithinDays),
//                 sort: "posted_at",
//                 order: "desc",
//                 limit: String(CONFIG.pageSize),
//                 offset: String(page * CONFIG.pageSize),
//             });
//             if (CONFIG.countries) params.set("countries", CONFIG.countries);
//             if (CONFIG.workMode) params.set("work_mode", CONFIG.workMode);

//             const body = await fetchPage(params.toString());
//             if (body.meta?.ignored_params?.length) {
//                 console.warn("[freehire] ignored params:", body.meta.ignored_params);
//             }

//             const all = body.data || [];
//             scanned += all.length;
//             const rows = all.filter(isUsable);
//             const have = new Set(
//                 (await Job.find({ externalId: { $in: rows.map((j) => j.public_slug) } }).select("externalId").lean())
//                     .map((d) => d.externalId)
//             );

//             for (const j of rows) {
//                 if (picked.length >= CONFIG.jobsPerRun) break;
//                 if (!have.has(j.public_slug)) picked.push(j);
//             }

//             const total = body.meta?.total ?? 0;
//             if (all.length < CONFIG.pageSize || (page + 1) * CONFIG.pageSize >= total) break;
//             await sleep(CONFIG.delayMs);
//         }

//         let inserted = 0;
//         if (picked.length) {
//             // oldest of the batch gets the lower id, so the newest posting ends up with the highest id (top of your list)
//             const firstId = await nextJobId();
//             const docs = picked.slice().reverse().map((j, i) => mapJob(j, firstId + i));
//             try {
//                 const res = await Job.insertMany(docs, { ordered: false });
//                 inserted = res.length;
//             } catch (err) {
//                 // e.g. a slug clash: log it, keep the rest
//                 inserted = err.insertedDocs?.length ?? 0;
//                 console.error("[freehire] insert had errors:", err.writeErrors?.length || err.message);
//             }
//         }

//         const expired = await cleanup();
//         console.log(`[freehire] checked ${scanned} job(s), added ${inserted}, removed ${expired} expired`);
//         return { scanned, inserted, expired };
//     } catch (err) {
//         console.error("[freehire] sync failed:", err.message);
//         return { error: err.message };
//     } finally {
//         running = false;
//     }
// }


import Job from "../Modal/Job.modal.js";
import sanitizeHtml from "sanitize-html";
import { generateJobContent } from "./Geminijob.service.js";

const BASE_URL = "https://freehire.me/api/v1/jobs/search";

// ── Config (override with env vars, no code change needed) ───────────────────
const CONFIG = {
    jobsPerRun: Number(process.env.FREEHIRE_JOBS_PER_RUN || 1),        // new jobs added per run
    pageSize: 20,                                                      // jobs checked per API call
    maxPagesPerRun: 6,                                                 // if a page doesn't give enough NEW tech jobs, check the next page (up to 6 x 20 = 120 jobs)
    countries: process.env.FREEHIRE_COUNTRIES ?? "IN",                 // "" = worldwide, or "IN,US"
    workMode: process.env.FREEHIRE_WORK_MODE || "",                    // "", "remote", "hybrid", "onsite"
    // Only look at recent postings. Keep this SHORTER than expireAfterDays so a job that was deleted
    // after its retention period is older than this window and never gets re-imported.
    postedWithinDays: Number(process.env.FREEHIRE_POSTED_WITHIN_DAYS || 4),
    expireAfterDays: Number(process.env.FREEHIRE_EXPIRE_DAYS || 30),   // each job stays this long after it was imported
    delayMs: 1000,
    userAgent: process.env.FREEHIRE_USER_AGENT || "MyJobPortal/1.0",
};

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

// ── Job Type: free text, built from the work mode / employment type in the API ─
// ⚠️ Edit the labels to taste. Default is "Full Time".
const JOB_TYPE_LABELS = {
    default: "Full Time",
    remote: "Work From Home",
    hybrid: "Hybrid",
    part_time: "Part Time",
    contract: "Contract",
    internship: "Internship",
    fellowship: "Internship",
};
export function resolveJobType(e = {}, workMode) {
    // a non-full-time employment type wins (an internship is an internship, remote or not)
    if (e.employment_type === "internship" || e.seniority === "intern") return JOB_TYPE_LABELS.internship;
    if (e.employment_type === "fellowship") return JOB_TYPE_LABELS.fellowship;
    if (e.employment_type === "part_time") return JOB_TYPE_LABELS.part_time;
    if (e.employment_type === "contract") return JOB_TYPE_LABELS.contract;
    // otherwise the work mode
    if (workMode === "remote") return JOB_TYPE_LABELS.remote;
    if (workMode === "hybrid") return JOB_TYPE_LABELS.hybrid;
    return JOB_TYPE_LABELS.default;
}

// Fallback for the "experience" dropdown (used only if Gemini returns something outside the fixed list).
const SENIOR_LEVELS = new Set(["middle", "senior", "lead", "staff", "principal", "c_level"]);
export function resolveExperience(e = {}) {
    const y = e.experience_years_min;
    if (e.employment_type === "internship" || e.seniority === "intern" || y === 0) return "Freshers";
    if (y === 1) return "Freshers / Experienced";
    if (y >= 2 || SENIOR_LEVELS.has(e.seniority)) return "Experienced";
    return "Freshers / Experienced";
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
let running = false;

// ── HTTP with small retry on 429 / 5xx ───────────────────────────────────────
async function fetchPage(qs, attempt = 1) {
    const res = await fetch(`${BASE_URL}?${qs}`, {
        headers: { Accept: "application/json", "User-Agent": CONFIG.userAgent },
    });
    if ((res.status === 429 || res.status >= 500) && attempt <= 3) {
        const retryAfter = Number(res.headers.get("retry-after")) || 2 * attempt;
        await sleep(retryAfter * 1000);
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

// ── Salary / experience ──────────────────────────────────────────────────────
const fmtNum = (n) => Number(n).toLocaleString("en-US");

function formatSalary(e = {}) {
    if (!e.salary_min && !e.salary_max) return "Not disclosed";
    const range = e.salary_min && e.salary_max
        ? `${fmtNum(e.salary_min)} - ${fmtNum(e.salary_max)}`
        : fmtNum(e.salary_min || e.salary_max);
    const per = e.salary_period ? ` / ${e.salary_period}` : "";
    return `${e.salary_currency || ""} ${range}${per}`.trim();
}

function formatExperience(e = {}) {
    if (e.experience_years_min == null) return "";
    return e.experience_years_min === 0 ? "Fresher" : `${e.experience_years_min}+ years`;
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

// ── Skills: one per line, nicely cased (same shape as your CSV: "JavaScript\nReact\nNode.js") ──
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

// ── Facts we send to Gemini (job data only, no secrets) ──────────────────────
function buildFacts(j, location, salary) {
    const e = j.enrichment || {};
    const company = j.company || "Unknown";
    const { description, aboutCompany } = parseDescription(j.description, company);
    return {
        title: j.title,
        company,
        location,
        salary_text: salary,
        work_mode: j.work_mode || null,
        employment_type: e.employment_type || null,
        seniority: e.seniority || null,
        experience_years_min: e.experience_years_min ?? null,
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

// Ask Gemini for all the website content of ONE job.
async function enrich(j) {
    const e = j.enrichment || {};
    const facts = buildFacts(j, formatLocation(j), formatSalary(e));
    const fallbacks = {
        jobType: resolveJobType(e, j.work_mode),
        experience: resolveExperience(e),
        category: CATEGORY_LABEL[e.category] || "Software Engineering",
    };
    return generateJobContent(facts, fallbacks);
}

// ── Final document in your Job model shape ───────────────────────────────────
// Exact data comes from the API (id, slug, location, salary, applyLink, externalId, postedAt);
// all written content comes from Gemini. createdAt / updatedAt are added by mongoose (timestamps).
export function mapJob(j, id, content) {
    const company = j.company || "Unknown";
    return {
        id,
        slug: generateSlug(content.title, company, id),
        title: content.title,
        company,
        location: formatLocation(j),
        salary: formatSalary(j.enrichment),   // "Not disclosed" when the API has no salary
        salaryNote: content.salaryNote,
        jobType: content.jobType,
        experience: content.experience,
        category: content.category,
        website: content.website,
        applyLink: cleanApplyLink(j.url),
        lastDate: content.lastDate,
        aboutCompany: content.aboutCompany,
        description: content.description,
        responsibilities: content.responsibilities,
        eligibility: content.eligibility,
        requiredSkills: content.requiredSkills,
        applyIf: content.applyIf,
        dontApplyIf: content.dontApplyIf,
        selectionProcess: content.selectionProcess,
        benefits: content.benefits,
        applySteps: content.applySteps,
        imageUrl: "",
        imagePublicId: "",

        source: company,
        externalId: j.public_slug, // freehire id: identifies imported jobs and prevents duplicates
        postedAt: j.posted_at ? new Date(j.posted_at) : new Date(),
    };
}

// Tech only (the category filter already narrows the query; this is a safety net).
// Must have an apply link and must not be closed.
const isUsable = (j) =>
    j.public_slug && j.title && j.url && !j.closed_at && (!j.is_tech || j.is_tech === "tech");

const IMPORTED = { externalId: { $exists: true, $ne: null } };

// Delete imported jobs once they have been on your site for expireAfterDays.
// Your own manual jobs have no externalId, so they are never touched.
async function cleanup() {
    const cutoff = new Date(Date.now() - CONFIG.expireAfterDays * 86400000);
    const r = await Job.deleteMany({ ...IMPORTED, createdAt: { $lt: cutoff } });
    return r.deletedCount || 0;
}

// ── Main sync: find new tech jobs, let Gemini write them, save the first few ──
const EXTRA_CANDIDATES = 4;                          // spare jobs to try if Gemini fails on some
const RETRY_FAILED_AFTER_MS = 6 * 60 * 60 * 1000;    // a job Gemini failed on is skipped for 6 hours
const failedAt = new Map();                          // public_slug -> time of last Gemini failure

export async function syncFreehireJobs() {
    if (running) {
        console.log("[freehire] sync already running, skipping");
        return { skipped: true };
    }
    running = true;

    try {
        const wanted = CONFIG.jobsPerRun + EXTRA_CANDIDATES;
        const candidates = [];
        let scanned = 0;

        for (let page = 0; page < CONFIG.maxPagesPerRun && candidates.length < wanted; page++) {
            const params = new URLSearchParams({
                category: TECH_CATEGORIES.join(","),
                posted_within_days: String(CONFIG.postedWithinDays),
                sort: "posted_at",
                order: "desc",
                limit: String(CONFIG.pageSize),
                offset: String(page * CONFIG.pageSize),
            });
            if (CONFIG.countries) params.set("countries", CONFIG.countries);
            if (CONFIG.workMode) params.set("work_mode", CONFIG.workMode);

            const body = await fetchPage(params.toString());
            if (body.meta?.ignored_params?.length) {
                console.warn("[freehire] ignored params:", body.meta.ignored_params);
            }

            const all = body.data || [];
            scanned += all.length;
            const rows = all.filter(isUsable);
            const have = new Set(
                (await Job.find({ externalId: { $in: rows.map((j) => j.public_slug) } }).select("externalId").lean())
                    .map((d) => d.externalId)
            );

            for (const j of rows) {
                if (candidates.length >= wanted) break;
                const failed = failedAt.get(j.public_slug);
                if (failed && Date.now() - failed < RETRY_FAILED_AFTER_MS) continue;
                if (!have.has(j.public_slug)) candidates.push(j);
            }

            const total = body.meta?.total ?? 0;
            if (all.length < CONFIG.pageSize || (page + 1) * CONFIG.pageSize >= total) break;
            await sleep(CONFIG.delayMs);
        }

        // Gemini writes the content. A job is saved only if Gemini's answer passes validation.
        const ready = [];
        let aiSkipped = 0;
        for (const j of candidates) {
            if (ready.length >= CONFIG.jobsPerRun) break;
            try {
                ready.push({ j, content: await enrich(j) });
                failedAt.delete(j.public_slug);
            } catch (err) {
                aiSkipped++;
                failedAt.set(j.public_slug, Date.now());
                console.error(`[freehire] skipped "${j.public_slug}": ${err.message}`);
            }
        }

        let inserted = 0;
        if (ready.length) {
            // oldest of the batch gets the lower id, so the newest posting ends up with the highest id (top of your list)
            const firstId = await nextJobId();
            const docs = ready.slice().reverse().map((r, i) => mapJob(r.j, firstId + i, r.content));
            try {
                const res = await Job.insertMany(docs, { ordered: false });
                inserted = res.length;
            } catch (err) {
                // e.g. a slug clash: log it, keep the rest
                inserted = err.insertedDocs?.length ?? 0;
                console.error("[freehire] insert had errors:", err.writeErrors?.length || err.message);
            }
        }

        const expired = await cleanup();
        console.log(`[freehire] checked ${scanned} job(s), added ${inserted}, skipped ${aiSkipped} (Gemini), removed ${expired} expired`);
        return { scanned, inserted, aiSkipped, expired };
    } catch (err) {
        console.error("[freehire] sync failed:", err.message);
        return { error: err.message };
    } finally {
        running = false;
    }
}