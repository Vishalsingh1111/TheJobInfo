import React from "react";
import { Link } from "react-router-dom";

const categories = [
    { label: "All jobs", to: "/Job-Portal" },
    { label: "Freshers", to: "/Fresher-Jobs" },
    { label: "Internships", to: "/Internships" },
    { label: "Experienced", to: "/Experienced-Jobs" },
];

export default function JobCategoryLinks() {
    return (
        <nav aria-label="Explore other job categories" className="mt-5 flex flex-wrap justify-center gap-3">
            {categories.map(({ label, to }) => (
                <Link
                    key={to}
                    to={to}
                    className="rounded-full border border-teal-200 px-4 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-50 dark:border-teal-800 dark:text-teal-300 dark:hover:bg-teal-900/30"
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
}
