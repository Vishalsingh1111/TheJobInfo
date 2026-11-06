
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    MapPin, ArrowRight,
    Search, X, ChevronDown, TrendingUp, Sparkles,
    Filter,
    Bookmark, GraduationCap, BriefcaseBusiness, Compass
} from 'lucide-react';
import { baseUrl } from '../Baseurl';
import HeroBlog from './HeroBlog';
import { jobListFaqs } from '../Content/faqs';
import { getActiveJobLocations, matchesJobLocation } from '../components/Common/Filterbar';
import SocialFollowCard from '../components/Common/SocialFollowCard';
const HOME_JOBS_PAGE_SIZE = 10;

// ─────────────────────────────────────────────────────────────────────────────
// FORMAT DATE — shows "12 Jan 2025" or falls back gracefully
// ─────────────────────────────────────────────────────────────────────────────
const formatDate = (raw) => {
    if (!raw) return null;
    const d = new Date(raw);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};
const isNewlyPosted = (job) => {
    const posted = new Date(job.postedAt || job.createdAt || job.postedDate || job.date).getTime();
    return Number.isFinite(posted) && posted >= Date.now() - 48 * 60 * 60 * 1000;
};

// ─────────────────────────────────────────────────────────────────────────────
// FILTER OPTIONS
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_OPTIONS = ['All Categories', 'IT Services', 'Software/IT', 'Data Science', 'Finance', 'Marketing', 'Design', 'Operations', 'HR', 'Any Graduate', 'Core Engineering'];
const JOB_TYPE_OPTIONS = ['All Types', 'Freshers', 'Experienced', 'Internship', 'Work From Home'];
const LOCATION_OPTIONS = ['All Locations', 'Pan India', 'Hyderabad', 'Bengaluru', 'Chennai', 'Pune', 'Mumbai', 'Delhi', 'Noida', 'Kolkata'];
const EXPERIENCE_OPTIONS = ['All Experience', 'Fresher (0)', 'Up to 1 Year', 'Up to 2 Years', '1-3 Years', '2-5 Years', '3-5 Years', '5+ Years'];
const SALARY_OPTIONS = ['All Salaries', 'Under ₹3 LPA', '₹3–5 LPA', '₹5–8 LPA', '₹8–12 LPA', '₹12+ LPA'];
const SORT_OPTIONS = ['Latest First', 'Oldest First'];

// ─────────────────────────────────────────────────────────────────────────────
// SMART RANGE MATCHERS
// ─────────────────────────────────────────────────────────────────────────────
const parseExpRange = (str) => {
    if (!str) return null;
    const lower = str.toLowerCase();
    if (lower.includes('fresher') && !lower.match(/\d/)) return { min: 0, max: 0 };
    const nums = lower.match(/(\d+(\.\d+)?)/g);
    if (!nums) return null;
    const parsed = nums.map(Number);
    if (parsed.length === 1) return { min: parsed[0], max: parsed[0] };
    return { min: Math.min(...parsed), max: Math.max(...parsed) };
};

const matchExperience = (jobExpStr, filterOpt) => {
    if (!filterOpt || filterOpt === EXPERIENCE_OPTIONS[0]) return true;
    const jobRange = parseExpRange(jobExpStr);
    if (!jobRange) return true;
    const map = {
        'Fresher (0)': { min: 0, max: 0 },
        'Up to 1 Year': { min: 0, max: 1 },
        'Up to 2 Years': { min: 0, max: 2 },
        '1-3 Years': { min: 1, max: 3 },
        '2-5 Years': { min: 2, max: 5 },
        '3-5 Years': { min: 3, max: 5 },
        '5+ Years': { min: 5, max: 99 },
    };
    const sel = map[filterOpt];
    if (!sel) return true;
    return jobRange.min <= sel.max && jobRange.max >= sel.min;
};

const parseSalaryLPA = (str) => {
    if (!str) return null;
    const lower = str.toLowerCase().replace(/,/g, '');
    const monthMatch = lower.match(/₹?(\d+(?:\.\d+)?)\s*\/?\s*month/);
    if (monthMatch) {
        const monthly = parseFloat(monthMatch[1]);
        return { min: (monthly * 12) / 100000, max: (monthly * 12) / 100000 };
    }
    const nums = lower.match(/(\d+(?:\.\d+)?)/g);
    if (!nums) return null;
    const parsed = nums.map(Number);
    if (lower.includes('up to') || lower.includes('upto')) return { min: 0, max: parsed[0] };
    if (parsed.length === 1) return { min: 0, max: parsed[0] };
    return { min: Math.min(...parsed), max: Math.max(...parsed) };
};

const matchSalary = (jobSalaryStr, filterOpt) => {
    if (!filterOpt || filterOpt === SALARY_OPTIONS[0]) return true;
    const jobSal = parseSalaryLPA(jobSalaryStr);
    if (!jobSal) return true;
    const buckets = {
        'Under ₹3 LPA': { min: 0, max: 3 },
        '₹3–5 LPA': { min: 3, max: 5 },
        '₹5–8 LPA': { min: 5, max: 8 },
        '₹8–12 LPA': { min: 8, max: 12 },
        '₹12+ LPA': { min: 12, max: 999 },
    };
    const bucket = buckets[filterOpt];
    if (!bucket) return true;
    return jobSal.min <= bucket.max && jobSal.max >= bucket.min;
};

// ─────────────────────────────────────────────────────────────────────────────
// CARD GRADIENTS
// ─────────────────────────────────────────────────────────────────────────────
const CARD_GRADS = [
    { bg: 'from-emerald-600 to-green-700' },
    { bg: 'from-cyan-600 to-teal-600' },
    { bg: 'from-blue-600 to-sky-500' },
    { bg: 'from-teal-600 to-cyan-600' },
    { bg: 'from-sky-600 to-blue-500' },
    { bg: 'from-teal-600 to-cyan-700' },
];

// ─────────────────────────────────────────────────────────────────────────────
// FILTER DROPDOWN
// ─────────────────────────────────────────────────────────────────────────────
const FilterDropdown = ({ label, options, value, onChange, counts }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);
    const active = value !== options[0];
    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm font-bold transition-all whitespace-nowrap ${active
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                    }`}
            >
                <span className="max-w-[120px] truncate">{active ? value : label}</span>
                <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="absolute top-full mt-1.5 left-0 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl py-1 min-w-[175px]">
                    {options.map(opt => (
                        <button
                            key={opt}
                            onClick={() => { onChange(opt); setOpen(false); }}
                            className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm font-medium transition-colors ${value === opt
                                ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/20'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            <span>{opt}</span>
                            {counts && <span className="text-xs tabular-nums text-gray-500 dark:text-gray-400">{counts[opt] ?? 0}</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// SKELETONS
// ─────────────────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="h-44 bg-gray-200 dark:bg-gray-800" />
        <div className="p-5 space-y-3">
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
            <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full" />
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
            <div className="flex gap-2 pt-1">
                <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-lg w-20" />
                <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-lg w-20" />
            </div>
        </div>
    </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// VERTICAL JOB CARD  (grid)
// ─────────────────────────────────────────────────────────────────────────────
const JobCard = ({ job, index, onClick, saved, onToggleSave }) => {
    const { bg } = CARD_GRADS[index % CARD_GRADS.length];
    const postedDate = formatDate(job.createdAt || job.postedAt || job.postedDate || job.date);

    return (
        <div
            onClick={onClick}
            role="link"
            tabIndex={0}
            onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onClick(); } }}
            className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
        >
            <div className={`relative min-h-[218px] overflow-hidden bg-gradient-to-br ${bg} p-5 text-white`}>
                <div aria-hidden="true" className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.8) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                <div aria-hidden="true" className="absolute -right-5 -top-14 h-36 w-36 rounded-full border-[24px] border-white/10" />
                <div className="relative flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-black text-blue-700 shadow">{(job.company || 'C').slice(0, 1).toUpperCase()}</span>
                    <span className="min-w-0 flex-1 truncate text-sm font-bold">{job.company}</span>
                    {isNewlyPosted(job) && <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-orange-600">New</span>}
                    <button type="button" onClick={event => { event.stopPropagation(); onToggleSave(job); }} aria-label={saved ? 'Remove saved job' : 'Save job'} aria-pressed={saved} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 focus-visible:outline-white">
                        <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
                    </button>
                </div>
                <p className="relative mt-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/85">We are hiring</p>
                <h2 className="relative mt-2 line-clamp-2 text-xl font-extrabold leading-snug text-white">{job.title}</h2>
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                    {[job.jobType, job.location, job.workMode || 'Onsite'].filter(Boolean).slice(0, 3).map(tag => <span key={tag} className="rounded-full bg-black/20 px-2.5 py-1 text-[11px] font-semibold text-white">{tag}</span>)}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300">{job.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-gray-300"><MapPin className="h-4 w-4 shrink-0 text-blue-600" /><span className="truncate">{job.location || 'India'}{job.workMode ? ` · ${job.workMode}` : ''}</span></p>
                {job.experience && <p className="mt-1.5 text-sm text-slate-500 dark:text-gray-400">Experience: {job.experience}</p>}
                {job.salary && <p className="mt-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">{job.salary}</p>}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-gray-700 dark:text-gray-400">
                    <span>{postedDate ? `Posted ${postedDate}` : 'Recently posted'}</span>
                    <span className="font-bold text-blue-700 dark:text-blue-300">View details <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></span>
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const JobsHeroSection = () => {
    const navigate = useNavigate();
    const [allJobs, setAllJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState(() => {
        try { return JSON.parse(localStorage.getItem('savedJobs') || '[]'); }
        catch { return []; }
    });
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState(CATEGORY_OPTIONS[0]);
    const [filterType, setFilterType] = useState(JOB_TYPE_OPTIONS[0]);
    const [filterLocation, setFilterLocation] = useState(LOCATION_OPTIONS[0]);
    const [filterSalary, setFilterSalary] = useState(SALARY_OPTIONS[0]);
    const [filterExp, setFilterExp] = useState(EXPERIENCE_OPTIONS[0]);
    const [filterCompany, setFilterCompany] = useState('');
    const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const [jobsResult, statsResult] = await Promise.allSettled([
                    axios.get(`${baseUrl}/job`, { params: { sort: 'newest' } }),
                    axios.get(`${baseUrl}/job/stats`),
                ]);
                if (jobsResult.status === 'fulfilled') {
                    const jobs = jobsResult.value.data;
                    setAllJobs(Array.isArray(jobs) ? jobs : jobs.jobs || []);
                } else {
                    console.error('Failed to fetch jobs:', jobsResult.reason);
                }
                if (statsResult.status === 'fulfilled') {
                    setStats(statsResult.value.data);
                } else {
                    console.error('Could not load job statistics:', statsResult.reason);
                }
            } catch (err) {
                console.error('Unexpected error while loading homepage jobs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filtered = allJobs.filter(j => {
        const q = search.toLowerCase();
        const matchSearch = !search
            || j.title?.toLowerCase().includes(q)
            || j.company?.toLowerCase().includes(q)
            || j.location?.toLowerCase().includes(q)
            || j.description?.toLowerCase().includes(q);
        const matchCategory = filterCategory === CATEGORY_OPTIONS[0]
            || j.category?.toLowerCase().includes(filterCategory.toLowerCase());
        const matchRemote = filterType === 'Work From Home'
            && (j.workMode?.toLowerCase() === 'remote' || j.location?.toLowerCase().includes('remote'));
        const matchType = filterType === JOB_TYPE_OPTIONS[0]
            || matchRemote
            || j.jobType?.toLowerCase().includes(filterType.toLowerCase())
            || filterType.toLowerCase().includes(j.jobType?.toLowerCase() || '~~');
        const matchLocation = filterLocation === LOCATION_OPTIONS[0]
            || matchesJobLocation(j, filterLocation);
        const matchCompany = !filterCompany
            || j.company?.trim().toLowerCase() === filterCompany.trim().toLowerCase();
        const matchSalaryVal = matchSalary(j.salary || j.salaryNote, filterSalary);
        const matchExpVal = matchExperience(j.experience, filterExp);
        return matchSearch && matchCategory && matchType && matchLocation && matchCompany && matchSalaryVal && matchExpVal;
    }).sort((a, b) => {
        const getTimestamp = job => {
            const date = new Date(job.postedAt || job.createdAt || job.postedDate || job.date).getTime();
            return Number.isFinite(date) ? date : Number(job.id) || 0;
        };
        return sortBy === 'Latest First' ? getTimestamp(b) - getTimestamp(a) : getTimestamp(a) - getTimestamp(b);
    });
    const displayedJobs = filtered.slice(0, HOME_JOBS_PAGE_SIZE);

    const cityLinks = useMemo(() => getActiveJobLocations(allJobs), [allJobs]);
    const locationOptions = useMemo(() => [...new Set([...LOCATION_OPTIONS, ...cityLinks])], [cityLinks]);
    const locationCounts = useMemo(() => Object.fromEntries(
        locationOptions.map((location) => [
            location,
            location === LOCATION_OPTIONS[0]
                ? allJobs.length
                : allJobs.filter((job) => matchesJobLocation(job, location)).length,
        ])
    ), [allJobs, locationOptions]);
    const typeCounts = useMemo(() => Object.fromEntries(
        JOB_TYPE_OPTIONS.map((type) => [
            type,
            type === JOB_TYPE_OPTIONS[0]
                ? allJobs.length
                : allJobs.filter((job) => {
                    if (type === 'Work From Home') {
                        return job.workMode?.toLowerCase() === 'remote' || job.location?.toLowerCase().includes('remote');
                    }
                    return job.jobType?.toLowerCase().includes(type.toLowerCase())
                        || type.toLowerCase().includes(job.jobType?.toLowerCase() || '~~');
                }).length,
        ])
    ), [allJobs]);
    const salaryCounts = useMemo(() => Object.fromEntries(
        SALARY_OPTIONS.map((salary) => [
            salary,
            salary === SALARY_OPTIONS[0] ? allJobs.length : allJobs.filter((job) => matchSalary(job.salary || job.salaryNote, salary)).length,
        ])
    ), [allJobs]);
    const experienceCounts = useMemo(() => Object.fromEntries(
        EXPERIENCE_OPTIONS.map((experience) => [
            experience,
            experience === EXPERIENCE_OPTIONS[0] ? allJobs.length : allJobs.filter((job) => matchExperience(job.experience, experience)).length,
        ])
    ), [allJobs]);

    const applyQuickFilter = ({ location = LOCATION_OPTIONS[0], type = JOB_TYPE_OPTIONS[0] }) => {
        setSearch('');
        setFilterCategory(CATEGORY_OPTIONS[0]);
        setFilterCompany('');
        setFilterLocation(location);
        setFilterType(type);
        setFilterSalary(SALARY_OPTIONS[0]);
        setFilterExp(EXPERIENCE_OPTIONS[0]);
        setSortBy(SORT_OPTIONS[0]);
        document.getElementById('home-job-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const applyCompanyFilter = (company) => {
        setSearch('');
        setFilterCategory(CATEGORY_OPTIONS[0]);
        setFilterType(JOB_TYPE_OPTIONS[0]);
        setFilterLocation(LOCATION_OPTIONS[0]);
        setFilterSalary(SALARY_OPTIONS[0]);
        setFilterExp(EXPERIENCE_OPTIONS[0]);
        setSortBy(SORT_OPTIONS[0]);
        setFilterCompany(current => current === company ? '' : company);
        document.getElementById('home-job-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const activeCount = [
        [filterCompany, ''],
        [filterCategory, CATEGORY_OPTIONS[0]],
        [filterType, JOB_TYPE_OPTIONS[0]],
        [filterLocation, LOCATION_OPTIONS[0]],
        [filterSalary, SALARY_OPTIONS[0]],
        [filterExp, EXPERIENCE_OPTIONS[0]],
    ].filter(([v, def]) => v !== def).length;

    const clearAll = () => {
        setSearch('');
        setFilterCategory(CATEGORY_OPTIONS[0]);
        setFilterType(JOB_TYPE_OPTIONS[0]);
        setFilterLocation(LOCATION_OPTIONS[0]);
        setFilterSalary(SALARY_OPTIONS[0]);
        setFilterExp(EXPERIENCE_OPTIONS[0]);
        setFilterCompany('');
        setSortBy(SORT_OPTIONS[0]);
    };

    // ✅ FIXED: pass full job object, use slug with _id fallback
    const go = (job) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(`/jobdetail/${job.slug || job._id}`);
    };

    const toggleSavedJob = (job) => {
        setSavedJobs(current => {
            const exists = current.some(savedJob => savedJob._id === job._id);
            const next = exists ? current.filter(savedJob => savedJob._id !== job._id) : [job, ...current];
            localStorage.setItem('savedJobs', JSON.stringify(next));
            window.dispatchEvent(new Event('saved-jobs-updated'));
            return next;
        });
    };

    return (
        <div className="min-h-screen bg-[#f3f8fb] dark:bg-[#050505]">

            {/* ══ HERO ══ */}
            <section className="home-page-hero relative isolate overflow-hidden bg-gradient-to-br from-[#e7f7f8] via-[#f1f9fb] to-[#e8f5f2] pt-16 dark:bg-gray-950 dark:bg-none">
                <div aria-hidden="true" className="pointer-events-none absolute -right-36 -top-32 h-[28rem] w-[28rem] rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/10" />
                <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:pb-16 lg:pt-12">
                    <div className="home-hero-enter min-w-0">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm dark:border-emerald-900/70 dark:bg-gray-900 dark:text-emerald-300">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="home-hero-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            </span>
                            Your next opportunity starts here
                        </div>
                        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
                            Find work that <span className="bg-gradient-to-r from-cyan-700 to-emerald-600 bg-clip-text text-transparent">moves</span><br className="hidden sm:block" /> <span className="bg-gradient-to-r from-cyan-700 to-emerald-600 bg-clip-text text-transparent">you forward.</span>
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-gray-300 sm:text-lg">
                            Find fresher roles, experienced positions, and internships from companies across India. Explore confidently, then apply directly with the employer.
                        </p>

                        <form
                            className="mt-8 flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-xl shadow-cyan-950/[0.08] transition duration-300 focus-within:border-teal-300 focus-within:shadow-teal-950/10 sm:flex-row sm:items-center dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-teal-700"
                            onSubmit={(event) => {
                                event.preventDefault();
                                document.getElementById('home-job-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            role="search"
                        >
                            <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
                                <Search className="h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
                                <input
                                    type="search"
                                    aria-label="Search jobs by title, company, location, or keywords"
                                    placeholder="Job title, company, or location"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    className="min-w-0 flex-1 border-0 bg-transparent py-3 text-base font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0"
                                />
                                {search && (
                                    <button type="button" onClick={() => setSearch('')} aria-label="Clear job search" className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700">
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </label>
                            <button type="submit" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-sky-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2">
                                Find jobs
                            </button>
                        </form>

                        <div className="mt-6 flex flex-wrap items-center gap-1.5">
                            <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-gray-400"><Sparkles className="h-3.5 w-3.5 text-blue-500" />Explore by:</span>
                            {[
                                { label: 'Fresher', type: 'Freshers' },
                                { label: 'Work from home', type: 'Work From Home' },
                                { label: 'Bengaluru', location: 'Bengaluru' },
                                { label: 'Hyderabad', location: 'Hyderabad' },
                                { label: 'Pune', location: 'Pune' },
                                { label: 'Walk-in', type: 'Walk-in' },
                            ].map(({ label, type }) => (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => applyQuickFilter({ type: type || JOB_TYPE_OPTIONS[0], location: type ? LOCATION_OPTIONS[0] : label })}
                                    className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-blue-200 dark:hover:border-blue-800 dark:hover:bg-gray-800"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                    </div>

                    <div className="home-hero-enter relative mx-auto w-full max-w-lg lg:ml-auto" style={{ animationDelay: '140ms' }}>
                        <div className="home-hero-float relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-xl shadow-blue-950/10 dark:border-gray-800 dark:bg-gray-900 sm:p-7">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">Live listings</p>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">Opportunities, updated regularly</p>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                            </div>

                            <div className="mt-3 rounded-2xl bg-white p-1 dark:bg-gray-900">
                                <div className="flex items-end justify-between gap-3">
                                    <div className="flex items-end gap-3">
                                        <p className="text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">{stats ? Number(stats.total || 0).toLocaleString('en-IN') : '—'}</p>
                                        <p className="pb-1.5 text-sm text-slate-500 dark:text-gray-400">open roles</p>
                                    </div>
                                    <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                                        <span className="home-hero-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        Live
                                    </span>
                                </div>
                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-gray-800">
                                    <div className="home-hero-progress h-full w-3/5 origin-left rounded-full bg-gradient-to-r from-sky-700 to-teal-500" />
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3">
                                {[
                                    { value: stats ? Number(stats.addedLast48Hours || 0).toLocaleString('en-IN') : '—', label: 'Added recently' },
                                    { value: stats ? Number(stats.distinctCompanies || 0).toLocaleString('en-IN') : '—', label: 'Companies' },
                                    { value: stats ? Number(stats.byCity?.length || 0).toLocaleString('en-IN') : '—', label: 'Cities' },
                                    { value: 'Free', label: 'No fees, ever' },
                                ].map((item, index) => <div key={item.label} className="home-hero-stat rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-800" style={{ animationDelay: `${220 + index * 90}ms` }}><p className="text-2xl font-extrabold text-slate-900 dark:text-white">{item.value}</p><p className="mt-1 text-xs text-slate-500 dark:text-gray-400">{item.label}</p></div>)}
                            </div>
                            <p className="mt-4 flex items-center gap-2 text-xs leading-relaxed text-slate-500 dark:text-gray-400">
                                <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-blue-600 dark:text-blue-300" />
                                Across India · Apply directly on employer websites
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mx-auto -mt-7 grid max-w-7xl grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-3" aria-label="Browse job categories">
                {[
                    { title: 'Fresher jobs', subtitle: 'Entry-level and graduate roles', type: 'Freshers', icon: GraduationCap, color: 'from-emerald-500 to-green-600', countColor: 'text-emerald-600' },
                    { title: 'Experienced jobs', subtitle: 'Mid-level and senior roles', type: 'Experienced', icon: BriefcaseBusiness, color: 'from-blue-500 to-blue-600', countColor: 'text-blue-600' },
                    { title: 'Internships', subtitle: 'Roles for students and trainees', type: 'Internship', icon: Compass, color: 'from-teal-500 to-cyan-600', countColor: 'text-teal-700' },
                ].map(item => <button key={item.type} type="button" onClick={() => applyQuickFilter({ type: item.type })} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
                    <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white`}><item.icon className="h-6 w-6" /></span>
                    <span className="min-w-0 flex-1"><span className="block text-lg font-extrabold text-slate-900 dark:text-white">{item.title}</span><span className="mt-1 block text-sm text-slate-500 dark:text-gray-400">{item.subtitle}</span></span>
                    <span className={`text-xl font-extrabold ${item.countColor}`}>{(typeCounts[item.type] || 0).toLocaleString('en-IN')}<span className="block text-right text-[10px] font-medium text-slate-500">open</span></span>
                </button>)}
            </section>

            {/* ══ MAIN LAYOUT ══ */}
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* ── LEFT FEED ── */}
                    <div className="min-w-0 lg:col-span-8">

                        <div id="home-job-results" className="mb-5 flex scroll-mt-24 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-3xl">Latest openings</h2>
                                <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">Recently added jobs from companies hiring across India.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-sm text-slate-500 dark:text-gray-400"><strong className="text-slate-800 dark:text-white">{filtered.length}</strong> jobs</p>
                                <button type="button" onClick={() => navigate('/Job-Portal')} className="text-sm font-bold text-blue-700 hover:text-cyan-600 dark:text-blue-300">View all jobs</button>
                            </div>
                        </div>

                        {/* Search + Filters */}
                        <details className="group mb-5 rounded-xl border border-slate-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-slate-600 dark:text-gray-300"><span className="flex items-center gap-2"><Filter className="h-4 w-4 text-blue-600" /> Filters and sorting {activeCount > 0 && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">{activeCount} active</span>}</span><ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary>
                        <div className="border-t border-slate-100 p-4 dark:border-gray-800">
                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="flex items-center gap-1 text-sm font-bold uppercase text-gray-400 dark:text-gray-300 mr-0.5 flex-shrink-0">
                                    <Filter className="w-3.5 h-3.5" /> Filters:
                                </div>
                                <FilterDropdown label="Job Type" options={JOB_TYPE_OPTIONS} value={filterType} onChange={setFilterType} counts={typeCounts} />
                                <FilterDropdown label="Location" options={locationOptions} value={filterLocation} onChange={setFilterLocation} counts={locationCounts} />
                                <FilterDropdown label="Salary" options={SALARY_OPTIONS} value={filterSalary} onChange={setFilterSalary} counts={salaryCounts} />
                                <FilterDropdown label="Experience" options={EXPERIENCE_OPTIONS} value={filterExp} onChange={setFilterExp} counts={experienceCounts} />
                                <FilterDropdown label="Sort" options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} />
                                {activeCount > 0 && (
                                    <button onClick={clearAll} className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-100 dark:border-red-900/40 transition-colors flex-shrink-0">
                                        <X className="w-3 h-3" /> Clear ({activeCount})
                                    </button>
                                )}
                            </div>
                            {activeCount > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                                    {[
                                        { val: filterCategory, def: CATEGORY_OPTIONS[0], set: setFilterCategory },
                                        { val: filterType, def: JOB_TYPE_OPTIONS[0], set: setFilterType },
                                        { val: filterLocation, def: LOCATION_OPTIONS[0], set: setFilterLocation },
                                        { val: filterSalary, def: SALARY_OPTIONS[0], set: setFilterSalary },
                                        { val: filterExp, def: EXPERIENCE_OPTIONS[0], set: setFilterExp },
                                    ].filter(f => f.val !== f.def).map(f => (
                                        <span key={f.val} className="inline-flex items-center gap-1 text-sm font-bold px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-full">
                                            {f.val}
                                            <button onClick={() => f.set(f.def)} className="ml-0.5 hover:text-emerald-900 dark:hover:text-white">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        </details>

                        <div
                            id="home-job-cards"
                            className="mb-6"
                            aria-label="Job listings"
                        >
                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                                </div>
                            ) : displayedJobs.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {displayedJobs.map((job, i) => (
                                        <JobCard key={job._id} job={job} index={i} onClick={() => go(job)} saved={savedJobs.some(savedJob => savedJob._id === job._id)} onToggleSave={toggleSavedJob} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800">
                                    <Search className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">No jobs found</p>
                                    <p className="text-base font-medium text-gray-700 dark:text-gray-400 mb-5">Try adjusting your search or filters</p>
                                    <button onClick={clearAll} className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-base font-bold hover:bg-emerald-700 transition-colors">
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                        {!loading && filtered.length > 0 && (
                            <div className="mb-6 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => navigate('/Job-Portal')}
                                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:shadow-lg"
                                >
                                    Explore All Jobs <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        )}

                    </div>

                    {/* ── RIGHT SIDEBAR ── */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-6 space-y-5">

                            <SocialFollowCard />

                            {/* Explore jobs by location and type */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    <p className="text-lg font-bold text-gray-800 dark:text-white">Explore jobs</p>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">By location</p>
                                        <div className="max-h-[50vh] space-y-1 overflow-y-auto overscroll-contain pr-1 lg:max-h-none lg:overflow-visible lg:overscroll-auto lg:pr-0">
                                            {cityLinks.length ? cityLinks.map((city) => (
                                                    <div key={city} className="border-b border-gray-50 dark:border-gray-700 last:border-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => applyQuickFilter({ location: city })}
                                                        className={`flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-gray-900 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:text-gray-100 dark:hover:bg-blue-950/30 dark:hover:text-blue-300 ${filterLocation === city ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' : ''}`}
                                                        aria-pressed={filterLocation === city}
                                                    >
                                                        <span>Jobs in {city}</span>
                                                        <span className="ml-auto text-xs tabular-nums text-gray-500 dark:text-gray-400">
                                                            {locationCounts[city] ?? 0}
                                                        </span>
                                                        <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 opacity-50" />
                                                    </button>
                                                    </div>
                                                )) : (
                                                <p className="py-2 text-sm text-gray-500 dark:text-gray-400">Locations appear as job listings become available.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">By job type</p>
                                        <div className="space-y-1">
                                            {JOB_TYPE_OPTIONS.slice(1).map((type) => (
                                                <div key={type} className="border-b border-gray-50 dark:border-gray-700 last:border-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => applyQuickFilter({ type })}
                                                        className={`flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-gray-900 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:text-gray-100 dark:hover:bg-blue-950/30 dark:hover:text-blue-300 ${filterType === type ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' : ''}`}
                                                        aria-pressed={filterType === type}
                                                    >
                                                        <span>{type} jobs</span>
                                                        <span className="ml-auto text-xs tabular-nums text-gray-500 dark:text-gray-400">
                                                            {typeCounts[type] ?? 0}
                                                        </span>
                                                        <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 opacity-50" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-800">
                                <p className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Hiring companies</p>
                                <div className="flex flex-wrap gap-2">
                                    {[...new Set(allJobs.map(job => job.company?.trim()).filter(Boolean))].slice(0, 8).map(company => (
                                        <button
                                            key={company}
                                            type="button"
                                            onClick={() => applyCompanyFilter(company)}
                                            aria-pressed={filterCompany === company}
                                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                                filterCompany === company
                                                    ? 'bg-blue-600 text-white dark:bg-blue-500'
                                                    : 'bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-blue-900/40 dark:hover:text-blue-200'
                                            }`}
                                        >
                                            {company}
                                        </button>
                                    ))}
                                </div>
                                {!allJobs.length && <p className="text-sm text-slate-500 dark:text-gray-400">Company names appear as listings are added.</p>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
                <div className="mb-5 flex items-end justify-between gap-4">
                    <div><h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-3xl">Interview Articles</h2><p className="mt-1 text-sm text-slate-500 dark:text-gray-400">Practical advice for placement and hiring rounds.</p></div>
                    <button type="button" onClick={() => navigate('/Blogs')} className="shrink-0 text-sm font-bold text-blue-700 hover:text-cyan-600 dark:text-blue-300">All articles</button>
                </div>
                <HeroBlog />
            </div>

            <div className="mx-auto my-8 max-w-7xl px-4 sm:my-12 sm:px-6">
                <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 sm:grid-cols-2 sm:p-10">
                    <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">Our promise</p><h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 dark:text-white">How we keep listings useful and honest</h2><p className="mt-4 max-w-md text-sm leading-6 text-slate-600 dark:text-gray-300">We are an independent site. We are not a recruiter and we never charge candidates.</p><a href="/Editorial-Policy" className="mt-4 inline-block text-sm font-bold text-blue-700 dark:text-blue-300">Read our editorial policy</a></div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{[
                        ['Linked to the source', "Every apply button opens the employer's own application page."],
                        ['Duplicates removed', 'The same role is not listed twice, and closed roles expire.'],
                        ['Honest details', 'If a salary or date is not published, we say so instead of guessing.'],
                        ['Free for candidates', 'No fees, no registration charges, no paid placements.'],
                    ].map(([title, description]) => <div key={title} className="rounded-2xl bg-slate-50 p-4 dark:bg-gray-800"><h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{title}</h3><p className="mt-1.5 text-sm leading-5 text-slate-600 dark:text-gray-300">{description}</p></div>)}</div>
                </section>
            </div>

            <section className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pb-12 sm:pt-12" aria-labelledby="home-faq-heading">
                <div className="relative isolate overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 dark:border-gray-800 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 sm:p-9 lg:p-12">
                    <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 -z-10 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-700/10" />
                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                        <div className="lg:pt-3">
                            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700 dark:border-blue-800 dark:bg-gray-900/80 dark:text-blue-300">
                                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                Good to know
                            </span>
                            <h2 id="home-faq-heading" className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                                Frequently asked questions
                            </h2>
                            <p className="mt-4 max-w-md text-base leading-7 text-slate-600 dark:text-gray-300">
                                Clear answers about job listings, applications, and getting started with TheJobInfo.
                            </p>
                            <p className="mt-6 text-sm font-semibold text-blue-700 dark:text-blue-300">
                                {jobListFaqs.length} quick answers to help you apply with confidence
                            </p>
                        </div>
                        <div className="space-y-3">
                            {jobListFaqs.map(({ question, answer }, index) => (
                                <details key={question} className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm transition-colors open:border-blue-200 open:bg-white dark:border-gray-700 dark:bg-gray-900/80 dark:open:border-blue-800 dark:open:bg-gray-900">
                                    <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-4 marker:hidden [&::-webkit-details-marker]:hidden sm:px-5">
                                        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-extrabold tabular-nums text-blue-700 transition-colors group-open:bg-blue-600 group-open:text-white dark:bg-blue-950/60 dark:text-blue-300 dark:group-open:bg-blue-500 dark:group-open:text-white">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="flex-1 text-sm font-bold leading-6 text-slate-900 dark:text-white sm:text-base">
                                            {question}
                                        </span>
                                        <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180 group-open:text-blue-600 dark:group-open:text-blue-300" />
                                    </summary>
                                    <p className="ml-[4.25rem] border-t border-slate-100 py-4 pr-4 text-sm leading-6 text-slate-600 dark:border-gray-800 dark:text-gray-300 sm:ml-[4.75rem] sm:pr-5">
                                        {answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default JobsHeroSection;
