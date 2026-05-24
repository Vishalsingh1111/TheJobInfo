
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, ArrowRight, Flame, Loader2 } from 'lucide-react';
import BlogCard, { SkeletonBlogCard } from '../components/Blogs/BlogCard';
import { baseUrl } from '../Baseurl';

// HeroBlog is used on the homepage — fetches 6 newest blogs, supports load-more.
// API: GET /blog?page=N&limit=6&sort=newest
// Response: { success, blogs, total, page, pages }

const LIMIT = 6;

const HeroBlog = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState(null);

    const fetchBlogs = async (pageNum = 1, append = false) => {
        try {
            if (pageNum === 1) setLoading(true);
            else setLoadingMore(true);
            setError(null);

            const res = await axios.get(`${baseUrl}/blog`, {
                params: { page: pageNum, limit: LIMIT, sort: 'newest' },
            });

            const { blogs: newBlogs, pages } = res.data;
            setBlogs(prev => append ? [...prev, ...newBlogs] : newBlogs);
            setHasMore(pageNum < pages);
        } catch (err) {
            console.error('Failed to fetch blogs:', err);
            setError('Failed to load articles. Please try again.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => { fetchBlogs(1); }, []);

    const handleShowMore = () => {
        const next = page + 1;
        setPage(next);
        fetchBlogs(next, true);
    };

    const go = (slug) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(`/blogs/${slug}`);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-950 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* ── Section Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                                Interview Prep
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                            Crack Your Next Interview
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                            Tips, guides &amp; strategies from placement experts
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/blogs')}
                        className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 hover:border-purple-400 dark:hover:border-purple-600 hover:text-purple-600 dark:hover:text-purple-400 bg-white dark:bg-gray-900 transition-all duration-200 flex-shrink-0"
                    >
                        View All <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* ── Error ── */}
                {error && !loading && (
                    <div className="text-center py-10">
                        <p className="text-sm text-red-500 dark:text-red-400 mb-3">{error}</p>
                        <button
                            onClick={() => fetchBlogs(1)}
                            className="px-5 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* ── Blog Grid ── */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                        {[...Array(LIMIT)].map((_, i) => <SkeletonBlogCard key={i} />)}
                    </div>
                ) : !error && blogs.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <BookOpen className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                        <p className="text-base font-bold text-gray-700 dark:text-gray-300">No blogs yet</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Check back soon for interview tips!</p>
                    </div>
                ) : !error ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                        {blogs.map((blog, i) => (
                            <BlogCard key={blog._id} blog={blog} index={i} onClick={() => go(blog.slug)} />
                        ))}
                    </div>
                ) : null}

                {/* ── Load More ── */}
                {hasMore && !loading && !error && (
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={handleShowMore}
                            disabled={loadingMore}
                            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-100 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {loadingMore ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Loading…</>
                            ) : (
                                <>Show More Articles <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </div>
                )}

                {/* ── Mobile View All ── */}
                {!loading && !error && blogs.length > 0 && (
                    <div className="flex justify-center sm:hidden mt-2">
                        <button
                            onClick={() => navigate('/blogs')}
                            className="flex items-center gap-1.5 text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline"
                        >
                            View All Blogs <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroBlog;