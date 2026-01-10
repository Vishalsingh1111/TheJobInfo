

// import { useEffect, useState } from "react";
// import { X, Send, Heart, Share2, MessageCircle, Search, Filter, Clock, Play, Sparkles } from "lucide-react";
// import Navbar from "../Navbar";
// import Footer from "../Footer";

// const BASE_URL = "http://localhost:4001/instapost";
// const FILE_URL = "http://localhost:4001";

// export default function AllReels() {
//     const [reels, setReels] = useState([]);
//     const [filtered, setFiltered] = useState([]);
//     const [search, setSearch] = useState("");
//     const [topic, setTopic] = useState("ALL");
//     const [sort, setSort] = useState("LATEST");
//     const [activeReel, setActiveReel] = useState(null);
//     const [comments, setComments] = useState({});
//     const [newComment, setNewComment] = useState("");
//     const [userName, setUserName] = useState("");
//     const [likes, setLikes] = useState({});
//     const [userLikes, setUserLikes] = useState({});

//     useEffect(() => {
//         fetch(`${BASE_URL}/content?type=REEL`)
//             .then(res => res.json())
//             .then(data => {
//                 setReels(data);
//                 setFiltered(data);

//                 const allComments = {};
//                 const allLikes = {};
//                 const allUserLikes = {};

//                 data.forEach(reel => {
//                     const savedComments = localStorage.getItem(`comments_${reel._id}`);
//                     const savedLikes = localStorage.getItem(`likes_${reel._id}`);
//                     const userLiked = localStorage.getItem(`liked_${reel._id}`);

//                     if (savedComments) {
//                         allComments[reel._id] = JSON.parse(savedComments);
//                     } else {
//                         allComments[reel._id] = [];
//                     }

//                     if (savedLikes) {
//                         allLikes[reel._id] = parseInt(savedLikes);
//                     } else {
//                         allLikes[reel._id] = 0;
//                     }

//                     if (userLiked) {
//                         allUserLikes[reel._id] = true;
//                     }
//                 });

//                 setComments(allComments);
//                 setLikes(allLikes);
//                 setUserLikes(allUserLikes);
//             })
//             .catch(err => console.error('Error:', err));
//     }, []);

//     useEffect(() => {
//         let data = [...reels];

//         if (topic !== "ALL") {
//             data = data.filter(r => r.topic === topic);
//         }

//         if (search) {
//             data = data.filter(r =>
//                 `${r.title} ${r.description} ${r.topic}`
//                     .toLowerCase()
//                     .includes(search.toLowerCase())
//             );
//         }

//         data.sort((a, b) =>
//             sort === "LATEST"
//                 ? new Date(b.createdAt) - new Date(a.createdAt)
//                 : new Date(a.createdAt) - new Date(b.createdAt)
//         );

//         setFiltered(data);
//     }, [search, topic, sort, reels]);

//     const topics = ["ALL", ...new Set(reels.map(r => r.topic))];

//     const handleAddComment = (reelId) => {
//         if (!newComment.trim() || !userName.trim()) return;

//         const comment = {
//             id: Date.now(),
//             userName,
//             text: newComment,
//             timestamp: new Date().toISOString()
//         };

//         const updatedComments = {
//             ...comments,
//             [reelId]: [...(comments[reelId] || []), comment]
//         };

//         setComments(updatedComments);
//         localStorage.setItem(`comments_${reelId}`, JSON.stringify(updatedComments[reelId]));
//         setNewComment("");
//     };

//     const handleLike = (reelId) => {
//         if (!userLikes[reelId]) {
//             const newLikes = (likes[reelId] || 0) + 1;
//             const updatedLikes = { ...likes, [reelId]: newLikes };
//             const updatedUserLikes = { ...userLikes, [reelId]: true };

//             setLikes(updatedLikes);
//             setUserLikes(updatedUserLikes);
//             localStorage.setItem(`likes_${reelId}`, newLikes.toString());
//             localStorage.setItem(`liked_${reelId}`, 'true');
//         }
//     };

//     const handleShare = (reel) => {
//         if (navigator.share) {
//             navigator.share({
//                 title: reel.title,
//                 text: reel.description,
//                 url: window.location.href
//             });
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950">
//                 <div className="bg-white/80 dark:bg-gray-950 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-40 pt-12">
//                     <div className="container mx-auto px-4 py-8">
//                         {/* Badge */}
//                         <div className="flex justify-center mb-6">
//                             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg">
//                                 <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
//                                 <span className="text-purple-700 dark:text-purple-300 font-semibold">Educational Content</span>
//                             </div>
//                         </div>

//                         <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2">
//                             <span className="text-gray-800 dark:text-gray-100">All Educational</span>{' '}
//                             <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
//                                 Reels
//                             </span>
//                         </h1>
//                         <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
//                             Explore our collection of learning content
//                         </p>

//                         {/* Filters */}

//                         <div className="container mx-auto px-4 pt-8">
//                             <div className="flex flex-col lg:flex-row gap-4 max-w-5xl mx-auto">
//                                 {/* Search */}
//                                 <div className="flex-1 relative">
//                                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
//                                     <input
//                                         type="text"
//                                         placeholder="Search reels..."
//                                         value={search}
//                                         onChange={(e) => setSearch(e.target.value)}
//                                         className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none transition-colors"
//                                     />
//                                 </div>

//                                 {/* Topic Filter */}
//                                 <div className="relative">
//                                     <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
//                                     <select
//                                         value={topic}
//                                         onChange={(e) => setTopic(e.target.value)}
//                                         className="w-full lg:w-[200px] pl-12 pr-8 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-gray-800 dark:text-gray-200 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none cursor-pointer appearance-none transition-colors"
//                                     >
//                                         {topics.map(t => (
//                                             <option key={t} value={t}>{t}</option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 {/* Sort */}
//                                 <div className="relative">
//                                     <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
//                                     <select
//                                         value={sort}
//                                         onChange={(e) => setSort(e.target.value)}
//                                         className="w-full lg:w-[180px] pl-12 pr-8 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-gray-800 dark:text-gray-200 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none cursor-pointer appearance-none transition-colors"
//                                     >
//                                         <option value="LATEST">Latest First</option>
//                                         <option value="OLDEST">Oldest First</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>



//                 {/* Results Count */}
//                 <div className="container mx-auto px-4 py-6">
//                     <p className="text-center text-gray-600 dark:text-gray-400">
//                         Showing <span className="font-bold text-purple-600 dark:text-purple-400">{filtered.length}</span> {filtered.length === 1 ? 'reel' : 'reels'}
//                     </p>
//                 </div>

//                 {/* Reels Grid */}
//                 <div className="container mx-auto px-4 pb-12">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
//                         {filtered.map(item => (
//                             <div
//                                 key={item._id}
//                                 className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700"
//                                 onClick={() => setActiveReel(item)}
//                             >
//                                 <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
//                                     <video
//                                         className="w-full h-full object-cover"
//                                         muted
//                                         loop
//                                         playsInline
//                                     >
//                                         <source src={`${FILE_URL}${item.fileUrl}`} />
//                                     </video>

//                                     {/* Overlay */}
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
//                                         <div className="absolute inset-0 flex items-center justify-center">
//                                             <div className="w-16 h-16 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform">
//                                                 <Play className="w-8 h-8 text-purple-600 dark:text-purple-400 ml-1" fill="currentColor" />
//                                             </div>
//                                         </div>
//                                         <div className="absolute bottom-0 left-0 right-0 p-4">
//                                             <h3 className="font-bold text-white text-lg mb-1 line-clamp-2">{item.title}</h3>
//                                             <p className="text-white/90 text-sm line-clamp-2">{item.description}</p>
//                                         </div>
//                                     </div>

//                                     {/* Topic Badge */}
//                                     <div className="absolute top-3 left-3">
//                                         <span className="px-3 py-1.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full text-xs font-semibold text-purple-600 dark:text-purple-400 border-2 border-purple-200 dark:border-purple-700">
//                                             {item.topic}
//                                         </span>
//                                     </div>

//                                     {/* Stats */}
//                                     <div className="absolute top-3 right-3 flex flex-col gap-2">
//                                         <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full px-2.5 py-1.5 flex items-center gap-1.5 border-2 border-red-200 dark:border-red-800">
//                                             <Heart className="w-4 h-4 text-red-500 dark:text-red-400" fill="currentColor" />
//                                             <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{likes[item._id] || 0}</span>
//                                         </div>
//                                         <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full px-2.5 py-1.5 flex items-center gap-1.5 border-2 border-blue-200 dark:border-blue-800">
//                                             <MessageCircle className="w-4 h-4 text-blue-500 dark:text-blue-400" />
//                                             <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{(comments[item._id] || []).length}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {filtered.length === 0 && (
//                         <div className="text-center py-20">
//                             <div className="text-6xl mb-4">🔍</div>
//                             <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold mb-2">No reels found</p>
//                             <p className="text-gray-400 dark:text-gray-500">Try adjusting your search or filters</p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Modal */}
//                 {activeReel && (
//                     <div className="fixed inset-0 bg-gray-950/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//                         <div className="w-full max-w-7xl h-[90vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden border-2 border-gray-200 dark:border-gray-700">
//                             {/* Close Button */}
//                             <button
//                                 onClick={() => setActiveReel(null)}
//                                 className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-lg transition-all"
//                             >
//                                 <X className="w-6 h-6" />
//                             </button>

//                             {/* Left - Video Section */}
//                             <div className="flex-1 bg-black flex items-center justify-center lg:border-r border-gray-200 dark:border-gray-700">
//                                 <div className="w-full h-full flex items-center justify-center p-4">
//                                     <video
//                                         controls
//                                         autoPlay
//                                         loop
//                                         className="w-full h-full object-contain rounded-2xl"
//                                     >
//                                         <source src={`${FILE_URL}${activeReel.fileUrl}`} />
//                                     </video>
//                                 </div>
//                             </div>

//                             {/* Right - Details & Comments Section */}
//                             <div className="w-full lg:w-[450px] bg-white dark:bg-gray-900 flex flex-col">
//                                 {/* Header */}
//                                 <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//                                     <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold mb-3 border-2 border-purple-200 dark:border-purple-700">
//                                         {activeReel.topic}
//                                     </span>
//                                     <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
//                                         {activeReel.title}
//                                     </h2>
//                                     <p className="text-gray-600 dark:text-gray-300">
//                                         {activeReel.description}
//                                     </p>

//                                     {/* Actions */}
//                                     <div className="flex gap-3 mt-4">
//                                         <button
//                                             onClick={() => handleLike(activeReel._id)}
//                                             disabled={userLikes[activeReel._id]}
//                                             className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${userLikes[activeReel._id]
//                                                 ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 cursor-not-allowed'
//                                                 : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50'
//                                                 }`}
//                                         >
//                                             <Heart className="w-5 h-5" fill={userLikes[activeReel._id] ? "currentColor" : "none"} />
//                                             <span>{likes[activeReel._id] || 0}</span>
//                                         </button>
//                                         <button
//                                             onClick={() => handleShare(activeReel)}
//                                             className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 font-semibold transition-all"
//                                         >
//                                             <Share2 className="w-5 h-5" />
//                                             Share
//                                         </button>
//                                     </div>
//                                 </div>

//                                 {/* Comments */}
//                                 <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-950">
//                                     <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2 sticky top-0 bg-gray-50 dark:bg-gray-950 pb-2">
//                                         <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//                                         Comments ({(comments[activeReel._id] || []).length})
//                                     </h3>

//                                     {(comments[activeReel._id] || []).map(comment => (
//                                         <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
//                                             <div className="flex items-start gap-3">
//                                                 <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
//                                                     {comment.userName.charAt(0).toUpperCase()}
//                                                 </div>
//                                                 <div className="flex-1 min-w-0">
//                                                     <p className="font-semibold text-gray-800 dark:text-gray-100">{comment.userName}</p>
//                                                     <p className="text-gray-600 dark:text-gray-300 mt-1 break-words">{comment.text}</p>
//                                                     <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
//                                                         {new Date(comment.timestamp).toLocaleString()}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}

//                                     {(comments[activeReel._id] || []).length === 0 && (
//                                         <div className="text-center py-12">
//                                             <MessageCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//                                             <p className="text-gray-400 dark:text-gray-500 text-lg">No comments yet</p>
//                                             <p className="text-gray-400 dark:text-gray-500 text-sm">Be the first to comment!</p>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Add Comment */}
//                                 <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
//                                     <input
//                                         type="text"
//                                         placeholder="Your name"
//                                         value={userName}
//                                         onChange={(e) => setUserName(e.target.value)}
//                                         className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none mb-2 transition-colors"
//                                     />
//                                     <div className="flex gap-2">
//                                         <input
//                                             type="text"
//                                             placeholder="Add a comment..."
//                                             value={newComment}
//                                             onChange={(e) => setNewComment(e.target.value)}
//                                             onKeyPress={(e) => e.key === 'Enter' && handleAddComment(activeReel._id)}
//                                             className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none transition-colors"
//                                         />
//                                         <button
//                                             onClick={() => handleAddComment(activeReel._id)}
//                                             disabled={!newComment.trim() || !userName.trim()}
//                                             className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                                         >
//                                             <Send className="w-5 h-5" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Decorative Floating Blobs */}
//                 <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
//                 <div className="fixed top-40 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>

//                 <style>{`
//                     @keyframes blob {
//                         0%, 100% { transform: translate(0, 0) scale(1); }
//                         25% { transform: translate(20px, -50px) scale(1.1); }
//                         50% { transform: translate(-20px, 20px) scale(0.9); }
//                         75% { transform: translate(50px, 50px) scale(1.05); }
//                     }

//                     .animate-blob {
//                         animation: blob 7s infinite;
//                     }

//                     .animation-delay-2000 {
//                         animation-delay: 2s;
//                     }
//                 `}</style>
//             </div>
//             <Footer />
//         </>
//     );
// }
import { useEffect, useState } from "react";
import { X, Send, Heart, Share2, MessageCircle, Search, Filter, Clock, Play, Sparkles } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { baseUrl } from "../../Baseurl";

const BASE_URL = `${baseUrl}/instapost`;

export default function AllReels() {
    const [reels, setReels] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [topic, setTopic] = useState("ALL");
    const [sort, setSort] = useState("LATEST");
    const [activeReel, setActiveReel] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        fetchReels();
    }, []);

    const fetchReels = async () => {
        try {
            const response = await fetch(`${BASE_URL}/content?type=REEL`);
            const data = await response.json();
            setReels(data);
            setFiltered(data);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    useEffect(() => {
        let data = [...reels];

        if (topic !== "ALL") {
            data = data.filter(r => r.topic === topic);
        }

        if (search) {
            data = data.filter(r =>
                `${r.title} ${r.description} ${r.topic}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        data.sort((a, b) =>
            sort === "LATEST"
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : new Date(a.createdAt) - new Date(b.createdAt)
        );

        setFiltered(data);
    }, [search, topic, sort, reels]);

    const topics = ["ALL", ...new Set(reels.map(r => r.topic))];

    const openReel = async (reel) => {
        // Fetch latest comments from server
        try {
            const response = await fetch(`${BASE_URL}/content/${reel._id}/comments`);
            const data = await response.json();
            setActiveReel({ ...reel, comments: data.comments || [] });
        } catch (err) {
            console.error('Error fetching comments:', err);
            setActiveReel(reel);
        }
    };

    const handleAddComment = async (reelId) => {
        if (!newComment.trim() || !userName.trim()) {
            alert('Please enter your name and comment');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/content/${reelId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName,
                    text: newComment
                })
            });

            if (response.ok) {
                const data = await response.json();
                // Refresh the active reel to show new comment
                const updatedReel = {
                    ...activeReel,
                    comments: [...(activeReel.comments || []), data.comment]
                };
                setActiveReel(updatedReel);

                // Update reels list
                setReels(reels.map(r => r._id === reelId ? updatedReel : r));

                setNewComment("");
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to add comment');
            }
        } catch (err) {
            console.error('Error adding comment:', err);
            alert('Failed to add comment');
        }
    };

    const handleLike = async (reelId) => {
        // Check if user already liked (stored in localStorage)
        const likedKey = `liked_${reelId}`;
        if (localStorage.getItem(likedKey)) {
            return; // Already liked
        }

        try {
            const response = await fetch(`${BASE_URL}/content/${reelId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ increment: true })
            });

            if (response.ok) {
                const data = await response.json();

                // Update local state
                setReels(reels.map(r =>
                    r._id === reelId ? { ...r, likesCount: data.likesCount } : r
                ));

                if (activeReel && activeReel._id === reelId) {
                    setActiveReel({ ...activeReel, likesCount: data.likesCount });
                }

                // Mark as liked in localStorage
                localStorage.setItem(likedKey, 'true');
            }
        } catch (err) {
            console.error('Error liking reel:', err);
        }
    };

    const handleShare = (reel) => {
        if (navigator.share) {
            navigator.share({
                title: reel.title,
                text: reel.description,
                url: window.location.href
            });
        } else {
            // Fallback: copy link to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const isUserLiked = (reelId) => {
        return localStorage.getItem(`liked_${reelId}`) !== null;
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950">
                <div className="bg-white/80 dark:bg-gray-950 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-40 pt-12">
                    <div className="container mx-auto px-4 py-8">
                        {/* Badge */}
                        <div className="flex justify-center mb-6">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg">
                                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
                                <span className="text-purple-700 dark:text-purple-300 font-semibold">Educational Content</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2">
                            <span className="text-gray-800 dark:text-gray-100">All Educational</span>{' '}
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                Reels
                            </span>
                        </h1>
                        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
                            Explore our collection of learning content
                        </p>

                        {/* Filters */}
                        <div className="container mx-auto px-4 pt-8">
                            <div className="flex flex-col lg:flex-row gap-4 max-w-5xl mx-auto">
                                {/* Search */}
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search reels..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Topic Filter */}
                                <div className="relative">
                                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
                                    <select
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        className="w-full lg:w-[200px] pl-12 pr-8 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-gray-800 dark:text-gray-200 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none cursor-pointer appearance-none transition-colors"
                                    >
                                        {topics.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort */}
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
                                    <select
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                        className="w-full lg:w-[180px] pl-12 pr-8 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-gray-800 dark:text-gray-200 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none cursor-pointer appearance-none transition-colors"
                                    >
                                        <option value="LATEST">Latest First</option>
                                        <option value="OLDEST">Oldest First</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="container mx-auto px-4 py-6">
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        Showing <span className="font-bold text-purple-600 dark:text-purple-400">{filtered.length}</span> {filtered.length === 1 ? 'reel' : 'reels'}
                    </p>
                </div>

                {/* Reels Grid */}
                <div className="container mx-auto px-4 pb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {filtered.map(item => (
                            <div
                                key={item._id}
                                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700"
                                onClick={() => openReel(item)}
                            >
                                <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                                    {/* ✅ FIXED: Use Cloudinary URL directly */}
                                    <video
                                        className="w-full h-full object-cover"
                                        muted
                                        loop
                                        playsInline
                                    >
                                        <source src={item.fileUrl} />
                                    </video>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform">
                                                <Play className="w-8 h-8 text-purple-600 dark:text-purple-400 ml-1" fill="currentColor" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="font-bold text-white text-lg mb-1 line-clamp-2">{item.title}</h3>
                                            <p className="text-white/90 text-sm line-clamp-2">{item.description}</p>
                                        </div>
                                    </div>

                                    {/* Topic Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full text-xs font-semibold text-purple-600 dark:text-purple-400 border-2 border-purple-200 dark:border-purple-700">
                                            {item.topic}
                                        </span>
                                    </div>

                                    {/* Stats */}
                                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full px-2.5 py-1.5 flex items-center gap-1.5 border-2 border-red-200 dark:border-red-800">
                                            <Heart className="w-4 h-4 text-red-500 dark:text-red-400" fill="currentColor" />
                                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{item.likesCount || 0}</span>
                                        </div>
                                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full px-2.5 py-1.5 flex items-center gap-1.5 border-2 border-blue-200 dark:border-blue-800">
                                            <MessageCircle className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{(item.comments || []).length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold mb-2">No reels found</p>
                            <p className="text-gray-400 dark:text-gray-500">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>

                {/* Modal */}
                {activeReel && (
                    <div className="fixed inset-0 bg-gray-950/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="w-full max-w-7xl h-[90vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveReel(null)}
                                className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-lg transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Left - Video Section */}
                            <div className="flex-1 bg-black flex items-center justify-center lg:border-r border-gray-200 dark:border-gray-700">
                                <div className="w-full h-full flex items-center justify-center p-4">
                                    {/* ✅ FIXED: Use Cloudinary URL directly */}
                                    <video
                                        controls
                                        autoPlay
                                        loop
                                        className="w-full h-full object-contain rounded-2xl"
                                    >
                                        <source src={activeReel.fileUrl} />
                                    </video>
                                </div>
                            </div>

                            {/* Right - Details & Comments Section */}
                            <div className="w-full lg:w-[450px] bg-white dark:bg-gray-900 flex flex-col">
                                {/* Header */}
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold mb-3 border-2 border-purple-200 dark:border-purple-700">
                                        {activeReel.topic}
                                    </span>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                                        {activeReel.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {activeReel.description}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => handleLike(activeReel._id)}
                                            disabled={isUserLiked(activeReel._id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${isUserLiked(activeReel._id)
                                                ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 cursor-not-allowed'
                                                : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50'
                                                }`}
                                        >
                                            <Heart className="w-5 h-5" fill={isUserLiked(activeReel._id) ? "currentColor" : "none"} />
                                            <span>{activeReel.likesCount || 0}</span>
                                        </button>
                                        <button
                                            onClick={() => handleShare(activeReel)}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 font-semibold transition-all"
                                        >
                                            <Share2 className="w-5 h-5" />
                                            Share
                                        </button>
                                    </div>
                                </div>

                                {/* Comments */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-950">
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2 sticky top-0 bg-gray-50 dark:bg-gray-950 pb-2">
                                        <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        Comments ({(activeReel.comments || []).length})
                                    </h3>

                                    {(activeReel.comments || []).map((comment, index) => (
                                        <div key={comment._id || index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
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

                                    {(activeReel.comments || []).length === 0 && (
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
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none mb-2 transition-colors"
                                    />
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Add a comment..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment(activeReel._id)}
                                            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none transition-colors"
                                        />
                                        <button
                                            onClick={() => handleAddComment(activeReel._id)}
                                            disabled={!newComment.trim() || !userName.trim()}
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
                <div className="fixed top-40 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>

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
            <Footer />
        </>
    );
}