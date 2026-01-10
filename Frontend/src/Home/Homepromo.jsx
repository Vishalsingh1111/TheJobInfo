
import React from 'react';
import { MessageCircle, Send, Users, Sparkles } from 'lucide-react';

const ContactSection = () => {
    return (
        <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pb-10 px-4 border-t dark:border-gray-800">
            <div className="container mx-auto max-w-full">
                {/* Main Card */}
                <div className="relative bg-transparent">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-600 dark:to-pink-600 rounded-full blur-3xl opacity-30 dark:opacity-10"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-blue-600 dark:to-cyan-600 rounded-full blur-3xl opacity-30 dark:opacity-10"></div>

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-12 text-center">
                        {/* Avatars */}
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center -space-x-4">
                                <div className="relative group">
                                    <img
                                        className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-700 shadow-lg transform group-hover:scale-110 transition-transform"
                                        src="/avatar.avif"
                                        alt="Team Member 1"
                                    />
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                </div>
                                <div className="relative group">
                                    <img
                                        className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-700 shadow-lg transform group-hover:scale-110 transition-transform"
                                        src="/avatar1.avif"
                                        alt="Team Member 2"
                                    />
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                </div>
                                <div className="relative group">
                                    <img
                                        className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-700 shadow-lg transform group-hover:scale-110 transition-transform"
                                        src="/avatar2.avif"
                                        alt="Team Member 3"
                                    />
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                </div>
                            </div>
                        </div>

                        {/* Badge */}
                        <div className="flex justify-center mb-6">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:scale-105 transition-transform">
                                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                <span className="text-purple-700 dark:text-purple-300 font-semibold text-sm">Friendly Support Team</span>
                                <Sparkles className="w-5 h-5 text-pink-500 dark:text-pink-400" />
                            </div>
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            <span className="text-gray-800 dark:text-gray-100">Do You Have Any </span>
                            <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 dark:from-red-400 dark:via-pink-400 dark:to-purple-500 bg-clip-text text-transparent">
                                Question?
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                            Can't find the answer you're looking for? Please chat to our friendly team. We're here to help you succeed!
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mb-10">
                            <div className="text-center">
                                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">24/7</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Support</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">&lt;1hr</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Response Time</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">100%</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Satisfaction</p>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="/Contact" className="group">
                                <button className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-red-500/50 dark:hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300">
                                    <MessageCircle className="w-6 h-6" />
                                    Get in Touch
                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </a>
                            <button className="flex items-center gap-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl border-2 border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300">
                                <MessageCircle className="w-6 h-6" />
                                Live Chat
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Trusted by thousands of learners worldwide</p>
                            <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full"></div>
                                    <span className="text-gray-600 dark:text-gray-400 font-semibold">10K+ Students</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                                    <span className="text-gray-600 dark:text-gray-400 font-semibold">500+ Companies</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full"></div>
                                    <span className="text-gray-600 dark:text-gray-400 font-semibold">4.9★ Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            {/* Decorative Blobs */}
            {/* <div className="fixed top-20 left-10 w-64 h-64 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-10 dark:opacity-10 animate-blob pointer-events-none"></div>
            <div className="fixed bottom-20 right-10 w-64 h-64 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-10 dark:opacity-10 animate-blob animation-delay-2000 pointer-events-none"></div> */}

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
            `}</style>
        </section>
    );
};

export default ContactSection;