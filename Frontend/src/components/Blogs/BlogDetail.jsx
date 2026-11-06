
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Breadcrumb from '../Common/Breadcrumb';
import { baseUrl } from '../../Baseurl';
import BlogCard, { AutoBlogImageCompact, CATEGORY_COLORS, DIFF_COLORS } from './BlogCard';
import { siteConfig } from '../../siteConfig';
import { useSeo } from '../../hooks/useSeo';
import AdSlot from '../AdSlot';
import ReadingProgressBar from '../Common/ReadingProgressBar';

import {
    BookOpen, Clock, Tag, Star, TrendingUp, ArrowRight, ArrowLeft,
    ChevronDown, List, Send, Calendar, Users, Briefcase,
    Facebook, Twitter, Linkedin, Link2, IndianRupee, RefreshCw, CheckCircle2, Youtube
} from 'lucide-react';

// BlogDetail — single blog page.
// API: GET /blog/slug/:slug  → { success, blog }
// API: GET /blog?limit=20&sort=newest  → { success, blogs, ... }
// API: GET /job  → array of jobs

const TELEGRAM_LINK = siteConfig.telegram;

const GRADIENTS_BLOG = [
    'from-blue-500 to-teal-600',
    'from-teal-500 to-cyan-600',
    'from-sky-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-cyan-500 to-teal-600',
    'from-emerald-500 to-cyan-600',
];

const colorfulGradients = [
    'from-blue-500 to-sky-400',
    'from-blue-500 to-cyan-400',
    'from-green-500 to-emerald-400',
    'from-teal-500 to-cyan-400',
    'from-cyan-500 to-teal-400',
    'from-sky-500 to-sky-400',
];

const BLOG_ACCENTS = {
    rose: "border-cyan-500",
    blue: "border-blue-500",
    green: "border-green-500",
    orange: "border-orange-500",
    red: "border-red-500",
    teal: "border-teal-500",
    cyan: "border-cyan-500",
    gray: "border-gray-500",
};

const blogBlockStyle = (style = {}) => {
    const color = /^#[0-9a-f]{6}$/i.test(style.textColor || "") ? style.textColor : undefined;
    const backgroundColor = /^#[0-9a-f]{6}$/i.test(style.backgroundColor || "") ? style.backgroundColor : undefined;
    const readableColor = color && backgroundColor ? isBlogTextReadable(color, backgroundColor) : true;
    return {
        '--blog-block-color': color && (!backgroundColor || readableColor)
            ? color
            : backgroundColor && isBlogTextReadable("#111827", backgroundColor) ? "#111827"
                : "#ffffff",
        ...(backgroundColor ? { backgroundColor } : {}),
        textAlign: ["left", "center", "right"].includes(style.align) ? style.align : undefined,
        fontSize: ({ S: "0.875rem", M: "1rem", L: "1.125rem" })[style.fontSize],
        fontWeight: style.bold ? 700 : undefined,
        fontStyle: style.italic ? "italic" : undefined,
    };
};

function isBlogTextReadable(textColor, backgroundColor) {
    const luminance = (hex) => [1, 3, 5].map((index) => {
        const channel = parseInt(hex.slice(index, index + 2), 16) / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
    const [light, dark] = [luminance(textColor), luminance(backgroundColor)].sort((a, b) => b - a);
    return (light + 0.05) / (dark + 0.05) >= 4.5;
}

const formatDate = (d) => {
    if (!d) return '';
    const dt = new Date(d);
    if (isNaN(dt)) return '';
    return dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const isHttpUrl = (value) => {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol);
    } catch {
        return false;
    }
};

const getBlockHeadingId = (block, index) => {
    const slug = (block.heading || 'section')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    return `blog-block-${index}-${slug || 'section'}`;
};

const getPlainText = (html) => {
    const sanitized = DOMPurify.sanitize(html || '', { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
    const decoder = document.createElement('textarea');
    decoder.innerHTML = sanitized;
    return decoder.value.trim();
};

const CodeBlock = ({ code, language }) => {
    const [copyState, setCopyState] = useState("idle");
    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(code || "");
            setCopyState("copied");
        } catch (error) {
            console.error("Could not copy code block:", error);
            setCopyState("error");
        }
    };

    return (
        <div className="relative my-6">
            <button type="button" onClick={copyCode} className="absolute right-3 top-3 rounded-md border border-gray-600 px-2 py-1 text-xs font-semibold text-gray-200 hover:bg-gray-800" aria-live="polite">
                {copyState === "copied" ? "Copied" : copyState === "error" ? "Copy failed" : "Copy"}
            </button>
            <pre className="max-w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-950 p-4 pt-12 text-sm text-gray-100">
                <code className={language ? `language-${language}` : undefined}>{code || ''}</code>
            </pre>
        </div>
    );
};

const BlogContentBlock = ({ block, index, firstFaqIndex }) => {
    const richHtml = (html) => ({ __html: DOMPurify.sanitize(html || '') });
    const headingId = block.type === 'heading' ? getBlockHeadingId(block, index) : undefined;
    const sectionHeading = block.heading && block.type !== 'heading' && block.type !== 'link';
    const isFirstFaq = block.type === 'faq' && index === firstFaqIndex;

    switch (block.type) {
        case 'heading': {
            const level = Number(block.level);
            const Heading = level === 4 ? 'h4' : level === 3 ? 'h3' : 'h2';
            const size = level === 4
                ? 'text-sm sm:text-base'
                : level === 3
                    ? 'text-base sm:text-lg'
                    : 'text-lg sm:text-xl';
            return <Heading id={headingId} className={`scroll-mt-24 ${size} font-bold text-gray-900 dark:text-white mt-8 mb-4`}>{block.heading}</Heading>;
        }
        case 'paragraph':
            return (
                <section className="my-5">
                    {sectionHeading && <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{block.heading}</h3>}
                    <div className="prose prose-sm sm:prose-base prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 [&_a]:text-blue-700 dark:[&_a]:text-blue-300 [&_img]:rounded-xl [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto" dangerouslySetInnerHTML={richHtml(block.content)} />
                </section>
            );
        case 'image':
            return isHttpUrl(block.url) ? (
                <figure className="my-7">
                    <img src={block.url} alt={block.alt || ''} loading="lazy" className="w-full max-h-[34rem] rounded-2xl border border-gray-200 dark:border-gray-700 object-contain bg-gray-50 dark:bg-gray-800" />
                    {block.caption && <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">{block.caption}</figcaption>}
                </figure>
            ) : null;
        case 'quote':
            return (
                <blockquote className="my-6 rounded-r-xl border-l-4 border-teal-500 bg-teal-50 dark:bg-teal-950/30 px-5 py-4 text-gray-700 dark:text-gray-300">
                    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none" dangerouslySetInnerHTML={richHtml(block.content)} />
                    {block.heading && <cite className="mt-3 block text-sm not-italic font-semibold text-teal-700 dark:text-teal-300">{block.heading}</cite>}
                </blockquote>
            );
        case 'list': {
            const listType = block.listType || (block.ordered ? 'numbered' : 'bullet');
            const ListTag = listType === 'numbered' ? 'ol' : 'ul';
            return (
                <section className="my-5">
                    {sectionHeading && <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{block.heading}</h3>}
                    <ListTag className={`${listType === 'numbered' ? 'list-decimal pl-6' : listType === 'checklist' ? 'list-none pl-0' : 'list-disc pl-6'} space-y-2 text-gray-700 dark:text-gray-300`}>
                        {(block.items || []).map((item, itemIndex) => (
                            <li key={`${itemIndex}-${item}`} className={listType === 'checklist' ? 'flex items-start gap-2' : undefined}>
                                {listType === 'checklist' && <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />}
                                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item || '') }} />
                            </li>
                        ))}
                    </ListTag>
                </section>
            );
        }
        case 'callout':
            return (
                <aside className="my-6 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4 sm:p-5">
                    {sectionHeading && <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">{block.heading}</h3>}
                    <div className="prose prose-sm dark:prose-invert max-w-none text-blue-950 dark:text-blue-100" dangerouslySetInnerHTML={richHtml(block.content)} />
                </aside>
            );
        case 'code':
            return (
                <section className="my-6">
                    {sectionHeading && <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{block.heading}</h3>}
                    <CodeBlock code={block.content} language={block.language} />
                </section>
            );
        case 'faq':
            return (
                <section id={isFirstFaq ? 'blog-faqs' : undefined} className="my-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-5 scroll-mt-24">
                    {isFirstFaq && <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Frequently asked questions</h2>}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">{block.question}</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={richHtml(block.answer)} />
                </section>
            );
        case 'link':
        case 'button':
            return isHttpUrl(block.url) ? (
                <p className="my-5">
                    <a href={block.url} rel="nofollow noopener noreferrer" className="inline-flex max-w-full items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 break-all">
                        {block.heading} <ArrowRight className="h-4 w-4 shrink-0" />
                    </a>
                </p>
            ) : null;
        case 'table':
            return (
                <div className="my-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>{(block.headers || []).map((header, headerIndex) => <th key={headerIndex} className="border-b border-gray-200 px-4 py-3 font-bold text-gray-800 dark:border-gray-700 dark:text-gray-100">{header}</th>)}</tr>
                        </thead>
                        <tbody>{(block.rows || []).map((row, rowIndex) => (
                            <tr key={rowIndex} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800/50">
                                {(Array.isArray(row) ? row : []).map((cell, cellIndex) => <td key={cellIndex} className="border-b border-gray-100 px-4 py-3 text-gray-700 dark:border-gray-800 dark:text-gray-300">{cell}</td>)}
                            </tr>
                        ))}</tbody>
                    </table>
                </div>
            );
        case 'divider':
            return <hr className="my-8 border-gray-200 dark:border-gray-700" />;
        default:
            return null;
    }
};

// ── Divider ───────────────────────────────────────────────────────────────────
const Divider = () => <hr className="border-gray-100 dark:border-gray-800 my-5" />;

// ── Section Title ─────────────────────────────────────────────────────────────
const SectionTitle = ({ text, id: sId }) => (
    <h2
        id={sId}
        className="text-base font-bold text-gray-900 dark:text-white mb-4 mt-6 uppercase tracking-wide scroll-mt-8"
    >
        {text}
    </h2>
);

// ── Table of Contents ─────────────────────────────────────────────────────────
const TableOfContents = ({ sections }) => {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="border-y border-gray-100 py-3 dark:border-gray-800">
            <p className="mb-2 text-sm font-bold text-gray-800 dark:text-gray-100">In this article</p>
            <ol className="space-y-1">
                {sections.map((s, i) => (
                    <li key={s.id} className="flex items-start gap-2">
                        <span className="w-4 flex-shrink-0 text-xs font-bold text-gray-500 dark:text-gray-400">{i + 1}.</span>
                        <button onClick={() => scrollTo(s.id)} className="text-left text-sm font-semibold leading-snug text-blue-700 hover:underline dark:text-blue-300">{s.label}</button>
                    </li>
                ))}
            </ol>
        </div>
    );
};

// ── Share Bar ─────────────────────────────────────────────────────────────────
const ShareBar = ({ title, author }) => {
    const [copied, setCopied] = useState(false);
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `${title} by ${author} — Read now!`;
    const enc = encodeURIComponent;

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleNative = async () => {
        if (navigator.share) {
            try { await navigator.share({ title, text: shareText, url: shareUrl }); } catch (_) { }
        }
    };

    const socialLinks = [
        { href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`, bg: '#1877f2', icon: <Facebook className="w-3.5 h-3.5" /> },
        { href: `https://twitter.com/intent/tweet?url=${enc(shareUrl)}&text=${enc(shareText)}`, bg: '#1da1f2', icon: <Twitter className="w-3.5 h-3.5" /> },
        { href: `https://www.linkedin.com/shareArticle?mini=true&url=${enc(shareUrl)}&title=${enc(title)}`, bg: '#0077b5', icon: <Linkedin className="w-3.5 h-3.5" /> },
        { href: `https://t.me/share/url?url=${enc(shareUrl)}&text=${enc(shareText)}`, bg: '#0088cc', icon: <Send className="w-3.5 h-3.5" /> },
        {
            href: `https://api.whatsapp.com/send?text=${enc(shareText + '\n' + shareUrl)}`,
            bg: '#25d366',
            icon: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="flex flex-wrap items-center gap-2">

            {socialLinks.map((s, i) => (
                <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: s.bg }}
                >
                    {s.icon}
                </a>
            ))}
            <button
                onClick={copyLink}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
            >
                <Link2 className="w-3.5 h-3.5" />
            </button>
            {typeof navigator !== 'undefined' && navigator.share && (
                <button
                    onClick={handleNative}
                    className="h-8 px-3 rounded-lg flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold transition-colors border border-gray-200 dark:border-gray-700"
                >
                    Share
                </button>
            )}
            {copied && <span className="text-xs text-green-600 dark:text-green-400 font-bold">Copied!</span>}
        </div>
    );
};

// ── Prev / Next ───────────────────────────────────────────────────────────────
const PrevNextBar = ({ prev, next, onGo }) => (
    <div className="mt-5 grid grid-cols-2 gap-3">
        {/* Prev */}
        <div>
            {prev ? (
                <button
                    onClick={() => onGo(prev.slug)}
                    className="w-full text-left group border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-white dark:hover:bg-gray-900 transition-all"
                >
                    <p className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mb-1.5">
                        <ArrowLeft className="w-3 h-3" /> Previous
                    </p>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 leading-snug line-clamp-2">
                        {prev.title}
                    </p>
                </button>
            ) : (
                <div className="border border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-3.5">
                    <p className="flex items-center gap-1 text-xs text-gray-300 dark:text-gray-700 mb-1.5"><ArrowLeft className="w-3 h-3" /> Previous</p>
                    <p className="text-sm text-gray-300 dark:text-gray-700">No previous post</p>
                </div>
            )}
        </div>
        {/* Next */}
        <div>
            {next ? (
                <button
                    onClick={() => onGo(next.slug)}
                    className="w-full text-right group border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-white dark:hover:bg-gray-900 transition-all"
                >
                    <p className="flex items-center justify-end gap-1 text-xs text-gray-400 dark:text-gray-500 mb-1.5">
                        Next <ArrowRight className="w-3 h-3" />
                    </p>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 leading-snug line-clamp-2">
                        {next.title}
                    </p>
                </button>
            ) : (
                <div className="border border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-3.5 text-right">
                    <p className="flex items-center justify-end gap-1 text-xs text-gray-300 dark:text-gray-700 mb-1.5">Next <ArrowRight className="w-3 h-3" /></p>
                    <p className="text-sm text-gray-300 dark:text-gray-700">No next post</p>
                </div>
            )}
        </div>
    </div>
);

// ── Related Blogs Grid ────────────────────────────────────────────────────────
const RelatedBlogsGrid = ({ blogs, onGo }) => (
    <div id="read-next" className="mt-6">
        <div className="py-4 border-b border-gray-200 dark:border-gray-700 mb-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Read next</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {blogs.slice(0, 2).map((blog) => (
                <button
                    key={blog._id}
                    type="button"
                    onClick={() => onGo(blog.slug)}
                    className="group rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-blue-200 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-800"
                >
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-300">{blog.category}</p>
                    <p className="mt-1 text-sm font-extrabold leading-5 text-gray-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">{blog.title}</p>
                </button>
            ))}
        </div>
    </div>
);

// ── Loading Skeleton ──────────────────────────────────────────────────────────
const LoadingSkeleton = () => (
    <>
        <Navbar />
        <Breadcrumb extraTopPadding />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-5 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    <div className="lg:col-span-8 space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 space-y-3">
                                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
                                <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-full" />
                                <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
                                <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-4 space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 space-y-3">
                                <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
                                <div className="h-9 bg-gray-100 dark:bg-gray-800 rounded-xl" />
                                <div className="h-9 bg-gray-100 dark:bg-gray-800 rounded-xl" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
);

// ── Main BlogDetail ───────────────────────────────────────────────────────────
const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [allBlogs, setAllBlogs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const articleSchema = blog ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: blog.title,
        description: blog.excerpt,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt,
        author: { "@type": "Person", name: blog.author || siteConfig.founder, ...(blog.authorBio ? { description: blog.authorBio } : {}) },
        mainEntityOfPage: `${siteConfig.url}/blogs/${blog.slug}`,
    } : undefined;
    const breadcrumbSchema = blog ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Articles", item: `${siteConfig.url}/blogs` },
            { "@type": "ListItem", position: 3, name: blog.title, item: `${siteConfig.url}/blogs/${blog.slug}` },
        ],
    } : undefined;
    const faqBlocks = (blog?.blocks || []).filter(block => block.type === 'faq' && block.question && block.answer);
    const faqSchema = faqBlocks.length ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqBlocks.map(block => ({
            "@type": "Question",
            name: block.question,
            acceptedAnswer: { "@type": "Answer", text: getPlainText(block.answer) },
        })),
    } : undefined;
    useSeo({
        title: blog?.metaTitle || blog?.title || "Interview Article",
        description: blog?.metaDescription || blog?.excerpt || "Practical interview and career guidance.",
        canonical: blog ? `${siteConfig.url}/blogs/${blog.slug}` : undefined,
        robots: blog ? "index, follow" : "noindex, follow",
        jsonLd: blog ? [articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])] : undefined,
    });

    // Scroll top on slug change
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const [blogRes, blogsRes, jobsRes] = await Promise.all([
                    axios.get(`${baseUrl}/blog/slug/${slug}`),
                    axios.get(`${baseUrl}/blog`, { params: { limit: 20, sort: 'newest' } }),
                    axios.get(`${baseUrl}/job`, { params: { page: 1, limit: 12 } }),
                ]);
                setBlog(blogRes.data.blog);
                setAllBlogs(blogsRes.data.blogs || []);
                // /job may return array directly or { jobs: [...] }
                const jobData = jobsRes.data;
                setJobs(Array.isArray(jobData) ? jobData : (jobData.jobs || []));
            } catch (err) {
                console.error(err);
                setError('Failed to load this article. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [slug]);

    const goSlug = (s) => { window.scrollTo({ top: 0, behavior: 'instant' }); navigate(`/blogs/${s}`); };
    const goJob = (id) => { window.scrollTo({ top: 0, behavior: 'instant' }); navigate(`/jobdetail/${id}`); };

    if (loading) return <LoadingSkeleton />;

    if (error || !blog) return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
                <div className="text-center">
                    <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
                        {error || 'Article not found.'}
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-400 hover:border-blue-300 hover:text-blue-700 dark:hover:border-blue-700 dark:hover:text-blue-300 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" /> Go Back
                        </button>
                        {error && (
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" /> Retry
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

    const catColor = CATEGORY_COLORS[blog.category] || 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    const otherBlogs = allBlogs.filter(b => b.slug !== slug);
    const currentIndex = allBlogs.findIndex(b => b.slug === slug);
    const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
    const nextBlog = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;
    const freshJobs = jobs.filter(job => ['fresher', 'dual'].includes(String(job.level || '').toLowerCase()));
    const recentJobs = (freshJobs.length ? freshJobs : jobs).slice(0, 3);

    const contentBlocks = Array.isArray(blog.blocks) ? blog.blocks : [];
    const hasBlocks = contentBlocks.length > 0;
    const firstFaqIndex = contentBlocks.findIndex(block => block.type === 'faq');
    const tocSections = [
        ...contentBlocks
            .map((block, index) => block.type === 'heading' && block.heading && Number(block.level) <= 3
                ? { id: getBlockHeadingId(block, index), label: block.heading }
                : null)
            .filter(Boolean),
        firstFaqIndex >= 0 && { id: 'blog-faqs', label: 'Frequently asked questions' },
        { id: 'read-next', label: 'Read next' },
    ].filter(Boolean);

    return (
        <>
            <Navbar />
            <ReadingProgressBar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <Breadcrumb currentLabel={blog.title} extraTopPadding />

                <div className="max-w-7xl mx-auto px-4 sm:px-5 py-6 sm:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                        {/* ══ MAIN COLUMN ══════════════════════════════════════════ */}
                        <div className="lg:col-span-8">
                            <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">

                                {/* ── Header ── */}
                                <div className="page-hero-enter order-1 px-5 pb-4 pt-5 sm:px-7 sm:pt-6">
                                    <div className="min-w-0">
                                            {/* Badges */}
                                            <div className="mb-2 flex flex-wrap items-center gap-1.5">
                                                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${catColor}`}>
                                                    {blog.category}
                                                </span>
                                                {blog.difficulty && (
                                                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${DIFF_COLORS[blog.difficulty] || 'text-gray-600'}`}>
                                                        {blog.difficulty}
                                                    </span>
                                                )}
                                                {blog.featured && (
                                                    <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400">
                                                        <Star className="w-3 h-3 fill-current" /> Featured
                                                    </span>
                                                )}
                                            </div>

                                            <h1 className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-3xl">
                                                {blog.title}
                                            </h1>
                                            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 font-bold text-white">{(blog.author || siteConfig.founder || 'T').slice(0, 1).toUpperCase()}</span>
                                                <strong className="text-gray-800 dark:text-gray-200">{blog.author || siteConfig.founder}</strong>
                                                <span>Founder and Editor</span>
                                                {blog.createdAt && <span>Published {formatDate(blog.createdAt)}</span>}
                                                {blog.updatedAt && new Date(blog.updatedAt).getTime() > new Date(blog.createdAt || 0).getTime() + 60_000 && <span>Updated {formatDate(blog.updatedAt)}</span>}
                                                <span>{blog.readTime || 8} min read</span>
                                            </div>
                                    </div>

                                    {/* Meta chips */}
                                    <div className="hidden">
                                        <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium">
                                            <Clock className="w-3 h-3 text-blue-400" /> {blog.readTime} min read
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium">
                                            <TrendingUp className="w-3 h-3 text-teal-400" /> {blog.views || 0} views
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium">
                                            <Users className="w-3 h-3 text-green-400" /> {blog.author}
                                        </span>
                                    </div>
                                </div>

                                {/* ── Cover image ── */}
                                <div className="order-3 px-5 sm:px-7">
                                    <div className={`relative flex min-h-44 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${GRADIENTS_BLOG[0]} p-5 text-white sm:min-h-48 sm:p-6`}>
                                        <div aria-hidden="true" className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.8) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
                                        <div className="absolute -bottom-16 -right-12 h-48 w-48 rounded-full bg-white/15" />
                                        <span className="relative inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.18em]"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-slate-900"><BookOpen className="h-4 w-4" /></span> Interview article</span>
                                        <div className="relative mt-5">
                                            <h2 className="max-w-xl text-2xl font-extrabold leading-tight sm:text-3xl">{blog.heroTitle || blog.title}</h2>
                                            <div className="mt-4 flex gap-2"><span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-900">{blog.difficulty || 'Beginner'}</span><span className="rounded-full bg-black/20 px-3 py-1 text-[11px] font-semibold">{blog.readTime || 8} min read</span></div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Excerpt ── */}
                                {blog.excerpt && (
                                    <div className="order-4 px-5 pt-4 sm:px-7">
                                        <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                                            {blog.excerpt}
                                        </p>
                                    </div>
                                )}

                                {/* ── Table of Contents ── */}
                                <div className="order-2 px-5 py-2 sm:px-7">
                                    <TableOfContents sections={tocSections} />
                                </div>

                                {/* ── Article Body ── */}
                                <div id="blog-content" className="order-5 px-5 pb-6 sm:px-7">

                                    <div className="scroll-mt-8">
                                        {hasBlocks ? (
                                            <div className="max-w-none text-gray-700 dark:text-gray-300">
                                                {contentBlocks.map((block, index) => (
                                                    <React.Fragment key={block.id || block._id || `blog-block-${index}`}>
                                                        <div
                                                            className={`my-3 ${block.style?.accent ? `border-l-4 ${BLOG_ACCENTS[block.style.accent] || BLOG_ACCENTS.teal} pl-4` : ''} ${/^#[0-9a-f]{6}$/i.test(block.style?.textColor || '') || /^#[0-9a-f]{6}$/i.test(block.style?.backgroundColor || '') ? '[&_*]:!text-[var(--blog-block-color)]' : ''}`}
                                                            style={blogBlockStyle(block.style)}
                                                        >
                                                            <BlogContentBlock block={block} index={index} firstFaqIndex={firstFaqIndex} />
                                                        </div>
                                                        {index === 2 && <AdSlot name="blogArticle" />}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        ) : <div
                                            className="
                                                prose prose-sm sm:prose-base prose-gray dark:prose-invert max-w-none
                                                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                                                prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3
                                                prose-h3:text-base prose-h3:mt-5 prose-h3:mb-2
                                                prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-4
                                                prose-ul:space-y-1 prose-li:text-gray-600 dark:prose-li:text-gray-400
                                                prose-ol:space-y-1
                                                prose-strong:text-gray-800 dark:prose-strong:text-gray-200 prose-strong:font-bold
                                                prose-code:text-teal-600 dark:prose-code:text-teal-400 prose-code:bg-teal-50 dark:prose-code:bg-teal-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                                                prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:overflow-x-auto
                                                prose-a:text-blue-700 dark:prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline
                                                prose-blockquote:border-l-4 prose-blockquote:border-teal-400 prose-blockquote:bg-teal-50 dark:prose-blockquote:bg-teal-900/10 prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:not-italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
                                                prose-hr:border-gray-100 dark:prose-hr:border-gray-800
                                                prose-img:rounded-xl prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700 prose-img:mx-auto
                                                prose-table:text-sm prose-thead:bg-gray-50 dark:prose-thead:bg-gray-800 prose-th:text-gray-700 dark:prose-th:text-gray-300 prose-td:text-gray-600 dark:prose-td:text-gray-400
                                            "
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content || '') }}
                                        />}
                                    </div>

                                    <Divider />

                                    <section className="my-5 flex items-center gap-3 border-t border-gray-100 pt-5 dark:border-gray-800" aria-label="About the author">
                                        {blog.authorPhoto && isHttpUrl(blog.authorPhoto) ? (
                                            <img src={blog.authorPhoto} alt="" loading="lazy" className="h-12 w-12 flex-none rounded-full object-cover" />
                                        ) : <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 text-lg font-bold text-white">{(blog.author || siteConfig.founder || 'T').slice(0, 1).toUpperCase()}</span>}
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-extrabold text-gray-900 dark:text-white">Written by {blog.author || siteConfig.founder}</p>
                                            <p className="mt-0.5 text-xs leading-5 text-gray-600 dark:text-gray-300">{blog.authorBio || 'Founder and editor of TheJobInfo, sharing practical guidance for job seekers.'}</p>
                                        </div>
                                        <Link to="/About" className="flex-none text-xs font-bold text-blue-700 hover:underline dark:text-blue-300">About the author</Link>
                                    </section>
                                </div>
                            </article>

                            {/* Related Blogs */}
                            {otherBlogs.length > 0 && (
                                <RelatedBlogsGrid blogs={otherBlogs} onGo={goSlug} />
                            )}
                        </div>

                        {/* ══ SIDEBAR ══════════════════════════════════════════════ */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-6 space-y-4">
                                {/* Stay Updated */}
                                <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                                    <p className="text-lg font-bold text-gray-800 dark:text-white">Follow us</p>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Get job updates and career tips on our social channels.
                                    </p>
                                    <div className="mt-4 space-y-2.5">
                                        <a
                                            href={TELEGRAM_LINK}
                                            target="_blank" rel="noreferrer"
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-600"
                                        >
                                            <Send className="w-4 h-4" /> Join on Telegram
                                        </a>
                                        <a
                                            href={siteConfig.instagram}
                                            target="_blank" rel="noreferrer"
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-900"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                            </svg>
                                            Follow on Instagram
                                        </a>
                                        {siteConfig.youtube && (
                                            <a
                                                href={siteConfig.youtube}
                                                target="_blank" rel="noreferrer"
                                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700"
                                            >
                                                <Youtube className="h-4 w-4" /> Subscribe on YouTube
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Blog Categories */}
                                <div className="hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-700">
                                        <p className="text-lg font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Categories</p>
                                    </div>
                                    <div className="px-2 py-2">
                                        {['Interview Tips', 'DSA', 'System Design', 'HR Round', 'Resume Tips', 'Career Advice'].map(cat => (
                                            <a
                                                key={cat}
                                                href={`/blogs?category=${encodeURIComponent(cat)}`}
                                                className="flex items-center gap-2 text-md font-medium text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors px-3 py-2 rounded-xl"
                                            >
                                                <ArrowRight className="w-3 h-3 flex-shrink-0 text-gray-300 dark:text-gray-600" /> {cat}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Articles */}
                                {otherBlogs.length > 0 && (
                                    <div className="hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-700">
                                            <p className="text-lg font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Recent Articles</p>
                                        </div>
                                        <div className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {otherBlogs.slice(0, 5).map((b, idx) => (
                                                <div
                                                    key={b._id}
                                                    onClick={() => goSlug(b.slug)}
                                                    className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                                                >
                                                    <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                                                        {b.imageUrl ? (
                                                            <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className={`w-full h-full bg-gradient-to-br ${GRADIENTS_BLOG[idx % GRADIENTS_BLOG.length]} flex items-center justify-center`}>
                                                                <BookOpen className="w-3.5 h-3.5 text-white" />
                                                            </div>
                                                        )}

                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-md font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors leading-snug">
                                                            {b.title}
                                                        </p>
                                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">
                                                            {b.category} · {b.readTime} min
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="px-4 py-3 border-t border-gray-50 dark:border-gray-800">
                                            <Link to="/blogs" className="text-md font-bold text-blue-700 dark:text-blue-300 hover:underline flex items-center gap-1">
                                                All articles <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {/* Recent Jobs */}
                                {recentJobs.length > 0 && (
                                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-700">
                                            <p className="text-base font-bold text-gray-900 dark:text-white">Latest fresher jobs</p>
                                        </div>
                                        <div className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {recentJobs.map((job, idx) => (
                                                <div
                                                    key={job._id}
                                                    onClick={() => goJob(job._id)}
                                                    className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                                                >
                                                    <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-800 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                                                        {job.imageUrl ? (
                                                            <img src={job.imageUrl} alt={job.company} className="w-full h-full object-contain p-1" />
                                                        ) : (
                                                            <div className={`w-full h-full bg-gradient-to-br ${colorfulGradients[idx % colorfulGradients.length]} flex items-center justify-center`}>
                                                                <Briefcase className="w-3.5 h-3.5 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-md font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                                                            {job.title}
                                                        </p>
                                                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
                                                            {job.company}{job.location ? ` · ${job.location}` : ''}
                                                        </p>
                                                        {job.salary && (
                                                            <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-0.5 flex items-center gap-0.5">
                                                                <IndianRupee className="w-2.5 h-2.5" /> {job.salary}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="px-4 py-3 border-t border-gray-50 dark:border-gray-800">
                                            <Link to="/Job-Portal" className="text-md font-bold text-blue-700 dark:text-blue-300 hover:underline flex items-center gap-1">
                                                See all jobs <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {/* Telegram CTA */}
                                <div className="hidden p-4 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border border-sky-100 dark:border-sky-800/40 rounded-2xl">
                                    <p className="text-md font-bold text-gray-800 dark:text-gray-200 mb-1">Follow TheJobInfo for job information and career guidance.</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                                        Daily job alerts, off-campus drives &amp; interview tips on Telegram.
                                    </p>
                                    <a
                                        href={TELEGRAM_LINK || undefined}
                                        target="_blank" rel="noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white py-2.5 rounded-xl text-sm font-bold transition-colors"
                                    >
                                        <Send className="w-3.5 h-3.5" /> Join Free
                                    </a>
                                </div>

                                <AdSlot name="blogSidebar" />

                            </div>
                        </aside>
                        {/* ── end sidebar ── */}

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogDetail;
