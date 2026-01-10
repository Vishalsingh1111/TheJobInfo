

import React, { useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Award, Zap, Clock, Star } from 'lucide-react';

const resources = [
    {
        title: "DSA Sheets",
        description: "Boost your DSA skills with our handy cheat sheets.",
        buttonText: "Try it free",
        icon: "💻",
        link: "/Sheet",
        tag: "Trending",
        tagColor: "from-red-500 to-pink-500",
        bgGradient: "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
    },
    {
        title: "Coding Languages",
        description: "Design better systems with our simplified approach.",
        buttonText: "Try it free",
        icon: "🚀",
        link: "/Languages",
        tag: "Top Rated",
        tagColor: "from-blue-500 to-cyan-500",
        bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    {
        title: "Problems Solutions",
        description: "Dive Deep into Tech Innovation with Our Amazing Solution.",
        buttonText: "Try it free",
        icon: "💡",
        link: "/Technical-Blog",
        tag: "Top Rated",
        tagColor: "from-yellow-500 to-orange-500",
        bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
    },
    {
        title: "CS Fundamentals",
        description: "Demystify CS topics with our easy-to-understand guides.",
        buttonText: "Try it free",
        icon: "📚",
        link: "/CS-Fundamental",
        tag: "Quick Read",
        tagColor: "from-green-500 to-emerald-500",
        bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    },
    {
        title: "Quizes/Handson",
        description: "Level up your coding with participating in Quizes and Handson.",
        buttonText: "Try it free",
        icon: "⚡",
        link: "/Contest-Solution",
        tag: "Live Update",
        tagColor: "from-orange-500 to-red-500",
        bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
    },
    {
        title: "Roadmaps ",
        description: "Follow this to be  Ready for your dream job.",
        buttonText: "Try it free",
        icon: "🎯",
        link: "/Companies_Preaparation_Sheet",
        tag: "Upcoming",
        tagColor: "from-purple-500 to-indigo-500",
        bgGradient: "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20"
    },
];

const ResourceCard = ({ title, description, buttonText, icon, link, tag, tagColor, bgGradient }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a
            href={link}
            className="block group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated Background Glow */}
            < div className={`absolute inset-0 bg-gradient-to-br ${tagColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div >

            {/* Card */}
            < div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700" >
                {/* Top Tag */}
                < div className="absolute top-5 right-4 z-10" >
                    <span className={`px-3 py-2 bg-gradient-to-r ${tagColor} text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1`}>
                        {tag === "Trending" && <TrendingUp className="w-3 h-3" />}
                        {tag === "Top Rated" && <Star className="w-3 h-3" />}
                        {tag === "Quick Read" && <Zap className="w-3 h-3" />}
                        {tag === "Live Update" && <Clock className="w-3 h-3" />}
                        {tag === "Upcoming" && <Award className="w-3 h-3" />}
                        {tag}
                    </span>
                </div >

                {/* Icon Section with Gradient Background */}
                < div className={`bg-gradient-to-br ${bgGradient} backdrop-blur-sm p-6 border-b-2 border-gray-200 dark:border-gray-700`}>
                    <div className="relative">
                        <div className={`w-[100px] h-[100px] bg-white dark:bg-gray-700 rounded-2xl shadow-xl flex items-center justify-center text-6xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                            {icon}
                        </div>
                        {/* Decorative circles */}
                        <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${tagColor} rounded-full opacity-20 blur-md`}></div>
                        <div className={`absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-br ${tagColor} rounded-full opacity-30 blur-md`}></div>
                    </div>
                </div >

                {/* Content Section */}
                < div className="p-6" >
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                        {title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        {description}
                    </p>

                    {/* CTA Button */}
                    <button className={`w-content flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r ${tagColor} text-white rounded-xl font-semibold shadow-md group-hover:shadow-lg group-hover:shadow-${tagColor}/50 transition-all duration-300 transform group-hover:scale-105`}>
                        {buttonText}
                        <ArrowRight className={`w-5 h-5 transform transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                    </button>
                </div >
                {/* Accent Line */}
                < div className={`h-1 bg-gradient-to-r ${tagColor}`}></div >
            </div >
        </a >
    );
};

const ResourceGrid = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
            {/* Header Section */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="container mx-auto px-4 py-12">
                    {/* Badge */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:scale-105 transition-transform">
                            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
                            <span className="text-purple-700 dark:text-purple-300 font-semibold text-sm">Premium Learning Resources</span>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-center text-4xl md:text-5xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Courses Offered For Your{' '}
                        <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                            Preparation
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                        Choose from our comprehensive collection of resources designed to accelerate your learning journey
                    </p>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="text-center">
                            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">6</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Courses</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">1000+</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Problems</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">500+</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Solutions</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">24/7</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Access</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {resources.map((resource, index) => (
                        <ResourceCard key={index} {...resource} />
                    ))}
                </div>
            </div>

            {/* Decorative Elements */}
            {/* <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
            <div className="fixed top-40 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
            <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div> */}

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

export default ResourceGrid;