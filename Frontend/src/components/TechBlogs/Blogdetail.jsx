
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CodeSnippet from "../CodeSnippet/CodeSnippet";
import Navbar from '../Navbar';
import Footer from '../Footer';
import Breadcrumb from '../Common/Breadcrumb';
import { baseUrl } from '../../Baseurl';
import Skeleton1 from '../Common/Skeleton';
import { ChevronRight, Code2, Lightbulb, Rocket, Award, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeApproach, setActiveApproach] = useState(0);
    const [showCode, setShowCode] = useState(false);

    useEffect(() => {
        const getBlogData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/blog`);
                const foundItem = res.data.find((blogItem) => blogItem.id.toString() === id);
                setItem(foundItem);
                setItems(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        getBlogData();
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <Breadcrumb />
                <Skeleton1 />
                <Footer />
            </>
        );
    }

    const approaches = [
        {
            title: "Brute Force",
            explanation: item.explanation,
            code: item.code,
            icon: <Lightbulb className="w-6 h-6" />,
            color: "from-red-500 to-orange-500",
            badge: "Basic"
        },
        {
            title: "Better Approach",
            explanation: item.explanation2,
            code: item.code2,
            icon: <Rocket className="w-6 h-6" />,
            color: "from-yellow-500 to-amber-500",
            badge: "Improved"
        },
        {
            title: "Optimal Solution",
            explanation: item.explanation3,
            code: item.code3,
            icon: <Award className="w-6 h-6" />,
            color: "from-green-500 to-emerald-500",
            badge: "Best"
        }
    ];

    const currentApproach = approaches[activeApproach];

    const handleCardClick = (id) => navigate(`/detail/${id}`);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <Breadcrumb />

                {/* Problem Header - Full Width Banner */}
                <div className="bg-transparent dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-4 py-12 max-w-7xl">
                        <div className="flex items-start justify-between gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-bold">
                                        DSA Problem
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        Active
                                    </div>
                                </div>
                                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                                    {item.header}
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
                                    Explore multiple solution approaches from basic to optimal
                                </p>
                            </div>

                            {/* Solution Count Badge */}
                            <div className="hidden md:block">
                                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl">
                                    <p className="text-4xl mb-1">3</p>
                                    <p className="text-sm font-medium opacity-90">Solutions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Split Panel Design */}
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left Sidebar - Approach Navigator */}
                        <div className="lg:col-span-3">
                            <div className="sticky top-6 space-y-3">
                                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                                    Approaches
                                </h3>
                                {approaches.map((approach, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setActiveApproach(index);
                                            setShowCode(false);
                                        }}
                                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${activeApproach === index
                                            ? `bg-gradient-to-r ${approach.color} text-white shadow-lg`
                                            : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:shadow-md border border-gray-200 dark:border-gray-800'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`${activeApproach === index ? 'text-white' : 'text-gray-400'}`}>
                                                {approach.icon}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-sm mb-0.5">{approach.title}</p>
                                                <p className={`text-xs ${activeApproach === index ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                                                    {approach.badge}
                                                </p>
                                            </div>
                                            {activeApproach === index && (
                                                <CheckCircle2 className="w-5 h-5" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-9">
                            {/* Approach Content Card */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg mt-10 mb-6">
                                {/* Header */}
                                <div className={`bg-gradient-to-r ${currentApproach.color} p-6 text-white`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        {currentApproach.icon}
                                        <h2 className="text-2xl font-semibold">{currentApproach.title}</h2>
                                    </div>
                                    <p className="text-white/90 text-sm">
                                        {currentApproach.badge} approach to solve this problem
                                    </p>
                                </div>

                                {/* Explanation */}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${currentApproach.color} flex items-center justify-center text-white text-xs font-bold`}>
                                            1
                                        </span>
                                        Explanation
                                    </h3>
                                    {currentApproach.explanation && (
                                        <div className="prose prose-gray dark:prose-invert max-w-none">
                                            {currentApproach.explanation.split('\n').map((line, idx) => (
                                                <p key={idx} className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                                                    {line.trim()}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Code Section */}
                                {currentApproach.code && (
                                    <div className="border-t border-gray-200 dark:border-gray-800 p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${currentApproach.color} flex items-center justify-center text-white text-xs font-bold`}>
                                                    2
                                                </span>
                                                Implementation
                                            </h3>
                                            <button
                                                onClick={() => setShowCode(!showCode)}
                                                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${showCode
                                                    ? `bg-gradient-to-r ${currentApproach.color} text-white shadow-lg`
                                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-md'
                                                    }`}
                                            >
                                                {showCode ? 'Hide Code' : 'Show Code'}
                                            </button>
                                        </div>
                                        {showCode && (
                                            <div className="animate-fadeIn">
                                                <CodeSnippet codeString={currentApproach.code} />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Navigation Arrows */}
                            <div className="flex items-center justify-between mb-12">
                                <button
                                    onClick={() => setActiveApproach(Math.max(0, activeApproach - 1))}
                                    disabled={activeApproach === 0}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeApproach === 0
                                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                        : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 hover:shadow-lg'
                                        }`}
                                >
                                    ← Previous
                                </button>
                                <button
                                    onClick={() => setActiveApproach(Math.min(2, activeApproach + 1))}
                                    disabled={activeApproach === 2}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeApproach === 2
                                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl'
                                        }`}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Problems Section */}
                {/* <div className="bg-gradient-to-br from-transparent to-transparent dark:from-gray-950 dark:to-gray-950 py-16 border-t border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-3">
                                More Problems
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Continue your learning journey
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {items
                                .filter(blogItem => blogItem.id.toString() !== id)
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .slice(0, 4)
                                .map((blogItem, index) => {
                                    const colors = [
                                        'from-red-500 to-orange-500',
                                        'from-blue-500 to-cyan-500',
                                        'from-green-500 to-emerald-500',
                                        'from-purple-500 to-pink-500'
                                    ];
                                    return (
                                        <div
                                            key={blogItem.id}
                                            onClick={() => handleCardClick(blogItem.id)}
                                            className="group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 cursor-pointer"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                    <Code2 className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                                                        {blogItem.header}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                                                        {truncateText(blogItem.explanation, 100)}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                                                        View Solution
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>

                        <div className="text-center">
                            <a href='/Technicalblog'>
                                <button className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                    Explore All Problems
                                    <ExternalLink className="w-5 h-5" />
                                </button>
                            </a>
                        </div>
                    </div>
                </div> */}

                {/* Contribute CTA */}
                <div className="container mx-auto px-4 py-16 max-w-5xl">
                    <div className="relative rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-90"></div>
                        <div className="relative p-12 text-center text-white">
                            <Award className="w-16 h-16 mx-auto mb-6" />
                            <h3 className="text-3xl font-semibold mb-4">Share Your Solution</h3>
                            <p className="text-green-50 text-lg mb-8 max-w-2xl mx-auto">
                                Help the community by contributing your unique approach to solving problems
                            </p>
                            <a href="/Contibuteblog">
                                <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300">
                                    Contribute Now
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

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

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </>
    );
};

export default BlogDetail;