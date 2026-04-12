

import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import {
    Shield, Eye, Lock, Database, Cookie, Mail,
    RefreshCw, UserCheck, ChevronDown, ExternalLink, Send
} from 'lucide-react';

const PrivacyPolicy = () => {
    const lastUpdated = 'April 4, 2026';
    const [openIndex, setOpenIndex] = useState(null);

    const sections = [
        {
            icon: Database,
            color: 'from-sky-500 to-blue-600',
            title: '1. Information We Collect',
            content: [
                {
                    subtitle: 'Information You Provide',
                    text: 'When you register or sign in using Google OAuth, we collect your name, email address, and profile picture as provided by Google. We do not store your Google password.'
                },
                {
                    subtitle: 'Usage Information',
                    text: 'We automatically collect information about how you interact with our platform — pages you visit, content you access, features you use, and time spent on the platform. This helps us improve your experience.'
                },
                {
                    subtitle: 'Device & Technical Data',
                    text: 'We may collect your browser type, operating system, IP address, and device identifiers to ensure our platform functions correctly across all devices.'
                },
            ],
        },
        {
            icon: Eye,
            color: 'from-violet-500 to-purple-600',
            title: '2. How We Use Your Information',
            content: [
                {
                    subtitle: 'To Provide & Improve Services',
                    text: 'We use your information to operate the platform, personalize your experience, and improve our content, features, and job listings.'
                },
                {
                    subtitle: 'To Communicate With You',
                    text: 'We may send you important updates about the platform, new features, or relevant job opportunities. You can opt out of non-essential communications at any time.'
                },
                {
                    subtitle: 'For Analytics',
                    text: 'We use aggregated, anonymized data to understand how our platform is used and make informed decisions about future improvements.'
                },
            ],
        },
        {
            icon: UserCheck,
            color: 'from-emerald-500 to-teal-600',
            title: '3. How We Share Your Information',
            content: [
                {
                    subtitle: 'We Do Not Sell Your Data',
                    text: 'We do not sell, rent, or trade your personal information to third parties for their marketing purposes. Your data is not a product.'
                },
                {
                    subtitle: 'Service Providers',
                    text: 'We may share data with trusted third-party service providers (such as hosting, analytics, or authentication providers) who assist us in operating the platform. These providers are contractually bound to protect your data.'
                },
                {
                    subtitle: 'Legal Requirements',
                    text: 'We may disclose your information if required by law, court order, or governmental authority, or to protect the rights and safety of our users.'
                },
            ],
        },
        {
            icon: Cookie,
            color: 'from-orange-500 to-amber-600',
            title: '4. Cookies & Tracking',
            content: [
                {
                    subtitle: 'What Are Cookies',
                    text: 'Cookies are small text files stored on your device. We use them to keep you logged in, remember your preferences, and analyze platform usage.'
                },
                {
                    subtitle: 'Types of Cookies We Use',
                    text: 'We use essential cookies (required for login and basic functionality), analytics cookies (to understand usage patterns), and preference cookies (to remember your settings like dark mode).'
                },
                {
                    subtitle: 'Managing Cookies',
                    text: 'You can control or disable cookies through your browser settings. Note that disabling essential cookies may affect the functionality of the platform.'
                },
            ],
        },
        {
            icon: Lock,
            color: 'from-rose-500 to-pink-600',
            title: '5. Data Security',
            content: [
                {
                    subtitle: 'Our Security Measures',
                    text: 'We implement industry-standard security practices including HTTPS encryption, secure authentication via Google OAuth, and regular security reviews to protect your data.'
                },
                {
                    subtitle: 'No Guarantee',
                    text: 'While we take data security seriously, no method of transmission over the internet is 100% secure. We commit to promptly addressing any breaches.'
                },
            ],
        },
        {
            icon: RefreshCw,
            color: 'from-teal-500 to-cyan-600',
            title: '6. Your Rights',
            content: [
                {
                    subtitle: 'Access & Correction',
                    text: 'You have the right to access the personal information we hold about you and request corrections if any information is inaccurate.'
                },
                {
                    subtitle: 'Deletion',
                    text: 'You may request deletion of your account and associated personal data at any time by contacting us. We will process your request within a reasonable timeframe.'
                },
                {
                    subtitle: 'Data Portability',
                    text: 'You may request a copy of your personal data in a structured, machine-readable format.'
                },
            ],
        },
        {
            icon: Shield,
            color: 'from-fuchsia-500 to-pink-600',
            title: "7. Children's Privacy",
            content: [
                {
                    subtitle: 'Age Requirement',
                    text: 'Our platform is intended for users aged 13 and above. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such data, we will delete it promptly.'
                },
            ],
        },
        {
            icon: RefreshCw,
            color: 'from-gray-500 to-gray-600',
            title: '8. Changes to This Policy',
            content: [
                {
                    subtitle: 'Policy Updates',
                    text: 'We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top. Continued use of the platform after changes are posted constitutes your acceptance of the updated policy.'
                },
            ],
        },
    ];

    // Quick nav labels
    const navItems = ['Information', 'Usage', 'Sharing', 'Cookies', 'Security', 'Your Rights', 'Children', 'Updates'];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">

                {/* ── HERO ── */}
                <div className="bg-gray-50 dark:bg-gray-950">
                    <div className="max-w-4xl mx-auto px-4 py-14 text-center">
                        <div className="flex justify-center mb-5">
                            <span className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 px-5 py-2 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300">
                                <Shield className="w-4 h-4" />
                                Privacy Policy
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            Your Privacy{' '}
                            <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                                Matters to Us
                            </span>
                        </h1>
                        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed mb-4">
                            This Privacy Policy explains how we collect, use, and protect your information when you use our platform.
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            Last updated: <span className="font-semibold text-gray-600 dark:text-gray-400">{lastUpdated}</span>
                        </p>
                    </div>
                </div>

                {/* ── QUICK NAV ── */}
                <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-30">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
                            {navItems.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        const el = document.getElementById(`section-${i}`);
                                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }}
                                    className="flex-shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-10 space-y-3">

                    {/* ── SECTIONS ── */}
                    {sections.map((section, i) => {
                        const Icon = section.icon;
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                id={`section-${i}`}
                                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm"
                            >
                                {/* Header — clickable to expand */}
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0`}>
                                            <Icon className="w-4.5 h-4.5 text-white" />
                                        </div>
                                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">{section.title}</h2>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Content */}
                                {isOpen && (
                                    <div className="px-6 pb-6 border-t border-gray-50 dark:border-gray-800">
                                        <div className="pt-5 space-y-5">
                                            {section.content.map((block, j) => (
                                                <div key={j} className="flex gap-3">
                                                    <div className={`w-1 rounded-full bg-gradient-to-b ${section.color} flex-shrink-0 self-stretch`} />
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{block.subtitle}</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{block.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* ── MONETIZATION: Advertise With Us ── */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                                <ExternalLink className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Third-Party Advertising</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                                    We may display third-party advertisements on our platform served by trusted advertising networks including Google AdSense. These ad partners may use cookies and similar technologies to serve ads based on your interests. We do not share personally identifiable information with these ad networks.
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    You can opt out of personalized advertising by visiting{' '}
                                    <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
                                        Google Ads Settings
                                    </a>
                                    {' '}or the{' '}
                                    <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
                                        NAI opt-out page
                                    </a>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── CONTACT CTA ── */}
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-center shadow-lg">
                        <Mail className="w-8 h-8 text-white/80 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-white mb-2">Questions About Your Privacy?</h3>
                        <p className="text-white/70 text-sm mb-5 max-w-md mx-auto leading-relaxed">
                            If you have any questions or concerns about this Privacy Policy, reach out — we're happy to help.
                        </p>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <a href="mailto:dcodermail1@gmail.com"
                                className="inline-flex items-center gap-2 bg-white text-purple-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-105 transition-all shadow-md">
                                <Mail className="w-4 h-4" /> dcodermail1@gmail.com
                            </a>
                            <a href="https://t.me/dcoder75" target="_blank" rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                                <Send className="w-4 h-4" /> Telegram
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;