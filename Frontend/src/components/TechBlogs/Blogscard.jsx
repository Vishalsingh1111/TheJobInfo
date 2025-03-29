import React from 'react';

// Truncate text function
const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
};

const Blogcard = ({ item, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="relative border-2 border-gray-300 group rounded-md bg-transparent min-h-[130px] m-5 flex flex-col w-full md:w-[350px] dark:border-gray-600 dark:border-2 dark:bg-transparent dark:text-white cursor-pointer"
        >
            <div className="content flex flex-col flex-grow">
                <h3 className="text-lg font-[500] text-black dark:text-white p-5 pb-2">
                    {item.header}
                </h3>
                <div className="flex-grow p-5 pt-0 bg-transparent rounded-md ">
                    <p className="text-sm text-gray-600 dark:text-white">
                        {truncateText(item.explanation, 70)}
                    </p>
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
        </div>

    );
};

export default Blogcard;
