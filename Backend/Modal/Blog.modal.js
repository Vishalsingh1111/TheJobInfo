import mongoose from 'mongoose';

const blogBlockSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ['heading', 'paragraph', 'image', 'quote', 'list', 'callout', 'code', 'faq', 'link', 'button', 'table', 'divider'],
        },
        id: { type: String, trim: true, maxlength: 100 },
        heading: { type: String, trim: true, default: '' },
        level: { type: Number, enum: [2, 3, 4], default: 2 },
        content: { type: String, default: '' },
        url: { type: String, trim: true, default: '' },
        alt: { type: String, trim: true, default: '' },
        caption: { type: String, trim: true, default: '' },
        items: [{ type: String, trim: true }],
        headers: [{ type: String, trim: true }],
        rows: { type: [[String]], default: [] },
        ordered: { type: Boolean, default: false },
        listType: { type: String, enum: ['bullet', 'numbered', 'checklist'], default: 'bullet' },
        language: { type: String, trim: true, default: '' },
        question: { type: String, trim: true, default: '' },
        answer: { type: String, default: '' },
        style: {
            align: { type: String, enum: ['left', 'center', 'right'] },
            fontSize: { type: String, enum: ['S', 'M', 'L'] },
            bold: { type: Boolean, default: false },
            italic: { type: Boolean, default: false },
            textColor: { type: String, match: /^#[0-9a-f]{6}$/i },
            backgroundColor: { type: String, match: /^#[0-9a-f]{6}$/i },
            accent: { type: String, enum: ['purple', 'blue', 'green', 'orange', 'red', 'teal', 'pink', 'gray'] },
        },
    },
    { _id: true }
);

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        excerpt: { type: String, required: true, maxlength: 300 },
        metaTitle: { type: String, trim: true, maxlength: 70, default: '' },
        metaDescription: { type: String, trim: true, maxlength: 160, default: '' },
        content: { type: String, default: '' },
        blocks: { type: [blogBlockSchema], default: [] },
        category: {
            type: String,
            required: true,
            enum: ['Interview Tips', 'DSA', 'System Design', 'HR Round', 'Resume Tips', 'Aptitude', 'Coding Interview', 'Career Advice'],
        },
        tags: [{ type: String, trim: true }],
        difficulty: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            default: 'Beginner',
        },
        readTime: { type: Number, default: 5 }, // minutes
        imageUrl: { type: String, default: '' },
        imagePublicId: { type: String, default: '' }, // cloudinary public_id for deletion
        author: { type: String, default: 'TheJobInfo Team' },
        authorBio: { type: String, default: '' },
        authorPhoto: { type: String, default: '' },
        reviewedAt: { type: Date, required: false },
        views: { type: Number, default: 0 },
        featured: { type: Boolean, default: false },
        published: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Auto-generate slug from title if not provided
blogSchema.pre('validate', function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
    next();
});

// Auto-calculate readTime from whichever article format is populated.
blogSchema.pre('save', function (next) {
    const blockText = (this.blocks || []).flatMap(block => [
        block.heading,
        block.content,
        block.question,
        block.answer,
        ...(block.items || []),
    ]).join(' ');
    const text = (this.blocks?.length ? blockText : this.content || '').replace(/<[^>]*>/g, ' ');
    const tableText = (this.blocks || []).flatMap(block => [
        ...(block.headers || []),
        ...((block.rows || []).flatMap(row => row || [])),
    ]).join(' ');
    const wordCount = `${text} ${tableText}`.trim().split(/\s+/).filter(Boolean).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
    next();
});

export default mongoose.model('Blog', blogSchema);