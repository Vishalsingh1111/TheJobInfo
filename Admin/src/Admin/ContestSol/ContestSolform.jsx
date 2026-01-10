
import { useEffect, useState } from "react";
import { Trash2, Edit, Plus, X, Save, Upload, Calendar, Clock, Image as ImageIcon, Video, AlertCircle } from "lucide-react";

// const BASE_URL = "http://localhost:4001/instapost";
// const FILE_URL = "http://localhost:4001";

const BASE_URL = "https://dcoder-backend.onrender.com/instapost";
const FILE_URL = "https://dcoder-backend.onrender.com";

export default function AdminCRUD() {
    const [content, setContent] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        topic: "",
        type: "REEL",
        selectedFiles: [], // Store actual file objects
        visibleAt: ""
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch(`${BASE_URL}/content?includeScheduled=true`);
            const data = await res.json();
            setContent(data);
        } catch (err) {
            console.error("Error fetching content:", err);
        }
    };

    const handleDelete = async (id) => {
        // if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            const res = await fetch(`${BASE_URL}/content/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                alert("Deleted successfully!");
                fetchContent();
            } else {
                const error = await res.json();
                alert(error.message || "Failed to delete");
            }
        } catch (err) {
            console.error("Error deleting:", err);
            alert("Failed to delete");
        }
    };

    const handleEdit = (item) => {
        setIsEditMode(true);
        setCurrentItem(item);

        const visibleAtFormatted = item.visibleAt
            ? new Date(item.visibleAt).toISOString().slice(0, 16)
            : "";

        setFormData({
            title: item.title,
            description: item.description,
            topic: item.topic,
            type: item.type,
            selectedFiles: [],
            visibleAt: visibleAtFormatted
        });

        // Set preview URLs based on type
        if (item.type === "POST" && item.files && item.files.length > 0) {
            setPreviewUrls(item.files.map(f => `${FILE_URL}${f.fileUrl}`));
        } else if (item.type === "REEL" && item.fileUrl) {
            setPreviewUrls([`${FILE_URL}${item.fileUrl}`]);
        } else {
            setPreviewUrls([]);
        }

        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setIsEditMode(false);
        setCurrentItem(null);
        setFormData({
            title: "",
            description: "",
            topic: "",
            type: "REEL",
            selectedFiles: [],
            visibleAt: ""
        });
        setPreviewUrls([]);
        setIsModalOpen(true);
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (selectedFiles.length === 0) return;

        console.log("📁 Files selected:", selectedFiles.length);
        console.log("📁 File type:", formData.type);

        if (formData.type === "POST") {
            // Multiple images for POST
            if (selectedFiles.length > 20) {
                alert("Maximum 20 images allowed");
                return;
            }

            const invalidFiles = selectedFiles.filter(f => !f.type.startsWith('image/'));
            if (invalidFiles.length > 0) {
                alert("Only image files (JPEG, PNG, GIF) are allowed for POST type");
                return;
            }

            setFormData({ ...formData, selectedFiles: selectedFiles });
            const urls = selectedFiles.map(file => URL.createObjectURL(file));
            setPreviewUrls(urls);

            console.log("✅ POST: Set", selectedFiles.length, "images");
        } else {
            // Single video for REEL
            const file = selectedFiles[0];

            if (!file.type.startsWith('video/')) {
                alert("Only video files (MP4, MOV, AVI) are allowed for REEL type");
                return;
            }

            // Store as array for consistency
            setFormData({ ...formData, selectedFiles: [file] });
            setPreviewUrls([URL.createObjectURL(file)]);

            console.log("✅ REEL: Set video file:", file.name);
        }
    };

    const handleTypeChange = (newType) => {
        console.log("🔄 Type changed to:", newType);
        setFormData({
            ...formData,
            type: newType,
            selectedFiles: []
        });
        setPreviewUrls([]);

        const fileInput = document.getElementById('file-upload');
        if (fileInput) fileInput.value = '';
    };

    const handleSubmit = async () => {
        console.log("🚀 Starting submit...");
        console.log("📋 Current form state:", {
            title: formData.title,
            description: formData.description,
            topic: formData.topic,
            type: formData.type,
            filesCount: formData.selectedFiles.length,
            isEditMode: isEditMode
        });

        // Validation
        if (!formData.title?.trim()) {
            alert("Please enter a title");
            return;
        }

        if (!formData.description?.trim()) {
            alert("Please enter a description");
            return;
        }

        if (!formData.topic?.trim()) {
            alert("Please enter a topic");
            return;
        }

        // File validation only for new content
        if (!isEditMode) {
            if (formData.selectedFiles.length === 0) {
                alert(`Please upload ${formData.type === "POST" ? "at least one image" : "a video"}`);
                return;
            }

            console.log("✅ Validation passed. Files:", formData.selectedFiles.length);
        }

        setIsSubmitting(true);

        try {
            const data = new FormData();

            // Add text fields
            data.append("title", formData.title.trim());
            data.append("description", formData.description.trim());
            data.append("topic", formData.topic.trim());
            data.append("type", formData.type);

            console.log("📝 Added text fields");

            // Add visibleAt if specified
            if (formData.visibleAt) {
                data.append("visibleAt", new Date(formData.visibleAt).toISOString());
                console.log("📅 Added visibleAt:", formData.visibleAt);
            }

            // CRITICAL: Always use "files" field name for consistency
            if (formData.selectedFiles.length > 0) {
                console.log(`📤 Appending ${formData.selectedFiles.length} file(s) to "files" field`);
                formData.selectedFiles.forEach((file, index) => {
                    data.append("files", file);  // ← ALWAYS use "files"
                    console.log(`  ✓ files[${index}]: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB, ${file.type})`);
                });
            }

            // Debug: Log all FormData entries
            console.log("📦 Complete FormData contents:");
            for (let pair of data.entries()) {
                if (pair[1] instanceof File) {
                    console.log(`  ${pair[0]}: File(${pair[1].name}, ${(pair[1].size / 1024 / 1024).toFixed(2)}MB)`);
                } else {
                    console.log(`  ${pair[0]}: ${pair[1]}`);
                }
            }

            const url = isEditMode
                ? `${BASE_URL}/content/${currentItem._id}`
                : `${BASE_URL}/upload`;

            const method = isEditMode ? "PUT" : "POST";

            console.log(`🌐 Sending ${method} to: ${url}`);

            const res = await fetch(url, {
                method: method,
                body: data
                // Don't set Content-Type - let browser set it with boundary
            });

            console.log("📡 Response status:", res.status);
            console.log("📡 Response headers:", Object.fromEntries(res.headers.entries()));

            if (res.ok) {
                const result = await res.json();
                console.log("✅ Success! Response:", result);

                alert(isEditMode ? "✅ Updated successfully!" : "✅ Content added successfully!");
                setIsModalOpen(false);
                fetchContent();

                // Clean up
                previewUrls.forEach(url => {
                    if (url.startsWith('blob:')) {
                        URL.revokeObjectURL(url);
                    }
                });
                setPreviewUrls([]);
            } else {
                let errorMessage = "Upload failed";
                const contentType = res.headers.get("content-type");

                try {
                    if (contentType && contentType.includes("application/json")) {
                        const errorData = await res.json();
                        console.error("❌ Error response:", errorData);
                        errorMessage = errorData.message || errorData.error || errorMessage;
                    } else {
                        const errorText = await res.text();
                        console.error("❌ Error text:", errorText);
                        errorMessage = "Server returned an error. Check server console.";
                    }
                } catch (e) {
                    console.error("❌ Could not parse error:", e);
                }

                alert(`❌ Error: ${errorMessage}`);
            }
        } catch (err) {
            console.error("❌ Submit error:", err);
            console.error("❌ Error stack:", err.stack);
            alert(`❌ Failed to submit: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const removePreviewImage = (index) => {
        const newFiles = formData.selectedFiles.filter((_, i) => i !== index);
        const newUrls = previewUrls.filter((_, i) => i !== index);

        if (previewUrls[index]?.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrls[index]);
        }

        setFormData({ ...formData, selectedFiles: newFiles });
        setPreviewUrls(newUrls);
    };

    const isScheduled = (item) => {
        return new Date(item.visibleAt) > new Date();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white rounded-2xl p-8 mb-8 shadow-xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">🎬 Content Management</h1>
                            <p className="text-blue-100 dark:text-blue-200">Manage your reels and posts with scheduling</p>
                        </div>
                        <button
                            onClick={handleAdd}
                            className="flex items-center gap-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Content
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                        <p className="text-gray-600 dark:text-gray-400 mb-1">Total Content</p>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{content.length}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                        <p className="text-gray-600 dark:text-gray-400 mb-1">Reels</p>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            {content.filter(c => c.type === "REEL").length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-pink-500">
                        <p className="text-gray-600 dark:text-gray-400 mb-1">Posts</p>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            {content.filter(c => c.type === "POST").length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                        <p className="text-gray-600 dark:text-gray-400 mb-1">Scheduled</p>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            {content.filter(c => isScheduled(c)).length}
                        </p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {content.map(item => {
                        const scheduled = isScheduled(item);
                        const firstImageUrl = item.type === "POST" && item.files && item.files.length > 0
                            ? `${FILE_URL}${item.files[0].fileUrl}`
                            : item.fileUrl ? `${FILE_URL}${item.fileUrl}` : null;

                        return (
                            <div
                                key={item._id}
                                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Preview */}
                                <div className="relative aspect-[21/9] bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
                                    {item.type === "REEL" && item.fileUrl ? (
                                        <video
                                            className="w-full h-full object-cover"
                                            muted
                                        >
                                            <source src={`${FILE_URL}${item.fileUrl}`} />
                                        </video>
                                    ) : firstImageUrl ? (
                                        <img
                                            src={firstImageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                                        </div>
                                    )}

                                    {/* Badges */}
                                    <div className="absolute top-16 right-3 flex flex-col gap-2">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${item.type === "REEL"
                                            ? "bg-red-500 text-white"
                                            : "bg-blue-500 text-white"
                                            }`}>
                                            {item.type}
                                        </span>
                                        {scheduled && (
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                Scheduled
                                            </span>
                                        )}
                                    </div>

                                    {/* Page count for posts */}
                                    {item.type === "POST" && item.files && item.files.length > 0 && (
                                        <>
                                            <div className="flex justify-center justify-between p-3">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 flex items-center gap-1">
                                                    <ImageIcon className="w-3 h-3" />
                                                    {item.files.length} page{item.files.length !== 1 ? 's' : ''}
                                                </span>


                                                <span className="inline-block px-3 py-1 bg-purple-500 dark:bg-gray-800/90 text-white dark:text-gray-200 rounded-full text-xs font-semibold">
                                                    {item.topic}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">

                                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                                        {item.description}
                                    </p>

                                    {/* Date Info */}
                                    <div className="space-y-1 mb-4">
                                        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            Created: {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            Visible: {new Date(item.visibleAt).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Engagement Stats (for Reels) */}
                                    {item.type === "REEL" && (
                                        <div className="flex gap-4 mb-4 text-xs text-gray-600 dark:text-gray-400">
                                            <span>❤️ {item.likesCount || 0} likes</span>
                                            <span>💬 {item.comments?.length || 0} comments</span>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="flex-1 flex items-center justify-center gap-2 bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {content.length === 0 && (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl">
                        <p className="text-gray-400 dark:text-gray-500 text-xl">No content yet. Add your first one!</p>
                    </div>
                )}
            </div>

            {/* Modal - Same as before but using selectedFiles */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-6 flex justify-between items-center z-10">
                            <h2 className="text-2xl font-bold">
                                {isEditMode ? "Edit Content" : "Add New Content"}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="hover:bg-white/20 p-2 rounded-full transition-colors"
                                disabled={isSubmitting}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Info Alert */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-800 dark:text-blue-200">
                                    <p className="font-semibold mb-1">Important:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li><strong>POST:</strong> Upload multiple images (JPEG/PNG, up to 20)</li>
                                        <li><strong>REEL:</strong> Upload single video (MP4/MOV/AVI)</li>
                                        <li>All files uploaded using the same "files" field name</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Type Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Content Type *
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange("REEL")}
                                        disabled={isSubmitting}
                                        className={`p-4 rounded-lg border-2 transition-all ${formData.type === "REEL"
                                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                            : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                                            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <Video className={`w-8 h-8 mx-auto mb-2 ${formData.type === "REEL" ? "text-red-500" : "text-gray-400 dark:text-gray-500"}`} />
                                        <p className={`font-semibold ${formData.type === "REEL" ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"}`}>
                                            REEL
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Single video</p>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange("POST")}
                                        disabled={isSubmitting}
                                        className={`p-4 rounded-lg border-2 transition-all ${formData.type === "POST"
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                            : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                                            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${formData.type === "POST" ? "text-blue-500" : "text-gray-400 dark:text-gray-500"}`} />
                                        <p className={`font-semibold ${formData.type === "POST" ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}>
                                            POST
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Multiple images</p>
                                    </button>
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none disabled:opacity-50"
                                    placeholder="Enter title"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none disabled:opacity-50"
                                    rows="4"
                                    placeholder="Enter description"
                                />
                            </div>

                            {/* Topic & Visibility Date */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Topic *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.topic}
                                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none disabled:opacity-50"
                                        placeholder="e.g., Science"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Visible From (Optional)
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={formData.visibleAt}
                                        onChange={(e) => setFormData({ ...formData, visibleAt: e.target.value })}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none disabled:opacity-50"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Leave empty for immediate visibility</p>
                                </div>
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    {isEditMode ? "Change Files (Optional)" : `Upload ${formData.type === "POST" ? "Images" : "Video"} *`}
                                </label>
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-gray-50 dark:bg-gray-700/50">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept={formData.type === "POST" ? "image/*" : "video/*"}
                                        multiple={formData.type === "POST"}
                                        disabled={isSubmitting}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className={`cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                                        <p className="text-gray-600 dark:text-gray-300 font-medium">
                                            Click to upload
                                        </p>
                                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                                            {formData.type === "POST"
                                                ? "Multiple images (JPEG, PNG) - Max 20 files"
                                                : "Single video file (MP4, MOV, AVI)"}
                                        </p>
                                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                                            ℹ️ All files use "files" field name
                                        </p>
                                    </label>
                                </div>

                                {/* Preview */}
                                {previewUrls.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Preview {formData.type === "POST" && `(${previewUrls.length} image${previewUrls.length !== 1 ? 's' : ''})`}:
                                        </p>

                                        {formData.type === "POST" ? (
                                            // Multiple image previews for POST
                                            <div className="grid grid-cols-3 gap-3">
                                                {previewUrls.map((url, index) => (
                                                    <div key={index} className="relative group">
                                                        <img
                                                            src={url}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600"
                                                        />
                                                        <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                                            Page {index + 1}
                                                        </div>
                                                        {!isEditMode && !isSubmitting && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removePreviewImage(index)}
                                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            // Single video preview for REEL
                                            <div className="relative rounded-lg overflow-hidden bg-black">
                                                <video
                                                    src={previewUrls[0]}
                                                    controls
                                                    className="w-full max-h-64 mx-auto"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white px-6 py-3 rounded-lg hover:shadow-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            {isEditMode ? "Update" : "Create"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}