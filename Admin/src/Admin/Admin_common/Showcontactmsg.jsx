import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';
import {
    MessageSquare,
    Mail,
    Phone,
    User,
    Search,
    RefreshCw,
    Download,
    Eye,
    X,
    Filter,
    Calendar,
    Trash2
} from 'lucide-react';

const ShowContactMsg = () => {
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        filterMessages();
    }, [messages, searchTerm]);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/contact`);
            const data = Array.isArray(response.data) ? response.data : [];
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchMessages();
        setTimeout(() => setRefreshing(false), 500);
    };

    const filterMessages = () => {
        if (!searchTerm) {
            setFilteredMessages(messages);
        } else {
            const searchLower = searchTerm.toLowerCase();
            const filtered = messages.filter(msg =>
                msg.firstname?.toLowerCase().includes(searchLower) ||
                msg.lastname?.toLowerCase().includes(searchLower) ||
                msg.email?.toLowerCase().includes(searchLower) ||
                msg.phonenumber?.toLowerCase().includes(searchLower) ||
                msg.message?.toLowerCase().includes(searchLower)
            );
            setFilteredMessages(filtered);
        }
        setCurrentPage(1);
    };

    const exportToCSV = () => {
        const csv = [
            ['First Name', 'Last Name', 'Email', 'Phone', 'Message', 'Date'],
            ...filteredMessages.map(msg => [
                msg.firstname || '',
                msg.lastname || '',
                msg.email || '',
                msg.phonenumber || '',
                msg.message || '',
                msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'N/A'
            ])
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contact-messages_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredMessages.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);

    if (loading && messages.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading messages...</p>
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
                                <MessageSquare className="w-10 h-10" />
                                Contact Messages
                            </h1>
                            <p className="text-blue-100 dark:text-blue-200">View and manage contact form submissions</p>
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
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-500 mb-8 transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total Messages</p>
                            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{messages.length}</p>
                        </div>
                        <div className="p-4 rounded-full bg-purple-100 dark:opacity-20">
                            <MessageSquare className="w-8 h-8 text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, phone, or message..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                                />
                            </div>
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
                                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={filteredMessages.length || 9999}>All ({filteredMessages.length})</option>
                            </select>
                        </div>
                    </div>

                    {/* Info Bar */}
                    <div className="mt-4 flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Showing <span className="font-semibold">{filteredMessages.length}</span> of <span className="font-semibold">{messages.length}</span> messages
                            {filteredMessages.length !== messages.length && (
                                <span className="ml-2 text-blue-600 dark:text-blue-400">(filtered)</span>
                            )}
                        </span>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {currentItems.length === 0 ? (
                        <div className="text-center py-20">
                            <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold mb-2">No messages found</p>
                            <p className="text-gray-400 dark:text-gray-500">Contact form submissions will appear here</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">#</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Phone</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Message</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {currentItems.map((message, index) => (
                                            <tr key={message._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                                                        {indexOfFirstItem + index + 1}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            {message.firstname} {message.lastname}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                                            {message.email}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                                            {message.phonenumber}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 max-w-xs">
                                                        {message.message}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            {message.createdAt ? new Date(message.createdAt).toLocaleDateString() : 'N/A'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedMessage(message);
                                                            setShowViewModal(true);
                                                        }}
                                                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                                        title="View Full Message"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </button>
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
                                        Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, filteredMessages.length)}</span> of <span className="font-semibold">{filteredMessages.length}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
                                        >
                                            Previous
                                        </button>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* View Message Modal */}
            {showViewModal && selectedMessage && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
                            <h2 className="text-2xl font-bold">Message Details</h2>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="hover:bg-white/20 p-2 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        <p className="font-bold text-gray-800 dark:text-gray-100">Name</p>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {selectedMessage.firstname} {selectedMessage.lastname}
                                    </p>
                                </div>

                                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        <p className="font-bold text-gray-800 dark:text-gray-100">Email</p>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 break-all">
                                        {selectedMessage.email}
                                    </p>
                                </div>

                                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        <p className="font-bold text-gray-800 dark:text-gray-100">Phone</p>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {selectedMessage.phonenumber}
                                    </p>
                                </div>

                                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                        <p className="font-bold text-gray-800 dark:text-gray-100">Date</p>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                    <p className="font-bold text-gray-800 dark:text-gray-100">Message</p>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {selectedMessage.message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowContactMsg;