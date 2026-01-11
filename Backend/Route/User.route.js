import express from 'express';
import { signup, verifyOtp, resendOtp, sendOtpForReset, resetPassword, login, userdetails, deleteUser } from '../Controller/User.controller.js';

const router = express.Router()

// Signup
router.post("/signup", signup);

// Verify OTP
router.post('/verify-otp', verifyOtp);

// sendOtpFor-Rese
router.post('/send-otp-reset', sendOtpForReset);

// resetPassword
router.post('/reset-password', resetPassword);

// Send OTP
router.post('/resend-otp', resendOtp);

// Login
router.post("/login", login);

// // Get all users
router.get("/", userdetails);

// // Delete user
router.delete("/:id", deleteUser);

export default router;

