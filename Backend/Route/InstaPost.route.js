// // import express from "express";
// // import multer from "multer";
// // import {
// //     createContent,
// //     getAllContent
// // } from "../Controller/InstaPost.controller.js";

// // const router = express.Router();

// // const storage = multer.diskStorage({
// //     destination: "uploads/",
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now() + "-" + file.originalname);
// //     }
// // });

// // const upload = multer({ storage });

// // router.post("/upload", upload.single("file"), createContent);
// // router.get("/content", getAllContent);

// // export default router;


// import express from "express";
// import multer from "multer";
// import {
//     createContent,
//     getAllContent,
//     getContentById,
//     updateContent,
//     deleteContent,
//     getContentStats
// } from "../Controller/InstaPost.controller.js";

// const router = express.Router();

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const upload = multer({
//     storage,
//     limits: {
//         fileSize: 100 * 1024 * 1024 // 100MB limit
//     },
//     fileFilter: (req, file, cb) => {
//         // Accept images and videos only
//         if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only image and video files are allowed!'), false);
//         }
//     }
// });

// // Routes
// router.post("/upload", upload.single("file"), createContent);
// router.get("/content", getAllContent);
// router.get("/content/:id", getContentById);
// router.put("/content/:id", upload.single("file"), updateContent);
// router.delete("/content/:id", deleteContent);
// router.get("/stats", getContentStats);

// export default router;



// import express from "express";
// import multer from "multer";
// import {
//     createContent,
//     getAllContent,
//     getContentById,
//     updateContent,
//     deleteContent,
//     getContentStats,
//     addComment,
//     getComments,
//     toggleLike
// } from "../Controller/InstaPost.controller.js";

// const router = express.Router();

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const upload = multer({
//     storage,
//     limits: {
//         fileSize: 100 * 1024 * 1024 // 100MB limit
//     },
//     fileFilter: (req, file, cb) => {
//         // Accept images and videos only
//         if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only image and video files are allowed!'), false);
//         }
//     }
// });

// // Routes
// // Create content - use array for POST (multiple files), single for REEL
// router.post("/upload", (req, res, next) => {
//     const uploadMiddleware = req.body.type === "POST" 
//         ? upload.array("files", 20) // Allow up to 20 images for POST
//         : upload.single("file"); // Single file for REEL

//     uploadMiddleware(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ message: err.message });
//         }
//         next();
//     });
// }, createContent);

// router.get("/content", getAllContent);
// router.get("/content/:id", getContentById);

// // Update content
// router.put("/content/:id", (req, res, next) => {
//     const uploadMiddleware = req.body.type === "POST" 
//         ? upload.array("files", 20)
//         : upload.single("file");

//     uploadMiddleware(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ message: err.message });
//         }
//         next();
//     });
// }, updateContent);

// router.delete("/content/:id", deleteContent);
// router.get("/stats", getContentStats);

// // Comment routes for reels
// router.post("/content/:id/comment", addComment);
// router.get("/content/:id/comments", getComments);

// // Like route
// router.post("/content/:id/like", toggleLike);

// export default router;




// import express from "express";
// import multer from "multer";
// import {
//     createContent,
//     getAllContent,
//     getContentById,
//     updateContent,
//     deleteContent,
//     getContentStats,
//     addComment,
//     getComments,
//     toggleLike
// } from "../Controller/InstaPost.controller.js";

// const router = express.Router();

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const upload = multer({
//     storage,
//     limits: {
//         fileSize: 100 * 1024 * 1024 // 100MB limit
//     },
//     fileFilter: (req, file, cb) => {
//         // Accept images and videos only
//         if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only image and video files are allowed!'), false);
//         }
//     }
// });

// // Routes

// // FIXED: Use array upload for all types, then handle in controller
// // This avoids the issue of needing to know the type before multer processes files
// router.post("/upload", upload.array("files", 20), (req, res, next) => {
//     console.log("📝 Body received:", req.body);
//     console.log("📁 Files received:", req.files ? req.files.length : 0);

//     // If REEL type, convert array to single file for controller
//     if (req.body.type === "REEL" && req.files && req.files.length > 0) {
//         req.file = req.files[0];
//         console.log("🎬 REEL: Converting to single file:", req.file.filename);
//     }

//     next();
// }, createContent);

// router.get("/content", getAllContent);
// router.get("/content/:id", getContentById);

// // Update content - same fix as upload
// router.put("/content/:id", upload.array("files", 20), (req, res, next) => {
//     console.log("📝 Update body received:", req.body);
//     console.log("📁 Update files received:", req.files ? req.files.length : 0);

//     // If REEL type, convert array to single file for controller
//     if (req.body.type === "REEL" && req.files && req.files.length > 0) {
//         req.file = req.files[0];
//         console.log("🎬 REEL: Converting to single file:", req.file.filename);
//     }

//     next();
// }, updateContent);

// router.delete("/content/:id", deleteContent);
// router.get("/stats", getContentStats);

// // Comment routes for reels
// router.post("/content/:id/comment", addComment);
// router.get("/content/:id/comments", getComments);

// // Like route
// router.post("/content/:id/like", toggleLike);

// export default router;



import express from "express";
import multer from "multer";
import {
    createContent,
    getAllContent,
    getContentById,
    updateContent,
    deleteContent,
    getContentStats,
    addComment,
    getComments,
    toggleLike
} from "../Controller/InstaPost.controller.js";

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept images and videos only
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image and video files are allowed!'), false);
        }
    }
});

// Routes

// FIXED: Use array upload for all types, then handle in controller
// This avoids the issue of needing to know the type before multer processes files
router.post("/upload", upload.array("files", 20), (req, res, next) => {
    console.log("📝 Body received:", req.body);
    console.log("📁 Files received:", req.files ? req.files.length : 0);

    // If REEL type, convert array to single file for controller
    if (req.body.type === "REEL" && req.files && req.files.length > 0) {
        req.file = req.files[0];
        console.log("🎬 REEL: Converting to single file:", req.file.filename);
    }

    next();
}, createContent);

router.get("/content", getAllContent);
router.get("/content/:id", getContentById);

// Update content - same fix as upload
router.put("/content/:id", upload.array("files", 20), (req, res, next) => {
    console.log("📝 Update body received:", req.body);
    console.log("📁 Update files received:", req.files ? req.files.length : 0);

    // If REEL type, convert array to single file for controller
    if (req.body.type === "REEL" && req.files && req.files.length > 0) {
        req.file = req.files[0];
        console.log("🎬 REEL: Converting to single file:", req.file.filename);
    }

    next();
}, updateContent);

router.delete("/content/:id", deleteContent);
router.get("/stats", getContentStats);

// Comment routes for reels
router.post("/content/:id/comment", addComment);
router.get("/content/:id/comments", getComments);

// Like route
router.post("/content/:id/like", toggleLike);

export default router;