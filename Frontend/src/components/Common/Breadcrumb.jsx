
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { House } from 'lucide-react';

const Breadcrumb = ({ compact = false, currentLabel, extraTopPadding = false }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav aria-label="Breadcrumb" className={`relative left-1/2 w-screen max-w-7xl -translate-x-1/2 px-[15px] ${compact ? 'pb-2' : extraTopPadding ? 'pt-24 pb-2' : 'pt-20 pb-2'}`}>
            <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-gray-400">
                <Link
                    to="/"
                    aria-label="Home"
                    title="Home"
                    className="inline-flex items-center transition hover:text-blue-700 dark:hover:text-blue-300"
                >
                    <House size={16} aria-hidden="true" />
                </Link>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const words = value.replace(/-/g, ' ').toLowerCase();
                    const label = index === pathnames.length - 1 && currentLabel
                        ? currentLabel
                        : value.toLowerCase() === 'blogs'
                            ? 'Interview Articles'
                            : words.charAt(0).toUpperCase() + words.slice(1);
                    return <React.Fragment key={to}><span aria-hidden="true">/</span>{index === pathnames.length - 1 ? <span aria-current="page" className="font-semibold text-slate-900 dark:text-white">{label}</span> : <Link to={to} className="hover:text-blue-700 dark:hover:text-blue-300">{label}</Link>}</React.Fragment>;
                })}
            </div>
        </nav>
    );
};

export default Breadcrumb;
