

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../Navbar';
// import Footer from '../Footer';
// import Breadcrumb from '../Common/Breadcrumb';
// import { baseUrl } from '../../Baseurl';

// import {
//     MapPin, Briefcase, IndianRupee, Clock, CheckCircle2,
//     ChevronRight, ArrowRight, ArrowLeft, Users,
//     Zap, AlertCircle, Send, List,
//     Facebook, Twitter, Linkedin, Link2, Calendar, ChevronDown
// } from 'lucide-react';

// const TELEGRAM_LINK = 'https://t.me/dcoder75';
// const INSTAGRAM_LINK = 'https://www.instagram.com/dcoder75/';
// const WHATSAPP_WFH_LINK = 'https://t.me/dcoder75';
// const WHATSAPP_GOVT_LINK = 'https://t.me/dcoder75';

// const formatDate = (dateStr) => {
//     if (!dateStr) return '';
//     const d = new Date(dateStr);
//     if (isNaN(d)) return '';
//     return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
// };

// // ── Palette helper ────────────────────────────────────────────────────────────
// const getPalette = (company) => {
//     const palettes = [
//         { title: '#7c3aed', company: '#a21caf', accent: '#0891b2' },
//         { title: '#be185d', company: '#b45309', accent: '#047857' },
//         { title: '#1d4ed8', company: '#7c3aed', accent: '#be185d' },
//         { title: '#047857', company: '#0891b2', accent: '#7c3aed' },
//         { title: '#b45309', company: '#be185d', accent: '#1d4ed8' },
//     ];
//     const hash = [...(company || 'X')].reduce((a, c) => a + c.charCodeAt(0), 0);
//     return palettes[hash % palettes.length];
// };

// // ── Auto Image for DETAIL PAGE (full size) ─────────────────────────────────────
// const AutoJobImage = ({ title, company, location, salary }) => {
//     const p = getPalette(company);
//     return (
//         <div className="mx-7 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black flex flex-col items-center justify-center py-10 px-6 text-center">
//             <p className="text-xl font-bold uppercase tracking-[0.1em] mb-2" style={{ color: p.company }}>{company}</p>
//             <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: p.title }}>{title}</h2>
//             <div className="w-10 h-px bg-gray-200 mx-auto mb-4" />
//             <div className="flex flex-wrap items-center justify-center gap-4 text-base font-semibold">
//                 {location && (
//                     <span className="flex items-center gap-1.5" style={{ color: p.accent }}>
//                         <MapPin className="w-3.5 h-3.5" /> {location}
//                     </span>
//                 )}
//                 {location && salary && <span className="text-gray-300">|</span>}
//                 {salary && (
//                     <span className="flex items-center gap-1.5" style={{ color: p.company }}>
//                         <IndianRupee className="w-3.5 h-3.5" /> {salary}
//                     </span>
//                 )}
//             </div>
//             <span className="pt-3 text-gray-200  text-2xl font-semibold">TheJobInfo</span>
//         </div>
//     );
// };

// // ── Auto Image for RELATED POSTS (compact, smaller) ───────────────────────────
// const AutoJobImageCompact = ({ title, company, location }) => {
//     const p = getPalette(company);
//     return (
//         <div className="w-full h-full bg-white dark:bg-black flex flex-col items-center justify-center py-2 px-2 text-center">
//             <p className="text-sm font-bold uppercase   mb-0.5 leading-tight" style={{ color: p.company }}>
//                 {company?.length > 12 ? company.slice(0, 12) + '…' : company}
//             </p>
//             <p className="text-md font-bold leading-tight mb-1 line-clamp-2" style={{ color: p.title }}>
//                 {title?.length > 30 ? title.slice(0, 30) + '…' : title}
//             </p>
//             {location && (
//                 <span className="text-md font-medium flex items-center gap-0.5" style={{ color: p.accent }}>
//                     <MapPin className="w-2 h-2" /> {location?.length > 10 ? location.slice(0, 10) + '…' : location}
//                 </span>
//             )}
//             <span className="mt-1 text-gray-200 dark:text-gray-600 text-md font-semibold">TheJobInfo</span>
//         </div>
//     );
// };

// // ── Table of Contents ─────────────────────────────────────────────────────────
// const TableOfContents = ({ sections }) => {
//     const [open, setOpen] = useState(true);
//     const scrollTo = (id) => {
//         const el = document.getElementById(id);
//         if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     };
//     return (
//         <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
//             <button
//                 onClick={() => setOpen(o => !o)}
//                 className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//             >
//                 <span className="flex items-center gap-2 text-md font-bold text-gray-700 dark:text-gray-300">
//                     <List className="w-3.5 h-3.5 text-gray-400" /> Table of Contents
//                 </span>
//                 <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
//             </button>
//             {open && (
//                 <div className="  border-gray-100 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-900">
//                     <ol className="space-y-1">
//                         {sections.map((s, i) => (
//                             <li key={s.id} className="flex items-start gap-2">
//                                 <span className="text-md text-gray-400 mt-0.5 w-4 flex-shrink-0 font-semibold">{i + 1}.</span>
//                                 <button
//                                     onClick={() => scrollTo(s.id)}
//                                     className="text-left text-md text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline font-medium leading-snug"
//                                 >
//                                     {s.label}
//                                 </button>
//                             </li>
//                         ))}
//                     </ol>
//                 </div>
//             )}
//         </div>
//     );
// };

// // ── Share Bar ─────────────────────────────────────────────────────────────────
// const ShareBar = ({ title, company, jobType }) => {
//     const [copied, setCopied] = useState(false);
//     const shareUrl = window.location.href;
//     const shareText = `${title} at ${company}${jobType ? ` (${jobType})` : ''} – Apply now!`;

//     const handleNativeShare = async () => {
//         if (navigator.share) {
//             try {
//                 await navigator.share({ title: `${title} – ${company}`, text: shareText, url: shareUrl });
//             } catch (e) { }
//         }
//     };

//     const copyLink = () => {
//         navigator.clipboard.writeText(shareUrl);
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//     };

//     const enc = encodeURIComponent;

//     return (
//         <div className="flex flex-wrap items-center gap-2">

//             <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`} target="_blank" rel="noreferrer"
//                 className="w-8 h-8 rounded flex items-center justify-center bg-[#1877f2] hover:opacity-80 text-white transition-opacity" aria-label="Share on Facebook">
//                 <Facebook className="w-3.5 h-3.5" />
//             </a>
//             <a href={`https://twitter.com/intent/tweet?url=${enc(shareUrl)}&text=${enc(shareText)}`} target="_blank" rel="noreferrer"
//                 className="w-8 h-8 rounded flex items-center justify-center bg-[#1da1f2] hover:opacity-80 text-white transition-opacity" aria-label="Share on Twitter">
//                 <Twitter className="w-3.5 h-3.5" />
//             </a>
//             <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${enc(shareUrl)}&title=${enc(title)}&summary=${enc(shareText)}`} target="_blank" rel="noreferrer"
//                 className="w-8 h-8 rounded flex items-center justify-center bg-[#0077b5] hover:opacity-80 text-white transition-opacity" aria-label="Share on LinkedIn">
//                 <Linkedin className="w-3.5 h-3.5" />
//             </a>
//             <a href={`https://t.me/share/url?url=${enc(shareUrl)}&text=${enc(shareText)}`} target="_blank" rel="noreferrer"
//                 className="w-8 h-8 rounded flex items-center justify-center bg-[#0088cc] hover:opacity-80 text-white transition-opacity" aria-label="Share on Telegram">
//                 <Send className="w-3.5 h-3.5" />
//             </a>
//             <a href={`https://api.whatsapp.com/send?text=${enc(shareText + '\n' + shareUrl)}`} target="_blank" rel="noreferrer"
//                 className="w-8 h-8 rounded flex items-center justify-center bg-[#25d366] hover:opacity-80 text-white transition-opacity" aria-label="Share on WhatsApp">
//                 <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//                 </svg>
//             </a>
//             <button onClick={copyLink}
//                 className="w-8 h-8 rounded flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors" aria-label="Copy link">
//                 <Link2 className="w-3.5 h-3.5" />
//             </button>
//             {navigator.share && (
//                 <button onClick={handleNativeShare}
//                     className="px-3 h-8 rounded flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-md font-bold transition-colors border border-gray-200 dark:border-gray-700">
//                     Share
//                 </button>
//             )}
//             {copied && <span className="text-md text-green-600 dark:text-green-400 font-semibold ml-1">Copied!</span>}
//         </div>
//     );
// };

// // ── Prev / Next ───────────────────────────────────────────────────────────────
// const PrevNextBar = ({ prevJob, nextJob, onCardClick }) => (
//     <div className="mt-5 grid grid-cols-2 gap-3">
//         <div>
//             {prevJob ? (
//                 <button onClick={() => onCardClick(prevJob._id)}
//                     className="w-full text-left group border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 hover:border-purple-300 dark:hover:border-purple-700 transition-all bg-transparent">
//                     <p className="flex items-center gap-1 text-md text-gray-800 text-semibold dark:text-gray-500   st mb-1.5">
//                         <ArrowLeft className="w-3 h-3" /> Previous
//                     </p>
//                     <p className="text-mdfont-bold text-red-600 dark:text-red-400 group-hover:underline leading-snug line-clamp-2">
//                         {prevJob.title} – {prevJob.company}
//                     </p>
//                 </button>
//             ) : (
//                 <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-3.5 bg-transparent">
//                     <p className="flex items-center gap-1 text-md text-gray-300 dark:text-gray-700  st mb-1.5">
//                         <ArrowLeft className="w-3 h-3" /> Previous
//                     </p>
//                     <p className="text-md text-gray-300 dark:text-gray-700">No previous post</p>
//                 </div>
//             )}
//         </div>
//         <div>
//             {nextJob ? (
//                 <button onClick={() => onCardClick(nextJob._id)}
//                     className="w-full text-right group border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 hover:border-purple-300 dark:hover:border-purple-700 transition-all bg-transparent">
//                     <p className="flex items-center justify-end gap-1 text-md text-gray-800 text-semibold dark:text-gray-500  st mb-1.5">
//                         Next <ArrowRight className="w-3 h-3" />
//                     </p>
//                     <p className="text-mdfont-bold text-red-600 dark:text-red-400 group-hover:underline leading-snug line-clamp-2">
//                         {nextJob.title} – {nextJob.company}
//                     </p>

//                 </button>
//             ) : (
//                 <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-3.5 text-right bg-transparent">
//                     <p className="flex items-center justify-end gap-1 text-md text-gray-300 dark:text-gray-700 uppercase  st mb-1.5">
//                         Next <ArrowRight className="w-3 h-3" />
//                     </p>
//                     <p className="text-md text-gray-300 dark:text-gray-700">No next post</p>
//                 </div>
//             )}
//         </div>
//     </div>
// );

// // ── Related Posts ─────────────────────────────────────────────────────────────
// const RelatedPostsGrid = ({ jobs, onCardClick }) => {
//     return (
//         <div className="bg-transparent dark:bg-transparent overflow-hidden mt-5">
//             <div className=" py-4   border-b border-gray-300 dark:border-gray-700">
//                 <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase  ">Related Posts</h2>
//             </div>
//             <div className="py-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
//                 {jobs.slice(0, 6).map((job) => (
//                     <div key={job._id} onClick={() => onCardClick(job._id)} className="cursor-pointer group flex flex-col">
//                         {/* Compact thumbnail */}
//                         <div className="w-full aspect-[5/3] rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 mb-2">
//                             {job.imageUrl ? (
//                                 <img src={job.imageUrl} alt={job.company}
//                                     className="w-full h-full object-contain bg-white dark:bg-gray-900 p-1.5" />
//                             ) : (
//                                 <AutoJobImageCompact
//                                     title={job.title}
//                                     company={job.company}
//                                     location={job.location}
//                                 />
//                             )}
//                         </div>
//                         <p className="text-md font-semibold text-gray-800 dark:text-gray-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-3 mb-1 px-1">
//                             {job.title}{job.company ? ` | ${job.company}` : ''}{job.location ? ` | ${job.location}` : ''}
//                         </p>
//                         {job.createdAt && (
//                             <p className="text-sm text-gray-400 dark:text-gray-500 mt-auto">{formatDate(job.createdAt)}</p>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             {jobs.length > 6 && (
//                 <div className="px-4 pb-4 flex justify-center">
//                     <a href="/Job-Portal"
//                         className="flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-lg font-semibold text-gray-600 dark:text-gray-400 hover:border-red-300 dark:hover:border-red-600 hover:text-red-600 dark:hover:text-red-400 transition-all bg-transparent">
//                         Show more <ArrowRight className="w-3.5 h-3.5" />
//                     </a>
//                 </div>
//             )}
//         </div>
//     );
// };

// // ── Colorful icon for sidebar recent jobs ─────────────────────────────────────
// const colorfulGradients = [
//     'from-red-500 to-orange-400',
//     'from-blue-500 to-cyan-400',
//     'from-green-500 to-emerald-400',
//     'from-purple-500 to-pink-400',
//     'from-yellow-500 to-amber-400',
//     'from-sky-500 to-indigo-400',
// ];

// // ── Main Component ────────────────────────────────────────────────────────────
// const JobDetail = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [items, setItems] = useState([]);
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [id]);

//     useEffect(() => {
//         const getJobData = async () => {
//             try {
//                 const res = await axios.get(`${baseUrl}/job`);
//                 const foundItem = res.data.find((job) => job._id === id);
//                 setItem(foundItem);
//                 setItems(res.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         getJobData();
//     }, [id]);

//     const handleCardClick = (_id) => {
//         window.scrollTo({ top: 0, behavior: 'instant' });
//         navigate(`/jobdetail/${_id}`);
//     };

//     const toArray = (val) => {
//         if (!val) return [];
//         if (Array.isArray(val)) return val;
//         return val.split('\n').map(s => s.trim()).filter(Boolean);
//     };

//     if (loading) {
//         return (
//             <>
//                 <Navbar />
//                 <Breadcrumb />
//                 <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
//                     <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
//                         <div className="lg:col-span-8 space-y-4">
//                             {[...Array(5)].map((_, i) => (
//                                 <div key={i} className="animate-pulse bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 space-y-3">
//                                     <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
//                                     <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-full" />
//                                     <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="lg:col-span-4 space-y-4">
//                             {[...Array(3)].map((_, i) => (
//                                 <div key={i} className="animate-pulse bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 space-y-3">
//                                     <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
//                                     <div className="h-9 bg-gray-100 dark:bg-gray-800 rounded-xl" />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//                 <Footer />
//             </>
//         );
//     }

//     if (!item) {
//         return (
//             <>
//                 <Navbar />
//                 <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
//                     <p className="text-gray-500 dark:text-gray-400 text-lg">Job not found.</p>
//                 </div>
//                 <Footer />
//             </>
//         );
//     }

//     const responsibilities = toArray(item.responsibilities);
//     const requirements = toArray(item.eligibility);
//     const requiredSkills = toArray(item.requiredSkills);
//     const selectionProcess = toArray(item.selectionProcess);
//     const benefits = toArray(item.benefits);
//     const applySteps = toArray(item.applySteps);
//     const applyIf = toArray(item.applyIf);

//     const sortedItems = [...items];
//     const currentIndex = sortedItems.findIndex(j => j._id === id);
//     const prevJob = currentIndex > 0 ? sortedItems[currentIndex - 1] : null;
//     const nextJob = currentIndex < sortedItems.length - 1 ? sortedItems[currentIndex + 1] : null;
//     const otherJobs = items.filter(j => j._id !== id);
//     const midJobs1 = otherJobs.slice(0, 3);
//     const midJobs2 = otherJobs.slice(3, 7);

//     const tocSections = [
//         item.aboutCompany && { id: 'toc-about', label: `About ${item.company}` },
//         { id: 'toc-overview', label: 'Job Details Table' },
//         (item.description || responsibilities.length > 0) && { id: 'toc-responsibilities', label: 'Role & Responsibilities' },
//         (requirements.length > 0 || requiredSkills.length > 0) && { id: 'toc-eligibility', label: 'Eligibility & Skills' },
//         applyIf.length > 0 && { id: 'toc-applyif', label: 'Who Should Apply' },
//         selectionProcess.length > 0 && { id: 'toc-selection', label: 'Selection Process' },
//         benefits.length > 0 && { id: 'toc-benefits', label: `Benefits at ${item.company}` },
//         applySteps.length > 0 && { id: 'toc-howto', label: 'How to Apply' },
//         { id: 'toc-links', label: 'Apply Links' },
//     ].filter(Boolean);

//     const SectionTitle = ({ text, id: sId }) => (
//         <h2 id={sId} className="text-lg font-bold text-gray-900 dark:text-white mb-5 mt-10 uppercase leading-snug scroll-mt-8">{text}</h2>
//     );
//     const Divider = () => <hr className="  border-gray-100 dark:border-gray-800 my-5" />;

//     // ── Inline Jobs — only in the content area, not full-width card ───────────
//     const InlineJobsBlock = ({ jobs, title }) => {
//         if (!jobs || jobs.length === 0) return null;
//         return (
//             <div className="my-4 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
//                 <p className="text-lg font-bold text-gray-800 dark:text-gray-500 uppercase  st px-4 pt-3 pb-2">{title}</p>
//                 <div className="divide-y divide-gray-100 dark:divide-gray-800">
//                     {jobs.map((job, idx) => (
//                         <div key={job._id} onClick={() => handleCardClick(job._id)}
//                             className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-all group">
//                             <div className={`w-7 h-7 rounded-md flex-shrink-0 overflow-hidden`}>
//                                 {job.imageUrl ? (
//                                     <img src={job.imageUrl} alt={job.company} className="w-full h-full object-cover" />
//                                 ) : (
//                                     <div className={`w-full h-full bg-gradient-to-br ${colorfulGradients[idx % colorfulGradients.length]} flex items-center justify-center`}>
//                                         <Briefcase className="w-3.5 h-3.5 text-white" />
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                                 <p className="text-md font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{job.title}</p>
//                                 <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                                     {job.company}{job.location ? ` · ${job.location}` : ''}{job.salary ? ` · ${job.salary}` : ''}
//                                 </p>
//                             </div>
//                             <ArrowRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
//                 <Breadcrumb />
//                 <div className="max-w-7xl mx-auto px-4 sm:px-5 py-6 sm:py-8">
//                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

//                         {/* ══ MAIN COLUMN ══ */}
//                         <div className="lg:col-span-8">

//                             {/* ── SINGLE WHITE CARD ── */}
//                             <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">

//                                 {/* Hero */}
//                                 <div className="px-5 sm:px-7 pt-6 pb-5  border-gray-100 dark:border-gray-800">
//                                     <div className="flex items-start gap-4">
//                                         <div className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
//                                             {item.imageUrl ? (
//                                                 <>
//                                                     <img src={item.imageUrl} alt={item.company}
//                                                         className="w-full h-full object-cover"
//                                                         onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
//                                                     <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 items-center justify-center hidden">
//                                                         <Briefcase className="w-5 h-5 text-white" />
//                                                     </div>
//                                                 </>
//                                             ) : (
//                                                 <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
//                                                     <Briefcase className="w-5 h-5 text-white" />
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className="flex-1 min-w-0">
//                                             <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
//                                                 <span className="text-md font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
//                                                     {item.jobType || 'Off Campus'}
//                                                 </span>
//                                                 {item.category && (
//                                                     <span className="text-md font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
//                                                         {item.category}
//                                                     </span>
//                                                 )}
//                                                 <span className="flex items-center gap-1 text-md text-gray-400 dark:text-gray-500">
//                                                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" /> Active
//                                                 </span>
//                                             </div>
//                                             <h1 className="text-lg md:text-[20px] font-bold text-gray-900 dark:text-white leading-snug">{item.title}</h1>
//                                             <p className="text-md font-bold text-purple-600 dark:text-purple-400 mt-0.5">{item.company}</p>
//                                             {item.createdAt && (
//                                                 <p className="flex items-center gap-1 text-md text-gray-400 dark:text-gray-500 mt-1">
//                                                     <Calendar className="w-3 h-3" /> Posted on {formatDate(item.createdAt)}
//                                                 </p>
//                                             )}
//                                         </div>
//                                     </div>
//                                     {/* Chips */}
//                                     <div className="flex flex-wrap gap-1.5 mt-3.5">
//                                         {item.location && (
//                                             <span className="flex items-center gap-1.5 text-lg px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium">
//                                                 <MapPin className="w-3 h-3 text-red-400" /> {item.location}
//                                             </span>
//                                         )}
//                                         {item.salary && (
//                                             <span className="flex items-center gap-1.5 text-lg px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 font-bold">
//                                                 <IndianRupee className="w-3 h-3" /> {item.salary}
//                                             </span>
//                                         )}
//                                         {item.experience && (
//                                             <span className="flex items-center gap-1.5 text-lg px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium">
//                                                 <Users className="w-3 h-3 text-blue-400" /> {item.experience}
//                                             </span>
//                                         )}
//                                         {item.lastDate && (
//                                             <span className="flex items-center gap-1.5 text-lg px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 font-bold">
//                                                 <Clock className="w-3 h-3" /> Apply by: {item.lastDate}
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Image / Auto banner — detail page full-size */}
//                                 <div className="  border-gray-100 dark:border-gray-800">
//                                     {item.imageUrl ? (
//                                         <img src={item.imageUrl} alt={`${item.company} – ${item.title}`}
//                                             className="w-full h-auto object-contain bg-white dark:bg-gray-900" />
//                                     ) : (
//                                         <AutoJobImage
//                                             title={item.title}
//                                             company={item.company}
//                                             location={item.location}
//                                             salary={item.salary}
//                                         />
//                                     )}
//                                 </div>

//                                 {/* About Company */}
//                                 {item.aboutCompany && (
//                                     <div className="px-5 sm:px-7 pt-5 pb-0">
//                                         <div id="toc-about" className="scroll-mt-8">
//                                             <SectionTitle text={`About ${item.company}`} />
//                                             <p className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{item.aboutCompany}</p>
//                                         </div>
//                                         <Divider />
//                                     </div>
//                                 )}

//                                 {/* Table of Contents */}
//                                 <div className="px-5 sm:px-7 py-3   border-gray-100 dark:border-gray-800">
//                                     <TableOfContents sections={tocSections} />
//                                 </div>

//                                 {/* ── Content sections ── */}
//                                 <div className="px-5 sm:px-7 py-5">

//                                     {/* Job Details Table */}
//                                     <div id="toc-overview" className="scroll-mt-8">
//                                         <SectionTitle text="Job Details Table" />
//                                         <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
//                                             <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
//                                                 <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
//                                                     {[
//                                                         { label: 'Company', value: item.company },
//                                                         { label: 'Role', value: item.title },
//                                                         { label: 'Salary', value: item.salary },
//                                                         { label: 'Location', value: item.location },
//                                                         { label: 'Job Type', value: item.jobType },
//                                                         { label: 'Experience', value: item.experience },
//                                                         { label: 'Last Date', value: item.lastDate },
//                                                         { label: 'Posted On', value: formatDate(item.createdAt) },
//                                                     ].filter(r => r.value).map((row, i) => (
//                                                         <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
//                                                             <td className="px-4 py-2.5 text-md font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-500/50 w-28 sm:w-36    align-middle">{row.label}</td>
//                                                             <td className="px-4 py-2.5 text-md font-medium text-gray-800 dark:text-gray-200 align-middle">
//                                                                 {row.label === 'Salary' ? (
//                                                                     <span className="font-bold text-green-600 dark:text-green-400">{row.value}</span>
//                                                                 ) : row.label === 'Job Type' ? (
//                                                                     <span className="px-2 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-md font-bold">{row.value}</span>
//                                                                 ) : row.label === 'Last Date' ? (
//                                                                     <span className="text-red-600 dark:text-red-400 font-bold">{row.value}</span>
//                                                                 ) : row.label === 'Posted On' ? (
//                                                                     <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-md"><Calendar className="w-3 h-3" />{row.value}</span>
//                                                                 ) : row.value}
//                                                             </td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                         {item.salaryNote && (
//                                             <p className="text-md text-gray-500 dark:text-gray-400 mt-2 flex items-start gap-1.5 leading-relaxed">
//                                                 <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5 text-amber-500" />
//                                                 {item.salaryNote}
//                                             </p>
//                                         )}
//                                     </div>

//                                     <Divider />

//                                     {/* Responsibilities */}
//                                     {(item.description || responsibilities.length > 0) && (
//                                         <>
//                                             <div id="toc-responsibilities" className="scroll-mt-8">
//                                                 {item.description && (
//                                                     <>
//                                                         <SectionTitle text={`What does a ${item.title} do?`} />
//                                                         <p className="text-md text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{item.description}</p>
//                                                     </>
//                                                 )}
//                                                 {responsibilities.length > 0 && (
//                                                     <>
//                                                         <SectionTitle text="Key Responsibilities" />
//                                                         <ul className="space-y-2.5">
//                                                             {responsibilities.map((r, i) => (
//                                                                 <li key={i} className="flex items-start gap-2.5">
//                                                                     <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
//                                                                         <ChevronRight className="w-2.5 h-2.5 text-purple-600 dark:text-purple-400" />
//                                                                     </div>
//                                                                     <span className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{r}</span>
//                                                                 </li>
//                                                             ))}
//                                                         </ul>
//                                                     </>
//                                                 )}
//                                             </div>
//                                             <Divider />
//                                         </>
//                                     )}

//                                     {/* Inline jobs 1 — scoped within content, not full card width */}
//                                     {midJobs1.length > 0 && <InlineJobsBlock jobs={midJobs1} title="More jobs you might like" />}

//                                     {/* Eligibility */}
//                                     {(requirements.length > 0 || requiredSkills.length > 0) && (
//                                         <>
//                                             <div id="toc-eligibility" className="scroll-mt-8">
//                                                 {requirements.length > 0 && (
//                                                     <>
//                                                         <SectionTitle text="Eligibility Criteria" />
//                                                         <ul className="space-y-2.5 mb-4">
//                                                             {requirements.map((r, i) => (
//                                                                 <li key={i} className="flex items-start gap-2.5">
//                                                                     <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
//                                                                         <ChevronRight className="w-2.5 h-2.5 text-green-600 dark:text-green-400" />
//                                                                     </div>
//                                                                     <span className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{r}</span>
//                                                                 </li>
//                                                             ))}
//                                                         </ul>
//                                                     </>
//                                                 )}
//                                                 {requiredSkills.length > 0 && (
//                                                     <>
//                                                         <SectionTitle text="Required Skills" />
//                                                         <div className="flex flex-wrap gap-2">
//                                                             {requiredSkills.map((skill, i) => (
//                                                                 <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-md font-semibold">
//                                                                     <Zap className="w-3 h-3 text-yellow-500" /> {skill}
//                                                                 </span>
//                                                             ))}
//                                                         </div>
//                                                     </>
//                                                 )}
//                                             </div>
//                                             <Divider />
//                                         </>
//                                     )}

//                                     {/* Who Should Apply */}
//                                     {applyIf.length > 0 && (
//                                         <>
//                                             <div id="toc-applyif" className="scroll-mt-8">
//                                                 <SectionTitle text="Apply If You —" />
//                                                 <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-4">
//                                                     <ul className="space-y-2.5">
//                                                         {applyIf.map((point, i) => (
//                                                             <li key={i} className="flex items-start gap-2">
//                                                                 <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
//                                                                 <span className="text-md text-green-800 dark:text-green-300 leading-relaxed font-medium">{point}</span>
//                                                             </li>
//                                                         ))}
//                                                     </ul>
//                                                 </div>
//                                             </div>
//                                             <Divider />
//                                         </>
//                                     )}

//                                     {/* Selection Process */}
//                                     {selectionProcess.length > 0 && (
//                                         <>
//                                             <div id="toc-selection" className="scroll-mt-8">
//                                                 <SectionTitle text="Recruitment Rounds" />
//                                                 <ol className="space-y-2.5">
//                                                     {selectionProcess.map((step, i) => (
//                                                         <li key={i} className="flex items-center gap-2.5">
//                                                             <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-orange-700 dark:text-orange-400 font-bold text-lg flex-shrink-0">
//                                                                 {i + 1}
//                                                             </div>
//                                                             <span className="text-md text-gray-600 dark:text-gray-400 font-medium">{step}</span>
//                                                         </li>
//                                                     ))}
//                                                 </ol>
//                                                 <p className="text-md text-gray-400 dark:text-gray-500 mt-2 italic">* Rounds may vary based on team and location</p>
//                                             </div>
//                                             <Divider />
//                                         </>
//                                     )}

//                                     {/* Inline jobs 2 */}
//                                     {midJobs2.length > 0 && <InlineJobsBlock jobs={midJobs2} title="More off campus drives" />}

//                                     {/* Benefits */}
//                                     {benefits.length > 0 && (
//                                         <>
//                                             <div id="toc-benefits" className="scroll-mt-8">
//                                                 <SectionTitle text={`Benefits at ${item.company}`} />
//                                                 <ul className="space-y-2.5">
//                                                     {benefits.map((b, i) => (
//                                                         <li key={i} className="flex items-start gap-2">
//                                                             <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
//                                                             <span className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{b}</span>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                             <Divider />
//                                         </>
//                                     )}

//                                     {/* How to Apply */}
//                                     {applySteps.length > 0 && (
//                                         <>
//                                             <div id="toc-howto" className="scroll-mt-8">
//                                                 <SectionTitle text="Steps to Apply" />
//                                                 <ol className="space-y-2.5">
//                                                     {applySteps.map((step, i) => (
//                                                         <li key={i} className="flex items-start gap-2.5">
//                                                             <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 border  lue-200 dark: lue-800 flex items-center justify-center text-blue-700 dark:text-blue-400 text-md font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
//                                                             <span className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{step}</span>
//                                                         </li>
//                                                     ))}
//                                                 </ol>
//                                             </div>
//                                             <Divider />
//                                         </>
//                                     )}

//                                     {/* Apply Links — compact, inline width only */}
//                                     <div id="toc-links" className="scroll-mt-8">
//                                         <SectionTitle text="Apply Links" />
//                                         <div className="inline-flex flex-col gap-2 w-full">
//                                             {item.applyLink && (
//                                                 <div className="flex items-center justify-between gap-4 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5">
//                                                     <span className="text-md font-semibold text-gray-700 dark:text-gray-300 leading-snug">
//                                                         Apply – {item.company} {item.jobType || 'Off Campus'}
//                                                     </span>
//                                                     <a href={item.applyLink} target="_blank" rel="noreferrer"
//                                                         className="text-md font-semibold text-red-600 dark:text-red-400 hover:underline whitespace-nowrap flex-shrink-0">
//                                                         Apply Now
//                                                     </a>
//                                                 </div>
//                                             )}
//                                             <div className="flex items-center justify-between gap-4 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5">
//                                                 <span className="text-md font-semibold text-gray-700 dark:text-gray-300">Work from Home Community</span>
//                                                 <a href={WHATSAPP_WFH_LINK} target="_blank" rel="noreferrer"
//                                                     className="text-md font-semibold text-red-600 dark:text-red-400 hover:underline flex-shrink-0">Join Community</a>
//                                             </div>
//                                             <div className="flex items-center justify-between gap-4 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5">
//                                                 <span className="text-md font-semibold text-gray-700 dark:text-gray-300">Government Job Group</span>
//                                                 <a href={WHATSAPP_GOVT_LINK} target="_blank" rel="noreferrer"
//                                                     className="text-md font-semibold text-red-600 dark:text-red-400 hover:underline flex-shrink-0">Join Community</a>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <Divider />

//                                     {/* Disclaimer */}
//                                     <div className="text-md text-gray-500 dark:text-gray-400 leading-relaxed">
//                                         <span className="font-bold text-gray-700 dark:text-gray-300">Disclaimer: </span>
//                                         The recruitment information provided is for informational purposes only. It has been obtained from the official website of the organisation. We have no affiliation with the company and do not provide any recruitment guarantees. There is no fee charged for this information. For more details, please visit our{' '}
//                                         <a href="/privacy-policy" className="text-red-500 hover:underline font-semibold">Privacy Policy</a>.
//                                     </div>

//                                     <Divider />

//                                     {/* Share */}
//                                     <div>

//                                         <ShareBar title={item.title} company={item.company} jobType={item.jobType} />
//                                     </div>

//                                 </div>
//                             </div>
//                             {/* ── END SINGLE WHITE CARD ── */}

//                             {/* Prev / Next — transparent bg */}
//                             <PrevNextBar prevJob={prevJob} nextJob={nextJob} onCardClick={handleCardClick} />

//                             {/* Related Posts */}
//                             {otherJobs.length > 0 && (
//                                 <RelatedPostsGrid jobs={otherJobs} onCardClick={handleCardClick} />
//                             )}

//                         </div>
//                         {/* ── end main col ── */}

//                         {/* ══ SIDEBAR ══ */}
//                         <div className="lg:col-span-4">
//                             <div className="sticky top-6 space-y-4">

//                                 {/* Stay updated */}
//                                 <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
//                                     <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50   border-gray-100 dark:border-gray-700">
//                                         <p className="text-lg font-bold text-gray-800 dark:text-gray-400 uppercase  st">Stay updated</p>
//                                     </div>
//                                     <div className="p-4 space-y-2.5">
//                                         <p className="text-mdtext-gray-500 dark:text-gray-400 leading-relaxed">
//                                             Get the latest job alerts, resume tips, and off-campus drives straight to you.
//                                         </p>
//                                         <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer"
//                                             className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-xl text-md font-semibold transition-all">
//                                             <Send className="w-3.5 h-3.5" /> Join on Telegram
//                                         </a>
//                                         <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer"
//                                             className="flex items-center justify-center gap-2 w-full bg-pink-500 hover:bg-pink-600 text-white py-2.5 rounded-xl text-md font-semibold transition-all">
//                                             <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
//                                                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
//                                             </svg>
//                                             Follow on Instagram
//                                         </a>
//                                     </div>
//                                 </div>

//                                 {/* Job categories */}
//                                 <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
//                                     <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50   border-gray-100 dark:border-gray-700">
//                                         <p className="text-lg font-bold text-gray-800 dark:text-gray-400 uppercase  st">Job categories</p>
//                                     </div>
//                                     <div className="px-4 py-2">
//                                         {[
//                                             { label: 'Internships', href: '/Internships' },
//                                             { label: 'Freshers Jobs', href: '/Fresher-Jobs' },
//                                             { label: 'Experienced Jobs', href: '/Experienced-Jobs' },
//                                             { label: 'IT/Software Jobs', href: '/Job-Portal' },
//                                         ].map(link => (
//                                             <a key={link.label} href={link.href}
//                                                 className="flex items-center gap-2 text-mdfont-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2   border-gray-50 dark:border-gray-800 last:border-0">
//                                                 <ArrowRight className="w-3 h-3 flex-shrink-0 text-gray-300 dark:text-gray-600" /> {link.label}
//                                             </a>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Recent Jobs — colorful icons */}
//                                 {otherJobs.length > 0 && (
//                                     <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
//                                         <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50   border-gray-100 dark:border-gray-700">
//                                             <p className="text-lg font-bold text-gray-800 dark:text-gray-400 uppercase  st">Recent Jobs</p>
//                                         </div>
//                                         <div className="divide-y divide-gray-50 dark:divide-gray-800">
//                                             {otherJobs.slice(0, 6).map((job, idx) => (
//                                                 <div key={job._id} onClick={() => handleCardClick(job._id)}
//                                                     className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
//                                                     <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
//                                                         {job.imageUrl ? (
//                                                             <img src={job.imageUrl} alt={job.company} className="w-full h-full object-contain p-1 border border-gray-100 dark:border-gray-700 rounded-lg" />
//                                                         ) : (
//                                                             <div className={`w-full h-full bg-gradient-to-br ${colorfulGradients[idx % colorfulGradients.length]} flex items-center justify-center rounded-lg`}>
//                                                                 <Briefcase className="w-3.5 h-3.5 text-white" />
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                     <div className="flex-1 min-w-0">
//                                                         <p className="text-md font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">{job.title}</p>
//                                                         <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">{job.company}{job.location ? ` · ${job.location}` : ''}</p>
//                                                         {job.createdAt && (
//                                                             <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 flex items-center gap-1">
//                                                                 <Calendar className="w-2.5 h-2.5" /> {formatDate(job.createdAt)}
//                                                             </p>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div className="px-4 py-3   border-gray-100 dark:border-gray-800">
//                                             <a href="/Job-Portal" className="text-md font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
//                                                 See all openings <ArrowRight className="w-3 h-3" />
//                                             </a>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Telegram CTA */}
//                                 <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl">
//                                     <p className="text-mdtext-gray-500 dark:text-gray-400 leading-relaxed mb-3">
//                                         Get daily job alerts on Telegram — 10,000+ students already joined.
//                                     </p>
//                                     <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer"
//                                         className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-xl text-lg font-bold transition-all">
//                                         <Send className="w-3.5 h-3.5" /> Join free
//                                     </a>
//                                 </div>

//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default JobDetail;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Breadcrumb from '../Common/Breadcrumb';
import { baseUrl } from '../../Baseurl';

import {
    MapPin, Briefcase, IndianRupee, Clock, CheckCircle2,
    ChevronRight, ArrowRight, ArrowLeft, Users,
    Zap, AlertCircle, Send, List,
    Facebook, Twitter, Linkedin, Link2, Calendar, ChevronDown
} from 'lucide-react';

const TELEGRAM_LINK = 'https://t.me/dcoder75';
const INSTAGRAM_LINK = 'https://www.instagram.com/dcoder75/';
const WHATSAPP_WFH_LINK = 'https://t.me/dcoder75';
const WHATSAPP_GOVT_LINK = 'https://t.me/dcoder75';

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

// ─────────────────────────────────────────────────────────────────────────────
// GRADIENTS
// ─────────────────────────────────────────────────────────────────────────────
const GRADIENTS = [
    'from-violet-500 to-purple-600',
    'from-rose-500 to-pink-600',
    'from-sky-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-amber-600',
    'from-fuchsia-500 to-pink-600',
    'from-blue-500 to-cyan-600',
    'from-green-500 to-emerald-600',
];

const getGradient = (company) => {
    const hash = [...(company || 'X')].reduce((a, c) => a + c.charCodeAt(0), 0);
    return GRADIENTS[hash % GRADIENTS.length];
};

// ── Auto Image for DETAIL PAGE (full size) ────────────────────────────────────
const AutoJobImage = ({ title, company, location, salary }) => {
    const gradient = getGradient(company);
    return (
        <div className={`mx-7 rounded-lg bg-gradient-to-br ${gradient} flex flex-col items-center justify-center py-10 px-6 text-center`}>
            <p className="text-xl font-bold uppercase tracking-[0.1em] mb-2 text-white/70">{company}</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-white">{title}</h2>
            <div className="w-10 h-px bg-white/30 mx-auto mb-4" />
            <div className="flex flex-wrap items-center justify-center gap-4 text-base font-semibold">
                {location && (
                    <span className="flex items-center gap-1.5 text-white/80">
                        <MapPin className="w-3.5 h-3.5" /> {location}
                    </span>
                )}
                {location && salary && <span className="text-white/30">|</span>}
                {salary && (
                    <span className="flex items-center gap-1.5 text-white/80">
                        <IndianRupee className="w-3.5 h-3.5" /> {salary}
                    </span>
                )}
            </div>
            <span className="pt-3 text-white/40 text-2xl font-semibold">TheJobInfo</span>
        </div>
    );
};

// ── Auto Image for RELATED POSTS (compact, smaller) ───────────────────────────
const AutoJobImageCompact = ({ title, company, location }) => {
    const gradient = getGradient(company);
    return (
        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center py-2 px-2 text-center`}>
            <p className="text-sm font-bold uppercase mb-0.5 leading-tight text-white/70">
                {company?.length > 12 ? company.slice(0, 12) + '…' : company}
            </p>
            <p className="text-md font-bold leading-tight mb-1 line-clamp-2 text-white">
                {title?.length > 30 ? title.slice(0, 30) + '…' : title}
            </p>
            {location && (
                <span className="text-md font-medium flex items-center gap-0.5 text-white/80">
                    <MapPin className="w-2 h-2" /> {location?.length > 10 ? location.slice(0, 10) + '…' : location}
                </span>
            )}
            <span className="mt-1 text-white/40 text-md font-semibold">TheJobInfo</span>
        </div>
    );
};

// ── Table of Contents ─────────────────────────────────────────────────────────
const TableOfContents = ({ sections }) => {
    const [open, setOpen] = useState(true);
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
                <span className="flex items-center gap-2 text-md font-bold text-gray-700 dark:text-gray-300">
                    <List className="w-3.5 h-3.5 text-gray-400" /> Table of Contents
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="border-gray-100 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-900">
                    <ol className="space-y-1">
                        {sections.map((s, i) => (
                            <li key={s.id} className="flex items-start gap-2">
                                <span className="text-md text-gray-400 mt-0.5 w-4 flex-shrink-0 font-semibold">{i + 1}.</span>
                                <button
                                    onClick={() => scrollTo(s.id)}
                                    className="text-left text-md text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline font-medium leading-snug"
                                >
                                    {s.label}
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};

// ── Share Bar ─────────────────────────────────────────────────────────────────
const ShareBar = ({ title, company, jobType }) => {
    const [copied, setCopied] = useState(false);
    const shareUrl = window.location.href;
    const shareText = `${title} at ${company}${jobType ? ` (${jobType})` : ''} – Apply now!`;

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: `${title} – ${company}`, text: shareText, url: shareUrl });
            } catch (e) { }
        }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const enc = encodeURIComponent;

    return (
        <div className="flex flex-wrap items-center gap-2">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center bg-[#1877f2] hover:opacity-80 text-white transition-opacity" aria-label="Share on Facebook">
                <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${enc(shareUrl)}&text=${enc(shareText)}`} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center bg-[#1da1f2] hover:opacity-80 text-white transition-opacity" aria-label="Share on Twitter">
                <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${enc(shareUrl)}&title=${enc(title)}&summary=${enc(shareText)}`} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center bg-[#0077b5] hover:opacity-80 text-white transition-opacity" aria-label="Share on LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href={`https://t.me/share/url?url=${enc(shareUrl)}&text=${enc(shareText)}`} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center bg-[#0088cc] hover:opacity-80 text-white transition-opacity" aria-label="Share on Telegram">
                <Send className="w-3.5 h-3.5" />
            </a>
            <a href={`https://api.whatsapp.com/send?text=${enc(shareText + '\n' + shareUrl)}`} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center bg-[#25d366] hover:opacity-80 text-white transition-opacity" aria-label="Share on WhatsApp">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
            <button onClick={copyLink}
                className="w-8 h-8 rounded flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors" aria-label="Copy link">
                <Link2 className="w-3.5 h-3.5" />
            </button>
            {navigator.share && (
                <button onClick={handleNativeShare}
                    className="px-3 h-8 rounded flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-md font-bold transition-colors border border-gray-200 dark:border-gray-700">
                    Share
                </button>
            )}
            {copied && <span className="text-md text-green-600 dark:text-green-400 font-semibold ml-1">Copied!</span>}
        </div>
    );
};

// ── Prev / Next ───────────────────────────────────────────────────────────────
const PrevNextBar = ({ prevJob, nextJob, onCardClick }) => (
    <div className="mt-5 grid grid-cols-2 gap-3">
        <div>
            {prevJob ? (
                <button onClick={() => onCardClick(prevJob._id)}
                    className="w-full text-left group border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 hover:border-purple-300 dark:hover:border-purple-700 transition-all bg-transparent">
                    <p className="flex items-center gap-1 text-md text-gray-800 text-semibold dark:text-gray-500 mb-1.5">
                        <ArrowLeft className="w-3 h-3" /> Previous
                    </p>
                    <p className="text-md font-bold text-red-600 dark:text-red-400 group-hover:underline leading-snug line-clamp-2">
                        {prevJob.title} – {prevJob.company}
                    </p>
                </button>
            ) : (
                <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-3.5 bg-transparent">
                    <p className="flex items-center gap-1 text-md text-gray-300 dark:text-gray-700 mb-1.5">
                        <ArrowLeft className="w-3 h-3" /> Previous
                    </p>
                    <p className="text-md text-gray-300 dark:text-gray-700">No previous post</p>
                </div>
            )}
        </div>
        <div>
            {nextJob ? (
                <button onClick={() => onCardClick(nextJob._id)}
                    className="w-full text-right group border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 hover:border-purple-300 dark:hover:border-purple-700 transition-all bg-transparent">
                    <p className="flex items-center justify-end gap-1 text-md text-gray-800 text-semibold dark:text-gray-500 mb-1.5">
                        Next <ArrowRight className="w-3 h-3" />
                    </p>
                    <p className="text-md font-bold text-red-600 dark:text-red-400 group-hover:underline leading-snug line-clamp-2">
                        {nextJob.title} – {nextJob.company}
                    </p>
                </button>
            ) : (
                <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-3.5 text-right bg-transparent">
                    <p className="flex items-center justify-end gap-1 text-md text-gray-300 dark:text-gray-700 uppercase mb-1.5">
                        Next <ArrowRight className="w-3 h-3" />
                    </p>
                    <p className="text-md text-gray-300 dark:text-gray-700">No next post</p>
                </div>
            )}
        </div>
    </div>
);

// ── Related Posts ─────────────────────────────────────────────────────────────
const RelatedPostsGrid = ({ jobs, onCardClick }) => {
    return (
        <div className="bg-transparent dark:bg-transparent overflow-hidden mt-5">
            <div className="py-4 border-b border-gray-300 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase">Related Posts</h2>
            </div>
            <div className="py-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
                {jobs.slice(0, 6).map((job) => (
                    <div key={job._id} onClick={() => onCardClick(job._id)} className="cursor-pointer group flex flex-col">
                        <div className="w-full aspect-[5/3] rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 mb-2">
                            {job.imageUrl ? (
                                <img src={job.imageUrl} alt={job.company}
                                    className="w-full h-full object-contain bg-white dark:bg-gray-900 p-1.5" />
                            ) : (
                                <AutoJobImageCompact
                                    title={job.title}
                                    company={job.company}
                                    location={job.location}
                                />
                            )}
                        </div>
                        <p className="text-md font-semibold text-gray-800 dark:text-gray-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-3 mb-1 px-1">
                            {job.title}{job.company ? ` | ${job.company}` : ''}{job.location ? ` | ${job.location}` : ''}
                        </p>
                        {job.createdAt && (
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-auto">{formatDate(job.createdAt)}</p>
                        )}
                    </div>
                ))}
            </div>
            {jobs.length > 6 && (
                <div className="px-4 pb-4 flex justify-center">
                    <a href="/Job-Portal"
                        className="flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-lg font-semibold text-gray-600 dark:text-gray-400 hover:border-red-300 dark:hover:border-red-600 hover:text-red-600 dark:hover:text-red-400 transition-all bg-transparent">
                        Show more <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                </div>
            )}
        </div>
    );
};

// ── Colorful icon for sidebar recent jobs ─────────────────────────────────────
const colorfulGradients = [
    'from-red-500 to-orange-400',
    'from-blue-500 to-cyan-400',
    'from-green-500 to-emerald-400',
    'from-purple-500 to-pink-400',
    'from-yellow-500 to-amber-400',
    'from-sky-500 to-indigo-400',
];

// ── Main Component ────────────────────────────────────────────────────────────
const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [id]);

    useEffect(() => {
        const getJobData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/job`);
                const foundItem = res.data.find((job) => job._id === id);
                setItem(foundItem);
                setItems(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        getJobData();
    }, [id]);

    const handleCardClick = (_id) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(`/jobdetail/${_id}`);
    };

    const toArray = (val) => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        return val.split('\n').map(s => s.trim()).filter(Boolean);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <Breadcrumb />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8 space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 space-y-3">
                                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
                                    <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-full" />
                                    <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
                                </div>
                            ))}
                        </div>
                        <div className="lg:col-span-4 space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 space-y-3">
                                    <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
                                    <div className="h-9 bg-gray-100 dark:bg-gray-800 rounded-xl" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!item) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Job not found.</p>
                </div>
                <Footer />
            </>
        );
    }

    const responsibilities = toArray(item.responsibilities);
    const requirements = toArray(item.eligibility);
    const requiredSkills = toArray(item.requiredSkills);
    const selectionProcess = toArray(item.selectionProcess);
    const benefits = toArray(item.benefits);
    const applySteps = toArray(item.applySteps);
    const applyIf = toArray(item.applyIf);

    const sortedItems = [...items];
    const currentIndex = sortedItems.findIndex(j => j._id === id);
    const prevJob = currentIndex > 0 ? sortedItems[currentIndex - 1] : null;
    const nextJob = currentIndex < sortedItems.length - 1 ? sortedItems[currentIndex + 1] : null;
    const otherJobs = items.filter(j => j._id !== id);
    const midJobs1 = otherJobs.slice(0, 3);
    const midJobs2 = otherJobs.slice(3, 7);

    const tocSections = [
        item.aboutCompany && { id: 'toc-about', label: `About ${item.company}` },
        { id: 'toc-overview', label: 'Job Details Table' },
        (item.description || responsibilities.length > 0) && { id: 'toc-responsibilities', label: 'Role & Responsibilities' },
        (requirements.length > 0 || requiredSkills.length > 0) && { id: 'toc-eligibility', label: 'Eligibility & Skills' },
        applyIf.length > 0 && { id: 'toc-applyif', label: 'Who Should Apply' },
        selectionProcess.length > 0 && { id: 'toc-selection', label: 'Selection Process' },
        benefits.length > 0 && { id: 'toc-benefits', label: `Benefits at ${item.company}` },
        applySteps.length > 0 && { id: 'toc-howto', label: 'How to Apply' },
        { id: 'toc-links', label: 'Apply Links' },
    ].filter(Boolean);

    const SectionTitle = ({ text, id: sId }) => (
        <h2 id={sId} className="text-lg font-bold text-gray-900 dark:text-white mb-5 mt-10 uppercase leading-snug scroll-mt-8">{text}</h2>
    );
    const Divider = () => <hr className="border-gray-100 dark:border-gray-800 my-5" />;

    const InlineJobsBlock = ({ jobs, title }) => {
        if (!jobs || jobs.length === 0) return null;
        return (
            <div className="my-4 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <p className="text-lg font-bold text-gray-800 dark:text-gray-500 uppercase px-4 pt-3 pb-2">{title}</p>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {jobs.map((job, idx) => (
                        <div key={job._id} onClick={() => handleCardClick(job._id)}
                            className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-all group">
                            <div className="w-7 h-7 rounded-md flex-shrink-0 overflow-hidden">
                                {job.imageUrl ? (
                                    <img src={job.imageUrl} alt={job.company} className="w-full h-full object-cover" />
                                ) : (
                                    <div className={`w-full h-full bg-gradient-to-br ${colorfulGradients[idx % colorfulGradients.length]} flex items-center justify-center`}>
                                        <Briefcase className="w-3.5 h-3.5 text-white" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-md font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{job.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {job.company}{job.location ? ` · ${job.location}` : ''}{job.salary ? ` · ${job.salary}` : ''}
                                </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <Breadcrumb />
                <div className="max-w-7xl mx-auto px-4 sm:px-5 py-6 sm:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                        {/* ══ MAIN COLUMN ══ */}
                        <div className="lg:col-span-8">

                            {/* ── SINGLE WHITE CARD ── */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">

                                {/* Hero */}
                                <div className="px-5 sm:px-7 pt-6 pb-5 border-gray-100 dark:border-gray-800">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                                            {item.imageUrl ? (
                                                <>
                                                    <img src={item.imageUrl} alt={item.company}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 items-center justify-center hidden">
                                                        <Briefcase className="w-5 h-5 text-white" />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                                    <Briefcase className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                                <span className="text-md font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                                                    {item.jobType || 'Off Campus'}
                                                </span>
                                                {item.category && (
                                                    <span className="text-md font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                                                        {item.category}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1 text-md text-gray-400 dark:text-gray-500">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" /> Active
                                                </span>
                                            </div>
                                            <h1 className="text-lg md:text-[20px] font-bold text-gray-900 dark:text-white leading-snug">{item.title}</h1>
                                            <p className="text-md font-bold text-purple-600 dark:text-purple-400 mt-0.5">{item.company}</p>
                                            {item.createdAt && (
                                                <p className="flex items-center gap-1 text-md text-gray-400 dark:text-gray-500 mt-1">
                                                    <Calendar className="w-3 h-3" /> Posted on {formatDate(item.createdAt)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {/* Chips */}
                                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                                        {item.location && (
                                            <span className="flex items-center gap-1.5 text-lg px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                                                <MapPin className="w-3 h-3 text-red-400" /> {item.location}
                                            </span>
                                        )}
                                        {item.salary && (
                                            <span className="flex items-center gap-1.5 text-lg px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 font-bold">
                                                <IndianRupee className="w-3 h-3" /> {item.salary}
                                            </span>
                                        )}
                                        {item.experience && (
                                            <span className="flex items-center gap-1.5 text-lg px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                                                <Users className="w-3 h-3 text-blue-400" /> {item.experience}
                                            </span>
                                        )}
                                        {item.lastDate && (
                                            <span className="flex items-center gap-1.5 text-lg px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 font-bold">
                                                <Clock className="w-3 h-3" /> Apply by: {item.lastDate}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Image / Auto banner */}
                                <div className="border-gray-100 dark:border-gray-800">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={`${item.company} – ${item.title}`}
                                            className="w-full h-auto object-contain bg-white dark:bg-gray-900" />
                                    ) : (
                                        <AutoJobImage
                                            title={item.title}
                                            company={item.company}
                                            location={item.location}
                                            salary={item.salary}
                                        />
                                    )}
                                </div>

                                {/* About Company */}
                                {item.aboutCompany && (
                                    <div className="px-5 sm:px-7 pt-5 pb-0">
                                        <div id="toc-about" className="scroll-mt-8">
                                            <SectionTitle text={`About ${item.company}`} />
                                            <p className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{item.aboutCompany}</p>
                                        </div>
                                        <Divider />
                                    </div>
                                )}

                                {/* Table of Contents */}
                                <div className="px-5 sm:px-7 py-3 border-gray-100 dark:border-gray-800">
                                    <TableOfContents sections={tocSections} />
                                </div>

                                {/* ── Content sections ── */}
                                <div className="px-5 sm:px-7 py-5">

                                    {/* Job Details Table */}
                                    <div id="toc-overview" className="scroll-mt-8">
                                        <SectionTitle text="Job Details Table" />
                                        <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                    {[
                                                        { label: 'Company', value: item.company },
                                                        { label: 'Role', value: item.title },
                                                        { label: 'Salary', value: item.salary },
                                                        { label: 'Location', value: item.location },
                                                        { label: 'Job Type', value: item.jobType },
                                                        { label: 'Experience', value: item.experience },
                                                        { label: 'Last Date', value: item.lastDate },
                                                        { label: 'Posted On', value: formatDate(item.createdAt) },
                                                    ].filter(r => r.value).map((row, i) => (
                                                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                                            <td className="px-4 py-2.5 text-md font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-500/50 w-28 sm:w-36 align-middle">{row.label}</td>
                                                            <td className="px-4 py-2.5 text-md font-medium text-gray-800 dark:text-gray-200 align-middle">
                                                                {row.label === 'Salary' ? (
                                                                    <span className="font-bold text-green-600 dark:text-green-400">{row.value}</span>
                                                                ) : row.label === 'Job Type' ? (
                                                                    <span className="px-2 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-md font-bold">{row.value}</span>
                                                                ) : row.label === 'Last Date' ? (
                                                                    <span className="text-red-600 dark:text-red-400 font-bold">{row.value}</span>
                                                                ) : row.label === 'Posted On' ? (
                                                                    <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-md"><Calendar className="w-3 h-3" />{row.value}</span>
                                                                ) : row.value}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        {item.salaryNote && (
                                            <p className="text-md text-gray-500 dark:text-gray-400 mt-2 flex items-start gap-1.5 leading-relaxed">
                                                <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5 text-amber-500" />
                                                {item.salaryNote}
                                            </p>
                                        )}
                                    </div>

                                    <Divider />

                                    {/* Responsibilities */}
                                    {(item.description || responsibilities.length > 0) && (
                                        <>
                                            <div id="toc-responsibilities" className="scroll-mt-8">
                                                {item.description && (
                                                    <>
                                                        <SectionTitle text={`What does a ${item.title} do?`} />
                                                        <p className="text-md text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{item.description}</p>
                                                    </>
                                                )}
                                                {responsibilities.length > 0 && (
                                                    <>
                                                        <SectionTitle text="Key Responsibilities" />
                                                        <ul className="space-y-2.5">
                                                            {responsibilities.map((r, i) => (
                                                                <li key={i} className="flex items-start gap-2.5">
                                                                    <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                        <ChevronRight className="w-2.5 h-2.5 text-purple-600 dark:text-purple-400" />
                                                                    </div>
                                                                    <span className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{r}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}
                                            </div>
                                            <Divider />
                                        </>
                                    )}

                                    {/* Inline jobs 1 */}
                                    {midJobs1.length > 0 && <InlineJobsBlock jobs={midJobs1} title="More jobs you might like" />}

                                    {/* Eligibility */}
                                    {(requirements.length > 0 || requiredSkills.length > 0) && (
                                        <>
                                            <div id="toc-eligibility" className="scroll-mt-8">
                                                {requirements.length > 0 && (
                                                    <>
                                                        <SectionTitle text="Eligibility Criteria" />
                                                        <ul className="space-y-2.5 mb-4">
                                                            {requirements.map((r, i) => (
                                                                <li key={i} className="flex items-start gap-2.5">
                                                                    <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                        <ChevronRight className="w-2.5 h-2.5 text-green-600 dark:text-green-400" />
                                                                    </div>
                                                                    <span className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{r}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}
                                                {requiredSkills.length > 0 && (
                                                    <>
                                                        <SectionTitle text="Required Skills" />
                                                        <div className="flex flex-wrap gap-2">
                                                            {requiredSkills.map((skill, i) => (
                                                                <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-md font-semibold">
                                                                    <Zap className="w-3 h-3 text-yellow-500" /> {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <Divider />
                                        </>
                                    )}

                                    {/* Who Should Apply */}
                                    {applyIf.length > 0 && (
                                        <>
                                            <div id="toc-applyif" className="scroll-mt-8">
                                                <SectionTitle text="Apply If You —" />
                                                <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-4">
                                                    <ul className="space-y-2.5">
                                                        {applyIf.map((point, i) => (
                                                            <li key={i} className="flex items-start gap-2">
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                                                <span className="text-md text-green-800 dark:text-green-300 leading-relaxed font-medium">{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <Divider />
                                        </>
                                    )}

                                    {/* Selection Process */}
                                    {selectionProcess.length > 0 && (
                                        <>
                                            <div id="toc-selection" className="scroll-mt-8">
                                                <SectionTitle text="Recruitment Rounds" />
                                                <ol className="space-y-2.5">
                                                    {selectionProcess.map((step, i) => (
                                                        <li key={i} className="flex items-center gap-2.5">
                                                            <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-orange-700 dark:text-orange-400 font-bold text-lg flex-shrink-0">
                                                                {i + 1}
                                                            </div>
                                                            <span className="text-md text-gray-600 dark:text-gray-400 font-medium">{step}</span>
                                                        </li>
                                                    ))}
                                                </ol>
                                                <p className="text-md text-gray-400 dark:text-gray-500 mt-2 italic">* Rounds may vary based on team and location</p>
                                            </div>
                                            <Divider />
                                        </>
                                    )}

                                    {/* Inline jobs 2 */}
                                    {midJobs2.length > 0 && <InlineJobsBlock jobs={midJobs2} title="More off campus drives" />}

                                    {/* Benefits */}
                                    {benefits.length > 0 && (
                                        <>
                                            <div id="toc-benefits" className="scroll-mt-8">
                                                <SectionTitle text={`Benefits at ${item.company}`} />
                                                <ul className="space-y-2.5">
                                                    {benefits.map((b, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                                            <span className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{b}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <Divider />
                                        </>
                                    )}

                                    {/* How to Apply */}
                                    {applySteps.length > 0 && (
                                        <>
                                            <div id="toc-howto" className="scroll-mt-8">
                                                <SectionTitle text="Steps to Apply" />
                                                <ol className="space-y-2.5">
                                                    {applySteps.map((step, i) => (
                                                        <li key={i} className="flex items-start gap-2.5">
                                                            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-400 text-md font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                                                            <span className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{step}</span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                            <Divider />
                                        </>
                                    )}

                                    {/* Apply Links */}
                                    <div id="toc-links" className="scroll-mt-8">
                                        <SectionTitle text="Apply Links" />
                                        <div className="inline-flex flex-col gap-2 w-full">
                                            {item.applyLink && (
                                                <div className="flex items-center justify-between gap-4 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5">
                                                    <span className="text-md font-semibold text-gray-700 dark:text-gray-300 leading-snug">
                                                        Apply – {item.company} {item.jobType || 'Off Campus'}
                                                    </span>
                                                    <a href={item.applyLink} target="_blank" rel="noreferrer"
                                                        className="text-md font-semibold text-red-600 dark:text-red-400 hover:underline whitespace-nowrap flex-shrink-0">
                                                        Apply Now
                                                    </a>
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between gap-4 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5">
                                                <span className="text-md font-semibold text-gray-700 dark:text-gray-300">Work from Home Community</span>
                                                <a href={WHATSAPP_WFH_LINK} target="_blank" rel="noreferrer"
                                                    className="text-md font-semibold text-red-600 dark:text-red-400 hover:underline flex-shrink-0">Join Community</a>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5">
                                                <span className="text-md font-semibold text-gray-700 dark:text-gray-300">Government Job Group</span>
                                                <a href={WHATSAPP_GOVT_LINK} target="_blank" rel="noreferrer"
                                                    className="text-md font-semibold text-red-600 dark:text-red-400 hover:underline flex-shrink-0">Join Community</a>
                                            </div>
                                        </div>
                                    </div>

                                    <Divider />

                                    {/* Disclaimer */}
                                    <div className="text-md text-gray-500 dark:text-gray-400 leading-relaxed">
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Disclaimer: </span>
                                        The recruitment information provided is for informational purposes only. It has been obtained from the official website of the organisation. We have no affiliation with the company and do not provide any recruitment guarantees. There is no fee charged for this information. For more details, please visit our{' '}
                                        <a href="/privacy-policy" className="text-red-500 hover:underline font-semibold">Privacy Policy</a>.
                                    </div>

                                    <Divider />

                                    {/* Share */}
                                    <div>
                                        <ShareBar title={item.title} company={item.company} jobType={item.jobType} />
                                    </div>

                                </div>
                            </div>
                            {/* ── END SINGLE WHITE CARD ── */}

                            {/* Prev / Next */}
                            <PrevNextBar prevJob={prevJob} nextJob={nextJob} onCardClick={handleCardClick} />

                            {/* Related Posts */}
                            {otherJobs.length > 0 && (
                                <RelatedPostsGrid jobs={otherJobs} onCardClick={handleCardClick} />
                            )}

                        </div>
                        {/* ── end main col ── */}

                        {/* ══ SIDEBAR ══ */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-6 space-y-4">

                                {/* Stay updated */}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700">
                                        <p className="text-lg font-bold text-gray-800 dark:text-gray-400 uppercase">Stay updated</p>
                                    </div>
                                    <div className="p-4 space-y-2.5">
                                        <p className="text-md text-gray-500 dark:text-gray-400 leading-relaxed">
                                            Get the latest job alerts, resume tips, and off-campus drives straight to you.
                                        </p>
                                        <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer"
                                            className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-xl text-md font-semibold transition-all">
                                            <Send className="w-3.5 h-3.5" /> Join on Telegram
                                        </a>
                                        <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer"
                                            className="flex items-center justify-center gap-2 w-full bg-pink-500 hover:bg-pink-600 text-white py-2.5 rounded-xl text-md font-semibold transition-all">
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                            </svg>
                                            Follow on Instagram
                                        </a>
                                    </div>
                                </div>

                                {/* Job categories */}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700">
                                        <p className="text-lg font-bold text-gray-800 dark:text-gray-400 uppercase">Job categories</p>
                                    </div>
                                    <div className="px-4 py-2">
                                        {[
                                            { label: 'Internships', href: '/Internships' },
                                            { label: 'Freshers Jobs', href: '/Fresher-Jobs' },
                                            { label: 'Experienced Jobs', href: '/Experienced-Jobs' },
                                            { label: 'IT/Software Jobs', href: '/Job-Portal' },
                                        ].map(link => (
                                            <a key={link.label} href={link.href}
                                                className="flex items-center gap-2 text-md font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2 border-gray-50 dark:border-gray-800 last:border-0">
                                                <ArrowRight className="w-3 h-3 flex-shrink-0 text-gray-300 dark:text-gray-600" /> {link.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Jobs */}
                                {otherJobs.length > 0 && (
                                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700">
                                            <p className="text-lg font-bold text-gray-800 dark:text-gray-400 uppercase">Recent Jobs</p>
                                        </div>
                                        <div className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {otherJobs.slice(0, 6).map((job, idx) => (
                                                <div key={job._id} onClick={() => handleCardClick(job._id)}
                                                    className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                                    <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                                                        {job.imageUrl ? (
                                                            <img src={job.imageUrl} alt={job.company} className="w-full h-full object-contain p-1 border border-gray-100 dark:border-gray-700 rounded-lg" />
                                                        ) : (
                                                            <div className={`w-full h-full bg-gradient-to-br ${colorfulGradients[idx % colorfulGradients.length]} flex items-center justify-center rounded-lg`}>
                                                                <Briefcase className="w-3.5 h-3.5 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-md font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">{job.title}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">{job.company}{job.location ? ` · ${job.location}` : ''}</p>
                                                        {job.createdAt && (
                                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 flex items-center gap-1">
                                                                <Calendar className="w-2.5 h-2.5" /> {formatDate(job.createdAt)}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="px-4 py-3 border-gray-100 dark:border-gray-800">
                                            <a href="/Job-Portal" className="text-md font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                                                See all openings <ArrowRight className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Telegram CTA */}
                                <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl">
                                    <p className="text-md text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                                        Get daily job alerts on Telegram — 10,000+ students already joined.
                                    </p>
                                    <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-xl text-lg font-bold transition-all">
                                        <Send className="w-3.5 h-3.5" /> Join free
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default JobDetail;