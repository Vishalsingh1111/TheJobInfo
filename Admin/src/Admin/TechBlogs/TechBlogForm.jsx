import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';
import {
    Briefcase, BookOpen, Plus, Edit, Trash2, Search,
    ChevronLeft, ChevronRight, Eye, Download, X, Save,
    AlertCircle, MapPin, Zap, Award,
    TrendingUp, RefreshCw, ExternalLink, Upload, FileJson,
    CheckCircle2, XCircle, AlertTriangle, Image, ImageOff
} from 'lucide-react';

export default function JobManagement() {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showBulkModal, setShowBulkModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');
    const [refreshing, setRefreshing] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Image state for Add/Edit
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const imageInputRef = useRef(null);

    // Bulk upload state
    const [bulkJson, setBulkJson] = useState('');
    const [bulkFile, setBulkFile] = useState(null);
    const [bulkParsed, setBulkParsed] = useState([]);
    const [bulkError, setBulkError] = useState('');
    const [bulkProgress, setBulkProgress] = useState(null);
    const [bulkResults, setBulkResults] = useState([]);
    const fileInputRef = useRef(null);

    const EMPTY_FORM = {
        id: '', title: '', company: '', location: '', salary: '', salaryNote: '',
        jobType: 'Freshers/ Experienced', experience: '', category: '', website: '',
        applyLink: '', lastDate: '', aboutCompany: '', description: '',
        responsibilities: '', eligibility: '', requiredSkills: '',
        applyIf: '', dontApplyIf: '', selectionProcess: '', benefits: '', applySteps: '',
    };

    const [formData, setFormData] = useState(EMPTY_FORM);
    const [validationErrors, setValidationErrors] = useState({});
    const [stats, setStats] = useState({ totalJobs: 0, categories: [], recentJobs: 0 });

    useEffect(() => { fetchJobs(); }, []);
    useEffect(() => { filterAndSortJobs(); calculateStats(); }, [jobs, searchTerm, categoryFilter, sortBy, sortOrder]);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/job`);
            const jobsData = Array.isArray(response.data) ? response.data : [];
            setJobs(jobsData);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchJobs();
        setTimeout(() => setRefreshing(false), 500);
    };

    const calculateStats = () => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const categories = [...new Set(jobs.map(j => j.category))];
        setStats({
            totalJobs: jobs.length,
            categories,
            recentJobs: jobs.filter(j => {
                const d = j.createdAt ? new Date(j.createdAt) : null;
                return d && d >= thirtyDaysAgo;
            }).length
        });
    };

    const filterAndSortJobs = () => {
        if (!Array.isArray(jobs)) { setFilteredJobs([]); return; }
        let filtered = [...jobs];
        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            filtered = filtered.filter(j =>
                j.title?.toLowerCase().includes(q) ||
                j.company?.toLowerCase().includes(q) ||
                j.category?.toLowerCase().includes(q) ||
                j.location?.toLowerCase().includes(q) ||
                j.id?.toString().includes(searchTerm)
            );
        }
        if (categoryFilter !== 'all') filtered = filtered.filter(j => j.category === categoryFilter);
        filtered.sort((a, b) => {
            let aVal, bVal;
            switch (sortBy) {
                case 'id': aVal = a.id || 0; bVal = b.id || 0; break;
                case 'title': aVal = (a.title || '').toLowerCase(); bVal = (b.title || '').toLowerCase(); break;
                case 'company': aVal = (a.company || '').toLowerCase(); bVal = (b.company || '').toLowerCase(); break;
                default: aVal = a[sortBy] || ''; bVal = b[sortBy] || '';
            }
            return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
        });
        setFilteredJobs(filtered);
        setCurrentPage(1);
    };

    const getNextId = () => {
        if (!jobs.length) return 1;
        const maxId = Math.max(...jobs.map(j => Number(j.id) || 0));
        return maxId + 1;
    };

    // ── Image Handlers ────────────────────────────────────────────────────────
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('Image must be under 5 MB.');
            return;
        }
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const clearImage = () => {
        setImageFile(null);
        setImagePreview('');
        if (imageInputRef.current) imageInputRef.current.value = '';
    };

    const resetImageState = () => {
        setImageFile(null);
        setImagePreview('');
    };

    // ── Modal Openers ─────────────────────────────────────────────────────────
    const handleAdd = () => {
        setFormData({ ...EMPTY_FORM, id: getNextId() });
        setValidationErrors({});
        resetImageState();
        setShowAddModal(true);
    };

    const handleEdit = (job) => {
        setSelectedJob(job);
        setFormData({
            id: job.id || '', title: job.title || '', company: job.company || '',
            location: job.location || '', salary: job.salary || '', salaryNote: job.salaryNote || '',
            jobType: job.jobType || 'Freshers/ Experienced', experience: job.experience || '',
            category: job.category || '', website: job.website || '', applyLink: job.applyLink || '',
            lastDate: job.lastDate || '', aboutCompany: job.aboutCompany || '',
            description: job.description || '', responsibilities: job.responsibilities || '',
            eligibility: job.eligibility || '', requiredSkills: job.requiredSkills || '',
            applyIf: job.applyIf || '', dontApplyIf: job.dontApplyIf || '',
            selectionProcess: job.selectionProcess || '', benefits: job.benefits || '',
            applySteps: job.applySteps || '',
        });
        setValidationErrors({});
        setImageFile(null);
        setImagePreview(job.imageUrl || ''); // show existing image
        setShowEditModal(true);
    };

    const handleView = (job) => { setSelectedJob(job); setShowViewModal(true); };

    const validateForm = () => {
        const errors = {};
        if (!formData.id) errors.id = 'ID is required';
        if (!formData.title) errors.title = 'Job title is required';
        if (!formData.company) errors.company = 'Company is required';
        if (!formData.category) errors.category = 'Category is required';
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // ── Submit (multipart/form-data) ──────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);

        try {
            const payload = new FormData();
            Object.entries(formData).forEach(([key, val]) => {
                payload.append(key, val ?? '');
            });
            if (imageFile) {
                payload.append('image', imageFile);
            }

            const config = { headers: { 'Content-Type': 'multipart/form-data' } };

            if (showEditModal) {
                await axios.put(`${baseUrl}/job/${selectedJob._id}`, payload, config);
                alert('✅ Job updated successfully!');
            } else {
                await axios.post(`${baseUrl}/job`, payload, config);
                alert('✅ Job created successfully!');
            }
            setShowAddModal(false);
            setShowEditModal(false);
            resetImageState();
            fetchJobs();
        } catch (error) {
            alert('❌ ' + (error.response?.data?.error || 'Failed to submit'));
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/job/${selectedJob._id}`);
            alert('✅ Job deleted successfully!');
            setShowDeleteModal(false);
            fetchJobs();
        } catch {
            alert('❌ Failed to delete job');
        }
    };

    // ── Bulk JSON Upload ──────────────────────────────────────────────────────
    const handleOpenBulk = () => {
        setBulkJson('');
        setBulkFile(null);
        setBulkParsed([]);
        setBulkError('');
        setBulkProgress(null);
        setBulkResults([]);
        setShowBulkModal(true);
    };

    const handleBulkFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setBulkFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => {
            setBulkJson(ev.target.result);
            parseBulkJson(ev.target.result);
        };
        reader.readAsText(file);
    };

    const parseBulkJson = (text) => {
        setBulkError('');
        setBulkParsed([]);
        try {
            const parsed = JSON.parse(text);
            const arr = Array.isArray(parsed) ? parsed : [parsed];
            if (arr.length === 0) { setBulkError('JSON array is empty.'); return; }
            const invalid = arr.filter(j => !j.title || !j.company || !j.category);
            if (invalid.length > 0) {
                setBulkError(`${invalid.length} job(s) are missing required fields: title, company, category.`);
                return;
            }
            let nextId = getNextId();
            const withIds = arr.map(j => ({ ...j, id: j.id ? Number(j.id) : nextId++ }));
            setBulkParsed(withIds);
        } catch (err) {
            setBulkError('Invalid JSON: ' + err.message);
        }
    };

    const handleBulkJsonTextChange = (e) => {
        setBulkJson(e.target.value);
        parseBulkJson(e.target.value);
    };

    const handleBulkSubmit = async () => {
        if (!bulkParsed.length) return;
        setBulkProgress({ done: 0, total: bulkParsed.length, failed: 0 });
        setBulkResults([]);
        const results = [];
        let failed = 0;
        for (let i = 0; i < bulkParsed.length; i++) {
            const job = bulkParsed[i];
            try {
                await axios.post(`${baseUrl}/job`, job);
                results.push({ job, success: true });
            } catch (err) {
                failed++;
                results.push({ job, success: false, error: err.response?.data?.error || 'Failed' });
            }
            setBulkProgress({ done: i + 1, total: bulkParsed.length, failed });
            setBulkResults([...results]);
        }
        await fetchJobs();
    };

    const downloadSampleJson = () => {
        const sample = [{
            id: getNextId(), title: "Software Engineer", company: "Example Corp",
            location: "Bangalore", salary: "₹8-12 LPA", salaryNote: "Salary may vary",
            jobType: "Freshers/ Experienced", experience: "0-2 years", category: "Engineering",
            website: "example.com", applyLink: "https://example.com/apply", lastDate: "Apply ASAP",
            aboutCompany: "About the company...", description: "Job overview...",
            responsibilities: "Build features\nWrite clean code\nReview PRs",
            eligibility: "B.Tech in CS or related\n60% aggregate",
            requiredSkills: "JavaScript\nReact\nNode.js",
            applyIf: "Strong in DSA\nHave portfolio projects",
            dontApplyIf: "No coding background",
            selectionProcess: "Online Test\nTechnical Interview\nHR Round\nOffer",
            benefits: "Health insurance\nFlexible hours\nLearning budget",
            applySteps: "Click Apply below\nCreate account\nFill form\nSubmit",
        }];
        const blob = new Blob([JSON.stringify(sample, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'sample_jobs.json'; a.click();
        URL.revokeObjectURL(url);
    };

    const exportToCSV = () => {
        const csv = [
            ['ID', 'Title', 'Company', 'Location', 'Salary', 'Job Type', 'Category', 'Last Date', 'Image URL'],
            ...filteredJobs.map(j => [j.id, j.title, j.company, j.location, j.salary, j.jobType, j.category, j.lastDate, j.imageUrl || ''])
        ].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `jobs_${new Date().toISOString().split('T')[0]}.csv`; a.click();
        window.URL.revokeObjectURL(url);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 ${color} transform hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{label}</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
                </div>
                <div className={`p-4 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} dark:opacity-20`}>
                    <Icon className={`w-8 h-8 ${color.replace('border-', 'text-')}`} />
                </div>
            </div>
        </div>
    );

    const inputCls = (err) => `w-full px-4 py-3 border-2 ${err ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`;
    const textareaCls = () => `w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none transition-colors`;

    if (loading && jobs.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading jobs...</p>
                </div>
            </div>
        );
    }

    const bulkDone = bulkProgress && bulkProgress.done === bulkProgress.total;

    // ── Image Upload Widget ───────────────────────────────────────────────────
    const ImageUploadWidget = ({ existingUrl }) => (
        <div className="border-2 border-blue-200 dark:border-blue-800 rounded-xl p-5 bg-blue-50/50 dark:bg-blue-900/10">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                <Image className="w-4 h-4 text-blue-600" /> Job / Company Image
                <span className="text-xs font-normal text-gray-500">(optional, max 5 MB)</span>
            </h3>

            {/* Preview — FIX: removed overflow-hidden, changed to object-contain with auto height */}
            {imagePreview ? (
                <div className="relative mb-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full object-contain rounded-xl"
                        style={{ maxHeight: '320px' }}
                    />
                    <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors"
                        title="Remove image"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    {imageFile && (
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
                            New: {imageFile.name}
                        </div>
                    )}
                    {!imageFile && existingUrl && (
                        <div className="absolute bottom-2 left-2 bg-green-600/80 text-white text-xs px-2 py-1 rounded-lg">
                            Existing image
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onClick={() => imageInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl p-8 text-center cursor-pointer transition-colors group mb-3"
                >
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors" />
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Click to upload image
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5 MB</p>
                </div>
            )}

            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />

            {!imagePreview && (
                <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold text-sm transition-colors"
                >
                    <Upload className="w-4 h-4" /> Choose Image
                </button>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 py-8 px-4">
            <div className="container mx-auto max-w-7xl">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white rounded-2xl p-8 mb-8 shadow-xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                                <Briefcase className="w-10 h-10" />
                                Job Portal Management
                            </h1>
                            <p className="text-blue-100 dark:text-blue-200">Manage off-campus drives, fresher jobs & internships</p>
                        </div>
                        <div className="flex flex-wrap gap-3 justify-end">
                            <button onClick={handleRefresh} disabled={refreshing} className={`flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-3 rounded-full font-semibold transition-all ${refreshing ? 'animate-spin' : ''}`}>
                                <RefreshCw className="w-5 h-5" />
                            </button>
                            <button onClick={exportToCSV} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all backdrop-blur-sm">
                                <Download className="w-5 h-5" /> Export CSV
                            </button>
                            <button onClick={handleOpenBulk} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all backdrop-blur-sm border border-white/30">
                                <FileJson className="w-5 h-5" /> Bulk Upload
                            </button>
                            <button onClick={handleAdd} className="flex items-center gap-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all">
                                <Plus className="w-5 h-5" /> Add New Job
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard icon={BookOpen} label="Total Jobs" value={stats.totalJobs} color="border-blue-500" />
                    <StatCard icon={Briefcase} label="Categories" value={stats.categories.length} color="border-purple-500" />
                    <StatCard icon={TrendingUp} label="Recent (30 days)" value={stats.recentJobs} color="border-green-500" />
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search jobs by title, company, location, or ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer appearance-none transition-colors">
                            <option value="all">All Categories</option>
                            {stats.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <select value={`${sortBy}-${sortOrder}`} onChange={(e) => { const [f, o] = e.target.value.split('-'); setSortBy(f); setSortOrder(o); }} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer appearance-none transition-colors">
                            <option value="id-desc">ID (High to Low)</option>
                            <option value="id-asc">ID (Low to High)</option>
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="company-asc">Company (A-Z)</option>
                        </select>
                    </div>
                    <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Showing <span className="font-semibold">{filteredJobs.length}</span> of <span className="font-semibold">{jobs.length}</span> jobs
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="px-3 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none cursor-pointer">
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={filteredJobs.length || 9999}>All</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {currentItems.length === 0 ? (
                        <div className="text-center py-20">
                            <Briefcase className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold mb-2">No jobs found</p>
                            <p className="text-gray-400 dark:text-gray-500">Try adjusting your filters or create a new job</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            {['ID', 'Image', 'Job Title', 'Location', 'Salary', 'Type', 'Category', 'Apply Link', 'Actions'].map(h => (
                                                <th key={h} className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {currentItems.map(job => (
                                            <tr key={job._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs font-bold">#{job.id}</span>
                                                </td>
                                                {/* Image thumbnail — FIX: object-contain so full image is visible */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {job.imageUrl ? (
                                                        <div className="w-16 h-16 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                                                            <img
                                                                src={job.imageUrl}
                                                                alt={job.company}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                            <ImageOff className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center text-white">
                                                            <Briefcase className="w-5 h-5" />
                                                        </div>
                                                        <div className="max-w-xs">
                                                            <p className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">{job.title}</p>
                                                            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">{job.company}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                        <MapPin className="w-3.5 h-3.5" />{job.location || '—'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm font-bold text-green-600 dark:text-green-400">{job.salary || '—'}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-bold">{job.jobType || '—'}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-xs font-bold">{job.category}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {job.applyLink ? (
                                                        <a href={job.applyLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                                                            <ExternalLink className="w-3.5 h-3.5" /> Apply
                                                        </a>
                                                    ) : <span className="text-gray-400 text-xs">No link</span>}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => handleView(job)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="View"><Eye className="w-5 h-5" /></button>
                                                        <button onClick={() => handleEdit(job)} className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors" title="Edit"><Edit className="w-5 h-5" /></button>
                                                        <button onClick={() => { setSelectedJob(job); setShowDeleteModal(true); }} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Delete"><Trash2 className="w-5 h-5" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {totalPages > 1 && (
                                <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredJobs.length)} of {filteredJobs.length}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <div className="flex items-center gap-1">
                                            {[...Array(totalPages)].map((_, idx) => {
                                                const page = idx + 1;
                                                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                                    return <button key={page} onClick={() => setCurrentPage(page)} className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>{page}</button>;
                                                } else if (page === currentPage - 2 || page === currentPage + 2) {
                                                    return <span key={page} className="px-2 text-gray-500">...</span>;
                                                }
                                                return null;
                                            })}
                                        </div>
                                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* ── Add/Edit Modal ── */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-6xl my-8 shadow-2xl">
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-6 flex justify-between items-center z-10 rounded-t-2xl">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                {showEditModal ? <Edit className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                {showEditModal ? 'Edit Job' : 'Add New Job'}
                            </h2>
                            <button onClick={() => { setShowAddModal(false); setShowEditModal(false); resetImageState(); }} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 flex gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-800 dark:text-blue-200">
                                    <p className="font-bold mb-1">📋 Job Posting Format:</p>
                                    <p>Fill in all details as shown in the job PDF. Text fields with multiple points should be entered one per line. Upload an image for the job post (shown in listings and detail page).</p>
                                </div>
                            </div>

                            {/* ── Image Upload ── */}
                            <ImageUploadWidget existingUrl={showEditModal ? selectedJob?.imageUrl : ''} />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Unique ID <span className="text-red-500">*</span>
                                        {showAddModal && <span className="ml-2 text-xs font-normal text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">Auto-filled</span>}
                                    </label>
                                    <input type="number" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} className={inputCls(validationErrors.id)} placeholder="e.g., 1" />
                                    {validationErrors.id && <p className="text-red-500 text-xs mt-1">{validationErrors.id}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Category <span className="text-red-500">*</span></label>
                                    <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={inputCls(validationErrors.category)} placeholder="e.g., Engineering, IT" />
                                    {validationErrors.category && <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Job Type</label>
                                    <select value={formData.jobType} onChange={(e) => setFormData({ ...formData, jobType: e.target.value })} className={inputCls(false)}>
                                        <option>Freshers/ Experienced</option>
                                        <option>Freshers</option>
                                        <option>Experienced</option>
                                        <option>Internship</option>
                                        <option>Part-Time</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Job Title / Post Name <span className="text-red-500">*</span></label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputCls(validationErrors.title)} placeholder="e.g., Customer Care Advisor" />
                                {validationErrors.title && <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Company Name <span className="text-red-500">*</span></label>
                                <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={inputCls(validationErrors.company)} placeholder="e.g., Cactus Communications" />
                                {validationErrors.company && <p className="text-red-500 text-xs mt-1">{validationErrors.company}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Job Location</label>
                                    <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputCls(false)} placeholder="e.g., Work From Home" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Expected Salary</label>
                                    <input type="text" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} className={inputCls(false)} placeholder="e.g., up to ₹4 LPA*" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Salary Note</label>
                                <input type="text" value={formData.salaryNote} onChange={(e) => setFormData({ ...formData, salaryNote: e.target.value })} className={inputCls(false)} placeholder="e.g., *Salary may vary depending on industry estimates..." />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Experience Required</label>
                                    <input type="text" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className={inputCls(false)} placeholder="e.g., Freshers / Entry Level" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Last Date to Apply</label>
                                    <input type="text" value={formData.lastDate} onChange={(e) => setFormData({ ...formData, lastDate: e.target.value })} className={inputCls(false)} placeholder="e.g., Apply ASAP" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Company Website</label>
                                    <input type="text" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className={inputCls(false)} placeholder="e.g., cactus.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Apply Link</label>
                                    <input type="text" value={formData.applyLink} onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })} className={inputCls(false)} placeholder="https://..." />
                                </div>
                            </div>

                            {/* About Company */}
                            <div className="border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 bg-blue-50/50 dark:bg-blue-900/10">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <Building2Icon /> About Company & Overview
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">About Company</label>
                                        <textarea value={formData.aboutCompany} onChange={(e) => setFormData({ ...formData, aboutCompany: e.target.value })} className={textareaCls()} rows="3" placeholder="Brief company description..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Job Description / Overview</label>
                                        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={textareaCls()} rows="3" placeholder="What does the role involve at a high level..." />
                                    </div>
                                </div>
                            </div>

                            {/* Role & Responsibilities */}
                            <div className="border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6 bg-purple-50/50 dark:bg-purple-900/10">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-purple-600" /> Role & Responsibilities
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Responsibilities <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                        <textarea value={formData.responsibilities} onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })} className={textareaCls()} rows="6" placeholder="Handle customer queries via chat, email, or calls&#10;Escalate complex issues to senior staff" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Apply If <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                            <textarea value={formData.applyIf} onChange={(e) => setFormData({ ...formData, applyIf: e.target.value })} className={textareaCls()} rows="4" placeholder="Strong communication skills" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Don't Apply If <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                            <textarea value={formData.dontApplyIf} onChange={(e) => setFormData({ ...formData, dontApplyIf: e.target.value })} className={textareaCls()} rows="4" placeholder="No customer service experience" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Eligibility & Skills */}
                            <div className="border-2 border-green-200 dark:border-green-800 rounded-xl p-6 bg-green-50/50 dark:bg-green-900/10">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-green-600" /> Eligibility & Skills
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Eligibility Criteria <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                        <textarea value={formData.eligibility} onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })} className={textareaCls()} rows="5" placeholder="Bachelor's degree in computer science or related field" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Required Skills <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                        <textarea value={formData.requiredSkills} onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })} className={textareaCls()} rows="6" placeholder="Excellent English communication&#10;Customer support experience" />
                                    </div>
                                </div>
                            </div>

                            {/* Selection Process & Benefits */}
                            <div className="border-2 border-orange-200 dark:border-orange-800 rounded-xl p-6 bg-orange-50/50 dark:bg-orange-900/10">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-orange-600" /> Selection Process & Benefits
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Selection Process <span className="text-xs font-normal text-gray-500">(one per line, in order)</span></label>
                                        <textarea value={formData.selectionProcess} onChange={(e) => setFormData({ ...formData, selectionProcess: e.target.value })} className={textareaCls()} rows="5" placeholder="Initial Screening&#10;One Interview Round&#10;Offer" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Why Join / Benefits <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                        <textarea value={formData.benefits} onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} className={textareaCls()} rows="4" placeholder="Training and development&#10;Coaching and support from experts&#10;Continuous learning culture" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">How to Apply Steps <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                        <textarea value={formData.applySteps} onChange={(e) => setFormData({ ...formData, applySteps: e.target.value })} className={textareaCls()} rows="5" placeholder='Click on the "Apply here" button&#10;Create an account&#10;Fill the application form&#10;Submit' />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 sticky bottom-0 bg-white dark:bg-gray-800 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button type="button" onClick={() => { setShowAddModal(false); setShowEditModal(false); resetImageState(); }} className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-bold transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={submitting} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white px-6 py-3 rounded-xl hover:shadow-xl font-bold transition-all transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
                                    {submitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {showEditModal ? 'Updating...' : 'Creating...'}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            {showEditModal ? 'Update Job' : 'Create Job'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Bulk Upload Modal ── */}
            {showBulkModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl my-8 shadow-2xl">
                        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 flex justify-between items-center z-10 rounded-t-2xl">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <FileJson className="w-6 h-6" /> Bulk Job Upload (JSON)
                            </h2>
                            <button onClick={() => setShowBulkModal(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-4 flex gap-3">
                                <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-green-800 dark:text-green-200">
                                    <p className="font-bold mb-1">📦 Bulk Upload Info</p>
                                    <p>Upload a JSON file (array of jobs) or paste JSON directly. Required fields: <strong>title</strong>, <strong>company</strong>, <strong>category</strong>. Note: bulk upload does not support images — add images individually via Edit after upload.</p>
                                </div>
                            </div>

                            {!bulkProgress && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-500 rounded-xl p-8 text-center cursor-pointer transition-colors group">
                                            <Upload className="w-10 h-10 text-gray-400 group-hover:text-green-500 mx-auto mb-3 transition-colors" />
                                            <p className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                                {bulkFile ? bulkFile.name : 'Click to upload .json file'}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">Drag & drop or click</p>
                                            <input ref={fileInputRef} type="file" accept=".json,application/json" onChange={handleBulkFileChange} className="hidden" />
                                        </div>
                                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3">
                                            <Download className="w-10 h-10 text-gray-400" />
                                            <p className="font-semibold text-gray-700 dark:text-gray-300">Need a template?</p>
                                            <button onClick={downloadSampleJson} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                                                <Download className="w-4 h-4" /> Download Sample JSON
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Or paste JSON here</label>
                                        <textarea value={bulkJson} onChange={handleBulkJsonTextChange} rows={10} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-green-500 focus:outline-none font-mono text-sm resize-none transition-colors" placeholder='[{"title": "...", "company": "...", "category": "..."}]' />
                                    </div>
                                    {bulkError && (
                                        <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4">
                                            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-red-700 dark:text-red-300">{bulkError}</p>
                                        </div>
                                    )}
                                    {bulkParsed.length > 0 && !bulkError && (
                                        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                                            <p className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                {bulkParsed.length} job(s) ready to upload
                                            </p>
                                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                                {bulkParsed.map((job, i) => (
                                                    <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 text-sm border border-gray-200 dark:border-gray-700">
                                                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded text-xs font-bold">#{job.id}</span>
                                                        <span className="font-semibold text-gray-800 dark:text-gray-100 truncate">{job.title}</span>
                                                        <span className="text-gray-500 dark:text-gray-400 truncate">{job.company}</span>
                                                        <span className="ml-auto px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded text-xs">{job.category}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {bulkProgress && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 font-semibold">
                                        <span>Uploading jobs...</span>
                                        <span>{bulkProgress.done} / {bulkProgress.total}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                        <div className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full transition-all duration-300" style={{ width: `${(bulkProgress.done / bulkProgress.total) * 100}%` }} />
                                    </div>
                                    {bulkProgress.failed > 0 && <p className="text-sm text-red-600 dark:text-red-400">{bulkProgress.failed} failed</p>}
                                    <div className="space-y-2 max-h-64 overflow-y-auto">
                                        {bulkResults.map((r, i) => (
                                            <div key={i} className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm border ${r.success ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
                                                {r.success ? <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />}
                                                <span className={`font-semibold truncate ${r.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>#{r.job.id} {r.job.title}</span>
                                                {!r.success && <span className="ml-auto text-red-600 dark:text-red-400 text-xs">{r.error}</span>}
                                            </div>
                                        ))}
                                    </div>
                                    {bulkDone && (
                                        <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${bulkProgress.failed === 0 ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700' : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700'}`}>
                                            {bulkProgress.failed === 0 ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <AlertTriangle className="w-6 h-6 text-yellow-600" />}
                                            <p className="font-bold text-gray-800 dark:text-gray-100">
                                                {bulkProgress.failed === 0 ? `All ${bulkProgress.total} jobs uploaded! 🎉` : `${bulkProgress.total - bulkProgress.failed} uploaded, ${bulkProgress.failed} failed.`}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex gap-4 sticky bottom-0 bg-white dark:bg-gray-800 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button onClick={() => setShowBulkModal(false)} className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-bold transition-colors">
                                    {bulkDone ? 'Close' : 'Cancel'}
                                </button>
                                {!bulkProgress && (
                                    <button onClick={handleBulkSubmit} disabled={!bulkParsed.length || !!bulkError} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                        <Upload className="w-5 h-5" /> Upload {bulkParsed.length > 0 ? `${bulkParsed.length} Jobs` : 'Jobs'}
                                    </button>
                                )}
                                {bulkDone && (
                                    <button onClick={handleOpenBulk} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all">
                                        <RefreshCw className="w-5 h-5" /> Upload More
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── View Modal ── */}
            {showViewModal && selectedJob && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center z-10 rounded-t-2xl">
                            <div>
                                <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                                <p className="text-blue-200 text-sm">{selectedJob.company} · {selectedJob.location}</p>
                            </div>
                            <button onClick={() => setShowViewModal(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Image preview in view modal — FIX: object-contain, no fixed height crop */}
                            {selectedJob.imageUrl && (
                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={selectedJob.imageUrl}
                                        alt={selectedJob.company}
                                        className="w-full object-contain rounded-xl"
                                        style={{ maxHeight: '400px' }}
                                    />
                                </div>
                            )}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
                                {[['Salary', selectedJob.salary], ['Type', selectedJob.jobType], ['Category', selectedJob.category], ['Last Date', selectedJob.lastDate]].filter(([, v]) => v).map(([l, v]) => (
                                    <div key={l} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
                                        <p className="text-xs text-gray-500 mb-1">{l}</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{v}</p>
                                    </div>
                                ))}
                            </div>
                            {selectedJob.description && <div><p className="font-bold text-gray-800 dark:text-white mb-2">Description</p><p className="text-sm text-gray-600 dark:text-gray-400">{selectedJob.description}</p></div>}
                            {selectedJob.applyLink && (
                                <a href={selectedJob.applyLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg">
                                    Apply Now <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Delete Modal ── */}
            {showDeleteModal && selectedJob && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Delete Job</h3>
                            <p className="text-gray-600 dark:text-gray-400">Are you sure you want to permanently delete <strong>"{selectedJob.title}"</strong>? This will also remove the associated image from Cloudinary.</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold transition-colors">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const Building2Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" />
        <path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" />
        <path d="M8 10h.01" /><path d="M8 14h.01" />
    </svg>
);