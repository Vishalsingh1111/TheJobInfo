import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ChevronDown, Filter } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { baseUrl } from "../../Baseurl";
import { siteConfig } from "../../siteConfig";
import { useSeo } from "../../hooks/useSeo";
import { jobListFaqs } from "../../Content/faqs";
import { prepGuides } from "../../Content/prepGuides";

const pageConfig = {
    all: { title: "All jobs", label: "Jobs", level: "" },
    fresher: { title: "Fresher jobs", label: "Fresher jobs", level: "fresher" },
    experienced: { title: "Experienced jobs", label: "Experienced jobs", level: "experienced" },
    internship: { title: "Internships", label: "Internships", level: "internship" },
};

export default function JobListPage({ level = "all" }) {
    const config = pageConfig[level] || pageConfig.all;
    const [searchParams, setSearchParams] = useSearchParams();
    const queryString = searchParams.toString();
    const [searchText, setSearchText] = useState(searchParams.get("q") || "");
    const [data, setData] = useState({ jobs: [], total: 0, page: 1, pages: 0 });
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const filters = useMemo(() => Object.fromEntries(new URLSearchParams(queryString)), [queryString]);
    const faqSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: jobListFaqs.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
        })),
    }), []);
    const guide = prepGuides[level] || prepGuides.fresher;
    const activeFilterCount = [
        Boolean(searchText.trim()),
        ...["city", "workMode", "category", "company", "experience", "salary"].map((key) => Boolean(filters[key])),
        Boolean(filters.sort && filters.sort !== "newest"),
    ].filter(Boolean).length;
    useSeo({
        title: config.title,
        description: `${config.label} in India. Review job requirements and apply on the employer's website.`,
        canonical: `${siteConfig.url}${window.location.pathname}`,
        robots: data.jobs.length === 0 || filters.q ? "noindex, follow" : "index, follow",
        jsonLd: [faqSchema, {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: config.title,
            url: `${siteConfig.url}${window.location.pathname}`,
        }],
    });

    useEffect(() => {
        axios.get(`${baseUrl}/job/stats`)
            .then(({ data: response }) => setStats(response))
            .catch((requestError) => console.error("Could not load filter statistics:", requestError.message));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            const next = new URLSearchParams(queryString);
            if (searchText.trim()) next.set("q", searchText.trim());
            else next.delete("q");
            next.delete("page");
            if (next.toString() !== searchParams.toString()) setSearchParams(next);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchText, queryString, setSearchParams]);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await axios.get(`${baseUrl}/job`, {
                    params: { ...filters, ...(config.level ? { level: config.level } : {}), page: filters.page || 1, limit: 12 },
                });
                if (!cancelled) setData(response.data);
            } catch (requestError) {
                if (!cancelled) setError(requestError.response?.data?.error || "Could not load jobs. Please try again.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true; };
    }, [queryString, config.level]);

    const updateFilter = (key, value) => {
        const next = new URLSearchParams(searchParams);
        if (value) next.set(key, value);
        else next.delete(key);
        next.delete("page");
        setSearchParams(next);
    };
    const categories = [...new Set(data.jobs.map((job) => job.category).filter(Boolean))].sort();
    const companies = [...new Set(data.jobs.map((job) => job.company).filter(Boolean))].sort();

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-24">
                <div className="max-w-6xl mx-auto">
                    <header className="page-hero-enter">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{config.title}</h1>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">Browse current listings and review each employer's details before applying.</p>
                    </header>
                    <details className="group mt-6 rounded-xl border border-slate-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-700 marker:hidden dark:text-gray-300 [&::-webkit-details-marker]:hidden">
                            <span className="flex items-center gap-2">
                                <Filter aria-hidden="true" className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Filters and sorting
                                {activeFilterCount > 0 && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">{activeFilterCount} active</span>}
                            </span>
                            <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                        </summary>
                        <section className="grid gap-3 border-t border-slate-100 p-4 dark:border-gray-800 md:grid-cols-3 lg:grid-cols-4" aria-label="Job filters">
                            <label className="text-sm">Search
                                <input className="mt-1 w-full rounded border p-2 dark:bg-gray-900" value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Title or company" />
                            </label>
                            <label className="text-sm">City
                                <select className="mt-1 w-full rounded border p-2 dark:bg-gray-900" value={filters.city || ""} onChange={(event) => updateFilter("city", event.target.value)}>
                                    <option value="">All cities</option>
                                    {(stats?.byCity || []).map(({ city }) => <option key={city} value={city}>{city}</option>)}
                                </select>
                            </label>
                            <label className="text-sm">Work mode
                                <select className="mt-1 w-full rounded border p-2 dark:bg-gray-900" value={filters.workMode || ""} onChange={(event) => updateFilter("workMode", event.target.value)}>
                                    <option value="">Any</option><option>Onsite</option><option>Hybrid</option><option>Remote</option>
                                </select>
                            </label>
                            <label className="text-sm">Category
                                <select className="mt-1 w-full rounded border p-2 dark:bg-gray-900" value={filters.category || ""} onChange={(event) => updateFilter("category", event.target.value)}>
                                    <option value="">Any category</option>{categories.map((category) => <option key={category}>{category}</option>)}
                                </select>
                            </label>
                            <label className="text-sm">Company
                                <select className="mt-1 w-full rounded border p-2 dark:bg-gray-900" value={filters.company || ""} onChange={(event) => updateFilter("company", event.target.value)}>
                                    <option value="">Any company</option>{companies.map((company) => <option key={company}>{company}</option>)}
                                </select>
                            </label>
                            <label className="text-sm">Experience contains
                                <input className="mt-1 w-full rounded border p-2 dark:bg-gray-900" value={filters.experience || ""} onChange={(event) => updateFilter("experience", event.target.value)} placeholder="e.g. 0-2 years" />
                            </label>
                            <label className="text-sm">Salary
                                <select className="mt-1 w-full rounded border p-2 dark:bg-gray-900" value={filters.salary || ""} onChange={(event) => updateFilter("salary", event.target.value)}>
                                    <option value="">Any</option><option value="disclosed">Salary disclosed</option>
                                </select>
                            </label>
                            <label className="text-sm">Sort
                                <select className="mt-1 w-full rounded border p-2 dark:bg-gray-900" value={filters.sort || "newest"} onChange={(event) => updateFilter("sort", event.target.value)}>
                                    <option value="newest">Newest</option><option value="oldest">Oldest</option><option value="title">Title</option>
                                </select>
                            </label>
                        </section>
                    </details>

                    <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">{data.total} active job{data.total === 1 ? "" : "s"}</p>
                    {error && <p role="alert" className="mt-4 text-red-600">{error}</p>}
                    {loading ? <p className="py-12">Loading jobs…</p> : (
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                            {data.jobs.map((job) => (
                                <article key={job._id} className="rounded-xl border bg-white p-5 dark:bg-gray-900">
                                    <h2 className="text-xl font-semibold"><Link className="hover:underline" to={`/jobdetail/${job.slug || job._id}`}>{job.title}</Link></h2>
                                    <p className="mt-1 text-gray-600 dark:text-gray-300">{job.company}</p>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{[job.city, job.workMode, job.experience].filter(Boolean).join(" · ")}</p>
                                    <p className="mt-3 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{job.summary || job.description}</p>
                                    <Link className="mt-4 inline-block text-teal-700 underline" to={`/jobdetail/${job.slug || job._id}`}>View job details</Link>
                                </article>
                            ))}
                        </div>
                    )}
                    {!loading && !data.jobs.length && <p className="mt-8">No jobs match these filters. Try removing a filter.</p>}
                    {data.pages > 1 && (
                        <nav className="mt-8 flex justify-center gap-4" aria-label="Job pages">
                            <button disabled={data.page <= 1} onClick={() => updateFilter("page", String(data.page - 1))}>Previous</button>
                            <span>Page {data.page} of {data.pages}</span>
                            <button disabled={data.page >= data.pages} onClick={() => updateFilter("page", String(data.page + 1))}>Next</button>
                        </nav>
                    )}

                    <section className="mt-12 rounded-xl bg-white p-6 dark:bg-gray-900">
                        <h2 className="text-2xl font-semibold">{guide.title}</h2>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">{guide.intro}</p>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-300">{guide.steps.map((step) => <li key={step}>{step}</li>)}</ul>
                    </section>
                    <section className="mt-12" aria-labelledby="job-faqs-heading">
                        <h2 id="job-faqs-heading" className="text-2xl font-semibold">Job search FAQs</h2>
                        <div className="mt-4 space-y-3">{jobListFaqs.map(({ question, answer }) => <details key={question} className="rounded-lg bg-white p-4 dark:bg-gray-900"><summary className="cursor-pointer font-semibold">{question}</summary><p className="mt-2 text-gray-600 dark:text-gray-300">{answer}</p></details>)}</div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
