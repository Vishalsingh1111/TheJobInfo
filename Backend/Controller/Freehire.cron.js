
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

    // Each run adds up to 2 new tech jobs (FREEHIRE_JOBS_PER_RUN) and removes imported jobs older than 30 days.
    cron.schedule(schedule, () => syncFreehireJobs(), { timezone: "Asia/Kolkata" });

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