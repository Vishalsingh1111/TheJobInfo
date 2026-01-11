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

//         const savedUser = await user.save();

//         // Start a timeout to delete the user if OTP is not verified
//         setTimeout(async () => {
//             const unverifiedUser = await User.findById(savedUser._id);
//             if (unverifiedUser && !unverifiedUser.otpVerified) {
//                 await User.findByIdAndDelete(savedUser._id);
//                 console.log(`Deleted unverified user with ID: ${savedUser._id}`);
//             }
//         }, 2 * 60 * 1000); // 2 minutes

//         await sendEmail(email, "Verify Your OTP", `WELCOME TO DCODER, Your OTP is: ${otp}`);

//         res.status(201).json({ message: "OTP sent successfully", userId: user._id });
//     } catch (err) {
//         console.error("Signup Error:", err.message);
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
//         console.error("Verify OTP Error:", err.message);
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
//         // Update user OTP
//         user.otp = hashedOtp;
//         await user.save();
//         // Resend OTP via email
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


// // Send OTP for Password Reset
// export const sendOtpForReset = async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Check if the user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Generate OTP
//         const otp = crypto.randomInt(100000, 999999).toString();
//         const hashedOtp = await bcrypt.hash(otp, 10);

//         // Save hashed OTP and expiry time
//         user.otp = hashedOtp;
//         user.otpExpiry = Date.now() + 2 * 60 * 1000; // 2 minutes expiry
//         await user.save();

//         // Send OTP via email
//         await sendEmail(email, "Password Reset OTP", `Your OTP for resetting the password is: ${otp}`);

//         res.status(200).json({ message: "OTP sent successfully" });
//     } catch (err) {
//         console.error("Error sending OTP:", err.message);
//         res.status(500).json({ message: "Error sending OTP" });
//     }
// };


// // Verify OTP and Reset Password
// export const resetPassword = async (req, res) => {
//     try {
//         const { email, otp, newPassword } = req.body;

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Check if OTP matches and is within the expiry time
//         const isOtpValid = await bcrypt.compare(otp, user.otp);
//         if (!isOtpValid || user.otpExpiry < Date.now()) {
//             return res.status(400).json({ message: "Invalid or expired OTP" });
//         }

//         // Update the password
//         user.password = await bcrypt.hash(newPassword, 10);
//         user.otp = null; // Clear OTP after use
//         user.otpExpiry = null;
//         await user.save();

//         res.status(200).json({ message: "Password reset successfully" });
//     } catch (err) {
//         console.error("Error resetting password:", err.message);
//         res.status(500).json({ message: "Error resetting password" });
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

// Utility to send email with better error handling
const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email sending failed:', error);
        throw new Error('Failed to send email: ' + error.message);
    }
};

// Signup Controller
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        console.log('Generated OTP:', otp); // For debugging - remove in production

        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedOtp = await bcrypt.hash(otp, 10);

        // Create user
        const user = new User({
            firstName: firstName || "null",
            lastName: lastName || "null",
            email,
            phone: phone || "null",
            password: hashedPassword,
            otp: hashedOtp,
            otpExpiry: Date.now() + 2 * 60 * 1000, // 2 minutes expiry
        });

        const savedUser = await user.save();
        console.log('User saved successfully:', savedUser._id);

        // Send OTP via email
        try {
            await sendEmail(email, "Verify Your OTP", `WELCOME TO DCODER!\n\nYour OTP for verification is: ${otp}\n\nThis OTP will expire in 2 minutes.\n\nIf you didn't request this, please ignore this email.`);
            console.log('OTP email sent to:', email);
        } catch (emailError) {
            // If email fails, delete the user and return error
            await User.findByIdAndDelete(savedUser._id);
            console.error('Email sending failed, user deleted:', emailError);
            return res.status(500).json({
                message: "Failed to send OTP email. Please check your email address and try again.",
                error: emailError.message
            });
        }

        // Start a timeout to delete the user if OTP is not verified
        setTimeout(async () => {
            try {
                const unverifiedUser = await User.findById(savedUser._id);
                if (unverifiedUser && !unverifiedUser.otpVerified) {
                    await User.findByIdAndDelete(savedUser._id);
                    console.log(`Deleted unverified user with ID: ${savedUser._id}`);
                }
            } catch (error) {
                console.error('Error in timeout cleanup:', error);
            }
        }, 2 * 60 * 1000); // 2 minutes

        res.status(201).json({
            message: "OTP sent successfully to your email",
            userId: savedUser._id
        });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({
            message: "Signup failed",
            error: err.message
        });
    }
};

// Verify OTP Controller
export const verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        if (!userId || !otp) {
            return res.status(400).json({ message: "User ID and OTP are required" });
        }

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if OTP has expired
        if (user.otpExpiry && user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        // Compare OTP
        const isMatch = await bcrypt.compare(otp.toString(), user.otp);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Update OTP verification status
        user.otpVerified = true;
        user.otp = null; // Clear OTP after verification
        user.otpExpiry = null;
        await user.save();

        console.log('OTP verified successfully for user:', user.email);
        res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
        console.error("Verify OTP Error:", err);
        res.status(500).json({
            message: "Verification failed",
            error: err.message
        });
    }
};

// Resend OTP Controller
export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if user is already verified
        if (user.otpVerified) {
            return res.status(400).json({ message: "User is already verified" });
        }

        // Generate new OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        console.log('Resent OTP:', otp); // For debugging - remove in production

        const hashedOtp = await bcrypt.hash(otp, 10);

        // Update user OTP
        user.otp = hashedOtp;
        user.otpExpiry = Date.now() + 2 * 60 * 1000; // 2 minutes expiry
        await user.save();

        // Resend OTP via email
        try {
            await sendEmail(email, "Your New OTP", `Your new OTP is: ${otp}\n\nThis OTP will expire in 2 minutes.`);
            console.log('OTP resent to:', email);
            res.status(200).json({ message: "OTP sent successfully" });
        } catch (emailError) {
            console.error('Resend email failed:', emailError);
            res.status(500).json({
                message: "Failed to send OTP email",
                error: emailError.message
            });
        }
    } catch (err) {
        console.error("Resend OTP Error:", err);
        res.status(500).json({
            message: "Failed to resend OTP",
            error: err.message
        });
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

        // Check if user has verified their email
        if (!user.otpVerified) {
            return res.status(400).json({ message: "Please verify your email first" });
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
        console.error("Login Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get user details
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

// Send OTP for Password Reset
export const sendOtpForReset = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        console.log('Password Reset OTP:', otp); // For debugging - remove in production

        const hashedOtp = await bcrypt.hash(otp, 10);

        // Save hashed OTP and expiry time
        user.otp = hashedOtp;
        user.otpExpiry = Date.now() + 2 * 60 * 1000; // 2 minutes expiry
        await user.save();

        // Send OTP via email
        try {
            await sendEmail(email, "Password Reset OTP", `Your OTP for resetting the password is: ${otp}\n\nThis OTP will expire in 2 minutes.\n\nIf you didn't request this, please ignore this email.`);
            res.status(200).json({ message: "OTP sent successfully" });
        } catch (emailError) {
            res.status(500).json({
                message: "Failed to send OTP email",
                error: emailError.message
            });
        }
    } catch (err) {
        console.error("Error sending OTP:", err);
        res.status(500).json({
            message: "Error sending OTP",
            error: err.message
        });
    }
};

// Verify OTP and Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "Email, OTP, and new password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if OTP has expired
        if (user.otpExpiry && user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        // Check if OTP matches
        const isOtpValid = await bcrypt.compare(otp.toString(), user.otp);
        if (!isOtpValid) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Update the password
        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null; // Clear OTP after use
        user.otpExpiry = null;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        console.error("Error resetting password:", err);
        res.status(500).json({
            message: "Error resetting password",
            error: err.message
        });
    }
};