
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Trophy, Code, Filter, Shuffle, Zap, TrendingUp, BookOpen, Star, Edit, ExternalLink, Target, CheckCircle2, Search, X, Sparkles, Building2 } from 'lucide-react';
import { baseUrl } from "../../Baseurl";
import Sheetheading from "../Sriversdecomponents/Sheetheading";
import Sheetproblems from "../Sriversdecomponents/Sheetproblems";
import NoteModal from '../Sriversdecomponents/Keepnote';
import Navbar from "../Navbar";
import Breadcrumb from "../Common/Breadcrumb";
import Footer from "../Footer";
import Skeleton1 from "../Common/Skeleton";

const Top100dsaProb = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checkboxes, setCheckboxes] = useState({});
    const [starredProblems, setStarredProblems] = useState({});
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [filteredSheetProblems, setFilteredSheetProblems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNoteKey, setCurrentNoteKey] = useState('');
    const [searchTerm, setSearchTerm] = useState("");

    // Load states from localStorage when the component mounts
    useEffect(() => {
        const savedCheckboxes = JSON.parse(localStorage.getItem('checkboxes')) || {};
        const savedStarredProblems = JSON.parse(localStorage.getItem('starredProblems')) || {};
        setCheckboxes(savedCheckboxes);
        setStarredProblems(savedStarredProblems);
    }, []);

    // Save checkboxes state to localStorage when it's updated
    useEffect(() => {
        localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
    }, [checkboxes]);

    // Save starred problems state to localStorage when it's updated
    useEffect(() => {
        localStorage.setItem('starredProblems', JSON.stringify(starredProblems));
    }, [starredProblems]);

    useEffect(() => {
        const getBlogs = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${baseUrl}/sdeproblem`);
                const filteredData = res.data.filter(item =>
                    item.contentFor.split(',').map(value => value.trim()).includes("top100")
                );
                const sortedData = filteredData.sort((a, b) => a.id - b.id);
                setData(sortedData);
                setFilteredSheetProblems(sortedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        getBlogs();
    }, []);

    // Filter problems based on search term
    useEffect(() => {
        let filtered = data;

        // Apply level filter
        if (selectedLevel && selectedLevel !== 'Random') {
            filtered = filtered.filter(problem => problem.Level === selectedLevel);
        }

        // Apply search filter
        if (searchTerm.trim()) {
            filtered = filtered.filter(problem =>
                problem.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredSheetProblems(filtered);
    }, [searchTerm, selectedLevel, data]);

    const handleLevelClick = (level) => {
        setSelectedLevel(level);
        if (level === 'Random') {
            const randomProblem = data[Math.floor(Math.random() * data.length)];
            setFilteredSheetProblems(randomProblem ? [randomProblem] : []);
        } else if (level) {
            const filtered = data.filter(problem => problem.Level === level);
            setFilteredSheetProblems(filtered);
        } else {
            setFilteredSheetProblems(data);
        }
    };

    const solvedCount = Object.values(checkboxes).filter(Boolean).length;
    const starredCount = Object.values(starredProblems).filter(Boolean).length;
    const progressPercentage = data.length > 0 ? Math.round((solvedCount / data.length) * 100) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950">
            <Navbar />

            {/* Header Section */}
            <div className="bg-transparent dark:bg-transparent">
                <div className="container mx-auto px-4 pt-2">
                    <Breadcrumb />

                    {/* Badge */}
                    <div className="flex justify-center mb-6 mt-4">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg backdrop-blur-xl">
                            <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
                            <span className="text-purple-700 dark:text-purple-300 font-semibold">Top 100 Collection</span>
                            <Sparkles className="w-5 h-5 text-pink-500 dark:text-pink-400" />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2">
                        <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                            Top 50
                        </span>{' '}
                        <span className="text-gray-800 dark:text-white">Coding Problems For Interview</span>
                    </h1>

                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-8">
                        Master the most important problems for technical interviews
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mb-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search problems by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-12 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 transition-all"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {loading ? (
                    <Skeleton1 />
                ) : (
                    <div className="space-y-6">
                        {/* Level Filters Card */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-300 dark:border-gray-700 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <Filter className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Filter by Difficulty</h3>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-6">
                                <button
                                    onClick={() => handleLevelClick('Random')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-gray-500/50 transition-all transform hover:scale-105"
                                >
                                    <Shuffle className="w-4 h-4" />
                                    Random
                                </button>
                                <button
                                    onClick={() => handleLevelClick('Easy')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-green-500/50 transition-all transform hover:scale-105"
                                >
                                    <Zap className="w-4 h-4" />
                                    Easy
                                </button>
                                <button
                                    onClick={() => handleLevelClick('Medium')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-yellow-500/50 transition-all transform hover:scale-105"
                                >
                                    <TrendingUp className="w-4 h-4" />
                                    Medium
                                </button>
                                <button
                                    onClick={() => handleLevelClick('Hard')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-red-500/50 transition-all transform hover:scale-105"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Hard
                                </button>
                                {selectedLevel && (
                                    <button
                                        onClick={() => {
                                            setSelectedLevel(null);
                                            setFilteredSheetProblems(data);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear Filter
                                    </button>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 text-center backdrop-blur-xl">
                                    <Target className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                        {filteredSheetProblems.length}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Total Problems</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800 text-center backdrop-blur-xl">
                                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                                    <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        {solvedCount}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Solved</p>
                                </div>
                                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800 text-center backdrop-blur-xl">
                                    <Star className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2 fill-current" />
                                    <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                                        {starredCount}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Starred</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800 text-center backdrop-blur-xl">
                                    <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        {progressPercentage}%
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Progress</p>
                                </div>
                            </div>
                        </div>

                        {/* Problems Table */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-300 dark:border-gray-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <Sheetheading />
                                    </thead>
                                    <tbody>
                                        {filteredSheetProblems.map((item) => (
                                            <Sheetproblems
                                                key={item.id}
                                                item={item}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {filteredSheetProblems.length === 0 && (
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                                <Code className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    {searchTerm ? 'No problems found matching your search.' : 'No problems found for this filter'}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Note Modal */}
            {isModalOpen && (
                <NoteModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    noteKey={currentNoteKey}
                />
            )}

            {/* Decorative Floating Blobs */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
            <div className="fixed top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
            <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

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
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <Footer />
        </div>
    );
};

export default Top100dsaProb;