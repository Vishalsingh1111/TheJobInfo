import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "../siteConfig";

const setMeta = (attribute, name, content) => {
    let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
    }
    element.setAttribute("content", content);
};

export function useSeo({ title, description, canonical, robots = "index, follow", jsonLd }) {
    const location = useLocation();
    useEffect(() => {
        const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
        const pageDescription = description || siteConfig.tagline;
        const canonicalUrl = canonical || `${siteConfig.url}${location.pathname}${location.search}`;

        document.title = pageTitle;
        setMeta("name", "description", pageDescription);
        setMeta("name", "robots", robots);
        setMeta("property", "og:title", pageTitle);
        setMeta("property", "og:description", pageDescription);
        setMeta("property", "og:url", canonicalUrl);

        let canonicalLink = document.head.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement("link");
            canonicalLink.rel = "canonical";
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.href = canonicalUrl;

        const previousSchema = document.getElementById("page-jsonld");
        previousSchema?.remove();
        if (jsonLd) {
            const script = document.createElement("script");
            script.id = "page-jsonld";
            script.type = "application/ld+json";
            script.textContent = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
            document.head.appendChild(script);
        }
    }, [title, description, canonical, robots, jsonLd, location.pathname, location.search]);
}
