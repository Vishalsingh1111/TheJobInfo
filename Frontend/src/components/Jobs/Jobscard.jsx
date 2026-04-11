

// // import React, { useState } from 'react';
// // import { ArrowUpRight, Briefcase, Sparkles, Zap, MapPin } from 'lucide-react';

// // const truncateText = (text, length) => {
// //     if (!text) return '';
// //     if (text.length <= length) return text;
// //     return text.slice(0, length) + '...';
// // };

// // const Jobcard = ({ item, onClick, index }) => {
// //     const [isHovered, setIsHovered] = useState(false);
// //     const [imgError, setImgError] = useState(false);

// //     const getGradientByIndex = (idx) => {
// //         const gradients = [
// //             { gradient: "from-red-500 to-orange-600", accent: "red-500", glow: "red-500/20" },
// //             { gradient: "from-green-500 to-emerald-600", accent: "green-500", glow: "green-500/20" },
// //             { gradient: "from-yellow-500 to-amber-600", accent: "yellow-500", glow: "yellow-500/20" },
// //             { gradient: "from-blue-500 to-cyan-600", accent: "blue-500", glow: "blue-500/20" },
// //             { gradient: "from-purple-600 to-pink-600", accent: "purple-600", glow: "purple-600/20" },
// //             { gradient: "from-orange-500 to-red-500", accent: "orange-500", glow: "orange-500/20" },
// //             { gradient: "from-teal-500 to-cyan-600", accent: "teal-500", glow: "teal-500/20" },
// //             { gradient: "from-indigo-600 to-purple-600", accent: "indigo-600", glow: "indigo-600/20" }
// //         ];
// //         return gradients[idx % 8];
// //     };

// //     const { gradient, glow } = getGradientByIndex(index);

// //     return (
// //         <div
// //             onClick={onClick}
// //             onMouseEnter={() => setIsHovered(true)}
// //             onMouseLeave={() => setIsHovered(false)}
// //             className="group cursor-pointer h-full"
// //         >
// //             <div className="relative h-full">
// //                 <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 h-full flex flex-col">

// //                     {/* Diagonal Gradient Accent */}
// //                     <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`}></div>

// //                     {/* Top Corner Badge */}
// //                     <div className="absolute top-4 right-4 z-10">
// //                         <div className={`bg-gradient-to-br ${gradient} text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
// //                             <Sparkles className="w-3 h-3" />
// //                             {item.jobType || 'Job'}
// //                         </div>
// //                     </div>

// //                     {/* Content Container */}
// //                     <div className="relative p-6 flex-1 flex flex-col">
// //                         {/* Icon / Image with Unique Position */}
// //                         <div className="mb-4 flex items-start justify-between">
// //                             <div className={`relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} p-0.5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
// //                                 <div className="w-full h-full bg-transparentrounded-2xl flex items-center justify-center">
// //                                     <Briefcase className="w-7 h-7 text-gray-100" strokeWidth={2} />
// //                                 </div>
// //                             </div>

// //                             {/* Job Number */}
// //                             <div className="text-right">
// //                                 <span className="text-xs font-semibold text-gray-400 dark:text-gray-600">Job</span>
// //                                 <p className={`text-2xl font-black bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
// //                                     #{String(index + 1).padStart(2, '0')}
// //                                 </p>
// //                             </div>
// //                         </div>

// //                         {/* Company Name */}
// //                         <p className={`text-xs font-bold uppercase tracking-wider mb-1 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
// //                             {item.company}
// //                         </p>

// //                         {/* Job Title */}
// //                         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all duration-300">
// //                             {item.title}
// //                         </h3>

// //                         {/* Location & Salary */}
// //                         <div className="flex flex-wrap items-center gap-3 mb-3">
// //                             {item.location && (
// //                                 <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
// //                                     <MapPin className="w-3 h-3" />
// //                                     {item.location}
// //                                 </span>
// //                             )}
// //                             {item.salary && (
// //                                 <span className={`text-xs font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
// //                                     {item.salary}
// //                                 </span>
// //                             )}
// //                         </div>

// //                         {/* Description */}
// //                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
// //                             {truncateText(item.description, 110)}
// //                         </p>

// //                         {/* Bottom Stats Bar */}
// //                         <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
// //                             <div className="flex items-center gap-3">
// //                                 <div className="flex items-center gap-1.5">
// //                                     <Zap className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" />
// //                                     <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
// //                                         {item.experience || 'Freshers'}
// //                                     </span>
// //                                 </div>
// //                                 {item.lastDate && (
// //                                     <div className="flex items-center gap-1.5">
// //                                         <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
// //                                             {item.lastDate}
// //                                         </span>
// //                                     </div>
// //                                 )}
// //                             </div>

// //                             {/* Arrow Button */}
// //                             <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
// //                                 <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={2.5} />
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Bottom Gradient Line */}
// //                     <div className={`h-1.5 bg-gradient-to-r ${gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
// //                 </div>

// //                 {/* Floating Shadow Effect */}
// //                 <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-3xl blur-xl -z-10 transform group-hover:scale-105 transition-all duration-500`}></div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Jobcard;

// import React, { useState } from 'react';
// import { ArrowUpRight, Briefcase, Sparkles, Zap, MapPin, Clock, IndianRupee, Users } from 'lucide-react';

// const truncateText = (text, length) => {
//     if (!text) return '';
//     if (text.length <= length) return text;
//     return text.slice(0, length) + '...';
// };

// const GRADIENTS = [
//     { gradient: "from-red-500 to-orange-600", light: "bg-red-50 dark:bg-red-900/20", border: "border-red-200 dark:border-red-800", text: "text-red-600 dark:text-red-400" },
//     { gradient: "from-green-500 to-emerald-600", light: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800", text: "text-green-600 dark:text-green-400" },
//     { gradient: "from-yellow-500 to-amber-600", light: "bg-yellow-50 dark:bg-yellow-900/20", border: "border-yellow-200 dark:border-yellow-800", text: "text-yellow-600 dark:text-yellow-500" },
//     { gradient: "from-blue-500 to-cyan-600", light: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-800", text: "text-blue-600 dark:text-blue-400" },
//     { gradient: "from-purple-600 to-pink-600", light: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-800", text: "text-purple-600 dark:text-purple-400" },
//     { gradient: "from-orange-500 to-red-500", light: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-800", text: "text-orange-600 dark:text-orange-400" },
//     { gradient: "from-teal-500 to-cyan-600", light: "bg-teal-50 dark:bg-teal-900/20", border: "border-teal-200 dark:border-teal-800", text: "text-teal-600 dark:text-teal-400" },
//     { gradient: "from-indigo-600 to-purple-600", light: "bg-indigo-50 dark:bg-indigo-900/20", border: "border-indigo-200 dark:border-indigo-800", text: "text-indigo-600 dark:text-indigo-400" },
// ];

// const Jobcard = ({ item, onClick, index }) => {
//     const { gradient, light, border, text } = GRADIENTS[index % GRADIENTS.length];

//     return (
//         <div
//             onClick={onClick}
//             className="group cursor-pointer h-full"
//         >
//             <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">

//                 {/* Subtle gradient accent top */}
//                 <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${gradient} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />

//                 {/* Top badge strip */}
//                 <div className={`h-1 bg-gradient-to-r ${gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

//                 <div className="p-5 flex flex-col flex-1">

//                     {/* Header row: icon + badge */}
//                     <div className="flex items-start justify-between mb-4">
//                         {/* Company logo / icon */}
//                         <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 overflow-hidden shadow-md`}>
//                             {item.imageUrl ? (
//                                 <img src={item.imageUrl} alt={item.company} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }} />
//                             ) : (
//                                 <Briefcase className="w-7 h-7 text-white" strokeWidth={2} />
//                             )}
//                         </div>

//                         {/* Job type badge */}
//                         {item.jobType && (
//                             <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${light} ${border} ${text}`}>
//                                 {item.jobType}
//                             </span>
//                         )}
//                     </div>

//                     {/* Company name — text-sm font-bold uppercase tracking-widest matching detail page SectionLabel */}
//                     <p className={`text-sm font-bold uppercase tracking-widest mb-1 bg-gradient-to-br ${gradient} bg-clip-text text-transparent truncate`}>
//                         {item.company}
//                     </p>

//                     {/* Job title — text-xl font-bold matching detail page */}
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
//                         {item.title}
//                     </h3>

//                     {/* Description — text-base font-medium matching detail page body */}
//                     <p className="text-base font-medium text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow leading-relaxed">
//                         {truncateText(item.description, 100) || 'Click to view full details and apply for this position.'}
//                     </p>

//                     {/* Chips row — text-base font-medium matching detail page chip style */}
//                     <div className="space-y-2 mb-4">
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

//                     {/* CTA button — text-base font-bold matching detail page */}
//                     <button className={`w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r ${gradient} text-white rounded-xl text-base font-bold shadow-sm group-hover:shadow-md group-hover:scale-[1.02] transition-all duration-300 mt-auto`}>
//                         View Details <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Jobcard;

import React from 'react';
import { ArrowUpRight, Briefcase, MapPin, Clock, IndianRupee, Users } from 'lucide-react';

const truncateText = (text, length) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
};

const GRADIENTS = [
    { gradient: "from-red-500 to-orange-600" },
    { gradient: "from-green-500 to-emerald-600" },
    { gradient: "from-yellow-500 to-amber-600" },
    { gradient: "from-blue-500 to-cyan-600" },
    { gradient: "from-purple-600 to-pink-600" },
    { gradient: "from-orange-500 to-red-500" },
    { gradient: "from-teal-500 to-cyan-600" },
    { gradient: "from-indigo-600 to-purple-600" },
];

// ─── Shimmer keyframe injected once ───────────────────────────────────────
const ShimmerStyle = () => (
    <style>{`
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .shimmer-bar {
            position: relative;
            overflow: hidden;
        }
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

// ─── Single Skeleton Card ─────────────────────────────────────────────────
export const SkeletonJobCard = () => (
    <>
        <ShimmerStyle />
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
            {/* Top image panel */}
            <div className="relative bg-gray-200 dark:bg-gray-800 shimmer-bar" style={{ minHeight: '176px' }}>
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gray-300/50 dark:bg-gray-700/50" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gray-300/50 dark:bg-gray-700/50" />
                <div className="absolute bottom-3 left-3 w-20 h-7 rounded-full bg-gray-300 dark:bg-gray-700" />
                <div className="absolute top-3 right-3 w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>

            <div className="p-5 flex flex-col gap-3">
                {/* Company */}
                <div className="h-3 w-2/5 rounded-full bg-gray-200 dark:bg-gray-700 shimmer-bar" />
                {/* Title */}
                <div className="space-y-2">
                    <div className="h-5 w-4/5 rounded-lg bg-gray-200 dark:bg-gray-700 shimmer-bar" />
                    <div className="h-5 w-3/5 rounded-lg bg-gray-200 dark:bg-gray-700 shimmer-bar" />
                </div>
                {/* Description */}
                <div className="space-y-1.5 pt-1">
                    <div className="h-3.5 w-full rounded bg-gray-100 dark:bg-gray-800 shimmer-bar" />
                    <div className="h-3.5 w-11/12 rounded bg-gray-100 dark:bg-gray-800 shimmer-bar" />
                </div>
                {/* Chips */}
                <div className="space-y-2 pt-1">
                    {[60, 45, 70].map((w, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 shimmer-bar" />
                            <div className={`h-3.5 rounded bg-gray-100 dark:bg-gray-800 shimmer-bar`} style={{ width: `${w}%` }} />
                        </div>
                    ))}
                </div>
                {/* Button */}
                <div className="h-11 w-full rounded-xl bg-gray-200 dark:bg-gray-700 mt-1 shimmer-bar" />
            </div>
        </div>
    </>
);

// ─── Skeleton Grid ────────────────────────────────────────────────────────
export const SkeletonGrid = ({ count = 8 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
        {Array.from({ length: count }).map((_, i) => (
            <SkeletonJobCard key={i} />
        ))}
    </div>
);

// ─── Main Job Card ────────────────────────────────────────────────────────
const Jobcard = ({ item, onClick, index }) => {
    const { gradient } = GRADIENTS[index % GRADIENTS.length];

    return (
        <div onClick={onClick} className="group cursor-pointer h-full">
            <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1 flex flex-col">

                {/* ── TOP: Full-width image panel ── */}
                <div
                    className={`relative bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden flex-shrink-0`}
                    style={{ minHeight: '176px' }}
                >
                    {/* Decorative circles (show behind image) */}
                    <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/15 pointer-events-none" />

                    {/* Job image fills entire panel — exact same approach as JobsHeroSection */}
                    {item.imageUrl ? (
                        <img
                            src={item.imageUrl}
                            alt={item.company}
                            className="w-full h-full object-cover absolute inset-0"
                            onError={e => { e.target.style.display = 'none'; }}
                        />
                    ) : (
                        <div className="relative z-10 flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Briefcase className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-white/90 text-base font-bold drop-shadow px-4 text-center line-clamp-1">{item.company}</p>
                        </div>
                    )}

                    {/* Hot badge — top-right */}
                    <div className="absolute top-3 right-3 z-10">
                        <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 bg-orange-500 text-white rounded-full shadow-lg">
                            🔥 Hot
                        </span>
                    </div>
                </div>

                {/* ── BOTTOM: Content ── */}
                <div className="p-5 flex flex-col flex-1">


                    <div className='flex flex-cols space-between items-center justify-between'>
                        {/* Company — text-sm font-bold uppercase tracking-widest */}
                        <p className={`text-sm font-bold uppercase tracking-widest bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-1 truncate`}>
                            {item.company}
                        </p>


                        {/* Job type badge — bottom-left */}
                        {item.jobType && (
                            <div>
                                <span className="text-sm font-semibold text-green-500 border px-2 py-0.5 rounded-full bg-blur bg-white/30 backdrop-blur-sm">
                                    {item.jobType}
                                </span>
                            </div>
                        )}

                    </div>

                    {/* Title — text-xl font-bold */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {item.title}
                    </h3>

                    {/* Description — text-base font-medium */}
                    <p className="text-base font-medium text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1 leading-relaxed">
                        {truncateText(item.description, 100) || 'Click to view full details and apply for this position.'}
                    </p>

                    {/* Meta chips */}
                    <div className="space-y-2 mb-4">
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

                    {/* CTA */}
                    <button className={`w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r ${gradient} text-white rounded-xl text-base font-bold shadow-sm group-hover:shadow-md group-hover:scale-[1.02] transition-all duration-300`}>
                        View Details <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Jobcard;