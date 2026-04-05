import express from "express";
import {
    subscribeNewslatter,
    getsubscribeNewslatter,
    deletesubscriber
} from "../Controller/Newslatter.controller.js";

const router = express.Router();

// POST /newslatter/subscribe — Subscribe a new email
router.post('/subscribe', subscribeNewslatter);

// GET /newslatter — Get all subscribers
router.get('/', getsubscribeNewslatter);

// DELETE /newslatter/:email — Delete subscriber by email
router.delete('/:email', deletesubscriber); // ✅ Fixed: was /:id, now /:email

export default router;