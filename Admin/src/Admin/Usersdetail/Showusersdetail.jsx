
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';

const Showusersdetail = () => {
    const [notes, setNotes] = useState([]);
    const [deleteNoteId, setDeleteNoteId] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`${baseUrl}/user`);
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseUrl}/user/${id}`);
            setNotes(notes.filter(note => note._id !== id));
            console.log('Deleted note with id:', id);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
        setDeleteNoteId(null);
    };

    const openDeleteModal = (id) => {
        setDeleteNoteId(id);
    };

    return (
        <div className="container mx-auto">
            <div className="bg-white shadow rounded mt-8 p-4">
                <div className="text-2xl font-bold mb-4">Users Detail</div>
                {notes && notes.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Firstname
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Lastname
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {notes.map(note => (
                                <tr key={note._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{note.firstName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{note.lastName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{note.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{note.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button className="text-red-600 hover:text-red-900" onClick={() => openDeleteModal(note._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-1V3a1 1 0 00-1-1H6zm8 4H6v10h8V6zm-5 2a1 1 0 012 0v6a1 1 0 01-2 0V8z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center mt-4">No notes found.</p>
                )}
            </div>

            {deleteNoteId && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg flex flex-col">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this note?</p>
                        <div className="flex justify-between">
                            <button className="bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30  text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(deleteNoteId)}>Delete</button>
                            <button className="bg-gray-300 shadow-lg hover:shadow-gray-500/30 shadow-black/30  text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setDeleteNoteId(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Showusersdetail;
