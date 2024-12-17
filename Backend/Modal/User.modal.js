import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: false, default: "null" },
    lastName: { type: String, required: false, default: "null" },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false, default: "null" },
    password: { type: String, required: false, default: "null" },
    googleId: { type: String, required: false, unique: false, default: "null" },
    photo: { type: String, required: false, default: "null" },
    otp: { type: String },
    otpVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

export default User;
