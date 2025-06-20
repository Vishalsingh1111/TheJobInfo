
import React from 'react';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

const getContestStatus = (contestDate, contestTime) => {
    if (!contestDate || !contestTime) return "Unknown";

    const [hours, minutes] = contestTime.split(":").map(Number);
    const contestStart = new Date(contestDate);
    contestStart.setHours(hours);
    contestStart.setMinutes(minutes);

    const now = new Date();

    // Contest duration assumption: 2 hours
    const contestEnd = new Date(contestStart);
    contestEnd.setHours(contestStart.getHours() + 2);

    if (now < contestStart) return "Upcoming";
    else if (now >= contestStart && now <= contestEnd) return "Live";
    else return "Ended";
};

const statusColorMap = {
    Upcoming: "bg-yellow-500 border-yellow-500",
    Live: "bg-green-600 border-green-600",
    Ended: "bg-red-500 border-red-500",
    Unknown: "bg-gray-400 border-gray-400"
};

const Contestcard = ({ item, onClick }) => {
    const status = getContestStatus(item.contestDate, item.contestTime);
    const statusStyle = statusColorMap[status] || statusColorMap.Unknown;

    return (
        <div
            onClick={onClick}
            className="relative cursor-pointer bg-gray-50 px-2 md:px-5 py-5 border border-gray-400 group rounded-md flex flex-col dark:border-gray-400 dark:border dark:bg-transparent dark:text-white hover:shadow hover:shadow-black/10 hover:shadow-lg"
        >
            <div className="content flex flex-col m-auto">
                <h3 className={`text-sm md:text-md font-semibold text-white inline-block px-3 py-1 rounded-full w-fit mb-3 ${statusStyle}`}>
                    {status}
                </h3>

                <h3 className="text-md md:text-xl font-semibold text-gray-600 dark:text-white">
                    {item.header}
                </h3>

                <div className="text-sm md:text-md font-[400] text-gray-700 space-y-1 py-1">
                    <p className="text-red-500">{item.contestDate ? formatDate(item.contestDate) : "Date not available"}</p>
                    <p className='text-bold'>Time : <span className="text-blue-500">{item.contestTime || "Time not available"}</span></p>
                </div>

                <div className="flex justify-start mt-2">
                    <span className="cursor-pointer bg-green-600 text-sm md:text-md text-white inline-block border px-2 py-1.5 rounded-lg border-green-600 hover:shadow-lg group-hover:shadow-black/30 transition-all duration-300">
                        Register
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Contestcard;

