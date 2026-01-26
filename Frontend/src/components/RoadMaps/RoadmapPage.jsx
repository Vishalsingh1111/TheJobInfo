import { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, Tag, BookOpen, Download, ZoomIn, ZoomOut, Maximize2, Search, Clock, Eye, Sparkles, Share2, BookmarkPlus, Map, TrendingUp, Target, Award, Zap, Filter, BarChart3, Users, CheckCircle, Star, Rocket, Trophy, Brain, Flame } from "lucide-react";
import HTMLFlipBook from "react-pageflip";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Breadcrumb from "../Common/Breadcrumb";
import { baseUrl } from "../../Baseurl";

const BASE_URL = `${baseUrl}/instapost`;

export default function RoadmapsPage() {
    const [roadmaps, setRoadmaps] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [topic, setTopic] = useState("ALL");
    const [sort, setSort] = useState("LATEST");
    const [activeRoadmap, setActiveRoadmap] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [zoom, setZoom] = useState(130);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showPageSelector, setShowPageSelector] = useState(false);
    const [selectedPages, setSelectedPages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const flipBookRef = useRef();
    const bookContainerRef = useRef();

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20,
                y: (e.clientY / window.innerHeight) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Fetch roadmaps
    useEffect(() => {
        const fetchRoadmaps = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${BASE_URL}/content?type=POST`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                if (!data) throw new Error('No data received');
                if (Array.isArray(data)) {
                    const roadmapData = data.filter(item => item && item.topic && item.topic.toLowerCase() === 'roadmap');
                    if (roadmapData.length === 0) {
                        setRoadmaps([]);
                        setFiltered([]);
                        setError('No roadmaps available');
                    } else {
                        setRoadmaps(roadmapData);
                        setFiltered(roadmapData);
                    }
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (err) {
                console.error('Error:', err);
                setError(err.message || 'Failed to load roadmaps');
                setRoadmaps([]);
                setFiltered([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRoadmaps();
    }, []);

    useEffect(() => {
        let data = Array.isArray(roadmaps) ? [...roadmaps] : [];
        if (topic !== "ALL") data = data.filter(r => r && r.topic === topic);
        if (search) {
            data = data.filter(r => {
                if (!r) return false;
                const searchText = `${r.title || ''} ${r.description || ''} ${r.topic || ''}`;
                return searchText.toLowerCase().includes(search.toLowerCase());
            });
        }
        data.sort((a, b) => {
            const dateA = a && a.createdAt ? new Date(a.createdAt) : new Date(0);
            const dateB = b && b.createdAt ? new Date(b.createdAt) : new Date(0);
            return sort === "LATEST" ? dateB - dateA : dateA - dateB;
        });
        setFiltered(data);
    }, [search, topic, sort, roadmaps]);

    const topics = ["ALL", ...new Set(Array.isArray(roadmaps) ? roadmaps.filter(r => r && r.topic).map(r => r.topic) : [])];
    const totalSteps = filtered.reduce((acc, r) => acc + (r.files?.length || 0), 0);
    const avgSteps = filtered.length > 0 ? Math.round(totalSteps / filtered.length) : 0;

    const openRoadmap = (roadmap) => {
        if (!roadmap || !roadmap.files || roadmap.files.length === 0) {
            alert('This roadmap has no content available.');
            return;
        }
        setActiveRoadmap(roadmap);
        setCurrentPage(0);
        setZoom(isMobile ? 100 : 130);
        setIsFullscreen(false);
        setBookmarks([]);
        setShowPageSelector(false);
        setSelectedPages([]);
    };

    const closeRoadmap = () => {
        setActiveRoadmap(null);
        setCurrentPage(0);
        setShowShareMenu(false);
    };

    const handleZoomIn = () => { if (zoom < 200) setZoom(zoom + 10); };
    const handleZoomOut = () => { if (zoom > 50) setZoom(zoom - 10); };
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            bookContainerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };
    const nextPage = () => { if (flipBookRef.current) flipBookRef.current.pageFlip().flipNext(); };
    const prevPage = () => { if (flipBookRef.current) flipBookRef.current.pageFlip().flipPrev(); };
    const onPageFlip = (e) => setCurrentPage(e.data);

    const addWatermarkToImage = async (imageUrl, pageNumber) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                ctx.save();
                ctx.globalAlpha = 0.3;
                ctx.font = `bold ${Math.floor(img.width / 20)}px Arial`;
                ctx.fillStyle = '#0000008b';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText('Insta: dcoder75', canvas.width / 2, canvas.height - 20);
                ctx.restore();
                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                    else reject(new Error('Failed to create blob'));
                }, 'image/jpeg', 0.95);
            };
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = imageUrl + (imageUrl.includes('?') ? '&' : '?') + 't=' + new Date().getTime();
        });
    };

    const togglePageSelection = (pageIndex) => {
        setSelectedPages(prev => prev.includes(pageIndex) ? prev.filter(p => p !== pageIndex) : [...prev, pageIndex]);
    };
    const selectAllPages = () => setSelectedPages(Array.from({ length: getTotalPages() }, (_, i) => i));
    const deselectAllPages = () => setSelectedPages([]);

    const downloadSelectedPages = async () => {
        if (selectedPages.length === 0) {
            alert('Please select at least one page to download.');
            return;
        }
        if (!activeRoadmap || !activeRoadmap.files) {
            alert('Invalid roadmap data.');
            return;
        }
        setIsDownloading(true);
        let successCount = 0;
        const totalSelected = selectedPages.length;
        try {
            const sortedPages = [...selectedPages].sort((a, b) => a - b);
            for (let i = 0; i < sortedPages.length; i++) {
                const pageIndex = sortedPages[i];
                if (pageIndex < 0 || pageIndex >= activeRoadmap.files.length) continue;
                const file = activeRoadmap.files[pageIndex];
                if (!file || !file.fileUrl) continue;
                try {
                    const watermarkedBlob = await addWatermarkToImage(file.fileUrl, pageIndex + 1);
                    const url = window.URL.createObjectURL(watermarkedBlob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${activeRoadmap.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_page_${String(pageIndex + 1).padStart(2, '0')}.jpg`;
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                        window.URL.revokeObjectURL(url);
                        if (document.body.contains(a)) document.body.removeChild(a);
                    }, 1000);
                    successCount++;
                    if (i < sortedPages.length - 1) await new Promise(resolve => setTimeout(resolve, 800));
                } catch (error) {
                    console.error(`Failed to download page ${pageIndex + 1}:`, error);
                }
            }
            if (successCount > 0) {
                alert(`Successfully downloaded ${successCount} of ${totalSelected} pages!`);
                setSelectedPages([]);
                setShowPageSelector(false);
            } else {
                alert('Download failed.');
            }
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed.');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleShare = async (platform) => {
        if (!activeRoadmap) return;
        const shareUrl = window.location.href;
        const shareText = `Check out "${activeRoadmap.title}" - ${activeRoadmap.description || 'Learning Roadmap'}`;
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
            copy: 'copy'
        };
        try {
            if (platform === 'copy') {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(shareUrl);
                    alert('Link copied!');
                } else {
                    const textArea = document.createElement('textarea');
                    textArea.value = shareUrl;
                    textArea.style.position = 'fixed';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        alert('Link copied!');
                    } catch (err) {
                        alert('Failed to copy');
                    }
                    document.body.removeChild(textArea);
                }
            } else if (platform === 'native' && navigator.share) {
                await navigator.share({ title: activeRoadmap.title, text: shareText, url: shareUrl });
            } else if (urls[platform]) {
                window.open(urls[platform], '_blank', 'noopener,noreferrer');
            }
        } catch (err) {
            console.error('Share error:', err);
        }
        setShowShareMenu(false);
    };

    const toggleBookmark = () => {
        setBookmarks(prev => prev.includes(currentPage) ? prev.filter(p => p !== currentPage) : [...prev, currentPage]);
    };

    const getFirstImageUrl = (item) => {
        if (item.files && item.files.length > 0) return item.files[0].fileUrl;
        return null;
    };

    const getTotalPages = () => activeRoadmap?.files?.length || 0;

    const getCurrentPageDisplay = () => {
        const total = getTotalPages();
        if (isMobile) return `${currentPage + 1}/${total}`;
        if (currentPage === 0) return `Step 1-2`;
        const leftPage = currentPage + 1;
        const rightPage = currentPage + 2;
        if (rightPage <= total) return `Steps ${leftPage}-${rightPage}`;
        if (leftPage <= total) return `Step ${leftPage}`;
        return `Step ${total}`;
    };

    const getBookDimensions = () => {
        if (isMobile) {
            return { width: Math.min(window.innerWidth - 40, 300), height: Math.min(window.innerHeight - 200, 400), minWidth: 200, maxWidth: 300, minHeight: 300, maxHeight: 400 };
        }
        return { width: 450, height: 600, minWidth: 315, maxWidth: 1000, minHeight: 420, maxHeight: 1350 };
    };

    const bookDimensions = getBookDimensions();

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">

                {/* HERO SECTION */}
                <div className="relative pt-6">
                    <Breadcrumb />

                    <div className="container mx-auto px-4 pt-8 pb-12 relative z-10">


                        {/* MASSIVE HEADING */}
                        <div className="text-center mb-12 animate-slide-up">
                            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">

                                <span className="block">
                                    <span className="relative inline-block text-gray-900 dark:text-white">
                                        Your Success
                                        <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 300 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 6 Q75 12, 150 6 T300 6" fill="none" stroke="url(#gradient)" strokeWidth="4" className="animate-draw" />
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#f43f5e" />
                                                    <stop offset="50%" stopColor="#ec4899" />
                                                    <stop offset="100%" stopColor="#a855f7" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </span>
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium animate-fade-in animation-delay-300">
                                🚀 Master your skills with comprehensive learning paths from beginner to expert
                            </p>
                        </div>

                        {/* SPECTACULAR STATS WITH CHARTS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
                            {[
                                { icon: "🗺️", label: "Roadmaps", value: filtered.length, gradient: "from-purple-500 to-pink-500", chart: <BarChart3 className="w-8 h-8 text-white" /> },
                                { icon: "🎯", label: "Total Steps", value: totalSteps, gradient: "from-blue-500 to-cyan-500", chart: <Target className="w-8 h-8 text-white" /> },
                                { icon: "📈", label: "Avg Steps", value: avgSteps, gradient: "from-green-500 to-emerald-500", chart: <TrendingUp className="w-8 h-8 text-white" /> },
                                { icon: "👥", label: "Learners", value: "10K+", gradient: "from-orange-500 to-red-500", chart: <Users className="w-8 h-8 text-white" /> }
                            ].map((stat, idx) => (
                                <div key={idx} className="group relative animate-fade-in" style={{ animationDelay: `${0.4 + idx * 0.1}s` }}>
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse`}></div>
                                    <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 text-center border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:scale-110 transition-all duration-500">
                                        {/* Chart Icon Background */}
                                        <div className={`absolute top-4 right-4 p-2 bg-gradient-to-br ${stat.gradient} rounded-xl opacity-20`}>
                                            {stat.chart}
                                        </div>

                                        <div className="text-5xl mb-3 animate-bounce-gentle" style={{ animationDelay: `${idx * 0.2}s` }}>{stat.icon}</div>
                                        <p className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                                            {stat.value}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{stat.label}</p>

                                        {/* Mini Progress Bar */}
                                        <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full animate-width-grow`}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* SEARCH & FILTERS */}
                        <div className="max-w-6xl mx-auto space-y-6 animate-fade-in animation-delay-600">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <input
                                        type="text"
                                        placeholder="🔍 Search roadmaps..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="relative w-full pl-14 pr-12 py-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-600 focus:outline-none transition-all bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl text-gray-900 dark:text-gray-100 placeholder:text-gray-500 font-semibold text-lg shadow-xl"
                                    />
                                    {search && (
                                        <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                            <X className="w-6 h-6" />
                                        </button>
                                    )}
                                </div>
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="px-8 py-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-600 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl cursor-pointer text-gray-900 dark:text-gray-100 font-bold text-lg shadow-xl transition-all appearance-none"
                                >
                                    <option value="LATEST">⏰ Latest First</option>
                                    <option value="OLDEST">📅 Oldest First</option>
                                </select>
                            </div>

                            {/* TOPIC PILLS */}
                            <div className="flex gap-3 flex-wrap justify-center">
                                {topics.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTopic(t)}
                                        className={`group relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-110 ${topic === t
                                            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-2xl scale-110"
                                            : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 backdrop-blur-xl"
                                            }`}
                                    >
                                        {topic === t && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                                        )}
                                        <span className="relative flex items-center gap-2">
                                            {topic === t && <CheckCircle className="w-4 h-4" />}
                                            {t}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RESULTS BADGE */}
                <div className="container mx-auto px-4 py-6">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 backdrop-blur-xl px-8 py-4 rounded-full border-2 border-green-200 dark:border-green-700 shadow-xl animate-bounce-gentle">
                            <div className="relative">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
                            <span className="text-gray-700 dark:text-gray-200 font-bold text-lg">
                                {filtered.length} Amazing Roadmap{filtered.length !== 1 ? 's' : ''} Available
                            </span>
                        </div>
                    </div>
                </div>

                {/* LOADING STATE */}
                {isLoading && (
                    <div className="container mx-auto px-4 pb-16">
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="relative">
                                <div className="w-24 h-24 border-4 border-purple-200 dark:border-purple-800 rounded-full"></div>
                                <div className="w-24 h-24 border-4 border-purple-600 dark:border-purple-400 rounded-full border-t-transparent animate-spin absolute top-0"></div>
                                <Rocket className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-purple-600 dark:text-purple-400 animate-bounce" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-2xl font-bold mt-8">Loading Amazing Roadmaps...</p>
                            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">🎯 Preparing your learning journey</p>
                        </div>
                    </div>
                )}

                {/* ERROR STATE */}
                {error && !isLoading && (
                    <div className="container mx-auto px-4 pb-16">
                        <div className="max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 border-4 border-red-200 dark:border-red-800 rounded-3xl p-10 text-center shadow-2xl">
                            <div className="text-7xl mb-6 animate-bounce">😢</div>
                            <h3 className="text-3xl font-bold text-red-800 dark:text-red-300 mb-4">Oops! Something went wrong</h3>
                            <p className="text-red-600 dark:text-red-400 text-lg mb-8">{error}</p>
                            <button onClick={() => window.location.reload()} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 text-lg">
                                🔄 Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* ROADMAPS GRID */}
                {!isLoading && !error && (
                    <div className="container mx-auto px-20 pb-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {filtered.map((roadmap, index) => {
                                const gradients = [
                                    { gradient: "from-red-500 via-orange-500 to-yellow-500", bg: "from-red-50 to-orange-50 dark:from-red-500/20 dark:to-orange-500/20", emoji: "🔥" },
                                    { gradient: "from-blue-500 via-cyan-500 to-teal-500", bg: "from-blue-50 to-cyan-50 dark:from-blue-500/20 dark:to-cyan-500/20", emoji: "🚀" },
                                    { gradient: "from-purple-500 via-pink-500 to-rose-500", bg: "from-purple-50 to-pink-50 dark:from-purple-500/20 dark:to-pink-500/20", emoji: "💜" },
                                    { gradient: "from-green-500 via-emerald-500 to-teal-500", bg: "from-green-50 to-emerald-50 dark:from-green-500/20 dark:to-emerald-500/20", emoji: "🌟" },
                                    { gradient: "from-yellow-500 via-amber-500 to-orange-500", bg: "from-yellow-50 to-orange-50 dark:from-yellow-500/20 dark:to-orange-500/20", emoji: "⚡" },
                                    { gradient: "from-indigo-500 via-violet-500 to-purple-500", bg: "from-indigo-50 to-purple-50 dark:from-indigo-500/20 dark:to-purple-500/20", emoji: "🎯" }
                                ];
                                const colors = gradients[index % gradients.length];
                                const firstImageUrl = getFirstImageUrl(roadmap);

                                return (
                                    <div key={roadmap._id} onClick={() => openRoadmap(roadmap)} className="group cursor-pointer animate-fade-in" style={{ animationDelay: `${index * 0.08}s` }}>
                                        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 border-2 border-gray-200 dark:border-gray-700 h-full">
                                            {/* Glow Effect */}
                                            <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700`}></div>

                                            {/* Header with Icon */}
                                            <div className={`relative bg-gradient-to-br ${colors.bg} p-10 border-b-2 border-gray-200 dark:border-gray-700 overflow-hidden`}>
                                                {/* Decorative circles */}
                                                <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${colors.gradient} rounded-full opacity-20 blur-3xl animate-float`}></div>
                                                <div className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br ${colors.gradient} rounded-full opacity-20 blur-2xl animate-float animation-delay-1000`}></div>

                                                <div className="relative flex justify-center">
                                                    <div className={`relative w-28 h-28 bg-gradient-to-br ${colors.gradient} rounded-3xl shadow-2xl flex items-center justify-center transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 overflow-hidden ring-4 ring-white/50 dark:ring-gray-800/50`}>
                                                        {firstImageUrl ? (
                                                            <img src={firstImageUrl} alt={roadmap.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Map className="w-14 h-14 text-white" />
                                                        )}
                                                    </div>
                                                    {/* Floating Badge */}
                                                    <div className={`absolute -top-3 -right-3 px-4 py-2 bg-gradient-to-r ${colors.gradient} text-white rounded-full text-xs font-bold shadow-xl flex items-center gap-1.5 animate-bounce-gentle`}>
                                                        <Zap className="w-3.5 h-3.5" />
                                                        NEW
                                                    </div>
                                                    {/* Emoji */}
                                                    <div className="absolute -bottom-3 -left-3 text-4xl animate-float">{colors.emoji}</div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="relative p-6 space-y-4">
                                                {/* Topic Badge */}
                                                <div className="flex items-center gap-2">
                                                    <Tag className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">{roadmap.topic}</span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-red-600 transition-all duration-500">
                                                    {roadmap.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 font-medium">
                                                    {roadmap.description}
                                                </p>

                                                {/* Meta Info */}
                                                <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200 dark:border-gray-700">
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                        <Calendar className="w-4 h-4" />
                                                        <span className="font-semibold">{new Date(roadmap.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    {roadmap.files && (
                                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400">
                                                            <BookOpen className="w-4 h-4" />
                                                            {roadmap.files.length} Steps
                                                        </div>
                                                    )}
                                                </div>

                                                {/* CTA Button */}
                                                <button className={`relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r ${colors.gradient} text-white rounded-2xl font-black text-base shadow-2xl group-hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 transform group-hover:scale-105 overflow-hidden`}>
                                                    {/* Shimmer */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                                                    <Rocket className="relative w-5 h-5" />
                                                    <span className="relative">Start Journey</span>
                                                    <TrendingUp className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>

                                            {/* Bottom Accent */}
                                            <div className={`h-2 bg-gradient-to-r ${colors.gradient} animate-gradient-flow bg-[length:200%_auto]`}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* EMPTY STATE */}
                        {filtered.length === 0 && (
                            <div className="text-center py-20 animate-fade-in">
                                <div className="text-8xl mb-6 animate-bounce">🔍</div>
                                <p className="text-gray-600 dark:text-gray-400 text-3xl font-bold mb-4">No roadmaps found</p>
                                <p className="text-gray-500 dark:text-gray-500 text-lg">Try adjusting your search or filters to discover amazing learning paths</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ROADMAP VIEWER MODAL */}
                {activeRoadmap && activeRoadmap.files && activeRoadmap.files.length > 0 && (
                    <div ref={bookContainerRef} className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : isMobile ? 'p-0' : 'p-4'}`}>
                        {/* Page Selector Panel */}
                        {showPageSelector && (
                            <div className="absolute top-16 md:top-20 right-4 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 max-w-md w-full md:w-96 max-h-[70vh] overflow-hidden flex flex-col border-2 border-purple-200 dark:border-purple-700">
                                <div className="bg-gradient-to-r from-purple-600 via-pink s-600 to-red-600 p-6 text-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            <Download className="w-6 h-6 animate-bounce" />
                                            Select Steps to Download
                                        </h3>
                                        <button onClick={() => setShowPageSelector(false)} className="text-white/80 hover:text-white transition-colors">
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={selectAllPages} className="flex-1 px-4 py-3 bg-white/20 hover:bg-white/30 text-white text-sm rounded-xl transition-all font-bold backdrop-blur-sm">
                                            ✅ Select All
                                        </button>
                                        <button onClick={deselectAllPages} className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white text-sm rounded-xl transition-all font-bold backdrop-blur-sm">
                                            ❌ Clear
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
                                    <div className="grid grid-cols-4 gap-4">
                                        {activeRoadmap.files.map((file, index) => (
                                            <button
                                                key={index}
                                                onClick={() => togglePageSelection(index)}
                                                className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-3 transition-all shadow-xl ${selectedPages.includes(index)
                                                    ? 'border-purple-500 ring-4 ring-purple-300 dark:ring-purple-700 scale-95'
                                                    : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:scale-105'
                                                    }`}
                                            >
                                                <img src={file.fileUrl} alt={`Step ${index + 1}`} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-3">
                                                    <span className="text-white font-semobold text-sm">Step {index + 1}</span>
                                                </div>
                                                {selectedPages.includes(index) && (
                                                    <div className="absolute top-2 right-2 bg-purple-500 rounded-full p-2 shadow-xl animate-bounce">
                                                        <CheckCircle className="w-4 h-4 text-white" fill="currentColor" />
                                                    </div>
                                                )}
                                                {bookmarks.includes(index) && (
                                                    <div className="absolute top-2 left-2 text-yellow-400 animate-pulse">
                                                        <Star className="w-5 h-5" fill="currentColor" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 bg-white dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={downloadSelectedPages}
                                        disabled={selectedPages.length === 0 || isDownloading}
                                        className="w-full px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-bold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-2xl text-lg transform hover:scale-105"
                                    >
                                        <Download className="w-6 h-6 animate-bounce" />
                                        {isDownloading ? '⏳ Downloading...' : `📥 Download ${selectedPages.length} Step${selectedPages.length !== 1 ? 's' : ''}`}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Top Controls Bar */}
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-4 md:p-6 z-10">
                            <div className="container mx-auto max-w-7xl flex justify-between items-center gap-3">
                                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2.5 rounded-xl shadow-xl">
                                        <Map className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-white font-bold text-sm md:text-lg truncate">
                                        {activeRoadmap.title}
                                    </h3>
                                    <span className="text-white/90 text-xs md:text-sm bg-white/20 px-4 py-2 rounded-full whitespace-nowrap font-bold backdrop-blur-sm">
                                        {getCurrentPageDisplay()}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    {!isMobile && (
                                        <>
                                            <button onClick={handleZoomOut} className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all backdrop-blur-sm" title="Zoom Out">
                                                <ZoomOut className="w-5 h-5" />
                                            </button>
                                            <span className="text-white text-sm px-3 font-bold hidden sm:block">{zoom}%</span>
                                            <button onClick={handleZoomIn} className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all backdrop-blur-sm" title="Zoom In">
                                                <ZoomIn className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}

                                    <button onClick={() => setShowPageSelector(!showPageSelector)} className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl transition-all relative shadow-xl" title="Download">
                                        <Download className="w-5 h-5" />
                                        {selectedPages.length > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-black shadow-xl animate-bounce">
                                                {selectedPages.length}
                                            </span>
                                        )}
                                    </button>

                                    <div className="relative">
                                        <button onClick={() => setShowShareMenu(!showShareMenu)} className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all backdrop-blur-sm" title="Share">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                        {showShareMenu && (
                                            <div className="absolute right-0 top-full mt-3 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl min-w-[220px] z-50 py-3 border-2 border-gray-200 dark:border-gray-700">
                                                {navigator.share && (
                                                    <button onClick={() => handleShare('native')} className="w-full text-left px-5 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors">
                                                        🔗 Share...
                                                    </button>
                                                )}
                                                <button onClick={() => handleShare('whatsapp')} className="w-full text-left px-5 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors">
                                                    💬 WhatsApp
                                                </button>
                                                <button onClick={() => handleShare('facebook')} className="w-full text-left px-5 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors">
                                                    📘 Facebook
                                                </button>
                                                <button onClick={() => handleShare('twitter')} className="w-full text-left px-5 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors">
                                                    🐦 Twitter
                                                </button>
                                                <button onClick={() => handleShare('linkedin')} className="w-full text-left px-5 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors">
                                                    💼 LinkedIn
                                                </button>
                                                <button onClick={() => handleShare('copy')} className="w-full text-left px-5 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors">
                                                    📋 Copy Link
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <button onClick={toggleBookmark} className={`${bookmarks.includes(currentPage) ? 'bg-yellow-500/80' : 'bg-white/20'} hover:bg-white/30 text-white p-3 rounded-xl transition-all backdrop-blur-sm`} title="Bookmark">
                                        <BookmarkPlus className="w-5 h-5" />
                                    </button>

                                    {!isMobile && (
                                        <button onClick={toggleFullscreen} className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all backdrop-blur-sm" title="Fullscreen">
                                            <Maximize2 className="w-5 h-5" />
                                        </button>
                                    )}

                                    <button onClick={closeRoadmap} className="bg-red-500/80 hover:bg-red-600 text-white p-3 rounded-xl transition-all shadow-xl">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Book Container */}
                        <div className={`relative w-full h-full flex items-center justify-center ${isMobile ? 'pt-20 pb-24' : 'pt-24 pb-8'}`}>
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 0}
                                className={`absolute ${isMobile ? 'left-2' : 'left-8'} z-20 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white ${isMobile ? 'p-4' : 'p-6'} rounded-full shadow-2xl transition-all transform hover:scale-110 ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-95'}`}
                            >
                                <ChevronLeft className={`${isMobile ? 'w-7 h-7' : 'w-10 h-10'}`} />
                            </button>

                            <div className="book-wrapper" style={{ transform: isMobile ? 'scale(1)' : `scale(${zoom / 100})`, transition: 'transform 0.3s ease' }}>
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
                                    {activeRoadmap.files.map((file, index) => (
                                        <div key={index} className="page" data-density="hard">
                                            <div className="page-content">
                                                <img src={file.fileUrl} alt={`Step ${index + 1}`} className="page-image" draggable={false} />
                                                <div className="page-number">
                                                    🎯 Step {index + 1}
                                                    {bookmarks.includes(index) && <span className="ml-2 text-yellow-400 animate-pulse">★</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </HTMLFlipBook>
                            </div>

                            <button
                                onClick={nextPage}
                                disabled={currentPage >= getTotalPages() - (isMobile ? 1 : 2)}
                                className={`absolute ${isMobile ? 'right-2' : 'right-8'} z-20 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white ${isMobile ? 'p-4' : 'p-6'} rounded-full shadow-2xl transition-all transform hover:scale-110 ${currentPage >= getTotalPages() - (isMobile ? 1 : 2) ? 'opacity-30 cursor-not-allowed' : 'opacity-95'}`}
                            >
                                <ChevronRight className={`${isMobile ? 'w-7 h-7' : 'w-10 h-10'}`} />
                            </button>
                        </div>

                        {/* Bottom Info Bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 md:p-8">
                            <div className="container mx-auto max-w-7xl">
                                <div className={`flex items-center ${isMobile ? 'flex-col gap-4' : 'justify-between'}`}>
                                    <div className={`flex items-center gap-4 ${isMobile ? 'flex-wrap justify-center text-center' : ''}`}>
                                        <div className="flex items-center gap-2 bg-purple-600/80 px-4 py-2 rounded-full backdrop-blur-sm">
                                            <Tag className="w-4 h-4 text-white" />
                                            <span className="text-xs md:text-sm font-bold text-white">{activeRoadmap.topic}</span>
                                        </div>
                                        {!isMobile && <span className="text-white/60 text-lg font-black">•</span>}
                                        <p className="text-white/90 text-xs md:text-sm line-clamp-1 font-semibold">{activeRoadmap.description}</p>
                                    </div>

                                    <div className={`${isMobile ? 'w-full' : 'w-72'} bg-white/20 rounded-full h-3 backdrop-blur-sm overflow-hidden`}>
                                        <div
                                            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-3 rounded-full transition-all duration-500 shadow-xl"
                                            style={{ width: `${((currentPage + 1) / getTotalPages()) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <style>{`
                    @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 25% { transform: translate(20px, -50px) scale(1.1); } 50% { transform: translate(-20px, 20px) scale(0.9); } 75% { transform: translate(50px, 50px) scale(1.05); } }
                    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
                    @keyframes float-particle { 0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; } 50% { transform: translate(20px, -30px) rotate(180deg); opacity: 0.7; } }
                    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                    @keyframes gradient-x { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
                    @keyframes gradient-flow { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
                    @keyframes bounce-gentle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                    @keyframes pulse-glow { 0%, 100% { opacity: 0.75; } 50% { opacity: 1; } }
                    @keyframes width-grow { from { width: 0; } to { width: 100%; } }
                    @keyframes draw { to { stroke-dashoffset: 0; } }

                    .animate-blob { animation: blob 7s infinite; }
                    .animate-float { animation: float 4s ease-in-out infinite; }
                    .animate-float-particle { animation: float-particle 15s ease-in-out infinite; }
                    .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
                    .animate-slide-up { animation: slide-up 0.8s ease-out; }
                    .animate-gradient-x { animation: gradient-x 3s ease infinite; }
                    .animate-gradient-flow { animation: gradient-flow 3s linear infinite; }
                    .animate-bounce-gentle { animation: bounce-gentle 2.5s ease-in-out infinite; }
                    .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                    .animate-width-grow { animation: width-grow 1.5s ease-out forwards; }
                    .animate-draw { stroke-dasharray: 300; stroke-dashoffset: 300; animation: draw 2s ease-out forwards; }

                    .animation-delay-2000 { animation-delay: 2s; }
                    .animation-delay-4000 { animation-delay: 4s; }
                    .animation-delay-1000 { animation-delay: 1s; }
                    .animation-delay-200 { animation-delay: 0.2s; }
                    .animation-delay-300 { animation-delay: 0.3s; }
                    .animation-delay-600 { animation-delay: 0.6s; }

                    .book-wrapper { perspective: 2000px; transform-style: preserve-3d; }
                    .book-container { box-shadow: 0 25px 70px rgba(0, 0, 0, 0.8); border-radius: 10px; }
                    .page { background: linear-gradient(to right, #f0f4f8 0%, #ffffff 5%, #ffffff 95%, #f0f4f8 100%); box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.1); overflow: hidden; position: relative; user-select: none; }
                    .page-content { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; padding: 20px; background: white; }
                    .page-image { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; pointer-events: none; }
                    .page-number { position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); font-size: 13px; color: #a855f7; font-weight: 700; background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15)); padding: 8px 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3); display: flex; align-items: center; z-index: 10; border: 2px solid rgba(168, 85, 247, 0.4); }
                    
                    @media (max-width: 768px) {
                        .book-container { box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6); }
                        .page-content { padding: 10px; }
                        .page-number { font-size: 11px; padding: 5px 12px; bottom: 10px; }
                    }

                    .stf__wrapper { overflow: visible !important; }
                    .stf__block { overflow: visible !important; }
                    .stf__item { box-shadow: 0 0 35px rgba(168, 85, 247, 0.4); }
                    .stf__item--hard { background: linear-gradient(to right, #e0e7ff 0%, #ffffff 5%); }
                    .stf__item.--flipping { transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1); }
                    .stf__parent { display: flex; align-items: center; justify-content: center; margin: 0 auto; }
                `}</style>
            </div>
            <Footer />
        </>
    );
}