
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

// Route imports
import jobRoutes from "./Route/Job.route.js";
import contactRoute from "./Route/Contact.route.js";
import AdminRoute from "./Route/Admin.route.js";
import newslatterRoute from './Route/Newslatter.route.js';
import blog from "./Route/Blog.route.js";
import visitorRoute from "./Route/Visitor.route.js";

import { startFreehireCron } from "./Controller/Freehire.cron.js";


dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URI || process.env.MongoDBURI;
const allowedOrigins = new Set(
    (process.env.CORS_ORIGINS || [
        "https://dcoder-7vi1.onrender.com",
        "https://dcoder-admin-page.onrender.com",
        "https://thejobinfo.in",
        "https://www.thejobinfo.in",
        "https://admin.thejobinfo.in",
        "http://localhost:5173",
        "http://localhost:3000",
    ].join(","))
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
);

app.set("trust proxy", 1);
app.use(helmet());

// CORS configuration - MUST be before other middleware
app.use(cors({
    origin(origin, callback) {
        const isLocalDevelopmentOrigin = process.env.NODE_ENV !== "production" && (() => {
            try {
                const parsedOrigin = new URL(origin);
                return parsedOrigin.protocol === "http:" &&
                    ["localhost", "127.0.0.1"].includes(parsedOrigin.hostname);
            } catch {
                return false;
            }
        })();
        if (!origin || allowedOrigins.has(origin) || isLocalDevelopmentOrigin) {
            return callback(null, true);
        }
        return callback(new Error("Origin is not allowed by CORS"));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many login attempts. Try again later." },
});
const publicPostLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many requests. Try again later." },
});
const visitorLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many visitor-count requests. Try again later." },
});


// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

app.use("/admin/adminlogin", loginLimiter);
app.use("/admin/login", loginLimiter);
app.use("/contact/contactinfo", publicPostLimiter);
app.use("/newslatter/subscribe", publicPostLimiter);

// Connect to MongoDB
mongoose.connect(URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
        console.log(`📊 Database: ${mongoose.connection.name}`);
    })
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    });

// MongoDB connection event listeners
mongoose.connection.on('disconnected', () => {
    console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err);
});

startFreehireCron();

// API Routes

app.use('/job', jobRoutes);
app.use("/contact", contactRoute);
app.use("/admin", AdminRoute);
app.use("/newslatter", newslatterRoute);
app.use("/blog", blog);
app.use("/visitor", visitorLimiter, visitorRoute);
app.use("/visitor", visitorRoute);



// Error handling middleware - MUST be after all routes
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);

    // Handle Multer errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            message: 'File too large',
            error: 'Maximum file size is 100MB'
        });
    }

    if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
            message: 'Too many files',
            error: 'Maximum 20 files allowed'
        });
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
            message: 'Unexpected field',
            error: err.message
        });
    }

    // Generic error handler
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// 404 handler - MUST be after all routes
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found',
        path: req.path
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📁 Uploads directory: ${path.join(__dirname, 'uploads')}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n⚠️  Shutting down gracefully...');
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n⚠️  SIGTERM received, shutting down...');
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
});

export default app;