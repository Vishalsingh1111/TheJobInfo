import React from 'react';

// Function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
};

const Contestcard = ({ item, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="relative bg-gray-50 px-2 md:px-5 py-5 border border-gray-400 group rounded-md flex flex-col dark:border-gray-400 dark:border dark:bg-transparent dark:text-white cursor-pointer hover:shadow hover:shadow-black/10 hover:shadow-lg"
        >
            <div className="content flex flex-col m-auto">
                <h3 className="text-sm md:text-md font-[400] text-red-400 pb-2">
                    <h2>Live Updates</h2>
                </h3>

                <h3 className="text-md md:text-xl font-semibold text-gray-600 dark:text-white">
                    {item.header}
                </h3>

                <h3 className="text-sm md:text-md font-[400] text-gray-500 py-2">
                    <h2>{item.createdAt ? formatDate(item.createdAt) : "Date not available"}</h2>
                </h3>

                <div className="flex justify-start mt-2">
                    <a
                        className=" bg-green-600 text-sm md:text-md text-white inline-block border px-2 py-1.5 rounded-lg border-green-600 group-hover:shadow-lg group-hover:shadow-black/30 transition-all duration-300"
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
