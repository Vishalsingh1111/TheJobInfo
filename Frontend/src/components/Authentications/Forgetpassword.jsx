

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
// import { baseUrl } from '../../Baseurl';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP and password
//     const navigate = useNavigate();

//     const handleSendOtp = async () => {
//         try {
//             const response = await axios.post(`${baseUrl}/user/send-otp-reset`, { email });
//             toast.success(response.data.message);
//             setStep(2); // Move to OTP verification step
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Error sending OTP');
//         }
//     };

//     const handleResetPassword = async (e) => {
//         e.preventDefault();

//         if (newPassword !== confirmPassword) {
//             return toast.error('Passwords do not match');
//         }

//         try {
//             const response = await axios.post(`${baseUrl}/user/reset-password`, {
//                 email,
//                 otp,
//                 newPassword,
//             });
//             toast.success(response.data.message);
//             setTimeout(() => {
//                 navigate('/login'); // Redirect to login page
//             }, 2000);
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Error resetting password');
//         }
//     };

//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-100">
//             <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg">
//                 <Toaster />
//                 <h2 className="text-2xl font-semibold mb-6 text-center">
//                     {step === 1 ? 'Forgot Password' : 'Verify OTP'}
//                 </h2>
//                 {step === 1 ? (
//                     <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}>
//                         <div className="mb-4">
//                             <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
//                             Send OTP
//                         </button>
//                     </form>
//                 ) : (
//                     <form onSubmit={handleResetPassword}>
//                         <div className="mb-4">
//                             <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">OTP</label>
//                             <input
//                                 type="text"
//                                 id="otp"
//                                 value={otp}
//                                 onChange={(e) => setOtp(e.target.value)}
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
//                             <input
//                                 type="password"
//                                 id="newPassword"
//                                 value={newPassword}
//                                 onChange={(e) => setNewPassword(e.target.value)}
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
//                             <input
//                                 type="password"
//                                 id="confirmPassword"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
//                             Reset Password
//                         </button>
//                     </form>
//                 )}
//                 {step === 1 && (
//                     <div className="mt-4 text-center">
//                         <a href="/login" className="text-red-500 text-sm hover:underline">Back to Login</a>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { baseUrl } from '../../Baseurl';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP and password
    const [loading, setLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            toast.error('Email is required');
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return false;
        }
        return true;
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (!validateEmail()) return;

        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/user/send-otp-reset`, { email });
            toast.success(response.data.message || 'OTP sent to your email!');
            setStep(2);
            setResendTimer(120); // 2 minutes countdown
        } catch (error) {
            console.error('Send OTP error:', error);
            toast.error(error.response?.data?.message || 'Error sending OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendTimer > 0) {
            toast.error(`Please wait ${resendTimer} seconds before resending`);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/user/send-otp-reset`, { email });
            toast.success(response.data.message || 'OTP resent successfully!');
            setResendTimer(120);
        } catch (error) {
            console.error('Resend OTP error:', error);
            toast.error(error.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!otp || otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        if (newPassword.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/user/reset-password`, {
                email,
                otp: otp.toString(),
                newPassword,
            });
            toast.success(response.data.message || 'Password reset successfully!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Reset password error:', error);
            toast.error(error.response?.data?.message || 'Error resetting password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
            <div className="w-full max-w-xl bg-white p-8 shadow-2xl rounded-2xl">
                <Toaster position="top-center" />

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        {step === 1 ? '🔐 Forgot Password?' : '✉️ Verify OTP'}
                    </h2>
                    <p className="text-gray-600 mt-2">
                        {step === 1
                            ? "Don't worry! Enter your email to reset your password"
                            : `We sent a code to ${email}`}
                    </p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleSendOtp}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="john@example.com"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : '📧 Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Enter 6-Digit OTP <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 text-center text-2xl tracking-widest leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="000000"
                                maxLength="6"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-2 text-center">
                                OTP expires in 2 minutes
                            </p>
                        </div>

                        <div className="mb-4 relative">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                New Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Min. 6 characters"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                            >
                                {showNewPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                            </button>
                        </div>

                        <div className="mb-6 relative">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Confirm New Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Repeat password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otp.length !== 6}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Resetting...' : '🔒 Reset Password'}
                        </button>

                        <div className="mt-4 text-center">
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={loading || resendTimer > 0}
                                className="text-purple-600 hover:text-purple-800 font-semibold disabled:text-gray-400 disabled:cursor-not-allowed"
                            >
                                {resendTimer > 0
                                    ? `Resend OTP in ${resendTimer}s`
                                    : '🔄 Resend OTP'}
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-6 text-center">
                    <a
                        href="/login"
                        className="text-sm text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                    >
                        ← Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
