import express from 'express';
import { signup, verifyOtp, sendEmail, login, userdetails, deleteUser } from '../Controller/User.controller.js';
const router = express.Router()

//signup 
router.post("/signup", signup);

//verify otp
router.post('/verify-otp', verifyOtp);

//send otp
router.post('/send-otp', sendEmail);

//login
router.post("/login", login);

// get all user
router.get("/", userdetails);

//deleteUser
router.delete("/:id", deleteUser);


export default router;