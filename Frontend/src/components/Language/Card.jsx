

import React, { useState } from "react";
import { ArrowRight, Download, Eye, Star, Lock } from "lucide-react";

const Card = ({ item, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isFree = item.category === 'Free';

    // Cycle through 8 different color gradients based on card index
    const getGradientByIndex = (idx) => {
        const gradients = [
            // 1st card - Red
            { gradient: "from-red-500 to-orange-600", bgGradient: "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20" },
            // 2nd card - Green
            { gradient: "from-green-500 to-emerald-600", bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20" },
            // 3rd card - Yellow
            { gradient: "from-yellow-500 to-amber-600", bgGradient: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20" },
            // 4th card - Blue
            { gradient: "from-blue-500 to-cyan-600", bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20" },
            // 5th card - Purple
            { gradient: "from-purple-600 to-pink-600", bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20" },
            // 6th card - Orange
            { gradient: "from-orange-500 to-red-500", bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20" },
            // 7th card - Teal
            { gradient: "from-teal-500 to-cyan-600", bgGradient: "from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20" },
            // 8th card - Indigo
            { gradient: "from-indigo-600 to-purple-600", bgGradient: "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20" }
        ];
        return gradients[idx % 8]; // Cycle through 8 colors
    };

    const { gradient, bgGradient } = getGradientByIndex(index);

    return (
        <a
            href={item.link}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="block group"
        >
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700 h-full">
                {/* Animated Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                {/* Category/Price Badge */}
                <div className="absolute top-4 right-4 z-10">
                    {isFree ? (
                        <span className="bg-green-500 dark:bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 border-2 border-green-400 dark:border-green-500">
                            <Star className="w-3 h-3" fill="currentColor" />
                            Free
                        </span>
                    ) : (
                        <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1 border-2 border-red-400 dark:border-red-500">
                            <Lock className="w-3 h-3" />
                            ${item.price}
                        </span>
                    )}
                </div>

                {/* Card Content */}
                <div className="relative">
                    {/* Icon Section with Gradient Background */}
                    <div className={`bg-gradient-to-br ${bgGradient} backdrop-blur-sm p-8 border-b-2 border-gray-200 dark:border-gray-700 relative overflow-hidden`}>
                        {/* Decorative Elements */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-2xl`}></div>
                        <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-xl`}></div>

                        <div className="relative flex justify-center items-center">
                            {/* Icon Container */}
                            <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-2xl shadow-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-14 h-14 object-contain"
                                />
                            </div>
                        </div>

                        {/* Floating Action Badge */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className={`bg-gradient-to-r ${gradient} text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg`}>
                                <Eye className="w-3 h-3" />
                                Quick View
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-3">
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all">
                            {item.name}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-1">
                            {item.title}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                <span>5K+ views</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 dark:text-yellow-400" fill="currentColor" />
                                <span>4.8</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r ${gradient} text-white rounded-xl font-semibold shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
                            {isFree ? 'View Now' : 'Learn More'}
                            <ArrowRight className={`w-5 h-5 transform transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                        </button>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className={`h-1 bg-gradient-to-r ${gradient}`}></div>
                </div>
            </div>
        </a>
    );
};

export default Card;