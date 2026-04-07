
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Briefcase, MapPin, IndianRupee, Clock,
    ArrowRight, Sparkles, Zap, TrendingUp
} from 'lucide-react';
import { baseUrl } from '../Baseurl';

const truncate = (text, len) => {
    if (!text) return '';
    return text.length <= len ? text : text.slice(0, len) + '...';
};

const GRADIENTS = [
    { tagColor: 'from-red-500 to-pink-500', bgGradient: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20' },
    { tagColor: 'from-blue-500 to-cyan-500', bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' },
    { tagColor: 'from-yellow-500 to-orange-500', bgGradient: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' },
    { tagColor: 'from-green-500 to-emerald-500', bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' },
    { tagColor: 'from-orange-500 to-red-500', bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20' },
    { tagColor: 'from-purple-500 to-indigo-500', bgGradient: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20' },
    { tagColor: 'from-pink-500 to-rose-500', bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20' },
    { tagColor: 'from-teal-500 to-cyan-600', bgGradient: 'from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20' },
];

/* ── Skeleton Card ── */
const SkeletonCard = () => (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg overflow-hidden animate-pulse">
        <div className="h-24 bg-gray-200 dark:bg-gray-700" />
        <div className="p-5 space-y-3">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-xl w-28 mt-2" />
        </div>
        <div className="h-1 bg-gray-200 dark:bg-gray-700" />
    </div>
);

/* ── Job Card — original design, text adjusted to match ResourceGrid ── */
const JobCard = ({ job, index, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { tagColor, bgGradient } = GRADIENTS[index % GRADIENTS.length];

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="block group relative cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* Animated Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${tagColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse-glow`} />

            {/* Card */}
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-300 dark:border-gray-700 flex flex-col h-full">

                {/* Top Tag */}
                <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1.5 bg-gradient-to-r ${tagColor} text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1 animate-bounce-subtle`}>
                        <TrendingUp className="w-3 h-3 animate-pulse" />
                        {job.jobType || 'Off Campus'}
                    </span>
                </div>

                {/* Icon Section with Gradient Background */}
                <div className={`bg-gradient-to-br ${bgGradient} backdrop-blur-sm p-6 border-b border-gray-300 dark:border-gray-700 relative overflow-hidden`}>
                    <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${tagColor} rounded-full opacity-20 blur-md animate-float`} />
                    <div className={`absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-br ${tagColor} rounded-full opacity-30 blur-md animate-float animation-delay-1000`} />

                    <div className="relative">
                        <div className="w-[80px] h-[80px] bg-white dark:bg-gray-700 rounded-2xl shadow-xl flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-float-gentle">
                            💼
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                    {/* Company — matches ResourceCard's subtitle style */}
                    <p className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${tagColor} bg-clip-text text-transparent mb-1 truncate`}>
                        {job.company}
                    </p>

                    {/* Title — matches ResourceCard h2 */}
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all leading-snug">
                        {job.title}
                    </h2>

                    {/* Description — matches ResourceCard p */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
                        {truncate(job.description, 90) || 'Exciting opportunity — click to view full details and apply.'}
                    </p>

                    {/* Meta info */}
                    <div className="space-y-1 mb-4">
                        {job.location && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                                <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
                                <span className="truncate">{job.location}</span>
                            </div>
                        )}
                        {job.salary && (
                            <div className="flex items-center gap-1.5 text-xs">
                                <IndianRupee className="w-3 h-3 text-green-500 flex-shrink-0" />
                                <span className="font-semibold text-green-600 dark:text-green-400">{job.salary} LPA</span>
                            </div>
                        )}
                        {job.lastDate && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                                <Clock className="w-3 h-3 text-orange-400 flex-shrink-0" />
                                <span>Apply by <span className="text-red-500 font-semibold">{job.lastDate}</span></span>
                            </div>
                        )}
                        {job.experience && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                                <Zap className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                                <span>{job.experience}</span>
                            </div>
                        )}
                    </div>

                    {/* CTA Button — matches ResourceCard button with shimmer */}
                    <button className={`relative w-fit flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r ${tagColor} text-white rounded-xl font-semibold shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                        <span className="relative z-10 flex items-center gap-2 text-sm">
                            View Details
                            <ArrowRight className={`w-4 h-4 transform transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                        </span>
                    </button>
                </div>

                {/* Accent Line */}
                <div className={`h-1 bg-gradient-to-r ${tagColor} animate-gradient-flow bg-[length:200%_auto]`} />
            </div>
        </div>
    );
};

/* ── Main Section ── */
const JobsHeroSection = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/job`);
                const data = Array.isArray(res.data) ? res.data : [];
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
        <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">

            {/* Background blobs — same as ResourceGrid */}
            <div className="fixed top-20 left-10 w-64 h-64 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-10 animate-blob pointer-events-none" />
            <div className="fixed bottom-20 right-10 w-64 h-64 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-10 animate-blob animation-delay-2000 pointer-events-none" />

            {/* ── Header — matches ResourceGrid header exactly ── */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="container mx-auto px-4 py-12">

                    {/* Badge */}
                    <div className="flex justify-center mb-6 animate-fade-in">
                        <div className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:scale-105 transition-transform relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
                            <Sparkles className="relative w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
                            <span className="relative text-purple-700 dark:text-purple-300 font-semibold text-sm">Latest Job Opportunities</span>
                        </div>
                    </div>

                    {/* Heading — same as ResourceGrid: text-4xl md:text-5xl lg:text-5xl font-bold */}
                    <h1 className="text-center text-4xl md:text-5xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 animate-slide-up">
                        Fresh Jobs For Your{' '}
                        <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                            Dream Career
                        </span>
                    </h1>

                    {/* Subtitle — same as ResourceGrid: text-lg md:text-xl text-gray-600 dark:text-gray-300 */}
                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in animation-delay-300">
                        Handpicked off-campus drives, fresher jobs & internships — updated daily for students and professionals
                    </p>

                    {/* Live indicator */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                        </span>
                        <span className="text-sm text-green-600 dark:text-green-400 font-semibold">Updated Today</span>
                    </div>
                </div>
            </div>

            {/* ── Stats Bar — matches ResourceGrid stats bar ── */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {[
                            { label: 'Jobs Listed', value: '100+', cls: 'from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400' },
                            { label: 'Companies', value: '50+', cls: 'from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400' },
                            { label: 'Daily Updates', value: 'Daily', cls: 'from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400' },
                            { label: 'Cost', value: 'Free', cls: 'from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400' },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center group cursor-pointer animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                                {/* Same as ResourceGrid: text-3xl font-bold bg-gradient-to-r */}
                                <p className={`text-3xl font-bold bg-gradient-to-r ${stat.cls} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}>
                                    {stat.value}
                                </p>
                                {/* Same as ResourceGrid: text-gray-600 dark:text-gray-400 text-sm */}
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Cards Grid ── */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : jobs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
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
                            <div className="text-5xl mb-4">💼</div>
                            <p className="text-gray-600 dark:text-gray-300 text-lg font-semibold">No jobs available right now</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Check back soon!</p>
                        </div>
                    )}

                    {/* Explore All Jobs button */}
                    <div className="text-center">
                        <div className="group inline-block relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                            <button
                                onClick={() => navigate('/Job-Portal')}
                                className="relative flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-semibold text-lg shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore All Jobs
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">No login required to browse jobs</p>
                    </div>
                </div>
            </div>

            {/* Keyframes — identical to ResourceGrid */}
            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes float-gentle {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(3deg); }
                }
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 0.2; }
                }
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes gradient-flow {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-blob           { animation: blob 7s infinite; }
                .animate-float          { animation: float 3s ease-in-out infinite; }
                .animate-float-gentle   { animation: float-gentle 4s ease-in-out infinite; }
                .animate-bounce-subtle  { animation: bounce-subtle 2s ease-in-out infinite; }
                .animate-pulse-glow     { animation: pulse-glow 2s ease-in-out infinite; }
                .animate-gradient-x     { animation: gradient-x 3s ease infinite; }
                .animate-gradient-flow  { animation: gradient-flow 3s linear infinite; }
                .animate-fade-in        { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
                .animate-slide-up       { animation: slide-up 0.8s ease-out; }
                .animation-delay-2000   { animation-delay: 2s; }
                .animation-delay-1000   { animation-delay: 1s; }
                .animation-delay-300    { animation-delay: 0.3s; }
            `}</style>
        </div>
    );
};

export default JobsHeroSection;