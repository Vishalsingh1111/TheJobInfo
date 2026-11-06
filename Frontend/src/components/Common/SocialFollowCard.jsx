import React from "react";
import { Instagram, Send, Youtube } from "lucide-react";
import { siteConfig } from "../../siteConfig";

const socialLinks = [
    {
        label: "Telegram",
        action: "Join",
        href: siteConfig.telegram,
        icon: Send,
        className: "bg-sky-500 hover:bg-sky-600 focus-visible:ring-sky-500",
    },
    {
        label: "Instagram",
        action: "Follow",
        href: siteConfig.instagram,
        icon: Instagram,
        className: "bg-slate-800 hover:bg-slate-900 focus-visible:ring-slate-500",
    },
    {
        label: "YouTube",
        action: "Subscribe",
        href: siteConfig.youtube,
        icon: Youtube,
        className: "bg-red-600 hover:bg-red-700 focus-visible:ring-red-500",
    },
].filter(({ href }) => href);

export default function SocialFollowCard() {
    return (
        <section className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Follow us</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Get job updates and career tips on our social channels.
            </p>
            <div className="mt-4 space-y-2.5">
                {socialLinks.map(({ label, action, href, icon: Icon, className }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${action} TheJobInfo on ${label}`}
                        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${className}`}
                    >
                        <span className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {action} on {label}
                        </span>
                    </a>
                ))}
            </div>
        </section>
    );
}
