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
    const answer = "The source listing names this role and provides relevant information for candidates. Review the employer's linked page for the current details before submitting an application.";
    const base = {
        company: "Example",
        title: "Engineer",
        applyLink: "https://example.com/careers",
        description: "",
        summary: "This software engineering role involves building and maintaining application features, reviewing code, testing changes, and resolving defects with a team. The listing names Example and identifies Bengaluru with a hybrid work arrangement. JavaScript and React are listed skills, and the role requests two years of experience. It may suit candidates whose experience and skills match these stated requirements. Applicants can use the provided application link to review the role and submit their details.",
        responsibilities: "Build features\nReview code\nWrite tests\nFix defects",
        requiredSkills: "JavaScript\nReact",
        prepGuide: { overview: "General preparation guidance.", topicsToRevise: ["JavaScript", "React", "HTTP", "Testing"] },
        faqs: [
            { question: "Who posted this role?", answer },
            { question: "Where is the role located?", answer },
            { question: "What skills are listed?", answer },
            { question: "How can candidates apply?", answer },
        ],
        contentProvider: "gemini",
        aiStatus: "ok",
        aiModelUsed: "gemini-test",
        postedAt: new Date(),
        is_tech: "tech",
        level: "fresher",
    };
    assert.equal(validateImportedJob(base), null);
    assert.equal(validateImportedJob({ ...base, faqs: [] }), "FAQ list must contain 4-6 items");
    assert.equal(validateImportedJob({ ...base, applyLink: "javascript:alert(1)" }), "invalid apply link");
    assert.equal(validateImportedJob({ ...base, description: "placeholder content" }), "placeholder description");
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
