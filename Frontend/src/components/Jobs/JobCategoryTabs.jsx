import { ArrowRight, Briefcase, BriefcaseBusiness, GraduationCap, Rocket } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import refreshCurrentPage from '../Common/refreshCurrentPage';

const categories = [
    { label: 'All Jobs', icon: Briefcase, route: '/Job-Portal' },
    { label: 'Freshers', icon: GraduationCap, route: '/Fresher-Jobs' },
    { label: 'Internships', icon: Rocket, route: '/Internships' },
    { label: 'Experienced', icon: BriefcaseBusiness, route: '/Experienced-Jobs' },
];

export default function JobCategoryTabs() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <nav className="mb-8 flex flex-wrap justify-center gap-2" aria-label="Job categories">
            {categories.map(({ label, icon: Icon, route }) => {
                const active = route.toLowerCase() === pathname.toLowerCase();
                return (
                    <button
                        key={route}
                        type="button"
                        aria-current={active ? 'page' : undefined}
                        onClick={() => active ? refreshCurrentPage() : navigate(route)}
                        className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
                            active
                                ? 'border-transparent bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600'
                        }`}
                    >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {label}
                        {!active && <ArrowRight className="h-3.5 w-3.5 opacity-40" aria-hidden="true" />}
                    </button>
                );
            })}
        </nav>
    );
}
