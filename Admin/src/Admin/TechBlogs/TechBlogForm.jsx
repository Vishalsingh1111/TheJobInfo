// // // import React, { useState } from "react";
// // // import axios from "axios";
// // // import { baseUrl } from "../../Baseurl";

// // // const FormElementInput = () => {
// // //     const [formData, setFormData] = useState({
// // //         id: "",
// // //         header: "",
// // //         code: "",
// // //         explanation: "",
// // //         code2: "",
// // //         explanation2: "",
// // //         code3: "",
// // //         explanation3: "",
// // //         image: "",
// // //         category: ""
// // //     });

// // //     const [validationErrors, setValidationErrors] = useState({});

// // //     const handleChange = (e) => {
// // //         const { name, value } = e.target;
// // //         setFormData({ ...formData, [name]: value });
// // //     };

// // //     const validateForm = () => {
// // //         const requiredFields = ["id", "header", "code", "image", "category"];
// // //         let errors = {};
// // //         for (let field of requiredFields) {
// // //             if (!formData[field]) {
// // //                 errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
// // //             }
// // //         }
// // //         setValidationErrors(errors);
// // //         return Object.keys(errors).length === 0;
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();

// // //         if (!validateForm()) {
// // //             return;
// // //         }

// // //         try {
// // //             await axios.post(`${baseUrl}/blog`, formData, {
// // //                 headers: { "Content-Type": "application/json" }
// // //             });
// // //             alert("Content uploaded successfully!");
// // //             setFormData({
// // //                 id: "",
// // //                 header: "",
// // //                 code: "",
// // //                 explanation: "",
// // //                 code2: "",
// // //                 explanation2: "",
// // //                 code3: "",
// // //                 explanation3: "",
// // //                 image: "",
// // //                 category: ""
// // //             });
// // //             setValidationErrors({});
// // //         } catch (error) {
// // //             console.error("Error submitting content:", error);
// // //             alert("Error submitting content.");
// // //         }
// // //     };

// // //     return (
// // //         <section className="mx-5 dark:bg-gray-800">
// // //             <div className="mb-10">
// // //                 <h1 className="text-center text-3xl text-black">Enter Required Details</h1>
// // //             </div>
// // //             <div className="container mx-auto border-2 p-10 rounded-xl">
// // //                 <form onSubmit={handleSubmit} className="flex flex-wrap -mx-4">
// // //                     <DefaultColumn>
// // //                         <DefaultInput1
// // //                             value={formData.id}
// // //                             onChange={handleChange}
// // //                             error={validationErrors.id}
// // //                         />
// // //                     </DefaultColumn>
// // //                     <DefaultColumn>
// // //                         <DefaultInput2
// // //                             value={formData.header}
// // //                             onChange={handleChange}
// // //                             error={validationErrors.header}
// // //                         />
// // //                     </DefaultColumn>
// // //                     <DefaultColumn>
// // //                         <DefaultInput3
// // //                             value={formData.code}
// // //                             onChange={handleChange}
// // //                             error={validationErrors.code}
// // //                         />
// // //                     </DefaultColumn>
// // //                     <DefaultColumn>
// // //                         <DefaultInput4
// // //                             value={formData.explanation}
// // //                             onChange={handleChange}
// // //                             error={validationErrors.explanation}
// // //                         />
// // //                     </DefaultColumn>
// // //                     <DefaultColumn>
// // //                         <DefaultInput5
// // //                             value={formData.category}
// // //                             onChange={handleChange}
// // //                             error={validationErrors.category}
// // //                         />
// // //                     </DefaultColumn>

// // //                     <DefaultColumn>
// // //                         <DefaultInput6
// // //                             value={formData.image}
// // //                             onChange={handleChange}
// // //                             error={validationErrors.image}
// // //                         />
// // //                     </DefaultColumn>
// // //                     <DefaultColumn>
// // //                         <DefaultInput7
// // //                             value={formData.code2}
// // //                             onChange={handleChange}
// // //                             error={validationErrors.code2}
// // //                         />
// // //                     </DefaultColumn>
// // //                     <DefaultColumn>
// // //                         <DefaultInput8
// // //                             value={formData.explanation2}
// // //                             onChange={handleChange}
// // //                             error={validationErrors.explanation2}
// // //                         />
// // //                     </DefaultColumn>

// // //                     <DefaultColumn>
// // //                         <DefaultInput9
// // //                             value={formData.code3}
// // //                             onChange={handleChange}
// // //                             error={validationErrors.code3}
// // //                         />
// // //                     </DefaultColumn>
// // //                     <DefaultColumn>
// // //                         <DefaultInput10
// // //                             value={formData.explanation3}
// // //                             onChange={handleChange}
// // //                             error={validationErrors.explanation3}
// // //                         />
// // //                     </DefaultColumn>
// // //                     <div className="w-full px-4 text-center">
// // //                         <button type="submit" className="bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30  text-white py-3 px-10 rounded-md">
// // //                             Submit
// // //                         </button>
// // //                     </div>
// // //                 </form>
// // //             </div>
// // //         </section>
// // //     );
// // // };

// // // const DefaultColumn = ({ children }) => {
// // //     return (
// // //         <div className="w-full px-4 md:w-1/2 lg:w-1/3">
// // //             <div className="mb-8">{children}</div>
// // //         </div>
// // //     );
// // // };

// // // const DefaultInput1 = ({ value, onChange, error }) => {
// // //     return (
// // //         <>
// // //             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Enter Unique ID
// // //                 <span className="text-red-500">*</span>
// // //             </label>
// // //             <input
// // //                 type="number"
// // //                 name="id"
// // //                 value={value}
// // //                 onChange={onChange}
// // //                 placeholder="Enter ID"
// // //                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 ${error ? 'border-red-500' : ''}`}
// // //             />
// // //             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
// // //         </>
// // //     );
// // // };

// // // const DefaultInput2 = ({ value, onChange, error }) => {
// // //     return (
// // //         <>
// // //             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Enter Header
// // //                 <span className="text-red-500">*</span>
// // //             </label>
// // //             <textarea
// // //                 name="header"
// // //                 value={value}
// // //                 onChange={onChange}
// // //                 placeholder="Enter header"
// // //                 rows={4}
// // //                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
// // //             />
// // //             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
// // //         </>
// // //     );
// // // };

// // // const DefaultInput3 = ({ value, onChange, error }) => {
// // //     return (
// // //         <>
// // //             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Brute Force Approach
// // //                 <span className="text-red-500">*</span>
// // //             </label>
// // //             <textarea
// // //                 name="code"
// // //                 value={value}
// // //                 onChange={onChange}
// // //                 placeholder="Enter code"
// // //                 rows={4}
// // //                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
// // //             />
// // //             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
// // //         </>
// // //     );
// // // };

// // // const DefaultInput4 = ({ value, onChange, error }) => {
// // //     return (
// // //         <>
// // //             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Brute Force Approach
// // //             </label>
// // //             <textarea
// // //                 name="explanation"
// // //                 value={value}
// // //                 onChange={onChange}
// // //                 placeholder="Enter explanation"
// // //                 rows={4}
// // //                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
// // //             />
// // //             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
// // //         </>
// // //     );
// // // };

// // // const DefaultInput7 = ({ value, onChange, error }) => {
// // //     return (
// // //         <>
// // //             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Better Approach
// // //                 <span className="text-red-500">*</span>
// // //             </label>
// // //             <textarea
// // //                 name="code2"
// // //                 value={value}
// // //                 onChange={onChange}
// // //                 placeholder="Enter code"
// // //                 rows={4}
// // //                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
// // //             />
// // //             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
// // //         </>
// // //     );
// // // };

// // // const DefaultInput8 = ({ value, onChange, error }) => {
// // //     return (
// // //         <>
// // //             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Better Approach
// // //             </label>
// // //             <textarea
// // //                 name="explanation2"
// // //                 value={value}
// // //                 onChange={onChange}
// // //                 placeholder="Enter explanation"
// // //                 rows={4}
// // //                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
// // //             />
// // //             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
// // //         </>
// // //     );
// // // };

// // // const DefaultInput9 = ({ value, onChange, error }) => {
// // //     return (
// // //         <>
// // //             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Best Approach
// // //                 <span className="text-red-500">*</span>
// // //             </label>
// // //             <textarea
// // //                 name="code3"
// // //                 value={value}
// // //                 onChange={onChange}
// // //                 placeholder="Enter code"
// // //                 rows={4}
// // //                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
// // //             />
// // //             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
// // //         </>
// // //     );
// // // };

// // // const DefaultInput10 = ({ value, onChange, error }) => {
// // //     return (
// // //         <>
// // //             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Best Approach
// // //             </label>
// // //             <textarea
// // //                 name="explanation3"
// // //                 value={value}
// // //                 onChange={onChange}
// // //                 placeholder="Enter explanation"
// // //                 rows={4}
// // //                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
// // //             />
// // //             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
// // //         </>
// // //     );
// // // };


// // // const DefaultInput5 = ({ value, onChange, error }) => {
// // //     return (
// // //         <>
// // //             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Enter Category
// // //                 <span className="text-red-500">*</span>
// // //             </label>
// // //             <textarea
// // //                 name="category"
// // //                 value={value}
// // //                 onChange={onChange}
// // //                 placeholder="Enter category"
// // //                 rows={4}
// // //                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
// // //             />
// // //             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
// // //         </>
// // //     );
// // // };

// // // const DefaultInput6 = ({ value, onChange, error }) => {
// // //     return (
// // //         <>
// // //             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Enter Image Link
// // //                 <span className="text-red-500">*</span>
// // //             </label>
// // //             <textarea
// // //                 name="image"
// // //                 value={value}
// // //                 onChange={onChange}
// // //                 placeholder="Enter image link"
// // //                 rows={4}
// // //                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
// // //             />
// // //             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
// // //         </>
// // //     );
// // // };

// // // export default FormElementInput;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { baseUrl } from '../../Baseurl';
// // import {
// //     Code,
// //     BookOpen,
// //     Plus,
// //     Edit,
// //     Trash2,
// //     Search,
// //     Filter,
// //     ChevronLeft,
// //     ChevronRight,
// //     Eye,
// //     Heart,
// //     Star,
// //     Calendar,
// //     TrendingUp,
// //     Download,
// //     X,
// //     Save,
// //     AlertCircle,
// //     Copy,
// //     Check,
// //     Layers,
// //     Zap,
// //     Award,
// //     Clock,
// //     FileText,
// //     Tag,
// //     User
// // } from 'lucide-react';

// // export default function BlogManagement() {
// //     const [blogs, setBlogs] = useState([]);
// //     const [stats, setStats] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [categoryFilter, setCategoryFilter] = useState('all');
// //     const [difficultyFilter, setDifficultyFilter] = useState('all');
// //     const [statusFilter, setStatusFilter] = useState('all');
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [pagination, setPagination] = useState(null);
// //     const [showAddModal, setShowAddModal] = useState(false);
// //     const [showEditModal, setShowEditModal] = useState(false);
// //     const [showDeleteModal, setShowDeleteModal] = useState(false);
// //     const [showViewModal, setShowViewModal] = useState(false);
// //     const [selectedBlog, setSelectedBlog] = useState(null);
// //     const [sortBy, setSortBy] = useState('createdAt');
// //     const [sortOrder, setSortOrder] = useState('desc');
// //     const [copiedCode, setCopiedCode] = useState(null);

// //     const [formData, setFormData] = useState({
// //         id: '',
// //         header: '',
// //         code: '',
// //         explanation: '',
// //         code2: '',
// //         explanation2: '',
// //         code3: '',
// //         explanation3: '',
// //         image: '',
// //         category: '',
// //         difficulty: 'Medium',
// //         tags: '',
// //         timeComplexity: '',
// //         spaceComplexity: '',
// //         author: 'Admin',
// //         status: 'published',
// //         featured: false
// //     });

// //     const [validationErrors, setValidationErrors] = useState({});

// //     useEffect(() => {
// //         fetchBlogs();
// //         fetchStats();
// //     }, [currentPage, searchTerm, categoryFilter, difficultyFilter, statusFilter, sortBy, sortOrder]);

// //     const fetchBlogs = async () => {
// //         try {
// //             setLoading(true);
// //             const response = await axios.get(`${baseUrl}/blog`, {
// //                 params: {
// //                     page: currentPage,
// //                     limit: 10,
// //                     search: searchTerm,
// //                     category: categoryFilter,
// //                     difficulty: difficultyFilter,
// //                     status: statusFilter,
// //                     sortBy,
// //                     order: sortOrder
// //                 }
// //             });
// //             setBlogs(response.data.blogs);
// //             setPagination(response.data.pagination);
// //         } catch (error) {
// //             console.error('Error fetching blogs:', error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const fetchStats = async () => {
// //         try {
// //             const response = await axios.get(`${baseUrl}/blog/stats`);
// //             setStats(response.data);
// //         } catch (error) {
// //             console.error('Error fetching stats:', error);
// //         }
// //     };

// //     const handleAdd = () => {
// //         setFormData({
// //             id: '',
// //             header: '',
// //             code: '',
// //             explanation: '',
// //             code2: '',
// //             explanation2: '',
// //             code3: '',
// //             explanation3: '',
// //             image: '',
// //             category: '',
// //             difficulty: 'Medium',
// //             tags: '',
// //             timeComplexity: '',
// //             spaceComplexity: '',
// //             author: 'Admin',
// //             status: 'published',
// //             featured: false
// //         });
// //         setValidationErrors({});
// //         setShowAddModal(true);
// //     };

// //     const handleEdit = (blog) => {
// //         setSelectedBlog(blog);
// //         setFormData({
// //             id: blog.id,
// //             header: blog.header,
// //             code: blog.code,
// //             explanation: blog.explanation || '',
// //             code2: blog.code2 || '',
// //             explanation2: blog.explanation2 || '',
// //             code3: blog.code3 || '',
// //             explanation3: blog.explanation3 || '',
// //             image: blog.image || '',
// //             category: blog.category,
// //             difficulty: blog.difficulty || 'Medium',
// //             tags: blog.tags?.join(', ') || '',
// //             timeComplexity: blog.timeComplexity || '',
// //             spaceComplexity: blog.spaceComplexity || '',
// //             author: blog.author || 'Admin',
// //             status: blog.status || 'published',
// //             featured: blog.featured || false
// //         });
// //         setValidationErrors({});
// //         setShowEditModal(true);
// //     };

// //     const handleView = (blog) => {
// //         setSelectedBlog(blog);
// //         setShowViewModal(true);
// //     };

// //     const validateForm = () => {
// //         const errors = {};
// //         if (!formData.id) errors.id = 'ID is required';
// //         if (!formData.header) errors.header = 'Header is required';
// //         if (!formData.code) errors.code = 'Code is required';
// //         if (!formData.category) errors.category = 'Category is required';

// //         setValidationErrors(errors);
// //         return Object.keys(errors).length === 0;
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         if (!validateForm()) {
// //             return;
// //         }

// //         try {
// //             const submitData = {
// //                 ...formData,
// //                 tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
// //             };

// //             if (showEditModal) {
// //                 await axios.put(`${baseUrl}/blog/${selectedBlog._id}`, submitData);
// //                 alert('✅ Blog updated successfully!');
// //             } else {
// //                 await axios.post(`${baseUrl}/blog`, submitData);
// //                 alert('✅ Blog created successfully!');
// //             }

// //             setShowAddModal(false);
// //             setShowEditModal(false);
// //             fetchBlogs();
// //             fetchStats();
// //         } catch (error) {
// //             console.error('Error submitting blog:', error);
// //             alert('❌ ' + (error.response?.data?.error || 'Failed to submit blog'));
// //         }
// //     };

// //     const handleDelete = async () => {
// //         try {
// //             await axios.delete(`${baseUrl}/blog/${selectedBlog._id}`);
// //             alert('✅ Blog deleted successfully!');
// //             setShowDeleteModal(false);
// //             fetchBlogs();
// //             fetchStats();
// //         } catch (error) {
// //             console.error('Error deleting blog:', error);
// //             alert('❌ Failed to delete blog');
// //         }
// //     };

// //     const toggleFeatured = async (blog) => {
// //         try {
// //             await axios.put(`${baseUrl}/blog/${blog._id}/featured`);
// //             fetchBlogs();
// //             fetchStats();
// //         } catch (error) {
// //             console.error('Error toggling featured:', error);
// //         }
// //     };

// //     const copyToClipboard = (code, index) => {
// //         navigator.clipboard.writeText(code);
// //         setCopiedCode(index);
// //         setTimeout(() => setCopiedCode(null), 2000);
// //     };

// //     const exportBlogs = () => {
// //         const csv = [
// //             ['ID', 'Header', 'Category', 'Difficulty', 'Views', 'Likes', 'Status', 'Created'],
// //             ...blogs.map(blog => [
// //                 blog.id,
// //                 blog.header,
// //                 blog.category,
// //                 blog.difficulty,
// //                 blog.views,
// //                 blog.likes,
// //                 blog.status,
// //                 new Date(blog.createdAt).toLocaleDateString()
// //             ])
// //         ].map(row => row.join(',')).join('\n');

// //         const blob = new Blob([csv], { type: 'text/csv' });
// //         const url = window.URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.href = url;
// //         a.download = `blogs_${new Date().toISOString().split('T')[0]}.csv`;
// //         a.click();
// //     };

// //     const getDifficultyColor = (difficulty) => {
// //         switch (difficulty) {
// //             case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
// //             case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
// //             case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
// //             default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
// //         }
// //     };

// //     const getStatusColor = (status) => {
// //         switch (status) {
// //             case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
// //             case 'draft': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
// //             case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
// //             default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
// //         }
// //     };

// //     const StatCard = ({ icon: Icon, label, value, color, subtext }) => (
// //         <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 ${color} transform hover:scale-105 transition-all duration-300`}>
// //             <div className="flex items-center justify-between">
// //                 <div>
// //                     <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{label}</p>
// //                     <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
// //                     {subtext && (
// //                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{subtext}</p>
// //                     )}
// //                 </div>
// //                 <div className={`p-4 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} dark:opacity-20`}>
// //                     <Icon className={`w-8 h-8 ${color.replace('border-', 'text-')}`} />
// //                 </div>
// //             </div>
// //         </div>
// //     );

// //     if (!stats) {
// //         return (
// //             <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 flex items-center justify-center">
// //                 <div className="text-center">
// //                     <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mb-4"></div>
// //                     <p className="text-gray-600 dark:text-gray-400 text-lg">Loading dashboard...</p>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 py-8 px-4">
// //             <div className="container mx-auto max-w-7xl">
// //                 {/* Header */}
// //                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white rounded-2xl p-8 mb-8 shadow-xl">
// //                     <div className="flex flex-col md:flex-row justify-between items-center gap-4">
// //                         <div>
// //                             <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
// //                                 <Code className="w-10 h-10" />
// //                                 Blog Management
// //                             </h1>
// //                             <p className="text-blue-100 dark:text-blue-200">Manage your coding tutorials and solutions</p>
// //                         </div>
// //                         <div className="flex gap-3">
// //                             <button
// //                                 onClick={exportBlogs}
// //                                 className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all backdrop-blur-sm"
// //                             >
// //                                 <Download className="w-5 h-5" />
// //                                 Export
// //                             </button>
// //                             <button
// //                                 onClick={handleAdd}
// //                                 className="flex items-center gap-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
// //                             >
// //                                 <Plus className="w-5 h-5" />
// //                                 Add New Blog
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* Stats Grid */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //                     <StatCard
// //                         icon={BookOpen}
// //                         label="Total Blogs"
// //                         value={stats.totalBlogs}
// //                         color="border-blue-500"
// //                     />
// //                     <StatCard
// //                         icon={Eye}
// //                         label="Total Views"
// //                         value={stats.totalViews.toLocaleString()}
// //                         color="border-green-500"
// //                     />
// //                     <StatCard
// //                         icon={Heart}
// //                         label="Total Likes"
// //                         value={stats.totalLikes}
// //                         color="border-red-500"
// //                     />
// //                     <StatCard
// //                         icon={Star}
// //                         label="Featured"
// //                         value={stats.featuredBlogs}
// //                         color="border-yellow-500"
// //                     />
// //                 </div>

// //                 {/* Additional Stats */}
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //                     <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
// //                         <div className="flex items-center gap-3 mb-4">
// //                             <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
// //                             <h3 className="font-bold text-gray-800 dark:text-gray-100">Published</h3>
// //                         </div>
// //                         <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.publishedBlogs}</p>
// //                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Live blogs</p>
// //                     </div>

// //                     <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
// //                         <div className="flex items-center gap-3 mb-4">
// //                             <Edit className="w-6 h-6 text-orange-600 dark:text-orange-400" />
// //                             <h3 className="font-bold text-gray-800 dark:text-gray-100">Drafts</h3>
// //                         </div>
// //                         <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.draftBlogs}</p>
// //                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Unpublished</p>
// //                     </div>

// //                     <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
// //                         <div className="flex items-center gap-3 mb-4">
// //                             <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
// //                             <h3 className="font-bold text-gray-800 dark:text-gray-100">Categories</h3>
// //                         </div>
// //                         <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.categoryStats?.length || 0}</p>
// //                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Unique categories</p>
// //                     </div>
// //                 </div>

// //                 {/* Filters */}
// //                 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
// //                     <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
// //                         {/* Search */}
// //                         <div className="md:col-span-2">
// //                             <div className="relative">
// //                                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
// //                                 <input
// //                                     type="text"
// //                                     placeholder="Search blogs..."
// //                                     value={searchTerm}
// //                                     onChange={(e) => {
// //                                         setSearchTerm(e.target.value);
// //                                         setCurrentPage(1);
// //                                     }}
// //                                     className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
// //                                 />
// //                             </div>
// //                         </div>

// //                         {/* Category Filter */}
// //                         <div>
// //                             <select
// //                                 value={categoryFilter}
// //                                 onChange={(e) => {
// //                                     setCategoryFilter(e.target.value);
// //                                     setCurrentPage(1);
// //                                 }}
// //                                 className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer appearance-none transition-colors"
// //                             >
// //                                 <option value="all">All Categories</option>
// //                                 {stats.categoryStats?.map(cat => (
// //                                     <option key={cat._id} value={cat._id}>{cat._id} ({cat.count})</option>
// //                                 ))}
// //                             </select>
// //                         </div>

// //                         {/* Difficulty Filter */}
// //                         <div>
// //                             <select
// //                                 value={difficultyFilter}
// //                                 onChange={(e) => {
// //                                     setDifficultyFilter(e.target.value);
// //                                     setCurrentPage(1);
// //                                 }}
// //                                 className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer appearance-none transition-colors"
// //                             >
// //                                 <option value="all">All Difficulties</option>
// //                                 <option value="Easy">Easy</option>
// //                                 <option value="Medium">Medium</option>
// //                                 <option value="Hard">Hard</option>
// //                             </select>
// //                         </div>

// //                         {/* Sort */}
// //                         <div>
// //                             <select
// //                                 value={`${sortBy}-${sortOrder}`}
// //                                 onChange={(e) => {
// //                                     const [field, order] = e.target.value.split('-');
// //                                     setSortBy(field);
// //                                     setSortOrder(order);
// //                                 }}
// //                                 className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer appearance-none transition-colors"
// //                             >
// //                                 <option value="createdAt-desc">Newest First</option>
// //                                 <option value="createdAt-asc">Oldest First</option>
// //                                 <option value="views-desc">Most Viewed</option>
// //                                 <option value="likes-desc">Most Liked</option>
// //                                 <option value="header-asc">Title (A-Z)</option>
// //                             </select>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* Blogs Grid */}
// //                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
// //                     {loading ? (
// //                         <div className="text-center py-20">
// //                             <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mb-4"></div>
// //                             <p className="text-gray-600 dark:text-gray-400">Loading blogs...</p>
// //                         </div>
// //                     ) : blogs.length === 0 ? (
// //                         <div className="text-center py-20">
// //                             <Code className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
// //                             <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold mb-2">No blogs found</p>
// //                             <p className="text-gray-400 dark:text-gray-500">Try adjusting your filters</p>
// //                         </div>
// //                     ) : (
// //                         <>
// //                             <div className="overflow-x-auto">
// //                                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
// //                                     <thead className="bg-gray-50 dark:bg-gray-900">
// //                                         <tr>
// //                                             <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">ID</th>
// //                                             <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Title</th>
// //                                             <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Category</th>
// //                                             <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Difficulty</th>
// //                                             <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Stats</th>
// //                                             <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
// //                                             <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
// //                                         </tr>
// //                                     </thead>
// //                                     <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
// //                                         {blogs.map(blog => (
// //                                             <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
// //                                                 <td className="px-6 py-4 whitespace-nowrap">
// //                                                     <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs font-bold">
// //                                                         #{blog.id}
// //                                                     </span>
// //                                                 </td>
// //                                                 <td className="px-6 py-4">
// //                                                     <div className="flex items-center gap-3">
// //                                                         <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold">
// //                                                             <Code className="w-5 h-5" />
// //                                                         </div>
// //                                                         <div className="max-w-xs">
// //                                                             <p className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
// //                                                                 {blog.header}
// //                                                             </p>
// //                                                             <div className="flex items-center gap-2 mt-1">
// //                                                                 {blog.featured && (
// //                                                                     <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
// //                                                                 )}
// //                                                                 <span className="text-xs text-gray-500 dark:text-gray-400">
// //                                                                     {new Date(blog.createdAt).toLocaleDateString()}
// //                                                                 </span>
// //                                                             </div>
// //                                                         </div>
// //                                                     </div>
// //                                                 </td>
// //                                                 <td className="px-6 py-4 whitespace-nowrap">
// //                                                     <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-xs font-bold">
// //                                                         {blog.category}
// //                                                     </span>
// //                                                 </td>
// //                                                 <td className="px-6 py-4 whitespace-nowrap">
// //                                                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(blog.difficulty)}`}>
// //                                                         {blog.difficulty}
// //                                                     </span>
// //                                                 </td>
// //                                                 <td className="px-6 py-4">
// //                                                     <div className="flex items-center gap-3 text-sm">
// //                                                         <div className="flex items-center gap-1">
// //                                                             <Eye className="w-4 h-4 text-blue-500" />
// //                                                             <span className="text-gray-700 dark:text-gray-300">{blog.views}</span>
// //                                                         </div>
// //                                                         <div className="flex items-center gap-1">
// //                                                             <Heart className="w-4 h-4 text-red-500" />
// //                                                             <span className="text-gray-700 dark:text-gray-300">{blog.likes}</span>
// //                                                         </div>
// //                                                     </div>
// //                                                 </td>
// //                                                 <td className="px-6 py-4 whitespace-nowrap">
// //                                                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(blog.status)}`}>
// //                                                         {blog.status}
// //                                                     </span>
// //                                                 </td>
// //                                                 <td className="px-6 py-4 whitespace-nowrap text-right">
// //                                                     <div className="flex justify-end gap-2">
// //                                                         <button
// //                                                             onClick={() => handleView(blog)}
// //                                                             className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
// //                                                             title="View Details"
// //                                                         >
// //                                                             <Eye className="w-5 h-5" />
// //                                                         </button>
// //                                                         <button
// //                                                             onClick={() => toggleFeatured(blog)}
// //                                                             className={`p-2 ${blog.featured ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400'} hover:bg-yellow-50 dark:hover:bg-yellow-900/30 rounded-lg transition-colors`}
// //                                                             title="Toggle Featured"
// //                                                         >
// //                                                             <Star className={`w-5 h-5 ${blog.featured ? 'fill-yellow-600 dark:fill-yellow-400' : ''}`} />
// //                                                         </button>
// //                                                         <button
// //                                                             onClick={() => handleEdit(blog)}
// //                                                             className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
// //                                                             title="Edit"
// //                                                         >
// //                                                             <Edit className="w-5 h-5" />
// //                                                         </button>
// //                                                         <button
// //                                                             onClick={() => {
// //                                                                 setSelectedBlog(blog);
// //                                                                 setShowDeleteModal(true);
// //                                                             }}
// //                                                             className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
// //                                                             title="Delete"
// //                                                         >
// //                                                             <Trash2 className="w-5 h-5" />
// //                                                         </button>
// //                                                     </div>
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                     </tbody>
// //                                 </table>
// //                             </div>

// //                             {/* Pagination */}
// //                             {pagination && pagination.pages > 1 && (
// //                                 <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
// //                                     <div className="text-sm text-gray-600 dark:text-gray-400">
// //                                         Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, pagination.total)} of {pagination.total} blogs
// //                                     </div>
// //                                     <div className="flex items-center gap-2">
// //                                         <button
// //                                             onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
// //                                             disabled={currentPage === 1}
// //                                             className="p-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //                                         >
// //                                             <ChevronLeft className="w-5 h-5" />
// //                                         </button>

// //                                         <div className="flex items-center gap-1">
// //                                             {[...Array(pagination.pages)].map((_, idx) => {
// //                                                 const page = idx + 1;
// //                                                 if (
// //                                                     page === 1 ||
// //                                                     page === pagination.pages ||
// //                                                     (page >= currentPage - 1 && page <= currentPage + 1)
// //                                                 ) {
// //                                                     return (
// //                                                         <button
// //                                                             key={page}
// //                                                             onClick={() => setCurrentPage(page)}
// //                                                             className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === page
// //                                                                 ? 'bg-blue-600 text-white'
// //                                                                 : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
// //                                                                 }`}
// //                                                         >
// //                                                             {page}
// //                                                         </button>
// //                                                     );
// //                                                 } else if (page === currentPage - 2 || page === currentPage + 2) {
// //                                                     return <span key={page} className="px-2">...</span>;
// //                                                 }
// //                                                 return null;
// //                                             })}
// //                                         </div>

// //                                         <button
// //                                             onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
// //                                             disabled={currentPage === pagination.pages}
// //                                             className="p-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //                                         >
// //                                             <ChevronRight className="w-5 h-5" />
// //                                         </button>
// //                                     </div>
// //                                 </div>
// //                             )}
// //                         </>
// //                     )}
// //                 </div>
// //             </div>

// //             {/* Add/Edit Modal */}
// //             {(showAddModal || showEditModal) && (
// //                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
// //                     <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-6xl my-8 shadow-2xl">
// //                         {/* Modal Header */}
// //                         <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-6 flex justify-between items-center z-10 rounded-t-2xl">
// //                             <h2 className="text-2xl font-bold flex items-center gap-2">
// //                                 {showEditModal ? <Edit className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
// //                                 {showEditModal ? 'Edit Blog' : 'Add New Blog'}
// //                             </h2>
// //                             <button
// //                                 onClick={() => {
// //                                     setShowAddModal(false);
// //                                     setShowEditModal(false);
// //                                 }}
// //                                 className="hover:bg-white/20 p-2 rounded-full transition-colors"
// //                             >
// //                                 <X className="w-6 h-6" />
// //                             </button>
// //                         </div>

// //                         {/* Modal Body */}
// //                         <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
// //                             {/* Info Alert */}
// //                             <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 flex gap-3">
// //                                 <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
// //                                 <div className="text-sm text-blue-800 dark:text-blue-200">
// //                                     <p className="font-bold mb-1">📝 Coding Problem Format:</p>
// //                                     <ul className="list-disc list-inside space-y-1">
// //                                         <li><strong>Brute Force:</strong> First approach with higher complexity</li>
// //                                         <li><strong>Better Approach:</strong> Optimized version</li>
// //                                         <li><strong>Best Approach:</strong> Most optimal solution</li>
// //                                     </ul>
// //                                 </div>
// //                             </div>

// //                             {/* Basic Info Grid */}
// //                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                                 <div>
// //                                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
// //                                         Unique ID <span className="text-red-500">*</span>
// //                                     </label>
// //                                     <input
// //                                         type="number"
// //                                         value={formData.id}
// //                                         onChange={(e) => setFormData({ ...formData, id: e.target.value })}
// //                                         className={`w-full px-4 py-3 border-2 ${validationErrors.id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`}
// //                                         placeholder="e.g., 1"
// //                                     />
// //                                     {validationErrors.id && <p className="text-red-500 text-xs mt-1">{validationErrors.id}</p>}
// //                                 </div>

// //                                 <div>
// //                                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
// //                                         Category <span className="text-red-500">*</span>
// //                                     </label>
// //                                     <input
// //                                         type="text"
// //                                         value={formData.category}
// //                                         onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// //                                         className={`w-full px-4 py-3 border-2 ${validationErrors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`}
// //                                         placeholder="e.g., Arrays, Strings"
// //                                     />
// //                                     {validationErrors.category && <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>}
// //                                 </div>

// //                                 <div>
// //                                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
// //                                         Difficulty
// //                                     </label>
// //                                     <select
// //                                         value={formData.difficulty}
// //                                         onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
// //                                         className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer appearance-none transition-colors"
// //                                     >
// //                                         <option value="Easy">Easy</option>
// //                                         <option value="Medium">Medium</option>
// //                                         <option value="Hard">Hard</option>
// //                                     </select>
// //                                 </div>
// //                             </div>

// //                             {/* Title */}
// //                             <div>
// //                                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
// //                                     Problem Title <span className="text-red-500">*</span>
// //                                 </label>
// //                                 <input
// //                                     type="text"
// //                                     value={formData.header}
// //                                     onChange={(e) => setFormData({ ...formData, header: e.target.value })}
// //                                     className={`w-full px-4 py-3 border-2 ${validationErrors.header ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`}
// //                                     placeholder="e.g., Two Sum Problem"
// //                                 />
// //                                 {validationErrors.header && <p className="text-red-500 text-xs mt-1">{validationErrors.header}</p>}
// //                             </div>

// //                             {/* Additional Fields Grid */}
// //                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                                 <div>
// //                                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
// //                                         Time Complexity
// //                                     </label>
// //                                     <input
// //                                         type="text"
// //                                         value={formData.timeComplexity}
// //                                         onChange={(e) => setFormData({ ...formData, timeComplexity: e.target.value })}
// //                                         className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
// //                                         placeholder="e.g., O(n)"
// //                                     />
// //                                 </div>

// //                                 <div>
// //                                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
// //                                         Space Complexity
// //                                     </label>
// //                                     <input
// //                                         type="text"
// //                                         value={formData.spaceComplexity}
// //                                         onChange={(e) => setFormData({ ...formData, spaceComplexity: e.target.value })}
// //                                         className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
// //                                         placeholder="e.g., O(1)"
// //                                     />
// //                                 </div>

// //                                 <div>
// //                                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
// //                                         Author
// //                                     </label>
// //                                     <input
// //                                         type="text"
// //                                         value={formData.author}
// //                                         onChange={(e) => setFormData({ ...formData, author: e.target.value })}
// //                                         className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
// //                                         placeholder="Author name"
// //                                     />
// //                                 </div>
// //                             </div>

// //                             {/* Tags and Image */}
// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                                 <div>
// //                                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
// //                                         Tags (comma-separated)
// //                                     </label>
// //                                     <input
// //                                         type="text"
// //                                         value={formData.tags}
// //                                         onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
// //                                         className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
// //                                         placeholder="e.g., array, hash-map, two-pointer"
// //                                     />
// //                                 </div>

// //                                 <div>
// //                                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
// //                                         Image URL
// //                                     </label>
// //                                     <input
// //                                         type="text"
// //                                         value={formData.image}
// //                                         onChange={(e) => setFormData({ ...formData, image: e.target.value })}
// //                                         className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
// //                                         placeholder="https://..."
// //                                     />
// //                                 </div>
// //                             </div>

// //                             {/* Status and Featured */}
// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                                 <div>
// //                                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
// //                                         Status
// //                                     </label>
// //                                     <select
// //                                         value={formData.status}
// //                                         onChange={(e) => setFormData({ ...formData, status: e.target.value })}
// //                                         className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer appearance-none transition-colors"
// //                                     >
// //                                         <option value="published">Published</option>
// //                                         <option value="draft">Draft</option>
// //                                         <option value="archived">Archived</option>
// //                                     </select>
// //                                 </div>

// //                                 <div>
// //                                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
// //                                         Featured
// //                                     </label>
// //                                     <div className="flex items-center h-full">
// //                                         <label className="relative inline-flex items-center cursor-pointer">
// //                                             <input
// //                                                 type="checkbox"
// //                                                 checked={formData.featured}
// //                                                 onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
// //                                                 className="sr-only peer"
// //                                             />
// //                                             <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
// //                                             <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
// //                                                 {formData.featured ? 'Featured' : 'Not Featured'}
// //                                             </span>
// //                                         </label>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             {/* Approach 1: Brute Force */}
// //                             <div className="border-2 border-red-200 dark:border-red-800 rounded-xl p-6 bg-red-50/50 dark:bg-red-900/10">
// //                                 <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
// //                                     <Zap className="w-5 h-5 text-red-600" />
// //                                     Approach 1: Brute Force <span className="text-red-500">*</span>
// //                                 </h3>
// //                                 <div className="space-y-4">
// //                                     <div>
// //                                         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
// //                                             Code
// //                                         </label>
// //                                         <textarea
// //                                             value={formData.code}
// //                                             onChange={(e) => setFormData({ ...formData, code: e.target.value })}
// //                                             className={`w-full px-4 py-3 border-2 ${validationErrors.code ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none font-mono text-sm resize-none transition-colors`}
// //                                             rows="6"
// //                                             placeholder="Enter brute force code..."
// //                                         />
// //                                         {validationErrors.code && <p className="text-red-500 text-xs mt-1">{validationErrors.code}</p>}
// //                                     </div>
// //                                     <div>
// //                                         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
// //                                             Explanation
// //                                         </label>
// //                                         <textarea
// //                                             value={formData.explanation}
// //                                             onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
// //                                             className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none transition-colors"
// //                                             rows="4"
// //                                             placeholder="Explain the brute force approach..."
// //                                         />
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             {/* Approach 2: Better */}
// //                             <div className="border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-6 bg-yellow-50/50 dark:bg-yellow-900/10">
// //                                 <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
// //                                     <TrendingUp className="w-5 h-5 text-yellow-600" />
// //                                     Approach 2: Better Approach
// //                                 </h3>
// //                                 <div className="space-y-4">
// //                                     <div>
// //                                         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
// //                                             Code
// //                                         </label>
// //                                         <textarea
// //                                             value={formData.code2}
// //                                             onChange={(e) => setFormData({ ...formData, code2: e.target.value })}
// //                                             className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none font-mono text-sm resize-none transition-colors"
// //                                             rows="6"
// //                                             placeholder="Enter better approach code..."
// //                                         />
// //                                     </div>
// //                                     <div>
// //                                         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
// //                                             Explanation
// //                                         </label>
// //                                         <textarea
// //                                             value={formData.explanation2}
// //                                             onChange={(e) => setFormData({ ...formData, explanation2: e.target.value })}
// //                                             className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none transition-colors"
// //                                             rows="4"
// //                                             placeholder="Explain the better approach..."
// //                                         />
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             {/* Approach 3: Best */}
// //                             <div className="border-2 border-green-200 dark:border-green-800 rounded-xl p-6 bg-green-50/50 dark:bg-green-900/10">
// //                                 <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
// //                                     <Award className="w-5 h-5 text-green-600" />
// //                                     Approach 3: Best/Optimal Approach
// //                                 </h3>
// //                                 <div className="space-y-4">
// //                                     <div>
// //                                         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
// //                                             Code
// //                                         </label>
// //                                         <textarea
// //                                             value={formData.code3}
// //                                             onChange={(e) => setFormData({ ...formData, code3: e.target.value })}
// //                                             className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none font-mono text-sm resize-none transition-colors"
// //                                             rows="6"
// //                                             placeholder="Enter optimal approach code..."
// //                                         />
// //                                     </div>
// //                                     <div>
// //                                         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
// //                                             Explanation
// //                                         </label>
// //                                         <textarea
// //                                             value={formData.explanation3}
// //                                             onChange={(e) => setFormData({ ...formData, explanation3: e.target.value })}
// //                                             className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none transition-colors"
// //                                             rows="4"
// //                                             placeholder="Explain the optimal approach..."
// //                                         />
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             {/* Submit Buttons */}
// //                             <div className="flex gap-4 sticky bottom-0 bg-white dark:bg-gray-800 pt-4 border-t border-gray-200 dark:border-gray-700">
// //                                 <button
// //                                     type="button"
// //                                     onClick={() => {
// //                                         setShowAddModal(false);
// //                                         setShowEditModal(false);
// //                                     }}
// //                                     className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-bold transition-colors"
// //                                 >
// //                                     Cancel
// //                                 </button>
// //                                 <button
// //                                     type="submit"
// //                                     className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white px-6 py-3 rounded-xl hover:shadow-xl font-bold transition-all transform hover:scale-105"
// //                                 >
// //                                     <Save className="w-5 h-5" />
// //                                     {showEditModal ? 'Update Blog' : 'Create Blog'}
// //                                 </button>
// //                             </div>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}

// //             {/* View Modal */}
// //             {showViewModal && selectedBlog && (
// //                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
// //                     <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-5xl my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
// //                         {/* Modal Header */}
// //                         <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-6 flex justify-between items-center z-10 rounded-t-2xl">
// //                             <div>
// //                                 <h2 className="text-2xl font-bold mb-2">{selectedBlog.header}</h2>
// //                                 <div className="flex items-center gap-3">
// //                                     <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
// //                                         #{selectedBlog.id}
// //                                     </span>
// //                                     <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
// //                                         {selectedBlog.category}
// //                                     </span>
// //                                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(selectedBlog.difficulty)}`}>
// //                                         {selectedBlog.difficulty}
// //                                     </span>
// //                                 </div>
// //                             </div>
// //                             <button
// //                                 onClick={() => setShowViewModal(false)}
// //                                 className="hover:bg-white/20 p-2 rounded-full transition-colors"
// //                             >
// //                                 <X className="w-6 h-6" />
// //                             </button>
// //                         </div>

// //                         {/* Modal Body */}
// //                         <div className="p-6 space-y-6">
// //                             {/* Stats */}
// //                             <div className="grid grid-cols-4 gap-4">
// //                                 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
// //                                     <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
// //                                     <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{selectedBlog.views}</p>
// //                                     <p className="text-xs text-gray-600 dark:text-gray-400">Views</p>
// //                                 </div>
// //                                 <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
// //                                     <Heart className="w-6 h-6 text-red-600 dark:text-red-400 mx-auto mb-2" />
// //                                     <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{selectedBlog.likes}</p>
// //                                     <p className="text-xs text-gray-600 dark:text-gray-400">Likes</p>
// //                                 </div>
// //                                 <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
// //                                     <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
// //                                     <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
// //                                         {new Date(selectedBlog.createdAt).toLocaleDateString()}
// //                                     </p>
// //                                     <p className="text-xs text-gray-600 dark:text-gray-400">Created</p>
// //                                 </div>
// //                                 <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
// //                                     <User className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
// //                                     <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{selectedBlog.author}</p>
// //                                     <p className="text-xs text-gray-600 dark:text-gray-400">Author</p>
// //                                 </div>
// //                             </div>

// //                             {/* Complexity */}
// //                             {(selectedBlog.timeComplexity || selectedBlog.spaceComplexity) && (
// //                                 <div className="grid grid-cols-2 gap-4">
// //                                     {selectedBlog.timeComplexity && (
// //                                         <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
// //                                             <div className="flex items-center gap-2 mb-2">
// //                                                 <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
// //                                                 <p className="font-bold text-gray-800 dark:text-gray-100">Time Complexity</p>
// //                                             </div>
// //                                             <p className="text-lg font-mono text-gray-700 dark:text-gray-300">{selectedBlog.timeComplexity}</p>
// //                                         </div>
// //                                     )}
// //                                     {selectedBlog.spaceComplexity && (
// //                                         <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4">
// //                                             <div className="flex items-center gap-2 mb-2">
// //                                                 <Layers className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
// //                                                 <p className="font-bold text-gray-800 dark:text-gray-100">Space Complexity</p>
// //                                             </div>
// //                                             <p className="text-lg font-mono text-gray-700 dark:text-gray-300">{selectedBlog.spaceComplexity}</p>
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             )}

// //                             {/* Tags */}
// //                             {selectedBlog.tags && selectedBlog.tags.length > 0 && (
// //                                 <div>
// //                                     <div className="flex items-center gap-2 mb-3">
// //                                         <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
// //                                         <p className="font-bold text-gray-800 dark:text-gray-100">Tags</p>
// //                                     </div>
// //                                     <div className="flex flex-wrap gap-2">
// //                                         {selectedBlog.tags.map((tag, idx) => (
// //                                             <span key={idx} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-sm font-semibold">
// //                                                 {tag}
// //                                             </span>
// //                                         ))}
// //                                     </div>
// //                                 </div>
// //                             )}

// //                             {/* Approaches */}
// //                             {selectedBlog.code && (
// //                                 <div className="border-2 border-red-200 dark:border-red-800 rounded-xl p-6 bg-red-50/50 dark:bg-red-900/10">
// //                                     <div className="flex justify-between items-center mb-4">
// //                                         <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
// //                                             <Zap className="w-5 h-5 text-red-600" />
// //                                             Approach 1: Brute Force
// //                                         </h3>
// //                                         <button
// //                                             onClick={() => copyToClipboard(selectedBlog.code, 1)}
// //                                             className="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm font-semibold"
// //                                         >
// //                                             {copiedCode === 1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
// //                                             {copiedCode === 1 ? 'Copied!' : 'Copy'}
// //                                         </button>
// //                                     </div>
// //                                     <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-4">
// //                                         <code>{selectedBlog.code}</code>
// //                                     </pre>
// //                                     {selectedBlog.explanation && (
// //                                         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
// //                                             <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedBlog.explanation}</p>
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             )}

// //                             {selectedBlog.code2 && (
// //                                 <div className="border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-6 bg-yellow-50/50 dark:bg-yellow-900/10">
// //                                     <div className="flex justify-between items-center mb-4">
// //                                         <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
// //                                             <TrendingUp className="w-5 h-5 text-yellow-600" />
// //                                             Approach 2: Better Approach
// //                                         </h3>
// //                                         <button
// //                                             onClick={() => copyToClipboard(selectedBlog.code2, 2)}
// //                                             className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors text-sm font-semibold"
// //                                         >
// //                                             {copiedCode === 2 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
// //                                             {copiedCode === 2 ? 'Copied!' : 'Copy'}
// //                                         </button>
// //                                     </div>
// //                                     <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-4">
// //                                         <code>{selectedBlog.code2}</code>
// //                                     </pre>
// //                                     {selectedBlog.explanation2 && (
// //                                         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
// //                                             <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedBlog.explanation2}</p>
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             )}

// //                             {selectedBlog.code3 && (
// //                                 <div className="border-2 border-green-200 dark:border-green-800 rounded-xl p-6 bg-green-50/50 dark:bg-green-900/10">
// //                                     <div className="flex justify-between items-center mb-4">
// //                                         <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
// //                                             <Award className="w-5 h-5 text-green-600" />
// //                                             Approach 3: Best/Optimal Approach
// //                                         </h3>
// //                                         <button
// //                                             onClick={() => copyToClipboard(selectedBlog.code3, 3)}
// //                                             className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-sm font-semibold"
// //                                         >
// //                                             {copiedCode === 3 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
// //                                             {copiedCode === 3 ? 'Copied!' : 'Copy'}
// //                                         </button>
// //                                     </div>
// //                                     <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-4">
// //                                         <code>{selectedBlog.code3}</code>
// //                                     </pre>
// //                                     {selectedBlog.explanation3 && (
// //                                         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
// //                                             <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedBlog.explanation3}</p>
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             )}
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}

// //             {/* Delete Modal */}
// //             {showDeleteModal && selectedBlog && (
// //                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// //                     <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
// //                         <div className="text-center mb-6">
// //                             <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
// //                                 <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
// //                             </div>
// //                             <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Delete Blog</h3>
// //                             <p className="text-gray-600 dark:text-gray-400">
// //                                 Are you sure you want to permanently delete <strong>"{selectedBlog.header}"</strong>? This action cannot be undone.
// //                             </p>
// //                         </div>

// //                         <div className="flex gap-3">
// //                             <button
// //                                 onClick={() => setShowDeleteModal(false)}
// //                                 className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold transition-colors"
// //                             >
// //                                 Cancel
// //                             </button>
// //                             <button
// //                                 onClick={handleDelete}
// //                                 className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
// //                             >
// //                                 Delete
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { baseUrl } from '../../Baseurl';
// import {
//     Code,
//     BookOpen,
//     Plus,
//     Edit,
//     Trash2,
//     Search,
//     Filter,
//     ChevronLeft,
//     ChevronRight,
//     Eye,
//     Calendar,
//     Download,
//     X,
//     Save,
//     AlertCircle,
//     Copy,
//     Check,
//     Layers,
//     Zap,
//     Award,
//     TrendingUp,
//     RefreshCw,
//     Tag
// } from 'lucide-react';

// export default function BlogManagement() {
//     const [blogs, setBlogs] = useState([]);
//     const [filteredBlogs, setFilteredBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [categoryFilter, setCategoryFilter] = useState('all');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [showViewModal, setShowViewModal] = useState(false);
//     const [selectedBlog, setSelectedBlog] = useState(null);
//     const [sortBy, setSortBy] = useState('id');
//     const [sortOrder, setSortOrder] = useState('desc');
//     const [copiedCode, setCopiedCode] = useState(null);
//     const [refreshing, setRefreshing] = useState(false);

//     const [formData, setFormData] = useState({
//         id: '',
//         header: '',
//         code: '',
//         explanation: '',
//         code2: '',
//         explanation2: '',
//         code3: '',
//         explanation3: '',
//         image: '',
//         category: ''
//     });

//     const [validationErrors, setValidationErrors] = useState({});

//     // Calculate stats from blogs
//     const [stats, setStats] = useState({
//         totalBlogs: 0,
//         categories: [],
//         recentBlogs: 0
//     });

//     useEffect(() => {
//         fetchBlogs();
//     }, []);

//     useEffect(() => {
//         filterAndSortBlogs();
//         calculateStats();
//     }, [blogs, searchTerm, categoryFilter, sortBy, sortOrder]);

//     const fetchBlogs = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`${baseUrl}/blog`);
//             const blogsData = Array.isArray(response.data) ? response.data : [];
//             setBlogs(blogsData);
//         } catch (error) {
//             console.error('Error fetching blogs:', error);
//             setBlogs([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleRefresh = async () => {
//         setRefreshing(true);
//         await fetchBlogs();
//         setTimeout(() => setRefreshing(false), 500);
//     };

//     const calculateStats = () => {
//         const thirtyDaysAgo = new Date();
//         thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

//         const categories = [...new Set(blogs.map(blog => blog.category))];

//         setStats({
//             totalBlogs: blogs.length,
//             categories: categories,
//             recentBlogs: blogs.filter(blog => {
//                 const createdDate = blog.createdAt ? new Date(blog.createdAt) : null;
//                 return createdDate && createdDate >= thirtyDaysAgo;
//             }).length
//         });
//     };

//     const filterAndSortBlogs = () => {
//         if (!Array.isArray(blogs)) {
//             setFilteredBlogs([]);
//             return;
//         }

//         let filtered = [...blogs];

//         // Search filter
//         if (searchTerm) {
//             const searchLower = searchTerm.toLowerCase();
//             filtered = filtered.filter(blog =>
//                 blog.header?.toLowerCase().includes(searchLower) ||
//                 blog.category?.toLowerCase().includes(searchLower) ||
//                 blog.code?.toLowerCase().includes(searchLower) ||
//                 blog.id?.toString().includes(searchTerm)
//             );
//         }

//         // Category filter
//         if (categoryFilter !== 'all') {
//             filtered = filtered.filter(blog => blog.category === categoryFilter);
//         }

//         // Sorting
//         filtered.sort((a, b) => {
//             let aValue, bValue;

//             switch (sortBy) {
//                 case 'id':
//                     aValue = a.id || 0;
//                     bValue = b.id || 0;
//                     break;
//                 case 'header':
//                     aValue = (a.header || '').toLowerCase();
//                     bValue = (b.header || '').toLowerCase();
//                     break;
//                 case 'category':
//                     aValue = (a.category || '').toLowerCase();
//                     bValue = (b.category || '').toLowerCase();
//                     break;
//                 case 'createdAt':
//                     aValue = a.createdAt ? new Date(a.createdAt) : new Date(0);
//                     bValue = b.createdAt ? new Date(b.createdAt) : new Date(0);
//                     break;
//                 default:
//                     aValue = a[sortBy] || '';
//                     bValue = b[sortBy] || '';
//             }

//             if (sortOrder === 'asc') {
//                 return aValue > bValue ? 1 : -1;
//             } else {
//                 return aValue < bValue ? 1 : -1;
//             }
//         });

//         setFilteredBlogs(filtered);
//         setCurrentPage(1);
//     };

//     const handleAdd = () => {
//         setFormData({
//             id: '',
//             header: '',
//             code: '',
//             explanation: '',
//             code2: '',
//             explanation2: '',
//             code3: '',
//             explanation3: '',
//             image: '',
//             category: ''
//         });
//         setValidationErrors({});
//         setShowAddModal(true);
//     };

//     const handleEdit = (blog) => {
//         setSelectedBlog(blog);
//         setFormData({
//             id: blog.id,
//             header: blog.header || '',
//             code: blog.code || '',
//             explanation: blog.explanation || '',
//             code2: blog.code2 || '',
//             explanation2: blog.explanation2 || '',
//             code3: blog.code3 || '',
//             explanation3: blog.explanation3 || '',
//             image: blog.image || '',
//             category: blog.category || ''
//         });
//         setValidationErrors({});
//         setShowEditModal(true);
//     };

//     const handleView = (blog) => {
//         setSelectedBlog(blog);
//         setShowViewModal(true);
//     };

//     const validateForm = () => {
//         const errors = {};
//         if (!formData.id) errors.id = 'ID is required';
//         if (!formData.header) errors.header = 'Header is required';
//         if (!formData.code) errors.code = 'Code is required';
//         if (!formData.category) errors.category = 'Category is required';

//         setValidationErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!validateForm()) {
//             return;
//         }

//         try {
//             if (showEditModal) {
//                 await axios.put(`${baseUrl}/blog/${selectedBlog._id}`, formData);
//                 alert('✅ Blog updated successfully!');
//             } else {
//                 await axios.post(`${baseUrl}/blog`, formData);
//                 alert('✅ Blog created successfully!');
//             }

//             setShowAddModal(false);
//             setShowEditModal(false);
//             fetchBlogs();
//         } catch (error) {
//             console.error('Error submitting blog:', error);
//             alert('❌ ' + (error.response?.data?.error || 'Failed to submit blog'));
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             await axios.delete(`${baseUrl}/blog/${selectedBlog._id}`);
//             alert('✅ Blog deleted successfully!');
//             setShowDeleteModal(false);
//             fetchBlogs();
//         } catch (error) {
//             console.error('Error deleting blog:', error);
//             alert('❌ Failed to delete blog');
//         }
//     };

//     const copyToClipboard = (code, index) => {
//         navigator.clipboard.writeText(code);
//         setCopiedCode(index);
//         setTimeout(() => setCopiedCode(null), 2000);
//     };

//     const exportToCSV = () => {
//         const csv = [
//             ['ID', 'Header', 'Category', 'Has Code2', 'Has Code3', 'Created'],
//             ...filteredBlogs.map(blog => [
//                 blog.id,
//                 blog.header,
//                 blog.category,
//                 blog.code2 ? 'Yes' : 'No',
//                 blog.code3 ? 'Yes' : 'No',
//                 blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'
//             ])
//         ].map(row => row.join(',')).join('\n');

//         const blob = new Blob([csv], { type: 'text/csv' });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `blogs_${new Date().toISOString().split('T')[0]}.csv`;
//         a.click();
//         window.URL.revokeObjectURL(url);
//     };

//     // Pagination
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

//     const StatCard = ({ icon: Icon, label, value, color }) => (
//         <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 ${color} transform hover:scale-105 transition-all duration-300`}>
//             <div className="flex items-center justify-between">
//                 <div>
//                     <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{label}</p>
//                     <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
//                 </div>
//                 <div className={`p-4 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} dark:opacity-20`}>
//                     <Icon className={`w-8 h-8 ${color.replace('border-', 'text-')}`} />
//                 </div>
//             </div>
//         </div>
//     );

//     if (loading && blogs.length === 0) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 mb-4"></div>
//                     <p className="text-gray-600 dark:text-gray-400 text-lg">Loading blogs...</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 py-8 px-4">
//             <div className="container mx-auto max-w-7xl">
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white rounded-2xl p-8 mb-8 shadow-xl">
//                     <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//                         <div>
//                             <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
//                                 <Code className="w-10 h-10" />
//                                 Blog Management
//                             </h1>
//                             <p className="text-blue-100 dark:text-blue-200">Manage your coding tutorials and solutions</p>
//                         </div>
//                         <div className="flex gap-3">
//                             <button
//                                 onClick={handleRefresh}
//                                 className={`flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-3 rounded-full font-semibold transition-all ${refreshing ? 'animate-spin' : ''}`}
//                                 disabled={refreshing}
//                             >
//                                 <RefreshCw className="w-5 h-5" />
//                                 Refresh
//                             </button>
//                             <button
//                                 onClick={exportToCSV}
//                                 className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all backdrop-blur-sm"
//                             >
//                                 <Download className="w-5 h-5" />
//                                 Export CSV
//                             </button>
//                             <button
//                                 onClick={handleAdd}
//                                 className="flex items-center gap-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
//                             >
//                                 <Plus className="w-5 h-5" />
//                                 Add New Blog
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                     <StatCard
//                         icon={BookOpen}
//                         label="Total Blogs"
//                         value={stats.totalBlogs}
//                         color="border-blue-500"
//                     />
//                     <StatCard
//                         icon={Layers}
//                         label="Categories"
//                         value={stats.categories.length}
//                         color="border-purple-500"
//                     />
//                     <StatCard
//                         icon={Calendar}
//                         label="Recent (30 days)"
//                         value={stats.recentBlogs}
//                         color="border-green-500"
//                     />
//                 </div>

//                 {/* Filters */}
//                 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                         {/* Search */}
//                         <div className="md:col-span-2">
//                             <div className="relative">
//                                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search blogs by title, category, or ID..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
//                                 />
//                             </div>
//                         </div>

//                         {/* Category Filter */}
//                         <div>
//                             <select
//                                 value={categoryFilter}
//                                 onChange={(e) => setCategoryFilter(e.target.value)}
//                                 className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer appearance-none transition-colors"
//                             >
//                                 <option value="all">All Categories</option>
//                                 {stats.categories.map(cat => (
//                                     <option key={cat} value={cat}>{cat}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Sort */}
//                         <div>
//                             <select
//                                 value={`${sortBy}-${sortOrder}`}
//                                 onChange={(e) => {
//                                     const [field, order] = e.target.value.split('-');
//                                     setSortBy(field);
//                                     setSortOrder(order);
//                                 }}
//                                 className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer appearance-none transition-colors"
//                             >
//                                 <option value="id-desc">ID (High to Low)</option>
//                                 <option value="id-asc">ID (Low to High)</option>
//                                 <option value="header-asc">Title (A-Z)</option>
//                                 <option value="header-desc">Title (Z-A)</option>
//                                 <option value="category-asc">Category (A-Z)</option>
//                                 <option value="createdAt-desc">Newest First</option>
//                                 <option value="createdAt-asc">Oldest First</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* Info Bar */}
//                     <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
//                         <div className="flex items-center gap-2">
//                             <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//                             <span className="text-sm text-gray-600 dark:text-gray-400">
//                                 Showing <span className="font-semibold">{filteredBlogs.length}</span> of <span className="font-semibold">{blogs.length}</span> blogs
//                                 {filteredBlogs.length !== blogs.length && (
//                                     <span className="ml-2 text-blue-600 dark:text-blue-400">(filtered)</span>
//                                 )}
//                             </span>
//                         </div>

//                         {/* Items per page */}
//                         <div className="flex items-center gap-2">
//                             <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
//                             <select
//                                 value={itemsPerPage}
//                                 onChange={(e) => {
//                                     setItemsPerPage(Number(e.target.value));
//                                     setCurrentPage(1);
//                                 }}
//                                 className="px-3 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer"
//                             >
//                                 <option value={10}>10</option>
//                                 <option value={25}>25</option>
//                                 <option value={50}>50</option>
//                                 <option value={filteredBlogs.length || 9999}>All ({filteredBlogs.length})</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Blogs Table */}
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//                     {currentItems.length === 0 ? (
//                         <div className="text-center py-20">
//                             <Code className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//                             <p className="text-gray-500 dark:text-gray-400 text-xl font-semibold mb-2">No blogs found</p>
//                             <p className="text-gray-400 dark:text-gray-500">Try adjusting your filters or create a new blog</p>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="overflow-x-auto">
//                                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                                     <thead className="bg-gray-50 dark:bg-gray-900">
//                                         <tr>
//                                             <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">ID</th>
//                                             <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Title</th>
//                                             <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Category</th>
//                                             <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Approaches</th>
//                                             <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Created</th>
//                                             <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                                         {currentItems.map(blog => (
//                                             <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs font-bold">
//                                                         #{blog.id}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <div className="flex items-center gap-3">
//                                                         <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold">
//                                                             <Code className="w-5 h-5" />
//                                                         </div>
//                                                         <div className="max-w-xs">
//                                                             <p className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
//                                                                 {blog.header}
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-xs font-bold">
//                                                         {blog.category}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <div className="flex gap-1">
//                                                         <span className="w-6 h-6 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded flex items-center justify-center text-xs font-bold" title="Brute Force">1</span>
//                                                         {blog.code2 && <span className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded flex items-center justify-center text-xs font-bold" title="Better">2</span>}
//                                                         {blog.code3 && <span className="w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded flex items-center justify-center text-xs font-bold" title="Best">3</span>}
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
//                                                     {blog.createdAt ? (
//                                                         <>
//                                                             <div className="flex items-center gap-2">
//                                                                 <Calendar className="w-4 h-4" />
//                                                                 {new Date(blog.createdAt).toLocaleDateString()}
//                                                             </div>
//                                                         </>
//                                                     ) : (
//                                                         <span className="text-gray-400">N/A</span>
//                                                     )}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-right">
//                                                     <div className="flex justify-end gap-2">
//                                                         <button
//                                                             onClick={() => handleView(blog)}
//                                                             className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
//                                                             title="View Details"
//                                                         >
//                                                             <Eye className="w-5 h-5" />
//                                                         </button>
//                                                         <button
//                                                             onClick={() => handleEdit(blog)}
//                                                             className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
//                                                             title="Edit"
//                                                         >
//                                                             <Edit className="w-5 h-5" />
//                                                         </button>
//                                                         <button
//                                                             onClick={() => {
//                                                                 setSelectedBlog(blog);
//                                                                 setShowDeleteModal(true);
//                                                             }}
//                                                             className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
//                                                             title="Delete"
//                                                         >
//                                                             <Trash2 className="w-5 h-5" />
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>

//                             {/* Pagination */}
//                             {totalPages > 1 && (
//                                 <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
//                                     <div className="text-sm text-gray-600 dark:text-gray-400">
//                                         Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, filteredBlogs.length)}</span> of <span className="font-semibold">{filteredBlogs.length}</span>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <button
//                                             onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                                             disabled={currentPage === 1}
//                                             className="p-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                         >
//                                             <ChevronLeft className="w-5 h-5" />
//                                         </button>

//                                         <div className="flex items-center gap-1">
//                                             {[...Array(totalPages)].map((_, idx) => {
//                                                 const page = idx + 1;
//                                                 if (
//                                                     page === 1 ||
//                                                     page === totalPages ||
//                                                     (page >= currentPage - 1 && page <= currentPage + 1)
//                                                 ) {
//                                                     return (
//                                                         <button
//                                                             key={page}
//                                                             onClick={() => setCurrentPage(page)}
//                                                             className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === page
//                                                                 ? 'bg-blue-600 text-white'
//                                                                 : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
//                                                                 }`}
//                                                         >
//                                                             {page}
//                                                         </button>
//                                                     );
//                                                 } else if (page === currentPage - 2 || page === currentPage + 2) {
//                                                     return <span key={page} className="px-2 text-gray-500">...</span>;
//                                                 }
//                                                 return null;
//                                             })}
//                                         </div>

//                                         <button
//                                             onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                                             disabled={currentPage === totalPages}
//                                             className="p-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                         >
//                                             <ChevronRight className="w-5 h-5" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* Add/Edit Modal - Continuing in next part... */}
//             {(showAddModal || showEditModal) && (
//                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
//                     <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-6xl my-8 shadow-2xl">
//                         {/* Modal Header */}
//                         <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-6 flex justify-between items-center z-10 rounded-t-2xl">
//                             <h2 className="text-2xl font-bold flex items-center gap-2">
//                                 {showEditModal ? <Edit className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
//                                 {showEditModal ? 'Edit Blog' : 'Add New Blog'}
//                             </h2>
//                             <button
//                                 onClick={() => {
//                                     setShowAddModal(false);
//                                     setShowEditModal(false);
//                                 }}
//                                 className="hover:bg-white/20 p-2 rounded-full transition-colors"
//                             >
//                                 <X className="w-6 h-6" />
//                             </button>
//                         </div>

//                         {/* Modal Body */}
//                         <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
//                             {/* Info Alert */}
//                             <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 flex gap-3">
//                                 <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
//                                 <div className="text-sm text-blue-800 dark:text-blue-200">
//                                     <p className="font-bold mb-1">📝 Three Approach Format:</p>
//                                     <ul className="list-disc list-inside space-y-1">
//                                         <li><strong>Brute Force (Required):</strong> First approach with higher complexity</li>
//                                         <li><strong>Better Approach (Optional):</strong> Optimized version</li>
//                                         <li><strong>Best Approach (Optional):</strong> Most optimal solution</li>
//                                     </ul>
//                                 </div>
//                             </div>

//                             {/* Basic Info Grid */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
//                                         Unique ID <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="number"
//                                         value={formData.id}
//                                         onChange={(e) => setFormData({ ...formData, id: e.target.value })}
//                                         className={`w-full px-4 py-3 border-2 ${validationErrors.id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`}
//                                         placeholder="e.g., 1"
//                                     />
//                                     {validationErrors.id && <p className="text-red-500 text-xs mt-1">{validationErrors.id}</p>}
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
//                                         Category <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={formData.category}
//                                         onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                                         className={`w-full px-4 py-3 border-2 ${validationErrors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`}
//                                         placeholder="e.g., Arrays, Strings, Dynamic Programming"
//                                     />
//                                     {validationErrors.category && <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>}
//                                 </div>
//                             </div>

//                             {/* Title */}
//                             <div>
//                                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
//                                     Problem Title <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={formData.header}
//                                     onChange={(e) => setFormData({ ...formData, header: e.target.value })}
//                                     className={`w-full px-4 py-3 border-2 ${validationErrors.header ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors`}
//                                     placeholder="e.g., Two Sum Problem - Find pairs that sum to target"
//                                 />
//                                 {validationErrors.header && <p className="text-red-500 text-xs mt-1">{validationErrors.header}</p>}
//                             </div>

//                             {/* Image URL */}
//                             <div>
//                                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
//                                     Image URL (Optional)
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={formData.image}
//                                     onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//                                     className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
//                                     placeholder="https://example.com/image.png"
//                                 />
//                             </div>

//                             {/* Approach 1: Brute Force */}
//                             <div className="border-2 border-red-200 dark:border-red-800 rounded-xl p-6 bg-red-50/50 dark:bg-red-900/10">
//                                 <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
//                                     <Zap className="w-5 h-5 text-red-600" />
//                                     Approach 1: Brute Force <span className="text-red-500">*</span>
//                                 </h3>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                                             Code
//                                         </label>
//                                         <textarea
//                                             value={formData.code}
//                                             onChange={(e) => setFormData({ ...formData, code: e.target.value })}
//                                             className={`w-full px-4 py-3 border-2 ${validationErrors.code ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none font-mono text-sm resize-none transition-colors`}
//                                             rows="8"
//                                             placeholder="Enter brute force code here..."
//                                         />
//                                         {validationErrors.code && <p className="text-red-500 text-xs mt-1">{validationErrors.code}</p>}
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                                             Explanation (Optional)
//                                         </label>
//                                         <textarea
//                                             value={formData.explanation}
//                                             onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
//                                             className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none transition-colors"
//                                             rows="4"
//                                             placeholder="Explain the brute force approach, time/space complexity..."
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Approach 2: Better */}
//                             <div className="border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-6 bg-yellow-50/50 dark:bg-yellow-900/10">
//                                 <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
//                                     <TrendingUp className="w-5 h-5 text-yellow-600" />
//                                     Approach 2: Better Approach (Optional)
//                                 </h3>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                                             Code
//                                         </label>
//                                         <textarea
//                                             value={formData.code2}
//                                             onChange={(e) => setFormData({ ...formData, code2: e.target.value })}
//                                             className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none font-mono text-sm resize-none transition-colors"
//                                             rows="8"
//                                             placeholder="Enter better approach code..."
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                                             Explanation
//                                         </label>
//                                         <textarea
//                                             value={formData.explanation2}
//                                             onChange={(e) => setFormData({ ...formData, explanation2: e.target.value })}
//                                             className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none transition-colors"
//                                             rows="4"
//                                             placeholder="Explain the better approach..."
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Approach 3: Best */}
//                             <div className="border-2 border-green-200 dark:border-green-800 rounded-xl p-6 bg-green-50/50 dark:bg-green-900/10">
//                                 <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
//                                     <Award className="w-5 h-5 text-green-600" />
//                                     Approach 3: Best/Optimal Approach (Optional)
//                                 </h3>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                                             Code
//                                         </label>
//                                         <textarea
//                                             value={formData.code3}
//                                             onChange={(e) => setFormData({ ...formData, code3: e.target.value })}
//                                             className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none font-mono text-sm resize-none transition-colors"
//                                             rows="8"
//                                             placeholder="Enter optimal approach code..."
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                                             Explanation
//                                         </label>
//                                         <textarea
//                                             value={formData.explanation3}
//                                             onChange={(e) => setFormData({ ...formData, explanation3: e.target.value })}
//                                             className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none transition-colors"
//                                             rows="4"
//                                             placeholder="Explain the optimal approach..."
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Submit Buttons */}
//                             <div className="flex gap-4 sticky bottom-0 bg-white dark:bg-gray-800 pt-4 border-t border-gray-200 dark:border-gray-700">
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         setShowAddModal(false);
//                                         setShowEditModal(false);
//                                     }}
//                                     className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-bold transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white px-6 py-3 rounded-xl hover:shadow-xl font-bold transition-all transform hover:scale-105"
//                                 >
//                                     <Save className="w-5 h-5" />
//                                     {showEditModal ? 'Update Blog' : 'Create Blog'}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* View Modal */}
//             {showViewModal && selectedBlog && (
//                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
//                     <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-5xl my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
//                         {/* Modal Header */}
//                         <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-6 flex justify-between items-center z-10 rounded-t-2xl">
//                             <div>
//                                 <h2 className="text-2xl font-bold mb-2">{selectedBlog.header}</h2>
//                                 <div className="flex items-center gap-3">
//                                     <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
//                                         #{selectedBlog.id}
//                                     </span>
//                                     <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
//                                         {selectedBlog.category}
//                                     </span>
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={() => setShowViewModal(false)}
//                                 className="hover:bg-white/20 p-2 rounded-full transition-colors"
//                             >
//                                 <X className="w-6 h-6" />
//                             </button>
//                         </div>

//                         {/* Modal Body */}
//                         <div className="p-6 space-y-6">
//                             {/* Image */}
//                             {selectedBlog.image && (
//                                 <div>
//                                     <img
//                                         src={selectedBlog.image}
//                                         alt={selectedBlog.header}
//                                         className="w-full rounded-xl object-cover max-h-64"
//                                         onError={(e) => e.target.style.display = 'none'}
//                                     />
//                                 </div>
//                             )}

//                             {/* Approaches */}
//                             {selectedBlog.code && (
//                                 <div className="border-2 border-red-200 dark:border-red-800 rounded-xl p-6 bg-red-50/50 dark:bg-red-900/10">
//                                     <div className="flex justify-between items-center mb-4">
//                                         <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
//                                             <Zap className="w-5 h-5 text-red-600" />
//                                             Approach 1: Brute Force
//                                         </h3>
//                                         <button
//                                             onClick={() => copyToClipboard(selectedBlog.code, 1)}
//                                             className="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm font-semibold"
//                                         >
//                                             {copiedCode === 1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
//                                             {copiedCode === 1 ? 'Copied!' : 'Copy'}
//                                         </button>
//                                     </div>
//                                     <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-4">
//                                         <code>{selectedBlog.code}</code>
//                                     </pre>
//                                     {selectedBlog.explanation && (
//                                         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
//                                             <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedBlog.explanation}</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}

//                             {selectedBlog.code2 && (
//                                 <div className="border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-6 bg-yellow-50/50 dark:bg-yellow-900/10">
//                                     <div className="flex justify-between items-center mb-4">
//                                         <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
//                                             <TrendingUp className="w-5 h-5 text-yellow-600" />
//                                             Approach 2: Better Approach
//                                         </h3>
//                                         <button
//                                             onClick={() => copyToClipboard(selectedBlog.code2, 2)}
//                                             className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors text-sm font-semibold"
//                                         >
//                                             {copiedCode === 2 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
//                                             {copiedCode === 2 ? 'Copied!' : 'Copy'}
//                                         </button>
//                                     </div>
//                                     <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-4">
//                                         <code>{selectedBlog.code2}</code>
//                                     </pre>
//                                     {selectedBlog.explanation2 && (
//                                         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
//                                             <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedBlog.explanation2}</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}

//                             {selectedBlog.code3 && (
//                                 <div className="border-2 border-green-200 dark:border-green-800 rounded-xl p-6 bg-green-50/50 dark:bg-green-900/10">
//                                     <div className="flex justify-between items-center mb-4">
//                                         <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
//                                             <Award className="w-5 h-5 text-green-600" />
//                                             Approach 3: Best/Optimal Approach
//                                         </h3>
//                                         <button
//                                             onClick={() => copyToClipboard(selectedBlog.code3, 3)}
//                                             className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-sm font-semibold"
//                                         >
//                                             {copiedCode === 3 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
//                                             {copiedCode === 3 ? 'Copied!' : 'Copy'}
//                                         </button>
//                                     </div>
//                                     <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-4">
//                                         <code>{selectedBlog.code3}</code>
//                                     </pre>
//                                     {selectedBlog.explanation3 && (
//                                         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
//                                             <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedBlog.explanation3}</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Delete Modal */}
//             {showDeleteModal && selectedBlog && (
//                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//                     <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
//                         <div className="text-center mb-6">
//                             <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
//                                 <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
//                             </div>
//                             <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Delete Blog</h3>
//                             <p className="text-gray-600 dark:text-gray-400">
//                                 Are you sure you want to permanently delete <strong>"{selectedBlog.header}"</strong>? This action cannot be undone.
//                             </p>
//                         </div>

//                         <div className="flex gap-3">
//                             <button
//                                 onClick={() => setShowDeleteModal(false)}
//                                 className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold transition-colors"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleDelete}
//                                 className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';
import {
    Briefcase, BookOpen, Plus, Edit, Trash2, Search,
    ChevronLeft, ChevronRight, Eye, Download, X, Save,
    AlertCircle, Copy, Check, MapPin, Zap, Award,
    TrendingUp, RefreshCw, ExternalLink, CheckCircle2, XCircle
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
    const [selectedJob, setSelectedJob] = useState(null);
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');
    const [refreshing, setRefreshing] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        company: '',
        location: '',
        salary: '',
        salaryNote: '',
        jobType: 'Freshers/ Experienced',
        experience: '',
        category: '',
        website: '',
        applyLink: '',
        lastDate: '',
        aboutCompany: '',
        description: '',
        responsibilities: '',
        eligibility: '',
        requiredSkills: '',
        applyIf: '',
        dontApplyIf: '',
        selectionProcess: '',
        benefits: '',
        applySteps: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    const [stats, setStats] = useState({ totalJobs: 0, categories: [], recentJobs: 0 });

    useEffect(() => { fetchJobs(); }, []);

    useEffect(() => {
        filterAndSortJobs();
        calculateStats();
    }, [jobs, searchTerm, categoryFilter, sortBy, sortOrder]);

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

    const EMPTY_FORM = {
        id: '', title: '', company: '', location: '', salary: '', salaryNote: '',
        jobType: 'Freshers/ Experienced', experience: '', category: '', website: '',
        applyLink: '', lastDate: '', aboutCompany: '', description: '',
        responsibilities: '', eligibility: '', requiredSkills: '',
        applyIf: '', dontApplyIf: '', selectionProcess: '', benefits: '', applySteps: '',
    };

    const handleAdd = () => {
        setFormData(EMPTY_FORM);
        setValidationErrors({});
        setShowAddModal(true);
    };

    const handleEdit = (job) => {
        setSelectedJob(job);
        setFormData({
            id: job.id || '',
            title: job.title || '',
            company: job.company || '',
            location: job.location || '',
            salary: job.salary || '',
            salaryNote: job.salaryNote || '',
            jobType: job.jobType || 'Freshers/ Experienced',
            experience: job.experience || '',
            category: job.category || '',
            website: job.website || '',
            applyLink: job.applyLink || '',
            lastDate: job.lastDate || '',
            aboutCompany: job.aboutCompany || '',
            description: job.description || '',
            responsibilities: job.responsibilities || '',
            eligibility: job.eligibility || '',
            requiredSkills: job.requiredSkills || '',
            applyIf: job.applyIf || '',
            dontApplyIf: job.dontApplyIf || '',
            selectionProcess: job.selectionProcess || '',
            benefits: job.benefits || '',
            applySteps: job.applySteps || '',
        });
        setValidationErrors({});
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            if (showEditModal) {
                await axios.put(`${baseUrl}/job/${selectedJob._id}`, formData);
                alert('✅ Job updated successfully!');
            } else {
                await axios.post(`${baseUrl}/job`, formData);
                alert('✅ Job created successfully!');
            }
            setShowAddModal(false);
            setShowEditModal(false);
            fetchJobs();
        } catch (error) {
            alert('❌ ' + (error.response?.data?.error || 'Failed to submit'));
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

    const exportToCSV = () => {
        const csv = [
            ['ID', 'Title', 'Company', 'Location', 'Salary', 'Job Type', 'Category', 'Last Date'],
            ...filteredJobs.map(j => [j.id, j.title, j.company, j.location, j.salary, j.jobType, j.category, j.lastDate])
        ].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `jobs_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
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
    const textareaCls = (err) => `w-full px-4 py-3 border-2 ${err ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none transition-colors`;

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
                        <div className="flex gap-3">
                            <button onClick={handleRefresh} className={`flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-3 rounded-full font-semibold transition-all ${refreshing ? 'animate-spin' : ''}`} disabled={refreshing}>
                                <RefreshCw className="w-5 h-5" />
                            </button>
                            <button onClick={exportToCSV} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all backdrop-blur-sm">
                                <Download className="w-5 h-5" /> Export CSV
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
                        <div>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer appearance-none transition-colors"
                            >
                                <option value="all">All Categories</option>
                                {stats.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <select
                                value={`${sortBy}-${sortOrder}`}
                                onChange={(e) => { const [f, o] = e.target.value.split('-'); setSortBy(f); setSortOrder(o); }}
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none cursor-pointer appearance-none transition-colors"
                            >
                                <option value="id-desc">ID (High to Low)</option>
                                <option value="id-asc">ID (Low to High)</option>
                                <option value="title-asc">Title (A-Z)</option>
                                <option value="company-asc">Company (A-Z)</option>
                            </select>
                        </div>
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
                                            {['ID', 'Job Title', 'Location', 'Salary', 'Type', 'Category', 'Apply Link', 'Actions'].map(h => (
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
                                                        <button onClick={() => handleView(job)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="View">
                                                            <Eye className="w-5 h-5" />
                                                        </button>
                                                        <button onClick={() => handleEdit(job)} className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors" title="Edit">
                                                            <Edit className="w-5 h-5" />
                                                        </button>
                                                        <button onClick={() => { setSelectedJob(job); setShowDeleteModal(true); }} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Delete">
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
                                                    return (
                                                        <button key={page} onClick={() => setCurrentPage(page)} className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>{page}</button>
                                                    );
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

            {/* Add/Edit Modal */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-6xl my-8 shadow-2xl">
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-6 flex justify-between items-center z-10 rounded-t-2xl">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                {showEditModal ? <Edit className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                {showEditModal ? 'Edit Job' : 'Add New Job'}
                            </h2>
                            <button onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 flex gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-800 dark:text-blue-200">
                                    <p className="font-bold mb-1">📋 Job Posting Format:</p>
                                    <p>Fill in all details as shown in the job PDF. Text fields with multiple points should be entered one per line.</p>
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Unique ID <span className="text-red-500">*</span></label>
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
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputCls(validationErrors.title)} placeholder="e.g., Electronic Systems Engineer – Software" />
                                {validationErrors.title && <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Company Name <span className="text-red-500">*</span></label>
                                <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={inputCls(validationErrors.company)} placeholder="e.g., Cummins" />
                                {validationErrors.company && <p className="text-red-500 text-xs mt-1">{validationErrors.company}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Job Location</label>
                                    <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputCls(false)} placeholder="e.g., Pune" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Expected Salary</label>
                                    <input type="text" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} className={inputCls(false)} placeholder="e.g., ₹7-10 LPA*" />
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
                                    <input type="text" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className={inputCls(false)} placeholder="e.g., Cummins.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Apply Link</label>
                                    <input type="text" value={formData.applyLink} onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })} className={inputCls(false)} placeholder="https://..." />
                                </div>
                            </div>

                            {/* Content Sections */}
                            <div className="border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 bg-blue-50/50 dark:bg-blue-900/10">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <Building2Icon /> About Company & Overview
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">About Company</label>
                                        <textarea value={formData.aboutCompany} onChange={(e) => setFormData({ ...formData, aboutCompany: e.target.value })} className={textareaCls(false)} rows="3" placeholder="Brief company description..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Job Description / Overview</label>
                                        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={textareaCls(false)} rows="3" placeholder="What does the role involve at a high level..." />
                                    </div>
                                </div>
                            </div>

                            <div className="border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6 bg-purple-50/50 dark:bg-purple-900/10">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-purple-600" /> Role & Responsibilities
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Responsibilities <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                        <textarea value={formData.responsibilities} onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })} className={textareaCls(false)} rows="6" placeholder="Develop embedded software for engine systems&#10;Write C/C++ code for microcontrollers&#10;Use MATLAB/Simulink for model-based development..." />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Apply If <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                            <textarea value={formData.applyIf} onChange={(e) => setFormData({ ...formData, applyIf: e.target.value })} className={textareaCls(false)} rows="4" placeholder="Have strong embedded systems knowledge&#10;Worked on microcontrollers / RTOS..." />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Don't Apply If <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                            <textarea value={formData.dontApplyIf} onChange={(e) => setFormData({ ...formData, dontApplyIf: e.target.value })} className={textareaCls(false)} rows="4" placeholder="Know only basic coding&#10;Non-tech background..." />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-2 border-green-200 dark:border-green-800 rounded-xl p-6 bg-green-50/50 dark:bg-green-900/10">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-green-600" /> Eligibility & Skills
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Eligibility Criteria <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                        <textarea value={formData.eligibility} onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })} className={textareaCls(false)} rows="5" placeholder="Bachelor's degree in Electronics / Electrical / Computer Engineering&#10;Master's degree may be required for select roles&#10;Entry-level / Early career professional..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Required Skills <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                        <textarea value={formData.requiredSkills} onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })} className={textareaCls(false)} rows="6" placeholder="Embedded software development in C/C++&#10;Microcontrollers and RTOS&#10;MATLAB/Simulink and Stateflow&#10;ISO 26262, ASPICE..." />
                                    </div>
                                </div>
                            </div>

                            <div className="border-2 border-orange-200 dark:border-orange-800 rounded-xl p-6 bg-orange-50/50 dark:bg-orange-900/10">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-orange-600" /> Selection Process & Benefits
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Selection Process <span className="text-xs font-normal text-gray-500">(one per line, in order)</span></label>
                                        <textarea value={formData.selectionProcess} onChange={(e) => setFormData({ ...formData, selectionProcess: e.target.value })} className={textareaCls(false)} rows="5" placeholder="Online Application&#10;Resume Screening&#10;Online Assessments&#10;Technical Interviews&#10;Offer&#10;Background Check&#10;Onboarding" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Why Join / Benefits <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                        <textarea value={formData.benefits} onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} className={textareaCls(false)} rows="4" placeholder="Training and development&#10;Coaching and support from experts&#10;Continuous learning culture&#10;Office perks" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">How to Apply Steps <span className="text-xs font-normal text-gray-500">(one per line)</span></label>
                                        <textarea value={formData.applySteps} onChange={(e) => setFormData({ ...formData, applySteps: e.target.value })} className={textareaCls(false)} rows="5" placeholder='Click on the "Apply here" button provided below&#10;Click on "Apply"&#10;If not registered before, create an account&#10;Log in and fill the application form&#10;Submit all relevant documents&#10;Verify all details are correct&#10;Submit the application form' />
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex gap-4 sticky bottom-0 bg-white dark:bg-gray-800 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button type="button" onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-bold transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white px-6 py-3 rounded-xl hover:shadow-xl font-bold transition-all transform hover:scale-105">
                                    <Save className="w-5 h-5" />
                                    {showEditModal ? 'Update Job' : 'Create Job'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Modal */}
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

            {/* Delete Modal */}
            {showDeleteModal && selectedJob && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Delete Job</h3>
                            <p className="text-gray-600 dark:text-gray-400">Are you sure you want to permanently delete <strong>"{selectedJob.title}"</strong>? This cannot be undone.</p>
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

// Inline icon since Building2 is used as JSX
const Building2Icon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>;