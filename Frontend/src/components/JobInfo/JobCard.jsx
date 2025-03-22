// import React from 'react';

// const truncateText = (text, length) => {
//     if (text.length > length) {
//         return text.substring(0, length) + '...';
//     }
//     return text;
// };

// const Jobcard = ({ item, onClick }) => {
//     return (
//         <div className='mx-auto max-w-screen-lg'>
//             <div onClick={onClick}>
//                 <div className="h-full flex flex-col flex-grow border-t bg-[#ffffff] dark:border  border border-gray-300 group dark:border-gray-600 hover:shadow hover:shadow-black/30 rounded-md cursor-pointer hover:shadow-lg space-y-2 dark:bg-slate-900 dark:text-white">
//                     <img src={item.image1} alt="JobCard" className="w-full h-48 object-cover p-6 pb-0 rounded-t" />
//                     <div className='flex flex-grow flex-col bg-gradient-to-t from-[#ffffff] to-[#ffffff] p-6 pt-2 rounded-md space-y-3 dark:from-slate-800'>
//                         <h3 className="mt-2 text-xl">{truncateText(item.header, 40)}</h3>
//                         <p className="text-red-500 dark:text-gray-400">{truncateText(item.text, 60)}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Jobcard;


import React from 'react';

const truncateText = (text, length) => {
    if (text.length > length) {
        return text.substring(0, length) + '...';
    }
    return text;
};

const Jobcard = ({ item, onClick }) => {
    return (
        <div className='mx-auto max-w-[1250px]'>
            <div onClick={onClick}>
                <div className="flex flex-col flex-grow bg-white dark:border border-2 border-gray-300 group dark:border-gray-600 hover:shadow-lg hover:shadow-black/30 rounded-md cursor-pointer space-y-2 dark:bg-slate-900 dark:text-white transition-transform duration-300 hover:-translate-y-1">
                    <img src={item.image1} alt="JobCard" className="w-full h-[25vmin] object-cover p-[2vmin] pb-0 " />
                    <div className='flex flex-grow flex-col bg-gradient-to-t from-white to-white p-[3vmin] pt-[1vmin] rounded-md space-y-3 dark:from-slate-800'>
                        <h3 className="mt-[1vmin] text-[1.8vmax] md:text-[2.3vmin] font-semibold text-gray-600 dark:text-white">{truncateText(item.header, 40)}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-[1.6vmax] md:text-[2vmin]">{truncateText(item.text, 60)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobcard;
