import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Baseurl';

const ShowContactMsg = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${baseUrl}/contact`);
                setMessages(response.data); // Assuming API response is an array of messages
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Available Messages</h2>
            {messages && messages.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-300 w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Firstname</th>
                                <th className="border border-gray-300 px-4 py-2">Lastname</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Contact</th>
                                <th className="border border-gray-300 px-4 py-2">Messages</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map(message => (
                                <tr key={message._id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{message.firstname}</td>
                                    <td className="border border-gray-300 px-4 py-2">{message.lastname}</td>
                                    <td className="border border-gray-300 px-4 py-2">{message.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{message.phonenumber}</td>
                                    <td className="border border-gray-300 px-4 py-2">{message.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center mt-4">No messages found.</p>
            )}
        </div>
    );
};

export default ShowContactMsg;
