import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { baseUrl } from '../Baseurl';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        try {
            const response = await axios.post(`${baseUrl}/reset-password`, {
                email,
                password: newPassword
            });
            toast.success(response.data.message);
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after successful reset
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error resetting password');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg">
                <Toaster />
                <h2 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                            Enter New Password
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Reset Password
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <a href="/Login" className="text-red-500 text-sm hover:underline">Back to Login</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
