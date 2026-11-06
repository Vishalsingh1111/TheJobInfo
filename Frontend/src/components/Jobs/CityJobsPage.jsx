import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Breadcrumb from "../Common/Breadcrumb";
import Jobcard from "./Jobscard";
import SocialFollowCard from "../Common/SocialFollowCard";
import AdSlot from "../AdSlot";
import { baseUrl } from "../../Baseurl";
import { siteConfig } from "../../siteConfig";
import { useSeo } from "../../hooks/useSeo";

const cityName = (slug = "") => slug.split("-").map((part) => part ? part[0].toUpperCase() + part.slice(1) : "").join(" ");

export default function CityJobsPage({ fresherOnly = false }) {
    const { city: citySlug } = useParams();
    const navigate = useNavigate();
    const city = cityName(citySlug);
    const [jobs, setJobs] = useState([]);
    const [total, setTotal] = useState(0);
    const [cities, setCities] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useSeo({
        title: `${fresherOnly ? "Fresher jobs" : "Jobs"} in ${city}`,
        description: `Browse current ${fresherOnly ? "fresher " : ""}job listings in ${city}. Check the employer's application page for current requirements.`,
        canonical: `${siteConfig.url}${window.location.pathname}`,
        robots: total < 3 ? "noindex, follow" : "index, follow",
        jsonLd: { "@context": "https://schema.org", "@type": "CollectionPage", name: `Jobs in ${city}` },
    });

    useEffect(() => {
        let cancelled = false;
        Promise.all([
            axios.get(`${baseUrl}/job`, { params: { page: 1, limit: 100, city, ...(fresherOnly ? { level: "fresher" } : {}) } }),
            axios.get(`${baseUrl}/job/stats`),
        ]).then(([jobResponse, statsResponse]) => {
            if (cancelled) return;
            setJobs(jobResponse.data.jobs || []);
            setTotal(jobResponse.data.total || 0);
            setCities(statsResponse.data.byCity || []);
        }).catch((requestError) => {
            if (!cancelled) setError(requestError.response?.data?.error || "Could not load city listings.");
        }).finally(() => {
            if (!cancelled) setLoading(false);
        });
        return () => { cancelled = true; };
    }, [city, fresherOnly]);

    const topCompanies = [...new Set(jobs.map((job) => job.company).filter(Boolean))].slice(0, 5);
    const commonRoles = [...new Set(jobs.map((job) => job.category).filter(Boolean))].slice(0, 5);
    const relatedCities = cities.filter((entry) => entry.city !== city && entry.city !== "Other").slice(0, 5);

    return (
        <>
            <Navbar />
            <main className="relative min-h-screen overflow-hidden bg-[#f3f8fb] dark:bg-gray-950">
                <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6">
                    <Breadcrumb />
                    <header className="page-hero-enter mb-8 pt-3">
                        <p className="text-sm font-bold uppercase tracking-[.16em] text-blue-700 dark:text-blue-300">{fresherOnly ? "Fresher opportunities" : "Local opportunities"}</p>
                        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{fresherOnly ? `Fresher jobs in ${city}` : `Jobs in ${city}`}</h1>
                                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-gray-300">Browse current openings in {city}. Review the employer’s requirements and application page before applying.</p>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-500" />{total} active listing{total === 1 ? "" : "s"}</span>
                        </div>
                        {(topCompanies.length > 0 || commonRoles.length > 0) && <p className="mt-4 text-sm text-slate-500 dark:text-gray-400">{topCompanies.length ? `Hiring companies: ${topCompanies.join(", ")}` : ""}{topCompanies.length && commonRoles.length ? " · " : ""}{commonRoles.length ? `Categories: ${commonRoles.join(", ")}` : ""}</p>}
                    </header>

                    <div className="grid items-start gap-7 lg:grid-cols-12">
                        <section className="min-w-0 lg:col-span-8" aria-label={`Job listings in ${city}`}>
                            {error && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
                            {loading ? <div className="grid gap-5 md:grid-cols-2">{[0, 1, 2, 3].map((placeholder) => <div key={placeholder} className="h-[390px] animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-gray-800 dark:bg-gray-900" />)}</div> : jobs.length ? <div className="grid gap-5 md:grid-cols-2">{jobs.map((job, index) => <Jobcard key={job._id} item={job} index={index} onClick={() => navigate(`/jobdetail/${job.slug || job._id}`)} />)}</div> : !error ? <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center dark:border-gray-800 dark:bg-gray-900"><h2 className="text-xl font-bold text-slate-900 dark:text-white">No current listings in {city}</h2><p className="mt-2 text-sm text-slate-600 dark:text-gray-300">Check all current openings or explore another city.</p><Link className="mt-5 inline-flex rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800" to="/Job-Portal">Browse all jobs</Link></div> : null}
                            {total > jobs.length && <Link className="mt-6 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-blue-700 hover:border-blue-300 dark:border-gray-700 dark:bg-gray-900 dark:text-blue-300" to="/Job-Portal">View all matching listings</Link>}
                        </section>

                        <aside className="space-y-5 lg:col-span-4">
                            <SocialFollowCard />
                            {relatedCities.length > 0 && <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"><h2 className="text-base font-extrabold text-slate-900 dark:text-white">Explore other cities</h2><div className="mt-4 flex flex-wrap gap-2">{relatedCities.map(({ city: name }) => <Link key={name} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-blue-700" to={`${fresherOnly ? "/fresher-jobs-in-" : "/jobs-in-"}${name.toLowerCase().replace(/\s+/g, "-")}`}>{name}</Link>)}</div></section>}
                            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/60 dark:bg-amber-950/20"><h2 className="text-base font-extrabold text-amber-950 dark:text-amber-200">Apply safely</h2><p className="mt-2 text-sm leading-6 text-amber-900/80 dark:text-amber-100/80">Confirm availability and submit your application on the employer’s official website. TheJobInfo never charges candidates.</p></section>
                            <AdSlot name="jobList" />
                        </aside>
                    </div>

                    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 sm:p-7"><h2 className="text-xl font-extrabold text-slate-900 dark:text-white">About these listings</h2><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-300">This page is based on current job data for {city}. Availability, salary, eligibility, and work arrangements can change; confirm all details on the employer’s application page.</p></section>
                </div>
            </main>
            <Footer />
        </>
    );
}
