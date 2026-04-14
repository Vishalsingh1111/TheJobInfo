

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Jobcard, { SkeletonGrid } from './Jobscard';
import FilterBar, {
    CATEGORY_OPTIONS, LOCATION_OPTIONS,
    EXPERIENCE_OPTIONS, SALARY_OPTIONS, SORT_OPTIONS
} from '../Common/Filterbar';
import Breadcrumb from '../Common/Breadcrumb';
import { baseUrl } from "../../Baseurl";
import {
    GraduationCap, Sparkles, Briefcase, Rocket,
    BriefcaseBusiness, Laptop, ChevronDown, ChevronUp, ArrowRight, Search
} from "lucide-react";
import { matchExperience, matchSalary } from '../Common/FilterHelpers';
import Navbar from "../Navbar";
import Footer from "../Footer";

const PAGE_SIZE = 15;

const CATEGORY_TABS = [
    { label: 'All Jobs', icon: Briefcase, color: 'from-purple-600 to-pink-600', route: '/Job-Portal', active: false },
    { label: 'Freshers', icon: GraduationCap, color: 'from-green-500 to-emerald-600', route: '/Fresher-Jobs', active: true },
    { label: 'Internships', icon: Rocket, color: 'from-orange-500 to-amber-600', route: '/Internships', active: false },
    { label: 'Experienced', icon: BriefcaseBusiness, color: 'from-blue-500 to-indigo-600', route: '/Experienced-Jobs', active: false },

];

const FreshersJobs = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState(CATEGORY_OPTIONS[0]);
    const [filterLocation, setFilterLocation] = useState(LOCATION_OPTIONS[0]);
    const [filterSalary, setFilterSalary] = useState(SALARY_OPTIONS[0]);
    const [filterExp, setFilterExp] = useState(EXPERIENCE_OPTIONS[0]);
    const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${baseUrl}/job`)
            .then(res => {
                const jobs = Array.isArray(res.data) ? res.data : [];
                setData(jobs.filter(j => j.jobType?.toLowerCase().includes('fresher')));
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { setVisibleCount(PAGE_SIZE); }, [search, filterCategory, filterLocation, filterSalary, filterExp, sortBy]);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return data.filter(j => {
            const mS = !search || j.title?.toLowerCase().includes(q) || j.company?.toLowerCase().includes(q) || j.location?.toLowerCase().includes(q) || j.description?.toLowerCase().includes(q);
            const mC = filterCategory === CATEGORY_OPTIONS[0] || j.category?.toLowerCase().includes(filterCategory.toLowerCase());
            const mL = filterLocation === LOCATION_OPTIONS[0] || j.location?.toLowerCase().includes(filterLocation.toLowerCase());
            return mS && mC && mL && matchSalary(j.salary || j.salaryNote, filterSalary) && matchExperience(j.experience, filterExp);
        }).sort((a, b) => sortBy === SORT_OPTIONS[0] ? (b.id || 0) - (a.id || 0) : (a.id || 0) - (b.id || 0));
    }, [data, search, filterCategory, filterLocation, filterSalary, filterExp, sortBy]);

    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;
    const allShown = visibleCount >= filtered.length && visibleCount > PAGE_SIZE;

    const go = (id) => { window.scrollTo({ top: 0, behavior: 'instant' }); navigate(`/jobdetail/${id}`); };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <Breadcrumb />

                    {/* ── Hero ── */}
                    <div className="text-center mb-8 pt-2">
                        <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 border-2 border-green-200 dark:border-green-700 px-6 py-2.5 rounded-full shadow-sm mb-4">
                            <GraduationCap className="w-5 h-5 text-green-600 dark:text-green-400 animate-pulse" />
                            <span className="text-base font-bold text-green-700 dark:text-green-300">Fresher Opportunities</span>
                            <Sparkles className="w-4 h-4 text-emerald-500" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                            Freshers{' '}
                            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                                Jobs
                            </span>
                        </h1>
                        <p className="text-lg font-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Curated entry-level & off-campus drives for fresh graduates — updated daily.
                        </p>
                    </div>

                    {/* ── Category Tabs ── */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {CATEGORY_TABS.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.label}
                                    onClick={() => !tab.active && navigate(tab.route)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 ${tab.active
                                        ? `bg-gradient-to-r ${tab.color} text-white border-transparent shadow-md`
                                        : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                    {!tab.active && <ArrowRight className="w-3.5 h-3.5 opacity-40" />}
                                </button>
                            );
                        })}
                    </div>

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
                            accentColor="green"
                        />
                    </div>

                    {/* ── Results count ── */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-base font-medium text-gray-600 dark:text-gray-400">
                            Showing <span className="font-bold text-gray-900 dark:text-white">{Math.min(visibleCount, filtered.length)}</span> of{' '}
                            <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> fresher jobs
                        </p>
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                            </span>
                            <span className="text-sm font-bold text-green-600 dark:text-green-400">Updated Today</span>
                        </div>
                    </div>

                    {/* ── Cards / Skeleton / Empty ── */}
                    {loading ? (
                        <SkeletonGrid count={8} />
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                                <Search className="w-10 h-10 text-green-500 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No fresher jobs found</h3>
                            <p className="text-base font-medium text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mb-8">
                                {visible.map((item, index) => (
                                    <Jobcard key={item._id} item={item} index={index} onClick={() => go(item._id)} />
                                ))}
                            </div>

                            <div className="flex justify-center pb-12">
                                {hasMore && (
                                    <button
                                        onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
                                        className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl text-base font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                                    >
                                        Show More Fresher Jobs <ChevronDown className="w-5 h-5" />
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
                </div>

                <div className="fixed top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="fixed bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            </div>
            <Footer />
        </>
    );
};

export default FreshersJobs;