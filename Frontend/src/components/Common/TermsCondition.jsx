import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { FileText, UserCheck, ShieldAlert, Copyright, Ban, AlertTriangle, Scale, Mail, RefreshCw, Globe } from 'lucide-react';

const TermsAndConditions = () => {
    const lastUpdated = 'April 4, 2026';

    const sections = [
        { icon: <UserCheck className="w-5 h-5" />, color: 'from-purple-500 to-pink-500', title: '1. Acceptance of Terms', content: `By accessing or using Dcoder ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our platform. These terms apply to all visitors, registered users, and anyone who accesses or uses our services.` },
        { icon: <Globe className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500', title: '2. About the Platform', content: `Dcoder is a coding education platform that provides DSA content, technical blogs, learning roadmaps, CS fundamentals, and off-campus job listings. We also operate a Telegram community for learners. Our services are available to college students, freshers, and working professionals across India and worldwide.` },
        { icon: <UserCheck className="w-5 h-5" />, color: 'from-green-500 to-emerald-500', title: '3. User Accounts & Registration', content: `To access certain features of Dcoder, you must sign in using Google OAuth. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to provide accurate information and to notify us immediately of any unauthorized use of your account. You must be at least 13 years of age to create an account.` },
        { icon: <Copyright className="w-5 h-5" />, color: 'from-orange-500 to-red-500', title: '4. Intellectual Property', content: `All content on Dcoder — including but not limited to text, graphics, logos, icons, DSA sheets, roadmaps, blog articles, and code — is the intellectual property of Dcoder or its content contributors and is protected by applicable copyright laws. You may not reproduce, distribute, modify, or create derivative works of our content without prior written permission.` },
        { icon: <Ban className="w-5 h-5" />, color: 'from-red-500 to-rose-500', title: '5. Prohibited Conduct', content: `You agree not to engage in any of the following activities while using Dcoder:\n• Scraping, copying, or reproducing our content in bulk without permission\n• Attempting to reverse-engineer, hack, or disrupt our platform\n• Uploading malicious code, viruses, or harmful software\n• Using our platform for spam, phishing, or fraudulent activities\n• Posting offensive, abusive, or discriminatory content\n• Impersonating other users or Dcoder staff\n• Using the platform in any way that violates applicable laws or regulations` },
        { icon: <FileText className="w-5 h-5" />, color: 'from-indigo-500 to-purple-500', title: '6. Job Listings & Third-Party Links', content: `Dcoder curates and displays off-campus job listings and internship opportunities for informational purposes. We do not guarantee the accuracy, completeness, or timeliness of any job listing. We are not a recruitment agency and are not responsible for the hiring decisions of any company. Our platform may contain links to external websites. We have no control over those sites and are not responsible for their content or practices.` },
        { icon: <AlertTriangle className="w-5 h-5" />, color: 'from-yellow-500 to-orange-500', title: '7. Disclaimer of Warranties', content: `Dcoder is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the platform will be error-free, uninterrupted, or free from viruses. We do not guarantee that any educational content will result in job placement, interview success, or any specific outcome.` },
        { icon: <ShieldAlert className="w-5 h-5" />, color: 'from-teal-500 to-cyan-500', title: '8. Limitation of Liability', content: `To the fullest extent permitted by law, Dcoder and its team shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use or inability to use the platform, including loss of data, loss of profits, or reliance on any content provided on the platform.` },
        { icon: <Scale className="w-5 h-5" />, color: 'from-pink-500 to-rose-500', title: '9. Governing Law', content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of Dcoder shall be subject to the exclusive jurisdiction of the courts located in India.` },
        { icon: <RefreshCw className="w-5 h-5" />, color: 'from-gray-500 to-gray-600', title: '10. Changes to These Terms', content: `We reserve the right to modify these Terms and Conditions at any time. When we make changes, we will update the "Last updated" date at the top of this page. Your continued use of the platform after any changes constitutes your acceptance of the revised terms.` },
        { icon: <Ban className="w-5 h-5" />, color: 'from-red-600 to-pink-600', title: '11. Termination', content: `We reserve the right to suspend or terminate your access to Dcoder at our sole discretion, without notice, for conduct that we believe violates these Terms and Conditions, is harmful to other users, or is otherwise objectionable. Upon termination, your right to use the platform ceases immediately.` },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pt-20">

                {/* Hero */}
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="container mx-auto px-4 py-16 max-w-4xl relative text-center">
                        {/* Badge */}
                        <div className="flex justify-center mb-6">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg">
                                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                <span className="text-purple-700 dark:text-purple-300 font-semibold text-sm">Terms & Conditions</span>
                            </div>
                        </div>
                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                            Terms &{' '}
                            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Conditions</span>
                        </h1>
                        {/* Last updated */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Last updated: <span className="font-semibold text-gray-800 dark:text-gray-300">{lastUpdated}</span>
                        </p>
                        {/* Subtitle */}
                        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed">
                            Please read these Terms carefully before using Dcoder. They govern your access to all content, services, and features.
                        </p>
                    </div>
                </div>

                {/* Sections */}
                <div className="container mx-auto px-4 py-10 max-w-4xl space-y-4">
                    {sections.map((section, i) => (
                        <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-300 dark:border-gray-700 overflow-hidden shadow-lg">
                            <div className={`bg-gradient-to-r ${section.color} px-6 py-4 flex items-center gap-3 text-white`}>
                                {section.icon}
                                {/* Section heading — text-xl font-bold */}
                                <h2 className="font-bold text-xl">{section.title}</h2>
                            </div>
                            <div className="p-6">
                                {/* Body — text-sm text-gray-600 dark:text-gray-300 leading-relaxed */}
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{section.content}</p>
                            </div>
                        </div>
                    ))}

                    {/* Contact CTA */}
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center text-white">
                            <Mail className="w-10 h-10 mx-auto mb-3 opacity-90" />
                            <h3 className="text-xl font-bold mb-2">Questions About These Terms?</h3>
                            <p className="text-purple-100 text-sm mb-5 max-w-md mx-auto leading-relaxed">
                                If you have any questions about these Terms and Conditions, please contact us. We're happy to clarify anything.
                            </p>
                            <div className="flex items-center justify-center gap-3 flex-wrap">
                                <a href="mailto:dcodermail1@gmail.com">
                                    <button className="relative bg-white text-purple-600 px-6 py-2.5 rounded-xl font-semibold text-sm hover:scale-105 transition-all shadow-lg overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/50 to-transparent translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-700" />
                                        dcodermail1@gmail.com
                                    </button>
                                </a>
                                <a href="https://t.me/dcoder21575" target="_blank" rel="noreferrer">
                                    <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105">
                                        Telegram Community
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default TermsAndConditions;