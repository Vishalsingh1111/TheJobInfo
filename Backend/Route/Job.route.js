
import express from "express";
import multer from "multer";
import {
    getJob,
    getJobBySlug,
    getJobById,
    getRelatedJobs,
    getJobStats,
    getJobSitemap,
    createJob,
    updateJob,
    deleteJob,
    healthCheck,
    triggerSync,
} from "../Controller/Job.controller.js";
import { requireAdmin } from "../Middleware/auth.js";

const router = express.Router();

// ── Multer: store in memory so we can stream to Cloudinary ───────────────────
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    },
});

// GET all jobs
router.get('/', getJob);

// Health check
router.get('/health', healthCheck);
router.get('/stats', getJobStats);
router.get('/sitemap', getJobSitemap);
router.get('/related/:slug', getRelatedJobs);
router.get('/id/:id', getJobById);

// GET single job by slug  ← NEW
router.get('/slug/:slug', getJobBySlug);

// POST trigger freehire sync manually (needs header x-sync-secret) ← NEW
router.post('/sync', triggerSync);

// POST create new job  (multipart/form-data, image field = "image")
router.post('/', requireAdmin, upload.single('image'), createJob);

// PUT update job by MongoDB _id  (multipart/form-data, image field = "image")
router.put("/:id", requireAdmin, upload.single('image'), updateJob);

// DELETE job by MongoDB _id
router.delete("/:id", requireAdmin, deleteJob);

export default router;