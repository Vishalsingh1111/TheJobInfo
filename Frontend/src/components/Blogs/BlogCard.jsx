import React from 'react';
import {
    BookOpen,
    Clock,
    Tag,
    Star,
    TrendingUp,
    ChevronRight,
} from 'lucide-react';

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

export const CATEGORY_COLORS = {
    'Interview Tips':
        'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    DSA:
        'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    'System Design':
        'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
    'HR Round':
        'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800',
    'Resume Tips':
        'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
    Aptitude:
        'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
    'Coding Interview':
        'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800',
    'Career Advice':
        'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800',
};

export const DIFF_COLORS = {
    Beginner: 'text-green-600 dark:text-green-400',
    Intermediate: 'text-yellow-600 dark:text-yellow-400',
    Advanced: 'text-red-600 dark:text-red-400',
};

// ── Auto Blog Image ───────────────────────────────────────────────────────────
export const AutoBlogImageCompact = ({ title, category, index }) => {
    const grad = GRADIENTS[index % GRADIENTS.length];

    return (
        <div
            className={`w-full h-full bg-gradient-to-br ${grad} flex flex-col items-center justify-center px-4 py-5 text-center`}
        >
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center mb-2 shadow-md">
                <BookOpen className="w-5 h-5 text-white" />
            </div>

            <p className="text-white/75 text-sm font-bold uppercase tracking-widest mb-1 leading-tight">
                {category?.length > 14
                    ? `${category.slice(0, 14)}…`
                    : category}
            </p>

            <p className="text-white font-bold text-md leading-snug line-clamp-2 drop-shadow px-1">
                {title?.length > 24
                    ? `${title.slice(0, 24)}…`
                    : title}
            </p>

            <span className="mt-2 text-white/35 text-xs font-semibold tracking-widest">
                TheJobInfo
            </span>
        </div>
    );
};

// ── Shimmer Skeleton ──────────────────────────────────────────────────────────
const ShimmerStyle = () => (
    <style>{`
    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .shimmer-bar {
      position: relative;
      overflow: hidden;
    }

    .shimmer-bar::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,.35),
        transparent
      );
      animation: shimmer 1.6s infinite;
    }

    .dark .shimmer-bar::after {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,.08),
        transparent
      );
    }
  `}</style>
);

export const SkeletonBlogCard = () => (
    <>
        <ShimmerStyle />

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
            <div
                className="relative bg-gray-200 dark:bg-gray-800 shimmer-bar"
                style={{ minHeight: '176px' }}
            >
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gray-300/50 dark:bg-gray-700/50" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gray-300/50 dark:bg-gray-700/50" />
                <div className="absolute top-3 right-3 w-16 h-6 rounded-full bg-gray-300 dark:bg-gray-700" />
                <div className="absolute top-3 left-3 w-20 h-6 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>

            <div className="p-5 flex flex-col gap-3">
                <div className="flex gap-2">
                    <div className="h-5 w-24 rounded-full bg-gray-200 dark:bg-gray-700 shimmer-bar" />
                    <div className="h-5 w-16 rounded-full bg-gray-100 dark:bg-gray-800 shimmer-bar" />
                </div>

                <div className="space-y-2">
                    <div className="h-5 w-4/5 rounded-lg bg-gray-200 dark:bg-gray-700 shimmer-bar" />
                    <div className="h-5 w-3/5 rounded-lg bg-gray-200 dark:bg-gray-700 shimmer-bar" />
                </div>

                <div className="space-y-1.5">
                    <div className="h-3.5 w-full rounded bg-gray-100 dark:bg-gray-800 shimmer-bar" />
                    <div className="h-3.5 w-11/12 rounded bg-gray-100 dark:bg-gray-800 shimmer-bar" />
                </div>

                <div className="flex gap-2">
                    {[44, 56, 38].map((w, i) => (
                        <div
                            key={i}
                            className="h-5 rounded-full bg-gray-100 dark:bg-gray-800 shimmer-bar"
                            style={{ width: `${w}px` }}
                        />
                    ))}
                </div>

                <div className="flex justify-between">
                    <div className="h-3.5 w-20 rounded bg-gray-100 dark:bg-gray-800 shimmer-bar" />
                    <div className="h-3.5 w-16 rounded bg-gray-100 dark:bg-gray-800 shimmer-bar" />
                </div>
            </div>
        </div>
    </>
);

// ── Main BlogCard ─────────────────────────────────────────────────────────────
const BlogCard = ({ blog, index, onClick }) => {
    const gradient = GRADIENTS[index % GRADIENTS.length];

    const catColor =
        CATEGORY_COLORS[blog.category] ||
        'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';

    return (
        <div onClick={onClick} className="group cursor-pointer h-full">
            <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1 flex flex-col">

                {/* Image Panel */}
                <div
                    className="relative flex items-center justify-center overflow-hidden flex-shrink-0 border-b border-gray-100 dark:border-gray-800"
                    style={{ minHeight: '176px' }}
                >
                    {blog.imageUrl ? (
                        <>
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
                            />
                            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />

                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-full object-cover absolute inset-0"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </>
                    ) : (
                        <AutoBlogImageCompact
                            title={blog.title}
                            category={blog.category}
                            index={index}
                        />
                    )}

                    {blog.featured && (
                        <div className="absolute top-3 left-3 z-10">
                            <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 bg-yellow-400 text-yellow-900 rounded-full shadow-lg">
                                <Star className="w-3 h-3 fill-current" />
                                Featured
                            </span>
                        </div>
                    )}

                    <div className="absolute top-3 right-3 z-10">
                        <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 bg-black/40 text-white rounded-full backdrop-blur-sm">
                            <Clock className="w-3 h-3" />
                            {blog.readTime} min
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${catColor}`}
                        >
                            {blog.category}
                        </span>

                        <span
                            className={`text-xs font-semibold ${DIFF_COLORS[blog.difficulty] || 'text-gray-500'
                                }`}
                        >
                            {blog.difficulty}
                        </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {blog.title}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 flex-1 leading-relaxed">
                        {blog.excerpt}
                    </p>

                    {blog.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {blog.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-700"
                                >
                                    <Tag className="w-2.5 h-2.5" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 mt-auto">
                        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                            <span className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {blog.views || 0}
                            </span>

                            <span className="truncate max-w-[80px]">
                                {blog.author}
                            </span>
                        </div>

                        <span className="flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:gap-2 transition-all">
                            Read
                            <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;