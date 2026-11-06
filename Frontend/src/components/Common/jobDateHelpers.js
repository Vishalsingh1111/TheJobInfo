const RECENT_JOB_WINDOW_MS = 48 * 60 * 60 * 1000;

export function isJobRecent(job, now = Date.now()) {
    const postingDate = [job?.postedAt, job?.createdAt]
        .filter((value) => value !== null && value !== undefined && value !== "")
        .map((value) => new Date(value))
        .find((date) => Number.isFinite(date.getTime()));
    if (!postingDate) return false;
    const age = now - postingDate.getTime();
    return Number.isFinite(age) && age >= 0 && age <= RECENT_JOB_WINDOW_MS;
}
