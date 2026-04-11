import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronDown, Filter } from 'lucide-react';

export const CATEGORY_OPTIONS = ['All Categories', 'IT Services', 'Software/IT', 'Data Science', 'Finance', 'Marketing', 'Design', 'Operations', 'HR', 'Any Graduate', 'Core Engineering'];
export const JOB_TYPE_OPTIONS = ['All Types', 'Freshers', 'Experienced', 'Internship', 'Work From Home'];
export const LOCATION_OPTIONS = ['All Locations', 'Pan India', 'Hyderabad', 'Bengaluru', 'Chennai', 'Pune', 'Mumbai', 'Delhi', 'Noida', 'Kolkata'];
export const EXPERIENCE_OPTIONS = ['All Experience', 'Fresher (0)', 'Up to 1 Year', 'Up to 2 Years', '1-3 Years', '2-5 Years', '3-5 Years', '5+ Years'];
export const SALARY_OPTIONS = ['All Salaries', 'Under ₹3 LPA', '₹3–5 LPA', '₹5–8 LPA', '₹8–12 LPA', '₹12+ LPA'];
export const SORT_OPTIONS = ['Latest First', 'Oldest First'];

const ACCENT = {
    purple: { active: 'bg-purple-600 text-white border-purple-600', item: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20', tag: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800', focus: 'focus:border-purple-400 dark:focus:border-purple-500' },
    orange: { active: 'bg-orange-500 text-white border-orange-500', item: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20', tag: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800', focus: 'focus:border-orange-400 dark:focus:border-orange-500' },
    green: { active: 'bg-green-600 text-white border-green-600', item: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20', tag: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800', focus: 'focus:border-green-400 dark:focus:border-green-500' },
    blue: { active: 'bg-blue-600 text-white border-blue-600', item: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20', tag: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800', focus: 'focus:border-blue-400 dark:focus:border-blue-500' },
};

const FilterDropdown = ({ label, options, value, onChange, accentColor = 'purple' }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const a = ACCENT[accentColor] || ACCENT.purple;
    useEffect(() => {
        const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);
    const active = value !== options[0];
    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm font-bold transition-all whitespace-nowrap ${active ? a.active : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
            >
                <span className="max-w-[110px] truncate">{active ? value : label}</span>
                <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="absolute top-full mt-1.5 left-0 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl py-1 min-w-[170px]">
                    {options.map(opt => (
                        <button
                            key={opt}
                            onClick={() => { onChange(opt); setOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${value === opt ? `${a.item} font-bold` : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export { FilterDropdown };

const FilterBar = ({
    search, setSearch,
    filterCategory, setFilterCategory,
    filterType, setFilterType,
    filterLocation, setFilterLocation,
    filterSalary, setFilterSalary,
    filterExp, setFilterExp,
    sortBy, setSortBy,
    hideTypeFilter = false,
    accentColor = 'purple',
}) => {
    const a = ACCENT[accentColor] || ACCENT.purple;

    const activeCount = [
        [filterCategory, CATEGORY_OPTIONS[0]],
        ...(hideTypeFilter ? [] : [[filterType, JOB_TYPE_OPTIONS[0]]]),
        [filterLocation, LOCATION_OPTIONS[0]],
        [filterSalary, SALARY_OPTIONS[0]],
        [filterExp, EXPERIENCE_OPTIONS[0]],
    ].filter(([v, def]) => v !== def).length;

    const clearAll = () => {
        setSearch('');
        setFilterCategory(CATEGORY_OPTIONS[0]);
        if (setFilterType) setFilterType(JOB_TYPE_OPTIONS[0]);
        setFilterLocation(LOCATION_OPTIONS[0]);
        setFilterSalary(SALARY_OPTIONS[0]);
        setFilterExp(EXPERIENCE_OPTIONS[0]);
        setSortBy(SORT_OPTIONS[0]);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
            {/* Search */}
            <div className="relative mb-3">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by job title, company, or location..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className={`w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 text-base font-medium focus:outline-none ${a.focus} transition-colors`}
                />
                {search && (
                    <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Dropdowns */}
            <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mr-0.5 flex-shrink-0">
                    <Filter className="w-3.5 h-3.5" /> Filters:
                </div>
                <FilterDropdown label="Category" options={CATEGORY_OPTIONS} value={filterCategory} onChange={setFilterCategory} accentColor={accentColor} />
                {!hideTypeFilter && (
                    <FilterDropdown label="Job Type" options={JOB_TYPE_OPTIONS} value={filterType} onChange={setFilterType} accentColor={accentColor} />
                )}
                <FilterDropdown label="Location" options={LOCATION_OPTIONS} value={filterLocation} onChange={setFilterLocation} accentColor={accentColor} />
                <FilterDropdown label="Salary" options={SALARY_OPTIONS} value={filterSalary} onChange={setFilterSalary} accentColor={accentColor} />
                <FilterDropdown label="Experience" options={EXPERIENCE_OPTIONS} value={filterExp} onChange={setFilterExp} accentColor={accentColor} />
                <FilterDropdown label="Sort" options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} accentColor={accentColor} />
                {activeCount > 0 && (
                    <button onClick={clearAll} className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-100 dark:border-red-900/40 transition-colors flex-shrink-0">
                        <X className="w-3 h-3" /> Clear ({activeCount})
                    </button>
                )}
            </div>

            {/* Active tags */}
            {activeCount > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    {[
                        { val: filterCategory, def: CATEGORY_OPTIONS[0], set: setFilterCategory },
                        ...(hideTypeFilter ? [] : [{ val: filterType, def: JOB_TYPE_OPTIONS[0], set: setFilterType }]),
                        { val: filterLocation, def: LOCATION_OPTIONS[0], set: setFilterLocation },
                        { val: filterSalary, def: SALARY_OPTIONS[0], set: setFilterSalary },
                        { val: filterExp, def: EXPERIENCE_OPTIONS[0], set: setFilterExp },
                    ].filter(f => f.val !== f.def).map(f => (
                        <span key={f.val} className={`inline-flex items-center gap-1 text-sm font-bold px-3 py-1.5 border rounded-full ${a.tag}`}>
                            {f.val}
                            <button onClick={() => f.set(f.def)} className="ml-0.5"><X className="w-3 h-3" /></button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterBar;