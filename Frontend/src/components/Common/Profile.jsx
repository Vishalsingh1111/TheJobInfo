import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../Authentications/Logout';

function App() {
    const [isModalOpen, setModalOpen] = useState(true); // Modal opens by default
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user data from localStorage
        const userData = localStorage.getItem('Users');
        if (userData) {
            setAuthUser(JSON.parse(userData));
        }
    }, []);

    const handleCloseModal = () => {
        // Close the modal and navigate back in history
        setModalOpen(false);
        navigate('/');
    };

    const ProfileModal = ({ authUser, onClose }) => {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md relative">
                    <button
                        className="absolute px-3 py-1 rounded-full top-2 right-2 text-gray-500 hover:bg-red-700 text-white  bg-red-500"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-4">Profile</h2>
                        <div className="flex items-center mb-4">
                            {authUser && authUser.photo && authUser.photo !== "null" ? (
                                <img
                                    src={authUser.photo}
                                    alt="Profile"
                                    className='w-[50px] h-[50px] object-cover rounded-full mr-4'
                                />
                            ) : (
                                <div className="w-[50px] h-[50px] bg-gray-300 rounded-full flex items-center justify-center text-2xl mr-4">
                                    {authUser && authUser.firstName ? authUser.firstName.charAt(0).toUpperCase() : 'G'}
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-semibold">{authUser?.firstName || 'Guest'}</h3>
                                <p className="text-gray-600">{authUser?.email}</p>
                            </div>
                        </div>
                        <div className="p-4">
                            <p><strong>Google ID:</strong> {authUser?.googleId}</p>
                            <p><strong>First Name:</strong> {authUser?.firstName}</p>
                            <p><strong>Last Name:</strong> {authUser?.lastName}</p>
                            <p><strong>Email:</strong> {authUser?.email}</p>
                            <p><strong>Contact:</strong> {authUser?.phone}</p>
                        </div>
                        <div className='my-5'><Logout /></div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="App">
            {isModalOpen && authUser && <ProfileModal authUser={authUser} onClose={handleCloseModal} />}
        </div>
    );
}

export default App;
