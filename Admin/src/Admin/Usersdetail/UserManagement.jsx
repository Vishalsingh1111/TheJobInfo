import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';
import {
    Users,
    UserCheck,
    UserX,
    Clock,
    Shield,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    Calendar,
    TrendingUp,
    Mail,
    Phone,
    CheckCircle,
    XCircle,
    AlertCircle,
    Trash2,
    Eye,
    Download,
    RefreshCw,
    FileText,
    BarChart3,
    Activity,
    Zap,
    UserPlus
} from 'lucide-react';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [verificationFilter, setVerificationFilter] = useState('all');
    const [authMethodFilter, setAuthMethodFilter] = useState('all');
    const [dateRangeFilter, setDateRangeFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [stats, setStats] = useState({
        totalUsers: 0,
        verifiedUsers: 0,
        unverifiedUsers: 0,
        googleUsers: 0,
        regularUsers: 0,
        recentUsers: 0,
        todayUsers: 0,
        usersWithPhone: 0,
        usersWithPhoto: 0
    });
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterAndSortUsers();
    }, [users, searchTerm, verificationFilter, authMethodFilter, dateRangeFilter, sortBy, sortOrder]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            // Backend returns all users without pagination
            const response = await axios.get(`${baseUrl}/user`);

            // Handle different response structures
            let userData = [];
            if (Array.isArray(response.data)) {
                userData = response.data;
            } else if (response.data.users && Array.isArray(response.data.users)) {
                userData = response.data.users;
            } else if (response.data.data && Array.isArray(response.data.data)) {
                userData = response.data.data;
            }

            console.log(`Fetched ${userData.length} users from API`);
            setUsers(userData);
            calculateStats(userData);
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('❌ Failed to fetch users');
            setUsers([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchUsers();
        setTimeout(() => setRefreshing(false), 500);
    };

    const calculateStats = (userData) => {
        // Safety check - ensure userData is an array
        if (!Array.isArray(userData)) {
            setStats({
                totalUsers: 0,
                verifiedUsers: 0,
                unverifiedUsers: 0,
                googleUsers: 0,
                regularUsers: 0,
                recentUsers: 0,
                todayUsers: 0,
                usersWithPhone: 0,
                usersWithPhoto: 0
            });
            return;
        }

        const now = new Date();
        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);

        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const stats = {
            totalUsers: userData.length,
            verifiedUsers: userData.filter(u => u.otpVerified).length,
            unverifiedUsers: userData.filter(u => !u.otpVerified).length,
            googleUsers: userData.filter(u => u.googleId && u.googleId !== 'null').length,
            regularUsers: userData.filter(u => !u.googleId || u.googleId === 'null').length,
            recentUsers: userData.filter(u => {
                const createdDate = u.createdAt ? new Date(u.createdAt) : null;
                return createdDate && createdDate >= thirtyDaysAgo;
            }).length,
            todayUsers: userData.filter(u => {
                const createdDate = u.createdAt ? new Date(u.createdAt) : null;
                if (!createdDate) return false;
                const userDateStart = new Date(createdDate);
                userDateStart.setHours(0, 0, 0, 0);
                return userDateStart.getTime() === todayStart.getTime();
            }).length,
            usersWithPhone: userData.filter(u => u.phone && u.phone !== 'null' && u.phone.trim() !== '').length,
            usersWithPhoto: userData.filter(u => u.photo && u.photo !== 'null' && u.photo.trim() !== '').length
        };

        setStats(stats);
    };

    const filterAndSortUsers = () => {
        // Safety check - ensure users is an array
        if (!Array.isArray(users)) {
            setFilteredUsers([]);
            return;
        }

        let filtered = [...users];

        // Search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(user => {
                const firstName = user.firstName || '';
                const lastName = user.lastName || '';
                const fullName = `${firstName} ${lastName}`.toLowerCase();
                const email = (user.email || '').toLowerCase();
                const phone = user.phone || '';

                return fullName.includes(searchLower) ||
                    email.includes(searchLower) ||
                    (phone !== 'null' && phone.includes(searchTerm));
            });
        }

        // Verification filter
        if (verificationFilter !== 'all') {
            filtered = filtered.filter(user =>
                verificationFilter === 'verified' ? user.otpVerified : !user.otpVerified
            );
        }

        // Auth method filter
        if (authMethodFilter !== 'all') {
            filtered = filtered.filter(user =>
                authMethodFilter === 'google'
                    ? (user.googleId && user.googleId !== 'null')
                    : (!user.googleId || user.googleId === 'null')
            );
        }

        // Date range filter - FIX: Don't mutate the date object
        if (dateRangeFilter !== 'all') {
            const now = new Date();
            let startDate;

            switch (dateRangeFilter) {
                case 'today':
                    startDate = new Date();
                    startDate.setHours(0, 0, 0, 0);
                    break;
                case 'week':
                    startDate = new Date();
                    startDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    startDate = new Date();
                    startDate.setMonth(now.getMonth() - 1);
                    break;
                case 'year':
                    startDate = new Date();
                    startDate.setFullYear(now.getFullYear() - 1);
                    break;
                default:
                    startDate = null;
            }

            if (startDate) {
                filtered = filtered.filter(user => {
                    const createdDate = user.createdAt ? new Date(user.createdAt) : null;
                    return createdDate && createdDate >= startDate;
                });
            }
        }

        // Sorting
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'firstName':
                    aValue = (a.firstName || '').toLowerCase();
                    bValue = (b.firstName || '').toLowerCase();
                    break;
                case 'email':
                    aValue = (a.email || '').toLowerCase();
                    bValue = (b.email || '').toLowerCase();
                    break;
                case 'createdAt':
                    aValue = a.createdAt ? new Date(a.createdAt) : new Date(0);
                    bValue = b.createdAt ? new Date(b.createdAt) : new Date(0);
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

        setFilteredUsers(filtered);
        setCurrentPage(1);
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`${baseUrl}/user/${selectedUser._id}`);
            alert('✅ User deleted successfully');
            setShowDeleteModal(false);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('❌ Failed to delete user');
        }
    };

    const exportToCSV = () => {
        const csv = [
            ['First Name', 'Last Name', 'Email', 'Phone', 'Verified', 'Auth Method', 'Registered Date', 'Has Photo'],
            ...filteredUsers.map(user => [
                user.firstName || 'N/A',
                user.lastName || 'N/A',
                user.email,
                (user.phone && user.phone !== 'null') ? user.phone : 'N/A',
                user.otpVerified ? 'Yes' : 'No',
                (user.googleId && user.googleId !== 'null') ? 'Google' : 'Email',
                user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
                (user.photo && user.photo !== 'null') ? 'Yes' : 'No'
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const exportToJSON = () => {
        const json = JSON.stringify(filteredUsers.map(user => ({
            firstName: user.firstName || 'N/A',
            lastName: user.lastName || 'N/A',
            email: user.email,
            phone: (user.phone && user.phone !== 'null') ? user.phone : 'N/A',
            verified: user.otpVerified,
            authMethod: (user.googleId && user.googleId !== 'null') ? 'Google' : 'Email',
            registeredDate: user.createdAt ? new Date(user.createdAt).toISOString() : null,
            hasPhoto: (user.photo && user.photo !== 'null')
        })), null, 2);

        const blob = new Blob([json], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users_export_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const StatCard = ({ icon: Icon, label, value, color, trend, subtitle }) => (
        <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 ${color} transform hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{label}</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
                    {trend && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {trend}
                        </p>
                    )}
                    {subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>
                <div className={`p-4 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} dark:opacity-20`}>
                    <Icon className={`w-8 h-8 ${color.replace('border-', 'text-')}`} />
                </div>
            </div>
        </div>
    );

    if (loading && users.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading dashboard...</p>
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
                                <Users className="w-10 h-10" />
                                User Management Dashboard
                            </h1>
                            <p className="text-blue-100 dark:text-blue-200">Monitor and manage all registered users</p>
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
                            <div className="relative group">
                                <button className="flex items-center gap-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all">
                                    <Download className="w-5 h-5" />
                                    Export
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                    <button
                                        onClick={exportToCSV}
                                        className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300 rounded-t-xl"
                                    >
                                        <FileText className="w-4 h-4" />
                                        Export as CSV
                                    </button>
                                    <button
                                        onClick={exportToJSON}
                                        className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300 rounded-b-xl"
                                    >
                                        <FileText className="w-4 h-4" />
                                        Export as JSON
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={Users}
                        label="Total Users"
                        value={stats.totalUsers}
                        color="border-blue-500"
                        trend={`${stats.todayUsers} today`}
                    />
                    <StatCard
                        icon={UserCheck}
                        label="Verified Users"
                        value={stats.verifiedUsers}
                        color="border-green-500"
                        subtitle={`${stats.unverifiedUsers} unverified`}
                    />
                    <StatCard
                        icon={Shield}
                        label="Google Sign-ins"
                        value={stats.googleUsers}
                        color="border-purple-500"
                        subtitle={`${stats.regularUsers} email users`}
                    />
                    <StatCard
                        icon={Clock}
                        label="Recent (30 days)"
                        value={stats.recentUsers}
                        color="border-orange-500"
                    />
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            <h3 className="font-bold text-gray-800 dark:text-gray-100">Phone Numbers</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.usersWithPhone}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Users with phone ({stats.totalUsers > 0 ? Math.round((stats.usersWithPhone / stats.totalUsers) * 100) : 0}%)
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
                            <h3 className="font-bold text-gray-800 dark:text-gray-100">Profile Photos</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.usersWithPhoto}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Users with photos ({stats.totalUsers > 0 ? Math.round((stats.usersWithPhoto / stats.totalUsers) * 100) : 0}%)
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            <h3 className="font-bold text-gray-800 dark:text-gray-100">Verification Rate</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            {stats.totalUsers > 0 ? Math.round((stats.verifiedUsers / stats.totalUsers) * 100) : 0}%
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Email verification completion
                        </p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Verification Filter */}
                        <div>
                            <select
                                value={verificationFilter}
                                onChange={(e) => setVerificationFilter(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer"
                            >
                                <option value="all">All Verification</option>
                                <option value="verified">Verified Only</option>
                                <option value="unverified">Unverified Only</option>
                            </select>
                        </div>

                        {/* Auth Method Filter */}
                        <div>
                            <select
                                value={authMethodFilter}
                                onChange={(e) => setAuthMethodFilter(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer"
                            >
                                <option value="all">All Auth Methods</option>
                                <option value="google">Google Only</option>
                                <option value="email">Email Only</option>
                            </select>
                        </div>

                        {/* Date Range Filter */}
                        <div>
                            <select
                                value={dateRangeFilter}
                                onChange={(e) => setDateRangeFilter(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">Last 7 Days</option>
                                <option value="month">Last 30 Days</option>
                                <option value="year">Last Year</option>
                            </select>
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="mt-4 flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sort by:</span>
                        </div>
                        <select
                            value={`${sortBy}-${sortOrder}`}
                            onChange={(e) => {
                                const [field, order] = e.target.value.split('-');
                                setSortBy(field);
                                setSortOrder(order);
                            }}
                            className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer"
                        >
                            <option value="createdAt-desc">Newest First</option>
                            <option value="createdAt-asc">Oldest First</option>
                            <option value="firstName-asc">Name (A-Z)</option>
                            <option value="firstName-desc">Name (Z-A)</option>
                            <option value="email-asc">Email (A-Z)</option>
                        </select>

                        {/* Reset Filters Button */}
                        {(searchTerm || verificationFilter !== 'all' || authMethodFilter !== 'all' || dateRangeFilter !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setVerificationFilter('all');
                                    setAuthMethodFilter('all');
                                    setDateRangeFilter('all');
                                }}
                                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition-colors flex items-center gap-2"
                            >
                                <XCircle className="w-4 h-4" />
                                Clear Filters
                            </button>
                        )}

                        {/* Items per page selector */}
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
                                <option value={100}>100</option>
                                <option value={filteredUsers.length || 9999}>All ({filteredUsers.length})</option>
                            </select>
                        </div>

                        <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-semibold">Showing {filteredUsers.length}</span> of <span className="font-semibold">{users.length}</span> total users
                            {filteredUsers.length !== users.length && (
                                <span className="ml-2 text-blue-600 dark:text-blue-400">(filtered)</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {currentItems.length === 0 ? (
                        <div className="text-center py-20">
                            <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold mb-2">No users found</p>
                            <p className="text-gray-400 dark:text-gray-500">Try adjusting your filters</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Auth Method</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Registered</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {currentItems.map(user => (
                                            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        {user.photo && user.photo !== 'null' ? (
                                                            <img
                                                                src={user.photo}
                                                                alt={user.firstName}
                                                                className="w-10 h-10 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                                {(user.firstName && user.firstName !== 'null') ? user.firstName.charAt(0).toUpperCase() : 'U'}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="font-semibold text-gray-800 dark:text-gray-100">
                                                                {user.firstName && user.firstName !== 'null' ? user.firstName : 'N/A'} {user.lastName && user.lastName !== 'null' ? user.lastName : ''}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">ID: {user._id.slice(-6)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm space-y-1">
                                                        <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                            <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                            {user.email}
                                                        </p>
                                                        {user.phone && user.phone !== 'null' && (
                                                            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                                <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                                {user.phone}
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="space-y-2">
                                                        {user.otpVerified ? (
                                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                                <CheckCircle className="w-3 h-3" />
                                                                Verified
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                                <AlertCircle className="w-3 h-3" />
                                                                Unverified
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.googleId && user.googleId !== 'null' ? (
                                                        <span className="flex items-center gap-2 text-sm">
                                                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                                                            <span className="text-blue-600 dark:text-blue-400 font-semibold">Google</span>
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-2 text-sm">
                                                            <Mail className="w-4 h-4 text-gray-500" />
                                                            <span className="text-gray-600 dark:text-gray-400">Email</span>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                                    {user.createdAt ? (
                                                        <>
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="w-4 h-4" />
                                                                {new Date(user.createdAt).toLocaleDateString()}
                                                            </div>
                                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                                {new Date(user.createdAt).toLocaleTimeString()}
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <span className="text-gray-400">N/A</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedUser(user);
                                                                setShowDetailsModal(true);
                                                            }}
                                                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                setSelectedUser(user);
                                                                setShowDeleteModal(true);
                                                            }}
                                                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                            title="Delete User"
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
                                        Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, filteredUsers.length)}</span> of <span className="font-semibold">{filteredUsers.length}</span> {filteredUsers.length !== users.length && `filtered users (${users.length} total)`}
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

            {/* Delete Modal */}
            {showDeleteModal && selectedUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Delete User</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Are you sure you want to permanently delete <strong>{selectedUser.firstName && selectedUser.firstName !== 'null' ? selectedUser.firstName : 'this user'} {selectedUser.lastName && selectedUser.lastName !== 'null' ? selectedUser.lastName : ''}</strong>? This action cannot be undone.
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
                                onClick={handleDeleteUser}
                                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Details Modal */}
            {showDetailsModal && selectedUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                {selectedUser.photo && selectedUser.photo !== 'null' ? (
                                    <img
                                        src={selectedUser.photo}
                                        alt={selectedUser.firstName}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                        {(selectedUser.firstName && selectedUser.firstName !== 'null') ? selectedUser.firstName.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                        {selectedUser.firstName && selectedUser.firstName !== 'null' ? selectedUser.firstName : 'N/A'} {selectedUser.lastName && selectedUser.lastName !== 'null' ? selectedUser.lastName : ''}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">{selectedUser.email}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">ID: {selectedUser._id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Phone
                                </p>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">
                                    {selectedUser.phone && selectedUser.phone !== 'null' ? selectedUser.phone : 'Not provided'}
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    Verification Status
                                </p>
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${selectedUser.otpVerified ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                    {selectedUser.otpVerified ? <><CheckCircle className="w-3 h-3" /> Verified</> : <><AlertCircle className="w-3 h-3" /> Unverified</>}
                                </span>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Registered
                                </p>
                                {selectedUser.createdAt ? (
                                    <>
                                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                                            {new Date(selectedUser.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                            {new Date(selectedUser.createdAt).toLocaleTimeString()}
                                        </p>
                                    </>
                                ) : (
                                    <p className="font-semibold text-gray-400">N/A</p>
                                )}
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                                    <Zap className="w-4 h-4" />
                                    Auth Method
                                </p>
                                <p className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                    {selectedUser.googleId && selectedUser.googleId !== 'null' ? (
                                        <>
                                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                                            Google OAuth
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="w-4 h-4" />
                                            Email/Password
                                        </>
                                    )}
                                </p>
                            </div>
                            <div className="col-span-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                                    <Activity className="w-4 h-4" />
                                    Google ID
                                </p>
                                <p className="font-mono text-sm text-gray-800 dark:text-gray-100 break-all">
                                    {selectedUser.googleId && selectedUser.googleId !== 'null' ? selectedUser.googleId : 'Not linked'}
                                </p>
                            </div>
                        </div>

                        {selectedUser.photo && selectedUser.photo !== 'null' && (
                            <div className="mb-6">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">Profile Photo URL:</p>
                                <a
                                    href={selectedUser.photo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm break-all"
                                >
                                    {selectedUser.photo}
                                </a>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    setShowDetailsModal(false);
                                    setShowDeleteModal(true);
                                }}
                                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}