import React from 'react';
import { useAdminAuth } from '../../Context/AuthProvider2';

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Logout() {
    const [authAdmin, setAuthAdmin] = useAdminAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        try {

            setAuthAdmin(null);

            localStorage.removeItem("Admins");

            toast.success("Logout Successfully");
            setTimeout(() => {
                navigate('/Adminlogin');
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error("Error: " + error.message);
        }
    };

    return (
        <div>
            <button
                className=" pl-4"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export default Logout;
