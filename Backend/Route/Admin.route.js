import express from 'express';
import { adminlogin, addnewadmin, admindetails, deleteAdmin } from '../Controller/Admin.controller.js';
import { getDailyVisitors } from '../Controller/Visitor.controller.js';
import { requireAdmin } from '../Middleware/auth.js';

const router = express.Router();

// Login route
router.post("/adminlogin", adminlogin);
router.post("/login", adminlogin);

//new admin
router.post("/addadmin", requireAdmin, addnewadmin);

//get admin
router.get("/", requireAdmin, admindetails);
router.get("/visitors", requireAdmin, getDailyVisitors);

//new admin
router.delete("/:id", requireAdmin, deleteAdmin);

export default router;
