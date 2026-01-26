import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Logout from '../Authentications/Logout';
import {
    User, Mail, Phone, Calendar, Shield, Bell, Lock, Eye,
    Settings, Edit, Camera, Share2, Download, Copy, Check,
    Sparkles, BookOpen, Code, Trophy, Star, Zap, TrendingUp, ArrowLeft
} from 'lucide-react';

function ProfilePage() {
    const [authUser, setAuthUser] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeTab, setActiveTab] = useState('profile');
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState({
        coursesCompleted: 12,
        problemsSolved: 156,
        streakDays: 7,
        achievements: 8
    });
    const navigate = useNavigate();

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

    useEffect(() => {
        const userData = localStorage.getItem('Users');
        if (userData) {
            setAuthUser(JSON.parse(userData));
        } else {
            navigate('/login');
        }

        // Load stats from localStorage
        const savedStats = localStorage.getItem('userStats');
        if (savedStats) {
            setStats(JSON.parse(savedStats));
        }
    }, [navigate]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadProfile = () => {
        const profileData = {
            name: `${authUser?.firstName} ${authUser?.lastName}`,
            email: authUser?.email,
            phone: authUser?.phone,
            googleId: authUser?.googleId,
            stats: stats
        };

        const blob = new Blob([JSON.stringify(profileData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `profile-${authUser?.firstName}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const shareProfile = async () => {
        const shareData = {
            title: `${authUser?.firstName}'s Profile`,
            text: `Check out my profile on TechAI!`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            copyToClipboard(window.location.href);
        }
    };

    const tabs = [
        { id: 'profile', name: 'Profile', icon: <User className="w-4 h-4" /> },
        { id: 'stats', name: 'Stats', icon: <TrendingUp className="w-4 h-4" /> },
        { id: 'achievements', name: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
        { id: 'settings', name: 'Settings', icon: <Settings className="w-4 h-4" /> }
    ];

    const achievements = [
        { id: 1, name: 'First Steps', icon: '🎯', description: 'Completed first course', unlocked: true },
        { id: 2, name: 'Problem Solver', icon: '🧩', description: 'Solved 100 problems', unlocked: true },
        { id: 3, name: 'Week Warrior', icon: '🔥', description: '7 day streak', unlocked: true },
        { id: 4, name: 'Code Master', icon: '💻', description: 'Master 5 languages', unlocked: false },
        { id: 5, name: 'Speed Demon', icon: '⚡', description: 'Complete 10 challenges under 10 mins', unlocked: false },
        { id: 6, name: 'Community Star', icon: '⭐', description: 'Help 50 learners', unlocked: false }
    ];

    if (!authUser) {
        return null;
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
                <div className="relative max-w-7xl container mx-auto px-4 md:px-8 py-8">


                    <div className="py-20">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl blur-xl opacity-30 animate-pulse-glow"></div>

                        {/* Main Card */}
                        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                            {/* Header Section */}
                            <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8 md:p-12 overflow-hidden">
                                {/* Floating Sparkles */}
                                {[...Array(10)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute animate-float-particle"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            animationDelay: `${Math.random() * 3}s`,
                                            animationDuration: `${5 + Math.random() * 5}s`
                                        }}
                                    >
                                        <Sparkles className="text-white" size={8 + Math.random() * 8} style={{ opacity: 0.4 }} />
                                    </div>
                                ))}

                                {/* Profile Header */}
                                <div className="relative flex flex-col md:flex-row items-center gap-6">
                                    {/* Profile Picture */}
                                    <div className="relative group">
                                        <div className="absolute -inset-2 bg-white/30 rounded-full blur-lg animate-pulse-glow"></div>
                                        {authUser && authUser.photo && authUser.photo !== "null" ? (
                                            <img
                                                src={authUser.photo}
                                                alt="Profile"
                                                className="relative w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white shadow-2xl"
                                            />
                                        ) : (
                                            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-6xl font-bold text-white border-4 border-white shadow-2xl">
                                                {authUser && authUser.firstName ? authUser.firstName.charAt(0).toUpperCase() : 'G'}
                                            </div>
                                        )}
                                        {/* Edit Photo Badge */}
                                        <button className="absolute bottom-0 right-0 p-3 bg-white text-purple-600 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110">
                                            <Camera className="w-6 h-6" />
                                        </button>
                                        {/* Status Indicator */}
                                        <div className="absolute top-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white animate-pulse"></div>
                                    </div>

                                    {/* Profile Info */}
                                    <div className="text-center md:text-left flex-1">
                                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                                            {authUser?.firstName} {authUser?.lastName}
                                        </h1>
                                        <p className="text-white/90 text-lg md:text-xl mb-6 flex items-center justify-center md:justify-start gap-2">
                                            <Mail className="w-5 h-5" />
                                            {authUser?.email}
                                        </p>

                                        {/* Quick Stats */}
                                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                            <div className="px-5 py-3 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-2">
                                                <BookOpen className="w-5 h-5 text-white" />
                                                <span className="text-white font-bold">{stats.coursesCompleted} Courses</span>
                                            </div>
                                            <div className="px-5 py-3 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-2">
                                                <Code className="w-5 h-5 text-white" />
                                                <span className="text-white font-bold">{stats.problemsSolved} Problems</span>
                                            </div>
                                            <div className="px-5 py-3 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-2">
                                                <Zap className="w-5 h-5 text-white" />
                                                <span className="text-white font-bold">{stats.streakDays} Day Streak</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={shareProfile}
                                            className="p-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white transition-all transform hover:scale-110 shadow-xl"
                                            title="Share Profile"
                                        >
                                            <Share2 className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={downloadProfile}
                                            className="p-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white transition-all transform hover:scale-110 shadow-xl"
                                            title="Download Profile"
                                        >
                                            <Download className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs Navigation */}
                            <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex overflow-x-auto">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-2 px-8 py-5 font-bold transition-all whitespace-nowrap text-base ${activeTab === tab.id
                                                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-gray-800'
                                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            {tab.icon}
                                            {tab.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-8 md:p-12 min-h-[400px]">
                                {/* Profile Tab */}
                                {activeTab === 'profile' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {[
                                                { icon: <User />, label: 'First Name', value: authUser?.firstName },
                                                { icon: <User />, label: 'Last Name', value: authUser?.lastName },
                                                { icon: <Mail />, label: 'Email', value: authUser?.email, copyable: true },
                                                { icon: <Phone />, label: 'Contact', value: authUser?.phone || 'Not provided' },
                                                { icon: <Shield />, label: 'Google ID', value: authUser?.googleId, copyable: true },
                                                { icon: <Calendar />, label: 'Member Since', value: new Date().toLocaleDateString() }
                                            ].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 transition-all hover:shadow-xl"
                                                >
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                                    <div className="relative flex items-start gap-4">
                                                        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white group-hover:scale-110 transition-transform">
                                                            {React.cloneElement(item.icon, { className: 'w-6 h-6' })}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold mb-2">{item.label}</p>
                                                            <p className="text-gray-800 dark:text-gray-100 font-bold text-lg truncate">{item.value}</p>
                                                        </div>
                                                        {item.copyable && (
                                                            <button
                                                                onClick={() => copyToClipboard(item.value)}
                                                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                                title="Copy"
                                                            >
                                                                {copied ? (
                                                                    <Check className="w-5 h-5 text-green-600" />
                                                                ) : (
                                                                    <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Stats Tab */}
                                {activeTab === 'stats' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {[
                                                { label: 'Courses Completed', value: stats.coursesCompleted, icon: <BookOpen />, color: 'from-blue-500 to-cyan-500', progress: 60 },
                                                { label: 'Problems Solved', value: stats.problemsSolved, icon: <Code />, color: 'from-green-500 to-emerald-500', progress: 75 },
                                                { label: 'Current Streak', value: `${stats.streakDays} Days`, icon: <Zap />, color: 'from-orange-500 to-red-500', progress: 85 },
                                                { label: 'Achievements', value: stats.achievements, icon: <Trophy />, color: 'from-purple-500 to-pink-500', progress: 50 }
                                            ].map((stat, index) => (
                                                <div
                                                    key={index}
                                                    className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all group overflow-hidden"
                                                >
                                                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                                                    <div className="relative">
                                                        <div className="flex items-center justify-between mb-6">
                                                            <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-xl text-white`}>
                                                                {React.cloneElement(stat.icon, { className: 'w-8 h-8' })}
                                                            </div>
                                                            <span className="text-5xl font-bold text-gray-800 dark:text-white">{stat.value}</span>
                                                        </div>
                                                        <p className="text-gray-600 dark:text-gray-400 font-bold text-lg mb-4">{stat.label}</p>
                                                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000`}
                                                                style={{ width: `${stat.progress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Achievements Tab */}
                                {activeTab === 'achievements' && (
                                    <div className="space-y-4 animate-fade-in">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {achievements.map((achievement, index) => (
                                                <div
                                                    key={achievement.id}
                                                    className={`relative p-6 rounded-2xl border-2 transition-all ${achievement.unlocked
                                                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700 hover:shadow-xl'
                                                        : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-60'
                                                        }`}
                                                    style={{ animationDelay: `${index * 0.1}s` }}
                                                >
                                                    {achievement.unlocked && (
                                                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                                                            <Check className="w-5 h-5 text-white" />
                                                        </div>
                                                    )}
                                                    <div className="text-center">
                                                        <div className={`text-6xl mb-4 ${achievement.unlocked ? 'animate-bounce-gentle' : 'grayscale'}`}>
                                                            {achievement.icon}
                                                        </div>
                                                        <h4 className="font-bold text-gray-800 dark:text-white mb-2 text-lg">{achievement.name}</h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Settings Tab */}
                                {activeTab === 'settings' && (
                                    <div className="space-y-6 animate-fade-in">
                                        {[
                                            { icon: <Bell />, title: 'Notifications', description: 'Manage your notification preferences', toggle: true },
                                            { icon: <Lock />, title: 'Privacy', description: 'Control your privacy settings', toggle: true },
                                            { icon: <Shield />, title: 'Security', description: 'Manage account security', toggle: false },
                                            { icon: <Eye />, title: 'Visibility', description: 'Control profile visibility', toggle: true }
                                        ].map((setting, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 transition-all hover:shadow-xl"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
                                                        {React.cloneElement(setting.icon, { className: 'w-6 h-6' })}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-800 dark:text-white text-lg">{setting.title}</h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                                                    </div>
                                                </div>
                                                {setting.toggle ? (
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                                        <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
                                                    </label>
                                                ) : (
                                                    <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-bold">
                                                        Manage
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-8">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                                        Member since {new Date().toLocaleDateString()} • Last login: Today
                                    </p>
                                    <div className="flex gap-3">
                                        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-xl text-base">
                                            <Edit className="w-5 h-5 inline mr-2" />
                                            Edit Profile
                                        </button>
                                        <div className="flex-shrink-0">
                                            <Logout />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    @keyframes blob {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        25% { transform: translate(20px, -50px) scale(1.1); }
                        50% { transform: translate(-20px, 20px) scale(0.9); }
                        75% { transform: translate(50px, 50px) scale(1.05); }
                    }

                    @keyframes float-particle {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
                        50% { transform: translate(15px, -20px) rotate(180deg); opacity: 0.6; }
                    }

                    @keyframes bounce-gentle {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                    }

                    @keyframes pulse-glow {
                        0%, 100% { opacity: 0.3; }
                        50% { opacity: 0.6; }
                    }

                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .animate-blob { animation: blob 7s infinite; }
                    .animate-float-particle { animation: float-particle 8s ease-in-out infinite; }
                    .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
                    .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                    .animate-fade-in { animation: fade-in 0.5s ease-out forwards; opacity: 0; }
                    .animation-delay-2000 { animation-delay: 2s; }

                    /* Custom scrollbar */
                    ::-webkit-scrollbar { width: 8px; }
                    ::-webkit-scrollbar-track { background: transparent; }
                    ::-webkit-scrollbar-thumb { 
                        background: linear-gradient(to bottom, #a855f7, #ec4899); 
                        border-radius: 4px; 
                    }
                    ::-webkit-scrollbar-thumb:hover { 
                        background: linear-gradient(to bottom, #9333ea, #db2777); 
                    }
                `}</style>
            </div>
            <Footer />
        </>
    );
}

export default ProfilePage;