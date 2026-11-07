import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Baseurl";
import {
    CATEGORY_OPTIONS,
    EXPERIENCE_OPTIONS,
    JOB_TYPE_OPTIONS,
    LOCATION_OPTIONS,
    SALARY_OPTIONS,
    SORT_OPTIONS,
} from "../Common/Filterbar";

const PAGE_SIZE = 6;

export default function usePaginatedJobs({
    search,
    category,
    type,
    location,
    salary,
    experience,
    sort,
    level,
} = {}) {
    const [jobs, setJobs] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const requestId = useRef(0);
    const jobsRef = useRef(jobs);
    jobsRef.current = jobs;

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 250);
        return () => clearTimeout(timer);
    }, [search]);

    const params = useMemo(() => {
        const next = { page: 1, limit: PAGE_SIZE, sort: sort === SORT_OPTIONS[1] ? "oldest" : "newest" };
        if (debouncedSearch?.trim()) next.q = debouncedSearch.trim();
        if (category && category !== CATEGORY_OPTIONS[0]) next.category = category;
        if (type && type !== JOB_TYPE_OPTIONS[0]) next.type = type;
        if (location && location !== LOCATION_OPTIONS[0]) next.location = location;
        if (salary && salary !== SALARY_OPTIONS[0]) next.salaryFilter = salary;
        if (experience && experience !== EXPERIENCE_OPTIONS[0]) next.experienceFilter = experience;
        if (level && level !== "all") next.level = level;
        return next;
    }, [debouncedSearch, category, type, location, salary, experience, sort, level]);

    const filterKey = JSON.stringify(params);
    const filterParams = useMemo(() => JSON.parse(filterKey), [filterKey]);

    useEffect(() => {
        const controller = new AbortController();
        const currentRequestId = ++requestId.current;
        const hasExistingJobs = jobsRef.current.length > 0;
        setError("");
        setLoading(!hasExistingJobs);
        setRefreshing(hasExistingJobs);
        setLoadingMore(false);
        setPage(0);

        axios.get(`${baseUrl}/job`, { params: filterParams, signal: controller.signal })
            .then(({ data }) => {
                if (requestId.current !== currentRequestId) return;
                setJobs(data.jobs || []);
                setTotal(data.total || 0);
                setPage(data.page || 1);
            })
            .catch((requestError) => {
                if (controller.signal.aborted) return;
                if (requestId.current === currentRequestId) {
                    setError(requestError.response?.data?.error || "Could not load jobs. Please try again.");
                    console.error("Could not load jobs:", requestError.message);
                }
            })
            .finally(() => {
                if (requestId.current !== currentRequestId) return;
                setLoading(false);
                setRefreshing(false);
            });

        return () => controller.abort();
    }, [filterParams]);

    const loadMore = useCallback(async () => {
        if (loadingMore || loading || jobs.length >= total || page < 1) return;
        const currentRequestId = requestId.current;
        setLoadingMore(true);
        setError("");
        try {
            const { data } = await axios.get(`${baseUrl}/job`, {
                params: { ...filterParams, page: page + 1 },
            });
            if (requestId.current !== currentRequestId) return;
            setJobs((current) => [...current, ...(data.jobs || [])]);
            setTotal(data.total || 0);
            setPage(data.page || page + 1);
        } catch (requestError) {
            if (requestId.current !== currentRequestId) return;
            setError(requestError.response?.data?.error || "Could not load more jobs. Please try again.");
            console.error("Could not load more jobs:", requestError.message);
        } finally {
            if (requestId.current === currentRequestId) setLoadingMore(false);
        }
    }, [filterParams, jobs.length, loading, loadingMore, page, total]);

    return {
        jobs,
        total,
        loading,
        refreshing,
        loadingMore,
        hasMore: jobs.length < total,
        loadMore,
        error,
    };
}
