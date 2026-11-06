
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DOMPurify from 'dompurify';
import { baseUrl } from '../../Baseurl';
import { siteConfig } from '../../siteConfig';
import { useSeo } from '../../hooks/useSeo';
import AdSlot from '../AdSlot';
import { isJobRecent } from '../Common/jobDateHelpers';
import ReadingProgressBar from '../Common/ReadingProgressBar';

import {
    MapPin, Briefcase, IndianRupee, CheckCircle2,
    ChevronRight, ArrowRight, ArrowLeft,
    Zap, AlertCircle, Send, List, Flame,
    Facebook, Twitter, Linkedin, Link2, Calendar, ChevronDown, Bookmark, Flag, Youtube
} from 'lucide-react';

const TELEGRAM_LINK = siteConfig.telegram;
const WHATSAPP_WFH_LINK = siteConfig.telegram;
const WHATSAPP_GOVT_LINK = siteConfig.telegram;



const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};
const parseRealDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return Number.isNaN(date.getTime()) ? null : date;
};
const daysAgo = (dateStr) => {
    const date = parseRealDate(dateStr);
    if (!date) return null;
    return Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
};

const SECTION_ACCENTS = {
    rose: "border-cyan-500",
    blue: "border-blue-500",
    green: "border-green-500",
    orange: "border-orange-500",
    red: "border-red-500",
    teal: "border-teal-500",
    cyan: "border-cyan-500",
    gray: "border-gray-500",
};

const toSectionItems = (content) => Array.isArray(content)
    ? content
    : String(content || "").split(/\r?\n/).map((text) => text.trim()).filter(Boolean);

const hasCustomSectionContent = (section) => {
    const { type, content } = section;
    if (type === "table") return Boolean(content?.headers?.length && content?.rows?.length);
    if (type === "keyValue") return Array.isArray(content) && content.some((row) => row?.label || row?.value);
    if (type === "links") return Array.isArray(content) && content.some((link) => link?.label && link?.url);
    if (["list", "numbered"].includes(type)) return Array.isArray(content) && content.some((item) => String(item || "").trim());
    if (type === "callout") return Boolean(String(typeof content === "string" ? content : content?.text || "").trim());
    return typeof content === "string" ? Boolean(content.replace(/<[^>]*>/g, "").trim()) : Boolean(content);
};

function isReadableTextColor(textColor, backgroundColor) {
    if (!/^#[0-9a-f]{6}$/i.test(textColor || "") || !/^#[0-9a-f]{6}$/i.test(backgroundColor || "")) return false;
    const luminance = (hex) => {
        const values = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255)
            .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
        return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
    };
    const [first, second] = [luminance(textColor), luminance(backgroundColor)].sort((a, b) => b - a);
    return (first + 0.05) / (second + 0.05) >= 4.5;
}

function JobSection({ section }) {
    const { content, style = {}, type } = section;
    const backgroundColor = /^#[0-9a-f]{6}$/i.test(style.backgroundColor || "") ? style.backgroundColor : undefined;
    const customTextColor = /^#[0-9a-f]{6}$/i.test(style.textColor || "") ? style.textColor : undefined;
    const textColor = customTextColor && backgroundColor && !isReadableTextColor(customTextColor, backgroundColor)
        ? (isReadableTextColor("#111827", backgroundColor) ? "#111827" : "#ffffff")
        : customTextColor;
    const titleColor = /^#[0-9a-f]{6}$/i.test(style.titleColor || "") ? style.titleColor : undefined;
    const align = ["left", "center", "right"].includes(style.align) ? style.align : "left";
    const fontSizes = { S: "text-sm", M: "text-base", L: "text-lg" };
    const baseStyle = {
        ...(backgroundColor ? { backgroundColor } : {}),
        ...(textColor ? { color: textColor } : {}),
        textAlign: align,
        ...(style.bold ? { fontWeight: 700 } : {}),
        ...(style.italic ? { fontStyle: "italic" } : {}),
    };
    const items = toSectionItems(content);
    const safeHref = (href) => {
        try {
            const url = new URL(href);
            return ["http:", "https:"].includes(url.protocol) ? url.href : null;
        } catch {
            return null;
        }
    };
    const rows = content && !Array.isArray(content) && typeof content === "object" ? content : {};

    return (
        <section id={`custom-${section.id}`} className={`scroll-mt-8 border-l-4 ${SECTION_ACCENTS[style.accent] || SECTION_ACCENTS.teal} pl-4`}>
            <h2
                className={`mb-4 text-lg font-bold leading-snug text-gray-900 dark:text-white ${fontSizes[style.fontSize] || ""}`}
                style={titleColor ? { color: titleColor } : undefined}
            >
                {section.title}
            </h2>
            <div className="rounded-xl p-4 text-gray-600 dark:text-gray-300" style={baseStyle}>
                {type === "text" && (
                    <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(String(content || "")) }} />
                )}
                {(type === "list" || type === "numbered") && (
                    type === "numbered"
                        ? <ol className="list-decimal space-y-2 pl-5">{items.map((item, index) => <li key={index}>{String(item)}</li>)}</ol>
                        : <ul className="list-disc space-y-2 pl-5">{items.map((item, index) => <li key={index}>{String(item)}</li>)}</ul>
                )}
                {type === "keyValue" && (
                    <dl className="divide-y divide-gray-200/60 dark:divide-gray-700/60">
                        {toSectionItems(content).map((row, index) => {
                            const pair = typeof row === "object" && row !== null ? row : {};
                            return <div key={index} className="grid gap-1 py-2 sm:grid-cols-3"><dt className="font-semibold">{pair.label}</dt><dd className="sm:col-span-2">{pair.value}</dd></div>;
                        })}
                    </dl>
                )}
                {type === "table" && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead><tr>{(rows.headers || []).map((header, index) => <th key={index} className="border-b border-gray-300/70 px-3 py-2 font-bold dark:border-gray-600">{header}</th>)}</tr></thead>
                            <tbody>{(rows.rows || []).map((row, rowIndex) => <tr key={rowIndex}>{(Array.isArray(row) ? row : []).map((cell, cellIndex) => <td key={cellIndex} className="border-b border-gray-200/60 px-3 py-2 dark:border-gray-700/60">{cell}</td>)}</tr>)}</tbody>
                        </table>
                    </div>
                )}
                {type === "callout" && <p className="whitespace-pre-line">{typeof content === "string" ? content : content?.text}</p>}
                {type === "links" && (
                    <ul className="space-y-2">
                        {items.map((link, index) => {
                            const href = safeHref(link?.url);
                            return href ? <li key={index}><a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline dark:text-blue-300">{link.label || href}</a></li> : null;
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}

export function buildSections(job) {
    if (!job) return [];
    const hidden = new Set(Array.isArray(job.hiddenSections) ? job.hiddenSections : []);
    const hasText = (value) => Boolean(String(value || "").trim());
    const hasList = (value) => toSectionItems(value).length > 0;
    const sections = [
        { id: "about", anchor: "toc-about", label: `About ${job.company}`, visible: hasText(job.aboutCompany) },
        { id: "overview", anchor: "toc-overview", label: "At a glance", visible: true },
        { id: "summary", anchor: "toc-summary", label: "Role summary", visible: hasText(job.summary) },
        { id: "responsibilities", anchor: "toc-responsibilities", label: "Role & Responsibilities", visible: hasText(job.description) || hasList(job.responsibilities) },
        { id: "eligibility", anchor: "toc-eligibility", label: "Eligibility & Skills", visible: hasList(job.eligibility) || hasList(job.requiredSkills) },
        { id: "applyIf", anchor: "toc-applyif", label: "Who Should Apply", visible: hasList(job.applyIf) },
        { id: "selectionProcess", anchor: "toc-selection", label: "Selection Process", visible: hasList(job.selectionProcess) },
        { id: "benefits", anchor: "toc-benefits", label: `Benefits at ${job.company}`, visible: hasList(job.benefits) },
        { id: "applySteps", anchor: "toc-howto", label: "How to Apply", visible: hasList(job.applySteps) },
        {
            id: "prepGuide",
            anchor: "toc-prep-guide",
            label: "How to prepare for this role",
            visible: Boolean(job.prepGuide && Object.values(job.prepGuide).some((value) => hasList(value))),
        },
        { id: "faqs", anchor: "toc-faqs", label: "Frequently asked questions", visible: hasList(job.faqs) },
        {
            id: "applyLinks",
            anchor: "toc-links",
            label: "Apply Links",
            visible: Boolean(job.applyLink || WHATSAPP_WFH_LINK || WHATSAPP_GOVT_LINK),
        },
    ].filter((section) => section.visible && !hidden.has(section.id));
    const customs = (Array.isArray(job.customSections) ? job.customSections : [])
        .filter((section) => section?.visible !== false && section?.id && section?.title && hasCustomSectionContent(section))
        .map((section) => ({
            id: section.id,
            anchor: `custom-${section.id}`,
            label: section.title,
            visible: true,
            custom: section,
        }));
    const allSections = [...sections, ...customs];
    const preferredOrder = new Map((Array.isArray(job.sectionOrder) ? job.sectionOrder : []).map((id, index) => [id, index]));
    return allSections.sort((a, b) => {
        const orderA = preferredOrder.get(a.id);
        const orderB = preferredOrder.get(b.id);
        if (orderA !== undefined || orderB !== undefined) {
            return (orderA ?? Number.MAX_SAFE_INTEGER) - (orderB ?? Number.MAX_SAFE_INTEGER);
        }
        return 0;
    });
}

// ── Helper: get the URL identifier (slug preferred, fallback _id) ─────────────
const getJobIdentifier = (job) => job?.slug || job?._id;

// ── Helper: clean role for sharing ────────────────────────────────────────────
// "S&P Global Recruitment 2026 | Analyst II, Information Security | Experienced Candidates"
//   → "Analyst II, Information Security"
const getCleanRole = (title) => {
    if (!title) return '';
    const parts = title.split('|').map(p => p.trim()).filter(Boolean);
    if (parts.length >= 3) return parts[1];
    if (parts.length === 2) {
        const noise = /(recruitment|hiring|drive|off campus|20\d{2}|experienced candidates|freshers?)/i;
        const good = parts.filter(p => !noise.test(p));
        return good[0] || parts[1];
    }
    return title.trim();
};


// ── Helper: public job URL (picks the current site URL automatically) ─────────
const getShareUrl = (job) => `${window.location.origin}/jobdetail/${getJobIdentifier(job)}`;

const DETAIL_TONE_CLASSES = {
    rose: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
    green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300",
    red: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300",
    teal: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",
    gray: "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};

// ── Helper: build the exact share message from the Job Details Table ──────────
const buildShareMessage = (job) => {
    const lines = [
        `${job.company || 'Company'} is Hiring :—`,
        '————————————————————-',
        '',
    ];

    if (job.company) lines.push(`Company: ${job.company}`);
    const role = getCleanRole(job.title);
    if (role) lines.push(`Role : ${role}`);
    if (job.salary) lines.push(`Salary: ${job.salary}`);
    if (job.location) lines.push(`Location : ${job.location}`);
    if (job.jobType) lines.push(`Job Type : ${job.jobType}`);
    if (job.experience) lines.push(`Experience: ${job.experience}`);
    if (job.lastDate) lines.push(`Last Date: ${job.lastDate}`);
    const posted = formatDate(job.createdAt);
    if (posted) lines.push(`Posted On: ${posted}`);

    lines.push('');
    lines.push(`Apply Link: ${getShareUrl(job)}`);

    return lines.join('\n');
};

// ─────────────────────────────────────────────────────────────────────────────
// GRADIENTS
// ─────────────────────────────────────────────────────────────────────────────
const GRADIENTS = [
    'from-emerald-600 to-teal-500',
    'from-teal-600 to-cyan-500',
    'from-green-600 to-emerald-500',
    'from-emerald-600 to-teal-500',
    'from-teal-600 to-cyan-500',
    'from-green-600 to-emerald-500',
    'from-emerald-600 to-teal-500',
    'from-teal-600 to-cyan-500',
];

const getGradient = (company) => {
    const hash = [...(company || 'X')].reduce((a, c) => a + c.charCodeAt(0), 0);
    return GRADIENTS[hash % GRADIENTS.length];
};

// ── Auto Image for DETAIL PAGE (full size) ────────────────────────────────────
const AutoJobImage = ({ title, company, location, salary }) => {
    return (
        <div className="mx-5 my-5 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 px-6 py-8 text-left shadow-sm sm:mx-7 sm:px-8">
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[.2em] text-white/80">We are hiring</p>
            <p className="mb-2 text-sm font-bold text-white/90">{company}</p>
            <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">{title}</h2>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
                {location && (
                    <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-white">
                        <MapPin className="h-3.5 w-3.5" /> {location}
                    </span>
                )}
                {salary && (
                    <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-white">
                        <IndianRupee className="h-3.5 w-3.5" /> {salary}
                    </span>
                )}
            </div>
        </div>
    );
};

// ── Auto Image for RELATED POSTS (compact, smaller) ───────────────────────────
const AutoJobImageCompact = ({ title, company, location }) => {
    const gradient = getGradient(company);
    return (
        <div className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br ${gradient} px-3 py-3 text-left sm:px-4`}>
            <div aria-hidden="true" className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.8) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
            <div aria-hidden="true" className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-white/15" />
            <div className="relative z-10 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[.16em] text-white/80 sm:text-[10px]">
                <Briefcase className="h-3 w-3" /> {company?.length > 20 ? `${company.slice(0, 20)}…` : company || 'TheJobInfo'}
            </div>
            <div className="relative z-10 mt-2">
                <p className="line-clamp-2 text-sm font-extrabold leading-snug text-white sm:text-base">{title}</p>
                {location && <span className="mt-2 inline-flex max-w-full items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[9px] font-semibold text-white sm:text-[10px]"><MapPin className="h-3 w-3 shrink-0" /><span className="truncate">{location}</span></span>}
            </div>
        </div>
    );
};

// ── Table of Contents ─────────────────────────────────────────────────────────
const TableOfContents = ({ sections }) => {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white"><List className="h-4 w-4 text-emerald-600" /> On this page</p>
            <div className="flex flex-wrap gap-2">
                {sections.map((section) => <button key={section.id} onClick={() => scrollTo(section.id)} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300">{section.label}</button>)}
            </div>
        </div>
    );
};

// ── Share Bar ─────────────────────────────────────────────────────────────────

const ShareBar = ({ item }) => {
    const [copied, setCopied] = useState(false);

    const shareUrl = getShareUrl(item);
    const fullMessage = buildShareMessage(item);
    const enc = encodeURIComponent;

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ text: fullMessage });
            } catch (e) { }
        }
    };

    const copyMessage = async () => {
        try {
            await navigator.clipboard.writeText(fullMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) { }
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* Facebook – accepts only the link (Facebook ignores pre-filled text) */}
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center bg-[#1877f2] hover:opacity-80 text-white transition-opacity" aria-label="Share on Facebook">
                <Facebook className="w-3.5 h-3.5" />
            </a>
            {/* Twitter / X – exact message */}
            <a href={`https://twitter.com/intent/tweet?text=${enc(fullMessage)}`} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center bg-[#1da1f2] hover:opacity-80 text-white transition-opacity" aria-label="Share on Twitter">
                <Twitter className="w-3.5 h-3.5" />
            </a>
            {/* LinkedIn – opens the post box with the exact message */}
            <a href={`https://www.linkedin.com/feed/?shareActive=true&text=${enc(fullMessage)}`} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center bg-[#0077b5] hover:opacity-80 text-white transition-opacity" aria-label="Share on LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
            </a>

            {/* Telegram – invisible url so only the bottom "Apply Link" shows */}
            <a href={`https://t.me/share/url?url=%E2%80%8B&text=${enc(fullMessage)}`} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center bg-[#0088cc] hover:opacity-80 text-white transition-opacity" aria-label="Share on Telegram">
                <Send className="w-3.5 h-3.5" />
            </a>

            {/* WhatsApp – exact message */}
            <a href={`https://wa.me/?text=${enc(fullMessage)}`} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center bg-[#25d366] hover:opacity-80 text-white transition-opacity" aria-label="Share on WhatsApp">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
            {/* Copy – copies the exact message */}
            <button onClick={copyMessage}
                className="w-8 h-8 rounded flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors" aria-label="Copy job details">
                <Link2 className="w-3.5 h-3.5" />
            </button>
            {/* Native share (mobile) – exact message */}
            {navigator.share && (
                <button onClick={handleNativeShare}
                    className="px-3 h-8 rounded flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-md font-bold transition-colors border border-gray-200 dark:border-gray-700">
                    Share
                </button>
            )}
            {copied && <span className="text-md text-green-600 dark:text-green-400 font-semibold ml-1">Copied!</span>}
        </div>
    );
};

// ── Prev / Next ───────────────────────────────────────────────────────────────
const PrevNextBar = ({ prevJob, nextJob, onCardClick }) => (
    <div className="mt-5 grid grid-cols-2 gap-3">
        <div>
            {prevJob ? (
                <button onClick={() => onCardClick(prevJob)}
                    className="w-full text-left group border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 hover:border-blue-300 dark:hover:border-blue-700 transition-all bg-transparent">
                    <p className="flex items-center gap-1 text-md text-gray-800 text-semibold dark:text-gray-500 mb-1.5">
                        <ArrowLeft className="w-3 h-3" /> Previous
                    </p>
                    <p className="text-md font-bold text-blue-700 dark:text-blue-300 group-hover:underline leading-snug line-clamp-2">
                        {prevJob.title} – {prevJob.company}
                    </p>
                </button>
            ) : (
                <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-3.5 bg-transparent">
                    <p className="flex items-center gap-1 text-md text-gray-300 dark:text-gray-700 mb-1.5">
                        <ArrowLeft className="w-3 h-3" /> Previous
                    </p>
                    <p className="text-md text-gray-300 dark:text-gray-700">No previous post</p>
                </div>
            )}
        </div>
        <div>
            {nextJob ? (
                <button onClick={() => onCardClick(nextJob)}
                    className="w-full text-right group border border-gray-200 dark:border-gray-700 rounded-xl p-3.5 hover:border-blue-300 dark:hover:border-blue-700 transition-all bg-transparent">
                    <p className="flex items-center justify-end gap-1 text-md text-gray-800 text-semibold dark:text-gray-500 mb-1.5">
                        Next <ArrowRight className="w-3 h-3" />
                    </p>
                    <p className="text-md font-bold text-blue-700 dark:text-blue-300 group-hover:underline leading-snug line-clamp-2">
                        {nextJob.title} – {nextJob.company}
                    </p>
                </button>
            ) : (
                <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-3.5 text-right bg-transparent">
                    <p className="flex items-center justify-end gap-1 text-md text-gray-300 dark:text-gray-700 uppercase mb-1.5">
                        Next <ArrowRight className="w-3 h-3" />
                    </p>
                    <p className="text-md text-gray-300 dark:text-gray-700">No next post</p>
                </div>
            )}
        </div>
    </div>
);

// ── Related Posts ─────────────────────────────────────────────────────────────
const RelatedPostsGrid = ({ jobs, onCardClick }) => {
    return (
        <div className="bg-transparent dark:bg-transparent overflow-hidden mt-5">
            <div className="py-4 border-b border-gray-300 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase">Related Posts</h2>
            </div>
            <div className="py-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
                {jobs.slice(0, 6).map((job) => (
                    <div key={job._id} onClick={() => onCardClick(job)} className="cursor-pointer group flex flex-col">
                        <div className="w-full aspect-[5/3] rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 mb-2">
                            <AutoJobImageCompact title={job.title} company={job.company} location={job.location} />
                            {job.imageUrl && <img src={job.imageUrl} alt={`${job.company} — ${job.title}`}
                                className="relative z-10 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(event) => { event.currentTarget.style.display = 'none'; }} />}
                        </div>
                        <p className="text-md font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors leading-snug line-clamp-3 mb-1 px-1">
                            {job.title}{job.company ? ` | ${job.company}` : ''}{job.location ? ` | ${job.location}` : ''}
                        </p>
                        {job.createdAt && (
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-auto">{formatDate(job.createdAt)}</p>
                        )}
                    </div>
                ))}
            </div>
            {jobs.length > 6 && (
                <div className="px-4 pb-4 flex justify-center">
                    <Link to="/Job-Portal"
                        className="flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-lg font-semibold text-gray-600 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-300 transition-all bg-transparent">
                        Show more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            )}
        </div>
    );
};

// ── Colorful icon for sidebar recent jobs ─────────────────────────────────────
const colorfulGradients = [
    'from-blue-500 to-sky-400',
    'from-blue-500 to-cyan-400',
    'from-green-500 to-emerald-400',
    'from-teal-500 to-cyan-400',
    'from-cyan-500 to-teal-400',
    'from-sky-500 to-sky-400',
];

// ── Main Component ────────────────────────────────────────────────────────────
const JobDetail = () => {
    // ── useParams now reads :slug ──────────────────────────────────────────────
    const { slug } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expired, setExpired] = useState(false);
    const [relatedJobs, setRelatedJobs] = useState([]);
    const [openFaqId, setOpenFaqId] = useState(null);
    const [savedJob, setSavedJob] = useState(false);

    useEffect(() => {
        if (!item?._id) return;
        const syncSavedJob = () => {
            try {
                const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
                setSavedJob(Array.isArray(saved) && saved.some((job) => job?._id === item._id));
            } catch (error) {
                console.error("Could not read saved jobs:", error);
                setSavedJob(false);
            }
        };
        syncSavedJob();
        window.addEventListener("saved-jobs-updated", syncSavedJob);
        window.addEventListener("storage", syncSavedJob);
        return () => {
            window.removeEventListener("saved-jobs-updated", syncSavedJob);
            window.removeEventListener("storage", syncSavedJob);
        };
    }, [item?._id]);

    const toggleSavedJob = () => {
        try {
            const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
            const jobs = Array.isArray(saved) ? saved : [];
            const isSaved = jobs.some((job) => job?._id === item._id);
            const next = isSaved
                ? jobs.filter((job) => job?._id !== item._id)
                : [item, ...jobs];
            localStorage.setItem("savedJobs", JSON.stringify(next));
            setSavedJob(!isSaved);
            window.dispatchEvent(new Event("saved-jobs-updated"));
        } catch (error) {
            console.error("Could not save this job:", error);
        }
    };

    const schemaPostingDate = item ? parseRealDate(item.postedAt) || parseRealDate(item.createdAt) : null;
    const schemaClosingDate = item ? parseRealDate(item.expiresAt) || parseRealDate(item.lastDate) : null;
    const jobPostingSchema = item ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: item.title,
        description: item.summary || item.description,
        ...(schemaPostingDate ? { datePosted: schemaPostingDate.toISOString() } : {}),
        ...(schemaClosingDate ? { validThrough: schemaClosingDate.toISOString() } : {}),
        directApply: false,
        hiringOrganization: { "@type": "Organization", name: item.company },
        ...(item.city && item.city !== "Remote" ? {
            jobLocation: {
                "@type": "Place",
                address: { "@type": "PostalAddress", addressLocality: item.city, addressCountry: "IN" },
            },
        } : {}),
    } : undefined;
    const visibleFaqs = !item?.hiddenSections?.includes("faqs") && Array.isArray(item?.faqs)
        ? item.faqs.filter((faq) => String(faq?.question || "").trim() && String(faq?.answer || "").trim())
        : [];
    const faqSchema = visibleFaqs.length ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: visibleFaqs.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
        })),
    } : undefined;
    useSeo({
        title: item ? `${item.title} at ${item.company}` : "Job listing",
        description: item?.summary || item?.description || "Review job details and apply on the employer's website.",
        canonical: item?.slug ? `${siteConfig.url}/jobdetail/${item.slug}` : undefined,
        robots: item && !expired ? "index, follow" : "noindex, follow",
        jsonLd: [jobPostingSchema, faqSchema].filter(Boolean),
    });

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setItem(null);
        setItems([]);
        setRelatedJobs([]);
        setExpired(false);

        const getJobData = async () => {
            try {
                const detailResponse = await axios.get(`${baseUrl}/job/slug/${slug}`).catch(async (error) => {
                    if (error.response?.status === 404) return axios.get(`${baseUrl}/job/id/${slug}`);
                    if (error.response?.status === 410) {
                        if (!cancelled) setExpired(true);
                        try {
                            const relatedResponse = await axios.get(`${baseUrl}/job/related/${slug}`, { params: { limit: 6 } });
                            if (!cancelled) setRelatedJobs(Array.isArray(relatedResponse.data) ? relatedResponse.data : []);
                        } catch (relatedError) {
                            console.error("Could not load related jobs for the expired listing:", relatedError.message);
                        }
                        return null;
                    }
                    throw error;
                });
                if (cancelled) return;
                const detailJob = detailResponse?.data || null;
                setItem(detailJob);
                if (!detailJob) {
                    setItems([]);
                    setRelatedJobs([]);
                    return;
                }

                setItems([detailJob]);
                try {
                    const relatedResponse = await axios.get(
                        `${baseUrl}/job/related/${getJobIdentifier(detailJob)}`,
                        { params: { limit: 12 } }
                    );
                    if (cancelled) return;
                    const matchingJobs = Array.isArray(relatedResponse.data) ? relatedResponse.data : [];
                    setRelatedJobs(matchingJobs);
                    setItems([detailJob, ...matchingJobs]);
                } catch (relatedError) {
                    if (!cancelled) {
                        console.error('Error fetching related jobs:', relatedError.message);
                        setRelatedJobs([]);
                    }
                }
            } catch (error) {
                if (!cancelled) console.error('Error fetching job data:', error.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        getJobData();
        return () => { cancelled = true; };
    }, [slug]);

    // Navigate using slug when available, otherwise _id
    const handleCardClick = (job) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        const identifier = getJobIdentifier(job);
        navigate(`/jobdetail/${identifier}`);
    };

    const toArray = (val) => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        return val.split('\n').map(s => s.trim()).filter(Boolean);
    };

    const postingDate = item ? parseRealDate(item.postedAt || item.createdAt) : null;
    const postingAge = postingDate ? daysAgo(postingDate) : null;

    if (loading) {
        return (
            <>
                <Navbar />
                <ReadingProgressBar />
                <Breadcrumb extraTopPadding />
                <div className="min-h-screen bg-gray-50 pb-20 dark:bg-gray-950 lg:pb-0">
                    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8 space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 space-y-3">
                                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
                                    <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-full" />
                                    <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
                                </div>
                            ))}
                        </div>
                        <div className="lg:col-span-4 space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 space-y-3">
                                    <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
                                    <div className="h-9 bg-gray-100 dark:bg-gray-800 rounded-xl" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!item) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-white dark:bg-gray-950 py-24">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {expired ? "This job is no longer accepting applications" : "Job not found"}
                        </h1>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">
                            {expired ? "Browse current listings or check the employer's website for other openings." : "The requested job listing could not be found."}
                        </p>
                        <Link to="/Job-Portal" className="inline-block mt-6 text-teal-600 underline">Browse all jobs</Link>
                        {relatedJobs.length > 0 && (
                            <ul className="mt-8 space-y-3">
                                {relatedJobs.map((job) => (
                                    <li key={job._id}><Link className="underline" to={`/jobdetail/${job.slug}`}>{job.title} at {job.company}</Link></li>
                                ))}
                            </ul>
                        )}
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const responsibilities = toArray(item.responsibilities);
    const requirements = toArray(item.eligibility);
    const requiredSkills = toArray(item.requiredSkills);
    const selectionProcess = toArray(item.selectionProcess);
    const benefits = toArray(item.benefits);
    const applySteps = toArray(item.applySteps);
    const applyIf = toArray(item.applyIf);
    const prepTips = toArray(item.prepTips);
    const prepGuide = item.prepGuide && typeof item.prepGuide === "object" ? item.prepGuide : {};
    const pageSections = buildSections(item);
    const customSections = pageSections.filter((section) => section.custom).map((section) => section.custom);
    const hiddenSections = new Set(Array.isArray(item.hiddenSections) ? item.hiddenSections : []);

    const sortedItems = [...items];
    const currentIndex = sortedItems.findIndex(j => j._id === item._id);
    const prevJob = currentIndex > 0 ? sortedItems[currentIndex - 1] : null;
    const nextJob = currentIndex < sortedItems.length - 1 ? sortedItems[currentIndex + 1] : null;
    const otherJobs = items.filter(j => j._id !== item._id);
    const midJobs1 = otherJobs.slice(0, 3);
    const midJobs2 = otherJobs.slice(3, 7);

    const tocSections = pageSections.map(({ anchor, label }) => ({ id: anchor, label }));

    const SectionTitle = ({ text, id: sId }) => (
        <h2 id={sId} className="mb-4 mt-9 scroll-mt-8 border-l-4 border-teal-500 pl-3 text-xl font-bold leading-snug text-gray-900 dark:text-white">{text}</h2>
    );
    const Divider = () => <hr className="my-6 border-gray-100 dark:border-gray-800" />;

    const InlineJobsBlock = ({ jobs, title }) => {
        if (!jobs || jobs.length === 0) return null;
        return (
            <div className="my-4 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <p className="text-lg font-bold text-gray-800 dark:text-gray-500 uppercase px-4 pt-3 pb-2">{title}</p>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {jobs.map((job, idx) => (
                        <div key={job._id} onClick={() => handleCardClick(job)}
                            className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-all group">
                            <div className="w-7 h-7 rounded-md flex-shrink-0 overflow-hidden">
                                {job.imageUrl ? (
                                    <img src={job.imageUrl} alt={job.company} className="w-full h-full object-cover" />
                                ) : (
                                    <div className={`w-full h-full bg-gradient-to-br ${colorfulGradients[idx % colorfulGradients.length]} flex items-center justify-center`}>
                                        <Briefcase className="w-3.5 h-3.5 text-white" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-md font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">{job.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {job.company}{job.location ? ` · ${job.location}` : ''}{job.salary ? ` · ${job.salary}` : ''}
                                </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors flex-shrink-0" />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <ReadingProgressBar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <Breadcrumb extraTopPadding />
                <div className="max-w-7xl mx-auto px-4 sm:px-5 py-6 sm:py-8">
                    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">

                        {/* ══ MAIN COLUMN ══ */}
                        <div className="lg:col-span-8">

                            {/* ── SINGLE WHITE CARD ── */}
                            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm shadow-gray-900/5 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/10">

                                {/* Hero */}
                                <div className="page-hero-enter border-b border-gray-100 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 px-5 py-7 dark:border-gray-800 dark:from-emerald-950/20 dark:via-gray-900 dark:to-teal-950/10 sm:px-8 sm:py-9">
                                    <div className="flex items-start gap-4 sm:gap-5">
                                        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:h-16 sm:w-16">
                                            {item.imageUrl ? (
                                                <>
                                                    <img src={item.imageUrl} alt={item.company}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                                    <div className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-emerald-600 to-teal-500">
                                                        <Briefcase className="w-5 h-5 text-white" />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-600 to-teal-500">
                                                    <Briefcase className="h-6 w-6 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800 dark:bg-teal-900/40 dark:text-teal-300">
                                                    {item.jobType || 'Off Campus'}
                                                </span>
                                                {item.category && (
                                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                                        {item.category}
                                                    </span>
                                                )}
                                                {isJobRecent(item) && (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                                                        <Flame className="h-3.5 w-3.5" /> Posted recently
                                                    </span>
                                                )}
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                                    <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" /> Active listing
                                                </span>
                                            </div>
                                            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-4xl">{item.title}</h1>
                                            <p className="mt-2 text-lg font-bold text-teal-700 dark:text-teal-300">{item.company}</p>
                                            {postingDate && (
                                                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <Calendar className="h-4 w-4" /> Posted on {formatDate(postingDate)}
                                                    {postingAge !== null && ` · ${postingAge === 0 ? "today" : `${postingAge} days ago`}`}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-6 flex flex-wrap items-center gap-3">
                                        <button type="button" onClick={toggleSavedJob} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300">
                                            <Bookmark className={`h-4 w-4 ${savedJob ? "fill-current text-teal-600" : ""}`} />
                                            {savedJob ? "Saved" : "Save job"}
                                        </button>
                                        <Link to={`/Contact?jobUrl=${encodeURIComponent(window.location.href)}`} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-red-900 dark:hover:bg-red-950/20">
                                            <Flag className="h-4 w-4" /> Report this listing
                                        </Link>
                                    </div>
                                </div>

                                {/* Image / Auto banner */}
                                <div className="border-gray-100 dark:border-gray-800">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={`${item.company} – ${item.title}`}
                                            className="w-full h-auto object-contain bg-white dark:bg-gray-900" />
                                    ) : (
                                        <AutoJobImage
                                            title={item.title}
                                            company={item.company}
                                            location={item.location}
                                            salary={item.salary}
                                        />
                                    )}
                                </div>

                                {/* About Company */}
                                {item.aboutCompany && !hiddenSections.has('about') && (
                                    <div className="px-5 sm:px-7 pt-5 pb-0">
                                        <div id="toc-about" className="scroll-mt-8">
                                            <SectionTitle text={`About ${item.company}`} />
                                            <p className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{item.aboutCompany}</p>
                                        </div>
                                        <Divider />
                                    </div>
                                )}

                                {/* Table of Contents */}
                                <div className="px-5 sm:px-7 py-3 border-gray-100 dark:border-gray-800">
                                    <TableOfContents sections={tocSections} />
                                </div>

                                {/* ── Content sections ── */}
                                <div className="px-5 py-7 sm:px-8 sm:py-9">

                                    {/* Job Details Table */}
                                    {!hiddenSections.has('overview') && <div id="toc-overview" className="scroll-mt-8">
                                        <SectionTitle text="At a glance" />
                                        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                                            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {[
                                                { label: 'Company', value: item.company },
                                                { label: 'Role', value: item.title },
                                                { label: 'Salary', value: item.salary },
                                                { label: 'Location', value: item.location },
                                                { label: 'Job Type', value: item.jobType },
                                                { label: 'Experience', value: item.experience },
                                                { label: 'Last Date', value: item.lastDate },
                                                { label: 'Posted On', value: formatDate(item.createdAt) },
                                            ].filter((row) => row.value).map((row, index) => (
                                                <tr key={index} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40">
                                                    <td className="w-28 bg-gray-50 px-4 py-2.5 align-middle text-md font-bold text-gray-500 dark:bg-gray-500/50 dark:text-gray-400 sm:w-36">{row.label}</td>
                                                    <td className="px-4 py-2.5 align-middle text-md font-medium text-gray-800 dark:text-gray-200">
                                                        {row.label === 'Salary' ? (
                                                            <span className="font-bold text-green-600 dark:text-green-400">{row.value}</span>
                                                        ) : row.label === 'Job Type' ? (
                                                            <span className="rounded-full bg-teal-50 px-2 py-0.5 text-md font-bold text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">{row.value}</span>
                                                        ) : row.label === 'Last Date' ? (
                                                            <span className="font-bold text-red-600 dark:text-red-400">{row.value}</span>
                                                        ) : row.label === 'Posted On' ? (
                                                            <span className="flex items-center gap-1 text-md text-gray-500 dark:text-gray-400"><Calendar className="h-3 w-3" />{row.value}</span>
                                                        ) : row.value}
                                                    </td>
                                                </tr>
                                            ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        {item.salaryNote && (
                                            <p className="text-md text-gray-500 dark:text-gray-400 mt-2 flex items-start gap-1.5 leading-relaxed">
                                                <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5 text-amber-500" />
                                                {item.salaryNote}
                                            </p>
                                        )}
                                    </div>}

                                    {!hiddenSections.has('overview') && <Divider />}

                                    {/* Responsibilities */}
                                    {item.summary && !hiddenSections.has('summary') && (
                                        <>
                                            <section id="toc-summary" aria-labelledby="job-summary-heading">
                                                <SectionTitle id="job-summary-heading" text="Role summary" />
                                                <p className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{item.summary}</p>
                                            </section>
                                            <Divider />
                                        </>
                                    )}
                                    {(item.description || responsibilities.length > 0) && !hiddenSections.has('responsibilities') && (
                                        <>
                                            <div id="toc-responsibilities" className="scroll-mt-8">
                                                {item.description && !item.summary && (
                                                    <>
                                                        <SectionTitle text={`What does a ${item.title} do?`} />
                                                        <p className="text-md text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{item.description}</p>
                                                    </>
                                                )}

                                                {prepTips.length > 0 && (
                                                    <>
                                                        <section aria-labelledby="prep-tips-heading">
                                                            <SectionTitle id="prep-tips-heading" text="How to prepare for this role" />
                                                            <ul className="list-disc pl-5 space-y-2 text-md text-gray-600 dark:text-gray-400">
                                                                {prepTips.map((tip, index) => <li key={index}>{tip}</li>)}
                                                            </ul>
                                                        </section>
                                                        <Divider />
                                                    </>
                                                )}

                                                {responsibilities.length > 0 && (
                                                    <>
                                                        <SectionTitle text="Key Responsibilities" />
                                                        <ul className="space-y-2.5">
                                                            {responsibilities.map((r, i) => (
                                                                <li key={i} className="flex items-start gap-2.5">
                                                                    <div className="w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                        <ChevronRight className="w-2.5 h-2.5 text-teal-600 dark:text-teal-400" />
                                                                    </div>
                                                                    <span className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{r}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}
                                            </div>
                                            <Divider />
                                        </>
                                    )}

                                    {/* Inline jobs 1 */}
                                    {midJobs1.length > 0 && <InlineJobsBlock jobs={midJobs1} title="More jobs you might like" />}

                                    {/* Eligibility */}
                                    {(requirements.length > 0 || requiredSkills.length > 0) && !hiddenSections.has('eligibility') && (
                                        <>
                                            <div id="toc-eligibility" className="scroll-mt-8">
                                                {requirements.length > 0 && (
                                                    <>
                                                        <SectionTitle text="Eligibility Criteria" />
                                                        <ul className="space-y-2.5 mb-4">
                                                            {requirements.map((r, i) => (
                                                                <li key={i} className="flex items-start gap-2.5">
                                                                    <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                        <ChevronRight className="w-2.5 h-2.5 text-green-600 dark:text-green-400" />
                                                                    </div>
                                                                    <span className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{r}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}
                                                {requiredSkills.length > 0 && (
                                                    <>
                                                        <SectionTitle text="Required Skills" />
                                                        <div className="flex flex-wrap gap-2">
                                                            {requiredSkills.map((skill, i) => (
                                                                <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-md font-semibold">
                                                                    <Zap className="w-3 h-3 text-yellow-500" /> {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <Divider />
                                        </>
                                    )}

                                    {/* Who Should Apply */}
                                    {applyIf.length > 0 && !hiddenSections.has('applyIf') && (
                                        <>
                                            <div id="toc-applyif" className="scroll-mt-8">
                                                <SectionTitle text="Apply If You —" />
                                                <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-4">
                                                    <ul className="space-y-2.5">
                                                        {applyIf.map((point, i) => (
                                                            <li key={i} className="flex items-start gap-2">
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                                                <span className="text-md text-green-800 dark:text-green-300 leading-relaxed font-medium">{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <Divider />
                                        </>
                                    )}

                                    {/* Selection Process */}
                                    {selectionProcess.length > 0 && !hiddenSections.has('selectionProcess') && (
                                        <>
                                            <div id="toc-selection" className="scroll-mt-8">
                                                <SectionTitle text="Recruitment Rounds" />
                                                <ol className="space-y-2.5">
                                                    {selectionProcess.map((step, i) => (
                                                        <li key={i} className="flex items-center gap-2.5">
                                                            <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-orange-700 dark:text-orange-400 font-bold text-lg flex-shrink-0">
                                                                {i + 1}
                                                            </div>
                                                            <span className="text-md text-gray-600 dark:text-gray-400 font-medium">{step}</span>
                                                        </li>
                                                    ))}
                                                </ol>
                                                <p className="text-md text-gray-400 dark:text-gray-500 mt-2 italic">* Rounds may vary based on team and location</p>
                                            </div>
                                            <Divider />
                                        </>
                                    )}

                                    {/* Inline jobs 2 */}
                                    {midJobs2.length > 0 && <InlineJobsBlock jobs={midJobs2} title="More off campus drives" />}

                                    {/* Benefits */}
                                    {benefits.length > 0 && !hiddenSections.has('benefits') && (
                                        <>
                                            <div id="toc-benefits" className="scroll-mt-8">
                                                <SectionTitle text={`Benefits at ${item.company}`} />
                                                <ul className="space-y-2.5">
                                                    {benefits.map((b, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                                            <span className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{b}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <Divider />
                                        </>
                                    )}

                                    {/* How to Apply */}
                                    {applySteps.length > 0 && !hiddenSections.has('applySteps') && (
                                        <>
                                            <div id="toc-howto" className="scroll-mt-8">
                                                <SectionTitle text="Steps to Apply" />
                                                <ol className="space-y-2.5">
                                                    {applySteps.map((step, i) => (
                                                        <li key={i} className="flex items-start gap-2.5">
                                                            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-400 text-md font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                                                            <span className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">{step}</span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                            <Divider />
                                        </>
                                    )}

                                    {pageSections.some((section) => section.id === "prepGuide") && !hiddenSections.has("prepGuide") && (
                                        <>
                                            <section id="toc-prep-guide" className="scroll-mt-8">
                                                <SectionTitle text="How to prepare for this role" />
                                                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                                    Suggestions by TheJobInfo, not from the employer.
                                                </p>
                                                {prepGuide.overview && <p className="mb-4 text-md leading-relaxed text-gray-600 dark:text-gray-300">{prepGuide.overview}</p>}
                                                {[
                                                    ["Topics to revise", prepGuide.topicsToRevise],
                                                    ["Project ideas", prepGuide.projectIdeas],
                                                    ["Common mistakes", prepGuide.commonMistakes],
                                                ].filter(([, values]) => Array.isArray(values) && values.length > 0).map(([title, values]) => (
                                                    <div key={title} className="mb-5">
                                                        <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
                                                        {title === "Topics to revise" ? (
                                                            <div className="flex flex-wrap gap-2">{values.map((value, index) => <span key={index} className="rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">{value}</span>)}</div>
                                                        ) : (
                                                            <ul className="list-disc space-y-2 pl-5 text-md text-gray-600 dark:text-gray-300">{values.map((value, index) => <li key={index}>{value}</li>)}</ul>
                                                        )}
                                                    </div>
                                                ))}
                                                {Array.isArray(prepGuide.expectedRounds) && prepGuide.expectedRounds.length > 0 && (
                                                    <div className="mb-5">
                                                        <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-100">Expected rounds</h3>
                                                        <ol className="list-decimal space-y-2 pl-5 text-md text-gray-600 dark:text-gray-300">{prepGuide.expectedRounds.map((value, index) => <li key={index}>{value}</li>)}</ol>
                                                    </div>
                                                )}
                                                {Array.isArray(prepGuide.plan30Days) && prepGuide.plan30Days.length > 0 && (
                                                    <div>
                                                        <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-100">30-day preparation plan</h3>
                                                        <ol className="space-y-3 border-l-2 border-teal-200 pl-4 dark:border-teal-800">{prepGuide.plan30Days.map((value, index) => <li key={index} className="relative text-md text-gray-600 dark:text-gray-300"><span className="absolute -left-[1.35rem] top-1 h-3 w-3 rounded-full bg-teal-500" />{value}</li>)}</ol>
                                                    </div>
                                                )}
                                            </section>
                                            <Divider />
                                        </>
                                    )}

                                    {visibleFaqs.length > 0 && (
                                        <>
                                            <section id="toc-faqs" aria-labelledby="job-faq-heading">
                                                <SectionTitle id="job-faq-heading" text="Frequently asked questions" />
                                                <div className="space-y-3">
                                                    {visibleFaqs.map(({ question, answer }, index) => (
                                                        <div key={`${question}-${index}`} className="rounded-lg border border-gray-200 dark:border-gray-700">
                                                            <button
                                                                type="button"
                                                                aria-expanded={openFaqId === index}
                                                                aria-controls={`job-faq-answer-${index}`}
                                                                onClick={() => setOpenFaqId(openFaqId === index ? null : index)}
                                                                className="flex w-full items-center justify-between gap-4 p-4 text-left font-semibold text-gray-800 dark:text-gray-100"
                                                            >
                                                                {question}
                                                                <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform ${openFaqId === index ? "rotate-180" : ""}`} />
                                                            </button>
                                                            {openFaqId === index && (
                                                                <p id={`job-faq-answer-${index}`} className="px-4 pb-4 text-gray-600 dark:text-gray-400">{answer}</p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                            <Divider />
                                        </>
                                    )}

                                    {customSections.filter((section) => !hiddenSections.has(section.id)).map((section) => (
                                        <React.Fragment key={section.id}>
                                            <JobSection section={section} />
                                            <Divider />
                                        </React.Fragment>
                                    ))}

                                    {/* Apply Links */}
                                    {!hiddenSections.has('applyLinks') && <div id="toc-links" className="scroll-mt-8">
                                        <SectionTitle text="Apply Links" />
                                        <div className="grid gap-4">
                                            {item.applyLink && (
                                                <div className="flex flex-col gap-4 rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-5 dark:border-teal-900/70 dark:from-teal-950/40 dark:via-gray-900 dark:to-cyan-950/20 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                                                    <div>
                                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">Official application</p>
                                                        <p className="mt-2 text-base font-bold text-gray-900 dark:text-white">
                                                            Apply – {item.company} {item.jobType || 'Off Campus'}
                                                        </p>
                                                        <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">Review the employer’s current requirements and submit your application on their website.</p>
                                                    </div>
                                                    <a href={item.applyLink} target="_blank" rel="noopener noreferrer nofollow"
                                                        className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-900/15 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                                                        Apply Now <ArrowRight className="h-4 w-4" />
                                                    </a>
                                                </div>
                                            )}
                                            <div className="grid gap-3 sm:grid-cols-2">
                                            <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Work from Home Community</span>
                                                <a href={WHATSAPP_WFH_LINK} target="_blank" rel="noreferrer"
                                                    className="shrink-0 rounded-lg border border-blue-200 px-3 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-50 hover:text-blue-800 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950/30 dark:hover:text-blue-200">Join</a>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Government Job Group</span>
                                                <a href={WHATSAPP_GOVT_LINK} target="_blank" rel="noreferrer"
                                                    className="shrink-0 rounded-lg border border-blue-200 px-3 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-50 hover:text-blue-800 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950/30 dark:hover:text-blue-200">Join</a>
                                            </div>
                                            </div>
                                        </div>
                                    </div>}

                                    {!hiddenSections.has('applyLinks') && <Divider />}

                                    {/* Disclaimer */}
                                    <div className="text-md text-gray-500 dark:text-gray-400 leading-relaxed">
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Disclaimer: </span>
                                        The recruitment information provided is for informational purposes only. It has been obtained from the official website of the organisation. We have no affiliation with the company and do not provide any recruitment guarantees. There is no fee charged for this information. For more details, please visit our{' '}
                                        <Link to="/privacy-policy" className="text-red-500 hover:underline font-semibold">Privacy Policy</Link>.
                                    </div>

                                    <Divider />

                                    {/* Share */}
                                    <div>
                                        <ShareBar item={item} />
                                    </div>

                                </div>
                            </div>
                            {/* ── END SINGLE WHITE CARD ── */}

                            {!expired && <AdSlot name="jobDetail" />}

                            {/* Prev / Next */}
                            <PrevNextBar prevJob={prevJob} nextJob={nextJob} onCardClick={handleCardClick} />

                            {/* Related Posts */}
                            {otherJobs.length > 0 && (
                                <RelatedPostsGrid jobs={otherJobs} onCardClick={handleCardClick} />
                            )}

                        </div>
                        {/* ── end main col ── */}

                        {/* ══ SIDEBAR ══ */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-6 space-y-4">

                                {/* Follow us */}
                                <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                                    <p className="text-lg font-bold text-gray-800 dark:text-white">Follow us</p>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Get job updates and career tips on our social channels.
                                    </p>
                                    <div className="mt-4 space-y-2.5">
                                        <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer"
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-600">
                                            <Send className="w-4 h-4" /> Join on Telegram
                                        </a>
                                        <a href={siteConfig.instagram} target="_blank" rel="noreferrer"
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-900">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                            </svg>
                                            Follow on Instagram
                                        </a>
                                        {siteConfig.youtube && (
                                            <a href={siteConfig.youtube} target="_blank" rel="noreferrer"
                                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700">
                                                <Youtube className="h-4 w-4" /> Subscribe on YouTube
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Job categories */}
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700">
                                        <p className="text-lg font-bold text-gray-800 dark:text-gray-400 uppercase">Job categories</p>
                                    </div>
                                    <div className="px-4 py-2">
                                        {[
                                            { label: 'Internships', href: '/Internships' },
                                            { label: 'Freshers Jobs', href: '/Fresher-Jobs' },
                                            { label: 'Experienced Jobs', href: '/Experienced-Jobs' },
                                            { label: 'IT/Software Jobs', href: '/Job-Portal' },
                                        ].map(link => (
                                            <a key={link.label} href={link.href}
                                                className="flex items-center gap-2 text-md font-medium text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors py-2 border-gray-50 dark:border-gray-800 last:border-0">
                                                <ArrowRight className="w-3 h-3 flex-shrink-0 text-gray-300 dark:text-gray-600" /> {link.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Jobs */}
                                {otherJobs.length > 0 && (
                                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700">
                                            <p className="text-lg font-bold text-gray-800 dark:text-gray-400 uppercase">Recent Jobs</p>
                                        </div>
                                        <div className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {otherJobs.slice(0, 6).map((job, idx) => (
                                                <div key={job._id} onClick={() => handleCardClick(job)}
                                                    className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                                    <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                                                        {job.imageUrl ? (
                                                            <img src={job.imageUrl} alt={job.company} className="w-full h-full object-contain p-1 border border-gray-100 dark:border-gray-700 rounded-lg" />
                                                        ) : (
                                                            <div className={`w-full h-full bg-gradient-to-br ${colorfulGradients[idx % colorfulGradients.length]} flex items-center justify-center rounded-lg`}>
                                                                <Briefcase className="w-3.5 h-3.5 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-md font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors leading-snug">{job.title}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">{job.company}{job.location ? ` · ${job.location}` : ''}</p>
                                                        {job.createdAt && (
                                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 flex items-center gap-1">
                                                                <Calendar className="w-2.5 h-2.5" /> {formatDate(job.createdAt)}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="px-4 py-3 border-gray-100 dark:border-gray-800">
                                            <Link to="/Job-Portal" className="text-md font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1">
                                                See all openings <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {/* Telegram CTA */}
                                <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl">
                                    <p className="text-md text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                                        Follow the configured channel for job information and career guidance.
                                    </p>
                                    <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-xl text-lg font-bold transition-all">
                                        <Send className="w-3.5 h-3.5" /> Join free
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default JobDetail;
