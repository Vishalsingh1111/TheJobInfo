

import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Bookmark, Instagram, Send } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../siteConfig';

const Navbar = () => {
    const { pathname } = useLocation();
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem("theme") || "light";
        } catch (error) {
            console.error("Could not read the theme preference:", error);
            return "light";
        }
    });
    const [sticky, setSticky] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [savedJobs, setSavedJobs] = useState([]);
    const [savedOpen, setSavedOpen] = useState(false);

    const dropdownRefs = useRef({});
    const mobileMenuRef = useRef(null);

    // Theme handler
    useEffect(() => {
        const el = document.documentElement;
        if (theme === "dark") {
            el.classList.add("dark");
            document.body.classList.add("dark");
        } else {
            el.classList.remove("dark");
            document.body.classList.remove("dark");
        }
        try {
            localStorage.setItem("theme", theme);
        } catch (error) {
            console.error("Could not save the theme preference:", error);
        }
    }, [theme]);

    // Sticky on scroll
    useEffect(() => {
        const syncSavedJobs = () => {
            try { setSavedJobs(JSON.parse(localStorage.getItem('savedJobs') || '[]')); }
            catch { setSavedJobs([]); }
        };
        syncSavedJobs();
        window.addEventListener('saved-jobs-updated', syncSavedJobs);
        window.addEventListener('storage', syncSavedJobs);
        return () => {
            window.removeEventListener('saved-jobs-updated', syncSavedJobs);
            window.removeEventListener('storage', syncSavedJobs);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => setSticky(window.scrollY > 0);
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close desktop dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedOutside = Object.values(dropdownRefs.current).every(
                ref => ref && !ref.contains(event.target)
            );
            if (clickedOutside) setOpenDropdown(null);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const toggleDropdown = (name) => {
        setOpenDropdown(prev => prev === name ? null : name);
    };

    const closeMobile = () => {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        {
            name: 'Jobs',
            dropdown: [
                { name: 'Fresher', href: '/Fresher-Jobs' },
                { name: 'Experienced', href: '/Experienced-Jobs' },
            ],
        },
        { name: 'Internships', href: '/Internships' },
        {
            name: 'Article',
            dropdown: [
                { name: 'Interview Article', href: '/Blogs' },
            ],
        },
        { name: 'About', href: '/About' },
        { name: 'Contact', href: '/Contact' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-lg transition-all duration-300 dark:border-gray-800 dark:bg-gray-950/95 ${sticky || mobileMenuOpen ? 'shadow-md' : ''}`}>
                <div className="mx-auto max-w-7xl px-[15px]">
                    <div className="flex h-[4.5rem] items-center justify-between">

                        {/* ── Logo ── */}
                        <Link to='/' className="flex-shrink-0 flex items-center gap-3">
                            <div className="flex flex-col">
                                <span
                                    className="bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-2xl font-black text-transparent"
                                >
                                    THEJOBINFO
                                </span>

                            </div>
                        </Link>

                        {/* ── Desktop Nav ── */}
                        <div className="hidden xl:flex items-center space-x-0.5">
                            {navLinks.map((link, index) => (
                                <div
                                    key={index}
                                    className="relative"
                                    ref={el => dropdownRefs.current[link.name] = el}
                                >
                                    {link.dropdown ? (
                                        <>
                                            <button
                                                onClick={() => toggleDropdown(link.name)}
                                                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold uppercase transition-colors hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-gray-800 dark:hover:text-sky-300 ${link.dropdown.some(item => pathname.toLowerCase() === item.href.toLowerCase()) ? 'bg-sky-100/80 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200' : 'text-gray-700 dark:text-gray-200'}`}
                                                aria-expanded={openDropdown === link.name}
                                            >
                                                {link.name}
                                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                            </button>

                                            {openDropdown === link.name && (
                                                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                                                    style={{ animation: 'fadeInDown 0.18s ease-out' }}>
                                                    {link.dropdown.map((item, idx) => (
                                                        <Link
                                                            key={idx}
                                                            to={item.href}
                                                            className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold uppercase transition-all hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-900/20 dark:hover:text-sky-300 ${pathname.toLowerCase() === item.href.toLowerCase() ? 'bg-sky-50 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200' : 'text-gray-700 dark:text-gray-200'}`}
                                                            onClick={() => setOpenDropdown(null)}
                                                        >
                                                            {item.icon}
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            to={link.href}
                                            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold uppercase text-gray-700 transition-colors hover:bg-sky-50 hover:text-sky-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-sky-300 ${pathname.toLowerCase() === link.href.toLowerCase() ? 'bg-sky-100/80 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200' : ''}`}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* ── Right: theme + hamburger ── */}
                        <div className="flex items-center gap-2">
                            {/* Theme toggle */}
                            <button
                                onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === "light"
                                    ? <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                                    : <Sun className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                                }
                            </button>

                            <div className="relative hidden sm:block">
                                <button type="button" onClick={() => setSavedOpen(value => !value)} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-sky-200 hover:bg-sky-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" aria-expanded={savedOpen}>
                                    <Bookmark className="h-4 w-4 text-sky-600 dark:text-sky-300" />{savedJobs.length > 0 && ` (${savedJobs.length})`}
                                </button>
                                {savedOpen && <div className="absolute right-0 top-full z-[60] mt-2 w-72 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                                    <p className="px-2 pb-2 text-xs font-bold uppercase tracking-wide text-gray-400">Saved jobs</p>
                                    {savedJobs.length ? savedJobs.slice(0, 5).map(job => <Link key={job._id} to={`/jobdetail/${job.slug || job._id}`} onClick={() => setSavedOpen(false)} className="block rounded-xl px-3 py-2.5 hover:bg-blue-50 dark:hover:bg-gray-800"><span className="block truncate text-sm font-semibold text-gray-800 dark:text-gray-100">{job.title}</span><span className="block truncate text-xs text-gray-500">{job.company}</span></Link>) : <p className="px-2 py-4 text-sm text-gray-500">Save a job from the listings to find it here.</p>}
                                </div>}
                            </div>

                            <a href="https://www.instagram.com/the.jobinfo/" target="_blank" rel="noreferrer" className="hidden h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-slate-900 sm:flex" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
                            {siteConfig.telegram && <a href={siteConfig.telegram} target="_blank" rel="noreferrer" className="hidden h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white sm:flex" aria-label="Telegram"><Send className="h-4 w-4" /></a>}

                            {/* Hamburger — only on < lg */}
                            <button
                                onClick={() => setMobileMenuOpen(prev => !prev)}
                                className="xl:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Toggle mobile menu"
                                aria-expanded={mobileMenuOpen}
                            >
                                {mobileMenuOpen
                                    ? <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                    : <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                }
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Mobile Menu — rendered inside nav so it sits below the bar ── */}
                <div
                    ref={mobileMenuRef}
                    className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    style={{ background: 'inherit' }}
                >
                    {/* Solid background regardless of sticky state */}
                    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-xl">
                        <div className="max-h-[calc(100vh-72px)] space-y-1 overflow-y-auto px-4 py-5">

                            {navLinks.map((link, index) => (
                                <div key={index}>
                                    {link.dropdown ? (
                                        <div>
                                            {/* Dropdown trigger */}
                                            <button
                                                onClick={() => toggleDropdown(link.name)}
                                                className={`w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold uppercase transition-colors hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-gray-800 dark:hover:text-sky-300 ${link.dropdown.some(item => pathname.toLowerCase() === item.href.toLowerCase()) ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200' : 'text-gray-800 dark:text-gray-100'}`}
                                                aria-expanded={openDropdown === link.name}
                                            >
                                                <span>{link.name}</span>
                                                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                            </button>

                                            {/* Dropdown items — CSS transition, no conditional unmount */}
                                            <div className={`overflow-hidden transition-all duration-200 ease-in-out ${openDropdown === link.name ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                                                }`}>
                                                <div className="ml-4 mt-1 mb-1 space-y-1 border-l-2 border-sky-100 dark:border-sky-900/40 pl-3">
                                                    {link.dropdown.map((item, idx) => (
                                                        <Link
                                                            key={idx}
                                                            to={item.href}
                                                            className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold uppercase transition-colors hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-900/20 dark:hover:text-sky-300 ${pathname.toLowerCase() === item.href.toLowerCase() ? 'bg-sky-50 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200' : 'text-gray-600 dark:text-gray-300'}`}
                                                            onClick={closeMobile}
                                                        >
                                                            <span className="text-sky-600 dark:text-sky-400">{item.icon}</span>
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            to={link.href}
                                            className={`flex items-center rounded-xl px-4 py-3.5 text-base font-semibold uppercase text-gray-800 transition-colors hover:bg-sky-50 dark:text-gray-100 dark:hover:bg-gray-800 ${pathname.toLowerCase() === link.href.toLowerCase() ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200' : ''}`}
                                            onClick={closeMobile}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}

                            <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-900/40 dark:bg-blue-950/20 sm:hidden">
                                <p className="mb-2 flex items-center gap-2 text-sm font-bold text-blue-800 dark:text-blue-200"><Bookmark className="h-4 w-4" /> Saved jobs ({savedJobs.length})</p>
                                {savedJobs.length ? savedJobs.slice(0, 4).map(job => <Link key={job._id} to={`/jobdetail/${job.slug || job._id}`} onClick={closeMobile} className="block truncate py-2 text-sm text-gray-700 dark:text-gray-200">{job.title}</Link>) : <p className="text-xs text-gray-500 dark:text-gray-400">Tap the bookmark on a listing to save it here.</p>}
                            </div>

                            {/* Divider + branding footer */}
                            <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
                                <p className="text-center text-xs font-medium text-gray-400 dark:text-gray-600 pb-2">
                                    Job listings and career guidance
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Overlay — closes menu on tap outside */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 xl:hidden"
                    onClick={closeMobile}
                    aria-hidden="true"
                />
            )}

            <style>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
};

export default Navbar;
