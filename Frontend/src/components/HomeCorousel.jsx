import React, { useState, useEffect } from "react";

const images = [
    "./1.png",
    "./2.png",
    "./3.png",
    "./4.png",
    "./5.png",
    "./6.png",
    "./7.png",
    "./8.png",
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000); // Transition every 2 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[180px] sm:h-[180px] md:h-full overflow-hidden border ">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="min-w-full h-[180px] sm:h-[180px] md:h-[510px] bg-cover bg-center"
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default function App() {
    return (
        <>
            <div className="relative flex flex-col justify-center items-center w-full dark:bg-slate-900">
                {/* Description */}
                <div className="text-center mt-5 px-4">
                    <h1
                        className="font-semibold text-3xl pb-2 bg-gradient-to-r from-red-600 via-yellow-600 to-green-500 bg-clip-text text-transparent"
                        id="homecontentcard"
                    >
                        Discover the Amazing Features Waiting for You !
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Explore All the Incredible Features Designed Just for You
                    </p>
                </div>

                {/* Laptop Frame */}
                <div
                    className="relative w-[90%] max-w-[1024px] aspect-[16/9] bg-no-repeat bg-center mt-8"
                    style={{
                        backgroundImage: "url('/framework.png')",
                        backgroundSize: "contain",
                    }}
                >
                    {/* Screen Area */}
                    <div
                        className="absolute inset-[8%] md:inset-[10%] overflow-hidden md:px-1 sm:px-5 pb-2 px-2"
                        style={{
                            width: "full",
                            height: "full",
                        }}
                    >
                        <Carousel />
                    </div>
                </div>
            </div>


        </>
    );
}
