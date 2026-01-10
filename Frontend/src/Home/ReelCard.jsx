

import { useState, useEffect } from 'react';
import { X, Sparkles, Send, Heart, Share2, MessageCircle, Play, TrendingUp } from 'lucide-react';

const BASE_URL = "http://localhost:4001/instapost";
const FILE_URL = "http://localhost:4001";

export default function SingleReelHero() {
    const [latestReel, setLatestReel] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [userName, setUserName] = useState("");
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

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

                    if (savedComments) {
                        setComments(JSON.parse(savedComments));
                    }
                    if (savedLikes) {
                        setLikes(parseInt(savedLikes));
                    }
                    if (userLiked) {
                        setHasLiked(true);
                    }
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
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading amazing content...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 border-b border-t border-gray-200 dark:border-gray-800">
            <div className="bg-transparent">
                <div className="container mx-auto px-4 py-8">
                    {/* Badge */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:scale-105 transition-transform">
                            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
                            <span className="text-purple-700 dark:text-purple-300 font-semibold text-sm">Boost your coding skills</span>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-center text-4xl md:text-5xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Problem of{' '}
                        <span className="bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-400 dark:to-pink-400 bg-clip-text text-transparent">
                            The Day
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                        Comment correct output of the given code reel to win exciting rewards!
                    </p>


                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 md:py-10">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
                        {/* Left - Text Content */}
                        <div className="space-y-8 order-2 lg:order-1">
                            <div className="inline-block">
                                <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl border-2 border-purple-200 dark:border-purple-700 rounded-full text-sm font-semibold text-purple-700 dark:text-purple-300">
                                    {latestReel.topic}
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 dark:text-gray-100 leading-tight">
                                {latestReel.title}
                            </h2>

                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                {latestReel.description}
                            </p>

                            {/* Stats */}
                            <div className="flex gap-6 pt-2">
                                <div className="flex items-center gap-2">
                                    <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-full backdrop-blur-xl border border-red-200 dark:border-red-800">
                                        <Heart className="w-5 h-5 text-red-500 dark:text-red-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{likes}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Likes</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full backdrop-blur-xl border border-blue-200 dark:border-blue-800">
                                        <MessageCircle className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{comments.length}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Comments</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 dark:hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    <Play className="w-6 h-6" fill="currentColor" />
                                    Watch & Comment
                                    <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <button
                                    onClick={handleNavigateToReels}
                                    className="flex items-center gap-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl border-2 border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                                >
                                    View More
                                </button>
                            </div>


                            {/* Info Cards */}
                            <div className="max-w-md grid md:grid-cols-3 gap-4">
                                <a href="/trending">
                                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/30 transition-all hover:scale-105">
                                        <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center my-2 mx-auto">
                                            <TrendingUp className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-sm text-gray-600 dark:text-gray-300 text-center font-semibold">Trending Topic</h3>
                                    </div>
                                </a>

                                <a href="/discussion">
                                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl hover:shadow-pink-500/20 dark:hover:shadow-pink-500/30 transition-all hover:scale-105">
                                        <div className="bg-pink-600 w-12 h-12 rounded-full flex items-center justify-center my-2 mx-auto">
                                            <MessageCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-sm text-gray-600 dark:text-gray-300 text-center font-semibold">Join Discussion</h3>
                                    </div>
                                </a>

                                <a href="/support">
                                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 transition-all hover:scale-105">
                                        <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center my-2 mx-auto">
                                            <Heart className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-sm text-gray-600 dark:text-gray-300 text-center font-semibold">Support Content</h3>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Right - Video Preview */}
                        <div className="order-1 lg:order-2">
                            <div
                                className="relative group cursor-pointer"
                                onClick={() => setShowModal(true)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
                                    <div className="aspect-[9/16] max-h-[500px] mx-auto bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                                        <video
                                            className="w-full h-full object-cover"
                                            loop
                                            muted
                                            playsInline
                                        >
                                            <source src={`${FILE_URL}${latestReel.fileUrl}`} type="video/mp4" />
                                        </video>

                                        {/* Play Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                            <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                                <Play className="w-10 h-10 text-purple-600 ml-1" fill="currentColor" />
                                            </div>
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
                <div className="fixed inset-0 bg-gray-950/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-7xl h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-lg transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Left - Video Section */}
                        <div className="flex-1 bg-black flex items-center justify-center lg:border-r border-gray-200 dark:border-gray-700">
                            <div className="w-full h-full flex items-center justify-center p-4">
                                <video
                                    controls
                                    autoPlay
                                    loop
                                    className="w-full h-full object-contain rounded-2xl"
                                >
                                    <source src={`${FILE_URL}${latestReel.fileUrl}`} type="video/mp4" />
                                </video>
                            </div>
                        </div>

                        {/* Right - Details & Comments Section */}
                        <div className="w-full lg:w-[450px] bg-white dark:bg-gray-900 flex flex-col">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold mb-3 border border-purple-200 dark:border-purple-700">
                                    {latestReel.topic}
                                </span>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                                    {latestReel.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {latestReel.description}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={handleLike}
                                        disabled={hasLiked}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${hasLiked
                                            ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 cursor-not-allowed'
                                            : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50'
                                            }`}
                                    >
                                        <Heart className="w-5 h-5" fill={hasLiked ? "currentColor" : "none"} />
                                        <span>{likes}</span>
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 font-semibold transition-all"
                                    >
                                        <Share2 className="w-5 h-5" />
                                        Share
                                    </button>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-950">
                                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2 sticky top-0 bg-gray-50 dark:bg-gray-950 pb-2">
                                    <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    Comments ({comments.length})
                                </h3>

                                {comments.map(comment => (
                                    <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                                {comment.userName.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-800 dark:text-gray-100">{comment.userName}</p>
                                                <p className="text-gray-600 dark:text-gray-300 mt-1 break-words">{comment.text}</p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                                    {new Date(comment.timestamp).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {comments.length === 0 && (
                                    <div className="text-center py-12">
                                        <MessageCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                        <p className="text-gray-400 dark:text-gray-500 text-lg">No comments yet</p>
                                        <p className="text-gray-400 dark:text-gray-500 text-sm">Be the first to comment!</p>
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
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none mb-2 transition-colors"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                                        className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none transition-colors"
                                    />
                                    <button
                                        onClick={handleAddComment}
                                        disabled={!newComment.trim() || !userName.trim()}
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Decorative Floating Blobs */}
            {/* <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
            <div className="fixed bottom-20 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div> */}

            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
}