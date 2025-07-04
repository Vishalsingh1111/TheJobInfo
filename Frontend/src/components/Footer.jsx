import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ScrollToTopButton from './Common/Scrolltotop';
import { baseUrl } from '../Baseurl';

function Footer() {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
        };
        try {
            const res = await axios.post(`${baseUrl}/newslatter/subscribe`, userInfo);
            if (res.data) {
                toast.success('Thanks for subscribing!');
                reset();
            }
        } catch (err) {
            if (err.response) {
                console.error(err);
                toast.error("Error: " + err.response.data.message);
            }
        }
    };

    return (
        <>
            <footer className="footer p-10 md:px-20 border-t border-gray-400 text-gray-400 bg-[#222831] dark:bg-slate-900">
                <ScrollToTopButton />
                <aside>
                    <img src='./logo.png' className='md:text-center md:mx-auto w-[40%] border-2 border-white rounded-full' alt="Logo" />
                    <div>
                        <h1 className='text-red-500 text-xl font-semibold md:text-center' style={{ fontFamily: '"Quicksand", sans-serif', fontWeight: '900' }}><a href='/'>DCODER</a></h1>
                        <p className='text-md'>Interview Preparation Website</p>
                    </div>
                </aside>
                <nav>
                    <h6 className="font-semibold text-lg text-gray-100">SERVICES</h6>
                    <a href='/Sheet' className="link link-hover">SDE Sheet</a>
                    <a href='/CS-Fundametal' className="link link-hover">CS Fundamental</a>
                    <a href='/Project' className="link link-hover">Project Idea</a>
                    <a href='/Technical-Blog' className="link link-hover">Tech Blogs</a>
                </nav>
                <nav>
                    <h6 className="font-semibold text-lg text-gray-100">WEBSITE</h6>
                    <a href='/About' className="link link-hover">About us</a>
                    <a href='/Contact' className="link link-hover">Contact</a>
                    <a href='/' className="link link-hover">Terms of use</a>
                    <a href='/' className="link link-hover">Privacy policy</a>
                </nav>
                <nav>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h6 className="font-semibold text-lg text-gray-100 mb-5">NEWSLETTER</h6>
                        <fieldset className="form-control w-80">
                            <label className="label">
                                <span className="label-text text-gray-400 mb-2">Enter your email address</span>
                            </label>
                            <div className="join">
                                <input
                                    type="email"
                                    placeholder="username@gmail.com"
                                    {...register('email', { required: true })}
                                    className="input input-bordered join-item bg-transparent border border-gray-500"
                                />
                                <button type="submit" className="btn bg-red-700 text-white join-item hover:bg-red-800 border-gray-300">
                                    Subscribe
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </nav>
            </footer>
            <footer className='flex sm:flex-row flex-col justify-around py-5 text-gray-400 border-t border-gray-700 dark:border-gray-800 bg-[#222831] dark:bg-slate-900'>
                <aside className='pt-3 px-20'>
                    <p>Copyright © 2025 - DCODER</p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col px-20 gap-2">
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
            </footer>
        </>
    );
}

export default Footer;
