


// import mongoose from "mongoose";

// const commentSchema = new mongoose.Schema({
//     userName: {
//         type: String,
//         required: true
//     },
//     text: {
//         type: String,
//         required: true
//     },
//     timestamp: {
//         type: Date,
//         default: Date.now
//     }
// });

// const contentSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: String,
//     topic: String,
//     type: {
//         type: String,
//         enum: ["POST", "REEL"],
//         required: true
//     },
//     // For multiple files (only for POST type)
//     files: [{
//         fileType: String,
//         fileUrl: String
//     }],
//     // For single file (REEL type)
//     fileType: String,
//     fileUrl: String,
//     // Visibility scheduling
//     visibleAt: {
//         type: Date,
//         default: Date.now
//     },
//     // Comments for reels
//     comments: [commentSchema],
//     // Likes counter
//     likesCount: {
//         type: Number,
//         default: 0
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Virtual property to check if content is visible
// contentSchema.virtual('isVisible').get(function () {
//     return new Date() >= this.visibleAt;
// });

// // Ensure virtuals are included when converting to JSON
// contentSchema.set('toJSON', { virtuals: true });
// contentSchema.set('toObject', { virtuals: true });

// export default mongoose.model("Content", contentSchema);


import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    topic: String,
    type: {
        type: String,
        enum: ["POST", "REEL"],
        required: true
    },
    // For multiple files (only for POST type)
    files: [{
        fileType: String,
        fileUrl: String,
        publicId: String // Added for Cloudinary deletion
    }],
    // For single file (REEL type)
    fileType: String,
    fileUrl: String,
    publicId: String, // Added for Cloudinary deletion
    // Visibility scheduling
    visibleAt: {
        type: Date,
        default: Date.now
    },
    // Comments for reels
    comments: [commentSchema],
    // Likes counter
    likesCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual property to check if content is visible
contentSchema.virtual('isVisible').get(function () {
    return new Date() >= this.visibleAt;
});

// Ensure virtuals are included when converting to JSON
contentSchema.set('toJSON', { virtuals: true });
contentSchema.set('toObject', { virtuals: true });

export default mongoose.model("Content", contentSchema);