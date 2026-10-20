
// import Job from "../Modal/Job.modal.js";
// import cloudinary from "../config/cloudinary.config.js";

// // ── Helper: generate slug from title + company + id ──────────────────────────
// const generateSlug = (title, company, id) => {
//     const base = `${title}-${company}-${id}`
//         .toLowerCase()
//         .replace(/[^a-z0-9\s-]/g, '')   // remove special chars
//         .trim()
//         .replace(/\s+/g, '-')            // spaces → hyphens
//         .replace(/-+/g, '-');            // collapse multiple hyphens
//     return base;
// };

// // ── Helper: upload buffer to Cloudinary ───────────────────────────────────────
// const uploadToCloudinary = (buffer, originalname) => {
//     return new Promise((resolve, reject) => {
//         const publicId = `jobs/${Date.now()}-${originalname.replace(/\.[^/.]+$/, '')}`;
//         const stream = cloudinary.uploader.upload_stream(
//             {
//                 folder: 'jobs',
//                 public_id: publicId,
//                 resource_type: 'image',
//                 transformation: [{ width: 800, height: 450, crop: 'fill', quality: 'auto' }],
//             },
//             (error, result) => {
//                 if (error) return reject(error);
//                 resolve(result);
//             }
//         );
//         stream.end(buffer);
//     });
// };

// // ── Helper: delete image from Cloudinary ─────────────────────────────────────
// const deleteFromCloudinary = async (publicId) => {
//     if (!publicId) return;
//     try {
//         await cloudinary.uploader.destroy(publicId);
//     } catch (err) {
//         console.error('Cloudinary delete error:', err);
//     }
// };

// // ── GET all jobs ──────────────────────────────────────────────────────────────
// export const getJob = async (req, res) => {
//     try {
//         const jobs = await Job.find().sort({ id: -1 });
//         res.status(200).json(jobs);
//     } catch (error) {
//         console.error("Error fetching jobs:", error);
//         res.status(500).json({ error: "Error fetching jobs" });
//     }
// };

// // ── GET single job by slug ────────────────────────────────────────────────────
// export const getJobBySlug = async (req, res) => {
//     const { slug } = req.params;
//     try {
//         const job = await Job.findOne({ slug });
//         if (!job) return res.status(404).json({ error: "Job not found" });
//         res.status(200).json(job);
//     } catch (error) {
//         console.error("Error fetching job by slug:", error);
//         res.status(500).json({ error: "Error fetching job" });
//     }
// };

// // ── POST create job (with optional image) ─────────────────────────────────────
// export const createJob = async (req, res) => {
//     try {
//         const {
//             id, title, company, location, salary, salaryNote, jobType, experience,
//             category, website, applyLink, lastDate, aboutCompany, description,
//             responsibilities, eligibility, requiredSkills, applyIf, dontApplyIf,
//             selectionProcess, benefits, applySteps
//         } = req.body;

//         let imageUrl = '';
//         let imagePublicId = '';

//         if (req.file) {
//             const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
//             imageUrl = result.secure_url;
//             imagePublicId = result.public_id;
//         }

//         // Auto-generate slug
//         const slug = generateSlug(title, company, id);

//         const newJob = new Job({
//             id, slug, title, company, location, salary, salaryNote, jobType, experience,
//             category, website, applyLink, lastDate, aboutCompany, description,
//             responsibilities, eligibility, requiredSkills, applyIf, dontApplyIf,
//             selectionProcess, benefits, applySteps,
//             imageUrl,
//             imagePublicId,
//         });

//         await newJob.save();
//         res.status(201).json({ message: "Created successfully", job: newJob });
//     } catch (error) {
//         console.error("Error creating job:", error);
//         res.status(500).json({ error: "Error creating job" });
//     }
// };

// // ── PUT update job (with optional new image) ──────────────────────────────────
// export const updateJob = async (req, res) => {
//     const { id } = req.params;
//     const {
//         title, company, location, salary, salaryNote, jobType, experience,
//         category, website, applyLink, lastDate, aboutCompany, description,
//         responsibilities, eligibility, requiredSkills, applyIf, dontApplyIf,
//         selectionProcess, benefits, applySteps
//     } = req.body;

//     try {
//         const existingJob = await Job.findById(id);
//         if (!existingJob) {
//             return res.status(404).json({ error: "Job not found" });
//         }

//         let imageUrl = existingJob.imageUrl;
//         let imagePublicId = existingJob.imagePublicId;

//         if (req.file) {
//             if (existingJob.imagePublicId) {
//                 await deleteFromCloudinary(existingJob.imagePublicId);
//             }
//             const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
//             imageUrl = result.secure_url;
//             imagePublicId = result.public_id;
//         }

//         // Regenerate slug if title or company changed
//         const newTitle = title || existingJob.title;
//         const newCompany = company || existingJob.company;
//         const slug = generateSlug(newTitle, newCompany, existingJob.id);

//         const updatedJob = await Job.findByIdAndUpdate(
//             id,
//             {
//                 slug, title, company, location, salary, salaryNote, jobType, experience,
//                 category, website, applyLink, lastDate, aboutCompany, description,
//                 responsibilities, eligibility, requiredSkills, applyIf, dontApplyIf,
//                 selectionProcess, benefits, applySteps,
//                 imageUrl,
//                 imagePublicId,
//             },
//             { new: true }
//         );

//         res.status(200).json({ message: "Updated successfully", updatedJob });
//     } catch (error) {
//         console.error("Error updating job:", error);
//         res.status(500).json({ error: "Error updating job" });
//     }
// };

// // ── DELETE job (also removes image from Cloudinary) ──────────────────────────
// export const deleteJob = async (req, res) => {
//     const { id } = req.params;

//     try {
//         if (!id) return res.status(400).json({ error: "Invalid ID" });

//         const job = await Job.findById(id);
//         if (!job) return res.status(404).json({ error: "Job not found" });

//         if (job.imagePublicId) {
//             await deleteFromCloudinary(job.imagePublicId);
//         }

//         await Job.findByIdAndDelete(id);
//         res.status(200).json({ message: "Deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting job:", error);
//         res.status(500).json({ error: "Error deleting job" });
//     }
// };

// // ── GET health check ) ──────────────
// export const healthCheck = (req, res) => {
//     res.status(200).json({
//         status: "ok",
//         uptime: process.uptime(),
//         timestamp: new Date().toISOString(),
//     });
// };

import Job from "../Modal/Job.modal.js";
import cloudinary from "../config/cloudinary.config.js";
import { syncFreehireJobs } from "./Freehiresync.service.js";

// ── Helper: generate slug from title + company + id ──────────────────────────
const generateSlug = (title, company, id) => {
    const base = `${title}-${company}-${id}`
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')   // remove special chars
        .trim()
        .replace(/\s+/g, '-')            // spaces → hyphens
        .replace(/-+/g, '-');            // collapse multiple hyphens
    return base;
};

// ── Helper: upload buffer to Cloudinary ───────────────────────────────────────
const uploadToCloudinary = (buffer, originalname) => {
    return new Promise((resolve, reject) => {
        const publicId = `jobs/${Date.now()}-${originalname.replace(/\.[^/.]+$/, '')}`;
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'jobs',
                public_id: publicId,
                resource_type: 'image',
                transformation: [{ width: 800, height: 450, crop: 'fill', quality: 'auto' }],
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        stream.end(buffer);
    });
};

// ── Helper: delete image from Cloudinary ─────────────────────────────────────
const deleteFromCloudinary = async (publicId) => {
    if (!publicId) return;
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.error('Cloudinary delete error:', err);
    }
};

// ── GET all jobs ──────────────────────────────────────────────────────────────
export const getJob = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ id: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Error fetching jobs" });
    }
};

// ── GET single job by slug ────────────────────────────────────────────────────
export const getJobBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const job = await Job.findOne({ slug });
        if (!job) return res.status(404).json({ error: "Job not found" });
        res.status(200).json(job);
    } catch (error) {
        console.error("Error fetching job by slug:", error);
        res.status(500).json({ error: "Error fetching job" });
    }
};

// ── POST create job (with optional image) ─────────────────────────────────────
export const createJob = async (req, res) => {
    try {
        const {
            id, title, company, location, salary, salaryNote, jobType, experience,
            category, website, applyLink, lastDate, aboutCompany, description,
            responsibilities, eligibility, requiredSkills, applyIf, dontApplyIf,
            selectionProcess, benefits, applySteps
        } = req.body;

        let imageUrl = '';
        let imagePublicId = '';

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
            imageUrl = result.secure_url;
            imagePublicId = result.public_id;
        }

        // Auto-generate slug
        const slug = generateSlug(title, company, id);

        const newJob = new Job({
            id, slug, title, company, location, salary, salaryNote, jobType, experience,
            category, website, applyLink, lastDate, aboutCompany, description,
            responsibilities, eligibility, requiredSkills, applyIf, dontApplyIf,
            selectionProcess, benefits, applySteps,
            imageUrl,
            imagePublicId,
        });

        await newJob.save();
        res.status(201).json({ message: "Created successfully", job: newJob });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ error: "Error creating job" });
    }
};

// ── PUT update job (with optional new image) ──────────────────────────────────
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const {
        title, company, location, salary, salaryNote, jobType, experience,
        category, website, applyLink, lastDate, aboutCompany, description,
        responsibilities, eligibility, requiredSkills, applyIf, dontApplyIf,
        selectionProcess, benefits, applySteps
    } = req.body;

    try {
        const existingJob = await Job.findById(id);
        if (!existingJob) {
            return res.status(404).json({ error: "Job not found" });
        }

        let imageUrl = existingJob.imageUrl;
        let imagePublicId = existingJob.imagePublicId;

        if (req.file) {
            if (existingJob.imagePublicId) {
                await deleteFromCloudinary(existingJob.imagePublicId);
            }
            const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
            imageUrl = result.secure_url;
            imagePublicId = result.public_id;
        }

        // Regenerate slug if title or company changed
        const newTitle = title || existingJob.title;
        const newCompany = company || existingJob.company;
        const slug = generateSlug(newTitle, newCompany, existingJob.id);

        const updatedJob = await Job.findByIdAndUpdate(
            id,
            {
                slug, title, company, location, salary, salaryNote, jobType, experience,
                category, website, applyLink, lastDate, aboutCompany, description,
                responsibilities, eligibility, requiredSkills, applyIf, dontApplyIf,
                selectionProcess, benefits, applySteps,
                imageUrl,
                imagePublicId,
            },
            { new: true }
        );

        res.status(200).json({ message: "Updated successfully", updatedJob });
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ error: "Error updating job" });
    }
};

// ── DELETE job (also removes image from Cloudinary) ──────────────────────────
export const deleteJob = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) return res.status(400).json({ error: "Invalid ID" });

        const job = await Job.findById(id);
        if (!job) return res.status(404).json({ error: "Job not found" });

        if (job.imagePublicId) {
            await deleteFromCloudinary(job.imagePublicId);
        }

        await Job.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ error: "Error deleting job" });
    }
};

// ── POST trigger freehire sync (header: x-sync-secret) ───────────────────────
// Handy if your host sleeps and the in-process cron can't be trusted:
// call this from a free scheduler such as cron-job.org.
export const triggerSync = (req, res) => {
    if (!process.env.SYNC_SECRET || req.get("x-sync-secret") !== process.env.SYNC_SECRET) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    syncFreehireJobs(); // runs in background so the request doesn't time out
    res.status(202).json({ message: "Sync started" });
};

// ── GET health check ) ──────────────
export const healthCheck = (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
};