// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { EyeSlashIcon } from '@heroicons/react/24/outline';
// import { baseUrl } from '../../Baseurl';

// const SignupPage = () => {
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         password: '',
//         confirmPassword: '',
//     });
//     const [otp, setOtp] = useState('');
//     const [otpSent, setOtpSent] = useState(false);
//     const [userId, setUserId] = useState('');
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const validateInputs = () => {
//         const phoneRegex = /^[0-9]{10}$/;
//         if (!formData.firstName.trim()) return toast.error('First name is required');
//         if (!formData.email.trim()) return toast.error('Email is required');
//         if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) return toast.error('Enter a valid 10-digit phone number');
//         if (formData.password !== formData.confirmPassword) return toast.error('Passwords do not match');
//         return true;
//     };

//     const sendOtp = async (e) => {
//         e.preventDefault();

//         if (!validateInputs()) return;

//         try {
//             const res = await axios.post(`${baseUrl}/user/signup`, formData);
//             setOtpSent(true);
//             setUserId(res.data.userId);
//             toast.success(res.data.message);
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Failed to send OTP');
//         }
//     };

//     // const resendOtp = async () => {
//     //     try {
//     //         const res = await axios.post(`${baseUrl}/user/resend-otp`, { userId });
//     //         toast.success(res.data.message || 'OTP resent successfully');
//     //     } catch (err) {
//     //         toast.error(err.response?.data?.message || 'Failed to resend OTP');
//     //     }
//     // };

//     const verifyOtp = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await axios.post(`${baseUrl}/user/verify-otp`, { userId, otp: otp.toString() });
//             toast.success(res.data.message);
//             navigate('/login'); // Redirect to login page
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Invalid OTP');
//         }
//     };

//     const handleClose = (e) => {
//         e.preventDefault();
//         navigate('/');
//     };

//     const handleGoogleLogin = () => {
//         window.location.href = `${baseUrl}/auth/google`;
//         toast.success('Logging with google');
//     };

//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-100">
//             <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg">
//                 <Toaster />
//                 <h2 className="text-2xl font-semibold pb-4 text-center">
//                     {otpSent ? 'Verify OTP' : 'Signup'}
//                 </h2>
//                 <form onSubmit={otpSent ? verifyOtp : sendOtp}>
//                     {!otpSent ? (
//                         <>
//                             <div className="mb-4 flex justify-between space-x-4">
//                                 <div className="w-full">
//                                     <label className="block text-gray-700 text-sm mb-2">First Name</label>
//                                     <input
//                                         name="firstName"
//                                         type="text"
//                                         onChange={handleChange}
//                                         className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="w-full">
//                                     <label className="block text-gray-700 text-sm mb-2">Last Name</label>
//                                     <input
//                                         name="lastName"
//                                         type="text"
//                                         onChange={handleChange}
//                                         className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm mb-2">Email</label>
//                                 <input
//                                     name="email"
//                                     type="email"
//                                     onChange={handleChange}
//                                     className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm mb-2">Phone</label>
//                                 <input
//                                     name="phone"
//                                     type="tel"
//                                     onChange={handleChange}
//                                     className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4 relative">
//                                 <label className="block text-gray-700 text-sm mb-2">Password</label>
//                                 <input
//                                     name="password"
//                                     type={passwordVisible ? 'text' : 'password'}
//                                     onChange={handleChange}
//                                     className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setPasswordVisible(!passwordVisible)}
//                                     className="absolute inset-y-0 right-0 flex items-center px-3 pt-8"
//                                 >
//                                     {passwordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
//                                 </button>
//                             </div>
//                             <div className="mb-4 relative">
//                                 <label className="block text-gray-700 text-sm mb-2">Confirm Password</label>
//                                 <input
//                                     name="confirmPassword"
//                                     type={confirmPasswordVisible ? 'text' : 'password'}
//                                     onChange={handleChange}
//                                     className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//                                     className="absolute inset-y-0 right-0 flex items-center px-3 pt-8"
//                                 >
//                                     {confirmPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
//                                 </button>
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
//                             >
//                                 Send OTP
//                             </button>
//                         </>
//                     ) : (
//                         <>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm mb-2">Enter OTP</label>
//                                 <input
//                                     type="text"
//                                     value={otp}
//                                     onChange={(e) => setOtp(e.target.value)}
//                                     className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
//                                     required
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded"
//                             >
//                                 Verify OTP
//                             </button>
//                             {/* <button
//                                 type="button"
//                                 onClick={resendOtp}
//                                 className="w-full mt-4 bg-red-500 hover:bg-red-700 text-white py-2 rounded"
//                             >
//                                 Resend OTP
//                             </button> */}
//                         </>
//                     )}
//                 </form>

//                 <div className="my-4 flex items-center justify-center">
//                     <hr className="flex-grow border-blue-900" />
//                     <span className="px-2 text-blue-900">OR</span>
//                     <hr className="flex-grow border-blue-900" />
//                 </div>
//                 <button
//                     onClick={handleGoogleLogin}
//                     className="w-full bg-gray-100 border border-gray-300 py-2 rounded flex justify-center items-center"
//                 >
//                     <img src="./images/google.png" alt="Google" className="h-5 w-5 mr-2" />
//                     Login with Google
//                 </button>

//                 <div className="mt-4 flex justify-between">
//                     <div>
//                         <a
//                             className="inline-block align-baseline text-sm text-red-500 hover:underline"
//                             href="/"
//                             onClick={handleClose}
//                         >
//                             Cancel
//                         </a>
//                     </div>
//                     <div className='flex space-x-5'>
//                         <a className="inline-block align-baseline text-sm text-blue-500 hover:underline" href="/Login">
//                             Already have account
//                         </a>
//                     </div>

//                 </div>


//             </div>
//         </div>
//     );
// };

// export default SignupPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { EyeSlashIcon } from '@heroicons/react/24/outline';
import { baseUrl } from '../../Baseurl';

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
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    const navigate = useNavigate();

    // Countdown timer for resend OTP
    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateInputs = () => {
        const phoneRegex = /^[0-9]{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.firstName.trim()) {
            toast.error('First name is required');
            return false;
        }
        if (!formData.email.trim()) {
            toast.error('Email is required');
            return false;
        }
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }
        if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
            toast.error('Enter a valid 10-digit phone number');
            return false;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        return true;
    };

    const sendOtp = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        setLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/user/signup`, formData);
            setOtpSent(true);
            setUserId(res.data.userId);
            setResendTimer(120); // 2 minutes countdown
            toast.success(res.data.message || 'OTP sent to your email!');
        } catch (err) {
            console.error('Signup error:', err);
            toast.error(err.response?.data?.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resendOtp = async () => {
        if (resendTimer > 0) {
            toast.error(`Please wait ${resendTimer} seconds before resending`);
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/user/resend-otp`, {
                email: formData.email
            });
            setResendTimer(120); // Reset timer to 2 minutes
            toast.success(res.data.message || 'OTP resent successfully!');
        } catch (err) {
            console.error('Resend OTP error:', err);
            toast.error(err.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();

        if (!otp || otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/user/verify-otp`, {
                userId,
                otp: otp.toString()
            });
            toast.success(res.data.message || 'Account verified successfully!');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (err) {
            console.error('Verify OTP error:', err);
            toast.error(err.response?.data?.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="w-full max-w-xl bg-white p-8 shadow-2xl rounded-2xl">
                <Toaster position="top-center" />

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        {otpSent ? '✉️ Verify OTP' : '🚀 Create Account'}
                    </h2>
                    <p className="text-gray-600 mt-2">
                        {otpSent
                            ? `We sent a code to ${formData.email}`
                            : 'Sign up to get started'}
                    </p>
                </div>

                <form onSubmit={otpSent ? verifyOtp : sendOtp}>
                    {!otpSent ? (
                        <>
                            <div className="mb-4 flex justify-between space-x-4">
                                <div className="w-full">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="1234567890"
                                    maxLength="10"
                                    required
                                />
                            </div>

                            <div className="mb-4 relative">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="password"
                                    type={passwordVisible ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Min. 6 characters"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                                >
                                    {passwordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                </button>
                            </div>

                            <div className="mb-6 relative">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="confirmPassword"
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Repeat password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                                >
                                    {confirmPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : '📧 Send OTP'}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Enter 6-Digit OTP <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="000000"
                                    maxLength="6"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-2 text-center">
                                    OTP expires in 2 minutes
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Verifying...' : '✅ Verify OTP'}
                            </button>

                            <div className="mt-4 text-center">
                                <button
                                    type="button"
                                    onClick={resendOtp}
                                    disabled={loading || resendTimer > 0}
                                    className="text-blue-600 hover:text-blue-800 font-semibold disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    {resendTimer > 0
                                        ? `Resend OTP in ${resendTimer}s`
                                        : '🔄 Resend OTP'}
                                </button>
                            </div>
                        </>
                    )}
                </form>

                {!otpSent && (
                    <>
                        <div className="my-6 flex items-center justify-center">
                            <hr className="flex-grow border-gray-300" />
                            <span className="px-4 text-gray-500 font-semibold">OR</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                            className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 py-3 rounded-lg flex justify-center items-center font-semibold transition-colors"
                        >
                            <img src="./images/google.png" alt="Google" className="h-5 w-5 mr-3" />
                            Continue with Google
                        </button>
                    </>
                )}

                <div className="mt-6 flex justify-between items-center">
                    <a
                        className="text-sm text-red-600 hover:text-red-800 font-semibold hover:underline"
                        href="/"
                        onClick={handleClose}
                    >
                        ← Cancel
                    </a>
                    <a
                        className="text-sm text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                        href="/login"
                    >
                        Already have an account? →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;