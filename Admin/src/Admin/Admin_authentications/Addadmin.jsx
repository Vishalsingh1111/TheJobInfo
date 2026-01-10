import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import { baseUrl } from '../../Baseurl';

const AdminloginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing/hiding confirm password
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
        navigate('/Dashboard');
    };

    const addadmin = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const userInfo = {
            username,
            password,
        };

        try {
            const res = await axios.post(`${baseUrl}/admin/addadmin`, userInfo);
            if (res.data) {
                toast.success('Registered Successfully');
                localStorage.setItem('Users', JSON.stringify(res.data.user));
                navigate('/Dashboard', { replace: true });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (err) {
            if (err.response) {
                console.error(err);
                toast.error('Error: ' + err.response.data.message);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword); // Toggle confirm password visibility
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg relative">
                <Toaster />
                <h2 className="text-2xl font-semibold mb-6 text-center">Admin SignUp</h2>
                <form onSubmit={addadmin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm  mb-2" htmlFor="username">
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
                    <div className="mb-4 relative"> {/* Relative positioning for the eye icon */}
                        <label className="block text-gray-700 text-sm  mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center text-gray-700 cursor-pointer"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show eye or eye-slash icon based on visibility */}
                        </button>
                    </div>
                    <div className="mb-4 relative"> {/* Relative positioning for the eye icon */}
                        <label className="block text-gray-700 text-sm  mb-2" htmlFor="confirmPassword">
                            Re-enter Password
                        </label>
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'} // Toggle between text and password
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center text-gray-700 cursor-pointer"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Show eye or eye-slash icon based on visibility */}
                        </button>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white  mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Signup
                        </button>
                    </div>
                </form>
                <div className="mt-4 flex justify-between">
                    <a
                        className="inline-block align-baseline  text-sm text-red-500 hover:underline"
                        href=""
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
