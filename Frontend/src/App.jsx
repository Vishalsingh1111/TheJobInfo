
import React, { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Routes, Route, Link, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { useSeo } from './hooks/useSeo';
import { baseUrl } from './Baseurl';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ConsentNotice from './components/ConsentNotice';
import refreshCurrentPage from './components/Common/refreshCurrentPage';

const Home = lazy(() => import('../src/Home/Home'));
const About = lazy(() => import('./components/Common/Whatweoffer'));
const Contact = lazy(() => import('./Contacts/Contact'));
const Pagenotfound = lazy(() => import('./components/Common/Pagenotfound'));
const Techblog = lazy(() => import('./components/Jobs/Jobblog'));
const BlogDetail = lazy(() => import('./components/Jobs/Jobsdetail'));
const Contactform = lazy(() => import('./Contacts/Contactform'));
const PrivacyPolicy = lazy(() => import('./components/Common/Privacy&Policy'));
const TermsAndConditions = lazy(() => import('./components/Common/TermsCondition'));
const BlogPage = lazy(() => import('./components/Blogs/BlogPage'));
const BlogDetails = lazy(() => import('./components/Blogs/BlogDetail'));
const Technicalblog = lazy(() => import('./Content/Technicalblog'));
const CityJobsPage = lazy(() => import('./components/Jobs/CityJobsPage'));
const FresherJobs = lazy(() => import('./components/Jobs/Fresherjob'));
const ExperiencedJobs = lazy(() => import('./components/Jobs/Experiencedjob'));
const InternshipJobs = lazy(() => import('./components/Jobs/Internship'));
function SeoRoute({ children, ...metadata }) {
  useSeo(metadata);
  return children;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function SamePageRefreshHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    const handleClick = (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      const anchor = target instanceof Element ? target.closest('a[href]') : null;
      if (!anchor || anchor.target && anchor.target !== '_self' || anchor.hasAttribute('download')) return;

      const destination = new URL(anchor.href, window.location.href);
      const currentPath = pathname.replace(/\/+$/, '').toLowerCase() || '/';
      const destinationPath = destination.pathname.replace(/\/+$/, '').toLowerCase() || '/';
      if (destination.origin !== window.location.origin || destinationPath !== currentPath) return;
      if (destination.hash && destination.hash !== window.location.hash) return;

      event.preventDefault();
      refreshCurrentPage();
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname]);

  return null;
}

function ResetJobPageFilters() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const previousPathname = useRef(null);

  useEffect(() => {
    const pathChanged = previousPathname.current !== pathname;
    previousPathname.current = pathname;
    if (!pathChanged) return;

    const jobListingPaths = ['/job-portal', '/fresher-jobs', '/experienced-jobs', '/internships'];
    if (!jobListingPaths.includes(pathname.replace(/\/+$/, '').toLowerCase())) return;

    const next = new URLSearchParams(searchParams);
    ['q', 'category', 'type', 'location', 'salary', 'experience', 'sort'].forEach((key) => next.delete(key));
    if (next.toString() !== searchParams.toString()) setSearchParams(next, { replace: true });
  }, [pathname, searchParams, setSearchParams]);

  return null;
}

function EditorialPolicy() {
  const editorialStandards = [
    { title: "What we publish", text: "TheJobInfo publishes job listings and career guidance to help readers evaluate opportunities. We are not a recruiter and do not make hiring decisions." },
    { title: "Job listings", text: "Listings may be submitted by an administrator or imported from a third-party feed. We aim to provide useful details and an employer application link, but vacancies and requirements can change. Readers should review the employer's current posting before applying." },
    { title: "Corrections and reports", text: <>Please use the <Link className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 dark:text-blue-300" to="/Contact">contact page</Link> to report inaccurate, expired, or suspicious information. We review reports and update or remove listings where appropriate.</> },
    { title: "Career content", text: "Guides should distinguish general preparation advice from employer-specific requirements. We do not invent statistics, quotes, salary details, or hiring outcomes. Draft material is not treated as published advice until reviewed." },
  ];

  return (
    <div>
      <SeoRoute title="Editorial Policy" description="How TheJobInfo reviews job listings and career guidance." />
      <Navbar />
      <main className="min-h-screen bg-[#f3f8fb] pb-16 pt-20 dark:bg-slate-950">
        <header className="page-hero-enter relative isolate overflow-hidden border-b border-blue-100/80 bg-[#f3f8fb] dark:border-gray-800 dark:bg-gray-950">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <span className="inline-flex rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:border-blue-800 dark:bg-slate-900/80 dark:text-blue-300">Our standards</span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-5xl">Editorial <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">policy</span></h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">How we publish job information and career guidance—and how readers can report an issue.</p>
          </div>
        </header>
        <div className="mx-auto grid min-w-0 max-w-6xl gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:sticky lg:top-24">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">Our approach</p>
            <nav aria-label="Editorial policy sections" className="flex min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
              {editorialStandards.map(({ title }, index) => (
                <a key={title} href={`#editorial-standard-${index}`} className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-300">{title}</a>
              ))}
            </nav>
            <div className="mt-5 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/30">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Reader feedback matters</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">Tell us when a listing needs an update or a guide needs correction.</p>
              <Link to="/Contact" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:underline dark:text-blue-300">Contact us <span aria-hidden="true">→</span></Link>
            </div>
          </aside>
          <article className="min-w-0 space-y-5">
            {editorialStandards.map(({ title, text }, index) => (
              <section key={title} id={`editorial-standard-${index}`} className="scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-extrabold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
                    <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">{text}</p>
                  </div>
                </div>
              </section>
            ))}
            <p className="px-1 pt-1 text-sm text-gray-500 dark:text-gray-400">Last reviewed: 31 October 2026</p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const App = () => {
  const [pageRefreshKey, setPageRefreshKey] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const trackingKey = 'visitor-counted-date';
    const today = new Date().toISOString().slice(0, 10);
    let markerSaved = false;
    try {
      if (localStorage.getItem(trackingKey) === today) return;
      localStorage.setItem(trackingKey, today);
      markerSaved = true;
    } catch (error) {
      console.error('Could not access daily visitor tracking storage:', error);
    }

    axios.post(`${baseUrl}/visitor`).catch((error) => {
      if (markerSaved) {
        try {
          localStorage.removeItem(trackingKey);
        } catch (storageError) {
          console.error('Could not clear daily visitor tracking storage:', storageError);
        }
      }
      console.error('Could not record this visit:', error);
    });
  }, []);

  useEffect(() => {
    const refreshCurrentPage = () => setPageRefreshKey((key) => key + 1);
    window.addEventListener('app:refresh-current-page', refreshCurrentPage);
    return () => window.removeEventListener('app:refresh-current-page', refreshCurrentPage);
  }, []);

  return (
    <>
      <div className='dark:bg-slate-900 dark:text-white'>
        <ScrollToTop />
        <SamePageRefreshHandler />
        <ResetJobPageFilters />
        <div key={pathname} className="page-enter site-theme">
          <Suspense fallback={<div className="p-8 text-center" role="status">Loading page...</div>}>
            <Routes key={pageRefreshKey}>
              <Route path="/" element={<Home />} />
              <Route path="/Contact" element={<SeoRoute title="Contact"><Contact /></SeoRoute>} />
              <Route path="/About" element={<About />} />
              <Route path='/Editorial-Policy' element={<EditorialPolicy />} />
              <Route path='/Contactform' element={<SeoRoute title="Contact"><Contactform /></SeoRoute>} />
              <Route path='/Pagenotfound' element={<SeoRoute title="Page not found" description="The requested page could not be found." robots="noindex, follow"><Pagenotfound /></SeoRoute>} />
              <Route path='/Job-Portal' element={<Technicalblog />} />
              <Route path='/jobs' element={<Navigate to="/Job-Portal" replace />} />
              <Route path='/techblog' element={<SeoRoute title="Technical Interview Guides"><Techblog /></SeoRoute>} />
              <Route path='/Fresher-Jobs' element={<SeoRoute title="Fresher Jobs"><FresherJobs /></SeoRoute>} />
              <Route path='/Experienced-Jobs' element={<SeoRoute title="Experienced Jobs"><ExperiencedJobs /></SeoRoute>} />
              <Route path='/Internships' element={<SeoRoute title="Internships"><InternshipJobs /></SeoRoute>} />
              <Route path='/jobdetail/:slug' element={<BlogDetail />} />
              <Route path='/privacy-policy' element={<SeoRoute title="Privacy Policy"><PrivacyPolicy /></SeoRoute>} />
              <Route path='/terms' element={<SeoRoute title="Terms"><TermsAndConditions /></SeoRoute>} />
              <Route path='/blogs' element={<SeoRoute title="Interview Articles"><BlogPage /></SeoRoute>} />
              <Route path='/blogs/:slug' element={<BlogDetails />} />
              <Route path='/jobs-in-:city' element={<CityJobsPage />} />
              <Route path='/fresher-jobs-in-:city' element={<CityJobsPage fresherOnly />} />
              <Route path='*' element={<SeoRoute title="Page not found" description="The requested page could not be found." robots="noindex, follow"><Pagenotfound /></SeoRoute>} />
            </Routes>
          </Suspense>
        </div>
        <Toaster />
        <ConsentNotice />
      </div>
    </>
  );
}

export default App;
