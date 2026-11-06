
import mongoose from "mongoose";
import sanitizeHtml from "sanitize-html";

const customSectionSchema = new mongoose.Schema({
    id: { type: String, required: true, maxlength: 100 },
    title: { type: String, required: true, maxlength: 160 },
    type: {
        type: String,
        enum: ["text", "list", "numbered", "keyValue", "table", "callout", "links"],
        required: true,
    },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
    style: { type: mongoose.Schema.Types.Mixed, default: {} },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
}, { _id: false });

const jobSchema = mongoose.Schema({
    id: { type: Number, required: true },
    slug: { type: String, required: false, unique: true, sparse: true },
    dedupeKey: { type: String, required: false, index: true },
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
    selectionProcess: { type: String, required: false },
    benefits: { type: String, required: false },
    applySteps: { type: String, required: false },
    imageUrl: { type: String, required: false, default: '' },
    imagePublicId: { type: String, required: false, default: '' },

    // ── NEW (optional, manual jobs ignore these) ──────────────────────────────
    source: { type: String, required: false, default: 'manual' },              // company name for imported jobs
    externalId: { type: String, required: false, unique: true, sparse: true }, // set ONLY on imported jobs (internal marker)
    postedAt: { type: Date, required: false },                                 // when the employer posted it
    city: { type: String, required: false, default: 'Other', index: true },
    workMode: { type: String, enum: ['Onsite', 'Hybrid', 'Remote'], required: false },
    level: { type: String, enum: ['fresher', 'experienced', 'internship', 'dual'], required: false, index: true },
    summary: { type: String, required: false },
    prepTips: { type: [String], required: false },
    prepGuide: { type: mongoose.Schema.Types.Mixed, required: false },
    faqs: {
        type: [{ question: String, answer: String }],
        required: false,
    },
    forceTelegram: { type: Boolean, default: false },
    customSections: {
        type: [customSectionSchema],
        default: [],
        validate: {
            validator: (sections) => sections.length <= 30,
            message: "A job can have at most 30 custom sections",
        },
    },
    sectionOrder: { type: [String], default: [] },
    hiddenSections: { type: [String], default: [] },
    expiresAt: { type: Date, required: false, index: true },
    contentProvider: { type: String, enum: ["gemini", "groq", "basic"], required: false },
}, { timestamps: true });

jobSchema.pre("validate", function sanitizeCustomSections(next) {
    try {
        for (const section of this.customSections || []) {
            if (section.type === "text" && typeof section.content === "string") {
                section.content = sanitizeHtml(section.content, {
                    allowedTags: ["p", "br", "strong", "em", "u", "a", "ul", "ol", "li", "span", "h3", "h4"],
                    allowedAttributes: { a: ["href", "target", "rel"], span: ["style"] },
                    allowedStyles: { span: { color: [/^#[0-9a-f]{6}$/i] } },
                    allowedSchemes: ["http", "https", "mailto"],
                });
            }
            if (section.type === "links") {
                if (!Array.isArray(section.content)) {
                    return next(new Error("Custom section links must be an array"));
                }
                for (const link of section.content) {
                    if (!link || typeof link.label !== "string" || typeof link.url !== "string") {
                        return next(new Error("Custom section links require labels and URLs"));
                    }
                    let parsedUrl;
                    try {
                        parsedUrl = new URL(link.url);
                    } catch {
                        return next(new Error("Custom section links must use HTTP or HTTPS"));
                    }
                    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
                        return next(new Error("Custom section links must use HTTP or HTTPS"));
                    }
                    link.label = link.label.trim().slice(0, 160);
                    link.url = parsedUrl.href;
                }
            }
            const serialized = JSON.stringify(section.content);
            if (serialized.length > 20000) {
                return next(new Error("Custom section content cannot exceed 20,000 characters"));
            }
            for (const color of ["titleColor", "textColor", "backgroundColor"]) {
                const value = section.style?.[color];
                if (value && !/^#[0-9a-f]{6}$/i.test(value)) {
                    return next(new Error(`Invalid custom section ${color}`));
                }
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

jobSchema.index({ createdAt: -1 });
jobSchema.index({ company: 1 });
jobSchema.index({ title: "text", company: "text" });

const Job = mongoose.model("Job", jobSchema);
export default Job;