import { fetchBackend, SITE_URL } from "./_lib.js";

const escapeXml = (value) => String(value).replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
})[character]);

export default async function handler(_req, res) {
    const urls = new Map([
        ["/", null],
        ["/Job-Portal", null],
        ["/Fresher-Jobs", null],
        ["/Experienced-Jobs", null],
        ["/Internships", null],
        ["/Blogs", null],
        ["/About", null],
        ["/Editorial-Policy", null],
        ["/Contact", null],
        ["/privacy-policy", null],
        ["/terms", null],
    ]);

    try {
        const [jobs, blogResponse, stats] = await Promise.all([
            fetchBackend("/job/sitemap"),
            fetchBackend("/blog?limit=1000&sort=newest"),
            fetchBackend("/job/stats"),
        ]);
        for (const job of jobs) {
            if (job.slug) urls.set(`/jobdetail/${encodeURIComponent(job.slug)}`, job.updatedAt);
        }
        for (const blog of blogResponse.blogs || []) {
            if (blog.slug) urls.set(`/blogs/${encodeURIComponent(blog.slug)}`, blog.updatedAt);
        }
        for (const city of stats.byCity || []) {
            if (city.city && city.city !== "Other") {
                const slug = encodeURIComponent(city.city.toLowerCase().replace(/\s+/g, "-"));
                urls.set(`/jobs-in-${slug}`, null);
                urls.set(`/fresher-jobs-in-${slug}`, null);
            }
        }
        for (const category of ["Interview Tips", "DSA", "System Design", "HR Round", "Resume Tips", "Career Advice"]) {
            urls.set(`/blogs?category=${encodeURIComponent(category)}`, null);
        }
    } catch (error) {
        console.error("Sitemap data unavailable:", error.message);
    }

    const entries = [...urls].map(([path, lastmod]) =>
        `<url><loc>${escapeXml(`${SITE_URL}${path}`)}</loc>${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ""}</url>`
    ).join("");
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=3600");
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`);
}
