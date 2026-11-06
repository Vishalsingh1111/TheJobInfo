


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
    Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ── Import your components ──
import TechBlog from '../TechBlogs/TechBlogForm';
import BlogForm from '../Blogs/BlogForm';
import ShowContactMsg from '../Admin_common/Showcontactmsg';
import Logout from '../Admin_authentications/AdminLogout';

// ── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, title, value, subtitle, trend, bg, iconBg }) => (
    <div className={`${bg} rounded-2xl p-5 border border-slate-200/80 dark:border-gray-800 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200`}>
        <div className="flex items-start justify-between mb-4">
            <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
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
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('admin-theme') === 'dark');
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
    const [dailyVisitors, setDailyVisitors] = useState([]);
    const [visitorError, setVisitorError] = useState('');

    // ── dark mode toggle ──
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        document.body.classList.toggle('dark', darkMode);
        localStorage.setItem('admin-theme', darkMode ? 'dark' : 'light');
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
                axios.get(`${baseUrl}/admin/visitors`).then((response) => {
                    setDailyVisitors(Array.isArray(response.data?.dailyVisitors) ? response.data.dailyVisitors : []);
                    setVisitorError('');
                }).catch((error) => {
                    console.error('Error fetching daily visitors:', error);
                    setDailyVisitors([]);
                    setVisitorError('Visitor counts could not be loaded.');
                }),
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
        const today = new Date().toISOString().slice(0, 10);
        const visitorsToday = dailyVisitors.find((entry) => entry.date === today)?.count || 0;
        if (loading) {
            return (
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="w-14 h-14 rounded-full border-4 border-teal-100 dark:border-teal-900 border-t-teal-600 dark:border-t-teal-400 animate-spin mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-base">Loading dashboard...</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6">

                {/* ── Header ── */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
                            TheJobInfo · Admin
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                            Dashboard overview
                        </h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">A live snapshot of your jobs portal.</p>
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400 dark:text-gray-500">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                    <button
                        onClick={() => setSelectedContent('TechBlog')}
                        className="inline-flex items-center gap-2 self-start rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg sm:self-auto"
                    >
                        <PlusCircle className="w-4 h-4" /> Post New Job
                    </button>
                </div>

                {/* ── Recent Activity banner ── */}
                {recentActivity.length > 0 && (
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatCard
                        icon={Briefcase}
                        title="Total Jobs Posted"
                        value={stats.jobs.total}
                        subtitle="All active job listings"
                        bg="bg-white dark:bg-gray-900"
                        iconBg="bg-gradient-to-br from-blue-500 to-teal-600"
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
                    <StatCard
                        icon={Users}
                        title="Visitors Today"
                        value={visitorsToday.toLocaleString('en-IN')}
                        subtitle="One count per browser each day"
                        bg="bg-white dark:bg-gray-900"
                        iconBg="bg-gradient-to-br from-violet-500 to-indigo-600"
                    />
                </div>

                <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Daily Visitors</h3>
                    </div>
                    {visitorError ? (
                        <p role="alert" className="text-sm text-red-600 dark:text-red-400">{visitorError}</p>
                    ) : dailyVisitors.length === 0 ? (
                        <p className="py-4 text-sm text-gray-400 dark:text-gray-500">No visitor data recorded yet.</p>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                            {dailyVisitors.slice(0, 14).map(({ date, count }) => (
                                <div key={date} className="rounded-xl bg-slate-50 p-3 dark:bg-gray-800">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(`${date}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' })}
                                    </p>
                                    <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">{Number(count).toLocaleString('en-IN')}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* ── Job breakdown + quick actions ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    {/* Job type breakdown */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center gap-2 mb-5">
                            <BarChart2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Job Type Breakdown</h3>
                        </div>
                        {stats.jobs.total === 0 ? (
                            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">No jobs posted yet.</p>
                        ) : (
                            <div className="space-y-4">
                                <ProgressBar label="Freshers" value={stats.jobs.freshers} total={stats.jobs.total} color="bg-gradient-to-r from-blue-400 to-teal-500" />
                                <ProgressBar label="Experienced" value={stats.jobs.experienced} total={stats.jobs.total} color="bg-gradient-to-r from-sky-400 to-blue-500" />
                                <ProgressBar label="Fresher/Experienced" value={stats.jobs.freshOrExp} total={stats.jobs.total} color="bg-gradient-to-r from-sky-400 to-blue-500" />
                                <ProgressBar label="Internship" value={stats.jobs.internship} total={stats.jobs.total} color="bg-gradient-to-r from-cyan-400 to-teal-500" />
                                <ProgressBar label="Work From Home" value={stats.jobs.wfh} total={stats.jobs.total} color="bg-gradient-to-r from-emerald-400 to-teal-500" />
                            </div>
                        )}
                    </div>

                    {/* Quick actions */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center gap-2 mb-5">
                            <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
                        </div>
                        <div className="space-y-3">
                            {[
                                {
                                    label: 'Post a New Job',
                                    desc: 'Add a new off-campus drive or fresher job',
                                    icon: PlusCircle,
                                    color: 'from-blue-500 to-teal-600',
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
                                        className="w-full flex items-center gap-4 rounded-xl border border-slate-200/80 p-4 text-left transition-all hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-sm dark:border-gray-800 dark:hover:border-blue-800 dark:hover:bg-blue-950/20 group"
                                    >
                                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-4.5 h-4.5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{item.desc}</p>
                                        </div>
                                        <ChevronDown className="-rotate-90 w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-teal-500 transition-colors" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Platform summary strip ── */}
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-sky-700 p-6 shadow-lg shadow-blue-900/10">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/75">Platform overview</p>
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
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
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
            <div className="flex min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-gray-950 dark:text-slate-100 lg:h-screen lg:overflow-hidden">

                {/* ── SIDEBAR ── */}
                <aside className={`
                    fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200/80 bg-white dark:border-gray-800 dark:bg-gray-900
                    flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:static
                `}>

                    {/* Logo */}
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 dark:border-gray-800">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-sm shadow-blue-600/20">
                                <Briefcase className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">TheJobInfo</h1>
                                <p className="text-[11px] font-medium text-slate-500 dark:text-gray-400">Admin workspace</p>
                            </div>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-gray-500">Workspace</p>
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
                                                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
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
                                            ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md'
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
                    <div className="space-y-1 border-t border-slate-100 p-4 dark:border-gray-800">
                        <button onClick={() => navigate('/AddAdmin')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                            <UserPlus className="w-4.5 h-4.5" /> Add Admin
                        </button>
                        <Logout />
                    </div>
                </aside>

                {/* ── MAIN CONTENT ── */}
                <div className="flex-1 flex flex-col overflow-hidden min-w-0">

                    {/* Top bar */}
                    <header className="flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-3.5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90 md:px-6">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                            aria-label="Open navigation menu"
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
                            className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition-colors hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                        >
                            {darkMode
                                ? <Sun className="w-4.5 h-4.5 text-yellow-500" />
                                : <Moon className="w-4.5 h-4.5 text-gray-600 dark:text-gray-300" />
                            }
                        </button>
                    </header>

                    {/* Page content */}
                    <main className="min-w-0 flex-1 bg-slate-50 p-4 dark:bg-gray-950 md:p-6 lg:overflow-y-auto lg:p-8">
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
