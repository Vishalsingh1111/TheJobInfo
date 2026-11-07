

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
import JobLocationLinks from "./JobLocationLinks";
import JobCategoryLinks from "./JobCategoryLinks";
import JobCategoryTabs from "./JobCategoryTabs";
import AdSlot from "../AdSlot";
import JobPrepFaq from "./JobPrepFaq";
import usePaginatedJobs from "./usePaginatedJobs";

const PAGE_SIZE = 6;

// ── Helper: navigate using slug, fallback to _id ─────────────────────────────
const getJobPath = (job) => {
    const identifier = job.slug || job._id;
    return `/jobdetail/${identifier}`;
};

const Jobboard = () => {
    const [stats, setStats] = useState(null);
    const [statsError, setStatsError] = useState(false);

    const {
        search, setSearch, filterCategory, setFilterCategory,
        filterType, setFilterType, filterLocation, setFilterLocation,
        filterSalary, setFilterSalary, filterExp, setFilterExp,
        sortBy, setSortBy, isFiltered,
    } = useJobPageFilters({ includeType: true });

    const navigate = useNavigate();
    const {
        jobs: data, total, loading, refreshing, loadingMore, hasMore, loadMore, error,
    } = usePaginatedJobs({
        search, category: filterCategory, type: filterType, location: filterLocation,
        salary: filterSalary, experience: filterExp, sort: sortBy,
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
    const activeCount = getLevelJobCount(stats, 'all');
    const recentCount = getRecentLevelJobCount(stats, 'all');
    useSeo({ title: "All Jobs", description: "Browse current job listings across experience levels and locations.", robots: total && !isFiltered ? "index, follow" : "noindex, follow" });

    const go = (job) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(getJobPath(job));
    };

    const selectLocation = (location) => {
        setFilterLocation(location);
        document.getElementById('job-page-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f3f8fb] dark:bg-gray-950">
            <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6">
                <Breadcrumb />

                {/* ── Hero ── */}
                <div className="page-hero-enter text-center mb-8 pt-2">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                        Latest{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                            Job Openings
                        </span>
                    </h1>
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Browse currently listed roles across experience levels and locations.
                    </p>
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        {stats ? `${activeCount} active jobs · ${recentCount} added in the last 48 hours` : statsError ? "Job counts are temporarily unavailable." : "Loading job counts…"}
                    </p>
                </div>

                {/* ── Category Tabs ── */}
                <JobCategoryTabs />

                {/* ── Filters ── */}
                <div className="mb-6">
                    <FilterBar
                        search={search} setSearch={setSearch}
                        filterCategory={filterCategory} setFilterCategory={setFilterCategory}
                        filterType={filterType} setFilterType={setFilterType}
                        filterLocation={filterLocation} setFilterLocation={setFilterLocation}
                        filterSalary={filterSalary} setFilterSalary={setFilterSalary}
                        filterExp={filterExp} setFilterExp={setFilterExp}
                        sortBy={sortBy} setSortBy={setSortBy}
                        locationOptions={locationOptions}
                        accentColor="teal"
                    />
                </div>

                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                <section className="lg:col-span-8">
                {/* ── Results count ── */}
                <div id="job-page-results" className="flex items-center justify-between mb-6 scroll-mt-24">
                    <p className="text-base font-medium text-gray-600 dark:text-gray-400">
                        Showing <span className="font-bold text-gray-900 dark:text-white">{visible.length}</span> of{' '}
                        <span className="font-bold text-gray-900 dark:text-white">{total}</span> jobs
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
                        <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No jobs found</h3>
                        <p className="text-base font-medium text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
                        <JobCategoryLinks />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                            {visible.map((item, index) => (
                                <Jobcard
                                    key={item._id}
                                    item={item}
                                    index={index}
                                    onClick={() => go(item)}
                                />
                            ))}
                        </div>
                        {!isFiltered && visible.length > 0 && <AdSlot name="jobList" />}

                        {/* Show More / Show Less */}
                        <div className="flex justify-center pb-4">
                            {hasMore && (
                                <button
                                    onClick={loadMore}
                                    disabled={loadingMore || refreshing}
                                    className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-2xl text-base font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                                >
                                    {loadingMore ? "Loading…" : "Show More Jobs"} <ChevronDown className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </>
                )}
                </section>
                <div className="lg:col-span-4">
                    <JobLocationLinks
                        jobs={data}
                        selectedLocation={filterLocation}
                        onSelect={selectLocation}
                        selectedCategory={filterCategory}
                        onSelectCategory={setFilterCategory}
                        byCity={stats?.byCity}
                        byCategory={stats?.byCategory}
                    />
                </div>
                <div className="lg:col-span-8 lg:col-start-1">
                    <JobPrepFaq level="all" />
                </div>
                </div>
            </div>

        </div>
    );
};

export default Jobboard;
