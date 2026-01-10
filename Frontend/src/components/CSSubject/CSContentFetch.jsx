// import React, { useState, useEffect, useRef } from "react";
// import axios from 'axios';
// import { baseUrl } from "../../Baseurl";
// import GetContent from "../Language/GetContent";
// import Skeleton1 from "../Common/Skeleton";
// import Breadcrumb from "../Common/Breadcrumb";
// import SocialMediaPoster from "../Common/SocialMediaPoster";

// const QUESTIONS_PER_PAGE = 10;

// const CScontentfetch = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [activeSection, setActiveSection] = useState("os");
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null); // Reference for the dropdown

//     useEffect(() => {
//         const getBlogs = async () => {
//             try {
//                 const res = await axios.get(`${baseUrl}/notecontent`);
//                 const filteredData = res.data.filter(item => item.category === activeSection);
//                 const sortedData = filteredData.sort((a, b) => a.id - b.id);
//                 setData(sortedData);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setLoading(false);
//             }
//         };
//         getBlogs();
//     }, [activeSection]);

//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: 'auto' });
//     }, [currentPage]);

//     const totalPages = Math.ceil(data.length / QUESTIONS_PER_PAGE);
//     const paginatedData = data.slice(
//         (currentPage - 1) * QUESTIONS_PER_PAGE,
//         currentPage * QUESTIONS_PER_PAGE
//     );

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const handleSectionChange = (section) => {
//         setActiveSection(section);
//         setCurrentPage(1);
//     };

//     const renderPageNumbers = () => {
//         const pageNumbers = [];

//         if (totalPages <= 5) {
//             for (let i = 1; i <= totalPages; i++) {
//                 pageNumbers.push(
//                     <button
//                         key={i}
//                         className={`px-4 py-2 mx-1 rounded ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
//                         onClick={() => handlePageChange(i)}
//                     >
//                         {i}
//                     </button>
//                 );
//             }
//         } else {
//             for (let i = 1; i <= 2; i++) {
//                 pageNumbers.push(
//                     <button
//                         key={i}
//                         className={`px-4 py-2 mx-1 rounded ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
//                         onClick={() => handlePageChange(i)}
//                     >
//                         {i}
//                     </button>
//                 );
//             }

//             if (currentPage > 3) {
//                 pageNumbers.push(<span key="ellipsis" className="px-4 py-2 mx-1">...</span>);
//             }

//             if (currentPage > 2 && currentPage < totalPages - 1) {
//                 pageNumbers.push(
//                     <button
//                         key={currentPage}
//                         className="px-4 py-2 mx-1 bg-blue-500 text-white rounded"
//                         onClick={() => handlePageChange(currentPage)}
//                     >
//                         {currentPage}
//                     </button>
//                 );
//             }

//             if (currentPage < totalPages - 2) {
//                 pageNumbers.push(<span key="ellipsis2" className="px-4 py-2 mx-1">...</span>);
//             }

//             for (let i = totalPages - 1; i <= totalPages; i++) {
//                 if (i > 2) {
//                     pageNumbers.push(
//                         <button
//                             key={i}
//                             className={`px-4 py-2 mx-1 rounded ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
//                             onClick={() => handlePageChange(i)}
//                         >
//                             {i}
//                         </button>
//                     );
//                 }
//             }
//         }

//         return pageNumbers;
//     };

//     // Close dropdown when clicking outside of it
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     return (
//         <>

//             <div className="dark:to-bg-slate-900 dark:from-slate-800 bg-gradient-to-l dark:bg-gradient-to-t to-[#F6F7FC] via-red-50 from-[#F6F7FC] pb-8 ">
//                 <Breadcrumb />
//                 <div className='flex flex-col sm:flex-row lg:flex-row justify-between dark:text-white text-gray-700 pt-2  pl-5 lg:pl-20 '>
//                     <div className='flex flex-col space-y-4'>
//                         <span className=" justify-between md:pl-10 text-[4.5vmax] md:text-[5.5vmin] font-bold text-gray-600 dark:text-white">Basic <span className="text-red-500">Interview</span>  Questions</span>
//                     </div>
//                     <div className='mt-4 sm:mt-0 lg:mt-4 sm:mr-20 lg:mr-[100px]'>
//                         <a href="path-to-your-file.pdf" download>
//                             <button className='bg-red-500 hover:bg-red-600 text-sm text-white border border-red-500 px-[2vmin] py-[1.5vmin] rounded-md'>Download PDF</button>
//                         </a>
//                     </div>
//                 </div></div>



//             <div className="flex justify-center items-center mb-0 w-full md:w-[500px] mt-5 mx-auto">
//                 <div className="relative w-full" ref={dropdownRef}>
//                     <button
//                         className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white dark:bg-slate-900 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700"
//                         onClick={() => setDropdownOpen(!dropdownOpen)}
//                     >
//                         {activeSection === "os" ? "Operating System" : "Computer Network"}
//                         <svg
//                             className="-mr-1 ml-2 h-5 w-5"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                             aria-hidden="true"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                 clipRule="evenodd"
//                             />
//                         </svg>
//                     </button>

//                     {/* Dropdown menu */}
//                     {dropdownOpen && (
//                         <div className="absolute right-0 z-10 mt-2 w-full rounded-md shadow-lg bg-white dark:bg-slate-800">
//                             <div className="py-1 border rounded-lg" role="menu" aria-orientation="vertical">
//                                 <button
//                                     className={`block w-full text-left px-4 py-3 border-b text-sm ${activeSection === "os" ? "text-red-500 bg-gray-100 dark:bg-slate-700" : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700"}`}
//                                     onClick={() => {
//                                         handleSectionChange("os");
//                                         setDropdownOpen(false);
//                                     }}
//                                 >
//                                     Operating System
//                                 </button>
//                                 <button
//                                     className={`block w-full text-left px-4 py-3 text-sm ${activeSection === "cn" ? "text-red-500 bg-gray-100 dark:bg-slate-700" : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700"}`}
//                                     onClick={() => {
//                                         handleSectionChange("cn");
//                                         setDropdownOpen(false);
//                                     }}
//                                 >
//                                     Computer Network
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <section className="max-w-screen-2xl container pb-5 md:pl-20 px-4  dark:bg-slate-900 dark:text-white lg:pb-[90px] text-center">
//                 <div className="mx-auto flex text-left flex-col lg:flex-row">
//                     <div className="w-full p-0 sm:p-6 md:pl-10  max-w-[900px]  md:shadow-black/30 rounded-xl  dark:bg-slate-900 dark:border-none">
//                         {loading ? (
//                             <Skeleton1 />
//                         ) : (
//                             paginatedData.map((item) => (
//                                 <GetContent key={item.id} item={item} />
//                             ))
//                         )}
//                     </div>

//                     <div>
//                         <SocialMediaPoster />
//                     </div>
//                 </div>

//                 {/* Pagination Controls */}
//                 <div className="mt-6 flex justify-center space-x-2">
//                     <button
//                         className="px-4 py-2 rounded bg-gray-200 text-black disabled:opacity-50"
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                     >
//                         Previous
//                     </button>
//                     {renderPageNumbers()}
//                     <button
//                         className="px-4 py-2 rounded bg-gray-200 text-black disabled:opacity-50"
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default CScontentfetch;



// // import React, { useState, useEffect, useRef } from "react";
// // import axios from 'axios';
// // import { baseUrl } from "../../Baseurl";
// // import GetContent from "../Language/GetContent";
// // import Skeleton1 from "../../components/Skeleton";

// // const QUESTIONS_PER_PAGE = 10;

// // const CScontentfetch = () => {
// //     const [data, setData] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [activeSection, setActiveSection] = useState("os");
// //     const [dropdownOpen, setDropdownOpen] = useState(false);
// //     const dropdownRef = useRef(null); // Reference for the dropdown
// //     const [activeTab, setActiveTab] = useState("Notes");

// //     useEffect(() => {
// //         const getBlogs = async () => {
// //             try {
// //                 const res = await axios.get(`${baseUrl}/notecontent`);
// //                 const filteredData = res.data.filter(item => item.category === activeSection);
// //                 const sortedData = filteredData.sort((a, b) => a.id - b.id);
// //                 setData(sortedData);
// //                 setLoading(false);
// //             } catch (error) {
// //                 console.error("Error fetching data:", error);
// //                 setLoading(false);
// //             }
// //         };
// //         getBlogs();
// //     }, [activeSection]);

// //     useEffect(() => {
// //         window.scrollTo({ top: 0, behavior: 'auto' });
// //     }, [currentPage]);

// //     const totalPages = Math.ceil(data.length / QUESTIONS_PER_PAGE);
// //     const paginatedData = data.slice(
// //         (currentPage - 1) * QUESTIONS_PER_PAGE,
// //         currentPage * QUESTIONS_PER_PAGE
// //     );

// //     const handlePageChange = (pageNumber) => {
// //         setCurrentPage(pageNumber);
// //     };

// //     const handleSectionChange = (section) => {
// //         setActiveSection(section);
// //         setCurrentPage(1);
// //     };

// //     const handleTabChange = (tab) => {
// //         setActiveTab(tab);
// //         setLoading(true);
// //         const fetchTabData = async () => {
// //             try {
// //                 const res = await axios.get(`${baseUrl}/notecontent`);
// //                 const filteredData = res.data.filter(item => item.tab === tab && item.category === activeSection);
// //                 const sortedData = filteredData.sort((a, b) => a.id - b.id);
// //                 setData(sortedData);
// //                 setLoading(false);
// //             } catch (error) {
// //                 console.error("Error fetching tab data:", error);
// //                 setLoading(false);
// //             }
// //         };
// //         fetchTabData();
// //     };

// //     const renderPageNumbers = () => {
// //         const pageNumbers = [];

// //         if (totalPages <= 5) {
// //             for (let i = 1; i <= totalPages; i++) {
// //                 pageNumbers.push(
// //                     <button
// //                         key={i}
// //                         className={`px-4 py-2 mx-1 rounded ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
// //                         onClick={() => handlePageChange(i)}
// //                     >
// //                         {i}
// //                     </button>
// //                 );
// //             }
// //         } else {
// //             for (let i = 1; i <= 2; i++) {
// //                 pageNumbers.push(
// //                     <button
// //                         key={i}
// //                         className={`px-4 py-2 mx-1 rounded ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
// //                         onClick={() => handlePageChange(i)}
// //                     >
// //                         {i}
// //                     </button>
// //                 );
// //             }

// //             if (currentPage > 3) {
// //                 pageNumbers.push(<span key="ellipsis" className="px-4 py-2 mx-1">...</span>);
// //             }

// //             if (currentPage > 2 && currentPage < totalPages - 1) {
// //                 pageNumbers.push(
// //                     <button
// //                         key={currentPage}
// //                         className="px-4 py-2 mx-1 bg-blue-500 text-white rounded"
// //                         onClick={() => handlePageChange(currentPage)}
// //                     >
// //                         {currentPage}
// //                     </button>
// //                 );
// //             }

// //             if (currentPage < totalPages - 2) {
// //                 pageNumbers.push(<span key="ellipsis2" className="px-4 py-2 mx-1">...</span>);
// //             }

// //             for (let i = totalPages - 1; i <= totalPages; i++) {
// //                 if (i > 2) {
// //                     pageNumbers.push(
// //                         <button
// //                             key={i}
// //                             className={`px-4 py-2 mx-1 rounded ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
// //                             onClick={() => handlePageChange(i)}
// //                         >
// //                             {i}
// //                         </button>
// //                     );
// //                 }
// //             }
// //         }

// //         return pageNumbers;
// //     };

// //     // Close dropdown when clicking outside of it
// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //                 setDropdownOpen(false);
// //             }
// //         };

// //         document.addEventListener("mousedown", handleClickOutside);
// //         return () => {
// //             document.removeEventListener("mousedown", handleClickOutside);
// //         };
// //     }, []);

// //     return (
// //         <>
// //             <div className='flex flex-col sm:flex-row justify-between text-2xl font-semibold dark:bg-slate-900 dark:text-white text-gray-700 mb-5 pt-5 pb-5 px-5 lg:px-20'>
// //                 <div className='flex flex-col space-y-2'>
// //                     <span>Basic Interview Questions.</span>
// //                     <span className='text-sm'>Last Updated: August 8, 2024</span>
// //                 </div>

// //                 <div className="flex justify-center items-center mb-4 w-full md:w-[500px] md:mt-0 mt-5">
// //                     <div className="relative w-full" ref={dropdownRef}>
// //                         <button
// //                             className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white dark:bg-slate-900 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700"
// //                             onClick={() => setDropdownOpen(!dropdownOpen)}
// //                         >
// //                             {activeSection === "os" ? "Operating System" : "Computer Network"}
// //                             <svg
// //                                 className="-mr-1 ml-2 h-5 w-5"
// //                                 xmlns="http://www.w3.org/2000/svg"
// //                                 viewBox="0 0 20 20"
// //                                 fill="currentColor"
// //                                 aria-hidden="true"
// //                             >
// //                                 <path
// //                                     fillRule="evenodd"
// //                                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
// //                                     clipRule="evenodd"
// //                                 />
// //                             </svg>
// //                         </button>

// //                         {/* Dropdown menu */}
// //                         {dropdownOpen && (
// //                             <div className="absolute right-0 z-10 mt-2 w-full rounded-md shadow-lg bg-white dark:bg-slate-800">
// //                                 <div className="py-1 border rounded-lg" role="menu" aria-orientation="vertical">
// //                                     <button
// //                                         className={`block w-full text-left px-4 py-3 border-b text-sm ${activeSection === "os" ? "text-red-500 bg-gray-100 dark:bg-slate-700" : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700"}`}
// //                                         onClick={() => {
// //                                             handleSectionChange("os");
// //                                             setDropdownOpen(false);
// //                                         }}
// //                                     >
// //                                         Operating System
// //                                     </button>
// //                                     <button
// //                                         className={`block w-full text-left px-4 py-3 text-sm ${activeSection === "cn" ? "text-red-500 bg-gray-100 dark:bg-slate-700" : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700"}`}
// //                                         onClick={() => {
// //                                             handleSectionChange("cn");
// //                                             setDropdownOpen(false);
// //                                         }}
// //                                     >
// //                                         Computer Network
// //                                     </button>
// //                                 </div>
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* Tabs */}
// //             <div className="flex justify-center space-x-4 mb-6">
// //                 {["Notes", "Interview Questions", "Practice"].map((tab) => (
// //                     <button
// //                         key={tab}
// //                         className={`px-4 py-2 rounded ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
// //                         onClick={() => handleTabChange(tab)}
// //                     >
// //                         {tab}
// //                     </button>
// //                 ))}
// //             </div>

// //             {/* Loading Skeleton */}
// //             {loading ? (
// //                 <Skeleton1 />
// //             ) : (
// //                 <div>
// //                     {/* Content Display */}
// //                     {paginatedData.map((item) => (
// //                         <GetContent key={item.id} {...item} />
// //                     ))}

// //                     {/* Pagination */}
// //                     <div className="flex justify-center mt-4">
// //                         {renderPageNumbers()}
// //                     </div>
// //                 </div>
// //             )}
// //         </>
// //     );
// // };

// // export default CScontentfetch;

import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { baseUrl } from "../../Baseurl";
import GetContent from "../Language/GetContent";
import Skeleton1 from "../Common/Skeleton";
import Breadcrumb from "../Common/Breadcrumb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
    ChevronLeft,
    ChevronRight,
    Download,
    Code,
    Sparkles,
    FileText,
    Trophy,
    Target,
    Zap,
    BookMarked,
    Users,
    Star,
    Share2,
    Bookmark,
    CheckCircle2,
    MessageCircle,
    ChevronDown,
    Monitor,
    Network
} from 'lucide-react';

const QUESTIONS_PER_PAGE = 10;

const SocialMediaPoster = () => {
    return (
        <div className="space-y-6 sticky top-8">
            {/* Social Cards */}
            <div className="bg-white dark:bg-gradient-to-br dark:from-gray-950 dark:to-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Share2 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Connect With Us</h3>
                </div>

                <div className="space-y-4">
                    {/* Telegram Card */}
                    <a
                        href="https://t.me/dcoder21575"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-5 border-2 border-blue-200 dark:border-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 hover:-translate-y-1"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                                <FontAwesomeIcon
                                    icon={faTelegram}
                                    className="text-3xl text-white"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">Join Telegram</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Get instant updates & solutions</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">10K+ Members</span>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </a>

                    {/* Instagram Card */}
                    <a
                        href="https://www.instagram.com/dcoder75/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block relative overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-5 border-2 border-pink-200 dark:border-pink-700 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50 hover:scale-105 hover:-translate-y-1"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="text-3xl text-white"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">Follow Instagram</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Daily coding tips & inspiration</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Star className="w-4 h-4 text-pink-600 dark:text-pink-400 fill-current" />
                                    <span className="text-xs font-semibold text-pink-600 dark:text-pink-400">25K+ Followers</span>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-pink-600 dark:text-pink-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </a>
                </div>
            </div >

            {/* Quick Actions Card */}
            < div className="bg-white dark:bg-gradient-to-br dark:from-gray-950 dark:to-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 backdrop-blur-xl" >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Quick Actions</h3>
                </div>

                <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all group">
                        <Bookmark className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bookmark Page</span>
                    </button>

                    <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all group">
                        <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Share Content</span>
                    </button>

                    <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-700 hover:shadow-lg transition-all group">
                        <MessageCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Ask Doubt</span>
                    </button>

                    <div className='flex-shrink-0'>
                        <a href="path-to-your-file.pdf" download>
                            <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg border border-red-200 dark:border-red-700 hover:shadow-lg transition-all group">
                                <Download className="w-5 h-5 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Download PDF</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div >

            {/* Study Tips Card */}
            < div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white" >
                <div className="flex items-center gap-3 mb-4">
                    <BookMarked className="w-6 h-6" />
                    <h3 className="text-lg font-bold">Pro Tip</h3>
                </div>
                <p className="text-sm leading-relaxed mb-4 text-purple-50">
                    Practice each question twice - once for understanding and once from memory!
                </p>
                <div className="flex items-center gap-2 text-xs text-purple-100">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Proven learning method</span>
                </div>
            </div >
        </div >
    );
};

const CScontentfetch = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeSection, setActiveSection] = useState("os");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/notecontent`);
                const filteredData = res.data.filter(item => item.category === activeSection);
                const sortedData = filteredData.sort((a, b) => a.id - b.id);
                setData(sortedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        getBlogs();
    }, [activeSection]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    useEffect(() => {
        const calculateProgress = () => {
            const totalQuestions = data.length;
            const questionsCompleted = (currentPage - 1) * QUESTIONS_PER_PAGE + Math.min(QUESTIONS_PER_PAGE, data.length - (currentPage - 1) * QUESTIONS_PER_PAGE);
            const progressPercentage = (questionsCompleted / totalQuestions) * 100;
            setProgress(progressPercentage);
        };
        calculateProgress();
    }, [currentPage, data.length]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const totalPages = Math.ceil(data.length / QUESTIONS_PER_PAGE);

    const paginatedData = data.slice(
        (currentPage - 1) * QUESTIONS_PER_PAGE,
        currentPage * QUESTIONS_PER_PAGE
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setCurrentPage(1);
        setDropdownOpen(false);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={`px-4 py-2 mx-1 rounded-lg font-semibold transition-all duration-300 ${currentPage === i
                            ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-110"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            for (let i = 1; i <= 2; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={`px-4 py-2 mx-1 rounded-lg font-semibold transition-all duration-300 ${currentPage === i
                            ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-110"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            }

            if (currentPage > 3) {
                pageNumbers.push(
                    <span key="ellipsis" className="px-4 py-2 mx-1 text-gray-500 dark:text-gray-400">
                        ...
                    </span>
                );
            }

            if (currentPage > 2 && currentPage < totalPages - 1) {
                pageNumbers.push(
                    <button
                        key={currentPage}
                        className="px-4 py-2 mx-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg shadow-lg font-semibold scale-110"
                        onClick={() => handlePageChange(currentPage)}
                    >
                        {currentPage}
                    </button>
                );
            }

            if (currentPage < totalPages - 2) {
                pageNumbers.push(
                    <span key="ellipsis2" className="px-4 py-2 mx-1 text-gray-500 dark:text-gray-400">
                        ...
                    </span>
                );
            }

            for (let i = totalPages - 1; i <= totalPages; i++) {
                if (i > 2) {
                    pageNumbers.push(
                        <button
                            key={i}
                            className={`px-4 py-2 mx-1 rounded-lg font-semibold transition-all duration-300 ${currentPage === i
                                ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-110"
                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }`}
                            onClick={() => handlePageChange(i)}
                        >
                            {i}
                        </button>
                    );
                }
            }
        }

        return pageNumbers;
    };

    const getSectionDisplayName = () => {
        return activeSection === "os" ? "Operating System" : "Computer Network";
    };

    const getSectionIcon = () => {
        return activeSection === "os" ? <Monitor className="w-5 h-5" /> : <Network className="w-5 h-5" />;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-950">
            {/* Header Section */}
            <div className="bg-transparent">
                <div className="container mx-auto px-4 ">
                    <Breadcrumb />

                    {/* Badge */}
                    <div className="flex justify-center mb-6 mt-4">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 px-6 py-3 rounded-full border-2 border-blue-200 dark:border-blue-700 shadow-lg">
                            <Code className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
                            <span className="text-blue-700 dark:text-blue-300 font-semibold">Computer Science Fundamentals</span>
                            <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row justify-center items-center gap-6 px-4 lg:px-20'>
                        <div className='flex flex-col space-y-2'>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white">
                                Basic{' '}
                                <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                                    Interview
                                </span>{' '}
                                Questions
                            </h1>
                            <p className="text-gray-600 text-center dark:text-gray-300 text-lg">
                                Master the fundamentals with comprehensive explanations
                            </p>
                        </div>
                    </div>

                    {/* Section Selector Dropdown */}
                    <div className="mt-8 px-4 lg:px-20 justify-center flex">
                        <div className="max-w-md mx-auto lg:mx-0">
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="w-full flex items-center justify-between gap-3 px-6 py-3 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border-2 border-indigo-200 dark:border-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                                            {getSectionIcon()}
                                        </div>
                                        <span className="text-lg font-semibold text-gray-800 dark:text-white">
                                            {getSectionDisplayName()}
                                        </span>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <button
                                            onClick={() => handleSectionChange("os")}
                                            className={`w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 ${activeSection === "os"
                                                ? "bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-600 dark:text-indigo-400"
                                                : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeSection === "os"
                                                ? "bg-gradient-to-br from-indigo-500 to-blue-600 text-white"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                                }`}>
                                                <Monitor className="w-5 h-5" />
                                            </div>
                                            <span className="font-semibold">Operating System</span>
                                        </button>
                                        <div className="border-t border-gray-200 dark:border-gray-700"></div>
                                        <button
                                            onClick={() => handleSectionChange("cn")}
                                            className={`w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 ${activeSection === "cn"
                                                ? "bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-600 dark:text-indigo-400"
                                                : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeSection === "cn"
                                                ? "bg-gradient-to-br from-indigo-500 to-blue-600 text-white"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                                }`}>
                                                <Network className="w-5 h-5" />
                                            </div>
                                            <span className="font-semibold">Computer Network</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-8 px-4 lg:px-20">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                            <div
                                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 shadow-lg"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>Progress: {Math.round(progress)}%</span>
                            <span>Page {currentPage} of {totalPages}</span>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 px-4 lg:px-20">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
                            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                {data.length}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Total Questions</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800 text-center">
                            <Target className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                {Math.min(currentPage * QUESTIONS_PER_PAGE, data.length)}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Questions Read</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
                            <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {totalPages}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Total Pages</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800 text-center">
                            <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                {QUESTIONS_PER_PAGE}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Per Page</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <section className="container mx-auto px-4 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Content Area */}
                    <div className="flex-1 max-w-5xl">
                        {loading ? (
                            <div className="bg-white dark:bg-gradient-to-br dark:from-gray-950 dark:to-slate-900 rounded-2xl p-8 shadow-lg">
                                <Skeleton1 />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {paginatedData.map((item) => (
                                    <GetContent key={item.id} item={item} />
                                ))}
                            </div>
                        )}

                        {/* Enhanced Pagination Controls */}
                        <div className="mt-12 bg-white dark:bg-gradient-to-br dark:from-gray-950 dark:to-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex flex-wrap justify-center items-center gap-2">
                                <button
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-600"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Previous
                                </button>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {renderPageNumbers()}
                                </div>

                                <button
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-600"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Sidebar */}
                    <div className="lg:w-96 flex-shrink-0">
                        <SocialMediaPoster />
                    </div>
                </div>
            </section>

            {/* Decorative Floating Blobs */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
            <div className="fixed top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
            <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default CScontentfetch;