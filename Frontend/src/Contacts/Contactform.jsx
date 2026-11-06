
import React from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { baseUrl } from '../Baseurl';
import { siteConfig } from '../siteConfig';
import Footer from '../components/Footer';
import {
    Mail, MapPin, Send, Briefcase, Flag,
    MessageSquare, Clock, ArrowRight, Users
} from 'lucide-react';

const ContactForm = () => {
    const [searchParams] = useSearchParams();
    const jobUrl = searchParams.get('jobUrl');
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            reason: jobUrl ? 'Report a wrong or closed listing' : 'Report a wrong or closed listing',
            jobUrl: jobUrl || '',
            message: jobUrl ? `I would like to report this job listing: ${jobUrl}` : '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${baseUrl}/contact/contactInfo`, {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                message: `Reason: ${data.reason}\nListing URL: ${data.jobUrl || 'Not provided'}\n\n${data.message}`,
            });
            if (res.data) {
                toast.success('Message sent successfully!');
                reset();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    const contactDetails = [
        { icon: MapPin, label: 'Location', value: 'Kaimur, Bihar, India', color: 'from-teal-500 to-cyan-600' },
        { icon: Mail, label: 'Email', value: siteConfig.email, color: 'from-blue-500 to-teal-600' },
        { icon: Clock, label: 'Response time', value: '1 to 2 working days', color: 'from-sky-500 to-blue-600' },
    ];

    const reasons = [
        { icon: Flag, title: 'Report a listing', desc: 'Flag a wrong or closed job post' },
        { icon: Briefcase, title: 'Job listing request', desc: 'Share a role you would like us to feature' },
        { icon: MessageSquare, title: 'General inquiry', desc: 'Ask us a question or suggest a correction' },
        { icon: Users, title: 'Partnership', desc: 'Discuss a collaboration with our team' },
    ];

    const socialLinks = [
        {
            label: 'Telegram',
            href: siteConfig.telegram,
            color: 'bg-sky-500 hover:bg-sky-600',
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
            ),
        },
        {
            label: 'Instagram',
            href: siteConfig.instagram,
            color: 'bg-slate-800 hover:bg-slate-900',
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
            ),
        },
        {
            label: 'YouTube',
            href: siteConfig.youtube,
            color: 'bg-red-600 hover:bg-red-700',
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            <Navbar />
            <Toaster />
            <div className="min-h-screen overflow-hidden bg-[#f3f8fb] dark:bg-gray-950">

                {/* ── HERO ── */}
                <div className="page-hero-enter relative isolate pt-20">
                    <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:py-16">
                        <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                            Get in{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                touch
                            </span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
                            Have a question, a correction, a job listing request or a partnership idea? Send us a message and we will reply within one to two working days.
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-4 pb-20 pt-4 sm:px-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">

                        {/* ── LEFT SIDEBAR ── */}
                        <div className="space-y-5 lg:col-span-1">

                            {/* Contact details */}
                            <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-lg shadow-slate-900/[0.04] dark:border-gray-800 dark:bg-gray-900">
                                <div className="px-5 py-4 border-b border-gray-50 dark:border-gray-800">
                                    <p className="text-base font-bold text-gray-900 dark:text-white">Contact details</p>
                                </div>
                                <div className="p-5 space-y-4">
                                    {contactDetails.map((c, i) => {
                                        const Icon = c.icon;
                                        return (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0`}>
                                                    <Icon className="w-4 h-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 dark:text-gray-500">{c.label}</p>
                                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{c.value}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Reasons to contact */}
                            <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-lg shadow-slate-900/[0.04] dark:border-gray-800 dark:bg-gray-900">
                                <div className="px-5 py-4 border-b border-gray-50 dark:border-gray-800">
                                    <p className="text-base font-bold text-gray-900 dark:text-white">How can we help?</p>
                                </div>
                                <div className="p-5 space-y-3">
                                    {reasons.map((r, i) => {
                                        const Icon = r.icon;
                                        return (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Icon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{r.title}</p>
                                                    <p className="text-xs text-gray-400 dark:text-gray-500">{r.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Social media */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                                <p className="text-lg font-bold text-gray-800 dark:text-white">Follow us</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Get job updates and career tips on our social channels.
                                </p>
                                <div className="mt-4 space-y-2.5">
                                    {socialLinks.filter((social) => social.href).map((s, i) => (
                                        <a
                                            key={i}
                                            href={s.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all ${s.color}`}
                                        >
                                            {s.icon}
                                            {s.label === 'Telegram' ? 'Join on Telegram' : s.label === 'Instagram' ? 'Follow on Instagram' : 'Subscribe on YouTube'}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── FORM ── */}
                        <div className="lg:col-span-2">
                            <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-xl shadow-teal-950/[0.06] dark:border-gray-800 dark:bg-gray-900">
                                <div className="px-6 py-5 border-b border-gray-50 dark:border-gray-800">
                                    <p className="text-base font-bold text-gray-900 dark:text-white mb-1">Send a message</p>
                                    <h2 className="text-sm text-gray-500 dark:text-gray-400">We’d love to hear from you</h2>
                                </div>

                                <div className="p-6">
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                        {/* Name row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">First Name <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    placeholder="John"
                                                    {...register('firstname', { required: 'First name is required' })}
                                                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-teal-400 dark:focus:border-teal-500 transition-colors"
                                                />
                                                {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    placeholder="Doe"
                                                    {...register('lastname', { required: 'Last name is required' })}
                                                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-teal-400 dark:focus:border-teal-500 transition-colors"
                                                />
                                                {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname.message}</p>}
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                {...register('email', {
                                                    required: 'Email is required',
                                                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                                                })}
                                                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-teal-400 dark:focus:border-teal-500 transition-colors"
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                        </div>

                                        {/* Reason */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Reason</label>
                                            <select {...register('reason')} className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-teal-400 dark:focus:border-teal-500 transition-colors">
                                                {['Report a wrong or closed listing', 'Job listing request', 'General inquiry', 'Partnership', 'Correction or feedback'].map((reason) => <option key={reason}>{reason}</option>)}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Listing URL <span className="text-gray-400">(optional)</span></label>
                                            <input type="url" placeholder="https://thejobinfo.com/jobdetail/..." {...register('jobUrl')} className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-teal-400 dark:focus:border-teal-500 transition-colors" />
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message <span className="text-red-500">*</span></label>
                                            <textarea
                                                placeholder="Tell us how we can help you..."
                                                rows={5}
                                                {...register('message', { required: 'Message is required' })}
                                                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-teal-400 dark:focus:border-teal-500 transition-colors resize-none"
                                            />
                                            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                                        </div>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send message
                                                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-xs text-gray-400 dark:text-gray-500 text-center leading-relaxed">
                                            By submitting this form you agree to our{' '}
                                            <Link to="/privacy-policy" className="text-teal-600 dark:text-teal-400 hover:underline">Privacy Policy</Link>.
                                            We typically respond within one to two working days.
                                        </p>
                                    </form>
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

export default ContactForm;
