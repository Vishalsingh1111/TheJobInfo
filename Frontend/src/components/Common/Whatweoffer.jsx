
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Sparkles, ArrowRight, Check, Star, Zap, TrendingUp, Award, BookOpen, Code, RefreshCw, MessageSquare, Users, Target } from "lucide-react";

const Service = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeCard, setActiveCard] = useState(null);

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20,
                y: (e.clientY / window.innerHeight) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const services = [
        {
            title: "Interview Preparation",
            details: "Prepare effectively with our extensive collection of interview questions and expert-curated answers. Boost your confidence and readiness for technical interviews.",
            icon: (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.0375 1.2374C11.8125 -0.393851 2.92503 5.7374 1.29378 14.9624C0.450029 19.4061 1.46253 23.9624 4.05003 27.6749C6.63753 31.4436 10.5188 33.9186 14.9625 34.7624C15.975 34.9311 16.9875 35.0436 18 35.0436C26.0438 35.0436 33.2438 29.2499 34.7625 21.0374C36.3938 11.8124 30.2625 2.9249 21.0375 1.2374ZM32.2313 20.5874C32.175 21.0374 32.0625 21.4874 31.95 21.8811L19.2375 17.0999V3.5999C19.6875 3.65615 20.1375 3.7124 20.5313 3.76865C28.4063 5.1749 33.6375 12.7124 32.2313 20.5874ZM16.7063 3.5999V16.7624H3.60003C3.65628 16.3124 3.71253 15.8624 3.76878 15.4124C4.95003 8.83115 10.4063 4.10615 16.7063 3.5999ZM15.4125 32.2311C11.5875 31.5561 8.32503 29.4186 6.13128 26.2124C4.66878 24.1311 3.82503 21.7124 3.60003 19.2374H17.775L31.05 24.2436C28.2938 29.9811 21.9375 33.4686 15.4125 32.2311Z" fill="white" />
                </svg>
            ),
            gradient: "from-red-500 via-orange-500 to-yellow-500",
            emoji: "🎯",
            features: ["1000+ Questions", "Expert Solutions", "Mock Interviews"],
            bgGradient: "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
        },
        {
            title: "DSA Sheets",
            details: "Master fundamental data structures and algorithms with our detailed sheets. Practice solving problems and strengthen your problem-solving skills.",
            icon: (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.89195 14.625C10.9995 10.1252 13.769 7.875 18.1996 7.875C24.8458 7.875 25.6765 12.9375 28.9996 13.7812C31.2151 14.3439 33.1535 13.5002 34.815 11.25C33.7075 15.7498 30.9379 18 26.5073 18C19.8611 18 19.0304 12.9375 15.7073 12.0938C13.4918 11.5311 11.5535 12.3748 9.89195 14.625ZM1.58423 24.75C2.69174 20.2502 5.46132 18 9.89195 18C16.5381 18 17.3689 23.0625 20.692 23.9062C22.9075 24.4689 24.8458 23.6252 26.5073 21.375C25.3998 25.8748 22.6302 28.125 18.1996 28.125C11.5535 28.125 10.7227 23.0625 7.39963 22.2188C5.18405 21.6561 3.24576 22.4998 1.58423 24.75Z" fill="white" />
                </svg>
            ),
            gradient: "from-blue-500 via-cyan-500 to-teal-500",
            emoji: "💻",
            features: ["450+ Problems", "Topic-wise", "Difficulty Levels"],
            bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
        },
        {
            title: "Programming Languages",
            details: "Dive deep into structured notes covering various programming languages. Our resources are crafted to simplify complex concepts and enhance your understanding.",
            icon: (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.0937 21.8251L29.6437 21.6001L30.2062 21.2626C31.3312 20.5876 31.95 19.4063 31.95 18.0563C31.95 16.7626 31.2187 15.5813 30.0937 14.9063L28.9125 14.2313L30.2062 13.4438C31.3312 12.7688 31.95 11.5876 31.95 10.2376C31.95 8.94385 31.2187 7.7626 30.0937 7.14385L19.9125 1.4626C18.7875 0.843848 17.3812 0.843848 16.3125 1.4626L5.84999 7.5376C4.72499 8.2126 4.04999 9.39385 4.04999 10.6876C4.04999 11.9813 4.72499 13.2188 5.84999 13.8376L7.08749 14.5688L5.84999 15.3001C4.72499 15.9751 4.04999 17.1563 4.04999 18.4501C4.04999 19.7438 4.72499 20.9813 5.84999 21.6001L6.35624 21.8813L5.84999 22.1626C4.72499 22.8376 3.99374 24.0188 3.99374 25.3126C3.99374 26.6626 4.66874 27.8438 5.79374 28.4626L16.1437 34.4813C16.7062 34.8188 17.325 34.9876 18 34.9876C18.675 34.9876 19.35 34.8188 19.9125 34.4251L30.2625 28.1251C31.3875 27.4501 32.0062 26.2688 32.0062 24.9188C31.95 23.6251 31.275 22.4438 30.0937 21.8251ZM6.52499 10.6876C6.52499 10.5188 6.58124 10.0126 7.08749 9.73135L17.55 3.65635C17.8875 3.43135 18.3375 3.43135 18.675 3.65635L28.9125 9.3376C29.4187 9.61885 29.475 10.1251 29.475 10.2938C29.475 10.4626 29.4187 10.9688 28.9125 11.3063L18.6187 17.6626C18.2812 17.8876 17.8312 17.8876 17.4375 17.6626L7.08749 11.6438C6.58124 11.3626 6.52499 10.8563 6.52499 10.6876ZM7.08749 17.4938L9.56249 16.0313L16.1437 19.8563C16.7062 20.1938 17.325 20.3626 18 20.3626C18.675 20.3626 19.35 20.1938 19.9125 19.8001L26.4375 15.8063L28.8562 17.1563C29.3625 17.4376 29.4187 17.9438 29.4187 18.1126C29.4187 18.2813 29.3625 18.7876 28.8562 19.1251L18.6187 25.4251C18.2812 25.6501 17.8312 25.6501 17.4375 25.4251L7.08749 19.4063C6.58124 19.1251 6.52499 18.6188 6.52499 18.4501C6.52499 18.2813 6.58124 17.7751 7.08749 17.4938ZM28.9125 25.9876L18.6187 32.3438C18.2812 32.5688 17.8312 32.5688 17.4375 32.3438L7.08749 26.3251C6.58124 26.0438 6.52499 25.5376 6.52499 25.3688C6.52499 25.2001 6.58124 24.6938 7.08749 24.4126L8.83124 23.4001L16.2 27.6751C16.7625 28.0126 17.3812 28.1813 18.0562 28.1813C18.7312 28.1813 19.4062 28.0126 19.9687 27.6188L27.225 23.1751L28.9125 24.0751C29.4187 24.3563 29.475 24.8626 29.475 25.0313C29.475 25.2001 29.4187 25.7063 28.9125 25.9876Z" fill="white" />
                </svg>
            ),
            gradient: "from-purple-500 via-pink-500 to-rose-500",
            emoji: "📚",
            features: ["10+ Languages", "Detailed Notes", "Code Examples"],
            bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
        },
        {
            title: "Regular Updates",
            details: "Stay updated with new content and resources. We continuously add fresh material to keep pace with industry advancements and user feedback.",
            icon: (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.725 16.3124C4.89375 16.3124 5.11875 16.2562 5.2875 16.1999L11.5312 14.0062C12.2062 13.7812 12.5437 13.0499 12.3187 12.3749C12.0937 11.6999 11.3625 11.3624 10.6875 11.5874L6.80625 12.9374C8.6625 8.0999 13.3875 4.8374 18.7875 4.8374C24.6938 4.8374 29.8125 8.7749 31.275 14.3999C31.4437 15.0749 32.1187 15.4687 32.7937 15.2999C33.4687 15.1312 33.8625 14.4562 33.6938 13.7812C31.95 7.03115 25.8187 2.30615 18.7312 2.30615C12.4312 2.30615 6.8625 6.01865 4.55625 11.5874L3.375 8.2124C3.15 7.5374 2.41875 7.1999 1.74375 7.4249C1.06875 7.6499 0.73125 8.38115 0.95625 9.05615L3.09375 15.1874C3.43125 15.9187 4.05 16.3124 4.725 16.3124Z" fill="white" />
                    <path d="M34.9312 27.9562L32.625 21.9375C32.4562 21.5437 32.175 21.2062 31.7812 21.0375C31.3875 20.8687 30.9375 20.8687 30.5437 21.0375L24.3562 23.3999C23.6812 23.6249 23.4 24.3562 23.625 25.0312C23.85 25.7062 24.5813 25.9875 25.2563 25.7625L29.1375 24.3C26.8875 28.4062 22.5 31.1062 17.6062 31.1062C12.0375 31.1062 7.14375 27.6187 5.4 22.4437C5.175 21.7687 4.44375 21.4312 3.825 21.6562C3.15 21.8812 2.8125 22.6124 3.0375 23.2312C5.11875 29.4187 10.9687 33.5812 17.6062 33.5812C23.4 33.5812 28.6312 30.375 31.275 25.425L32.5688 28.8562C32.7375 29.3625 33.2437 29.6437 33.75 29.6437C33.9187 29.6437 34.0312 29.6437 34.2 29.5312C34.875 29.3625 35.1562 28.6312 34.9312 27.9562Z" fill="white" />
                </svg>
            ),
            gradient: "from-green-500 via-emerald-500 to-teal-500",
            emoji: "🔄",
            features: ["Weekly Updates", "New Content", "Community Driven"],
            bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
        }
    ];

    const stats = [
        { icon: <Users className="w-6 h-6" />, value: "10K+", label: "Active Users", color: "from-blue-500 to-cyan-500" },
        { icon: <BookOpen className="w-6 h-6" />, value: "500+", label: "Resources", color: "from-purple-500 to-pink-500" },
        { icon: <Award className="w-6 h-6" />, value: "1000+", label: "Problems Solved", color: "from-green-500 to-emerald-500" },
        { icon: <Star className="w-6 h-6" />, value: "4.9★", label: "Rating", color: "from-yellow-500 to-orange-500" }
    ];

    return (
        <>
            <Navbar />
            <section className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
                {/* ANIMATED BACKGROUND */}
                <div
                    className="fixed top-20 left-10 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-3xl opacity-20 animate-blob pointer-events-none"
                    style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
                ></div>
                <div
                    className="fixed top-40 right-10 w-96 h-96 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"
                    style={{ transform: `translate(${-mousePosition.x}px, ${mousePosition.y}px)` }}
                ></div>
                <div className="fixed bottom-20 left-1/2 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

                {/* Floating Sparkles */}
                <div className="fixed inset-0 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${10 + Math.random() * 10}s`
                            }}
                        >
                            <Sparkles className="text-purple-400 dark:text-purple-500" size={8 + Math.random() * 12} style={{ opacity: 0.3 }} />
                        </div>
                    ))}
                </div>

                <div className="relative max-w-screen-xl container mx-auto px-4 md:px-20 py-16 md:py-24">


                    {/* STATS SECTION */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16 animate-fade-in animation-delay-200">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="group relative"
                                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                            >
                                <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity`}></div>
                                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 text-center border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all">
                                    <div className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-xl text-white mb-3`}>
                                        {stat.icon}
                                    </div>
                                    <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                                        {stat.value}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* SERVICES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                {...service}
                                index={index}
                                isActive={activeCard === index}
                                onHover={() => setActiveCard(index)}
                                onLeave={() => setActiveCard(null)}
                            />
                        ))}
                    </div>

                    {/* CTA SECTION */}
                    <div className="relative max-w-4xl mx-auto animate-fade-in animation-delay-800">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl blur-xl opacity-30 animate-pulse-glow"></div>
                        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-12 text-center overflow-hidden">
                            {/* Floating elements */}
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute animate-float-particle"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 3}s`
                                    }}
                                >
                                    <Sparkles className="text-white" size={12} style={{ opacity: 0.4 }} />
                                </div>
                            ))}

                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    Ready to Start Learning?
                                </h2>
                                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                    Join thousands of developers who are already mastering their skills with our platform
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button className="group relative px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl transition-all transform hover:scale-105 shadow-2xl overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                                        <span className="relative flex items-center justify-center gap-2">
                                            Get Started Free
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </button>
                                    <button className="group px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/50 hover:bg-white/30 transition-all transform hover:scale-105">
                                        <span className="flex items-center justify-center gap-2">
                                            <MessageSquare className="w-5 h-5" />
                                            Contact Us
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }

                @keyframes float-particle {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
                    50% { transform: translate(20px, -30px) rotate(180deg); opacity: 0.7; }
                }

                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.8; }
                }

                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                @keyframes draw {
                    to { stroke-dashoffset: 0; }
                }

                .animate-blob { animation: blob 7s infinite; }
                .animate-float-particle { animation: float-particle 15s ease-in-out infinite; }
                .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
                .animate-gradient-x { animation: gradient-x 3s ease infinite; }
                .animate-draw { stroke-dasharray: 300; stroke-dashoffset: 300; animation: draw 2s ease-out forwards; }

                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-800 { animation-delay: 0.8s; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </>
    );
};

export default Service;

const ServiceCard = ({ icon, title, details, gradient, emoji, features, bgGradient, index, isActive, onHover, onLeave }) => {
    return (
        <div
            className="group cursor-pointer animate-fade-in h-full"
            style={{ animationDelay: `${0.4 + index * 0.15}s` }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <div className="relative h-full">
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700`}></div>

                {/* Card */}
                <div className={`relative h-full bg-gradient-to-br ${bgGradient} backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-transparent shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden`}>
                    {/* Decorative circles */}
                    <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-3xl animate-float`}></div>
                    <div className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-2xl animate-float animation-delay-1000`}></div>

                    <div className="relative">
                        {/* Icon Container */}
                        <div className="flex items-center justify-between mb-6">
                            <div className={`relative w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                                {icon}
                            </div>
                            <div className="text-5xl animate-bounce-gentle">{emoji}</div>
                        </div>

                        {/* Title */}
                        <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-red-600 transition-all duration-500">
                            {title}
                        </h4>

                        {/* Description */}
                        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
                            {details}
                        </p>

                        {/* Features */}
                        <div className="space-y-3 mb-6">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
                                    style={{ transitionDelay: `${idx * 100}ms` }}
                                >
                                    <div className={`p-1.5 bg-gradient-to-br ${gradient} rounded-full`}>
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <button className={`w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r ${gradient} text-white rounded-2xl font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 overflow-hidden`}>
                            {/* Shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                            <span className="relative">Learn More</span>
                            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};