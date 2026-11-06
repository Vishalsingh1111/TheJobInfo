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
    'from-blue-500 to-teal-600',
    'from-teal-500 to-cyan-600',
    'from-sky-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-cyan-600 to-teal-500',
    'from-emerald-500 to-cyan-600',
    'from-blue-500 to-cyan-600',
    'from-green-500 to-emerald-600',
];

const GUIDE_GRADIENTS = [
    'from-blue-600 to-cyan-500',
    'from-emerald-600 to-teal-500',
    'from-blue-600 to-sky-500',
    'from-cyan-600 to-blue-500',
    'from-emerald-600 to-teal-500',
    'from-cyan-600 to-teal-500',
    'from-teal-600 to-cyan-500',
];

export const CATEGORY_COLORS = {
    'Interview Tips':
        'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800',
    DSA:
        'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    'System Design':
        'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
    'HR Round':
        'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800',
    'Resume Tips':
        'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800',
    Aptitude:
        'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800',
    'Coding Interview':
        'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800',
    'Career Advice':
        'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800',
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
const BlogCard = ({ blog, index, onClick, variant }) => {
    const gradient = GRADIENTS[index % GRADIENTS.length];

    const catColor =
        CATEGORY_COLORS[blog.category] ||
        'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';

    if (variant === 'guide') {
        const date = blog.createdAt && !Number.isNaN(new Date(blog.createdAt).getTime())
            ? new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
            : '';
        const gradient = GUIDE_GRADIENTS[index % GUIDE_GRADIENTS.length];
        return (
            <button type="button" onClick={onClick} className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-800 dark:bg-gray-900">
                <div className={`relative flex min-h-[155px] flex-col justify-between overflow-hidden bg-gradient-to-br ${gradient} p-4 text-white`}>
                    {blog.imageUrl && <img src={blog.imageUrl} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = 'none'; }} />}
                    <div aria-hidden="true" className={`absolute inset-0 ${blog.imageUrl ? 'bg-gradient-to-br from-slate-950/55 via-slate-950/15 to-slate-950/60' : ''}`} />
                    <div aria-hidden="true" className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.8) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
                    <div className="absolute -bottom-12 -right-8 h-36 w-36 rounded-full bg-white/15" />
                    <span className="relative z-10 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.17em]"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-slate-900 shadow-sm"><BookOpen className="h-4 w-4" /></span> Interview article</span>
                    <div className="relative z-10">
                        <p className="text-2xl font-extrabold leading-tight">{blog.category || 'Interview tips'}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-slate-900">{blog.difficulty || 'Beginner'}</span>
                            <span className="rounded-full bg-black/20 px-2.5 py-1 text-[10px] font-bold text-white">{blog.readTime || 8} min read</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-2 text-base font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">{blog.title}</h3>
                    <p className="mt-1.5 line-clamp-2 min-h-10 flex-1 text-sm leading-5 text-slate-600 dark:text-gray-300">{blog.excerpt}</p>
                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-gray-800">
                        <span className="truncate text-xs text-slate-500 dark:text-gray-400">By {blog.author || 'TheJobInfo Team'}{date ? ` · ${date}` : ''}</span>
                        <span className={`shrink-0 text-xs font-bold ${DIFF_COLORS[blog.difficulty] || 'text-emerald-600 dark:text-emerald-400'}`}>{blog.difficulty || 'Beginner'}</span>
                    </div>
                </div>
            </button>
        );
    }

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

                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
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

                        <span className="flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:gap-2 transition-all">
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
