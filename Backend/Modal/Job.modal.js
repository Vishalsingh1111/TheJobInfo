
import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    id: { type: Number, required: true },
    slug: { type: String, required: false, unique: true, sparse: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: false },
    salary: { type: String, required: false },
    salaryNote: { type: String, required: false },
    jobType: { type: String, required: false },
    experience: { type: String, required: false },
    category: { type: String, required: true },
    website: { type: String, required: false },
    applyLink: { type: String, required: false },
    lastDate: { type: String, required: false },
    aboutCompany: { type: String, required: false },
    description: { type: String, required: false },
    responsibilities: { type: String, required: false },
    eligibility: { type: String, required: false },
    requiredSkills: { type: String, required: false },
    applyIf: { type: String, required: false },
    dontApplyIf: { type: String, required: false },
    selectionProcess: { type: String, required: false },
    benefits: { type: String, required: false },
    applySteps: { type: String, required: false },
    imageUrl: { type: String, required: false, default: '' },
    imagePublicId: { type: String, required: false, default: '' },

    // ── NEW (optional, manual jobs ignore these) ──────────────────────────────
    source: { type: String, required: false, default: 'manual' },              // company name for imported jobs
    externalId: { type: String, required: false, unique: true, sparse: true }, // set ONLY on imported jobs (internal marker)
    postedAt: { type: Date, required: false },                                 // when the employer posted it
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;