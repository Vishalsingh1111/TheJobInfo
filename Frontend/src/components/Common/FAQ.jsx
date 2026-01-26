// import React, { useState } from "react";

// const Accordion = () => {
//     return (
//         <div className=" dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-10">
//             <section className="max-w-5xl container mx-auto md:px-20 px-4 relative z-20 overflow-hidden pb-10 dark:text-white lg:pb-[30px] lg:pt-[20px] text-center ">
//                 <div className="container mx-auto mt-10">
//                     <div className="-mx-4 flex flex-wrap justify-center">
//                         <div className="w-full px-4">
//                             <div className="mx-auto mb-8 max-w-auto text-center lg:mb-3">
//                                 <h1 className="titillium-web-semibold text-gray-600 text-3xl md:text-4xl pb-2 dark:text-white" id='homecontentcard'>Got Questions? Find Your <span className='text-red-500'> Answers Here !</span></h1>

//                             </div>
//                         </div>
//                     </div>

//                     <div className="mx-auto text-left">
//                         <div className="w-full px-4 max-w-[1050px] mx-auto">
//                             <AccordionItem
//                                 header="What types of programming languages do you cover?"
//                                 text="We cover a wide range of programming languages including but not limited to Python, Java, C, C++, DSA etc. Our notes are designed to cater to both beginners and advanced users, providing comprehensive insights and practical examples."
//                             />
//                             <AccordionItem
//                                 header="How often is new content added to the site?"
//                                 text="We update our site regularly with new content. You can expect new blog posts, notes, interview questions, and project ideas every week. Our team of experienced developers and educators work tirelessly to ensure you have the latest and most relevant information.."
//                             />
//                             <AccordionItem
//                                 header="Can I request specific topics to be covered?"
//                                 text="Absolutely! We value our community’s feedback and are always open to suggestions. If there’s a specific topic or a programming language you want us to cover, feel free to reach out to us via our contact page. We’ll do our best to accommodate your request in our upcoming content schedule."
//                             />
//                         </div>
//                         <div className="w-full px-4 max-w-[1050px] mx-auto">
//                             <AccordionItem
//                                 header="What is included in the DSA sheets?"
//                                 text="Our Data Structures and Algorithms (DSA) sheets include detailed explanations, sample code, and a variety of problems to solve. Each sheet is designed to help you understand fundamental concepts and apply them to solve real-world problems. We also provide solutions and explanations for each problem to enhance your learning experience."
//                             />
//                             <AccordionItem
//                                 header="How can I use the projects listed on your site?"
//                                 text="The projects listed on our site are categorized by difficulty level and are designed to help you apply the concepts you've learned. Each project includes a detailed description, required technologies, and step-by-step instructions. You can use these projects to build your portfolio, practice coding, or even as a base for your own unique projects."
//                             />

//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Accordion;

// const AccordionItem = ({ header, text }) => {
//     const [active, setActive] = useState(false);

//     const handleToggle = () => {
//         event.preventDefault();
//         setActive(!active);
//     };
//     return (
//         <div className=" w-full border-b dark:border-1 border-gray-400 px-4 py-2  dark:text-white sm:p-8 lg:px-6 xl:px-8 dark:border-gray-600">
//             <button
//                 className={`faq-btn flex w-full text-left group hover`}
//                 onClick={() => handleToggle()}
//             >
//                 <div className="w-full">
//                     <h4 className="mt-1 sm:text-md lg:text-xl text-gray-600 titillium-web-semibold text-dark dark:text-white">
//                         {header}
//                     </h4>
//                 </div>

//                 <div className=" m-2 flex h-8 w-full max-w-[40px] items-center justify-center rounded-md bg-red-500 group-hover:shadow-lg group-hover:shadow-black/40 dark:bg-white/5">
//                     <svg
//                         className={`fill-white stroke-white duration-200 ease-in-out ${active ? "rotate-180" : ""
//                             }`}
//                         width="10"
//                         height="10"
//                         viewBox="0 0 17 10"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
//                             fill=""
//                             stroke=""
//                         />
//                     </svg>
//                 </div>


//             </button>

//             <div
//                 className={` duration-200 ease-in-out ${active ? "block" : "hidden"
//                     }`}
//             >
//                 <p className="py-3 text-md leading-relaxed text-[#484B54] titillium-web-regular dark:text-white dark:text-dark-6">
//                     {text}
//                 </p>
//             </div>
//         </div>
//     );
// };


import React, { useState, useEffect } from "react";
import { ChevronDown, Search, HelpCircle, Sparkles, CheckCircle, MessageCircle, Mail } from "lucide-react";

const Accordion = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20,
                y: (e.clientY / window.innerHeight) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const faqs = [
        {
            category: "General",
            icon: "💡",
            color: "from-blue-500 to-cyan-500",
            header: "What types of programming languages do you cover?",
            text: "We cover a wide range of programming languages including but not limited to Python, Java, C, C++, DSA etc. Our notes are designed to cater to both beginners and advanced users, providing comprehensive insights and practical examples."
        },
        {
            category: "Content",
            icon: "📚",
            color: "from-purple-500 to-pink-500",
            header: "How often is new content added to the site?",
            text: "We update our site regularly with new content. You can expect new blog posts, notes, interview questions, and project ideas every week. Our team of experienced developers and educators work tirelessly to ensure you have the latest and most relevant information."
        },
        {
            category: "Support",
            icon: "🎯",
            color: "from-green-500 to-emerald-500",
            header: "Can I request specific topics to be covered?",
            text: "Absolutely! We value our community's feedback and are always open to suggestions. If there's a specific topic or a programming language you want us to cover, feel free to reach out to us via our contact page. We'll do our best to accommodate your request in our upcoming content schedule."
        },
        {
            category: "DSA",
            icon: "🔥",
            color: "from-orange-500 to-red-500",
            header: "What is included in the DSA sheets?",
            text: "Our Data Structures and Algorithms (DSA) sheets include detailed explanations, sample code, and a variety of problems to solve. Each sheet is designed to help you understand fundamental concepts and apply them to solve real-world problems. We also provide solutions and explanations for each problem to enhance your learning experience."
        },
        {
            category: "Projects",
            icon: "🚀",
            color: "from-yellow-500 to-orange-500",
            header: "How can I use the projects listed on your site?",
            text: "The projects listed on our site are categorized by difficulty level and are designed to help you apply the concepts you've learned. Each project includes a detailed description, required technologies, and step-by-step instructions. You can use these projects to build your portfolio, practice coding, or even as a base for your own unique projects."
        }
    ];

    const filteredFaqs = searchQuery
        ? faqs.filter(faq =>
            faq.header.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : faqs;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
            {/* ANIMATED BACKGROUND */}
            <div
                className="fixed top-20 left-10 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-3xl opacity-20 animate-blob pointer-events-none"
                style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
            ></div>
            <div
                className="fixed top-40 right-10 w-96 h-96 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"
                style={{ transform: `translate(${-mousePosition.x}px, ${mousePosition.y}px)` }}
            ></div>
            <div className="fixed bottom-20 left-1/2 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

            {/* Floating Sparkles */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 10}s`
                        }}
                    >
                        <Sparkles className="text-purple-400 dark:text-purple-500" size={8 + Math.random() * 12} style={{ opacity: 0.3 }} />
                    </div>
                ))}
            </div>

            <section className="relative max-w-5xl container mx-auto md:px-20 px-4 pt-16 pb-20">

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
                    Got Questions? Find Your{' '}
                    <span className="relative inline-block">
                        <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                            Answers Here!
                        </span>
                        <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 6 Q75 12, 150 6 T300 6" fill="none" stroke="url(#gradient)" strokeWidth="4" className="animate-draw" />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#f43f5e" />
                                    <stop offset="50%" stopColor="#ec4899" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Everything you need to know about our platform and services
                </p>
        </div>

                {/* SEARCH BAR */ }
    <div className="max-w-2xl mx-auto mb-12 animate-fade-in animation-delay-200">
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity"></div>
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 group-hover:scale-110 transition-transform" />
            <input
                type="text"
                placeholder="🔍 Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="relative w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-600 focus:outline-none transition-all bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl text-gray-900 dark:text-gray-100 placeholder:text-gray-500 font-semibold text-lg shadow-xl"
            />
        </div>
    </div>

    {/* FAQ ACCORDION */ }
    <div className="space-y-4 mb-12">
        {filteredFaqs.map((faq, index) => (
            <AccordionItem
                key={index}
                {...faq}
                index={index}
            />
        ))}

        {filteredFaqs.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-600 dark:text-gray-400 text-xl font-semibold">
                    No results found for "{searchQuery}"
                </p>
                <p className="text-gray-500 dark:text-gray-500 mt-2">
                    Try searching with different keywords
                </p>
            </div>
        )}
    </div>

    {/* CONTACT CTA */ }
    <div className="relative max-w-3xl mx-auto animate-fade-in animation-delay-600">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl blur-xl opacity-30 animate-pulse-glow"></div>
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
            {/* Floating sparkles */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-float-particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`
                    }}
                >
                    <Sparkles className="text-white" size={12} style={{ opacity: 0.4 }} />
                </div>
            ))}

            <div className="relative z-10">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Still Have Questions?
                </h3>
                <p className="text-lg text-white/90 mb-6 max-w-xl mx-auto">
                    Can't find the answer you're looking for? Our team is here to help you!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="group relative px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl transition-all transform hover:scale-105 shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                        <span className="relative flex items-center justify-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            Chat with Us
                        </span>
                    </button>
                    <button className="group px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/50 hover:bg-white/30 transition-all transform hover:scale-105">
                        <span className="flex items-center justify-center gap-2">
                            <Mail className="w-5 h-5" />
                            Email Support
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
            </section >

    <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }

                @keyframes float-particle {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
                    50% { transform: translate(20px, -30px) rotate(180deg); opacity: 0.7; }
                }

                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.8; }
                }

                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                @keyframes draw {
                    to { stroke-dashoffset: 0; }
                }

                @keyframes slide-down {
                    from { max-height: 0; opacity: 0; }
                    to { max-height: 500px; opacity: 1; }
                }

                .animate-blob { animation: blob 7s infinite; }
                .animate-float-particle { animation: float-particle 15s ease-in-out infinite; }
                .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
                .animate-gradient-x { animation: gradient-x 3s ease infinite; }
                .animate-draw { stroke-dasharray: 300; stroke-dashoffset: 300; animation: draw 2s ease-out forwards; }
                .animate-slide-down { animation: slide-down 0.3s ease-out forwards; }

                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-600 { animation-delay: 0.6s; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </div >
    );
};

export default Accordion;

const AccordionItem = ({ header, text, category, icon, color, index }) => {
    const [active, setActive] = useState(false);

    const handleToggle = (e) => {
        e.preventDefault();
        setActive(!active);
    };

    return (
        <div
            className="animate-fade-in group"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
        >
            <div className="relative">
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

                {/* Card */}
                <div className={`relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border-2 transition-all duration-300 overflow-hidden ${active
                    ? 'border-purple-400 dark:border-purple-600 shadow-2xl'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 shadow-lg hover:shadow-xl'
                    }`}>
                    {/* Question Button */}
                    <button
                        className="flex w-full items-start gap-4 p-6 text-left"
                        onClick={handleToggle}
                    >
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                            {icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            {/* Category Badge */}
                            <div className="mb-2">
                                <span className={`inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r ${color} bg-opacity-10 rounded-full text-xs font-bold`}>
                                    <CheckCircle className="w-3 h-3" />
                                    {category}
                                </span>
                            </div>

                            {/* Question */}
                            <h4 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white pr-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-red-600 transition-all duration-300">
                                {header}
                            </h4>
                        </div>

                        {/* Toggle Button */}
                        <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg transition-all duration-300 ${active ? 'rotate-180' : ''
                            }`}>
                            <ChevronDown className="w-5 h-5 text-white" />
                        </div>
                    </button>

                    {/* Answer */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ${active ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="px-6 pb-6 pt-2">
                            {/* Divider */}
                            <div className={`h-1 bg-gradient-to-r ${color} rounded-full mb-4 opacity-20`}></div>

                            {/* Answer Text */}
                            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 pl-[72px]">
                                {text}
                            </p>

                            {/* Helpful Buttons */}
                            <div className="flex items-center gap-4 mt-4 pl-[72px]">
                                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold flex items-center gap-1">
                                    👍 Helpful
                                </button>
                                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold flex items-center gap-1">
                                    👎 Not helpful
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};