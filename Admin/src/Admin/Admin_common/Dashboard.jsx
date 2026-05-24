


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';
import {
    LayoutDashboard,
    Briefcase,
    Mail,
    MessageSquare,
    Activity,
    Calendar,
    ArrowUp,
    ArrowDown,
    Sun,
    Moon,
    Menu,
    X,
    UserPlus,
    ChevronDown,
    HelpCircle,
    PlusCircle,
    List,
    Flame,
    BarChart2,
    BookOpen,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ── Import your components ──
import TechBlog from '../TechBlogs/TechBlogForm';
import BlogForm from '../Blogs/BlogForm';
import ShowContactMsg from '../Admin_common/Showcontactmsg';
import Logout from '../Admin_authentications/AdminLogout';

// ── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, title, value, subtitle, trend, bg, iconBg }) => (
    <div className={`${bg} rounded-2xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-200`}>
        <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
            </div>
            {trend !== undefined && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${trend > 0
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : trend < 0
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    }`}>
                    {trend > 0 ? <ArrowUp className="w-3 h-3" /> : trend < 0 ? <ArrowDown className="w-3 h-3" /> : null}
                    {trend > 0 ? `+${trend}` : trend === 0 ? '—' : trend} this week
                </div>
            )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</p>}
    </div>
);

// ── Progress Bar ───────────────────────────────────────────────────────────
const ProgressBar = ({ label, value, total, color }) => {
    const pct = total > 0 ? Math.round((value / total) * 100) : 0;
    return (
        <div>
            <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{value} <span className="text-xs text-gray-400 font-normal">({pct}%)</span></span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div
                    className={`${color} h-2.5 rounded-full transition-all duration-1000`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
};

// ══ MAIN COMPONENT ═════════════════════════════════════════════════════════
function AdminDashboard() {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState('Dashboard');
    const [dropdownOpen, setDropdownOpen] = useState({});
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        jobs: { total: 0, freshers: 0, experienced: 0, internship: 0, wfh: 0 },
        messages: { total: 0, recent: 0 },
        subscribers: { total: 0, recent: 0 },
    });

    const [loading, setLoading] = useState(true);
    const [recentActivity, setRecentActivity] = useState([]);

    // ── dark mode toggle ──
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    // ── fetch stats ──
    useEffect(() => {
        if (selectedContent === 'Dashboard') fetchAllStats();
    }, [selectedContent]);

    const fetchAllStats = async () => {
        try {
            setLoading(true);
            const [jobsRes, messagesRes, subscribersRes] = await Promise.all([
                axios.get(`${baseUrl}/job`).catch(() => ({ data: [] })),
                axios.get(`${baseUrl}/contact`).catch(() => ({ data: [] })),
                axios.get(`${baseUrl}/newslatter`).catch(() => ({ data: [] })),
            ]);

            const jobs = Array.isArray(jobsRes.data) ? jobsRes.data : [];
            const messages = Array.isArray(messagesRes.data) ? messagesRes.data : [];
            const subscribers = Array.isArray(subscribersRes.data) ? subscribersRes.data : [];

            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const recentMsgs = messages.filter(m => m.createdAt && new Date(m.createdAt) > sevenDaysAgo).length;
            const recentSubs = subscribers.filter(s => s.createdAt && new Date(s.createdAt) > sevenDaysAgo).length;

            // Job type breakdown
            const toLower = (s) => (s || '').toLowerCase();
            const freshers = jobs.filter(j => toLower(j.jobType).includes('fresher') && !toLower(j.jobType).includes('experienced')).length;
            const experienced = jobs.filter(j => toLower(j.jobType).includes('experienced') && !toLower(j.jobType).includes('fresher')).length;
            const freshOrExp = jobs.filter(j => toLower(j.jobType).includes('fresher') && toLower(j.jobType).includes('experienced')).length;
            const internship = jobs.filter(j => toLower(j.jobType).includes('intern')).length;
            const wfh = jobs.filter(j => toLower(j.jobType).includes('work from home') || toLower(j.jobType).includes('wfh') || toLower(j.jobType).includes('remote')).length;

            setStats({
                jobs: { total: jobs.length, freshers, experienced, freshOrExp, internship, wfh },
                messages: { total: messages.length, recent: recentMsgs },
                subscribers: { total: subscribers.length, recent: recentSubs },
            });

            const activity = [];
            if (recentMsgs > 0) activity.push({ text: `${recentMsgs} new message${recentMsgs > 1 ? 's' : ''}`, icon: MessageSquare, color: 'bg-blue-500' });
            if (recentSubs > 0) activity.push({ text: `${recentSubs} new subscriber${recentSubs > 1 ? 's' : ''}`, icon: Mail, color: 'bg-green-500' });
            setRecentActivity(activity);
        } catch (err) {
            console.error('Error fetching stats:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleDropdown = (id) => setDropdownOpen(prev => ({ ...prev, [id]: !prev[id] }));

    // ── sidebar menu ──
    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard,
            action: () => setSelectedContent('Dashboard'),
        },
        {
            id: 'jobs',
            label: 'Jobs',
            icon: Briefcase,
            children: [
                { label: 'Manage Jobs', icon: PlusCircle, action: () => setSelectedContent('TechBlog') },
            ],
        },
        {
            id: 'blogs',
            label: 'Blogs',
            icon: BookOpen,
            children: [
                {
                    label: 'Manage Blogs',
                    icon: PlusCircle,
                    action: () => setSelectedContent('BlogForm'),
                },
            ],
        },

        {
            id: 'queries',
            label: 'Messages',
            icon: HelpCircle,
            action: () => setSelectedContent('ShowContactMsg'),
        },
    ];

    // ── Dashboard content ──────────────────────────────────────────────────
    const DashboardContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="w-14 h-14 rounded-full border-4 border-purple-100 dark:border-purple-900 border-t-purple-600 dark:border-t-purple-400 animate-spin mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-base">Loading dashboard...</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6">

                {/* ── Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            Welcome Back, Admin 👋
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Here's what's happening with your jobs portal today.</p>
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400 dark:text-gray-500">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                    <button
                        onClick={() => setSelectedContent('TechBlog')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 self-start sm:self-auto"
                    >
                        <PlusCircle className="w-4 h-4" /> Post New Job
                    </button>
                </div>

                {/* ── Recent Activity banner ── */}
                {recentActivity.length > 0 && (
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Flame className="w-4 h-4 text-orange-500" />
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recent Activity — last 7 days</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {recentActivity.map((a, i) => {
                                const Icon = a.icon;
                                return (
                                    <div key={i} className="flex items-center gap-2 px-3.5 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
                                        <div className={`w-6 h-6 ${a.color} rounded-lg flex items-center justify-center`}>
                                            <Icon className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{a.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ── Top stats row ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <StatCard
                        icon={Briefcase}
                        title="Total Jobs Posted"
                        value={stats.jobs.total}
                        subtitle="All active job listings"
                        bg="bg-white dark:bg-gray-900"
                        iconBg="bg-gradient-to-br from-violet-500 to-purple-600"
                    />
                    <StatCard
                        icon={MessageSquare}
                        title="Contact Messages"
                        value={stats.messages.total}
                        subtitle={stats.messages.recent > 0 ? `${stats.messages.recent} new this week` : 'All handled'}
                        trend={stats.messages.recent}
                        bg="bg-white dark:bg-gray-900"
                        iconBg="bg-gradient-to-br from-sky-500 to-blue-600"
                    />
                    <StatCard
                        icon={Mail}
                        title="Subscribers"
                        value={stats.subscribers.total}
                        subtitle={stats.subscribers.recent > 0 ? `${stats.subscribers.recent} new this week` : 'Stable'}
                        trend={stats.subscribers.recent}
                        bg="bg-white dark:bg-gray-900"
                        iconBg="bg-gradient-to-br from-emerald-500 to-teal-600"
                    />
                </div>

                {/* ── Job breakdown + quick actions ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    {/* Job type breakdown */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <BarChart2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Job Type Breakdown</h3>
                        </div>
                        {stats.jobs.total === 0 ? (
                            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">No jobs posted yet.</p>
                        ) : (
                            <div className="space-y-4">
                                <ProgressBar label="Freshers" value={stats.jobs.freshers} total={stats.jobs.total} color="bg-gradient-to-r from-violet-400 to-purple-500" />
                                <ProgressBar label="Experienced" value={stats.jobs.experienced} total={stats.jobs.total} color="bg-gradient-to-r from-sky-400 to-blue-500" />
                                <ProgressBar label="Fresher/Experienced" value={stats.jobs.freshOrExp} total={stats.jobs.total} color="bg-gradient-to-r from-indigo-400 to-violet-500" />
                                <ProgressBar label="Internship" value={stats.jobs.internship} total={stats.jobs.total} color="bg-gradient-to-r from-pink-400 to-rose-500" />
                                <ProgressBar label="Work From Home" value={stats.jobs.wfh} total={stats.jobs.total} color="bg-gradient-to-r from-emerald-400 to-teal-500" />
                            </div>
                        )}
                    </div>

                    {/* Quick actions */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
                        </div>
                        <div className="space-y-3">
                            {[
                                {
                                    label: 'Post a New Job',
                                    desc: 'Add a new off-campus drive or fresher job',
                                    icon: PlusCircle,
                                    color: 'from-violet-500 to-purple-600',
                                    action: () => setSelectedContent('TechBlog'),
                                },
                                {
                                    label: 'View All Jobs',
                                    desc: 'Manage and edit existing job listings',
                                    icon: List,
                                    color: 'from-sky-500 to-blue-600',
                                    action: () => setSelectedContent('TechBlog'),
                                },
                                {
                                    label: 'Read Messages',
                                    desc: `${stats.messages.recent > 0 ? stats.messages.recent + ' unread messages' : 'No new messages'}`,
                                    icon: MessageSquare,
                                    color: 'from-emerald-500 to-teal-600',
                                    action: () => setSelectedContent('ShowContactMsg'),
                                },
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={i}
                                        onClick={item.action}
                                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800 hover:shadow-sm transition-all text-left group"
                                    >
                                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-4.5 h-4.5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{item.desc}</p>
                                        </div>
                                        <ChevronDown className="-rotate-90 w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-purple-500 transition-colors" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Platform summary strip ── */}
                <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-2xl p-6">
                    <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">Platform Overview</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[
                            { value: stats.jobs.total, label: 'Total Jobs', icon: Briefcase },
                            { value: stats.messages.total, label: 'Messages', icon: MessageSquare },
                            { value: stats.subscribers.total, label: 'Subscribers', icon: Mail },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="bg-white/15 backdrop-blur rounded-xl p-4 text-center">
                                    <Icon className="w-5 h-5 text-white/80 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-white">{item.value}</p>
                                    <p className="text-xs text-white/70 mt-0.5">{item.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── System status ── */}
                <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
                    <div className="relative flex-shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping opacity-75" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">All systems operational</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Last updated: {new Date().toLocaleTimeString()}</p>
                    </div>
                </div>

            </div>
        );
    };

    // ── RENDER ─────────────────────────────────────────────────────────────
    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">

                {/* ── SIDEBAR ── */}
                <aside className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900
                    border-r border-gray-100 dark:border-gray-800
                    flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:static
                `}>

                    {/* Logo */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                <Briefcase className="w-4 h-4 text-white" />
                            </div>
                            <h1 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                                JobPortal
                            </h1>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                        {menuItems.map(item => (
                            <div key={item.id}>
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.id)}
                                            className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className="w-4.5 h-4.5" />
                                                <span className="text-sm font-medium">{item.label}</span>
                                            </div>
                                            <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen[item.id] ? 'rotate-180' : ''}`} />
                                        </button>
                                        {dropdownOpen[item.id] && (
                                            <div className="ml-7 mt-1 space-y-0.5">
                                                {item.children.map((child, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => { child.action(); setSidebarOpen(false); }}
                                                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                                    >
                                                        {child.icon && <child.icon className="w-3.5 h-3.5" />}
                                                        {child.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <button
                                        onClick={() => { item.action(); setSidebarOpen(false); }}
                                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${(item.id === 'dashboard' && selectedContent === 'Dashboard') ||
                                            (item.id === 'queries' && selectedContent === 'ShowContactMsg')
                                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
                                        {item.label}
                                    </button>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Bottom */}
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-1">
                        <a href="/AddAdmin">
                            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <UserPlus className="w-4.5 h-4.5" />
                                Add Admin
                            </button>
                        </a>
                        <Logout />
                    </div>
                </aside>

                {/* ── MAIN CONTENT ── */}
                <div className="flex-1 flex flex-col overflow-hidden min-w-0">

                    {/* Top bar */}
                    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3.5 flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hidden lg:flex">
                            <LayoutDashboard className="w-4 h-4" />
                            <span>/</span>
                            <span className="text-gray-900 dark:text-white font-medium">
                                {selectedContent === 'Dashboard'
                                    ? 'Dashboard'
                                    : selectedContent === 'TechBlog'
                                        ? 'Jobs Management'
                                        : selectedContent === 'BlogForm'
                                            ? 'Blog Management'
                                            : selectedContent === 'ShowContactMsg'
                                                ? 'Messages'
                                                : selectedContent}
                            </span>
                        </div>

                        <div className="flex-1" />

                        {/* Dark mode toggle */}
                        <button
                            onClick={() => setDarkMode(d => !d)}
                            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            {darkMode
                                ? <Sun className="w-4.5 h-4.5 text-yellow-500" />
                                : <Moon className="w-4.5 h-4.5 text-gray-600 dark:text-gray-300" />
                            }
                        </button>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
                        {selectedContent === 'Dashboard' && <DashboardContent />}
                        {selectedContent === 'TechBlog' && <TechBlog />}
                        {selectedContent === 'BlogForm' && <BlogForm />}
                        {selectedContent === 'ShowContactMsg' && <ShowContactMsg />}
                    </main>
                </div>
            </div>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}

export default AdminDashboard;