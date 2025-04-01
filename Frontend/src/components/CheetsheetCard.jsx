import React from "react";

const cheatsheets = [
    { name: "ML Cheatsheet", icon: "/images/ml.png", link: "/Pagenotfound", bgColor: "bg-gray-50" },
    { name: "HTML Cheatsheet", icon: "/images/html.png", link: "/Pagenotfound", bgColor: "bg-gray-50" },
    { name: "Python Cheatsheet", icon: "/images/python.png", link: "/Python", bgColor: "bg-gray-50" },
    { name: "C Cheatsheet", icon: "/images/c.png", link: "/C", bgColor: "bg-gray-50" },
    { name: "C++ Cheatsheet", icon: "/images/c++.png", link: "/Cpp", bgColor: "bg-gray-50" },
    { name: "C++ STL Cheatsheet", icon: "/images/c++.png", link: "/Cpp", bgColor: "bg-gray-50" },
    { name: "JavaScript Cheatsheet", icon: "/images/js.png", link: "/Pagenotfound", bgColor: "bg-gray-50" },
    { name: "Java Cheatsheet", icon: "/images/java.png", link: "/Java", bgColor: "bg-gray-50" },
];

const CheatsheetPage = () => {
    return (
        <div className="bg-gradient-to-l from-white via-white to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-5">
            <h1 className="text-center text-3xl md:text-4xl font-semibold text-gray-700 dark:text-white pt-20 pb-10">
                Cheatsheets <span className="text-red-500">Instant Learning</span>
            </h1>
            <div className="max-w-[1300px] container mx-auto my-10 px-0 md:px-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cheatsheets.map((sheet, index) => (
                    <a href={sheet.link}><div
                        key={index}
                        className={`p-6 rounded-lg border-gray-400 border text-center dark:bg-transparent dark:border-gray-400 ${sheet.bgColor}`}
                    >
                        <div className="h-20 w-20  flex items-center justify-center mx-auto mb-3">
                            <img src={sheet.icon} alt="Icon Loading" />
                        </div>
                        <h2 className="text-xl font-semibold">{sheet.name}</h2>
                    </div></a>
                ))}
            </div>
            <div className="mx-auto text-center">
                <button><a href='#'><button className="border border-red-500 py-3 rounded-md text-white mb-10 px-4 mt-6 group bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30">Show More</button></a></button>
            </div>
        </div>
    );
};

export default CheatsheetPage;
