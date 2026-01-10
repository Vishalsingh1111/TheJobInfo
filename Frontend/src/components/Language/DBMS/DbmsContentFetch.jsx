

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { baseUrl } from "../../../Baseurl";
import GetContent from "../GetContent";
import Skeleton1 from "../../Common/Skeleton";
import Breadcrumb from "../../Common/Breadcrumb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
    ChevronLeft,
    ChevronRight,
    Download,
    Code,
    Sparkles,
    FileText,
    Trophy,
    Target,
    Zap,
    BookMarked,
    Users,
    Star,
    Share2,
    Bookmark,
    CheckCircle2,
    MessageCircle
} from 'lucide-react';

const QUESTIONS_PER_PAGE = 10;

const SocialMediaPoster = () => {
    return (
        <div className="space-y-6 sticky top-8">
            {/* Social Cards */}
            <div className="bg-white dark:bg-gradient-to-br dark:from-gray-950 dark:to-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Share2 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Connect With Us</h3>
                </div>

                <div className="space-y-4">
                    {/* Telegram Card */}
                    <a
                        href="https://t.me/dcoder21575"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-5 border-2 border-blue-200 dark:border-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 hover:-translate-y-1"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                                <FontAwesomeIcon
                                    icon={faTelegram}
                                    className="text-3xl text-white"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">Join Telegram</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Get instant updates & solutions</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">10K+ Members</span>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </a>

                    {/* Instagram Card */}
                    <a
                        href="https://www.instagram.com/dcoder75/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block relative overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-5 border-2 border-pink-200 dark:border-pink-700 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50 hover:scale-105 hover:-translate-y-1"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="text-3xl text-white"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">Follow Instagram</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Daily coding tips & inspiration</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Star className="w-4 h-4 text-pink-600 dark:text-pink-400 fill-current" />
                                    <span className="text-xs font-semibold text-pink-600 dark:text-pink-400">25K+ Followers</span>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-pink-600 dark:text-pink-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </a>
                </div>
            </div >

            {/* Quick Actions Card */}
            < div className="bg-white dark:bg-gradient-to-br dark:from-gray-950 dark:to-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 backdrop-blur-xl" >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Quick Actions</h3>
                </div>

                <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all group">
                        <Bookmark className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bookmark Page</span>
                    </button>

                    <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all group">
                        <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Share Content</span>
                    </button>

                    <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-700 hover:shadow-lg transition-all group">
                        <MessageCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Ask Doubt</span>
                    </button>

                    <div className='flex-shrink-0'>
                        <a href="path-to-your-file.pdf" download>
                            <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg border border-red-200 dark:border-red-700 hover:shadow-lg transition-all group">
                                <Download className="w-5 h-5 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Download PDF</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div >

            {/* Study Tips Card */}
            < div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white" >
                <div className="flex items-center gap-3 mb-4">
                    <BookMarked className="w-6 h-6" />
                    <h3 className="text-lg font-bold">Pro Tip</h3>
                </div>
                <p className="text-sm leading-relaxed mb-4 text-purple-50">
                    Practice each question twice - once for understanding and once from memory!
                </p>
                <div className="flex items-center gap-2 text-xs text-purple-100">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Proven learning method</span>
                </div>
            </div >
        </div >
    );
};

const DbmsContentFetch = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/notecontent`);
                const filteredData = res.data.filter(item => item.category === "dbms");
                const sortedData = filteredData.sort((a, b) => a.id - b.id);
                setData(sortedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        getBlogs();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    useEffect(() => {
        const calculateProgress = () => {
            const totalQuestions = data.length;
            const questionsCompleted = (currentPage - 1) * QUESTIONS_PER_PAGE + Math.min(QUESTIONS_PER_PAGE, data.length - (currentPage - 1) * QUESTIONS_PER_PAGE);
            const progressPercentage = (questionsCompleted / totalQuestions) * 100;
            setProgress(progressPercentage);
        };
        calculateProgress();
    }, [currentPage, data.length]);

    const totalPages = Math.ceil(data.length / QUESTIONS_PER_PAGE);

    const paginatedData = data.slice(
        (currentPage - 1) * QUESTIONS_PER_PAGE,
        currentPage * QUESTIONS_PER_PAGE
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={`px-4 py-2 mx-1 rounded-lg font-semibold transition-all duration-300 ${currentPage === i
                            ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-110"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            for (let i = 1; i <= 2; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={`px-4 py-2 mx-1 rounded-lg font-semibold transition-all duration-300 ${currentPage === i
                            ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-110"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            }

            if (currentPage > 3) {
                pageNumbers.push(
                    <span key="ellipsis" className="px-4 py-2 mx-1 text-gray-500 dark:text-gray-400">
                        ...
                    </span>
                );
            }

            if (currentPage > 2 && currentPage < totalPages - 1) {
                pageNumbers.push(
                    <button
                        key={currentPage}
                        className="px-4 py-2 mx-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg shadow-lg font-semibold scale-110"
                        onClick={() => handlePageChange(currentPage)}
                    >
                        {currentPage}
                    </button>
                );
            }

            if (currentPage < totalPages - 2) {
                pageNumbers.push(
                    <span key="ellipsis2" className="px-4 py-2 mx-1 text-gray-500 dark:text-gray-400">
                        ...
                    </span>
                );
            }

            for (let i = totalPages - 1; i <= totalPages; i++) {
                if (i > 2) {
                    pageNumbers.push(
                        <button
                            key={i}
                            className={`px-4 py-2 mx-1 rounded-lg font-semibold transition-all duration-300 ${currentPage === i
                                ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-110"
                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }`}
                            onClick={() => handlePageChange(i)}
                        >
                            {i}
                        </button>
                    );
                }
            }
        }

        return pageNumbers;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-950">
            {/* Header Section */}
            <div className="bg-transparent">
                <div className="container mx-auto px-4">
                    <Breadcrumb />

                    {/* Badge */}
                    <div className="flex justify-center mb-6 mt-4">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 px-6 py-3 rounded-full border-2 border-blue-200 dark:border-blue-700 shadow-lg">
                            <Code className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
                            <span className="text-blue-700 dark:text-blue-300 font-semibold">Programming Interview Prep</span>
                            <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row justify-center items-center gap-6 px-4 lg:px-20'>
                        <div className='flex flex-col space-y-2'>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white">
                                Basic Interview Questions –{' '}
                                <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                                    DBMS
                                </span>
                            </h1>
                            <p className="text-gray-600 text-center dark:text-gray-300 text-lg">
                                Master the fundamentals with comprehensive explanations
                            </p>
                        </div>
                    </div>



                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 px-4 lg:px-20">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
                            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                {data.length}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Total Questions</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800 text-center">
                            <Target className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                {Math.min(currentPage * QUESTIONS_PER_PAGE, data.length)}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Questions Read</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
                            <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {totalPages}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Total Pages</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800 text-center">
                            <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                {QUESTIONS_PER_PAGE}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Per Page</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-8 px-4 lg:px-20">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                            <div
                                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 shadow-lg"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>Progress: {Math.round(progress)}%</span>
                            <span>Page {currentPage} of {totalPages}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <section className="container mx-auto px-4 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Content Area */}
                    <div className="flex-1 max-w-5xl">
                        {loading ? (
                            <div className="bg-white dark:bg-gradient-to-br dark:from-gray-950 dark:to-slate-900 rounded-2xl p-8 shadow-lg">
                                <Skeleton1 />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {paginatedData.map((item) => (
                                    <GetContent key={item.id} item={item} />
                                ))}
                            </div>
                        )}

                        {/* Enhanced Pagination Controls */}
                        <div className="mt-12 bg-white dark:bg-gradient-to-br dark:from-gray-950 dark:to-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex flex-wrap justify-center items-center gap-2">
                                <button
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-600"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Previous
                                </button>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {renderPageNumbers()}
                                </div>

                                <button
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-600"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Sidebar */}
                    <div className="lg:w-96 flex-shrink-0">
                        <SocialMediaPoster />
                    </div>
                </div>
            </section>

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
            `}</style>
        </div>
    );
};

export default DbmsContentFetch;