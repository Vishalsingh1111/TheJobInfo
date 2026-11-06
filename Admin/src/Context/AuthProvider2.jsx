import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AdminAuthContext = createContext();

export default function AuthProvider2({ children }) {
    const [authAdmin, setAuthAdmin] = useState(() => {
        try { return JSON.parse(localStorage.getItem('Admins') || 'null'); }
        catch { localStorage.removeItem('Admins'); return null; }
    });

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(config => {
            const session = JSON.parse(localStorage.getItem('Admins') || 'null');
            if (session?.token) config.headers.Authorization = `Bearer ${session.token}`;
            return config;
        });
        const responseInterceptor = axios.interceptors.response.use(response => response, error => {
            const requestUrl = error.config?.url || '';
            if (error.response?.status === 401 && !requestUrl.includes('/admin/login')) {
                localStorage.removeItem('Admins');
                setAuthAdmin(null);
            }
            return Promise.reject(error);
        });
        const handleStorageChange = () => {
            try { setAuthAdmin(JSON.parse(localStorage.getItem('Admins') || 'null')); }
            catch { localStorage.removeItem('Admins'); setAuthAdmin(null); }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return (
        <AdminAuthContext.Provider value={[authAdmin, setAuthAdmin]}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export const useAdminAuth = () => useContext(AdminAuthContext);

