import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../Context/AuthProvider';
import TechAICard from './TechAICard';

const Navbar = () => {
    const [authUser] = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [sticky, setSticky] = useState(false);

    // Refs for dropdowns
    const dsaRef = useRef(null);
    const notesRef = useRef(null);
    const moreRef = useRef(null);

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
            [dsaRef, notesRef, moreRef].forEach(ref => {
                if (ref.current && !ref.current.contains(event.target)) {
                    ref.current.removeAttribute('open');
                }
            });
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navItems = (
        <>
            <li><a href='/'>HOME</a></li>
            <li>
                <details ref={dsaRef}>
                    <summary>DSA SHEET</summary>
                    <ul className="bg-white w-[200px] rounded-t-none rounded-md py-5 dark:bg-slate-900 dark:text-white">
                        <li><a href='/New-Updated-Sheet'>NEW UPDATED SHEET</a></li>
                        <li><a href='/Company-Wise-Sheet'>COMPANY WISE SHEET</a></li>
                        <li><a href='/Top-50'>TOP 50 DSA PROBLEMS</a></li>
                    </ul>
                </details>
            </li>
            <li>
                <details ref={notesRef}>
                    <summary>NOTES</summary>
                    <ul className="bg-white w-[200px] rounded-t-none rounded-md py-5 dark:bg-slate-900 dark:text-white">
                        <li><a href='/Languages'>PROGRAMING LANGUAGE</a></li>
                        <li><a href='/CS-Fundamental'>CS FUNDAMENTAL</a></li>
                    </ul>
                </details>
            </li>
            <li><a href='/Technical-Blog'>BLOGS</a></li>
            <li>
                <details ref={moreRef}>
                    <summary>MORE</summary>
                    <ul className="bg-white w-48 rounded-t-none rounded-md p-2 dark:bg-slate-900 dark:text-white">
                        <li><a href='/Contest-Solution'>CONTEST SOLUTION</a></li>
                    </ul>
                </details>
            </li>
        </>
    );

    return (
        <div className={`max-w-screen-2xl container font-[600] mx-auto md:px-20 px-4 dark:bg-none dark:text-white z-50 fixed top-0 left-0 ${sticky ? "sticky-navbar shadow-md bg-[rgb(255,255,255)] dark:bg-slate-900 dark:text-white duration-300 transition-all ease-in-out" : ""}`}>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost p-0 lg:hidden mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56 dark:bg-slate-900 dark:text-white">
                            {navItems}
                        </ul>
                    </div>
                    <a href='/' className="text-xl text-red-500 cursor-pointer" style={{ fontFamily: '"Quicksand", sans-serif', fontWeight: '900' }}>DCODER</a>
                </div>
                <div className="navbar-center hidden lg:flex space-x-4">
                    <ul className="menu menu-horizontal text-md">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end space-x-4">
                    <label className="swap swap-rotate">
                        <input type="checkbox" className="theme-controller" checked={theme === "dark"} onChange={() => setTheme(theme === "light" ? "dark" : "light")} />
                        <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                        <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                    </label>

                    <TechAICard />

                    {!authUser && (
                        <a href="/Login" className="bg-red-600 text-white px-3.5 py-1.5 shadow-lg hover:shadow-red-500/30 shadow-black/30 rounded-md duration-300 cursor-pointer dark:bg-red-800">
                            Login
                        </a>
                    )}
                </div>

                <div>
                    {authUser && (
                        <div className='md:ml-2 lg:ml-10 ml-2 w-[42px] h-[42px]'>
                            <a href='/Profile'>
                                {authUser.photo && authUser.photo !== "null" ? (
                                    <img src={authUser.photo} alt="Profile" className='w-[42px] h-[42px] rounded-full' />
                                ) : (
                                    <h1 className='text-white text-2xl text-center leading-[42px] w-[42px] h-[42px] bg-red-500 cursor-pointer rounded-full'>
                                        {authUser.firstName ? authUser.firstName.charAt(0).toUpperCase() : '0'}
                                    </h1>
                                )}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
