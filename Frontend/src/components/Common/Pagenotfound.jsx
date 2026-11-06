import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { ArrowRight, BriefcaseBusiness, Compass } from 'lucide-react';

export default function PageNotFound() {
    return (
        <>
            <Navbar />
            <main className="relative isolate grid min-h-[70vh] place-items-center overflow-hidden bg-[#f3f8fb] px-6 py-24 dark:bg-gray-950 sm:py-32">
                <div className="page-hero-enter max-w-xl text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-emerald-600 text-white shadow-xl shadow-teal-900/20">
                        <Compass className="h-9 w-9" />
                    </div>
                    <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">404 · Page not found</p>
                    <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">This page took a wrong turn</h1>
                    <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-300">The page may have moved or the link may be incorrect. Let’s get you back to current job listings.</p>
                    <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Back to home <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link to="/Job-Portal" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:border-teal-200 hover:text-teal-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-teal-800 dark:hover:text-teal-300">
                            <BriefcaseBusiness className="h-4 w-4" /> Browse jobs
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}