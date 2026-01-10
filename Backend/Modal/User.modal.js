// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     firstName: { type: String, required: false, default: "null" },
//     lastName: { type: String, required: false, default: "null" },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String, required: true, default: "null" },
//     password: { type: String, required: false, default: "null" },
//     googleId: { type: String, required: false, unique: false, default: "null" },
//     photo: { type: String, required: false, default: "null" },
//     otp: { type: String },
//     otpExpiry: { type: Date },
//     otpVerified: { type: Boolean, default: false },
//     resetToken: { type: String, default: null },
//     resetTokenExpiry: { type: Date, default: null }
// });

// const User = mongoose.model('User', userSchema);

// export default User;


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
        default: "Guest"
    },
    lastName: {
        type: String,
        required: false,
        default: "User"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        default: null
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    photo: {
        type: String,
        required: false,
        default: null
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    otpVerified: {
        type: Boolean,
        default: false
    },
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpiry: {
        type: Date,
        default: null
    },
    // New fields
    isBlocked: {
        type: Boolean,
        default: false
    },
    blockedAt: {
        type: Date,
        default: null
    },
    blockedReason: {
        type: String,
        default: null
    },
    lastLogin: {
        type: Date,
        default: null
    },
    loginCount: {
        type: Number,
        default: 0
    },
    accountStatus: {
        type: String,
        enum: ['active', 'blocked', 'suspended', 'deleted'],
        default: 'active'
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ accountStatus: 1 });
userSchema.index({ isBlocked: 1 });

const User = mongoose.model('User', userSchema);

export default User;