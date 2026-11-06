
import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { isJobRecent } from '../Common/jobDateHelpers';

// ── Gradients ──────────────────────────────────────────────────────────────
const GRADIENTS = [
    { gradient: 'from-emerald-600 to-green-700' },
    { gradient: 'from-emerald-600 to-cyan-600' },
    { gradient: 'from-blue-600 to-sky-500' },
    { gradient: 'from-blue-600 to-sky-600' },
    { gradient: 'from-teal-600 to-cyan-500' },
    { gradient: 'from-teal-600 to-cyan-700' },
];

const formatTimeAgo = (dateValue) => {
    if (!dateValue) return 'today';
    const postedAt = new Date(dateValue).getTime();
    if (!Number.isFinite(postedAt)) return 'recently';
    const hours = Math.max(0, Math.floor((Date.now() - postedAt) / 3600000));
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'yesterday';
    if (days < 7) return `${days} days ago`;
    return new Date(postedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

// ── Shimmer skeleton ───────────────────────────────────────────────────────
const ShimmerStyle = () => (
    <style>{`
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .shimmer-bar { position: relative; overflow: hidden; }
        .shimmer-bar::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
            animation: shimmer 1.6s infinite;
        }
        .dark .shimmer-bar::after {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }
    `}</style>
);

export const SkeletonJobCard = () => (
    <>
        <ShimmerStyle />
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
            <div className="relative bg-gray-200 dark:bg-gray-800 shimmer-bar" style={{ minHeight: '176px' }}>
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gray-300/50 dark:bg-gray-700/50" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gray-300/50 dark:bg-gray-700/50" />
                <div className="absolute bottom-3 left-3 w-20 h-7 rounded-full bg-gray-300 dark:bg-gray-700" />
                <div className="absolute top-3 right-3 w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>
            <div className="p-5 flex flex-col gap-3">
                <div className="h-3 w-2/5 rounded-full bg-gray-200 dark:bg-gray-700 shimmer-bar" />
                <div className="space-y-2">
                    <div className="h-5 w-4/5 rounded-lg bg-gray-200 dark:bg-gray-700 shimmer-bar" />
                    <div className="h-5 w-3/5 rounded-lg bg-gray-200 dark:bg-gray-700 shimmer-bar" />
                </div>
                <div className="space-y-1.5 pt-1">
                    <div className="h-3.5 w-full rounded bg-gray-100 dark:bg-gray-800 shimmer-bar" />
                    <div className="h-3.5 w-11/12 rounded bg-gray-100 dark:bg-gray-800 shimmer-bar" />
                </div>
                <div className="space-y-2 pt-1">
                    {[60, 45, 70].map((w, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 shimmer-bar" />
                            <div className="h-3.5 rounded bg-gray-100 dark:bg-gray-800 shimmer-bar" style={{ width: `${w}%` }} />
                        </div>
                    ))}
                </div>
                <div className="h-11 w-full rounded-xl bg-gray-200 dark:bg-gray-700 mt-1 shimmer-bar" />
            </div>
        </div>
    </>
);

export const SkeletonGrid = ({ count = 8 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {Array.from({ length: count }).map((_, i) => (
            <SkeletonJobCard key={i} />
        ))}
    </div>
);

// ── Main Jobcard ───────────────────────────────────────────────────────────
const Jobcard = ({ item, onClick, index }) => {
    const { gradient } = GRADIENTS[index % GRADIENTS.length];
    const isRecent = isJobRecent(item);
    const workMode = item.workMode || (/remote|work from home|wfh/i.test(item.location || '') ? 'Remote' : 'Onsite');
    const posted = formatTimeAgo(item.postedAt || item.createdAt);

    return (
        <article onClick={onClick} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onClick(); } }} role="link" tabIndex={0} className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-800">
            <div className={`relative min-h-[225px] overflow-hidden bg-gradient-to-br ${gradient} p-5 text-white`}>
                <div aria-hidden="true" className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.8) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                <div aria-hidden="true" className="absolute -right-5 -top-14 h-36 w-36 rounded-full border-[24px] border-white/10" />
                <div className="relative flex items-center gap-2">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg font-black text-blue-700 shadow">{(item.company || 'C').slice(0, 1).toUpperCase()}</span>
                    <span className="min-w-0 flex-1 truncate text-sm font-bold">{item.company}</span>
                    {isRecent && <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-orange-600">New</span>}
                </div>
                <p className="relative mt-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/85">We are hiring</p>
                <h2 className="relative mt-2 line-clamp-2 text-xl font-extrabold leading-snug text-white">{item.title}</h2>
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                    {[item.jobType, item.city || item.location, workMode].filter(Boolean).slice(0, 3).map((tag, tagIndex) => <span key={`${tag}-${tagIndex}`} className="rounded-full bg-black/20 px-2.5 py-1 text-[11px] font-semibold text-white">{tag}</span>)}
                </div>
            </div>

            <div className="flex min-h-[168px] flex-col p-5">
                <h3 className="line-clamp-2 text-lg font-extrabold text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">{item.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-gray-300"><MapPin className="h-4 w-4 shrink-0 text-blue-600" /><span className="truncate">{item.city || item.location || 'India'} · {workMode}</span></p>
                {item.experience && <p className="mt-1.5 text-sm text-slate-600 dark:text-gray-400">Experience: {item.experience}</p>}
                <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">Salary: {item.salary || item.salaryNote || 'Not disclosed'}</p>
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-gray-700 dark:text-gray-400">
                    <span>Posted {posted}</span>
                    <span className="font-bold text-blue-700 dark:text-blue-300">View details <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></span>
                </div>
            </div>
        </article>
    );
};

export default Jobcard;
