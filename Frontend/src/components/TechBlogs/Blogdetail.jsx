
// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import CodeSnippet from "../CodeSnippet/CodeSnippet";
// // import Navbar from '../Navbar';
// // import Footer from '../Footer';
// // import Breadcrumb from '../Common/Breadcrumb';
// // import { baseUrl } from '../../Baseurl';
// // import Skeleton1 from '../Common/Skeleton';
// // import { ChevronRight, Code2, Lightbulb, Rocket, Award, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

// // const BlogDetail = () => {
// //     const { id } = useParams();
// //     const navigate = useNavigate();
// //     const [items, setItems] = useState([]);
// //     const [item, setItem] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [activeApproach, setActiveApproach] = useState(0);
// //     const [showCode, setShowCode] = useState(false);

// //     useEffect(() => {
// //         const getBlogData = async () => {
// //             try {
// //                 const res = await axios.get(`${baseUrl}/blog`);
// //                 const foundItem = res.data.find((blogItem) => blogItem.id.toString() === id);
// //                 setItem(foundItem);
// //                 setItems(res.data);
// //             } catch (error) {
// //                 console.error("Error fetching data:", error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         getBlogData();
// //     }, [id]);

// //     if (loading) {
// //         return (
// //             <>
// //                 <Navbar />
// //                 <Breadcrumb />
// //                 <Skeleton1 />
// //                 <Footer />
// //             </>
// //         );
// //     }

// //     const approaches = [
// //         {
// //             title: "Brute Force",
// //             explanation: item.explanation,
// //             code: item.code,
// //             icon: <Lightbulb className="w-6 h-6" />,
// //             color: "from-red-500 to-orange-500",
// //             badge: "Basic"
// //         },
// //         {
// //             title: "Better Approach",
// //             explanation: item.explanation2,
// //             code: item.code2,
// //             icon: <Rocket className="w-6 h-6" />,
// //             color: "from-yellow-500 to-amber-500",
// //             badge: "Improved"
// //         },
// //         {
// //             title: "Optimal Solution",
// //             explanation: item.explanation3,
// //             code: item.code3,
// //             icon: <Award className="w-6 h-6" />,
// //             color: "from-green-500 to-emerald-500",
// //             badge: "Best"
// //         }
// //     ];

// //     const currentApproach = approaches[activeApproach];

// //     const handleCardClick = (id) => navigate(`/detail/${id}`);

// //     const truncateText = (text, maxLength) => {
// //         if (text.length <= maxLength) return text;
// //         return text.substring(0, maxLength) + '...';
// //     };

// //     return (
// //         <>
// //             <Navbar />
// //             <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
// //                 <Breadcrumb />

// //                 {/* Problem Header - Full Width Banner */}
// //                 <div className="bg-transparent dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
// //                     <div className="container mx-auto px-4 py-12 max-w-7xl">
// //                         <div className="flex items-start justify-between gap-8">
// //                             <div className="flex-1">
// //                                 <div className="flex items-center gap-3 mb-4">
// //                                     <div className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-bold">
// //                                         DSA Problem
// //                                     </div>
// //                                     <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
// //                                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
// //                                         Active
// //                                     </div>
// //                                 </div>
// //                                 <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
// //                                     {item.header}
// //                                 </h1>
// //                                 <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
// //                                     Explore multiple solution approaches from basic to optimal
// //                                 </p>
// //                             </div>

// //                             {/* Solution Count Badge */}
// //                             <div className="hidden md:block">
// //                                 <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl">
// //                                     <p className="text-4xl mb-1">3</p>
// //                                     <p className="text-sm font-medium opacity-90">Solutions</p>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* Main Content - Split Panel Design */}
// //                 <div className="container mx-auto px-4 py-8 max-w-7xl">
// //                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
// //                         {/* Left Sidebar - Approach Navigator */}
// //                         <div className="lg:col-span-3">
// //                             <div className="sticky top-6 space-y-3">
// //                                 <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
// //                                     Approaches
// //                                 </h3>
// //                                 {approaches.map((approach, index) => (
// //                                     <button
// //                                         key={index}
// //                                         onClick={() => {
// //                                             setActiveApproach(index);
// //                                             setShowCode(false);
// //                                         }}
// //                                         className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${activeApproach === index
// //                                             ? `bg-gradient-to-r ${approach.color} text-white shadow-lg`
// //                                             : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:shadow-md border border-gray-200 dark:border-gray-800'
// //                                             }`}
// //                                     >
// //                                         <div className="flex items-center gap-3">
// //                                             <div className={`${activeApproach === index ? 'text-white' : 'text-gray-400'}`}>
// //                                                 {approach.icon}
// //                                             </div>
// //                                             <div className="flex-1">
// //                                                 <p className="font-bold text-sm mb-0.5">{approach.title}</p>
// //                                                 <p className={`text-xs ${activeApproach === index ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
// //                                                     {approach.badge}
// //                                                 </p>
// //                                             </div>
// //                                             {activeApproach === index && (
// //                                                 <CheckCircle2 className="w-5 h-5" />
// //                                             )}
// //                                         </div>
// //                                     </button>
// //                                 ))}
// //                             </div>
// //                         </div>

// //                         {/* Main Content Area */}
// //                         <div className="lg:col-span-9">
// //                             {/* Approach Content Card */}
// //                             <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg mt-10 mb-6">
// //                                 {/* Header */}
// //                                 <div className={`bg-gradient-to-r ${currentApproach.color} p-6 text-white`}>
// //                                     <div className="flex items-center gap-3 mb-2">
// //                                         {currentApproach.icon}
// //                                         <h2 className="text-2xl font-semibold">{currentApproach.title}</h2>
// //                                     </div>
// //                                     <p className="text-white/90 text-sm">
// //                                         {currentApproach.badge} approach to solve this problem
// //                                     </p>
// //                                 </div>

// //                                 {/* Explanation */}
// //                                 <div className="p-6">
// //                                     <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
// //                                         <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${currentApproach.color} flex items-center justify-center text-white text-xs font-bold`}>
// //                                             1
// //                                         </span>
// //                                         Explanation
// //                                     </h3>
// //                                     {currentApproach.explanation && (
// //                                         <div className="prose prose-gray dark:prose-invert max-w-none">
// //                                             {currentApproach.explanation.split('\n').map((line, idx) => (
// //                                                 <p key={idx} className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
// //                                                     {line.trim()}
// //                                                 </p>
// //                                             ))}
// //                                         </div>
// //                                     )}
// //                                 </div>

// //                                 {/* Code Section */}
// //                                 {currentApproach.code && (
// //                                     <div className="border-t border-gray-200 dark:border-gray-800 p-6">
// //                                         <div className="flex items-center justify-between mb-4">
// //                                             <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
// //                                                 <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${currentApproach.color} flex items-center justify-center text-white text-xs font-bold`}>
// //                                                     2
// //                                                 </span>
// //                                                 Implementation
// //                                             </h3>
// //                                             <button
// //                                                 onClick={() => setShowCode(!showCode)}
// //                                                 className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${showCode
// //                                                     ? `bg-gradient-to-r ${currentApproach.color} text-white shadow-lg`
// //                                                     : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-md'
// //                                                     }`}
// //                                             >
// //                                                 {showCode ? 'Hide Code' : 'Show Code'}
// //                                             </button>
// //                                         </div>
// //                                         {showCode && (
// //                                             <div className="animate-fadeIn">
// //                                                 <CodeSnippet codeString={currentApproach.code} />
// //                                             </div>
// //                                         )}
// //                                     </div>
// //                                 )}
// //                             </div>

// //                             {/* Navigation Arrows */}
// //                             <div className="flex items-center justify-between mb-12">
// //                                 <button
// //                                     onClick={() => setActiveApproach(Math.max(0, activeApproach - 1))}
// //                                     disabled={activeApproach === 0}
// //                                     className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeApproach === 0
// //                                         ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
// //                                         : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 hover:shadow-lg'
// //                                         }`}
// //                                 >
// //                                     ← Previous
// //                                 </button>
// //                                 <button
// //                                     onClick={() => setActiveApproach(Math.min(2, activeApproach + 1))}
// //                                     disabled={activeApproach === 2}
// //                                     className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeApproach === 2
// //                                         ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
// //                                         : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl'
// //                                         }`}
// //                                 >
// //                                     Next →
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* Related Problems Section */}
// //                 {/* <div className="bg-gradient-to-br from-transparent to-transparent dark:from-gray-950 dark:to-gray-950 py-16 border-t border-gray-200 dark:border-gray-800">
// //                     <div className="container mx-auto px-4 max-w-7xl">
// //                         <div className="text-center mb-12">
// //                             <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-3">
// //                                 More Problems
// //                             </h2>
// //                             <p className="text-gray-600 dark:text-gray-400">
// //                                 Continue your learning journey
// //                             </p>
// //                         </div>

// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// //                             {items
// //                                 .filter(blogItem => blogItem.id.toString() !== id)
// //                                 .sort((a, b) => new Date(b.date) - new Date(a.date))
// //                                 .slice(0, 4)
// //                                 .map((blogItem, index) => {
// //                                     const colors = [
// //                                         'from-red-500 to-orange-500',
// //                                         'from-blue-500 to-cyan-500',
// //                                         'from-green-500 to-emerald-500',
// //                                         'from-purple-500 to-pink-500'
// //                                     ];
// //                                     return (
// //                                         <div
// //                                             key={blogItem.id}
// //                                             onClick={() => handleCardClick(blogItem.id)}
// //                                             className="group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 cursor-pointer"
// //                                         >
// //                                             <div className="flex items-start gap-4">
// //                                                 <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
// //                                                     <Code2 className="w-6 h-6 text-white" />
// //                                                 </div>
// //                                                 <div className="flex-1">
// //                                                     <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
// //                                                         {blogItem.header}
// //                                                     </h3>
// //                                                     <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
// //                                                         {truncateText(blogItem.explanation, 100)}
// //                                                     </p>
// //                                                     <div className="flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400">
// //                                                         View Solution
// //                                                         <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                         </div>
// //                                     );
// //                                 })}
// //                         </div>

// //                         <div className="text-center">
// //                             <a href='/Technicalblog'>
// //                                 <button className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
// //                                     Explore All Problems
// //                                     <ExternalLink className="w-5 h-5" />
// //                                 </button>
// //                             </a>
// //                         </div>
// //                     </div>
// //                 </div> */}

// //                 {/* Contribute CTA */}
// //                 <div className="container mx-auto px-4 py-16 max-w-5xl">
// //                     <div className="relative rounded-3xl overflow-hidden">
// //                         <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-90"></div>
// //                         <div className="relative p-12 text-center text-white">
// //                             <Award className="w-16 h-16 mx-auto mb-6" />
// //                             <h3 className="text-3xl font-semibold mb-4">Share Your Solution</h3>
// //                             <p className="text-green-50 text-lg mb-8 max-w-2xl mx-auto">
// //                                 Help the community by contributing your unique approach to solving problems
// //                             </p>
// //                             <a href="/Contibuteblog">
// //                                 <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300">
// //                                     Contribute Now
// //                                 </button>
// //                             </a>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //             <Footer />

// //             {/* Decorative Floating Blobs */}
// //             <div className="fixed top-20 left-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
// //             <div className="fixed top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
// //             <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

// //             <style>{`
// //                 @keyframes blob {
// //                     0%, 100% { transform: translate(0, 0) scale(1); }
// //                     25% { transform: translate(20px, -50px) scale(1.1); }
// //                     50% { transform: translate(-20px, 20px) scale(0.9); }
// //                     75% { transform: translate(50px, 50px) scale(1.05); }
// //                 }

// //                 .animate-blob {
// //                     animation: blob 7s infinite;
// //                 }

// //                 .animation-delay-2000 {
// //                     animation-delay: 2s;
// //                 }

// //                 .animation-delay-4000 {
// //                     animation-delay: 4s;
// //                 }
// //             `}</style>

// //             <style>{`
// //                 @keyframes fadeIn {
// //                     from { opacity: 0; transform: translateY(-10px); }
// //                     to { opacity: 1; transform: translateY(0); }
// //                 }
// //                 .animate-fadeIn {
// //                     animation: fadeIn 0.3s ease-out;
// //                 }
// //             `}</style>
// //         </>
// //     );
// // };

// // export default BlogDetail;




// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import Navbar from '../Navbar';
// // import Footer from '../Footer';
// // import Breadcrumb from '../Common/Breadcrumb';
// // import { baseUrl } from '../../Baseurl';
// // import Skeleton1 from '../Common/Skeleton';
// // import {
// //     MapPin, Briefcase, DollarSign, Clock, Building2, CheckCircle2,
// //     XCircle, ChevronRight, ExternalLink, ArrowRight, Users,
// //     Award, Target, BookOpen, Zap, AlertCircle, Star
// // } from 'lucide-react';

// // const JobDetail = () => {
// //     const { id } = useParams();
// //     const navigate = useNavigate();
// //     const [items, setItems] = useState([]);
// //     const [item, setItem] = useState(null);
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         const getJobData = async () => {
// //             try {
// //                 const res = await axios.get(`${baseUrl}/job`);
// //                 const foundItem = res.data.find((job) => job._id === id);
// //                 setItem(foundItem);
// //                 setItems(res.data);
// //             } catch (error) {
// //                 console.error("Error fetching data:", error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         getJobData();
// //     }, [id]);

// //     if (loading) {
// //         return (
// //             <>
// //                 <Navbar />
// //                 <Breadcrumb />
// //                 <Skeleton1 />
// //                 <Footer />
// //             </>
// //         );
// //     }

// //     if (!item) {
// //         return (
// //             <>
// //                 <Navbar />
// //                 <div className="min-h-screen flex items-center justify-center">
// //                     <p className="text-gray-500 text-xl">Job not found.</p>
// //                 </div>
// //                 <Footer />
// //             </>
// //         );
// //     }

// //     const toArray = (val) => {
// //         if (!val) return [];
// //         if (Array.isArray(val)) return val;
// //         return val.split('\n').map(s => s.trim()).filter(Boolean);
// //     };

// //     const responsibilities = toArray(item.responsibilities);
// //     const requirements = toArray(item.eligibility);
// //     const requiredSkills = toArray(item.requiredSkills);
// //     const selectionProcess = toArray(item.selectionProcess);
// //     const benefits = toArray(item.benefits);
// //     const applySteps = toArray(item.applySteps);
// //     const applyIf = toArray(item.applyIf);
// //     const dontApplyIf = toArray(item.dontApplyIf);

// //     const handleCardClick = (_id) => navigate(`/jobdetail/${_id}`);

// //     /* ── Section heading helper ── */
// //     const SectionHeading = ({ number, title, color }) => (
// //         <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
// //             <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
// //                 {number}
// //             </span>
// //             {title}
// //         </h3>
// //     );

// //     /* ── Bullet list helper ── */
// //     const BulletList = ({ items: list, color, icon: Icon = ChevronRight }) => (
// //         <ul className="space-y-2.5">
// //             {list.map((text, i) => (
// //                 <li key={i} className="flex items-start gap-3">
// //                     <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
// //                         <Icon className="w-3 h-3 text-white" />
// //                     </div>
// //                     <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{text}</span>
// //                 </li>
// //             ))}
// //         </ul>
// //     );

// //     return (
// //         <>
// //             <Navbar />
// //             <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
// //                 <Breadcrumb />

// //                 {/* ═══════════════ HERO BANNER ═══════════════ */}
// //                 <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
// //                     <div className="container mx-auto px-4 py-8 max-w-7xl">
// //                         <div className="flex flex-col md:flex-row md:items-center gap-4">

// //                             {/* Company Logo placeholder */}
// //                             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
// //                                 <Briefcase className="w-8 h-8 text-white" />
// //                             </div>

// //                             <div className="flex-1">
// //                                 {/* Badges */}
// //                                 <div className="flex flex-wrap items-center gap-2 mb-2">
// //                                     <span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold">
// //                                         {item.jobType || 'Off Campus Drive'}
// //                                     </span>
// //                                     {item.category && (
// //                                         <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold">
// //                                             {item.category}
// //                                         </span>
// //                                     )}
// //                                     <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
// //                                         <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
// //                                         Active
// //                                     </span>
// //                                 </div>

// //                                 <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
// //                                     {item.title}
// //                                 </h1>
// //                                 <p className="text-base font-semibold text-purple-600 dark:text-purple-400 mt-0.5">
// //                                     {item.company}
// //                                 </p>
// //                             </div>

// //                             {/* Apply Button — top right on desktop */}
// //                             {item.applyLink && (
// //                                 <a href={item.applyLink} target="_blank" rel="noreferrer" className="hidden md:block">
// //                                     <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm">
// //                                         Apply Now <ExternalLink className="w-4 h-4" />
// //                                     </button>
// //                                 </a>
// //                             )}
// //                         </div>

// //                         {/* Meta chips */}
// //                         <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-600 dark:text-gray-400">
// //                             {item.location && (
// //                                 <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
// //                                     <MapPin className="w-4 h-4 text-red-500" /> {item.location}
// //                                 </span>
// //                             )}
// //                             {item.salary && (
// //                                 <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
// //                                     <DollarSign className="w-4 h-4 text-green-500" /> {item.salary}
// //                                 </span>
// //                             )}
// //                             {item.experience && (
// //                                 <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
// //                                     <Users className="w-4 h-4 text-blue-500" /> {item.experience}
// //                                 </span>
// //                             )}
// //                             {item.lastDate && (
// //                                 <span className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg text-red-600 dark:text-red-400 font-medium">
// //                                     <Clock className="w-4 h-4" /> Apply by: {item.lastDate}
// //                                 </span>
// //                             )}
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* ═══════════════ MAIN LAYOUT ═══════════════ */}
// //                 <div className="container mx-auto px-4 py-8 max-w-7xl">
// //                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

// //                         {/* ─── LEFT: Main Content ─── */}
// //                         <div className="lg:col-span-8 space-y-6">

// //                             {/* 1. About Company + Job Overview */}
// //                             <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
// //                                 <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 flex items-center gap-2 text-white">
// //                                     <Building2 className="w-5 h-5" />
// //                                     <h2 className="text-lg font-bold">About Company & Job Overview</h2>
// //                                 </div>
// //                                 <div className="p-6 space-y-6">
// //                                     {item.aboutCompany && (
// //                                         <div>
// //                                             <SectionHeading number="1" title={`About ${item.company}`} color="from-blue-500 to-cyan-500" />
// //                                             <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item.aboutCompany}</p>
// //                                         </div>
// //                                     )}

// //                                     <div>
// //                                         <SectionHeading number={item.aboutCompany ? "2" : "1"} title="Job Overview" color="from-blue-500 to-cyan-500" />
// //                                         <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
// //                                             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
// //                                                 <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
// //                                                     {[
// //                                                         { label: 'Company Name', value: item.company },
// //                                                         { label: 'Post Name', value: item.title },
// //                                                         { label: 'Expected Salary', value: item.salary },
// //                                                         { label: 'Job Location', value: item.location },
// //                                                         { label: 'Job Type', value: item.jobType },
// //                                                         { label: 'Experience', value: item.experience },
// //                                                         { label: 'Website', value: item.website },
// //                                                         { label: 'Last Date to Apply', value: item.lastDate },
// //                                                     ].filter(r => r.value).map((row, i) => (
// //                                                         <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
// //                                                             <td className="px-4 py-3 text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 w-36">{row.label}</td>
// //                                                             <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
// //                                                                 {row.label === 'Website' ? (
// //                                                                     <a href={row.value} target="_blank" rel="noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline text-sm">{row.value}</a>
// //                                                                 ) : row.label === 'Expected Salary' ? (
// //                                                                     <span className="font-bold text-green-600 dark:text-green-400">{row.value}</span>
// //                                                                 ) : row.label === 'Job Type' ? (
// //                                                                     <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold">{row.value}</span>
// //                                                                 ) : row.label === 'Last Date to Apply' ? (
// //                                                                     <span className="text-red-500 font-semibold">{row.value}</span>
// //                                                                 ) : row.value}
// //                                                             </td>
// //                                                         </tr>
// //                                                     ))}
// //                                                 </tbody>
// //                                             </table>
// //                                         </div>
// //                                         {item.salaryNote && (
// //                                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-start gap-1.5">
// //                                                 <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-500" />
// //                                                 {item.salaryNote}
// //                                             </p>
// //                                         )}
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             {/* 2. Role & Responsibilities */}
// //                             {(item.description || responsibilities.length > 0 || applyIf.length > 0 || dontApplyIf.length > 0) && (
// //                                 <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
// //                                     <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 flex items-center gap-2 text-white">
// //                                         <Target className="w-5 h-5" />
// //                                         <h2 className="text-lg font-bold">Role & Responsibilities</h2>
// //                                     </div>
// //                                     <div className="p-6 space-y-6">
// //                                         {item.description && (
// //                                             <div>
// //                                                 <SectionHeading number="1" title={`What does a ${item.title} at ${item.company} do?`} color="from-purple-500 to-pink-500" />
// //                                                 <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
// //                                             </div>
// //                                         )}

// //                                         {responsibilities.length > 0 && (
// //                                             <div>
// //                                                 <SectionHeading number={item.description ? "2" : "1"} title="Key Responsibilities" color="from-purple-500 to-pink-500" />
// //                                                 <BulletList items={responsibilities} color="from-purple-500 to-pink-500" />
// //                                             </div>
// //                                         )}

// //                                         {(applyIf.length > 0 || dontApplyIf.length > 0) && (
// //                                             <div>
// //                                                 <SectionHeading number="3" title="Who Should Apply?" color="from-purple-500 to-pink-500" />
// //                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                                     {applyIf.length > 0 && (
// //                                                         <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-4">
// //                                                             <h4 className="font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2 text-sm">
// //                                                                 <CheckCircle2 className="w-4 h-4" /> Apply If:
// //                                                             </h4>
// //                                                             <ul className="space-y-2">
// //                                                                 {applyIf.map((point, i) => (
// //                                                                     <li key={i} className="flex items-start gap-2 text-xs text-green-800 dark:text-green-300">
// //                                                                         <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {point}
// //                                                                     </li>
// //                                                                 ))}
// //                                                             </ul>
// //                                                         </div>
// //                                                     )}
// //                                                     {dontApplyIf.length > 0 && (
// //                                                         <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-4">
// //                                                             <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2 text-sm">
// //                                                                 <XCircle className="w-4 h-4" /> Don't Apply If:
// //                                                             </h4>
// //                                                             <ul className="space-y-2">
// //                                                                 {dontApplyIf.map((point, i) => (
// //                                                                     <li key={i} className="flex items-start gap-2 text-xs text-red-800 dark:text-red-300">
// //                                                                         <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {point}
// //                                                                     </li>
// //                                                                 ))}
// //                                                             </ul>
// //                                                         </div>
// //                                                     )}
// //                                                 </div>
// //                                             </div>
// //                                         )}
// //                                     </div>
// //                                 </div>
// //                             )}

// //                             {/* 3. Eligibility & Skills */}
// //                             {(requirements.length > 0 || requiredSkills.length > 0) && (
// //                                 <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
// //                                     <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4 flex items-center gap-2 text-white">
// //                                         <BookOpen className="w-5 h-5" />
// //                                         <h2 className="text-lg font-bold">Eligibility & Skills</h2>
// //                                     </div>
// //                                     <div className="p-6 space-y-6">
// //                                         {requirements.length > 0 && (
// //                                             <div>
// //                                                 <SectionHeading number="1" title="Eligibility Criteria" color="from-green-500 to-emerald-500" />
// //                                                 <BulletList items={requirements} color="from-green-500 to-emerald-500" />
// //                                             </div>
// //                                         )}
// //                                         {requiredSkills.length > 0 && (
// //                                             <div>
// //                                                 <SectionHeading number={requirements.length > 0 ? "2" : "1"} title="Required Skills" color="from-green-500 to-emerald-500" />
// //                                                 <div className="flex flex-wrap gap-2">
// //                                                     {requiredSkills.map((skill, i) => (
// //                                                         <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg text-xs font-semibold">
// //                                                             <Zap className="w-3 h-3" /> {skill}
// //                                                         </span>
// //                                                     ))}
// //                                                 </div>
// //                                             </div>
// //                                         )}
// //                                     </div>
// //                                 </div>
// //                             )}

// //                             {/* 4. Selection Process + Benefits + How to Apply */}
// //                             {(selectionProcess.length > 0 || benefits.length > 0 || applySteps.length > 0) && (
// //                                 <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
// //                                     <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 flex items-center gap-2 text-white">
// //                                         <Award className="w-5 h-5" />
// //                                         <h2 className="text-lg font-bold">Selection Process & How to Apply</h2>
// //                                     </div>
// //                                     <div className="p-6 space-y-6">
// //                                         {selectionProcess.length > 0 && (
// //                                             <div>
// //                                                 <SectionHeading number="1" title="Recruitment Selection Process" color="from-orange-500 to-red-500" />
// //                                                 <div className="relative pl-2">
// //                                                     <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-orange-400 to-red-400 opacity-25" />
// //                                                     <ol className="space-y-3">
// //                                                         {selectionProcess.map((step, i) => (
// //                                                             <li key={i} className="flex items-center gap-4">
// //                                                                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-sm z-10">
// //                                                                     {i + 1}
// //                                                                 </div>
// //                                                                 <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{step}</span>
// //                                                             </li>
// //                                                         ))}
// //                                                     </ol>
// //                                                 </div>
// //                                                 <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 italic">* Steps may vary depending on the role/team</p>
// //                                             </div>
// //                                         )}

// //                                         {benefits.length > 0 && (
// //                                             <div>
// //                                                 <SectionHeading number={selectionProcess.length > 0 ? "2" : "1"} title={`Why Join ${item.company}?`} color="from-orange-500 to-red-500" />
// //                                                 <ul className="space-y-2.5">
// //                                                     {benefits.map((b, i) => (
// //                                                         <li key={i} className="flex items-start gap-3">
// //                                                             <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
// //                                                             <span className="text-gray-700 dark:text-gray-300 text-sm">{b}</span>
// //                                                         </li>
// //                                                     ))}
// //                                                 </ul>
// //                                             </div>
// //                                         )}

// //                                         {applySteps.length > 0 && (
// //                                             <div>
// //                                                 <SectionHeading
// //                                                     number={[selectionProcess, benefits].filter(a => a.length > 0).length + 1}
// //                                                     title="How to Apply"
// //                                                     color="from-orange-500 to-red-500"
// //                                                 />
// //                                                 <ol className="space-y-2.5">
// //                                                     {applySteps.map((step, i) => (
// //                                                         <li key={i} className="flex items-start gap-3">
// //                                                             <span className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
// //                                                             <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{step}</span>
// //                                                         </li>
// //                                                     ))}
// //                                                 </ol>
// //                                             </div>
// //                                         )}
// //                                     </div>
// //                                 </div>
// //                             )}

// //                             {/* ── Apply CTA (mobile visible) ── */}
// //                             <div className="rounded-2xl overflow-hidden shadow-lg md:hidden">
// //                                 <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-center text-white">
// //                                     <Award className="w-12 h-12 mx-auto mb-3 opacity-90" />
// //                                     <h3 className="text-xl font-bold mb-1">Ready to Apply?</h3>
// //                                     {item.lastDate && (
// //                                         <p className="text-green-100 text-sm mb-4">Last date: {item.lastDate}</p>
// //                                     )}
// //                                     {item.applyLink ? (
// //                                         <a href={item.applyLink} target="_blank" rel="noreferrer">
// //                                             <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-2 mx-auto text-sm">
// //                                                 Apply on Official Website <ExternalLink className="w-4 h-4" />
// //                                             </button>
// //                                         </a>
// //                                     ) : (
// //                                         <p className="text-green-100 text-sm">Apply link will be available soon.</p>
// //                                     )}
// //                                 </div>
// //                             </div>

// //                             {/* ── More Jobs ── */}
// //                             {items.filter(j => j._id !== id).length > 0 && (
// //                                 <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
// //                                     <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
// //                                         <h2 className="text-lg font-bold text-gray-900 dark:text-white">More Jobs</h2>
// //                                         <p className="text-sm text-gray-500 dark:text-gray-400">Explore more opportunities</p>
// //                                     </div>
// //                                     <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                                         {items.filter(j => j._id !== id).slice(0, 4).map((job, index) => {
// //                                             const colors = ['from-red-500 to-orange-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-pink-500'];
// //                                             return (
// //                                                 <div
// //                                                     key={job._id}
// //                                                     onClick={() => handleCardClick(job._id)}
// //                                                     className="group flex items-start gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all cursor-pointer hover:border-purple-200 dark:hover:border-purple-800"
// //                                                 >
// //                                                     <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors[index % 4]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
// //                                                         <Briefcase className="w-5 h-5 text-white" />
// //                                                     </div>
// //                                                     <div className="flex-1 min-w-0">
// //                                                         <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{job.title}</h3>
// //                                                         <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{job.company}</p>
// //                                                         <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
// //                                                             {job.location && <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{job.location}</span>}
// //                                                             {job.salary && <span className="font-medium">{job.salary}</span>}
// //                                                         </div>
// //                                                     </div>
// //                                                     <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
// //                                                 </div>
// //                                             );
// //                                         })}
// //                                     </div>
// //                                     <div className="px-4 pb-4 text-center">
// //                                         <a href='/jobs'>
// //                                             <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm">
// //                                                 Explore All Jobs <ExternalLink className="w-4 h-4" />
// //                                             </button>
// //                                         </a>
// //                                     </div>
// //                                 </div>
// //                             )}
// //                         </div>

// //                         {/* ─── RIGHT: Sticky Sidebar ─── */}
// //                         <div className="lg:col-span-4">
// //                             <div className="sticky top-6 space-y-4">

// //                                 {/* Apply Card */}
// //                                 <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
// //                                     <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-4 text-white text-center">
// //                                         <Award className="w-8 h-8 mx-auto mb-1 opacity-90" />
// //                                         <h3 className="font-bold text-base">Ready to Apply?</h3>
// //                                     </div>
// //                                     <div className="p-4 space-y-3">
// //                                         {/* Quick facts */}
// //                                         <div className="space-y-2 text-sm">
// //                                             {item.salary && (
// //                                                 <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
// //                                                     <span className="text-gray-500 dark:text-gray-400 text-xs">Salary</span>
// //                                                     <span className="font-bold text-green-600 dark:text-green-400 text-xs">{item.salary}</span>
// //                                                 </div>
// //                                             )}
// //                                             {item.location && (
// //                                                 <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
// //                                                     <span className="text-gray-500 dark:text-gray-400 text-xs">Location</span>
// //                                                     <span className="font-semibold text-gray-700 dark:text-gray-300 text-xs">{item.location}</span>
// //                                                 </div>
// //                                             )}
// //                                             {item.experience && (
// //                                                 <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
// //                                                     <span className="text-gray-500 dark:text-gray-400 text-xs">Experience</span>
// //                                                     <span className="font-semibold text-gray-700 dark:text-gray-300 text-xs">{item.experience}</span>
// //                                                 </div>
// //                                             )}
// //                                             {item.lastDate && (
// //                                                 <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
// //                                                     <span className="text-gray-500 dark:text-gray-400 text-xs">Last Date</span>
// //                                                     <span className="font-semibold text-red-500 text-xs">{item.lastDate}</span>
// //                                                 </div>
// //                                             )}
// //                                             {item.website && (
// //                                                 <div className="flex items-center justify-between py-1.5">
// //                                                     <span className="text-gray-500 dark:text-gray-400 text-xs">Website</span>
// //                                                     <a href={item.website} target="_blank" rel="noreferrer" className="font-semibold text-purple-600 dark:text-purple-400 hover:underline text-xs truncate max-w-[130px]">{item.website}</a>
// //                                                 </div>
// //                                             )}
// //                                         </div>

// //                                         {item.salaryNote && (
// //                                             <p className="text-xs text-amber-600 dark:text-amber-400 flex items-start gap-1.5 bg-amber-50 dark:bg-amber-900/10 p-2 rounded-lg">
// //                                                 <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
// //                                                 {item.salaryNote}
// //                                             </p>
// //                                         )}

// //                                         {item.applyLink ? (
// //                                             <a href={item.applyLink} target="_blank" rel="noreferrer" className="block">
// //                                                 <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-sm">
// //                                                     Apply on Official Website <ExternalLink className="w-4 h-4" />
// //                                                 </button>
// //                                             </a>
// //                                         ) : (
// //                                             <div className="w-full text-center py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium">
// //                                                 Apply link coming soon
// //                                             </div>
// //                                         )}
// //                                     </div>
// //                                 </div>

// //                                 {/* ── AD SPACE 1 ── */}
// //                                 <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
// //                                     <div className="p-4 text-center">
// //                                         <p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Advertisement</p>
// //                                         <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex flex-col items-center justify-center gap-2">
// //                                             <Star className="w-8 h-8 text-gray-300 dark:text-gray-600" />
// //                                             <p className="text-xs text-gray-400 dark:text-gray-600 font-medium">Ad Space 300×250</p>
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 {/* ── AD SPACE 2 ── */}
// //                                 <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
// //                                     <div className="p-4 text-center">
// //                                         <p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Advertisement</p>
// //                                         <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex flex-col items-center justify-center gap-2">
// //                                             <Star className="w-8 h-8 text-gray-300 dark:text-gray-600" />
// //                                             <p className="text-xs text-gray-400 dark:text-gray-600 font-medium">Ad Space 300×300</p>
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 {/* ── AD SPACE 3 (tall) ── */}
// //                                 <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
// //                                     <div className="p-4 text-center">
// //                                         <p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Advertisement</p>
// //                                         <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex flex-col items-center justify-center gap-2">
// //                                             <Star className="w-8 h-8 text-gray-300 dark:text-gray-600" />
// //                                             <p className="text-xs text-gray-400 dark:text-gray-600 font-medium">Ad Space 300×600</p>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                     </div>
// //                 </div>
// //             </div>

// //             <Footer />

// //             {/* Decorative blobs */}
// //             <div className="fixed top-20 left-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
// //             <div className="fixed top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
// //             <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

// //             <style>{`
// //                 @keyframes blob {
// //                     0%, 100% { transform: translate(0, 0) scale(1); }
// //                     25% { transform: translate(20px, -50px) scale(1.1); }
// //                     50% { transform: translate(-20px, 20px) scale(0.9); }
// //                     75% { transform: translate(50px, 50px) scale(1.05); }
// //                 }
// //                 .animate-blob { animation: blob 7s infinite; }
// //                 .animation-delay-2000 { animation-delay: 2s; }
// //                 .animation-delay-4000 { animation-delay: 4s; }
// //             `}</style>
// //         </>
// //     );
// // };

// // export default JobDetail;




// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../Navbar';
// import Footer from '../Footer';
// import Breadcrumb from '../Common/Breadcrumb';
// import { baseUrl } from '../../Baseurl';
// import Skeleton1 from '../Common/Skeleton';
// import {
//     MapPin, Briefcase, IndianRupee, Clock, Building2, CheckCircle2,
//     XCircle, ChevronRight, ExternalLink, ArrowRight, Users,
//     Award, Target, BookOpen, Zap, AlertCircle, Star, Send
// } from 'lucide-react';

// const TELEGRAM_LINK = 'https://t.me/dcoder21575';

// const JobDetail = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [items, setItems] = useState([]);
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // ── Always open from the very top ──
//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: 'instant' });
//     }, [id]);

//     useEffect(() => {
//         const getJobData = async () => {
//             try {
//                 const res = await axios.get(`${baseUrl}/job`);
//                 const foundItem = res.data.find((job) => job._id === id);
//                 setItem(foundItem);
//                 setItems(res.data);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         getJobData();
//     }, [id]);

//     if (loading) {
//         return (
//             <>
//                 <Navbar />
//                 <Breadcrumb />
//                 <Skeleton1 />
//                 <Footer />
//             </>
//         );
//     }

//     if (!item) {
//         return (
//             <>
//                 <Navbar />
//                 <div className="min-h-screen flex items-center justify-center">
//                     <p className="text-gray-500 text-xl">Job not found.</p>
//                 </div>
//                 <Footer />
//             </>
//         );
//     }

//     const toArray = (val) => {
//         if (!val) return [];
//         if (Array.isArray(val)) return val;
//         return val.split('\n').map(s => s.trim()).filter(Boolean);
//     };

//     const responsibilities = toArray(item.responsibilities);
//     const requirements = toArray(item.eligibility);
//     const requiredSkills = toArray(item.requiredSkills);
//     const selectionProcess = toArray(item.selectionProcess);
//     const benefits = toArray(item.benefits);
//     const applySteps = toArray(item.applySteps);
//     const applyIf = toArray(item.applyIf);
//     const dontApplyIf = toArray(item.dontApplyIf);

//     const handleCardClick = (_id) => {
//         window.scrollTo({ top: 0, behavior: 'instant' });
//         navigate(`/jobdetail/${_id}`);
//     };

//     /* ── Helpers ── */
//     const SectionHeading = ({ number, title, color }) => (
//         <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
//             <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
//                 {number}
//             </span>
//             {title}
//         </h3>
//     );

//     const BulletList = ({ items: list, color }) => (
//         <ul className="space-y-2.5">
//             {list.map((text, i) => (
//                 <li key={i} className="flex items-start gap-3">
//                     <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
//                         <ChevronRight className="w-3 h-3 text-white" />
//                     </div>
//                     <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{text}</span>
//                 </li>
//             ))}
//         </ul>
//     );

//     return (
//         <>
//             <Navbar />
//             <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
//                 <Breadcrumb />

//                 {/* ══════════════ HERO BANNER ══════════════ */}
//                 <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
//                     <div className="container mx-auto px-4 py-8 max-w-7xl">
//                         <div className="flex flex-col md:flex-row md:items-center gap-4">
//                             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
//                                 <Briefcase className="w-8 h-8 text-white" />
//                             </div>

//                             <div className="flex-1">
//                                 <div className="flex flex-wrap items-center gap-2 mb-2">
//                                     <span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold">
//                                         {item.jobType || 'Off Campus Drive'}
//                                     </span>
//                                     {item.category && (
//                                         <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold">
//                                             {item.category}
//                                         </span>
//                                     )}
//                                     <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
//                                         <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
//                                         Active
//                                     </span>
//                                 </div>
//                                 <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
//                                     {item.title}
//                                 </h1>
//                                 <p className="text-base font-semibold text-purple-600 dark:text-purple-400 mt-0.5">
//                                     {item.company}
//                                 </p>
//                             </div>

//                             {/* Join Telegram — top right on desktop */}
//                             <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" className="hidden md:block">
//                                 <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm">
//                                     <Send className="w-4 h-4" /> Join Telegram
//                                 </button>
//                             </a>
//                         </div>

//                         {/* Meta chips */}
//                         <div className="flex flex-wrap gap-2 mt-4">
//                             {item.location && (
//                                 <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-xs text-gray-600 dark:text-gray-400">
//                                     <MapPin className="w-3.5 h-3.5 text-red-500" /> {item.location}
//                                 </span>
//                             )}
//                             {item.salary && (
//                                 <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-xs text-gray-600 dark:text-gray-400">
//                                     <IndianRupee className="w-3.5 h-3.5 text-green-500" /> {item.salary} LPA
//                                 </span>
//                             )}
//                             {item.experience && (
//                                 <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-xs text-gray-600 dark:text-gray-400">
//                                     <Users className="w-3.5 h-3.5 text-blue-500" /> {item.experience}
//                                 </span>
//                             )}
//                             {item.lastDate && (
//                                 <span className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg text-xs text-red-600 dark:text-red-400 font-medium">
//                                     <Clock className="w-3.5 h-3.5" /> Apply by: {item.lastDate}
//                                 </span>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* ══════════════ MAIN LAYOUT ══════════════ */}
//                 <div className="container mx-auto px-4 py-8 max-w-7xl">
//                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

//                         {/* ── LEFT / MAIN (8 cols) ── */}
//                         <div className="lg:col-span-8 space-y-6">

//                             {/* 1. About Company & Overview */}
//                             <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
//                                 <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 flex items-center gap-2 text-white">
//                                     <Building2 className="w-5 h-5" />
//                                     <h2 className="text-lg font-bold">About Company & Job Overview</h2>
//                                 </div>
//                                 <div className="p-6 space-y-6">
//                                     {item.aboutCompany && (
//                                         <div>
//                                             <SectionHeading number="1" title={`About ${item.company}`} color="from-blue-500 to-cyan-500" />
//                                             <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item.aboutCompany}</p>
//                                         </div>
//                                     )}
//                                     <div>
//                                         <SectionHeading number={item.aboutCompany ? "2" : "1"} title="Job Overview" color="from-blue-500 to-cyan-500" />
//                                         <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
//                                             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                                                 <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
//                                                     {[
//                                                         { label: 'Company Name', value: item.company },
//                                                         { label: 'Post Name', value: item.title },
//                                                         { label: 'Expected Salary', value: item.salary ? `${item.salary} LPA` : null },
//                                                         { label: 'Job Location', value: item.location },
//                                                         { label: 'Job Type', value: item.jobType },
//                                                         { label: 'Experience', value: item.experience },
//                                                         { label: 'Website', value: item.website },
//                                                         { label: 'Last Date to Apply', value: item.lastDate },
//                                                     ].filter(r => r.value).map((row, i) => (
//                                                         <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
//                                                             <td className="px-4 py-3 text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 w-36">{row.label}</td>
//                                                             <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
//                                                                 {row.label === 'Website' ? (
//                                                                     <a href={row.value} target="_blank" rel="noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">{row.value}</a>
//                                                                 ) : row.label === 'Expected Salary' ? (
//                                                                     <span className="font-bold text-green-600 dark:text-green-400">{row.value}</span>
//                                                                 ) : row.label === 'Job Type' ? (
//                                                                     <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold">{row.value}</span>
//                                                                 ) : row.label === 'Last Date to Apply' ? (
//                                                                     <span className="text-red-500 font-semibold">{row.value}</span>
//                                                                 ) : row.value}
//                                                             </td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                         {item.salaryNote && (
//                                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-start gap-1.5">
//                                                 <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-500" />
//                                                 {item.salaryNote}
//                                             </p>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* 2. Role & Responsibilities */}
//                             {(item.description || responsibilities.length > 0 || applyIf.length > 0 || dontApplyIf.length > 0) && (
//                                 <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
//                                     <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 flex items-center gap-2 text-white">
//                                         <Target className="w-5 h-5" />
//                                         <h2 className="text-lg font-bold">Role & Responsibilities</h2>
//                                     </div>
//                                     <div className="p-6 space-y-6">
//                                         {item.description && (
//                                             <div>
//                                                 <SectionHeading number="1" title={`What does a ${item.title} at ${item.company} do?`} color="from-purple-500 to-pink-500" />
//                                                 <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
//                                             </div>
//                                         )}
//                                         {responsibilities.length > 0 && (
//                                             <div>
//                                                 <SectionHeading number={item.description ? "2" : "1"} title="Key Responsibilities" color="from-purple-500 to-pink-500" />
//                                                 <BulletList items={responsibilities} color="from-purple-500 to-pink-500" />
//                                             </div>
//                                         )}
//                                         {(applyIf.length > 0 || dontApplyIf.length > 0) && (
//                                             <div>
//                                                 <SectionHeading number="3" title="Who Should Apply?" color="from-purple-500 to-pink-500" />
//                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                                     {applyIf.length > 0 && (
//                                                         <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-4">
//                                                             <h4 className="font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2 text-sm">
//                                                                 <CheckCircle2 className="w-4 h-4" /> Apply If:
//                                                             </h4>
//                                                             <ul className="space-y-2">
//                                                                 {applyIf.map((point, i) => (
//                                                                     <li key={i} className="flex items-start gap-2 text-xs text-green-800 dark:text-green-300">
//                                                                         <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {point}
//                                                                     </li>
//                                                                 ))}
//                                                             </ul>
//                                                         </div>
//                                                     )}
//                                                     {dontApplyIf.length > 0 && (
//                                                         <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-4">
//                                                             <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2 text-sm">
//                                                                 <XCircle className="w-4 h-4" /> Don't Apply If:
//                                                             </h4>
//                                                             <ul className="space-y-2">
//                                                                 {dontApplyIf.map((point, i) => (
//                                                                     <li key={i} className="flex items-start gap-2 text-xs text-red-800 dark:text-red-300">
//                                                                         <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {point}
//                                                                     </li>
//                                                                 ))}
//                                                             </ul>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* 3. Eligibility & Skills */}
//                             {(requirements.length > 0 || requiredSkills.length > 0) && (
//                                 <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
//                                     <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4 flex items-center gap-2 text-white">
//                                         <BookOpen className="w-5 h-5" />
//                                         <h2 className="text-lg font-bold">Eligibility & Skills</h2>
//                                     </div>
//                                     <div className="p-6 space-y-6">
//                                         {requirements.length > 0 && (
//                                             <div>
//                                                 <SectionHeading number="1" title="Eligibility Criteria" color="from-green-500 to-emerald-500" />
//                                                 <BulletList items={requirements} color="from-green-500 to-emerald-500" />
//                                             </div>
//                                         )}
//                                         {requiredSkills.length > 0 && (
//                                             <div>
//                                                 <SectionHeading number={requirements.length > 0 ? "2" : "1"} title="Required Skills" color="from-green-500 to-emerald-500" />
//                                                 <div className="flex flex-wrap gap-2">
//                                                     {requiredSkills.map((skill, i) => (
//                                                         <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg text-xs font-semibold">
//                                                             <Zap className="w-3 h-3" /> {skill}
//                                                         </span>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* 4. Selection Process + Benefits + How to Apply */}
//                             {(selectionProcess.length > 0 || benefits.length > 0 || applySteps.length > 0) && (
//                                 <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
//                                     <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 flex items-center gap-2 text-white">
//                                         <Award className="w-5 h-5" />
//                                         <h2 className="text-lg font-bold">Selection Process & How to Apply</h2>
//                                     </div>
//                                     <div className="p-6 space-y-6">
//                                         {selectionProcess.length > 0 && (
//                                             <div>
//                                                 <SectionHeading number="1" title="Recruitment Selection Process" color="from-orange-500 to-red-500" />
//                                                 <div className="relative pl-2">
//                                                     <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-orange-400 to-red-400 opacity-25" />
//                                                     <ol className="space-y-3">
//                                                         {selectionProcess.map((step, i) => (
//                                                             <li key={i} className="flex items-center gap-4">
//                                                                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-sm z-10">
//                                                                     {i + 1}
//                                                                 </div>
//                                                                 <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{step}</span>
//                                                             </li>
//                                                         ))}
//                                                     </ol>
//                                                 </div>
//                                                 <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 italic">* Steps may vary depending on the role/team</p>
//                                             </div>
//                                         )}
//                                         {benefits.length > 0 && (
//                                             <div>
//                                                 <SectionHeading number={selectionProcess.length > 0 ? "2" : "1"} title={`Why Join ${item.company}?`} color="from-orange-500 to-red-500" />
//                                                 <ul className="space-y-2.5">
//                                                     {benefits.map((b, i) => (
//                                                         <li key={i} className="flex items-start gap-3">
//                                                             <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
//                                                             <span className="text-gray-700 dark:text-gray-300 text-sm">{b}</span>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                         )}
//                                         {applySteps.length > 0 && (
//                                             <div>
//                                                 <SectionHeading
//                                                     number={[selectionProcess, benefits].filter(a => a.length > 0).length + 1}
//                                                     title="How to Apply"
//                                                     color="from-orange-500 to-red-500"
//                                                 />
//                                                 <ol className="space-y-2.5">
//                                                     {applySteps.map((step, i) => (
//                                                         <li key={i} className="flex items-start gap-3">
//                                                             <span className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
//                                                             <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{step}</span>
//                                                         </li>
//                                                     ))}
//                                                 </ol>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* ══ APPLY CTA — bottom of ALL content ══ */}
//                             <div className="rounded-2xl overflow-hidden shadow-xl">
//                                 <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
//                                     <Award className="w-14 h-14 mx-auto mb-3 opacity-90" />
//                                     <h3 className="text-2xl font-bold mb-1">Ready to Apply?</h3>
//                                     {item.lastDate && (
//                                         <p className="text-green-100 text-sm mb-1">
//                                             Last date to apply: <span className="font-bold text-white">{item.lastDate}</span>
//                                         </p>
//                                     )}
//                                     {item.salaryNote && (
//                                         <p className="text-green-100 text-xs mb-4 max-w-md mx-auto">{item.salaryNote}</p>
//                                     )}
//                                     <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
//                                         {/* Official apply link from DB */}
//                                         {item.applyLink && (
//                                             <a href={item.applyLink} target="_blank" rel="noreferrer">
//                                                 <button className="flex items-center gap-2 bg-white text-green-600 px-7 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition-all text-sm">
//                                                     Apply on Official Website <ExternalLink className="w-4 h-4" />
//                                                 </button>
//                                             </a>
//                                         )}
//                                         {/* Static Telegram — always shown */}
//                                         <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
//                                             <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-7 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition-all text-sm">
//                                                 <Send className="w-4 h-4" /> Join Telegram for Updates
//                                             </button>
//                                         </a>
//                                     </div>
//                                     {!item.applyLink && (
//                                         <p className="text-green-100 text-xs mt-3">Official apply link will be available soon.</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* ── More Jobs ── */}
//                             {items.filter(j => j._id !== id).length > 0 && (
//                                 <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
//                                     <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
//                                         <h2 className="text-lg font-bold text-gray-900 dark:text-white">More Jobs</h2>
//                                         <p className="text-sm text-gray-500 dark:text-gray-400">Explore more opportunities</p>
//                                     </div>
//                                     <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                         {items.filter(j => j._id !== id).slice(0, 4).map((job, index) => {
//                                             const colors = ['from-red-500 to-orange-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-pink-500'];
//                                             return (
//                                                 <div
//                                                     key={job._id}
//                                                     onClick={() => handleCardClick(job._id)}
//                                                     className="group flex items-start gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all cursor-pointer hover:border-purple-200 dark:hover:border-purple-800"
//                                                 >
//                                                     <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors[index % 4]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
//                                                         <Briefcase className="w-5 h-5 text-white" />
//                                                     </div>
//                                                     <div className="flex-1 min-w-0">
//                                                         <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{job.title}</h3>
//                                                         <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{job.company}</p>
//                                                         <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
//                                                             {job.location && <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{job.location}</span>}
//                                                             {job.salary && <span className="font-medium">{job.salary} LPA</span>}
//                                                         </div>
//                                                     </div>
//                                                     <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                     <div className="px-4 pb-4 text-center">
//                                         <a href='/Job-Portal'>
//                                             <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm">
//                                                 Explore All Jobs <ExternalLink className="w-4 h-4" />
//                                             </button>
//                                         </a>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* ── RIGHT SIDEBAR (4 cols, sticky) ── */}
//                         <div className="lg:col-span-4">
//                             <div className="sticky top-6 space-y-4">

//                                 {/* Quick Info + Join */}
//                                 {/* <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
//                                     <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-4 text-white">
//                                         <h3 className="font-bold text-base">Quick Info</h3>
//                                         <p className="text-xs text-white/80 mt-0.5">{item.company}</p>
//                                     </div>
//                                     <div className="p-4 space-y-1">
//                                         {item.salary && (
//                                             <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
//                                                 <span className="text-gray-500 dark:text-gray-400 text-xs">Salary</span>
//                                                 <span className="font-bold text-green-600 dark:text-green-400 text-xs">{item.salary} LPA</span>
//                                             </div>
//                                         )}
//                                         {item.location && (
//                                             <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
//                                                 <span className="text-gray-500 dark:text-gray-400 text-xs">Location</span>
//                                                 <span className="font-semibold text-gray-700 dark:text-gray-300 text-xs">{item.location}</span>
//                                             </div>
//                                         )}
//                                         {item.experience && (
//                                             <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
//                                                 <span className="text-gray-500 dark:text-gray-400 text-xs">Experience</span>
//                                                 <span className="font-semibold text-gray-700 dark:text-gray-300 text-xs">{item.experience}</span>
//                                             </div>
//                                         )}
//                                         {item.lastDate && (
//                                             <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
//                                                 <span className="text-gray-500 dark:text-gray-400 text-xs">Last Date</span>
//                                                 <span className="font-semibold text-red-500 text-xs">{item.lastDate}</span>
//                                             </div>
//                                         )}
//                                         {item.website && (
//                                             <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
//                                                 <span className="text-gray-500 dark:text-gray-400 text-xs">Website</span>
//                                                 <a href={item.website} target="_blank" rel="noreferrer" className="font-semibold text-purple-600 dark:text-purple-400 hover:underline text-xs truncate max-w-[130px]">{item.website}</a>
//                                             </div>
//                                         )}
//                                         {item.salaryNote && (
//                                             <p className="text-xs text-amber-600 dark:text-amber-400 flex items-start gap-1.5 bg-amber-50 dark:bg-amber-900/10 p-2 rounded-lg mt-2">
//                                                 <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
//                                                 {item.salaryNote}
//                                             </p>
//                                         )}
//                                         <div className="pt-2">
//                                             <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" className="block">
//                                                 <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2.5 rounded-xl font-bold shadow hover:shadow-lg hover:scale-[1.02] transition-all text-sm">
//                                                     <Send className="w-4 h-4" /> Join Telegram
//                                                 </button>
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div> */}

//                                 {/* AD SPACE 1 — 300×250 */}
//                                 <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
//                                     <div className="p-3 text-center">
//                                         <p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Advertisement</p>
//                                         <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex flex-col items-center justify-center gap-2">
//                                             <Star className="w-7 h-7 text-gray-300 dark:text-gray-600" />
//                                             <p className="text-xs text-gray-400 dark:text-gray-600 font-medium">Ad Space 300×250</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* AD SPACE 2 — 300×300 */}
//                                 <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
//                                     <div className="p-3 text-center">
//                                         <p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Advertisement</p>
//                                         <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex flex-col items-center justify-center gap-2">
//                                             <Star className="w-7 h-7 text-gray-300 dark:text-gray-600" />
//                                             <p className="text-xs text-gray-400 dark:text-gray-600 font-medium">Ad Space 300×300</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* AD SPACE 3 — 300×600 */}
//                                 <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
//                                     <div className="p-3 text-center">
//                                         <p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Advertisement</p>
//                                         <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex flex-col items-center justify-center gap-2">
//                                             <Star className="w-7 h-7 text-gray-300 dark:text-gray-600" />
//                                             <p className="text-xs text-gray-400 dark:text-gray-600 font-medium">Ad Space 300×600</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>

//             <Footer />

//             {/* Decorative blobs */}
//             <div className="fixed top-20 left-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
//             <div className="fixed top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
//             <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

//             <style>{`
//                 @keyframes blob {
//                     0%, 100% { transform: translate(0,0) scale(1); }
//                     25% { transform: translate(20px,-50px) scale(1.1); }
//                     50% { transform: translate(-20px,20px) scale(0.9); }
//                     75% { transform: translate(50px,50px) scale(1.05); }
//                 }
//                 .animate-blob { animation: blob 7s infinite; }
//                 .animation-delay-2000 { animation-delay: 2s; }
//                 .animation-delay-4000 { animation-delay: 4s; }
//             `}</style>
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
import Skeleton1 from '../Common/Skeleton';
import {
    MapPin, Briefcase, IndianRupee, Clock, Building2, CheckCircle2,
    XCircle, ChevronRight, ExternalLink, ArrowRight, Users,
    Award, Target, BookOpen, Zap, AlertCircle, Star, Send, ImageOff
} from 'lucide-react';

const TELEGRAM_LINK = 'https://t.me/dcoder21575';

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [id]);

    useEffect(() => {
        const getJobData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/job`);
                const foundItem = res.data.find((job) => job._id === id);
                setItem(foundItem);
                setItems(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        getJobData();
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <Breadcrumb />
                <Skeleton1 />
                <Footer />
            </>
        );
    }

    if (!item) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-gray-500 text-xl">Job not found.</p>
                </div>
                <Footer />
            </>
        );
    }

    const toArray = (val) => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        return val.split('\n').map(s => s.trim()).filter(Boolean);
    };

    const responsibilities = toArray(item.responsibilities);
    const requirements = toArray(item.eligibility);
    const requiredSkills = toArray(item.requiredSkills);
    const selectionProcess = toArray(item.selectionProcess);
    const benefits = toArray(item.benefits);
    const applySteps = toArray(item.applySteps);
    const applyIf = toArray(item.applyIf);
    const dontApplyIf = toArray(item.dontApplyIf);

    const handleCardClick = (_id) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(`/jobdetail/${_id}`);
    };

    const SectionHeading = ({ number, title, color }) => (
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                {number}
            </span>
            {title}
        </h3>
    );

    const BulletList = ({ items: list, color }) => (
        <ul className="space-y-2.5">
            {list.map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <ChevronRight className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{text}</span>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <Breadcrumb />

                {/* ══ HERO BANNER ══ */}
                <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-4 py-8 max-w-7xl">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">

                            {/* Company Logo / Image */}
                            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.company}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div
                                    className={`w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ${item.imageUrl ? 'hidden' : 'flex'}`}
                                >
                                    <Briefcase className="w-8 h-8 text-white" />
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold">
                                        {item.jobType || 'Off Campus Drive'}
                                    </span>
                                    {item.category && (
                                        <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold">
                                            {item.category}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
                                        Active
                                    </span>
                                </div>
                                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                                    {item.title}
                                </h1>
                                <p className="text-base font-semibold text-purple-600 dark:text-purple-400 mt-0.5">
                                    {item.company}
                                </p>
                            </div>

                            <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" className="hidden md:block">
                                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm">
                                    <Send className="w-4 h-4" /> Join Telegram
                                </button>
                            </a>
                        </div>



                        {/* Meta chips */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {item.location && (
                                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-xs text-gray-600 dark:text-gray-400">
                                    <MapPin className="w-3.5 h-3.5 text-red-500" /> {item.location}
                                </span>
                            )}
                            {item.salary && (
                                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-xs text-gray-600 dark:text-gray-400">
                                    <IndianRupee className="w-3.5 h-3.5 text-green-500" /> {item.salary}
                                </span>
                            )}
                            {item.experience && (
                                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-xs text-gray-600 dark:text-gray-400">
                                    <Users className="w-3.5 h-3.5 text-blue-500" /> {item.experience}
                                </span>
                            )}
                            {item.lastDate && (
                                <span className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg text-xs text-red-600 dark:text-red-400 font-medium">
                                    <Clock className="w-3.5 h-3.5" /> Apply by: {item.lastDate}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* ══ MAIN LAYOUT ══ */}
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* ── LEFT / MAIN (8 cols) ── */}
                        <div className="lg:col-span-8 space-y-6">

                            {/* ── Job Image Banner (shown below hero if image exists) ── */}
                            {item.imageUrl && (
                                <div className="mt-5 rounded-2xl shadow-lg flex justify-center overflow-visible">
                                    <img
                                        src={item.imageUrl}
                                        alt={`${item.company} - ${item.title}`}
                                        className="h-auto object-contain"
                                        style={{ maxWidth: "none" }}
                                    />
                                </div>
                            )}

                            {/* 1. About Company & Overview */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 flex items-center gap-2 text-white">
                                    <Building2 className="w-5 h-5" />
                                    <h2 className="text-lg font-bold">About Company & Job Overview</h2>
                                </div>
                                <div className="p-6 space-y-6">
                                    {item.aboutCompany && (
                                        <div>
                                            <SectionHeading number="1" title={`About ${item.company}`} color="from-blue-500 to-cyan-500" />
                                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item.aboutCompany}</p>
                                        </div>
                                    )}
                                    <div>
                                        <SectionHeading number={item.aboutCompany ? "2" : "1"} title="Job Overview" color="from-blue-500 to-cyan-500" />
                                        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                    {[
                                                        { label: 'Company Name', value: item.company },
                                                        { label: 'Post Name', value: item.title },
                                                        { label: 'Expected Salary', value: item.salary ? `${item.salary}` : null },
                                                        { label: 'Job Location', value: item.location },
                                                        { label: 'Job Type', value: item.jobType },
                                                        { label: 'Experience', value: item.experience },
                                                        { label: 'Website', value: item.website },
                                                        { label: 'Last Date to Apply', value: item.lastDate },
                                                    ].filter(r => r.value).map((row, i) => (
                                                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                            <td className="px-4 py-3 text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 w-36">{row.label}</td>
                                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                                                {row.label === 'Website' ? (
                                                                    <a href={`https://${row.value}`} target="_blank" rel="noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">{row.value}</a>
                                                                ) : row.label === 'Expected Salary' ? (
                                                                    <span className="font-bold text-green-600 dark:text-green-400">{row.value}</span>
                                                                ) : row.label === 'Job Type' ? (
                                                                    <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold">{row.value}</span>
                                                                ) : row.label === 'Last Date to Apply' ? (
                                                                    <span className="text-red-500 font-semibold">{row.value}</span>
                                                                ) : row.value}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        {item.salaryNote && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-start gap-1.5">
                                                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-500" />
                                                {item.salaryNote}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 2. Role & Responsibilities */}
                            {(item.description || responsibilities.length > 0 || applyIf.length > 0 || dontApplyIf.length > 0) && (
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 flex items-center gap-2 text-white">
                                        <Target className="w-5 h-5" />
                                        <h2 className="text-lg font-bold">Role & Responsibilities</h2>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        {item.description && (
                                            <div>
                                                <SectionHeading number="1" title={`What does a ${item.title} at ${item.company} do?`} color="from-purple-500 to-pink-500" />
                                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                                            </div>
                                        )}
                                        {responsibilities.length > 0 && (
                                            <div>
                                                <SectionHeading number={item.description ? "2" : "1"} title="Key Responsibilities" color="from-purple-500 to-pink-500" />
                                                <BulletList items={responsibilities} color="from-purple-500 to-pink-500" />
                                            </div>
                                        )}
                                        {(applyIf.length > 0 || dontApplyIf.length > 0) && (
                                            <div>
                                                <SectionHeading number="3" title="Who Should Apply?" color="from-purple-500 to-pink-500" />
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {applyIf.length > 0 && (
                                                        <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-4">
                                                            <h4 className="font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2 text-sm">
                                                                <CheckCircle2 className="w-4 h-4" /> Apply If:
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {applyIf.map((point, i) => (
                                                                    <li key={i} className="flex items-start gap-2 text-xs text-green-800 dark:text-green-300">
                                                                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {point}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {dontApplyIf.length > 0 && (
                                                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-4">
                                                            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2 text-sm">
                                                                <XCircle className="w-4 h-4" /> Don't Apply If:
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {dontApplyIf.map((point, i) => (
                                                                    <li key={i} className="flex items-start gap-2 text-xs text-red-800 dark:text-red-300">
                                                                        <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {point}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* 3. Eligibility & Skills */}
                            {(requirements.length > 0 || requiredSkills.length > 0) && (
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4 flex items-center gap-2 text-white">
                                        <BookOpen className="w-5 h-5" />
                                        <h2 className="text-lg font-bold">Eligibility & Skills</h2>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        {requirements.length > 0 && (
                                            <div>
                                                <SectionHeading number="1" title="Eligibility Criteria" color="from-green-500 to-emerald-500" />
                                                <BulletList items={requirements} color="from-green-500 to-emerald-500" />
                                            </div>
                                        )}
                                        {requiredSkills.length > 0 && (
                                            <div>
                                                <SectionHeading number={requirements.length > 0 ? "2" : "1"} title="Required Skills" color="from-green-500 to-emerald-500" />
                                                <div className="flex flex-wrap gap-2">
                                                    {requiredSkills.map((skill, i) => (
                                                        <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg text-xs font-semibold">
                                                            <Zap className="w-3 h-3" /> {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* 4. Selection Process + Benefits + How to Apply */}
                            {(selectionProcess.length > 0 || benefits.length > 0 || applySteps.length > 0) && (
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                                    <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 flex items-center gap-2 text-white">
                                        <Award className="w-5 h-5" />
                                        <h2 className="text-lg font-bold">Selection Process & How to Apply</h2>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        {selectionProcess.length > 0 && (
                                            <div>
                                                <SectionHeading number="1" title="Recruitment Selection Process" color="from-orange-500 to-red-500" />
                                                <div className="relative pl-2">
                                                    <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-orange-400 to-red-400 opacity-25" />
                                                    <ol className="space-y-3">
                                                        {selectionProcess.map((step, i) => (
                                                            <li key={i} className="flex items-center gap-4">
                                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-sm z-10">
                                                                    {i + 1}
                                                                </div>
                                                                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{step}</span>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 italic">* Steps may vary depending on the role/team</p>
                                            </div>
                                        )}
                                        {benefits.length > 0 && (
                                            <div>
                                                <SectionHeading number={selectionProcess.length > 0 ? "2" : "1"} title={`Why Join ${item.company}?`} color="from-orange-500 to-red-500" />
                                                <ul className="space-y-2.5">
                                                    {benefits.map((b, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-700 dark:text-gray-300 text-sm">{b}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {applySteps.length > 0 && (
                                            <div>
                                                <SectionHeading
                                                    number={[selectionProcess, benefits].filter(a => a.length > 0).length + 1}
                                                    title="How to Apply"
                                                    color="from-orange-500 to-red-500"
                                                />
                                                <ol className="space-y-2.5">
                                                    {applySteps.map((step, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                                                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{step}</span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* ── APPLY CTA ── */}
                            <div className="rounded-2xl overflow-hidden shadow-xl">
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
                                    <Award className="w-14 h-14 mx-auto mb-3 opacity-90" />
                                    <h3 className="text-2xl font-bold mb-1">Ready to Apply?</h3>
                                    {item.lastDate && (
                                        <p className="text-green-100 text-sm mb-1">
                                            Last date to apply: <span className="font-bold text-white">{item.lastDate}</span>
                                        </p>
                                    )}
                                    {item.salaryNote && (
                                        <p className="text-green-100 text-xs mb-4 max-w-md mx-auto">{item.salaryNote}</p>
                                    )}
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
                                        {item.applyLink && (
                                            <a href={item.applyLink} target="_blank" rel="noreferrer">
                                                <button className="flex items-center gap-2 bg-white text-green-600 px-7 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition-all text-sm">
                                                    Apply on Official Website <ExternalLink className="w-4 h-4" />
                                                </button>
                                            </a>
                                        )}
                                        <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
                                            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-7 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition-all text-sm">
                                                <Send className="w-4 h-4" /> Join Telegram for Updates
                                            </button>
                                        </a>
                                    </div>
                                    {!item.applyLink && (
                                        <p className="text-green-100 text-xs mt-3">Official apply link will be available soon.</p>
                                    )}
                                </div>
                            </div>

                            {/* ── More Jobs ── */}
                            {items.filter(j => j._id !== id).length > 0 && (
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">More Jobs</h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Explore more opportunities</p>
                                    </div>
                                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {items.filter(j => j._id !== id).slice(0, 4).map((job, index) => {
                                            const colors = ['from-red-500 to-orange-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-pink-500'];
                                            return (
                                                <div
                                                    key={job._id}
                                                    onClick={() => handleCardClick(job._id)}
                                                    className="group flex items-start gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all cursor-pointer hover:border-purple-200 dark:hover:border-purple-800"
                                                >
                                                    {/* Thumbnail */}
                                                    <div className={`w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                        {job.imageUrl ? (
                                                            <img src={job.imageUrl} alt={job.company} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className={`w-full h-full bg-gradient-to-br ${colors[index % 4]} flex items-center justify-center`}>
                                                                <Briefcase className="w-5 h-5 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{job.title}</h3>
                                                        <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{job.company}</p>
                                                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                                            {job.location && <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{job.location}</span>}
                                                            {job.salary && <span className="font-medium">{job.salary}</span>}
                                                        </div>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="px-4 pb-4 text-center">
                                        <a href='/Job-Portal'>
                                            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm">
                                                Explore All Jobs <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── RIGHT SIDEBAR (4 cols) ── */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-6 space-y-4">
                                <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                    <div className="p-3 text-center">
                                        <p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Advertisement</p>
                                        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex flex-col items-center justify-center gap-2">
                                            <Star className="w-7 h-7 text-gray-300 dark:text-gray-600" />
                                            <p className="text-xs text-gray-400 dark:text-gray-600 font-medium">Ad Space 300×250</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                    <div className="p-3 text-center">
                                        <p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Advertisement</p>
                                        <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex flex-col items-center justify-center gap-2">
                                            <Star className="w-7 h-7 text-gray-300 dark:text-gray-600" />
                                            <p className="text-xs text-gray-400 dark:text-gray-600 font-medium">Ad Space 300×300</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                    <div className="p-3 text-center">
                                        <p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Advertisement</p>
                                        <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex flex-col items-center justify-center gap-2">
                                            <Star className="w-7 h-7 text-gray-300 dark:text-gray-600" />
                                            <p className="text-xs text-gray-400 dark:text-gray-600 font-medium">Ad Space 300×600</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />

            <div className="fixed top-20 left-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
            <div className="fixed top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
            <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0,0) scale(1); }
                    25% { transform: translate(20px,-50px) scale(1.1); }
                    50% { transform: translate(-20px,20px) scale(0.9); }
                    75% { transform: translate(50px,50px) scale(1.05); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </>
    );
};

export default JobDetail;