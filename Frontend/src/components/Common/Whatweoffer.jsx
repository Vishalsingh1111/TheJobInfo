import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import {
    Briefcase, MapPin, Users, Target, Zap, Heart,
    Mail, Send, CheckCircle, ArrowRight, Globe,
    TrendingUp, Bell, Star, Clock, Building2,
    ExternalLink, Flame
} from 'lucide-react';

const About = () => {

    const stats = [
        { number: '100+', label: 'Jobs Listed', color: 'from-violet-600 to-purple-600' },
        { number: '50+', label: 'Companies', color: 'from-sky-600 to-blue-600' },
        { number: '10K+', label: 'Community Members', color: 'from-emerald-600 to-teal-600' },
        { number: 'Free', label: 'Always Free', color: 'from-orange-600 to-amber-600' },
    ];

    const offerings = [
        {
            icon: Briefcase,
            color: 'from-violet-500 to-purple-600',
            title: 'Off-Campus Job Drives',
            desc: 'Latest off-campus drives, fresher jobs, and internships — curated daily for college students and working professionals across India.',
        },
        {
            icon: Bell,
            color: 'from-sky-500 to-blue-600',
            title: 'Instant Job Alerts',
            desc: 'Join our Telegram community and get notified the moment a new job is posted — never miss an application deadline again.',
        },
        {
            icon: Target,
            color: 'from-emerald-500 to-teal-600',
            title: 'Smart Job Filters',
            desc: 'Filter by category, job type, location, salary range, and experience level. Find exactly the jobs that match your profile.',
        },
        {
            icon: Globe,
            color: 'from-orange-500 to-amber-600',
            title: 'Pan-India Coverage',
            desc: 'Jobs from all major cities — Hyderabad, Bengaluru, Pune, Mumbai, Delhi, Chennai, Noida, Kolkata, and fully remote opportunities.',
        },
    ];

    const values = [
        {
            icon: Target,
            color: 'from-violet-500 to-purple-600',
            title: 'Curated & Verified',
            desc: 'Every job listing is sourced directly from official company career pages. No spam, no fake listings — only real opportunities.'
        },
        {
            icon: Zap,
            color: 'from-sky-500 to-blue-600',
            title: 'Updated Daily',
            desc: 'The job market moves fast. Our team updates listings every single day so you always have access to the freshest opportunities.'
        },
        {
            icon: Users,
            color: 'from-emerald-500 to-teal-600',
            title: 'Community First',
            desc: 'Our Telegram community of 10,000+ students helps each other with opportunities, interview tips, and career guidance.'
        },
        {
            icon: Heart,
            color: 'from-rose-500 to-pink-600',
            title: '100% Free',
            desc: 'Quality job discovery should not have a price tag. Every feature on our platform is completely free for every user, forever.'
        },
    ];

    const teamValues = [
        'Transparency in all job listings',
        'No fake or misleading job posts',
        'Respect for user privacy',
        'Daily content updates',
        'Free access for all students',
        'Active community support',
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">

                {/* ── HERO ── */}
                <div className="bg-gray-50 dark:bg-gray-950 ">
                    <div className="max-w-5xl mx-auto px-4 py-14 text-center">
                        <div className="flex justify-center mb-5">
                            <span className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 px-5 py-2 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300">
                                <Briefcase className="w-4 h-4" />
                                About Us
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
                            We help you go from{' '}
                            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                learner to hired
                            </span>
                        </h1>
                        <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
                            A dedicated job discovery platform built for college students, freshers, and professionals who want to find their next opportunity — updated daily, completely free.
                        </p>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <a href="/Job-Portal"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all">
                                Browse Jobs <ArrowRight className="w-4 h-4" />
                            </a>
                            <a href="https://t.me/dcoder21575" target="_blank" rel="noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-sm font-semibold transition-all hover:scale-105">
                                <Send className="w-4 h-4" /> Join Telegram
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── STATS ── */}
                <div className="bg-gray-50 dark:bg-gray-950 py-8">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((s, i) => (
                                <div key={i} className="text-center p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <p className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.number}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

                    {/* ── OUR STORY ── */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                        <div className="px-6 py-5 border-b border-gray-50 dark:border-gray-800">
                            <p className="text-xs font-semibold uppercase tracking-widest text-purple-500">Our story</p>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">Why we built this</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                Job hunting for freshers and college students in India is unnecessarily painful. Opportunities are scattered across dozens of websites, Telegram groups, and LinkedIn posts — most of which are either outdated, fake, or buried under noise.
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                We built this platform to change that. One clean, fast, updated-daily destination where you can find real off-campus drives, fresher jobs, and internships — filtered exactly to your needs.
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                Today, we serve thousands of job seekers every month. Our Telegram community keeps everyone connected, motivated, and notified the moment new opportunities drop.
                            </p>
                            <div className="flex items-center gap-2 pt-2">
                                <Flame className="w-4 h-4 text-orange-500" />
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">Our mission: make job discovery accessible, honest, and free.</p>
                            </div>
                        </div>
                    </div>

                    {/* ── WHAT WE OFFER ── */}
                    <div>
                        <div className="text-center mb-6">
                            <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-1">What we offer</p>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Everything in one place</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {offerings.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── OUR VALUES ── */}
                    <div>
                        <div className="text-center mb-6">
                            <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-1">Our values</p>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What we stand for</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {values.map((v, i) => {
                                const Icon = v.icon;
                                return (
                                    <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-start gap-4 hover:shadow-md transition-all">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center flex-shrink-0`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{v.title}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── COMMITMENTS ── */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-4">Our commitments</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {teamValues.map((val, i) => (
                                <div key={i} className="flex items-center gap-2.5">
                                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── ADVERTISE WITH US (monetization) ── */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                        <div className="px-6 py-5 border-b border-gray-50 dark:border-gray-800">
                            <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-1">Partnerships & Advertising</p>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Advertise with us</h2>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                                Our platform reaches thousands of actively job-seeking freshers, students, and professionals every month. If you're a company looking to reach this audience — whether to promote job drives, products, or services — we'd love to work with you.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                {[
                                    { label: 'Monthly Visitors', value: '50K+', color: 'from-violet-500 to-purple-600' },
                                    { label: 'Telegram Members', value: '10K+', color: 'from-sky-500 to-blue-600' },
                                    { label: 'Job Listings/Month', value: '100+', color: 'from-emerald-500 to-teal-600' },
                                ].map((m, i) => (
                                    <div key={i} className={`bg-gradient-to-br ${m.color} rounded-xl p-4 text-center`}>
                                        <p className="text-2xl font-bold text-white">{m.value}</p>
                                        <p className="text-xs text-white/80 mt-0.5">{m.label}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <a href="mailto:dcodermail1@gmail.com"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all">
                                    <Mail className="w-4 h-4" /> Get in touch
                                </a>
                                <p className="self-center text-xs text-gray-400 dark:text-gray-500">
                                    We also display Google AdSense ads to help keep the platform free.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── CONTACT CTA ── */}
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-center shadow-lg">
                        <h3 className="text-xl font-bold text-white mb-2">Get in Touch</h3>
                        <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
                            Have a question, suggestion, job listing request, or want to collaborate? We'd love to hear from you.
                        </p>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <a href="https://t.me/dcoder21575" target="_blank" rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105">
                                <Send className="w-4 h-4" /> Telegram
                            </a>
                            <a href="mailto:dcodermail1@gmail.com"
                                className="inline-flex items-center gap-2 bg-white text-purple-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-105 transition-all shadow-md">
                                <Mail className="w-4 h-4" /> Email Us
                            </a>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;