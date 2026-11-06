import dotenv from "dotenv";
import mongoose from "mongoose";
import Job from "../Modal/Job.modal.js";
import { createDedupeKey, deriveJobLevel, deriveWorkMode, normalizeCity } from "../Utils/jobMetadata.js";

dotenv.config();
const uri = process.env.MONGO_URI || process.env.MongoDBURI;
if (!uri) throw new Error("Set MONGO_URI before running the backfill");
const apply = process.argv.includes("--apply");

await mongoose.connect(uri);
try {
    const jobs = await Job.find().select("title company location city workMode jobType experience level dedupeKey").lean();
    let changed = 0;
    for (const job of jobs) {
        const city = normalizeCity(job.city || job.location);
        const level = deriveJobLevel({ title: job.title, jobType: job.jobType, experience: job.experience });
        const workMode = job.workMode || deriveWorkMode(job.location);
        const dedupeKey = createDedupeKey({ company: job.company, title: job.title, city });
        const update = { city, dedupeKey };
        if (level) update.level = level;
        if (workMode) update.workMode = workMode;
        if (job.city !== city || (level && job.level !== level) || (workMode && job.workMode !== workMode) || job.dedupeKey !== dedupeKey) {
            changed += 1;
            console.log(`${apply ? "Updating" : "Would update"} ${job._id}: ${job.title}`);
            if (apply) await Job.updateOne({ _id: job._id }, { $set: update });
        }
    }
    console.log(`${apply ? "Updated" : "Dry run"} complete: ${changed} job(s) ${apply ? "changed" : "would change"}.`);
} finally {
    await mongoose.disconnect();
}
