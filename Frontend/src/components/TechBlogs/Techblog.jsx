

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Blogcard from './Blogscard';
import Breadcrumb from '../Common/Breadcrumb';
import { baseUrl } from "../../Baseurl";
import Skeleton1 from "../Common/Skeleton";
import { Code, Sparkles, BookOpen, Search, SlidersHorizontal, Zap, Trophy, Target, Flame } from "lucide-react";

const Techblog = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("LATEST");
    const navigate = useNavigate();

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/blog`);
                const filtered = res.data.filter(item => item.category === "dsa");
                setData(filtered);
                setFilteredData(filtered);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        getBlogs();
    }, []);

    useEffect(() => {
        let result = [...data];

        if (search) {
            result = result.filter(item =>
                item.header.toLowerCase().includes(search.toLowerCase()) ||
                item.explanation.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (sortBy === "LATEST") {
            result.sort((a, b) => b.id - a.id);
        } else if (sortBy === "OLDEST") {
            result.sort((a, b) => a.id - b.id);
        }

        setFilteredData(result);
    }, [search, sortBy, data]);

    const handleCardClick = (id) => {
        navigate(`/detail/${id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-950">
            <div className="container mx-auto px-4 py-6">
                <Breadcrumb />

                {/* Hero Header with Magazine Style */}



                <div className="container mx-auto px-4 pt-2">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-950 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg mb-4">
                            <Flame className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
                            <span className="text-purple-700 dark:text-purple-300 font-semibold">DSA Masterclass</span>
                            <Sparkles className="w-5 h-5 text-pink-500 dark:text-pink-400" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                            Technical <span className="bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-400 dark:to-pink-500 bg-clip-text text-transparent">insights</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Technical insights and DSA mastery, all in one place.
                        </p>

                    </div>
                </div>



                {/* Search and Stats Row */}
                <div className="mb-12 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Search Box - Prominent */}
                        <div className="lg:col-span-2">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0"></div>
                                <div className="relative">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search problems, algorithms, data structures..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-purple-500 dark:focus:border-purple-500 transition-all duration-300 font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sort Selector - Compact */}
                        <div className="relative">
                            <SlidersHorizontal className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none z-10" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full pl-14 pr-10 py-5 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-all duration-300 font-medium appearance-none cursor-pointer"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: 'right 1.5rem center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '1.5em 1.5em'
                                }}
                            >
                                <option value="LATEST">Latest First</option>
                                <option value="OLDEST">Oldest First</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Stats Dashboard - Horizontal Cards */}
                {/* <div className="mb-12 max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard
                            icon={<BookOpen className="w-6 h-6" />}
                            value={data.length}
                            label="Problems"
                            gradient="from-purple-500 to-pink-500"
                        />
                        <StatCard
                            icon={<Target className="w-6 h-6" />}
                            value={filteredData.length}
                            label="Filtered"
                            gradient="from-blue-500 to-cyan-500"
                        />
                        <StatCard
                            icon={<Trophy className="w-6 h-6" />}
                            value="100%"
                            label="Free"
                            gradient="from-yellow-500 to-orange-500"
                        />
                        <StatCard
                            icon={<Zap className="w-6 h-6" />}
                            value="24/7"
                            label="Access"
                            gradient="from-green-500 to-emerald-500"
                        />
                    </div>
                </div> */}

                {/* Results Indicator */}
                <div className="mb-8 text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        <span className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                            {filteredData.length}
                        </span>
                        <span className="ml-2">problems ready to solve</span>
                    </p>
                </div>

                {/* Content */}
                {loading ? (
                    <Skeleton1 />
                ) : (
                    <>
                        {/* Cards Grid - Masonry Style */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto">
                            {filteredData.map((item, index) => (
                                <Blogcard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onClick={() => handleCardClick(item.id.toString())}
                                />
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredData.length === 0 && (
                            <div className="text-center py-20">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
                                    <Search className="w-12 h-12 text-purple-500 dark:text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No problems found</h3>
                                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Ambient Background Elements */}
            <div className="fixed top-0 right-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 w-96 h-96 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
    );
};

// Stat Card Component
const StatCard = ({ icon, value, label, gradient }) => (
    <div className="relative group">
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-300`}></div>
        <div className="relative bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            <div className={`text-transparent bg-gradient-to-br ${gradient} bg-clip-text mb-2`}>
                {icon}
            </div>
            <p className="text-2xl font-black text-gray-900 dark:text-white mb-0.5">{value}</p>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">{label}</p>
        </div>
    </div>
);

export default Techblog;
