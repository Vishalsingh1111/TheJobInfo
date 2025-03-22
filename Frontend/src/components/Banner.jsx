import React from 'react';
import SearchForm from './Searchbar';
import { motion } from 'framer-motion';

function Banner() {
    return (
        <>
            <div className='bg-gradient-to-b from-white via-red-100 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 '>
                <div className='pt-[80px] mx-4'><SearchForm /></div>

                <div className='max-w-screen-2xl  container mx-auto md:px-20 px-4 flex flex-col items-center mb-5 dark:bg-slate-900 dark:text-white'>
                    <motion.div
                        className='w-full md:w-4/5 mt-10 text-center space-y-10'
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className='text-5xl text-gray-700 dark:text-white lg:text-[11vmin] pt-5 font-[700]'> <span className='text-red-500'>Gear Up For Success:</span><br />Your Ultimate <span className=''>Preparation Hub!</span></h1>
                        <p className='text-lg titillium-web-regular text-gray-600 dark:text-white'>Simplify complex concepts with our detailed programming notes and ace your interviews with expert-curated questions. Master DSA through comprehensive sheets and hands-on projects, ensuring we meet your learning needs.</p>
                        <motion.a href='#homecontentcard' whileHover={{ scale: 1.1 }}>
                            <button className="border border-red-500 py-2 rounded-md text-white mb-10 px-4 mt-6 group bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30">
                                Get Started &rarr;
                            </button>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

export default Banner;

