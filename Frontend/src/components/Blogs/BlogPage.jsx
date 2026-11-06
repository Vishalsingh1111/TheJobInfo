import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Search, Loader2 } from 'lucide-react';
import BlogCard, { SkeletonBlogCard } from './BlogCard';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Breadcrumb from '../Common/Breadcrumb';
import SocialFollowCard from '../Common/SocialFollowCard';
import AdSlot from '../AdSlot';
import { baseUrl } from '../../Baseurl';

const CATEGORIES = ['All', 'Interview Tips', 'HR Round', 'DSA', 'System Design', 'Resume Tips', 'Aptitude'];
const LIMIT = 20;
const CARD_GRADIENTS = [
    'from-blue-600 to-sky-500', 'from-teal-600 to-cyan-500', 'from-blue-600 to-sky-500',
    'from-blue-600 to-sky-500', 'from-emerald-600 to-teal-500', 'from-cyan-600 to-teal-500',
    'from-emerald-600 to-teal-500',
];

export default function BlogPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');
    const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');

    const fetchBlogs = useCallback(async (pageNum = 1) => {
        try {
            setLoading(true);
            setError('');
            const params = { page: pageNum, limit: LIMIT, sort: 'newest' };
            if (search) params.search = search;
            if (category !== 'All') params.category = category;
            const { data } = await axios.get(`${baseUrl}/blog`, { params });
            const nextBlogs = Array.isArray(data.blogs) ? data.blogs : [];
            setBlogs(nextBlogs);
            setTotal(Number(data.total) || 0);
        } catch (requestError) {
            console.error(requestError);
            setError('Failed to load articles. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [search, category]);

    useEffect(() => {
        setPage(1);
        setBlogs([]);
        fetchBlogs(1);
    }, [fetchBlogs]);

    useEffect(() => {
        const next = {};
        if (search) next.search = search;
        if (category !== 'All') next.category = category;
        setSearchParams(next, { replace: true });
    }, [search, category, setSearchParams]);

    const handleSearch = (event) => {
        event.preventDefault();
        setSearch(searchInput.trim());
    };
    const clearSearch = () => {
        setSearchInput('');
        setSearch('');
    };
    const go = (slug) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(`/blogs/${slug}`);
    };
    const goToPage = (nextPage) => {
        if (nextPage < 1 || nextPage > Math.ceil(total / LIMIT) || nextPage === page) return;
        setPage(nextPage);
        fetchBlogs(nextPage);
    };
    const featured = blogs[0];
    const remaining = blogs.slice(featured ? 1 : 0);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#f3f8fb] dark:bg-gray-950">
                <div className="relative overflow-hidden bg-[#f3f8fb] dark:bg-gray-950">
                    <div className="relative mx-auto max-w-7xl px-4 pb-7 pt-1 sm:px-6">
                        <Breadcrumb />
                        <section className="page-hero-enter pb-1 pt-5 text-center sm:pt-7">
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                                Master your <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">interview skills</span>
                            </h1>
                            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-gray-300 sm:text-base">
                                Interview articles on DSA, system design, HR rounds and resume building, written to help you prepare for placements and hiring rounds.
                            </p>
                            <form onSubmit={handleSearch} className="mx-auto mt-5 max-w-xl">
                                <div className="relative rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                    <input
                                        value={searchInput}
                                        onChange={event => setSearchInput(event.target.value)}
                                        placeholder="Search topics, tags, keywords"
                                        aria-label="Search Interview Articles"
                                        className="w-full rounded-xl bg-transparent py-2.5 pl-10 pr-28 text-sm text-slate-800 outline-none placeholder:text-slate-500 dark:text-white dark:placeholder:text-gray-400"
                                    />
                                    {searchInput && <button type="button" onClick={clearSearch} aria-label="Clear search" className="absolute right-[5.6rem] top-1/2 -translate-y-1/2 px-2 text-slate-500">×</button>}
                                    <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 px-4 py-2.5 text-sm font-bold text-white">Search</button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 pb-12 pt-3 sm:px-6">
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                        <span className="mr-1 text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-gray-400">Topics</span>
                        {CATEGORIES.map(topic => (
                            <button key={topic} type="button" onClick={() => setCategory(topic)} aria-pressed={category === topic}
                                className={`rounded-full border px-3.5 py-2 text-xs font-bold transition-colors ${category === topic ? 'border-transparent bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-blue-600'}`}>
                                {topic}
                            </button>
                        ))}
                        <p className="ml-auto text-xs font-medium text-slate-500 dark:text-gray-400"><strong className="text-slate-900 dark:text-white">{loading ? '…' : total}</strong> articles</p>
                    </div>

                    {error && !loading && <div role="alert" className="mb-5 rounded-2xl border border-red-200 bg-white p-5 text-sm text-red-600 dark:border-red-900 dark:bg-gray-900">{error}<button onClick={() => fetchBlogs(1)} className="ml-3 font-bold underline">Try again</button></div>}

                    <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-7">
                        <section className="min-w-0 space-y-5 lg:col-span-8" aria-label="Interview Articles">
                            {loading ? (
                                <div className="grid gap-4 sm:grid-cols-2">{[...Array(5)].map((_, index) => <SkeletonBlogCard key={index} />)}</div>
                            ) : !error && !blogs.length ? (
                                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900"><BookOpen className="mx-auto mb-3 h-10 w-10 text-slate-300" /><h2 className="font-bold text-slate-900 dark:text-white">No articles found</h2><p className="mt-1 text-sm text-slate-500">Try a different topic or search.</p></div>
                            ) : featured ? (
                                <>
                                    <button type="button" onClick={() => go(featured.slug)} className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900 md:min-h-[250px] md:grid-cols-2">
                                        <div className="relative flex min-h-56 flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-600 to-sky-500 p-5 text-white sm:p-6">
                                            <div aria-hidden="true" className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.8) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
                                            <div className="absolute -bottom-16 -right-12 h-52 w-52 rounded-full bg-white/15" />
                                            <div className="relative flex items-center justify-between">
                                                <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.18em]"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-slate-900"><BookOpen className="h-4 w-4" /></span> Interview article</span>
                                                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-blue-700">Featured</span>
                                            </div>
                                            <div className="relative"><p className="text-3xl font-extrabold sm:text-4xl">{featured.category || 'Interview tips'}</p><div className="mt-5 flex gap-2"><span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-900">{featured.difficulty || 'Beginner'}</span><span className="rounded-full bg-black/20 px-3 py-1 text-[11px] font-semibold">{featured.readTime || 8} min read</span></div></div>
                                        </div>
                                        <div className="flex flex-col justify-center p-5 sm:p-6">
                                            <p className="mb-2 text-xs font-bold text-blue-700 dark:text-blue-300">{featured.category || 'Interview tips'} · {featured.difficulty || 'Beginner'}</p>
                                            <h2 className="text-xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-2xl">{featured.title}</h2>
                                            <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-600 dark:text-gray-300">{featured.excerpt || featured.content?.replace(/<[^>]*>/g, '').slice(0, 180)}</p>
                                            <p className="mt-3 text-xs text-slate-500 dark:text-gray-400">By {featured.author || 'TheJobInfo Team'} · {featured.readTime || 8} min read</p>
                                        </div>
                                    </button>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {remaining.map((blog, index) => <BlogCard key={blog._id} blog={blog} index={index + 1} variant="guide" onClick={() => go(blog.slug)} />)}
                                    </div>
                                </>
                            ) : null}

                            {total > LIMIT && !loading && !error && <nav className="flex justify-center gap-2 pt-2" aria-label="Guide pages">
                                {Array.from({ length: Math.min(Math.ceil(total / LIMIT), 3) }, (_, index) => index + 1).map(number => <button key={number} type="button" onClick={() => goToPage(number)} aria-current={page === number ? 'page' : undefined} className={`h-10 min-w-10 rounded-xl border px-3 text-sm font-bold ${page === number ? 'border-transparent bg-gradient-to-r from-blue-600 to-emerald-600 text-white' : 'border-slate-200 bg-white text-slate-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200'}`}>{number}</button>)}
                                {Math.ceil(total / LIMIT) > 3 && <span className="px-2 py-2 text-sm text-slate-500">…</span>}
                                <button type="button" disabled={page >= Math.ceil(total / LIMIT)} onClick={() => goToPage(page + 1)} className="rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">Next</button>
                            </nav>}
                        </section>

                        <aside className="space-y-4 lg:col-span-4">
                            <SocialFollowCard />
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                                <h2 className="mb-3 text-base font-extrabold text-slate-900 dark:text-white">Popular articles</h2>
                                <div className="space-y-3">{blogs.slice(1, 5).map(blog => <button key={blog._id} onClick={() => go(blog.slug)} className="block text-left text-sm font-semibold leading-5 text-slate-800 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300">{blog.title}</button>)}</div>
                                {!blogs.length && <p className="text-sm text-slate-500">New articles will appear here.</p>}
                            </section>
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Looking for a job?</h2><p className="mt-1 text-sm leading-5 text-slate-600 dark:text-gray-300">Browse current openings for freshers and professionals.</p>
                                <button onClick={() => navigate('/Job-Portal')} className="mt-3 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-blue-700 hover:bg-blue-50 dark:border-gray-700 dark:text-blue-300 dark:hover:bg-gray-800">View jobs</button>
                            </section>
                            <AdSlot name="blogSidebar" />
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
