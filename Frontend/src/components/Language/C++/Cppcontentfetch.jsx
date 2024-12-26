import React, { useState, useEffect } from "react";
import axios from 'axios';
import { baseUrl } from "../../../Baseurl";
import GetContent from "../GetContent";
import Skeleton1 from "../../Skeleton";

const QUESTIONS_PER_PAGE = 10;

const Cppcontentfetch = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/notecontent`);
                const filteredData = res.data.filter(item => item.category === "cpp");
                const sortedData = filteredData.sort((a, b) => a.id - b.id);
                setData(sortedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        getBlogs();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [currentPage]);

    const totalPages = Math.ceil(data.length / QUESTIONS_PER_PAGE);

    const paginatedData = data.slice(
        (currentPage - 1) * QUESTIONS_PER_PAGE,
        currentPage * QUESTIONS_PER_PAGE
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generate pagination with first two pages, last two pages, and ellipsis in between
    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 5) {
            // If there are 5 or fewer pages, show them all
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === i ? "bg-blue-700 text-white" : "bg-gray-200 text-black"}`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            // Always show the first two pages
            for (let i = 1; i <= 2; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === i ? "bg-blue-700 text-white" : "bg-gray-200 text-black"}`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            }

            // Show ellipsis if there are pages between 2 and the second-to-last page
            if (currentPage > 3) {
                pageNumbers.push(<span key="ellipsis" className="px-4 py-2 mx-1">...</span>);
            }

            // Show the current page if it's in the middle range
            if (currentPage > 2 && currentPage < totalPages - 1) {
                pageNumbers.push(
                    <button
                        key={currentPage}
                        className="px-4 py-2 mx-1 bg-blue-700 text-white rounded"
                        onClick={() => handlePageChange(currentPage)}
                    >
                        {currentPage}
                    </button>
                );
            }

            // Show ellipsis if there are pages between the current page and the last two pages
            if (currentPage < totalPages - 2) {
                pageNumbers.push(<span key="ellipsis2" className="px-4 py-2 mx-1">...</span>);
            }

            // Always show the last two pages
            for (let i = totalPages - 1; i <= totalPages; i++) {
                if (i > 2) {
                    pageNumbers.push(
                        <button
                            key={i}
                            className={`px-4 py-2 mx-1 rounded ${currentPage === i ? "bg-blue-700 text-white" : "bg-gray-200 text-black"}`}
                            onClick={() => handlePageChange(i)}
                        >
                            {i}
                        </button>
                    );
                }
            }
        }

        return pageNumbers;
    };

    return (
        <>
            <div className='flex flex-col sm:flex-row lg:flex-row justify-between text-2xl font-semibold dark:bg-slate-900 dark:text-white text-gray-700 mb-5 pt-5 pb-5 pl-5 lg:pl-20 dark:from-slate-800'>
                <div className='flex flex-col space-y-4'>
                    <span>Basic Interview Questions – Object Oriented Programming OOPs</span>
                    <span className='text-sm'>Last Updated: December 26, 2024</span>
                </div>
                <div className='mt-4 sm:mt-0 lg:mt-4 sm:mr-20 lg:mr-[100px]'>
                    <a href="path-to-your-file.pdf" download>
                        <button className='bg-white text-sm dark:bg-slate-900 text-red-500 border border-red-500 px-5 py-3 rounded-md'>Download PDF</button>
                    </a>
                </div>
            </div>

            <section className="max-w-screen-2xl container pb-5 md:pl-20 px-4  dark:bg-slate-900 dark:text-white lg:pb-[90px] text-center">
                <div className="mx-auto flex text-left">
                    <div className="w-full p-0 sm:p-6 md:pl-10  max-w-[900px]  md:shadow-black/30 rounded-xl  dark:bg-slate-900 dark:border-none">
                        {loading ? (
                            <Skeleton1 />
                        ) : (
                            paginatedData.map((item) => (
                                <GetContent key={item.id} item={item} />
                            ))
                        )}
                    </div>

                    {/* Poster */}
                    <div className="w-[240px] h-full ml-32 pt-5 hidden md:inline sticky top-[80px] ">
                        <a href="/Signup">
                            <img src="./poster.png" alt="Poster" />
                        </a>
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="mt-6 flex justify-center space-x-2">
                    <button
                        className="px-4 py-2 rounded bg-gray-200 text-black disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {renderPageNumbers()}
                    <button
                        className="px-4 py-2 rounded bg-gray-200 text-black disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </section>
        </>
    );
};

export default Cppcontentfetch;

