import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';
import Sheetheading from '../Sriversdecomponents/Sheetheading';
import Sheetproblems from '../Sriversdecomponents/Sheetproblems';
import Breadcrumb from "../Breadcrumb";
import Skeleton from "../Skeleton";

function SheetViewer() {
    const [sheets, setSheets] = useState([]);
    const [selectedSheet, setSelectedSheet] = useState(null);
    const [sheetProblems, setSheetProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [loadingSheets, setLoadingSheets] = useState(true);
    const [loadingProblems, setLoadingProblems] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchSheets = async () => {
            try {
                const res = await axios.get(`${baseUrl}/sheet`);
                const sortedData = res.data.sort((a, b) => a.id - b.id);
                setSheets(sortedData);
                if (sortedData.length > 0) handleSheetClick(sortedData[0]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingSheets(false);
            }
        };
        fetchSheets();
    }, []);

    const handleSheetClick = async (sheet) => {
        setSelectedSheet(sheet);
        setSelectedLevel('');
        setLoadingProblems(true);
        try {
            const res = await axios.get(`${baseUrl}/sheetproblem`);
            const filtered = res.data.filter(data => data.topic === sheet.Topic);
            setSheetProblems(filtered);
            setFilteredProblems(filtered);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingProblems(false);
        }
    };

    const handleLevelClick = (level) => {
        setSelectedLevel(level);
        if (level === 'Random') {
            const random = sheetProblems[Math.floor(Math.random() * sheetProblems.length)];
            setFilteredProblems(random ? [random] : []);
        } else if (level) {
            const filtered = sheetProblems.filter(p => p.Level === level);
            setFilteredProblems(filtered);
        } else {
            setFilteredProblems(sheetProblems);
        }
    };

    return (
        <div className="flex flex-col min-h-screen md:h-screen ">
            {/* Navbar */}
            <div className="dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-900 bg-gradient-to-b to-red-50 from-[#fff] py-4 relative">
                <Breadcrumb />
                <div className='text-center justify-center mx-auto font-semibold dark:text-white text-gray-700'>
                    <div className='flex flex-col'>
                        <span className="text-[4.5vmax] md:text-[5.5vmin] titillium-web-bold text-gray-600 dark:text-white">
                            <span className="text-red-500">SDE Sheet </span>Most Asked In Interview
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-1 overflow-hidden dark:bg-slate-900 relative mr-0 md:mr-10">


                {/* Sidebar */}
                <div className={`
                    fixed md:static top-20 right-0 h-full z-40 transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} 
                    md:translate-x-0 w-[240px] bg-white dark:bg-slate-800 p-4 pt-8
                `}>
                    {loadingSheets ? (
                        <p className="dark:text-white">Loading ..</p>
                    ) : (
                        <ul className="space-y-1">
                            {sheets.map(sheet => (
                                <li
                                    key={sheet.id}
                                    className={`cursor-pointer px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-slate-700 ${selectedSheet?.id === sheet.id ? 'bg-gray-200 dark:bg-slate-700 font-semibold' : ''}`}
                                    onClick={() => {
                                        handleSheetClick(sheet);
                                        setSidebarOpen(false); // Auto-close on mobile
                                    }}
                                >
                                    {sheet.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide p-2">
                    {/* Hamburger Icon – absolute top-left of content area */}
                    <div className="md:hidden">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md bg-blue-500 text-white dark:bg-slate-700">
                            Choose Topic
                        </button>
                    </div>
                    {loadingProblems ? (
                        <Skeleton />
                    ) : selectedSheet ? (

                        <div className="w-full dark:bg-slate-800 bg-gray-50 rounded border-2 rounded-lg border-gray-400 dark:text-white dark:border-none sm:px-0 py-5 md:px-0 my-5">
                            <div className='mx-auto pb-5 justify-center text-center space-x-2'>

                                <button
                                    className="bg-gray-500 shadow-lg hover:shadow-gray-500/30 shadow-black/30 text-white dark:bg-slate-800 dark:text-white px-2 py-1 border-2 rounded-lg border-gray-500"
                                    onClick={() => handleLevelClick('Random')}
                                >
                                    Random
                                </button>
                                <button
                                    className="bg-green-500 shadow-lg hover:shadow-green-500/30 shadow-black/30 text-white dark:bg-slate-800 dark:text-white px-2 py-1 border-2 rounded-lg border-green-500"
                                    onClick={() => handleLevelClick('Easy')}
                                >
                                    Easy
                                </button>
                                <button
                                    className="bg-yellow-500 shadow-lg hover:shadow-yellow-500/30 shadow-black/30 text-white dark:bg-slate-800 dark:text-white px-2 py-1 border-2 rounded-lg border-yellow-500"
                                    onClick={() => handleLevelClick('Medium')}
                                >
                                    Medium
                                </button>
                                <button
                                    className="bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30 text-white dark:bg-slate-800 dark:text-white px-2 py-1 border-2 rounded-lg border-red-500"
                                    onClick={() => handleLevelClick('Hard')}
                                >
                                    Hard
                                </button>
                            </div>

                            <div className='lg:mx-4 mx-2 dark:bg-slate-900 dark:text-white border-2 border-gray-400 rounded-lg overflow-auto'>
                                <table className="table bg-white dark:bg-slate-900 dark:text-white w-full">
                                    <thead className='font-semibold text-gray-600 shadow dark:bg-slate-800 dark:text-white'>
                                        <Sheetheading />
                                    </thead>
                                    <tbody>
                                        {filteredProblems.map(problem => (
                                            <Sheetproblems key={problem.id} item={problem} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <Skeleton />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SheetViewer;
