
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, ArrowRight, Flame } from 'lucide-react';
import BlogCard, { SkeletonBlogCard } from '../components/Blogs/BlogCard';
import { baseUrl } from '../Baseurl';

const LIMIT = 4;

const HeroBlog = () => {
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await axios.get(`${baseUrl}/blog`, {
                params: {
                    limit: LIMIT,
                    sort: 'newest',
                },
            });

            setBlogs(res.data.blogs || []);
        } catch (err) {
            console.error('Failed to fetch blogs:', err);
            setError('Failed to load articles. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const go = (slug) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(`/blogs/${slug}`);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-950 pt-5">
            {/* ── Error ── */}
            {error && !loading && (
                <div className="text-center py-10">
                    <p className="text-sm text-red-500 dark:text-red-400 mb-3">
                        {error}
                    </p>

                    <button
                        onClick={fetchBlogs}
                        className="px-5 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* ── Loading Skeleton ── */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {[...Array(LIMIT)].map((_, i) => (
                        <SkeletonBlogCard key={i} />
                    ))}
                </div>
            ) : !error && blogs.length === 0 ? (

                /* ── Empty State ── */
                <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <BookOpen className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />

                    <p className="text-base font-bold text-gray-700 dark:text-gray-300">
                        No blogs yet
                    </p>

                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Check back soon for interview tips!
                    </p>
                </div>

            ) : !error ? (

                <>
                    {/* ── Blog Grid ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        {blogs.map((blog, i) => (
                            <BlogCard
                                key={blog._id}
                                blog={blog}
                                index={i}
                                onClick={() => go(blog.slug)}
                            />
                        ))}
                    </div>

                    {/* ── View More Button ── */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => navigate('/blogs')}
                            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-100 transition-all duration-300"
                        >
                            View More Blogs
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </>

            ) : null}


        </section >
    );
};

export default HeroBlog;
