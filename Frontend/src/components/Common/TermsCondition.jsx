
import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import {
    FileText, UserCheck, ShieldAlert, Copyright, Ban,
    AlertTriangle, Scale, Mail, RefreshCw, Globe,
    ChevronDown, Send, CheckCircle
} from 'lucide-react';

const TermsAndConditions = () => {
    const lastUpdated = 'April 4, 2026';
    const [openIndex, setOpenIndex] = useState(null);

    const sections = [
        {
            icon: UserCheck,
            color: 'from-violet-500 to-purple-600',
            title: '1. Acceptance of Terms',
            content: `By accessing or using our platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our platform. These terms apply to all visitors, registered users, and anyone who accesses or uses our services.`
        },
        {
            icon: Globe,
            color: 'from-sky-500 to-blue-600',
            title: '2. About the Platform',
            content: `We provide a jobs-focused platform listing off-campus drives, fresher jobs, and internships — curated daily for students and professionals across India and worldwide. We also operate a Telegram community for learners and job seekers.`
        },
        {
            icon: UserCheck,
            color: 'from-emerald-500 to-teal-600',
            title: '3. User Accounts & Registration',
            content: `To access certain features, you may sign in using Google OAuth. You are responsible for maintaining the confidentiality of your account and for all activities that occur under it. You agree to provide accurate information and to notify us immediately of any unauthorized use. You must be at least 13 years of age to create an account.`
        },
        {
            icon: Copyright,
            color: 'from-orange-500 to-amber-600',
            title: '4. Intellectual Property',
            content: `All content on our platform — including text, graphics, logos, icons, job listings, and articles — is protected by applicable copyright laws. You may not reproduce, distribute, modify, or create derivative works of our content without prior written permission.`
        },
        {
            icon: Ban,
            color: 'from-rose-500 to-red-600',
            title: '5. Prohibited Conduct',
            content: `You agree not to:\n• Scrape or reproduce our content in bulk without permission\n• Attempt to reverse-engineer, hack, or disrupt our platform\n• Upload malicious code, viruses, or harmful software\n• Use our platform for spam, phishing, or fraudulent activities\n• Post offensive, abusive, or discriminatory content\n• Impersonate other users or our staff\n• Use the platform in any way that violates applicable laws`
        },
        {
            icon: FileText,
            color: 'from-indigo-500 to-violet-600',
            title: '6. Job Listings & Third-Party Links',
            content: `We curate and display off-campus job listings and internship opportunities for informational purposes only. We do not guarantee the accuracy, completeness, or timeliness of any job listing. We are not a recruitment agency and are not responsible for the hiring decisions of any company. Our platform may contain links to external websites — we are not responsible for their content or practices.`
        },
        {
            icon: AlertTriangle,
            color: 'from-yellow-500 to-orange-500',
            title: '7. Disclaimer of Warranties',
            content: `Our platform is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the platform will be error-free, uninterrupted, or free from viruses. We do not guarantee that any content will result in job placement or any specific outcome.`
        },
        {
            icon: ShieldAlert,
            color: 'from-teal-500 to-cyan-600',
            title: '8. Limitation of Liability',
            content: `To the fullest extent permitted by law, we and our team shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use or inability to use the platform, including loss of data, loss of profits, or reliance on any content provided.`
        },
        {
            icon: Scale,
            color: 'from-pink-500 to-rose-600',
            title: '9. Governing Law',
            content: `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of our platform shall be subject to the exclusive jurisdiction of the courts located in India.`
        },
        {
            icon: RefreshCw,
            color: 'from-gray-500 to-gray-600',
            title: '10. Changes to These Terms',
            content: `We reserve the right to modify these Terms at any time. When we make changes, we will update the "Last updated" date. Your continued use of the platform after any changes constitutes your acceptance of the revised terms.`
        },
        {
            icon: Ban,
            color: 'from-red-600 to-pink-600',
            title: '11. Termination',
            content: `We reserve the right to suspend or terminate your access at our sole discretion, without notice, for conduct that violates these Terms, is harmful to other users, or is otherwise objectionable. Upon termination, your right to use the platform ceases immediately.`
        },
    ];

    const highlights = [
        { text: 'Free to use — no hidden fees' },
        { text: 'Job listings for informational purposes only' },
        { text: 'We never sell your personal data' },
        { text: 'Content is protected by copyright' },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">

                {/* ── HERO ── */}
                <div className="bg-gray-50 dark:bg-gray-950">
                    <div className="max-w-4xl mx-auto px-4 py-14 text-center">
                        <div className="flex justify-center mb-5">
                            <span className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 px-5 py-2 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300">
                                <FileText className="w-4 h-4" />
                                Terms & Conditions
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            Terms &{' '}
                            <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                                Conditions
                            </span>
                        </h1>
                        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed mb-4">
                            Please read these Terms carefully before using our platform. They govern your access to all content, services, and features.
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            Last updated: <span className="font-semibold text-gray-600 dark:text-gray-400">{lastUpdated}</span>
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">

                    {/* ── Key Points summary ── */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-4">Key points at a glance</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-center gap-2.5">
                                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{h.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Accordion sections ── */}
                    {sections.map((section, i) => {
                        const Icon = section.icon;
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm"
                            >
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

                                {isOpen && (
                                    <div className="px-6 pb-6 border-t border-gray-50 dark:border-gray-800">
                                        <div className="pt-5 flex gap-3">
                                            <div className={`w-1 rounded-full bg-gradient-to-b ${section.color} flex-shrink-0 self-stretch`} />
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{section.content}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* ── Advertising disclosure for monetization ── */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                                <AlertTriangle className="w-4.5 h-4.5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">12. Advertising & Monetization</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Our platform may display advertisements served by Google AdSense and other trusted ad networks. By using our platform, you acknowledge that such ads may appear. All job listings, sponsored content, or promotional materials are clearly distinguished from editorial content. We may earn revenue from ad impressions and clicks, which helps us keep the platform free for all users.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Contact CTA ── */}
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-center shadow-lg">
                        <Mail className="w-8 h-8 text-white/80 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-white mb-2">Questions About These Terms?</h3>
                        <p className="text-white/70 text-sm mb-5 max-w-md mx-auto leading-relaxed">
                            If you have any questions or concerns about our Terms and Conditions, please reach out — we're happy to clarify anything.
                        </p>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <a href="mailto:dcodermail1@gmail.com"
                                className="inline-flex items-center gap-2 bg-white text-purple-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-105 transition-all shadow-md">
                                <Mail className="w-4 h-4" /> dcodermail1@gmail.com
                            </a>
                            <a href="https://t.me/dcoder75" target="_blank" rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                                <Send className="w-4 h-4" /> Telegram Community
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsAndConditions;