// import User from '../Modal/User.modal.js';
// import bcrypt from 'bcryptjs';
// import crypto from 'crypto';
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// // Email Configuration
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//     },
// });

// // Utility to send email
// const sendEmail = async (to, subject, text) => {
//     const mailOptions = {
//         from: process.env.EMAIL,
//         to,
//         subject,
//         text,
//     };

//     await transporter.sendMail(mailOptions);
// };

// // Signup Controller
// export const signup = async (req, res) => {
//     try {
//         const { firstName, lastName, email, phone, password } = req.body;

//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Generate OTP
//         const otp = crypto.randomInt(100000, 999999).toString();
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const hashedOtp = await bcrypt.hash(otp, 10);

//         // Create user
//         const user = new User({
//             firstName,
//             lastName,
//             email,
//             phone,
//             password: hashedPassword,
//             otp: hashedOtp,
//         });

//         await user.save();
//         await sendEmail(email, "Verify Your OTP", `Thank You For Registering on DCODER, Your OTP is: ${otp}`);

//         res.status(201).json({ message: "OTP sent successfully. Verify to complete registration. Kindly Check in Spam folder also ", userId: user._id });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Verify OTP Controller
// export const verifyOtp = async (req, res) => {
//     try {
//         const { userId, otp } = req.body;

//         // Find user by ID
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Compare OTP
//         const isMatch = await bcrypt.compare(otp, user.otp);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid OTP" });
//         }

//         // Update OTP verification status
//         user.otpVerified = true;
//         user.otp = null; // Clear OTP after verification
//         await user.save();

//         res.status(200).json({ message: "OTP verified successfully" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Resend OTP Controller
// export const resendOtp = async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Generate new OTP
//         const otp = crypto.randomInt(100000, 999999).toString();
//         const hashedOtp = await bcrypt.hash(otp, 10);

//         user.otp = hashedOtp;
//         await user.save();

//         await sendEmail(email, "Your OTP", `Your OTP is: ${otp}`);
//         res.status(200).json({ message: "OTP sent successfully" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Login Controller
// export const login = async (req, res) => {
//     try {
//         const { email, phone, password } = req.body;

//         // Validate input
//         if (!email && !phone) {
//             return res.status(400).json({ message: "Email or phone is required" });
//         }
//         if (!password) {
//             return res.status(400).json({ message: "Password is required" });
//         }

//         // Find user by email or phone
//         const user = await User.findOne({
//             $or: [{ email }, { phone }],
//         });

//         if (!user) {
//             return res.status(400).json({ message: "User not found. Check credentials." });
//         }

//         // Check if password matches
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Invalid password" });
//         }


//         res.status(200).json({
//             message: "Login successful",
//             user: {
//                 _id: user._id,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 email: user.email,
//                 phone: user.phone,
//                 photo: user.photo,
//             },
//         });
//     } catch (err) {
//         console.error("Login Error:", err.message);
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

//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         res.status(500).json({ error: "Error deleting user" });
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

// Signup Controller
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        // Temporarily store user data with OTP
        const tempUser = {
            firstName,
            lastName,
            email,
            phone,
            password, // Save plain password temporarily for final hashing
            otp: hashedOtp,
        };

        // Store temporary user data in an in-memory store (or use Redis for production)
        global.tempUsers = global.tempUsers || {};
        global.tempUsers[email] = tempUser;

        await sendEmail(email, "Verify Your OTP", `Thank You For Registering on DCODER. Your OTP is: ${otp}`);
        res.status(201).json({ message: "OTP sent successfully. Verify to complete registration. Kindly check in Spam folder also." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Verify OTP Controller
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find temporary user data
        const tempUser = global.tempUsers?.[email];
        // if (!tempUser) {
        //     return res.status(404).json({ message: "User not found or OTP expired" });
        // }

        // Compare OTP
        const isMatch = await bcrypt.compare(otp, tempUser.otp);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Save verified user in the database
        const hashedPassword = await bcrypt.hash(tempUser.password, 10);
        const user = new User({
            firstName: tempUser.firstName,
            lastName: tempUser.lastName,
            email: tempUser.email,
            phone: tempUser.phone,
            password: hashedPassword,
        });

        await user.save();

        // Clean up temporary user data
        delete global.tempUsers[email];

        res.status(200).json({ message: "OTP verified and user registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Resend OTP Controller
export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // Find temporary user data
        const tempUser = global.tempUsers?.[email];
        if (!tempUser) {
            return res.status(404).json({ message: "User not found or OTP expired" });
        }

        // Generate new OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        tempUser.otp = hashedOtp;
        global.tempUsers[email] = tempUser;

        await sendEmail(email, "Your OTP", `Your OTP is: ${otp}`);
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login Controller
export const login = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        // Validate input
        if (!email && !phone) {
            return res.status(400).json({ message: "Email or phone is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Find user by email or phone
        const user = await User.findOne({
            $or: [{ email }, { phone }],
        });

        if (!user) {
            return res.status(400).json({ message: "User not found. Check credentials." });
        }

        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                photo: user.photo,
            },
        });
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all user details
export const userdetails = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Error deleting user" });
    }
};