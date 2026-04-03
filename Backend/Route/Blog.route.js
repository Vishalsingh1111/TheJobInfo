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
import { getJob, createJob, updateJob, deleteJob } from "../Controller/Blog.controller.js";

const router = express.Router();

// GET all jobs
router.get('/', getJob);

// POST create new job
router.post('/', createJob);

// PUT update job by MongoDB _id
router.put("/:id", updateJob);

// DELETE job by MongoDB _id
router.delete("/:id", deleteJob);

export default router;
