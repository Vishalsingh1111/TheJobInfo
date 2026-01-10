

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Code, Sparkles, TrendingUp, Download, Eye, Star, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Calendar, Tag } from "lucide-react";
import HTMLFlipBook from "react-pageflip";

const BASE_URL = "https://dcoder-backend.onrender.com/instapost";
const FILE_URL = "https://dcoder-backend.onrender.com";

const CheatsheetCard = ({ sheet, index, onOpen }) => {
    const [isHovered, setIsHovered] = useState(false);

    const getGradientByIndex = (idx) => {
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
        return gradients[idx % 8];
    };

    const { gradient, bgGradient } = getGradientByIndex(index);

    const getDifficulty = () => {
        const desc = sheet.description?.toLowerCase() || '';
        if (desc.includes('basic') || desc.includes('beginner') || desc.includes('intro')) {
            return { level: "Beginner", color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30" };
        } else if (desc.includes('advanced') || desc.includes('expert') || desc.includes('master')) {
            return { level: "Advanced", color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30" };
        }
        return { level: "Intermediate", color: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30" };
    };

    const difficulty = getDifficulty();

    const getFirstImageUrl = () => {
        if (sheet.files && sheet.files.length > 0) {
            return `${FILE_URL}${sheet.files[0].fileUrl}`;
        }
        return null;
    };

    const firstImageUrl = getFirstImageUrl();

    return (
        <div
            onClick={() => onOpen(sheet)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="block group cursor-pointer"
        >
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700 h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                <div className="absolute top-4 right-4 z-10">
                    <span className={`${difficulty.color} px-3 py-1.5 rounded-full text-xs font-semibold border-2 border-current backdrop-blur-sm`}>
                        {difficulty.level}
                    </span>
                </div>

                <div className="relative">
                    <div className={`bg-gradient-to-br ${bgGradient} backdrop-blur-sm p-8 border-b-2 border-gray-200 dark:border-gray-700 relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-2xl`}></div>
                        <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-xl`}></div>

                        <div className="relative flex justify-center items-center">
                            <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-2xl shadow-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 overflow-hidden">
                                {firstImageUrl ? (
                                    <img
                                        src={firstImageUrl}
                                        alt={sheet.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Code className="w-14 h-14 text-purple-600" />
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

                    <div className="p-6 pt-3 space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                            <Tag className="w-3 h-3 text-purple-600" />
                            <span className="text-xs font-semibold text-purple-600">
                                {sheet.topic}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all line-clamp-2">
                            {sheet.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-1">
                            {sheet.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                <span>5K+ downloads</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 dark:text-yellow-400" fill="currentColor" />
                                <span>4.8</span>
                            </div>
                        </div>

                        {sheet.files && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {sheet.files.length} page{sheet.files.length !== 1 ? 's' : ''}
                            </div>
                        )}

                        <button className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r ${gradient} text-white rounded-xl font-semibold shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
                            View Cheatsheet
                            <ArrowRight className={`w-5 h-5 transform transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                        </button>
                    </div>

                    <div className={`h-1 bg-gradient-to-r ${gradient}`}></div>
                </div>
            </div>
        </div>
    );
};

const CheatsheetPage = () => {
    const [cheatsheets, setCheatsheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activePost, setActivePost] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [zoom, setZoom] = useState(100);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const flipBookRef = useRef();

    useEffect(() => {
        fetch(`${BASE_URL}/content?type=POST`)
            .then(res => res.json())
            .then(data => {
                const filteredCheatsheets = data
                    .filter(item => item.topic === "Cheatsheet")
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCheatsheets(filteredCheatsheets);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching cheatsheets:', err);
                setLoading(false);
            });
    }, []);

    const displayedSheets = cheatsheets.slice(0, 4);

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pt-20 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="text-center pb-8">
                    <div className="flex justify-center mb-6 animate-fade-in">
                        <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:scale-105 transition-transform">
                            <Code className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
                            <span className="text-purple-700 dark:text-purple-300 font-semibold">Quick Reference Guides</span>
                            <Sparkles className="w-5 h-5 text-pink-500 dark:text-pink-400" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Cheatsheets{' '}
                        <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 dark:from-red-400 dark:via-pink-400 dark:to-purple-500 bg-clip-text text-transparent">
                            Instant Learning
                        </span>
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Master programming languages with our comprehensive quick reference guides. Learn faster, code better.
                    </p>

                    {!loading && cheatsheets.length > 0 && (
                        <div className="text-center pt-8">
                            <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-purple-800/60 backdrop-blur-xl px-4 py-2 rounded-full border border-purple-200 dark:border-purple-700">
                                <span className="text-gray-600 dark:text-gray-300 text-sm">
                                    Showing {displayedSheets.length} of{' '}
                                    <span className="font-bold text-purple-600 dark:text-purple-400">{cheatsheets.length}</span>{' '}
                                    cheatsheet{cheatsheets.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading cheatsheets...</p>
                    </div>
                )}

                {!loading && displayedSheets.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {displayedSheets.map((sheet, index) => (
                            <CheatsheetCard key={sheet._id} sheet={sheet} index={index} onOpen={openBook} />
                        ))}
                    </div>
                )}

                {!loading && displayedSheets.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📚</div>
                        <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold mb-2">No cheatsheets available</p>
                        <p className="text-gray-400 dark:text-gray-500">Check back later for new content</p>
                    </div>
                )}

                <div className="text-center pb-16">
                    <a href="/CheatsheetPage">
                        <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 dark:hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300">
                            Show More Cheatsheets
                            <TrendingUp className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform" />
                        </button>
                    </a>
                </div>
            </div>

            {/* Perfect Book Reader Modal */}
            {activePost && activePost.files && activePost.files.length > 0 && (
                <div className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4'}`}>
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

                    <div className="relative w-full h-full flex items-center justify-center pt-20 pb-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className={`absolute left-4 z-20 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-90'
                                }`}
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>

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
                                showCover={true}
                                mobileScrollSupport={true}
                                ref={flipBookRef}
                                className="book-container"
                                onFlip={onPageFlip}
                                drawShadow={true}
                                flippingTime={800}
                                usePortrait={false}
                                startPage={0}
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
                                            <img
                                                src={`${FILE_URL}${file.fileUrl}`}
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

                        <button
                            onClick={nextPage}
                            disabled={currentPage >= getTotalPages() - 2}
                            className={`absolute right-4 z-20 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 ${currentPage >= getTotalPages() - 2 ? 'opacity-30 cursor-not-allowed' : 'opacity-90'
                                }`}
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                        <div className="container mx-auto max-w-7xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Tag className="w-4 h-4 text-purple-400" />
                                        <span className="text-sm font-semibold text-purple-400">
                                            Cheatsheet
                                        </span>
                                    </div>
                                    <span className="text-white/60 text-sm">•</span>
                                    <p className="text-white/80 text-sm">
                                        {activePost.description}
                                    </p>
                                </div>

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

                .stf__wrapper {
                    overflow: visible !important;
                }

                .stf__block {
                    overflow: visible !important;
                }

                .stf__item {
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                }

                .stf__item--hard {
                    background: linear-gradient(to right, #e8e8e8 0%, #ffffff 5%);
                }

                .stf__item.--flipping {
                    transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
                }

                .stf__parent {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                }
            `}</style>
        </div>
    );
};

export default CheatsheetPage;

