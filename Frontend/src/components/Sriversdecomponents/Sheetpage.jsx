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
        <div className="flex flex-col">
            {/* Navbar */}
            <div className="dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-900 bg-gradient-to-b to-red-50 from-[#fff] py-4 relative">
                <Breadcrumb />
                <div className='text-center justify-center mx-auto font-normal dark:text-white text-gray-700'>
                    <div className='flex flex-col'>
                        <span className="text-[4.5vmax] md:text-[5.5vmin] titillium-web-bold text-gray-600 dark:text-white">
                            <span className="text-red-500">SDE Sheet </span>Most Asked In Interview
                        </span>
                    </div>


                    {/* Navbar */}
                    <div className="w-full mx-auto md:px-[120px] pb-1">
                        {loadingSheets ? (
                            <p className="dark:text-white">Loading ..</p>
                        ) : (
                            <div className='flex overflow-x-auto whitespace-nowrap mb-4  dark:text-white  py-3 px-1 rounded-sm'>
                                {sheets.map(sheet => (
                                    <button
                                        key={sheet.id}
                                        className={`text-md mx-0.5 px-3 py-1 ${selectedSheet?.id === sheet.id ? "text-white border dark:text-white rounded-sm bg-red-500 border-red-500" : "text-gray-900  dark:text-white  dark:border-white rounded-sm border border-gray-900"}`}
                                        onClick={() => {
                                            handleSheetClick(sheet);
                                        }}
                                    >
                                        {sheet.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Content Area */}
            <div className="relative max-w-screen-2xl flex container md:px-[130px]  px-2 overflow-visible dark:bg-slate-900 dark:text-white lg:pb-[90px] lg:pt-[10px] text-center">

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide p-2">
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
