// import express from 'express';
// import { signup, verifyOtp, resendOtp, sendOtpForReset, resetPassword, login, userdetails, deleteUser } from '../Controller/User.controller.js';

// const router = express.Router()

// // Signup
// router.post("/signup", signup);

// // Verify OTP
// router.post('/verify-otp', verifyOtp);

// // sendOtpFor-Rese
// router.post('/send-otp-reset', sendOtpForReset);

// // resetPassword
// router.post('/reset-password', resetPassword);

// // Send OTP
// router.post('/resend-otp', resendOtp);

// // Login
// router.post("/login", login);

// // // Get all users
// router.get("/", userdetails);

// // // Delete user
// router.delete("/:id", deleteUser);

// export default router;



import express from 'express';
import {
    signup,
    verifyOtp,
    resendOtp,
    sendOtpForReset,
    resetPassword,
    login,
    userdetails,
    deleteUser,
    blockUser,
    unblockUser,
    getUserStats,
    updateUserStatus
} from '../Controller/User.controller.js';

const router = express.Router();

// Auth Routes
router.post("/signup", signup);
router.post('/verify-otp', verifyOtp);
router.post('/send-otp-reset', sendOtpForReset);
router.post('/reset-password', resetPassword);
router.post('/resend-otp', resendOtp);
router.post("/login", login);

// User Management Routes
router.get("/", userdetails);
router.get("/stats", getUserStats);
router.delete("/:id", deleteUser);

// Block/Unblock Routes
router.put("/:id/block", blockUser);
router.put("/:id/unblock", unblockUser);
router.put("/:id/status", updateUserStatus);

export default router;