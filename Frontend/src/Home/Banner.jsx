
import React from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import SearchForm from '../components/Common/Searchbar';

function Banner() {
    return (
        <div className="relative min-h-screen pt-10 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-950 overflow-hidden">
            {/* Animated Background Blobs */}
            {/* <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-0 animate-blob pointer-events-none"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div> */}

            {/* Decorative Floating Blobs */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
            <div className="fixed top-40 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
            <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Badge */}
                <div className="flex justify-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
                        <span className="text-sm sm:text-base text-purple-700 dark:text-purple-300 font-semibold">Your Success Journey Starts Here</span>
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 dark:text-pink-400" />
                    </div>
                </div>

                {/* Search Form - Full Width */}
                <div className="w-full max-w-3xl mx-auto mb-6">
                    <SearchForm />
                </div>

                {/* Main Heading */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
                        <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 dark:from-red-400 dark:via-pink-400 dark:to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                            Gear Up For Success:
                        </span>
                        <br />
                        <span className="text-gray-800 dark:text-gray-100">
                            Your Ultimate
                        </span>
                        <br />
                        <span className="text-gray-800 dark:text-gray-100">
                            Preparation Hub!
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
                        Simplify complex concepts with our detailed programming notes and ace your interviews with expert-curated questions.
                        Master DSA through comprehensive sheets and hands-on projects, ensuring we meet your learning needs.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
                    <a href="#homecontentcard">
                        <button className="group bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-500 dark:to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-red-500/50 dark:hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-3">
                            Get Started
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </a>
                    <button className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-purple-600 dark:text-purple-400 border-2 border-purple-200 dark:border-purple-700 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold shadow-lg hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/50 hover:border-purple-400 dark:hover:border-purple-500 hover:scale-105 transition-all duration-300">
                        Watch Demo
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto px-4">
                    {[
                        { number: "10K+", label: "Students", icon: "👥", gradient: "from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400" },
                        { number: "500+", label: "Problems", icon: "💡", gradient: "from-yellow-500 to-orange-500 dark:from-yellow-400 dark:to-orange-400" },
                        { number: "50+", label: "Topics", icon: "📚", gradient: "from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400" },
                        { number: "98%", label: "Success Rate", icon: "⭐", gradient: "from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400" }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 text-center border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/30 hover:scale-105 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 group"
                        >
                            <div className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                            <p className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                {stat.number}
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-semibold mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
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

export default Banner;