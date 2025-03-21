import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CodeSnippet from "../CodeSnippet/CodeSnippet";
import Navbar from '../Navbar';
import Footer from '../Footer';
import Breadcrumb from '../Breadcrumb';
import { baseUrl } from '../../Baseurl';
import Skeleton1 from '../Skeleton';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(4);
    const [accordionState, setAccordionState] = useState({});
    const [showCodeState, setShowCodeState] = useState({}); // Separate state for code snippets

    // Toggle Accordion Item
    const toggleAccordion = (index) => {
        setAccordionState((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    // Toggle Show/Hide Code
    const toggleShowCode = (index) => {
        setShowCodeState((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    useEffect(() => {
        const getBlogData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/blog`);
                const foundItem = res.data.find((blogItem) => blogItem.id.toString() === id);
                setItem(foundItem);
                setItems(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        getBlogData();
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <Breadcrumb />
                <Skeleton1 />
                <Footer />
            </>
        );
    }

    const renderAccordion = (title, content, code, index) => (
        <div className="w-full border-b border-gray-400 px-4 py-3 dark:border-gray-600">
            <button
                className="faq-btn flex w-full text-left group hover"
                onClick={() => toggleAccordion(index)}
            >
                <div className="w-full">
                    <h4 className="mt-1 sm:text-md lg:text-xl text-[#484B54] font-semibold text-dark dark:text-white">
                        <span className="text-xl dark:text-white font-semibold text-gray-600">
                            {title}
                        </span>
                    </h4>
                </div>
                <div className="flex h-10 w-full max-w-[40px] items-center justify-center rounded-md bg-red-500 group-hover:shadow-lg group-hover:shadow-black/40 dark:bg-white/5">
                    <svg
                        className={`fill-white stroke-white duration-200 ease-in-out ${accordionState[index] ? 'rotate-180' : ''
                            }`}
                        width="17"
                        height="10"
                        viewBox="0 0 17 10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                        />
                    </svg>
                </div>
            </button>
            <div className={`duration-200 ease-in-out ${accordionState[index] ? 'block' : 'hidden'}`}>
                <p className="py-3 text-md leading-relaxed text-[#484B54] dark:text-white">
                    {content && content.split('\n').map((line, idx) => (
                        <p className="py-1 text-lg" key={idx}>
                            {line.trim()}
                        </p>
                    ))}
                    {code && (
                        <div className="my-5 mx-auto text-left">
                            <button
                                onClick={() => toggleShowCode(index)}
                                className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                {showCodeState[index] ? 'Hide Code' : 'Show Code'}
                            </button>
                            {showCodeState[index] && <CodeSnippet codeString={code} />}
                        </div>
                    )}
                </p>
            </div>
        </div>
    );


    const handleCardClick = (id) => navigate(`/detail/${id}`);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <>
            <Navbar />
            <Breadcrumb />


            <div className="pt-[50px] mx-auto max-w-screen-2xl md:px-20 px-4 py-5">
                <div className="flex flex-col gap-10">
                    <div className="w-full p-3 sm:p-5 md:p-8 lg:p-10 max-w-[1000px] mx-auto border-t md:shadow-sm md:shadow-black/30 rounded-xl bg-white dark:bg-slate-800 dark:border-none mt-3">
                        <h2 className="text-2xl font-semibold mb-4">{item.header}</h2>
                        {renderAccordion('Brute Force Approach', item.explanation, item.code, 0)}
                        {renderAccordion('Better Approach', item.explanation2, item.code2, 1)}
                        {renderAccordion('Best Approach', item.explanation3, item.code3, 2)}
                    </div>
                </div>
            </div>


            <div className="pt-[80px] mx-auto max-w-full md:px-[220px] px-4 py-5">
                <h1 className="text-gray-600 mb-10 text-3xl dark:text-white md:text-5xl font-bold text-center">Recent <span className="text-red-500">Content</span></h1>
                <div className=" md:top-20 ">
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-10 ">
                        {items
                            .filter(blogItem => blogItem.id.toString() !== id)
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .slice(0, visibleCount)
                            .map(blogItem => (
                                <div key={blogItem.id} className=" flex-col border border-t md:shadow-sm md:shadow-black/30 lg:flex-row items-center justify-between bg-[rgb(255,255,255)] dark:border-gray-600 group hover:border hover:border-gray-300 rounded-xl dark:bg-slate-900 dark:border rounded-md  cursor-pointer space-y-4 lg:space-y-0 lg:space-x-10">
                                    <div className="flex-1 text-left" onClick={() => handleCardClick(blogItem.id)}>
                                        <h3 className="text-lg font-[500] p-8 pb-0">{blogItem.header}</h3>
                                        <div className=' p-8 pt-0 rounded-xl dark:from-slate-800'>
                                            <p className="text-sm text-gray-700 dark:text-gray-200 mt-2">{truncateText(blogItem.explanation, 100)}</p>

                                            <p className='inline-block rounded-md text-red-500 mt-3 border p-2 border-red-600 group-hover:bg-red-500 group-hover:text-white transition duration-200'>
                                                Read more
                                            </p></div>
                                    </div>
                                </div>


                            ))}
                    </div>
                </div>
                <div className="text-center my-10">
                    <button className="bg-red-500 text-lg text-white shadow-lg hover:shadow-red-500/30 shadow-black/30 py-2 px-4 rounded-lg"><a href='/Technicalblog'>Show More</a></button>
                </div>
            </div>

            <div className="flex justify-center mb-10 ">
                <button className="bg-green-500 text-lg text-white shadow-lg hover:shadow-green-500/30 shadow-black/30 py-5 px-20 rounded-xl">
                    <a href="/Contibuteblog">Contribute a Blog</a>
                </button>
            </div>

            <Footer />
        </>
    );
};

export default BlogDetail;
