
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { EyeSlashIcon } from '@heroicons/react/24/outline';
// import { baseUrl } from '../Baseurl';

// const SignupPage = () => {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//     const navigate = useNavigate();

//     const handleClose = (e) => {
//         e.preventDefault();
//         navigate('/');
//     };

//     const validateInputs = () => {
//         if (!firstName.trim()) {
//             toast.error('First name is required');
//             return false;
//         }
//         if (!email.trim()) {
//             toast.error('Email is required');
//             return false;
//         }
//         const phoneRegex = /^[0-9]{10}$/;
//         if (!phone.trim() || !phoneRegex.test(phone)) {
//             toast.error('Enter correct phone number');
//             return false;
//         }
//         if (!password.trim()) {
//             toast.error('Password is required');
//             return false;
//         }
//         if (password !== confirmPassword) {
//             toast.error('Passwords do not match');
//             return false;
//         }
//         return true;
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         if (!validateInputs()) {
//             return;
//         }

//         const userInfo = {
//             firstName,
//             lastName,
//             email,
//             phone,
//             password,
//         };

//         try {
//             const res = await axios.post(`${baseUrl}/user/signup`, userInfo);
//             if (res.data) {
//                 toast.success('Registered Successfully');
//                 localStorage.setItem('Users', JSON.stringify(res.data.user));
//                 navigate('/', { replace: true });
//                 setTimeout(() => {
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

//     const handleGoogleLogin = () => {
//         window.location.href = `${baseUrl}/auth/google`;
//     };

//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-100">
//             <div className="w-full max-w-xl bg-white p-8 mt-7 shadow-lg rounded-lg">
//                 <Toaster />
//                 <h2 className="text-2xl font-semibold pb-4 text-center">Signup</h2>
//                 <form onSubmit={handleRegister}>
//                     <div className="mb-4 flex justify-between space-x-4">
//                         <div className='w-full'>
//                             <label className="block text-gray-700 text-sm  mb-2" htmlFor="firstName">
//                                 First Name
//                             </label>
//                             <input
//                                 id="firstName"
//                                 type="text"
//                                 value={firstName}
//                                 onChange={(e) => setFirstName(e.target.value)}
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 required
//                             />
//                         </div>
//                         <div className='w-full'>
//                             <label className="block text-gray-700 text-sm  mb-2" htmlFor="lastName">
//                                 Last Name
//                             </label>
//                             <input
//                                 id="lastName"
//                                 type="text"
//                                 value={lastName}
//                                 onChange={(e) => setLastName(e.target.value)}
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

//                             />
//                         </div>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm  mb-2" htmlFor="email">
//                             Email
//                         </label>
//                         <input
//                             id="email"
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm  mb-2" htmlFor="phone">
//                             Phone
//                         </label>
//                         <input
//                             id="phone"
//                             type="tel"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4 relative">
//                         <label className="block text-gray-700 text-sm  mb-2" htmlFor="password">
//                             Password
//                         </label>
//                         <input
//                             id="password"
//                             type={passwordVisible ? 'text' : 'password'}
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             required
//                         />
//                         <button
//                             type="button"
//                             onClick={() => setPasswordVisible(!passwordVisible)}
//                             className="absolute inset-y-0 right-0 flex items-center px-3 pt-8"
//                         >
//                             {passwordVisible ? (
//                                 <EyeSlashIcon className="h-5 w-5 text-gray-500" />
//                             ) : (
//                                 <FaEye className="h-5 w-5 text-gray-500" />
//                             )}
//                         </button>
//                     </div>
//                     <div className="mb-4 relative">
//                         <label className="block text-gray-700 text-sm  mb-2" htmlFor="confirmPassword">
//                             Confirm Password
//                         </label>
//                         <input
//                             id="confirmPassword"
//                             type={confirmPasswordVisible ? 'text' : 'password'}
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             required
//                         />
//                         <button
//                             type="button"
//                             onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//                             className="absolute inset-y-0 right-0 flex items-center px-3 pt-8"
//                         >
//                             {confirmPasswordVisible ? (
//                                 <EyeSlashIcon className="h-5 w-5 text-gray-500" />
//                             ) : (
//                                 <FaEye className="h-5 w-5 text-gray-500" />
//                             )}
//                         </button>
//                     </div>

//                     <div>
//                         <button
//                             type="submit"
//                             className="w-full bg-blue-500 hover:bg-blue-700 text-white  mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                         >
//                             Register
//                         </button>
//                     </div>
//                 </form>

//                 <div className="my-4 flex items-center justify-center">
//                     <hr className="flex-grow border-blue-900" />
//                     <span className="px-2 text-blue-900">OR</span>
//                     <hr className="flex-grow border-blue-900" />
//                 </div>

//                 <div className="flex justify-center">
//                     <button onClick={handleGoogleLogin} className="flex items-center justify-center bg-white border border-gray-300 text-gray-700  py-2 px-10 rounded focus:outline-none focus:shadow-outline">
//                         <img src="./images/google.png" alt="Google" className="h-5 w-5 mr-2" />
//                         Login with Google
//                     </button>
//                 </div>
//                 <div className="mt-4 flex justify-between">
//                     <a
//                         className="inline-block align-baseline  text-sm text-red-500 hover:underline"
//                         href="/"
//                         onClick={handleClose}
//                     >
//                         Cancel
//                     </a>
//                     <a className="inline-block align-baseline  text-sm text-blue-500 hover:underline" href="/Login">
//                         Already a user? Login
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignupPage;







// import React, { useState } from 'react';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import { baseUrl } from '../Baseurl';

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
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const sendOtp = async (e) => {
//         e.preventDefault();

//         if (formData.password !== formData.confirmPassword) {
//             return toast.error("Passwords don't match!");
//         }

//         try {
//             const res = await axios.post(`${baseUrl}/user/signup`, formData);
//             setOtpSent(true);
//             setUserId(res.data.userId);
//             toast.success(res.data.message);
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Failed to send OTP");
//         }
//     };

//     const verifyOtp = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await axios.post(`${baseUrl}/user/verify-otp`, { userId, otp: otp.toString() });
//             toast.success(res.data.message);
//             navigate('/login'); // Redirect to login
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Invalid OTP");
//         }
//     };

//     return (
//         <div className="container">
//             <Toaster />
//             <h2>{otpSent ? "Verify OTP" : "Signup"}</h2>
//             <form onSubmit={otpSent ? verifyOtp : sendOtp}>
//                 {!otpSent ? (
//                     <>
//                         <input name="firstName" placeholder="First Name" onChange={handleChange} required />
//                         <input name="lastName" placeholder="Last Name" onChange={handleChange} />
//                         <input name="email" placeholder="Email" onChange={handleChange} required />
//                         <input name="phone" placeholder="Phone" onChange={handleChange} required />
//                         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//                         <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
//                         <button type="submit">Send OTP</button>
//                     </>
//                 ) : (
//                     <>
//                         <input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
//                         <button type="submit">Verify OTP</button>
//                     </>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default SignupPage;




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
                        </>
                    )}
                </form>

                <div className="my-4 text-center">OR</div>
                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-gray-100 border border-gray-300 py-2 rounded flex justify-center items-center"
                >
                    <img src="./images/google.png" alt="Google" className="h-5 w-5 mr-2" />
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default SignupPage;
