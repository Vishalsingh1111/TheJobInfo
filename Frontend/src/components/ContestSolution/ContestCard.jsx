import React from 'react';

// Truncate text function
const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
};

const Contestcard = ({ item, onClick }) => {
    return (

        <div
            onClick={onClick}
            className="relative bg-transparent border-2 border-gray-300 group rounded-md min-h-[200px] m-5 flex flex-col w-full md:w-[350px] dark:border-gray-600 dark:border-2 dark:bg-transparent dark:text-white cursor-pointer hover:shadow hover:shadow-black/30 hover:shadow-lg"
        >
            <div className="content flex flex-col m-auto px-3">

                <h3 className="text-lg font-[400] text-red-500 pb-2">
                    <h2>Live Updates</h2>
                </h3>

                <h3 className="text-2xl font-[600] text-gray-600 dark:text-white">
                    {item.header}
                </h3>

                <div className="flex justify-start mt-4">
                    <a
                        className="text-red-500 inline-block border p-2 rounded-lg border-red-500 group-hover:shadow-lg group-hover:bg-red-500 group-hover:text-white group-hover:shadow-black/30 group-hover:border-red-500 transition-all duration-300"
                        href="#"
                    >
                        Click to open
                    </a>
                </div>
            </div>

        </div>

    );
};

export default Contestcard;
