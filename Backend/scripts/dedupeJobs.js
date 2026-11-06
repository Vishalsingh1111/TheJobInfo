import dotenv from "dotenv";
import mongoose from "mongoose";
import Job from "../Modal/Job.modal.js";
import { areDuplicateJobListings, normalizeJobKeyPart } from "../Utils/jobMetadata.js";

dotenv.config();
const uri = process.env.MONGO_URI || process.env.MongoDBURI;
if (!uri) throw new Error("Set MONGO_URI before running duplicate cleanup");
const apply = process.argv.includes("--apply");

const qualityScore = (job) => [
    "summary", "description", "responsibilities", "eligibility", "requiredSkills",
    "applySteps", "imageUrl", "applyLink",
].reduce((score, key) => score + (job[key] ? 1 : 0), 0);

await mongoose.connect(uri);
try {
    const jobs = await Job.find().sort({ createdAt: 1 }).lean();
    const groups = new Map();
    for (const job of jobs) {
        const company = normalizeJobKeyPart(job.company);
        groups.set(company, [...(groups.get(company) || []), job]);
    }

    const removeIds = new Set();
    for (const group of groups.values()) {
        const ranked = group.slice().sort((a, b) =>
            qualityScore(b) - qualityScore(a) ||
            new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
        );
        const keepers = [];
        for (const job of ranked) {
            const duplicate = keepers.some((kept) => areDuplicateJobListings(kept, job));
            if (duplicate) {
                removeIds.add(String(job._id));
                console.log(`${apply ? "Removing" : "Would remove"} duplicate ${job._id}; keeper selected by completeness then age.`);
            } else {
                keepers.push(job);
            }
        }
    }

    if (apply && removeIds.size) await Job.deleteMany({ _id: { $in: [...removeIds] } });
    console.log(`${apply ? "Cleanup" : "Dry run"} complete: ${removeIds.size} duplicate(s) ${apply ? "removed" : "would be removed"}.`);
} finally {
    await mongoose.disconnect();
}
