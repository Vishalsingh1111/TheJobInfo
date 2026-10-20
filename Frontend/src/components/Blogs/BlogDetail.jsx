
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Breadcrumb from '../Common/Breadcrumb';
import { baseUrl } from '../../Baseurl';
import BlogCard, { AutoBlogImageCompact, CATEGORY_COLORS, DIFF_COLORS } from './BlogCard';

import {
    BookOpen, Clock, Tag, Star, TrendingUp, ArrowRight, ArrowLeft,
    ChevronDown, List, Send, Calendar, Users, Briefcase,
    Facebook, Twitter, Linkedin, Link2, IndianRupee, RefreshCw
} from 'lucide-react';

// BlogDetail — single blog page.
// API: GET /blog/slug/:slug  → { success, blog }
// API: GET /blog?limit=20&sort=newest  → { success, blogs, ... }
// API: GET /job  → array of jobs

const TELEGRAM_LINK = 'https://t.me/dcoder75';
const INSTAGRAM_LINK = 'https://www.instagram.com/coder.sync/';

const GRADIENTS_BLOG = [
    'from-violet-500 to-purple-600',
    'from-rose-500 to-pink-600',
    'from-sky-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-amber-600',
    'from-fuchsia-500 to-pink-600',
];

const colorfulGradients = [
    'from-red-500 to-orange-400',
    'from-blue-500 to-cyan-400',
    'from-green-500 to-emerald-400',
    'from-purple-500 to-pink-400',
    'from-yellow-500 to-amber-400',
    'from-sky-500 to-indigo-400',
];

const formatDate = (d) => {
    if (!d) return '';
    const dt = new Date(d);
    if (isNaN(dt)) return '';
    return dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

// ── Divider ───────────────────────────────────────────────────────────────────
const Divider = () => <hr className="border-gray-100 dark:border-gray-800 my-5" />;

// ── Section Title ─────────────────────────────────────────────────────────────
const SectionTitle = ({ text, id: sId }) => (
    <h2
        id={sId}
        className="text-base font-bold text-gray-900 dark:text-white mb-4 mt-6 uppercase tracking-wide scroll-mt-8"
    >
        {text}
    </h2>
);

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
                className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
            >
                <span className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                    <List className="w-3.5 h-3.5 text-gray-400" /> Table of Contents
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700/60">
                    <ol className="space-y-1.5">
                        {sections.map((s, i) => (
                            <li key={s.id} className="flex items-start gap-2">
                                <span className="text-xs text-gray-400 mt-0.5 w-4 flex-shrink-0 font-bold">{i + 1}.</span>
                                <button
                                    onClick={() => scrollTo(s.id)}
                                    className="text-left text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline font-medium leading-snug"
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
const ShareBar = ({ title, author }) => {
    const [copied, setCopied] = useState(false);
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `${title} by ${author} — Read now!`;
    const enc = encodeURIComponent;

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleNative = async () => {
        if (navigator.share) {
            try { await navigator.share({ title, text: shareText, url: shareUrl }); } catch (_) { }
        }
    };

    const socialLinks = [
        { href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`, bg: '#1877f2', icon: <Facebook className="w-3.5 h-3.5" /> },
        { href: `https://twitter.com/intent/tweet?url=${enc(shareUrl)}&text=${enc(shareText)}`, bg: '#1da1f2', icon: <Twitter className="w-3.5 h-3.5" /> },
        { href: `https://www.linkedin.com/shareArticle?mini=true&url=${enc(shareUrl)}&title=${enc(title)}`, bg: '#0077b5', icon: <Linkedin className="w-3.5 h-3.5" /> },
        { href: `https://t.me/share/url?url=${enc(shareUrl)}&text=${enc(shareText)}`, bg: '#0088cc', icon: <Send className="w-3.5 h-3.5" /> },
        {
            href: `https://api.whatsapp.com/send?text=${enc(shareText + '\n' + shareUrl)}`,
            bg: '#25d366',
            icon: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="flex flex-wrap items-center gap-2">

            {socialLinks.map((s, i) => (
                <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: s.bg }}
                >
                    {s.icon}
                </a>
            ))}
            <button
                onClick={copyLink}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
            >
                <Link2 className="w-3.5 h-3.5" />
            </button>
            {typeof navigator !== 'undefined' && navigator.share && (
                <button
                    onClick={handleNative}
                    className="h-8 px-3 rounded-lg flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold transition-colors border border-gray-200 dark:border-gray-700"
                >
                    Share
                </button>
            )}
            {copied && <span className="text-xs text-green-600 dark:text-green-400 font-bold">Copied!</span>}
        </div>
    );
};

// ── Prev / Next ───────────────────────────────────────────────────────────────
const PrevNextBar = ({ prev, next, onGo }) => (
    <div className="mt-5 grid grid-cols-2 gap-3">
        {/* Prev */}
        <div>
            {prev ? (
                <button
                    onClick={() => onGo(prev.slug)}
                    className="w-full text-left group border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-white dark:hover:bg-gray-900 transition-all"
                >
                    <p className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mb-1.5">
                        <ArrowLeft className="w-3 h-3" /> Previous
                    </p>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 leading-snug line-clamp-2">
                        {prev.title}
                    </p>
                </button>
            ) : (
                <div className="border border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-3.5">
                    <p className="flex items-center gap-1 text-xs text-gray-300 dark:text-gray-700 mb-1.5"><ArrowLeft className="w-3 h-3" /> Previous</p>
                    <p className="text-sm text-gray-300 dark:text-gray-700">No previous post</p>
                </div>
            )}
        </div>
        {/* Next */}
        <div>
            {next ? (
                <button
                    onClick={() => onGo(next.slug)}
                    className="w-full text-right group border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-white dark:hover:bg-gray-900 transition-all"
                >
                    <p className="flex items-center justify-end gap-1 text-xs text-gray-400 dark:text-gray-500 mb-1.5">
                        Next <ArrowRight className="w-3 h-3" />
                    </p>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 leading-snug line-clamp-2">
                        {next.title}
                    </p>
                </button>
            ) : (
                <div className="border border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-3.5 text-right">
                    <p className="flex items-center justify-end gap-1 text-xs text-gray-300 dark:text-gray-700 mb-1.5">Next <ArrowRight className="w-3 h-3" /></p>
                    <p className="text-sm text-gray-300 dark:text-gray-700">No next post</p>
                </div>
            )}
        </div>
    </div>
);

// ── Related Blogs Grid ────────────────────────────────────────────────────────
const RelatedBlogsGrid = ({ blogs, onGo }) => (
    <div className="mt-6">
        <div className="py-4 border-b border-gray-200 dark:border-gray-700 mb-5">
            <h2 className="text-lg font-bold text-gray-700 dark:text-white uppercase tracking-wide">Related Articles</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {blogs.slice(0, 6).map((blog, i) => (
                <div
                    key={blog._id}
                    onClick={() => onGo(blog.slug)}
                    className="cursor-pointer group flex flex-col"
                >
                    <div className="w-full aspect-[5/3] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 mb-2 flex-shrink-0">
                        {blog.imageUrl ? (
                            <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
                        ) : (
                            <AutoBlogImageCompact title={blog.title} category={blog.category} index={i} />
                        )}
                    </div>
                    <p className="text-md font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug line-clamp-2 mb-1">
                        {blog.title}
                    </p>
                    {blog.category && (
                        <p className="text-xs text-gray-400 dark:text-gray-500">{blog.category}</p>
                    )}
                    {blog.createdAt && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-auto pt-1">{formatDate(blog.createdAt)}</p>
                    )}
                </div>
            ))}
        </div>
        {blogs.length > 6 && (
            <div className="flex justify-center mt-6">
                <a
                    href="/blogs"
                    className="flex items-center gap-2 px-5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:border-purple-300 hover:text-purple-600 dark:hover:border-purple-700 dark:hover:text-purple-400 transition-all"
                >
                    More articles <ArrowRight className="w-3.5 h-3.5" />
                </a>
            </div>
        )}
    </div>
);

// ── Loading Skeleton ──────────────────────────────────────────────────────────
const LoadingSkeleton = () => (
    <>
        <Navbar />
        <Breadcrumb />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-5 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    <div className="lg:col-span-8 space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 space-y-3">
                                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
                                <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-full" />
                                <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
                                <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-4 space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 space-y-3">
                                <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
                                <div className="h-9 bg-gray-100 dark:bg-gray-800 rounded-xl" />
                                <div className="h-9 bg-gray-100 dark:bg-gray-800 rounded-xl" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
);

// ── Main BlogDetail ───────────────────────────────────────────────────────────
const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [allBlogs, setAllBlogs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Scroll top on slug change
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const [blogRes, blogsRes, jobsRes] = await Promise.all([
                    axios.get(`${baseUrl}/blog/slug/${slug}`),
                    axios.get(`${baseUrl}/blog`, { params: { limit: 20, sort: 'newest' } }),
                    axios.get(`${baseUrl}/job`),
                ]);
                setBlog(blogRes.data.blog);
                setAllBlogs(blogsRes.data.blogs || []);
                // /job may return array directly or { jobs: [...] }
                const jobData = jobsRes.data;
                setJobs(Array.isArray(jobData) ? jobData : (jobData.jobs || []));
            } catch (err) {
                console.error(err);
                setError('Failed to load this article. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [slug]);

    const goSlug = (s) => { window.scrollTo({ top: 0, behavior: 'instant' }); navigate(`/blogs/${s}`); };
    const goJob = (id) => { window.scrollTo({ top: 0, behavior: 'instant' }); navigate(`/jobdetail/${id}`); };

    if (loading) return <LoadingSkeleton />;

    if (error || !blog) return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
                <div className="text-center">
                    <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
                        {error || 'Article not found.'}
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-400 hover:border-purple-300 hover:text-purple-600 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" /> Go Back
                        </button>
                        {error && (
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" /> Retry
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

    const catColor = CATEGORY_COLORS[blog.category] || 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    const otherBlogs = allBlogs.filter(b => b.slug !== slug);
    const currentIndex = allBlogs.findIndex(b => b.slug === slug);
    const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
    const nextBlog = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;
    const recentJobs = jobs.slice(0, 6);

    const tocSections = [
        { id: 'blog-content', label: 'Article Content' },
        blog.tags?.length > 0 && { id: 'blog-tags', label: 'Tags' },
        { id: 'blog-share', label: 'Share this Article' },
    ].filter(Boolean);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <Breadcrumb />

                <div className="max-w-7xl mx-auto px-4 sm:px-5 py-6 sm:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                        {/* ══ MAIN COLUMN ══════════════════════════════════════════ */}
                        <div className="lg:col-span-8">
                            <article className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">

                                {/* ── Header ── */}
                                <div className="px-5 sm:px-7 pt-6 pb-5">
                                    <div className="flex items-start gap-4">
                                        {/* Blog icon */}
                                        <div className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                                            {blog.imageUrl ? (
                                                <img
                                                    src={blog.imageUrl}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover"
                                                    onError={e => { e.target.style.display = 'none'; }}
                                                />
                                            ) : (
                                                <div className={`w-full h-full bg-gradient-to-br ${GRADIENTS_BLOG[0]} flex items-center justify-center`}>
                                                    <BookOpen className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            {/* Badges */}
                                            <div className="flex flex-wrap items-center gap-1.5 mb-2">
                                                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${catColor}`}>
                                                    {blog.category}
                                                </span>
                                                {blog.difficulty && (
                                                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${DIFF_COLORS[blog.difficulty] || 'text-gray-600'}`}>
                                                        {blog.difficulty}
                                                    </span>
                                                )}
                                                {blog.featured && (
                                                    <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400">
                                                        <Star className="w-3 h-3 fill-current" /> Featured
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" /> Active
                                                </span>
                                            </div>

                                            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-snug">
                                                {blog.title}
                                            </h1>
                                            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-1">{blog.author}</p>

                                            {blog.createdAt && (
                                                <p className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                    <Calendar className="w-3 h-3" /> Published {formatDate(blog.createdAt)}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Meta chips */}
                                    <div className="flex flex-wrap gap-1.5 mt-4">
                                        <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium">
                                            <Clock className="w-3 h-3 text-blue-400" /> {blog.readTime} min read
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium">
                                            <TrendingUp className="w-3 h-3 text-purple-400" /> {blog.views || 0} views
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium">
                                            <Users className="w-3 h-3 text-green-400" /> {blog.author}
                                        </span>
                                    </div>
                                </div>

                                {/* ── Cover image ── */}
                                <div className="border-y border-gray-100 dark:border-gray-800">
                                    {blog.imageUrl ? (
                                        <img
                                            src={blog.imageUrl}
                                            alt={blog.title}
                                            className="w-full h-auto object-contain bg-white dark:bg-gray-900"
                                        />
                                    ) : (
                                        <div className="mx-5 sm:mx-7 my-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center py-10 px-6 text-center">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${GRADIENTS_BLOG[0]} flex items-center justify-center mb-4 shadow-lg`}>
                                                <BookOpen className="w-7 h-7 text-white" />
                                            </div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-2">{blog.category}</p>
                                            <h2 className="text-xl sm:text-2xl font-bold leading-tight text-gray-900 dark:text-white mb-2 max-w-md">{blog.title}</h2>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{blog.author}</p>
                                            <span className="mt-3 text-gray-300 dark:text-gray-600 text-sm font-semibold tracking-widest">TheJobInfo</span>
                                        </div>
                                    )}
                                </div>

                                {/* ── Excerpt ── */}
                                {blog.excerpt && (
                                    <div className="px-5 sm:px-7 pt-5">
                                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-4 border-purple-400 dark:border-purple-600 pl-4 py-2 bg-purple-50 dark:bg-purple-900/10 rounded-r-xl">
                                            {blog.excerpt}
                                        </p>
                                    </div>
                                )}

                                {/* ── Table of Contents ── */}
                                <div className="px-5 sm:px-7 py-4">
                                    <TableOfContents sections={tocSections} />
                                </div>

                                {/* ── Article Body ── */}
                                <div className="px-5 sm:px-7 pb-6">

                                    <div id="blog-content" className="scroll-mt-8">
                                        <SectionTitle text="Article Content" />
                                        <div
                                            className="
                                                prose prose-sm sm:prose-base prose-gray dark:prose-invert max-w-none
                                                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                                                prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3
                                                prose-h3:text-base prose-h3:mt-5 prose-h3:mb-2
                                                prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-4
                                                prose-ul:space-y-1 prose-li:text-gray-600 dark:prose-li:text-gray-400
                                                prose-ol:space-y-1
                                                prose-strong:text-gray-800 dark:prose-strong:text-gray-200 prose-strong:font-bold
                                                prose-code:text-purple-600 dark:prose-code:text-purple-400 prose-code:bg-purple-50 dark:prose-code:bg-purple-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                                                prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:overflow-x-auto
                                                prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
                                                prose-blockquote:border-l-4 prose-blockquote:border-purple-400 prose-blockquote:bg-purple-50 dark:prose-blockquote:bg-purple-900/10 prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:not-italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
                                                prose-hr:border-gray-100 dark:prose-hr:border-gray-800
                                                prose-img:rounded-xl prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700 prose-img:mx-auto
                                                prose-table:text-sm prose-thead:bg-gray-50 dark:prose-thead:bg-gray-800 prose-th:text-gray-700 dark:prose-th:text-gray-300 prose-td:text-gray-600 dark:prose-td:text-gray-400
                                            "
                                            dangerouslySetInnerHTML={{ __html: blog.content }}
                                        />
                                    </div>

                                    <Divider />

                                    {/* Tags */}
                                    {blog.tags?.length > 0 && (
                                        <>
                                            <div id="blog-tags" className="scroll-mt-8">
                                                <SectionTitle text="Tags" />
                                                <div className="flex flex-wrap gap-2">
                                                    {blog.tags.map(tag => (
                                                        <span
                                                            key={tag}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-md font-semibold"
                                                        >
                                                            <Tag className="w-3 h-3 text-yellow-500" /> {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <Divider />
                                        </>
                                    )}

                                    {/* Disclaimer */}
                                    <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                                        <span className="font-bold text-gray-600 dark:text-gray-300">Disclaimer: </span>
                                        The information in this article is for educational purposes only. For more details, please visit our{' '}
                                        <a href="/privacy-policy" className="text-purple-600 dark:text-purple-400 hover:underline font-semibold">Privacy Policy</a>.
                                    </div>

                                    <Divider />

                                    {/* Share */}
                                    <div id="blog-share" className="scroll-mt-8">
                                        <SectionTitle text="Share this Article" />
                                        <ShareBar title={blog.title} author={blog.author} />
                                    </div>
                                </div>
                            </article>

                            {/* Prev / Next */}
                            <PrevNextBar prev={prevBlog} next={nextBlog} onGo={goSlug} />

                            {/* Related Blogs */}
                            {otherBlogs.length > 0 && (
                                <RelatedBlogsGrid blogs={otherBlogs} onGo={goSlug} />
                            )}
                        </div>

                        {/* ══ SIDEBAR ══════════════════════════════════════════════ */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-6 space-y-4">

                                {/* Stay Updated */}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-700">
                                        <p className="text-lg font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Stay Updated</p>
                                    </div>
                                    <div className="p-4 space-y-2.5">
                                        <p className="text-md text-gray-500 dark:text-gray-400 leading-relaxed">
                                            Get the latest interview tips, job alerts &amp; off-campus drives.
                                        </p>
                                        <a
                                            href={TELEGRAM_LINK}
                                            target="_blank" rel="noreferrer"
                                            className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
                                        >
                                            <Send className="w-3.5 h-3.5" /> Join on Telegram
                                        </a>
                                        <a
                                            href={INSTAGRAM_LINK}
                                            target="_blank" rel="noreferrer"
                                            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:opacity-90 text-white py-2.5 rounded-xl text-sm font-semibold transition-opacity"
                                        >
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                            </svg>
                                            Follow on Instagram
                                        </a>
                                    </div>
                                </div>

                                {/* Blog Categories */}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-700">
                                        <p className="text-lg font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Categories</p>
                                    </div>
                                    <div className="px-2 py-2">
                                        {['Interview Tips', 'DSA', 'System Design', 'HR Round', 'Resume Tips', 'Career Advice'].map(cat => (
                                            <a
                                                key={cat}
                                                href={`/blogs?category=${encodeURIComponent(cat)}`}
                                                className="flex items-center gap-2 text-md font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors px-3 py-2 rounded-xl"
                                            >
                                                <ArrowRight className="w-3 h-3 flex-shrink-0 text-gray-300 dark:text-gray-600" /> {cat}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Articles */}
                                {otherBlogs.length > 0 && (
                                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-700">
                                            <p className="text-lg font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Recent Articles</p>
                                        </div>
                                        <div className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {otherBlogs.slice(0, 5).map((b, idx) => (
                                                <div
                                                    key={b._id}
                                                    onClick={() => goSlug(b.slug)}
                                                    className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                                                >
                                                    <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                                                        {b.imageUrl ? (
                                                            <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className={`w-full h-full bg-gradient-to-br ${GRADIENTS_BLOG[idx % GRADIENTS_BLOG.length]} flex items-center justify-center`}>
                                                                <BookOpen className="w-3.5 h-3.5 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-md font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
                                                            {b.title}
                                                        </p>
                                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">
                                                            {b.category} · {b.readTime} min
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="px-4 py-3 border-t border-gray-50 dark:border-gray-800">
                                            <a href="/blogs" className="text-md font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                                                All articles <ArrowRight className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Recent Jobs */}
                                {recentJobs.length > 0 && (
                                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-700">
                                            <p className="text-lg font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Latest Jobs</p>
                                        </div>
                                        <div className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {recentJobs.map((job, idx) => (
                                                <div
                                                    key={job._id}
                                                    onClick={() => goJob(job._id)}
                                                    className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                                                >
                                                    <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-800 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                                                        {job.imageUrl ? (
                                                            <img src={job.imageUrl} alt={job.company} className="w-full h-full object-contain p-1" />
                                                        ) : (
                                                            <div className={`w-full h-full bg-gradient-to-br ${colorfulGradients[idx % colorfulGradients.length]} flex items-center justify-center`}>
                                                                <Briefcase className="w-3.5 h-3.5 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-md font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                            {job.title}
                                                        </p>
                                                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
                                                            {job.company}{job.location ? ` · ${job.location}` : ''}
                                                        </p>
                                                        {job.salary && (
                                                            <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-0.5 flex items-center gap-0.5">
                                                                <IndianRupee className="w-2.5 h-2.5" /> {job.salary}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="px-4 py-3 border-t border-gray-50 dark:border-gray-800">
                                            <a href="/Job-Portal" className="text-md font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                                                See all jobs <ArrowRight className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Telegram CTA */}
                                <div className="p-4 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border border-sky-100 dark:border-sky-800/40 rounded-2xl">
                                    <p className="text-md font-bold text-gray-800 dark:text-gray-200 mb-1">10,000+ students joined!</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                                        Daily job alerts, off-campus drives &amp; interview tips on Telegram.
                                    </p>
                                    <a
                                        href={TELEGRAM_LINK}
                                        target="_blank" rel="noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white py-2.5 rounded-xl text-sm font-bold transition-colors"
                                    >
                                        <Send className="w-3.5 h-3.5" /> Join Free
                                    </a>
                                </div>

                            </div>
                        </aside>
                        {/* ── end sidebar ── */}

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogDetail;
