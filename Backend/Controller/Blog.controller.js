// import Blog from "../Modal/Blog.modal.js";

// export const getBlog = async (req, res) => {
//     try {
//         const blog = await Blog.find();
//         res.status(200).json(blog);
//     } catch (error) {
//         console.log("Error", error);
//         res.status(500).json(error);
//     }
// };

// export const createBlog = async (req, res) => {
//     try {
//         const { id, header, code, image, code2, explanation2, code3, explanation3, explanation, category } = req.body;
//         const newBlog = new Blog({
//             id,
//             header,
//             code,
//             explanation,
//             code2,
//             explanation2,
//             code3,
//             explanation3,
//             category,
//             image,
//         });
//         await newBlog.save();
//         res.status(201).json({ message: "Created successfully" });
//     } catch (error) {
//         console.error("Error creating note:", error);
//         res.status(500).json({ error: "Error creating note" });
//     }
// };

// // Update a note by ID
// export const updateBlog = async (req, res) => {
//     const { id } = req.params;
//     const { header, code, explanation, code2, explanation2, code3, explanation3, image, category } = req.body;

//     try {
//         const updatedBlog = await Blog.findByIdAndUpdate(
//             id,
//             { header, code, explanation, code2, explanation2, code3, explanation3, image, category },
//             { new: true }
//         );

//         if (!updatedBlog) {
//             return res.status(404).json({ error: "Note not found" });
//         }

//         res.status(200).json({ message: "Updated successfully", updatedBlog });
//     } catch (error) {
//         console.error("Error updating note:", error);
//         res.status(500).json({ error: "Error updating note" });
//     }
// };

// export const deleteBlog = async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Validate if the ID is valid
//         if (!id) {
//             return res.status(400).json({ error: "Invalid ID" });
//         }

//         const deletedBlog = await Blog.findByIdAndDelete(id);

//         if (!deletedBlog) {
//             return res.status(404).json({ error: "Note not found" });
//         }

//         res.status(200).json({ message: "Deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting note:", error);
//         res.status(500).json({ error: "Error deleting note" });
//     }
// };

import Blog from "../Modal/Blog.modal.js";

// Get all blogs with filters, pagination, and sorting
export const getBlog = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            category = 'all',
            difficulty = 'all',
            status = 'all',
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        const query = {};

        // Search filter
        if (search) {
            query.$or = [
                { header: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        // Category filter
        if (category !== 'all') {
            query.category = category;
        }

        // Difficulty filter
        if (difficulty !== 'all') {
            query.difficulty = difficulty;
        }

        // Status filter
        if (status !== 'all') {
            query.status = status;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const sortOrder = order === 'desc' ? -1 : 1;

        const blogs = await Blog.find(query)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Blog.countDocuments(query);

        res.status(200).json({
            blogs,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ error: "Error fetching blogs" });
    }
};

// Get blog statistics
export const getBlogStats = async (req, res) => {
    try {
        const totalBlogs = await Blog.countDocuments();
        const publishedBlogs = await Blog.countDocuments({ status: 'published' });
        const draftBlogs = await Blog.countDocuments({ status: 'draft' });
        const featuredBlogs = await Blog.countDocuments({ featured: true });

        const totalViews = await Blog.aggregate([
            { $group: { _id: null, total: { $sum: "$views" } } }
        ]);

        const totalLikes = await Blog.aggregate([
            { $group: { _id: null, total: { $sum: "$likes" } } }
        ]);

        // Category distribution
        const categoryStats = await Blog.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Difficulty distribution
        const difficultyStats = await Blog.aggregate([
            { $group: { _id: "$difficulty", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Most viewed blogs
        const mostViewed = await Blog.find()
            .sort({ views: -1 })
            .limit(5)
            .select('id header category views');

        // Recent blogs
        const recentBlogs = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('id header category createdAt');

        res.status(200).json({
            totalBlogs,
            publishedBlogs,
            draftBlogs,
            featuredBlogs,
            totalViews: totalViews[0]?.total || 0,
            totalLikes: totalLikes[0]?.total || 0,
            categoryStats,
            difficultyStats,
            mostViewed,
            recentBlogs
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ error: "Error fetching statistics" });
    }
};

// Search blogs
export const searchBlogs = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ error: "Search query required" });
        }

        const blogs = await Blog.find({
            $text: { $search: q }
        }, {
            score: { $meta: "textScore" }
        })
            .sort({ score: { $meta: "textScore" } })
            .limit(20);

        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error searching blogs:", error);
        res.status(500).json({ error: "Error searching blogs" });
    }
};

// Get blogs by category
export const getBlogByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const blogs = await Blog.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error fetching blogs by category:", error);
        res.status(500).json({ error: "Error fetching blogs" });
    }
};

// Create new blog
export const createBlog = async (req, res) => {
    try {
        const {
            id, header, code, image, code2, explanation2,
            code3, explanation3, explanation, category,
            difficulty, tags, timeComplexity, spaceComplexity,
            author, status, featured
        } = req.body;

        // Check if blog with same ID exists
        const existingBlog = await Blog.findOne({ id });
        if (existingBlog) {
            return res.status(400).json({ error: "Blog with this ID already exists" });
        }

        const newBlog = new Blog({
            id,
            header,
            code,
            explanation: explanation || "",
            code2: code2 || "",
            explanation2: explanation2 || "",
            code3: code3 || "",
            explanation3: explanation3 || "",
            category,
            image: image || "",
            difficulty: difficulty || 'Medium',
            tags: tags || [],
            timeComplexity: timeComplexity || "",
            spaceComplexity: spaceComplexity || "",
            author: author || "Admin",
            status: status || 'published',
            featured: featured || false
        });

        await newBlog.save();
        res.status(201).json({
            message: "Blog created successfully",
            blog: newBlog
        });
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ error: "Error creating blog" });
    }
};

// Update blog by ID
export const updateBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const updateData = { ...req.body };
        updateData.lastModified = Date.now();

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({
            message: "Blog updated successfully",
            blog: updatedBlog
        });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Error updating blog" });
    }
};

// Delete blog by ID
export const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ error: "Error deleting blog" });
    }
};

// Increment views
export const incrementViews = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({
            message: "Views incremented",
            views: blog.views
        });
    } catch (error) {
        console.error("Error incrementing views:", error);
        res.status(500).json({ error: "Error incrementing views" });
    }
};

// Toggle featured status
export const toggleFeatured = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        blog.featured = !blog.featured;
        await blog.save();

        res.status(200).json({
            message: "Featured status updated",
            featured: blog.featured
        });
    } catch (error) {
        console.error("Error toggling featured:", error);
        res.status(500).json({ error: "Error updating featured status" });
    }
};

// Update blog status
export const updateBlogStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const validStatuses = ['draft', 'published', 'archived'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const blog = await Blog.findByIdAndUpdate(
            id,
            { status, lastModified: Date.now() },
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({
            message: "Status updated successfully",
            blog
        });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ error: "Error updating status" });
    }
};