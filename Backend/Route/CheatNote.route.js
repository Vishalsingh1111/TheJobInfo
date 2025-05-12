import express from "express";

import { createCheatnote, deleteCheatnote, getCheatnote, updateCheatnote } from "../Controller/CheatNote.contoller.js";

const router = express.Router();

//get all content 
router.get('/', getCheatnote);

//craete new content 
router.post('/', createCheatnote);

// PUT update a note by ID
router.put("/:id", updateCheatnote);

// DELETE delete a note by ID
router.delete("/:id", deleteCheatnote);

export default router;