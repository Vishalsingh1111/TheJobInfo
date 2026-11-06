import express from 'express';
import { contactInfo, getMessage } from '../Controller/Contact.controller.js';
import { requireAdmin } from '../Middleware/auth.js';
const router = express.Router()

//store all contact info
router.post("/contactinfo", contactInfo);

// get all user
router.get("/", requireAdmin, getMessage);

export default router;