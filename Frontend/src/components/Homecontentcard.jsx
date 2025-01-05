import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const resources = [
    {
        title: "Updated DSA Sheet",
        description: "Boost your DSA skills with our handy cheat sheets.",
        buttonText: "Try it free",
        icon: "fa-file-alt",
        link: "/Sheet",
    },
    {
        title: "Programing Languages",
        description: "Design better systems with our simplified approach.",
        buttonText: "Try it free",
        icon: "fa-laptop-code",
        link: "/Languages",
    },
    {
        title: "Blogs",
        description: "Dive Deep into Tech Innovation with Our Engaging Blogs.",
        buttonText: "Try it free",
        icon: "fa-blog",
        link: "/Technical-Blog",
    },
    {
        title: "Project's Basket",
        description: "Master algorithms effortlessly with our curated DSA playlist.",
        buttonText: "Watch Now",
        icon: "fa-play-circle",
        link: "/Project",
    },
    {
        title: "CS Fundamental",
        description: "Demystify CS topics with our easy-to-understand guides.",
        buttonText: "Try it free",
        icon: "fa-book",
        link: "/CS-Fundamental",
    },
    {
        title: "Contests Solution",
        description: "Level up your coding with participating in Contests.",
        buttonText: "Try it free",
        icon: "fa-pencil-alt",
        link: "/Contest-Solution",
    },
];

// Define background colors for each icon
const iconBackgroundColors = {
    "fa-file-alt": "bg-blue-100 text-blue-500 border-blue-300",
    "fa-laptop-code": "bg-green-100 text-green-500 border-green-400",
    "fa-blog": "bg-red-100 text-red-500 border-red-300",
    "fa-play-circle": "bg-purple-100 text-purple-500 border-purple-300",
    "fa-book": "bg-orange-100 text-orange-500 border-orange-300",
    "fa-pencil-alt": "bg-pink-100 text-pink-500 border-pink-300",
    default: "bg-red-100"
};

const ResourceCard = ({ title, description, buttonText, icon, link }) => {
    // Get the background color for the current icon
    const bgColor = iconBackgroundColors[icon] || iconBackgroundColors.default;

    return (
        <a href={link} className="block group">
            <div className="bg-[#ffffff] rounded-lg border-t shadow-sm shadow-black/30 group transition-colors dark:bg-slate-900 dark:text-white dark:border dark:border-gray-600">
                <div className={`w-[95px] h-[90px] rounded-lg m-6 mb-0 flex items-center border justify-center ${bgColor}  text-5xl dark:bg-slate-700`}>
                    <i className={`fas ${icon} `}></i>
                </div>
                <div className=' p-6 pt-1 bg-gradient-to-t from-[#ffffff] to-[#ffffff] rounded-md dark:from-slate-800'>
                    <h2 className="mt-4 text-xl font-semibold text-[#484B54] dark:text-white">{title}</h2>
                    <p className="mt-2 text-sm text-[#484B54] dark:text-white">{description}</p>
                    <button className="mt-4 px-4 py-2 border text-red-500 border-red-400 dark:border-white rounded-md group-hover:shadow-lg group-hover:bg-red-500 group-hover:text-white group-hover:shadow-black/30 group-hover:border-red-500 transition-colors dark:text-white">
                        {buttonText} &rarr;
                    </button>
                </div>
            </div>
        </a>
    );
};

const ResourceGrid = () => (
    <div className="p-6 max-w-[1270px] container mx-auto md:px-20 px-4">
        <div className="pb-10 text-center">
            <h1 className="font-[600] dark:text-white text-4xl pb-2" id='homecontentcard'>Free Offered Courses</h1>
            <p>We cover a wide range of programming languages including but not limited to Python, Java, C, C++, DSA etc. Our notes are designed to cater to both beginners and advanced users.</p>
        </div>
        <div className="max-w-screen-xl container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                    <ResourceCard key={index} {...resource} />
                ))}
            </div>
        </div>
    </div>
);

export default ResourceGrid;
