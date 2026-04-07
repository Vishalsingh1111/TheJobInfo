
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