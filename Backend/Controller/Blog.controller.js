import { randomUUID } from 'node:crypto';
import Blog from '../Modal/Blog.modal.js';
import cloudinary from '../config/cloudinary.config.js';
import sanitizeHtml from 'sanitize-html';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const BLOG_BLOCK_TYPES = new Set([
    'heading', 'paragraph', 'image', 'quote', 'list', 'callout', 'code', 'faq', 'link', 'button', 'table', 'divider',
]);
const RICH_HTML_OPTIONS = {
    allowedTags: [
        'address', 'article', 'b', 'blockquote', 'br', 'caption', 'code', 'del', 'details', 'div',
        'a', 'em', 'figcaption', 'figure', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img',
        'li', 'ol', 'p', 'pre', 's', 'span', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody',
        'td', 'th', 'thead', 'tr', 'u', 'ul',
    ],
    allowedAttributes: {
        a: ['href', 'title', 'target', 'rel'],
        code: ['class'],
        img: ['src', 'alt', 'title', 'width', 'height'],
        '*': ['class', 'style'],
    },
    allowedStyles: {
        '*': {
            color: [/^(#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%]+\)|[a-z]{3,20})$/i],
            'background-color': [/^(#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%]+\)|[a-z]{3,20})$/i],
            'text-align': [/^(left|right|center|justify)$/i],
            'font-weight': [/^(normal|bold|[1-9]00)$/i],
            'font-style': [/^(normal|italic)$/i],
            'text-decoration': [/^(none|underline|line-through)$/i],
        },
    },
    allowedSchemes: ['http', 'https'],
    allowedSchemesAppliedToAttributes: ['href', 'src'],
    allowProtocolRelative: false,
};

class BlogInputError extends Error {}

const isHttpUrl = (value) => {
    if (typeof value !== 'string' || !value.trim() || /\s/.test(value)) return false;
    try {
        const parsed = new URL(value);
        return ['http:', 'https:'].includes(parsed.protocol) && Boolean(parsed.hostname);
    } catch {
        return false;
    }
};

export const sanitizeBlogHtml = (html) => {
    if (typeof html !== 'string') throw new BlogInputError('Rich HTML fields must be strings');
    return sanitizeHtml(html, RICH_HTML_OPTIONS);
};

const parseTags = (tags) => {
    if (typeof tags !== 'string') return tags;
    try {
        const parsed = JSON.parse(tags);
        return Array.isArray(parsed) ? parsed : tags.split(',').map(tag => tag.trim()).filter(Boolean);
    } catch {
        return tags.split(',').map(tag => tag.trim()).filter(Boolean);
    }
};

const normalizeBlogBlocks = (blocks) => {
    if (typeof blocks === 'string') {
        try {
            blocks = JSON.parse(blocks);
        } catch {
            throw new BlogInputError('Blocks must be valid JSON');
        }
    }
    if (!Array.isArray(blocks)) throw new BlogInputError('Blocks must be an array');

    return blocks.map((block, index) => {
        if (!block || typeof block !== 'object' || Array.isArray(block) || !BLOG_BLOCK_TYPES.has(block.type)) {
            throw new BlogInputError(`Block ${index + 1} has an unsupported type`);
        }

        const normalized = {
            id: typeof block.id === 'string' && block.id.trim() ? block.id.trim().slice(0, 100) : randomUUID(),
            type: block.type,
            heading: typeof block.heading === 'string' ? block.heading.trim() : '',
            level: [2, 3, 4].includes(Number(block.level)) ? Number(block.level) : 2,
            content: block.content === undefined ? '' : sanitizeBlogHtml(block.content),
            url: typeof block.url === 'string' ? block.url.trim() : '',
            alt: typeof block.alt === 'string' ? block.alt.trim() : '',
            caption: typeof block.caption === 'string' ? block.caption.trim() : '',
            items: block.items === undefined ? [] : block.items,
            headers: block.headers === undefined ? [] : block.headers,
            rows: block.rows === undefined ? [] : block.rows,
            ordered: block.ordered === true || block.ordered === 'true',
            listType: ['bullet', 'numbered', 'checklist'].includes(block.listType)
                ? block.listType
                : (block.ordered === true || block.ordered === 'true' ? 'numbered' : 'bullet'),
            language: typeof block.language === 'string' ? block.language.trim() : '',
            question: typeof block.question === 'string' ? block.question.trim() : '',
            answer: block.answer === undefined ? '' : sanitizeBlogHtml(block.answer),
            style: {
                align: ['left', 'center', 'right'].includes(block.style?.align) ? block.style.align : undefined,
                fontSize: ['S', 'M', 'L'].includes(block.style?.fontSize) ? block.style.fontSize : undefined,
                bold: block.style?.bold === true,
                italic: block.style?.italic === true,
                textColor: block.style?.textColor || undefined,
                backgroundColor: block.style?.backgroundColor || undefined,
                accent: ['purple', 'blue', 'green', 'orange', 'red', 'teal', 'pink', 'gray'].includes(block.style?.accent)
                    ? block.style.accent
                    : undefined,
            },
        };

        if (!Array.isArray(normalized.items) || normalized.items.some(item => typeof item !== 'string')) {
            throw new BlogInputError(`Block ${index + 1} items must be an array of strings`);
        }
        normalized.items = normalized.items.map(item => sanitizeBlogHtml(item.trim())).filter(item => item.replace(/<[^>]*>/g, '').trim());
        if (!Array.isArray(normalized.headers) || normalized.headers.some(header => typeof header !== 'string')
            || !Array.isArray(normalized.rows)
            || normalized.rows.some(row => !Array.isArray(row) || row.some(cell => typeof cell !== 'string'))) {
            throw new BlogInputError(`Block ${index + 1} table data must be arrays of strings`);
        }
        normalized.headers = normalized.headers.map(header => header.trim()).filter(Boolean).slice(0, 20);
        normalized.rows = normalized.rows.slice(0, 100).map(row => row.slice(0, 20).map(cell => cell.trim()));
        if (normalized.url && !isHttpUrl(normalized.url)) {
            throw new BlogInputError(`Block ${index + 1} URL must use HTTP or HTTPS`);
        }
        for (const color of ['textColor', 'backgroundColor']) {
            if (normalized.style[color] && !/^#[0-9a-f]{6}$/i.test(normalized.style[color])) {
                throw new BlogInputError(`Block ${index + 1} ${color} must be a six-digit hex color`);
            }
        }

        const plain = html => html.replace(/<[^>]*>/g, ' ').trim();
        if (normalized.type === 'heading' && !normalized.heading) {
            throw new BlogInputError(`Block ${index + 1} needs a heading`);
        }
        if (['paragraph', 'quote', 'callout', 'code'].includes(normalized.type) && !plain(normalized.content)) {
            throw new BlogInputError(`Block ${index + 1} needs content`);
        }
        if (normalized.type === 'image' && (!isHttpUrl(normalized.url) || !normalized.alt)) {
            throw new BlogInputError(`Block ${index + 1} needs a valid HTTP(S) image URL and alt text`);
        }
        if (normalized.type === 'list' && normalized.items.length === 0) {
            throw new BlogInputError(`Block ${index + 1} needs at least one list item`);
        }
        if (normalized.type === 'faq' && (!normalized.question || !plain(normalized.answer))) {
            throw new BlogInputError(`Block ${index + 1} FAQ needs a question and answer`);
        }
        if (['link', 'button'].includes(normalized.type) && (!isHttpUrl(normalized.url) || !normalized.heading)) {
            throw new BlogInputError(`Block ${index + 1} link needs a label and valid HTTP(S) URL`);
        }
        if (normalized.type === 'table' && (!normalized.headers.length || !normalized.rows.length)) {
            throw new BlogInputError(`Block ${index + 1} table needs headers and at least one row`);
        }
        return normalized;
    });
};

export const normalizeBlogInput = (input, { existing, requireContent = false } = {}) => {
    const data = { ...input };
    if (typeof data.metaTitle === 'string') data.metaTitle = data.metaTitle.trim().slice(0, 70);
    if (typeof data.metaDescription === 'string') data.metaDescription = data.metaDescription.trim().slice(0, 160);
    if (data.tags !== undefined) data.tags = parseTags(data.tags);
    if (data.content !== undefined) data.content = sanitizeBlogHtml(data.content);
    else if (existing) data.content = sanitizeBlogHtml(existing.content || '');
    if (data.blocks !== undefined) data.blocks = normalizeBlogBlocks(data.blocks);
    if (data.imageUrl) {
        if (!isHttpUrl(data.imageUrl)) throw new BlogInputError('Image URL must use HTTP or HTTPS');
        data.imageUrl = data.imageUrl.trim();
    }
    if (data.authorPhoto) {
        if (!isHttpUrl(data.authorPhoto)) throw new BlogInputError('Author photo URL must use HTTP or HTTPS');
        data.authorPhoto = data.authorPhoto.trim();
    }

    const content = data.content ?? existing?.content ?? '';
    const blocks = data.blocks ?? existing?.blocks ?? [];
    const hasContent = typeof content === 'string' && content.replace(/<[^>]*>/g, ' ').trim().length > 0;
    const activeText = blocks.length
        ? blocks.flatMap(block => [
            block.heading, block.content, block.question, block.answer,
            ...(block.items || []), ...(block.headers || []), ...((block.rows || []).flat()),
        ]).join(' ')
        : content;
    const activePlainText = activeText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = activePlainText.split(/\s+/).filter(Boolean).length;
    data.readTime = Math.max(1, Math.ceil(words / 200));
    if (!String(data.excerpt ?? existing?.excerpt ?? '').trim() && activePlainText) {
        data.excerpt = activePlainText.slice(0, 297).trim();
    }
    const hasMeaningfulBlock = blocks.some(block => (
        ['paragraph', 'quote', 'callout', 'code'].includes(block.type)
            ? block.content.replace(/<[^>]*>/g, ' ').trim()
            : block.type === 'heading' ? block.heading
                : block.type === 'image' ? block.url
                    : block.type === 'list' ? block.items.length
                        : block.type === 'faq' ? block.question && block.answer.replace(/<[^>]*>/g, ' ').trim()
                            : ['link', 'button'].includes(block.type) ? block.url && block.heading
                                : block.type === 'table' ? block.headers?.length && block.rows?.length : false
    ));
    if (requireContent && !hasContent && !hasMeaningfulBlock) {
        throw new BlogInputError('Provide article content or at least one content block');
    }
    return data;
};

const handleError = (res, err, status = 500) => {
    console.error(err);
    const responseStatus = err instanceof BlogInputError ? 400 : status;
    res.status(responseStatus).json({ success: false, message: err.message || 'Server error' });
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
        const userAgent = String(req.get("user-agent") || "");
        const isBot = /bot|crawler|spider|preview|facebookexternalhit|slackbot|telegrambot/i.test(userAgent);
        let blog = await Blog.findOne({ slug: req.params.slug, published: true });
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        if (!isBot) {
            blog = await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } }, { new: true });
        }
        res.json({ success: true, blog });
    } catch (err) {
        handleError(res, err);
    }
};

// ─── GET all blogs for admin (includes unpublished) ──────────────────────────
export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (err) {
        handleError(res, err);
    }
};

// ─── CREATE blog ──────────────────────────────────────────────────────────────
export const createBlog = async (req, res) => {
    try {
        const data = normalizeBlogInput(req.body, { requireContent: true });

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

        const data = normalizeBlogInput(req.body, { existing: blog, requireContent: true });

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

        const normalizedBlogs = [];
        for (const blog of blogs) {
            if (!blog.title || !blog.slug) {
                return res.status(400).json({
                    success: false,
                    message: 'Each blog must contain title and slug'
                });
            }
            normalizedBlogs.push(normalizeBlogInput(blog, { requireContent: true }));
        }

        const insertedBlogs = await Blog.insertMany(normalizedBlogs);

        return res.status(201).json({
            success: true,
            message: 'Blogs uploaded successfully',
            count: insertedBlogs.length,
            blogs: insertedBlogs
        });

    } catch (error) {
        console.error('Bulk Upload Error:', error);
        if (error instanceof BlogInputError) {
            return res.status(400).json({ success: false, message: error.message });
        }
        return res.status(500).json({
            success: false,
            message: 'Bulk upload failed',
            error: error.message
        });
    }
};