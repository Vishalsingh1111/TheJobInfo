import Admin from "../Modal/Admin.modal.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createHash, timingSafeEqual } from 'node:crypto';

const safePlaintextMatch = (submitted, stored) => {
    const submittedBuffer = Buffer.from(String(submitted));
    const storedBuffer = Buffer.from(String(stored));
    return submittedBuffer.length === storedBuffer.length && timingSafeEqual(submittedBuffer, storedBuffer);
};
const safeSha256Match = (submitted, stored) => {
    if (!/^[a-f0-9]{64}$/i.test(String(stored))) return false;
    const expected = Buffer.from(String(stored), "hex");
    const actual = createHash("sha256").update(String(submitted)).digest();
    return expected.length === actual.length && timingSafeEqual(expected, actual);
};

// Create new admin
export const addnewadmin = async (req, res) => {
    try {
        const username = String(req.body.username || '').trim();
        const password = String(req.body.password || '');
        if (!username || username.length > 100 || password.length < 12 || password.length > 200) {
            return res.status(400).json({ message: "Username and a password of 12-200 characters are required" });
        }
        const admindetail = await Admin.findOne({ username });
        if (admindetail) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashpassword = await bcryptjs.hash(password, 10);

        const createdadmin = new Admin({
            username,
            password: hashpassword,
        });
        await createdadmin.save();
        res.status(201).json({
            message: "User Created Successfully",
            admin: {
                _id: createdadmin._id,
                username: createdadmin.username,
            }
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login
export const adminlogin = async (req, res) => {
    try {
        const username = String(req.body.username || '').trim();
        const password = String(req.body.password || '');
        const secret = process.env.JWT_SECRET;
        if (!secret) return res.status(503).json({ message: "Admin authentication is not configured" });
        if (!username || !password || password.length > 200) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const admin = await Admin.findOne({ username }).select("+password");

        if (!admin) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        let validPassword = false;
        try {
            validPassword = await bcryptjs.compare(password, admin.password);
        } catch {
            validPassword = safePlaintextMatch(password, admin.password);
        }
        if (!validPassword && !/^\$2[aby]\$/.test(admin.password || '')) {
            validPassword = safePlaintextMatch(password, admin.password) || safeSha256Match(password, admin.password);
            if (validPassword) {
                admin.password = await bcryptjs.hash(password, 12);
                await admin.save();
            }
        }
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { role: "admin" },
            secret,
            { subject: String(admin._id), expiresIn: process.env.ADMIN_TOKEN_TTL || "8h" }
        );
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Admin login failed:", error.message);
        res.status(500).json({ message: "Internal error" });
    }
};

// Get user details
export const admindetails = async (req, res) => {
    try {
        const admin = await Admin.find().select('-password');
        res.status(200).json(admin);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
};

// Delete a user
export const deleteAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAdmin = await Admin.findByIdAndDelete(id);

        if (!deletedAdmin) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting User:", error);
        res.status(500).json({ error: "Error deleting User" });
    }
};
