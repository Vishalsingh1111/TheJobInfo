import Blog from '../Modal/Blog.modal.js';
import cloudinary from '../config/cloudinary.config.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const handleError = (res, err, status = 500) => {
    console.error(err);
    res.status(status).json({ success: false, message: err.message || 'Server error' });
};

// Upload image buffer to cloudinary
const uploadToCloudinary = (fileBuffer, mimetype) =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'blog_images', resource_type: 'image' },
            (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(fileBuffer);
    });

// ─── GET all blogs (with filtering, search, pagination) ──────────────────────
export const getAllBlogs = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 9,
            category,
            difficulty,
            search,
            featured,
            sort = 'newest',
        } = req.query;

        const query = { published: true };

        if (category && category !== 'All') query.category = category;
        if (difficulty && difficulty !== 'All') query.difficulty = difficulty;
        if (featured === 'true') query.featured = true;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } },
                { author: { $regex: search, $options: 'i' } },
            ];
        }

        const sortMap = {
            newest: { createdAt: -1 },
            oldest: { createdAt: 1 },
            popular: { views: -1 },
            'read-time-asc': { readTime: 1 },
            'read-time-desc': { readTime: -1 },
        };
        const sortObj = sortMap[sort] || { createdAt: -1 };

        const skip = (Number(page) - 1) * Number(limit);
        const total = await Blog.countDocuments(query);
        const blogs = await Blog.find(query)
            .sort(sortObj)
            .skip(skip)
            .limit(Number(limit))
            .select('-content'); // exclude content for list view

        res.json({
            success: true,
            blogs,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
        });
    } catch (err) {
        handleError(res, err);
    }
};

// ─── GET single blog by slug (increment views) ───────────────────────────────
export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { slug: req.params.slug, published: true },
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.json({ success: true, blog });
    } catch (err) {
        handleError(res, err);
    }
};

// ─── GET all blogs for admin (includes unpublished) ──────────────────────────
export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).select('-content');
        res.json({ success: true, blogs });
    } catch (err) {
        handleError(res, err);
    }
};

// ─── CREATE blog ──────────────────────────────────────────────────────────────
export const createBlog = async (req, res) => {
    try {
        const data = { ...req.body };

        // Parse tags if sent as JSON string
        if (typeof data.tags === 'string') {
            try { data.tags = JSON.parse(data.tags); } catch { data.tags = data.tags.split(',').map(t => t.trim()); }
        }

        // Upload image if provided
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
            data.imageUrl = result.secure_url;
            data.imagePublicId = result.public_id;
        }

        const blog = await Blog.create(data);
        res.status(201).json({ success: true, blog });
    } catch (err) {
        handleError(res, err);
    }
};

// ─── UPDATE blog ──────────────────────────────────────────────────────────────
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        const data = { ...req.body };
        if (typeof data.tags === 'string') {
            try { data.tags = JSON.parse(data.tags); } catch { data.tags = data.tags.split(',').map(t => t.trim()); }
        }

        // If new image uploaded, delete old from cloudinary
        if (req.file) {
            if (blog.imagePublicId) {
                await cloudinary.uploader.destroy(blog.imagePublicId);
            }
            const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
            data.imageUrl = result.secure_url;
            data.imagePublicId = result.public_id;
        }

        const updated = await Blog.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        res.json({ success: true, blog: updated });
    } catch (err) {
        handleError(res, err);
    }
};

// ─── DELETE blog ──────────────────────────────────────────────────────────────
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        // Remove image from cloudinary
        if (blog.imagePublicId) {
            await cloudinary.uploader.destroy(blog.imagePublicId);
        }

        await Blog.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Blog deleted successfully' });
    } catch (err) {
        handleError(res, err);
    }
};

// ─── TOGGLE published/featured ───────────────────────────────────────────────
export const toggleBlogField = async (req, res) => {
    try {
        const { field } = req.params; // 'published' or 'featured'
        if (!['published', 'featured'].includes(field)) {
            return res.status(400).json({ success: false, message: 'Invalid field' });
        }
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        blog[field] = !blog[field];
        await blog.save();
        res.json({ success: true, blog });
    } catch (err) {
        handleError(res, err);
    }
};


export const bulkUploadBlogs = async (req, res) => {

    try {

        const blogs = req.body.blogs;

        // Check if blogs is array
        if (!Array.isArray(blogs)) {
            return res.status(400).json({
                success: false,
                message: 'Blogs must be an array'
            });
        }

        // Optional validation
        for (const blog of blogs) {

            if (!blog.title || !blog.slug) {
                return res.status(400).json({
                    success: false,
                    message: 'Each blog must contain title and slug'
                });
            }
        }

        // Insert blogs
        const insertedBlogs = await Blog.insertMany(blogs);

        return res.status(201).json({
            success: true,
            message: 'Blogs uploaded successfully',
            count: insertedBlogs.length,
            blogs: insertedBlogs
        });

    } catch (error) {

        console.error('Bulk Upload Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Bulk upload failed',
            error: error.message
        });
    }
};