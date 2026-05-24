
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//     Briefcase, MapPin, IndianRupee, Clock, ArrowRight,
//     Search, X, ChevronDown, Send, TrendingUp,
//     Zap, Users, Star, BookOpen, Globe,
//     Flame, Bell, CheckCircle, ExternalLink, Filter
// } from 'lucide-react';
// import { baseUrl } from '../Baseurl';

// const INSTAGRAM_LINK = 'https://www.instagram.com/dcoder75/';
// const TELEGRAM_LINK = 'https://t.me/dcoder75';

// const truncate = (text, len) => {
//     if (!text) return '';
//     return text.length <= len ? text : text.slice(0, len) + '...';
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // FILTER OPTIONS — matching admin form fields exactly
// // ─────────────────────────────────────────────────────────────────────────────
// const CATEGORY_OPTIONS = ['All Categories', 'IT Services', 'Software/IT', 'Data Science', 'Finance', 'Marketing', 'Design', 'Operations', 'HR', 'Any Graduate', 'Core Engineering'];
// const JOB_TYPE_OPTIONS = ['All Types', 'Freshers', 'Experienced', 'Internship', 'Work From Home'];
// const LOCATION_OPTIONS = ['All Locations', 'Pan India', 'Hyderabad', 'Bengaluru', 'Chennai', 'Pune', 'Mumbai', 'Delhi', 'Noida', 'Kolkata'];
// const EXPERIENCE_OPTIONS = ['All Experience', 'Fresher (0)', 'Up to 1 Year', 'Up to 2 Years', '1-3 Years', '2-5 Years', '3-5 Years', '5+ Years'];
// const SALARY_OPTIONS = ['All Salaries', 'Under ₹3 LPA', '₹3–5 LPA', '₹5–8 LPA', '₹8–12 LPA', '₹12+ LPA'];
// const SORT_OPTIONS = ['Latest First', 'Oldest First'];

// // ─────────────────────────────────────────────────────────────────────────────
// // SMART RANGE MATCHERS
// // ─────────────────────────────────────────────────────────────────────────────
// const parseExpRange = (str) => {
//     if (!str) return null;
//     const lower = str.toLowerCase();
//     if (lower.includes('fresher') && !lower.match(/\d/)) return { min: 0, max: 0 };
//     const nums = lower.match(/(\d+(\.\d+)?)/g);
//     if (!nums) return null;
//     const parsed = nums.map(Number);
//     if (parsed.length === 1) return { min: parsed[0], max: parsed[0] };
//     return { min: Math.min(...parsed), max: Math.max(...parsed) };
// };

// const matchExperience = (jobExpStr, filterOpt) => {
//     if (!filterOpt || filterOpt === EXPERIENCE_OPTIONS[0]) return true;
//     const jobRange = parseExpRange(jobExpStr);
//     if (!jobRange) return true;
//     const map = {
//         'Fresher (0)': { min: 0, max: 0 },
//         'Up to 1 Year': { min: 0, max: 1 },
//         'Up to 2 Years': { min: 0, max: 2 },
//         '1-3 Years': { min: 1, max: 3 },
//         '2-5 Years': { min: 2, max: 5 },
//         '3-5 Years': { min: 3, max: 5 },
//         '5+ Years': { min: 5, max: 99 },
//     };
//     const sel = map[filterOpt];
//     if (!sel) return true;
//     return jobRange.min <= sel.max && jobRange.max >= sel.min;
// };

// const parseSalaryLPA = (str) => {
//     if (!str) return null;
//     const lower = str.toLowerCase().replace(/,/g, '');
//     const monthMatch = lower.match(/₹?(\d+(?:\.\d+)?)\s*\/?\s*month/);
//     if (monthMatch) {
//         const monthly = parseFloat(monthMatch[1]);
//         const lpa = (monthly * 12) / 100000;
//         return { min: lpa, max: lpa };
//     }
//     const nums = lower.match(/(\d+(?:\.\d+)?)/g);
//     if (!nums) return null;
//     const parsed = nums.map(Number);
//     if (lower.includes('up to') || lower.includes('upto')) {
//         return { min: 0, max: parsed[0] };
//     }
//     if (parsed.length === 1) return { min: 0, max: parsed[0] };
//     return { min: Math.min(...parsed), max: Math.max(...parsed) };
// };

// const matchSalary = (jobSalaryStr, filterOpt) => {
//     if (!filterOpt || filterOpt === SALARY_OPTIONS[0]) return true;
//     const jobSal = parseSalaryLPA(jobSalaryStr);
//     if (!jobSal) return true;
//     const buckets = {
//         'Under ₹3 LPA': { min: 0, max: 3 },
//         '₹3–5 LPA': { min: 3, max: 5 },
//         '₹5–8 LPA': { min: 5, max: 8 },
//         '₹8–12 LPA': { min: 8, max: 12 },
//         '₹12+ LPA': { min: 12, max: 999 },
//     };
//     const bucket = buckets[filterOpt];
//     if (!bucket) return true;
//     return jobSal.min <= bucket.max && jobSal.max >= bucket.min;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // CARD GRADIENTS
// // ─────────────────────────────────────────────────────────────────────────────
// const CARD_GRADS = [
//     { bg: 'from-violet-500 to-purple-600' },
//     { bg: 'from-rose-500 to-pink-600' },
//     { bg: 'from-sky-500 to-blue-600' },
//     { bg: 'from-emerald-500 to-teal-600' },
//     { bg: 'from-orange-500 to-amber-600' },
//     { bg: 'from-fuchsia-500 to-pink-600' },
// ];

// // ─────────────────────────────────────────────────────────────────────────────
// // FILTER DROPDOWN
// // ─────────────────────────────────────────────────────────────────────────────
// const FilterDropdown = ({ label, options, value, onChange }) => {
//     const [open, setOpen] = useState(false);
//     const ref = useRef();
//     useEffect(() => {
//         const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
//         document.addEventListener('mousedown', h);
//         return () => document.removeEventListener('mousedown', h);
//     }, []);
//     const active = value !== options[0];
//     return (
//         <div ref={ref} className="relative">
//             <button
//                 onClick={() => setOpen(o => !o)}
//                 className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm font-bold transition-all whitespace-nowrap ${active
//                     ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
//                     : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
//                     }`}
//             >
//                 <span className="max-w-[120px] truncate">{active ? value : label}</span>
//                 <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
//             </button>
//             {open && (
//                 <div className="absolute top-full mt-1.5 left-0 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl py-1 min-w-[175px]">
//                     {options.map(opt => (
//                         <button
//                             key={opt}
//                             onClick={() => { onChange(opt); setOpen(false); }}
//                             className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${value === opt
//                                 ? 'text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-900/20'
//                                 : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
//                                 }`}
//                         >
//                             {opt}
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // SKELETONS
// // ─────────────────────────────────────────────────────────────────────────────
// const SkeletonCard = () => (
//     <div className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
//         <div className="h-44 bg-gray-200 dark:bg-gray-800" />
//         <div className="p-5 space-y-3">
//             <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
//             <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
//             <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full" />
//             <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
//             <div className="flex gap-2 pt-1">
//                 <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-lg w-20" />
//                 <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-lg w-20" />
//             </div>
//             <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded-xl w-full mt-1" />
//         </div>
//     </div>
// );

// const SkeletonInline = () => (
//     <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex gap-3">
//         <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-800 flex-shrink-0" />
//         <div className="flex-1 space-y-2">
//             <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
//             <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
//         </div>
//     </div>
// );

// // ─────────────────────────────────────────────────────────────────────────────
// // VERTICAL JOB CARD
// // ─────────────────────────────────────────────────────────────────────────────
// const JobCard = ({ job, index, onClick }) => {
//     const { bg } = CARD_GRADS[index % CARD_GRADS.length];

//     return (
//         <div
//             onClick={onClick}
//             className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
//         >
//             {/* ── TOP: Full-width image / gradient panel ── */}
//             <div
//                 className={`relative bg-gradient-to-br ${bg} flex items-center justify-center overflow-hidden border-b border-gray-300`}
//                 style={{ minHeight: '180px' }}
//             >
//                 <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
//                 <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
//                 <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/15" />

//                 {job.imageUrl ? (
//                     <img
//                         src={job.imageUrl}
//                         alt={job.company}
//                         className="w-full h-full object-cover absolute inset-0"
//                         onError={e => { e.target.style.display = 'none'; }}
//                     />
//                 ) : (
//                     <div className="relative z-10 flex flex-col items-center gap-3">
//                         <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                             <Briefcase className="w-8 h-8 text-white" />
//                         </div>
//                         {/* company name in card image: text-base font-bold matching detail page */}
//                         <p className="text-white/90 text-base font-bold">{job.company}</p>
//                     </div>
//                 )}



//                 <div className="absolute top-3 right-3 z-10">
//                     <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-orange-500 text-white rounded-full shadow-lg">
//                         <TrendingUp className="w-3.5 h-3.5" /> Hot
//                     </span>
//                 </div>
//             </div>

//             {/* ── BOTTOM: Details ── */}
//             <div className="p-5 flex flex-col flex-1">
//                 {/* Company label: text-sm font-bold uppercase   — matches JobDetail SectionLabel */}
//                 <div className='flex flex-cols space-between items-center justify-between'>
//                     <p className={`text-sm font-bold uppercase   bg-gradient-to-r ${bg} bg-clip-text text-transparent mb-1 truncate`}>
//                         {job.company}
//                     </p>
//                     {job.jobType && (
//                         <div >
//                             {/* badge label: text-sm font-bold matching detail page badges */}
//                             <span className="text-sm font-semibold text-green-500 border px-2 py-0.5 rounded-full bg-blur bg-white/30 backdrop-blur-sm">
//                                 {job.jobType}
//                             </span>
//                         </div>
//                     )}
//                 </div>

//                 {/* Title: text-xl font-bold — matches JobDetail h2/SectionTitle scale */}
//                 <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
//                     {job.title}
//                 </h2>

//                 {/* Description: text-base — matches JobDetail body text */}
//                 <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-2 line-clamp-2 flex-1">
//                     {truncate(job.description, 100) || 'Exciting opportunity — click to view full details and apply.'}
//                 </p>

//                 {/* Detail chips: text-base font-medium — matches JobDetail chip style */}
//                 <div className="space-y-1 mb-5">
//                     {job.location && (
//                         <div className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
//                             <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
//                             <span className="truncate">{job.location}</span>
//                         </div>
//                     )}
//                     {job.salary && (
//                         <div className="flex items-center gap-2 text-base font-bold text-green-700 dark:text-green-400">
//                             <IndianRupee className="w-4 h-4 flex-shrink-0" />
//                             <span>{job.salary}</span>
//                         </div>
//                     )}
//                     {job.experience && (
//                         <div className="flex items-center gap-2 text-base font-medium text-blue-600 dark:text-blue-400">
//                             <Users className="w-4 h-4 flex-shrink-0" />
//                             <span>{job.experience}</span>
//                         </div>
//                     )}
//                     {job.lastDate && (
//                         <div className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
//                             <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
//                             <span>Apply by <span className="text-red-600 dark:text-red-400 font-bold">{job.lastDate}</span></span>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div >
//     );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // INLINE COMPACT CARD
// // ─────────────────────────────────────────────────────────────────────────────
// const InlineJobCard = ({ job, index, onClick }) => {
//     const { bg } = CARD_GRADS[index % CARD_GRADS.length];
//     return (
//         <div
//             onClick={onClick}
//             className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 p-4 flex items-center gap-4 hover:border-purple-200  hover:shadow-md transition-all"
//         >
//             <div className={`w-35 h-32 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden`}>
//                 {job.imageUrl
//                     ? <img src={job.imageUrl} alt={job.company} className="w-full h-full object-cover" />
//                     : <div className='w-20 h-10 md:w-32 md:h-20 flex items-center justify-center'><Briefcase className="w-10 h-10 text-white" /></div>
//                 }
//             </div>
//             <div className="flex-1 min-w-0">
//                 {/* title: text-base font-bold — matches JobDetail inline job list */}
//                 <p className="text-base font-bold text-gray-800 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{job.title}</p>
//                 {/* meta: text-sm font-medium — matches JobDetail sub-text */}
//                 <p className="text-sm font-medium text-gray-700 dark:text-gray-400 truncate mt-0.5">
//                     {job.company}
//                 </p>
//                 <p className="text-sm font-medium text-gray-700 dark:text-gray-400 truncate mt-0.5">
//                     {job.location ? `  ${job.location}` : ''}
//                 </p>
//                 <p className="text-sm font-medium text-gray-700 dark:text-gray-400 truncate mt-0.5">
//                     {job.salary ? ` ${job.salary}` : ''}
//                 </p>
//                 <p className="text-sm font-medium text-gray-700 dark:text-gray-400 truncate mt-0.5">
//                     {job.lastDate ? `  Apply by ${job.lastDate}` : ''}
//                 </p>

//             </div>

//         </div>
//     );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // FEATURE CARD
// // ─────────────────────────────────────────────────────────────────────────────
// const FeatureCard = ({ icon: Icon, title, desc, color }) => (
//     <div className="group bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
//         <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
//             <Icon className="w-5 h-5 text-white" />
//         </div>
//         {/* title: text-base font-bold — matches JobDetail section sub-heading */}
//         <h3 className="text-base font-bold text-gray-800 dark:text-white mb-1.5">{title}</h3>
//         {/* desc: text-sm font-medium — matches JobDetail supporting text */}
//         <p className="text-sm font-medium text-gray-700 dark:text-gray-400 leading-relaxed">{desc}</p>
//     </div>
// );

// // ─────────────────────────────────────────────────────────────────────────────
// // MAIN COMPONENT
// // ─────────────────────────────────────────────────────────────────────────────
// const JobsHeroSection = () => {
//     const navigate = useNavigate();
//     const [allJobs, setAllJobs] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const [search, setSearch] = useState('');
//     const [filterCategory, setFilterCategory] = useState(CATEGORY_OPTIONS[0]);
//     const [filterType, setFilterType] = useState(JOB_TYPE_OPTIONS[0]);
//     const [filterLocation, setFilterLocation] = useState(LOCATION_OPTIONS[0]);
//     const [filterSalary, setFilterSalary] = useState(SALARY_OPTIONS[0]);
//     const [filterExp, setFilterExp] = useState(EXPERIENCE_OPTIONS[0]);
//     const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);

//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 const res = await axios.get(`${baseUrl}/job`);
//                 setAllJobs(Array.isArray(res.data) ? res.data : []);
//             } catch (err) {
//                 console.error('Failed to fetch jobs:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchJobs();
//     }, []);

//     const filtered = allJobs.filter(j => {
//         const q = search.toLowerCase();
//         const matchSearch = !search
//             || j.title?.toLowerCase().includes(q)
//             || j.company?.toLowerCase().includes(q)
//             || j.location?.toLowerCase().includes(q)
//             || j.description?.toLowerCase().includes(q);
//         const matchCategory = filterCategory === CATEGORY_OPTIONS[0]
//             || j.category?.toLowerCase().includes(filterCategory.toLowerCase());
//         const matchType = filterType === JOB_TYPE_OPTIONS[0]
//             || j.jobType?.toLowerCase().includes(filterType.toLowerCase())
//             || filterType.toLowerCase().includes(j.jobType?.toLowerCase() || '~~');
//         const matchLocation = filterLocation === LOCATION_OPTIONS[0]
//             || j.location?.toLowerCase().includes(filterLocation.toLowerCase());
//         const matchSalaryVal = matchSalary(j.salary || j.salaryNote, filterSalary);
//         const matchExpVal = matchExperience(j.experience, filterExp);
//         return matchSearch && matchCategory && matchType && matchLocation && matchSalaryVal && matchExpVal;
//     }).sort((a, b) =>
//         sortBy === 'Latest First'
//             ? (b.id || 0) - (a.id || 0)
//             : (a.id || 0) - (b.id || 0)
//     );

//     const featuredJobs = filtered.slice(0, 6);
//     const inlineJobs = filtered.slice(6, 14);

//     const activeCount = [
//         [filterCategory, CATEGORY_OPTIONS[0]],
//         [filterType, JOB_TYPE_OPTIONS[0]],
//         [filterLocation, LOCATION_OPTIONS[0]],
//         [filterSalary, SALARY_OPTIONS[0]],
//         [filterExp, EXPERIENCE_OPTIONS[0]],
//     ].filter(([v, def]) => v !== def).length;

//     const clearAll = () => {
//         setSearch('');
//         setFilterCategory(CATEGORY_OPTIONS[0]);
//         setFilterType(JOB_TYPE_OPTIONS[0]);
//         setFilterLocation(LOCATION_OPTIONS[0]);
//         setFilterSalary(SALARY_OPTIONS[0]);
//         setFilterExp(EXPERIENCE_OPTIONS[0]);
//         setSortBy(SORT_OPTIONS[0]);
//     };

//     const go = (id) => {
//         window.scrollTo({ top: 0, behavior: 'instant' });
//         navigate(`/jobdetail/${id}`);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

//             {/* ══ HERO ══ */}
//             <div className="bg-gray-50 dark:bg-gray-950 pt-16">
//                 <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">

//                     {/* Badge */}
//                     <div className="flex justify-center mb-5">
//                         {/* badge: text-sm font-bold — matches JobDetail badge style */}
//                         <span className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 px-5 py-2 rounded-full text-sm font-bold text-purple-700 dark:text-purple-300">
//                             <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
//                             Latest Job Opportunities
//                         </span>
//                     </div>

//                     {/* Hero heading: text-3xl md:text-4xl lg:text-5xl font-bold — unchanged, hero scale is intentional */}
//                     <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
//                         Fresh Jobs For Your{' '}
//                         <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                             Dream Career
//                         </span>
//                     </h1>

//                     {/* Sub-heading: text-lg font-medium — matches JobDetail body paragraph sizing */}
//                     <p className="text-center text-lg font-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
//                         Handpicked off-campus drives, fresher jobs & internships — updated daily for students and professionals
//                     </p>

//                     {/* Live dot */}
//                     <div className="flex items-center justify-center gap-2 mb-10">
//                         <span className="relative flex h-2.5 w-2.5">
//                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
//                             <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
//                         </span>
//                         {/* live label: text-base font-bold — matches JobDetail active status text */}
//                         <span className="text-base font-bold text-green-600 dark:text-green-400">Updated Today</span>
//                     </div>

//                     {/* Stats */}
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-xl mx-auto">
//                         {[
//                             { label: 'Jobs Listed', value: '100+', color: 'from-violet-600 to-purple-600' },
//                             { label: 'Companies', value: '50+', color: 'from-sky-600 to-blue-600' },
//                             { label: 'Daily Updates', value: 'Daily', color: 'from-emerald-600 to-teal-600' },
//                             { label: 'Cost', value: 'Free', color: 'from-orange-600 to-amber-600' },
//                         ].map((s, i) => (
//                             <div key={i} className="text-center p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
//                                 {/* stat value: text-2xl font-bold — matches JobDetail heading weight */}
//                                 <p className={`text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
//                                 {/* stat label: text-sm font-medium — matches JobDetail caption text */}
//                                 <p className="text-sm font-medium text-gray-700 dark:text-gray-400 mt-0.5">{s.label}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* ══ MAIN LAYOUT ══ */}
//             <div className="max-w-7xl mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

//                     {/* ── LEFT FEED ── */}
//                     <div className="lg:col-span-8">

//                         {/* ── Search + Filters ── */}
//                         <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 mb-6 shadow-sm">

//                             {/* Search input */}
//                             <div className="relative mb-3">
//                                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search by job title, company, or location..."
//                                     value={search}
//                                     onChange={e => setSearch(e.target.value)}
//                                     className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 text-base font-medium focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-colors"
//                                 />
//                                 {search && (
//                                     <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
//                                         <X className="w-4 h-4" />
//                                     </button>
//                                 )}
//                             </div>

//                             {/* Filter dropdowns */}
//                             <div className="flex items-center gap-2 flex-wrap">
//                                 {/* filter label: text-sm font-bold uppercase — matches JobDetail SectionLabel */}
//                                 <div className="flex items-center gap-1 text-sm font-bold uppercase   text-gray-400 dark:text-gray-300 mr-0.5 flex-shrink-0">
//                                     <Filter className="w-3.5 h-3.5" /> Filters:
//                                 </div>

//                                 <FilterDropdown label="Job Type" options={JOB_TYPE_OPTIONS} value={filterType} onChange={setFilterType} />
//                                 <FilterDropdown label="Location" options={LOCATION_OPTIONS} value={filterLocation} onChange={setFilterLocation} />
//                                 <FilterDropdown label="Salary" options={SALARY_OPTIONS} value={filterSalary} onChange={setFilterSalary} />
//                                 <FilterDropdown label="Experience" options={EXPERIENCE_OPTIONS} value={filterExp} onChange={setFilterExp} />
//                                 <FilterDropdown label="Sort" options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} />
//                                 {activeCount > 0 && (
//                                     <button
//                                         onClick={clearAll}
//                                         className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-100 dark:border-red-900/40 transition-colors flex-shrink-0"
//                                     >
//                                         <X className="w-3 h-3" /> Clear ({activeCount})
//                                     </button>
//                                 )}
//                             </div>

//                             {/* Active filter tags */}
//                             {activeCount > 0 && (
//                                 <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
//                                     {[
//                                         { val: filterCategory, def: CATEGORY_OPTIONS[0], set: setFilterCategory },
//                                         { val: filterType, def: JOB_TYPE_OPTIONS[0], set: setFilterType },
//                                         { val: filterLocation, def: LOCATION_OPTIONS[0], set: setFilterLocation },
//                                         { val: filterSalary, def: SALARY_OPTIONS[0], set: setFilterSalary },
//                                         { val: filterExp, def: EXPERIENCE_OPTIONS[0], set: setFilterExp },
//                                     ].filter(f => f.val !== f.def).map(f => (
//                                         <span key={f.val} className="inline-flex items-center gap-1 text-sm font-bold px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-full">
//                                             {f.val}
//                                             <button onClick={() => f.set(f.def)} className="ml-0.5 hover:text-purple-900 dark:hover:text-white">
//                                                 <X className="w-3 h-3" />
//                                             </button>
//                                         </span>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Results count */}
//                         <div className="flex items-center justify-between mb-5">
//                             {/* results text: text-base font-medium — matches JobDetail supporting text */}
//                             <p className="text-base font-medium text-gray-600 dark:text-gray-400">
//                                 Showing <span className="text-gray-800 dark:text-white font-bold">{filtered.length}</span> jobs
//                                 {activeCount > 0 && <span className="ml-1">(filtered)</span>}
//                             </p>
//                         </div>

//                         {/* ── Featured Cards ── */}
//                         {loading ? (
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
//                                 {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
//                             </div>
//                         ) : featuredJobs.length > 0 ? (
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
//                                 {featuredJobs.map((job, i) => (
//                                     <JobCard key={job._id} job={job} index={i} onClick={() => go(job._id)} />
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 mb-6">
//                                 <Search className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
//                                 {/* empty state: text-xl font-bold + text-base font-medium — matches JobDetail not-found pattern */}
//                                 <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">No jobs found</p>
//                                 <p className="text-base font-medium text-gray-700 dark:text-gray-400 mb-5">Try adjusting your search or filters</p>
//                                 <button onClick={clearAll} className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-base font-bold hover:bg-purple-700 transition-colors">
//                                     Clear all filters
//                                 </button>
//                             </div>
//                         )}

//                         {/* ── Inline block ── */}
//                         {inlineJobs.length > 0 && (
//                             <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 mb-6">
//                                 {/* section label: text-sm font-bold uppercase   — matches JobDetail SectionLabel exactly */}
//                                 <p className="text-sm font-bold uppercase   text-gray-700 dark:text-gray-400 mb-4">More Available Jobs</p>
//                                 <div className="space-y-2.5">
//                                     {inlineJobs.map((job, i) => (
//                                         <InlineJobCard key={job._id} job={job} index={i} onClick={() => go(job._id)} />
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* ── Explore All CTA ── */}
//                         <div className="text-center py-4">
//                             <button
//                                 onClick={() => navigate('/Job-Portal')}
//                                 className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
//                             >
//                                 Explore All Jobs <ArrowRight className="w-4 h-4" />
//                             </button>
//                         </div>
//                     </div>

//                     {/* ── RIGHT SIDEBAR ── */}
//                     <div className="lg:col-span-4">
//                         <div className="sticky top-6 space-y-5">

//                             {/* Social */}
//                             <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
//                                 <div className="px-5 py-3.5 bg-white dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
//                                     {/* sidebar header: text-sm font-bold uppercase   — matches JobDetail sidebar label */}
//                                     <p className="text-sm font-bold uppercase   text-gray-700 dark:text-gray-400">Stay updated</p>
//                                 </div>
//                                 <div className="p-5 space-y-3">
//                                     {/* sidebar body: text-base font-medium — matches JobDetail sidebar paragraph */}
//                                     <p className="text-base font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
//                                         Get the latest job alerts, resume tips, and off-campus drives straight to you.
//                                     </p>
//                                     <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer"
//                                         className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl text-base font-bold transition-all">
//                                         <Send className="w-4 h-4" /> Join on Telegram
//                                     </a>
//                                     <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer"
//                                         className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl text-base font-bold transition-all">
//                                         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
//                                             <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
//                                         </svg>
//                                         Follow on Instagram
//                                     </a>
//                                 </div>
//                             </div>

//                             {/* Latest jobs */}
//                             <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
//                                 <div className="px-5 py-3.5 bg-white dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
//                                     <p className="text-sm font-bold uppercase   text-gray-700 dark:text-gray-400">Latest openings</p>
//                                     <a href="/Job-Portal" className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-0.5">
//                                         All <ExternalLink className="w-3 h-3" />
//                                     </a>
//                                 </div>
//                                 <div className="divide-y divide-gray-50 dark:divide-gray-800">
//                                     {loading
//                                         ? [...Array(5)].map((_, i) => (
//                                             <div key={i} className="px-5 py-3.5 animate-pulse flex gap-3">
//                                                 <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-1.5 flex-shrink-0" />
//                                                 <div className="flex-1 space-y-1.5">
//                                                     <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
//                                                     <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
//                                                 </div>
//                                             </div>
//                                         ))
//                                         : allJobs.slice(0, 7).map(job => (
//                                             <div
//                                                 key={job._id}
//                                                 onClick={() => go(job._id)}
//                                                 className="flex items-start gap-3 px-5 py-3.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
//                                             >
//                                                 <div className="w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-green-500 flex-shrink-0 mt-1.5" />
//                                                 <div className="flex-1 min-w-0">
//                                                     {/* sidebar job title: text-base font-bold — matches JobDetail sidebar list */}
//                                                     <p className="text-base font-bold text-gray-800 dark:text-gray-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{job.title}</p>
//                                                     {/* sidebar job meta: text-sm font-medium */}
//                                                     <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate mt-0.5">{job.company}{job.location ? ` · ${job.location}` : ''}</p>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     }
//                                 </div>
//                             </div>

//                             {/* Alert CTA */}
//                             <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 rounded-2xl p-5">
//                                 <div className="flex items-center gap-2 mb-2">
//                                     <Bell className="w-4 h-4 text-sky-500" />
//                                     {/* alert title: text-base font-bold — matches JobDetail sidebar heading */}
//                                     <p className="text-base font-bold text-sky-700 dark:text-sky-300">Daily Job Alerts</p>
//                                 </div>
//                                 {/* alert body: text-base font-medium */}
//                                 <p className="text-base font-medium text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
//                                     10,000+ students already get instant updates. Join free today.
//                                 </p>
//                                 <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer"
//                                     className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl text-base font-bold transition-all">
//                                     <Send className="w-4 h-4" /> Join
//                                 </a>
//                             </div>

//                             {/* Quick links */}
//                             <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
//                                 <p className="text-sm font-bold uppercase   text-gray-600 dark:text-gray-300 mb-3">Quick links</p>
//                                 <div className="space-y-1.5">
//                                     {[

//                                         { label: 'Internships', href: '/Internships' },
//                                         { label: 'Freshers Jobs', href: '/Fresher-Jobs' },
//                                         { label: 'Experienced Jobs', href: '/Experienced-Jobs' },
//                                         { label: 'IT/Software Jobs', href: '/Job-Portal' },
//                                     ].map(link => (
//                                         <a key={link.label} href={link.href}
//                                             className="flex items-center gap-2 text-base font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-1">
//                                             <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 text-gray-300 dark:text-gray-600" /> {link.label}
//                                         </a>
//                                     ))}
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* ══ FEATURES ══ */}
//             <div className="bg-gray-50 dark:bg-gray-950 mt-4">
//                 <div className="max-w-7xl mx-auto px-4 py-12">

//                     <div className="text-center mb-8">
//                         {/* section eyebrow: text-sm font-bold uppercase   — matches JobDetail SectionLabel */}
//                         <p className="text-2xl font-bold uppercase   text-purple-500 mb-2">Why choose us</p>
//                         {/* section heading: text-2xl font-bold — matches JobDetail SectionTitle */}
//                         <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Everything you need to land your next job</h2>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
//                         <FeatureCard icon={Zap} title="Daily Updates" desc="New off-campus drives and fresher opportunities posted every day — never miss a deadline." color="from-yellow-500 to-orange-500" />
//                         <FeatureCard icon={CheckCircle} title="Verified Listings" desc="All listings are sourced directly from official company career pages and trusted portals." color="from-emerald-500 to-teal-600" />
//                         <FeatureCard icon={Globe} title="Pan-India Coverage" desc="Jobs from Hyderabad, Bengaluru, Pune, Mumbai, Delhi, Chennai, Noida and more." color="from-sky-500 to-blue-600" />
//                         <FeatureCard icon={Star} title="100% Free" desc="No subscriptions, no fees. Browse and apply to all jobs completely free of charge." color="from-violet-500 to-purple-600" />
//                     </div>

//                     {/* How to apply */}
//                     <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-7 mb-10">
//                         <div className="text-center mb-7">
//                             <p className="text-2xl font-bold uppercase   text-purple-500 mb-1">Simple process</p>
//                             {/* sub-section heading: text-xl font-bold — matches JobDetail mid-level heading */}
//                             <h2 className="text-xl font-bold text-gray-800 dark:text-white">Apply in 3 easy steps</h2>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             {[
//                                 { n: '01', t: 'Browse & Search', d: 'Use our smart filters — category, job type, location, salary range, and experience — to find your perfect match.' },
//                                 { n: '02', t: 'Read Details', d: 'Click any card to read full eligibility, responsibilities, skills required, and the complete selection process.' },
//                                 { n: '03', t: 'Apply Directly', d: "Hit the official apply link and submit your application straight on the company's career page." },
//                             ].map(s => (
//                                 <div key={s.n} className="flex gap-4">
//                                     <div className="text-4xl font-black text-purple-100 dark:text-purple-900 flex-shrink-0 leading-none">{s.n}</div>
//                                     <div>
//                                         {/* step title: text-base font-bold */}
//                                         <h3 className="text-base font-bold text-gray-800 dark:text-white mb-1">{s.t}</h3>
//                                         {/* step desc: text-base font-medium */}
//                                         <p className="text-base font-medium text-gray-600 dark:text-gray-400 leading-relaxed">{s.d}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Disclaimer */}
//                     {/* disclaimer: text-sm font-medium — matches JobDetail disclaimer text */}
//                     <p className="text-sm font-medium text-gray-700 dark:text-gray-700 text-center leading-relaxed max-w-3xl mx-auto border-t border-gray-100 dark:border-gray-800 pt-8">
//                         <span className="font-bold text-gray-700 dark:text-gray-400">Disclaimer:</span> The recruitment information provided is for informational purposes only. Sourced from official company websites. We have no affiliation with any company and provide no recruitment guarantees. No fee is charged for this service.
//                     </p>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default JobsHeroSection;


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Briefcase, MapPin, IndianRupee, Clock, ArrowRight,
    Search, X, ChevronDown, Send, TrendingUp,
    Zap, Users, Star, Globe,
    Flame, Bell, CheckCircle, ExternalLink, Filter
} from 'lucide-react';
import { baseUrl } from '../Baseurl';

const INSTAGRAM_LINK = 'https://www.instagram.com/dcoder75/';
const TELEGRAM_LINK = 'https://t.me/dcoder75';

const truncate = (text, len) => {
    if (!text) return '';
    return text.length <= len ? text : text.slice(0, len) + '...';
};

// ─────────────────────────────────────────────────────────────────────────────
// PALETTE HELPER
// ─────────────────────────────────────────────────────────────────────────────
const getPalette = (company) => {
    const palettes = [
        { title: '#7c3aed', company: '#a21caf', accent: '#0891b2' },
        { title: '#be185d', company: '#b45309', accent: '#047857' },
        { title: '#1d4ed8', company: '#7c3aed', accent: '#be185d' },
        { title: '#047857', company: '#0891b2', accent: '#7c3aed' },
        { title: '#b45309', company: '#be185d', accent: '#1d4ed8' },
    ];
    const hash = [...(company || 'X')].reduce((a, c) => a + c.charCodeAt(0), 0);
    return palettes[hash % palettes.length];
};

// ── Auto Image — full card panel (grid cards, no imageUrl) ─────────────────
const AutoJobImageCompact = ({ title, company, location }) => {
    const p = getPalette(company);
    return (
        <div className="w-full h-full bg-white dark:bg-black flex flex-col items-center justify-center py-4 px-4 text-center">
            <p
                className="text-sm font-bold uppercase tracking-wide mb-1 leading-tight"
                style={{ color: p.company }}
            >
                {company?.length > 20 ? company.slice(0, 20) + '…' : company}
            </p>
            <p
                className="text-2xl font-bold leading-tight mb-1.5 line-clamp-2"
                style={{ color: p.title }}
            >
                {title?.length > 32 ? title.slice(0, 32) + '…' : title}
            </p>
            {location && (
                <span
                    className="text-sm font-medium flex items-center gap-1"
                    style={{ color: p.accent }}
                >
                    <MapPin className="w-3 h-3" />
                    {location?.length > 12 ? location.slice(0, 12) + '…' : location}
                </span>
            )}
            <span className="mt-2 text-gray-300 dark:text-gray-600 text-md font-semibold ">
                TheJobInfo
            </span>
        </div>
    );
};

// ── Auto Image — compact thumbnail (inline cards, no imageUrl) ─────────────
const AutoJobImageInline = ({ title, company }) => {
    const p = getPalette(company);
    return (
        <div className="w-full h-full bg-white dark:bg-black flex flex-col items-center justify-center px-1 py-1 text-center">
            <p
                className="text-xs font-bold uppercase leading-tight mb-0.5"
                style={{ color: p.company }}
            >
                {company?.length > 15 ? company.slice(0, 15) + '…' : company}
            </p>
            <p
                className="text-sm font-bold leading-tight line-clamp-2"
                style={{ color: p.title }}
            >
                {title?.length > 18 ? title.slice(0, 18) + '…' : title}
            </p>
            <span className="mt-1 text-gray-300 dark:text-gray-600 text-xs font-semibold">TheJobInfo</span>
        </div>
    );
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
    { bg: 'from-violet-500 to-purple-600' },
    { bg: 'from-rose-500 to-pink-600' },
    { bg: 'from-sky-500 to-blue-600' },
    { bg: 'from-emerald-500 to-teal-600' },
    { bg: 'from-orange-500 to-amber-600' },
    { bg: 'from-fuchsia-500 to-pink-600' },
];

// ─────────────────────────────────────────────────────────────────────────────
// FILTER DROPDOWN
// ─────────────────────────────────────────────────────────────────────────────
const FilterDropdown = ({ label, options, value, onChange }) => {
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
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
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
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${value === opt
                                ? 'text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-900/20'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            {opt}
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
const JobCard = ({ job, index, onClick }) => {
    const { bg } = CARD_GRADS[index % CARD_GRADS.length];

    return (
        <div
            onClick={onClick}
            className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
        >
            {/* ── TOP: image panel ── */}
            <div
                className="relative flex items-center justify-center overflow-hidden border-b border-gray-200 dark:border-gray-700 flex-shrink-0"
                style={{ minHeight: '180px' }}
            >
                {job.imageUrl ? (
                    <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${bg}`} />
                        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
                        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/15" />
                        <img
                            src={job.imageUrl}
                            alt={job.company}
                            className="w-full h-full object-cover absolute inset-0"
                            onError={e => { e.target.style.display = 'none'; }}
                        />
                    </>
                ) : (
                    /* ── Auto-generated branded image ── */
                    <AutoJobImageCompact
                        title={job.title}
                        company={job.company}
                        location={job.location}
                    />
                )}

                <div className="absolute top-3 right-3 z-10">
                    <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-orange-500 text-white rounded-full shadow-lg">
                        <TrendingUp className="w-3.5 h-3.5" /> Hot
                    </span>
                </div>
            </div>

            {/* ── BOTTOM: details ── */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm font-bold uppercase   bg-gradient-to-r ${bg} bg-clip-text text-transparent truncate`}>
                        {job.company}
                    </p>
                    {job.jobType && (
                        <span className="text-sm font-semibold text-green-500 border border-green-200 dark:border-green-800 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                            {job.jobType}
                        </span>
                    )}
                </div>

                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {job.title}
                </h2>

                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-2 line-clamp-2 flex-1">
                    {truncate(job.description, 100) || 'Exciting opportunity — click to view full details and apply.'}
                </p>

                <div className="space-y-1 mb-5">
                    {job.location && (
                        <div className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
                            <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <span className="truncate">{job.location}</span>
                        </div>
                    )}
                    {job.salary && (
                        <div className="flex items-center gap-2 text-base font-bold text-green-700 dark:text-green-400">
                            <IndianRupee className="w-4 h-4 flex-shrink-0" />
                            <span>{job.salary}</span>
                        </div>
                    )}
                    {job.experience && (
                        <div className="flex items-center gap-2 text-base font-medium text-blue-600 dark:text-blue-400">
                            <Users className="w-4 h-4 flex-shrink-0" />
                            <span>{job.experience}</span>
                        </div>
                    )}
                    {job.lastDate && (
                        <div className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
                            <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                            <span>Apply by <span className="text-red-600 dark:text-red-400 font-bold">{job.lastDate}</span></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// INLINE COMPACT CARD
// ─────────────────────────────────────────────────────────────────────────────
const InlineJobCard = ({ job, index, onClick }) => {
    const { bg } = CARD_GRADS[index % CARD_GRADS.length];
    return (
        <div
            onClick={onClick}
            className="group cursor-pointer bg-white dark:bg-transparent rounded-xl border border-gray-300 dark:border-gray-600 p-4 flex items-center gap-4 hover:border-purple-200 hover:shadow-md transition-all"
        >
            {/* Thumbnail: auto-image or real photo */}
            <div className="w-24 h-20 md:w-32 md:h-24 rounded-xl flex-shrink-0 overflow-hidden border border-gray-100 dark:border-gray-700">
                {job.imageUrl ? (
                    <img
                        src={job.imageUrl}
                        alt={job.company}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    /* ── Auto-generated inline thumbnail ── */
                    <AutoJobImageInline title={job.title} company={job.company} />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-gray-800 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {job.title}
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-400 truncate mt-0.5">{job.company}</p>
                {job.location && (
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400 truncate mt-0.5">{job.location}</p>
                )}
                {job.salary && (
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400 truncate mt-0.5">{job.salary}</p>
                )}
                {job.lastDate && (
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400 truncate mt-0.5">
                        Apply by {job.lastDate}
                    </p>
                )}
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE CARD
// ─────────────────────────────────────────────────────────────────────────────
const FeatureCard = ({ icon: Icon, title, desc, color }) => (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-base font-bold text-gray-800 dark:text-white mb-1.5">{title}</h3>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-400 leading-relaxed">{desc}</p>
    </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const JobsHeroSection = () => {
    const navigate = useNavigate();
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState(CATEGORY_OPTIONS[0]);
    const [filterType, setFilterType] = useState(JOB_TYPE_OPTIONS[0]);
    const [filterLocation, setFilterLocation] = useState(LOCATION_OPTIONS[0]);
    const [filterSalary, setFilterSalary] = useState(SALARY_OPTIONS[0]);
    const [filterExp, setFilterExp] = useState(EXPERIENCE_OPTIONS[0]);
    const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/job`);
                setAllJobs(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error('Failed to fetch jobs:', err);
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
        const matchType = filterType === JOB_TYPE_OPTIONS[0]
            || j.jobType?.toLowerCase().includes(filterType.toLowerCase())
            || filterType.toLowerCase().includes(j.jobType?.toLowerCase() || '~~');
        const matchLocation = filterLocation === LOCATION_OPTIONS[0]
            || j.location?.toLowerCase().includes(filterLocation.toLowerCase());
        const matchSalaryVal = matchSalary(j.salary || j.salaryNote, filterSalary);
        const matchExpVal = matchExperience(j.experience, filterExp);
        return matchSearch && matchCategory && matchType && matchLocation && matchSalaryVal && matchExpVal;
    }).sort((a, b) =>
        sortBy === 'Latest First'
            ? (b.id || 0) - (a.id || 0)
            : (a.id || 0) - (b.id || 0)
    );

    const featuredJobs = filtered.slice(0, 6);
    const inlineJobs = filtered.slice(6, 9);

    const activeCount = [
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
        setSortBy(SORT_OPTIONS[0]);
    };

    const go = (id) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(`/jobdetail/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

            {/* ══ HERO ══ */}
            <div className="bg-gray-50 dark:bg-gray-950 pt-16">
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                    <div className="flex justify-center mb-5">
                        <span className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 px-5 py-2 rounded-full text-sm font-bold text-purple-700 dark:text-purple-300">
                            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                            Latest Job Opportunities
                        </span>
                    </div>
                    <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
                        Fresh Jobs For Your{' '}
                        <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Dream Career
                        </span>
                    </h1>
                    <p className="text-center text-lg font-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                        Handpicked off-campus drives, fresher jobs & internships — updated daily for students and professionals
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-10">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                        </span>
                        <span className="text-base font-bold text-green-600 dark:text-green-400">Updated Today</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-xl mx-auto">
                        {[
                            { label: 'Jobs Listed', value: '100+', color: 'from-violet-600 to-purple-600' },
                            { label: 'Companies', value: '50+', color: 'from-sky-600 to-blue-600' },
                            { label: 'Daily Updates', value: 'Daily', color: 'from-emerald-600 to-teal-600' },
                            { label: 'Cost', value: 'Free', color: 'from-orange-600 to-amber-600' },
                        ].map((s, i) => (
                            <div key={i} className="text-center p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <p className={`text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-400 mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ MAIN LAYOUT ══ */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* ── LEFT FEED ── */}
                    <div className="lg:col-span-8">

                        {/* Search + Filters */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 mb-6 shadow-sm">
                            <div className="relative mb-3">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by job title, company, or location..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 text-base font-medium focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-colors"
                                />
                                {search && (
                                    <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="flex items-center gap-1 text-sm font-bold uppercase   text-gray-400 dark:text-gray-300 mr-0.5 flex-shrink-0">
                                    <Filter className="w-3.5 h-3.5" /> Filters:
                                </div>
                                <FilterDropdown label="Job Type" options={JOB_TYPE_OPTIONS} value={filterType} onChange={setFilterType} />
                                <FilterDropdown label="Location" options={LOCATION_OPTIONS} value={filterLocation} onChange={setFilterLocation} />
                                <FilterDropdown label="Salary" options={SALARY_OPTIONS} value={filterSalary} onChange={setFilterSalary} />
                                <FilterDropdown label="Experience" options={EXPERIENCE_OPTIONS} value={filterExp} onChange={setFilterExp} />
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
                                        <span key={f.val} className="inline-flex items-center gap-1 text-sm font-bold px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-full">
                                            {f.val}
                                            <button onClick={() => f.set(f.def)} className="ml-0.5 hover:text-purple-900 dark:hover:text-white">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Results count */}
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-base font-medium text-gray-600 dark:text-gray-400">
                                Showing <span className="text-gray-800 dark:text-white font-bold">{filtered.length}</span> jobs
                                {activeCount > 0 && <span className="ml-1">(filtered)</span>}
                            </p>
                        </div>

                        {/* Featured grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                            </div>
                        ) : featuredJobs.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                                {featuredJobs.map((job, i) => (
                                    <JobCard key={job._id} job={job} index={i} onClick={() => go(job._id)} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 mb-6">
                                <Search className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                                <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">No jobs found</p>
                                <p className="text-base font-medium text-gray-700 dark:text-gray-400 mb-5">Try adjusting your search or filters</p>
                                <button onClick={clearAll} className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-base font-bold hover:bg-purple-700 transition-colors">
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        {/* Inline block */}
                        {inlineJobs.length > 0 && (
                            <div>
                                <p className="text-lg font-bold uppercase text-gray-700 dark:text-gray-400 mb-2">More Available Jobs</p>
                                <div className="space-y-3.5 py-4 border-t border-gray-300 dark:border-gray-700">
                                    {inlineJobs.map((job, i) => (
                                        <InlineJobCard key={job._id} job={job} index={i} onClick={() => go(job._id)} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Explore CTA */}
                        <div className="text-center py-4">
                            <button
                                onClick={() => navigate('/Job-Portal')}
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                Explore All Jobs <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/*  ─ ─ RIGHT SIDEBAR ─ ─  */}
                    <div className=" lg:col-span-4 ">
                        <div className="sticky top-6 space-y-5">

                            {/* Stay updated */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                                <div className="px-5 py-3.5 bg-white dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                    <p className="text-lg font-bold uppercase text-gray-700 dark:text-gray-400">Stay updated</p>
                                </div>
                                <div className="p-5 space-y-3">
                                    <p className="text-base font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Get the latest job alerts, resume tips, and off-campus drives straight to you.
                                    </p>
                                    <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl text-base font-bold transition-all">
                                        <Send className="w-4 h-4" /> Join on Telegram
                                    </a>
                                    <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl text-base font-bold transition-all">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                        </svg>
                                        Follow on Instagram
                                    </a>
                                </div>
                            </div>

                            {/* Latest openings */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                                <div className="px-5 py-3.5 bg-white dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                    <p className="text-lg font-bold uppercase   text-gray-700 dark:text-gray-400">Latest openings</p>
                                    <a href="/Job-Portal" className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-0.5">
                                        All <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                                <div className="divide-y divide-gray-50 dark:divide-gray-800">
                                    {loading
                                        ? [...Array(5)].map((_, i) => (
                                            <div key={i} className="px-5 py-3.5 animate-pulse flex gap-3">
                                                <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-1.5 flex-shrink-0" />
                                                <div className="flex-1 space-y-1.5">
                                                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                                                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                                                </div>
                                            </div>
                                        ))
                                        : allJobs.slice(0, 7).map(job => (
                                            <div key={job._id} onClick={() => go(job._id)}
                                                className="flex items-start gap-3 px-5 py-3.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-green-500 flex-shrink-0 mt-1.5" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-base font-bold text-gray-800 dark:text-gray-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{job.title}</p>
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate mt-0.5">{job.company}{job.location ? ` · ${job.location}` : ''}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* Alert CTA */}
                            <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 rounded-2xl p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Bell className="w-4 h-4 text-sky-500" />
                                    <p className="text-base font-bold text-sky-700 dark:text-sky-300">Daily Job Alerts</p>
                                </div>
                                <p className="text-base font-medium text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                    10,000+ students already get instant updates. Join free today.
                                </p>
                                <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl text-base font-bold transition-all">
                                    <Send className="w-4 h-4" /> Join
                                </a>
                            </div>

                            {/* Quick links */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
                                <p className="text-lg font-bold uppercase   text-gray-600 dark:text-gray-300 mb-3">Quick links</p>
                                <div className="space-y-1.5">
                                    {[
                                        { label: 'Internships', href: '/Internships' },
                                        { label: 'Freshers Jobs', href: '/Fresher-Jobs' },
                                        { label: 'Experienced Jobs', href: '/Experienced-Jobs' },
                                        { label: 'IT/Software Jobs', href: '/Job-Portal' },
                                    ].map(link => (
                                        <a key={link.label} href={link.href}
                                            className="flex items-center gap-2 text-base font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-1">
                                            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 text-gray-300 dark:text-gray-600" /> {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* ══ FEATURES ══ */}
            <div className="bg-gray-50 dark:bg-gray-950 mt-4">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="text-center mb-8">
                        <p className="text-3xl font-bold uppercase   text-purple-500 mb-2">Why choose us</p>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Everything you need to land your next job</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                        <FeatureCard icon={Zap} title="Daily Updates" desc="New off-campus drives and fresher opportunities posted every day — never miss a deadline." color="from-yellow-500 to-orange-500" />
                        <FeatureCard icon={CheckCircle} title="Verified Listings" desc="All listings are sourced directly from official company career pages and trusted portals." color="from-emerald-500 to-teal-600" />
                        <FeatureCard icon={Globe} title="Pan-India Coverage" desc="Jobs from Hyderabad, Bengaluru, Pune, Mumbai, Delhi, Chennai, Noida and more." color="from-sky-500 to-blue-600" />
                        <FeatureCard icon={Star} title="100% Free" desc="No subscriptions, no fees. Browse and apply to all jobs completely free of charge." color="from-violet-500 to-purple-600" />
                    </div>

                    {/* How to apply */}
                    <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-7 mb-10">
                        <div className="text-center mb-7">
                            <p className="text-3xl font-bold uppercase   text-purple-500 mb-1">Simple process</p>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Apply in 3 easy steps</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { n: '01', t: 'Browse & Search', d: 'Use our smart filters — category, job type, location, salary range, and experience — to find your perfect match.' },
                                { n: '02', t: 'Read Details', d: 'Click any card to read full eligibility, responsibilities, skills required, and the complete selection process.' },
                                { n: '03', t: 'Apply Directly', d: "Hit the official apply link and submit your application straight on the company's career page." },
                            ].map(s => (
                                <div key={s.n} className="flex gap-4">
                                    <div className="text-4xl font-black text-purple-100 dark:text-purple-900 flex-shrink-0 leading-none">{s.n}</div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-800 dark:text-white mb-1">{s.t}</h3>
                                        <p className="text-base font-medium text-gray-600 dark:text-gray-400 leading-relaxed">{s.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-600 text-center leading-relaxed max-w-3xl mx-auto border-t border-gray-100 dark:border-gray-800 pt-8">
                        <span className="font-bold text-gray-700 dark:text-gray-400">Disclaimer:</span> The recruitment information provided is for informational purposes only. Sourced from official company websites. We have no affiliation with any company and provide no recruitment guarantees. No fee is charged for this service.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default JobsHeroSection;