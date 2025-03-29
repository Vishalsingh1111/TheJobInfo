import React from 'react';

const truncateText = (text, length) => {
    if (text.length > length) {
        return text.substring(0, length) + '...';
    }
    return text;
};

const Projectcard = ({ item, onClick }) => {
    return (
        <div className='mx-auto max-w-screen-lg'>
            <div onClick={onClick}>
                <div className="flex flex-col flex-grow border-2 bg-transparent dark:border-2 min-h-[45vmin] border border-gray-300 group dark:border-gray-600 hover:shadow hover:shadow-black/30 rounded-md cursor-pointer hover:shadow-lg space-y-2 dark:transparent dark:text-white">
                    <img src={item.image1} alt="Project" className="w-full h-[25vmin] object-cover p-[3vmin] pb-0 rounded-t" />
                    <div className='flex flex-grow flex-col bg-transparent p-[3vmin] pt-0 rounded-md space-y-1'>
                        <h3 className="mt-2 text-[1.8vmax] md:text-[2.3vmin] text-gray-600 dark:text-white font-semibold">{truncateText(item.header, 40)}</h3>
                        <p className="text-gray-500 text-[1.6vmax] md:text-[2vmin] dark:text-gray-400">{truncateText(item.text, 60)}</p>
                        <p className='text-red-500 text-[1.6vmax] md:text-[2vmin]'>Read More ..</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projectcard;
