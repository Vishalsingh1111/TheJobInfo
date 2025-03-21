import React, { useState, useEffect } from "react";
import axios from 'axios';
import { baseUrl } from "../../Baseurl";
import notesvg from '/note.svg';
import NoteModal from '../Sriversdecomponents/Keepnote';
import Sheetheading from "../Sriversdecomponents/Sheetheading";
import Skeleton1 from "../Skeleton";
import Navbar from "../Navbar";
import Breadcrumb from "../Breadcrumb";
import Footer from "../Footer";

const Top100dsaProb = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("Google");
    const [checkboxes, setCheckboxes] = useState({});
    const [starredProblems, setStarredProblems] = useState({});
    const [notesArray, setNotesArray] = useState({});
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [filteredSheetProblems, setFilteredSheetProblems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNoteKey, setCurrentNoteKey] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentCompanies, setCurrentCompanies] = useState([]);

    // Load states from localStorage when the component mounts
    useEffect(() => {
        const savedCheckboxes = JSON.parse(localStorage.getItem('checkboxes')) || {};
        const savedStarredProblems = JSON.parse(localStorage.getItem('starredProblems')) || {};
        setCheckboxes(savedCheckboxes);
        setStarredProblems(savedStarredProblems);
    }, []);

    // Save checkboxes state to localStorage when it's updated
    useEffect(() => {
        localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
    }, [checkboxes]);

    // Save starred problems state to localStorage when it's updated
    useEffect(() => {
        localStorage.setItem('starredProblems', JSON.stringify(starredProblems));
    }, [starredProblems]);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/sdeproblem`);
                const filteredData = res.data.filter(item =>
                    item.contentFor.split(',').map(value => value.trim()).includes("top100")
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
        getBlogs();
    }, [activeSection]);

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setSelectedLevel(null);
    };

    const handleCheckboxChange = (id) => {
        setCheckboxes(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleStarClick = (id) => {
        setStarredProblems(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const getLevelClass = (level) => {
        switch (level) {
            case "Easy":
                return "bg-green-500";
            case "Medium":
                return "bg-yellow-500";
            case "Hard":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    const handleNoteClick = (key) => {
        setCurrentNoteKey(key);
        setIsModalOpen(true);
    };

    const handleShowClick = (companies) => {
        setCurrentCompanies(companies.split(',').map(company => company.trim()));
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
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

    const openNoteModal = (noteKey) => {
        setCurrentNoteKey(noteKey);
        setIsModalOpen(true);
    };

    return (
        <>
            <Navbar />

            <div className="dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-900 bg-gradient-to-b to-blue-100 from-[#fff]">

                <Breadcrumb />
                <div className='text-center justify-center mx-auto font-semibold dark:text-white text-gray-600 pb-5 mb-10 '>
                    <div className='flex flex-col'>
                        <span className=" justify-center text-[4.5vmax] md:text-[5.5vmin] font-bold text-gray-600 dark:text-white"><span className="text-red-500">Top 50 </span>Coding Problem For Interview</span>
                    </div>
                </div>
            </div>


            <section className="relative max-w-screen-2xl flex container md:px-[130px] px-2 overflow-visible dark:bg-slate-900 dark:text-white lg:pb-[90px] lg:pt-[10px] text-center">

                {/* Data Table */}
                <div className="w-full  text-left border-2 border-gray-400 dark:border-none dark:bg-slate-800 border-gray-200 rounded-lg">

                    {/* Level Buttons */}
                    <div className="flex px-2 justify-center space-x-1 py-3 bg-[#f5f4fb] dark:bg-slate-800 rounded-t-md">
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

                    <div className="w-full p-0 sm:p-0 md:p-4 lg:p-4 max-w-full mx-auto bg-[#f5f4fb]  dark:bg-slate-800 dark:border-none">
                        {loading ? (
                            <Skeleton1 />
                        ) : (
                            <div className="lg:mx-4 mx-2 bg-[#ffffff] dark:bg-slate-900 dark:text-white dark:border border-2 border-gray-400 rounded-lg overflow-auto">
                                <table className="table dark:bg-slate-900 dark:text-white dark:border">
                                    <thead className="font-semibold text-gray-600 shadow dark:bg-slate-900 dark:text-white">
                                        <Sheetheading />
                                    </thead>
                                    <tbody>
                                        {filteredSheetProblems.map((item, index) => (
                                            <tr
                                                key={index}
                                                className={`dark:bg-slate-900 dark:text-white border-t-2 border-gray-400 ${checkboxes[item.id] ? 'bg-gray-300' : ''
                                                    }`}
                                            >
                                                <td className="text-center">
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox dark:bg-slate-700 dark:text-white"
                                                            checked={checkboxes[item.id] || false}
                                                            onChange={() => handleCheckboxChange(item.id)}
                                                        />
                                                    </label>
                                                </td>
                                                <td className="border-r-2 border-gray-400 border-l-2">
                                                    <span>{item.name}</span>
                                                </td>
                                                <td className="border-r-2 border-gray-400 text-left">
                                                    <span
                                                        className={`${getLevelClass(item.Level)} text-white px-2 py-1 w-16 rounded-lg`}
                                                    >
                                                        {item.Level}
                                                    </span>
                                                </td>
                                                <td className="border-r-2 border-gray-400 text-center">Soon</td>
                                                <td className="border-r-2 border-gray-400 border-l-2">
                                                    {item.companies ? (
                                                        <button
                                                            className="bg-blue-500 text-white rounded px-2 py-1 ml-2"
                                                            onClick={() => handleShowClick(item.companies)}
                                                        >
                                                            Show
                                                        </button>
                                                    ) : (
                                                        <span></span>
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    <a href={item.link} className="text-red-500 hover:underline">
                                                        <img
                                                            src={'leetcode.svg'}
                                                            alt="LeetCode"
                                                            className="mx-auto w-[23px]"
                                                        />
                                                    </a>
                                                </td>
                                                <td className="border-l-2 border-gray-400 text-center">
                                                    <img
                                                        src={
                                                            starredProblems[item.id]
                                                                ? '/fill-star.svg'
                                                                : '/empty-start.svg'
                                                        }
                                                        alt="Revision"
                                                        className="cursor-pointer w-[26px] mx-auto"
                                                        onClick={() => handleStarClick(item.id)}
                                                    />
                                                </td>
                                                <td className="border-l-2 border-gray-400">
                                                    <img
                                                        src={notesvg}
                                                        alt="Note"
                                                        className="cursor-pointer w-[26px] mx-auto"
                                                        onClick={() => openNoteModal(item.name)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </section>


            {/* Dialog for showing companies */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
                    onClick={handleCloseDialog}
                >
                    <div
                        className="bg-white rounded-lg p-6  w-[300px] sl:w-[350px] md:w-[450px] h-[350px] overflow-auto"
                        onClick={(e) => e.stopPropagation()} >
                        <div className='flex justify-between mb-5'>
                            <p className='text-blue-600 text-xl ml-2'>Companies</p>
                            <button
                                className="bg-red-500 text-white rounded-full px-2.5 py-1 mt-[-14]"
                                onClick={handleCloseDialog}
                            >
                                X
                            </button>
                        </div>

                        <div>
                            {currentCompanies.map((company, index) => (
                                <div key={index} className="border border-gray-300 text-gray-500 text-sm rounded-lg text-sm p-1 px-2 m-1 inline-block">
                                    {company.trim()}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            )}


            {isModalOpen && (
                <NoteModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    noteKey={currentNoteKey}
                />
            )}
            <Footer />
        </>
    );
};

export default Top100dsaProb;

