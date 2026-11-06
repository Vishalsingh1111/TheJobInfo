import React, { useEffect, useRef } from "react";
import { siteConfig } from "../siteConfig";

export default function AdSlot({ name }) {
    const slot = siteConfig.ads.slots[name];
    const insRef = useRef(null);

    useEffect(() => {
        let script = document.querySelector('script[data-thejobinfo-adsense="true"]');
        let loadListener;
        const queueAd = () => {
            try {
                const ads = window.adsbygoogle || [];
                ads.push({});
                window.adsbygoogle = ads;
            } catch (error) {
                console.error("Could not load this advertisement:", error);
            }
        };
        const renderAd = () => {
            if (!siteConfig.ads.enabled || !slot || !insRef.current) return;
            try {
                if (localStorage.getItem("thejobinfo-cookie-choice") !== "accepted") return;
            } catch (error) {
                console.error("Could not read advertising consent:", error);
                return;
            }

            if (script) {
                if (script.dataset.ready === "true") queueAd();
                else {
                    loadListener = queueAd;
                    script.addEventListener("load", loadListener, { once: true });
                }
                return;
            }

            script = document.createElement("script");
            script.async = true;
            script.crossOrigin = "anonymous";
            script.dataset.thejobinfoAdsense = "true";
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.ads.client}`;
            script.addEventListener("load", () => {
                script.dataset.ready = "true";
                queueAd();
            }, { once: true });
            document.head.appendChild(script);
        };

        renderAd();
        window.addEventListener("thejobinfo-cookie-choice", renderAd);
        return () => {
            window.removeEventListener("thejobinfo-cookie-choice", renderAd);
            if (loadListener) script?.removeEventListener("load", loadListener);
        };
    }, [slot]);

    if (!siteConfig.ads.enabled || !slot) return null;
    return (
        <aside className="my-8" aria-label="Advertisement">
            <span className="mb-2 block text-center text-[10px] font-bold uppercase tracking-[.16em] text-slate-400 dark:text-gray-500">Advertisement</span>
            <div className="flex min-h-[250px] w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-200 bg-white/70 p-3 dark:border-gray-700 dark:bg-gray-900/50">
                <ins
                    ref={insRef}
                    className="adsbygoogle block min-h-[250px] w-full"
                    data-ad-client={siteConfig.ads.client}
                    data-ad-slot={slot}
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        </aside>
    );
}
