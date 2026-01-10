// import express from "express";

// import { getBlog, createBlog, updateBlog, deleteBlog } from "../Controller/Blog.controller.js";

// const router = express.Router();

// //get all data
// router.get('/', getBlog);

// //create new data
// router.post('/', createBlog);

// // PUT update a note by ID
// router.put("/:id", updateBlog);

// // DELETE delete a note by ID
// router.delete("/:id", deleteBlog);

// export default router;



import express from "express";
import {
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogStats,
    incrementViews,
    toggleFeatured,
    updateBlogStatus,
    getBlogByCategory,
    searchBlogs
} from "../Controller/Blog.controller.js";

const router = express.Router();

// Get all blogs with filters and pagination
router.get('/', getBlog);

// Get blog statistics
router.get('/stats', getBlogStats);

// Search blogs
router.get('/search', searchBlogs);

// Get blogs by category
router.get('/category/:category', getBlogByCategory);

// Create new blog
router.post('/', createBlog);

// Update blog by ID
router.put("/:id", updateBlog);

// Delete blog by ID
router.delete("/:id", deleteBlog);

// Increment views
router.put("/:id/view", incrementViews);

// Toggle featured status
router.put("/:id/featured", toggleFeatured);

// Update blog status
router.put("/:id/status", updateBlogStatus);

export default router;