// import React, { useEffect, useRef, useState } from 'react';
// import { useAuth } from '../Context/AuthProvider';
// import TechAICard from './Common/TechAICard';

// const Navbar = () => {
//     const [authUser] = useAuth();
//     const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//     const [sticky, setSticky] = useState(false);

//     // Refs for dropdowns
//     const dsaRef = useRef(null);
//     const notesRef = useRef(null);
//     const moreRef = useRef(null);

//     // Theme handler
//     useEffect(() => {
//         const element = document.documentElement;
//         if (theme === "dark") {
//             element.classList.add("dark");
//             document.body.classList.add("dark");
//         } else {
//             element.classList.remove("dark");
//             document.body.classList.remove("dark");
//         }
//         localStorage.setItem("theme", theme);
//     }, [theme]);

//     // Sticky navbar on scroll
//     useEffect(() => {
//         const handleScroll = () => setSticky(window.scrollY > 0);
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     // Close dropdowns on outside click
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             [dsaRef, notesRef, moreRef].forEach(ref => {
//                 if (ref.current && !ref.current.contains(event.target)) {
//                     ref.current.removeAttribute('open');
//                 }
//             });
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const navItems = (
//         <>
//             <li><a href='/'>HOME</a></li>
//             <li>
//                 <details ref={dsaRef}>
//                     <summary>DSA SHEET</summary>
//                     <ul className="bg-white w-[200px] rounded-t-none rounded-md py-5 dark:bg-slate-900 dark:text-white">
//                         <li><a href='/New-Updated-Sheet'>NEW UPDATED SHEET</a></li>
//                         <li><a href='/Company-Wise-Sheet'>COMPANY WISE SHEET</a></li>
//                         <li><a href='/Top-50'>TOP 50 DSA PROBLEMS</a></li>
//                     </ul>
//                 </details>
//             </li>
//             <li>
//                 <details ref={notesRef}>
//                     <summary>NOTES</summary>
//                     <ul className="bg-white w-[200px] rounded-t-none rounded-md py-5 dark:bg-slate-900 dark:text-white">
//                         <li><a href='/Languages'>PROGRAMING LANGUAGE</a></li>
//                         <li><a href='/CS-Fundamental'>CS FUNDAMENTAL</a></li>
//                     </ul>
//                 </details>
//             </li>
//             <li><a href='/Technical-Blog'>BLOGS</a></li>
//             <li>
//                 <details ref={moreRef}>
//                     <summary>MORE</summary>
//                     <ul className="bg-white w-48 rounded-t-none rounded-md p-2 dark:bg-slate-900 dark:text-white">
//                         <li><a href='/Contest-Solution'>CONTEST SOLUTION</a></li>
//                     </ul>
//                 </details>
//             </li>
//         </>
//     );

//     return (
//         <div className={`max-w-screen-2xl container font-[600] mx-auto md:px-20 px-4 dark:bg-none dark:text-white z-50 fixed top-0 left-0 ${sticky ? "sticky-navbar shadow-md bg-[rgb(255,255,255)] dark:bg-slate-900 dark:text-white duration-300 transition-all ease-in-out" : ""}`}>
//             <div className="navbar">
//                 <div className="navbar-start">
//                     <div className="dropdown">
//                         <div tabIndex={0} role="button" className="btn btn-ghost p-0 lg:hidden mr-2">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//                             </svg>
//                         </div>
//                         <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56 dark:bg-slate-900 dark:text-white">
//                             {navItems}
//                         </ul>
//                     </div>
//                     <a href='/' className="text-xl text-red-500 cursor-pointer" style={{ fontFamily: '"Quicksand", sans-serif', fontWeight: '900' }}>DCODER</a>
//                 </div>
//                 <div className="navbar-center hidden lg:flex space-x-4">
//                     <ul className="menu menu-horizontal text-md">
//                         {navItems}
//                     </ul>
//                 </div>
//                 <div className="navbar-end space-x-4">
//                     <label className="swap swap-rotate">
//                         <input type="checkbox" className="theme-controller" checked={theme === "dark"} onChange={() => setTheme(theme === "light" ? "dark" : "light")} />
//                         <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
//                         <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
//                     </label>

//                     <TechAICard />

//                     {!authUser && (
//                         <a href="/Login" className="bg-red-600 text-white px-3.5 py-1.5 shadow-lg hover:shadow-red-500/30 shadow-black/30 rounded-md duration-300 cursor-pointer dark:bg-red-800">
//                             Login
//                         </a>
//                     )}
//                 </div>

//                 <div>
//                     {authUser && (
//                         <div className='md:ml-2 lg:ml-10 ml-2 w-[42px] h-[42px]'>
//                             <a href='/Profile'>
//                                 {authUser.photo && authUser.photo !== "null" ? (
//                                     <img src={authUser.photo} alt="Profile" className='w-[42px] h-[42px] rounded-full' />
//                                 ) : (
//                                     <h1 className='text-white text-2xl text-center leading-[42px] w-[42px] h-[42px] bg-red-500 cursor-pointer rounded-full'>
//                                         {authUser.firstName ? authUser.firstName.charAt(0).toUpperCase() : '0'}
//                                     </h1>
//                                 )}
//                             </a>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;











// import React, { useEffect, useRef, useState } from 'react';
// import { Menu, X, Sun, Moon, ChevronDown, User, LogIn, BookOpen, Code, FileText, Layers, Trophy } from 'lucide-react';

// const Navbar = () => {
//     const [authUser, setAuthUser] = useState(null); // Replace with your auth context
//     const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//     const [sticky, setSticky] = useState(false);
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const [openDropdown, setOpenDropdown] = useState(null);

//     // Theme handler
//     useEffect(() => {
//         const element = document.documentElement;
//         if (theme === "dark") {
//             element.classList.add("dark");
//             document.body.classList.add("dark");
//         } else {
//             element.classList.remove("dark");
//             document.body.classList.remove("dark");
//         }
//         localStorage.setItem("theme", theme);
//     }, [theme]);

//     // Sticky navbar on scroll
//     useEffect(() => {
//         const handleScroll = () => setSticky(window.scrollY > 0);
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     const toggleDropdown = (name) => {
//         setOpenDropdown(openDropdown === name ? null : name);
//     };

//     const navLinks = [
//         { name: 'HOME', href: '/' },
//         {
//             name: 'DSA SHEET',
//             icon: <Code className="w-4 h-4" />,
//             dropdown: [
//                 { name: 'NEW UPDATED SHEET', href: '/New-Updated-Sheet', icon: <BookOpen className="w-4 h-4" /> },
//                 { name: 'COMPANY WISE SHEET', href: '/Company-Wise-Sheet', icon: <Layers className="w-4 h-4" /> },
//                 { name: 'TOP 50 DSA PROBLEMS', href: '/Top-50', icon: <Trophy className="w-4 h-4" /> },
//             ]
//         },
//         {
//             name: 'NOTES',
//             icon: <FileText className="w-4 h-4" />,
//             dropdown: [
//                 { name: 'PROGRAMMING LANGUAGE', href: '/Languages', icon: <Code className="w-4 h-4" /> },
//                 { name: 'CS FUNDAMENTAL', href: '/CS-Fundamental', icon: <BookOpen className="w-4 h-4" /> },
//             ]
//         },
//         { name: 'BLOGS', href: '/Technical-Blog' },
//         {
//             name: 'MORE',
//             icon: <Layers className="w-4 h-4" />,
//             dropdown: [
//                 { name: 'CONTEST SOLUTION', href: '/Contest-Solution', icon: <Trophy className="w-4 h-4" /> },
//             ]
//         },
//     ];

//     return (
//         <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${sticky
//             ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg shadow-lg'
//             : 'bg-transparent dark:bg-transparent'
//             }`}>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-20">
//                     {/* Logo */}
//                     <div className="flex-shrink-0">
//                         <a href='/' className="flex items-center gap-3 group">
//                             <div className="relative">
//                                 <div className="absolute inset-0 transition-opacity"></div>
//                                 <div className="relative bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full font-bold text-2xl">
//                                     D
//                                 </div>
//                             </div>
//                             <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
//                                 DCODER
//                             </span>
//                         </a>
//                     </div>

//                     {/* Desktop Navigation */}
//                     <div className="hidden lg:flex items-center space-x-1">
//                         {navLinks.map((link, index) => (
//                             <div key={index} className="relative group">
//                                 {link.dropdown ? (
//                                     <div className="relative">
//                                         <button
//                                             onClick={() => toggleDropdown(link.name)}
//                                             className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 font-semibold text-sm transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//                                         >
//                                             {link.icon}
//                                             {link.name}
//                                             <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
//                                         </button>

//                                         {openDropdown === link.name && (
//                                             <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
//                                                 {link.dropdown.map((item, idx) => (
//                                                     <a
//                                                         key={idx}
//                                                         href={item.href}
//                                                         className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 hover:text-red-500 dark:hover:text-red-400 transition-all text-sm font-medium"
//                                                     >
//                                                         {item.icon}
//                                                         {item.name}
//                                                     </a>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </div>
//                                 ) : (
//                                     <a
//                                         href={link.href}
//                                         className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 font-semibold text-sm transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//                                     >
//                                         {link.name}
//                                     </a>
//                                 )}
//                             </div>
//                         ))}
//                     </div>

//                     {/* Right Section */}
//                     <div className="flex items-center gap-4">
//                         {/* Theme Toggle */}
//                         <button
//                             onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//                             className="p-2 rounded-lg  dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                         >
//                             {theme === "light" ? (
//                                 <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
//                             ) : (
//                                 <Sun className="w-5 h-5 text-gray-700 dark:text-gray-200" />
//                             )}
//                         </button>

//                         {/* Auth Section */}
//                         {authUser ? (
//                             <a href='/Profile' className="flex items-center gap-2">
//                                 {authUser.photo && authUser.photo !== "null" ? (
//                                     <img
//                                         src={authUser.photo}
//                                         alt="Profile"
//                                         className='w-10 h-10 rounded-full border-2 border-red-500 hover:border-pink-500 transition-colors cursor-pointer'
//                                     />
//                                 ) : (
//                                     <div className='w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:shadow-lg transition-shadow'>
//                                         {authUser.firstName ? authUser.firstName.charAt(0).toUpperCase() : 'U'}
//                                     </div>
//                                 )}
//                             </a>
//                         ) : (
//                             <a
//                                 href="/Login"
//                                 className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
//                             >
//                                 <LogIn className="w-4 h-4" />
//                                 Login
//                             </a>
//                         )}

//                         {/* Mobile Menu Button */}
//                         <button
//                             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                             className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                         >
//                             {mobileMenuOpen ? (
//                                 <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//                             ) : (
//                                 <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {mobileMenuOpen && (
//                 <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
//                     <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
//                         {navLinks.map((link, index) => (
//                             <div key={index}>
//                                 {link.dropdown ? (
//                                     <div>
//                                         <button
//                                             onClick={() => toggleDropdown(link.name)}
//                                             className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-semibold transition-colors"
//                                         >
//                                             <span className="flex items-center gap-2">
//                                                 {link.icon}
//                                                 {link.name}
//                                             </span>
//                                             <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
//                                         </button>

//                                         {openDropdown === link.name && (
//                                             <div className="ml-4 mt-2 space-y-1">
//                                                 {link.dropdown.map((item, idx) => (
//                                                     <a
//                                                         key={idx}
//                                                         href={item.href}
//                                                         className="flex items-center gap-3 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
//                                                     >
//                                                         {item.icon}
//                                                         {item.name}
//                                                     </a>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </div>
//                                 ) : (
//                                     <a
//                                         href={link.href}
//                                         className="flex items-center gap-2 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-semibold transition-colors"
//                                     >
//                                         {link.name}
//                                     </a>
//                                 )}
//                             </div>
//                         ))}

//                         {/* Mobile Login Button */}
//                         {!authUser && (
//                             <a
//                                 href="/Login"
//                                 className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 mt-4"
//                             >
//                                 <LogIn className="w-4 h-4" />
//                                 Login
//                             </a>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;








import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, LogIn, BookOpen, Code, FileText, Layers, Trophy } from 'lucide-react';
import { useAuth } from '../Context/AuthProvider';
import TechAICard from './Common/TechAICard';

const Navbar = () => {
    const [authUser] = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [sticky, setSticky] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    // Refs for click outside detection
    const dropdownRefs = useRef({});

    // Theme handler
    useEffect(() => {
        const element = document.documentElement;
        if (theme === "dark") {
            element.classList.add("dark");
            document.body.classList.add("dark");
        } else {
            element.classList.remove("dark");
            document.body.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Sticky navbar on scroll
    useEffect(() => {
        const handleScroll = () => setSticky(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedOutside = Object.values(dropdownRefs.current).every(
                ref => ref && !ref.contains(event.target)
            );
            if (clickedOutside) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
    }, []);

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const navLinks = [
        { name: 'HOME', href: '/' },
        {
            name: 'DSA SHEET',
            icon: <Code className="w-4 h-4" />,
            dropdown: [
                { name: 'NEW UPDATED SHEET', href: '/New-Updated-Sheet', icon: <BookOpen className="w-4 h-4" /> },
                { name: 'COMPANY WISE SHEET', href: '/Company-Wise-Sheet', icon: <Layers className="w-4 h-4" /> },
                { name: 'TOP 50 DSA PROBLEMS', href: '/Top-50', icon: <Trophy className="w-4 h-4" /> },
            ]
        },
        {
            name: 'NOTES',
            icon: <FileText className="w-4 h-4" />,
            dropdown: [
                { name: 'PROGRAMMING LANGUAGE', href: '/Languages', icon: <Code className="w-4 h-4" /> },
                { name: 'CS FUNDAMENTAL', href: '/CS-Fundamental', icon: <BookOpen className="w-4 h-4" /> },
            ]
        },
        { name: 'JOBS', href: '/Technical-Blog' },
        {
            name: 'MORE',
            icon: <Layers className="w-4 h-4" />,
            dropdown: [
                { name: 'CONTEST SOLUTION', href: '/Contest-Solution', icon: <Trophy className="w-4 h-4" /> },
            ]
        },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${sticky
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg shadow-lg'
            : 'bg-transparent dark:bg-transparent'
            }`}>
            <div className="max-w-screen-2xl mx-auto px-4 md:px-20">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href='/' className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <div className="relative bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full font-bold text-2xl">
                                    D
                                </div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent" style={{ fontFamily: '"Quicksand", sans-serif', fontWeight: '900' }}>
                                DCODER
                            </span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link, index) => (
                            <div
                                key={index}
                                className="relative group"
                                ref={el => dropdownRefs.current[link.name] = el}
                            >
                                {link.dropdown ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => toggleDropdown(link.name)}
                                            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 font-semibold text-sm transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            {link.icon}
                                            {link.name}
                                            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                        </button>

                                        {openDropdown === link.name && (
                                            <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fadeIn">
                                                {link.dropdown.map((item, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={item.href}
                                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 hover:text-red-500 dark:hover:text-red-400 transition-all text-sm font-medium"
                                                        onClick={() => setOpenDropdown(null)}
                                                    >
                                                        {item.icon}
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <a
                                        href={link.href}
                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 font-semibold text-sm transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        {link.name}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? (
                                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                            ) : (
                                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                            )}
                        </button>

                        {/* TechAI Card */}
                        <div className="hidden sm:block">
                            <TechAICard />
                        </div>

                        {/* Auth Section */}
                        {/* {authUser ? (
                            <a href='/Profile' className="flex items-center gap-2">
                                {authUser.photo && authUser.photo !== "null" ? (
                                    <img
                                        src={authUser.photo}
                                        alt="Profile"
                                        className='w-10 h-10 rounded-full border-2 border-red-500 hover:border-pink-500 transition-colors cursor-pointer object-cover'
                                    />
                                ) : (
                                    <div className='w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:shadow-lg hover:shadow-red-500/50 transition-shadow'>
                                        {authUser.firstName ? authUser.firstName.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                )}
                            </a>
                        ) : (
                            <a
                                href="/Login"
                                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
                            >
                                <LogIn className="w-4 h-4" />
                                Login
                            </a>
                        )} */}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 animate-slideDown">
                    <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
                        {navLinks.map((link, index) => (
                            <div key={index}>
                                {link.dropdown ? (
                                    <div>
                                        <button
                                            onClick={() => toggleDropdown(link.name)}
                                            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-semibold transition-colors"
                                        >
                                            <span className="flex items-center gap-2">
                                                {link.icon}
                                                {link.name}
                                            </span>
                                            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                        </button>

                                        {openDropdown === link.name && (
                                            <div className="ml-4 mt-2 space-y-1 animate-fadeIn">
                                                {link.dropdown.map((item, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={item.href}
                                                        className="flex items-center gap-3 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                                        onClick={() => {
                                                            setMobileMenuOpen(false);
                                                            setOpenDropdown(null);
                                                        }}
                                                    >
                                                        {item.icon}
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <a
                                        href={link.href}
                                        className="flex items-center gap-2 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-semibold transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                )}
                            </div>
                        ))}

                        {/* Mobile TechAI Card */}
                        <div className="sm:hidden px-4 py-2">
                            <TechAICard />
                        </div>

                        {/* Mobile Login Button */}
                        {/* {!authUser && (
                            <a
                                href="/Login"
                                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 mt-4"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <LogIn className="w-4 h-4" />
                                Login
                            </a>
                        )} */}
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        max-height: 0;
                    }
                    to {
                        opacity: 1;
                        max-height: 100vh;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
            `}</style>
        </nav>
    );
};

export default Navbar;