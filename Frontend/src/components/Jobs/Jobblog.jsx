

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Jobcard, { SkeletonGrid } from './Jobscard';
import FilterBar, {
    CATEGORY_OPTIONS, JOB_TYPE_OPTIONS, LOCATION_OPTIONS, getActiveJobLocations, matchesJobLocation,
    EXPERIENCE_OPTIONS, SALARY_OPTIONS, SORT_OPTIONS
} from '../Common/Filterbar';
import Breadcrumb from '../Common/Breadcrumb';
import { baseUrl } from "../../Baseurl";
import {
    ChevronDown, ChevronUp, Search
} from "lucide-react";
import { getLevelJobCount, getRecentLevelJobCount, matchExperience, matchSalary } from '../Common/FilterHelpers';
import { useSeo } from '../../hooks/useSeo';
import useJobPageFilters from "./useJobPageFilters";
import JobLocationLinks from "./JobLocationLinks";
import JobCategoryLinks from "./JobCategoryLinks";
import JobCategoryTabs from "./JobCategoryTabs";
import AdSlot from "../AdSlot";
import JobPrepFaq from "./JobPrepFaq";

const PAGE_SIZE = 6;

// ── Helper: navigate using slug, fallback to _id ─────────────────────────────
const getJobPath = (job) => {
    const identifier = job.slug || job._id;
    return `/jobdetail/${identifier}`;
};

const Jobboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [statsError, setStatsError] = useState(false);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const {
        search, setSearch, filterCategory, setFilterCategory,
        filterType, setFilterType, filterLocation, setFilterLocation,
        filterSalary, setFilterSalary, filterExp, setFilterExp,
        sortBy, setSortBy, isFiltered,
    } = useJobPageFilters({ includeType: true });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${baseUrl}/job`)
            .then(res => setData(Array.isArray(res.data) ? res.data : []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/job/stats`).then((response) => setStats(response.data)).catch((error) => {
            setStatsError(true);
            console.error('Could not load job counts:', error);
        });
    }, []);

    useEffect(() => { setVisibleCount(PAGE_SIZE); }, [search, filterCategory, filterType, filterLocation, filterSalary, filterExp, sortBy]);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return data.filter(j => {
            const mS = !search || j.title?.toLowerCase().includes(q) || j.company?.toLowerCase().includes(q) || j.location?.toLowerCase().includes(q) || j.description?.toLowerCase().includes(q);
            const mC = filterCategory === CATEGORY_OPTIONS[0] || j.category?.toLowerCase().includes(filterCategory.toLowerCase());
            const mT = filterType === JOB_TYPE_OPTIONS[0] || j.jobType?.toLowerCase().includes(filterType.toLowerCase()) || filterType.toLowerCase().includes(j.jobType?.toLowerCase() || '~~');
            const mL = filterLocation === LOCATION_OPTIONS[0]
                || matchesJobLocation(j, filterLocation);
            return mS && mC && mT && mL && matchSalary(j.salary || j.salaryNote, filterSalary) && matchExperience(j.experience, filterExp);
        }).sort((a, b) => sortBy === SORT_OPTIONS[0] ? (b.id || 0) - (a.id || 0) : (a.id || 0) - (b.id || 0));
    }, [data, search, filterCategory, filterType, filterLocation, filterSalary, filterExp, sortBy]);

    const visible = filtered.slice(0, visibleCount);
    const locationOptions = useMemo(
        () => [...new Set([...LOCATION_OPTIONS, ...getActiveJobLocations(data)])],
        [data]
    );
    const hasMore = visibleCount < filtered.length;
    const allShown = visibleCount >= filtered.length && visibleCount > PAGE_SIZE;
    const activeCount = getLevelJobCount(stats, 'all');
    const recentCount = getRecentLevelJobCount(stats, 'all');
    useSeo({ title: "All Jobs", description: "Browse current job listings across experience levels and locations.", robots: filtered.length && !isFiltered ? "index, follow" : "noindex, follow" });

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
                        Showing <span className="font-bold text-gray-900 dark:text-white">{Math.min(visibleCount, filtered.length)}</span> of{' '}
                        <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> jobs
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
                {loading ? (
                    <SkeletonGrid count={PAGE_SIZE} />
                ) : filtered.length === 0 ? (
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
                                    onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
                                    className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-2xl text-base font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                                >
                                    Show More Jobs <ChevronDown className="w-5 h-5" />
                                </button>
                            )}
                            {allShown && !hasMore && (
                                <button
                                    onClick={() => { setVisibleCount(PAGE_SIZE); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className="flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl text-base font-bold hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                                >
                                    Show Less <ChevronUp className="w-5 h-5" />
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
