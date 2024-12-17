// import express from 'express';
// import { signup, verifyOtp, sendEmail, login, userdetails, deleteUser } from '../Controller/User.controller.js';
// const router = express.Router()

// //signup 
// router.post("/signup", signup);

// //verify otp
// router.post('/verify-otp', verifyOtp);

// //send otp
// router.post('/send-otp', sendEmail);

// //login
// router.post("/login", login);

// // get all user
// router.get("/", userdetails);

// //deleteUser
// router.delete("/:id", deleteUser);


// export default router;

import express from 'express';
import { signup, verifyOtp, resendOtp, login, userdetails, deleteUser } from '../Controller/User.controller.js';
const router = express.Router()

// Signup
router.post("/signup", signup);

// Verify OTP
router.post('/verify-otp', verifyOtp);

// Send OTP
router.post('/resend-otp', resendOtp);

// Login
router.post("/login", login);

// Get all users
router.get("/", userdetails);

// Delete user
router.delete("/:id", deleteUser);

export default router;
