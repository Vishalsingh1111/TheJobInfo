import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';

const UpdateNoteForm = ({ note, onUpdateSuccess, onClose }) => {
    const [updatedNoteData, setUpdatedNoteData] = useState({
        id: note.id,
        link: note.link,
        name: note.name,
        category: note.category,
        title: note.title,
        price: note.price,
        image: note.image
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedNoteData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSaveUpdate = async (e) => {
        e.preventDefault(); // Prevent form submission
        try {
            await axios.put(`${baseUrl}/note/${note._id}`, updatedNoteData);
            onUpdateSuccess(updatedNoteData); // Notify parent component of successful update
            console.log('Note updated successfully!');
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 overflow-auto">
            <div className="bg-white w-3/5 p-8 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Update Note</h2>
                <form onSubmit={handleSaveUpdate}>
                    <table className="w-full mb-4">
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 text-right font-bold text-gray-700">ID:</td>
                                <td><input type="text" name="id" value={updatedNoteData.id} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /></td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 text-right font-bold text-gray-700">Link:</td>
                                <td><input type="text" name="link" value={updatedNoteData.link} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /></td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 text-right font-bold text-gray-700">Name:</td>
                                <td><input type="text" name="name" value={updatedNoteData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /></td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 text-right font-bold text-gray-700">Category:</td>
                                <td><input type="text" name="category" value={updatedNoteData.category} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /></td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 text-right font-bold text-gray-700">Title:</td>
                                <td><input type="text" name="title" value={updatedNoteData.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /></td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 text-right font-bold text-gray-700">Price:</td>
                                <td><input type="text" name="price" value={updatedNoteData.price} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /></td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 text-right font-bold text-gray-700">Image:</td>
                                <td><input type="text" name="image" value={updatedNoteData.image} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-500 shadow-lg hover:shadow-green-500/30 shadow-black/30  text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline">Save</button>
                        <button type="button" onClick={onClose} className="bg-gray-500 shadow-lg hover:shadow-gray-500/30 shadow-black/30  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateNoteForm;
