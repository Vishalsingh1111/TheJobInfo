// // import express from "express";

// // import { getBlog, createBlog, updateBlog, deleteBlog } from "../Controller/Blog.controller.js";

// // const router = express.Router();

// // //get all data
// // router.get('/', getBlog);

// // //create new data
// // router.post('/', createBlog);

// // // PUT update a note by ID
// // router.put("/:id", updateBlog);

// // // DELETE delete a note by ID
// // router.delete("/:id", deleteBlog);

// // export default router;

// import express from "express";
// import { getJob, createJob, updateJob, deleteJob } from "../Controller/Blog.controller.js";

// const router = express.Router();

// // GET all jobs
// router.get('/', getJob);

// // POST create new job
// router.post('/', createJob);

// // PUT update job by MongoDB _id
// router.put("/:id", updateJob);

// // DELETE job by MongoDB _id
// router.delete("/:id", deleteJob);

// export default router;

import express from "express";
import multer from "multer";
import { getJob, createJob, updateJob, deleteJob } from "../Controller/Blog.controller.js";

const router = express.Router();

// ── Multer: store in memory so we can stream to Cloudinary ───────────────────
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    },
});

// GET all jobs
router.get('/', getJob);

// POST create new job  (multipart/form-data, image field = "image")
router.post('/', upload.single('image'), createJob);

// PUT update job by MongoDB _id  (multipart/form-data, image field = "image")
router.put("/:id", upload.single('image'), updateJob);

// DELETE job by MongoDB _id
router.delete("/:id", deleteJob);

export default router;