

import Navbar from '../Navbar';
import Footer from '../Footer';
import {
    Shield, Eye, Lock, Database, Cookie, Mail,
    RefreshCw, UserCheck, ExternalLink, Send
} from 'lucide-react';
import { siteConfig } from '../../siteConfig';

const PrivacyPolicy = () => {
    const lastUpdated = siteConfig.policyUpdated;

    const sections = [
        {
            icon: Database,
            color: 'from-sky-500 to-blue-600',
            title: '1. Information We Collect',
            content: [
                {
                    subtitle: 'Information You Provide',
                    text: 'If you submit the contact form, we receive the name, email address, optional phone number, and message you provide. If you subscribe to job alerts, we receive your email address.'
                },
                {
                    subtitle: 'Usage Information',
                    text: 'Our hosting provider may process standard request and device information, such as IP address and browser details, to deliver and protect the website.'
                },
                {
                    subtitle: 'Device & Technical Data',
                    text: 'We may collect your browser type, operating system, IP address, and device identifiers to ensure our platform functions correctly across all devices.'
                },
            ],
        },
        {
            icon: Eye,
            color: 'from-blue-500 to-teal-600',
            title: '2. How We Use Your Information',
            content: [
                {
                    subtitle: 'To Provide & Improve Services',
                    text: 'We use submitted contact details to respond to messages and subscriber email addresses to provide the requested newsletter.'
                },
                {
                    subtitle: 'To Communicate With You',
                    text: 'Visitors do not need an account to browse public listings. Contact us to request deletion of a message or newsletter subscription.'
                },
                {
                    subtitle: 'For Analytics',
                    text: 'We do not claim to use analytics unless an analytics service is enabled and disclosed here.'
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
                    text: 'Hosting, database, and email providers may process information as needed to operate the site and respond to requests. Employer application pages have their own privacy practices.'
                },
                {
                    subtitle: 'Legal Requirements',
                    text: 'We may disclose your information if required by law, court order, or governmental authority, or to protect the rights and safety of our users.'
                },
            ],
        },
        {
            icon: Cookie,
            color: 'from-teal-500 to-cyan-600',
            title: '4. Cookies & Tracking',
            content: [
                {
                    subtitle: 'What Are Cookies',
                    text: 'The site may store theme or consent preferences in local storage. Public job browsing does not require an account.'
                },
                {
                    subtitle: 'Types of Cookies We Use',
                    text: 'The site is preparing for Google AdSense, but ad placements are disabled by default. If enabled, Google and its partners may use cookies or similar technologies for advertising, subject to your settings and applicable consent requirements.'
                },
                {
                    subtitle: 'Managing Cookies',
                    text: 'You can manage cookies in your browser. You can also review Google ad personalization settings and opt out of personalized advertising through Google Ads Settings and industry opt-out tools.'
                },
            ],
        },
        {
            icon: Lock,
            color: 'from-teal-500 to-cyan-600',
            title: '5. Data Security',
            content: [
                {
                    subtitle: 'Our Security Measures',
                    text: 'We use reasonable technical and organizational safeguards. No internet transmission or storage method can be guaranteed completely secure.'
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
                    text: `You can request deletion of contact messages or a newsletter subscription by emailing ${siteConfig.email}. We will verify and process requests as required by law.`
                },
                {
                    subtitle: 'Data Portability',
                    text: 'You may request a copy of your personal data in a structured, machine-readable format.'
                },
            ],
        },
        {
            icon: Shield,
            color: 'from-emerald-500 to-cyan-600',
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
            <main className="min-h-screen bg-[#f3f8fb] pt-20 dark:bg-slate-950">
                <header className="page-hero-enter relative isolate overflow-hidden border-b border-blue-100/80 bg-[#f3f8fb] dark:border-gray-800 dark:bg-gray-950">
                    <div className="mx-auto grid max-w-6xl items-end gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_auto]">
                        <div className="max-w-3xl">
                            <span className="inline-flex rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:border-blue-800 dark:bg-slate-900/80 dark:text-blue-300">Privacy & data</span>
                            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-5xl">Your privacy <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">matters</span></h1>
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">Learn what information we handle, why we use it, and the choices available to you when using TheJobInfo.</p>
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
                        <nav aria-label="Privacy policy sections" className="flex min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
                            {navItems.map((item, i) => (
                                <a key={item} href={`#section-${i}`} className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-300">
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </aside>

                    <div className="min-w-0 space-y-6">
                        {sections.map((section, i) => {
                            const Icon = section.icon;
                            return (
                                <section key={section.title} id={`section-${i}`} className="scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                                    <div className="flex items-start gap-4">
                                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${section.color} text-white shadow-sm`}>
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{section.title}</h2>
                                            <div className="mt-4 space-y-5">
                                                {section.content.map((block) => (
                                                    <div key={block.subtitle} className="border-l-2 border-blue-200 pl-4 dark:border-blue-800">
                                                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">{block.subtitle}</h3>
                                                        <p className="mt-1 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">{block.text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            );
                        })}

                        <section className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-5 dark:border-amber-900/60 dark:bg-amber-950/20 sm:p-6">
                            <div className="flex items-start gap-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white"><ExternalLink className="h-5 w-5" /></span>
                                <div className="min-w-0">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Third-party advertising</h2>
                                    <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">Ad placements are disabled by default. If advertising is later enabled, Google AdSense and its partners may use cookies and similar technologies for ad delivery and personalization under their own privacy policies and applicable consent requirements.</p>
                                    <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                                        You can opt out of personalized advertising through{' '}
                                        <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 dark:text-blue-300">Google Ads Settings</a>
                                        {' '}or the{' '}
                                        <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noreferrer" className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 dark:text-blue-300">NAI opt-out page</a>.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl bg-gradient-to-br from-blue-700 via-teal-700 to-emerald-700 p-6 text-white shadow-lg shadow-blue-950/15 sm:p-8">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="max-w-xl">
                                    <p className="text-sm font-bold text-white/80">We’re here to help</p>
                                    <h2 className="mt-1 text-2xl font-bold">Questions about your privacy?</h2>
                                    <p className="mt-2 text-sm leading-relaxed text-white/75">Contact us with any questions or concerns about this Privacy Policy.</p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50"><Mail className="h-4 w-4" />{siteConfig.email}</a>
                                    {siteConfig.telegram && <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"><Send className="h-4 w-4" />Telegram</a>}
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

export default PrivacyPolicy;
