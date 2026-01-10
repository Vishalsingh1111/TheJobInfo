

// import { useEffect, useState } from "react";
// import { X, ChevronLeft, ChevronRight, FileText, Calendar, Tag, BookOpen, Download, ZoomIn, ZoomOut, Maximize2, Sparkles, Eye } from "lucide-react";

// const BASE_URL = "http://localhost:4001/instapost";
// const FILE_URL = "http://localhost:4001";

// export default function BookReaderPosts() {
//     const [posts, setPosts] = useState([]);
//     const [activePost, setActivePost] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(10);
//     const [zoom, setZoom] = useState(100);
//     const [isFullscreen, setIsFullscreen] = useState(false);

//     useEffect(() => {
//         fetch(`${BASE_URL}/content?type=POST`)
//             .then(res => res.json())
//             .then(data => {
//                 const filteredData = data.filter(item => item.topic !== "Cheatsheet");
//                 setPosts(filteredData.slice(0, 4));
//             })
//             .catch(err => console.error('Error:', err));
//     }, []);

//     const openBook = (post) => {
//         setActivePost(post);
//         setCurrentPage(1);
//         setZoom(100);
//         setIsFullscreen(false);
//     };

//     const closeBook = () => {
//         setActivePost(null);
//         setCurrentPage(1);
//     };

//     const nextPage = () => {
//         if (currentPage < totalPages - 1) {
//             setCurrentPage(currentPage + 2);
//         }
//     };

//     const prevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 2);
//         }
//     };

//     const handleZoomIn = () => {
//         if (zoom < 150) setZoom(zoom + 10);
//     };

//     const handleZoomOut = () => {
//         if (zoom > 50) setZoom(zoom - 10);
//     };

//     const toggleFullscreen = () => {
//         setIsFullscreen(!isFullscreen);
//     };

//     return (
//         <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-4 py-16 border-b border-gray-200 dark:border-gray-800">
//             <div className="container mx-auto px-4">
//                 {/* Header Section */}
//                 <div className="text-center mb-12">
//                     {/* Badge */}
//                     <div className="flex justify-center mb-6 animate-fade-in">
//                         <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:scale-105 transition-transform">
//                             <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
//                             <span className="text-purple-700 dark:text-purple-300 font-semibold">Digital Library For You</span>
//                             <Sparkles className="w-5 h-5 text-pink-500 dark:text-pink-400" />
//                         </div>
//                     </div>

//                     {/* Main Heading */}
//                     <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
//                         Latest <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Posts</span>
//                     </h2>

//                     {/* Subtitle */}
//                     <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
//                         Discover our newest educational content with an immersive reading experience
//                     </p>
//                 </div>

//                 {/* Cards Grid */}
//                 <div className="container mx-auto max-w-6xl">
//                     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
//                         {posts.map((item, index) => {
//                             // Cycle through 8 different color gradients based on card index
//                             const gradients = [
//                                 { gradient: "from-red-500 to-orange-600", bgGradient: "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20" },
//                                 { gradient: "from-green-500 to-emerald-600", bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20" },
//                                 { gradient: "from-yellow-500 to-amber-600", bgGradient: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20" },
//                                 { gradient: "from-blue-500 to-cyan-600", bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20" },
//                                 { gradient: "from-purple-600 to-pink-600", bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20" },
//                                 { gradient: "from-orange-500 to-red-500", bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20" },
//                                 { gradient: "from-teal-500 to-cyan-600", bgGradient: "from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20" },
//                                 { gradient: "from-indigo-600 to-purple-600", bgGradient: "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20" }
//                             ];
//                             const { gradient, bgGradient } = gradients[index % 8];

//                             return (
//                                 <div
//                                     key={item._id}
//                                     onClick={() => openBook(item)}
//                                     className="block group cursor-pointer"
//                                 >
//                                     <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700 h-full">
//                                         {/* Animated Background Glow */}
//                                         <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

//                                         {/* Card Content */}
//                                         <div className="relative">
//                                             {/* Icon Section with Gradient Background */}
//                                             <div className={`bg-gradient-to-br ${bgGradient} backdrop-blur-sm p-8 border-b-2 border-gray-200 dark:border-gray-700 relative overflow-hidden`}>
//                                                 {/* Decorative Elements */}
//                                                 <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-2xl`}></div>
//                                                 <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-xl`}></div>

//                                                 <div className="relative flex justify-center items-center">
//                                                     {/* Icon Container */}
//                                                     <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-2xl shadow-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 overflow-hidden">
//                                                         {item.fileType?.includes("image") && item.fileUrl ? (
//                                                             <img
//                                                                 src={`${FILE_URL}${item.fileUrl}`}
//                                                                 alt={item.title}
//                                                                 className="w-full h-full object-cover"
//                                                             />
//                                                         ) : item.fileType?.includes("pdf") ? (
//                                                             <FileText className="w-14 h-14 text-purple-600 dark:text-purple-400" />
//                                                         ) : (
//                                                             <BookOpen className="w-14 h-14 text-purple-600 dark:text-purple-400" />
//                                                         )}
//                                                     </div>
//                                                 </div>

//                                                 {/* Floating Action Badge */}
//                                                 <div className="absolute bottom-4 left-4 right-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                                     <div className={`bg-gradient-to-r ${gradient} text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg`}>
//                                                         <Eye className="w-3 h-3" />
//                                                         Quick View
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Content Section */}
//                                             <div className="p-6 pt-3 space-y-3">
//                                                 {/* Topic Badge */}
//                                                 <div className="flex items-center gap-2">
//                                                     <Tag className="w-3 h-3 text-purple-600 dark:text-purple-400" />
//                                                     <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
//                                                         {item.topic}
//                                                     </span>
//                                                 </div>

//                                                 {/* Title */}
//                                                 <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all line-clamp-2">
//                                                     {item.title}
//                                                 </h3>

//                                                 {/* Description */}
//                                                 <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-1">
//                                                     {item.description}
//                                                 </p>

//                                                 {/* Date */}
//                                                 <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
//                                                     <Calendar className="w-3 h-3" />
//                                                     <span>{new Date(item.createdAt).toLocaleDateString()}</span>
//                                                 </div>

//                                                 {/* CTA Button */}
//                                                 <button className={`w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r ${gradient} text-white rounded-xl font-semibold shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
//                                                     <BookOpen className="w-4 h-4" />
//                                                     Open & Read
//                                                 </button>
//                                             </div>

//                                             {/* Bottom Accent Line */}
//                                             <div className={`h-1 bg-gradient-to-r ${gradient}`}></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     {/* View All Button */}
//                     <div className="text-center">
//                         <a href="/Post">
//                             <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 dark:hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300">
//                                 <BookOpen className="w-5 h-5" />
//                                 View All Posts
//                                 <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                             </button>
//                         </a>
//                     </div>
//                 </div>
//             </div>

//             {/* PDF Reader Modal */}
//             {activePost && activePost.fileType?.includes("pdf") && (
//                 <div className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4'}`}>
//                     {/* Top Controls Bar */}
//                     <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-4 z-10">
//                         <div className="container mx-auto max-w-7xl flex justify-between items-center">
//                             <div className="flex items-center gap-4">
//                                 <h3 className="text-white font-semibold text-lg hidden md:block">
//                                     {activePost.title}
//                                 </h3>
//                                 <span className="text-white/70 text-sm">
//                                     Pages {currentPage}-{Math.min(currentPage + 1, totalPages)} of {totalPages}
//                                 </span>
//                             </div>

//                             <div className="flex items-center gap-2">
//                                 <button
//                                     onClick={handleZoomOut}
//                                     className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
//                                     title="Zoom Out"
//                                 >
//                                     <ZoomOut className="w-5 h-5" />
//                                 </button>
//                                 <span className="text-white text-sm px-2">{zoom}%</span>
//                                 <button
//                                     onClick={handleZoomIn}
//                                     className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
//                                     title="Zoom In"
//                                 >
//                                     <ZoomIn className="w-5 h-5" />
//                                 </button>

//                                 <button
//                                     onClick={toggleFullscreen}
//                                     className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
//                                     title="Toggle Fullscreen"
//                                 >
//                                     <Maximize2 className="w-5 h-5" />
//                                 </button>

//                                 <a
//                                     href={`${FILE_URL}${activePost.fileUrl}`}
//                                     download
//                                     className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
//                                     title="Download"
//                                 >
//                                     <Download className="w-5 h-5" />
//                                 </a>

//                                 <button
//                                     onClick={closeBook}
//                                     className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
//                                 >
//                                     <X className="w-5 h-5" />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* PDF Container */}
//                     <div className="relative w-full h-full flex items-center justify-center pt-20 pb-16">
//                         {/* Previous Page Button */}
//                         <button
//                             onClick={prevPage}
//                             disabled={currentPage <= 1}
//                             className={`absolute left-4 z-20 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
//                                 }`}
//                         >
//                             <ChevronLeft className="w-8 h-8" />
//                         </button>

//                         {/* PDF Pages Side by Side */}
//                         <div
//                             className="relative flex gap-1 bg-white rounded-lg shadow-2xl overflow-hidden"
//                             style={{
//                                 transform: `scale(${zoom / 100})`,
//                                 transition: 'transform 0.3s ease',
//                                 width: isFullscreen ? '100vw' : '90vw',
//                                 height: isFullscreen ? '100vh' : '85vh',
//                                 maxWidth: '1400px'
//                             }}
//                         >
//                             {/* Left Page */}
//                             <div className="relative w-1/2 bg-white border-r-2 border-gray-300 flex items-center justify-center">
//                                 <iframe
//                                     src={`${FILE_URL}${activePost.fileUrl}#page=${currentPage}&view=FitH`}
//                                     className="w-full h-full"
//                                     title="PDF Left Page"
//                                     style={{ border: 'none' }}
//                                 />
//                                 <div className="absolute bottom-4 left-0 right-0 text-center">
//                                     <span className="text-gray-500 text-sm bg-white/80 px-2 py-1 rounded">{currentPage}</span>
//                                 </div>
//                             </div>

//                             {/* Right Page */}
//                             <div className="relative w-1/2 bg-white flex items-center justify-center">
//                                 <iframe
//                                     src={`${FILE_URL}${activePost.fileUrl}#page=${currentPage + 1}&view=FitH`}
//                                     className="w-full h-full"
//                                     title="PDF Right Page"
//                                     style={{ border: 'none' }}
//                                 />
//                                 <div className="absolute bottom-4 left-0 right-0 text-center">
//                                     <span className="text-gray-500 text-sm bg-white/80 px-2 py-1 rounded">{Math.min(currentPage + 1, totalPages)}</span>
//                                 </div>
//                             </div>

//                             {/* Center Spine */}
//                             <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 shadow-lg transform -translate-x-1/2 z-10"></div>
//                         </div>

//                         {/* Next Page Button */}
//                         <button
//                             onClick={nextPage}
//                             disabled={currentPage >= totalPages - 1}
//                             className={`absolute right-4 z-20 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 ${currentPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''
//                                 }`}
//                         >
//                             <ChevronRight className="w-8 h-8" />
//                         </button>
//                     </div>

//                     {/* Bottom Progress Bar */}
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
//                         <div className="container mx-auto max-w-7xl">
//                             <div className="w-full bg-white/20 rounded-full h-2">
//                                 <div
//                                     className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
//                                     style={{ width: `${(currentPage / totalPages) * 100}%` }}
//                                 ></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Image Viewer Modal */}
//             {activePost && activePost.fileType?.includes("image") && (
//                 <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//                     {/* Top Controls Bar */}
//                     <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-4 z-10">
//                         <div className="container mx-auto max-w-7xl flex justify-between items-center">
//                             <h3 className="text-white font-semibold text-lg">
//                                 {activePost.title}
//                             </h3>

//                             <div className="flex items-center gap-2">
//                                 <a
//                                     href={`${FILE_URL}${activePost.fileUrl}`}
//                                     download
//                                     className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
//                                     title="Download"
//                                 >
//                                     <Download className="w-5 h-5" />
//                                 </a>

//                                 <button
//                                     onClick={closeBook}
//                                     className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
//                                 >
//                                     <X className="w-5 h-5" />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Image Container */}
//                     <div className="relative max-w-6xl max-h-[90vh] flex items-center justify-center">
//                         <img
//                             src={`${FILE_URL}${activePost.fileUrl}`}
//                             alt={activePost.title}
//                             className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
//                         />
//                     </div>

//                     {/* Info Bar */}
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
//                         <div className="container mx-auto max-w-7xl">
//                             <div className="text-white space-y-2">
//                                 <div className="flex items-center gap-2">
//                                     <Tag className="w-4 h-4 text-purple-400" />
//                                     <span className="text-sm font-semibold text-purple-400">
//                                         {activePost.topic}
//                                     </span>
//                                 </div>
//                                 <p className="text-white/80 text-sm">
//                                     {activePost.description}
//                                 </p>
//                                 <div className="flex items-center gap-2 text-xs text-white/60">
//                                     <Calendar className="w-3 h-3" />
//                                     <span>{new Date(activePost.createdAt).toLocaleDateString()}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Decorative Floating Blobs */}
//             {/* <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
//             <div className="fixed top-40 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
//             <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div> */}

//             <style>{`
//                 @keyframes blob {
//                     0%, 100% { transform: translate(0, 0) scale(1); }
//                     25% { transform: translate(20px, -50px) scale(1.1); }
//                     50% { transform: translate(-20px, 20px) scale(0.9); }
//                     75% { transform: translate(50px, 50px) scale(1.05); }
//                 }

//                 @keyframes fade-in {
//                     from { opacity: 0; }
//                     to { opacity: 1; }
//                 }

//                 .animate-blob {
//                     animation: blob 7s infinite;
//                 }

//                 .animate-fade-in {
//                     animation: fade-in 1s ease-out;
//                 }

//                 .animation-delay-2000 {
//                     animation-delay: 2s;
//                 }

//                 .animation-delay-4000 {
//                     animation-delay: 4s;
//                 }
//             `}</style>
//         </section>
//     );
// }


import { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight, FileText, Calendar, Tag, BookOpen, Download, ZoomIn, ZoomOut, Maximize2, Sparkles, Eye } from "lucide-react";
import HTMLFlipBook from "react-pageflip";
import { baseUrl } from "../Baseurl";

const BASE_URL = `${baseUrl}/instapost`;

export default function BookReaderPosts() {
    const [posts, setPosts] = useState([]);
    const [activePost, setActivePost] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [zoom, setZoom] = useState(100);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const flipBookRef = useRef();

    useEffect(() => {
        fetch(`${BASE_URL}/content?type=POST`)
            .then(res => res.json())
            .then(data => {
                const filteredData = data.filter(item => item.topic !== "Cheatsheet");
                setPosts(filteredData.slice(0, 4));
            })
            .catch(err => console.error('Error:', err));
    }, []);

    const openBook = (post) => {
        setActivePost(post);
        setCurrentPage(0);
        setZoom(100);
        setIsFullscreen(false);
    };

    const closeBook = () => {
        setActivePost(null);
        setCurrentPage(0);
    };

    const nextPage = () => {
        if (flipBookRef.current) {
            flipBookRef.current.pageFlip().flipNext();
        }
    };

    const prevPage = () => {
        if (flipBookRef.current) {
            flipBookRef.current.pageFlip().flipPrev();
        }
    };

    const onPageFlip = (e) => {
        setCurrentPage(e.data);
    };

    const handleZoomIn = () => {
        if (zoom < 150) setZoom(zoom + 10);
    };

    const handleZoomOut = () => {
        if (zoom > 50) setZoom(zoom - 10);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // ✅ FIXED: Just return the fileUrl directly (it's already a complete Cloudinary URL)
    const getFirstImageUrl = (item) => {
        if (item.files && item.files.length > 0) {
            return item.files[0].fileUrl; // ✅ Direct Cloudinary URL
        }
        return null;
    };

    const getTotalPages = () => {
        return activePost?.files?.length || 0;
    };

    const getCurrentPageDisplay = () => {
        const total = getTotalPages();

        if (currentPage === 0) {
            return `Page 1-2`;
        }

        const leftPage = currentPage + 1;
        const rightPage = currentPage + 2;

        if (rightPage <= total) {
            return `Pages ${leftPage}-${rightPage}`;
        } else if (leftPage <= total) {
            return `Page ${leftPage}`;
        }

        return `Page ${total}`;
    };

    return (
        <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-4 py-16 border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6 animate-fade-in">
                        <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:scale-105 transition-transform">
                            <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
                            <span className="text-purple-700 dark:text-purple-300 font-semibold">Digital Library For You</span>
                            <Sparkles className="w-5 h-5 text-pink-500 dark:text-pink-400" />
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Latest <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Posts</span>
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                        Discover our newest educational content with an immersive reading experience
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                        {posts.map((item, index) => {
                            const gradients = [
                                { gradient: "from-red-500 to-orange-600", bgGradient: "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20" },
                                { gradient: "from-green-500 to-emerald-600", bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20" },
                                { gradient: "from-yellow-500 to-amber-600", bgGradient: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20" },
                                { gradient: "from-blue-500 to-cyan-600", bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20" },
                                { gradient: "from-purple-600 to-pink-600", bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20" },
                                { gradient: "from-orange-500 to-red-500", bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20" },
                                { gradient: "from-teal-500 to-cyan-600", bgGradient: "from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20" },
                                { gradient: "from-indigo-600 to-purple-600", bgGradient: "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20" }
                            ];
                            const { gradient, bgGradient } = gradients[index % 8];
                            const firstImageUrl = getFirstImageUrl(item);

                            return (
                                <div
                                    key={item._id}
                                    onClick={() => openBook(item)}
                                    className="block group cursor-pointer"
                                >
                                    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700 h-full">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                                        <div className="relative">
                                            <div className={`bg-gradient-to-br ${bgGradient} backdrop-blur-sm p-8 border-b-2 border-gray-200 dark:border-gray-700 relative overflow-hidden`}>
                                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-2xl`}></div>
                                                <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-xl`}></div>

                                                <div className="relative flex justify-center items-center">
                                                    <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-xl shadow-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 overflow-hidden">
                                                        {firstImageUrl ? (
                                                            <img
                                                                src={firstImageUrl}
                                                                alt={item.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <BookOpen className="w-14 h-14 text-purple-600 dark:text-purple-400" />
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="absolute bottom-4 left-4 right-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className={`bg-gradient-to-r ${gradient} text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg`}>
                                                        <Eye className="w-3 h-3" />
                                                        Quick View
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6 py-3 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Tag className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                                                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                                                        {item.topic}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all line-clamp-2">
                                                    {item.title}
                                                </h3>

                                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-1">
                                                    {item.description}
                                                </p>

                                                <div className="flex justify-left space-x-4">
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                                    </div>

                                                    {item.files && (
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                            {item.files.length} page{item.files.length !== 1 ? 's' : ''}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="px-5 mb-3">
                                                <button className={`w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r ${gradient} text-white rounded-xl font-semibold shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
                                                    <BookOpen className="w-4 h-4" />
                                                    Open & Read
                                                </button>
                                            </div>
                                            <div className={`h-1 bg-gradient-to-r ${gradient}`}></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* View All Button */}
                    <div className="text-center">
                        <a href="/Post">
                            <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 dark:hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300">
                                <BookOpen className="w-5 h-5" />
                                View All Posts
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Perfect Book Reader Modal */}
            {activePost && activePost.files && activePost.files.length > 0 && (
                <div className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4'}`}>
                    {/* Top Controls Bar */}
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-4 z-10">
                        <div className="container mx-auto max-w-7xl flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <h3 className="text-white font-semibold text-lg hidden md:block">
                                    {activePost.title}
                                </h3>
                                <span className="text-white/70 text-sm bg-white/10 px-3 py-1 rounded-full">
                                    {getCurrentPageDisplay()} of {getTotalPages()}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleZoomOut}
                                    className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
                                    title="Zoom Out"
                                >
                                    <ZoomOut className="w-5 h-5" />
                                </button>
                                <span className="text-white text-sm px-2">{zoom}%</span>
                                <button
                                    onClick={handleZoomIn}
                                    className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
                                    title="Zoom In"
                                >
                                    <ZoomIn className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={toggleFullscreen}
                                    className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
                                    title="Toggle Fullscreen"
                                >
                                    <Maximize2 className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={closeBook}
                                    className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Book Container */}
                    <div className="relative w-full h-full flex items-center justify-center pt-20 pb-4">
                        {/* Previous Page Button */}
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className={`absolute left-4 z-20 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-90'
                                }`}
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>

                        {/* FlipBook with Perfect Dual Page Display */}
                        <div
                            className="book-wrapper"
                            style={{
                                transform: `scale(${zoom / 100})`,
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            <HTMLFlipBook
                                width={450}
                                height={600}
                                size="stretch"
                                minWidth={315}
                                maxWidth={1000}
                                minHeight={420}
                                maxHeight={1350}
                                maxShadowOpacity={0.5}
                                showCover={false}
                                mobileScrollSupport={true}
                                ref={flipBookRef}
                                className="book-container"
                                onFlip={onPageFlip}
                                drawShadow={true}
                                flippingTime={800}
                                usePortrait={false}
                                startPage={1}
                                autoSize={false}
                                clickEventForward={true}
                                useMouseEvents={true}
                                swipeDistance={30}
                                showPageCorners={true}
                                disableFlipByClick={false}
                            >
                                {activePost.files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="page"
                                        data-density="hard"
                                    >
                                        <div className="page-content">
                                            {/* ✅ FIXED: Use fileUrl directly - it's already a complete Cloudinary URL */}
                                            <img
                                                src={file.fileUrl}
                                                alt={`Page ${index + 1}`}
                                                className="page-image"
                                                draggable={false}
                                            />
                                            <div className="page-number">
                                                {index + 1}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </HTMLFlipBook>
                        </div>

                        {/* Next Page Button */}
                        <button
                            onClick={nextPage}
                            disabled={currentPage >= getTotalPages() - 2}
                            className={`absolute right-4 z-20 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 ${currentPage >= getTotalPages() - 2 ? 'opacity-30 cursor-not-allowed' : 'opacity-90'
                                }`}
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </div>

                    {/* Clean Bottom Info Bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                        <div className="container mx-auto max-w-7xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Tag className="w-4 h-4 text-purple-400" />
                                        <span className="text-sm font-semibold text-purple-400">
                                            {activePost.topic}
                                        </span>
                                    </div>
                                    <span className="text-white/60 text-sm">•</span>
                                    <p className="text-white/80 text-sm">
                                        {activePost.description}
                                    </p>
                                </div>

                                {/* Clean Progress Bar */}
                                <div className="w-48 bg-white/20 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${((currentPage + 1) / getTotalPages()) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                /* Perfect Book Styling */
                .book-wrapper {
                    perspective: 2000px;
                    transform-style: preserve-3d;
                }

                .book-container {
                    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.6);
                    border-radius: 4px;
                }

                /* Page Styling */
                .page {
                    background: linear-gradient(to right, #f8f9fa 0%, #ffffff 5%, #ffffff 95%, #f8f9fa 100%);
                    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    position: relative;
                    user-select: none;
                }

                .page-content {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    padding: 20px;
                    background: white;
                }

                .page-image {
                    max-width: 100%;
                    max-height: 100%;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    pointer-events: none;
                }

                /* Clean Page Number */
                .page-number {
                    position: absolute;
                    bottom: 15px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 11px;
                    color: #999;
                    font-weight: 500;
                    background: rgba(255, 255, 255, 0.9);
                    padding: 4px 12px;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                /* Hide library overflow issues */
                .stf__wrapper {
                    overflow: visible !important;
                }

                .stf__block {
                    overflow: visible !important;
                }

                /* Enhanced page shadows */
                .stf__item {
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                }

                /* Page curl effect */
                .stf__item--hard {
                    background: linear-gradient(to right, #e8e8e8 0%, #ffffff 5%);
                }

                /* Smooth flipping */
                .stf__item.--flipping {
                    transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
                }

                /* Center alignment for book */
                .stf__parent {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                }
            `}</style>
        </section>
    );
}