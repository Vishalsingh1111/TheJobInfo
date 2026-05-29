// import React from 'react';
// import { Briefcase, MapPin, Clock, IndianRupee, Users } from 'lucide-react';

// const truncateText = (text, length) => {
//     if (!text) return '';
//     if (text.length <= length) return text;
//     return text.slice(0, length) + '...';
// };

// // ── Palette helper ─────────────────────────────────────────────────────────
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


// const AutoJobImageCompact = ({ title, company, location }) => {
//     const GRADIENTS = [
//         'from-violet-500 to-purple-600',
//         'from-rose-500 to-pink-600',
//         'from-sky-500 to-blue-600',
//         'from-emerald-500 to-teal-600',
//         'from-orange-500 to-amber-600',
//         'from-fuchsia-500 to-pink-600',
//         'from-blue-500 to-cyan-600',
//         'from-green-500 to-emerald-600',
//     ];

//     const hash = [...(company || 'X')].reduce((a, c) => a + c.charCodeAt(0), 0);
//     const gradient = GRADIENTS[hash % GRADIENTS.length];

//     return (
//         <div
//             className={`w-full h-full flex flex-col items-center justify-center py-4 px-4 text-center bg-gradient-to-br ${gradient}`}
//         >
//             <p className="text-sm font-bold uppercase tracking-wide mb-1 leading-tight text-white/70">
//                 {company?.length > 20 ? company.slice(0, 20) + '…' : company}
//             </p>
//             <p className="text-2xl font-bold leading-tight mb-1.5 line-clamp-2 text-white">
//                 {title?.length > 32 ? title.slice(0, 32) + '…' : title}
//             </p>
//             {location && (
//                 <span className="text-md font-medium flex items-center gap-1 text-white/80">
//                     <MapPin className="w-3 h-3" />
//                     {location?.length > 12 ? location.slice(0, 12) + '…' : location}
//                 </span>
//             )}
//             <span className="mt-2 text-md font-semibold text-white/40">
//                 TheJobInfo
//             </span>
//         </div>
//     );
// };

// // ── Gradients ──────────────────────────────────────────────────────────────
// const GRADIENTS = [
//     { gradient: 'from-red-500 to-orange-600' },
//     { gradient: 'from-green-500 to-emerald-600' },
//     { gradient: 'from-yellow-500 to-amber-600' },
//     { gradient: 'from-blue-500 to-cyan-600' },
//     { gradient: 'from-purple-600 to-pink-600' },
//     { gradient: 'from-orange-500 to-red-500' },
//     { gradient: 'from-teal-500 to-cyan-600' },
//     { gradient: 'from-indigo-600 to-purple-600' },
// ];

// // ── Shimmer skeleton ───────────────────────────────────────────────────────
// const ShimmerStyle = () => (
//     <style>{`
//         @keyframes shimmer {
//             0% { transform: translateX(-100%); }
//             100% { transform: translateX(100%); }
//         }
//         .shimmer-bar { position: relative; overflow: hidden; }
//         .shimmer-bar::after {
//             content: '';
//             position: absolute;
//             inset: 0;
//             background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
//             animation: shimmer 1.6s infinite;
//         }
//         .dark .shimmer-bar::after {
//             background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
//         }
//     `}</style>
// );

// export const SkeletonJobCard = () => (
//     <>
//         <ShimmerStyle />
//         <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
//             <div className="relative bg-gray-200 dark:bg-gray-800 shimmer-bar" style={{ minHeight: '176px' }}>
//                 <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gray-300/50 dark:bg-gray-700/50" />
//                 <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gray-300/50 dark:bg-gray-700/50" />
//                 <div className="absolute bottom-3 left-3 w-20 h-7 rounded-full bg-gray-300 dark:bg-gray-700" />
//                 <div className="absolute top-3 right-3 w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-700" />
//             </div>
//             <div className="p-5 flex flex-col gap-3">
//                 <div className="h-3 w-2/5 rounded-full bg-gray-200 dark:bg-gray-700 shimmer-bar" />
//                 <div className="space-y-2">
//                     <div className="h-5 w-4/5 rounded-lg bg-gray-200 dark:bg-gray-700 shimmer-bar" />
//                     <div className="h-5 w-3/5 rounded-lg bg-gray-200 dark:bg-gray-700 shimmer-bar" />
//                 </div>
//                 <div className="space-y-1.5 pt-1">
//                     <div className="h-3.5 w-full rounded bg-gray-100 dark:bg-gray-800 shimmer-bar" />
//                     <div className="h-3.5 w-11/12 rounded bg-gray-100 dark:bg-gray-800 shimmer-bar" />
//                 </div>
//                 <div className="space-y-2 pt-1">
//                     {[60, 45, 70].map((w, i) => (
//                         <div key={i} className="flex items-center gap-2">
//                             <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 shimmer-bar" />
//                             <div className="h-3.5 rounded bg-gray-100 dark:bg-gray-800 shimmer-bar" style={{ width: `${w}%` }} />
//                         </div>
//                     ))}
//                 </div>
//                 <div className="h-11 w-full rounded-xl bg-gray-200 dark:bg-gray-700 mt-1 shimmer-bar" />
//             </div>
//         </div>
//     </>
// );

// export const SkeletonGrid = ({ count = 8 }) => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mb-8">
//         {Array.from({ length: count }).map((_, i) => (
//             <SkeletonJobCard key={i} />
//         ))}
//     </div>
// );

// // ── Main Jobcard ───────────────────────────────────────────────────────────
// const Jobcard = ({ item, onClick, index }) => {
//     const { gradient } = GRADIENTS[index % GRADIENTS.length];

//     return (
//         <div onClick={onClick} className="group cursor-pointer h-full">
//             <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1 flex flex-col">

//                 {/* ── TOP: image panel ── */}
//                 <div
//                     className="relative flex items-center justify-center overflow-hidden flex-shrink-0 border-b border-gray-200 dark:border-gray-700"
//                     style={{ minHeight: '176px' }}
//                 >
//                     {item.imageUrl ? (
//                         <>
//                             {/* gradient bg shows through if image is transparent */}
//                             <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
//                             <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
//                             <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
//                             <img
//                                 src={item.imageUrl}
//                                 alt={item.company}
//                                 className="w-full h-full object-cover absolute inset-0"
//                                 onError={e => { e.target.style.display = 'none'; }}
//                             />
//                         </>
//                     ) : (
//                         /* ── Auto-generated branded image ── */
//                         <AutoJobImageCompact
//                             title={item.title}
//                             company={item.company}
//                             location={item.location}
//                         />
//                     )}

//                     {/* Hot badge */}
//                     <div className="absolute top-3 right-3 z-10">
//                         <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 bg-orange-500 text-white rounded-full shadow-lg">
//                             🔥 Hot
//                         </span>
//                     </div>
//                 </div>

//                 {/* ── BOTTOM: content ── */}
//                 <div className="p-5 flex flex-col flex-1">
//                     <div className="flex items-center justify-between mb-1">
//                         <p className={`text-sm font-bold uppercase tracking-widest bg-gradient-to-r ${gradient} bg-clip-text text-transparent truncate`}>
//                             {item.company}
//                         </p>
//                         {item.jobType && (
//                             <span className="text-sm font-semibold text-green-500 border border-green-200 dark:border-green-800 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
//                                 {item.jobType}
//                             </span>
//                         )}
//                     </div>

//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
//                         {item.title}
//                     </h3>

//                     <p className="text-base font-medium text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 flex-1 leading-relaxed">
//                         {truncateText(item.description, 100) || 'Click to view full details and apply for this position.'}
//                     </p>

//                     <div className="space-y-1 mb-4">
//                         {item.location && (
//                             <div className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
//                                 <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
//                                 <span className="truncate">{item.location}</span>
//                             </div>
//                         )}
//                         {item.salary && (
//                             <div className="flex items-center gap-2 text-base font-bold text-green-700 dark:text-green-400">
//                                 <IndianRupee className="w-4 h-4 flex-shrink-0" />
//                                 <span>{item.salary}</span>
//                             </div>
//                         )}
//                         {item.experience && (
//                             <div className="flex items-center gap-2 text-base font-medium text-blue-600 dark:text-blue-400">
//                                 <Users className="w-4 h-4 flex-shrink-0" />
//                                 <span>{item.experience}</span>
//                             </div>
//                         )}
//                         {item.lastDate && (
//                             <div className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
//                                 <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
//                                 <span>Apply by <span className="text-red-600 dark:text-red-400 font-bold">{item.lastDate}</span></span>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Jobcard;


import React from 'react';
import { Briefcase, MapPin, Clock, IndianRupee, Users, Calendar } from 'lucide-react';

const truncateText = (text, length) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
};

// ── Date formatter ─────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

// ── Gradients ──────────────────────────────────────────────────────────────
const GRADIENTS = [
    { gradient: 'from-red-500 to-orange-600' },
    { gradient: 'from-green-500 to-emerald-600' },
    { gradient: 'from-yellow-500 to-amber-600' },
    { gradient: 'from-blue-500 to-cyan-600' },
    { gradient: 'from-purple-600 to-pink-600' },
    { gradient: 'from-orange-500 to-red-500' },
    { gradient: 'from-teal-500 to-cyan-600' },
    { gradient: 'from-indigo-600 to-purple-600' },
];

// ── Auto generated image when no imageUrl ─────────────────────────────────
const AutoJobImageCompact = ({ title, company, location }) => {
    const CARD_GRADIENTS = [
        'from-violet-500 to-purple-600',
        'from-rose-500 to-pink-600',
        'from-sky-500 to-blue-600',
        'from-emerald-500 to-teal-600',
        'from-orange-500 to-amber-600',
        'from-fuchsia-500 to-pink-600',
        'from-blue-500 to-cyan-600',
        'from-green-500 to-emerald-600',
    ];

    const hash = [...(company || 'X')].reduce((a, c) => a + c.charCodeAt(0), 0);
    const gradient = CARD_GRADIENTS[hash % CARD_GRADIENTS.length];

    return (
        <div
            className={`w-full h-full flex flex-col items-center justify-center py-4 px-4 text-center bg-gradient-to-br ${gradient}`}
        >
            <p className="text-sm font-bold uppercase tracking-wide mb-1 leading-tight text-white/70">
                {company?.length > 20 ? company.slice(0, 20) + '…' : company}
            </p>
            <p className="text-2xl font-bold leading-tight mb-1.5 line-clamp-2 text-white">
                {title?.length > 32 ? title.slice(0, 32) + '…' : title}
            </p>
            {location && (
                <span className="text-md font-medium flex items-center gap-1 text-white/80">
                    <MapPin className="w-3 h-3" />
                    {location?.length > 12 ? location.slice(0, 12) + '…' : location}
                </span>
            )}
            <span className="mt-2 text-md font-semibold text-white/40">
                TheJobInfo
            </span>
        </div>
    );
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mb-8">
        {Array.from({ length: count }).map((_, i) => (
            <SkeletonJobCard key={i} />
        ))}
    </div>
);

// ── Main Jobcard ───────────────────────────────────────────────────────────
const Jobcard = ({ item, onClick, index }) => {
    const { gradient } = GRADIENTS[index % GRADIENTS.length];

    return (
        <div onClick={onClick} className="group cursor-pointer h-full">
            <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1 flex flex-col">

                {/* ── TOP: image panel ── */}
                <div
                    className="relative flex items-center justify-center overflow-hidden flex-shrink-0 border-b border-gray-200 dark:border-gray-700"
                    style={{ minHeight: '176px' }}
                >
                    {item.imageUrl ? (
                        <>
                            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
                            <img
                                src={item.imageUrl}
                                alt={item.company}
                                className="w-full h-full object-cover absolute inset-0"
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                        </>
                    ) : (
                        <AutoJobImageCompact
                            title={item.title}
                            company={item.company}
                            location={item.location}
                        />
                    )}

                    {/* Hot badge */}
                    <div className="absolute top-3 right-3 z-10">
                        <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 bg-orange-500 text-white rounded-full shadow-lg">
                            🔥 Hot
                        </span>
                    </div>

                    {/* Posted date badge — bottom left of image */}
                    {item.createdAt && (
                        <div className="absolute bottom-3 left-3 z-10">
                            <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full">
                                <Calendar className="w-3 h-3" />
                                {formatDate(item.createdAt)}
                            </span>
                        </div>
                    )}
                </div>

                {/* ── BOTTOM: content ── */}
                <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-bold uppercase tracking-widest bg-gradient-to-r ${gradient} bg-clip-text text-transparent truncate`}>
                            {item.company}
                        </p>
                        {item.jobType && (
                            <span className="text-sm font-semibold text-green-500 border border-green-200 dark:border-green-800 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                                {item.jobType}
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {item.title}
                    </h3>

                    <p className="text-base font-medium text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 flex-1 leading-relaxed">
                        {truncateText(item.description, 100) || 'Click to view full details and apply for this position.'}
                    </p>

                    <div className="space-y-1 mb-4">
                        {item.location && (
                            <div className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                                <span className="truncate">{item.location}</span>
                            </div>
                        )}
                        {item.salary && (
                            <div className="flex items-center gap-2 text-base font-bold text-green-700 dark:text-green-400">
                                <IndianRupee className="w-4 h-4 flex-shrink-0" />
                                <span>{item.salary}</span>
                            </div>
                        )}
                        {item.experience && (
                            <div className="flex items-center gap-2 text-base font-medium text-blue-600 dark:text-blue-400">
                                <Users className="w-4 h-4 flex-shrink-0" />
                                <span>{item.experience}</span>
                            </div>
                        )}
                        {item.lastDate && (
                            <div className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                                <span>Apply by <span className="text-red-600 dark:text-red-400 font-bold">{item.lastDate}</span></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobcard;