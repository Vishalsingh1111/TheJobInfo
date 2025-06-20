

import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../Baseurl';

const UpdateNotecontentForm = ({ note, onUpdateSuccess, onClose }) => {
    const [updatedNoteData, setUpdatedNoteData] = useState({
        id: note.id || "",
        header: note.header || "",
        code: note.code || "",
        explanation: note.explanation || "",
        code2: note.code2 || "",
        explanation2: note.explanation2 || "",
        code3: note.code3 || "",
        explanation3: note.explanation3 || "",
        code4: note.code4 || "",
        explanation4: note.explanation4 || "",
        code5: note.code5 || "",
        explanation5: note.explanation5 || "",
        image: note.image || "",
        contestDate: note.contestDate || "",
        contestTime: note.contestTime || "",
        category: note.category || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedNoteData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSaveUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${baseUrl}/contestsol/${note._id}`, updatedNoteData);
            onUpdateSuccess(updatedNoteData);
            console.log('Note updated successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 overflow-auto">
            <div className="bg-white w-11/12 max-w-4xl p-8 rounded shadow-lg overflow-auto max-h-full">
                <h2 className="text-2xl font-bold mb-4">Update Contest Solution</h2>
                <form onSubmit={handleSaveUpdate}>
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse border border-gray-300 w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Field</th>
                                    <th className="border border-gray-300 px-4 py-2">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(updatedNoteData).map((key, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2 font-bold text-gray-700 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {key === 'contestDate' ? (
                                                <input
                                                    type="date"
                                                    name="contestDate"
                                                    value={updatedNoteData.contestDate}
                                                    onChange={handleChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3"
                                                />
                                            ) : key === 'contestTime' ? (
                                                <input
                                                    type="time"
                                                    name="contestTime"
                                                    value={updatedNoteData.contestTime}
                                                    onChange={handleChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3"
                                                />
                                            ) : key.startsWith("code") || key.startsWith("explanation") ? (
                                                <textarea
                                                    name={key}
                                                    value={updatedNoteData[key]}
                                                    onChange={handleChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3"
                                                    rows={5}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    name={key}
                                                    value={updatedNoteData[key]}
                                                    onChange={handleChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-2">
                            Save
                        </button>
                        <button type="button" onClick={onClose} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateNotecontentForm;
