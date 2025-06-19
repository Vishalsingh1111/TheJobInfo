
// import React from 'react';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const resources = [
//     { title: "Popular DSA Sheet", description: "Boost your DSA skills with our handy cheat sheets .", buttonText: "Try it free", icon: "fa-file-alt", link: "/Sheet" },
//     { title: "Programming Languages", description: "Design better systems with our simplified approach.", buttonText: "Try it free", icon: "fa-laptop-code", link: "/Languages" },
//     { title: "Problems Solutions", description: "Dive Deep into Tech Innovation with Our Amazing Solution.", buttonText: "Try it free", icon: "fa-blog", link: "/Technical-Blog" },
//     { title: "CS Fundamentals", description: "Demystify CS topics with our easy-to-understand guides.", buttonText: "Try it free", icon: "fa-book", link: "/CS-Fundamental" },
//     { title: "Contests Solution", description: "Level up your coding with participating in Contests.", buttonText: "Try it free", icon: "fa-pencil-alt", link: "/Contest-Solution" }
// ];

// const iconStyles = {
//     "fa-file-alt": "bg-blue-500 text-white",
//     "fa-laptop-code": "bg-green-500 text-white",
//     "fa-blog": "bg-red-500 text-white",
//     "fa-play-circle": "bg-purple-500 text-white",
//     "fa-book": "bg-orange-500 text-white",
//     "fa-pencil-alt": "bg-pink-500 text-white"
// };

// const ResourceCard = ({ title, description, buttonText, icon, link }) => {
//     const iconBg = iconStyles[icon] || "bg-gray-500 text-white";

//     return (
//         <a href={link} className="block group">
//             <div className={`rounded-lg border border-gray-400 transition-colors dark:border dark:transparent dark:text-white dark:border-gray-400 dark:bg-transparent bg-gray-50`}>
//                 <div className="px-6 pb-5 pt-2 rounded-md bg-transparent">
//                     <div className={`w-[10vmin] h-[10vmin] mt-2 mb-2 flex items-center justify-center ${iconBg} text-[5vmin] rounded-full`}>
//                         <i className={`fas ${icon}`}></i>
//                     </div>
//                     <h2 className="text-[2vmax] md:text-[2.5vmin] titillium-web-semibold text-gray-700 dark:text-white">{title}</h2>
//                     <p className="text-[1.8vmax] md:text-[2vmin] titillium-web-regular text-gray-600 dark:text-white mt-2">{description}</p>
//                     <button className="mt-4 px-[2vmin] py-[1vmin] border text-[1.5vmax] md:text-[2vmin] text-red-500 border-red-400 dark:border-white rounded-md group-hover:shadow-lg group-hover:bg-red-500 group-hover:text-white group-hover:shadow-black/30 group-hover:border-red-500 transition-colors dark:text-white">
//                         {buttonText} &rarr;
//                     </button>
//                 </div>
//             </div>
//         </a>
//     );
// };

// const ResourceGrid = () => (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-l from-white via-white to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
//         <h1 className="text-center text-3xl md:text-4xl font-semibold text-gray-700 dark:text-white mb-10">
//             Courses Offered For Your <span className="text-red-500">Preparation</span>
//         </h1>
//         <div className="max-w-[1200px] container mx-auto mb-10 px-0 md:px-20 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {resources.map((resource, index) => (
//                 <ResourceCard key={index} {...resource} />
//             ))}
//         </div>
//     </div>
// );

// export default ResourceGrid;


import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const resources = [
    {
        title: "Popular DSA Sheet",
        description: "Boost your DSA skills with our handy cheat sheets.",
        buttonText: "Try it free",
        icon: "fa-file-alt",
        link: "/Sheet",
        tag: "Trending",
        tagColor: "bg-red-500"
    },
    {
        title: "Programming Languages",
        description: "Design better systems with our simplified approach.",
        buttonText: "Try it free",
        icon: "fa-laptop-code",
        link: "/Languages",
        tag: "Hot",
        tagColor: "bg-green-500"
    },
    {
        title: "Problems Solutions",
        description: "Dive Deep into Tech Innovation with Our Amazing Solution.",
        buttonText: "Try it free",
        icon: "fa-blog",
        link: "/Technical-Blog",
        tag: "New",
        tagColor: "bg-yellow-400"
    },
    {
        title: "CS Fundamentals",
        description: "Demystify CS topics with our easy-to-understand guides.",
        buttonText: "Try it free",
        icon: "fa-book",
        link: "/CS-Fundamental",
        tag: "Top",
        tagColor: "bg-blue-500"
    },
    {
        title: "Contests Solution",
        description: "Level up your coding with participating in Contests.",
        buttonText: "Try it free",
        icon: "fa-pencil-alt",
        link: "/Contest-Solution",
        tag: "Trending",
        tagColor: "bg-red-500"
    }
];

const iconStyles = {
    "fa-file-alt": "bg-blue-500 text-white",
    "fa-laptop-code": "bg-green-500 text-white",
    "fa-blog": "bg-red-500 text-white",
    "fa-play-circle": "bg-purple-500 text-white",
    "fa-book": "bg-orange-500 text-white",
    "fa-pencil-alt": "bg-pink-500 text-white"
};

const ResourceCard = ({ title, description, buttonText, icon, link, tag, tagColor }) => {
    const iconBg = iconStyles[icon] || "bg-gray-500 text-white";

    return (
        <a href={link} className="block group relative">
            {/* Top Label */}
            <span className={`absolute top-5 right-3 px-2 py-1 text-[1.5vmax] md:text-[2vmin] titillium-web text-white rounded-md ${tagColor} z-10`}>
                {tag}
            </span>

            <div className="rounded-lg border border-gray-400 transition-colors dark:border dark:transparent dark:text-white dark:border-gray-400 dark:bg-transparent bg-gray-50">
                <div className="px-6 pb-5 pt-2 rounded-md bg-transparent">
                    <div className={`w-[10vmin] h-[10vmin] mt-2 mb-2 flex items-center justify-center ${iconBg} text-[5vmin] rounded-full`}>
                        <i className={`fas ${icon}`}></i>
                    </div>
                    <h2 className="text-[2vmax] md:text-[2.5vmin] titillium-web-semibold text-gray-700 dark:text-white">{title}</h2>
                    <p className="text-[1.8vmax] md:text-[2vmin] titillium-web-regular text-gray-600 dark:text-white mt-2">{description}</p>
                    <button className="mt-4 px-[2vmin] py-[1vmin] border text-[1.5vmax] md:text-[2vmin] text-red-500 border-red-400 dark:border-white rounded-md group-hover:shadow-lg group-hover:bg-red-500 group-hover:text-white group-hover:shadow-black/30 group-hover:border-red-500 transition-colors dark:text-white">
                        {buttonText} &rarr;
                    </button>
                </div>
            </div>
        </a>
    );
};

const ResourceGrid = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-l from-white via-white to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
        <h1 className="text-center text-3xl md:text-4xl font-semibold text-gray-700 dark:text-white mb-10">
            Courses Offered For Your <span className="text-red-500">Preparation</span>
        </h1>
        <div className="max-w-[1200px] container mx-auto mb-10 px-0 md:px-20 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
                <ResourceCard key={index} {...resource} />
            ))}
        </div>
    </div>
);

export default ResourceGrid;
