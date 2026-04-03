// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';
// // // import toast, { Toaster } from 'react-hot-toast';
// // // import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
// // // import { baseUrl } from '../../Baseurl';

// // // const LoginPage = () => {
// // //     const [isEmail, setIsEmail] = useState(true);
// // //     const [email, setEmail] = useState('');
// // //     const [password, setPassword] = useState('');
// // //     const [rememberMe, setRememberMe] = useState(false);
// // //     const [phone, setPhone] = useState('');
// // //     const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
// // //     const navigate = useNavigate();

// // //     useEffect(() => {

// // //         // Check if there's a remembered user
// // //         const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
// // //         if (rememberedUser) {
// // //             setEmail(rememberedUser.email);
// // //             setPassword(rememberedUser.password);
// // //             setRememberMe(true);
// // //         }
// // //     }, [navigate]);

// // //     const handleClose = (e) => {
// // //         e.preventDefault();
// // //         navigate('/');
// // //     };

// // //     const handleLogin = async (e) => {
// // //         e.preventDefault();

// // //         const userInfo = isEmail
// // //             ? { email, password }
// // //             : { phone, password };

// // //         try {
// // //             const res = await axios.post(`${baseUrl}/user/login`, userInfo);
// // //             if (res.data) {
// // //                 toast.success('Login Successfully');
// // //                 if (rememberMe) {
// // //                     localStorage.setItem('rememberedUser', JSON.stringify(userInfo));
// // //                 } else {
// // //                     localStorage.removeItem('rememberedUser');
// // //                 }
// // //                 navigate('/', { replace: true });
// // //                 setTimeout(() => {
// // //                     localStorage.setItem('Users', JSON.stringify(res.data.user));
// // //                     window.location.reload();
// // //                 }, 1000);
// // //             }
// // //         } catch (err) {
// // //             if (err.response) {
// // //                 console.error(err);
// // //                 toast.error('Error: ' + err.response.data.message);
// // //             }
// // //         }
// // //     };

// // //     const togglePasswordVisibility = () => {
// // //         setShowPassword(!showPassword); // Toggle password visibility
// // //     };

// // //     const handleGoogleLogin = () => {
// // //         window.location.href = `${baseUrl}/auth/google`;
// // //         toast.success('Logging with google');

// // //     };

// // //     return (
// // //         <div className="flex justify-center items-center h-screen bg-gray-100">
// // //             <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg relative">
// // //                 <Toaster />
// // //                 <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
// // //                 <div className="relative flex justify-left space-x-5 mb-4">
// // //                     <button
// // //                         onClick={() => setIsEmail(true)}
// // //                         className={`relative px-4 py-2 z-10 ${isEmail ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
// // //                     >
// // //                         Email
// // //                     </button>
// // //                     <button
// // //                         onClick={() => setIsEmail(false)}
// // //                         className={`relative px-4 py-2 z-10 ${!isEmail ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
// // //                     >
// // //                         Phone
// // //                     </button>
// // //                 </div>

// // //                 <form onSubmit={handleLogin}>
// // //                     {isEmail ? (
// // //                         <div className="mb-4">
// // //                             <label className="block text-gray-700 text-sm  mb-2" htmlFor="email">
// // //                                 Email
// // //                             </label>
// // //                             <input
// // //                                 id="email"
// // //                                 type="email"
// // //                                 value={email}
// // //                                 onChange={(e) => setEmail(e.target.value)}
// // //                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// // //                                 required
// // //                             />
// // //                         </div>
// // //                     ) : (
// // //                         <div className="mb-4">
// // //                             <label className="block text-gray-700 text-sm  mb-2" htmlFor="phone">
// // //                                 Phone
// // //                             </label>
// // //                             <input
// // //                                 id="phone"
// // //                                 type="tel"
// // //                                 value={phone}
// // //                                 onChange={(e) => setPhone(e.target.value)}
// // //                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// // //                                 required
// // //                             />
// // //                         </div>
// // //                     )}
// // //                     <div className="mb-4 relative"> {/* Relative positioning for the eye icon */}
// // //                         <label className="block text-gray-700 text-sm  mb-2" htmlFor="password">
// // //                             Password
// // //                         </label>
// // //                         <input
// // //                             id="password"
// // //                             type={showPassword ? 'text' : 'password'} // Toggle between text and password
// // //                             value={password}
// // //                             onChange={(e) => setPassword(e.target.value)}
// // //                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// // //                             required
// // //                         />
// // //                         <button
// // //                             type="button"
// // //                             onClick={togglePasswordVisibility}
// // //                             className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center text-gray-700 cursor-pointer"
// // //                         >
// // //                             {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show eye or eye-slash icon based on visibility */}
// // //                         </button>
// // //                     </div>
// // //                     <div className="flex items-center justify-between mb-4">
// // //                         <a className="inline-block align-baseline  text-sm text-blue-500 hover:text-blue-800" href="/Forgetpassword">
// // //                             Forgot Password?
// // //                         </a>
// // //                     </div>
// // //                     <div>
// // //                         <input
// // //                             id="rememberMe"
// // //                             type="checkbox"
// // //                             checked={rememberMe}
// // //                             onChange={(e) => setRememberMe(e.target.checked)}
// // //                             className="mr-2 leading-tight"
// // //                         />
// // //                         <label className="text-gray-700 text-sm" htmlFor="rememberMe">
// // //                             Remember me
// // //                         </label>
// // //                         <button
// // //                             type="submit"
// // //                             className="w-full bg-blue-500 hover:bg-blue-700 text-white  mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
// // //                         >
// // //                             Log In
// // //                         </button>
// // //                     </div>
// // //                 </form>

// // //                 <div className="my-4 flex items-center justify-center">
// // //                     <hr className="flex-grow border-blue-900" />
// // //                     <span className="px-2 text-blue-900">OR</span>
// // //                     <hr className="flex-grow border-blue-900" />
// // //                 </div>

// // //                 <div className="flex justify-center">
// // //                     <button onClick={handleGoogleLogin} className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-10 rounded focus:outline-none focus:shadow-outline">
// // //                         <img src="./images/google.png" alt="Google" className="h-5 w-5 mr-2" />
// // //                         Login with Google
// // //                     </button>
// // //                 </div>
// // //                 <div className="mt-4 flex justify-between">
// // //                     <div>
// // //                         <a
// // //                             className="inline-block align-baseline text-sm text-red-500 hover:underline"
// // //                             href="/"
// // //                             onClick={handleClose}
// // //                         >
// // //                             Cancel
// // //                         </a>
// // //                     </div>
// // //                     <div className='flex space-x-5'>
// // //                         <a className="inline-block align-baseline text-sm text-blue-500 hover:underline" href="/Signup">
// // //                             New user? Register
// // //                         </a>
// // //                     </div>

// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default LoginPage;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import toast, { Toaster } from 'react-hot-toast';
// // import { FaEye, FaEyeSlash } from 'react-icons/fa';
// // import { baseUrl } from '../../Baseurl';

// // const LoginPage = () => {
// //     const [isEmail, setIsEmail] = useState(true);
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [rememberMe, setRememberMe] = useState(false);
// //     const [phone, setPhone] = useState('');
// //     const [showPassword, setShowPassword] = useState(false);
// //     const [loading, setLoading] = useState(false);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         // Check if there's a remembered user
// //         const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
// //         if (rememberedUser) {
// //             if (rememberedUser.email) {
// //                 setEmail(rememberedUser.email);
// //                 setIsEmail(true);
// //             } else if (rememberedUser.phone) {
// //                 setPhone(rememberedUser.phone);
// //                 setIsEmail(false);
// //             }
// //             setPassword(rememberedUser.password);
// //             setRememberMe(true);
// //         }
// //     }, []);

// //     const handleClose = (e) => {
// //         e.preventDefault();
// //         navigate('/');
// //     };

// //     const validateInputs = () => {
// //         if (isEmail) {
// //             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //             if (!email.trim()) {
// //                 toast.error('Email is required');
// //                 return false;
// //             }
// //             if (!emailRegex.test(email)) {
// //                 toast.error('Please enter a valid email address');
// //                 return false;
// //             }
// //         } else {
// //             const phoneRegex = /^[0-9]{10}$/;
// //             if (!phone.trim() || !phoneRegex.test(phone)) {
// //                 toast.error('Enter a valid 10-digit phone number');
// //                 return false;
// //             }
// //         }

// //         if (!password.trim()) {
// //             toast.error('Password is required');
// //             return false;
// //         }

// //         if (password.length < 6) {
// //             toast.error('Password must be at least 6 characters');
// //             return false;
// //         }

// //         return true;
// //     };

// //     const handleLogin = async (e) => {
// //         e.preventDefault();

// //         if (!validateInputs()) return;

// //         const userInfo = isEmail
// //             ? { email, password }
// //             : { phone, password };

// //         setLoading(true);
// //         try {
// //             const res = await axios.post(`${baseUrl}/user/login`, userInfo);
// //             if (res.data) {
// //                 toast.success('Login Successful!');

// //                 // Save to localStorage if remember me is checked
// //                 if (rememberMe) {
// //                     localStorage.setItem('rememberedUser', JSON.stringify(userInfo));
// //                 } else {
// //                     localStorage.removeItem('rememberedUser');
// //                 }

// //                 // Save user data
// //                 localStorage.setItem('Users', JSON.stringify(res.data.user));

// //                 // Navigate and reload
// //                 setTimeout(() => {
// //                     navigate('/', { replace: true });
// //                     window.location.reload();
// //                 }, 1000);
// //             }
// //         } catch (err) {
// //             console.error('Login error:', err);
// //             const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
// //             toast.error(errorMessage);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const togglePasswordVisibility = () => {
// //         setShowPassword(!showPassword);
// //     };

// //     const handleGoogleLogin = () => {
// //         window.location.href = `${baseUrl}/auth/google`;
// //     };

// //     return (
// //         <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
// //             <div className="w-full max-w-xl bg-white p-8 shadow-2xl rounded-2xl">
// //                 <Toaster position="top-center" />

// //                 <div className="text-center mb-6">
// //                     <h2 className="text-3xl font-bold text-gray-800">🔐 Welcome Back</h2>
// //                     <p className="text-gray-600 mt-2">Login to continue</p>
// //                 </div>

// //                 {/* Toggle Email/Phone */}
// //                 <div className="flex gap-3 mb-6">
// //                     <button
// //                         onClick={() => setIsEmail(true)}
// //                         className={`flex-1 py-3 rounded-lg font-semibold transition-all ${isEmail
// //                                 ? 'bg-blue-600 text-white shadow-lg'
// //                                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
// //                             }`}
// //                     >
// //                         📧 Email
// //                     </button>
// //                     <button
// //                         onClick={() => setIsEmail(false)}
// //                         className={`flex-1 py-3 rounded-lg font-semibold transition-all ${!isEmail
// //                                 ? 'bg-blue-600 text-white shadow-lg'
// //                                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
// //                             }`}
// //                     >
// //                         📱 Phone
// //                     </button>
// //                 </div>

// //                 <form onSubmit={handleLogin}>
// //                     {isEmail ? (
// //                         <div className="mb-4">
// //                             <label className="block text-gray-700 text-sm font-semibold mb-2">
// //                                 Email Address <span className="text-red-500">*</span>
// //                             </label>
// //                             <input
// //                                 type="email"
// //                                 value={email}
// //                                 onChange={(e) => setEmail(e.target.value)}
// //                                 className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                                 placeholder="john@example.com"
// //                                 required
// //                             />
// //                         </div>
// //                     ) : (
// //                         <div className="mb-4">
// //                             <label className="block text-gray-700 text-sm font-semibold mb-2">
// //                                 Phone Number <span className="text-red-500">*</span>
// //                             </label>
// //                             <input
// //                                 type="tel"
// //                                 value={phone}
// //                                 onChange={(e) => setPhone(e.target.value)}
// //                                 className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                                 placeholder="1234567890"
// //                                 maxLength="10"
// //                                 required
// //                             />
// //                         </div>
// //                     )}

// //                     <div className="mb-4 relative">
// //                         <label className="block text-gray-700 text-sm font-semibold mb-2">
// //                             Password <span className="text-red-500">*</span>
// //                         </label>
// //                         <input
// //                             type={showPassword ? 'text' : 'password'}
// //                             value={password}
// //                             onChange={(e) => setPassword(e.target.value)}
// //                             className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                             placeholder="Enter your password"
// //                             required
// //                         />
// //                         <button
// //                             type="button"
// //                             onClick={togglePasswordVisibility}
// //                             className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
// //                         >
// //                             {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
// //                         </button>
// //                     </div>

// //                     <div className="flex items-center justify-between mb-6">
// //                         <label className="flex items-center cursor-pointer">
// //                             <input
// //                                 type="checkbox"
// //                                 checked={rememberMe}
// //                                 onChange={(e) => setRememberMe(e.target.checked)}
// //                                 className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
// //                             />
// //                             <span className="ml-2 text-sm text-gray-700">Remember me</span>
// //                         </label>
// //                         <a
// //                             className="text-sm text-blue-600 hover:text-blue-800 font-semibold hover:underline"
// //                             href="/forgetpassword"
// //                         >
// //                             Forgot Password?
// //                         </a>
// //                     </div>

// //                     <button
// //                         type="submit"
// //                         disabled={loading}
// //                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                         {loading ? 'Logging in...' : '🔓 Log In'}
// //                     </button>
// //                 </form>

// //                 <div className="my-6 flex items-center justify-center">
// //                     <hr className="flex-grow border-gray-300" />
// //                     <span className="px-4 text-gray-500 font-semibold">OR</span>
// //                     <hr className="flex-grow border-gray-300" />
// //                 </div>

// //                 <button
// //                     onClick={handleGoogleLogin}
// //                     className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 py-3 rounded-lg flex justify-center items-center font-semibold transition-colors"
// //                 >
// //                     <img src="./images/google.png" alt="Google" className="h-5 w-5 mr-3" />
// //                     Continue with Google
// //                 </button>

// //                 <div className="mt-6 flex justify-between items-center">
// //                     <a
// //                         className="text-sm text-red-600 hover:text-red-800 font-semibold hover:underline"
// //                         href="/"
// //                         onClick={handleClose}
// //                     >
// //                         ← Cancel
// //                     </a>
// //                     <a
// //                         className="text-sm text-blue-600 hover:text-blue-800 font-semibold hover:underline"
// //                         href="/signup"
// //                     >
// //                         New user? Register →
// //                     </a>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default LoginPage;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
// import { baseUrl } from '../../Baseurl';

// const LoginPage = () => {
//     const navigate = useNavigate();

//     const handleClose = (e) => {
//         e.preventDefault();
//         navigate('/');
//     };

//     const handleGoogleLogin = () => {
//         toast.success('Redirecting to Google login...');
//         setTimeout(() => {
//             window.location.href = `${baseUrl}/auth/google`;
//         }, 500);
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-8 relative overflow-hidden">
//             <Toaster position="top-center" />

//             {/* Animated Background Blobs */}
//             <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
//             <div className="fixed top-40 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
//             <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

//             <div className="relative w-full max-w-md mx-4">
//                 {/* Glow Effect */}
//                 <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl blur-xl opacity-30 animate-pulse-glow"></div>

//                 {/* Main Card */}
//                 <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-10 shadow-2xl rounded-3xl border-2 border-gray-200 dark:border-gray-700">
//                     {/* Header */}
//                     <div className="text-center mb-8 animate-fade-in">
//                         <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 shadow-xl animate-bounce-gentle">
//                             <span className="text-4xl">🔐</span>
//                         </div>
//                         <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
//                             Welcome Back
//                         </h2>
//                         <p className="text-gray-600 dark:text-gray-300 text-lg">
//                             Sign in to continue your journey
//                         </p>
//                     </div>

//                     {/* Google Login Button */}
//                     <button
//                         onClick={handleGoogleLogin}
//                         className="group relative w-full bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 py-4 rounded-2xl flex justify-center items-center font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden animate-fade-in animation-delay-200"
//                     >
//                         {/* Shimmer Effect */}
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100 dark:via-blue-900/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

//                         {/* Button Content */}
//                         <div className="relative flex items-center gap-3">
//                             <img
//                                 src="./images/google.png"
//                                 alt="Google"
//                                 className="h-6 w-6 group-hover:scale-110 transition-transform"
//                             />
//                             <span className="text-gray-700 dark:text-gray-200">
//                                 Continue with Google
//                             </span>
//                         </div>
//                     </button>

//                     {/* Info Text */}
//                     <div className="mt-6 text-center animate-fade-in animation-delay-400">
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                             By continuing, you agree to our{' '}
//                             <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
//                                 Terms of Service
//                             </a>
//                             {' '}and{' '}
//                             <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
//                                 Privacy Policy
//                             </a>
//                         </p>
//                     </div>



//                     {/* Features */}
//                     <div className="space-y-2 mb-4 animate-fade-in animation-delay-800">
//                         {[
//                             { icon: '🚀', text: 'Access all premium features' },
//                             { icon: '📚', text: 'Track your learning progress' },
//                         ].map((feature, idx) => (
//                             <div
//                                 key={idx}
//                                 className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                             >
//                                 <span className="text-xl">{feature.icon}</span>
//                                 <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
//                                     {feature.text}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Cancel Button */}
//                     <div className="text-center animate-fade-in animation-delay-1000">
//                         <a
//                             className="inline-flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-bold hover:underline transition-colors"
//                             href="/"
//                             onClick={handleClose}
//                         >
//                             <span>←</span> Back to Home
//                         </a>
//                     </div>
//                 </div>
//             </div>

//             <style>{`
//                 @keyframes blob {
//                     0%, 100% { transform: translate(0, 0) scale(1); }
//                     25% { transform: translate(20px, -50px) scale(1.1); }
//                     50% { transform: translate(-20px, 20px) scale(0.9); }
//                     75% { transform: translate(50px, 50px) scale(1.05); }
//                 }

//                 @keyframes bounce-gentle {
//                     0%, 100% { transform: translateY(0); }
//                     50% { transform: translateY(-10px); }
//                 }

//                 @keyframes pulse-glow {
//                     0%, 100% { opacity: 0.3; }
//                     50% { opacity: 0.5; }
//                 }

//                 @keyframes fade-in {
//                     from { opacity: 0; transform: translateY(20px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }

//                 .animate-blob {
//                     animation: blob 7s infinite;
//                 }

//                 .animate-bounce-gentle {
//                     animation: bounce-gentle 2s ease-in-out infinite;
//                 }

//                 .animate-pulse-glow {
//                     animation: pulse-glow 2s ease-in-out infinite;
//                 }

//                 .animate-fade-in {
//                     animation: fade-in 0.8s ease-out forwards;
//                     opacity: 0;
//                 }

//                 .animation-delay-2000 {
//                     animation-delay: 2s;
//                 }

//                 .animation-delay-4000 {
//                     animation-delay: 4s;
//                 }

//                 .animation-delay-200 {
//                     animation-delay: 0.2s;
//                 }

//                 .animation-delay-400 {
//                     animation-delay: 0.4s;
//                 }

//                 .animation-delay-600 {
//                     animation-delay: 0.6s;
//                 }

//                 .animation-delay-800 {
//                     animation-delay: 0.8s;
//                 }

//                 .animation-delay-1000 {
//                     animation-delay: 1s;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default LoginPage;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { baseUrl } from '../../Baseurl';
import { useAuth } from '../../Context/AuthProvider';

const LoginPage = () => {
    const navigate = useNavigate();
    const [authUser] = useAuth();

    // ── After Google OAuth redirect back, authUser will be set ──
    // At that point, send the user to where they originally wanted to go
    useEffect(() => {
        if (authUser) {
            const redirectTo = localStorage.getItem('redirectAfterLogin') || '/';
            localStorage.removeItem('redirectAfterLogin');
            navigate(redirectTo, { replace: true });
        }
    }, [authUser, navigate]);

    const handleClose = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const handleGoogleLogin = () => {
        // redirectAfterLogin is already set by ProtectedRoute in App.jsx
        // but if user navigates to /Login directly, save current page as '/'
        if (!localStorage.getItem('redirectAfterLogin')) {
            localStorage.setItem('redirectAfterLogin', '/');
        }
        toast.success('Redirecting to Google login...');
        setTimeout(() => {
            window.location.href = `${baseUrl}/auth/google`;
        }, 500);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-8 relative overflow-hidden">
            <Toaster position="top-center" />

            {/* Animated Background Blobs */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
            <div className="fixed top-40 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
            <div className="fixed bottom-20 left-1/2 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

            <div className="relative w-full max-w-md mx-4">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl blur-xl opacity-30 animate-pulse-glow"></div>

                {/* Main Card */}
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-10 shadow-2xl rounded-3xl border-2 border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 shadow-xl animate-bounce-gentle">
                            <span className="text-4xl">🔐</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Sign in to continue your journey
                        </p>
                    </div>

                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleLogin}
                        className="group relative w-full bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 py-4 rounded-2xl flex justify-center items-center font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden animate-fade-in animation-delay-200"
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100 dark:via-blue-900/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                        {/* Button Content */}
                        <div className="relative flex items-center gap-3">
                            <img
                                src="./images/google.png"
                                alt="Google"
                                className="h-6 w-6 group-hover:scale-110 transition-transform"
                            />
                            <span className="text-gray-700 dark:text-gray-200">
                                Continue with Google
                            </span>
                        </div>
                    </button>

                    {/* Info Text */}
                    <div className="mt-6 text-center animate-fade-in animation-delay-400">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            By continuing, you agree to our{' '}
                            <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                                Terms of Service
                            </a>
                            {' '}and{' '}
                            <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                                Privacy Policy
                            </a>
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-4 mt-6 animate-fade-in animation-delay-800">
                        {[
                            { icon: '🚀', text: 'Access all premium features' },
                            { icon: '📚', text: 'Track your learning progress' },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <span className="text-xl">{feature.icon}</span>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Cancel Button */}
                    <div className="text-center animate-fade-in animation-delay-1000">
                        <a
                            className="inline-flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-bold hover:underline transition-colors"
                            href="/"
                            onClick={handleClose}
                        >
                            <span>←</span> Back to Home
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                @keyframes bounce-gentle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.5; }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
                .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-400 { animation-delay: 0.4s; }
                .animation-delay-600 { animation-delay: 0.6s; }
                .animation-delay-800 { animation-delay: 0.8s; }
                .animation-delay-1000 { animation-delay: 1s; }
            `}</style>
        </div>
    );
};

export default LoginPage;