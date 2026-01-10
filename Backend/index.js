// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import session from "express-session";
// import passport from "passport";
// import bodyParser from "body-parser";

// // Route imports
// import noteRoute from "./Route/Note.route.js";
// import sheetRoute from "./Route/Sheet.route.js";
// import sheetproblemRoute from "./Route/Sheetproblem.route.js";
// import sdeproblemRoute from "./Route/SDEProblem.route.js";
// import CheatnoteRoute from "./Route/CheatNote.route.js";
// import blogRoute from "./Route/Blog.route.js";
// import notecontentRoute from "./Route/NoteContent.route.js";
// import userRoute from "./Route/User.route.js";
// import contactRoute from "./Route/Contact.route.js";
// import AdminRoute from "./Route/Admin.route.js";
// import newslatterRoute from './Route/Newslatter.route.js';
// import searchRoute from './Route/Search.route.js';
// import instaPost from './Route/InstaPost.route.js';

// // Controller imports
// import { googleLogin, googleCallback, googleCallbackRedirect } from './Controller/Googleuser.controller.js';

// // Chat AI import
// import handleChatRequest from './Controller/Ai.controller.js';

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4000;
// const URI = process.env.MongoDBURI;
// const SESSION_SECRET = process.env.SESSION_SECRET;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));
// app.use(bodyParser.json());

// // Session settings
// app.use(session({
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
// }));

// // Setup passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Google OAuth routes
// app.get("/auth/google", googleLogin);
// app.get("/auth/google/callback", googleCallback, googleCallbackRedirect);

// // Connect to MongoDB
// mongoose.connect(URI)
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((error) => console.error("MongoDB connection error:", error));

// // API Routes
// app.use("/note", noteRoute);
// app.use("/sheet", sheetRoute);
// app.use("/sheetproblem", sheetproblemRoute);
// app.use("/sdeproblem", sdeproblemRoute);
// app.use("/cheatnote", CheatnoteRoute);
// app.use("/blog", blogRoute);
// app.use("/notecontent", notecontentRoute);
// app.use("/user", userRoute);
// app.use("/contact", contactRoute);
// app.use("/admin", AdminRoute);
// app.use("/newslatter", newslatterRoute);
// app.use("/search", searchRoute);
// app.use("/instapost", instaPost);


// // Chat route
// app.post('/chat', handleChatRequest);

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// Route imports
import noteRoute from "./Route/Note.route.js";
import sheetRoute from "./Route/Sheet.route.js";
import sheetproblemRoute from "./Route/Sheetproblem.route.js";
import sdeproblemRoute from "./Route/SDEProblem.route.js";
import blogRoute from "./Route/Blog.route.js";
import notecontentRoute from "./Route/NoteContent.route.js";
import userRoute from "./Route/User.route.js";
import contactRoute from "./Route/Contact.route.js";
import AdminRoute from "./Route/Admin.route.js";
import newslatterRoute from './Route/Newslatter.route.js';
import searchRoute from './Route/Search.route.js';
import instaPost from './Route/InstaPost.route.js';

// Controller imports
import { googleLogin, googleCallback, googleCallbackRedirect } from './Controller/Googleuser.controller.js';

// Chat AI import
import handleChatRequest from './Controller/Ai.controller.js';

// Load environment variables
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;
const SESSION_SECRET = process.env.SESSION_SECRET;

// CORS configuration - MUST be before other middleware
app.use(cors({
    origin: '*', // In production, specify your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Body parser with increased limits for file uploads - MUST be before routes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from uploads directory - CRITICAL for file access
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Session settings
app.use(session({
    secret: SESSION_SECRET || 'your-secret-key-here',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Setup passport
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth routes
app.get("/auth/google", googleLogin);
app.get("/auth/google/callback", googleCallback, googleCallbackRedirect);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

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

// API Routes
app.use("/note", noteRoute);
app.use("/sheet", sheetRoute);
app.use("/sheetproblem", sheetproblemRoute);
app.use("/sdeproblem", sdeproblemRoute);
app.use("/blog", blogRoute);
app.use("/notecontent", notecontentRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);
app.use("/admin", AdminRoute);
app.use("/newslatter", newslatterRoute);
app.use("/search", searchRoute);
app.use("/instapost", instaPost); // This is your upload route

// Chat route
app.post('/chat', handleChatRequest);

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