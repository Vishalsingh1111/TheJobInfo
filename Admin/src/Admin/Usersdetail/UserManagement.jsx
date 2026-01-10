// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { baseUrl } from '../../Baseurl';

// const ShowAdminDetail = () => {
//     const [admins, setAdmins] = useState([]);
//     const [deleteAdminId, setDeleteAdminId] = useState(null); // Track admin to delete

//     useEffect(() => {
//         const fetchAdmins = async () => {
//             try {
//                 const response = await axios.get(`${baseUrl}/admin`);
//                 setAdmins(response.data); // Assuming API response is an array of admins
//             } catch (error) {
//                 console.error('Error fetching admins:', error);
//             }
//         };

//         fetchAdmins();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`${baseUrl}/admin/${id}`);
//             setAdmins(admins.filter(admin => admin._id !== id)); // Remove the deleted admin from the local state
//             console.log('Deleted admin with id:', id);
//         } catch (error) {
//             console.error('Error deleting admin:', error);
//         }
//         setDeleteAdminId(null); // Clear deleteAdminId to close the delete confirmation modal
//     };

//     const openDeleteModal = (id) => {
//         setDeleteAdminId(id); // Set the admin to delete
//     };

//     return (
//         <div className="bg-white shadow rounded pt-5">
//             <h2 className="text-lg font-bold mb-3">Admin Details</h2>
//             {admins && admins.length > 0 ? (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
//                                 <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {admins.map(admin => (
//                                 <tr key={admin._id} className="text-center">
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">{admin.username}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                                         <button className="text-red-600 hover:text-red-900" onClick={() => openDeleteModal(admin._id)}>
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-1V3a1 1 0 00-1-1H6zm8 4H6v10h8V6zm-5 2a1 1 0 012 0v6a1 1 0 01-2 0V8z" clipRule="evenodd" />
//                                             </svg>
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p className="text-center mt-4">No admins found.</p>
//             )}

//             {/* Modal for delete confirmation */}
//             {deleteAdminId && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//                     <div className="bg-white p-8 rounded shadow-lg flex flex-col">
//                         <p className="text-lg font-semibold mb-4">Are you sure you want to delete this admin?</p>
//                         <div className="flex justify-between">
//                             <button className="bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30  text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(deleteAdminId)}>Delete</button>
//                             <button className="bg-gray-300 shadow-lg hover:shadow-gray-500/30 shadow-black/30  text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setDeleteAdminId(null)}>Cancel</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ShowAdminDetail;

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
    Ban,
    CheckCircle,
    XCircle,
    AlertCircle,
    Trash2,
    Eye,
    Download
} from 'lucide-react';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [blockReason, setBlockReason] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        fetchUsers();
        fetchStats();
    }, [currentPage, searchTerm, statusFilter, sortBy, sortOrder]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/user`, {
                params: {
                    page: currentPage,
                    limit: 10,
                    search: searchTerm,
                    status: statusFilter,
                    sortBy,
                    order: sortOrder
                }
            });
            setUsers(response.data.users);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user/stats`);
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleBlockUser = async () => {
        try {
            await axios.put(`${baseUrl}/user/${selectedUser._id}/block`, {
                reason: blockReason || 'Blocked by administrator'
            });
            alert('✅ User blocked successfully');
            setShowBlockModal(false);
            setBlockReason('');
            fetchUsers();
            fetchStats();
        } catch (error) {
            console.error('Error blocking user:', error);
            alert('❌ Failed to block user');
        }
    };

    const handleUnblockUser = async (userId) => {
        try {
            await axios.put(`${baseUrl}/user/${userId}/unblock`);
            alert('✅ User unblocked successfully');
            fetchUsers();
            fetchStats();
        } catch (error) {
            console.error('Error unblocking user:', error);
            alert('❌ Failed to unblock user');
        }
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`${baseUrl}/user/${selectedUser._id}`);
            alert('✅ User deleted successfully');
            setShowDeleteModal(false);
            fetchUsers();
            fetchStats();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('❌ Failed to delete user');
        }
    };

    const handleStatusChange = async (userId, newStatus) => {
        try {
            await axios.put(`${baseUrl}/user/${userId}/status`, {
                status: newStatus
            });
            alert('✅ User status updated successfully');
            fetchUsers();
            fetchStats();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('❌ Failed to update status');
        }
    };

    const exportUsers = () => {
        const csv = [
            ['First Name', 'Last Name', 'Email', 'Phone', 'Status', 'Registered', 'Last Login', 'Login Count'],
            ...users.map(user => [
                user.firstName,
                user.lastName,
                user.email,
                user.phone || 'N/A',
                user.accountStatus,
                new Date(user.createdAt).toLocaleDateString(),
                user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never',
                user.loginCount || 0
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const getStatusColor = (status, isBlocked) => {
        if (isBlocked) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'suspended': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'deleted': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
            default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
        }
    };

    const StatCard = ({ icon: Icon, label, value, color, trend }) => (
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
                </div>
                <div className={`p-4 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} dark:opacity-20`}>
                    <Icon className={`w-8 h-8 ${color.replace('border-', 'text-')}`} />
                </div>
            </div>
        </div>
    );

    if (!stats) {
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
                                User Management
                            </h1>
                            <p className="text-blue-100 dark:text-blue-200">Monitor and manage all registered users</p>
                        </div>
                        <button
                            onClick={exportUsers}
                            className="flex items-center gap-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
                        >
                            <Download className="w-5 h-5" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
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
                        label="Active Users"
                        value={stats.activeUsers}
                        color="border-green-500"
                    />
                    <StatCard
                        icon={UserX}
                        label="Blocked Users"
                        value={stats.blockedUsers}
                        color="border-red-500"
                    />
                    <StatCard
                        icon={Clock}
                        label="Recent (30 days)"
                        value={stats.recentUsers}
                        color="border-purple-500"
                    />
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            <h3 className="font-bold text-gray-800 dark:text-gray-100">Verified Users</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.verifiedUsers}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Email verified</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
                            <h3 className="font-bold text-gray-800 dark:text-gray-100">Google Sign-ins</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.googleUsers}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">OAuth users</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            <h3 className="font-bold text-gray-800 dark:text-gray-100">Suspended</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.suspendedUsers}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Temporarily suspended</p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or phone..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <div className="relative">
                                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer appearance-none transition-colors"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="blocked">Blocked</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </div>
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
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer appearance-none transition-colors"
                            >
                                <option value="createdAt-desc">Newest First</option>
                                <option value="createdAt-asc">Oldest First</option>
                                <option value="firstName-asc">Name (A-Z)</option>
                                <option value="firstName-desc">Name (Z-A)</option>
                                <option value="loginCount-desc">Most Active</option>
                                <option value="lastLogin-desc">Recent Login</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
                        </div>
                    ) : users.length === 0 ? (
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
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Registered</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Activity</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {users.map(user => (
                                            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                            {user.firstName?.charAt(0).toUpperCase() || 'U'}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800 dark:text-gray-100">
                                                                {user.firstName} {user.lastName}
                                                            </p>
                                                            {user.googleId && (
                                                                <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                                                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-3 h-3" />
                                                                    Google
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm space-y-1">
                                                        <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                            <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                            {user.email}
                                                        </p>
                                                        {user.phone && (
                                                            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                                <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                                {user.phone}
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="space-y-2">
                                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(user.accountStatus, user.isBlocked)}`}>
                                                            {user.isBlocked ? (
                                                                <>
                                                                    <Ban className="w-3 h-3" />
                                                                    Blocked
                                                                </>
                                                            ) : user.accountStatus === 'active' ? (
                                                                <>
                                                                    <CheckCircle className="w-3 h-3" />
                                                                    Active
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <XCircle className="w-3 h-3" />
                                                                    {user.accountStatus}
                                                                </>
                                                            )}
                                                        </span>
                                                        {user.otpVerified && (
                                                            <span className="block text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                                                                <Shield className="w-3 h-3" />
                                                                Verified
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(user.createdAt).toLocaleDateString()}
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                        {new Date(user.createdAt).toLocaleTimeString()}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                    <div className="space-y-1">
                                                        <p className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4" />
                                                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                                            {user.loginCount || 0} logins
                                                        </p>
                                                    </div>
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

                                                        {user.isBlocked ? (
                                                            <button
                                                                onClick={() => handleUnblockUser(user._id)}
                                                                className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                                                                title="Unblock User"
                                                            >
                                                                <CheckCircle className="w-5 h-5" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedUser(user);
                                                                    setShowBlockModal(true);
                                                                }}
                                                                className="p-2 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg transition-colors"
                                                                title="Block User"
                                                            >
                                                                <Ban className="w-5 h-5" />
                                                            </button>
                                                        )}

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
                            {pagination && pagination.pages > 1 && (
                                <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, pagination.total)} of {pagination.total} users
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
                                            {[...Array(pagination.pages)].map((_, idx) => {
                                                const page = idx + 1;
                                                if (
                                                    page === 1 ||
                                                    page === pagination.pages ||
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
                                                    return <span key={page} className="px-2">...</span>;
                                                }
                                                return null;
                                            })}
                                        </div>

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
                                            disabled={currentPage === pagination.pages}
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

            {/* Block Modal */}
            {showBlockModal && selectedUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Ban className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Block User</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Are you sure you want to block <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>?
                            </p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Reason for blocking (optional)
                            </label>
                            <textarea
                                value={blockReason}
                                onChange={(e) => setBlockReason(e.target.value)}
                                placeholder="Enter reason..."
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-orange-500 dark:focus:border-orange-400 focus:outline-none resize-none"
                                rows="3"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowBlockModal(false);
                                    setBlockReason('');
                                }}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBlockUser}
                                className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-colors"
                            >
                                Block User
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                                Are you sure you want to permanently delete <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>? This action cannot be undone.
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
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                    {selectedUser.firstName?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                        {selectedUser.firstName} {selectedUser.lastName}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">{selectedUser.email}</p>
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
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Phone</p>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">{selectedUser.phone || 'Not provided'}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(selectedUser.accountStatus, selectedUser.isBlocked)}`}>
                                    {selectedUser.isBlocked ? 'Blocked' : selectedUser.accountStatus}
                                </span>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Registered</p>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">
                                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Login</p>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">
                                    {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleDateString() : 'Never'}
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Logins</p>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">{selectedUser.loginCount || 0}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Verified</p>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">
                                    {selectedUser.otpVerified ? '✅ Yes' : '❌ No'}
                                </p>
                            </div>
                        </div>

                        {selectedUser.isBlocked && selectedUser.blockedReason && (
                            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
                                <p className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">Block Reason:</p>
                                <p className="text-red-700 dark:text-red-400">{selectedUser.blockedReason}</p>
                                <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                                    Blocked on: {new Date(selectedUser.blockedAt).toLocaleString()}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}