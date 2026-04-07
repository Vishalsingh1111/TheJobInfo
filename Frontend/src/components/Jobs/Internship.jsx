import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Jobcard from './Jobscard';
import Breadcrumb from '../Common/Breadcrumb';
import { baseUrl } from "../../Baseurl";
import Skeleton1 from "../Common/Skeleton";
import { Search, SlidersHorizontal, Sparkles, Rocket } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const InternshipJobs = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("LATEST");
    const navigate = useNavigate();

    useEffect(() => {
        const getJobs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/job`);
                const jobs = Array.isArray(res.data) ? res.data : [];
                // Filter only Internship jobs
                const internshipJobs = jobs.filter(job =>
                    job.jobType?.toLowerCase().includes('internship')
                );
                setData(internshipJobs);
                setFilteredData(internshipJobs);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        getJobs();
    }, []);

    useEffect(() => {
        let result = [...data];

        if (search) {
            result = result.filter(item =>
                item.title?.toLowerCase().includes(search.toLowerCase()) ||
                item.company?.toLowerCase().includes(search.toLowerCase()) ||
                item.description?.toLowerCase().includes(search.toLowerCase()) ||
                item.location?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (sortBy === "LATEST") {
            result.sort((a, b) => b.id - a.id);
        } else if (sortBy === "OLDEST") {
            result.sort((a, b) => a.id - b.id);
        }

        setFilteredData(result);
    }, [search, sortBy, data]);

    const handleCardClick = (id) => {
        navigate(`/jobdetail/${id}`);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-950">
                <div className="container mx-auto px-4 py-6">
                    <Breadcrumb />

                    {/* Hero Header */}
                    <div className="container mx-auto px-4 pt-2">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-950 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-orange-200 dark:border-orange-700 shadow-lg mb-4">
                                <Rocket className="w-5 h-5 text-orange-600 dark:text-orange-400 animate-pulse" />
                                <span className="text-orange-700 dark:text-orange-300 font-semibold">Internship Opportunities</span>
                                <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                                Latest <span className="bg-gradient-to-r from-orange-500 to-amber-600 dark:from-orange-400 dark:to-amber-500 bg-clip-text text-transparent">Internships</span>
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                Paid & unpaid internship openings at top companies — updated daily.
                            </p>
                        </div>
                    </div>

                    {/* Search and Sort Row */}
                    <div className="mb-12 max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Search Box */}
                            <div className="lg:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search internships, companies, locations..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-all duration-300 font-medium"
                                    />
                                </div>
                            </div>

                            {/* Sort Selector */}
                            <div className="relative">
                                <SlidersHorizontal className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none z-10" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full pl-14 pr-10 py-5 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-all duration-300 font-medium appearance-none cursor-pointer"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: 'right 1.5rem center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '1.5em 1.5em'
                                    }}
                                >
                                    <option value="LATEST">Latest First</option>
                                    <option value="OLDEST">Oldest First</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results Indicator */}
                    <div className="mb-8 text-center">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            <span className="text-2xl font-black text-transparent bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text">
                                {filteredData.length}
                            </span>
                            <span className="ml-2">internships ready to explore</span>
                        </p>
                    </div>

                    {/* Content */}
                    {loading ? (
                        <Skeleton1 />
                    ) : (
                        <>
                            {/* Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto">
                                {filteredData.map((item, index) => (
                                    <Jobcard
                                        key={item._id}
                                        item={item}
                                        index={index}
                                        onClick={() => handleCardClick(item._id)}
                                    />
                                ))}
                            </div>

                            {/* Empty State */}
                            {filteredData.length === 0 && (
                                <div className="text-center py-20">
                                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 flex items-center justify-center">
                                        <Search className="w-12 h-12 text-orange-500 dark:text-orange-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No internships found</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Ambient Background Elements */}
                <div className="fixed top-0 right-0 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="fixed bottom-0 left-0 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
            </div>
            <Footer />
        </>
    );
};

export default InternshipJobs;