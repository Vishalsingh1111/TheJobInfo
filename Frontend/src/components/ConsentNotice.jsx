import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Send } from "lucide-react";
import { siteConfig } from "../siteConfig";

function readStorage(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error(`Could not read ${key}:`, error);
        return null;
    }
}

export default function ConsentNotice() {
    const [choice, setChoice] = useState(() => readStorage("thejobinfo-cookie-choice"));
    const [followDismissed, setFollowDismissed] = useState(() => Boolean(readStorage("thejobinfo-follow-dismissed")));

    const choose = (choice) => {
        try {
            localStorage.setItem("thejobinfo-cookie-choice", choice);
        } catch (error) {
            console.error("Could not save the cookie preference:", error);
        }
        setChoice(choice);
        window.dispatchEvent(new Event("thejobinfo-cookie-choice"));
    };

    const dismissFollow = () => {
        try {
            localStorage.setItem("thejobinfo-follow-dismissed", "true");
        } catch (error) {
            console.error("Could not save the social follow preference:", error);
        }
        setFollowDismissed(true);
    };

    if (!choice) {
        return (
            <aside className="fixed inset-x-3 bottom-3 z-[60] rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-950/15 backdrop-blur dark:border-gray-700 dark:bg-gray-900/95 sm:inset-x-5 sm:bottom-5">
                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <p className="max-w-3xl text-sm leading-6 text-slate-700 dark:text-gray-300">
                        This site may use cookies or similar storage for preferences and, if enabled, advertising. Read our <Link className="underline" to="/privacy-policy">Privacy Policy</Link>.
                    </p>
                    <div className="flex shrink-0 gap-2">
                        <button className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800" onClick={() => choose("dismissed")}>Dismiss</button>
                        <button className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-800" onClick={() => choose("accepted")}>Accept</button>
                    </div>
                </div>
            </aside>
        );
    }

    if (followDismissed) return null;

    const socialLinks = [
        { label: "Telegram", href: siteConfig.telegram, icon: Send, color: "bg-sky-600 hover:bg-sky-700" },
        { label: "Instagram", href: siteConfig.instagram, icon: Instagram, color: "bg-slate-800 hover:bg-slate-900" },
    ].filter((link) => link.href);

    if (socialLinks.length === 0) return null;

    return (
        <aside aria-label="Follow TheJobInfo" className="fixed inset-x-3 bottom-3 z-[60] rounded-2xl border border-teal-100 bg-white/95 p-4 shadow-2xl shadow-slate-950/15 backdrop-blur dark:border-teal-900 dark:bg-gray-900/95 sm:inset-x-5 sm:bottom-5">
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">Stay connected with TheJobInfo</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Follow us for job updates and career tips.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {socialLinks.map(({ label, href, icon: Icon, color }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white ${color}`}>
                            <Icon className="h-4 w-4" />
                            Follow on {label}
                        </a>
                    ))}
                    <button type="button" onClick={dismissFollow} className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800">
                        Not now
                    </button>
                </div>
            </div>
        </aside>
    );
}
