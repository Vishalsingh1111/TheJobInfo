import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft, Eye, EyeOff, ShieldCheck, UserPlus } from 'lucide-react';
import { baseUrl } from '../../Baseurl';

export default function AddAdmin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const addAdmin = async (event) => {
        event.preventDefault();
        if (password.length < 12) {
            toast.error('Use a password with at least 12 characters.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        setSubmitting(true);
        try {
            await axios.post(`${baseUrl}/admin/addadmin`, { username: username.trim(), password });
            toast.success('Administrator created successfully.');
            navigate('/', { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to create administrator.');
        } finally {
            setSubmitting(false);
        }
    };

    const fieldClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-950';

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-gray-950 dark:text-white sm:px-6">
            <Toaster position="top-right" />
            <div className="mx-auto max-w-2xl">
                <button type="button" onClick={() => navigate('/')} className="mb-6 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-500 transition hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-300"><ArrowLeft className="h-4 w-4" /> Back to dashboard</button>
                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-blue-950/5 dark:border-gray-800 dark:bg-gray-900">
                    <div className="bg-gradient-to-r from-blue-700 to-teal-700 px-6 py-7 text-white sm:px-9">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15"><UserPlus className="h-6 w-6" /></div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Team access</p>
                        <h1 className="mt-1 text-2xl font-bold">Add an administrator</h1>
                        <p className="mt-2 max-w-lg text-sm leading-6 text-blue-100">Create a secure account for someone who needs to manage TheJobInfo.</p>
                    </div>
                    <form onSubmit={addAdmin} className="space-y-5 p-6 sm:p-9">
                        <div>
                            <label className="mb-2 block text-sm font-semibold" htmlFor="new-admin-username">Username</label>
                            <input id="new-admin-username" type="text" autoComplete="username" value={username} onChange={event => setUsername(event.target.value)} className={fieldClass} placeholder="Choose a username" maxLength={100} required />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold" htmlFor="new-admin-password">Password</label>
                            <div className="relative"><input id="new-admin-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={event => setPassword(event.target.value)} className={fieldClass} placeholder="At least 12 characters" minLength={12} maxLength={200} required /><button type="button" onClick={() => setShowPassword(value => !value)} className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-blue-600" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
                            <p className="mt-2 text-xs text-slate-400 dark:text-gray-500">Use 12 or more characters.</p>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold" htmlFor="confirm-admin-password">Confirm password</label>
                            <div className="relative"><input id="confirm-admin-password" type={showConfirmPassword ? 'text' : 'password'} autoComplete="new-password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} className={fieldClass} placeholder="Enter the password again" required /><button type="button" onClick={() => setShowConfirmPassword(value => !value)} className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-blue-600" aria-label={showConfirmPassword ? 'Hide confirmation' : 'Show confirmation'}>{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
                        </div>
                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Account credentials are securely hashed.</div>
                            <button disabled={submitting} type="submit" className="rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 disabled:opacity-60">{submitting ? 'Creating…' : 'Create administrator'}</button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}
