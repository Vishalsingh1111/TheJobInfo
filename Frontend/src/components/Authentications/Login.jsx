// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
// import { baseUrl } from '../../Baseurl';

// const LoginPage = () => {
//     const [isEmail, setIsEmail] = useState(true);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [rememberMe, setRememberMe] = useState(false);
//     const [phone, setPhone] = useState('');
//     const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
//     const navigate = useNavigate();

//     useEffect(() => {

//         // Check if there's a remembered user
//         const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
//         if (rememberedUser) {
//             setEmail(rememberedUser.email);
//             setPassword(rememberedUser.password);
//             setRememberMe(true);
//         }
//     }, [navigate]);

//     const handleClose = (e) => {
//         e.preventDefault();
//         navigate('/');
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         const userInfo = isEmail
//             ? { email, password }
//             : { phone, password };

//         try {
//             const res = await axios.post(`${baseUrl}/user/login`, userInfo);
//             if (res.data) {
//                 toast.success('Login Successfully');
//                 if (rememberMe) {
//                     localStorage.setItem('rememberedUser', JSON.stringify(userInfo));
//                 } else {
//                     localStorage.removeItem('rememberedUser');
//                 }
//                 navigate('/', { replace: true });
//                 setTimeout(() => {
//                     localStorage.setItem('Users', JSON.stringify(res.data.user));
//                     window.location.reload();
//                 }, 1000);
//             }
//         } catch (err) {
//             if (err.response) {
//                 console.error(err);
//                 toast.error('Error: ' + err.response.data.message);
//             }
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword); // Toggle password visibility
//     };

//     const handleGoogleLogin = () => {
//         window.location.href = `${baseUrl}/auth/google`;
//         toast.success('Logging with google');

//     };

//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-100">
//             <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg relative">
//                 <Toaster />
//                 <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
//                 <div className="relative flex justify-left space-x-5 mb-4">
//                     <button
//                         onClick={() => setIsEmail(true)}
//                         className={`relative px-4 py-2 z-10 ${isEmail ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
//                     >
//                         Email
//                     </button>
//                     <button
//                         onClick={() => setIsEmail(false)}
//                         className={`relative px-4 py-2 z-10 ${!isEmail ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
//                     >
//                         Phone
//                     </button>
//                 </div>

//                 <form onSubmit={handleLogin}>
//                     {isEmail ? (
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm  mb-2" htmlFor="email">
//                                 Email
//                             </label>
//                             <input
//                                 id="email"
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 required
//                             />
//                         </div>
//                     ) : (
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm  mb-2" htmlFor="phone">
//                                 Phone
//                             </label>
//                             <input
//                                 id="phone"
//                                 type="tel"
//                                 value={phone}
//                                 onChange={(e) => setPhone(e.target.value)}
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 required
//                             />
//                         </div>
//                     )}
//                     <div className="mb-4 relative"> {/* Relative positioning for the eye icon */}
//                         <label className="block text-gray-700 text-sm  mb-2" htmlFor="password">
//                             Password
//                         </label>
//                         <input
//                             id="password"
//                             type={showPassword ? 'text' : 'password'} // Toggle between text and password
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             required
//                         />
//                         <button
//                             type="button"
//                             onClick={togglePasswordVisibility}
//                             className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center text-gray-700 cursor-pointer"
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show eye or eye-slash icon based on visibility */}
//                         </button>
//                     </div>
//                     <div className="flex items-center justify-between mb-4">
//                         <a className="inline-block align-baseline  text-sm text-blue-500 hover:text-blue-800" href="/Forgetpassword">
//                             Forgot Password?
//                         </a>
//                     </div>
//                     <div>
//                         <input
//                             id="rememberMe"
//                             type="checkbox"
//                             checked={rememberMe}
//                             onChange={(e) => setRememberMe(e.target.checked)}
//                             className="mr-2 leading-tight"
//                         />
//                         <label className="text-gray-700 text-sm" htmlFor="rememberMe">
//                             Remember me
//                         </label>
//                         <button
//                             type="submit"
//                             className="w-full bg-blue-500 hover:bg-blue-700 text-white  mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                         >
//                             Log In
//                         </button>
//                     </div>
//                 </form>

//                 <div className="my-4 flex items-center justify-center">
//                     <hr className="flex-grow border-blue-900" />
//                     <span className="px-2 text-blue-900">OR</span>
//                     <hr className="flex-grow border-blue-900" />
//                 </div>

//                 <div className="flex justify-center">
//                     <button onClick={handleGoogleLogin} className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-10 rounded focus:outline-none focus:shadow-outline">
//                         <img src="./images/google.png" alt="Google" className="h-5 w-5 mr-2" />
//                         Login with Google
//                     </button>
//                 </div>
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
//                         <a className="inline-block align-baseline text-sm text-blue-500 hover:underline" href="/Signup">
//                             New user? Register
//                         </a>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { baseUrl } from '../../Baseurl';

const LoginPage = () => {
    const [isEmail, setIsEmail] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there's a remembered user
        const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
        if (rememberedUser) {
            if (rememberedUser.email) {
                setEmail(rememberedUser.email);
                setIsEmail(true);
            } else if (rememberedUser.phone) {
                setPhone(rememberedUser.phone);
                setIsEmail(false);
            }
            setPassword(rememberedUser.password);
            setRememberMe(true);
        }
    }, []);

    const handleClose = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const validateInputs = () => {
        if (isEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.trim()) {
                toast.error('Email is required');
                return false;
            }
            if (!emailRegex.test(email)) {
                toast.error('Please enter a valid email address');
                return false;
            }
        } else {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phone.trim() || !phoneRegex.test(phone)) {
                toast.error('Enter a valid 10-digit phone number');
                return false;
            }
        }

        if (!password.trim()) {
            toast.error('Password is required');
            return false;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }

        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        const userInfo = isEmail
            ? { email, password }
            : { phone, password };

        setLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/user/login`, userInfo);
            if (res.data) {
                toast.success('Login Successful!');

                // Save to localStorage if remember me is checked
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', JSON.stringify(userInfo));
                } else {
                    localStorage.removeItem('rememberedUser');
                }

                // Save user data
                localStorage.setItem('Users', JSON.stringify(res.data.user));

                // Navigate and reload
                setTimeout(() => {
                    navigate('/', { replace: true });
                    window.location.reload();
                }, 1000);
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleLogin = () => {
        window.location.href = `${baseUrl}/auth/google`;
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="w-full max-w-xl bg-white p-8 shadow-2xl rounded-2xl">
                <Toaster position="top-center" />

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">🔐 Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Login to continue</p>
                </div>

                {/* Toggle Email/Phone */}
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => setIsEmail(true)}
                        className={`flex-1 py-3 rounded-lg font-semibold transition-all ${isEmail
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        📧 Email
                    </button>
                    <button
                        onClick={() => setIsEmail(false)}
                        className={`flex-1 py-3 rounded-lg font-semibold transition-all ${!isEmail
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        📱 Phone
                    </button>
                </div>

                <form onSubmit={handleLogin}>
                    {isEmail ? (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    ) : (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="1234567890"
                                maxLength="10"
                                required
                            />
                        </div>
                    )}

                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Remember me</span>
                        </label>
                        <a
                            className="text-sm text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                            href="/forgetpassword"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : '🔓 Log In'}
                    </button>
                </form>

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
                        href="/signup"
                    >
                        New user? Register →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;