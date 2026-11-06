import test from "node:test";
import assert from "node:assert/strict";
import {
    _setClientForTests,
    createFactBasedFaqs,
    generateJobContent,
    normalizeContent,
} from "../Controller/Geminijob.service.js";
import Job from "../Modal/Job.modal.js";
import { createCandidateSearchPlans, selectPreferredJobLevel } from "../Utils/jobMetadata.js";
import { shouldPostToTelegram } from "../Controller/Telegram.service.js";

test("the 90/10 mix favors whichever level is below its target", () => {
    assert.equal(selectPreferredJobLevel([], 0.9), "fresher");
    assert.equal(selectPreferredJobLevel(
        [...Array(44).fill({ level: "fresher" }), ...Array(6).fill({ level: "experienced" })],
        0.9,
    ), "fresher");
    assert.equal(selectPreferredJobLevel(
        [...Array(45).fill({ level: "fresher" }), ...Array(5).fill({ level: "experienced" })],
        0.9,
    ), "experienced");
});

test("the rolling mix simulation stays near 90% fresher over 100 runs", () => {
    const history = [];
    for (let run = 0; run < 100; run += 1) {
        const target = selectPreferredJobLevel(history.slice(-50), 0.9);
        history.push(target);
    }

    const fresherShare = history.filter((level) => level === "fresher").length / history.length;
    assert.ok(fresherShare >= 0.89 && fresherShare <= 0.91, `expected about 90% fresher, got ${fresherShare * 100}%`);
});

test("popular_only candidate plans never search non-popular companies", () => {
    for (const level of ["fresher", "experienced"]) {
        const plans = createCandidateSearchPlans(level, "popular_only", false);
        assert.ok(plans.length > 0);
        assert.ok(plans.every((plan) => plan.popular));
        assert.equal(plans.at(-1).mixFallback, true);
    }
});

test("Telegram requires popular-company fresher jobs unless explicitly forced", () => {
    assert.equal(shouldPostToTelegram({ company: "Google", level: "fresher" }), true);
    assert.equal(shouldPostToTelegram({ company: "Google", level: "experienced" }), false);
    assert.equal(shouldPostToTelegram({ company: "Unknown Startup", level: "fresher" }), false);
    assert.equal(shouldPostToTelegram({ company: "Unknown Startup", level: "experienced", forceTelegram: true }), true);
});

test("AI content validation rejects thin summaries and duplicate items while omitting unavailable FAQs", () => {
    const valid = {
        title: "Software Engineer",
        jobType: "Freshers",
        experience: "Fresher",
        category: "Software Engineering",
        summary: "This software engineer role focuses on building and maintaining application features. It suits candidates with the listed programming skills and interest in software development.",
        description: "Build and maintain software features using the technologies listed in the employer posting. Work with the assigned team to deliver changes.",
        responsibilities: ["Implement software features", "Review code changes", "Write tests", "Investigate defects"],
        requiredSkills: ["JavaScript", "React", "Git"],
        applySteps: ["Open the application link", "Review the requirements", "Submit requested details", "Complete the application"],
        prepGuide: {
            overview: "Suggestions by TheJobInfo, not from the employer.",
            topicsToRevise: ["JavaScript", "React", "HTTP", "Testing"],
            expectedRounds: ["Typically: technical discussion"],
            projectIdeas: ["Build a small React application"],
            commonMistakes: ["Ignoring edge cases"],
            plan30Days: ["Week 1: revise JavaScript"],
        },
        faqs: [
            { question: "How many years of experience?", answer: "Fresher." },
            { question: "How do I apply?", answer: "Open the application link." },
        ],
    };
    const normalized = normalizeContent({ ...valid, dontApplyIf: ["Unrelated"] }, {
        company: "Example", role: "Software Engineer", jobType: "Freshers",
        experience: "Fresher", category: "Software Engineering",
    });
    assert.equal("dontApplyIf" in normalized, false);
    assert.equal(Job.schema.path("dontApplyIf"), undefined);
    assert.equal(normalized.faqs.length, 2);
    assert.equal(normalizeContent({ ...valid, faqs: [] }, {
        company: "Example", role: "Software Engineer", jobType: "Freshers",
        experience: "Fresher", category: "Software Engineering",
    }).faqs.length, 0);
    assert.deepEqual(normalizeContent({ ...valid, prepGuide: {}, prepTips: [], faqs: [] }, {
        company: "Example", role: "Software Engineer", jobType: "Freshers",
        experience: "Fresher", category: "Software Engineering",
    }).prepGuide.topicsToRevise, []);
    assert.equal(normalizeContent({
        ...valid,
        faqs: [{ question: "What is the salary?", answer: "Salary is not stated by the employer." }],
    }, {
        company: "Example", role: "Software Engineer", jobType: "Freshers",
        experience: "Fresher", category: "Software Engineering",
    }).faqs.length, 0);
    assert.throws(() => normalizeContent({ ...valid, summary: "A short summary." }, {
        company: "Example", role: "Software Engineer", jobType: "Freshers",
        experience: "Fresher", category: "Software Engineering",
    }), /summary/);
});

test("source-based FAQs only include facts available on the posting", () => {
    const faqs = createFactBasedFaqs({
        title: "Software Engineer",
        company: "Example",
        location: "Bengaluru",
        applyLink: "https://example.com/jobs/123",
    });
    assert.equal(faqs.length, 4);
    assert.ok(faqs.some(({ question }) => question.includes("How do I apply")));
    assert.ok(faqs.every(({ question, answer }) => question && answer));
    assert.ok(!faqs.some(({ question }) => question.toLowerCase().includes("salary")));
});

test("Gemini failure falls back to source details instead of rejecting the job", async () => {
    const previousKey = process.env.GEMINI_API_KEY;
    process.env.GEMINI_API_KEY = "test-key";
    _setClientForTests({
        interactions: {
            create: async () => {
                throw Object.assign(new Error("provider unavailable"), { status: 400 });
            },
        },
    });

    try {
        const content = await generateJobContent({
            title: "Software Engineer",
            company: "Example",
            location: "Bengaluru",
            applyLink: "https://example.com/jobs/123",
            description_text: "Build and maintain software features using the technologies listed in the source posting.",
            skills: ["JavaScript", "React"],
        }, {
            jobType: "Freshers",
            experience: "Fresher",
            category: "Software Engineering",
        });
        assert.equal(content.contentProvider, "basic");
        assert.equal(content.title, "Software Engineer");
        assert.ok(content.faqs.length > 0);
        assert.deepEqual(content.prepGuide.topicsToRevise, []);
    } finally {
        _setClientForTests(null);
        if (previousKey === undefined) delete process.env.GEMINI_API_KEY;
        else process.env.GEMINI_API_KEY = previousKey;
    }
});
