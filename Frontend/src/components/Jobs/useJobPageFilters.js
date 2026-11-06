import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
    CATEGORY_OPTIONS,
    EXPERIENCE_OPTIONS,
    JOB_TYPE_OPTIONS,
    LOCATION_OPTIONS,
    SALARY_OPTIONS,
    SORT_OPTIONS,
} from "../Common/Filterbar";

const getOption = (params, key, options) => {
    const value = params.get(key);
    return options.includes(value) ? value : options[0];
};

export default function useJobPageFilters({ includeType = false } = {}) {
    const [params, setParams] = useSearchParams();
    const updateParam = useCallback((key, value, defaultValue) => {
        setParams((current) => {
            const next = new URLSearchParams(current);
            if (!value || value === defaultValue) next.delete(key);
            else next.set(key, value);
            return next;
        }, { replace: true });
    }, [setParams]);

    const search = params.get("q") || "";
    const filterCategory = (params.get("category") || CATEGORY_OPTIONS[0]).trim().slice(0, 100) || CATEGORY_OPTIONS[0];
    const filterType = getOption(params, "type", JOB_TYPE_OPTIONS);
    const storedLocation = params.get("location") || LOCATION_OPTIONS[0];
    const filterLocation = storedLocation.slice(0, 100);
    const filterSalary = getOption(params, "salary", SALARY_OPTIONS);
    const filterExp = getOption(params, "experience", EXPERIENCE_OPTIONS);
    const sortBy = getOption(params, "sort", SORT_OPTIONS);

    const setSearch = useCallback((value) => updateParam("q", value.slice(0, 120), ""), [updateParam]);
    const setFilterCategory = useCallback((value) => updateParam("category", value, CATEGORY_OPTIONS[0]), [updateParam]);
    const setFilterType = useCallback((value) => updateParam("type", value, JOB_TYPE_OPTIONS[0]), [updateParam]);
    const setFilterLocation = useCallback((value) => updateParam("location", value.slice(0, 100), LOCATION_OPTIONS[0]), [updateParam]);
    const setFilterSalary = useCallback((value) => updateParam("salary", value, SALARY_OPTIONS[0]), [updateParam]);
    const setFilterExp = useCallback((value) => updateParam("experience", value, EXPERIENCE_OPTIONS[0]), [updateParam]);
    const setSortBy = useCallback((value) => updateParam("sort", value, SORT_OPTIONS[0]), [updateParam]);

    const isFiltered = Boolean(
        search
        || filterCategory !== CATEGORY_OPTIONS[0]
        || (includeType && filterType !== JOB_TYPE_OPTIONS[0])
        || filterLocation !== LOCATION_OPTIONS[0]
        || filterSalary !== SALARY_OPTIONS[0]
        || filterExp !== EXPERIENCE_OPTIONS[0]
        || sortBy !== SORT_OPTIONS[0]
    );

    return {
        search, setSearch,
        filterCategory, setFilterCategory,
        filterType, setFilterType,
        filterLocation, setFilterLocation,
        filterSalary, setFilterSalary,
        filterExp, setFilterExp,
        sortBy, setSortBy,
        isFiltered,
    };
}
