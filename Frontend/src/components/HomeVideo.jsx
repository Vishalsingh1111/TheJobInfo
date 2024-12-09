import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Baseurl";

function HomeVideo() {
    const [videos, setVideos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getContestData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/contestsol`);
                if (res.data && res.data.length > 0) {
                    setVideos(res.data);
                } else {
                    console.error("No data available");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        getContestData();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + videos.length) % videos.length
        );
    };

    return (
        <div className="relative mt-10 lg:mt-20 px-4 mb-20 justify-center items-center">
            <div className="pb-10 text-center">
                <h1
                    className="font-semibold dark:text-white text-4xl pb-2"
                    id="homecontentcard"
                >
                    Get Free Youtube Tutorial Video
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Get free YouTube video tutorials of Codes and Problems
                </p>
            </div>

            <div className="relative w-full flex justify-center items-center">
                {/* Left Button */}
                <button
                    onClick={handlePrev}
                    className="absolute left-1 lg:left-64 top-1/2 transform -translate-y-1/2 bg-[#ffffff] dark:bg-slate-300 rounded-full"
                >
                    <img
                        src="left.png"
                        alt="Previous"
                        className="md:w-[60px] w-10 md:h-[60px] h-10 cursor-pointer hover:opacity-80"
                    />
                </button>

                {/* Video */}
                {loading ? (
                    <iframe
                        width="100%"
                        height="auto"
                        src="https://www.youtube.com/embed/i2M87L2U028"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube Project Tutorial"
                        aria-label="YouTube Project Tutorial Video"
                        className="w-full lg:w-[600px] h-[240px] lg:h-[380px] p-5 lg:p-8 mb-5 dark:bg-slate-800 dark:border-gray-600 bg-white dark:border shadow shadow-black/40 rounded-lg"
                    ></iframe>
                ) : videos.length > 0 ? (
                    <iframe
                        width="100%"
                        height="auto"
                        src={videos[currentIndex].image}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube Project Tutorial"
                        aria-label="YouTube Project Tutorial Video"
                        className="w-full lg:w-[600px] h-[240px] lg:h-[380px] p-5 lg:p-8 mb-5 dark:bg-slate-800 dark:border-gray-600 bg-white dark:border shadow shadow-black/40 rounded-lg"
                    ></iframe>
                ) : (
                    <p className="text-red-500">No video available.</p>
                )}

                {/* Right Button */}
                <button
                    onClick={handleNext}
                    className="absolute right-1 lg:right-64 top-1/2 transform -translate-y-1/2 bg-[#ffffff] dark:bg-slate-300 rounded-full"
                >
                    <img
                        src="right.png"
                        alt="Next"
                        className="md:w-[60px] w-10 md:h-[60px] h-10  cursor-pointer hover:opacity-80"
                    />
                </button>
            </div>
        </div>
    );
}

export default HomeVideo;
