

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Jobcard, { SkeletonGrid } from './Jobscard';
import FilterBar, {
    LOCATION_OPTIONS, getActiveJobLocations
} from '../Common/Filterbar';
import Breadcrumb from '../Common/Breadcrumb';
import { baseUrl } from "../../Baseurl";
import {
    ChevronDown, Search
} from "lucide-react";
import { getLevelJobCount, getRecentLevelJobCount } from '../Common/FilterHelpers';
import { useSeo } from '../../hooks/useSeo';
import useJobPageFilters from "./useJobPageFilters";
import Navbar from '../Navbar';
import Footer from '../Footer';
import JobLocationLinks from "./JobLocationLinks";
import JobCategoryLinks from "./JobCategoryLinks";
import AdSlot from "../AdSlot";
import JobPrepFaq from "./JobPrepFaq";
import JobCategoryTabs from "./JobCategoryTabs";
import usePaginatedJobs from "./usePaginatedJobs";

const PAGE_SIZE = 6;

const ExperiencedJobs = () => {
    const [stats, setStats] = useState(null);
    const [statsError, setStatsError] = useState(false);

    const {
        search, setSearch, filterCategory, setFilterCategory,
        filterLocation, setFilterLocation, filterSalary, setFilterSalary,
        filterExp, setFilterExp, sortBy, setSortBy, isFiltered,
    } = useJobPageFilters();

    const navigate = useNavigate();
    const {
        jobs: data, total, loading, refreshing, loadingMore, hasMore, loadMore, error,
    } = usePaginatedJobs({
        search, category: filterCategory, location: filterLocation, salary: filterSalary,
        experience: filterExp, sort: sortBy, level: "experienced",
    });
    useEffect(() => {
        axios.get(`${baseUrl}/job/stats`).then((response) => setStats(response.data)).catch((error) => {
            setStatsError(true);
            console.error('Could not load job counts:', error);
        });
    }, []);

    const visible = data;
    const locationOptions = useMemo(
        () => [...new Set([
            ...LOCATION_OPTIONS,
            ...getActiveJobLocations(data),
            ...(stats?.byCity || []).map(({ city }) => city),
        ])],
        [data, stats]
    );
    const activeCount = getLevelJobCount(stats, 'experienced');
    const recentCount = getRecentLevelJobCount(stats, 'experienced');
    useSeo({ title: "Experienced Jobs", description: "Browse current experienced and mid-career job listings.", robots: total && !isFiltered ? "index, follow" : "noindex, follow" });

    // ✅ FIXED: pass full job object, use slug with _id fallback
    const go = (job) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(`/jobdetail/${job.slug || job._id}`);
    };

    const selectLocation = (location) => {
        setFilterLocation(location);
        document.getElementById('job-page-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            <Navbar />
            <div className="relative min-h-screen bg-[#f3f8fb] dark:bg-gray-950">
                <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6">
                    <Breadcrumb />

                    {/* ── Hero ── */}
                    <div className="page-hero-enter text-center mb-8 pt-2">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                            Experienced{' '}
                            <span className="bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent">
                                Jobs
                            </span>
                        </h1>
                        <p className="text-lg font-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Mid-level and senior roles for experienced professionals. This page lists experienced openings.
                        </p>
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                            {stats ? `${activeCount} active experienced jobs · ${recentCount} added in the last 48 hours` : statsError ? "Job counts are temporarily unavailable." : "Loading job counts…"}
                        </p>
                    </div>

                    {/* ── Category Tabs ── */}
                    <JobCategoryTabs />

                    {/* ── Filters ── */}
                    <div className="mb-6">
                        <FilterBar
                            search={search} setSearch={setSearch}
                            filterCategory={filterCategory} setFilterCategory={setFilterCategory}
                            filterLocation={filterLocation} setFilterLocation={setFilterLocation}
                            filterSalary={filterSalary} setFilterSalary={setFilterSalary}
                            filterExp={filterExp} setFilterExp={setFilterExp}
                            sortBy={sortBy} setSortBy={setSortBy}
                            hideTypeFilter={true}
                            accentColor="blue"
                            locationOptions={locationOptions}
                        />
                    </div>

                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                    <section className="lg:col-span-8">
                    {/* ── Results count ── */}
                    <div id="job-page-results" className="flex items-center justify-between mb-6 scroll-mt-24">
                        <p className="text-base font-medium text-gray-600 dark:text-gray-400">
                            Showing <span className="font-bold text-gray-900 dark:text-white">{visible.length}</span> of{' '}
                            <span className="font-bold text-gray-900 dark:text-white">{total}</span> experienced jobs
                        </p>
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                            </span>
                            <span className="text-sm font-bold text-green-600 dark:text-green-400">Check employer page for current availability</span>
                        </div>
                    </div>

                    {/* ── Cards / Skeleton / Empty ── */}
                    {error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}
                    {refreshing && <p role="status" className="mb-3 text-sm text-gray-500">Updating results…</p>}
                    {loading ? (
                        <SkeletonGrid count={PAGE_SIZE} />
                    ) : visible.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                <Search className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No experienced jobs found</h3>
                            <p className="text-base font-medium text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
                            <JobCategoryLinks />
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                                {/* ✅ FIXED: pass item object, not item._id */}
                                {visible.map((item, index) => (
                                    <Jobcard key={item._id} item={item} index={index} onClick={() => go(item)} />
                                ))}
                            </div>
                            {!isFiltered && visible.length > 0 && <AdSlot name="jobList" />}

                            <div className="flex justify-center pb-4">
                                {hasMore && (
                                    <button
                                        onClick={loadMore}
                                        disabled={loadingMore || refreshing}
                                        className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-sky-600 text-white rounded-2xl text-base font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                                    >
                                        {loadingMore ? "Loading…" : "Show More Experienced Jobs"} <ChevronDown className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                    </section>
                    <div className="lg:col-span-4">
                        <JobLocationLinks jobs={data} selectedLocation={filterLocation} onSelect={selectLocation} categoryLabel="Experienced jobs" selectedCategory={filterCategory} onSelectCategory={setFilterCategory} byCity={stats?.byCity} byCategory={stats?.byCategory} />
                    </div>
                    <div className="lg:col-span-8 lg:col-start-1">
                        <JobPrepFaq level="experienced" />
                    </div>
                    </div>
                </div>

                <div className="fixed top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="fixed bottom-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
            </div>
            <Footer />
        </>
    );
};

export default ExperiencedJobs;
