
import React, { useEffect, useState } from 'react';
import { Code, Filter, Shuffle, Zap, TrendingUp, BookOpen, Sparkles, Target, CheckCircle2, Trophy, Star, X } from 'lucide-react';
import Sheetheading from '../Sriversdecomponents/Sheetheading';
import Sheetproblems from '../Sriversdecomponents/Sheetproblems';
import Breadcrumb from "../Common/Breadcrumb";
import Skeleton1 from "../Common/Skeleton";
import BASE_URL from "../../Baseurl";

// const BASE_URL = "http://localhost:4001";

function SheetViewer() {
    const [sheets, setSheets] = useState([]);
    const [selectedSheet, setSelectedSheet] = useState(null);
    const [sheetProblems, setSheetProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [loadingSheets, setLoadingSheets] = useState(true);
    const [loadingProblems, setLoadingProblems] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState('');

    useEffect(() => {
        const fetchSheets = async () => {
            try {
                const res = await fetch(`${BASE_URL}/sheet`);
                const data = await res.json();
                const sortedData = data.sort((a, b) => a.id - b.id);
                setSheets(sortedData);
                if (sortedData.length > 0) handleSheetClick(sortedData[0]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingSheets(false);
            }
        };
        fetchSheets();
    }, []);

    const handleSheetClick = async (sheet) => {
        setSelectedSheet(sheet);
        setSelectedLevel('');
        setLoadingProblems(true);
        try {
            const res = await fetch(`${BASE_URL}/sheetproblem`);
            const data = await res.json();
            const filtered = data.filter(item => item.topic === sheet.Topic);
            setSheetProblems(filtered);
            setFilteredProblems(filtered);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingProblems(false);
        }
    };

    const handleLevelClick = (level) => {
        setSelectedLevel(level);
        if (level === 'Random') {
            const random = sheetProblems[Math.floor(Math.random() * sheetProblems.length)];
            setFilteredProblems(random ? [random] : []);
        } else if (level) {
            const filtered = sheetProblems.filter(p => p.Level === level);
            setFilteredProblems(filtered);
        } else {
            setFilteredProblems(sheetProblems);
        }
    };

    const getStats = () => {
        const solvedCount = filteredProblems.filter(p => {
            const stored = localStorage.getItem(`checkbox-${p.name}`);
            return stored && JSON.parse(stored);
        }).length;

        const starredCount = filteredProblems.filter(p => {
            const stored = localStorage.getItem(`starred-${p.name}`);
            return stored && JSON.parse(stored);
        }).length;

        return { solvedCount, starredCount };
    };

    const { solvedCount, starredCount } = getStats();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-slate-950 dark:to-gray-950">
            {/* Header */}
            <div className="bg-transparent">
                <div className="container mx-auto px-4 pt-2">
                    <Breadcrumb />

                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 px-6 py-3 rounded-full border-2 border-red-200 dark:border-red-800 backdrop-blur-xl shadow-lg">
                            <Code className="w-5 h-5 text-red-600 dark:text-red-400 animate-pulse" />
                            <span className="text-red-700 dark:text-red-300 font-semibold">DSA Practice</span>
                            <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2">
                        <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                            SDE Sheet
                        </span>{' '}
                        <span className="text-gray-800 dark:text-white">Most Asked In Interview</span>
                    </h1>

                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-8">
                        Comprehensive collection of interview problems
                    </p>

                    {/* Topic Navigation */}
                    <div className="mt-8">
                        {loadingSheets ? (
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-4 border-red-200 border-t-red-600"></div>
                            </div>
                        ) : (
                            <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide px-4 lg:px-20">
                                {sheets.map(sheet => (
                                    <button
                                        key={sheet.id}
                                        onClick={() => handleSheetClick(sheet)}
                                        className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 backdrop-blur-xl ${selectedSheet?.id === sheet.id
                                            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/50 scale-105'
                                            : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-700 hover:border-red-300 hover:shadow-lg'
                                            }`}
                                    >
                                        {sheet.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {loadingProblems ? (
                    <Skeleton1 />
                ) : selectedSheet ? (
                    <div className="space-y-6">
                        {/* Level Filters */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl  border border-gray-300 dark:border-gray-700 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <Filter className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Filter by Difficulty</h3>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-6">
                                <button
                                    onClick={() => handleLevelClick('Random')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-gray-500/50 transition-all duration-300 transform hover:scale-105"
                                >
                                    <Shuffle className="w-4 h-4" />
                                    Random
                                </button>
                                <button
                                    onClick={() => handleLevelClick('Easy')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
                                >
                                    <Zap className="w-4 h-4" />
                                    Easy
                                </button>
                                <button
                                    onClick={() => handleLevelClick('Medium')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
                                >
                                    <TrendingUp className="w-4 h-4" />
                                    Medium
                                </button>
                                <button
                                    onClick={() => handleLevelClick('Hard')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Hard
                                </button>
                                {selectedLevel && (
                                    <button
                                        onClick={() => {
                                            setSelectedLevel('');
                                            setFilteredProblems(sheetProblems);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear
                                    </button>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 text-center backdrop-blur-xl">
                                    <Target className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                        {filteredProblems.length}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Total</p>
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
                                    <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                                        {selectedSheet.name}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Topic</p>
                                </div>
                            </div>
                        </div>

                        {/* Problems Table */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl  border border-gray-300 dark:border-gray-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <Sheetheading />
                                    </thead>
                                    <tbody>
                                        {filteredProblems.map(problem => (
                                            <Sheetproblems key={problem.id} item={problem} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {filteredProblems.length === 0 && (
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                                <Code className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No problems found</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <Skeleton1 />
                )}
            </div>

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
        </div>
    );
}

export default SheetViewer;