import React, { useState } from "react";

const Accordion = () => {
    return (
        <section className="max-w-5xl container mx-auto md:px-20 px-4 relative z-20 overflow-hidden bg-transparent pb-4 dark:bg-slate-900 dark:text-white lg:pb-[30px] lg:pt-[20px] text-center ">
            <div className="container mx-auto mt-10">
                <div className="-mx-4 flex flex-wrap justify-center">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-8 max-w-auto text-center lg:mb-8">
                            <h2 className="mb-4 text-3xl font-[600] bg-gradient-to-r from-red-600 via-yellow-600 to-green-500 bg-clip-text text-transparent">
                                Got Questions? Find Your Answers Here !
                            </h2>
                            <p>Curated from What Our Users Ask the Most</p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto text-left">
                    <div className="w-full px-4 max-w-[1050px] mx-auto">
                        <AccordionItem
                            header="What types of programming languages do you cover?"
                            text="We cover a wide range of programming languages including but not limited to Python, Java, C, C++, DSA etc. Our notes are designed to cater to both beginners and advanced users, providing comprehensive insights and practical examples."
                        />
                        <AccordionItem
                            header="How often is new content added to the site?"
                            text="We update our site regularly with new content. You can expect new blog posts, notes, interview questions, and project ideas every week. Our team of experienced developers and educators work tirelessly to ensure you have the latest and most relevant information.."
                        />
                        <AccordionItem
                            header="Can I request specific topics to be covered?"
                            text="Absolutely! We value our community’s feedback and are always open to suggestions. If there’s a specific topic or a programming language you want us to cover, feel free to reach out to us via our contact page. We’ll do our best to accommodate your request in our upcoming content schedule."
                        />
                    </div>
                    <div className="w-full px-4 max-w-[1050px] mx-auto">
                        <AccordionItem
                            header="What is included in the DSA sheets?"
                            text="Our Data Structures and Algorithms (DSA) sheets include detailed explanations, sample code, and a variety of problems to solve. Each sheet is designed to help you understand fundamental concepts and apply them to solve real-world problems. We also provide solutions and explanations for each problem to enhance your learning experience."
                        />
                        <AccordionItem
                            header="How can I use the projects listed on your site?"
                            text="The projects listed on our site are categorized by difficulty level and are designed to help you apply the concepts you've learned. Each project includes a detailed description, required technologies, and step-by-step instructions. You can use these projects to build your portfolio, practice coding, or even as a base for your own unique projects."
                        />

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Accordion;

const AccordionItem = ({ header, text }) => {
    const [active, setActive] = useState(false);

    const handleToggle = () => {
        event.preventDefault();
        setActive(!active);
    };
    return (
        <div className=" w-full border-b dark:border-1 border-gray-400 px-4 py-3  dark:text-white sm:p-8 lg:px-6 xl:px-8 dark:border-gray-600">
            <button
                className={`faq-btn flex w-full text-left group hover`}
                onClick={() => handleToggle()}
            >
                <div className="w-full">
                    <h4 className="mt-1 sm:text-md lg:text-xl text-[#484B54] font-semibold text-dark dark:text-white">
                        {header}
                    </h4>
                </div>

                <div className=" flex h-10 w-full max-w-[40px] items-center justify-center rounded-md bg-red-500 group-hover:shadow-lg group-hover:shadow-black/40 dark:bg-white/5">
                    <svg
                        className={`fill-white stroke-white duration-200 ease-in-out ${active ? "rotate-180" : ""
                            }`}
                        width="17"
                        height="10"
                        viewBox="0 0 17 10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                            fill=""
                            stroke=""
                        />
                    </svg>
                </div>


            </button>

            <div
                className={` duration-200 ease-in-out ${active ? "block" : "hidden"
                    }`}
            >
                <p className="py-3 text-md leading-relaxed text-[#484B54]  dark:text-white dark:text-dark-6">
                    {text}
                </p>
            </div>
        </div>
    );
};
