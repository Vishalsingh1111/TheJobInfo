import express from "express";
import { recordVisitor } from "../Controller/Visitor.controller.js";

const router = express.Router();

router.post("/", recordVisitor);

export default router;
