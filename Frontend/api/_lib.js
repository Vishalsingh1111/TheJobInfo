export const SITE_URL = process.env.SITE_URL || "https://dcoder-7vi1.onrender.com";
export const BACKEND_URL = (process.env.BACKEND_URL || process.env.VITE_API_BASE_URL || "https://dcoder-backend.onrender.com").replace(/\/+$/, "");

export async function fetchBackend(path) {
    const response = await fetch(`${BACKEND_URL}${path}`, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(4500),
    });
    if (!response.ok) {
        const error = new Error(`Backend returned ${response.status}`);
        error.status = response.status;
        throw error;
    }
    return response.json();
}

export function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[character]);
}

export function escapeJsonLd(value) {
    return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function applyPageMetadata(html, { title, description, canonical, robots, jsonLd, body }) {
    const replaceMeta = (pattern, replacement) => {
        if (pattern.test(html)) html = html.replace(pattern, replacement);
        else html = html.replace("</head>", `${replacement}\n</head>`);
    };
    const setMeta = (attribute, key, content) => {
        replaceMeta(
            new RegExp(`<meta\\s+${attribute}=["']${key}["'][^>]*>`, "i"),
            `<meta ${attribute}="${key}" content="${escapeHtml(content)}">`
        );
    };

    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
    setMeta("name", "description", description);
    setMeta("name", "robots", robots);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    replaceMeta(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeHtml(canonical)}">`);
    replaceMeta(/<div\s+id=["']root["']><\/div>/i, `<div id="root">${body}</div>`);
    if (jsonLd) html = html.replace("</head>", `<script type="application/ld+json">${escapeJsonLd(jsonLd)}</script>\n</head>`);
    return html;
}
