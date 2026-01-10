import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl } from '../../Baseurl';

const Subscribers = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [deleteSubscriberEmail, setDeleteSubscriberEmail] = useState(null);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await axios.get(`${baseUrl}/newslatter`);
                setSubscribers(response.data);
            } catch (error) {
                console.error('Error fetching subscribers:', error);
            }
        };

        fetchSubscribers();
    }, []);

    const handleDelete = async (email) => {
        try {
            await axios.delete(`${baseUrl}/newslatter/id?`, { data: { email } });
            setSubscribers(subscribers.filter(subscriber => subscriber.email !== email));
            toast.success(`Deleted subscriber with email: ${email}`);
        } catch (error) {
            console.error('Error deleting subscriber:', error);
            toast.error('Error deleting subscriber');
        }
        setDeleteSubscriberEmail(null);
    };

    const openDeleteModal = (email) => {
        setDeleteSubscriberEmail(email);
    };

    return (
        <div className="bg-white shadow rounded pt-5">
            <h2 className="text-lg font-bold mb-3">Subscriber Details</h2>
            {subscribers && subscribers.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {subscribers.map((subscriber, index) => (
                                <tr key={index} className="text-center">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">{subscriber.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button className="text-red-600 hover:text-red-900" onClick={() => openDeleteModal(subscriber.email)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-1V3a1 1 0 00-1-1H6zm8 4H6v10h8V6zm-5 2a1 1 0 012 0v6a1 1 0 01-2 0V8z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center mt-4">No subscribers found.</p>
            )}

            {/* Modal for delete confirmation */}
            {deleteSubscriberEmail && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg flex flex-col">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this subscriber?</p>
                        <div className="flex justify-between">
                            <button className="bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30  text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(deleteSubscriberEmail)}>Delete</button>
                            <button className="bg-gray-500 shadow-lg hover:shadow-gray-500/30 shadow-black/30  text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setDeleteSubscriberEmail(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subscribers;
