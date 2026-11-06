
import cron from "node-cron";
import Job from "../Modal/Job.modal.js";
import { syncFreehireJobs } from "./Freehiresync.service.js";

// ⚠️ TESTING: true  = run every 2 minutes (to see jobs arrive quickly)
//             false = run every 60 minutes (use this for the live site)
const TEST_MODE = false;

const IMPORTED = { externalId: { $exists: true, $ne: null } };


export function startFreehireCron() {
    if (process.env.FREEHIRE_SYNC_ENABLED === "false") {
        console.log("[freehire] cron disabled via FREEHIRE_SYNC_ENABLED=false");
        return;
    }

    const schedule = process.env.FREEHIRE_CRON || (TEST_MODE ? "*/2 * * * *" : "0 * * * *");
    if (!cron.validate(schedule)) {
        console.error(`[freehire] invalid cron expression: "${schedule}"`);
        return;
    }

    // Each run imports at most one tech job and removes jobs that have reached their expiry date.
    cron.schedule(schedule, () => syncFreehireJobs(), { timezone: "Asia/Kolkata" });
    cron.schedule("0 2 * * *", async () => {
        try {
            const result = await Job.deleteMany({ expiresAt: { $lte: new Date() } });
            console.log(`[jobs] removed ${result.deletedCount || 0} expired job(s)`);
        } catch (error) {
            console.error("[jobs] expired-job cleanup failed:", error.message);
        }
    }, { timezone: "Asia/Kolkata" });

    setTimeout(async () => {
        try {
            // One-off cleanup: FREEHIRE_RESET_ON_START=true deletes ONLY imported jobs (never your manual ones).
            // Remove the variable from .env right after the server has started once.
            if (process.env.FREEHIRE_RESET_ON_START === "true") {
                const r = await Job.deleteMany(IMPORTED);
                console.log(`[freehire] RESET: deleted ${r.deletedCount} imported job(s). Now remove FREEHIRE_RESET_ON_START from .env`);
            }

            // First run: if nothing has been imported yet, add the first batch shortly after boot.
            const count = await Job.countDocuments(IMPORTED);
            if (count === 0) await syncFreehireJobs();
        } catch (err) {
            console.error("[freehire] startup task failed:", err.message);
        }
    }, 10_000);

    console.log(
        TEST_MODE && !process.env.FREEHIRE_CRON
            ? `[freehire] ⚠️ TEST MODE: running every 2 minutes (set TEST_MODE = false in freehire.cron.js for hourly)`
            : `[freehire] cron scheduled: "${schedule}"`
    );
}