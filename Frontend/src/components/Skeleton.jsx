import React from "react";

export default function Skeleton1() {
    return (
        <section className="flex items-center flex-col justify-center my-10 px-10 dark:bg-slate-800 bg-white p-10">
            <p className="text-[5vmin] mb-10 font-semibold text-red-500 animate-pulse">
                Loading ...
            </p>

            {/* Circle Spinner */}
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-gray-300 rounded-full border-t-red-500 animate-spin"></div>
            </div>
        </section>
    );
}
