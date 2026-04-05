
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Card from './Card';
// import { baseUrl } from '../../Baseurl';
// import Skeleton1 from '../Common/Skeleton';
// import Breadcrumb from '../Common/Breadcrumb';
// import { Code, Sparkles, TrendingUp, Zap, Download, Filter, BookOpen } from "lucide-react";

// function Content() {
//     const [note, setNote] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filter, setFilter] = useState("All");

//     useEffect(() => {
//         const getNote = async () => {
//             try {
//                 const res = await axios.get(`${baseUrl}/note`);
//                 setNote(res.data);
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         getNote();
//     }, []);

//     // Filter options
//     const filterOptions = ["All", "Free", "Paid"];

//     // Filter notes based on selected filter
//     const filteredNotes = filter === "All"
//         ? note
//         : note.filter(item => item.category === filter);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-slate-950 dark:to-gray-950 py-6">
//             <div className="container mx-auto max-w-7xl px-4">
//                 <Breadcrumb />

//                 {/* Header Section */}
//                 <div className="text-center mb-8 mt-8">
//                     {/* Badge */}
//                     <div className="flex justify-center mb-6 animate-fade-in">
//                         <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg">
//                             <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
//                             <span className="text-purple-700 dark:text-purple-300 font-semibold">Learning Resources</span>
//                             <Sparkles className="w-5 h-5 text-pink-500 dark:text-pink-400" />
//                         </div>
//                     </div>

//                     {/* Main Heading */}
//                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4">
//                         Notes & Resources{' '}
//                         <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
//                             Instant Learning
//                         </span>
//                     </h1>

//                     {/* Subtitle */}
//                     <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
//                         Master programming with our comprehensive guides. Learn faster, code better.
//                     </p>
//                 </div>

//                 {/* Filter Tabs */}
//                 <div className="flex justify-center mb-6">
//                     <div className="inline-flex bg-white dark:bg-gray-800/80 dark:backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-1">
//                         {filterOptions.map((option) => (
//                             <button
//                                 key={option}
//                                 onClick={() => setFilter(option)}
//                                 className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${filter === option
//                                     ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
//                                     : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
//                                     }`}
//                             >
//                                 {option}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Stats Bar */}
//                 <div className="bg-white dark:bg-gray-800/80 dark:backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 mb-12 max-w-3xl mx-auto">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                         <div className="text-center">
//                             <div className="flex items-center justify-center gap-2 mb-2">
//                                 <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//                                 <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                                     {note.length}
//                                 </p>
//                             </div>
//                             <p className="text-gray-600 dark:text-gray-300 font-semibold">Resources</p>
//                         </div>
//                         <div className="text-center">
//                             <div className="flex items-center justify-center gap-2 mb-2">
//                                 <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                                 <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
//                                     {note.filter(item => item.category === 'Free').length}
//                                 </p>
//                             </div>
//                             <p className="text-gray-600 dark:text-gray-300 font-semibold">Free</p>
//                         </div>
//                         <div className="text-center">
//                             <div className="flex items-center justify-center gap-2 mb-2">
//                                 <Download className="w-5 h-5 text-green-600 dark:text-green-400" />
//                                 <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//                                     50K+
//                                 </p>
//                             </div>
//                             <p className="text-gray-600 dark:text-gray-300 font-semibold">Downloads</p>
//                         </div>
//                         <div className="text-center">
//                             <div className="flex items-center justify-center gap-2 mb-2">
//                                 <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
//                                 <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
//                                     24/7
//                                 </p>
//                             </div>
//                             <p className="text-gray-600 dark:text-gray-300 font-semibold">Access</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Results Count */}
//                 <div className="text-center mb-8">
//                     <p className="text-gray-600 dark:text-gray-300">
//                         Showing <span className="font-bold text-purple-600 dark:text-purple-400">{filteredNotes.length}</span> resource{filteredNotes.length !== 1 ? 's' : ''}
//                     </p>
//                 </div>

//                 {/* Content */}
//                 {loading ? (
//                     <Skeleton1 />
//                 ) : (
//                     <>
//                         {/* Cards Grid */}
//                         <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12 mx-10">
//                             {filteredNotes.map((item,index) => (
//                                 <Card key={item.id} item={item} />
//                             ))}
//                         </div>

//                         {/* Show More Button */}
//                         {filteredNotes.length > 0 && (
//                             <div className="text-center mb-16">
//                                 <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//                                     Show More Resources
//                                     <TrendingUp className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform" />
//                                 </button>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>

//             {/* Decorative Floating Blobs */}
//             <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
//             <div className="fixed top-40 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
//             <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

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
//         </div>
//     );
// }

// export default Content;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { baseUrl } from '../../Baseurl';
import Skeleton1 from '../Common/Skeleton';
import Breadcrumb from '../Common/Breadcrumb';
import { Code, Sparkles, TrendingUp, Zap, Download, Filter, BookOpen } from "lucide-react";

function Content() {
    const [note, setNote] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const getNote = async () => {
            try {
                const res = await axios.get(`${baseUrl}/note`);
                setNote(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getNote();
    }, []);

    // Filter options
    const filterOptions = ["All", "Free", "Paid"];

    // Filter notes based on selected filter
    const filteredNotes = filter === "All"
        ? note
        : note.filter(item => item.category === filter);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-slate-950 dark:to-gray-950 py-6">
            <div className="container mx-auto max-w-7xl px-4">
                <Breadcrumb />

                {/* Header Section */}
                <div className="text-center mb-8 mt-8">
                    {/* Badge */}
                    <div className="flex justify-center mb-6 animate-fade-in">
                        <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg">
                            <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
                            <span className="text-purple-700 dark:text-purple-300 font-semibold">Learning Resources</span>
                            <Sparkles className="w-5 h-5 text-pink-500 dark:text-pink-400" />
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4">
                        Notes & Resources{' '}
                        <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                            Instant Learning
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Master programming with our comprehensive guides. Learn faster, code better.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex bg-white dark:bg-gray-800/80 dark:backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-1">
                        {filterOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => setFilter(option)}
                                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${filter === option
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="bg-white dark:bg-gray-800/80 dark:backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 mb-12 max-w-3xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    {note.length}
                                </p>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-semibold">Resources</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    {note.filter(item => item.category === 'Free').length}
                                </p>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-semibold">Free</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Download className="w-5 h-5 text-green-600 dark:text-green-400" />
                                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    50K+
                                </p>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-semibold">Downloads</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                    24/7
                                </p>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-semibold">Access</p>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="text-center mb-8">
                    <p className="text-gray-600 dark:text-gray-300">
                        Showing <span className="font-bold text-purple-600 dark:text-purple-400">{filteredNotes.length}</span> resource{filteredNotes.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Content */}
                {loading ? (
                    <Skeleton1 />
                ) : (
                    <>
                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12 mx-10">
                            {filteredNotes.map((item, index) => (
                                <Card key={item.id} item={item} index={index} />
                            ))}
                        </div>

                        {/* Show More Button */}
                        {/* {filteredNotes.length > 0 && (
                            <div className="text-center mb-16">
                                <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                    Show More Resources
                                    <TrendingUp className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform" />
                                </button>
                            </div>
                        )} */}
                    </>
                )}
            </div>

            {/* Decorative Floating Blobs */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
            <div className="fixed top-40 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
            <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

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
            `}</style>
        </div>
    );
}

export default Content;