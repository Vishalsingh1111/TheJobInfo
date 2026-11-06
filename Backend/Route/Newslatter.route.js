import express from "express";
import {
    subscribeNewslatter,
    getsubscribeNewslatter,
    getSubscriberCount,
    deletesubscriber
} from "../Controller/Newslatter.controller.js";
import { requireAdmin } from "../Middleware/auth.js";

const router = express.Router();

// POST /newslatter/subscribe — Subscribe a new email
router.post('/subscribe', subscribeNewslatter);

// GET /newslatter/count — Public count only; subscriber records stay admin-only
router.get('/count', getSubscriberCount);

// GET /newslatter — Get all subscribers
router.get('/', requireAdmin, getsubscribeNewslatter);

// DELETE /newslatter/:email — Delete subscriber by email
router.delete('/:email', requireAdmin, deletesubscriber);

export default router;