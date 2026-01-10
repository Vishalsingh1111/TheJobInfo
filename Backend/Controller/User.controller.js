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

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

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
            otpExpiry: Date.now() + 2 * 60 * 1000
        });

        const savedUser = await user.save();

        setTimeout(async () => {
            const unverifiedUser = await User.findById(savedUser._id);
            if (unverifiedUser && !unverifiedUser.otpVerified) {
                await User.findByIdAndDelete(savedUser._id);
                console.log(`Deleted unverified user with ID: ${savedUser._id}`);
            }
        }, 2 * 60 * 1000);

        await sendEmail(email, "Verify Your OTP", `WELCOME TO DCODER, Your OTP is: ${otp}`);

        res.status(201).json({ message: "OTP sent successfully", userId: user._id });
    } catch (err) {
        console.error("Signup Error:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Verify OTP Controller
export const verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        const isMatch = await bcrypt.compare(otp, user.otp);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        user.otpVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
        console.error("Verify OTP Error:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Resend OTP Controller
export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        user.otp = hashedOtp;
        user.otpExpiry = Date.now() + 2 * 60 * 1000;
        await user.save();

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

        if (!email && !phone) {
            return res.status(400).json({ message: "Email or phone is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const user = await User.findOne({
            $or: [{ email }, { phone }],
        });

        if (!user) {
            return res.status(400).json({ message: "User not found. Check credentials." });
        }

        // Check if user is blocked
        if (user.isBlocked) {
            return res.status(403).json({
                message: "Your account has been blocked",
                reason: user.blockedReason || "Contact support for more information"
            });
        }

        // Check if account is active
        if (user.accountStatus !== 'active') {
            return res.status(403).json({
                message: `Your account is ${user.accountStatus}`,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Update last login and login count
        user.lastLogin = new Date();
        user.loginCount = (user.loginCount || 0) + 1;
        await user.save();

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                photo: user.photo,
                lastLogin: user.lastLogin,
                loginCount: user.loginCount
            },
        });
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get user details with pagination and filters
export const userdetails = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            status = 'all',
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        const query = {};

        // Search filter
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }

        // Status filter
        if (status !== 'all') {
            if (status === 'blocked') {
                query.isBlocked = true;
            } else if (status === 'active') {
                query.isBlocked = false;
                query.accountStatus = 'active';
            } else {
                query.accountStatus = status;
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const sortOrder = order === 'desc' ? -1 : 1;

        const users = await User.find(query)
            .select('-password -otp -resetToken')
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await User.countDocuments(query);

        res.status(200).json({
            users,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
};

// Get user statistics
export const getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ accountStatus: 'active', isBlocked: false });
        const blockedUsers = await User.countDocuments({ isBlocked: true });
        const suspendedUsers = await User.countDocuments({ accountStatus: 'suspended' });
        const verifiedUsers = await User.countDocuments({ otpVerified: true });
        const googleUsers = await User.countDocuments({ googleId: { $ne: null } });

        // Users registered in last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentUsers = await User.countDocuments({
            createdAt: { $gte: thirtyDaysAgo }
        });

        // Users registered today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayUsers = await User.countDocuments({
            createdAt: { $gte: today }
        });

        // Get registration trend (last 7 days)
        const registrationTrend = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({
            totalUsers,
            activeUsers,
            blockedUsers,
            suspendedUsers,
            verifiedUsers,
            googleUsers,
            recentUsers,
            todayUsers,
            registrationTrend
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ error: "Error fetching statistics" });
    }
};

// Block user
export const blockUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isBlocked = true;
        user.blockedAt = new Date();
        user.blockedReason = reason || "Blocked by administrator";
        user.accountStatus = 'blocked';
        await user.save();

        // Send email notification
        try {
            await sendEmail(
                user.email,
                "Account Blocked",
                `Your account has been blocked. Reason: ${user.blockedReason}\n\nIf you believe this is a mistake, please contact support.`
            );
        } catch (emailError) {
            console.error("Error sending block notification:", emailError);
        }

        res.status(200).json({
            message: "User blocked successfully",
            user: {
                _id: user._id,
                email: user.email,
                isBlocked: user.isBlocked,
                blockedReason: user.blockedReason
            }
        });
    } catch (error) {
        console.error("Error blocking user:", error);
        res.status(500).json({ error: "Error blocking user" });
    }
};

// Unblock user
export const unblockUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isBlocked = false;
        user.blockedAt = null;
        user.blockedReason = null;
        user.accountStatus = 'active';
        await user.save();

        // Send email notification
        try {
            await sendEmail(
                user.email,
                "Account Unblocked",
                `Your account has been unblocked. You can now access your account normally.`
            );
        } catch (emailError) {
            console.error("Error sending unblock notification:", emailError);
        }

        res.status(200).json({
            message: "User unblocked successfully",
            user: {
                _id: user._id,
                email: user.email,
                isBlocked: user.isBlocked
            }
        });
    } catch (error) {
        console.error("Error unblocking user:", error);
        res.status(500).json({ error: "Error unblocking user" });
    }
};

// Update user status
export const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['active', 'blocked', 'suspended', 'deleted'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.accountStatus = status;
        if (status === 'blocked') {
            user.isBlocked = true;
            user.blockedAt = new Date();
        } else if (status === 'active') {
            user.isBlocked = false;
            user.blockedAt = null;
            user.blockedReason = null;
        }

        await user.save();

        res.status(200).json({
            message: "User status updated successfully",
            user: {
                _id: user._id,
                email: user.email,
                accountStatus: user.accountStatus
            }
        });
    } catch (error) {
        console.error("Error updating user status:", error);
        res.status(500).json({ error: "Error updating user status" });
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

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        user.otp = hashedOtp;
        user.otpExpiry = Date.now() + 2 * 60 * 1000;
        await user.save();

        await sendEmail(email, "Password Reset OTP", `Your OTP for resetting the password is: ${otp}`);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        console.error("Error sending OTP:", err.message);
        res.status(500).json({ message: "Error sending OTP" });
    }
};

// Verify OTP and Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isOtpValid = await bcrypt.compare(otp, user.otp);
        if (!isOtpValid || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        console.error("Error resetting password:", err.message);
        res.status(500).json({ message: "Error resetting password" });
    }
};