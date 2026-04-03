// import mongoose from "mongoose";

// const blogSchema = mongoose.Schema({
//     id: { type: Number, required: true },
//     header: { type: String, required: false },
//     code: { type: String, required: false },
//     explanation: { type: String, required: false },
//     code2: { type: String, required: false },
//     explanation2: { type: String, required: false },
//     code3: { type: String, required: false },
//     explanation3: { type: String, required: false },
//     image: { type: String, required: false },
//     category: { type: String, required: true }
// });

// blogSchema.index({ header: 'text', code: 'text', explanation: 'text', category: 'text' });

// const Blog = mongoose.model("Blog", blogSchema);
// export default Blog;


import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },       // Post Name
    company: { type: String, required: true },       // Company Name
    location: { type: String, required: false },      // Job Location
    salary: { type: String, required: false },      // Expected Salary e.g. "₹7-10 LPA*"
    salaryNote: { type: String, required: false },      // Salary disclaimer note
    jobType: { type: String, required: false },      // e.g. "Freshers/ Experienced"
    experience: { type: String, required: false },      // e.g. "Entry Level"
    category: { type: String, required: true },       // e.g. "Engineering"
    website: { type: String, required: false },      // Company website e.g. "Cummins.com"
    applyLink: { type: String, required: false },      // Official apply URL
    lastDate: { type: String, required: false },      // e.g. "Apply ASAP"
    aboutCompany: { type: String, required: false },      // About the company paragraph
    description: { type: String, required: false },      // Job overview / what role involves
    responsibilities: { type: String, required: false },      // Key responsibilities (newline-separated)
    eligibility: { type: String, required: false },      // Eligibility criteria (newline-separated)
    requiredSkills: { type: String, required: false },      // Required skills (newline-separated)
    applyIf: { type: String, required: false },      // Apply if (newline-separated)
    dontApplyIf: { type: String, required: false },      // Don't apply if (newline-separated)
    selectionProcess: { type: String, required: false },      // Selection steps (newline-separated)
    benefits: { type: String, required: false },      // Why join / benefits (newline-separated)
    applySteps: { type: String, required: false },      // How to apply steps (newline-separated)
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;