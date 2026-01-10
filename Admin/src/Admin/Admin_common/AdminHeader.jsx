import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function AdminHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('Users');
        toast.success('Admin logged out successfully');
        navigate('/');
    };

    return (
        <>
            <div className="navbar bg-gray-900 text-white">
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl text-red-500">DCODER</a>
                </div>
                <div>
                    <a href='/AddAdmin'><button className='p-2 bg-red-500 text-white rounded mr-5'>Add Admin</button></a>
                </div>
                <div>
                    <button
                        className='p-2 bg-red-500 text-white rounded'
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <Toaster />
        </>
    );
}

export default AdminHeader;
