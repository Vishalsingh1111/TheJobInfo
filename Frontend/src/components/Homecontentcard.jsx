import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const resources = [
    { title: "Updated DSA Sheet", description: "Boost your DSA skills with our handy cheat sheets according to your choice.", buttonText: "Try it free", icon: "fa-file-alt", link: "/Sheet" },
    { title: "Programming Languages", description: "Design better systems with our simplified approach.", buttonText: "Try it free", icon: "fa-laptop-code", link: "/Languages" },
    { title: "Blogs", description: "Dive Deep into Tech Innovation with Our Engaging Blogs.", buttonText: "Try it free", icon: "fa-blog", link: "/Technical-Blog" },
    { title: "Project's Basket", description: "Master algorithms effortlessly with our curated DSA playlist.", buttonText: "Watch Now", icon: "fa-play-circle", link: "/Project" },
    { title: "CS Fundamentals", description: "Demystify CS topics with our easy-to-understand guides.", buttonText: "Try it free", icon: "fa-book", link: "/CS-Fundamental" },
    { title: "Contests Solution", description: "Level up your coding with participating in Contests.", buttonText: "Try it free", icon: "fa-pencil-alt", link: "/Contest-Solution" }
];

const iconStyles = {
    "fa-file-alt": "bg-blue-50 text-blue-500 border-blue-300",
    "fa-laptop-code": "bg-green-50 text-green-500 border-green-400",
    "fa-blog": "bg-red-50 text-red-500 border-red-300",
    "fa-play-circle": "bg-purple-50 text-purple-500 border-purple-300",
    "fa-book": "bg-orange-50 text-orange-500 border-orange-300",
    "fa-pencil-alt": "bg-pink-50 text-pink-500 border-pink-300"
};

const ResourceCard = ({ title, description, buttonText, icon, link }) => {
    const bgColor = iconStyles[icon] || "bg-gray-100";

    return (
        <a href={link} className="block group">
            <div className={`rounded-lg border transition-colors dark:border-2 dark:transparent dark:text-white dark:border-gray-600 dark:bg-transparent ${bgColor}`}>
                <div className="px-4 pb-5 pt-2 rounded-md bg-transparent">
                    <div className={`w-[10vmin] h-[9vmin] mt-2 mb-3 flex items-center justify-center ${bgColor} border text-[5vmin] rounded-lg dark:bg-transparent`}>
                        <i className={`fas ${icon}`}></i>
                    </div>
                    <h2 className="text-[2vmax] md:text-[2.5vmin] titillium-web-semibold text-gray-700 dark:text-white">{title}</h2>
                    <p className="text-[1.8vmax] md:text-[2vmin] titillium-web-regular text-gray-600  dark:text-white mt-2">{description}</p>
                    <button className="mt-4 px-[2vmin] py-[1vmin] border text-[1.5vmax] md:text-[2vmin] text-red-500 border-red-400 dark:border-white rounded-md group-hover:shadow-lg group-hover:bg-red-500 group-hover:text-white group-hover:shadow-black/30 group-hover:border-red-500 transition-colors dark:text-white">
                        {buttonText} &rarr;
                    </button>
                </div>
            </div>
        </a>
    );
};

const ResourceGrid = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-l from-white via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
        <h1 className="text-center text-3xl md:text-4xl font-semibold text-gray-700 dark:text-white mb-10">
            Courses Offered For Your <span className="text-red-500">Preparation</span>
        </h1>
        <div className="max-w-screen-lg w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
                <ResourceCard key={index} {...resource} />
            ))}
        </div>
    </div>
);

export default ResourceGrid;
