const CITY_ALIASES = new Map([
    ["bangalore", "Bengaluru"],
    ["bengaluru", "Bengaluru"],
    ["gurgaon", "Gurugram"],
    ["gurugram", "Gurugram"],
    ["new delhi", "Delhi NCR"],
    ["delhi", "Delhi NCR"],
    ["ncr", "Delhi NCR"],
    ["noida", "Noida"],
    ["greater noida", "Noida"],
    ["bombay", "Mumbai"],
    ["mumbai", "Mumbai"],
    ["madras", "Chennai"],
    ["chennai", "Chennai"],
    ["calcutta", "Kolkata"],
    ["kolkata", "Kolkata"],
    ["pune", "Pune"],
    ["hyderabad", "Hyderabad"],
    ["ahmedabad", "Ahmedabad"],
]);

export function normalizeCity(value = "") {
    const input = String(value).trim();
    if (!input) return "Other";
    if (/\bremote\b|work from home|\bwfh\b/i.test(input)) return "Remote";
    for (const [alias, city] of CITY_ALIASES) {
        if (new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(input)) {
            return city;
        }
    }
    return "Other";
}

export function normalizeJobKeyPart(value = "") {
    return String(value).normalize("NFKD").toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, "");
}

function normalizeJobTitle(value = "") {
    return String(value)
        .toLowerCase()
        .replace(/\b20\d{2}\b/g, " ")
        .replace(/[^a-z0-9]+/g, " ")
        .replace(/\b(?:job|jobs|opening|position|vacancy|recruitment|hiring|off campus|campus drive|freshers|fresher|experienced)\b/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

function canonicalApplyLink(value = "") {
    try {
        const url = new URL(value);
        url.hash = "";
        for (const key of [...url.searchParams.keys()]) {
            if (/^(utm_.+|ref|source)$/i.test(key)) url.searchParams.delete(key);
        }
        url.searchParams.sort();
        return `${url.origin}${url.pathname.replace(/\/+$/, "")}${url.search}`.toLowerCase();
    } catch {
        return "";
    }
}

export function areDuplicateJobListings(first = {}, second = {}) {
    if (first.externalId && second.externalId && String(first.externalId) === String(second.externalId)) return true;

    const sameCompany = normalizeJobKeyPart(first.company) === normalizeJobKeyPart(second.company);
    if (!sameCompany || !normalizeJobKeyPart(first.company)) return false;

    const firstLink = canonicalApplyLink(first.applyLink);
    const secondLink = canonicalApplyLink(second.applyLink);
    const sameLink = firstLink && secondLink && firstLink === secondLink;

    const firstTitle = normalizeJobTitle(first.title);
    const secondTitle = normalizeJobTitle(second.title);
    if (!firstTitle || !secondTitle) return false;
    if (first.dedupeKey && second.dedupeKey && first.dedupeKey === second.dedupeKey) return true;

    const firstCity = normalizeJobKeyPart(first.city || first.location || "Other");
    const secondCity = normalizeJobKeyPart(second.city || second.location || "Other");

    const seniority = /\b(?:senior|junior|lead|staff|principal|manager|intern|trainee|graduate|associate|architect|[123])\b/g;
    const firstModifiers = firstTitle.match(seniority) || [];
    const secondModifiers = secondTitle.match(seniority) || [];
    if (firstModifiers.join("|") !== secondModifiers.join("|")) return false;

    const firstTokens = new Set(firstTitle.match(/[a-z0-9]+/g) || []);
    const secondTokens = new Set(secondTitle.match(/[a-z0-9]+/g) || []);
    const overlap = [...firstTokens].filter((token) => secondTokens.has(token)).length;
    const jaccard = overlap / new Set([...firstTokens, ...secondTokens]).size;
    const containment = overlap / Math.min(firstTokens.size, secondTokens.size);
    const similarTitle = firstTitle === secondTitle || (jaccard >= 0.65 && containment >= 0.85);
    return similarTitle && (sameLink || firstCity === secondCity);
}

export function createDedupeKey({ company, title, city, location, applyLink, externalId }) {
    const roleCity = normalizeCity(city || location);
    return [company, title, roleCity].map(normalizeJobKeyPart).join(":");
}

export function deriveJobLevel(job = {}) {
    const typeText = String(job.jobType || "").toLowerCase();
    const text = `${job.title || ""} ${job.jobType || ""} ${job.employment_type || ""} ${job.seniority || ""}`.toLowerCase();
    if (/\bintern(ship)?\b|\bfellowship\b/.test(text)) return "internship";
    if (/fresher/.test(typeText) && /experienced/.test(typeText)) return "dual";

    let min = Number(job.experience_years_min);
    let max = Number(job.experience_years_max);
    const range = String(job.experience || "").match(/(\d+)\s*[-–]\s*(\d+)\s*(?:years?|yrs?)?/i);
    if (range) {
        min = Number(range[1]);
        max = Number(range[2]);
    } else {
        const minimum = String(job.experience || "").match(/(\d+)\s*\+/);
        if (minimum) min = Number(minimum[1]);
    }
    if (Number.isFinite(min) && min >= 2) return "experienced";
    if (Number.isFinite(max) && max <= 1) return "fresher";
    if (Number.isFinite(min) && min <= 1 && Number.isFinite(max) && max >= 2) return "dual";
    if (/\b(senior|staff|principal|lead|manager|experienced|associate)\b/.test(text)) return "experienced";
    if (/\b(fresher|graduate|junior|entry[- ]level|trainee)\b/.test(text)) return "fresher";
    return null;
}

export function withDerivedJobLevel(job = {}) {
    const level = job.level || deriveJobLevel(job);
    return level ? { ...job, level } : job;
}

export function selectPreferredJobLevel(history, fresherRatio = 0.8) {
    const classified = (Array.isArray(history) ? history : [])
        .map((job) => typeof job === "string" ? job : job?.level)
        .filter((level) => level === "fresher" || level === "internship" || level === "experienced");
    if (!classified.length) return "fresher";
    const fresherShare = classified.filter((level) => level === "fresher" || level === "internship").length / classified.length;
    return fresherShare < fresherRatio ? "fresher" : "experienced";
}

export function createCandidateSearchPlans(preferredLevel, publishMode = "popular_only", popularFirst = true) {
    if (!["fresher", "experienced"].includes(preferredLevel)) {
        throw new Error("Preferred job level must be fresher or experienced");
    }
    const seniority = {
        fresher: "intern,junior",
        experienced: "middle,senior,lead,staff,principal",
    };
    const otherLevel = preferredLevel === "fresher" ? "experienced" : "fresher";
    const popularOnly = publishMode !== "all";
    const hasPopular = popularFirst || popularOnly;
    return [
        hasPopular && {
            label: `popular company, ${preferredLevel}`,
            seniority: seniority[preferredLevel],
            popular: true,
            targetLevel: preferredLevel,
        },
        {
            label: `any company, ${preferredLevel}`,
            seniority: seniority[preferredLevel],
            popular: false,
            targetLevel: preferredLevel,
        },
        {
            label: `mix fallback: popular company, ${otherLevel}`,
            seniority: seniority[otherLevel],
            popular: true,
            targetLevel: otherLevel,
            mixFallback: true,
        },
        {
            label: `mix fallback: any company, ${otherLevel}`,
            seniority: seniority[otherLevel],
            popular: false,
            targetLevel: otherLevel,
            mixFallback: true,
        },
    ].filter(Boolean);
}

export function deriveWorkMode(value = "") {
    const text = String(value).toLowerCase();
    if (/remote|work from home|\bwfh\b/.test(text)) return "Remote";
    if (/hybrid/.test(text)) return "Hybrid";
    if (/onsite|on-site|in office|in-office/.test(text)) return "Onsite";
    return undefined;
}

export function validateImportedJob(job, now = Date.now()) {
    if (!String(job.company || "").trim()) return "missing company";
    if (!String(job.title || "").trim()) return "missing title";
    if (!String(job.applyLink || "").trim()) return "missing apply link";
    if (!job.level) return "could not derive job level";
    try {
        const url = new URL(job.applyLink);
        if (!["http:", "https:"].includes(url.protocol)) return "invalid apply link";
    } catch {
        return "invalid apply link";
    }
    if (job.is_tech === false || (job.is_tech && job.is_tech !== "tech")) return "not a tech role";
    const words = (value) => String(value || "").trim().split(/\s+/).filter(Boolean).length;
    const countItems = (value) => Array.isArray(value)
        ? value.length
        : String(value || "").split(/\n+/).map((part) => part.trim()).filter(Boolean).length;
    if (job.contentProvider !== "basic") {
        if (words(job.summary) < 55 || words(job.summary) > 80) return "AI summary must be 55-80 words";
        if (job.aiStatus !== "ok") return "AI generation did not succeed";
        if (!String(job.aiModelUsed || "").trim()) return "AI model is missing";
        if (String(job.aiError || "").trim()) return "AI generation recorded an error";
        if (!job.prepGuide || !String(job.prepGuide.overview || "").trim() || countItems(job.prepGuide.topicsToRevise) < 4) {
            return "AI preparation guide is incomplete";
        }
        if (countItems(job.responsibilities) > 0 && countItems(job.responsibilities) < 3) {
            return "fewer than 3 responsibilities";
        }
    }
    if (/lorem ipsum|insert (?:text|description)|placeholder/i.test(job.description || "")) return "placeholder description";
    if (job.contentProvider !== "basic") {
        if (!Array.isArray(job.faqs) || job.faqs.length < 4 || job.faqs.length > 6) return "FAQ list must contain 4-6 items";
        if (job.faqs.some((faq) => !String(faq.question || "").trim() || words(faq.answer) < 15 || words(faq.answer) > 70)) {
            return "FAQ answer must contain 15-70 words";
        }
    }
    if (job.postedAt) {
        const postedAt = new Date(job.postedAt).getTime();
        if (!Number.isFinite(postedAt) || postedAt < now - 48 * 60 * 60 * 1000) return "posting older than 48 hours";
    }
    return null;
}

export function parseJobListPagination(query = {}) {
    if (query.page === undefined && query.limit === undefined) return null;
    const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(query.limit, 10) || 20));
    return { page, limit, skip: (page - 1) * limit };
}

export function parseArrayField(value) {
    if (Array.isArray(value)) return value;
    if (typeof value !== "string" || !value.trim()) return [];
    try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed;
    } catch {
        // Accept newline-delimited values from simple admin forms.
    }
    return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
}

export function parseObjectField(value) {
    if (value && typeof value === "object" && !Array.isArray(value)) return value;
    if (typeof value !== "string" || !value.trim()) return undefined;
    try {
        const parsed = JSON.parse(value);
        return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : undefined;
    } catch (error) {
        throw new Error("Expected a JSON object");
    }
}

export function parseFaqs(value) {
    return parseArrayField(value).map((item) => {
        if (typeof item === "string") {
            const separator = item.indexOf("|");
            if (separator < 0) return null;
            return {
                question: item.slice(0, separator).trim(),
                answer: item.slice(separator + 1).trim(),
            };
        }
        if (!item || typeof item !== "object") return null;
        return {
            question: String(item.question || "").trim(),
            answer: String(item.answer || "").trim(),
        };
    }).filter((item) => item?.question && item.answer);
}
