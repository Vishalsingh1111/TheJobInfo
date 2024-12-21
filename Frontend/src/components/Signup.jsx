import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { EyeSlashIcon } from '@heroicons/react/24/outline';
import { baseUrl } from '../Baseurl';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [userId, setUserId] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateInputs = () => {
        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.firstName.trim()) return toast.error('First name is required');
        if (!formData.email.trim()) return toast.error('Email is required');
        if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) return toast.error('Enter a valid 10-digit phone number');
        if (formData.password !== formData.confirmPassword) return toast.error('Passwords do not match');
        return true;
    };

    const sendOtp = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        try {
            const res = await axios.post(`${baseUrl}/user/signup`, formData);
            setOtpSent(true);
            setUserId(res.data.userId);
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send OTP');
        }
    };

    const resendOtp = async () => {
        try {
            const res = await axios.post(`${baseUrl}/user/resend-otp`, { userId });
            toast.success(res.data.message || 'OTP resent successfully');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to resend OTP');
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${baseUrl}/user/verify-otp`, { userId, otp: otp.toString() });
            toast.success(res.data.message);
            navigate('/login'); // Redirect to login page
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid OTP');
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const handleGoogleLogin = () => {
        window.location.href = `${baseUrl}/auth/google`;
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg">
                <Toaster />
                <h2 className="text-2xl font-semibold pb-4 text-center">
                    {otpSent ? 'Verify OTP' : 'Signup'}
                </h2>
                <form onSubmit={otpSent ? verifyOtp : sendOtp}>
                    {!otpSent ? (
                        <>
                            <div className="mb-4 flex justify-between space-x-4">
                                <div className="w-full">
                                    <label className="block text-gray-700 text-sm mb-2">First Name</label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        onChange={handleChange}
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="block text-gray-700 text-sm mb-2">Last Name</label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        onChange={handleChange}
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm mb-2">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm mb-2">Phone</label>
                                <input
                                    name="phone"
                                    type="tel"
                                    onChange={handleChange}
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mb-4 relative">
                                <label className="block text-gray-700 text-sm mb-2">Password</label>
                                <input
                                    name="password"
                                    type={passwordVisible ? 'text' : 'password'}
                                    onChange={handleChange}
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 pt-8"
                                >
                                    {passwordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                </button>
                            </div>
                            <div className="mb-4 relative">
                                <label className="block text-gray-700 text-sm mb-2">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    onChange={handleChange}
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 pt-8"
                                >
                                    {confirmPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
                            >
                                Send OTP
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm mb-2">Enter OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded"
                            >
                                Verify OTP
                            </button>
                            <button
                                type="button"
                                onClick={resendOtp}
                                className="w-full mt-4 bg-red-500 hover:bg-red-700 text-white py-2 rounded"
                            >
                                Resend OTP
                            </button>
                        </>
                    )}
                </form>

                <div className="my-4 flex items-center justify-center">
                    <hr className="flex-grow border-blue-900" />
                    <span className="px-2 text-blue-900">OR</span>
                    <hr className="flex-grow border-blue-900" />
                </div>
                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-gray-100 border border-gray-300 py-2 rounded flex justify-center items-center"
                >
                    <img src="./images/google.png" alt="Google" className="h-5 w-5 mr-2" />
                    Login with Google
                </button>

                <div className="mt-4 flex justify-between">
                    <div>
                        <a
                            className="inline-block align-baseline text-sm text-red-500 hover:underline"
                            href="/"
                            onClick={handleClose}
                        >
                            Cancel
                        </a>
                    </div>
                    <div className='flex space-x-5'>
                        <a className="inline-block align-baseline text-sm text-blue-500 hover:underline" href="/Adminlogin">
                            Admin Login
                        </a>
                        <a className="inline-block align-baseline text-sm text-blue-500 hover:underline" href="/Login">
                            Already have account
                        </a>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default SignupPage;
