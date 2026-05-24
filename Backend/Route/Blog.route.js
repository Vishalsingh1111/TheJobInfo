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
router.get('/admin/all', getAllBlogsAdmin);           // GET /api/blog/admin/all
router.post('/', upload.single('image'), createBlog);                        // POST /api/blog
router.put('/:id', upload.single('image'), updateBlog);                      // PUT  /api/blog/:id
router.delete('/:id', deleteBlog);                   // DELETE /api/blog/:id
router.patch('/:id/toggle/:field', toggleBlogField); // PATCH /api/blog/:id/toggle/published
router.post('/bulk-upload', bulkUploadBlogs);  // Bulk upload blogs

export default router;