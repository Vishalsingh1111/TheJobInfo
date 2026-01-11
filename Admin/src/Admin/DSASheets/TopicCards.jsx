import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';
import {
    Sheet as SheetIcon,
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
    Tag,
    Hash,
    BookOpen,
    RefreshCw,
    Layers,
    TrendingUp,
    CheckCircle,
    ListChecks,
    Target
} from 'lucide-react';

export default function SheetManagement() {
    const [sheets, setSheets] = useState([]);
    const [filteredSheets, setFilteredSheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedSheet, setSelectedSheet] = useState(null);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [refreshing, setRefreshing] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        Problems: '',
        Topic: ''
    });

    const [validationErrors, setValidationErrors] = useState({});

    // Calculate stats
    const [stats, setStats] = useState({
        totalSheets: 0,
        totalProblems: 0,
        categories: [],
        avgProblems: 0
    });

    useEffect(() => {
        fetchSheets();
    }, []);

    useEffect(() => {
        filterAndSortSheets();
        calculateStats();
    }, [sheets, searchTerm, categoryFilter, sortBy, sortOrder]);

    const fetchSheets = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/sheet`);
            const sheetsData = Array.isArray(response.data) ? response.data : [];
            setSheets(sheetsData);
        } catch (error) {
            console.error('Error fetching sheets:', error);
            setSheets([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchSheets();
        setTimeout(() => setRefreshing(false), 500);
    };

    const calculateStats = () => {
        const categories = [...new Set(sheets.map(sheet => sheet.category))];
        const totalProblems = sheets.reduce((sum, sheet) => sum + (parseInt(sheet.Problems) || 0), 0);
        const avgProblems = sheets.length > 0 ? totalProblems / sheets.length : 0;

        setStats({
            totalSheets: sheets.length,
            totalProblems: totalProblems,
            categories: categories,
            avgProblems: Math.round(avgProblems)
        });
    };

    const filterAndSortSheets = () => {
        if (!Array.isArray(sheets)) {
            setFilteredSheets([]);
            return;
        }

        let filtered = [...sheets];

        // Search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(sheet =>
                sheet.name?.toLowerCase().includes(searchLower) ||
                sheet.category?.toLowerCase().includes(searchLower) ||
                sheet.Topic?.toLowerCase().includes(searchLower)
            );
        }

        // Category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(sheet => sheet.category === categoryFilter);
        }

        // Sorting
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'name':
                    aValue = (a.name || '').toLowerCase();
                    bValue = (b.name || '').toLowerCase();
                    break;
                case 'category':
                    aValue = (a.category || '').toLowerCase();
                    bValue = (b.category || '').toLowerCase();
                    break;
                case 'Problems':
                    aValue = parseInt(a.Problems) || 0;
                    bValue = parseInt(b.Problems) || 0;
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

        setFilteredSheets(filtered);
        setCurrentPage(1);
    };

    const handleAdd = () => {
        setFormData({
            name: '',
            category: '',
            Problems: '',
            Topic: ''
        });
        setValidationErrors({});
        setShowAddModal(true);
    };

    const handleEdit = (sheet) => {
        setSelectedSheet(sheet);
        setFormData({
            name: sheet.name || '',
            category: sheet.category || '',
            Problems: sheet.Problems || '',
            Topic: sheet.Topic || ''
        });
        setValidationErrors({});
        setShowEditModal(true);
    };

    const handleView = (sheet) => {
        setSelectedSheet(sheet);
        setShowViewModal(true);
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.category) errors.category = 'Category is required';

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
                await axios.put(`${baseUrl}/sheet/${selectedSheet._id}`, formData);
                alert('✅ Sheet updated successfully!');
            } else {
                await axios.post(`${baseUrl}/sheet`, formData);
                alert('✅ Sheet created successfully!');
            }

            setShowAddModal(false);
            setShowEditModal(false);
            fetchSheets();
        } catch (error) {
            console.error('Error submitting sheet:', error);
            alert('❌ ' + (error.response?.data?.error || 'Failed to submit sheet'));
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/sheet/${selectedSheet._id}`);
            alert('✅ Sheet deleted successfully!');
            setShowDeleteModal(false);
            fetchSheets();
        } catch (error) {
            console.error('Error deleting sheet:', error);
            alert('❌ Failed to delete sheet');
        }
    };

    const exportToCSV = () => {
        const csv = [
            ['Name', 'Category', 'Problems', 'Topic'],
            ...filteredSheets.map(sheet => [
                sheet.name,
                sheet.category,
                sheet.Problems || 0,
                sheet.Topic || ''
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sheets_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSheets.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredSheets.length / itemsPerPage);

    const StatCard = ({ icon: Icon, label, value, color, subtitle }) => (
        <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 ${color} transform hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{label}</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
                    )}
                </div>
                <div className={`p-4 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} dark:opacity-20`}>
                    <Icon className={`w-8 h-8 ${color.replace('border-', 'text-')}`} />
                </div>
            </div>
        </div>
    );

    if (loading && sheets.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading sheets...</p>
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
                                <SheetIcon className="w-10 h-10" />
                                Problem Sheet Management
                            </h1>
                            <p className="text-blue-100 dark:text-blue-200">Manage your coding problem sheets and topics</p>
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
                                Add New Sheet
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={SheetIcon}
                        label="Total Sheets"
                        value={stats.totalSheets}
                        color="border-blue-500"
                    />
                    <StatCard
                        icon={ListChecks}
                        label="Total Problems"
                        value={stats.totalProblems}
                        color="border-green-500"
                    />
                    <StatCard
                        icon={Target}
                        label="Avg Problems/Sheet"
                        value={stats.avgProblems}
                        color="border-purple-500"
                    />
                    <StatCard
                        icon={Layers}
                        label="Categories"
                        value={stats.categories.length}
                        color="border-orange-500"
                    />
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name, category, or topic..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer transition-colors"
                            >
                                <option value="all">All Categories</option>
                                {stats.categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
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
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="category-asc">Category (A-Z)</option>
                                <option value="Problems-desc">Problems (High to Low)</option>
                                <option value="Problems-asc">Problems (Low to High)</option>
                            </select>
                        </div>
                    </div>

                    {/* Info Bar */}
                    <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Showing <span className="font-semibold">{filteredSheets.length}</span> of <span className="font-semibold">{sheets.length}</span> sheets
                                {filteredSheets.length !== sheets.length && (
                                    <span className="ml-2 text-blue-600 dark:text-blue-400">(filtered)</span>
                                )}
                            </span>
                        </div>

                        {/* Items per page */}
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
                                <option value={filteredSheets.length || 9999}>All ({filteredSheets.length})</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Sheets Grid View */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentItems.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-white dark:bg-gray-800 rounded-xl">
                            <SheetIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold mb-2">No sheets found</p>
                            <p className="text-gray-400 dark:text-gray-500">Try adjusting your filters or create a new sheet</p>
                        </div>
                    ) : (
                        currentItems.map(sheet => (
                            <div key={sheet._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 relative">
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                                            {sheet.category}
                                        </span>
                                    </div>
                                    <SheetIcon className="w-12 h-12 text-white/80 mb-3" />
                                    <h3 className="text-xl font-bold text-white line-clamp-2 mb-2">{sheet.name}</h3>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 space-y-4">
                                    {/* Problems Count */}
                                    <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                                                <ListChecks className="w-6 h-6 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Total Problems</p>
                                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{sheet.Problems || 0}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Topic */}
                                    {sheet.Topic && (
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                            <div className="flex items-start gap-2">
                                                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">Topic</p>
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">{sheet.Topic}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            onClick={() => handleView(sheet)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleEdit(sheet)}
                                            className="flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedSheet(sheet);
                                                setShowDeleteModal(true);
                                            }}
                                            className="flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, filteredSheets.length)}</span> of <span className="font-semibold">{filteredSheets.length}</span>
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
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-6 flex justify-between items-center rounded-t-2xl">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                {showEditModal ? <Edit className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                {showEditModal ? 'Edit Sheet' : 'Add New Sheet'}
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

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Sheet Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 ${validationErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none`}
                                        placeholder="e.g., Array Problems"
                                    />
                                    {validationErrors.name && <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 ${validationErrors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none`}
                                        placeholder="e.g., Data Structures"
                                    />
                                    {validationErrors.category && <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Total Problems
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.Problems}
                                        onChange={(e) => setFormData({ ...formData, Problems: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                                        placeholder="e.g., 50"
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Topic
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.Topic}
                                        onChange={(e) => setFormData({ ...formData, Topic: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                                        placeholder="e.g., Advanced Techniques"
                                    />
                                </div>
                            </div>

                            {/* Submit Buttons */}
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
                                    {showEditModal ? 'Update Sheet' : 'Create Sheet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {showViewModal && selectedSheet && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{selectedSheet.name}</h2>
                                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                                    {selectedSheet.category}
                                </span>
                            </div>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="hover:bg-white/20 p-2 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <ListChecks className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        <p className="font-bold text-gray-800 dark:text-gray-100">Problems</p>
                                    </div>
                                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{selectedSheet.Problems || 0}</p>
                                </div>

                                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        <p className="font-bold text-gray-800 dark:text-gray-100">Category</p>
                                    </div>
                                    <p className="text-lg text-gray-700 dark:text-gray-300">{selectedSheet.category}</p>
                                </div>
                            </div>

                            {selectedSheet.Topic && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        <p className="font-bold text-gray-800 dark:text-gray-100">Topic</p>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">{selectedSheet.Topic}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedSheet && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Delete Sheet</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Are you sure you want to permanently delete <strong>"{selectedSheet.name}"</strong>?
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