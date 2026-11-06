import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowRight, BriefcaseBusiness, Eye, EyeOff, LockKeyhole, Moon, ShieldCheck, Sun } from 'lucide-react';
import { baseUrl } from '../../Baseurl';
import { useAdminAuth } from '../../Context/AuthProvider2';

const AdminloginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [, setAuthAdmin] = useAdminAuth();
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('admin-theme') === 'dark');
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        document.body.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(current => {
            const next = !current;
            localStorage.setItem('admin-theme', next ? 'dark' : 'light');
            return next;
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            const normalizedUsername = username.trim();
            const { data } = await axios.post(`${baseUrl}/admin/login`, { username: normalizedUsername, password });
            if (!data?.token) throw new Error('The server did not return a sign-in token.');
            const session = { token: data.token, username: normalizedUsername };
            localStorage.setItem('Admins', JSON.stringify(session));
            setAuthAdmin(session);
            toast.success('Welcome back');
            navigate('/', { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Unable to sign in. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-16 text-slate-900 dark:bg-gray-950 dark:text-white sm:px-6">
                <div className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-950/40" />
                <div className="pointer-events-none absolute -bottom-48 -right-32 h-[28rem] w-[28rem] rounded-full bg-sky-100/70 blur-3xl dark:bg-sky-950/30" />
                <Toaster position="top-right" />
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="absolute right-5 top-5 rounded-xl border border-slate-200 bg-white/80 p-2.5 text-slate-600 shadow-sm transition hover:bg-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                    aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                <section className="relative w-full max-w-[440px] overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-2xl shadow-blue-950/10 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/30">
                    <header className="flex items-center gap-3 border-b border-slate-100 px-7 py-6 dark:border-gray-800 sm:px-9">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                            <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="text-base font-bold tracking-tight">TheJobInfo</p>
                            <p className="text-xs text-slate-500 dark:text-gray-400">Administrator sign in</p>
                        </div>
                    </header>

                    <div className="px-7 py-8 sm:px-9 sm:py-10">
                        <div className="mb-8">
                            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                                <LockKeyhole className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight sm:text-[1.75rem]">Sign in to your account</h1>
                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-gray-400">Enter your administrator credentials to continue.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-semibold" htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    autoComplete="username"
                                    maxLength={100}
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-950 dark:placeholder:text-gray-600"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold" htmlFor="password">Password</label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        maxLength={200}
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-950 dark:placeholder:text-gray-600"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(value => !value)}
                                        className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 transition hover:text-blue-600 dark:hover:text-blue-300"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                            <button
                                disabled={submitting}
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70"
                            >
                                {submitting ? 'Signing in…' : 'Sign in'}
                                {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                            </button>
                        </form>
                    </div>

                    <footer className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50/70 px-6 py-4 text-xs text-slate-500 dark:border-gray-800 dark:bg-gray-950/50 dark:text-gray-400">
                        <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                        Authorized administrators only
                    </footer>
                </section>
            </main>
        </div>
    );
};

export default AdminloginPage;
