// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');  // Ensure accessibility

// const NoteModal = ({ isOpen, onRequestClose, noteKey }) => {
//     const [note, setNote] = useState('');

//     useEffect(() => {
//         if (noteKey) {
//             const storedNote = localStorage.getItem(`note-${noteKey}`);
//             if (storedNote) {
//                 setNote(storedNote);
//             }
//         }
//     }, [noteKey]);

//     const handleSave = () => {
//         localStorage.setItem(`note-${noteKey}`, note);
//         onRequestClose();  // Close modal after saving
//     };

//     return (
//         <Modal
//             isOpen={isOpen}
//             onRequestClose={onRequestClose}
//             contentLabel="Note Modal"
//             className="bg-white rounded-lg shadow-lg p-4 w-3/4  min-h-[500px] m-4 sm:m-6 md:m-10 lg:m-20 dark:bg-slate-700 dark:text-white"
//             overlayClassName="fixed inset-0 bg-black bg-opacity-35 flex justify-center items-center">
//             <div className="flex justify-between items-center py-2 mb-4 border-b">
//                 <h2 className="text-xl font-bold">Save Notes</h2>
//                 <button
//                     className="text-white bg-red-500 px-2 py-1 rounded hover:bg-red-800"
//                     onClick={onRequestClose}>
//                     Close
//                 </button>
//             </div>
//             <textarea
//                 className="w-full px-2 rounded border dark:bg-slate-900 dark:text-white dark:border-none"
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//                 style={{ height: '450px' }}
//             ></textarea>
//             <div className="flex justify-end mt-2 space-x-2">
//                 <button
//                     className="bg-gray-500 hover:bg-gray-800 text-white px-2 py-1 rounded"
//                     onClick={onRequestClose}>
//                     Cancel
//                 </button>
//                 <button
//                     className="bg-blue-500 hover:bg-blue-800 text-white px-2 py-1 rounded"
//                     onClick={handleSave}
//                 >
//                     Save
//                 </button>
//             </div>
//         </Modal>
//     );
// };

// export default NoteModal;




import React, { useState, useEffect } from 'react';
import { X, Save, FileText, AlertCircle } from 'lucide-react';

const NoteModal = ({ isOpen, onRequestClose, noteKey }) => {
    const [note, setNote] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (noteKey) {
            const storedNote = localStorage.getItem(`note-${noteKey}`);
            if (storedNote) {
                setNote(storedNote);
            } else {
                setNote('');
            }
        }
    }, [noteKey]);

    const handleSave = () => {
        setIsSaving(true);
        localStorage.setItem(`note-${noteKey}`, note);

        setTimeout(() => {
            setIsSaving(false);
            onRequestClose();
        }, 500);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={onRequestClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-white text-xl font-bold">Save Your Notes</h2>
                            <p className="text-indigo-100 text-sm">{noteKey}</p>
                        </div>
                    </div>
                    <button
                        onClick={onRequestClose}
                        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Info Banner */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 px-6 py-3">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>Your notes are automatically saved in your browser's local storage</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-hidden">
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write your notes here... You can add solutions, approaches, time complexity, or anything you want to remember about this problem."
                        className="w-full h-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none resize-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                        style={{ minHeight: '400px' }}
                    />
                </div>

                {/* Footer */}
                <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">{note.length}</span> characters
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onRequestClose}
                            className="px-6 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-5 h-5" />
                            {isSaving ? 'Saving...' : 'Save Note'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteModal;