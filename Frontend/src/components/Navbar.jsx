

import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Code, BookOpen } from 'lucide-react';


const Navbar = () => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [sticky, setSticky] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

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
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Sticky on scroll
    useEffect(() => {
        const handleScroll = () => setSticky(window.scrollY > 0);
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
        { name: 'HOME', href: '/' },
        { name: 'TRENDING JOBS', href: '/Job-Portal' },
        {
            name: 'JOBS FOR',
            dropdown: [
                { name: 'FRESHER', href: '/Fresher-Jobs', icon: <Code className="w-4 h-4" /> },
                { name: 'EXPERIENCED', href: '/Experienced-Jobs', icon: <BookOpen className="w-4 h-4" /> },
            ]
        },
        { name: 'INTERNSHIPS', href: '/Internships' },
        { name: 'ABOUT', href: '/About' },
        { name: 'CONTACT', href: '/Contact' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${sticky || mobileMenuOpen
                ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg shadow-lg'
                : 'bg-transparent dark:bg-transparent'
                }`}>
                <div className="max-w-screen-2xl mx-auto px-4 md:px-20">
                    <div className="flex items-center justify-between h-20">

                        {/* ── Logo ── */}
                        <a href='/' className="flex-shrink-0 flex items-center gap-3">
                            <div className="flex flex-col">
                                <span
                                    className="text-2xl font-black bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent"
                                    style={{ fontFamily: '"Quicksand", sans-serif' }}
                                >
                                    THEJOBINFO
                                </span>
                                <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                    Powered by DCODER
                                </span>
                            </div>
                        </a>

                        {/* ── Desktop Nav ── */}
                        <div className="hidden lg:flex items-center space-x-1">
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
                                                className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 font-semibold text-sm transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                            >
                                                {link.name}
                                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                            </button>

                                            {openDropdown === link.name && (
                                                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                                                    style={{ animation: 'fadeInDown 0.18s ease-out' }}>
                                                    {link.dropdown.map((item, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={item.href}
                                                            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 hover:text-red-500 dark:hover:text-red-400 transition-all text-sm font-semibold"
                                                            onClick={() => setOpenDropdown(null)}
                                                        >
                                                            {item.icon}
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <a
                                            href={link.href}
                                            className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 font-semibold text-sm transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            {link.name}
                                        </a>
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

                            {/* Hamburger — only on < lg */}
                            <button
                                onClick={() => setMobileMenuOpen(prev => !prev)}
                                className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    style={{ background: 'inherit' }}
                >
                    {/* Solid background regardless of sticky state */}
                    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-xl">
                        <div className="px-4 py-5 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">

                            {navLinks.map((link, index) => (
                                <div key={index}>
                                    {link.dropdown ? (
                                        <div>
                                            {/* Dropdown trigger */}
                                            <button
                                                onClick={() => toggleDropdown(link.name)}
                                                className="w-full flex items-center justify-between px-4 py-3.5 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold text-base transition-colors"
                                            >
                                                <span>{link.name}</span>
                                                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                            </button>

                                            {/* Dropdown items — CSS transition, no conditional unmount */}
                                            <div className={`overflow-hidden transition-all duration-200 ease-in-out ${openDropdown === link.name ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                                                }`}>
                                                <div className="ml-4 mt-1 mb-1 space-y-1 border-l-2 border-red-100 dark:border-red-900/40 pl-3">
                                                    {link.dropdown.map((item, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={item.href}
                                                            className="flex items-center gap-3 px-3 py-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors text-sm font-semibold"
                                                            onClick={closeMobile}
                                                        >
                                                            <span className="text-red-400">{item.icon}</span>
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <a
                                            href={link.href}
                                            className="flex items-center px-4 py-3.5 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold text-base transition-colors"
                                            onClick={closeMobile}
                                        >
                                            {link.name}
                                        </a>
                                    )}
                                </div>
                            ))}

                            {/* Divider + branding footer */}
                            <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
                                <p className="text-center text-xs font-medium text-gray-400 dark:text-gray-600 pb-2">
                                    THEJOBINFO · Powered by DCODER
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Overlay — closes menu on tap outside */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 lg:hidden"
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