
import React from "react";
import { Code, Sparkles } from 'lucide-react';

export default function Skeleton1() {
    return (
        <div className="w-full py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Loading Animation Center */}
                <div className="flex flex-col items-center justify-center space-y-8 mb-12">
                    {/* Triple Rotating Loader */}
                    <div className="relative w-24 h-24">
                        {/* Outer rotating circle */}
                        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
                        {/* Middle rotating circle */}
                        <div className="absolute inset-2 border-4 border-transparent border-t-pink-500 border-l-red-500 rounded-full animate-spin-slow"></div>
                        {/* Inner pulsing circle */}
                        <div className="absolute inset-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse flex items-center justify-center">
                            <Code className="w-6 h-6 text-white animate-bounce" />
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className="text-center space-y-3">
                        <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                            Loading Content
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                </div>

                {/* Bottom Sparkle Effect */}
                <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2 text-purple-400 dark:text-purple-600">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        <span className="text-xl animate-pulse">Preparing your content...</span>
                        <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }

                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }

                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out forwards;
                    opacity: 0;
                }

                .animate-spin-slow {
                    animation: spin-slow 3s linear infinite;
                }
            `}</style>
        </div>
    );
}