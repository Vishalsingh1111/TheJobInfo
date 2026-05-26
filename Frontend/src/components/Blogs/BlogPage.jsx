
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
    BookOpen, Search, X, ChevronDown, ArrowRight,
    Loader2, Flame, Filter, RefreshCw
} from 'lucide-react';
import BlogCard, { SkeletonBlogCard } from './BlogCard';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Breadcrumb from '../Common/Breadcrumb';
import { baseUrl } from '../../Baseurl';



const CATEGORIES = [
    'All', 'Interview Tips', 'DSA', 'System Design',
    'HR Round', 'Resume Tips', 'Aptitude', 'Coding Interview', 'Career Advice',
];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'read-time-asc', label: 'Quick Reads' },
    { value: 'read-time-desc', label: 'Long Reads' },
];
const LIMIT = 20;

// ── Filter Dropdown ───────────────────────────────────────────────────────────
const FilterDropdown = ({ label, options, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const isObj = typeof options[0] === 'object';
    const defaultVal = isObj ? options[0].value : options[0];
    const active = value !== defaultVal;
    const displayLabel = isObj
        ? (options.find(o => o.value === value)?.label || label)
        : (active ? value : label);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm font-bold transition-all whitespace-nowrap ${active
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600'
                    }`}
            >
                <span className="max-w-[130px] truncate">{displayLabel}</span>
                <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="absolute top-full mt-1.5 left-0 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl py-1 min-w-[180px]">
                    {options.map(opt => {
                        const optVal = isObj ? opt.value : opt;
                        const optLabel = isObj ? opt.label : opt;
                        return (
                            <button
                                key={optVal}
                                onClick={() => { onChange(optVal); setOpen(false); }}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${value === optVal
                                    ? 'text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-900/20'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                            >
                                {optLabel}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

// ── Main BlogPage ─────────────────────────────────────────────────────────────
const BlogPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Blog data
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    // Filters — read from URL on mount
    const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || 'All');
    const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

    // ── Fetch blogs ───────────────────────────────────────────────────────────
    const fetchBlogs = useCallback(async (pageNum = 1, append = false) => {
        try {
            if (pageNum === 1) setLoading(true);
            else setLoadingMore(true);
            setError(null);

            const params = { page: pageNum, limit: LIMIT, sort };
            if (search) params.search = search;
            if (category !== 'All') params.category = category;
            if (difficulty !== 'All') params.difficulty = difficulty;

            const res = await axios.get(`${baseUrl}/blog`, { params });
            const { blogs: newBlogs, total: t, pages } = res.data;

            setBlogs(prev => append ? [...prev, ...newBlogs] : newBlogs);
            setTotal(t);
            setHasMore(pageNum < pages);
        } catch (err) {
            console.error(err);
            setError('Failed to load articles. Please try again.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [search, category, difficulty, sort]);

    // Reset & fetch whenever filters change
    useEffect(() => {
        setPage(1);
        setBlogs([]);
        fetchBlogs(1, false);
    }, [fetchBlogs]);

    // Sync filters → URL params
    useEffect(() => {
        const p = {};
        if (search) p.search = search;
        if (category !== 'All') p.category = category;
        if (difficulty !== 'All') p.difficulty = difficulty;
        if (sort !== 'newest') p.sort = sort;
        setSearchParams(p, { replace: true });
    }, [search, category, difficulty, sort]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleLoadMore = () => {
        const next = page + 1;
        setPage(next);
        fetchBlogs(next, true);
    };

    const handleSearch = (e) => { e.preventDefault(); setSearch(searchInput); };
    const clearSearch = () => { setSearchInput(''); setSearch(''); };
    const handleCat = (v) => setCategory(v);
    const handleDiff = (v) => setDifficulty(v);
    const handleSort = (v) => setSort(v);
    const clearAll = () => { clearSearch(); setCategory('All'); setDifficulty('All'); setSort('newest'); };

    const activeFilters = [
        category !== 'All' && { label: category, clear: () => handleCat('All') },
        difficulty !== 'All' && { label: difficulty, clear: () => handleDiff('All') },
        search && { label: `"${search}"`, clear: clearSearch },
    ].filter(Boolean);

    const go = (slug) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(`/blogs/${slug}`);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <Breadcrumb />

                {/* ── Hero Banner ── */}
                <div className="bg-transparent dark:bg-transparent">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-8">

                        <div className="flex justify-center mb-4">
                            <span className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 px-5 py-2 rounded-full text-sm font-bold text-purple-700 dark:text-purple-300">
                                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                                Interview Preparation Hub
                            </span>
                        </div>

                        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                            Master Your{' '}
                            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Interview Skills
                            </span>
                        </h1>
                        <p className="text-center text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                            Expert guides on DSA, System Design, HR rounds, Resume building and more — crafted for placement success
                        </p>

                        {/* Search */}
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-1">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={e => setSearchInput(e.target.value)}
                                    placeholder="Search topics, tags, keywords…"
                                    className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm sm:text-base font-medium focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-colors shadow-sm"
                                />
                                {searchInput && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="absolute right-[5.5rem] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 sm:px-5 py-2 sm:py-2.5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-xl text-sm font-bold transition-colors"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                    </div>
                </div>

                {/* ── Main Content ── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

                    {/* ── Filter bar ── */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">

                        {/* Filter label */}
                        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                            <Filter className="w-3.5 h-3.5" /> Filters:
                        </div>

                        {/* Category Dropdown */}
                        <FilterDropdown
                            label="Category"
                            options={CATEGORIES}
                            value={category}
                            onChange={handleCat}
                        />

                        {/* Difficulty Dropdown */}
                        <FilterDropdown
                            label="Difficulty"
                            options={DIFFICULTIES}
                            value={difficulty}
                            onChange={handleDiff}
                        />

                        {/* Sort Dropdown */}
                        <FilterDropdown
                            label="Sort by"
                            options={SORT_OPTIONS}
                            value={sort}
                            onChange={handleSort}
                        />

                        {/* Active Category Pill */}
                        {category && category !== 'All' && (
                            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-full">
                                {category}

                                <button
                                    onClick={() => handleCat('All')}
                                    className="hover:text-purple-900 dark:hover:text-white"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}

                        {/* Active Difficulty Pill */}
                        {difficulty && difficulty !== 'All' && (
                            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-full">
                                {difficulty}

                                <button
                                    onClick={() => handleDiff('All')}
                                    className="hover:text-blue-900 dark:hover:text-white"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}

                        {/* Active Sort Pill */}
                        {sort && sort !== 'newest' && (
                            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 rounded-full">
                                {sort}

                                <button
                                    onClick={() => handleSort('newest')}
                                    className="hover:text-orange-900 dark:hover:text-white"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}

                        {/* Clear All */}
                        {(category !== 'All' || difficulty !== 'All' || sort !== 'newest') && (
                            <button
                                onClick={clearAll}
                                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-100 dark:border-red-900/40 transition-colors"
                            >
                                <X className="w-3 h-3" /> Clear all
                            </button>
                        )}

                        {/* Total Articles */}
                        <div className="ml-auto text-sm font-medium text-gray-500 dark:text-gray-400">
                            {!loading && (
                                <>
                                    <span className="text-gray-900 dark:text-white font-bold">
                                        {total}
                                    </span>{' '}
                                    articles
                                </>
                            )}
                        </div>
                    </div>


                    {/* Error state */}
                    {error && !loading && (
                        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <p className="text-base text-red-500 dark:text-red-400 mb-4">
                                {error}
                            </p>

                            <button
                                onClick={() => fetchBlogs(1)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" /> Try Again
                            </button>
                        </div>
                    )}


                    {/* Blog Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                            {[...Array(8)].map((_, i) => <SkeletonBlogCard key={i} />)}
                        </div>
                    ) : !error && blogs.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <BookOpen className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
                            <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">No articles found</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search or filters</p>
                            <button
                                onClick={clearAll}
                                className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : !error ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                            {blogs.map((blog, i) => (
                                <BlogCard key={blog._id} blog={blog} index={i} onClick={() => go(blog.slug)} />
                            ))}
                        </div>
                    ) : null}

                    {/* Load more skeleton rows while appending */}
                    {loadingMore && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mt-5">
                            {[...Array(4)].map((_, i) => <SkeletonBlogCard key={`more-${i}`} />)}
                        </div>
                    )}

                    {/* Load More button */}
                    {hasMore && !loading && !error && (
                        <div className="flex justify-center mt-10">
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-100 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                            >
                                {loadingMore ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Loading…</>
                                ) : (
                                    <>Load More Articles <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                    )}

                    {/* End of results */}
                    {!hasMore && !loading && !error && blogs.length > 0 && (
                        <div className="text-center mt-10 text-sm text-gray-400 dark:text-gray-600 font-medium">
                            You've seen all {total} articles
                        </div>
                    )}
                </div>
            </div >
            <Footer />
        </>
    );
};

export default BlogPage;