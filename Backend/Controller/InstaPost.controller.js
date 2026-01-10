// // import Content from "../Modal/InstaPost.modal.js";

// // export const createContent = async (req, res) => {
// //     try {
// //         const { title, description, topic, type } = req.body;

// //         const newContent = new Content({
// //             title,
// //             description,
// //             topic,
// //             type,
// //             fileType: req.file.mimetype,
// //             fileUrl: `/uploads/${req.file.filename}`
// //         });

// //         await newContent.save();
// //         res.status(201).json(newContent);
// //     } catch (err) {
// //         res.status(500).json({ message: "Upload failed" });
// //     }
// // };

// // export const getAllContent = async (req, res) => {
// //     const { type, topic, search } = req.query;

// //     let filter = {};

// //     if (type) filter.type = type;
// //     if (topic) filter.topic = topic;
// //     if (search) filter.title = { $regex: search, $options: "i" };

// //     const data = await Content.find(filter).sort({ createdAt: -1 });
// //     res.json(data);
// // };


// import Content from "../Modal/InstaPost.modal.js";
// import fs from "fs";
// import path from "path";

// // Create new content
// export const createContent = async (req, res) => {
//     try {
//         const { title, description, topic, type } = req.body;

//         const newContent = new Content({
//             title,
//             description,
//             topic,
//             type,
//             fileType: req.file.mimetype,
//             fileUrl: `/uploads/${req.file.filename}`
//         });

//         await newContent.save();
//         res.status(201).json(newContent);
//     } catch (err) {
//         res.status(500).json({ message: "Upload failed", error: err.message });
//     }
// };

// // Get all content with filters
// export const getAllContent = async (req, res) => {
//     try {
//         const { type, topic, search } = req.query;

//         let filter = {};

//         if (type) filter.type = type;
//         if (topic) filter.topic = topic;
//         if (search) filter.title = { $regex: search, $options: "i" };

//         const data = await Content.find(filter).sort({ createdAt: -1 });
//         res.json(data);
//     } catch (err) {
//         res.status(500).json({ message: "Failed to fetch content", error: err.message });
//     }
// };

// // Get single content by ID
// export const getContentById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const content = await Content.findById(id);

//         if (!content) {
//             return res.status(404).json({ message: "Content not found" });
//         }

//         res.json(content);
//     } catch (err) {
//         res.status(500).json({ message: "Failed to fetch content", error: err.message });
//     }
// };

// // Update content
// export const updateContent = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, description, topic, type } = req.body;

//         const content = await Content.findById(id);

//         if (!content) {
//             return res.status(404).json({ message: "Content not found" });
//         }

//         // Update text fields
//         content.title = title || content.title;
//         content.description = description || content.description;
//         content.topic = topic || content.topic;
//         content.type = type || content.type;

//         // If new file is uploaded, delete old file and update
//         if (req.file) {
//             // Delete old file
//             const oldFilePath = path.join(process.cwd(), content.fileUrl);
//             if (fs.existsSync(oldFilePath)) {
//                 fs.unlinkSync(oldFilePath);
//             }

//             // Update with new file
//             content.fileType = req.file.mimetype;
//             content.fileUrl = `/uploads/${req.file.filename}`;
//         }

//         await content.save();
//         res.json({ message: "Content updated successfully", content });
//     } catch (err) {
//         res.status(500).json({ message: "Update failed", error: err.message });
//     }
// };

// // Delete content
// export const deleteContent = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const content = await Content.findById(id);

//         if (!content) {
//             return res.status(404).json({ message: "Content not found" });
//         }

//         // Delete the file from filesystem
//         const filePath = path.join(process.cwd(), content.fileUrl);
//         if (fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath);
//         }

//         // Delete from database
//         await Content.findByIdAndDelete(id);

//         res.json({ message: "Content deleted successfully" });
//     } catch (err) {
//         res.status(500).json({ message: "Delete failed", error: err.message });
//     }
// };

// // Get content statistics
// export const getContentStats = async (req, res) => {
//     try {
//         const totalContent = await Content.countDocuments();
//         const totalReels = await Content.countDocuments({ type: "REEL" });
//         const totalPosts = await Content.countDocuments({ type: "POST" });

//         const topicStats = await Content.aggregate([
//             {
//                 $group: {
//                     _id: "$topic",
//                     count: { $sum: 1 }
//                 }
//             },
//             { $sort: { count: -1 } }
//         ]);

//         res.json({
//             totalContent,
//             totalReels,
//             totalPosts,
//             topicStats
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Failed to fetch stats", error: err.message });
//     }
// };


import Content from "../Modal/InstaPost.modal.js";
import fs from "fs";
import path from "path";

// Create new content
export const createContent = async (req, res) => {
    try {
        const { title, description, topic, type, visibleAt } = req.body;

        const newContent = {
            title,
            description,
            topic,
            type,
            visibleAt: visibleAt ? new Date(visibleAt) : new Date()
        };

        // Handle multiple files for POST type
        if (type === "POST" && req.files && req.files.length > 0) {
            newContent.files = req.files.map(file => ({
                fileType: file.mimetype,
                fileUrl: `/uploads/${file.filename}`
            }));
        }
        // Handle single file for REEL type
        else if (type === "REEL" && req.file) {
            newContent.fileType = req.file.mimetype;
            newContent.fileUrl = `/uploads/${req.file.filename}`;
        }

        const content = new Content(newContent);
        await content.save();

        res.status(201).json(content);
    } catch (err) {
        res.status(500).json({ message: "Upload failed", error: err.message });
    }
};

// Get all content with filters (only visible content)
export const getAllContent = async (req, res) => {
    try {
        const { type, topic, search, includeScheduled } = req.query;

        let filter = {};

        if (type) filter.type = type;
        if (topic) filter.topic = topic;
        if (search) filter.title = { $regex: search, $options: "i" };

        // Only show visible content unless includeScheduled is true
        if (includeScheduled !== 'true') {
            filter.visibleAt = { $lte: new Date() };
        }

        const data = await Content.find(filter).sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch content", error: err.message });
    }
};

// Get single content by ID
export const getContentById = async (req, res) => {
    try {
        const { id } = req.params;
        const content = await Content.findById(id);

        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        // Check if content is visible
        if (!content.isVisible) {
            return res.status(403).json({
                message: "Content not yet visible",
                visibleAt: content.visibleAt
            });
        }

        res.json(content);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch content", error: err.message });
    }
};

// Update content
export const updateContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, topic, type, visibleAt } = req.body;

        const content = await Content.findById(id);

        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        // Update text fields
        content.title = title || content.title;
        content.description = description || content.description;
        content.topic = topic || content.topic;
        content.type = type || content.type;
        if (visibleAt) content.visibleAt = new Date(visibleAt);

        // Handle new files for POST type
        if (type === "POST" && req.files && req.files.length > 0) {
            // Delete old files
            if (content.files && content.files.length > 0) {
                content.files.forEach(file => {
                    const oldFilePath = path.join(process.cwd(), file.fileUrl);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                });
            }

            // Add new files
            content.files = req.files.map(file => ({
                fileType: file.mimetype,
                fileUrl: `/uploads/${file.filename}`
            }));
        }
        // Handle new file for REEL type
        else if (type === "REEL" && req.file) {
            // Delete old file
            if (content.fileUrl) {
                const oldFilePath = path.join(process.cwd(), content.fileUrl);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            content.fileType = req.file.mimetype;
            content.fileUrl = `/uploads/${req.file.filename}`;
        }

        await content.save();
        res.json({ message: "Content updated successfully", content });
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};

// Delete content
export const deleteContent = async (req, res) => {
    try {
        const { id } = req.params;

        const content = await Content.findById(id);

        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        // Delete files for POST type
        if (content.files && content.files.length > 0) {
            content.files.forEach(file => {
                const filePath = path.join(process.cwd(), file.fileUrl);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }

        // Delete file for REEL type
        if (content.fileUrl) {
            const filePath = path.join(process.cwd(), content.fileUrl);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // Delete from database
        await Content.findByIdAndDelete(id);

        res.json({ message: "Content deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};

// Get content statistics
export const getContentStats = async (req, res) => {
    try {
        const totalContent = await Content.countDocuments();
        const totalReels = await Content.countDocuments({ type: "REEL" });
        const totalPosts = await Content.countDocuments({ type: "POST" });
        const visibleContent = await Content.countDocuments({ visibleAt: { $lte: new Date() } });
        const scheduledContent = await Content.countDocuments({ visibleAt: { $gt: new Date() } });

        const topicStats = await Content.aggregate([
            {
                $group: {
                    _id: "$topic",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.json({
            totalContent,
            totalReels,
            totalPosts,
            visibleContent,
            scheduledContent,
            topicStats
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch stats", error: err.message });
    }
};

// Add comment to reel
export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName, text } = req.body;

        if (!userName || !text) {
            return res.status(400).json({ message: "userName and text are required" });
        }

        const content = await Content.findById(id);

        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        if (content.type !== "REEL") {
            return res.status(400).json({ message: "Comments are only available for reels" });
        }

        const comment = {
            userName,
            text,
            timestamp: new Date()
        };

        content.comments.push(comment);
        await content.save();

        res.status(201).json({
            message: "Comment added successfully",
            comment: content.comments[content.comments.length - 1]
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to add comment", error: err.message });
    }
};

// Get comments for a reel
export const getComments = async (req, res) => {
    try {
        const { id } = req.params;

        const content = await Content.findById(id);

        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        if (content.type !== "REEL") {
            return res.status(400).json({ message: "Comments are only available for reels" });
        }

        res.json({ comments: content.comments });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch comments", error: err.message });
    }
};

// Like/Unlike content
export const toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { increment } = req.body; // true to like, false to unlike

        const content = await Content.findById(id);

        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        if (increment) {
            content.likesCount += 1;
        } else if (content.likesCount > 0) {
            content.likesCount -= 1;
        }

        await content.save();

        res.json({
            message: "Like updated successfully",
            likesCount: content.likesCount
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to update like", error: err.message });
    }
};