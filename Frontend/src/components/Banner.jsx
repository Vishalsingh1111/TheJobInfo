import React from 'react';
import SearchForm from './Searchbar';
import { motion } from 'framer-motion';

function Banner() {
    return (
        <div className="relative min-h-screen md:py-0 py-20 flex flex-col items-center justify-center bg-gradient-to-l from-white via-gray-100 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden text-center px-6">
            {/* Animated Background Waves */}
            <motion.div
                className="absolute w-full h-full opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}

            ></motion.div>

            <motion.div
                className="relative z-10 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <SearchForm />
                <motion.h1
                    className="text-6xl md:text-8xl font-bold text-gray-800 dark:text-white mt-6"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <span className="text-red-500">Gear Up For Success:</span><br />
                    <span className="text-gray-700 dark:text-white">Your Ultimate </span><span className="text-gray-700 dark:text-white">Preparation Hub!</span>
                </motion.h1>
                <motion.p
                    className="text-xl text-gray-700 dark:text-gray-300 mt-6 px-4 md:px-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                >
                    Simplify complex concepts with our detailed programming notes and ace your interviews with expert-curated questions.
                    Master DSA through comprehensive sheets and hands-on projects, ensuring we meet your learning needs.
                </motion.p>
                <motion.a
                    href="#homecontentcard"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block mt-10"
                >
                    <motion.button
                        className="bg-red-500 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-red-500/50 transition-all"
                        whileHover={{ scale: 1.2 }}
                    >
                        Get Started &rarr;
                    </motion.button>
                </motion.a>
            </motion.div>
        </div>
    );
}

export default Banner;
