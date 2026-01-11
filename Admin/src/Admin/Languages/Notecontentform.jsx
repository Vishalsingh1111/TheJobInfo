import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';
import {
    FileText,
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
    Code as CodeIcon,
    Image as ImageIcon,
    RefreshCw,
    Layers,
    Calendar,
    BookOpen,
    List
} from 'lucide-react';

export default function NoteContentManagement() {
    const [contents, setContents] = useState([]);
    const [filteredContents, setFilteredContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');
    const [refreshing, setRefreshing] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        header: '',
        text: '',
        statement: '',
        substatement1: '',
        statement2: '',
        substatement2: '',
        statement3: '',
        substatement3: '',
        example: '',
        statement4: '',
        substatement4: '',
        code: '',
        explanation: '',
        statement5: '',
        substatement5: '',
        category: '',
        image: '',
        figtitle: ''
    });

    const [validationErrors, setValidationErrors] = useState({});

    // Calculate stats
    const [stats, setStats] = useState({
        totalContents: 0,
        categories: [],
        withCode: 0,
        withImage: 0
    });

    useEffect(() => {
        fetchContents();
    }, []);

    useEffect(() => {
        filterAndSortContents();
        calculateStats();
    }, [contents, searchTerm, categoryFilter, sortBy, sortOrder]);

    const fetchContents = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/notecontent`);
            const contentsData = Array.isArray(response.data) ? response.data : [];
            setContents(contentsData);
        } catch (error) {
            console.error('Error fetching contents:', error);
            setContents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchContents();
        setTimeout(() => setRefreshing(false), 500);
    };

    const calculateStats = () => {
        const categories = [...new Set(contents.map(content => content.category))];
        const withCode = contents.filter(c => c.code && c.code.trim()).length;
        const withImage = contents.filter(c => c.image && c.image.trim()).length;

        setStats({
            totalContents: contents.length,
            categories: categories,
            withCode: withCode,
            withImage: withImage
        });
    };

    const filterAndSortContents = () => {
        if (!Array.isArray(contents)) {
            setFilteredContents([]);
            return;
        }

        let filtered = [...contents];

        // Search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(content =>
                content.header?.toLowerCase().includes(searchLower) ||
                content.text?.toLowerCase().includes(searchLower) ||
                content.category?.toLowerCase().includes(searchLower) ||
                content.id?.toString().includes(searchTerm)
            );
        }

        // Category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(content => content.category === categoryFilter);
        }

        // Sorting
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'id':
                    aValue = a.id || 0;
                    bValue = b.id || 0;
                    break;
                case 'header':
                    aValue = (a.header || '').toLowerCase();
                    bValue = (b.header || '').toLowerCase();
                    break;
                case 'category':
                    aValue = (a.category || '').toLowerCase();
                    bValue = (b.category || '').toLowerCase();
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

        setFilteredContents(filtered);
        setCurrentPage(1);
    };

    const handleAdd = () => {
        setFormData({
            id: '',
            header: '',
            text: '',
            statement: '',
            substatement1: '',
            statement2: '',
            substatement2: '',
            statement3: '',
            substatement3: '',
            example: '',
            statement4: '',
            substatement4: '',
            code: '',
            explanation: '',
            statement5: '',
            substatement5: '',
            category: '',
            image: '',
            figtitle: ''
        });
        setValidationErrors({});
        setShowAddModal(true);
    };

    const handleEdit = (content) => {
        setSelectedContent(content);
        setFormData({
            id: content.id,
            header: content.header || '',
            text: content.text || '',
            statement: content.statement || '',
            substatement1: content.substatement1 || '',
            statement2: content.statement2 || '',
            substatement2: content.substatement2 || '',
            statement3: content.statement3 || '',
            substatement3: content.substatement3 || '',
            example: content.example || '',
            statement4: content.statement4 || '',
            substatement4: content.substatement4 || '',
            code: content.code || '',
            explanation: content.explanation || '',
            statement5: content.statement5 || '',
            substatement5: content.substatement5 || '',
            category: content.category || '',
            image: content.image || '',
            figtitle: content.figtitle || ''
        });
        setValidationErrors({});
        setShowEditModal(true);
    };

    const handleView = (content) => {
        setSelectedContent(content);
        setShowViewModal(true);
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.id) errors.id = 'ID is required';
        if (!formData.header) errors.header = 'Header is required';
        if (!formData.text) errors.text = 'Text is required';
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
                await axios.put(`${baseUrl}/notecontent/${selectedContent._id}`, formData);
                alert('✅ Content updated successfully!');
            } else {
                await axios.post(`${baseUrl}/notecontent`, formData);
                alert('✅ Content created successfully!');
            }

            setShowAddModal(false);
            setShowEditModal(false);
            fetchContents();
        } catch (error) {
            console.error('Error submitting content:', error);
            alert('❌ ' + (error.response?.data?.error || 'Failed to submit content'));
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/notecontent/${selectedContent._id}`);
            alert('✅ Content deleted successfully!');
            setShowDeleteModal(false);
            fetchContents();
        } catch (error) {
            console.error('Error deleting content:', error);
            alert('❌ Failed to delete content');
        }
    };

    const exportToCSV = () => {
        const csv = [
            ['ID', 'Header', 'Category', 'Has Code', 'Has Image'],
            ...filteredContents.map(content => [
                content.id,
                content.header,
                content.category,
                content.code ? 'Yes' : 'No',
                content.image ? 'Yes' : 'No'
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `note-contents_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredContents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredContents.length / itemsPerPage);

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

    if (loading && contents.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading contents...</p>
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
                                <FileText className="w-10 h-10" />
                                Note Content Management
                            </h1>
                            <p className="text-blue-100 dark:text-blue-200">Manage your detailed educational content</p>
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
                                Add New Content
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={BookOpen}
                        label="Total Contents"
                        value={stats.totalContents}
                        color="border-blue-500"
                    />
                    <StatCard
                        icon={Layers}
                        label="Categories"
                        value={stats.categories.length}
                        color="border-purple-500"
                    />
                    <StatCard
                        icon={CodeIcon}
                        label="With Code"
                        value={stats.withCode}
                        color="border-green-500"
                    />
                    <StatCard
                        icon={ImageIcon}
                        label="With Images"
                        value={stats.withImage}
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
                                    placeholder="Search by header, text, category, or ID..."
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
                                <option value="id-desc">ID (High to Low)</option>
                                <option value="id-asc">ID (Low to High)</option>
                                <option value="header-asc">Header (A-Z)</option>
                                <option value="header-desc">Header (Z-A)</option>
                                <option value="category-asc">Category (A-Z)</option>
                            </select>
                        </div>
                    </div>

                    {/* Info Bar */}
                    <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Showing <span className="font-semibold">{filteredContents.length}</span> of <span className="font-semibold">{contents.length}</span> contents
                                {filteredContents.length !== contents.length && (
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
                                <option value={filteredContents.length || 9999}>All ({filteredContents.length})</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Contents Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {currentItems.length === 0 ? (
                        <div className="text-center py-20">
                            <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold mb-2">No contents found</p>
                            <p className="text-gray-400 dark:text-gray-500">Try adjusting your filters or create new content</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Header</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Preview</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Features</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {currentItems.map(content => (
                                            <tr key={content._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs font-bold">
                                                        #{content.id}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="max-w-xs">
                                                        <p className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                                                            {content.header}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-xs font-bold">
                                                        {content.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 max-w-xs">
                                                        {content.text}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-2">
                                                        {content.code && (
                                                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-semibold flex items-center gap-1">
                                                                <CodeIcon className="w-3 h-3" />
                                                                Code
                                                            </span>
                                                        )}
                                                        {content.image && (
                                                            <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded text-xs font-semibold flex items-center gap-1">
                                                                <ImageIcon className="w-3 h-3" />
                                                                Image
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleView(content)}
                                                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(content)}
                                                            className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedContent(content);
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
                                        Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, filteredContents.length)}</span> of <span className="font-semibold">{filteredContents.length}</span>
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

            {/* Add/Edit Modal - Due to character limit, continuing in next response */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-6xl my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-6 flex justify-between items-center z-10 rounded-t-2xl">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                {showEditModal ? <Edit className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                {showEditModal ? 'Edit Content' : 'Add New Content'}
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
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        ID <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.id}
                                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 ${validationErrors.id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none`}
                                        placeholder="Enter ID"
                                    />
                                    {validationErrors.id && <p className="text-red-500 text-xs mt-1">{validationErrors.id}</p>}
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
                                        placeholder="Enter category"
                                    />
                                    {validationErrors.category && <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>}
                                </div>
                            </div>

                            {/* Header */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Header <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.header}
                                    onChange={(e) => setFormData({ ...formData, header: e.target.value })}
                                    className={`w-full px-4 py-3 border-2 ${validationErrors.header ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none`}
                                    rows="2"
                                    placeholder="Enter header"
                                />
                                {validationErrors.header && <p className="text-red-500 text-xs mt-1">{validationErrors.header}</p>}
                            </div>

                            {/* Text */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Text <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.text}
                                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                    className={`w-full px-4 py-3 border-2 ${validationErrors.text ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none`}
                                    rows="3"
                                    placeholder="Enter main text"
                                />
                                {validationErrors.text && <p className="text-red-500 text-xs mt-1">{validationErrors.text}</p>}
                            </div>

                            {/* Statements Grid */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Content Sections (Optional)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { name: 'statement', sub: 'substatement1', label: 'Section 1' },
                                        { name: 'statement2', sub: 'substatement2', label: 'Section 2' },
                                        { name: 'statement3', sub: 'substatement3', label: 'Section 3' },
                                        { name: 'statement4', sub: 'substatement4', label: 'Section 4' },
                                        { name: 'statement5', sub: 'substatement5', label: 'Section 5' }
                                    ].map((section, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                                    {section.label} Statement
                                                </label>
                                                <textarea
                                                    value={formData[section.name]}
                                                    onChange={(e) => setFormData({ ...formData, [section.name]: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none resize-none"
                                                    rows="2"
                                                    placeholder={`Enter ${section.label.toLowerCase()} statement`}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                                    {section.label} Substatement
                                                </label>
                                                <textarea
                                                    value={formData[section.sub]}
                                                    onChange={(e) => setFormData({ ...formData, [section.sub]: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none resize-none"
                                                    rows="2"
                                                    placeholder={`Enter ${section.label.toLowerCase()} substatement`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Example */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Example
                                </label>
                                <textarea
                                    value={formData.example}
                                    onChange={(e) => setFormData({ ...formData, example: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                                    rows="3"
                                    placeholder="Enter example"
                                />
                            </div>

                            {/* Code & Explanation */}
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Code Section (Optional)</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Code
                                        </label>
                                        <textarea
                                            value={formData.code}
                                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
                                            rows="6"
                                            placeholder="Enter code here..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Explanation
                                        </label>
                                        <textarea
                                            value={formData.explanation}
                                            onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                                            rows="3"
                                            placeholder="Explain the code..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                                        placeholder="https://example.com/image.png"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Figure Title
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.figtitle}
                                        onChange={(e) => setFormData({ ...formData, figtitle: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                                        placeholder="Enter figure title"
                                    />
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-4 sticky bottom-0 bg-white dark:bg-gray-800 pt-4 border-t border-gray-200 dark:border-gray-700">
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
                                    {showEditModal ? 'Update Content' : 'Create Content'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {showViewModal && selectedContent && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center z-10 rounded-t-2xl">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{selectedContent.header}</h2>
                                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                                    #{selectedContent.id} • {selectedContent.category}
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
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                                <p className="text-gray-800 dark:text-gray-200">{selectedContent.text}</p>
                            </div>

                            {[
                                { stmt: selectedContent.statement, sub: selectedContent.substatement1, num: 1 },
                                { stmt: selectedContent.statement2, sub: selectedContent.substatement2, num: 2 },
                                { stmt: selectedContent.statement3, sub: selectedContent.substatement3, num: 3 },
                                { stmt: selectedContent.statement4, sub: selectedContent.substatement4, num: 4 },
                                { stmt: selectedContent.statement5, sub: selectedContent.substatement5, num: 5 }
                            ].map((section, idx) => (
                                (section.stmt || section.sub) && (
                                    <div key={idx} className="border-l-4 border-purple-500 pl-4">
                                        {section.stmt && <p className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{section.stmt}</p>}
                                        {section.sub && <p className="text-gray-600 dark:text-gray-400">{section.sub}</p>}
                                    </div>
                                )
                            ))}

                            {selectedContent.example && (
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                                    <p className="font-bold text-gray-800 dark:text-gray-100 mb-2">Example:</p>
                                    <p className="text-gray-700 dark:text-gray-300">{selectedContent.example}</p>
                                </div>
                            )}

                            {selectedContent.code && (
                                <div className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto">
                                    <pre className="text-sm"><code>{selectedContent.code}</code></pre>
                                </div>
                            )}

                            {selectedContent.explanation && (
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                                    <p className="text-gray-700 dark:text-gray-300">{selectedContent.explanation}</p>
                                </div>
                            )}

                            {selectedContent.image && (
                                <div>
                                    <img src={selectedContent.image} alt={selectedContent.figtitle} className="w-full rounded-xl" onError={(e) => e.target.style.display = 'none'} />
                                    {selectedContent.figtitle && <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">{selectedContent.figtitle}</p>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedContent && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Delete Content</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Are you sure you want to permanently delete <strong>"{selectedContent.header}"</strong>?
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