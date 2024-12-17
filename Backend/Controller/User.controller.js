// import User from '../Modal/User.modal.js';
// import bcryptjs from 'bcryptjs';
// import { sendEmail } from './Otp.controller.js';
// import crypto from 'crypto';





// export const signup = async (req, res) => {
//     try {
//         const { firstName, lastName, email, phone, password } = req.body;

//         const userByEmail = await User.findOne({ email });
//         if (userByEmail) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const userByPhone = await User.findOne({ phone });
//         if (userByPhone) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Generate OTP
//         const otp = crypto.randomInt(100000, 999999);

//         // Save hashed password
//         const hashpassword = await bcryptjs.hash(password, 10);

//         const createdUser = new User({
//             firstName: firstName || "null",
//             lastName: lastName || "null",
//             email,
//             phone: phone || "null",
//             password: hashpassword,
//             otp,
//             otpVerified: false,
//             googleId: "null",
//             photo: "null",
//         });

//         await createdUser.save();

//         // Send OTP via email
//         await sendEmail(email, "Your OTP for Registration", `Your OTP is: ${otp}`);

//         res.status(201).json({
//             message: "User registered successfully. Please verify OTP sent to your email.",
//             userId: createdUser._id,
//         });
//     } catch (error) {
//         console.error("Error during signup:", error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// export const verifyOtp = async (req, res) => {
//     const { userId, otp } = req.body;

//     try {
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         if (user.otp !== otp) {
//             return res.status(400).json({ message: "Invalid OTP" });
//         }

//         user.otpVerified = true;
//         user.otp = null; // Clear OTP after verification
//         await user.save();

//         res.status(200).json({ message: "OTP verified successfully" });
//     } catch (error) {
//         console.error("Error verifying OTP:", error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// Signup Function
// export const signup = async (req, res) => {
//     try {
//         const { firstName, lastName, email, phone, password } = req.body;
//         const userbymail = await User.findOne({ email });
//         if (userbymail) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const userbyphone = await User.findOne({ phone });
//         if (userbyphone) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Hashing password for more security
//         const hashpassword = await bcryptjs.hash(password, 10);

//         const createdUser = new User({
//             firstName: firstName || "null",
//             lastName: lastName || "null",
//             email: email,
//             phone: phone || "null",
//             password: hashpassword,
//             googleId: "null",
//             photo: "null"
//         });

//         await createdUser.save();
//         res.status(201).json({
//             message: "User Created Successfully",
//             user: {
//                 _id: createdUser._id,
//                 firstName: createdUser.firstName,
//                 lastName: createdUser.lastName,
//                 email: createdUser.email,
//                 phone: createdUser.phone,
//                 // password: createdUser.password,
//                 // googleId: createdUser.googleId,
//                 photo: createdUser.photo
//             }
//         });
//     } catch (error) {
//         console.log("Error: " + error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };


// Login Function



// import User from '../Modal/User.modal.js';
// import bcryptjs from 'bcryptjs';
// import crypto from 'crypto';
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// // Email Configuration
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL, // Your email address
//         pass: process.env.EMAIL_PASSWORD, // App-specific password
//     },
// });

// // Utility to send emails
// const sendEmail = async (to, subject, text) => {
//     const mailOptions = {
//         from: process.env.EMAIL,
//         to,
//         subject,
//         text,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log("OTP sent successfully.");
//     } catch (error) {
//         console.error("Error sending OTP:", error.message);
//         throw error;
//     }
// };

// // Signup Function
// export const signup = async (req, res) => {
//     try {
//         const { firstName, lastName, email, phone, password } = req.body;

//         // Check for existing user by email
//         const userByEmail = await User.findOne({ email });
//         if (userByEmail) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Check for existing user by phone
//         const userByPhone = await User.findOne({ phone });
//         if (userByPhone) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Generate OTP
//         const otp = crypto.randomInt(100000, 999999);

//         // Hash the password
//         const hashPassword = await bcryptjs.hash(password, 10);

//         // Create new user
//         const createdUser = new User({
//             firstName: firstName || "null",
//             lastName: lastName || "null",
//             email,
//             phone: phone || "null",
//             password: hashPassword,
//             otp: otp, // Store plain OTP for demonstration; ideally, hash it for security
//             otpVerified: false,
//             googleId: "null",
//             photo: "null",
//         });

//         await createdUser.save();

//         // Send OTP via email
//         await sendEmail(email, "Your OTP for Registration", `Your OTP is: ${otp}`);

//         res.status(201).json({
//             message: "User registered successfully. Please verify OTP sent to your email.",
//             userId: createdUser._id,
//         });
//     } catch (error) {
//         console.error("Error during signup:", error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // OTP Verification Function
// export const verifyOtp = async (req, res) => {
//     const { userId, otp } = req.body;

//     try {
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Check if OTP matches
//         if (user.otp !== otp) {
//             return res.status(400).json({ message: "Invalid OTP" });
//         }

//         // Mark OTP as verified and clear the OTP
//         user.otpVerified = true;
//         user.otp = null; // Clear OTP after verification
//         await user.save();

//         res.status(200).json({ message: "OTP verified successfully" });
//     } catch (error) {
//         console.error("Error verifying OTP:", error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };














// import User from '../Modal/User.modal.js';
// import bcryptjs from 'bcryptjs';
// import crypto from 'crypto';
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// // Email Configuration
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL, // Your email address
//         pass: process.env.EMAIL_PASSWORD, // App-specific password
//     },
// });

// // Utility to send emails
// const sendEmail = async (to, subject, text) => {
//     const mailOptions = {
//         from: process.env.EMAIL,
//         to,
//         subject,
//         text,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log("OTP sent successfully.");
//     } catch (error) {
//         console.error("Error sending OTP:", error.message);
//         throw error;
//     }
// };

// // Signup Function
// export const signup = async (req, res) => {
//     try {
//         const { firstName, lastName, email, phone, password } = req.body;

//         // Check for existing user by email
//         const userByEmail = await User.findOne({ email });
//         if (userByEmail) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Check for existing user by phone
//         const userByPhone = await User.findOne({ phone });
//         if (userByPhone) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Generate OTP
//         const otp = crypto.randomInt(100000, 999999);

//         // Hash the password
//         const hashPassword = await bcryptjs.hash(password, 10);

//         // Create new user
//         const createdUser = new User({
//             firstName: firstName || "null",
//             lastName: lastName || "null",
//             email,
//             phone: phone || "null",
//             password: hashPassword,
//             otp: otp, // Store plain OTP for demonstration; ideally, hash it for security
//             otpVerified: false,
//             googleId: "null",
//             photo: "null",
//         });

//         await createdUser.save();

//         // Send OTP via email
//         await sendEmail(email, "Your OTP for Registration", `Your OTP is: ${otp}`);

//         res.status(201).json({
//             message: "User registered successfully. Please verify OTP sent to your email.",
//             userId: createdUser._id,
//         });
//     } catch (error) {
//         console.error("Error during signup:", error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // OTP Verification Function
// export const verifyOtp = async (req, res) => {
//     const { userId, otp } = req.body;

//     try {
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Check if OTP matches
//         if (user.otp !== otp) {
//             return res.status(400).json({ message: "Invalid OTP" });
//         }

//         // Mark OTP as verified and clear the OTP
//         user.otpVerified = true;
//         user.otp = null; // Clear OTP after verification
//         await user.save();

//         res.status(200).json({ message: "OTP verified successfully" });
//     } catch (error) {
//         console.error("Error verifying OTP:", error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Send OTP Function
// export const sendOtp = async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await User.findOne({ email });

//         if (user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Generate OTP
//         const otp = crypto.randomInt(100000, 999999);

//         // Update user's OTP
//         user.otp = otp;
//         await user.save();

//         // Send OTP via email
//         await sendEmail(email, "Your OTP for Registration", `Your OTP is: ${otp}`);

//         res.status(200).json({ success: true, message: "OTP sent successfully" });
//     } catch (error) {
//         console.error("Error sending OTP:", error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };



// export const login = async (req, res) => {
//     try {
//         const { email, phone, password } = req.body;

//         const user = await User.findOne({
//             $or: [{ email }, { phone }]
//         });

//         if (!user || !(await bcryptjs.compare(password, user.password))) {
//             return res.status(400).json({ message: "Invalid username or password" });
//         }

//         res.status(200).json({
//             message: "Login Successful",
//             user: {
//                 _id: user._id,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 email: user.email,
//                 phone: user.phone,
//                 // password: user.password,
//                 // googleId: user.googleId,
//                 photo: user.photo
//             }
//         });

//     } catch (error) {
//         console.error("Error: " + error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };


// // Get user details
// export const userdetails = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         res.status(500).json({ error: "Error fetching users" });
//     }
// };

// // Delete a user
// export const deleteUser = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedUser = await User.findByIdAndDelete(id);

//         if (!deletedUser) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         res.status(200).json({ message: "Deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting User:", error);
//         res.status(500).json({ error: "Error deleting User" });
//     }
// };




import User from '../Modal/User.modal.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Utility to send email
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};

// Signup Route
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const otp = crypto.randomInt(100000, 999999).toString();
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedOtp = await bcrypt.hash(otp, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            otp: hashedOtp,
        });

        await user.save();
        await sendEmail(email, "Verify Your OTP", `Your OTP is: ${otp}`);

        res.status(201).json({ message: "OTP sent successfully. Verify to complete registration.", userId: user._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Verify OTP Route
export const verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(otp, user.otp);
        if (!isMatch) return res.status(400).json({ message: "Invalid OTP" });

        user.otpVerified = true;
        user.otp = null; // Clear OTP after verification
        await user.save();

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Resend OTP
export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = crypto.randomInt(100000, 999999).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        user.otp = hashedOtp;
        await user.save();

        await sendEmail(email, "Your OTP", `Your OTP is: ${otp}`);
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
