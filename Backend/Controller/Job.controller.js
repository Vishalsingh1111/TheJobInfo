import Job from "../Modal/Job.modal.js";
import cloudinary from "../config/cloudinary.config.js";
import { syncFreehireJobs } from "./Freehiresync.service.js";
import { getTelegramSkipReason, postJobToTelegram, shouldPostToTelegram } from "./Telegram.service.js";
import {
    createDedupeKey,
    deriveJobLevel,
    deriveWorkMode,
    normalizeCity,
    parseArrayField,
    parseFaqs,
    parseObjectField,
    parseJobListPagination,
    withDerivedJobLevel,
} from "../Utils/jobMetadata.js";

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
        const now = new Date();
        const query = {
            $or: [
                { expiresAt: { $exists: false } },
                { expiresAt: null },
                { expiresAt: { $gte: now } },
            ],
        };
        const { level, city, workMode, q, category, company, sort, experience, salary } = req.query;
        const requestedLevel = level && level !== "all" ? String(level) : null;
        if (requestedLevel) {
            const acceptedLevels = requestedLevel === "fresher" || requestedLevel === "experienced"
                ? [requestedLevel, "dual"]
                : [requestedLevel];
            query.level = { $in: [...acceptedLevels, null, ""] };
        }
        if (city) query.city = normalizeCity(city);
        if (workMode) query.workMode = workMode;
        if (category) query.category = category;
        if (company) query.company = { $regex: String(company).slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
        if (experience) query.experience = { $regex: String(experience).slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
        if (salary === "disclosed") query.salary = { $exists: true, $nin: ["", "Not disclosed"] };
        if (q) {
            const term = String(q).slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            query.$and = [
                { $or: [{ title: { $regex: term, $options: "i" } }, { company: { $regex: term, $options: "i" } }] },
            ];
        }

        const sortMap = { newest: { createdAt: -1 }, oldest: { createdAt: 1 }, title: { title: 1 } };
        const sortBy = sortMap[sort] || { id: -1 };
        const pagination = parseJobListPagination(req.query);
        const serializeJobs = (jobs) => jobs
            .map((job) => withDerivedJobLevel(job.toObject()))
            .filter((job) => {
                if (!requestedLevel) return true;
                if (requestedLevel === "fresher" || requestedLevel === "experienced") {
                    return job.level === requestedLevel || job.level === "dual";
                }
                return job.level === requestedLevel;
            });
        if (!pagination) {
            const jobs = await Job.find(query).sort(sortBy);
            return res.status(200).json(serializeJobs(jobs));
        }
        if (requestedLevel) {
            const matchingJobs = serializeJobs(await Job.find(query).sort(sortBy));
            const jobs = matchingJobs.slice(pagination.skip, pagination.skip + pagination.limit);
            return res.status(200).json({
                jobs,
                total: matchingJobs.length,
                page: pagination.page,
                pages: Math.ceil(matchingJobs.length / pagination.limit),
            });
        }
        const [total, jobs] = await Promise.all([
            Job.countDocuments(query),
            Job.find(query).sort(sortBy).skip(pagination.skip).limit(pagination.limit),
        ]);
        return res.status(200).json({
            jobs: serializeJobs(jobs),
            total,
            page: pagination.page,
            pages: Math.ceil(total / pagination.limit),
        });
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
        if (job.expiresAt && job.expiresAt < new Date()) {
            return res.status(410).json({ error: "Job is no longer accepting applications" });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error("Error fetching job by slug:", error);
        res.status(500).json({ error: "Error fetching job" });
    }
};

export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });
        if (job.expiresAt && job.expiresAt < new Date()) {
            return res.status(410).json({ error: "Job is no longer accepting applications" });
        }
        return res.status(200).json(job);
    } catch (error) {
        return res.status(400).json({ error: "Invalid job ID" });
    }
};

export const getRelatedJobs = async (req, res) => {
    try {
        const jobFields = "city location level jobType category title experience employment_type seniority experience_years_min experience_years_max";
        const identifier = req.params.slug;
        const job = await Job.findOne({ slug: identifier }).select(jobFields).lean()
            || (/^[a-f\d]{24}$/i.test(identifier)
                ? await Job.findById(identifier).select(jobFields).lean()
                : null);
        if (!job) return res.status(404).json({ error: "Job not found" });
        const limit = Math.min(12, Math.max(1, Number.parseInt(req.query.limit, 10) || 6));
        const normalizeValue = (value) => String(value || "").trim().toLowerCase();
        const jobLevel = job.level || deriveJobLevel(job);
        const jobCity = normalizeCity(job.city && job.city !== "Other" ? job.city : job.location);
        const conditions = [];
        if (job.jobType) conditions.push({ jobType: { $regex: String(job.jobType).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } });
        if (job.category) conditions.push({ category: { $regex: String(job.category).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } });
        if (jobLevel) conditions.push({ level: jobLevel });
        if (jobCity !== "Other") {
            conditions.push({ city: jobCity });
            conditions.push({ location: { $regex: jobCity.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } });
        }
        if (!conditions.length) return res.status(200).json([]);

        const candidates = await Job.find({
            _id: { $ne: job._id },
            $and: [
                { $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gte: new Date() } }] },
                { $or: conditions },
            ],
        }).select("_id slug title company location city level jobType category salary experience employment_type seniority experience_years_min experience_years_max imageUrl postedAt createdAt")
            .sort({ createdAt: -1 })
            .limit(250)
            .lean();
        const jobDimensions = {
            city: jobCity === "Other" ? "" : jobCity,
            level: jobLevel,
            jobType: normalizeValue(job.jobType),
            category: normalizeValue(job.category),
        };
        const score = (candidate) => {
            const candidateCity = normalizeCity(candidate.city && candidate.city !== "Other" ? candidate.city : candidate.location);
            const dimensions = {
                city: candidateCity === "Other" ? "" : candidateCity,
                level: candidate.level || deriveJobLevel(candidate),
                jobType: normalizeValue(candidate.jobType),
                category: normalizeValue(candidate.category),
            };
            return (jobDimensions.city && dimensions.city === jobDimensions.city ? 2 : 0)
                + (jobDimensions.level && dimensions.level === jobDimensions.level ? 3 : 0)
                + (jobDimensions.jobType && dimensions.jobType === jobDimensions.jobType ? 2 : 0)
                + (jobDimensions.category && dimensions.category === jobDimensions.category ? 3 : 0);
        };
        const jobs = candidates
            .map((candidate) => ({ candidate, relevance: score(candidate) }))
            .filter(({ relevance }) => relevance >= 3)
            .sort((a, b) => b.relevance - a.relevance
                || new Date(b.candidate.createdAt || 0) - new Date(a.candidate.createdAt || 0))
            .slice(0, limit);
        return res.status(200).json(jobs.map(({ candidate }) => candidate));
    } catch (error) {
        console.error("Error fetching related jobs:", error.message);
        return res.status(500).json({ error: "Error fetching related jobs" });
    }
};

export const getJobStats = async (_req, res) => {
    try {
        const active = {
            $or: [
                { expiresAt: { $exists: false } },
                { expiresAt: null },
                { expiresAt: { $gte: new Date() } },
            ],
        };
        const recentCutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
        const [total, classifiedJobs, cities, companies, recent, latest] = await Promise.all([
            Job.countDocuments(active),
            Job.find(active)
                .select("level title jobType employment_type seniority experience experience_years_min experience_years_max createdAt")
                .lean(),
            Job.aggregate([{ $match: active }, { $group: { _id: "$city", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 12 }]),
            Job.distinct("company", active),
            Job.countDocuments({ ...active, createdAt: { $gte: recentCutoff } }),
            Job.findOne(active).sort({ updatedAt: -1 }).select("updatedAt").lean(),
        ]);
        const byLevel = {};
        const addedLast48HoursByLevel = {};
        for (const job of classifiedJobs) {
            const jobLevel = job.level || deriveJobLevel(job);
            if (!jobLevel) continue;
            byLevel[jobLevel] = (byLevel[jobLevel] || 0) + 1;
            if (job.createdAt && job.createdAt >= recentCutoff) {
                addedLast48HoursByLevel[jobLevel] = (addedLast48HoursByLevel[jobLevel] || 0) + 1;
            }
        }
        return res.status(200).json({
            total,
            byLevel,
            addedLast48HoursByLevel,
            byCity: cities.map(({ _id, count }) => ({ city: _id || "Other", count })),
            distinctCompanies: companies.length,
            addedLast48Hours: recent,
            lastUpdated: latest?.updatedAt || null,
        });
    } catch (error) {
        console.error("Error fetching job statistics:", error.message);
        return res.status(500).json({ error: "Error fetching job statistics" });
    }
};

export const getJobSitemap = async (_req, res) => {
    try {
        const jobs = await Job.find({
            $or: [
                { expiresAt: { $exists: false } },
                { expiresAt: null },
                { expiresAt: { $gte: new Date() } },
            ],
        }).select("slug updatedAt").lean();
        return res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching job sitemap:", error.message);
        return res.status(500).json({ error: "Error fetching job sitemap" });
    }
};

const isValidApplyLink = (value) => {
    try {
        return ["http:", "https:"].includes(new URL(value).protocol);
    } catch {
        return false;
    }
};

// ── POST create job (with optional image) ─────────────────────────────────────
export const createJob = async (req, res) => {
    try {
        const {
            id, title, company, location, salary, salaryNote, jobType, experience,
            category, website, applyLink, lastDate, aboutCompany, description,
            responsibilities, eligibility, requiredSkills, applyIf,
            selectionProcess, benefits, applySteps, summary, prepTips, faqs,
            city, workMode, level, externalId, source, expiresAt, forceTelegram = false,
            prepGuide, customSections, sectionOrder, hiddenSections,
        } = req.body;

        const cleanTitle = String(title || '').trim();
        const cleanCompany = String(company || '').trim();
        const cleanApplyLink = String(applyLink || '').trim();
        if (!cleanTitle || cleanTitle.length > 200 || !cleanCompany || cleanCompany.length > 150 ||
            !category || String(category).length > 100 || !isValidApplyLink(cleanApplyLink)) {
            return res.status(400).json({ error: "Valid title, company, category, and HTTP(S) apply link are required" });
        }
        const normalizedCity = normalizeCity(city || location);
        const dedupeKey = createDedupeKey({ company: cleanCompany, title: cleanTitle, city: normalizedCity });
        const duplicate = await Job.findOne({
            dedupeKey,
            $or: [
                { applyLink: cleanApplyLink },
                ...(externalId ? [{ externalId: String(externalId).trim() }] : []),
            ],
        }).select("_id title company");
        if (duplicate) return res.status(409).json({ error: "Duplicate job", duplicate });

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
            id, slug, title: cleanTitle, company: cleanCompany, location, salary, salaryNote, jobType, experience,
            category, website, applyLink: cleanApplyLink, lastDate, aboutCompany, description,
            responsibilities, eligibility, requiredSkills, applyIf,
            selectionProcess, benefits, applySteps,
            summary, prepTips: parseArrayField(prepTips), faqs: parseFaqs(faqs), city: normalizedCity,
            prepGuide: parseObjectField(prepGuide),
            customSections: parseArrayField(customSections),
            sectionOrder: parseArrayField(sectionOrder),
            hiddenSections: parseArrayField(hiddenSections),
            workMode: workMode || deriveWorkMode(location),
            level: level || deriveJobLevel({ title: cleanTitle, jobType, experience }),
            forceTelegram: forceTelegram === true || forceTelegram === "true",
            dedupeKey,
            externalId: externalId || undefined,
            source: source || "manual",
            expiresAt: expiresAt || undefined,
            imageUrl,
            imagePublicId,
        });

        await newJob.save();
        if (shouldPostToTelegram(newJob)) {
            void postJobToTelegram(newJob).catch((error) => console.error("Telegram job post failed:", error.message));
        } else {
            console.log(`[telegram] skipped: ${getTelegramSkipReason(newJob)}`);
        }
        return res.status(201).json({ message: "Created successfully", job: newJob });
    } catch (error) {
        console.error("Error creating job:", error);
        return res.status(500).json({ error: "Error creating job" });
    }
};

// ── PUT update job (with optional new image) ──────────────────────────────────
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const {
        title, company, location, salary, salaryNote, jobType, experience,
        category, website, applyLink, lastDate, aboutCompany, description,
        responsibilities, eligibility, requiredSkills, applyIf,
        selectionProcess, benefits, applySteps, summary, prepTips, faqs,
        city, workMode, level, externalId, source, expiresAt,
        prepGuide, customSections, sectionOrder, hiddenSections, forceTelegram
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
        const newCity = normalizeCity(city || location || existingJob.city || existingJob.location);
        const newApplyLink = applyLink || existingJob.applyLink;
        if (!isValidApplyLink(newApplyLink)) {
            return res.status(400).json({ error: "A valid HTTP(S) apply link is required" });
        }
        const dedupeKey = createDedupeKey({ company: newCompany, title: newTitle, city: newCity });
        const duplicate = await Job.findOne({
            _id: { $ne: existingJob._id },
            dedupeKey,
            $or: [
                { applyLink: newApplyLink },
                ...(externalId || existingJob.externalId ? [{ externalId: externalId || existingJob.externalId }] : []),
            ],
        }).select("_id title company");
        if (duplicate) return res.status(409).json({ error: "Duplicate job", duplicate });

        Object.assign(existingJob, {
                slug,
                title: title || existingJob.title,
                company: company || existingJob.company,
                location: location ?? existingJob.location,
                salary: salary ?? existingJob.salary,
                salaryNote: salaryNote ?? existingJob.salaryNote,
                jobType: jobType ?? existingJob.jobType,
                experience: experience ?? existingJob.experience,
                category: category ?? existingJob.category,
                website: website ?? existingJob.website,
                applyLink: newApplyLink,
                lastDate: lastDate ?? existingJob.lastDate,
                aboutCompany: aboutCompany ?? existingJob.aboutCompany,
                description: description ?? existingJob.description,
                responsibilities: responsibilities ?? existingJob.responsibilities,
                eligibility: eligibility ?? existingJob.eligibility,
                requiredSkills: requiredSkills ?? existingJob.requiredSkills,
                applyIf: applyIf ?? existingJob.applyIf,
                selectionProcess: selectionProcess ?? existingJob.selectionProcess,
                benefits: benefits ?? existingJob.benefits,
                applySteps: applySteps ?? existingJob.applySteps,
                summary: summary ?? existingJob.summary,
                prepTips: prepTips === undefined ? existingJob.prepTips : parseArrayField(prepTips),
                faqs: faqs === undefined ? existingJob.faqs : parseFaqs(faqs),
                prepGuide: prepGuide === undefined ? existingJob.prepGuide : parseObjectField(prepGuide),
                customSections: customSections === undefined ? existingJob.customSections : parseArrayField(customSections),
                sectionOrder: sectionOrder === undefined ? existingJob.sectionOrder : parseArrayField(sectionOrder),
                hiddenSections: hiddenSections === undefined ? existingJob.hiddenSections : parseArrayField(hiddenSections),
                forceTelegram: forceTelegram === undefined ? existingJob.forceTelegram : forceTelegram === true || forceTelegram === "true",
                city: newCity,
                workMode: workMode || existingJob.workMode || deriveWorkMode(location || existingJob.location),
                level: level || existingJob.level || deriveJobLevel({ title: newTitle, jobType: jobType || existingJob.jobType, experience: experience || existingJob.experience }),
                dedupeKey,
                externalId: externalId || existingJob.externalId,
                source: source || existingJob.source,
                expiresAt: expiresAt === undefined ? existingJob.expiresAt : (expiresAt || null),
                imageUrl,
                imagePublicId,
        });
        const updatedJob = await existingJob.save();

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