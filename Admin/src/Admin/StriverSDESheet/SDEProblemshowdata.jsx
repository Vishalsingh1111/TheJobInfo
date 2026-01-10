import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Striproblemupdatebtncomp from './SDEProblemupdatebtncomp';
import { baseUrl } from '../../Baseurl';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [updatingNote, setUpdatingNote] = useState(null); // Track which note is being updated
    const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state for update
    const [deleteNoteId, setDeleteNoteId] = useState(null); // Track note to delete

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`${baseUrl}/sdeproblem`);
                setNotes(response.data); // Assuming API response is an array of notes
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, []);

    const handleUpdate = (note) => {
        setUpdatingNote(note); // Set the note to be updated
        setIsModalOpen(true); // Open the update modal
    };

    const handleUpdateSuccess = (updatedNoteData) => {
        // Update the local notes state with the updated note data
        setNotes(notes.map(note => note._id === updatedNoteData._id ? updatedNoteData : note));
        setIsModalOpen(false); // Close the update modal after update
        console.log('Note updated successfully!');
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseUrl}/sdeproblem/${id}`);
            setNotes(notes.filter(note => note._id !== id)); // Remove the deleted note from the local state
            console.log('Deleted note with id:', id);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
        setDeleteNoteId(null); // Clear deleteNoteId to close the delete confirmation modal
    };

    const openDeleteModal = (id) => {
        setDeleteNoteId(id); // Set the note id to delete
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUpdatingNote(null); // Clear updatingNote to exit update mode
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Available Contents</h2>
            {notes && notes.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-300 w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Article</th>
                                <th className="border border-gray-300 px-4 py-2">Level</th>
                                <th className="border border-gray-300 px-4 py-2">Link</th>
                                <th className="border border-gray-300 px-4 py-2">Companies</th>
                                <th className="border border-gray-300 px-4 py-2">ContentFor</th>
                                <th className="border border-gray-300 px-4 py-2">Topic</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map(note => (
                                <tr key={note._id} className="text-center text-sm">
                                    <td className="border border-gray-300 px-4 py-2">{note.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{note.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{note.article}</td>
                                    <td className="border border-gray-300 px-4 py-2">{note.Level}</td>
                                    <td className="border border-gray-300 px-4 py-2">{note.link}</td>
                                    <td className="border border-gray-300 px-4 py-2">{note.companies}</td>
                                    <td className="border border-gray-300 px-4 py-2">{note.contentFor}</td>
                                    <td className="border border-gray-300 px-4 py-2">{note.topic}</td>
                                    <td className="border-t border-gray-300 px-4 py-2 flex">
                                        <button className="bg-gray-500 shadow-lg hover:shadow-gray-500/30 shadow-black/30  text-white font-bold py-1 px-2 rounded mr-4" onClick={() => handleUpdate(note)}>Update</button>
                                        <button className="bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30  text-white font-bold py-1 px-2 rounded" onClick={() => openDeleteModal(note._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center mt-4">No cards found.</p>
            )}

            {/* Modal for update */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg flex flex-col">
                        <Striproblemupdatebtncomp note={updatingNote} onUpdateSuccess={handleUpdateSuccess} onClose={closeModal} />
                    </div>
                </div>
            )}

            {/* Modal for delete confirmation */}
            {deleteNoteId && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg flex flex-col">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete ?</p>
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

export default NoteList;
