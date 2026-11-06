
import { isPopularCompany } from "./Popularcompanies.js";

const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export function shouldPostToTelegram(job) {
    return Boolean(job?.forceTelegram)
        || (job?.level === "fresher" && isPopularCompany(job?.company));
}

export function getTelegramSkipReason(job) {
    if (job?.forceTelegram) return "";
    if (!isPopularCompany(job?.company)) return "company is not on the popular list";
    if (job?.level !== "fresher") return "job level is not fresher";
    return "";
}

const getCleanRole = (title) => {
    let t = String(title || "").trim();
    if (!t) return "";
    if (t.includes("|")) t = t.split("|").pop().trim();
    t = t.replace(/\b(off[\s-]?campus|on[\s-]?campus)?\s*(recruitment|hiring|drive)\b\s*(20\d{2})?/gi, " ")
        .replace(/\b20\d{2}\b/g, " ")
        .replace(/\s{2,}/g, " ")
        .replace(/^[\s\-–—:|]+|[\s\-–—:|]+$/g, "")
        .trim();
    return t || String(title).trim();
};

export const buildMessage = (job) => {
    const lines = [`${job.company || "Company"} is Hiring :—`, "————————————————————-", ""];
    if (job.company) lines.push(`Company: ${job.company}`);
    const role = getCleanRole(job.title);
    if (role) lines.push(`Role : ${role}`);
    if (job.salary) lines.push(`Salary: ${job.salary}`);
    if (job.location) lines.push(`Location : ${job.location}`);
    if (job.jobType) lines.push(`Job Type : ${job.jobType}`);
    if (job.experience) lines.push(`Experience: ${job.experience}`);
    if (job.lastDate) lines.push(`Last Date: ${job.lastDate}`);
    if (job.createdAt) lines.push(`Posted On: ${formatDate(job.createdAt)}`);
    const site = String(process.env.SITE_URL || "").replace(/\/+$/, "");
    lines.push("", `Apply Link: ${site}/jobdetail/${job.slug || job._id}`);
    return lines.join("\n");
};

export const postJobToTelegram = async (job) => {
    const reason = getTelegramSkipReason(job);
    if (reason) {
        console.log(`[telegram] skipped: ${reason}`);
        return { skipped: true, reason };
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHANNEL_ID;
    if (!token || !chatId || token === "your_token_here") {
        console.log("[telegram] skipped: bot credentials are not configured");
        return { skipped: true, reason: "bot credentials are not configured" };
    }
    try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: buildMessage(job) }),
            signal: AbortSignal.timeout(15000),
        });
        if (!res.ok) throw new Error(`Telegram API responded ${res.status}: ${await res.text()}`);
        return { sent: true };
    } catch (err) {
        console.error("Telegram post failed:", err.cause?.code || err.message);
        throw err;
    }
};