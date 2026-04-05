

// // import React, { useState } from 'react';
// // import { ArrowUpRight, Code2, Sparkles, Zap, TrendingUp } from 'lucide-react';

// // const truncateText = (text, length) => {
// //     if (text.length <= length) return text;
// //     return text.slice(0, length) + '...';
// // };

// // const Blogcard = ({ item, onClick, index }) => {
// //     const [isHovered, setIsHovered] = useState(false);

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

// //     const { gradient, accent, glow } = getGradientByIndex(index);

// //     return (
// //         <div
// //             onClick={onClick}
// //             onMouseEnter={() => setIsHovered(true)}
// //             onMouseLeave={() => setIsHovered(false)}
// //             className="group cursor-pointer h-full"
// //         >
// //             {/* Asymmetric Card Design */}
// //             <div className="relative h-full">
// //                 {/* Main Card */}
// //                 <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 h-full flex flex-col">

// //                     {/* Diagonal Gradient Accent */}
// //                     <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`}></div>

// //                     {/* Top Corner Badge */}
// //                     <div className="absolute top-4 right-4 z-10">
// //                         <div className={`bg-gradient-to-br ${gradient} text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
// //                             <Sparkles className="w-3 h-3" />
// //                             DSA
// //                         </div>
// //                     </div>

// //                     {/* Content Container */}
// //                     <div className="relative p-6 flex-1 flex flex-col">
// //                         {/* Icon with Unique Position */}
// //                         <div className="mb-4 flex items-start justify-between">
// //                             <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
// //                                 <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center">
// //                                     <Code2 className={`w-8 h-8 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`} strokeWidth={2.5} />
// //                                 </div>
// //                             </div>

// //                             {/* Problem Number */}
// //                             <div className="text-right">
// //                                 <span className="text-xs font-semibold text-gray-400 dark:text-gray-600">Problem</span>
// //                                 <p className={`text-2xl font-black bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
// //                                     #{String(index + 1).padStart(2, '0')}
// //                                 </p>
// //                             </div>
// //                         </div>

// //                         {/* Title with creative typography */}
// //                         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all duration-300">
// //                             {item.header}
// //                         </h3>

// //                         {/* Description */}
// //                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
// //                             {truncateText(item.explanation, 110)}
// //                         </p>

// //                         {/* Bottom Stats Bar */}
// //                         <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
// //                             <div className="flex items-center gap-3">
// //                                 <div className="flex items-center gap-1.5">
// //                                     <Zap className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" />
// //                                     <span className="text-xs font-medium text-gray-600 dark:text-gray-400">5 min</span>
// //                                 </div>
// //                                 <div className="flex items-center gap-1.5">
// //                                     <TrendingUp className="w-3.5 h-3.5 text-green-500" />
// //                                     <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Hot</span>
// //                                 </div>
// //                             </div>

// //                             {/* Arrow Button */}
// //                             <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:shadow-${glow} transform group-hover:scale-110 transition-all duration-300`}>
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

// // export default Blogcard;

// import React, { useState } from 'react';
// import { ArrowUpRight, Briefcase, Sparkles, Zap, MapPin } from 'lucide-react';

// const truncateText = (text, length) => {
//     if (!text) return '';
//     if (text.length <= length) return text;
//     return text.slice(0, length) + '...';
// };

// const Jobcard = ({ item, onClick, index }) => {
//     const [isHovered, setIsHovered] = useState(false);

//     const getGradientByIndex = (idx) => {
//         const gradients = [
//             { gradient: "from-red-500 to-orange-600", accent: "red-500", glow: "red-500/20" },
//             { gradient: "from-green-500 to-emerald-600", accent: "green-500", glow: "green-500/20" },
//             { gradient: "from-yellow-500 to-amber-600", accent: "yellow-500", glow: "yellow-500/20" },
//             { gradient: "from-blue-500 to-cyan-600", accent: "blue-500", glow: "blue-500/20" },
//             { gradient: "from-purple-600 to-pink-600", accent: "purple-600", glow: "purple-600/20" },
//             { gradient: "from-orange-500 to-red-500", accent: "orange-500", glow: "orange-500/20" },
//             { gradient: "from-teal-500 to-cyan-600", accent: "teal-500", glow: "teal-500/20" },
//             { gradient: "from-indigo-600 to-purple-600", accent: "indigo-600", glow: "indigo-600/20" }
//         ];
//         return gradients[idx % 8];
//     };

//     const { gradient, accent, glow } = getGradientByIndex(index);

//     return (
//         <div
//             onClick={onClick}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             className="group cursor-pointer h-full"
//         >
//             {/* Asymmetric Card Design */}
//             <div className="relative h-full">
//                 {/* Main Card */}
//                 <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 h-full flex flex-col">

//                     {/* Diagonal Gradient Accent */}
//                     <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`}></div>

//                     {/* Top Corner Badge */}
//                     <div className="absolute top-4 right-4 z-10">
//                         <div className={`bg-gradient-to-br ${gradient} text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
//                             <Sparkles className="w-3 h-3" />
//                             {item.jobType || 'Job'}
//                         </div>
//                     </div>

//                     {/* Content Container */}
//                     <div className="relative p-6 flex-1 flex flex-col">
//                         {/* Icon with Unique Position */}
//                         <div className="mb-4 flex items-start justify-between">
//                             <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
//                                 <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center">
//                                     <Briefcase className={`w-8 h-8 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`} strokeWidth={2.5} />
//                                 </div>
//                             </div>

//                             {/* Job Number */}
//                             <div className="text-right">
//                                 <span className="text-xs font-semibold text-gray-400 dark:text-gray-600">Job</span>
//                                 <p className={`text-2xl font-black bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
//                                     #{String(index + 1).padStart(2, '0')}
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Company Name */}
//                         <p className={`text-xs font-bold uppercase tracking-wider mb-1 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
//                             {item.company}
//                         </p>

//                         {/* Job Title */}
//                         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all duration-300">
//                             {item.title}
//                         </h3>

//                         {/* Location & Salary */}
//                         <div className="flex flex-wrap items-center gap-3 mb-3">
//                             {item.location && (
//                                 <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
//                                     <MapPin className="w-3 h-3" />
//                                     {item.location}
//                                 </span>
//                             )}
//                             {item.salary && (
//                                 <span className={`text-xs font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
//                                     {item.salary}
//                                 </span>
//                             )}
//                         </div>

//                         {/* Description */}
//                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
//                             {truncateText(item.description, 110)}
//                         </p>

//                         {/* Bottom Stats Bar */}
//                         <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
//                             <div className="flex items-center gap-3">
//                                 <div className="flex items-center gap-1.5">
//                                     <Zap className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" />
//                                     <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
//                                         {item.experience || 'Freshers'}
//                                     </span>
//                                 </div>
//                                 {item.lastDate && (
//                                     <div className="flex items-center gap-1.5">
//                                         <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
//                                             {item.lastDate}
//                                         </span>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Arrow Button */}
//                             <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:shadow-${glow} transform group-hover:scale-110 transition-all duration-300`}>
//                                 <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={2.5} />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Bottom Gradient Line */}
//                     <div className={`h-1.5 bg-gradient-to-r ${gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
//                 </div>

//                 {/* Floating Shadow Effect */}
//                 <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-3xl blur-xl -z-10 transform group-hover:scale-105 transition-all duration-500`}></div>
//             </div>
//         </div>
//     );
// };

// export default Jobcard;

import React, { useState } from 'react';
import { ArrowUpRight, Briefcase, Sparkles, Zap, MapPin } from 'lucide-react';

const truncateText = (text, length) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
};

const Jobcard = ({ item, onClick, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imgError, setImgError] = useState(false);

    const getGradientByIndex = (idx) => {
        const gradients = [
            { gradient: "from-red-500 to-orange-600", accent: "red-500", glow: "red-500/20" },
            { gradient: "from-green-500 to-emerald-600", accent: "green-500", glow: "green-500/20" },
            { gradient: "from-yellow-500 to-amber-600", accent: "yellow-500", glow: "yellow-500/20" },
            { gradient: "from-blue-500 to-cyan-600", accent: "blue-500", glow: "blue-500/20" },
            { gradient: "from-purple-600 to-pink-600", accent: "purple-600", glow: "purple-600/20" },
            { gradient: "from-orange-500 to-red-500", accent: "orange-500", glow: "orange-500/20" },
            { gradient: "from-teal-500 to-cyan-600", accent: "teal-500", glow: "teal-500/20" },
            { gradient: "from-indigo-600 to-purple-600", accent: "indigo-600", glow: "indigo-600/20" }
        ];
        return gradients[idx % 8];
    };

    const { gradient, glow } = getGradientByIndex(index);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group cursor-pointer h-full"
        >
            <div className="relative h-full">
                <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 h-full flex flex-col">

                    {/* Diagonal Gradient Accent */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`}></div>

                    {/* Top Corner Badge */}
                    <div className="absolute top-4 right-4 z-10">
                        <div className={`bg-gradient-to-br ${gradient} text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
                            <Sparkles className="w-3 h-3" />
                            {item.jobType || 'Job'}
                        </div>
                    </div>

                    {/* Content Container */}
                    <div className="relative p-6 flex-1 flex flex-col">
                        {/* Icon / Image with Unique Position */}
                        <div className="mb-4 flex items-start justify-between">
                            <div className={`relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} p-0.5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                                <div className="w-full h-full bg-transparentrounded-2xl flex items-center justify-center">
                                    <Briefcase className="w-7 h-7 text-gray-100" strokeWidth={2} />
                                </div>
                            </div>

                            {/* Job Number */}
                            <div className="text-right">
                                <span className="text-xs font-semibold text-gray-400 dark:text-gray-600">Job</span>
                                <p className={`text-2xl font-black bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
                                    #{String(index + 1).padStart(2, '0')}
                                </p>
                            </div>
                        </div>

                        {/* Company Name */}
                        <p className={`text-xs font-bold uppercase tracking-wider mb-1 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
                            {item.company}
                        </p>

                        {/* Job Title */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all duration-300">
                            {item.title}
                        </h3>

                        {/* Location & Salary */}
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            {item.location && (
                                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                    <MapPin className="w-3 h-3" />
                                    {item.location}
                                </span>
                            )}
                            {item.salary && (
                                <span className={`text-xs font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
                                    {item.salary}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                            {truncateText(item.description, 110)}
                        </p>

                        {/* Bottom Stats Bar */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <Zap className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" />
                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                        {item.experience || 'Freshers'}
                                    </span>
                                </div>
                                {item.lastDate && (
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            {item.lastDate}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Arrow Button */}
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                                <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Gradient Line */}
                    <div className={`h-1.5 bg-gradient-to-r ${gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </div>

                {/* Floating Shadow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-3xl blur-xl -z-10 transform group-hover:scale-105 transition-all duration-500`}></div>
            </div>
        </div>
    );
};

export default Jobcard;