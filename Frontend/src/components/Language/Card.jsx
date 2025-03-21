import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Card = ({ item }) => {


    return (
        <a href={item.link} className="block group">
            <div className="bg-white rounded-lg border-2 transition-colors dark:border-2 dark:bg-slate-900 dark:text-white dark:border-gray-600">
                <div className="px-[3vmin] pt-2 bg-gradient-to-t rounded-md dark:from-slate-800">
                    <div className={`w-[12vmin] h-[11vmin] mt-2 mb-3 p-[1.5vmin] flex items-center justify-center border-gray-300 border text-[5vmin] rounded-xl dark:bg-slate-700`}>
                        <img src={item.image} alt="Course Img" className="w-full h-auto" />
                    </div>
                    <h2 className="text-[2.5vmin] titillium-web-semibold text-gray-600 dark:text-white">{item.name}</h2>
                    <p className="text-[2vmin] titillium-web-regular dark:text-white mt-2">{item.title}</p>
                    <div className='flex justify-between pb-[3vmin]'>
                        <button className="mt-4 px-[2vmin] py-[1vmin] border text-[2vmin] text-red-500 border-red-400 dark:border-white rounded-md group-hover:shadow-lg group-hover:bg-red-500 group-hover:text-white group-hover:shadow-black/30 group-hover:border-red-500 transition-colors dark:text-white">
                            Click to Open &rarr;
                        </button>
                        {/* Show category only if it is 'Free' */}
                        {item.category === 'Free' && (
                            <div className="badge rounded-md px-[2vmin] text-[2vmin] py-[2.5vmin] text-white bg-green-500 mt-4">
                                {item.category}
                            </div>
                        )}
                        {/* Show price only if category is not 'Free' */}
                        {item.category !== 'Free' && (
                            <div className="badge rounded-md bg-red-500 text-[2vmin] text-white px-[1vmin] py-[2.5vmin] mt-4 dark:bg-red-800">
                                Price: ${item.price}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </a>
    );
};

export default Card;
