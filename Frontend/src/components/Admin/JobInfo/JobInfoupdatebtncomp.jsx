import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../Baseurl';

const UpdateJobInfocontentForm = ({ note, onUpdateSuccess, onClose }) => {
    const [updatedNoteData, setUpdatedNoteData] = useState({
        id: note.id,
        header: note.header,
        text: note.text,
        statement: note.statement,
        substatement1: note.substatement1,
        substatement3: note.substatement3,
        statement2: note.statement2,
        feature: note.feature,
        substatement2: note.substatement2,
        explain: note.explain,
        note: note.note,
        image1: note.image1,
        category: note.category,
        figtitle: note.figtitle,
        link1: note.link1,
        link2: note.link2
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
            await axios.put(`${baseUrl}/jobinfo/${note._id}`, updatedNoteData);
            onUpdateSuccess(updatedNoteData);
            console.log('Note updated successfully!');
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 overflow-auto">
            <div className="bg-white w-11/12 max-w-4xl p-8 rounded shadow-lg overflow-auto max-h-full">
                <h2 className="text-2xl font-bold mb-4">Update Content</h2>
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
                                            {key !== 'id' ? (
                                                <textarea
                                                    name={key}
                                                    value={updatedNoteData[key]}
                                                    onChange={handleChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    rows={key.startsWith('code') ? 6 : 4} // Adjust rows based on content type
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    name={key}
                                                    value={updatedNoteData[key]}
                                                    onChange={handleChange}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="bg-green-500 shadow-lg hover:shadow-green-500/30 shadow-black/30  text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline">
                            Save
                        </button>
                        <button type="button" onClick={onClose} className="bg-gray-500 shadow-lg hover:shadow-gray-500/30 shadow-black/30  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateJobInfocontentForm;
