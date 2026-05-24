// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import {
//     Plus, Pencil, Trash2, Eye, EyeOff, Star, StarOff,
//     Search, X, Upload, Save, ArrowLeft, AlertCircle,
//     CheckCircle2, Loader2, BookOpen, Tag, Clock, TrendingUp
// } from 'lucide-react';
// import { baseUrl } from '../../Baseurl';

// const CATEGORIES = ['Interview Tips', 'DSA', 'System Design', 'HR Round', 'Resume Tips', 'Aptitude', 'Coding Interview', 'Career Advice'];
// const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

// const EMPTY_FORM = {
//     title: '', slug: '', excerpt: '', content: '',
//     category: CATEGORIES[0], difficulty: DIFFICULTIES[0],
//     tags: '', author: 'TheJobInfo Team',
//     featured: false, published: true,
// };

// // ── Toast ─────────────────────────────────────────────────────────────────────
// const Toast = ({ message, type, onClose }) => (
//     <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-bold transition-all ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
//         {type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
//         {message}
//         <button onClick={onClose} className="ml-2 hover:opacity-75"><X className="w-3.5 h-3.5" /></button>
//     </div>
// );

// // ── Confirm Dialog ────────────────────────────────────────────────────────────
// const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
//         <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
//             <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
//                     <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
//                 </div>
//                 <div>
//                     <p className="font-bold text-gray-900 dark:text-white text-base">Confirm Delete</p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{message}</p>
//                 </div>
//             </div>
//             <div className="flex gap-3">
//                 <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
//                 <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors">Delete</button>
//             </div>
//         </div>
//     </div>
// );

// // ── Form Input helpers ────────────────────────────────────────────────────────
// const Label = ({ children }) => (
//     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">{children}</label>
// );

// const Input = ({ className = '', ...props }) => (
//     <input
//         className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 text-base font-medium focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-colors ${className}`}
//         {...props}
//     />
// );

// const Select = ({ children, className = '', ...props }) => (
//     <select
//         className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-base font-medium focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-colors ${className}`}
//         {...props}
//     >
//         {children}
//     </select>
// );

// const Textarea = ({ className = '', ...props }) => (
//     <textarea
//         className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 text-base font-medium focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-colors resize-y ${className}`}
//         {...props}
//     />
// );

// // ── Blog Form ─────────────────────────────────────────────────────────────────
// const BlogForm = ({ initial, onSave, onCancel, saving }) => {
//     const [form, setForm] = useState(initial || EMPTY_FORM);
//     const [image, setImage] = useState(null);
//     const [preview, setPreview] = useState(initial?.imageUrl || '');
//     const fileRef = useRef();

//     const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

//     // Auto-generate slug from title
//     const handleTitle = (val) => {
//         set('title', val);
//         if (!initial?._id) { // only auto-generate for new posts
//             set('slug', val.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim());
//         }
//     };

//     const handleImage = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         setImage(file);
//         setPreview(URL.createObjectURL(file));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const fd = new FormData();
//         Object.entries(form).forEach(([k, v]) => {
//             if (k === 'tags') fd.append(k, JSON.stringify(v.split(',').map(t => t.trim()).filter(Boolean)));
//             else fd.append(k, v);
//         });
//         if (image) fd.append('image', image);
//         onSave(fd);
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Title */}
//             <div>
//                 <Label>Title *</Label>
//                 <Input value={form.title} onChange={e => handleTitle(e.target.value)} placeholder="e.g. Top 10 DSA Problems for FAANG" required />
//             </div>

//             {/* Slug */}
//             <div>
//                 <Label>Slug *</Label>
//                 <Input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="auto-generated-from-title" required />
//                 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">URL: /blog/{form.slug || 'your-slug'}</p>
//             </div>

//             {/* Category + Difficulty */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                     <Label>Category *</Label>
//                     <Select value={form.category} onChange={e => set('category', e.target.value)} required>
//                         {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
//                     </Select>
//                 </div>
//                 <div>
//                     <Label>Difficulty *</Label>
//                     <Select value={form.difficulty} onChange={e => set('difficulty', e.target.value)} required>
//                         {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
//                     </Select>
//                 </div>
//             </div>

//             {/* Author */}
//             <div>
//                 <Label>Author</Label>
//                 <Input value={form.author} onChange={e => set('author', e.target.value)} placeholder="TheJobInfo Team" />
//             </div>

//             {/* Excerpt */}
//             <div>
//                 <Label>Excerpt * <span className="font-normal text-gray-400">(max 300 chars)</span></Label>
//                 <Textarea
//                     value={form.excerpt}
//                     onChange={e => set('excerpt', e.target.value)}
//                     placeholder="Short summary shown on card..."
//                     rows={3} maxLength={300} required
//                 />
//                 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{form.excerpt.length}/300</p>
//             </div>

//             {/* Content */}
//             <div>
//                 <Label>Content * <span className="font-normal text-gray-400">(HTML or plain text)</span></Label>
//                 <Textarea
//                     value={form.content}
//                     onChange={e => set('content', e.target.value)}
//                     placeholder="Full blog content here... Supports HTML tags like <h2>, <p>, <ul>, <code>, etc."
//                     rows={14} required
//                 />
//             </div>

//             {/* Tags */}
//             <div>
//                 <Label>Tags <span className="font-normal text-gray-400">(comma-separated)</span></Label>
//                 <Input
//                     value={form.tags}
//                     onChange={e => set('tags', e.target.value)}
//                     placeholder="e.g. arrays, recursion, binary search"
//                 />
//             </div>

//             {/* Image upload */}
//             <div>
//                 <Label>Cover Image</Label>
//                 <div
//                     onClick={() => fileRef.current.click()}
//                     className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-5 cursor-pointer hover:border-purple-400 dark:hover:border-purple-600 transition-colors"
//                 >
//                     {preview ? (
//                         <div className="relative">
//                             <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
//                             <button
//                                 type="button"
//                                 onClick={e => { e.stopPropagation(); setPreview(''); setImage(null); set('imageUrl', ''); }}
//                                 className="absolute top-2 right-2 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
//                             >
//                                 <X className="w-3.5 h-3.5" />
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 py-4">
//                             <Upload className="w-8 h-8" />
//                             <p className="text-sm font-medium">Click to upload image</p>
//                             <p className="text-xs">PNG, JPG, WEBP — max 5 MB</p>
//                         </div>
//                     )}
//                     <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
//                 </div>
//             </div>

//             {/* Toggles */}
//             <div className="flex flex-wrap gap-5">
//                 {[
//                     { key: 'published', label: 'Published', desc: 'Visible to public' },
//                     { key: 'featured', label: 'Featured', desc: 'Show in spotlight' },
//                 ].map(({ key, label, desc }) => (
//                     <label key={key} className="flex items-center gap-3 cursor-pointer group">
//                         <div
//                             onClick={() => set(key, !form[key])}
//                             className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 ${form[key] ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'}`}
//                         >
//                             <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${form[key] ? 'translate-x-6' : ''}`} />
//                         </div>
//                         <div>
//                             <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{label}</p>
//                             <p className="text-xs text-gray-400 dark:text-gray-500">{desc}</p>
//                         </div>
//                     </label>
//                 ))}
//             </div>

//             {/* Actions */}
//             <div className="flex gap-3 pt-2">
//                 <button type="button" onClick={onCancel}
//                     className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-base font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
//                     Cancel
//                 </button>
//                 <button type="submit" disabled={saving}
//                     className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-base font-bold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2">
//                     {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> {initial?._id ? 'Update Blog' : 'Create Blog'}</>}
//                 </button>
//             </div>
//         </form>
//     );
// };

// // ── Main AdminBlog ────────────────────────────────────────────────────────────
// const AdminBlog = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [view, setView] = useState('list'); // 'list' | 'create' | 'edit'
//     const [editing, setEditing] = useState(null);
//     const [saving, setSaving] = useState(false);
//     const [search, setSearch] = useState('');
//     const [toast, setToast] = useState(null);
//     const [confirm, setConfirm] = useState(null);

//     const showToast = (message, type = 'success') => {
//         setToast({ message, type });
//         setTimeout(() => setToast(null), 3500);
//     };

//     const fetchBlogs = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.get(`${baseUrl}/blog/admin/all`);
//             setBlogs(res.data.blogs);
//         } catch (err) {
//             showToast('Failed to fetch blogs', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => { fetchBlogs(); }, []);

//     const handleCreate = async (fd) => {
//         setSaving(true);
//         try {
//             await axios.post(`${baseUrl}/blog`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
//             showToast('Blog created successfully!');
//             setView('list');
//             fetchBlogs();
//         } catch (err) {
//             showToast(err.response?.data?.message || 'Create failed', 'error');
//         } finally {
//             setSaving(false);
//         }
//     };

//     const handleUpdate = async (fd) => {
//         setSaving(true);
//         try {
//             await axios.put(`${baseUrl}/blog/${editing._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
//             showToast('Blog updated successfully!');
//             setView('list');
//             setEditing(null);
//             fetchBlogs();
//         } catch (err) {
//             showToast(err.response?.data?.message || 'Update failed', 'error');
//         } finally {
//             setSaving(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`${baseUrl}/blog/${id}`);
//             showToast('Blog deleted');
//             setBlogs(prev => prev.filter(b => b._id !== id));
//         } catch (err) {
//             showToast('Delete failed', 'error');
//         } finally {
//             setConfirm(null);
//         }
//     };

//     const handleToggle = async (id, field) => {
//         try {
//             const res = await axios.patch(`${baseUrl}/blog/${id}/toggle/${field}`);
//             setBlogs(prev => prev.map(b => b._id === id ? { ...b, [field]: res.data.blog[field] } : b));
//         } catch (err) {
//             showToast('Toggle failed', 'error');
//         }
//     };

//     const filtered = blogs.filter(b =>
//         !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase())
//     );

//     const DIFF_COLORS = {
//         Beginner: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
//         Intermediate: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800',
//         Advanced: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
//             {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
//             {confirm && (
//                 <ConfirmDialog
//                     message={confirm.message}
//                     onConfirm={confirm.onConfirm}
//                     onCancel={() => setConfirm(null)}
//                 />
//             )}

//             <div className="max-w-7xl mx-auto px-4 py-8">

//                 {/* ── CREATE / EDIT view ── */}
//                 {(view === 'create' || view === 'edit') && (
//                     <div>
//                         <button
//                             onClick={() => { setView('list'); setEditing(null); }}
//                             className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6 transition-colors"
//                         >
//                             <ArrowLeft className="w-4 h-4" /> Back to Blogs
//                         </button>
//                         <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 shadow-sm">
//                             <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
//                                 <BookOpen className="w-5 h-5 text-purple-600" />
//                                 {view === 'edit' ? 'Edit Blog Post' : 'Create New Blog Post'}
//                             </h2>
//                             <BlogForm
//                                 initial={view === 'edit' ? {
//                                     ...editing,
//                                     tags: Array.isArray(editing.tags) ? editing.tags.join(', ') : editing.tags || '',
//                                 } : null}
//                                 onSave={view === 'edit' ? handleUpdate : handleCreate}
//                                 onCancel={() => { setView('list'); setEditing(null); }}
//                                 saving={saving}
//                             />
//                         </div>
//                     </div>
//                 )}

//                 {/* ── LIST view ── */}
//                 {view === 'list' && (
//                     <>
//                         {/* Header */}
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Manager</h1>
//                                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
//                                     {blogs.length} total · {blogs.filter(b => b.published).length} published · {blogs.filter(b => b.featured).length} featured
//                                 </p>
//                             </div>
//                             <button
//                                 onClick={() => setView('create')}
//                                 className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:scale-[1.02] transition-all"
//                             >
//                                 <Plus className="w-4 h-4" /> New Blog Post
//                             </button>
//                         </div>

//                         {/* Search */}
//                         <div className="relative mb-5">
//                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                             <input
//                                 type="text"
//                                 value={search}
//                                 onChange={e => setSearch(e.target.value)}
//                                 placeholder="Search blogs by title or category..."
//                                 className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 text-base font-medium focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-colors"
//                             />
//                             {search && (
//                                 <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
//                                     <X className="w-4 h-4" />
//                                 </button>
//                             )}
//                         </div>

//                         {/* Table */}
//                         {loading ? (
//                             <div className="space-y-3">
//                                 {[...Array(5)].map((_, i) => (
//                                     <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex gap-4">
//                                         <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0" />
//                                         <div className="flex-1 space-y-2">
//                                             <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
//                                             <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : filtered.length === 0 ? (
//                             <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800">
//                                 <BookOpen className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
//                                 <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
//                                     {search ? 'No blogs match your search' : 'No blogs yet'}
//                                 </p>
//                                 {!search && (
//                                     <button onClick={() => setView('create')}
//                                         className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors">
//                                         Create your first blog
//                                     </button>
//                                 )}
//                             </div>
//                         ) : (
//                             <div className="space-y-3">
//                                 {filtered.map((blog) => (
//                                     <div key={blog._id}
//                                         className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-all">

//                                         {/* Thumbnail */}
//                                         <div className="w-full sm:w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
//                                             {blog.imageUrl
//                                                 ? <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
//                                                 : <div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
//                                                     <BookOpen className="w-5 h-5 text-white" />
//                                                 </div>
//                                             }
//                                         </div>

//                                         {/* Info */}
//                                         <div className="flex-1 min-w-0">
//                                             <div className="flex flex-wrap items-center gap-2 mb-1">
//                                                 <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
//                                                     {blog.category}
//                                                 </span>
//                                                 <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${DIFF_COLORS[blog.difficulty]}`}>
//                                                     {blog.difficulty}
//                                                 </span>
//                                                 {blog.featured && (
//                                                     <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
//                                                         Featured
//                                                     </span>
//                                                 )}
//                                                 {!blog.published && (
//                                                     <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
//                                                         Draft
//                                                     </span>
//                                                 )}
//                                             </div>
//                                             <p className="text-base font-bold text-gray-900 dark:text-white truncate">{blog.title}</p>
//                                             <div className="flex items-center gap-4 mt-1 text-xs text-gray-400 dark:text-gray-500">
//                                                 <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime} min</span>
//                                                 <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {blog.views} views</span>
//                                                 <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
//                                             </div>
//                                         </div>

//                                         {/* Actions */}
//                                         <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
//                                             {/* Publish toggle */}
//                                             <button
//                                                 onClick={() => handleToggle(blog._id, 'published')}
//                                                 title={blog.published ? 'Unpublish' : 'Publish'}
//                                                 className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${blog.published
//                                                     ? 'bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400'
//                                                     : 'bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-500'}`}
//                                             >
//                                                 {blog.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
//                                             </button>

//                                             {/* Featured toggle */}
//                                             <button
//                                                 onClick={() => handleToggle(blog._id, 'featured')}
//                                                 title={blog.featured ? 'Unfeature' : 'Feature'}
//                                                 className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${blog.featured
//                                                     ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400'
//                                                     : 'bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-500'}`}
//                                             >
//                                                 {blog.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
//                                             </button>

//                                             {/* Edit */}
//                                             <button
//                                                 onClick={() => { setEditing(blog); setView('edit'); }}
//                                                 className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 transition-colors"
//                                                 title="Edit"
//                                             >
//                                                 <Pencil className="w-4 h-4" />
//                                             </button>

//                                             {/* Delete */}
//                                             <button
//                                                 onClick={() => setConfirm({
//                                                     message: `Delete "${blog.title}"? This cannot be undone.`,
//                                                     onConfirm: () => handleDelete(blog._id),
//                                                 })}
//                                                 className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 transition-colors"
//                                                 title="Delete"
//                                             >
//                                                 <Trash2 className="w-4 h-4" />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminBlog;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    Plus,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    Star,
    StarOff,
    Search,
    X,
    Upload,
    Save,
    ArrowLeft,
    AlertCircle,
    CheckCircle2,
    Loader2,
    BookOpen,
    Clock,
    TrendingUp,
    FileJson
} from 'lucide-react';

import { baseUrl } from '../../Baseurl';

const CATEGORIES = [
    'Interview Tips',
    'DSA',
    'System Design',
    'HR Round',
    'Resume Tips',
    'Aptitude',
    'Coding Interview',
    'Career Advice'
];

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

const EMPTY_FORM = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: CATEGORIES[0],
    difficulty: DIFFICULTIES[0],
    tags: '',
    author: 'TheJobInfo Team',
    featured: false,
    published: true,
};

// ── Toast ─────────────────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => (
    <div
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-bold transition-all ${type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
    >
        {type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
        ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
        )}

        {message}

        <button onClick={onClose} className="ml-2 hover:opacity-75">
            <X className="w-3.5 h-3.5" />
        </button>
    </div>
);

// ── Confirm Dialog ────────────────────────────────────────────────────────────
const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">

            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>

                <div>
                    <p className="font-bold text-gray-900 dark:text-white text-base">
                        Confirm Delete
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {message}
                    </p>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onCancel}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    Cancel
                </button>

                <button
                    onClick={onConfirm}
                    className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
);

// ── Form Helpers ──────────────────────────────────────────────────────────────
const Label = ({ children }) => (
    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
        {children}
    </label>
);

const Input = ({ className = '', ...props }) => (
    <input
        className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 text-base font-medium focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-colors ${className}`}
        {...props}
    />
);

const Select = ({ children, className = '', ...props }) => (
    <select
        className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-base font-medium focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-colors ${className}`}
        {...props}
    >
        {children}
    </select>
);

const Textarea = ({ className = '', ...props }) => (
    <textarea
        className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 text-base font-medium focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-colors resize-y ${className}`}
        {...props}
    />
);

// ── Blog Form ─────────────────────────────────────────────────────────────────
const BlogForm = ({ initial, onSave, onCancel, saving }) => {

    const [form, setForm] = useState(initial || EMPTY_FORM);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(initial?.imageUrl || '');

    const set = (key, val) => {
        setForm(prev => ({
            ...prev,
            [key]: val
        }));
    };

    // Auto generate slug
    const handleTitle = (val) => {
        set('title', val);

        if (!initial?._id) {
            set(
                'slug',
                val
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim()
            );
        }
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();

        Object.entries(form).forEach(([k, v]) => {
            if (k === 'tags') {
                fd.append(
                    k,
                    JSON.stringify(
                        v.split(',')
                            .map(t => t.trim())
                            .filter(Boolean)
                    )
                );
            } else {
                fd.append(k, v);
            }
        });

        if (image) {
            fd.append('image', image);
        }

        onSave(fd);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
                <Label>Title *</Label>

                <Input
                    value={form.title}
                    onChange={e => handleTitle(e.target.value)}
                    placeholder="e.g. Top 10 DSA Problems"
                    required
                />
            </div>

            {/* Slug */}
            <div>
                <Label>Slug *</Label>

                <Input
                    value={form.slug}
                    onChange={e => set('slug', e.target.value)}
                    required
                />

                <p className="text-xs text-gray-400 mt-1">
                    URL: /blog/{form.slug || 'your-slug'}
                </p>
            </div>

            {/* Category + Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                    <Label>Category *</Label>

                    <Select
                        value={form.category}
                        onChange={e => set('category', e.target.value)}
                    >
                        {CATEGORIES.map(c => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </Select>
                </div>

                <div>
                    <Label>Difficulty *</Label>

                    <Select
                        value={form.difficulty}
                        onChange={e => set('difficulty', e.target.value)}
                    >
                        {DIFFICULTIES.map(d => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>

            {/* Author */}
            <div>
                <Label>Author</Label>

                <Input
                    value={form.author}
                    onChange={e => set('author', e.target.value)}
                />
            </div>

            {/* Excerpt */}
            <div>
                <Label>Excerpt *</Label>

                <Textarea
                    value={form.excerpt}
                    onChange={e => set('excerpt', e.target.value)}
                    rows={3}
                    maxLength={300}
                    required
                />

                <p className="text-xs text-gray-400 mt-1">
                    {form.excerpt.length}/300
                </p>
            </div>

            {/* Content */}
            <div>
                <Label>Content *</Label>

                <Textarea
                    value={form.content}
                    onChange={e => set('content', e.target.value)}
                    rows={14}
                    required
                />
            </div>

            {/* Tags */}
            <div>
                <Label>Tags</Label>

                <Input
                    value={form.tags}
                    onChange={e => set('tags', e.target.value)}
                    placeholder="arrays, recursion"
                />
            </div>

            {/* Image Upload */}
            <div>
                <Label>Cover Image</Label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="block w-full text-sm"
                />

                {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        className="mt-3 h-40 rounded-xl object-cover"
                    />
                )}
            </div>

            {/* Toggles */}
            <div className="flex gap-5">

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={form.published}
                        onChange={() =>
                            set('published', !form.published)
                        }
                    />
                    Published
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={() =>
                            set('featured', !form.featured)
                        }
                    />
                    Featured
                </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3">

                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-3 rounded-xl border"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-3 rounded-xl bg-purple-600 text-white flex items-center justify-center gap-2"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Save Blog
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const AdminBlog = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('list');
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState('');
    const [toast, setToast] = useState(null);
    const [confirm, setConfirm] = useState(null);

    // JSON Modal
    const [showJsonModal, setShowJsonModal] = useState(false);
    const [jsonInput, setJsonInput] = useState('');

    const showToast = (message, type = 'success') => {
        setToast({ message, type });

        setTimeout(() => {
            setToast(null);
        }, 3500);
    };

    // ── Fetch Blogs ───────────────────────────────────────────────────────────
    const fetchBlogs = async () => {

        setLoading(true);

        try {

            const res = await axios.get(`${baseUrl}/blog/admin/all`);

            setBlogs(
                Array.isArray(res.data?.blogs)
                    ? res.data.blogs
                    : []
            );

        } catch (err) {

            console.error(err);

            showToast('Failed to fetch blogs', 'error');

            setBlogs([]);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // ── Bulk JSON Paste ───────────────────────────────────────────────────────
    const handleBulkJsonPaste = async () => {

        if (!jsonInput.trim()) {
            showToast('Paste JSON first', 'error');
            return;
        }

        try {

            const blogs = JSON.parse(jsonInput);

            if (!Array.isArray(blogs)) {
                showToast('JSON must be array', 'error');
                return;
            }

            setSaving(true);

            await axios.post(`${baseUrl}/blog/bulk-upload`, {
                blogs
            });

            showToast(`${blogs.length} blogs uploaded`);

            setJsonInput('');
            setShowJsonModal(false);

            fetchBlogs();

        } catch (err) {

            console.error(err);

            if (err instanceof SyntaxError) {
                showToast('Invalid JSON format', 'error');
            } else {
                showToast('Bulk upload failed', 'error');
            }

        } finally {
            setSaving(false);
        }
    };

    // ── Create ────────────────────────────────────────────────────────────────
    const handleCreate = async (fd) => {

        setSaving(true);

        try {

            await axios.post(`${baseUrl}/blog`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            showToast('Blog created successfully');

            setView('list');

            fetchBlogs();

        } catch (err) {

            showToast(
                err.response?.data?.message || 'Create failed',
                'error'
            );

        } finally {
            setSaving(false);
        }
    };

    // ── Update ────────────────────────────────────────────────────────────────
    const handleUpdate = async (fd) => {

        setSaving(true);

        try {

            await axios.put(
                `${baseUrl}/blog/${editing._id}`,
                fd,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            showToast('Blog updated');

            setView('list');
            setEditing(null);

            fetchBlogs();

        } catch (err) {

            showToast(
                err.response?.data?.message || 'Update failed',
                'error'
            );

        } finally {
            setSaving(false);
        }
    };

    // ── Delete ────────────────────────────────────────────────────────────────
    const handleDelete = async (id) => {

        try {

            await axios.delete(`${baseUrl}/blog/${id}`);

            setBlogs(prev =>
                prev.filter(b => b._id !== id)
            );

            showToast('Blog deleted');

        } catch (err) {

            showToast('Delete failed', 'error');

        } finally {
            setConfirm(null);
        }
    };

    // ── Toggle ────────────────────────────────────────────────────────────────
    const handleToggle = async (id, field) => {

        try {

            const res = await axios.patch(
                `${baseUrl}/blog/${id}/toggle/${field}`
            );

            setBlogs(prev =>
                prev.map(b =>
                    b._id === id
                        ? {
                            ...b,
                            [field]: res.data.blog[field]
                        }
                        : b
                )
            );

        } catch (err) {

            showToast('Toggle failed', 'error');
        }
    };

    // ── Safe Filter ───────────────────────────────────────────────────────────
    const filtered = (blogs || []).filter(b =>
        !search ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

            {/* Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Confirm */}
            {confirm && (
                <ConfirmDialog
                    message={confirm.message}
                    onConfirm={confirm.onConfirm}
                    onCancel={() => setConfirm(null)}
                />
            )}

            {/* JSON MODAL */}
            {showJsonModal && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-3xl shadow-2xl border border-gray-200 dark:border-gray-700">

                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <FileJson className="w-5 h-5 text-blue-600" />
                                    Paste Blogs JSON
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Paste array of blog objects
                                </p>
                            </div>

                            <button
                                onClick={() => setShowJsonModal(false)}
                                className="w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-5">

                            <textarea
                                value={jsonInput}
                                onChange={(e) =>
                                    setJsonInput(e.target.value)
                                }
                                placeholder={`[
  {
    "title": "Top DSA Questions",
    "slug": "top-dsa-questions",
    "excerpt": "Important DSA problems",
    "content": "<h2>DSA Content</h2>",
    "category": "DSA",
    "difficulty": "Beginner"
  }
]`}
                                className="w-full h-[420px] rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white p-4 font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
                            />

                            <div className="flex justify-end gap-3 mt-5">

                                <button
                                    onClick={() =>
                                        setShowJsonModal(false)
                                    }
                                    className="px-5 py-2.5 rounded-xl border"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleBulkJsonPaste}
                                    disabled={saving}
                                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold flex items-center gap-2 disabled:opacity-60"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <FileJson className="w-4 h-4" />
                                            Upload Blogs
                                        </>
                                    )}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* CREATE / EDIT */}
                {(view === 'create' || view === 'edit') && (

                    <div>

                        <button
                            onClick={() => {
                                setView('list');
                                setEditing(null);
                            }}
                            className="flex items-center gap-2 mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">

                            <h2 className="text-xl font-bold mb-6">
                                {view === 'edit'
                                    ? 'Edit Blog'
                                    : 'Create Blog'}
                            </h2>

                            <BlogForm
                                initial={
                                    view === 'edit'
                                        ? {
                                            ...editing,
                                            tags: Array.isArray(editing.tags)
                                                ? editing.tags.join(', ')
                                                : editing.tags || '',
                                        }
                                        : null
                                }
                                onSave={
                                    view === 'edit'
                                        ? handleUpdate
                                        : handleCreate
                                }
                                onCancel={() => {
                                    setView('list');
                                    setEditing(null);
                                }}
                                saving={saving}
                            />
                        </div>
                    </div>
                )}

                {/* LIST */}
                {view === 'list' && (
                    <>

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                            <div>
                                <h1 className="text-2xl font-bold">
                                    Blog Manager
                                </h1>

                                <p className="text-sm text-gray-500 mt-1">
                                    {blogs.length} total ·{' '}
                                    {(blogs || []).filter(b => b.published).length} published ·{' '}
                                    {(blogs || []).filter(b => b.featured).length} featured
                                </p>
                            </div>

                            <div className="flex gap-3 flex-wrap">

                                <button
                                    onClick={() => setShowJsonModal(true)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:shadow-lg"
                                >
                                    <FileJson className="w-4 h-4" />
                                    Paste JSON
                                </button>

                                <button
                                    onClick={() => setView('create')}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-bold"
                                >
                                    <Plus className="w-4 h-4" />
                                    New Blog Post
                                </button>

                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative mb-5">

                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search blogs..."
                                className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700"
                            />

                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Loading */}
                        {loading ? (

                            <div className="flex justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                            </div>

                        ) : filtered.length === 0 ? (

                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl">

                                <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300" />

                                <p className="text-lg font-bold">
                                    No blogs found
                                </p>
                            </div>

                        ) : (

                            <div className="space-y-3">

                                {filtered.map(blog => (

                                    <div
                                        key={blog._id}
                                        className="bg-white dark:bg-gray-800 rounded-2xl border p-4 flex flex-col sm:flex-row gap-4"
                                    >

                                        {/* Thumbnail */}
                                        <div className="w-full sm:w-20 h-14 rounded-xl overflow-hidden bg-gray-100">

                                            {blog.imageUrl ? (
                                                <img
                                                    src={blog.imageUrl}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                                    <BookOpen className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">

                                            <div className="flex flex-wrap gap-2 mb-1">

                                                <span className="text-xs font-bold text-purple-600 uppercase">
                                                    {blog.category}
                                                </span>

                                                {blog.featured && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                                                        Featured
                                                    </span>
                                                )}

                                                {!blog.published && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                                                        Draft
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-base font-bold">
                                                {blog.title}
                                            </p>

                                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">

                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {blog.readTime} min
                                                </span>

                                                <span className="flex items-center gap-1">
                                                    <TrendingUp className="w-3 h-3" />
                                                    {blog.views} views
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">

                                            <button
                                                onClick={() =>
                                                    handleToggle(blog._id, 'published')
                                                }
                                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-100"
                                            >
                                                {blog.published ? (
                                                    <Eye className="w-4 h-4" />
                                                ) : (
                                                    <EyeOff className="w-4 h-4" />
                                                )}
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleToggle(blog._id, 'featured')
                                                }
                                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-yellow-100"
                                            >
                                                {blog.featured ? (
                                                    <Star className="w-4 h-4 fill-current" />
                                                ) : (
                                                    <StarOff className="w-4 h-4" />
                                                )}
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setEditing(blog);
                                                    setView('edit');
                                                }}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    setConfirm({
                                                        message: `Delete "${blog.title}"?`,
                                                        onConfirm: () =>
                                                            handleDelete(blog._id),
                                                    })
                                                }
                                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminBlog;