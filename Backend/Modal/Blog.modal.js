import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        excerpt: { type: String, required: true, maxlength: 300 },
        content: { type: String, required: true },
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

// Auto-calculate readTime from content
blogSchema.pre('save', function (next) {
    if (this.content) {
        const wordCount = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        this.readTime = Math.max(1, Math.ceil(wordCount / 200));
    }
    next();
});

export default mongoose.model('Blog', blogSchema);