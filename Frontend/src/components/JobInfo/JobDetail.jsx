import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Breadcrumb from '../Breadcrumb';
import { baseUrl } from '../../Baseurl';
import Skeleton1 from '../Skeleton';

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState(null);
    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        const getJobData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/jobinfo`);
                const foundItem = res.data.find(item => item.id.toString() === id);
                setItem(foundItem);
                setItems(res.data);
                setLoading(false);
                setMainImage(foundItem?.image1);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        getJobData();
    }, [id]);

    const handleCardClick = (id) => {
        navigate(`/jobdetail/${id}`);
    };

    const renderText = (text) => {
        const parts = text.split(/(<red>|<\/red>|<br\s*\/?>|<bg>|<\/bg>|<li>|<\/li>)/g).filter(Boolean);
        let isred = false;
        let isBg = false;
        let isLi = false;
        let bgContent = [];
        let liContent = [];

        return parts.map((part, index) => {
            if (part === '<red>') {
                isred = true;
                return null;
            } else if (part === '</red>') {
                isred = false;
                return null;
            } else if (part === '<bg>') {
                isBg = true;
                bgContent = [];
                return null;
            } else if (part === '</bg>') {
                isBg = false;
                return (
                    <span key={index} className="inline-block text-red-500 dark:text-white">
                        {bgContent}
                    </span>
                );
            } else if (part === '<li>') {
                isLi = true;
                liContent = [];
                return null;
            } else if (part === '</li>') {
                isLi = false;
                return <li key={index} className="list-disc ml-4 py-1">{liContent}</li>;
            } else if (part.match(/<br\s*\/?>/)) {
                return <br key={index} />;
            } else {
                const content = (
                    <span key={index} className={isred ? "text-black text-xl dark:text-white" : ""}>
                        {part.trim()}
                    </span>
                );
                if (isBg) {
                    bgContent.push(content);
                    return null;
                }
                if (isLi) {
                    liContent.push(content);
                    return null;
                }
                return content;
            }
        }).filter(Boolean);
    };

    const truncateText = (text, length) => {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        }
        return text;
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <Breadcrumb />

                <Skeleton1 />
                <Footer />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <Breadcrumb />

            <div className="mx-auto max-w-screen-xl text-gray-600 dark:text-white md:px-20 px-4 py-5">
                <div className="w-full p-3 sm:p-5 md:p-8 lg:p-10 max-w-[1000px] mx-auto border-t md:shadow-sm md:shadow-black/30  rounded-xl bg-[rgb(255,255,255)] dark:bg-slate-800 dark:border-none mt-3">
                    <h2 className="text-2xl text-center font-semibold mb-4">{item.header}</h2>
                    {mainImage && (
                        <div className="py-5 md:px-10 text-center">
                            <img src={mainImage} alt="Description of main image" className="max-w-full mx-auto" />
                            <div className="mt-5">
                                <span className="text-sm text-red-600">Title: {item.figtitle}</span>
                            </div>
                        </div>
                    )}

                    {['text'].map((key, index) => (
                        item[key] && (
                            <div key={index} className="py-3 text-lg text-justify mt-5 leading-relaxed text-body-color dark:text-dark-6">
                                <h1 className="text-black dark:text-white text-xl mb-2">Introduction:</h1>
                                {renderText(item[key])}
                            </div>
                        )
                    ))}
                    {['statement'].map((key, index) => (
                        item[key] && (
                            <div key={index} className="py-3 text-lg mt-5 text-justify leading-relaxed text-body-color dark:text-dark-6">
                                {renderText(item[key])}
                            </div>
                        )
                    ))}
                    {['substatement1'].map((key, index) => (
                        item[key] && (
                            <div key={index} className="py-3 text-lg mt-5 text-justify leading-relaxed text-body-color dark:text-dark-6">
                                {renderText(item[key])}
                            </div>
                        )
                    ))}


                    {['statement2'].map((key, index) => (
                        item[key] && (
                            <p key={index} className="pt-3 text-lg mt-5 text-justify leading-relaxed text-body-color dark:text-dark-6">
                                {renderText(item[key])}
                            </p>
                        )
                    ))}
                    {['feature'].map((key, index) => (
                        item[key] && (
                            <p key={index} className="text-lg text-justify leading-relaxed text-body-color dark:text-dark-6">
                                {renderText(item[key])}
                            </p>
                        )
                    ))}
                    {['substatement2'].map((key, index) => (
                        item[key] && (
                            <p key={index} className="py-3 text-lg text-justify leading-relaxed text-body-color dark:text-dark-6">
                                {renderText(item[key])}
                            </p>
                        )
                    ))}

                    {['explain'].map((key, index) => (
                        item[key] && (
                            <p key={index} className=" text-lg text-justify leading-relaxed text-body-color dark:text-dark-6">
                                {renderText(item[key])}
                            </p>
                        )
                    ))}

                    {['note'].map((key, index) => (
                        item[key] && (
                            <p key={index} className=" text-lg text-justify leading-relaxed text-body-color dark:text-dark-6">
                                {renderText(item[key])}
                            </p>
                        )
                    ))}
                    <div className='mt-10 text-center flex justify-start space-x-5'>
                        <Link to={item.link1} className='px-2 py-2 bg-red-500 text-sm text-white shadow-lg hover:shadow-red-500/30 shadow-black/30 py-3 px-4 rounded-md'>View Details</Link>

                    </div>
                </div>

                <div className="my-20 mx-auto max-w-screen-lg ">
                    <h1 className="text-gray-600 mb-10 text-3xl dark:text-white md:text-5xl titillium-web-bold text-center">Recent <span className="text-red-500">Jobs</span></h1>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
                        {items
                            .filter(item => item.id !== parseInt(id))
                            .slice(0, visibleCount)
                            .map((Job, index) => (
                                <div
                                    key={index}
                                    className="border-t bg-[#ffffff] flex flex-col min-h-[50vmin] flex-grow border border-gray-300 dark:border-gray-600 dark:border group hover:shadow hover:shadow-black/30 rounded-md cursor-pointer hover:shadow-lg dark:bg-slate-900 dark:text-white"
                                    onClick={() => handleCardClick(Job.id)}
                                >
                                    <img src={Job.image1} alt="Job" className="w-full object-cover h-[25vmin] p-[3vmin] pb-0 rounded-t" />
                                    <div className='flex-grow bg-gradient-to-t from-red-50 to-[#ffffff] p-[3vmin] pt-2 rounded-b-md space-y-3 dark:from-slate-800 '>
                                        <h3 className="mt-2 text-[1.8vmax] md:text-[2.3vmin] font-semibold text-gray-600 dark:text-white">{truncateText(Job.header, 40)}</h3>
                                        <p className="text-gray-500 text-[1.6vmax] md:text-[2vmin] dark:text-gray-400">{truncateText(Job.text, 60)}</p>
                                        <p className='text-red-500 text-[1.6vmax] md:text-[2vmin]'>Read More .. </p></div>
                                </div>
                            ))}
                    </div>
                    {items.filter(item => item.id !== parseInt(id)).length > visibleCount && (
                        <div className="text-center my-5">
                            <button
                                onClick={() => setVisibleCount(visibleCount + 3)}
                                className="bg-red-500 text-white py-2 px-4 mt-5 text-white shadow-lg hover:shadow-red-500/30 shadow-black/30 py-2 px-4 rounded-lg"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default JobDetail;
