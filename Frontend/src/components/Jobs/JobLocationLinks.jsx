import { ArrowRight } from "lucide-react";
import { getActiveJobLocations, matchesJobLocation } from "../Common/Filterbar";
import SocialFollowCard from "../Common/SocialFollowCard";

export default function JobLocationLinks({ jobs, selectedLocation, onSelect, categoryLabel = 'Jobs', onSelectCategory, selectedCategory, byCity = [], byCategory = [] }) {
    const locations = [...new Set([
        ...getActiveJobLocations(jobs),
        ...byCity.map(({ city }) => city).filter((city) => city && city !== "Other"),
    ])].sort((a, b) => a.localeCompare(b));
    const categories = (byCategory.length
        ? byCategory.map(({ category }) => category)
        : [...new Set(jobs.map((job) => String(job.category || '').trim()).filter(Boolean))]
    )
        .sort((left, right) => left.localeCompare(right))
        .slice(0, 6);

    return (
        <aside className="space-y-4 lg:sticky lg:top-6">
            <SocialFollowCard />
            <section className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Explore jobs by city</h2>
                <div className="max-h-[50vh] space-y-1 overflow-y-auto overscroll-contain pr-1 lg:max-h-none lg:overflow-visible lg:overscroll-auto lg:pr-0">
                    {locations.length ? locations.slice(0, 6).map((location) => (
                        <div key={location} className="border-b border-gray-50 last:border-0 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={() => onSelect(location)}
                                aria-pressed={selectedLocation === location}
                                className={`flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-gray-900 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:text-gray-100 dark:hover:bg-blue-950/30 dark:hover:text-blue-300 ${
                                    selectedLocation === location
                                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                                        : ""
                                }`}
                            >
                                <span>{categoryLabel} in {location}</span>
                                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                                    {byCity.find((entry) => entry.city === location)?.count
                                        ?? jobs.filter((job) => matchesJobLocation(job, location)).length}
                                </span>
                                <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 opacity-50" />
                            </button>
                        </div>
                    )) : (
                        <p className="py-2 text-sm text-gray-500 dark:text-gray-400">
                            Locations appear as job listings become available.
                        </p>
                    )}
                </div>
            </section>
            <section className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-3 text-lg font-bold text-gray-800 dark:text-white">Job categories</h2>
                {categories.length ? (
                    <div className="space-y-1">
                        <button
                            type="button"
                            onClick={() => {
                                onSelectCategory?.("All Categories");
                                document.getElementById("job-page-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }}
                            aria-pressed={selectedCategory === "All Categories"}
                            className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition hover:bg-blue-50 dark:hover:bg-gray-800 ${selectedCategory === "All Categories" ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" : "text-gray-700 dark:text-gray-300"}`}
                        >
                            All categories
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => {
                                    onSelectCategory?.(category);
                                    document.getElementById("job-page-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }}
                                aria-pressed={selectedCategory === category}
                                className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition hover:bg-blue-50 dark:hover:bg-gray-800 ${selectedCategory === category ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" : "text-gray-700 dark:text-gray-300"}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                ) : <p className="text-sm text-gray-500 dark:text-gray-400">Categories appear as listings are added.</p>}
            </section>
        </aside>
    );
}
