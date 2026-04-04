import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Shield, Eye, Lock, Database, Cookie, Mail, RefreshCw, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
    const lastUpdated = 'April 4, 2026';

    const sections = [
        {
            icon: <Database className="w-5 h-5" />,
            color: 'from-blue-500 to-cyan-500',
            title: '1. Information We Collect',
            content: [
                {
                    subtitle: 'Information You Provide',
                    text: 'When you register or sign in using Google OAuth, we collect your name, email address, and profile picture as provided by Google. We do not store your Google password.',
                },
                {
                    subtitle: 'Usage Information',
                    text: 'We automatically collect information about how you interact with our platform — pages you visit, content you access, features you use, and time spent on the platform. This helps us improve your experience.',
                },
                {
                    subtitle: 'Device & Technical Data',
                    text: 'We may collect your browser type, operating system, IP address, and device identifiers to ensure our platform functions correctly across all devices.',
                },
            ],
        },
        {
            icon: <Eye className="w-5 h-5" />,
            color: 'from-purple-500 to-pink-500',
            title: '2. How We Use Your Information',
            content: [
                {
                    subtitle: 'To Provide & Improve Services',
                    text: 'We use your information to operate the Dcoder platform, personalize your experience, track your learning progress, and improve our content, features, and job listings.',
                },
                {
                    subtitle: 'To Communicate With You',
                    text: 'We may send you important updates about the platform, new features, or relevant job opportunities. You can opt out of non-essential communications at any time.',
                },
                {
                    subtitle: 'For Analytics',
                    text: 'We use aggregated, anonymized data to understand how our platform is used and make informed decisions about future improvements.',
                },
            ],
        },
        {
            icon: <UserCheck className="w-5 h-5" />,
            color: 'from-green-500 to-emerald-500',
            title: '3. How We Share Your Information',
            content: [
                {
                    subtitle: 'We Do Not Sell Your Data',
                    text: 'Dcoder does not sell, rent, or trade your personal information to third parties for their marketing purposes. Your data is not a product.',
                },
                {
                    subtitle: 'Service Providers',
                    text: 'We may share data with trusted third-party service providers (such as hosting, analytics, or authentication providers) who assist us in operating the platform. These providers are contractually bound to protect your data.',
                },
                {
                    subtitle: 'Legal Requirements',
                    text: 'We may disclose your information if required by law, court order, or governmental authority, or to protect the rights and safety of Dcoder and its users.',
                },
            ],
        },
        {
            icon: <Cookie className="w-5 h-5" />,
            color: 'from-orange-500 to-red-500',
            title: '4. Cookies & Tracking',
            content: [
                {
                    subtitle: 'What Are Cookies',
                    text: 'Cookies are small text files stored on your device. We use them to keep you logged in, remember your preferences, and analyze platform usage.',
                },
                {
                    subtitle: 'Types of Cookies We Use',
                    text: 'We use essential cookies (required for login and basic functionality), analytics cookies (to understand usage patterns), and preference cookies (to remember your settings like dark mode).',
                },
                {
                    subtitle: 'Managing Cookies',
                    text: 'You can control or disable cookies through your browser settings. Note that disabling essential cookies may affect the functionality of the platform, including your ability to stay logged in.',
                },
            ],
        },
        {
            icon: <Lock className="w-5 h-5" />,
            color: 'from-indigo-500 to-purple-500',
            title: '5. Data Security',
            content: [
                {
                    subtitle: 'Our Security Measures',
                    text: 'We implement industry-standard security practices including HTTPS encryption, secure authentication via Google OAuth, and regular security reviews to protect your data.',
                },
                {
                    subtitle: 'No Guarantee',
                    text: 'While we take data security seriously, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but commit to promptly addressing any breaches.',
                },
            ],
        },
        {
            icon: <RefreshCw className="w-5 h-5" />,
            color: 'from-teal-500 to-cyan-500',
            title: '6. Your Rights',
            content: [
                {
                    subtitle: 'Access & Correction',
                    text: 'You have the right to access the personal information we hold about you and request corrections if any information is inaccurate.',
                },
                {
                    subtitle: 'Deletion',
                    text: 'You may request deletion of your account and associated personal data at any time by contacting us. We will process your request within a reasonable timeframe.',
                },
                {
                    subtitle: 'Data Portability',
                    text: 'You may request a copy of your personal data in a structured, machine-readable format.',
                },
            ],
        },
        {
            icon: <Shield className="w-5 h-5" />,
            color: 'from-pink-500 to-rose-500',
            title: "7. Children's Privacy",
            content: [
                {
                    subtitle: 'Age Requirement',
                    text: 'Dcoder is intended for users aged 13 and above. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such data, we will delete it promptly.',
                },
            ],
        },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

                {/* Hero */}
                <div className="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="container mx-auto px-4 py-16 max-w-4xl relative text-center">
                        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-5">
                            <Shield className="w-4 h-4" /> Privacy Policy
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                            Your Privacy Matters to Us
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Last updated: <span className="font-semibold text-gray-700 dark:text-gray-300">{lastUpdated}</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
                            This Privacy Policy explains how Dcoder ("we", "us", or "our") collects, uses, and protects your information when you use our platform at dcoder.in. By using Dcoder, you agree to the practices described below.
                        </p>
                    </div>
                </div>

                {/* Sections */}
                <div className="container mx-auto px-4 py-10 max-w-4xl space-y-5">
                    {sections.map((section, i) => (
                        <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                            <div className={`bg-gradient-to-r ${section.color} px-6 py-4 flex items-center gap-3 text-white`}>
                                {section.icon}
                                <h2 className="font-bold text-lg">{section.title}</h2>
                            </div>
                            <div className="p-6 space-y-5">
                                {section.content.map((block, j) => (
                                    <div key={j}>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{block.subtitle}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{block.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Changes to Policy */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                        <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-6 py-4 flex items-center gap-3 text-white">
                            <RefreshCw className="w-5 h-5" />
                            <h2 className="font-bold text-lg">8. Changes to This Policy</h2>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top. We encourage you to review this page periodically. Continued use of Dcoder after changes are posted constitutes your acceptance of the updated policy.
                            </p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-center text-white">
                            <Mail className="w-10 h-10 mx-auto mb-3 opacity-90" />
                            <h3 className="text-xl font-bold mb-2">Questions About Your Privacy?</h3>
                            <p className="text-blue-100 text-sm mb-5">If you have any questions or concerns about this Privacy Policy, reach out to us.</p>
                            <a href="mailto:contact@dcoder.in">
                                <button className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg">
                                    contact@dcoder.in
                                </button>
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