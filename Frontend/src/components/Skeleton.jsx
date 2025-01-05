
import React from "react";

export default function Skeleton1() {
    return (
        <section className="flex items-center flex-col justify-center my-10 px-10 bg-white p-10">
            <p className="text-[6vmin] mb-10 font-semibold bg-gradient-to-r from-black via-gray-600 to-gray-200 bg-clip-text text-transparent animate-pulse">
                LOADING ...
            </p>
            <div className="w-full max-w-[700px] space-y-6 ">
                <div className="h-3 w-6/6 rounded-full bg-gray-400 dark:bg-slate-700 animate-pulseOpacity"></div>
                <div className="h-3 w-4/6 rounded-full bg-gray-400 dark:bg-slate-700 animate-pulseOpacity"></div>
                <div className="h-3 w-3/6 rounded-full bg-gray-400 dark:bg-slate-700 animate-pulseOpacity"></div>
                <div className="h-3 w-4/6 rounded-full bg-gray-400 dark:bg-slate-700 animate-pulseOpacity"></div>
                <div className="h-3 w-6/6 rounded-full bg-gray-400 dark:bg-slate-700 animate-pulseOpacity"></div>
            </div>
        </section>
    );
}
