import React from 'react';
import SearchForm from './Searchbar';
import { motion } from 'framer-motion';

function Banner() {
    return (
        <>
            <div className="relative  dark:bg-slate-900 pb-[70px] bg-gradient-to-b from-white via-red-50 to-gray-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">

                <div className="absolute inset-0 bg-transparent mt-[90px]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(96, 96, 96, 0.15) 1px, transparent 1px), linear-gradient(to right, rgba(96, 96, 96, 0.15) 1px, transparent 1px)",
                        backgroundSize: "110px 110px",
                        backgroundPosition: "0 -25px, 0 0",
                        clipPath: "inset(1px 1px 1px 1px)"
                    }}
                ></div>


                <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col items-center mb-5 dark:text-white relative z-100'>
                    <motion.div
                        className='w-full md:w-4/5 mt-0 text-center'
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className='bg-gradient-to-b from-white via-red-50 to-gray-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 dark:bg-slate-900 rounded-[1000px] px-10 '>
                            <div className='pt-[90px] mx-4 relative z-10 pb-10'><SearchForm /></div>
                            <h1 className='text-5xl text-gray-700 dark:text-white lg:text-[10vmin] pb-10 pt-5 font-[700]'>
                                <span className='text-red-500'>Gear Up For Success:</span><br />
                                Your Ultimate <span className=''>Preparation Hub!</span>
                            </h1>
                            <p className='text-lg titillium-web-regular text-gray-700 dark:text-white'>
                                Simplify complex concepts with our detailed programming notes and ace your interviews with expert-curated questions.
                                Master DSA through comprehensive sheets and hands-on projects, ensuring we meet your learning needs.
                            </p>
                            <motion.a href='#homecontentcard' whileHover={{ scale: 1.1 }}>

                                <button className="border border-red-500 py-3 rounded-md text-white mb-10 px-6 mt-10 group bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30">
                                    Get Started &rarr;
                                </button>

                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

export default Banner;
