import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { baseUrl } from '../Baseurl';

const ContactForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phonenumber: data.phonenumber,
            message: data.message,
        };
        try {
            const response = await axios.post(`${baseUrl}/contact/contactInfo`, userInfo);
            if (response.data) {
                toast.success('Message Sent Successfully');
                reset();
            }
        } catch (err) {
            if (err.response) {
                toast.error(`Error: ${err.response.data.message}`);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <>
            <div className="py-16 px-8 ">
                <Toaster />
                <div className="max-w-screen-xl container mx-auto md:px-20 px-4 mx-auto">
                    <h2 className="md:text-6xl text-4xl font-semibold text-gray-700 mt-10 mx-auto text-center dark:text-white">Get In Touch</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10 md:pt-20">
                        {/* Contact Info */}
                        <div>
                            <p className="text-gray-600 mb-6 text-2xl dark:text-white">
                                Contact Details, You can contact us.
                            </p>
                            <ul className="space-y-4 mt-10 text-gray-600">
                                <li className="flex items-center space-x-3">
                                    <span className="text-red-600"><i className="fas fa-map-marker-alt"></i></span>
                                    <span className='dark:text-white'>Kaimur, Bihar, India</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="text-red-600"><i className="fas fa-envelope"></i></span>
                                    <span className='dark:text-white'>dcodermail1@gmail.com</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="text-red-600"><i className="fas fa-phone"></i></span>
                                    <span className='dark:text-white'>+91 1020304050</span>
                                </li>
                            </ul>
                            <nav>
                                <div className="grid grid-flow-col gap-2 mt-10 w-[130px]">
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                            <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                                        </svg></a>
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                        <path fill="#03a9f4" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M36,17.12c-0.882,0.391-1.999,0.758-3,0.88c1.018-0.604,2.633-1.862,3-3 c-0.951,0.559-2.671,1.156-3.793,1.372C31.311,15.422,30.033,15,28.617,15C25.897,15,24,17.305,24,20v2c-4,0-7.9-3.047-10.327-6 c-0.427,0.721-0.667,1.565-0.667,2.457c0,1.819,1.671,3.665,2.994,4.543c-0.807-0.025-2.335-0.641-3-1c0,0.016,0,0.036,0,0.057 c0,2.367,1.661,3.974,3.912,4.422C16.501,26.592,16,27,14.072,27c0.626,1.935,3.773,2.958,5.928,3c-1.686,1.307-4.692,2-7,2 c-0.399,0-0.615,0.022-1-0.023C14.178,33.357,17.22,34,20,34c9.057,0,14-6.918,14-13.37c0-0.212-0.007-0.922-0.018-1.13 C34.95,18.818,35.342,18.104,36,17.12"></path>
                                    </svg></a>
                                    <a href='https://t.me/dcoder21575'>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                            <path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"></path><path fill="#b0bec5" d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"></path><path fill="#cfd8dc" d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"></path>
                                        </svg></a>
                                    <a href="https://www.youtube.com/@d-coder1898">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                            <path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </nav>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            {...register("firstname", { required: "First name is required" })}
                                            className="w-full p-3 border border-gray-300 rounded-md dark:text-white dark:bg-slate-800 dark:border-none"
                                        />
                                        {errors.firstname && <p className="text-red-600 text-sm">{errors.firstname.message}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            {...register("lastname", { required: "Last name is required" })}
                                            className="w-full p-3 border border-gray-300 rounded-md dark:text-white dark:bg-slate-800 dark:border-none"
                                        />
                                        {errors.lastname && <p className="text-red-600 text-sm">{errors.lastname.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                                        className="w-full p-3 border border-gray-300 rounded-md dark:text-white dark:bg-slate-800 dark:border-none"
                                    />
                                    {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        {...register("phonenumber", { required: "Phone number is required" })}
                                        className="w-full p-3 border border-gray-300 rounded-md dark:text-white dark:bg-slate-800 dark:border-none"
                                    />
                                    {errors.phonenumber && <p className="text-red-600 text-sm">{errors.phonenumber.message}</p>}
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Message"
                                        {...register("message", { required: "Message is required" })}
                                        className="w-full p-3 border border-gray-300 rounded-md h-32 dark:text-white dark:bg-slate-800 dark:border-none"
                                    ></textarea>
                                    {errors.message && <p className="text-red-600 text-sm">{errors.message.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full p-3 bg-red-600 text-white shadow-lg rounded hover:shadow-red-500/30 shadow-black/30 "
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactForm;
