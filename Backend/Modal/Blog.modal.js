// import mongoose from "mongoose";

// const blogSchema = mongoose.Schema({
//     id: { type: Number, required: true },
//     header: { type: String, required: false },
//     code: { type: String, required: false },
//     explanation: { type: String, required: false },
//     code2: { type: String, required: false },
//     explanation2: { type: String, required: false },
//     code3: { type: String, required: false },
//     explanation3: { type: String, required: false },
//     image: { type: String, required: false },
//     category: { type: String, required: true }
// });

// blogSchema.index({ header: 'text', code: 'text', explanation: 'text', category: 'text' });

// const Blog = mongoose.model("Blog", blogSchema);
// export default Blog;

import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    header: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: false,
        default: ""
    },
    code2: {
        type: String,
        required: false,
        default: ""
    },
    explanation2: {
        type: String,
        required: false,
        default: ""
    },
    code3: {
        type: String,
        required: false,
        default: ""
    },
    explanation3: {
        type: String,
        required: false,
        default: ""
    },
    image: {
        type: String,
        required: false,
        default: ""
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    // New fields
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    tags: [{
        type: String,
        trim: true
    }],
    timeComplexity: {
        type: String,
        default: ""
    },
    spaceComplexity: {
        type: String,
        default: ""
    },
    author: {
        type: String,
        default: "Admin"
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'published'
    },
    featured: {
        type: Boolean,
        default: false
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Text search index
blogSchema.index({
    header: 'text',
    code: 'text',
    explanation: 'text',
    category: 'text',
    tags: 'text'
});

// Index for faster queries
blogSchema.index({ category: 1 });
blogSchema.index({ difficulty: 1 });
blogSchema.index({ status: 1 });
blogSchema.index({ featured: -1 });

// Update lastModified on save
blogSchema.pre('save', function (next) {
    this.lastModified = Date.now();
    next();
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;