import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import leetcodesvg from '../../../public/leetcode.svg';
import notesvg from '../../../public/note.svg';
import NoteModal from './Keepnote';
import emptyStar from '../../../public/empty-start.svg';
import filledStar from '../../../public/fill-star.svg';

function Sheetproblems({ item }) {
    const [isChecked, setIsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNoteKey, setCurrentNoteKey] = useState('');
    const [isStarred, setIsStarred] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const storedCheckboxState = localStorage.getItem(`checkbox-${item.name}`);
        if (storedCheckboxState !== null) {
            setIsChecked(JSON.parse(storedCheckboxState));
        }

        const storedStarState = localStorage.getItem(`starred-${item.name}`);
        if (storedStarState !== null) {
            setIsStarred(JSON.parse(storedStarState));
        }
    }, [item.name]);

    const handleCheckboxChange = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        localStorage.setItem(`checkbox-${item.name}`, JSON.stringify(newState));
    };

    const handleStarClick = () => {
        const newState = !isStarred;
        setIsStarred(newState);
        localStorage.setItem(`starred-${item.name}`, JSON.stringify(newState));
    };

    const getLevelClass = (level) => {
        switch (level) {
            case 'Hard':
                return 'bg-red-500';
            case 'Medium':
                return 'bg-yellow-500';
            case 'Easy':
                return 'bg-green-500';
            default:
                return '';
        }
    };

    const handleNoteClick = (key) => {
        setCurrentNoteKey(key);
        setIsModalOpen(true);
    };

    const handleShowClick = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    // Check if companies field exists and is a non-empty string, then split it into an array
    const companiesArray = item.companies ? item.companies.split(',') : null;

    return (
        <>
            <tr className={`dark:bg-slate-900 dark:text-white border-t-2 border-gray-400 ${isChecked ? 'bg-gray-300' : ''}`}>
                <td className='text-center'>
                    <label>
                        <input
                            type="checkbox"
                            className="checkbox dark:bg-slate-700 dark:text-white"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                </td>
                <td className='border-r-2 border-gray-400 titillium-web-regular border-l-2'><span>{item.name}</span></td>
                <td className='border-r-2 border-gray-400 text-left'>
                    <span className={`${getLevelClass(item.Level)} text-white px-2 titillium-web-regular py-1 w-16 rounded-md`}>{item.Level}</span>
                </td>
                <td className='border-r-2 border-gray-400 titillium-web-regular text-center'><Link to={item.article}>Soon</Link></td>
                <td className='border-r-2 border-gray-400 border-l-2'>
                    {companiesArray ? (
                        <button
                            className="bg-blue-500 text-white titillium-web-regular rounded px-2 py-1 ml-2"
                            onClick={handleShowClick}
                        >
                            Show
                        </button>
                    ) : (
                        <span></span>
                    )}
                </td>
                <td className='text-center'>
                    <Link to={item.link} className="text-red-500 hover:underline">
                        <img src={leetcodesvg} alt="LeetCode" className="mx-auto w-[23px]" />
                    </Link>
                </td>
                <td className='border-l-2 border-gray-400 text-center'>
                    <img
                        src={isStarred ? filledStar : emptyStar}
                        alt="Revision"
                        className='cursor-pointer w-[26px] mx-auto'
                        onClick={handleStarClick}
                    />
                </td>
                <td className='border-l-2 border-gray-400'>
                    <img
                        src={notesvg}
                        alt="Note"
                        className='cursor-pointer w-[26px] mx-auto'
                        onClick={() => handleNoteClick(item.name)}
                    />
                </td>
            </tr>

            {isDialogOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
                    onClick={handleCloseDialog}
                >
                    <div
                        className="bg-white rounded-md p-6  w-[300px] sl:w-[350px] md:w-[450px] h-[350px] overflow-auto"
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
                            {companiesArray.map((company, index) => (
                                <div key={index} className="border border-gray-300 text-gray-500 text-sm rounded-md text-sm p-1 px-2 m-1 inline-block">
                                    {company.trim()}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            )}

            <NoteModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                noteKey={currentNoteKey}
            />
        </>
    );
}

export default Sheetproblems;
