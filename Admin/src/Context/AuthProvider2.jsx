import React, { createContext, useContext, useState, useEffect } from 'react';

export const AdminAuthContext = createContext();

export default function AuthProvider2({ children }) {
    const initialAuthAdmin = localStorage.getItem('Admins');

    const [authAdmin, setAuthAdmin] = useState(() => {
        try {
            return initialAuthAdmin ? JSON.parse(initialAuthAdmin) : null;
        } catch (error) {
            console.error('Failed to parse Admins from localStorage:', error);
            return null;
        }
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedAdmin = localStorage.getItem('Admins');
            if (updatedAdmin) {
                setAuthAdmin(JSON.parse(updatedAdmin));
            } else {
                setAuthAdmin(null);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <AdminAuthContext.Provider value={[authAdmin, setAuthAdmin]}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export const useAdminAuth = () => useContext(AdminAuthContext);

