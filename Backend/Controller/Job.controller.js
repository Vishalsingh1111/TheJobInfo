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

let jobStatsCache = null;
let jobStatsCacheAt = 0;

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
            $and: [{
                $or: [
                    { expiresAt: { $exists: false } },
                    { expiresAt: null },
                    { expiresAt: { $gte: now } },
                ],
            }],
        };
        const { level, city, location, workMode, q, category, company, sort, experience, experienceFilter, salary, salaryFilter, type } = req.query;
        const requestedLevel = level && level !== "all" ? String(level) : null;
        if (requestedLevel) {
            const acceptedLevels = requestedLevel === "fresher" || requestedLevel === "experienced"
                ? [requestedLevel, "dual"]
                : [requestedLevel];
            query.$and.push({
                $or: [
                    { level: { $in: acceptedLevels } },
                    { level: { $exists: false } },
                    { level: null },
                    { level: "" },
                ],
            });
        }
        if (city) query.city = normalizeCity(city);
        if (location) {
            const value = String(location).slice(0, 100);
            const locationRegex = new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
            const normalizedLocation = normalizeCity(value);
            query.$and.push({
                $or: [
                    { location: locationRegex },
                    ...(normalizedLocation !== "Other" ? [{ city: normalizedLocation }] : []),
                ],
            });
        }
        if (workMode) query.workMode = workMode;
        if (category) query.category = { $regex: String(category).slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
        if (company) query.company = { $regex: String(company).slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
        if (experience) query.experience = { $regex: String(experience).slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
        if (salary === "disclosed") {
            query.$and.push({
                $or: [
                    { salary: { $exists: true, $nin: ["", "Not disclosed"] } },
                    { salaryNote: { $exists: true, $nin: ["", "Not disclosed"] } },
                ],
            });
        }
        if (type) {
            const typeValue = String(type).slice(0, 100);
            if (/^(?:work from home|wfh|remote)$/i.test(typeValue)) {
                query.$and.push({
                    $or: [
                        { workMode: "Remote" },
                        { location: { $regex: "remote|work from home|wfh", $options: "i" } },
                    ],
                });
            } else {
                query.jobType = { $regex: typeValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
            }
        }
        if (q) {
            const term = String(q).slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            query.$and.push({
                $or: [
                    { title: { $regex: term, $options: "i" } },
                    { company: { $regex: term, $options: "i" } },
                    { location: { $regex: term, $options: "i" } },
                    { description: { $regex: term, $options: "i" } },
                ],
            });
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
        const experienceRanges = {
            "Fresher (0)": [0, 0],
            "Up to 1 Year": [0, 1],
            "Up to 2 Years": [0, 2],
            "1-3 Years": [1, 3],
            "2-5 Years": [2, 5],
            "3-5 Years": [3, 5],
            "5+ Years": [5, 99],
        };
        const salaryRanges = {
            "Under ₹3 LPA": [0, 3],
            "₹3–5 LPA": [3, 5],
            "₹5–8 LPA": [5, 8],
            "₹8–12 LPA": [8, 12],
            "₹12+ LPA": [12, 999],
        };
        if (pagination) {
            const stages = [{ $match: query }];
            if (requestedLevel || experienceRanges[experienceFilter] || salaryRanges[salaryFilter]) {
                stages.push({
                    $set: {
                        _jobText: {
                            $toLower: {
                                $concat: [
                                    { $ifNull: ["$title", ""] }, " ",
                                    { $ifNull: ["$jobType", ""] }, " ",
                                    { $ifNull: ["$employment_type", ""] }, " ",
                                    { $ifNull: ["$seniority", ""] },
                                ],
                            },
                        },
                        _jobTypeText: { $toLower: { $ifNull: ["$jobType", ""] } },
                        _experienceValues: {
                            $map: {
                                input: {
                                    $regexFindAll: {
                                        input: { $replaceAll: { input: { $ifNull: ["$experience", ""] }, find: ",", replacement: "" } },
                                        regex: "\\d+(?:\\.\\d+)?",
                                    },
                                },
                                as: "match",
                                in: { $convert: { input: "$$match.match", to: "double", onError: null, onNull: null } },
                            },
                        },
                        _salaryValues: {
                            $map: {
                                input: {
                                    $regexFindAll: {
                                        input: {
                                            $replaceAll: {
                                                input: {
                                                    $cond: [
                                                        { $eq: [{ $ifNull: ["$salary", ""] }, ""] },
                                                        { $ifNull: ["$salaryNote", ""] },
                                                        "$salary",
                                                    ],
                                                },
                                                find: ",",
                                                replacement: "",
                                            },
                                        },
                                        regex: "\\d+(?:\\.\\d+)?",
                                    },
                                },
                                as: "match",
                                in: {
                                    $let: {
                                        vars: { amount: { $convert: { input: "$$match.match", to: "double", onError: null, onNull: null } } },
                                        in: {
                                            $cond: [
                                                {
                                                    $regexMatch: {
                                                        input: {
                                                            $cond: [
                                                                { $eq: [{ $ifNull: ["$salary", ""] }, ""] },
                                                                { $ifNull: ["$salaryNote", ""] },
                                                                "$salary",
                                                            ],
                                                        },
                                                        regex: "month",
                                                        options: "i",
                                                    },
                                                },
                                                { $divide: [{ $multiply: ["$$amount", 12] }, 100000] },
                                                "$$amount",
                                            ],
                                        },
                                    },
                                },
                            },
                        },
                    },
                });
                stages.push({
                    $set: {
                        _experienceMin: {
                            $cond: [
                                { $gt: [{ $size: "$_experienceValues" }, 0] },
                                { $arrayElemAt: ["$_experienceValues", 0] },
                                { $cond: [{ $regexMatch: { input: { $ifNull: ["$experience", ""] }, regex: "fresher", options: "i" } }, 0, null] },
                            ],
                        },
                        _experienceMax: {
                            $cond: [
                                { $gt: [{ $size: "$_experienceValues" }, 1] },
                                { $arrayElemAt: ["$_experienceValues", 1] },
                                { $cond: [
                                    { $gt: [{ $size: "$_experienceValues" }, 0] },
                                    { $arrayElemAt: ["$_experienceValues", 0] },
                                    { $cond: [{ $regexMatch: { input: { $ifNull: ["$experience", ""] }, regex: "fresher", options: "i" } }, 0, null] },
                                ] },
                            ],
                        },
                        _salaryMin: {
                            $cond: [
                                { $gt: [{ $size: "$_salaryValues" }, 1] },
                                { $min: "$_salaryValues" },
                                { $cond: [
                                    { $gt: [{ $size: "$_salaryValues" }, 0] },
                                    0,
                                    null,
                                ] },
                            ],
                        },
                        _salaryMax: {
                            $cond: [
                                { $gt: [{ $size: "$_salaryValues" }, 1] },
                                { $max: "$_salaryValues" },
                                { $cond: [
                                    { $gt: [{ $size: "$_salaryValues" }, 0] },
                                    { $arrayElemAt: ["$_salaryValues", 0] },
                                    null,
                                ] },
                            ],
                        },
                    },
                });
                if (requestedLevel) {
                    stages.push({
                        $set: {
                            _effectiveLevel: {
                                $ifNull: [
                                    { $cond: [{ $in: ["$level", [null, ""]] }, null, "$level"] },
                                    {
                                        $switch: {
                                            branches: [
                                                { case: { $regexMatch: { input: "$_jobText", regex: "\\b(intern(ship)?|fellowship)\\b" } }, then: "internship" },
                                                { case: { $and: [
                                                    { $regexMatch: { input: "$_jobTypeText", regex: "fresher" } },
                                                    { $regexMatch: { input: "$_jobTypeText", regex: "experienced" } },
                                                ] }, then: "dual" },
                                                { case: { $and: [
                                                    { $ne: ["$_experienceMin", null] },
                                                    { $gte: ["$_experienceMin", 2] },
                                                ] }, then: "experienced" },
                                                { case: { $and: [
                                                    { $ne: ["$_experienceMax", null] },
                                                    { $lte: ["$_experienceMax", 1] },
                                                ] }, then: "fresher" },
                                                { case: { $and: [
                                                    { $ne: ["$_experienceMin", null] },
                                                    { $lte: ["$_experienceMin", 1] },
                                                    { $ne: ["$_experienceMax", null] },
                                                    { $gte: ["$_experienceMax", 2] },
                                                ] }, then: "dual" },
                                                { case: { $regexMatch: { input: "$_jobText", regex: "\\b(senior|staff|principal|lead|manager|experienced|associate)\\b" } }, then: "experienced" },
                                                { case: { $regexMatch: { input: "$_jobText", regex: "\\b(fresher|graduate|junior|entry[- ]level|trainee)\\b" } }, then: "fresher" },
                                            ],
                                            default: null,
                                        },
                                    },
                                ],
                            },
                        },
                    });
                    const acceptedLevels = requestedLevel === "fresher" || requestedLevel === "experienced"
                        ? [requestedLevel, "dual"]
                        : [requestedLevel];
                    stages.push({ $match: { _effectiveLevel: { $in: acceptedLevels } } });
                }
                const experienceRange = experienceRanges[experienceFilter];
                if (experienceRange) {
                    const [minimum, maximum] = experienceRange;
                    stages.push({
                        $match: {
                            $or: [
                                { _experienceMin: null },
                                { $and: [{ _experienceMin: { $lte: maximum } }, { _experienceMax: { $gte: minimum } }] },
                            ],
                        },
                    });
                }
                const salaryRange = salaryRanges[salaryFilter];
                if (salaryRange) {
                    const [minimum, maximum] = salaryRange;
                    stages.push({
                        $match: {
                            $or: [
                                { _salaryMin: null },
                                { $and: [{ _salaryMin: { $lte: maximum } }, { _salaryMax: { $gte: minimum } }] },
                            ],
                        },
                    });
                }
            }
            stages.push({
                $facet: {
                    metadata: [{ $count: "total" }],
                    jobs: [
                        ...(requestedLevel ? [{ $set: { level: "$_effectiveLevel" } }] : []),
                        {
                            $project: {
                                _id: 1, id: 1, slug: 1, title: 1, company: 1, location: 1, city: 1,
                                workMode: 1, jobType: 1, experience: 1, salary: 1, salaryNote: 1,
                                category: 1, summary: 1, description: 1, imageUrl: 1, postedAt: 1,
                                createdAt: 1, level: 1,
                            },
                        },
                        { $sort: sortBy },
                        { $skip: pagination.skip },
                        { $limit: pagination.limit },
                    ],
                },
            });
            const [result] = await Job.aggregate(stages);
            const jobs = (result?.jobs || []).map((job) => withDerivedJobLevel(job));
            const total = result?.metadata?.[0]?.total || 0;
            return res.status(200).json({
                jobs,
                total,
                page: pagination.page,
                pages: Math.ceil(total / pagination.limit),
            });
        }
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
        if (jobStatsCache && Date.now() - jobStatsCacheAt < 30_000) {
            return res.status(200).json(jobStatsCache);
        }
        const active = {
            $or: [
                { expiresAt: { $exists: false } },
                { expiresAt: null },
                { expiresAt: { $gte: new Date() } },
            ],
        };
        const recentCutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
        const [total, explicitLevels, legacyJobs, cities, categories, companies, recentByLevel, recent, latest] = await Promise.all([
            Job.countDocuments(active),
            Job.aggregate([
                { $match: { ...active, level: { $exists: true, $nin: [null, ""] } } },
                { $group: { _id: "$level", count: { $sum: 1 } } },
            ]),
            Job.find({
                ...active,
                $or: [{ level: { $exists: false } }, { level: null }, { level: "" }],
            })
                .select("level title jobType employment_type seniority experience experience_years_min experience_years_max createdAt")
                .lean(),
            Job.aggregate([{ $match: active }, { $group: { _id: "$city", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
            Job.aggregate([{ $match: active }, { $group: { _id: "$category", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
            Job.distinct("company", active),
            Job.aggregate([
                { $match: { ...active, createdAt: { $gte: recentCutoff }, level: { $exists: true, $nin: [null, ""] } } },
                { $group: { _id: "$level", count: { $sum: 1 } } },
            ]),
            Job.countDocuments({ ...active, createdAt: { $gte: recentCutoff } }),
            Job.findOne(active).sort({ updatedAt: -1 }).select("updatedAt").lean(),
        ]);
        const byLevel = Object.fromEntries(explicitLevels.map(({ _id, count }) => [_id, count]));
        const addedLast48HoursByLevel = Object.fromEntries(recentByLevel.map(({ _id, count }) => [_id, count]));
        for (const job of legacyJobs) {
            const jobLevel = job.level || deriveJobLevel(job);
            if (!jobLevel) continue;
            byLevel[jobLevel] = (byLevel[jobLevel] || 0) + 1;
            if (job.createdAt && job.createdAt >= recentCutoff) {
                addedLast48HoursByLevel[jobLevel] = (addedLast48HoursByLevel[jobLevel] || 0) + 1;
            }
        }
        jobStatsCache = {
            total,
            byLevel,
            addedLast48HoursByLevel,
            byCity: cities.map(({ _id, count }) => ({ city: _id || "Other", count })),
            byCategory: categories.map(({ _id, count }) => ({ category: _id || "Other", count })),
            distinctCompanies: companies.length,
            addedLast48Hours: recent,
            lastUpdated: latest?.updatedAt || null,
        };
        jobStatsCacheAt = Date.now();
        return res.status(200).json(jobStatsCache);
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