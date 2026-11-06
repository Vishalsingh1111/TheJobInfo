import { GoogleGenAI } from "@google/genai";
import { JOB_CONTENT_SCHEMA, SYSTEM_INSTRUCTION, buildAiUserPrompt } from "../aiPrompt.js";

const MODEL = () => process.env.GEMINI_MODEL || "gemini-2.5-flash";

// ── Fixed options (⚠️ edit to match your admin form / frontend filters) ──────
// jobType is the dropdown from your admin form. "experience" is NOT a dropdown: it is years ("0-2 years").
export const JOB_TYPES = ["Freshers/ Experienced", "Freshers", "Experienced", "Internship", "Part-Time"];
export const CATEGORIES = ["Software Engineering", "IT", "Analyst"];

const MAX_DESCRIPTION_CHARS = 12000;
const MAX_ATTEMPTS = 3;
const GROQ_MODEL = () => process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

// The client is created on first use (not at import time) so dotenv has already loaded your .env.
let client = null;
function getClient() {
    if (client) return client;
    if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is missing in .env");
    client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    return client;
}
export function _setClientForTests(fake) { client = fake; } // used only by tests
let groqClient = null;
async function getGroqClient() {
    if (groqClient) return groqClient;
    if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY is missing in .env");
    const { default: OpenAI } = await import("openai");
    groqClient = new OpenAI({ apiKey: process.env.GROQ_API_KEY, baseURL: "https://api.groq.com/openai/v1" });
    return groqClient;
}
export function _setGroqClientForTests(fake) { groqClient = fake; }
export const _setGrokClientForTests = _setGroqClientForTests;
export function _resetForTests() { geminiBlockedUntil = 0; groqBlockedUntil = 0; }

// When a provider says "limit reached", we stop calling it for a while and use the other one straight away.
let geminiBlockedUntil = 0;
let groqBlockedUntil = 0;
function parseRetryMs(msg) {
    const m = String(msg).match(/retry (?:in|after)\s*(?:(\d+)h)?\s*(?:(\d+)m)?\s*(?:(\d+(?:\.\d+)?)s)?/i);
    if (!m || (!m[1] && !m[2] && !m[3])) return null;
    return ((+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0)) * 1000;
}
const isRateLimit = (err) =>
    err?.status === 429 || err?.code === 429 || /\b429\b|rate limit|quota|RESOURCE_EXHAUSTED/i.test(String(err?.message));
const blockFor = (err) =>
    Date.now() + Math.min(Math.max(parseRetryMs(err?.message) ?? (/per day|daily/i.test(String(err?.message)) ? 3600e3 : 60e3), 30e3), 24 * 3600e3);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const escapeRegex = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ── Build the facts we send (only job data, no secrets) ──────────────────────
function buildPrompt(facts, validationError = "") {
    const desc = String(facts.description_text || "").slice(0, MAX_DESCRIPTION_CHARS);
    return buildAiUserPrompt({ ...facts, description_text: desc }, validationError);
}

// ── Response cleaning helpers ────────────────────────────────────────────────
function extractJson(text) {
    if (!text) throw new Error("The AI returned an empty response");
    let t = String(text).trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
    const start = t.indexOf("{");
    const end = t.lastIndexOf("}");
    if (start === -1 || end <= start) throw new Error("The AI response has no JSON object");
    return JSON.parse(t.slice(start, end + 1));
}

const stripTags = (s) => String(s).replace(/<[^>]*>/g, " ").replace(/[*_`#]{1,3}(?=\S)/g, "");
const cleanLine = (s) => stripTags(s).replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, " ").trim();

// Sentences that say "this is missing / check the official page" are removed, whatever the model wrote.
const MISSING_INFO = new RegExp(
    [
        String.raw`\bnot\s+(?:been\s+)?(?:explicitly\s+|clearly\s+|specifically\s+|publicly\s+|yet\s+|always\s+)*(?:mentioned|provided|available|stated|specified|disclosed|confirmed|listed|included|shared|given|indicated|detailed|defined|known)\b`,
        String.raw`\b(?:does|do|did)\s+not\s+(?:specify|mention|state|list|provide|include|disclose|say)\b`,
        String.raw`\bno\s+(?:specific\s+|further\s+|additional\s+)?(?:details|information)\s+(?:is|are|was|were)\s+(?:available|provided|given)\b`,
        String.raw`\b(?:unavailable|not applicable)\b`,
        String.raw`\b(?:check|verify|confirm|refer\s+to)\b[^.!?]{0,80}\b(?:official|job\s+(?:page|listing|posting|description)|company\s+(?:website|page))\b`,
    ].join("|"),
    "i"
);
const scrubSentences = (text) =>
    String(text).split(/(?<=[.!?])\s+/).filter((s) => s.trim() && !MISSING_INFO.test(s)).join(" ").trim();

function toParagraphs(v) {
    if (v == null) return "";
    const arr = Array.isArray(v) ? v : String(v).split(/\n{2,}/);
    return arr
        .map((p) => scrubSentences(stripTags(p).replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim()))
        .filter(Boolean)
        .join("\n\n");
}

// list fields -> items separated by a blank line
function toList(v) {
    if (v == null) return "";
    const arr = Array.isArray(v) ? v : String(v).split(/\n+/);
    return arr
        .map((x) => scrubSentences(cleanLine(String(x).replace(/^\s*(?:[-•*]|\d+[.)])\s*/, ""))))
        .filter(Boolean)
        .join("\n\n");
}

function toArray(v) {
    const values = Array.isArray(v) ? v : [];
    return values.map((value) => cleanLine(value)).filter(Boolean);
}

function toFaqs(v) {
    if (!Array.isArray(v)) return [];
    return v.map((item) => ({
        question: cleanLine(item?.question || ""),
        answer: cleanLine(item?.answer || ""),
    })).filter((item) => item.question && item.answer &&
        !MISSING_INFO.test(item.question) && !MISSING_INFO.test(item.answer));
}

function toPrepGuide(v) {
    const guide = v && typeof v === "object" ? v : {};
    return {
        overview: toParagraphs(guide.overview),
        topicsToRevise: toArray(guide.topicsToRevise),
        expectedRounds: toArray(guide.expectedRounds),
        projectIdeas: toArray(guide.projectIdeas),
        commonMistakes: toArray(guide.commonMistakes),
        plan30Days: toArray(guide.plan30Days),
    };
}

function pickOption(value, options, fallback) {
    const norm = (s) => String(s).toLowerCase().replace(/[^a-z]/g, "");
    const hit = options.find((o) => norm(o) === norm(value ?? ""));
    return hit || fallback;
}

function cleanWebsite(v) {
    if (!v) return "";
    const host = String(v).trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[/?#\s]/)[0];
    return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host) ? host : "";
}

// Title = the job role only ("Software Architect – Android IVI"), never "Company Recruitment 2026 | Role | Candidates".
export function cleanTitle(raw, company = "", original = "") {
    let s = cleanLine(raw || "");
    if (s.includes("|")) {
        const parts = s.split("|").map((p) => p.trim()).filter(Boolean);
        s = parts.find((p) => !/recruitment|hiring|candidates?|freshers?|experienced|off campus|drive|\b20\d\d\b/i.test(p)) || parts[0] || "";
    }
    if (company) {
        s = s.replace(new RegExp(`^${escapeRegex(company)}\\s+(?:recruitment|hiring)\\s*(?:20\\d\\d)?\\s*[|\\-–—:]*\\s*`, "i"), "");
    }
    s = s
        .replace(/\b(?:recruitment|hiring)\s*20\d\d\b/gi, "")
        .replace(/\s*\((?:[mfwdx][\s/]*){2,4}\)\s*/gi, " ")   // (m/f/d), (f/m/x) ...
        .replace(/\s{2,}/g, " ")
        .replace(/^[\s|–—:-]+|[\s|–—:-]+$/g, "")
        .trim();
    return s || cleanLine(original);
}

// experience = years only: "Fresher", "1 year", "0-2 years", "3-5 years", "5+ years"
export function normalizeExperience(v, fallback) {
    const s = String(v ?? "").toLowerCase().replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();
    if (/^(fresher|freshers|0 years?|no experience)$/.test(s)) return "Fresher";
    let m = s.match(/^(\d{1,2})\s*-\s*(\d{1,2})\s*years?$/);
    if (m && Number(m[2]) > Number(m[1])) return `${m[1]}-${m[2]} years`;
    m = s.match(/^(\d{1,2})\s*\+\s*years?$/);
    if (m) return `${Number(m[1])}+ years`;
    m = s.match(/^(\d{1,2})\s*years?$/);
    if (m) return `${Number(m[1])} ${Number(m[1]) === 1 ? "year" : "years"}`;
    return fallback;
}

// Validate + normalise what Gemini returned. `fb` holds values computed from the API data (used when the model's value is invalid or empty).
export function normalizeContent(raw, fb) {
    const experience = normalizeExperience(raw.experience, fb.experience);
    const lastDate = cleanLine(raw.lastDate || "");
    const out = {
        title: cleanTitle(raw.title, fb.company, fb.role),
        jobType: pickOption(raw.jobType, JOB_TYPES, fb.jobType),
        experience,
        category: pickOption(raw.category, CATEGORIES, fb.category),
        website: cleanWebsite(raw.website),
        lastDate: !lastDate || MISSING_INFO.test(lastDate) ? "" : lastDate,
        summary: toParagraphs(raw.summary),
        prepGuide: toPrepGuide(raw.prepGuide),
        salaryNote: toParagraphs(raw.salaryNote),
        aboutCompany: toParagraphs(raw.aboutCompany),
        description: toParagraphs(raw.description),
        responsibilities: toList(raw.responsibilities),
        eligibility: toList(raw.eligibility),
        requiredSkills: toList(raw.requiredSkills),
        applyIf: toList(raw.applyIf),
        selectionProcess: toList(raw.selectionProcess),
        benefits: toList(raw.benefits),
        applySteps: toList(raw.applySteps),
        prepTips: toArray(raw.prepTips),
        faqs: toFaqs(raw.faqs),
    };

    // If cleaning removed everything from a softer field, fill it with a safe, general line built from known facts.
    const company = fb.company || "the company";
    const role = out.title || fb.role || "this role";
    const where = fb.location ? ` in ${fb.location}` : "";
    if (!out.salaryNote && fb.salary && fb.salary !== "Not disclosed") out.salaryNote = `The source posting lists the salary as ${fb.salary}.`;
    if (!out.aboutCompany && fb.company && fb.role) out.aboutCompany = `${company} has posted an opening for ${role}${where}.`;
    if (!out.applyIf) out.applyIf = "You have the skills and experience listed on this page.\n\nYou are interested in working as " + role + " at " + company + ".";
    if (!out.selectionProcess) out.selectionProcess = "Typical process (not confirmed by the employer): application review, a role-related discussion, and a possible HR conversation.";

    // Fields a job page cannot live without. If Gemini left one empty, the job is rejected and retried later.
    const required = ["title", "description", "summary", "responsibilities", "requiredSkills", "applySteps"];
    const missing = required.filter((k) => !out[k]);
    const listItems = (value) => String(value || "").split(/\n+/).map((part) => part.trim()).filter(Boolean);
    const uniqueItems = (items) => new Set(items.map((item) => item.toLowerCase())).size === items.length;
    const hasPlaceholder = (value) => /\blorem(?: ipsum)?\b|\bn\/a\b/i.test(String(value || ""));
    const summarySentences = out.summary.split(/[.!?]+/).filter((part) => part.trim()).length;
    if (out.summary.length < 120 || summarySentences < 2 || summarySentences > 3) {
        missing.push("summary (2-3 sentences, at least 120 characters)");
    }
    if (listItems(out.responsibilities).length < 4) missing.push("at least 4 responsibilities");
    if (listItems(out.requiredSkills).length < 3) missing.push("at least 3 requiredSkills");
    if (out.faqs.length > 6) missing.push("faqs (at most 6)");
    if (out.faqs.some((faq) => faq.question.length < 8 || !faq.answer)) {
        missing.push("FAQ questions and answers");
    }
    if (!uniqueItems(out.faqs.map((faq) => faq.question))) missing.push("duplicate FAQ questions");
    const arrays = [
        out.prepTips,
        out.prepGuide.topicsToRevise,
        out.prepGuide.expectedRounds,
        out.prepGuide.projectIdeas,
        out.prepGuide.commonMistakes,
        out.prepGuide.plan30Days,
        ...[out.responsibilities, out.eligibility, out.requiredSkills, out.selectionProcess, out.benefits, out.applySteps].map(listItems),
    ];
    if (arrays.some((items) => !uniqueItems(items))) missing.push("duplicate list items");
    if (hasPlaceholder(JSON.stringify(out))) missing.push("placeholder text");
    if (missing.length) throw new Error(`The AI response is missing: ${missing.join(", ")}`);
    return out;
}

export function createFactBasedFaqs(facts = {}) {
    const faqs = [];
    if (facts.title) faqs.push({ question: "What role is this listing for?", answer: `The listed role is ${facts.title}.` });
    if (facts.company) faqs.push({ question: "Which company posted this role?", answer: `The listing names ${facts.company}.` });
    if (facts.location) faqs.push({ question: "Where is the role located?", answer: `The listed location is ${facts.location}.` });
    if (facts.employment_type) faqs.push({ question: "What type of job is this?", answer: `The posting identifies this as ${String(facts.employment_type).replace(/_/g, " ")}.` });
    if (facts.experience_years_min != null || facts.experience_years_max != null) {
        faqs.push({ question: "What experience does the posting require?", answer: `The posting lists ${facts.experience_years_min ?? 0} to ${facts.experience_years_max ?? facts.experience_years_min} years of experience.` });
    }
    if (facts.salary_text && facts.salary_text !== "Not disclosed") {
        faqs.push({ question: "What salary does the posting list?", answer: `The listed salary is ${facts.salary_text}.` });
    }
    if (facts.applyLink) {
        faqs.push({ question: "How do I apply for this role?", answer: "Use the Apply Now button to open the application link provided with this listing." });
    }
    return toFaqs(faqs).slice(0, 6);
}

function buildBasicContent(facts, fallbacks) {
    const title = cleanTitle(facts.title, facts.company, facts.title);
    const company = cleanLine(facts.company || "");
    const location = cleanLine(facts.location || "");
    const sourceDescription = toParagraphs(facts.description_text);
    const description = sourceDescription || `This listing is for ${title}${company ? ` at ${company}` : ""}${location ? ` in ${location}` : ""}. Review the employer's application page for the complete role details.`;
    const summary = `This listing is for ${title}${company ? ` at ${company}` : ""}${location ? ` in ${location}` : ""}. ${sourceDescription || "The source provides the role details and an application link for candidates to review."}`;
    const skills = toArray(facts.skills);

    return {
        title,
        jobType: fallbacks.jobType,
        experience: fallbacks.experience,
        category: fallbacks.category,
        website: "",
        lastDate: "",
        salaryNote: facts.salary_text && facts.salary_text !== "Not disclosed" ? `The source posting lists the salary as ${facts.salary_text}.` : "",
        summary,
        prepGuide: toPrepGuide(null),
        prepTips: [],
        faqs: createFactBasedFaqs(facts),
        aboutCompany: "",
        description,
        responsibilities: "",
        eligibility: "",
        requiredSkills: skills.join("\n\n"),
        applyIf: "",
        selectionProcess: "",
        benefits: "",
        applySteps: [
            "Review the role details and requirements in the listing.",
            "Select Apply Now to open the application link.",
            "Complete the requested information on the application page.",
            "Submit your application through that page.",
        ].join("\n\n"),
        contentProvider: "basic",
    };
}

// ── Gemini writes the core listing; Groq is the fallback for enrichment only ────
function extractGeminiText(result) {
    if (!result) return "";
    if (typeof result === "string") return result;
    if (typeof result?.output_text === "string") return result.output_text;
    if (Array.isArray(result?.candidates)) {
        return result.candidates
            .map((candidate) => candidate?.content?.parts || [])
            .flat()
            .map((part) => part?.text || "")
            .join("\n")
            .trim();
    }
    if (typeof result?.text === "string") return result.text;
    return JSON.stringify(result);
}

async function askGemini(facts, validationError) {
    const prompt = buildPrompt(facts, validationError);
    const geminiClient = getClient();

    if (geminiClient?.models?.generateContent) {
        const response = await geminiClient.models.generateContent({
            model: MODEL(),
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: JOB_CONTENT_SCHEMA,
            },
        });
        return extractGeminiText(response);
    }

    const interaction = await geminiClient.interactions.create({
        model: MODEL(),
        system_instruction: SYSTEM_INSTRUCTION,
        input: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: JOB_CONTENT_SCHEMA,
        },
    });
    return extractGeminiText(interaction);
}

export async function generateJobExtras(facts) {
    if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY is missing; using source-based FAQs without Groq preparation content");
    if (Date.now() < groqBlockedUntil) throw new Error("Groq is rate-limited; using source-based FAQs without Groq preparation content");

    let lastErr = new Error("Groq did not return valid preparation content");
    for (let attempt = 1; attempt <= 2; attempt++) {
        try {
            const completion = await (await getGroqClient()).chat.completions.create({
                model: GROQ_MODEL(),
                messages: [
                    { role: "system", content: SYSTEM_INSTRUCTION },
                    { role: "user", content: buildPrompt(facts) },
                ],
                response_format: { type: "json_object" },
                max_completion_tokens: 5000,
                temperature: 0.3,
            });
            const choice = completion.choices?.[0];
            const text = choice?.message?.content;
            if (!text || !String(text).trim()) {
                throw new Error(`Groq returned an empty response (finish_reason: ${choice?.finish_reason ?? "none"})`);
            }
            const raw = extractJson(text);
            const prepGuide = toPrepGuide(raw.prepGuide);
            const prepTips = toArray(raw.prepTips);
            const faqs = toFaqs(raw.faqs);
            if (prepGuide.topicsToRevise.length < 4 || prepTips.length < 3) {
                throw new Error("Groq returned incomplete job-preparation content");
            }
            return {
                prepGuide,
                prepTips,
                faqs: faqs.length ? faqs.slice(0, 6) : createFactBasedFaqs(facts),
            };
        } catch (error) {
            lastErr = error;
            if (isRateLimit(error)) {
                groqBlockedUntil = blockFor(error);
                throw error;
            }
            const status = error?.status ?? error?.code;
            if (status && status < 500 || attempt === 2) break;
            await sleep(1000 * attempt);
        }
    }
    throw lastErr;
}

async function askGroqJobContent(facts, validationError = "") {
    const completion = await (await getGroqClient()).chat.completions.create({
        model: GROQ_MODEL(),
        messages: [
            { role: "system", content: SYSTEM_INSTRUCTION },
            { role: "user", content: buildPrompt(facts, validationError) },
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 5000,
        temperature: 0.3,
    });
    const choice = completion.choices?.[0];
    const text = choice?.message?.content;
    if (!text || !String(text).trim()) {
        throw new Error(`Groq returned an empty response (finish_reason: ${choice?.finish_reason ?? "none"})`);
    }
    return text;
}

export async function generateJobContent(facts, fallbacks) {
    const fb = {
        ...fallbacks,
        company: facts.company,
        role: facts.title,
        location: facts.location,
        salary: facts.salary_text,
        skills: facts.skills,
    };

    if (!process.env.GEMINI_API_KEY || Date.now() < geminiBlockedUntil) {
        console.warn(`[ai] Gemini unavailable; posting source-based details${process.env.GEMINI_API_KEY ? " while its rate limit cools down" : " (GEMINI_API_KEY is missing)"}`);
        return buildBasicContent(facts, fb);
    }

    let validationFeedback = "";
    let lastErr = new Error("Gemini did not return valid job content");
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            const content = normalizeContent(extractJson(await askGemini(facts, validationFeedback)), fb);
            content.contentProvider = "gemini";
            content.aiStatus = "ok";
            content.aiModelUsed = MODEL();
            content.aiAttempts = attempt;
            content.aiGeneratedAt = new Date();
            console.log(`[ai] core job content written by Gemini (${MODEL()})`);
            return content;
        } catch (err) {
            lastErr = err;
            validationFeedback = `Your previous JSON failed validation: ${err.message}. Return corrected strict JSON satisfying every required core field and minimum length.`;
            console.warn(`[gemini] attempt ${attempt}/${MAX_ATTEMPTS} failed: ${err.message}`);
            if (isRateLimit(err)) {
                geminiBlockedUntil = blockFor(err);
                break;
            }
            const status = err?.status ?? err?.code;
            const retryable = !status || status >= 500;
            if (!retryable || attempt === MAX_ATTEMPTS) break;
            await sleep(2000 * attempt);
        }
    }
    if (process.env.GROQ_API_KEY && Date.now() >= groqBlockedUntil) {
        let groqFeedback = "";
        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            try {
                const content = normalizeContent(extractJson(await askGroqJobContent(facts, groqFeedback)), fb);
                content.contentProvider = "groq";
                content.aiStatus = "ok";
                content.aiModelUsed = GROQ_MODEL();
                content.aiAttempts = attempt;
                content.aiGeneratedAt = new Date();
                console.warn(`[ai] Gemini failed; used Groq fallback for ${facts.title}`);
                return content;
            } catch (err) {
                groqFeedback = `Your previous JSON failed validation: ${err.message}. Return corrected strict JSON satisfying every required core field and minimum length.`;
                console.warn(`[groq] attempt ${attempt}/${MAX_ATTEMPTS} failed: ${err.message}`);
                if (isRateLimit(err)) {
                    groqBlockedUntil = blockFor(err);
                    break;
                }
                const status = err?.status ?? err?.code;
                const retryable = !status || status >= 500;
                if (!retryable || attempt === MAX_ATTEMPTS) break;
                await sleep(2000 * attempt);
            }
        }
    }

    console.warn(`[ai] Gemini core generation failed; posting source-based details: ${lastErr.message}`);
    const fallback = buildBasicContent(facts, fb);
    fallback.aiStatus = "failed";
    fallback.aiModelUsed = "basic";
    fallback.aiAttempts = MAX_ATTEMPTS;
    fallback.aiGeneratedAt = new Date();
    return fallback;
}