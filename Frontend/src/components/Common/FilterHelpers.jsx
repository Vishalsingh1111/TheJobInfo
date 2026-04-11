import { EXPERIENCE_OPTIONS, SALARY_OPTIONS } from './Filterbar';

export const parseExpRange = (str) => {
    if (!str) return null;
    const lower = str.toLowerCase();
    if (lower.includes('fresher') && !lower.match(/\d/)) return { min: 0, max: 0 };
    const nums = lower.match(/(\d+(\.\d+)?)/g);
    if (!nums) return null;
    const parsed = nums.map(Number);
    if (parsed.length === 1) return { min: parsed[0], max: parsed[0] };
    return { min: Math.min(...parsed), max: Math.max(...parsed) };
};

export const matchExperience = (jobExpStr, filterOpt) => {
    if (!filterOpt || filterOpt === EXPERIENCE_OPTIONS[0]) return true;
    const jobRange = parseExpRange(jobExpStr);
    if (!jobRange) return true;
    const map = {
        'Fresher (0)': { min: 0, max: 0 },
        'Up to 1 Year': { min: 0, max: 1 },
        'Up to 2 Years': { min: 0, max: 2 },
        '1-3 Years': { min: 1, max: 3 },
        '2-5 Years': { min: 2, max: 5 },
        '3-5 Years': { min: 3, max: 5 },
        '5+ Years': { min: 5, max: 99 },
    };
    const sel = map[filterOpt];
    if (!sel) return true;
    return jobRange.min <= sel.max && jobRange.max >= sel.min;
};

export const parseSalaryLPA = (str) => {
    if (!str) return null;
    const lower = str.toLowerCase().replace(/,/g, '');
    const monthMatch = lower.match(/₹?(\d+(?:\.\d+)?)\s*\/?\s*month/);
    if (monthMatch) {
        const lpa = (parseFloat(monthMatch[1]) * 12) / 100000;
        return { min: lpa, max: lpa };
    }
    const nums = lower.match(/(\d+(?:\.\d+)?)/g);
    if (!nums) return null;
    const parsed = nums.map(Number);
    if (lower.includes('up to') || lower.includes('upto')) return { min: 0, max: parsed[0] };
    if (parsed.length === 1) return { min: 0, max: parsed[0] };
    return { min: Math.min(...parsed), max: Math.max(...parsed) };
};

export const matchSalary = (jobSalaryStr, filterOpt) => {
    if (!filterOpt || filterOpt === SALARY_OPTIONS[0]) return true;
    const jobSal = parseSalaryLPA(jobSalaryStr);
    if (!jobSal) return true;
    const buckets = {
        'Under ₹3 LPA': { min: 0, max: 3 },
        '₹3–5 LPA': { min: 3, max: 5 },
        '₹5–8 LPA': { min: 5, max: 8 },
        '₹8–12 LPA': { min: 8, max: 12 },
        '₹12+ LPA': { min: 12, max: 999 },
    };
    const bucket = buckets[filterOpt];
    if (!bucket) return true;
    return jobSal.min <= bucket.max && jobSal.max >= bucket.min;
};