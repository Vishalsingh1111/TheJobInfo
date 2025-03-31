import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import avatar1 from '/avatar.avif';
import avatar2 from '/avatar1.avif';
import avatar3 from '/avatar2.avif';

const ContactSection = () => {
    return (

        <section className="pb-20 text-center mx-5 pt-10 bg-gradient-to-l dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ">
            <div className="container mx-auto p-8 lg:max-w-[80%] md:max-w-[80%]  rounded-lg">
                <div className="flex justify-center mb-4">

                    <img
                        className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 -ml-4 first:ml-0"
                        src={avatar1}
                        alt="Avatar 1"
                    />
                    <img
                        className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 -ml-4"
                        src={avatar2}
                        alt="Avatar 2"
                    />
                    <img
                        className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 -ml-4"
                        src={avatar3}
                        alt="Avatar 3"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-red-500 dark:text-white mb-2">Do You Have Any Question?</h2>
                <p className="text-gray-600 titillium-web-regular dark:text-white mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                <a href="/Contact" className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-red-500/30 shadow-black/30 transition duration-300">
                    Get in Touch
                </a>
            </div>
        </section>
    );
};

export default ContactSection;
