import express from 'express';
import multer from 'multer';
import {
    getAllBlogs,
    getBlogBySlug,
    getAllBlogsAdmin,
    createBlog,
    updateBlog,
    deleteBlog,
    toggleBlogField,
    bulkUploadBlogs,
} from '../Controller/Blog.controller.js';
import { requireAdmin } from '../Middleware/auth.js';

const router = express.Router();

// Multer — memory storage (buffer passed to cloudinary)
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (_, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only image files are allowed'), false);
    },
});

// ── Public routes ─────────────────────────────────────────────────────────────
router.get('/', getAllBlogs);                        // GET /api/blog?page=1&limit=9&category=...
router.get('/slug/:slug', getBlogBySlug);            // GET /api/blog/slug/my-blog-title

// ── Admin routes ──────────────────────────────────────────────────────────────
router.get('/admin/all', requireAdmin, getAllBlogsAdmin);
router.post('/', requireAdmin, upload.single('image'), createBlog);
router.put('/:id', requireAdmin, upload.single('image'), updateBlog);
router.delete('/:id', requireAdmin, deleteBlog);
router.patch('/:id/toggle/:field', requireAdmin, toggleBlogField);
router.post('/bulk-upload', requireAdmin, bulkUploadBlogs);

export default router;