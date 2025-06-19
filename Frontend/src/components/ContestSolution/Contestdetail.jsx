

import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import CodeSnippet from "../CodeSnippet/CodeSnippet";
import Navbar from '../Navbar';
import Footer from '../Footer';
import Breadcrumb from '../Breadcrumb';
import { baseUrl } from '../../Baseurl';
import Skeleton1 from '../Skeleton';
import SocialMediaPoster from '../SocialMediaPoster';

const ContestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [thumbsUpCount, setThumbsUpCount] = useState(0);
    const [thumbsDownCount, setThumbsDownCount] = useState(0);
    const [visibleCount, setVisibleCount] = useState(4);
    const [showCodes, setShowCodes] = useState({ showCode1: false, showCode2: false, showCode3: false, showCode4: false, showCode5: false });

    useEffect(() => {
        const getContestData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/contestsol`);
                const foundItem = res.data.find(item => item.id.toString() === id);
                setItem(foundItem);
                setItems(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        getContestData();
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

    const toggleCode = (codeKey) => {
        setShowCodes(prevState => ({ ...prevState, [codeKey]: !prevState[codeKey] }));
    };

    const increaseThumbsUp = () => setThumbsUpCount(thumbsUpCount + 1);
    const increaseThumbsDown = () => setThumbsDownCount(thumbsDownCount + 1);

    const renderText = (text) => {
        const parts = text.split(/(<b>|<\/b>|<br\s*\/?>)/g).filter(Boolean);

        let isBold = false;

        return parts.map((part, index) => {
            if (part === '<b>') {
                isBold = true;
                return null;
            } else if (part === '</b>') {
                isBold = false;
                return null;
            } else if (part.match(/<br\s*\/?>/)) {
                return <br key={index} />;
            } else {
                return (
                    <span key={index} className={isBold ? 'font-bold' : ''}>
                        {part}
                    </span>
                );
            }
        });
    };

    return (
        <>
            <Navbar />
            <Breadcrumb />
            <div className=" mx-auto max-w-screen-2xl md:px-20 px-4 mb-10">

                <div className="flex items-center justify-center py-10">
                    <h2 className="text-5xl text-red-500 font-bold mb-4 sm:mb-0">{item.header}</h2>
                </div>

                <div className='flex flex-col md:flex-row'>
                    <div className="w-full p-2 md:p-6 border rounded mx-auto bg-gray-50 dark:bg-slate-800 mt-3">

                        <div className="flex flex-col items-left bg-gray-300 p-5 mb-5 border-l-2 border-l-red-500 dark:bg-slate-700">
                            <h2 className="text-xl text-red-500 font-semibold item-left mb-2">Disclaimer !</h2>
                            <p className="text-lg">Do it yourself, This is only for reference. Don't Copy & Paste.</p>
                        </div>



                        {/* Explanation 1 */}
                        {item.explanation && (
                            <div className="mt-4">
                                <span className="text-xl dark:text-white mb-2 font-semibold text-gray-600">Problem Statements:1</span>
                                <div className="ml-4 mt-2">
                                    {item.explanation.split('\n').map((line, index) => (
                                        <div key={index}>{renderText(line.trim())}</div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Code 1 */}
                        {item.code && (
                            <div className="my-5 mx-auto text-left">
                                <button
                                    onClick={() => toggleCode('showCode1')}
                                    className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                >
                                    {showCodes.showCode1 ? "Hide Code" : "Show Code"}
                                </button>
                                {showCodes.showCode1 && <CodeSnippet codeString={item.code} />}
                            </div>
                        )}

                        {/* Repeat similar structures for other explanations and codes */}
                        {[2, 3, 4, 5].map((i) => (
                            <>
                                {item[`explanation${i}`] && (
                                    <div className="mt-4" key={`explanation-${i}`}>
                                        <span className="text-xl dark:text-white font-semibold text-gray-600">Problem Statement {i}:</span>
                                        <div className="ml-4">
                                            {item[`explanation${i}`].split('\n').map((line, index) => (
                                                <div className="text-md" key={index}>{renderText(line.trim())}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {item[`code${i}`] && (
                                    <div className="my-5 mx-auto text-left" key={`code-${i}`}>
                                        <button
                                            onClick={() => toggleCode(`showCode${i}`)}
                                            className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                        >
                                            {showCodes[`showCode${i}`] ? "Hide Code" : "Show Code"}
                                        </button>
                                        {showCodes[`showCode${i}`] && <CodeSnippet codeString={item[`code${i}`]} />}
                                    </div>
                                )}
                            </>
                        ))}

                        <div className=' lg:space-x-8 flex flex-col lg:flex-row mt-10 mx-auto justify-left'>
                            <iframe
                                width="650"
                                height="400"
                                src={item.image}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="YouTube Video"
                                className='p-8 mb-5 dark:bg-slate-700 dark:border-none bg-[rgb(255,255,255)] border-t shadow shadow-black/40 rounded-lg'
                            ></iframe>
                        </div>

                        <div className="flex mt-4 items-center text-xl">
                            <button onClick={increaseThumbsUp} className="flex items-center text-gray-700 dark:text-gray-300 mr-4">
                                <FaThumbsUp className="mr-1 text-blue-500" /> {thumbsUpCount}
                            </button>
                            <button onClick={increaseThumbsDown} className="flex items-center text-gray-700 dark:text-gray-300">
                                <FaThumbsDown className="mr-1 text-red-500" /> {thumbsDownCount}
                            </button>
                            {/* Share Buttons */}
                            <div className="flex items-center pl-5 text-md">

                                {/* WhatsApp */}
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(item.header + " - " + window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-500 hover:text-green-600"
                                    title="Share on WhatsApp"
                                >
                                    <FaWhatsapp size={24} />
                                </a>
                            </div>

                        </div>
                    </div>
                    <div>
                        <SocialMediaPoster />
                    </div>


                </div>

            </div>
            <Footer />
        </>
    );
};

export default ContestDetail;
