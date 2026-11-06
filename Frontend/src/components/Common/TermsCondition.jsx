
import Navbar from '../Navbar';
import Footer from '../Footer';
import {
    FileText, UserCheck, ShieldAlert, Copyright, Ban,
    AlertTriangle, Scale, Mail, RefreshCw, Globe,
    Send, CheckCircle
} from 'lucide-react';
import { siteConfig } from '../../siteConfig';

const TermsAndConditions = () => {
    const lastUpdated = siteConfig.policyUpdated;

    const sections = [
        {
            icon: UserCheck,
            color: 'from-blue-500 to-teal-600',
            title: '1. Acceptance of Terms',
            content: `By accessing or using our platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our platform. These terms apply to all visitors, registered users, and anyone who accesses or uses our services.`
        },
        {
            icon: Globe,
            color: 'from-sky-500 to-blue-600',
            title: '2. About the Platform',
            content: `TheJobInfo publishes job information and career guidance. Listings may come from administrators or third-party feeds. Application links take visitors to employer or third-party websites.`
        },
        {
            icon: UserCheck,
            color: 'from-emerald-500 to-teal-600',
            title: '3. User Accounts & Registration',
            content: `Visitors do not need an account to browse public listings. Contact and newsletter forms are subject to the Privacy Policy.`
        },
        {
            icon: Copyright,
            color: 'from-teal-500 to-cyan-600',
            title: '4. Intellectual Property',
            content: `All content on our platform — including text, graphics, logos, icons, job listings, and articles — is protected by applicable copyright laws. You may not reproduce, distribute, modify, or create derivative works of our content without prior written permission.`
        },
        {
            icon: Ban,
            color: 'from-teal-600 to-cyan-600',
            title: '5. Prohibited Conduct',
            content: `You agree not to:\n• Scrape or reproduce our content in bulk without permission\n• Attempt to reverse-engineer, hack, or disrupt our platform\n• Upload malicious code, viruses, or harmful software\n• Use our platform for spam, phishing, or fraudulent activities\n• Post offensive, abusive, or discriminatory content\n• Impersonate other users or our staff\n• Use the platform in any way that violates applicable laws`
        },
        {
            icon: FileText,
            color: 'from-sky-500 to-blue-600',
            title: '6. Job Listings & Third-Party Links',
            content: `We curate and display off-campus job listings and internship opportunities for informational purposes only. We do not guarantee the accuracy, completeness, or timeliness of any job listing. We are not a recruitment agency and are not responsible for the hiring decisions of any company. Our platform may contain links to external websites — we are not responsible for their content or practices.`
        },
        {
            icon: AlertTriangle,
            color: 'from-blue-500 to-sky-600',
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
            color: 'from-cyan-500 to-teal-600',
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
            color: 'from-blue-600 to-teal-600',
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
            <main className="min-h-screen bg-[#f3f8fb] pt-20 dark:bg-slate-950">
                <header className="page-hero-enter relative isolate overflow-hidden border-b border-blue-100/80 bg-[#f3f8fb] dark:border-gray-800 dark:bg-gray-950">
                    <div className="mx-auto grid max-w-6xl items-end gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_auto]">
                        <div className="max-w-3xl">
                            <span className="inline-flex rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:border-blue-800 dark:bg-slate-900/80 dark:text-blue-300">Platform guidelines</span>
                            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-5xl">Terms of <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">use</span></h1>
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">Please read these terms before using TheJobInfo. They explain the rules that apply to our content, services, and features.</p>
                        </div>
                        <div className="rounded-2xl border border-white/80 bg-white/80 px-5 py-4 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Last updated</p>
                            <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{lastUpdated}</p>
                        </div>
                    </div>
                </header>

                <div className="mx-auto grid min-w-0 max-w-6xl gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                    <aside className="h-fit min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:sticky lg:top-24">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">On this page</p>
                        <nav aria-label="Terms sections" className="flex min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
                            {sections.map((section, i) => (
                                <a key={section.title} href={`#terms-section-${i}`} className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-300 lg:whitespace-normal">
                                    {section.title.replace(/^\d+\.\s*/, '')}
                                </a>
                            ))}
                            <a href="#terms-advertising" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-300">Advertising</a>
                        </nav>
                    </aside>

                    <div className="min-w-0 space-y-6">
                        <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm dark:border-blue-900/50 dark:bg-gray-900 sm:p-6">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">At a glance</p>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {highlights.map((highlight) => (
                                    <div key={highlight.text} className="flex items-start gap-2.5 rounded-xl bg-gray-50 px-3.5 py-3 dark:bg-gray-800/70">
                                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                        <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{highlight.text}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {sections.map((section, i) => {
                            const Icon = section.icon;
                            return (
                                <section key={section.title} id={`terms-section-${i}`} className="scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                                    <div className="flex items-start gap-4">
                                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${section.color} text-white shadow-sm`}>
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <div className="min-w-0">
                                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{section.title}</h2>
                                            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">{section.content}</p>
                                        </div>
                                    </div>
                                </section>
                            );
                        })}

                        <section id="terms-advertising" className="scroll-mt-28 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-5 dark:border-amber-900/60 dark:bg-amber-950/20 sm:p-6">
                            <div className="flex items-start gap-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white"><AlertTriangle className="h-5 w-5" /></span>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">12. Advertising & Monetization</h2>
                                    <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">Our platform may display advertisements served by Google AdSense and other trusted ad networks. By using our platform, you acknowledge that such ads may appear. All job listings, sponsored content, or promotional materials are clearly distinguished from editorial content. We may earn revenue from ad impressions and clicks, which helps us keep the platform free for all users.</p>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl bg-gradient-to-br from-blue-700 via-teal-700 to-emerald-700 p-6 text-white shadow-lg shadow-blue-950/15 sm:p-8">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="max-w-xl">
                                    <p className="text-sm font-bold text-white/80">Need clarification?</p>
                                    <h2 className="mt-1 text-2xl font-bold">Questions about these terms?</h2>
                                    <p className="mt-2 text-sm leading-relaxed text-white/75">Reach out if you have questions or concerns about these Terms and Conditions.</p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50"><Mail className="h-4 w-4" />{siteConfig.email}</a>
                                    {siteConfig.telegram && <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"><Send className="h-4 w-4" />Telegram Community</a>}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default TermsAndConditions;
