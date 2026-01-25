
import { useState, useEffect } from 'react';
import { X, Sparkles, Send, Heart, Share2, BookOpen, MessageCircle, Play, TrendingUp, Users, Award, Clock, Bookmark, Eye, ThumbsUp } from 'lucide-react';
import { baseUrl } from "../Baseurl";

const BASE_URL = `${baseUrl}/instapost`;

export default function SingleReelHero() {
    const [latestReel, setLatestReel] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [userName, setUserName] = useState("");
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch(`${BASE_URL}/content?type=REEL`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    const reel = data[0];
                    setLatestReel(reel);

                    const savedComments = localStorage.getItem(`comments_${reel._id}`);
                    const savedLikes = localStorage.getItem(`likes_${reel._id}`);
                    const userLiked = localStorage.getItem(`liked_${reel._id}`);
                    const isSaved = localStorage.getItem(`saved_${reel._id}`);

                    if (savedComments) setComments(JSON.parse(savedComments));
                    if (savedLikes) setLikes(parseInt(savedLikes));
                    if (userLiked) setHasLiked(true);
                    if (isSaved) setSaved(true);
                }
            })
            .catch(err => console.error('Error:', err));
    }, []);

    const handleAddComment = () => {
        if (!newComment.trim() || !userName.trim()) return;

        const comment = {
            id: Date.now(),
            userName,
            text: newComment,
            timestamp: new Date().toISOString()
        };

        const updatedComments = [...comments, comment];
        setComments(updatedComments);
        localStorage.setItem(`comments_${latestReel._id}`, JSON.stringify(updatedComments));
        setNewComment("");
    };

    const handleNavigateToReels = () => {
        window.location.href = '/reels';
    };

    const handleLike = () => {
        if (!hasLiked) {
            const newLikes = likes + 1;
            setLikes(newLikes);
            setHasLiked(true);
            localStorage.setItem(`likes_${latestReel._id}`, newLikes.toString());
            localStorage.setItem(`liked_${latestReel._id}`, 'true');
        }
    };

    const handleSave = () => {
        setSaved(!saved);
        localStorage.setItem(`saved_${latestReel._id}`, (!saved).toString());
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: latestReel.title,
                text: latestReel.description,
                url: window.location.href
            });
        }
    };

    if (!latestReel) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-900 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full mb-4">
                            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Boost your coding skills</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                            Problem of{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                                The Day
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Comment correct output of the given code reel to win exciting rewards!
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">500+ Active Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Rewards</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">24h Challenge</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        {/* Left - Info */}
                        <div className="space-y-6">
                            {/* Topic Badge */}
                            <div>
                                <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-semibold">
                                    {latestReel.topic}
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                                {latestReel.title}
                            </h2>

                            {/* Description */}
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                {latestReel.description}
                            </p>

                            {/* Engagement Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                            <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{likes}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Likes</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                            <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{comments.length}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Comments</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                            <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2k</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Views</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg"
                                >
                                    <Play className="w-5 h-5" fill="currentColor" />
                                    Watch Now
                                </button>

                                <button
                                    onClick={handleLike}
                                    disabled={hasLiked}
                                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all border-2 ${hasLiked
                                        ? 'bg-red-600 border-red-600 text-white cursor-not-allowed'
                                        : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <Heart className="w-5 h-5" fill={hasLiked ? "currentColor" : "none"} />
                                    Like
                                </button>

                                <button
                                    onClick={handleSave}
                                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all border-2 ${saved
                                        ? 'bg-purple-600 border-purple-600 text-white'
                                        : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <Bookmark className="w-5 h-5" fill={saved ? "currentColor" : "none"} />
                                    Save
                                </button>

                                <button
                                    onClick={handleShare}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <Share2 className="w-5 h-5" />
                                    Share
                                </button>
                            </div>

                            {/* Quick Links */}
                            <div className="grid grid-cols-3 gap-4">
                                <a href="/trending" className="group">
                                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700 transition-all text-center">
                                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Trending</p>
                                    </div>
                                </a>

                                <a href="/discussion" className="group">
                                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-lg hover:border-pink-300 dark:hover:border-pink-700 transition-all text-center">
                                        <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <MessageCircle className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Discussion</p>
                                    </div>
                                </a>

                                <a href="/support" className="group">
                                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all text-center">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <ThumbsUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Support</p>
                                    </div>
                                </a>
                            </div>

                            {/* More Button */}
                            <button
                                onClick={handleNavigateToReels}
                                className="w-full flex items-center justify-center gap-4 text-lg px-3 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105"
                            >
                                <BookOpen className="w-4 h-4" />
                                View More Reels
                            </button>
                        </div>

                        {/* Right - Video */}
                        <div className="lg:sticky lg:top-4 ">
                            <div
                                className="relative group cursor-pointer rounded-2xl overflow-hidden bg-black dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all"
                                onClick={() => setShowModal(true)}
                            >
                                <div className="aspect-[9/16] max-h-[610px]  mx-auto">
                                    <video
                                        className="w-full h-full object-cover"
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <source src={latestReel.fileUrl} type="video/mp4" />
                                    </video>

                                    {/* Play Overlay */}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                            <Play className="w-10 h-10 text-purple-600 ml-1" fill="currentColor" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-6xl h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 z-10 p-2 bg-gray-900/80 hover:bg-gray-900 text-white rounded-full transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Video Section */}
                        <div className="flex-1 bg-black flex items-center justify-center">
                            <video
                                controls
                                autoPlay
                                loop
                                className="w-full h-full object-contain"
                            >
                                <source src={latestReel.fileUrl} type="video/mp4" />
                            </video>
                        </div>

                        {/* Comments Section */}
                        <div className="w-full lg:w-[400px] flex flex-col bg-gray-50 dark:bg-gray-800">
                            {/* Header */}
                            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                                <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                                    {latestReel.topic}
                                </span>

                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {latestReel.title}
                                </h2>

                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {latestReel.description}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={handleLike}
                                        disabled={hasLiked}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${hasLiked
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        <Heart className="w-4 h-4" fill={hasLiked ? "currentColor" : "none"} />
                                        {likes}
                                    </button>

                                    <button
                                        onClick={handleShare}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </button>

                                    <button
                                        onClick={handleSave}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${saved
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        <Bookmark className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
                                    </button>
                                </div>
                            </div>

                            {/* Comments List */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    Comments ({comments.length})
                                </h3>

                                {comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                                {comment.userName.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 dark:text-white text-sm">{comment.userName}</p>
                                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{comment.text}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                    {new Date(comment.timestamp).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {comments.length === 0 && (
                                    <div className="text-center py-12">
                                        <MessageCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                        <p className="text-gray-500 dark:text-gray-400">No comments yet</p>
                                        <p className="text-sm text-gray-400 dark:text-gray-500">Be the first to comment!</p>
                                    </div>
                                )}
                            </div>

                            {/* Add Comment */}
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                    />
                                    <button
                                        onClick={handleAddComment}
                                        disabled={!newComment.trim() || !userName.trim()}
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}