import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Briefcase, MapPin, IndianRupee, Clock, ArrowUpRight,
    Flame, Sparkles, ChevronRight, Zap, ExternalLink
} from 'lucide-react';
import { baseUrl } from '../../Baseurl';

const truncate = (text, len) => {
    if (!text) return '';
    return text.length <= len ? text : text.slice(0, len) + '...';
};

const GRADIENTS = [
    { card: 'from-violet-500 to-purple-600', badge: 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-300', glow: 'shadow-violet-500/20' },
    { card: 'from-rose-500 to-pink-600', badge: 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300', glow: 'shadow-rose-500/20' },
    { card: 'from-blue-500 to-cyan-600', badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300', glow: 'shadow-blue-500/20' },
    { card: 'from-emerald-500 to-teal-600', badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300', glow: 'shadow-emerald-500/20' },
    { card: 'from-orange-500 to-red-500', badge: 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300', glow: 'shadow-orange-500/20' },
    { card: 'from-indigo-500 to-blue-600', badge: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300', glow: 'shadow-indigo-500/20' },
    { card: 'from-fuchsia-500 to-pink-500', badge: 'bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-600 dark:text-fuchsia-300', glow: 'shadow-fuchsia-500/20' },
    { card: 'from-amber-500 to-orange-500', badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300', glow: 'shadow-amber-500/20' },
];

/* ── Single Job Card ── */
const JobCard = ({ job, index, onClick }) => {
    const g = GRADIENTS[index % GRADIENTS.length];

    return (
        <div
            onClick={onClick}
            className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col"
            style={{ animationDelay: `${index * 60}ms` }}
        >
            {/* Top gradient bar */}
            <div className={`h-1.5 bg-gradient-to-r ${g.card} w-0 group-hover:w-full transition-all duration-500`} />

            {/* Subtle background glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${g.card} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none`} />

            <div className="p-5 flex flex-col flex-1 relative">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    {/* Company icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.card} flex items-center justify-center flex-shrink-0 shadow-lg ${g.glow} group-hover:scale-110 transition-transform duration-300`}>
                        <Briefcase className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>

                    {/* Job type badge */}
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${g.badge} flex-shrink-0`}>
                        {job.jobType || 'Off Campus'}
                    </span>
                </div>

                {/* Company name */}
                <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 bg-gradient-to-r ${g.card} bg-clip-text text-transparent`}>
                    {job.company}
                </p>

                {/* Job title */}
                <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-violet-600 group-hover:to-pink-600 dark:group-hover:from-violet-400 dark:group-hover:to-pink-400 transition-all duration-300">
                    {job.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2 flex-1">
                    {truncate(job.description, 90)}
                </p>

                {/* Meta row */}
                <div className="space-y-1.5 mb-4">
                    {job.location && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
                            <span className="truncate">{job.location}</span>
                        </div>
                    )}
                    {job.salary && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <IndianRupee className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span className="font-semibold text-green-600 dark:text-green-400">{job.salary} LPA</span>
                        </div>
                    )}
                    {job.lastDate && (
                        <div className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400">
                            <Clock className="w-3 h-3 flex-shrink-0" />
                            <span>Apply by {job.lastDate}</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-yellow-500" fill="currentColor" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {job.experience || 'Freshers Welcome'}
                        </span>
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${g.card} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── Skeleton loader ── */
const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 animate-pulse">
        <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            </div>
        </div>
        <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
        </div>
        <div className="space-y-1.5 mb-4">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        </div>
        <div className="h-px bg-gray-200 dark:bg-gray-700 mb-3" />
        <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
    </div>
);

/* ── Main Hero Section ── */
const JobsHeroSection = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/job`);
                const data = Array.isArray(res.data) ? res.data : [];
                // Sort by id descending to get latest, take 8
                const latest = [...data]
                    .sort((a, b) => (b.id || 0) - (a.id || 0))
                    .slice(0, 8);
                setJobs(latest);
            } catch (err) {
                console.error('Failed to fetch jobs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleCardClick = (jobId) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(`/jobdetail/${jobId}`);
    };

    return (
        <section className="relative py-16 md:py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden">

            {/* ── Background decorations ── */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/3 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 max-w-7xl relative">

                {/* ── Section Header ── */}
                <div className="text-center mb-12">
                    {/* Pill badge */}
                    <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-400 shadow-sm mb-5">
                        <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                        <span>Latest Opportunities</span>
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                        Fresh{' '}
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Job Openings
                            </span>
                            {/* Underline accent */}
                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full" />
                        </span>
                        {' '}for You
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                        Handpicked off-campus drives, fresher jobs & internships — updated daily.
                        Don't miss your next big opportunity.
                    </p>

                    {/* Live indicator */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-xs text-green-600 dark:text-green-400 font-semibold">Updated Today</span>
                    </div>
                </div>

                {/* ── Jobs Grid ── */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
                        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : jobs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
                        {jobs.map((job, index) => (
                            <JobCard
                                key={job._id}
                                job={job}
                                index={index}
                                onClick={() => handleCardClick(job._id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Briefcase className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">No jobs available right now. Check back soon!</p>
                    </div>
                )}

                {/* ── Explore More Button ── */}
                <div className="text-center">
                    {/* Stats row */}
                    <div className="flex items-center justify-center gap-6 mb-6">
                        <div className="text-center">
                            <p className="text-2xl font-black bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">100+</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Jobs</p>
                        </div>
                        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
                        <div className="text-center">
                            <p className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Daily</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Updates</p>
                        </div>
                        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
                        <div className="text-center">
                            <p className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Free</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Always</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/techblog')}
                        className="group inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
                    >
                        <span>Explore All Jobs</span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </button>

                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-3">
                        No login required to browse jobs
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-up {
                    animation: fade-up 0.5s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </section>
    );
};

export default JobsHeroSection;