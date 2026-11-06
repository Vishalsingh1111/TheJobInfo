import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Compass, MapPin, ShieldCheck } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { baseUrl } from "../../Baseurl";
import { siteConfig } from "../../siteConfig";
import { useSeo } from "../../hooks/useSeo";

const About = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axios.get(`${baseUrl}/job/stats`)
            .then(({ data }) => setStats(data))
            .catch((error) => console.error("Could not load live job statistics:", error.message));
    }, []);

    const faqs = [
        ["Does TheJobInfo recruit candidates?", "No. TheJobInfo shares job information. Applications are submitted to the employer, and hiring decisions are made by that employer."],
        ["Does it cost anything to apply through TheJobInfo?", "TheJobInfo does not charge candidates to browse listings. Do not pay a person who claims they can guarantee a job or interview."],
        ["How are listings collected?", "Listings may be added by an administrator or collected from a third-party job feed. Check the employer's own application page for current details before applying."],
    ];
    useSeo({
        title: "About",
        description: "Who runs TheJobInfo, how listings are collected, and how candidates can use the site safely.",
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(([question, answer]) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
            })),
        },
    });

    return (
        <>
            <Navbar />
            <main className="min-h-screen overflow-hidden bg-[#f3f8fb] pt-20 dark:bg-gray-950">
                <section className="page-hero-enter relative isolate">
                    <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pt-14">
                        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="max-w-2xl">
                                <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 shadow-sm dark:border-blue-800 dark:bg-slate-900/80 dark:text-blue-300">
                                    <Compass className="h-3.5 w-3.5" /> About TheJobInfo
                                </span>
                                <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-5xl">
                                    Find your next <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">opportunity.</span>
                                </h1>
                                <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
                                    A job-discovery and career-guidance website sharing fresher, experienced, and internship listings—with clear links to employer application pages.
                                </p>
                                <div className="mt-7 flex flex-wrap gap-3">
                                <Link to="/Job-Portal" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:shadow-xl">
                                    Explore jobs <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link to="/Contact" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:border-teal-200 hover:text-teal-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-teal-800 dark:hover:text-teal-300">
                                    Contact us
                                </Link>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white/80 p-6 shadow-xl shadow-blue-950/[0.05] backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 sm:p-8">
                                <div aria-hidden="true" className="absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-100/70 blur-3xl dark:bg-blue-800/20" />
                                <div className="relative">
                                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">A clearer way to explore work</p>
                                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Useful information. Direct applications.</h2>
                                    <div className="mt-6 space-y-3">
                                        {[
                                            ["Job discovery", "Browse opportunities for freshers, experienced candidates, and interns."],
                                            ["Career guidance", "Explore preparation resources alongside job information."],
                                            ["Employer applications", "Follow the original application link to confirm details and apply."],
                                        ].map(([title, description], index) => (
                                            <div key={title} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white/80 p-3.5 dark:border-gray-800 dark:bg-gray-950/60">
                                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-extrabold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">{String(index + 1).padStart(2, "0")}</span>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{title}</p>
                                                    <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {[
                                { icon: BriefcaseBusiness, label: "Active job listings", value: stats ? stats.total.toLocaleString() : "Explore opportunities" },
                                { icon: Compass, label: "Hiring companies", value: stats ? stats.distinctCompanies.toLocaleString() : "Across industries" },
                                { icon: MapPin, label: "Based in", value: siteConfig.location },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <p className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">{value}</p>
                                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <section className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-xl shadow-slate-900/[0.04] dark:border-gray-800 dark:bg-gray-900 sm:p-8">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-white"><Compass className="h-5 w-5" /></div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-600 dark:text-teal-300">Our approach</p>
                                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">How we work</h2>
                            </div>
                        </div>
                        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                            TheJobInfo is run by {siteConfig.founder} in {siteConfig.location}. Listings can be submitted by an administrator or imported from a job feed. We share the information available to us and direct applicants to the employer; vacancies and requirements can change after publication.
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
                            Some job summaries and preparation guides are AI-assisted using details from the source posting. They are editorial guidance, not employer-authored requirements; confirm important facts on the employer's current posting and report inaccuracies to us.
                        </p>
                        <div className="mt-6 space-y-3">
                            {[
                                "We are a job-information platform, not a recruiter.",
                                "Employers manage applications and make hiring decisions.",
                                "Review the employer's current posting before sharing personal information.",
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/70">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">{item}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                            Report inaccurate or closed listings through our <Link className="font-semibold text-teal-700 underline decoration-teal-300 underline-offset-4 dark:text-teal-300" to="/Contact">contact page</Link>. Advertising may support the site if enabled; it does not provide guaranteed placement.
                        </p>
                    </section>

                    <section className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-xl shadow-slate-900/[0.04] dark:border-gray-800 dark:bg-gray-900 sm:p-8" aria-labelledby="about-faqs">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white"><ShieldCheck className="h-5 w-5" /></div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-600 dark:text-teal-300">Good to know</p>
                                <h2 id="about-faqs" className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Frequently asked</h2>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {faqs.map(([question, answer]) => (
                                <details key={question} className="group rounded-xl border border-gray-200 bg-gray-50/70 p-4 transition-colors open:border-teal-200 open:bg-teal-50/50 dark:border-gray-700 dark:bg-gray-800/60 dark:open:border-teal-900 dark:open:bg-teal-950/20">
                                    <summary className="cursor-pointer list-none pr-5 font-semibold leading-relaxed text-gray-900 marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-gray-100">
                                        {question}
                                    </summary>
                                    <p className="mt-3 border-t border-gray-200 pt-3 text-sm leading-relaxed text-gray-600 dark:border-gray-700 dark:text-gray-300">{answer}</p>
                                </details>
                            ))}
                        </div>
                        <p className="mt-6 border-t border-gray-100 pt-4 text-xs leading-relaxed text-gray-500 dark:border-gray-800 dark:text-gray-400">
                            Founder and editor: {siteConfig.founder}. <a className="font-semibold text-teal-700 underline underline-offset-2 dark:text-teal-300" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default About;
