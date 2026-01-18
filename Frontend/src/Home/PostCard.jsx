import { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, Tag, BookOpen, Download, ZoomIn, ZoomOut, Maximize2, Sparkles, Eye, Share2, BookmarkPlus } from "lucide-react";
import HTMLFlipBook from "react-pageflip";
import { baseUrl } from "../Baseurl";

const BASE_URL = `${baseUrl}/instapost`;

export default function BookReaderPosts() {
    const [posts, setPosts] = useState([]);
    const [activePost, setActivePost] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [zoom, setZoom] = useState(130);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showPageSelector, setShowPageSelector] = useState(false);
    const [selectedPages, setSelectedPages] = useState([]);
    const flipBookRef = useRef();
    const bookContainerRef = useRef();

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
        setZoom(isMobile ? 100 : 130);
        setIsFullscreen(false);
        setBookmarks([]);
        setShowPageSelector(false);
        setSelectedPages([]);
    };

    const closeBook = () => {
        setActivePost(null);
        setCurrentPage(0);
        setShowShareMenu(false);
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
        if (zoom < 200) setZoom(zoom + 10);
    };

    const handleZoomOut = () => {
        if (zoom > 50) setZoom(zoom - 10);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            bookContainerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Add watermark to image
    const addWatermarkToImage = async (imageUrl, pageNumber) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the original image
                ctx.drawImage(img, 0, 0);

                // Add simple watermark at center
                ctx.save();
                ctx.globalAlpha = 0.3;
                ctx.font = `bold ${Math.floor(img.width / 20)}px Arial`;
                ctx.fillStyle = '#000000';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('dcoder75', canvas.width / 2, canvas.height / 2);
                ctx.restore();

                // Convert to blob
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to create blob'));
                    }
                }, 'image/jpeg', 0.95);
            };

            img.onerror = () => reject(new Error('Failed to load image'));

            // Try to load image with timestamp to avoid cache issues
            img.src = imageUrl + (imageUrl.includes('?') ? '&' : '?') + 't=' + new Date().getTime();
        });
    };

    // Toggle page selection
    const togglePageSelection = (pageIndex) => {
        setSelectedPages(prev => {
            if (prev.includes(pageIndex)) {
                return prev.filter(p => p !== pageIndex);
            } else {
                return [...prev, pageIndex];
            }
        });
    };

    // Select all pages
    const selectAllPages = () => {
        const allPages = Array.from({ length: getTotalPages() }, (_, i) => i);
        setSelectedPages(allPages);
    };

    // Deselect all pages
    const deselectAllPages = () => {
        setSelectedPages([]);
    };

    // Download selected pages
    const downloadSelectedPages = async () => {
        if (selectedPages.length === 0) {
            alert('Please select at least one page to download.');
            return;
        }

        setIsDownloading(true);
        let successCount = 0;
        const totalSelected = selectedPages.length;

        console.log(`Starting download of ${totalSelected} selected pages...`);

        try {
            // Sort page numbers for sequential download
            const sortedPages = [...selectedPages].sort((a, b) => a - b);

            for (let i = 0; i < sortedPages.length; i++) {
                const pageIndex = sortedPages[i];
                const file = activePost.files[pageIndex];
                console.log(`Processing page ${pageIndex + 1} (${i + 1}/${totalSelected})...`);

                try {
                    // Add watermark to image
                    const watermarkedBlob = await addWatermarkToImage(file.fileUrl, pageIndex + 1);
                    console.log(`Watermark added to page ${pageIndex + 1}`);

                    // Create download link
                    const url = window.URL.createObjectURL(watermarkedBlob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${activePost.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_page_${String(pageIndex + 1).padStart(2, '0')}.jpg`;
                    a.style.display = 'none';
                    document.body.appendChild(a);

                    // Trigger download
                    a.click();
                    console.log(`Download triggered for page ${pageIndex + 1}`);

                    // Clean up after a delay
                    setTimeout(() => {
                        window.URL.revokeObjectURL(url);
                        if (document.body.contains(a)) {
                            document.body.removeChild(a);
                        }
                    }, 1000);

                    successCount++;

                    // Add delay between downloads
                    if (i < sortedPages.length - 1) {
                        console.log(`Waiting before next download...`);
                        await new Promise(resolve => setTimeout(resolve, 800));
                    }
                } catch (error) {
                    console.error(`Failed to download page ${pageIndex + 1}:`, error);
                }
            }

            console.log(`Download complete. Success: ${successCount}/${totalSelected}`);

            if (successCount > 0) {
                alert(`Successfully downloaded ${successCount} of ${totalSelected} pages!`);
                setSelectedPages([]);
                setShowPageSelector(false);
            } else {
                alert('Download failed. Please try again.');
            }
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    // Download all pages at once with watermark
    // Share functionality
    const handleShare = async (platform) => {
        const shareUrl = window.location.href;
        const shareText = `Check out "${activePost.title}" - ${activePost.description}`;

        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
            copy: 'copy'
        };

        if (platform === 'copy') {
            try {
                await navigator.clipboard.writeText(shareUrl);
                alert('Link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        } else if (platform === 'native' && navigator.share) {
            try {
                await navigator.share({
                    title: activePost.title,
                    text: shareText,
                    url: shareUrl
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        } else {
            window.open(urls[platform], '_blank');
        }

        setShowShareMenu(false);
    };

    // Bookmark current page
    const toggleBookmark = () => {
        const pageIndex = currentPage;
        setBookmarks(prev => {
            if (prev.includes(pageIndex)) {
                return prev.filter(p => p !== pageIndex);
            } else {
                return [...prev, pageIndex];
            }
        });
    };

    const getFirstImageUrl = (item) => {
        if (item.files && item.files.length > 0) {
            return item.files[0].fileUrl;
        }
        return null;
    };

    const getTotalPages = () => {
        return activePost?.files?.length || 0;
    };

    const getCurrentPageDisplay = () => {
        const total = getTotalPages();

        if (isMobile) {
            return `${currentPage + 1}/${total}`;
        }

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

    // Calculate responsive book dimensions
    const getBookDimensions = () => {
        if (isMobile) {
            return {
                width: Math.min(window.innerWidth - 40, 300),
                height: Math.min(window.innerHeight - 200, 400),
                minWidth: 200,
                maxWidth: 300,
                minHeight: 300,
                maxHeight: 400
            };
        }
        return {
            width: 450,
            height: 600,
            minWidth: 315,
            maxWidth: 1000,
            minHeight: 420,
            maxHeight: 1350
        };
    };

    const bookDimensions = getBookDimensions();

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
                                                    <div className="w-28 h-28 bg-white dark:bg-gray-700 rounded-xl shadow-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 overflow-hidden">
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

                                            <div className="px-5 mb-4">
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

            {/* Enhanced Book Reader Modal */}
            {activePost && activePost.files && activePost.files.length > 0 && (
                <div
                    ref={bookContainerRef}
                    className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : isMobile ? 'p-0' : 'p-4'}`}
                >
                    {/* Page Selector Panel */}
                    {showPageSelector && (
                        <div className="absolute top-16 md:top-20 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 max-w-md w-full md:w-96 max-h-[70vh] overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Select Pages</h3>
                                    <button
                                        onClick={() => setShowPageSelector(false)}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={selectAllPages}
                                        className="flex-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
                                    >
                                        Select All
                                    </button>
                                    <button
                                        onClick={deselectAllPages}
                                        className="flex-1 px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="grid grid-cols-4 gap-2">
                                    {activePost.files.map((file, index) => (
                                        <button
                                            key={index}
                                            onClick={() => togglePageSelection(index)}
                                            className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${selectedPages.includes(index)
                                                ? 'border-purple-500 ring-2 ring-purple-300 dark:ring-purple-700'
                                                : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
                                                }`}
                                        >
                                            <img
                                                src={file.fileUrl}
                                                alt={`Page ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">{index + 1}</span>
                                            </div>
                                            {selectedPages.includes(index) && (
                                                <div className="absolute top-1 right-1 bg-purple-500 rounded-full p-1">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                            {bookmarks.includes(index) && (
                                                <div className="absolute top-1 left-1 text-yellow-500">
                                                    <span className="text-lg">★</span>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                                <button
                                    onClick={downloadSelectedPages}
                                    disabled={selectedPages.length === 0 || isDownloading}
                                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <Download className="w-5 h-5" />
                                    {isDownloading ? 'Downloading...' : `Download ${selectedPages.length} Page${selectedPages.length !== 1 ? 's' : ''}`}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Top Controls Bar */}
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-3 md:p-4 z-10">
                        <div className="container mx-auto max-w-7xl flex justify-between items-center gap-2">
                            <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                                <h3 className="text-white font-semibold text-sm md:text-lg truncate">
                                    {activePost.title}
                                </h3>
                                <span className="text-white/70 text-xs md:text-sm bg-white/10 px-2 md:px-3 py-1 rounded-full whitespace-nowrap">
                                    {getCurrentPageDisplay()}
                                </span>
                            </div>

                            <div className="flex items-center gap-1 md:gap-2">
                                {/* Zoom controls - hidden on mobile */}
                                {!isMobile && (
                                    <>
                                        <button
                                            onClick={handleZoomOut}
                                            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
                                            title="Zoom Out"
                                        >
                                            <ZoomOut className="w-4 h-4 md:w-5 md:h-5" />
                                        </button>
                                        <span className="text-white text-xs md:text-sm px-1 md:px-2 hidden sm:block">{zoom}%</span>
                                        <button
                                            onClick={handleZoomIn}
                                            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
                                            title="Zoom In"
                                        >
                                            <ZoomIn className="w-4 h-4 md:w-5 md:h-5" />
                                        </button>
                                    </>
                                )}

                                {/* Select Pages to Download Button */}
                                <button
                                    onClick={() => setShowPageSelector(!showPageSelector)}
                                    className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all relative group"
                                    title="Select Pages to Download"
                                >
                                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                                    {selectedPages.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                            {selectedPages.length}
                                        </span>
                                    )}
                                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        Download Pages
                                    </span>
                                </button>

                                {/* Share Button */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowShareMenu(!showShareMenu)}
                                        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
                                        title="Share"
                                    >
                                        <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>

                                    {/* Share Menu */}
                                    {showShareMenu && (
                                        <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl min-w-[180px] z-50 py-2">
                                            {navigator.share && (
                                                <button
                                                    onClick={() => handleShare('native')}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    Share...
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleShare('whatsapp')}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                WhatsApp
                                            </button>
                                            <button
                                                onClick={() => handleShare('facebook')}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                Facebook
                                            </button>
                                            <button
                                                onClick={() => handleShare('twitter')}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                Twitter
                                            </button>
                                            <button
                                                onClick={() => handleShare('linkedin')}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                LinkedIn
                                            </button>
                                            <button
                                                onClick={() => handleShare('copy')}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                Copy Link
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Bookmark Button */}
                                <button
                                    onClick={toggleBookmark}
                                    className={`${bookmarks.includes(currentPage) ? 'bg-yellow-500/60' : 'bg-white/20'} hover:bg-white/30 text-white p-2 rounded-lg transition-all`}
                                    title="Bookmark Page"
                                >
                                    <BookmarkPlus className="w-4 h-4 md:w-5 md:h-5" />
                                </button>

                                {!isMobile && (
                                    <button
                                        onClick={toggleFullscreen}
                                        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
                                        title="Toggle Fullscreen"
                                    >
                                        <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                )}

                                <button
                                    onClick={closeBook}
                                    className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all"
                                >
                                    <X className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Book Container */}
                    <div className={`relative w-full h-full flex items-center justify-center ${isMobile ? 'pt-16 pb-20' : 'pt-20 pb-4'}`}>
                        {/* Previous Page Button */}
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className={`absolute ${isMobile ? 'left-2' : 'left-4'} z-20 bg-white/90 hover:bg-white text-gray-800 ${isMobile ? 'p-2' : 'p-4'} rounded-full shadow-2xl transition-all transform hover:scale-110 ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-90'
                                }`}
                        >
                            <ChevronLeft className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'}`} />
                        </button>

                        {/* FlipBook with Responsive Sizing */}
                        <div
                            className="book-wrapper"
                            style={{
                                transform: isMobile ? 'scale(1)' : `scale(${zoom / 100})`,
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            <HTMLFlipBook
                                width={bookDimensions.width}
                                height={bookDimensions.height}
                                size="stretch"
                                minWidth={bookDimensions.minWidth}
                                maxWidth={bookDimensions.maxWidth}
                                minHeight={bookDimensions.minHeight}
                                maxHeight={bookDimensions.maxHeight}
                                maxShadowOpacity={0.5}
                                showCover={false}
                                mobileScrollSupport={true}
                                ref={flipBookRef}
                                className="book-container"
                                onFlip={onPageFlip}
                                drawShadow={true}
                                flippingTime={800}
                                usePortrait={isMobile}
                                startPage={0}
                                autoSize={false}
                                clickEventForward={true}
                                useMouseEvents={!isMobile}
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
                                            <img
                                                src={file.fileUrl}
                                                alt={`Page ${index + 1}`}
                                                className="page-image"
                                                draggable={false}
                                            />

                                            <div className="page-number">
                                                {index + 1}
                                                {bookmarks.includes(index) && (
                                                    <span className="ml-2 text-yellow-500">★</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </HTMLFlipBook>
                        </div>

                        {/* Next Page Button */}
                        <button
                            onClick={nextPage}
                            disabled={currentPage >= getTotalPages() - (isMobile ? 1 : 2)}
                            className={`absolute ${isMobile ? 'right-2' : 'right-4'} z-20 bg-white/90 hover:bg-white text-gray-800 ${isMobile ? 'p-2' : 'p-4'} rounded-full shadow-2xl transition-all transform hover:scale-110 ${currentPage >= getTotalPages() - (isMobile ? 1 : 2) ? 'opacity-30 cursor-not-allowed' : 'opacity-90'
                                }`}
                        >
                            <ChevronRight className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'}`} />
                        </button>
                    </div>

                    {/* Bottom Info Bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 md:p-6">
                        <div className="container mx-auto max-w-7xl">
                            <div className={`flex items-center ${isMobile ? 'flex-col gap-2' : 'justify-between'}`}>
                                <div className={`flex items-center gap-2 md:gap-4 ${isMobile ? 'flex-wrap justify-center text-center' : ''}`}>
                                    <div className="flex items-center gap-2">
                                        <Tag className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                                        <span className="text-xs md:text-sm font-semibold text-purple-400">
                                            {activePost.topic}
                                        </span>
                                    </div>
                                    {!isMobile && <span className="text-white/60 text-sm">•</span>}
                                    <p className="text-white/80 text-xs md:text-sm line-clamp-1">
                                        {activePost.description}
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div className={`${isMobile ? 'w-full' : 'w-48'} bg-white/20 rounded-full h-2`}>
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

                /* Page Number */
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
                    display: flex;
                    align-items: center;
                    z-index: 10;
                }

                /* Mobile Responsive Adjustments */
                @media (max-width: 768px) {
                    .book-container {
                        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.4);
                    }

                    .page-content {
                        padding: 10px;
                    }

                    .page-number {
                        font-size: 9px;
                        padding: 3px 8px;
                        bottom: 10px;
                    }
                }

                /* Library overflow fix */
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