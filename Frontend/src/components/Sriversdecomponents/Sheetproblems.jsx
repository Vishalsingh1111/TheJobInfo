
import React, { useState, useEffect } from 'react';
import { ExternalLink, Star, Edit, X, Building2 } from 'lucide-react';
import NoteModal from './Keepnote';

function Sheetproblems({ item }) {
    const [isChecked, setIsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                return 'bg-gradient-to-r from-red-500 to-pink-600 shadow-lg shadow-red-500/50';
            case 'Medium':
                return 'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50';
            case 'Easy':
                return 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50';
            default:
                return 'bg-gray-500';
        }
    };

    const companiesArray = item.companies ? item.companies.split(',') : null;

    return (
        <>
            <tr className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 ${isChecked ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : ''
                }`}>
                <td className="px-4 py-4 border-r border-gray-200 dark:border-gray-700">
                    <label className="flex items-center justify-center cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer transition-all group-hover:border-green-500"
                        />
                    </label>
                </td>
                <td className="px-4 py-4 border-r border-gray-200 dark:border-gray-700">
                    <span className="text-gray-800 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {item.name}
                    </span>
                </td>
                <td className="px-4 py-4 border-r border-gray-200 dark:border-gray-700">
                    <span className={`${getLevelClass(item.Level)} text-white px-4 py-1.5 rounded-full text-sm font-semibold inline-block transition-transform hover:scale-105`}>
                        {item.Level}
                    </span>
                </td>
                <td className="px-4 py-4 text-center border-r border-gray-200 dark:border-gray-700">
                    <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                        Soon
                    </span>
                </td>
                <td className="px-4 py-4 text-center border-r border-gray-200 dark:border-gray-700">
                    {companiesArray ? (
                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                        >
                            Show
                        </button>
                    ) : (
                        <span className="text-gray-400 dark:text-gray-600">—</span>
                    )}
                </td>
                <td className="px-4 py-4 text-center border-r border-gray-200 dark:border-gray-700">
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all hover:scale-110"
                    >
                        <ExternalLink className="w-5 h-5" />
                    </a>
                </td>
                <td className="px-4 py-4 text-center border-r border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleStarClick}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
                    >
                        <Star
                            className={`w-6 h-6 transition-all ${isStarred
                                ? 'text-yellow-500 fill-yellow-500 drop-shadow-lg'
                                : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400'
                                }`}
                        />
                    </button>
                </td>
                <td className="px-4 py-4 text-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
                    >
                        <Edit className="w-4 h-4" />
                        Note
                    </button>
                </td>
            </tr>

            {/* Companies Dialog */}
            {isDialogOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn"
                    onClick={() => setIsDialogOpen(false)}
                >
                    <div
                        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-gray-200 dark:border-gray-700 animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 flex justify-between items-center">
                            <h3 className="text-white text-xl font-bold flex items-center gap-2">
                                <Building2 className="w-6 h-6" />
                                Companies ({companiesArray.length})
                            </h3>
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all hover:rotate-90 duration-300"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                            <div className="flex flex-wrap gap-3">
                                {companiesArray.map((company, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800 hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105 cursor-default"
                                    >
                                        {company.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Note Modal */}
            {isModalOpen && (
                <NoteModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    noteKey={item.name}
                />
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}</style>
        </>
    );
}

export default Sheetproblems;