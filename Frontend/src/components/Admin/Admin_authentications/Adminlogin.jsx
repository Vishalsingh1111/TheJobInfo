import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import { baseUrl } from '../../../Baseurl';

const AdminloginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            try {
                const parsedUser = JSON.parse(rememberedUser);
                setUsername(parsedUser.username);
                setPassword(parsedUser.password);
                setRememberMe(true);
            } catch (error) {
                console.error('Failed to parse remembered user data:', error);
                localStorage.removeItem('rememberedUser'); // Clean up invalid data
            }
        }
    }, []);

    const handleClose = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const userInfo = { username, password };

        try {
            const res = await axios.post(`${baseUrl}/admin/login`, userInfo);
            if (res.data) {
                toast.success('Login Successfully');
                // Store admin data in localStorage
                localStorage.setItem('Admins', JSON.stringify(res.data.admin));
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', JSON.stringify(userInfo));
                } else {
                    localStorage.removeItem('rememberedUser');
                }
                navigate('/Dashboard', { replace: true });
                window.location.reload();
            }
        } catch (err) {
            if (err.response) {
                console.error(err);
                toast.error('Error: ' + err.response.data.message);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-xl bg-white p-8 py-20 shadow-lg rounded-lg relative">
                <Toaster />
                <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 pt-7 flex items-center text-gray-700 cursor-pointer"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div>
                        <input
                            id="rememberMe"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="mr-2 leading-tight"
                        />
                        <label className="text-gray-700 text-sm" htmlFor="rememberMe">
                            Remember me
                        </label>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <div className="mt-4 flex justify-between">
                    <a
                        className="inline-block align-baseline text-sm text-red-500 hover:underline"
                        href="/"
                        onClick={handleClose}
                    >
                        Cancel
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminloginPage;

