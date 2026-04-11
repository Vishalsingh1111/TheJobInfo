
import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Send, ArrowUp, Facebook, Twitter, Youtube, MessageCircle, ChevronRight, Globe } from 'lucide-react';
import { baseUrl } from '../Baseurl';

function Footer() {
    const [email, setEmail] = useState('');
    const [isScrollVisible, setIsScrollVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            alert('Please enter your email.');
            return;
        }

        try {
            const response = await axios.post(`${baseUrl}/newslatter/subscribe`, { email });
            alert(response.data.message || 'Thanks for subscribing!');
            setEmail('');
        } catch (err) {
            const message = err.response?.data?.message || 'Subscription failed';
            alert('Error: ' + message);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrollVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Scroll to Top Button */}
            {isScrollVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-red-500/50 transform hover:scale-110 transition-all duration-300"
                >
                    <ArrowUp className="w-6 h-6" />
                </button>
            )}

            {/* Main Footer */}
            <footer className="relative bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950 text-gray-200">
                {/* Decorative Top Wave */}
                <div className="absolute top-0 left-0 right-0 overflow-hidden">
                    <svg className="w-full h-20 text-gray-800" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-current"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-current"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current"></path>
                    </svg>
                </div>

                <div className="container mx-auto px-4 pt-24 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        {/* Company Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full blur-lg opacity-50"></div>
                                    <img
                                        src='./logo.png'
                                        className='relative w-20 h-20 rounded-full border-2 border-gray-200 shadow-xl'
                                        alt="Logo"
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <span className="text-2xl font-semibold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent" style={{ fontFamily: '"Quicksand", sans-serif', fontWeight: '900' }}>
                                        THEJOBINFO
                                    </span>
                                    <span className='text-sm text-gray-600 dark:text-gray-400 justify-content mx-auto'>Powered by DCODER</span>
                                </div>
                            </div>

                            <p className="text-gray-400 leading-relaxed">
                                Your ultimate destination for interview preparation, coding practice, and career growth in tech.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="bg-red-500/10 p-2 rounded-lg">
                                        <Mail className="w-4 h-4 text-red-500" />
                                    </div>
                                    <span>dcodermail1@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="bg-red-500/10 p-2 rounded-lg">
                                        <Globe className="w-4 h-4 text-red-500" />
                                    </div>
                                    <span>https://thejobinfo.in</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-pink-600 rounded-full"></div>
                                Services
                            </h3>
                            <ul className="space-y-3">
                                {[


                                    { name: 'TrendingJobs', link: '/Job-Portal' },
                                    { name: 'Job for fresher', link: '/Fresher-Jobs' },
                                    { name: 'Job for Experienced', link: '/Experienced-Jobs' },
                                    { name: 'Internship', link: '/Internships' },
                                ].map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.link}
                                            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300"
                                        >
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                                Company
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { name: 'About Us', link: '/About' },
                                    { name: 'Contact', link: '/Contact' },
                                    { name: 'Terms of Use', link: '/terms' },
                                    { name: 'Privacy Policy', link: '/privacy' },
                                ].map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.link}
                                            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300"
                                        >
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full"></div>
                                Newsletter
                            </h3>
                            <p className="text-gray-400 mb-6 text-sm">
                                Subscribe to get the latest updates, coding tips, and interview preparation resources.
                            </p>

                            {/* ✅ Wrapped in <form> so e.preventDefault() works correctly */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-700 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-white placeholder-gray-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
                                >
                                    Subscribe
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="bg-white/5 rounded-xl p-3 border border-gray-800">
                                    <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                                        10K+
                                    </p>
                                    <p className="text-xs text-gray-400">Subscribers</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-gray-800">
                                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                                        500+
                                    </p>
                                    <p className="text-xs text-gray-400">Resources</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <p className="text-gray-400 text-md">
                                © {new Date().getFullYear()} <span className="text-white font-semibold">THEJOBINFO</span> All rights reserved.
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                                Made with ❤️ for aspiring developers
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400 text-sm mr-2">Follow us:</span>
                            <a href="#" className="group relative bg-white/5 hover:bg-blue-600 p-3 rounded-xl border border-gray-800 hover:border-blue-600 transition-all duration-300">
                                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                            </a>
                            <a href="#" className="group relative bg-white/5 hover:bg-blue-500 p-3 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
                                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                            </a>
                            <a href="https://t.me/dcoder21575" className="group relative bg-white/5 hover:bg-blue-500 p-3 rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
                                <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                            </a>
                            <a href="https://www.youtube.com/@d-coder1898" className="group relative bg-white/5 hover:bg-red-600 p-3 rounded-xl border border-gray-800 hover:border-red-600 transition-all duration-300">
                                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                            </a>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-8 pt-8 border-t border-gray-800">
                        <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-400">Trusted Platform</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-400">100% Free Resources</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-400">Updated Daily</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-400">10K+ Active Users</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Bottom Elements */}
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
            </footer>
        </>
    );
}

export default Footer;