import test from "node:test";
import assert from "node:assert/strict";
import {
    createDedupeKey,
    deriveJobLevel,
    normalizeCity,
    areDuplicateJobListings,
    parseArrayField,
    parseFaqs,
    parseJobListPagination,
    validateImportedJob,
    withDerivedJobLevel,
} from "../Utils/jobMetadata.js";

test("dedupe key normalizes title, company, and city", () => {
    assert.equal(
        createDedupeKey({ company: "Acme, Inc.", title: "Software Engineer!", city: "Bangalore" }),
        createDedupeKey({ company: "ACME INC", title: "software engineer", city: "Bengaluru" })
    );
});

test("duplicate detection catches small title and tracking-link variations without merging different roles", () => {
    const first = {
        company: "Acme, Inc.",
        title: "Software Engineer - Freshers 2026",
        city: "Bengaluru",
        applyLink: "https://jobs.example.com/role/123?utm_source=freehire",
    };
    assert.equal(areDuplicateJobListings(first, {
        company: "ACME INC",
        title: "Software Engineer Opening",
        city: "Bengaluru",
        applyLink: "https://jobs.example.com/role/123",
    }), true);
    assert.equal(areDuplicateJobListings(first, {
        company: "Acme Inc",
        title: "Senior Software Engineer",
        city: "Bengaluru",
        applyLink: "https://jobs.example.com/role/456",
    }), false);
    assert.equal(areDuplicateJobListings(first, {
        company: "Acme Inc",
        title: "Software Engineer",
        city: "Chennai",
        applyLink: "https://jobs.example.com/role/789",
    }), false);
});

test("duplicate detection normalizes off-campus and hiring title suffixes", () => {
    const listing = {
        company: "Example",
        title: "Software Engineer",
        city: "Bengaluru",
    };
    assert.equal(areDuplicateJobListings(listing, {
        ...listing,
        title: "Software Engineer - Off-Campus Hiring",
    }), true);
});

test("level derives internships, experience bands, and role keywords", () => {
    assert.equal(deriveJobLevel({ title: "Software Intern" }), "internship");
    assert.equal(deriveJobLevel({ experience_years_min: 2 }), "experienced");
    assert.equal(deriveJobLevel({ experience_years_min: 0, experience_years_max: 1 }), "fresher");
    assert.equal(deriveJobLevel({ experience_years_min: 0, experience_years_max: 3 }), "dual");
    assert.equal(deriveJobLevel({ title: "Graduate Trainee" }), "fresher");
    assert.equal(deriveJobLevel({ title: "Analyst" }), null);
});

test("legacy job levels are derived without replacing an existing level", () => {
    assert.equal(withDerivedJobLevel({ title: "Software Engineer Intern" }).level, "internship");
    assert.equal(withDerivedJobLevel({ title: "Product Analyst", experience: "3-5 years" }).level, "experienced");
    assert.equal(withDerivedJobLevel({ title: "Software Engineer", jobType: "Fresher" }).level, "fresher");
    assert.equal(withDerivedJobLevel({ title: "Intern", level: "experienced" }).level, "experienced");
});

test("city aliases normalize consistently", () => {
    assert.equal(normalizeCity("Bangalore, Karnataka"), "Bengaluru");
    assert.equal(normalizeCity("Gurgaon"), "Gurugram");
    assert.equal(normalizeCity("Work from home"), "Remote");
    assert.equal(normalizeCity("Unknown town"), "Other");
});

test("import quality gate rejects invalid apply links, old jobs, and placeholder content", () => {
    const base = {
        company: "Example",
        title: "Engineer",
        applyLink: "https://example.com/careers",
        description: "A useful role description ".repeat(8),
        summary: "A useful role summary for this role and its intended candidates. It explains the work and who may be suited to it in clear detail.",
        responsibilities: "Build features\nReview code\nWrite tests\nFix defects",
        requiredSkills: "JavaScript\nReact\nGit",
        prepGuide: { topicsToRevise: ["JavaScript", "React", "HTTP", "Testing"] },
        faqs: [{ question: "How to apply?", answer: "Use the application link." }],
        postedAt: new Date(),
        is_tech: "tech",
        level: "fresher",
    };
    assert.equal(validateImportedJob(base), null);
    assert.equal(validateImportedJob({ ...base, faqs: [] }), null);
    assert.equal(validateImportedJob({ ...base, applyLink: "javascript:alert(1)" }), "invalid apply link");
    assert.equal(validateImportedJob({ ...base, description: "placeholder content" }), "AI description is too short");
    assert.equal(validateImportedJob({ ...base, postedAt: new Date(Date.now() - 49 * 60 * 60 * 1000) }), "posting older than 48 hours");
    assert.equal(validateImportedJob({
        ...base,
        contentProvider: "basic",
        summary: "Source-based role details.",
        description: "Source posting description.",
        responsibilities: "",
        requiredSkills: "",
        prepGuide: {},
        faqs: [],
    }), null);
});

test("job pagination is backward compatible and clamped", () => {
    assert.equal(parseJobListPagination({}), null);
    assert.deepEqual(parseJobListPagination({ page: "3", limit: "25" }), { page: 3, limit: 25, skip: 50 });
    assert.deepEqual(parseJobListPagination({ page: "-1", limit: "1000" }), { page: 1, limit: 100, skip: 0 });
});

test("admin list fields accept JSON and newline-delimited multipart values", () => {
    assert.deepEqual(parseArrayField('["Review the role","Practice SQL"]'), ["Review the role", "Practice SQL"]);
    assert.deepEqual(parseArrayField("Review the role\nPractice SQL"), ["Review the role", "Practice SQL"]);
    assert.deepEqual(parseFaqs('[{"question":"Is it remote?","answer":"Check the employer listing."}]'), [
        { question: "Is it remote?", answer: "Check the employer listing." },
    ]);
    assert.deepEqual(parseFaqs("Is it remote? | Check the employer listing.\nIncomplete question"), [
        { question: "Is it remote?", answer: "Check the employer listing." },
    ]);
});
