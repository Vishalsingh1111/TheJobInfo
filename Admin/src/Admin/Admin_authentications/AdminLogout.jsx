import React from 'react';
import { useAdminAuth } from '../../Context/AuthProvider2';

import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

function Logout() {
    const [, setAuthAdmin] = useAdminAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        try {

            localStorage.removeItem('Admins');
            setAuthAdmin(null);
            navigate('/login', { replace: true });
        } catch {
            navigate('/login', { replace: true });
        }
    };

    return (
        <div>
            <button
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-teal-600 transition-colors hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-950/30"
                onClick={handleLogout}
            >
                <LogOut className="h-4 w-4" /> Sign out
            </button>
        </div>
    );
}

export default Logout;
