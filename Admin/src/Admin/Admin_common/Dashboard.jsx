// import React from 'react'
// import AdminNavbar from './AdminNavbar';

// function Dashboard() {
//     return (
//         <>
//             <AdminNavbar />
//         </>
//     )
// }

//  export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';
import {
    LayoutDashboard,
    Users,
    Code,
    FileText,
    Mail,
    MessageSquare,
    TrendingUp,
    Package,
    BookOpen,
    Image as ImageIcon,
    Activity,
    Calendar,
    ArrowUp,
    ArrowDown,
    Sun,
    Moon,
    Menu,
    X,
    LogOut,
    UserPlus,
    ChevronDown,
    Layers,
    FileCode,
    Bookmark,
    Instagram,
    HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Import your components
import Mapsheet from '../DSASheets/MAPSheet';
import SDEproblems from '../DSASheets/SDEProblems';
import Topiccard from '../DSASheets/TopicCards';
import Notecardform from '../Languages/Notecardform';
import Notecontentform from '../Languages/Notecontentform';
import TechBlog from '../TechBlogs/TechBlogForm';
import InstaPostform from '../InstaPost/InstaPostform';
import Showusersdetail from '../Usersdetail/UserManagement';
import ShowContactMsg from '../Admin_common/Showcontactmsg';

function AdminDashboard() {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState('Dashboard');
    const [dropdownOpen, setDropdownOpen] = useState({});
    const navigate = useNavigate();

    // Stats state
    const [stats, setStats] = useState({
        users: { total: 0, verified: 0, unverified: 0, trend: 0 },
        sheets: { total: 0, problems: 0 },
        sdeProblems: { total: 0, easy: 0, medium: 0, hard: 0 },
        languages: { cards: 0, content: 0 },
        blogs: { total: 0, categories: 0 },
        instaPosts: { total: 0 },
        messages: { total: 0, recent: 0 },
        subscribers: { total: 0, recent: 0 }
    });

    const [loading, setLoading] = useState(true);
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        if (selectedContent === 'Dashboard') {
            fetchAllStats();
        }
    }, [selectedContent]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const fetchAllStats = async () => {
        try {
            setLoading(true);

            const [
                usersRes,
                sheetsRes,
                sdeProbsRes,
                notesRes,
                noteContentRes,
                blogsRes,
                instaRes,
                messagesRes,
                subscribersRes
            ] = await Promise.all([
                axios.get(`${baseUrl}/user`).catch(() => ({ data: [] })),
                axios.get(`${baseUrl}/sheet`).catch(() => ({ data: [] })),
                axios.get(`${baseUrl}/sdeproblem`).catch(() => ({ data: [] })),
                axios.get(`${baseUrl}/note`).catch(() => ({ data: [] })),
                axios.get(`${baseUrl}/notecontent`).catch(() => ({ data: [] })),
                axios.get(`${baseUrl}/blog`).catch(() => ({ data: [] })),
                axios.get(`${baseUrl}/instapost`).catch(() => ({ data: [] })),
                axios.get(`${baseUrl}/contact`).catch(() => ({ data: [] })),
                axios.get(`${baseUrl}/newslatter`).catch(() => ({ data: [] }))
            ]);

            const users = Array.isArray(usersRes.data) ? usersRes.data : [];
            const verifiedUsers = users.filter(u => u.isVerified);

            const sheets = Array.isArray(sheetsRes.data) ? sheetsRes.data : [];
            const totalProblems = sheets.reduce((sum, s) => sum + (parseInt(s.Problems) || 0), 0);

            const sdeProbs = Array.isArray(sdeProbsRes.data) ? sdeProbsRes.data : [];
            const easy = sdeProbs.filter(p => p.Level?.toLowerCase() === 'easy').length;
            const medium = sdeProbs.filter(p => p.Level?.toLowerCase() === 'medium').length;
            const hard = sdeProbs.filter(p => p.Level?.toLowerCase() === 'hard').length;

            const blogs = Array.isArray(blogsRes.data) ? blogsRes.data : [];
            const categories = [...new Set(blogs.map(b => b.category))].length;

            const messages = Array.isArray(messagesRes.data) ? messagesRes.data : [];
            const subscribers = Array.isArray(subscribersRes.data) ? subscribersRes.data : [];

            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            const recentMessages = messages.filter(m =>
                m.createdAt && new Date(m.createdAt) > sevenDaysAgo
            ).length;

            const recentSubscribers = subscribers.filter(s =>
                s.createdAt && new Date(s.createdAt) > sevenDaysAgo
            ).length;

            setStats({
                users: {
                    total: users.length,
                    verified: verifiedUsers.length,
                    unverified: users.length - verifiedUsers.length,
                    trend: users.length > 0 ? Math.round((verifiedUsers.length / users.length) * 100) : 0
                },
                sheets: { total: sheets.length, problems: totalProblems },
                sdeProblems: { total: sdeProbs.length, easy, medium, hard },
                languages: {
                    cards: Array.isArray(notesRes.data) ? notesRes.data.length : 0,
                    content: Array.isArray(noteContentRes.data) ? noteContentRes.data.length : 0
                },
                blogs: { total: blogs.length, categories },
                instaPosts: { total: Array.isArray(instaRes.data) ? instaRes.data.length : 0 },
                messages: { total: messages.length, recent: recentMessages },
                subscribers: { total: subscribers.length, recent: recentSubscribers }
            });

            const activity = [];
            if (recentMessages > 0) {
                activity.push({
                    count: recentMessages,
                    text: `${recentMessages} new message${recentMessages > 1 ? 's' : ''}`,
                    icon: MessageSquare,
                    color: 'text-blue-600'
                });
            }
            if (recentSubscribers > 0) {
                activity.push({
                    count: recentSubscribers,
                    text: `${recentSubscribers} new subscriber${recentSubscribers > 1 ? 's' : ''}`,
                    icon: Mail,
                    color: 'text-green-600'
                });
            }
            setRecentActivity(activity);

        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('Users');
        toast.success('Admin logged out successfully');
        navigate('/');
        window.location.reload();
    };

    const toggleDropdown = (id) => {
        setDropdownOpen(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard,
            action: () => setSelectedContent('Dashboard')
        },
        {
            id: 'users',
            label: 'Users',
            icon: Users,
            action: () => setSelectedContent('Showusersdetail')
        },
        {
            id: 'sde-sheet',
            label: 'SDE Sheet',
            icon: Layers,
            children: [
                { label: 'Manage Topic Cards', action: () => setSelectedContent('CreateCard') },
                { label: 'Manage MAP Sheet', action: () => setSelectedContent('mapsheet') },
                { label: 'Manage SDE Problems', action: () => setSelectedContent('SDEproblems') }
            ]
        },
        {
            id: 'programming',
            label: 'Programming Lang',
            icon: FileCode,
            children: [
                { label: 'Manage Lang Cards', action: () => setSelectedContent('Notecardform') },
                { label: 'Manage Lang Content', action: () => setSelectedContent('Notecontentform') }
            ]
        },
        {
            id: 'blogs',
            label: 'Tech Blogs',
            icon: Bookmark,
            children: [
                { label: 'Blog Management', action: () => setSelectedContent('TechBlog') }
            ]
        },
        {
            id: 'insta',
            label: 'Insta Posts',
            icon: Instagram,
            children: [
                { label: 'Manage Insta Posts', action: () => setSelectedContent('InstaPostform') }
            ]
        },
        {
            id: 'queries',
            label: 'Queries',
            icon: HelpCircle,
            action: () => setSelectedContent('ShowContactMsg')
        }
    ];

    const StatCard = ({ icon: Icon, title, value, subtitle, trend, gradient }) => (
        <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                {trend !== undefined && (
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        {trend >= 0 ? <ArrowUp className="w-4 h-4 text-white" /> : <ArrowDown className="w-4 h-4 text-white" />}
                        <span className="text-sm font-bold text-white">{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1">{title}</h3>
            <p className="text-3xl md:text-4xl font-bold text-white mb-2">{value}</p>
            {subtitle && <p className="text-sm text-white/70">{subtitle}</p>}
        </div>
    );

    const DashboardContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Loading dashboard...</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Welcome Back, Admin! 👋
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Here's what's happening with your platform today.</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                {recentActivity.length > 0 && (
                    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-start gap-4">
                            <Activity className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-white mb-3">🔥 Recent Activity (Last 7 Days)</h3>
                                <div className="flex flex-wrap gap-3">
                                    {recentActivity.map((activity, idx) => {
                                        const Icon = activity.icon;
                                        return (
                                            <div key={idx} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                                                <Icon className="w-5 h-5 text-white" />
                                                <span className="font-semibold text-white text-sm md:text-base">{activity.text}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={Users}
                        title="Total Users"
                        value={stats.users.total}
                        subtitle={`${stats.users.verified} verified • ${stats.users.unverified} pending`}
                        trend={stats.users.trend}
                        gradient="from-blue-500 to-blue-600"
                    />
                    <StatCard
                        icon={Code}
                        title="SDE Problems"
                        value={stats.sdeProblems.total}
                        subtitle={`${stats.sdeProblems.easy}E • ${stats.sdeProblems.medium}M • ${stats.sdeProblems.hard}H`}
                        gradient="from-green-500 to-emerald-600"
                    />
                    <StatCard
                        icon={FileText}
                        title="Tech Blogs"
                        value={stats.blogs.total}
                        subtitle={`${stats.blogs.categories} categories`}
                        gradient="from-purple-500 to-purple-600"
                    />
                    <StatCard
                        icon={Mail}
                        title="Subscribers"
                        value={stats.subscribers.total}
                        subtitle={stats.subscribers.recent > 0 ? `+${stats.subscribers.recent} this week` : 'Stable'}
                        trend={stats.subscribers.recent}
                        gradient="from-orange-500 to-orange-600"
                    />
                </div>

                {/* Secondary Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={Package}
                        title="Problem Sheets"
                        value={stats.sheets.total}
                        subtitle={`${stats.sheets.problems} total problems`}
                        gradient="from-indigo-500 to-indigo-600"
                    />
                    <StatCard
                        icon={BookOpen}
                        title="Language Cards"
                        value={stats.languages.cards}
                        subtitle={`${stats.languages.content} content items`}
                        gradient="from-pink-500 to-pink-600"
                    />
                    <StatCard
                        icon={ImageIcon}
                        title="Insta Posts"
                        value={stats.instaPosts.total}
                        gradient="from-rose-500 to-rose-600"
                    />
                    <StatCard
                        icon={MessageSquare}
                        title="Messages"
                        value={stats.messages.total}
                        subtitle={stats.messages.recent > 0 ? `+${stats.messages.recent} this week` : 'All handled'}
                        trend={stats.messages.recent}
                        gradient="from-cyan-500 to-cyan-600"
                    />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Problem Distribution */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                            Problem Difficulty
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-green-600">Easy</span>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{stats.sdeProblems.easy}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000"
                                        style={{ width: `${stats.sdeProblems.total > 0 ? (stats.sdeProblems.easy / stats.sdeProblems.total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-yellow-600">Medium</span>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{stats.sdeProblems.medium}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-1000"
                                        style={{ width: `${stats.sdeProblems.total > 0 ? (stats.sdeProblems.medium / stats.sdeProblems.total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-red-600">Hard</span>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{stats.sdeProblems.hard}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full transition-all duration-1000"
                                        style={{ width: `${stats.sdeProblems.total > 0 ? (stats.sdeProblems.hard / stats.sdeProblems.total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Stats */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <Users className="w-6 h-6 text-blue-600" />
                            User Verification
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-blue-600">Verified</span>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{stats.users.verified}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000"
                                        style={{ width: `${stats.users.total > 0 ? (stats.users.verified / stats.users.total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-gray-600">Unverified</span>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{stats.users.unverified}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-gray-400 to-gray-600 h-3 rounded-full transition-all duration-1000"
                                        style={{ width: `${stats.users.total > 0 ? (stats.users.unverified / stats.users.total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Verification Rate</span>
                                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stats.users.trend}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Platform Overview */}
                <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 shadow-2xl">
                    <h3 className="text-2xl font-bold text-white mb-6">📊 Platform Overview</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { value: stats.users.total, label: 'Users', icon: Users },
                            { value: stats.sdeProblems.total, label: 'SDE Problems', icon: Code },
                            { value: stats.sheets.total, label: 'Sheets', icon: Package },
                            { value: stats.blogs.total, label: 'Blogs', icon: FileText },
                            { value: stats.languages.cards, label: 'Lang Cards', icon: BookOpen },
                            { value: stats.instaPosts.total, label: 'Insta Posts', icon: ImageIcon }
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4">
                                    <Icon className="w-6 h-6 text-white mx-auto mb-2" />
                                    <div className="text-3xl font-bold text-white mb-1">{item.value}</div>
                                    <div className="text-xs text-white/80">{item.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        <div>
                            <h3 className="text-lg font-bold text-white">✅ All Systems Operational</h3>
                            <p className="text-sm text-green-100">Last updated: {new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
                {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
                    <div className="flex flex-col h-full">
                        {/* Logo */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">DCODER</h1>
                            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                            {menuItems.map((item) => (
                                <div key={item.id}>
                                    {item.children ? (
                                        <div>
                                            <button
                                                onClick={() => toggleDropdown(item.id)}
                                                className="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <item.icon className="w-5 h-5" />
                                                    <span className="font-medium">{item.label}</span>
                                                </div>
                                                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen[item.id] ? 'rotate-180' : ''}`} />
                                            </button>
                                            {dropdownOpen[item.id] && (
                                                <div className="ml-8 mt-2 space-y-1">
                                                    {item.children.map((child, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => {
                                                                child.action();
                                                                setSidebarOpen(false);
                                                            }}
                                                            className="block w-full text-left p-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                        >
                                                            {child.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                item.action();
                                                setSidebarOpen(false);
                                            }}
                                            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${selectedContent === item.id ||
                                                (item.id === 'dashboard' && selectedContent === 'Dashboard')
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span className="font-medium">{item.label}</span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Bottom Actions */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                            <a href="/AddAdmin">
                                <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <UserPlus className="w-5 h-5" />
                                    <span className="font-medium">Add Admin</span>
                                </button>
                            </a>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top Bar */}
                    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            </button>

                            <div className="flex-1"></div>

                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                {darkMode ? (
                                    <Sun className="w-5 h-5 text-yellow-500" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-600" />
                                )}
                            </button>
                        </div>
                    </header>

                    {/* Content Area */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                        {selectedContent === 'Dashboard' && <DashboardContent />}
                        {selectedContent === 'mapsheet' && <Mapsheet />}
                        {selectedContent === 'CreateCard' && <Topiccard />}
                        {selectedContent === 'SDEproblems' && <SDEproblems />}
                        {selectedContent === 'Notecardform' && <Notecardform />}
                        {selectedContent === 'Notecontentform' && <Notecontentform />}
                        {selectedContent === 'TechBlog' && <TechBlog />}
                        {selectedContent === 'InstaPostform' && <InstaPostform />}
                        {selectedContent === 'Showusersdetail' && <Showusersdetail />}
                        {selectedContent === 'ShowContactMsg' && <ShowContactMsg />}
                    </main>
                </div>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}

export default AdminDashboard;