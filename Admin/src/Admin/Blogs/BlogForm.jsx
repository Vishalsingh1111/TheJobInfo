

import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

import {
    Plus, Pencil, Trash2, Eye, EyeOff, Star, StarOff,
    Search, X, Save, ArrowLeft, AlertCircle, CheckCircle2,
    Loader2, BookOpen, Clock, TrendingUp, FileJson,
    Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
    Type, Palette, Minus, Quote, Code, ListOrdered,
    Highlighter, Strikethrough, RotateCcw, Edit3,
    ChevronDown, List, ExternalLink,
} from 'lucide-react';

import { baseUrl } from '../../Baseurl';

// ── Constants ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
    'Interview Tips', 'DSA', 'System Design', 'HR Round',
    'Resume Tips', 'Aptitude', 'Coding Interview', 'Career Advice'
];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

const EMPTY_FORM = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: CATEGORIES[0],
    difficulty: DIFFICULTIES[0],
    tags: '',
    author: 'TheJobInfo Team',
    featured: false,
    published: true,
};

// ══════════════════════════════════════════════════════════════════════════════
// RICH TEXT EDITOR
// ══════════════════════════════════════════════════════════════════════════════

const FONT_COLORS = [
    { label: 'Default', value: '#111827' },
    { label: 'Purple', value: '#7c3aed' },
    { label: 'Blue', value: '#2563eb' },
    { label: 'Green', value: '#16a34a' },
    { label: 'Red', value: '#dc2626' },
    { label: 'Orange', value: '#ea580c' },
    { label: 'Gray', value: '#6b7280' },
    { label: 'Pink', value: '#db2777' },
    { label: 'Teal', value: '#0d9488' },
    { label: 'Amber', value: '#d97706' },
];

const HIGHLIGHT_COLORS = [
    { label: 'Yellow', value: '#fef08a' },
    { label: 'Green', value: '#bbf7d0' },
    { label: 'Blue', value: '#bfdbfe' },
    { label: 'Pink', value: '#fbcfe8' },
    { label: 'Orange', value: '#fed7aa' },
    { label: 'Purple', value: '#e9d5ff' },
    { label: 'None', value: 'transparent' },
];

const ToolbarBtn = ({ onClick, title, active, children }) => (
    <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onClick && onClick(); }}
        title={title}
        className={`
            flex items-center justify-center w-7 h-7 rounded-md text-xs transition-all flex-shrink-0
            ${active
                ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 ring-1 ring-purple-300 dark:ring-purple-700'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white'}
        `}
    >
        {children}
    </button>
);

const ToolbarSep = () => (
    <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-0.5 flex-shrink-0 self-center" />
);

const ColorPicker = ({ colors, onSelect, trigger }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    return (
        <div ref={ref} className="relative flex-shrink-0">
            <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); setOpen(o => !o); }}
                className="flex items-center justify-center w-7 h-7 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
                {trigger}
            </button>
            {open && (
                <div className="absolute top-9 left-0 z-[100] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl p-2 flex flex-wrap gap-1.5 w-40">
                    {colors.map(c => (
                        <button
                            key={c.label}
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); onSelect(c.value); setOpen(false); }}
                            title={c.label}
                            className="w-6 h-6 rounded-md border-2 border-white dark:border-gray-700 hover:scale-125 transition-transform shadow-sm"
                            style={{ backgroundColor: c.value }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const HeadingDropdown = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const options = [
        { label: 'Normal text', tag: 'p', cls: 'text-sm text-gray-600' },
        { label: 'Heading 1', tag: 'h1', cls: 'text-2xl font-bold text-gray-900' },
        { label: 'Heading 2', tag: 'h2', cls: 'text-xl font-bold text-gray-900' },
        { label: 'Heading 3', tag: 'h3', cls: 'text-lg font-semibold text-gray-800' },
        { label: 'Heading 4', tag: 'h4', cls: 'text-base font-semibold text-gray-700' },
    ];

    useEffect(() => {
        const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    return (
        <div ref={ref} className="relative flex-shrink-0">
            <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); setOpen(o => !o); }}
                className="flex items-center gap-1 h-7 px-2 rounded-md text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all border border-gray-300 dark:border-gray-600"
            >
                <Type className="w-3 h-3" />
                <span className="hidden sm:inline">Style</span>
                <ChevronDown className="w-3 h-3" />
            </button>
            {open && (
                <div className="absolute top-9 left-0 z-[100] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl overflow-hidden min-w-[170px]">
                    {options.map(opt => (
                        <button
                            key={opt.tag}
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                document.execCommand('formatBlock', false, `<${opt.tag}>`);
                                setOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors dark:text-gray-200 ${opt.cls}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// ── Main Rich Content Editor ──────────────────────────────────────────────────
const RichContentEditor = ({ value, onChange, minHeight = 400 }) => {
    const editorRef = useRef(null);
    const isInternalChange = useRef(false);
    const [preview, setPreview] = useState(false);
    const [activeFormats, setActiveFormats] = useState({});
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);

    // Sync incoming value → editor (only on mount / external change)
    useEffect(() => {
        if (editorRef.current && !isInternalChange.current) {
            const html = value || '';
            if (editorRef.current.innerHTML !== html) {
                editorRef.current.innerHTML = html;
            }
        }
        isInternalChange.current = false;
    }, [value]);

    const exec = useCallback((cmd, val = null) => {
        editorRef.current?.focus();
        document.execCommand(cmd, false, val);
    }, []);

    const checkFormats = useCallback(() => {
        try {
            setActiveFormats({
                bold: document.queryCommandState('bold'),
                italic: document.queryCommandState('italic'),
                underline: document.queryCommandState('underline'),
                strikeThrough: document.queryCommandState('strikeThrough'),
                justifyLeft: document.queryCommandState('justifyLeft'),
                justifyCenter: document.queryCommandState('justifyCenter'),
                justifyRight: document.queryCommandState('justifyRight'),
                insertOrderedList: document.queryCommandState('insertOrderedList'),
                insertUnorderedList: document.queryCommandState('insertUnorderedList'),
            });
        } catch (_) { }
    }, []);

    const handleInput = useCallback((e) => {
        isInternalChange.current = true;
        const html = e.currentTarget.innerHTML;
        onChange && onChange(html);
        // Word / char count
        const text = e.currentTarget.innerText || '';
        setCharCount(text.length);
        setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    }, [onChange]);

    // ── Insert helpers ────────────────────────────────────────────────────────
    const insertHTML = (html) => {
        editorRef.current?.focus();
        document.execCommand('insertHTML', false, html);
    };

    const insertCallout = (type) => {
        const configs = {
            tip: { bg: '#f0fdf4', border: '#16a34a', color: '#166534', icon: '💡', label: 'Tip' },
            info: { bg: '#eff6ff', border: '#2563eb', color: '#1e40af', icon: 'ℹ️', label: 'Info' },
            warning: { bg: '#fffbeb', border: '#d97706', color: '#92400e', icon: '⚠️', label: 'Warning' },
            error: { bg: '#fef2f2', border: '#dc2626', color: '#991b1b', icon: '❌', label: 'Note' },
        };
        const c = configs[type];
        const sel = window.getSelection();
        const text = sel?.toString() || `${c.label} text here...`;
        insertHTML(
            `<div style="background:${c.bg};border-left:4px solid ${c.border};padding:12px 16px;border-radius:0 10px 10px 0;margin:14px 0;color:${c.color};font-weight:500;">` +
            `<strong>${c.icon} ${c.label}:</strong> ${text}</div><p><br></p>`
        );
    };

    const insertCodeBlock = () => {
        insertHTML(
            `<pre style="background:#1e1e2e;color:#cdd6f4;padding:18px 20px;border-radius:10px;overflow-x:auto;font-family:'Fira Code',Consolas,monospace;font-size:13px;margin:14px 0;line-height:1.7;border:1px solid #313244;">// Your code here</pre><p><br></p>`
        );
    };

    const insertDivider = () => {
        insertHTML(`<hr style="border:none;border-top:2px solid #e5e7eb;margin:24px 0;" /><p><br></p>`);
    };

    const insertBlockquote = () => {
        const sel = window.getSelection();
        const text = sel?.toString() || 'Your quote here...';
        insertHTML(
            `<blockquote style="background:#f5f3ff;border-left:4px solid #7c3aed;padding:12px 16px;border-radius:0 10px 10px 0;margin:14px 0;color:#5b21b6;font-style:italic;">${text}</blockquote><p><br></p>`
        );
    };

    const toolbarGroups = [
        // Group 1: Style
        <HeadingDropdown key="heading" />,

        'sep',

        // Group 2: Basic formatting
        <ToolbarBtn key="bold" onClick={() => exec('bold')} title="Bold (Ctrl+B)" active={activeFormats.bold}>
            <Bold className="w-3.5 h-3.5" />
        </ToolbarBtn>,
        <ToolbarBtn key="italic" onClick={() => exec('italic')} title="Italic (Ctrl+I)" active={activeFormats.italic}>
            <Italic className="w-3.5 h-3.5" />
        </ToolbarBtn>,
        <ToolbarBtn key="underline" onClick={() => exec('underline')} title="Underline (Ctrl+U)" active={activeFormats.underline}>
            <Underline className="w-3.5 h-3.5" />
        </ToolbarBtn>,
        <ToolbarBtn key="strike" onClick={() => exec('strikeThrough')} title="Strikethrough" active={activeFormats.strikeThrough}>
            <Strikethrough className="w-3.5 h-3.5" />
        </ToolbarBtn>,

        'sep',

        // Group 3: Color
        <ColorPicker
            key="fontcolor"
            colors={FONT_COLORS}
            onSelect={(val) => exec('foreColor', val)}
            trigger={
                <span className="flex flex-col items-center gap-0.5">
                    <Palette className="w-3.5 h-3.5" />
                    <span className="w-3.5 h-0.5 rounded-full bg-purple-500" />
                </span>
            }
        />,
        <ColorPicker
            key="highlight"
            colors={HIGHLIGHT_COLORS}
            onSelect={(val) => val === 'transparent' ? exec('hiliteColor', 'transparent') : exec('hiliteColor', val)}
            trigger={
                <span className="flex flex-col items-center gap-0.5">
                    <Highlighter className="w-3.5 h-3.5" />
                    <span className="w-3.5 h-0.5 rounded-full bg-yellow-400" />
                </span>
            }
        />,

        'sep',

        // Group 4: Font size
        ...(['S', 'M', 'L', 'XL'].map((label, i) => (
            <ToolbarBtn key={`size-${label}`} onClick={() => exec('fontSize', String(i + 2))} title={`${label} text`}>
                <span className="font-bold text-[10px] leading-none">{label}</span>
            </ToolbarBtn>
        ))),

        'sep',

        // Group 5: Alignment
        <ToolbarBtn key="left" onClick={() => exec('justifyLeft')} title="Align left" active={activeFormats.justifyLeft}>
            <AlignLeft className="w-3.5 h-3.5" />
        </ToolbarBtn>,
        <ToolbarBtn key="center" onClick={() => exec('justifyCenter')} title="Align center" active={activeFormats.justifyCenter}>
            <AlignCenter className="w-3.5 h-3.5" />
        </ToolbarBtn>,
        <ToolbarBtn key="right" onClick={() => exec('justifyRight')} title="Align right" active={activeFormats.justifyRight}>
            <AlignRight className="w-3.5 h-3.5" />
        </ToolbarBtn>,

        'sep',

        // Group 6: Lists
        <ToolbarBtn key="ul" onClick={() => exec('insertUnorderedList')} title="Bullet list" active={activeFormats.insertUnorderedList}>
            <List className="w-3.5 h-3.5" />
        </ToolbarBtn>,
        <ToolbarBtn key="ol" onClick={() => exec('insertOrderedList')} title="Numbered list" active={activeFormats.insertOrderedList}>
            <ListOrdered className="w-3.5 h-3.5" />
        </ToolbarBtn>,

        'sep',

        // Group 7: Insert blocks
        <ToolbarBtn key="quote" onClick={insertBlockquote} title="Insert blockquote">
            <Quote className="w-3.5 h-3.5" />
        </ToolbarBtn>,
        <ToolbarBtn key="code" onClick={insertCodeBlock} title="Insert code block">
            <Code className="w-3.5 h-3.5" />
        </ToolbarBtn>,
        <ToolbarBtn key="hr" onClick={insertDivider} title="Insert divider">
            <Minus className="w-3.5 h-3.5" />
        </ToolbarBtn>,

        'sep',

        // Group 8: Callouts
        <ToolbarBtn key="tip" onClick={() => insertCallout('tip')} title="Tip callout">
            <span className="text-[11px]">💡</span>
        </ToolbarBtn>,
        <ToolbarBtn key="info" onClick={() => insertCallout('info')} title="Info callout">
            <span className="text-[11px]">ℹ️</span>
        </ToolbarBtn>,
        <ToolbarBtn key="warn" onClick={() => insertCallout('warning')} title="Warning callout">
            <span className="text-[11px]">⚠️</span>
        </ToolbarBtn>,
        <ToolbarBtn key="err" onClick={() => insertCallout('error')} title="Error callout">
            <span className="text-[11px]">❌</span>
        </ToolbarBtn>,

        'sep',

        // Group 9: Undo/Redo
        <ToolbarBtn key="undo" onClick={() => exec('undo')} title="Undo (Ctrl+Z)">
            <RotateCcw className="w-3.5 h-3.5" />
        </ToolbarBtn>,
    ];

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">

            {/* ── Toolbar ── */}
            <div className="bg-gray-100 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                {/* Top bar: mode toggle */}
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-200 dark:border-gray-700/60">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        {preview ? 'Preview' : 'Editor'}
                    </span>
                    <button
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); setPreview(p => !p); }}
                        className={`flex items-center gap-1.5 h-6 px-2.5 rounded-lg text-xs font-bold transition-all border ${preview
                            ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700'
                            : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        {preview ? <Edit3 className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        {preview ? 'Edit' : 'Preview'}
                    </button>
                </div>

                {/* Toolbar buttons (hidden in preview) */}
                {!preview && (
                    <div className="px-2 py-2 flex flex-wrap gap-0.5 items-center">
                        {toolbarGroups.map((item, i) =>
                            item === 'sep'
                                ? <ToolbarSep key={`sep-${i}`} />
                                : item
                        )}
                    </div>
                )}
            </div>

            {/* ── Editor / Preview body ── */}
            {preview ? (
                <div className="p-5 bg-white dark:bg-gray-900 min-h-[200px]">
                    <div
                        className="prose prose-sm sm:prose-base prose-gray dark:prose-invert max-w-none
                            prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                            prose-p:leading-relaxed prose-p:text-gray-600 dark:prose-p:text-gray-400
                            prose-strong:text-gray-800 dark:prose-strong:text-gray-200
                            prose-code:text-purple-600 dark:prose-code:text-purple-400 prose-code:bg-purple-50 dark:prose-code:bg-purple-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                            prose-blockquote:border-l-4 prose-blockquote:border-purple-400 prose-blockquote:not-italic
                            prose-a:text-purple-600 dark:prose-a:text-purple-400
                        "
                        dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-400 italic">Nothing to preview yet...</p>' }}
                    />
                </div>
            ) : (
                <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInput}
                    onKeyUp={checkFormats}
                    onMouseUp={checkFormats}
                    onSelect={checkFormats}
                    data-placeholder="Start writing your blog content here... Select text and use the toolbar to format it."
                    className="
                        bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200
                        text-sm leading-relaxed focus:outline-none p-5
                        [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-400 [&:empty]:before:pointer-events-none [&:empty]:before:absolute
                        relative
                    "
                    style={{ minHeight: `${minHeight}px`, wordBreak: 'break-word' }}
                />
            )}

            {/* ── Footer: hints + word count ── */}
            {!preview && (
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/60 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {[
                            ['Ctrl+B', 'Bold'], ['Ctrl+I', 'Italic'],
                            ['Ctrl+U', 'Underline'], ['Ctrl+Z', 'Undo'],
                        ].map(([key, desc]) => (
                            <span key={key} className="text-xs text-gray-400 dark:text-gray-600">
                                <kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-gray-500 dark:text-gray-400 text-[10px]">
                                    {key}
                                </kbd>{' '}{desc}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-600 font-medium">
                        <span>{wordCount} words</span>
                        <span>{charCount} chars</span>
                    </div>
                </div>
            )}
        </div>
    );
};

// ══════════════════════════════════════════════════════════════════════════════
// UI HELPERS
// ══════════════════════════════════════════════════════════════════════════════

const Toast = ({ message, type, onClose }) => (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-bold transition-all ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
        {type === 'success'
            ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
        {message}
        <button onClick={onClose} className="ml-2 hover:opacity-75">
            <X className="w-3.5 h-3.5" />
        </button>
    </div>
);

const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                    <p className="font-bold text-gray-900 dark:text-white text-base">Confirm Delete</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{message}</p>
                </div>
            </div>
            <div className="flex gap-3">
                <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                </button>
                <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors">
                    Delete
                </button>
            </div>
        </div>
    </div>
);

const Label = ({ children, required }) => (
    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
        {children}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
);

const Input = ({ className = '', ...props }) => (
    <input
        className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 text-sm font-medium focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900/20 transition-all ${className}`}
        {...props}
    />
);

const Select = ({ children, className = '', ...props }) => (
    <select
        className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm font-medium focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900/20 transition-all ${className}`}
        {...props}
    >
        {children}
    </select>
);

const Textarea = ({ className = '', ...props }) => (
    <textarea
        className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 text-sm font-medium focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900/20 transition-all resize-y ${className}`}
        {...props}
    />
);

// ══════════════════════════════════════════════════════════════════════════════
// BLOG FORM
// ══════════════════════════════════════════════════════════════════════════════

const BlogForm = ({ initial, onSave, onCancel, saving }) => {
    const [form, setForm] = useState(initial || EMPTY_FORM);
    const [image, setImage] = useState(null);
    const [imgPreview, setImgPreview] = useState(initial?.imageUrl || '');

    const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

    // Auto-generate slug from title (only on create)
    const handleTitle = (val) => {
        set('title', val);
        if (!initial?._id) {
            set('slug', val.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim());
        }
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);
        setImgPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.content || form.content === '<br>' || form.content.trim() === '') {
            alert('Content cannot be empty.');
            return;
        }
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => {
            if (k === 'tags') {
                fd.append(k, JSON.stringify(v.split(',').map(t => t.trim()).filter(Boolean)));
            } else {
                fd.append(k, v);
            }
        });
        if (image) fd.append('image', image);
        onSave(fd);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* ── Row 1: Title + Slug ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label required>Title</Label>
                    <Input
                        value={form.title}
                        onChange={e => handleTitle(e.target.value)}
                        placeholder="e.g. Top 10 DSA Problems for Interviews"
                        required
                    />
                </div>
                <div>
                    <Label required>Slug</Label>
                    <Input
                        value={form.slug}
                        onChange={e => set('slug', e.target.value)}
                        placeholder="top-10-dsa-problems"
                        required
                    />
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                        URL: /blog/<span className="font-mono text-purple-500">{form.slug || 'your-slug'}</span>
                    </p>
                </div>
            </div>

            {/* ── Row 2: Category + Difficulty + Author ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <Label required>Category</Label>
                    <Select value={form.category} onChange={e => set('category', e.target.value)}>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </Select>
                </div>
                <div>
                    <Label required>Difficulty</Label>
                    <Select value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
                        {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                    </Select>
                </div>
                <div>
                    <Label>Author</Label>
                    <Input
                        value={form.author}
                        onChange={e => set('author', e.target.value)}
                        placeholder="TheJobInfo Team"
                    />
                </div>
            </div>

            {/* ── Excerpt ── */}
            <div>
                <Label required>Excerpt</Label>
                <Textarea
                    value={form.excerpt}
                    onChange={e => set('excerpt', e.target.value)}
                    rows={3}
                    maxLength={300}
                    placeholder="A brief summary shown in blog cards and SEO..."
                    required
                />
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                    {form.excerpt.length} / 300 characters
                </p>
            </div>

            {/* ── Content (Rich Editor) ── */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <Label required>Content</Label>
                    <span className="text-xs text-gray-400 dark:text-gray-600 font-medium">
                        Use the toolbar to format headings, bold, colors, callouts & more
                    </span>
                </div>
                <RichContentEditor
                    value={form.content}
                    onChange={(html) => set('content', html)}
                    minHeight={450}
                />
            </div>

            {/* ── Tags ── */}
            <div>
                <Label>Tags</Label>
                <Input
                    value={form.tags}
                    onChange={e => set('tags', e.target.value)}
                    placeholder="arrays, recursion, sorting (comma-separated)"
                />
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                    Separate tags with commas
                </p>
            </div>

            {/* ── Cover Image ── */}
            <div>
                <Label>Cover Image</Label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl py-6 px-4 cursor-pointer hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all group">
                        <input type="file" accept="image/*" onChange={handleImage} className="sr-only" />
                        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                            <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                        </div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            Click to upload image
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">PNG, JPG, WEBP up to 5MB</p>
                    </label>
                    {imgPreview && (
                        <div className="relative flex-shrink-0">
                            <img
                                src={imgPreview}
                                alt="preview"
                                className="h-32 w-48 rounded-xl object-cover border border-gray-200 dark:border-gray-700"
                            />
                            <button
                                type="button"
                                onClick={() => { setImgPreview(''); setImage(null); }}
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Toggles ── */}
            <div className="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                        onClick={() => set('published', !form.published)}
                        className={`relative w-10 h-6 rounded-full transition-colors ${form.published ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${form.published ? 'translate-x-5' : 'translate-x-1'}`} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Published</p>
                        <p className="text-xs text-gray-400 dark:text-gray-600">{form.published ? 'Visible to readers' : 'Saved as draft'}</p>
                    </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                        onClick={() => set('featured', !form.featured)}
                        className={`relative w-10 h-6 rounded-full transition-colors ${form.featured ? 'bg-yellow-400' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-1'}`} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Featured</p>
                        <p className="text-xs text-gray-400 dark:text-gray-600">{form.featured ? 'Shown in highlights' : 'Not featured'}</p>
                    </div>
                </label>
            </div>

            {/* ── Actions ── */}
            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 transition-all shadow-lg shadow-purple-200 dark:shadow-purple-900/30"
                >
                    {saving ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                    ) : (
                        <><Save className="w-4 h-4" /> {initial?._id ? 'Update Blog' : 'Publish Blog'}</>
                    )}
                </button>
            </div>
        </form>
    );
};

// ══════════════════════════════════════════════════════════════════════════════
// MAIN AdminBlog
// ══════════════════════════════════════════════════════════════════════════════

const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('list');
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState('');
    const [toast, setToast] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [showJsonModal, setShowJsonModal] = useState(false);
    const [jsonInput, setJsonInput] = useState('');

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    // ── Fetch ─────────────────────────────────────────────────────────────────
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${baseUrl}/blog/admin/all`);
            setBlogs(Array.isArray(res.data?.blogs) ? res.data.blogs : []);
        } catch (err) {
            console.error(err);
            showToast('Failed to fetch blogs', 'error');
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBlogs(); }, []);

    // ── Bulk JSON ─────────────────────────────────────────────────────────────
    const handleBulkJsonPaste = async () => {
        if (!jsonInput.trim()) { showToast('Paste JSON first', 'error'); return; }
        try {
            const parsed = JSON.parse(jsonInput);
            if (!Array.isArray(parsed)) { showToast('JSON must be an array', 'error'); return; }
            setSaving(true);
            await axios.post(`${baseUrl}/blog/bulk-upload`, { blogs: parsed });
            showToast(`${parsed.length} blogs uploaded`);
            setJsonInput('');
            setShowJsonModal(false);
            fetchBlogs();
        } catch (err) {
            showToast(err instanceof SyntaxError ? 'Invalid JSON format' : 'Bulk upload failed', 'error');
        } finally {
            setSaving(false);
        }
    };

    // ── CRUD ──────────────────────────────────────────────────────────────────
    const handleCreate = async (fd) => {
        setSaving(true);
        try {
            await axios.post(`${baseUrl}/blog`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            showToast('Blog created successfully');
            setView('list');
            fetchBlogs();
        } catch (err) {
            showToast(err.response?.data?.message || 'Create failed', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleUpdate = async (fd) => {
        setSaving(true);
        try {
            await axios.put(`${baseUrl}/blog/${editing._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            showToast('Blog updated');
            setView('list');
            setEditing(null);
            fetchBlogs();
        } catch (err) {
            showToast(err.response?.data?.message || 'Update failed', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseUrl}/blog/${id}`);
            setBlogs(prev => prev.filter(b => b._id !== id));
            showToast('Blog deleted');
        } catch (err) {
            showToast('Delete failed', 'error');
        } finally {
            setConfirm(null);
        }
    };

    const handleToggle = async (id, field) => {
        try {
            const res = await axios.patch(`${baseUrl}/blog/${id}/toggle/${field}`);
            setBlogs(prev => prev.map(b => b._id === id ? { ...b, [field]: res.data.blog[field] } : b));
        } catch (err) {
            showToast('Toggle failed', 'error');
        }
    };

    const filtered = (blogs || []).filter(b =>
        !search ||
        b.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.category?.toLowerCase().includes(search.toLowerCase())
    );

    const goBack = () => { setView('list'); setEditing(null); };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            {confirm && (
                <ConfirmDialog
                    message={confirm.message}
                    onConfirm={confirm.onConfirm}
                    onCancel={() => setConfirm(null)}
                />
            )}

            {/* ── JSON Modal ── */}
            {showJsonModal && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <FileJson className="w-5 h-5 text-blue-600" /> Paste Blogs JSON
                                </h2>
                                <p className="text-sm text-gray-500 mt-0.5">Paste an array of blog objects to bulk-upload</p>
                            </div>
                            <button onClick={() => setShowJsonModal(false)} className="w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-5">
                            <textarea
                                value={jsonInput}
                                onChange={e => setJsonInput(e.target.value)}
                                placeholder={`[\n  {\n    "title": "Top DSA Questions",\n    "slug": "top-dsa-questions",\n    "excerpt": "...",\n    "content": "<h2>...</h2>",\n    "category": "DSA",\n    "difficulty": "Beginner"\n  }\n]`}
                                className="w-full h-96 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white p-4 font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
                            />
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={() => setShowJsonModal(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleBulkJsonPaste}
                                    disabled={saving}
                                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold flex items-center gap-2 disabled:opacity-60 transition-colors"
                                >
                                    {saving
                                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
                                        : <><FileJson className="w-4 h-4" /> Upload Blogs</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* ══ CREATE / EDIT ══ */}
                {(view === 'create' || view === 'edit') && (
                    <div>
                        {/* Back button */}
                        <button
                            onClick={goBack}
                            className="flex items-center gap-2 mb-6 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Blog Manager
                        </button>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                            {/* Form header */}
                            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100 dark:border-gray-700">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {view === 'edit' ? 'Edit Blog Post' : 'Create New Blog Post'}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {view === 'edit'
                                            ? `Editing: ${editing?.title}`
                                            : 'Fill in the details and use the rich editor to write your content'}
                                    </p>
                                </div>
                            </div>

                            <BlogForm
                                initial={
                                    view === 'edit'
                                        ? {
                                            ...editing,
                                            tags: Array.isArray(editing.tags)
                                                ? editing.tags.join(', ')
                                                : editing.tags || '',
                                        }
                                        : null
                                }
                                onSave={view === 'edit' ? handleUpdate : handleCreate}
                                onCancel={goBack}
                                saving={saving}
                            />
                        </div>
                    </div>
                )}

                {/* ══ LIST ══ */}
                {view === 'list' && (
                    <>
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Manager</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                    {blogs.length} total &middot; {blogs.filter(b => b.published).length} published &middot; {blogs.filter(b => b.featured).length} featured
                                </p>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                <button
                                    onClick={() => setShowJsonModal(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors"
                                >
                                    <FileJson className="w-4 h-4" /> Paste JSON
                                </button>
                                <button
                                    onClick={() => setView('create')}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-200 dark:shadow-purple-900/30 transition-all"
                                >
                                    <Plus className="w-4 h-4" /> New Blog Post
                                </button>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative mb-5">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search by title or category..."
                                className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 transition-all"
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* States */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-3">
                                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                                <p className="text-sm text-gray-400 dark:text-gray-600 font-medium">Loading blogs...</p>
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-200 dark:text-gray-700" />
                                <p className="text-lg font-bold text-gray-700 dark:text-gray-300">No blogs found</p>
                                <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">
                                    {search ? `No results for "${search}"` : 'Create your first blog post to get started'}
                                </p>
                                {!search && (
                                    <button
                                        onClick={() => setView('create')}
                                        className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold mx-auto transition-colors"
                                    >
                                        <Plus className="w-4 h-4" /> Create Blog
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {filtered.map((blog, idx) => (
                                    <div
                                        key={blog._id}
                                        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 flex flex-col sm:flex-row gap-4 hover:border-purple-200 dark:hover:border-purple-800 hover:shadow-sm transition-all"
                                    >
                                        {/* Thumbnail */}
                                        <div className="w-full sm:w-20 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                                            {blog.imageUrl ? (
                                                <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className={`w-full h-full bg-gradient-to-br ${['from-violet-500 to-purple-600', 'from-rose-500 to-pink-600', 'from-sky-500 to-blue-600', 'from-emerald-500 to-teal-600'][idx % 4]
                                                    } flex items-center justify-center`}>
                                                    <BookOpen className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap gap-1.5 mb-1">
                                                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                                                    {blog.category}
                                                </span>
                                                {blog.featured && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-semibold">
                                                        ⭐ Featured
                                                    </span>
                                                )}
                                                {!blog.published && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-semibold">
                                                        Draft
                                                    </span>
                                                )}
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${blog.difficulty === 'Beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                                    blog.difficulty === 'Advanced' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                                                        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                                    }`}>
                                                    {blog.difficulty}
                                                </span>
                                            </div>
                                            <p className="text-base font-bold text-gray-800 dark:text-gray-200 truncate">
                                                {blog.title}
                                            </p>
                                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-400 dark:text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {blog.readTime} min read
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <TrendingUp className="w-3 h-3" /> {blog.views || 0} views
                                                </span>
                                                <span className="font-mono">/blog/{blog.slug}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1.5 flex-shrink-0">
                                            <button
                                                onClick={() => handleToggle(blog._id, 'published')}
                                                title={blog.published ? 'Unpublish' : 'Publish'}
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${blog.published ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                            >
                                                {blog.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => handleToggle(blog._id, 'featured')}
                                                title={blog.featured ? 'Unfeature' : 'Feature'}
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${blog.featured ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                            >
                                                {blog.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => { setEditing(blog); setView('edit'); }}
                                                title="Edit"
                                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setConfirm({
                                                    message: `Delete "${blog.title}"? This cannot be undone.`,
                                                    onConfirm: () => handleDelete(blog._id),
                                                })}
                                                title="Delete"
                                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminBlog;