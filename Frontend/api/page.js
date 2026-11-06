import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { applyPageMetadata, escapeHtml, fetchBackend, SITE_URL } from "./_lib.js";

async function getShell() {
    for (const candidate of [join(process.cwd(), "dist", "index.html"), join(process.cwd(), "index.html")]) {
        try {
            return await readFile(candidate, "utf8");
        } catch {
            continue;
        }
    }
    throw new Error("Unable to load the built SPA shell");
}

function jobBody(job) {
    return `<main><article><h1>${escapeHtml(job.title)}</h1><p>${escapeHtml(job.company)}${job.city ? ` · ${escapeHtml(job.city)}` : ""}</p><p>${escapeHtml(job.summary || job.description || "")}</p><h2>Job details</h2><dl><dt>Experience</dt><dd>${escapeHtml(job.experience || "")}</dd><dt>Work mode</dt><dd>${escapeHtml(job.workMode || "")}</dd><dt>Category</dt><dd>${escapeHtml(job.category || "")}</dd></dl><p><a href="${escapeHtml(job.applyLink || "#")}" rel="noopener noreferrer nofollow">Apply on the employer website</a></p></article></main>`;
}

function blogBody(blog) {
    return `<main><article><h1>${escapeHtml(blog.title)}</h1><p>${escapeHtml(blog.excerpt || "")}</p><p>By ${escapeHtml(blog.author || "TheJobInfo")}</p><section>${escapeHtml(String(blog.content || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").slice(0, 12000))}</section></article></main>`;
}

export default async function handler(req, res) {
    const type = req.query.type;
    const slug = String(req.query.slug || "").trim();
    const shell = await getShell();
    if (!["job", "blog"].includes(type) || !slug || slug.length > 200) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.end(applyPageMetadata(shell, {
            title: "Page not found",
            description: "The requested page could not be found.",
            canonical: `${SITE_URL}${req.url}`,
            robots: "noindex, follow",
            body: "<main><h1>Page not found</h1></main>",
        }));
    }

    try {
        let data;
        if (type === "job") {
            try {
                data = await fetchBackend(`/job/slug/${encodeURIComponent(slug)}`);
            } catch (error) {
                if (error.status !== 404) throw error;
                data = await fetchBackend(`/job/id/${encodeURIComponent(slug)}`);
            }
        } else {
            const response = await fetchBackend(`/blog/slug/${encodeURIComponent(slug)}`);
            data = response.blog;
        }
        if (!data) throw Object.assign(new Error("Content not found"), { status: 404 });

        const title = type === "job" ? `${data.title} at ${data.company}` : data.title;
        const description = String(data.summary || data.excerpt || data.description || "Job listings and practical career guidance.").replace(/\s+/g, " ").slice(0, 300);
        const canonical = `${SITE_URL}/${type === "job" ? `jobdetail/${data.slug || slug}` : `blogs/${data.slug || slug}`}`;
        const jsonLd = type === "job" ? {
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: data.title,
            description: data.summary || data.description || "",
            ...(data.postedAt || data.createdAt ? { datePosted: data.postedAt || data.createdAt } : {}),
            ...(data.expiresAt ? { validThrough: data.expiresAt } : {}),
            directApply: false,
            hiringOrganization: { "@type": "Organization", name: data.company },
        } : {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: data.title,
            description: data.excerpt || "",
            ...(data.createdAt ? { datePublished: data.createdAt } : {}),
            ...(data.updatedAt ? { dateModified: data.updatedAt } : {}),
            author: { "@type": "Person", name: data.author || "TheJobInfo" },
        };
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.end(applyPageMetadata(shell, {
            title,
            description,
            canonical,
            robots: "index, follow",
            jsonLd,
            body: type === "job" ? jobBody(data) : blogBody(data),
        }));
    } catch (error) {
        if (error.status === 404 || error.status === 410) {
            res.statusCode = error.status === 410 ? 410 : 404;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            return res.end(applyPageMetadata(shell, {
                title: error.status === 410 ? "Job no longer available" : "Page not found",
                description: "This listing is unavailable. Browse current jobs and guides.",
                canonical: `${SITE_URL}${req.url}`,
                robots: "noindex, follow",
                body: `<main><h1>${error.status === 410 ? "This job is no longer accepting applications" : "Page not found"}</h1><p><a href="/Job-Portal">Browse current jobs</a></p></main>`,
            }));
        }
        console.error("Page metadata backend unavailable:", error.message);
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.end(shell);
    }
}
