import React from 'react';
import Navbar from "../Navbar";
import Breadcrumb from "../Common/Breadcrumb";
import Footer from "../Footer";

// Sample data for one resource
const resource = {
    title: "TCS Preparation Sheet",
    description: "Get all Content for Interview and Training of TCS.",
    buttonText: "Try it free",
    image: "https://pimwp.s3-accelerate.amazonaws.com/2025/02/Untitled-design-22.png", // Replace with your image URL
    link: "/TCS",

};

const ResourceCard = ({ title, description, buttonText, image, link }) => {
    return (
        <a href={link} className="group block relative w-full">


            <div className="flex flex-col md:flex-col items-center justify-between border border-gray-300 rounded-lg overflow-hidden shadow-md dark:border-gray-600 dark:bg-slate-800 bg-white">
                {/* Right: Image */}
                <div className="w-full">
                    <img
                        src={image}
                        alt={title}
                        className="object-cover w-full h-full max-h-[300px]"
                    />
                </div>

                {/* Left: Text */}
                <div className="p-6 flex-1">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-base mb-4">{description}</p>
                    <button className="px-4 py-2 border border-red-400 text-red-500 dark:text-white dark:border-white rounded hover:bg-red-500 hover:text-white transition">
                        {buttonText} &rarr;
                    </button>
                </div>


            </div>
        </a>
    );
};

function CompaniesPrepartionMain() {
    return (
        <>
            <Navbar />
            <Breadcrumb />
            <section className="flex flex-col m-2 md:ml-20 md:mt-10 items-left justify-left min-h-screen bg-gradient-to-l from-white via-white to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
                <div className="max-w-[300px] w-full">
                    <ResourceCard {...resource} />
                </div>
            </section>

            <Footer />
        </>
    );
}

export default CompaniesPrepartionMain;
