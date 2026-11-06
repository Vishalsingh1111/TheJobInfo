import dotenv from "dotenv";
import mongoose from "mongoose";
import Job from "../Modal/Job.modal.js";
import { createFactBasedFaqs, generateJobContent, generateJobExtras } from "../Controller/Geminijob.service.js";

dotenv.config();

const args = process.argv.slice(2);
const limitIndex = args.indexOf("--limit");
const limit = limitIndex >= 0 ? Number.parseInt(args[limitIndex + 1], 10) : null;
if (limitIndex >= 0 && (!Number.isInteger(limit) || limit < 1)) {
    throw new Error("--limit must be followed by a positive integer");
}
const dryRun = args.includes("--dry-run") || !args.includes("--apply");
const mongoUri = process.env.MONGO_URI || process.env.MongoDBURI;
if (!mongoUri) throw new Error("Set MONGO_URI before regenerating job content");

const missingContent = {
    $or: [
        { summary: { $exists: false } },
        { summary: "" },
        { prepGuide: { $exists: false } },
        { prepGuide: null },
        { "prepGuide.topicsToRevise.0": { $exists: false } },
        { faqs: { $exists: false } },
        { "faqs.0": { $exists: false } },
    ],
};

await mongoose.connect(mongoUri);
try {
    let query = Job.find({
        $and: [
            missingContent,
            { $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gte: new Date() } }] },
        ],
    }).sort({ createdAt: -1 });
    if (limit) query = query.limit(limit);
    const jobs = await query.lean();
    console.log(`[regenerate-content] ${dryRun ? "dry run" : "apply"}: ${jobs.length} active job(s) selected`);

    for (const job of jobs) {
        const facts = {
            title: job.title,
            company: job.company,
            location: job.location || job.city || "",
            salary_text: job.salary || "",
            applyLink: job.applyLink || "",
            work_mode: job.workMode || null,
            employment_type: job.jobType || null,
            seniority: job.level || null,
            skills: String(job.requiredSkills || "").split(/\r?\n/).filter(Boolean),
            description_text: [
                job.summary && `Existing summary:\n${job.summary}`,
                job.aboutCompany && `About the company:\n${job.aboutCompany}`,
                job.description,
                job.responsibilities && `Responsibilities:\n${job.responsibilities}`,
                job.eligibility && `Eligibility:\n${job.eligibility}`,
                job.requiredSkills && `Required skills:\n${job.requiredSkills}`,
                job.selectionProcess && `Selection process:\n${job.selectionProcess}`,
            ].filter(Boolean).join("\n\n"),
        };
        try {
            const content = await generateJobContent(facts, {
                jobType: job.jobType || "Freshers/ Experienced",
                experience: job.experience || "Not stated by the employer",
                category: job.category || "Software Engineering",
            });
            try {
                Object.assign(content, await generateJobExtras(facts));
            } catch (error) {
                console.warn(`[regenerate-content] Grok enrichment unavailable for ${job._id}: ${error.message}`);
                content.faqs = createFactBasedFaqs(facts);
            }
            console.log(`[regenerate-content] ${dryRun ? "would update" : "updated"} ${job._id}: ${job.title} (${content.contentProvider})`);
            if (!dryRun) {
                await Job.updateOne(
                    { _id: job._id },
                    {
                        $set: {
                            summary: content.summary,
                            prepGuide: content.prepGuide,
                            prepTips: content.prepTips,
                            faqs: content.faqs,
                            contentProvider: content.contentProvider,
                        },
                    },
                );
            }
        } catch (error) {
            console.error(`[regenerate-content] skipped ${job._id} (${job.title}): ${error.message}`);
        }
    }
} finally {
    await mongoose.disconnect();
}
