import test from "node:test";
import assert from "node:assert/strict";
import {
    _setClientForTests,
    _setGroqClientForTests,
    _resetForTests,
    createFactBasedFaqs,
    generateJobContent,
    normalizeContent,
} from "../Controller/Geminijob.service.js";
import Job from "../Modal/Job.modal.js";
import { createCandidateSearchPlans, selectPreferredJobLevel, validateImportedJob } from "../Utils/jobMetadata.js";
import { buildMessage, shouldPostToTelegram } from "../Controller/Telegram.service.js";
import { mapJob } from "../Controller/Freehiresync.service.js";

const generatedContent = {
    seoTitle: "Software Engineer at Example in Bengaluru",
    metaDescription: "Software engineering role at Example, with work in application development and testing.",
    summary: "This software engineering role focuses on developing and maintaining application features for the team described in the listing. The work includes translating product needs into reliable code, collaborating with colleagues, and improving existing systems. It may suit candidates whose experience matches the stated requirements and who can demonstrate the listed skills through practical examples. The source also describes responsibilities related to code quality, testing, and troubleshooting, giving applicants useful context about the day-to-day work. Candidates can compare the stated location, work arrangement, experience expectations, and required technologies with their own circumstances before deciding whether to apply. The listing names the employer and provides an application route, while details not included in the source should be confirmed directly through that route. Preparation suggestions below are general guidance and do not describe confirmed employer interview stages.",
    whatYouWillDo: [
        "Develop application features based on the stated product requirements.",
        "Review existing code and contribute improvements to maintainability.",
        "Test changes and investigate defects found during development.",
        "Coordinate implementation details with relevant team members.",
    ],
    skillsRequired: ["JavaScript", "React"],
    eligibility: {
        education: "A bachelor's degree is listed as a requirement.",
        experience: "The listing asks for two years of experience.",
        batch: "",
        other: "",
    },
    selectionProcess: [],
    whoShouldApply: "This role may suit candidates who can demonstrate the listed programming skills and experience. Applicants should be comfortable developing, testing, and maintaining application features.",
    specialNote: "The listing describes a hybrid work arrangement.",
    prepGuide: {
        overview: "General guidance: review the stated technologies and practise explaining relevant work or projects. This advice is not an employer-confirmed interview plan.",
        topicsToRevise: ["JavaScript", "React", "HTTP", "Testing"],
        commonQuestions: ["Explaining a component design", "Debugging an application defect"],
        projectIdeas: ["Build a small interface using the listed framework"],
        commonMistakes: ["Overlooking error states"],
    },
    faqs: [
        { question: "Which employer posted this role?", answer: "The listing names Example as the employer for this software engineering role. Use the linked application page to review the current posting and confirm that it remains open before submitting an application." },
        { question: "Where is the position based?", answer: "The role is listed in Bengaluru, and the posting describes a hybrid work arrangement. Candidates should consider whether that location and work arrangement fit their circumstances before applying through the employer's linked page." },
        { question: "What experience does the listing request?", answer: "The source listing asks for two years of relevant experience. Review the employer's application page for the full requirements, and use examples from your own work to show how your experience relates to the role." },
        { question: "Which skills are named for this role?", answer: "The supplied job data lists JavaScript and React as relevant skills. The complete employer posting may describe additional role requirements, so use the application link on this page to review its current details." },
    ],
};

test("the 80/20 mix counts internships with freshers", () => {
    assert.equal(selectPreferredJobLevel([]), "fresher");
    assert.equal(selectPreferredJobLevel(
        [...Array(30).fill({ level: "fresher" }), ...Array(6).fill({ level: "internship" }), ...Array(14).fill({ level: "experienced" })],
    ), "fresher");
    assert.equal(selectPreferredJobLevel(
        [...Array(36).fill({ level: "fresher" }), ...Array(4).fill({ level: "internship" }), ...Array(10).fill({ level: "experienced" })],
    ), "experienced");
});

test("the rolling mix simulation stays near 80% fresher and internship over 100 runs", () => {
    const history = [];
    for (let run = 0; run < 100; run += 1) {
        const target = selectPreferredJobLevel(history.slice(-50));
        history.push(target === "fresher" && history.filter((level) => level === "fresher").length % 4 === 0
            ? "internship"
            : target);
    }

    const fresherShare = history.filter((level) => level === "fresher" || level === "internship").length / history.length;
    assert.ok(fresherShare >= 0.79 && fresherShare <= 0.81, `expected about 80% fresher and internship, got ${fresherShare * 100}%`);
});

test("popular-only mode falls back to non-popular companies before changing levels", () => {
    const plans = createCandidateSearchPlans("fresher", "popular_only", true);
    assert.equal(plans[0].popular, true);
    assert.equal(plans[0].targetLevel, "fresher");
    assert.equal(plans[1].popular, false);
    assert.equal(plans[1].targetLevel, "fresher");
    assert.equal(plans[2].popular, true);
    assert.equal(plans[2].targetLevel, "experienced");
    assert.equal(plans[3].popular, false);
});

test("Telegram posts popular freshers, remote freshers, internships, or explicitly forced jobs", () => {
    assert.equal(shouldPostToTelegram({ company: "Google", level: "fresher" }), true);
    assert.equal(shouldPostToTelegram({ company: "Google", level: "experienced" }), false);
    assert.equal(shouldPostToTelegram({ company: "Unknown Startup", level: "fresher" }), false);
    assert.equal(shouldPostToTelegram({ company: "Unknown Startup", level: "fresher", workMode: "Remote" }), true);
    assert.equal(shouldPostToTelegram({ company: "Unknown Startup", level: "fresher", location: "Work from home" }), true);
    assert.equal(shouldPostToTelegram({ company: "Unknown Startup", level: "internship" }), true);
    assert.equal(shouldPostToTelegram({ company: "Unknown Startup", level: "experienced", forceTelegram: true }), true);
});

test("Telegram details omit the hiring headline and posting dates", () => {
    const message = buildMessage({
        _id: "job-id",
        slug: "software-engineer-example",
        company: "Example",
        title: "Software Engineer",
        salary: "10 LPA",
        location: "Remote",
        jobType: "Freshers",
        experience: "Fresher",
        lastDate: "31 Dec 2026",
        createdAt: new Date("2026-11-07T00:00:00.000Z"),
    });

    assert.match(message, /Company: Example/);
    assert.match(message, /Role : Software Engineer/);
    assert.doesNotMatch(message, /is Hiring|Last Date|Posted On|2026/);
});

test("the prompt's generated fields map into persisted job fields", () => {
    const normalized = normalizeContent(generatedContent, {
        company: "Example",
        role: "Software Engineer",
        jobType: "Experienced",
        experience: "2 years",
        category: "Software Engineering",
        description: "The source describes developing application features, reviewing code, testing changes, and working with a team. ".repeat(5),
        salary: "Not disclosed",
    });

    assert.equal(normalized.title, "Software Engineer");
    assert.match(normalized.responsibilities, /Develop application features/);
    assert.match(normalized.requiredSkills, /JavaScript/);
    assert.match(normalized.eligibility, /education: A bachelor's degree/);
    assert.match(normalized.applyIf, /This role may suit candidates/);
    assert.equal(normalized.specialNote, generatedContent.specialNote);
    assert.equal(normalized.prepGuide.commonQuestions.length, 2);
    assert.equal(normalized.faqs.length, 4);
    assert.equal(normalized.applySteps.split("\n\n").length, 4);
    assert.equal(Job.schema.path("specialNote").instance, "String");
    assert.equal(Job.schema.path("seoTitle").instance, "String");

    const savedShape = new Job(mapJob({
        public_slug: "example-engineer",
        title: "Software Engineer",
        company: "Example",
        location: "Bengaluru, India",
        url: "https://example.com/careers/engineer",
        posted_at: new Date().toISOString(),
        is_tech: "tech",
        enrichment: { experience_years_min: 2, experience_years_max: 3 },
    }, 123, {
        ...normalized,
        contentProvider: "gemini",
        aiStatus: "ok",
        aiModelUsed: "gemini-test",
        aiAttempts: 1,
        aiGeneratedAt: new Date(),
    }));
    assert.match(savedShape.responsibilities, /Develop application features/);
    assert.match(savedShape.requiredSkills, /JavaScript/);
    assert.equal(savedShape.faqs.length, 4);
    assert.equal(savedShape.prepGuide.commonQuestions.length, 2);
    assert.equal(savedShape.specialNote, generatedContent.specialNote);
    assert.equal(savedShape.salary, "");
    assert.equal(savedShape.aiStatus, "ok");
    assert.equal(savedShape.aiModelUsed, "gemini-test");
    assert.equal(savedShape.seoTitle, generatedContent.seoTitle);
    assert.equal(validateImportedJob({ ...savedShape.toObject(), is_tech: "tech" }), null);

    assert.throws(() => normalizeContent({ ...generatedContent, summary: "A short summary." }, {
        company: "Example",
        role: "Software Engineer",
        jobType: "Experienced",
        experience: "2 years",
        category: "Software Engineering",
    }), /summary \(110-180 words\)/);
    assert.throws(() => normalizeContent({ ...generatedContent, faqs: [] }, {
        company: "Example",
        role: "Software Engineer",
        jobType: "Experienced",
        experience: "2 years",
        category: "Software Engineering",
    }), /4-6 FAQs/);
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

test("Gemini failure returns marked failed content for importer rejection", async () => {
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
        assert.equal(content.aiStatus, "failed");
        assert.equal(content.aiModelUsed, "gemini-2.5-flash");
        assert.equal(content.aiAttempts, 1);
        assert.equal(content.title, "Software Engineer");
        assert.ok(content.faqs.length > 0);
        assert.deepEqual(content.prepGuide.topicsToRevise, []);
    } finally {
        _setClientForTests(null);
        _resetForTests();
        if (previousKey === undefined) delete process.env.GEMINI_API_KEY;
        else process.env.GEMINI_API_KEY = previousKey;
    }
});

test("Gemini structured request includes system instructions and maps returned content", async () => {
    const previousKey = process.env.GEMINI_API_KEY;
    const previousGroqKey = process.env.GROQ_API_KEY;
    process.env.GEMINI_API_KEY = "test-key";
    delete process.env.GROQ_API_KEY;
    let request;
    _setClientForTests({
        models: {
            generateContent: async (options) => {
                request = options;
                return { text: JSON.stringify(generatedContent) };
            },
        },
    });

    try {
        const content = await generateJobContent({
            title: "Software Engineer",
            company: "Example",
            location: "Bengaluru",
            description_text: "Develop application features, review code, test changes, and troubleshoot defects with the team. ".repeat(5),
            skills: ["JavaScript", "React"],
        }, {
            jobType: "Experienced",
            experience: "2 years",
            category: "Software Engineering",
        });

        assert.equal(content.aiStatus, "ok");
        assert.equal(content.contentProvider, "gemini");
        assert.match(request.config.systemInstruction, /Use ONLY facts/);
        assert.equal(request.config.responseMimeType, "application/json");
        assert.ok(request.config.responseSchema.properties.prepGuide);
        assert.equal(request.config.temperature, 0.3);
        assert.equal(content.faqs.length, 4);
    } finally {
        _setClientForTests(null);
        _setGroqClientForTests(null);
        if (previousKey === undefined) delete process.env.GEMINI_API_KEY;
        else process.env.GEMINI_API_KEY = previousKey;
        if (previousGroqKey === undefined) delete process.env.GROQ_API_KEY;
        else process.env.GROQ_API_KEY = previousGroqKey;
    }
});

test("Groq is called only after Gemini failure and returns the same mapped content", async () => {
    const previousKey = process.env.GEMINI_API_KEY;
    const previousGroqKey = process.env.GROQ_API_KEY;
    process.env.GEMINI_API_KEY = "test-key";
    process.env.GROQ_API_KEY = "test-key";
    let groqRequest;
    let geminiAttempts = 0;
    _setClientForTests({
        models: {
            generateContent: async () => {
                geminiAttempts += 1;
                throw Object.assign(new Error("quota exceeded"), { status: 429 });
            },
        },
    });
    _setGroqClientForTests({
        chat: {
            completions: {
                create: async (options) => {
                    groqRequest = options;
                    return { choices: [{ message: { content: JSON.stringify(generatedContent) } }] };
                },
            },
        },
    });

    try {
        const content = await generateJobContent({
            title: "Software Engineer",
            company: "Example",
            location: "Bengaluru",
            description_text: "Develop application features, review code, test changes, and troubleshoot defects with the team. ".repeat(5),
            skills: ["JavaScript", "React"],
        }, {
            jobType: "Experienced",
            experience: "2 years",
            category: "Software Engineering",
        });

        assert.equal(content.aiStatus, "ok");
        assert.equal(content.contentProvider, "groq");
        assert.equal(content.aiAttempts, 4);
        assert.equal(geminiAttempts, 3);
        assert.equal(content.responsibilities.split("\n\n").length, 4);
        assert.equal(groqRequest.response_format.type, "json_object");
        assert.equal(groqRequest.temperature, 0.3);
        assert.equal(groqRequest.messages[1].content.includes("Source description"), true);
    } finally {
        _setClientForTests(null);
        _setGroqClientForTests(null);
        _resetForTests();
        if (previousKey === undefined) delete process.env.GEMINI_API_KEY;
        else process.env.GEMINI_API_KEY = previousKey;
        if (previousGroqKey === undefined) delete process.env.GROQ_API_KEY;
        else process.env.GROQ_API_KEY = previousGroqKey;
    }
});
