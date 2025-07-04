
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav className="flex justify-left  pt-20 dark:text-white ">
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 p-2 ">
                <div className="flex items-center space-x-1 text-gray-900 text-sm">
                    <Link to="/" className="flex items-center px-2 dark:text-white">
                        <FaHome className="w-4 h-4" />
                    </Link>
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        return (
                            <React.Fragment key={to}>
                                <span className="mx-2 dark:text-white">{'／'}</span>
                                {index === pathnames.length - 1 ? (
                                    <span className=" text-red-500 px-2 dark:text-white">{value}</span>
                                ) : (
                                    <Link to={to} className='dark:text-white'>
                                        {value.charAt(0).toUpperCase() + value.slice(1)}
                                    </Link>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Breadcrumb;

