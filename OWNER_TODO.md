# Owner follow-up

- Rotate the Gemini key and any other credential that may have been exposed previously; set replacements only in host environment settings.
- Confirm that `contact@thejobinfo.in` is active and configure it with `VITE_CONTACT_EMAIL`.
- Set the correct Telegram channel URL in `VITE_TELEGRAM_URL`; provide a YouTube URL if desired.
- Provide the editor's approved biography and photo, and review author details before publication.
- Review the 30-topic plan and the initial article draft. Write and fact-check the remaining 29 long-form drafts before publishing; the included seeder imports only as unpublished drafts.
- Configure MongoDB, JWT secret/TTL, CORS origins, AI, Telegram, Cloudinary, and API URLs on Render/Vercel/Admin.
- Back up MongoDB, run `dedupeJobs.js --dry-run` and `backfillLevels.js --dry-run`, review results, then explicitly re-run with `--apply` if correct.
- Verify expired-job cleanup, public/admin API behavior, and serverless metadata endpoints against staging.
- Submit the sitemap in Search Console, verify `ads.txt`, and complete the AdSense checklist before enabling ads.
