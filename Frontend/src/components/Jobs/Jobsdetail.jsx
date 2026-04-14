
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Breadcrumb from '../Common/Breadcrumb';
import { baseUrl } from '../../Baseurl';

import {
    MapPin, Briefcase, IndianRupee, Clock, CheckCircle2,
    ChevronRight, ExternalLink, ArrowRight, Users,
    Zap, AlertCircle, Send, MessageCircle
} from 'lucide-react';

const TELEGRAM_LINK = 'https://t.me/dcoder75';
const INSTAGRAM_LINK = 'https://www.instagram.com/dcoder75/';
const WHATSAPP_WFH_LINK = 'https://t.me/dcoder75';
const WHATSAPP_GOVT_LINK = 'https://t.me/dcoder75';

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

    // ── Skeleton ──────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <>
                <Navbar />
                <Breadcrumb />
                <div className="min-h-screen bg-white dark:bg-gray-950">
                    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8 space-y-4">
                            <div className="animate-pulse border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
                                <div className="flex gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-xl bg-gray-200 dark:bg-gray-800 flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
                                        <div className="flex gap-2">
                                            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-24" />
                                            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-20" />
                                            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-28" />
                                        </div>
                                    </div>
                                </div>
                                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-xl w-36" />
                            </div>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="animate-pulse border border-gray-100 dark:border-gray-800 rounded-2xl p-6 space-y-3">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                                    <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
                                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
                                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                                </div>
                            ))}
                        </div>
                        <div className="lg:col-span-4 space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="animate-pulse border border-gray-100 dark:border-gray-800 rounded-2xl p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                                    <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl" />
                                    <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl" />
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
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-gray-500 text-xl">Job not found.</p>
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

    const otherJobs = items.filter(j => j._id !== id);
    const midJobs1 = otherJobs.slice(0, 3);
    const midJobs2 = otherJobs.slice(3, 7);

    // ── Sub-components ────────────────────────────────────────────────────────

    const SectionLabel = ({ text }) => (
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
            {text}
        </p>
    );

    const SectionTitle = ({ text }) => (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 mt-2 leading-snug">{text}</h2>
    );

    const Divider = () => (
        <hr className="border-t border-gray-200 dark:border-gray-700 my-10" />
    );

    const InlineJobsBlock = ({ jobs, title }) => {
        if (!jobs || jobs.length === 0) return null;
        const colors = ['from-red-500 to-orange-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-pink-500'];
        return (
            <div className="my-8 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">{title}</p>
                <div className="space-y-3">
                    {jobs.map((job, idx) => (
                        <div
                            key={job._id}
                            onClick={() => handleCardClick(job._id)}
                            className="flex items-center gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden">
                                {job.imageUrl ? (
                                    <img src={job.imageUrl} alt={job.company} className="w-full h-full object-cover" />
                                ) : (
                                    <div className={`w-full h-full bg-gradient-to-br ${colors[idx % 4]} flex items-center justify-center`}>
                                        <Briefcase className="w-5 h-5 text-white" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-base font-bold text-gray-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{job.title}</p>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate mt-0.5">
                                    {job.company}{job.location ? ` · ${job.location}` : ''}{job.salary ? ` · ${job.salary}` : ''}
                                </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white dark:bg-gray-950">
                <Breadcrumb />

                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* ══ MAIN COLUMN ══ */}
                        <div className="lg:col-span-8">

                            {/* ── Hero Card ── */}
                            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-7 mb-7 bg-white dark:bg-gray-900">
                                <div className="flex items-start gap-5 mb-5">
                                    {/* Logo */}
                                    <div className="w-16 h-16 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-gray-800">
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
                                        <div className={`w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 items-center justify-center ${item.imageUrl ? 'hidden' : 'flex'}`}>
                                            <Briefcase className="w-7 h-7 text-white" />
                                        </div>
                                    </div>

                                    {/* Title info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                                                {item.jobType || 'Off Campus Drive'}
                                            </span>
                                            {item.category && (
                                                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                                                    {item.category}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                                                Active
                                            </span>
                                        </div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug">{item.title}</h1>
                                        <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-1.5">{item.company}</p>
                                    </div>
                                </div>

                                {/* Chips */}
                                <div className="flex flex-wrap gap-3">
                                    {item.location && (
                                        <span className="flex items-center gap-2 text-base px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                                            <MapPin className="w-4 h-4 text-red-500" /> {item.location}
                                        </span>
                                    )}
                                    {item.salary && (
                                        <span className="flex items-center gap-2 text-base px-4 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-400 font-bold">
                                            <IndianRupee className="w-4 h-4" /> {item.salary}
                                        </span>
                                    )}
                                    {item.experience && (
                                        <span className="flex items-center gap-2 text-base px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                                            <Users className="w-4 h-4 text-blue-500" /> {item.experience}
                                        </span>
                                    )}
                                    {item.lastDate && (
                                        <span className="flex items-center gap-2 text-base px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 font-bold">
                                            <Clock className="w-4 h-4" /> Apply by: {item.lastDate}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Optional image banner */}
                            {item.imageUrl && (
                                <div className="mb-7 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                    <img src={item.imageUrl} alt={`${item.company} – ${item.title}`} className="w-full h-auto object-contain" />
                                </div>
                            )}

                            {/* ── Main content card ── */}
                            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-8 md:p-10 bg-white dark:bg-gray-900">

                                {/* 1. About Company */}
                                {item.aboutCompany && (
                                    <>
                                        <div>
                                            <SectionLabel text="About the company" />
                                            <SectionTitle text={`About ${item.company}`} />
                                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{item.aboutCompany}</p>
                                        </div>
                                        <Divider />
                                    </>
                                )}

                                {/* 2. Job Overview table */}
                                <div>
                                    <SectionLabel text="Job overview" />
                                    <SectionTitle text="Job Details Table" />
                                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                {[
                                                    { label: 'Company', value: item.company },
                                                    { label: 'Role', value: item.title },
                                                    { label: 'Salary', value: item.salary },
                                                    { label: 'Location', value: item.location },
                                                    { label: 'Job type', value: item.jobType },
                                                    { label: 'Experience', value: item.experience },
                                                    { label: 'Last date', value: item.lastDate },
                                                ].filter(r => r.value).map((row, i) => (
                                                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                                        <td className="px-5 py-4 text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 w-40 uppercase tracking-wide">{row.label}</td>
                                                        <td className="px-5 py-4 text-base font-medium text-gray-800 dark:text-gray-200">
                                                            {row.label === 'Website' ? (
                                                                <a href={`https://${row.value}`} target="_blank" rel="noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline font-semibold">{row.value}</a>
                                                            ) : row.label === 'Salary' ? (
                                                                <span className="font-bold text-green-700 dark:text-green-400">{row.value}</span>
                                                            ) : row.label === 'Job type' ? (
                                                                <span className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-bold">{row.value}</span>
                                                            ) : row.label === 'Last date' ? (
                                                                <span className="text-red-600 dark:text-red-400 font-bold">{row.value}</span>
                                                            ) : row.value}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {item.salaryNote && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 flex items-start gap-2 leading-relaxed">
                                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" />
                                            {item.salaryNote}
                                        </p>
                                    )}
                                </div>

                                <Divider />

                                {/* 3. Role & Responsibilities */}
                                {(item.description || responsibilities.length > 0) && (
                                    <>
                                        <div>
                                            <SectionLabel text="Role & responsibilities" />
                                            {item.description && (
                                                <>
                                                    <SectionTitle text={`What does a ${item.title} at ${item.company} do?`} />
                                                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{item.description}</p>
                                                </>
                                            )}
                                            {responsibilities.length > 0 && (
                                                <>
                                                    <SectionTitle text="Key Responsibilities" />
                                                    <ul className="space-y-4">
                                                        {responsibilities.map((r, i) => (
                                                            <li key={i} className="flex items-start gap-4">
                                                                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                    <ChevronRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                                                                </div>
                                                                <span className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{r}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}
                                        </div>
                                        <Divider />
                                    </>
                                )}

                                {/* ── Inline jobs block 1 ── */}
                                {midJobs1.length > 0 && (
                                    <div><InlineJobsBlock jobs={midJobs1} title="More jobs you might like" /></div>
                                )}

                                {/* 4. Eligibility & Skills */}
                                {(requirements.length > 0 || requiredSkills.length > 0) && (
                                    <>
                                        <div>
                                            <SectionLabel text="Eligibility & skills" />
                                            {requirements.length > 0 && (
                                                <>
                                                    <SectionTitle text="Eligibility Criteria" />
                                                    <ul className="space-y-4 mb-8">
                                                        {requirements.map((r, i) => (
                                                            <li key={i} className="flex items-start gap-4">
                                                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                    <ChevronRight className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                                                </div>
                                                                <span className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{r}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}
                                            {requiredSkills.length > 0 && (
                                                <>
                                                    <SectionTitle text="Required Skills" />
                                                    <div className="flex flex-wrap gap-3">
                                                        {requiredSkills.map((skill, i) => (
                                                            <span key={i} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-base font-semibold">
                                                                <Zap className="w-4 h-4 text-yellow-500" /> {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <Divider />
                                    </>
                                )}

                                {/* 5. Who Should Apply */}
                                {applyIf.length > 0 && (
                                    <>
                                        <div>
                                            <SectionLabel text="Who should apply?" />
                                            <SectionTitle text="Apply If You —" />
                                            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-6">
                                                <ul className="space-y-4">
                                                    {applyIf.map((point, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                                            <span className="text-lg text-green-900 dark:text-green-300 leading-relaxed font-medium">{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <Divider />
                                    </>
                                )}

                                {/* 6. Selection Process */}
                                {selectionProcess.length > 0 && (
                                    <>
                                        <div>
                                            <SectionLabel text="Selection process" />
                                            <SectionTitle text="Recruitment Rounds" />
                                            <ol className="space-y-4">
                                                {selectionProcess.map((step, i) => (
                                                    <li key={i} className="flex items-center gap-4">
                                                        <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-orange-700 dark:text-orange-400 font-bold text-base flex-shrink-0">
                                                            {i + 1}
                                                        </div>
                                                        <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">{step}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4 italic">* Rounds may vary based on team and location</p>
                                        </div>
                                        <Divider />
                                    </>
                                )}

                                {/* ── Inline jobs block 2 ── */}
                                {midJobs2.length > 0 && (
                                    <InlineJobsBlock jobs={midJobs2} title="More off campus drives" />
                                )}

                                {/* 7. Benefits */}
                                {benefits.length > 0 && (
                                    <>
                                        <div>
                                            <SectionLabel text="Why join" />
                                            <SectionTitle text={`Benefits at ${item.company}`} />
                                            <ul className="space-y-4">
                                                {benefits.map((b, i) => (
                                                    <li key={i} className="flex items-start gap-4">
                                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                                        <span className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Divider />
                                    </>
                                )}

                                {/* 8. How to Apply */}
                                {applySteps.length > 0 && (
                                    <>
                                        <div>
                                            <SectionLabel text="How to apply" />
                                            <SectionTitle text="Steps to Apply" />
                                            <ol className="space-y-4">
                                                {applySteps.map((step, i) => (
                                                    <li key={i} className="flex items-start gap-4">
                                                        <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-400 text-sm font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                                                        <span className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{step}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </>
                                )}

                                <Divider />

                                {/* ── Links table + Disclaimer ── */}
                                <div>
                                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-7">
                                        <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                                    <td className="px-6 py-5 text-base font-bold text-gray-800 dark:text-gray-200 w-2/3">
                                                        Apply Link for {item.company} {item.jobType || 'Off Campus'}
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        {item.applyLink ? (
                                                            <a href={item.applyLink} target="_blank" rel="noreferrer" className="text-base font-bold text-red-600 hover:text-red-700 hover:underline transition-colors">
                                                                Click here to Apply
                                                            </a>
                                                        ) : (
                                                            <span className="text-base text-gray-400">Link coming soon</span>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                                    <td className="px-6 py-5 text-base font-bold text-gray-800 dark:text-gray-200">
                                                        Join our Work from Home Community
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <a href={WHATSAPP_WFH_LINK} target="_blank" rel="noreferrer" className="text-base font-bold text-red-600 hover:text-red-700 hover:underline transition-colors">
                                                            Click here
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                                    <td className="px-6 py-5 text-base font-bold text-gray-800 dark:text-gray-200">
                                                        Join our Group For Government Job
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <a href={WHATSAPP_GOVT_LINK} target="_blank" rel="noreferrer" className="text-base font-bold text-red-600 hover:text-red-700 hover:underline transition-colors">
                                                            Click here
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Disclaimer */}
                                    <div className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                        <span className="font-bold text-gray-900 dark:text-gray-100">Disclaimer</span>: The recruitment information provided is for informational purposes only. It has been obtained from the official website of the organization, and we have no affiliation with the company. We do not provide any recruitment guarantees. The hiring process is to be conducted according to the official recruitment procedures of the company. There is no fee charged for providing this job information. For more details, please visit the{' '}
                                        <a href="/privacy-policy" className="text-red-500 hover:underline font-semibold">Privacy Policy</a> page.
                                    </div>
                                </div>

                            </div>{/* end white card */}

                            {/* ── More Jobs grid at bottom ── */}
                            {otherJobs.length > 0 && (
                                <div className="mt-7 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
                                    <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">More Jobs</h2>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">Explore more opportunities</p>
                                        </div>
                                        <a href="/Job-Portal" className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                                            View all <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {otherJobs.slice(0, 4).map((job, index) => {
                                            const colors = ['from-red-500 to-orange-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-pink-500'];
                                            return (
                                                <div
                                                    key={job._id}
                                                    onClick={() => handleCardClick(job._id)}
                                                    className="group flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800 hover:shadow-sm transition-all cursor-pointer"
                                                >
                                                    <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                                                        {job.imageUrl ? (
                                                            <img src={job.imageUrl} alt={job.company} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className={`w-full h-full bg-gradient-to-br ${colors[index % 4]} flex items-center justify-center`}>
                                                                <Briefcase className="w-5 h-5 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-base font-bold text-gray-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{job.title}</h3>
                                                        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-0.5">{job.company}</p>
                                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                                                            {job.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>}
                                                            {job.salary && <span>{job.salary}</span>}
                                                        </div>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-purple-500 transition-all flex-shrink-0 mt-1" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                        </div>{/* end main col */}

                        {/* ══ SIDEBAR ══ */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-6 space-y-5">

                                {/* Telegram & Instagram */}
                                <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
                                    <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                                        <p className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Stay updated</p>
                                    </div>
                                    <div className="p-5 space-y-4">
                                        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                            Get the latest job alerts, resume tips, and off-campus drives delivered straight to you.
                                        </p>
                                        <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl text-base font-bold transition-all">
                                            <Send className="w-4 h-4" /> Join on Telegram
                                        </a>
                                        <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl text-base font-bold transition-all">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                            </svg>
                                            Follow on Instagram
                                        </a>
                                    </div>
                                </div>

                                {/* Latest Jobs sidebar list */}
                                {otherJobs.length > 0 && (
                                    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
                                        <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                                            <p className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Latest job openings</p>
                                        </div>
                                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {otherJobs.slice(0, 6).map((job) => (
                                                <div
                                                    key={job._id}
                                                    onClick={() => handleCardClick(job._id)}
                                                    className="flex items-start gap-3 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                                                >
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-300 border-2 border-green-500 flex-shrink-0 mt-2" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-base font-bold text-gray-800 dark:text-gray-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{job.title}</p>
                                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-500 truncate mt-0.5">
                                                            {job.company}{job.location ? ` · ${job.location}` : ''}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800">
                                            <a href="/Job-Portal" className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                                                See all openings <ArrowRight className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Second Telegram CTA */}
                                <div className="p-5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl">
                                    <p className="text-base font-medium text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        Get daily job alerts on Telegram — 10,000+ students already joined.
                                    </p>
                                    <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl text-base font-bold transition-all">
                                        <Send className="w-4 h-4" /> Join free
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