// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import { baseUrl } from "../../Baseurl";
// import notesvg from '/note.svg';
// import NoteModal from '../Sriversdecomponents/Keepnote';
// import Sheetheading from "../Sriversdecomponents/Sheetheading";
// import Skeleton1 from "../Common/Skeleton";
// import Navbar from "../Navbar";
// import Breadcrumb from "../Common/Breadcrumb";
// import Footer from "../Footer";

// const CompanyMain = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [activeSection, setActiveSection] = useState("Accenture");
//     const [checkboxes, setCheckboxes] = useState({});
//     const [starredProblems, setStarredProblems] = useState({});
//     const [notesArray, setNotesArray] = useState({});
//     const [selectedLevel, setSelectedLevel] = useState(null);
//     const [filteredSheetProblems, setFilteredSheetProblems] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentNoteKey, setCurrentNoteKey] = useState('');
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [currentCompanies, setCurrentCompanies] = useState([]);

//     // Load states from localStorage when the component mounts
//     useEffect(() => {
//         const savedCheckboxes = JSON.parse(localStorage.getItem('checkboxes')) || {};
//         const savedStarredProblems = JSON.parse(localStorage.getItem('starredProblems')) || {};
//         setCheckboxes(savedCheckboxes);
//         setStarredProblems(savedStarredProblems);
//     }, []);

//     // Save checkboxes state to localStorage when it's updated
//     useEffect(() => {
//         localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
//     }, [checkboxes]);

//     // Save starred problems state to localStorage when it's updated
//     useEffect(() => {
//         localStorage.setItem('starredProblems', JSON.stringify(starredProblems));
//     }, [starredProblems]);

//     useEffect(() => {
//         const getBlogs = async () => {
//             try {
//                 const res = await axios.get(`${baseUrl}/sdeproblem`);
//                 const filteredData = res.data.filter(item =>
//                     item.companies.split(',').map(company => company.trim()).includes(activeSection)
//                 );
//                 const sortedData = filteredData.sort((a, b) => a.id - b.id);
//                 setData(sortedData);
//                 setFilteredSheetProblems(sortedData);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setLoading(false);
//             }
//         };
//         getBlogs();
//     }, [activeSection]);

//     const handleSectionChange = (section) => {
//         setActiveSection(section);
//         setSelectedLevel(null);
//     };

//     const handleCheckboxChange = (id) => {
//         setCheckboxes(prev => ({
//             ...prev,
//             [id]: !prev[id],
//         }));
//     };

//     const handleStarClick = (id) => {
//         setStarredProblems(prev => ({
//             ...prev,
//             [id]: !prev[id],
//         }));
//     };

//     const getLevelClass = (level) => {
//         switch (level) {
//             case "Easy":
//                 return "bg-green-500";
//             case "Medium":
//                 return "bg-yellow-500";
//             case "Hard":
//                 return "bg-red-500";
//             default:
//                 return "bg-gray-500";
//         }
//     };

//     const handleNoteClick = (key) => {
//         setCurrentNoteKey(key);
//         setIsModalOpen(true);
//     };

//     const handleShowClick = (companies) => {
//         setCurrentCompanies(companies.split(',').map(company => company.trim()));
//         setIsDialogOpen(true);
//     };

//     const handleCloseDialog = () => {
//         setIsDialogOpen(false);
//     };

//     const handleLevelClick = (level) => {
//         setSelectedLevel(level);
//         if (level === 'Random') {
//             const randomProblem = data[Math.floor(Math.random() * data.length)];
//             setFilteredSheetProblems(randomProblem ? [randomProblem] : []);
//         } else if (level) {
//             const filtered = data.filter(problem => problem.Level === level);
//             setFilteredSheetProblems(filtered);
//         } else {
//             setFilteredSheetProblems(data);
//         }
//     };

//     const openNoteModal = (noteKey) => {
//         setCurrentNoteKey(noteKey);
//         setIsModalOpen(true);
//     };

//     const companyButtons = [
//         "Google", "Microsoft", "Amazon", "Uber", "Tiger Analytics", "persistent systems",
//         "Facebook", "IMC", "Wealthfront", "Arista Networks", "MindTree", "FPT",
//         "zeta suite", "payu", "Bloomberg", "Cognizant", "Zoho", "Goldman Sachs",
//         "Wayfair", "Canonical", "Karat", "instacart", "Accenture", "Grab",
//         "Jane Street", "Quora", "Zopsmart", "Twitter", "Postmates", "Salesforce",
//         "Commvault", "Info Edge", "tiktok", "razorpay", "Pinterest", "Sprinklr",
//         "PhonePe", "Apple", "Deutsche Bank", "Walmart Global Tech", "Booking.com",
//         "Jeavio", "T System", "Cisco", "Expedia", "Optum", "ByteDance", "Citrix",
//         "TIAA", "Bolt", "Adobe", "MakeMyTrip", "Moengage", "Rakuten", "Netflix",
//         "eBay", "Capital One", "Honeywell", "Dropbox", "JPMorgan", "Docusign",
//         "tcs", "Softwire", "DoorDash", "HRT", "Virtu Financial", "Tesla", "Snapchat",
//         "AppDynamics", "Duolingo", "AllinCall", "edabit", "Robinhood", "LinkedIn",
//         "Flipkart", "Cashfree", "Toptal", "Dunzo", "APT Portfolio", "Pure Storage",
//         "Spotify", "Sumologic", "Oracle", "Twilio", "C3 IoT", "Morgan Stanley",
//         "JP Morgan", "peak6", "Indeed", "Mercari", "Arcesium", "IBM", "DJI",
//         "Rupeek", "Directi", "Yandex", "Netsuite", "Nuro", "Roblox", "DRW",
//         "American Express", "Yahoo", "Samsung", "VMware", "United Health Group",
//         "Yelp", "Sony", "OT", "Visa", "Qualtrics", "Akuna Capital", "Atlassian",
//         "Coursera", "Square", "DE Shaw", "Infosys", "Cruise Automation", "SAP",
//         "Two Sigma", "Airbnb", "Palantir Technologies", "Paypal", "ZScaler", "Rubrik",
//         "Intuit", "PayTM", "Nvidia", "Citadel", "ServiceNow", "Druva", "Nutanix",
//         "Lyft", "Asana", "Thumbtack", "Akamai", "MindTickle", "Qualcomm", "IIT Bombay",
//         "Hotstar", "HBO", "Zoom", "Swiggy", "Drawbridge", "Epic Systems", "TripleByte",
//         "Activision", "Athenahealth", "Mathworks", "Alibaba", "Valve", "IXL", "Opendoor",
//         "Works Applications", "Tencent", "Gilt Groupe", "Pocket Gems", "LiveRamp",
//         "Baidu", "Riot Games", "Leap Motion", "MAQ Software", "Affirm", "Redfin", "Hulu",
//         "Wish", "Twitch", "GoDaddy", "BlackRock", "Databricks", "Intel", "Shopee",
//         "Cohesity", "Alation", "Zenefits", "FactSet", "Box", "TuSimple", "Reddit",
//         "Zillow", "National Instruments", "Sapient", "Splunk", "Barclays", "Dataminr",
//         "Huawei", "Dell", "Zomato"
//     ];

//     return (
//         <>
//             <Navbar />

//             <div className="dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-900 bg-gradient-to-b to-red-50 from-[#fff] mb-10">
//                 <Breadcrumb />
//                 <div className='text-center justify-center mx-auto font-semibold dark:text-white text-gray-700 pb-5 '>
//                     <div>
//                         <span className=" justify-center text-[4.5vmax] md:text-[5.5vmin] font-bold text-gray-600 dark:text-white">Sde Sheet Based On <span className="text-red-500">Company </span></span>
//                     </div>
//                 </div>


//                 <div className="w-full mx-auto md:px-[120px] pb-1">
//                     {/* Scrollable Horizontal Navbar */}
//                     <div className="flex overflow-x-auto whitespace-nowrap mb-4  dark:text-white  py-3 px-1 rounded-sm ">
//                         {companyButtons
//                             .slice()
//                             .sort((a, b) => a.localeCompare(b)).map((company) => (
//                                 <button
//                                     key={company}
//                                     className={`text-md mx-0.5 px-3 py-1 ${activeSection === company ? "text-white border dark:text-white rounded-sm bg-red-500 border-red-500" : "text-gray-900  dark:text-white  dark:border-white rounded-sm border border-gray-900"}`}
//                                     onClick={() => handleSectionChange(company)}
//                                 >
//                                     {company}
//                                 </button>
//                             ))}
//                     </div>
//                 </div>
//             </div>



//             <section className="relative max-w-screen-2xl flex container md:px-[130px]  px-2 overflow-visible dark:bg-slate-900 dark:text-white lg:pb-[90px] lg:pt-[10px] text-center">

//                 {/* Data Table */}
//                 <div className="w-full text-left border-2 border-gray-400 dark:border-none dark:bg-slate-800 border-gray-200 rounded-lg">

//                     {/* Level Buttons */}
//                     <div className="flex px-2 justify-center space-x-1 py-3 bg-gray-50 dark:bg-slate-800 rounded-t-md">
//                         <button
//                             className="bg-gray-500 shadow-lg hover:shadow-gray-500/30 shadow-black/30 text-white dark:bg-slate-800 dark:text-white px-2 py-1 border-2 rounded-lg border-gray-500"
//                             onClick={() => handleLevelClick('Random')}
//                         >
//                             Random
//                         </button>
//                         <button
//                             className="bg-green-500 shadow-lg hover:shadow-green-500/30 shadow-black/30 text-white dark:bg-slate-800 dark:text-white px-2 py-1 border-2 rounded-lg border-green-500"
//                             onClick={() => handleLevelClick('Easy')}
//                         >
//                             Easy
//                         </button>
//                         <button
//                             className="bg-yellow-500 shadow-lg hover:shadow-yellow-500/30 shadow-black/30 text-white dark:bg-slate-800 dark:text-white px-2 py-1 border-2 rounded-lg border-yellow-500"
//                             onClick={() => handleLevelClick('Medium')}
//                         >
//                             Medium
//                         </button>
//                         <button
//                             className="bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30 text-white dark:bg-slate-800 dark:text-white px-2 py-1 border-2 rounded-lg border-red-500"
//                             onClick={() => handleLevelClick('Hard')}
//                         >
//                             Hard
//                         </button>
//                     </div>

//                     <div className="w-full p-0 sm:p-0 md:p-4 lg:p-4 max-w-full mx-auto bg-gray-50 dark:bg-slate-800 dark:border-none">
//                         {loading ? (
//                             <Skeleton1 />
//                         ) : (
//                             <div className="lg:mx-4 mx-2 bg-gray-50 dark:bg-slate-900 dark:text-white dark:border border-2 border-gray-400 rounded-lg overflow-auto">
//                                 <table className="table bg-white dark:bg-slate-900 dark:text-white dark:border">
//                                     <thead className="font-semibold text-gray-600 shadow dark:bg-slate-900 dark:text-white">
//                                         <Sheetheading />
//                                     </thead>
//                                     <tbody>
//                                         {filteredSheetProblems.map((item, index) => (
//                                             <tr
//                                                 key={index}
//                                                 className={`dark:bg-slate-900 dark:text-white border-t-2 border-gray-400 ${checkboxes[item.id] ? 'bg-gray-300' : ''
//                                                     }`}
//                                             >
//                                                 <td className="text-center">
//                                                     <label>
//                                                         <input
//                                                             type="checkbox"
//                                                             className="checkbox dark:bg-slate-700 dark:text-white"
//                                                             checked={checkboxes[item.id] || false}
//                                                             onChange={() => handleCheckboxChange(item.id)}
//                                                         />
//                                                     </label>
//                                                 </td>
//                                                 <td className="border-r-2 border-gray-400 border-l-2">
//                                                     <span>{item.name}</span>
//                                                 </td>
//                                                 <td className="border-r-2 border-gray-400 text-left">
//                                                     <span
//                                                         className={`${getLevelClass(item.Level)} text-white px-2 py-1 w-16 rounded-lg`}
//                                                     >
//                                                         {item.Level}
//                                                     </span>
//                                                 </td>
//                                                 <td className="border-r-2 border-gray-400 text-center">Soon</td>
//                                                 <td className="border-r-2 border-gray-400 border-l-2">
//                                                     {item.companies ? (
//                                                         <button
//                                                             className="bg-blue-500 text-white rounded px-2 py-1 ml-2"
//                                                             onClick={() => handleShowClick(item.companies)}
//                                                         >
//                                                             Show
//                                                         </button>
//                                                     ) : (
//                                                         <span></span>
//                                                     )}
//                                                 </td>
//                                                 <td className="text-center">
//                                                     <a href={item.link} className="text-red-500 hover:underline">
//                                                         <img
//                                                             src={'leetcode.svg'}
//                                                             alt="LeetCode"
//                                                             className="mx-auto w-[23px]"
//                                                         />
//                                                     </a>
//                                                 </td>
//                                                 <td className="border-l-2 border-gray-400 text-center">
//                                                     <img
//                                                         src={
//                                                             starredProblems[item.id]
//                                                                 ? '/fill-star.svg'
//                                                                 : '/empty-start.svg'
//                                                         }
//                                                         alt="Revision"
//                                                         className="cursor-pointer w-[26px] mx-auto"
//                                                         onClick={() => handleStarClick(item.id)}
//                                                     />
//                                                 </td>
//                                                 <td className="border-l-2 border-gray-400">
//                                                     <img
//                                                         src={notesvg}
//                                                         alt="Note"
//                                                         className="cursor-pointer w-[26px] mx-auto"
//                                                         onClick={() => openNoteModal(item.name)}
//                                                     />
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//             </section>


//             {/* Dialog for showing companies */}
//             {isDialogOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
//                     onClick={handleCloseDialog}
//                 >
//                     <div
//                         className="bg-white rounded-lg p-6  w-[300px] sl:w-[350px] md:w-[450px] h-[350px] overflow-auto"
//                         onClick={(e) => e.stopPropagation()} >
//                         <div className='flex justify-between mb-5'>
//                             <p className='text-blue-600 text-xl ml-2'>Companies</p>
//                             <button
//                                 className="bg-red-500 text-white rounded-full px-2.5 py-1 mt-[-14]"
//                                 onClick={handleCloseDialog}
//                             >
//                                 X
//                             </button>
//                         </div>

//                         <div>
//                             {currentCompanies.map((company, index) => (
//                                 <div key={index} className="border border-gray-300 text-gray-500 text-sm rounded-lg text-sm p-1 px-2 m-1 inline-block">
//                                     {company.trim()}
//                                 </div>
//                             ))}
//                         </div>

//                     </div>
//                 </div>
//             )}


//             {isModalOpen && (
//                 <NoteModal
//                     isOpen={isModalOpen}
//                     onRequestClose={() => setIsModalOpen(false)}
//                     noteKey={currentNoteKey}
//                 />
//             )}
//             <Footer />
//         </>
//     );
// };

// export default CompanyMain;


// import React, { useState, useEffect } from "react";
// import { Building2, Code, Filter, Shuffle, Zap, TrendingUp, BookOpen, Search, X, Star, Edit, ExternalLink } from 'lucide-react';
// import Sheetheading from "../Sriversdecomponents/Sheetheading";
// import Sheetproblems from "../Sriversdecomponents/Sheetproblems";
// import NoteModal from '../Sriversdecomponents/Keepnote';
// import Navbar from "../Navbar";
// import Breadcrumb from "../Common/Breadcrumb";
// import Footer from "../Footer";

// const BASE_URL = "http://localhost:4001";

// const CompanyMain = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [activeSection, setActiveSection] = useState("Accenture");
//     const [checkboxes, setCheckboxes] = useState({});
//     const [starredProblems, setStarredProblems] = useState({});
//     const [selectedLevel, setSelectedLevel] = useState(null);
//     const [filteredSheetProblems, setFilteredSheetProblems] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentNoteKey, setCurrentNoteKey] = useState('');
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [currentCompanies, setCurrentCompanies] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         const savedCheckboxes = JSON.parse(localStorage.getItem('checkboxes')) || {};
//         const savedStarredProblems = JSON.parse(localStorage.getItem('starredProblems')) || {};
//         setCheckboxes(savedCheckboxes);
//         setStarredProblems(savedStarredProblems);
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
//     }, [checkboxes]);

//     useEffect(() => {
//         localStorage.setItem('starredProblems', JSON.stringify(starredProblems));
//     }, [starredProblems]);

//     useEffect(() => {
//         const getProblems = async () => {
//             try {
//                 const res = await fetch(`${BASE_URL}/sdeproblem`);
//                 const allData = await res.json();
//                 const filteredData = allData.filter(item =>
//                     item.companies.split(',').map(company => company.trim()).includes(activeSection)
//                 );
//                 const sortedData = filteredData.sort((a, b) => a.id - b.id);
//                 setData(sortedData);
//                 setFilteredSheetProblems(sortedData);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setLoading(false);
//             }
//         };
//         getProblems();
//     }, [activeSection]);

//     const handleSectionChange = (section) => {
//         setActiveSection(section);
//         setSelectedLevel(null);
//         setSearchTerm("");
//     };

//     const handleCheckboxChange = (id) => {
//         setCheckboxes(prev => ({
//             ...prev,
//             [id]: !prev[id],
//         }));
//     };

//     const handleStarClick = (id) => {
//         setStarredProblems(prev => ({
//             ...prev,
//             [id]: !prev[id],
//         }));
//     };

//     const getLevelClass = (level) => {
//         switch (level) {
//             case "Easy":
//                 return "bg-gradient-to-r from-green-500 to-emerald-600";
//             case "Medium":
//                 return "bg-gradient-to-r from-yellow-500 to-orange-500";
//             case "Hard":
//                 return "bg-gradient-to-r from-red-500 to-pink-600";
//             default:
//                 return "bg-gray-500";
//         }
//     };

//     const handleLevelClick = (level) => {
//         setSelectedLevel(level);
//         if (level === 'Random') {
//             const randomProblem = data[Math.floor(Math.random() * data.length)];
//             setFilteredSheetProblems(randomProblem ? [randomProblem] : []);
//         } else if (level) {
//             const filtered = data.filter(problem => problem.Level === level);
//             setFilteredSheetProblems(filtered);
//         } else {
//             setFilteredSheetProblems(data);
//         }
//     };

//     const companyButtons = [
//         "Google", "Microsoft", "Amazon", "Facebook", "Apple", "Netflix", "Adobe",
//         "Salesforce", "Oracle", "Goldman Sachs", "JPMorgan", "Bloomberg", "Uber",
//         "Accenture", "IBM", "Intel", "Cisco", "Dell", "HP", "Samsung"
//     ].sort();

//     const filteredCompanies = companyButtons.filter(company =>
//         company.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
//             {/* Add your Navbar component here */}
//             <Navbar />

//             {/* Header */}
//             <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
//                 <div className="container mx-auto px-4 py-8">
//                     {/* Add your Breadcrumb component here */}
//                     <Breadcrumb />

//                     <div className="flex justify-center mb-6">
//                         <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 px-6 py-2 rounded-full border-2 border-blue-200 dark:border-blue-800">
//                             <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                             <span className="text-blue-700 dark:text-blue-300 font-semibold">Company-Wise Practice</span>
//                         </div>
//                     </div>

//                     <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
//                         <span className="text-gray-800 dark:text-white">SDE Sheet Based On</span>{' '}
//                         <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
//                             Company
//                         </span>
//                     </h1>

//                     <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-8">
//                         Practice problems asked by top tech companies
//                     </p>

//                     {/* Search Bar */}
//                     <div className="max-w-xl mx-auto mb-6">
//                         <div className="relative">
//                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                             <input
//                                 type="text"
//                                 placeholder="Search companies..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="w-full pl-12 pr-12 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
//                             />
//                             {searchTerm && (
//                                 <button
//                                     onClick={() => setSearchTerm("")}
//                                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                 >
//                                     <X className="w-5 h-5" />
//                                 </button>
//                             )}
//                         </div>
//                     </div>

//                     {/* Company Navigation */}
//                     <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide">
//                         {filteredCompanies.map((company) => (
//                             <button
//                                 key={company}
//                                 onClick={() => handleSectionChange(company)}
//                                 className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${activeSection === company
//                                     ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg scale-105'
//                                     : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-700 hover:border-red-300'
//                                     }`}
//                             >
//                                 {company}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Content */}
//             <div className="container mx-auto px-4 py-8 max-w-7xl">
//                 {loading ? (
//                     <div className="flex flex-col items-center justify-center py-20">
//                         <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
//                         <p className="text-gray-600 dark:text-gray-400">Loading problems...</p>
//                     </div>
//                 ) : (
//                     <div>
//                         {/* Level Filters */}
//                         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
//                             <div className="flex items-center gap-3 mb-4">
//                                 <Filter className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//                                 <h3 className="text-lg font-bold text-gray-800 dark:text-white">Filter by Difficulty</h3>
//                             </div>

//                             <div className="flex flex-wrap gap-3 mb-6">
//                                 <button
//                                     onClick={() => handleLevelClick('Random')}
//                                     className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-gray-500/50 transition-all transform hover:scale-105"
//                                 >
//                                     <Shuffle className="w-4 h-4" />
//                                     Random
//                                 </button>
//                                 <button
//                                     onClick={() => handleLevelClick('Easy')}
//                                     className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-green-500/50 transition-all transform hover:scale-105"
//                                 >
//                                     <Zap className="w-4 h-4" />
//                                     Easy
//                                 </button>
//                                 <button
//                                     onClick={() => handleLevelClick('Medium')}
//                                     className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-yellow-500/50 transition-all transform hover:scale-105"
//                                 >
//                                     <TrendingUp className="w-4 h-4" />
//                                     Medium
//                                 </button>
//                                 <button
//                                     onClick={() => handleLevelClick('Hard')}
//                                     className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-red-500/50 transition-all transform hover:scale-105"
//                                 >
//                                     <BookOpen className="w-4 h-4" />
//                                     Hard
//                                 </button>
//                             </div>

//                             {/* Stats */}
//                             <div className="pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4">
//                                 <div className="text-center">
//                                     <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
//                                         {filteredSheetProblems.length}
//                                     </p>
//                                     <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
//                                 </div>
//                                 <div className="text-center">
//                                     <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//                                         {Object.values(checkboxes).filter(Boolean).length}
//                                     </p>
//                                     <p className="text-sm text-gray-600 dark:text-gray-400">Solved</p>
//                                 </div>
//                                 <div className="text-center">
//                                     <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
//                                         {Object.values(starredProblems).filter(Boolean).length}
//                                     </p>
//                                     <p className="text-sm text-gray-600 dark:text-gray-400">Starred</p>
//                                 </div>
//                                 <div className="text-center">
//                                     <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                                         {activeSection}
//                                     </p>
//                                     <p className="text-sm text-gray-600 dark:text-gray-400">Company</p>
//                                 </div>
//                             </div>
//                         </div>


//                         {/* Problems Table */}
//                         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
//                             <div className="overflow-x-auto">
//                                 <table className="w-full">
//                                     <thead>
//                                         <Sheetheading />
//                                     </thead>
//                                     <tbody>
//                                         {filteredSheetProblems.map((item) => (
//                                             <Sheetproblems item={item} checkboxes={checkboxes} starredProblems={starredProblems} />
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>


//                     </div>
//                 )}
//             </div>

//             {/* Add your Footer component here */}
//             <Footer />
//         </div>
//     );
// };

// export default CompanyMain;



import React, { useState, useEffect } from "react";
import { Building2, Code, Filter, Shuffle, Zap, TrendingUp, BookOpen, Search, X, Star, Edit, ExternalLink, CheckCircle2, Target, Trophy, Sparkles } from 'lucide-react';
import Sheetheading from "../Sriversdecomponents/Sheetheading";
import Sheetproblems from "../Sriversdecomponents/Sheetproblems";
import NoteModal from '../Sriversdecomponents/Keepnote';
import Navbar from "../Navbar";
import Breadcrumb from "../Common/Breadcrumb";
import Footer from "../Footer";
import Skeleton1 from "../Common/Skeleton";

const BASE_URL = "http://localhost:4001";

const CompanyMain = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("Accenture");
    const [checkboxes, setCheckboxes] = useState({});
    const [starredProblems, setStarredProblems] = useState({});
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [filteredSheetProblems, setFilteredSheetProblems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const savedCheckboxes = JSON.parse(localStorage.getItem('checkboxes')) || {};
        const savedStarredProblems = JSON.parse(localStorage.getItem('starredProblems')) || {};
        setCheckboxes(savedCheckboxes);
        setStarredProblems(savedStarredProblems);
    }, []);

    useEffect(() => {
        localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
    }, [checkboxes]);

    useEffect(() => {
        localStorage.setItem('starredProblems', JSON.stringify(starredProblems));
    }, [starredProblems]);

    useEffect(() => {
        const getProblems = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/sdeproblem`);
                const allData = await res.json();
                const filteredData = allData.filter(item =>
                    item.companies.split(',').map(company => company.trim()).includes(activeSection)
                );
                const sortedData = filteredData.sort((a, b) => a.id - b.id);
                setData(sortedData);
                setFilteredSheetProblems(sortedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        getProblems();
    }, [activeSection]);

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setSelectedLevel(null);
        setSearchTerm("");
    };

    const handleLevelClick = (level) => {
        setSelectedLevel(level);
        if (level === 'Random') {
            const randomProblem = data[Math.floor(Math.random() * data.length)];
            setFilteredSheetProblems(randomProblem ? [randomProblem] : []);
        } else if (level) {
            const filtered = data.filter(problem => problem.Level === level);
            setFilteredSheetProblems(filtered);
        } else {
            setFilteredSheetProblems(data);
        }
    };

    const companyButtons = [
        "Google", "Microsoft", "Amazon", "Uber", "Tiger Analytics", "persistent systems",
        "Facebook", "IMC", "Wealthfront", "Arista Networks", "MindTree", "FPT",
        "zeta suite", "payu", "Bloomberg", "Cognizant", "Zoho", "Goldman Sachs",
        "Wayfair", "Canonical", "Karat", "instacart", "Accenture", "Grab",
        "Jane Street", "Quora", "Zopsmart", "Twitter", "Postmates", "Salesforce",
        "Commvault", "Info Edge", "tiktok", "razorpay", "Pinterest", "Sprinklr",
        "PhonePe", "Apple", "Deutsche Bank", "Walmart Global Tech", "Booking.com",
        "Jeavio", "T System", "Cisco", "Expedia", "Optum", "ByteDance", "Citrix",
        "TIAA", "Bolt", "Adobe", "MakeMyTrip", "Moengage", "Rakuten", "Netflix",
        "eBay", "Capital One", "Honeywell", "Dropbox", "JPMorgan", "Docusign",
        "tcs", "Softwire", "DoorDash", "HRT", "Virtu Financial", "Tesla", "Snapchat",
        "AppDynamics", "Duolingo", "AllinCall", "edabit", "Robinhood", "LinkedIn",
        "Flipkart", "Cashfree", "Toptal", "Dunzo", "APT Portfolio", "Pure Storage",
        "Spotify", "Sumologic", "Oracle", "Twilio", "C3 IoT", "Morgan Stanley",
        "JP Morgan", "peak6", "Indeed", "Mercari", "Arcesium", "IBM", "DJI",
        "Rupeek", "Directi", "Yandex", "Netsuite", "Nuro", "Roblox", "DRW",
        "American Express", "Yahoo", "Samsung", "VMware", "United Health Group",
        "Yelp", "Sony", "OT", "Visa", "Qualtrics", "Akuna Capital", "Atlassian",
        "Coursera", "Square", "DE Shaw", "Infosys", "Cruise Automation", "SAP",
        "Two Sigma", "Airbnb", "Palantir Technologies", "Paypal", "ZScaler", "Rubrik",
        "Intuit", "PayTM", "Nvidia", "Citadel", "ServiceNow", "Druva", "Nutanix",
        "Lyft", "Asana", "Thumbtack", "Akamai", "MindTickle", "Qualcomm", "IIT Bombay",
        "Hotstar", "HBO", "Zoom", "Swiggy", "Drawbridge", "Epic Systems", "TripleByte",
        "Activision", "Athenahealth", "Mathworks", "Alibaba", "Valve", "IXL", "Opendoor",
        "Works Applications", "Tencent", "Gilt Groupe", "Pocket Gems", "LiveRamp",
        "Baidu", "Riot Games", "Leap Motion", "MAQ Software", "Affirm", "Redfin", "Hulu",
        "Wish", "Twitch", "GoDaddy", "BlackRock", "Databricks", "Intel", "Shopee",
        "Cohesity", "Alation", "Zenefits", "FactSet", "Box", "TuSimple", "Reddit",
        "Zillow", "National Instruments", "Sapient", "Splunk", "Barclays", "Dataminr",
        "Huawei", "Dell", "Zomato"
    ].sort();

    const filteredCompanies = companyButtons.filter(company =>
        company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const solvedCount = Object.values(checkboxes).filter(Boolean).length;
    const starredCount = Object.values(starredProblems).filter(Boolean).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950">
            <Navbar />

            {/* Header Section */}
            <div className="bg-transarent">
                <div className="container mx-auto px-4 ">
                    <Breadcrumb />

                    {/* Badge */}
                    <div className="flex justify-center mb-6 mt-4">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 px-6 py-3 rounded-full border-2 border-blue-200 dark:border-blue-700 shadow-lg backdrop-blur-xl">
                            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
                            <span className="text-blue-700 dark:text-blue-300 font-semibold">Company-Wise Practice</span>
                            <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2">
                        <span className="text-gray-800 dark:text-white">SDE Sheet Based On</span>{' '}
                        <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                            Company
                        </span>
                    </h1>

                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-8">
                        Practice problems asked by top tech companies
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mb-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search companies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-12 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 transition-all"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Company Navigation */}
                    <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide px-4 lg:px-20">
                        {filteredCompanies.map((company) => (
                            <button
                                key={company}
                                onClick={() => handleSectionChange(company)}
                                className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 backdrop-blur-xl ${activeSection === company
                                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/50 scale-105'
                                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-700 hover:border-red-300 hover:shadow-lg'
                                    }`}
                            >
                                {company}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {loading ? (
                    <Skeleton1 />
                ) : (
                    <div className="space-y-6">
                        {/* Level Filters Card */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-300 dark:border-gray-700 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <Filter className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Filter by Difficulty</h3>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-6">
                                <button
                                    onClick={() => handleLevelClick('Random')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-gray-500/50 transition-all transform hover:scale-105"
                                >
                                    <Shuffle className="w-4 h-4" />
                                    Random
                                </button>
                                <button
                                    onClick={() => handleLevelClick('Easy')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-green-500/50 transition-all transform hover:scale-105"
                                >
                                    <Zap className="w-4 h-4" />
                                    Easy
                                </button>
                                <button
                                    onClick={() => handleLevelClick('Medium')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-yellow-500/50 transition-all transform hover:scale-105"
                                >
                                    <TrendingUp className="w-4 h-4" />
                                    Medium
                                </button>
                                <button
                                    onClick={() => handleLevelClick('Hard')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-red-500/50 transition-all transform hover:scale-105"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Hard
                                </button>
                                {selectedLevel && (
                                    <button
                                        onClick={() => {
                                            setSelectedLevel(null);
                                            setFilteredSheetProblems(data);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear Filter
                                    </button>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 text-center backdrop-blur-xl">
                                    <Target className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                        {filteredSheetProblems.length}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Total Problems</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800 text-center backdrop-blur-xl">
                                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                                    <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        {solvedCount}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Solved</p>
                                </div>
                                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800 text-center backdrop-blur-xl">
                                    <Star className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2 fill-current" />
                                    <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                                        {starredCount}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Starred</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800 text-center backdrop-blur-xl">
                                    <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                                    <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                                        {activeSection}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Company</p>
                                </div>
                            </div>
                        </div>

                        {/* Problems Table */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl  border border-gray-300 dark:border-gray-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <Sheetheading />
                                    </thead>
                                    <tbody>
                                        {filteredSheetProblems.map((item) => (
                                            <Sheetproblems
                                                key={item.id}
                                                item={item}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {filteredSheetProblems.length === 0 && (
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                                <Code className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No problems found for this filter</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

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

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <Footer />
        </div>
    );
};

export default CompanyMain;