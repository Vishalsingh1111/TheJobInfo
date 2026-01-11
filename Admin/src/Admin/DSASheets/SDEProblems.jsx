import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';
import {
    Briefcase,
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    Eye,
    Download,
    X,
    Save,
    ExternalLink,
    BookOpen,
    RefreshCw,
    Layers,
    Target,
    Award,
    Building2,
    Link as LinkIcon,
    Hash,
    TrendingUp,
    Users
} from 'lucide-react';

export default function SDEProblemManagement() {
    const [problems, setProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [topicFilter, setTopicFilter] = useState('all');
    const [levelFilter, setLevelFilter] = useState('all');
    const [contentForFilter, setContentForFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [refreshing, setRefreshing] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        article: '',
        Level: '',
        link: '',
        topic: '',
        companies: '',
        contentFor: ''
    });

    const [validationErrors, setValidationErrors] = useState({});

    // Calculate stats
    const [stats, setStats] = useState({
        totalProblems: 0,
        topics: [],
        contentForList: [],
        easyProblems: 0,
        mediumProblems: 0,
        hardProblems: 0
    });

    useEffect(() => {
        fetchProblems();
    }, []);

    useEffect(() => {
        filterAndSortProblems();
        calculateStats();
    }, [problems, searchTerm, topicFilter, levelFilter, contentForFilter, sortBy, sortOrder]);

    const fetchProblems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/sdeproblem`);
            const problemsData = Array.isArray(response.data) ? response.data : [];
            setProblems(problemsData);
        } catch (error) {
            console.error('Error fetching problems:', error);
            setProblems([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchProblems();
        setTimeout(() => setRefreshing(false), 500);
    };

    const calculateStats = () => {
        const topics = [...new Set(problems.map(p => p.topic).filter(Boolean))];
        const contentForList = [...new Set(problems.map(p => p.contentFor).filter(Boolean))];
        const easy = problems.filter(p => p.Level?.toLowerCase() === 'easy').length;
        const medium = problems.filter(p => p.Level?.toLowerCase() === 'medium').length;
        const hard = problems.filter(p => p.Level?.toLowerCase() === 'hard').length;

        setStats({
            totalProblems: problems.length,
            topics: topics,
            contentForList: contentForList,
            easyProblems: easy,
            mediumProblems: medium,
            hardProblems: hard
        });
    };

    const filterAndSortProblems = () => {
        if (!Array.isArray(problems)) {
            setFilteredProblems([]);
            return;
        }

        let filtered = [...problems];

        // Search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(problem =>
                problem.name?.toLowerCase().includes(searchLower) ||
                problem.topic?.toLowerCase().includes(searchLower) ||
                problem.companies?.toLowerCase().includes(searchLower) ||
                problem.contentFor?.toLowerCase().includes(searchLower) ||
                problem.id?.toString().includes(searchTerm)
            );
        }

        // Topic filter
        if (topicFilter !== 'all') {
            filtered = filtered.filter(problem => problem.topic === topicFilter);
        }

        // Level filter
        if (levelFilter !== 'all') {
            filtered = filtered.filter(problem => problem.Level?.toLowerCase() === levelFilter.toLowerCase());
        }

        // ContentFor filter
        if (contentForFilter !== 'all') {
            filtered = filtered.filter(problem => problem.contentFor === contentForFilter);
        }

        // Sorting
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'id':
                    aValue = parseInt(a.id) || 0;
                    bValue = parseInt(b.id) || 0;
                    break;
                case 'name':
                    aValue = (a.name || '').toLowerCase();
                    bValue = (b.name || '').toLowerCase();
                    break;
                case 'Level':
                    const levelOrder = { easy: 1, medium: 2, hard: 3 };
                    aValue = levelOrder[a.Level?.toLowerCase()] || 0;
                    bValue = levelOrder[b.Level?.toLowerCase()] || 0;
                    break;
                default:
                    aValue = a[sortBy] || '';
                    bValue = b[sortBy] || '';
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredProblems(filtered);
        setCurrentPage(1);
    };

    const handleAdd = () => {
        setFormData({
            id: '',
            name: '',
            article: '',
            Level: '',
            link: '',
            topic: '',
            companies: '',
            contentFor: ''
        });
        setValidationErrors({});
        setShowAddModal(true);
    };

    const handleEdit = (problem) => {
        setSelectedProblem(problem);
        setFormData({
            id: problem.id || '',
            name: problem.name || '',
            article: problem.article || '',
            Level: problem.Level || '',
            link: problem.link || '',
            topic: problem.topic || '',
            companies: problem.companies || '',
            contentFor: problem.contentFor || ''
        });
        setValidationErrors({});
        setShowEditModal(true);
    };

    const handleView = (problem) => {
        setSelectedProblem(problem);
        setShowViewModal(true);
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.id) errors.id = 'ID is required';
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.topic) errors.topic = 'Topic is required';

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            if (showEditModal) {
                await axios.put(`${baseUrl}/sdeproblem/${selectedProblem._id}`, formData);
                alert('✅ SDE Problem updated successfully!');
            } else {
                await axios.post(`${baseUrl}/sdeproblem`, formData);
                alert('✅ SDE Problem created successfully!');
            }

            setShowAddModal(false);
            setShowEditModal(false);
            fetchProblems();
        } catch (error) {
            console.error('Error submitting problem:', error);
            alert('❌ ' + (error.response?.data?.error || 'Failed to submit problem'));
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/sdeproblem/${selectedProblem._id}`);
            alert('✅ SDE Problem deleted successfully!');
            setShowDeleteModal(false);
            fetchProblems();
        } catch (error) {
            console.error('Error deleting problem:', error);
            alert('❌ Failed to delete problem');
        }
    };

    const exportToCSV = () => {
        const csv = [
            ['ID', 'Name', 'Topic', 'Level', 'Content For', 'Companies', 'LeetCode Link', 'Article Link'],
            ...filteredProblems.map(problem => [
                problem.id,
                problem.name,
                problem.topic,
                problem.Level || '',
                problem.contentFor || '',
                problem.companies || '',
                problem.link || '',
                problem.article || ''
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sde-problems_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const getDifficultyColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-500';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-500';
            case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-500';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-500';
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProblems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

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

    if (loading && problems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading SDE problems...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white rounded-2xl p-8 mb-8 shadow-xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                                <Briefcase className="w-10 h-10" />
                                SDE Problem Management
                            </h1>
                            <p className="text-blue-100 dark:text-blue-200">Manage your Software Development Engineer problem collection</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleRefresh}
                                className={`flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-3 rounded-full font-semibold transition-all ${refreshing ? 'animate-spin' : ''}`}
                                disabled={refreshing}
                            >
                                <RefreshCw className="w-5 h-5" />
                                Refresh
                            </button>
                            <button
                                onClick={exportToCSV}
                                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all backdrop-blur-sm"
                            >
                                <Download className="w-5 h-5" />
                                Export CSV
                            </button>
                            <button
                                onClick={handleAdd}
                                className="flex items-center gap-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                Add Problem
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                    <StatCard
                        icon={Briefcase}
                        label="Total Problems"
                        value={stats.totalProblems}
                        color="border-blue-500"
                    />
                    <StatCard
                        icon={Award}
                        label="Easy"
                        value={stats.easyProblems}
                        color="border-green-500"
                    />
                    <StatCard
                        icon={Target}
                        label="Medium"
                        value={stats.mediumProblems}
                        color="border-yellow-500"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Hard"
                        value={stats.hardProblems}
                        color="border-red-500"
                    />
                    <StatCard
                        icon={Layers}
                        label="Topics"
                        value={stats.topics.length}
                        color="border-purple-500"
                    />
                    <StatCard
                        icon={Users}
                        label="Categories"
                        value={stats.contentForList.length}
                        color="border-orange-500"
                    />
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name, topic, companies, or ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Topic Filter */}
                        <div>
                            <select
                                value={topicFilter}
                                onChange={(e) => setTopicFilter(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer transition-colors"
                            >
                                <option value="all">All Topics</option>
                                {stats.topics.map(topic => (
                                    <option key={topic} value={topic}>{topic}</option>
                                ))}
                            </select>
                        </div>

                        {/* Level Filter */}
                        <div>
                            <select
                                value={levelFilter}
                                onChange={(e) => setLevelFilter(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer transition-colors"
                            >
                                <option value="all">All Levels</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        {/* ContentFor Filter */}
                        <div>
                            <select
                                value={contentForFilter}
                                onChange={(e) => setContentForFilter(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer transition-colors"
                            >
                                <option value="all">All Categories</option>
                                {stats.contentForList.map(cf => (
                                    <option key={cf} value={cf}>{cf}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <select
                                value={`${sortBy}-${sortOrder}`}
                                onChange={(e) => {
                                    const [field, order] = e.target.value.split('-');
                                    setSortBy(field);
                                    setSortOrder(order);
                                }}
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer transition-colors"
                            >
                                <option value="id-asc">ID (Low to High)</option>
                                <option value="id-desc">ID (High to Low)</option>
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="Level-asc">Difficulty (Easy→Hard)</option>
                                <option value="Level-desc">Difficulty (Hard→Easy)</option>
                            </select>
                        </div>
                    </div>

                    {/* Info Bar */}
                    <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Showing <span className="font-semibold">{filteredProblems.length}</span> of <span className="font-semibold">{problems.length}</span> problems
                                {filteredProblems.length !== problems.length && (
                                    <span className="ml-2 text-blue-600 dark:text-blue-400">(filtered)</span>
                                )}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="px-3 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={filteredProblems.length || 9999}>All ({filteredProblems.length})</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Problems Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {currentItems.length === 0 ? (
                        <div className="text-center py-20">
                            <Briefcase className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold mb-2">No SDE problems found</p>
                            <p className="text-gray-400 dark:text-gray-500">Try adjusting your filters or add a new problem</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Problem Name</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Topic</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Difficulty</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Companies</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Links</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {currentItems.map(problem => (
                                            <tr key={problem._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs font-bold">
                                                        #{problem.id}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="max-w-xs">
                                                        <p className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                                                            {problem.name}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-xs font-bold">
                                                        {problem.topic}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {problem.Level ? (
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getDifficultyColor(problem.Level)}`}>
                                                            {problem.Level}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 dark:text-gray-500 text-xs">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {problem.contentFor ? (
                                                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 rounded-full text-xs font-bold">
                                                            {problem.contentFor}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 dark:text-gray-500 text-xs">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {problem.companies ? (
                                                        <div className="flex items-center gap-1 max-w-xs">
                                                            <Building2 className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                                                            <span className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
                                                                {problem.companies}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 dark:text-gray-500 text-xs">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-2">
                                                        {problem.link && (
                                                            <a
                                                                href={problem.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded text-xs font-semibold hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                                                                title="LeetCode"
                                                            >
                                                                <LinkIcon className="w-3 h-3" />
                                                                LC
                                                            </a>
                                                        )}
                                                        {problem.article && (
                                                            <a
                                                                href={problem.article}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                                                title="Article"
                                                            >
                                                                <BookOpen className="w-3 h-3" />
                                                                Art
                                                            </a>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleView(problem)}
                                                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(problem)}
                                                            className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedProblem(problem);
                                                                setShowDeleteModal(true);
                                                            }}
                                                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, filteredProblems.length)}</span> of <span className="font-semibold">{filteredProblems.length}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className="p-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>

                                        <div className="flex items-center gap-1">
                                            {[...Array(totalPages)].map((_, idx) => {
                                                const page = idx + 1;
                                                if (
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <button
                                                            key={page}
                                                            onClick={() => setCurrentPage(page)}
                                                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === page
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                                                                }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                } else if (page === currentPage - 2 || page === currentPage + 2) {
                                                    return <span key={page} className="px-2 text-gray-500">...</span>;
                                                }
                                                return null;
                                            })}
                                        </div>

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                            className="p-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl my-8 shadow-2xl">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                {showEditModal ? <Edit className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                {showEditModal ? 'Edit SDE Problem' : 'Add New SDE Problem'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setShowEditModal(false);
                                }}
                                className="hover:bg-white/20 p-2 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Problem ID <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.id}
                                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 ${validationErrors.id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none`}
                                        placeholder="e.g., 1"
                                    />
                                    {validationErrors.id && <p className="text-red-500 text-xs mt-1">{validationErrors.id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Difficulty Level
                                    </label>
                                    <select
                                        value={formData.Level}
                                        onChange={(e) => setFormData({ ...formData, Level: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none cursor-pointer"
                                    >
                                        <option value="">Select level</option>
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Problem Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 ${validationErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none`}
                                        placeholder="e.g., Two Sum"
                                    />
                                    {validationErrors.name && <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        DSA Topic <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.topic}
                                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 ${validationErrors.topic ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none`}
                                        placeholder="e.g., Arrays, Hash Table"
                                    />
                                    {validationErrors.topic && <p className="text-red-500 text-xs mt-1">{validationErrors.topic}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Content For (Category)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.contentFor}
                                        onChange={(e) => setFormData({ ...formData, contentFor: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                                        placeholder="e.g., SDE Sheet, Striver"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Companies
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.companies}
                                        onChange={(e) => setFormData({ ...formData, companies: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                                        placeholder="e.g., Google, Amazon, Meta"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        LeetCode Link
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                                        placeholder="https://leetcode.com/problems/..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Article/Solution Link
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.article}
                                        onChange={(e) => setFormData({ ...formData, article: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setShowEditModal(false);
                                    }}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-bold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-xl font-bold transition-all transform hover:scale-105"
                                >
                                    <Save className="w-5 h-5" />
                                    {showEditModal ? 'Update Problem' : 'Create Problem'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {showViewModal && selectedProblem && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{selectedProblem.name}</h2>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                                        #{selectedProblem.id}
                                    </span>
                                    {selectedProblem.Level && (
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(selectedProblem.Level)}`}>
                                            {selectedProblem.Level}
                                        </span>
                                    )}
                                    {selectedProblem.contentFor && (
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                                            {selectedProblem.contentFor}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="hover:bg-white/20 p-2 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        <p className="font-bold text-gray-800 dark:text-gray-100">Topic</p>
                                    </div>
                                    <p className="text-lg text-gray-700 dark:text-gray-300">{selectedProblem.topic}</p>
                                </div>

                                {selectedProblem.companies && (
                                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Building2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                            <p className="font-bold text-gray-800 dark:text-gray-100">Companies</p>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{selectedProblem.companies}</p>
                                    </div>
                                )}
                            </div>

                            {selectedProblem.link && (
                                <a
                                    href={selectedProblem.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-colors"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    Open LeetCode Problem
                                </a>
                            )}

                            {selectedProblem.article && (
                                <a
                                    href={selectedProblem.article}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    Read Article/Solution
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedProblem && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Delete Problem</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Are you sure you want to delete <strong>"{selectedProblem.name}"</strong>?
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}