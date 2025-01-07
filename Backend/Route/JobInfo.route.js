import express from "express";

import { createJobInfo, deleteJobInfo, getJobInfo, updateJobInfo } from "../Controller/JobInfo.controller.js";

const router = express.Router();

//get all content 
router.get('/', getJobInfo);

//craete new content 
router.post('/', createJobInfo);

// PUT update a note by ID
router.put("/:id", updateJobInfo);

// DELETE delete a note by ID
router.delete("/:id", deleteJobInfo);

export default router;