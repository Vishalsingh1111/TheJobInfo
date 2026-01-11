import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';
import {
    ShoppingBag,
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
    DollarSign,
    Package,
    TrendingUp,
    RefreshCw,
    ExternalLink,
    Image as ImageIcon,
    Calendar,
    Layers
} from 'lucide-react';

export default function NoteManagement() {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');
    const [refreshing, setRefreshing] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        link: '',
        name: '',
        category: '',
        title: '',
        price: '',
        image: ''
    });

    const [validationErrors, setValidationErrors] = useState({});

    // Calculate stats from notes
    const [stats, setStats] = useState({
        totalNotes: 0,
        totalValue: 0,
        categories: [],
        avgPrice: 0
    });

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        filterAndSortNotes();
        calculateStats();
    }, [notes, searchTerm, categoryFilter, sortBy, sortOrder]);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/note`);
            const notesData = Array.isArray(response.data) ? response.data : [];
            setNotes(notesData);
        } catch (error) {
            console.error('Error fetching notes:', error);
            setNotes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchNotes();
        setTimeout(() => setRefreshing(false), 500);
    };

    const calculateStats = () => {
        const categories = [...new Set(notes.map(note => note.category))];
        const totalValue = notes.reduce((sum, note) => sum + (parseFloat(note.price) || 0), 0);
        const avgPrice = notes.length > 0 ? totalValue / notes.length : 0;

        setStats({
            totalNotes: notes.length,
            totalValue: totalValue,
            categories: categories,
            avgPrice: avgPrice
        });
    };

    const filterAndSortNotes = () => {
        if (!Array.isArray(notes)) {
            setFilteredNotes([]);
            return;
        }

        let filtered = [...notes];

        // Search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(note =>
                note.name?.toLowerCase().includes(searchLower) ||
                note.title?.toLowerCase().includes(searchLower) ||
                note.category?.toLowerCase().includes(searchLower) ||
                note.id?.toString().includes(searchTerm)
            );
        }

        // Category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(note => note.category === categoryFilter);
        }

        // Sorting
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'id':
                    aValue = a.id || 0;
                    bValue = b.id || 0;
                    break;
                case 'name':
                    aValue = (a.name || '').toLowerCase();
                    bValue = (b.name || '').toLowerCase();
                    break;
                case 'price':
                    aValue = parseFloat(a.price) || 0;
                    bValue = parseFloat(b.price) || 0;
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

        setFilteredNotes(filtered);
        setCurrentPage(1);
    };

    const handleAdd = () => {
        setFormData({
            id: '',
            link: '',
            name: '',
            category: '',
            title: '',
            price: '',
            image: ''
        });
        setValidationErrors({});
        setShowAddModal(true);
    };

    const handleEdit = (note) => {
        setSelectedNote(note);
        setFormData({
            id: note.id,
            link: note.link || '',
            name: note.name || '',
            category: note.category || '',
            title: note.title || '',
            price: note.price || '',
            image: note.image || ''
        });
        setValidationErrors({});
        setShowEditModal(true);
    };

    const handleView = (note) => {
        setSelectedNote(note);
        setShowViewModal(true);
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.id) errors.id = 'ID is required';
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.category) errors.category = 'Category is required';
        if (!formData.title) errors.title = 'Title is required';
        if (!formData.price) errors.price = 'Price is required';
        if (!formData.link) errors.link = 'Link is required';
        if (!formData.image) errors.image = 'Image is required';

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
                await axios.put(`${baseUrl}/note/${selectedNote._id}`, formData);
                alert('✅ Card updated successfully!');
            } else {
                await axios.post(`${baseUrl}/note`, formData);
                alert('✅ Card created successfully!');
            }

            setShowAddModal(false);
            setShowEditModal(false);
            fetchNotes();
        } catch (error) {
            console.error('Error submitting note:', error);
            alert('❌ ' + (error.response?.data?.error || 'Failed to submit card'));
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/note/${selectedNote._id}`);
            alert('✅ Card deleted successfully!');
            setShowDeleteModal(false);
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
            alert('❌ Failed to delete card');
        }
    };

    const exportToCSV = () => {
        const csv = [
            ['ID', 'Name', 'Category', 'Title', 'Price', 'Link'],
            ...filteredNotes.map(note => [
                note.id,
                note.name,
                note.category,
                note.title,
                note.price,
                note.link
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cards_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredNotes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);

    const StatCard = ({ icon: Icon, label, value, color, format }) => (
        <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 ${color} transform hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{label}</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        {format === 'currency' ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : value}
                    </p>
                </div>
                <div className={`p-4 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} dark:opacity-20`}>
                    <Icon className={`w-8 h-8 ${color.replace('border-', 'text-')}`} />
                </div>
            </div>
        </div>
    );

    if (loading && notes.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading cards...</p>
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
                                <ShoppingBag className="w-10 h-10" />
                                Card Management
                            </h1>
                            <p className="text-blue-100 dark:text-blue-200">Manage your product cards and inventory</p>
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
                                Add New Card
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={Package}
                        label="Total Cards"
                        value={stats.totalNotes}
                        color="border-blue-500"
                    />
                    <StatCard
                        icon={DollarSign}
                        label="Total Value"
                        value={stats.totalValue}
                        color="border-green-500"
                        format="currency"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Average Price"
                        value={stats.avgPrice}
                        color="border-purple-500"
                        format="currency"
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
                                    placeholder="Search cards by name, title, category, or ID..."
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
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="price-desc">Price (High to Low)</option>
                                <option value="price-asc">Price (Low to High)</option>
                                <option value="category-asc">Category (A-Z)</option>
                            </select>
                        </div>
                    </div>

                    {/* Info Bar */}
                    <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Showing <span className="font-semibold">{filteredNotes.length}</span> of <span className="font-semibold">{notes.length}</span> cards
                                {filteredNotes.length !== notes.length && (
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
                                <option value={filteredNotes.length || 9999}>All ({filteredNotes.length})</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Cards Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {currentItems.length === 0 ? (
                        <div className="text-center py-20">
                            <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold mb-2">No cards found</p>
                            <p className="text-gray-400 dark:text-gray-500">Try adjusting your filters or create a new card</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Product</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {currentItems.map(note => (
                                            <tr key={note._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs font-bold">
                                                        #{note.id}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {note.image ? (
                                                            <img
                                                                src={note.image}
                                                                alt={note.name}
                                                                className="w-12 h-12 rounded-lg object-cover"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    e.target.nextSibling.style.display = 'flex';
                                                                }}
                                                            />
                                                        ) : null}
                                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg items-center justify-center text-white font-bold" style={{ display: note.image ? 'none' : 'flex' }}>
                                                            <ShoppingBag className="w-6 h-6" />
                                                        </div>
                                                        <div className="max-w-xs">
                                                            <p className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
                                                                {note.name}
                                                            </p>
                                                            {note.link && (
                                                                <a
                                                                    href={note.link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                                                >
                                                                    <ExternalLink className="w-3 h-3" />
                                                                    View Link
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-xs font-bold">
                                                        {note.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 max-w-xs">
                                                        {note.title}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                                        ${parseFloat(note.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleView(note)}
                                                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(note)}
                                                            className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedNote(note);
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
                                        Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, filteredNotes.length)}</span> of <span className="font-semibold">{filteredNotes.length}</span>
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
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl my-8 shadow-2xl">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-6 flex justify-between items-center z-10 rounded-t-2xl">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                {showEditModal ? <Edit className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                {showEditModal ? 'Edit Card' : 'Add New Card'}
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
                        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                            {/* Basic Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        ID <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.id}
                                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 ${validationErrors.id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`}
                                        placeholder="Enter unique ID"
                                    />
                                    {validationErrors.id && <p className="text-red-500 text-xs mt-1">{validationErrors.id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 ${validationErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`}
                                        placeholder="Enter product name"
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
                                        className={`w-full px-4 py-3 border-2 ${validationErrors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`}
                                        placeholder="e.g., Electronics, Clothing"
                                    />
                                    {validationErrors.category && <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Price <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 ${validationErrors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`}
                                        placeholder="0.00"
                                    />
                                    {validationErrors.price && <p className="text-red-500 text-xs mt-1">{validationErrors.price}</p>}
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className={`w-full px-4 py-3 border-2 ${validationErrors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`}
                                    placeholder="Enter product title/description"
                                />
                                {validationErrors.title && <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>}
                            </div>

                            {/* Link and Image */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Product Link <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 ${validationErrors.link ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`}
                                        placeholder="https://example.com/product"
                                    />
                                    {validationErrors.link && <p className="text-red-500 text-xs mt-1">{validationErrors.link}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Image URL <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 ${validationErrors.image ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {validationErrors.image && <p className="text-red-500 text-xs mt-1">{validationErrors.image}</p>}
                                </div>
                            </div>

                            {/* Image Preview */}
                            {formData.image && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Image Preview
                                    </label>
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-xl"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-xl items-center justify-center text-gray-400 dark:text-gray-500" style={{ display: 'none' }}>
                                        <ImageIcon className="w-12 h-12" />
                                        <p className="mt-2">Invalid image URL</p>
                                    </div>
                                </div>
                            )}

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
                                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white px-6 py-3 rounded-xl hover:shadow-xl font-bold transition-all transform hover:scale-105"
                                >
                                    <Save className="w-5 h-5" />
                                    {showEditModal ? 'Update Card' : 'Create Card'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {showViewModal && selectedNote && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl my-8 shadow-2xl">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-6 flex justify-between items-center z-10 rounded-t-2xl">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{selectedNote.name}</h2>
                                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                                    #{selectedNote.id}
                                </span>
                            </div>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="hover:bg-white/20 p-2 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Image */}
                            {selectedNote.image && (
                                <div>
                                    <img
                                        src={selectedNote.image}
                                        alt={selectedNote.name}
                                        className="w-full h-64 object-cover rounded-xl"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        <p className="font-bold text-gray-800 dark:text-gray-100">Category</p>
                                    </div>
                                    <p className="text-lg text-gray-700 dark:text-gray-300">{selectedNote.category}</p>
                                </div>

                                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        <p className="font-bold text-gray-800 dark:text-gray-100">Price</p>
                                    </div>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                        ${parseFloat(selectedNote.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                                <p className="font-bold text-gray-800 dark:text-gray-100 mb-2">Title/Description</p>
                                <p className="text-gray-700 dark:text-gray-300">{selectedNote.title}</p>
                            </div>

                            {/* Link */}
                            {selectedNote.link && (
                                <div>
                                    <a
                                        href={selectedNote.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        View Product
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedNote && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Delete Card</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Are you sure you want to permanently delete <strong>"{selectedNote.name}"</strong>? This action cannot be undone.
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