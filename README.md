# TheJobInfo

TheJobInfo is a job-listing and career-guidance site with a React/Vite frontend, Express/Mongoose backend, and a separate React admin application.

## Local development

Use Node.js 20 or later. Each app has one local `.env` file and no `.env.example` duplicate:

### Backend

Check `Backend/.env` for `MONGO_URI` and a private `JWT_SECRET`. Keep any existing credentials there; do not copy them into source control. From `Backend/`, run `npm install`, `npm test`, then `npm start`. Create the first admin with `npm run create:admin`. If you forget the admin username or password, run `npm run reset:admin-password`; it lists usernames and interactively resets the selected account's password.

The server listens on port 4001 by default. Public job/blog reads and the health endpoint remain public; admin mutations and private contact/newsletter reads require `Authorization: Bearer <token>`.

### Frontend

`Frontend/.env` points to the local backend at `http://localhost:5173`. Set the contact and channel values if you have the correct owner-provided URLs. From `Frontend/`, run `npm install`, `npm run dev`, or `npm run build`.

### Admin

`Admin/.env` points to the local backend at `http://localhost:3006`. From `Admin/`, run `npm install`, then `npm start` for development or `npm run build`. Sign in at `/login` (the legacy `/Adminlogin` path redirects there); the token is kept in `localStorage` so the admin session survives page reloads.

## Environment configuration

- Each app reads its own `.env`: `Backend/.env`, `Frontend/.env`, and `Admin/.env`.
- AI provider keys, Telegram credentials, Cloudinary credentials, and `SYNC_SECRET` may remain blank until those optional integrations are configured. The values for these credentials must come from their providers.
- The backend importer accepts optional `FRESHER_RATIO` (default `0.9`) and `MIX_WINDOW` (default `50`) settings to control the fresher/experienced mix over recent imported jobs.
- Never commit `.env` files, API keys, passwords, or JWT secrets.

## Deployment

- Frontend: `https://dcoder-7vi1.onrender.com`
- Backend: `https://dcoder-backend.onrender.com`
- Admin: `https://dcoder-admin-page.onrender.com`
- Set the frontend's `VITE_API_BASE_URL` to the backend URL and `VITE_SITE_URL` to the frontend URL in Render's environment settings.
- Set the Admin's `REACT_APP_API_BASE_URL` to the backend URL in Render's environment settings.
- Set the backend's `CORS_ORIGINS` to `https://dcoder-7vi1.onrender.com,https://dcoder-admin-page.onrender.com`, and configure all backend secrets and database settings in Render's environment settings.
- Keep production secrets in the hosting provider's environment settings, not in this repository.
- Keep production secrets in the hosting provider's environment settings, not in this repository.

## Maintenance scripts

Run scripts from `Backend/` with a configured database URI:

- `node scripts/createAdmin.js` — create an administrator without passing a password on the command line.
- `node scripts/dedupeJobs.js --dry-run` — inspect duplicate candidates. Use `--apply` only after reviewing the output.
- `node scripts/backfillLevels.js --dry-run` — inspect normalized city, level, work mode, and dedupe metadata. Use `--apply` only after reviewing the output.
- `node scripts/regenerateJobContent.js --dry-run --limit 10` — preview generated summaries, preparation guides, and FAQs for active jobs with missing content. Review the output before using `--apply`.
- `npm run seed:articles` — validate article JSON files and preview a draft-only import. Add `-- --apply` to insert missing drafts; existing slugs are skipped and drafts remain unpublished.

## AdSense launch checklist

- Confirm a working domain email and owner-provided social/contact links.
- Review and publish at least 25 substantial original articles.
- The repository includes a 30-topic editorial plan and one long-form draft; the other 29 topics still require original drafts and editorial review.
- Complete and review About, Editorial Policy, Privacy, Contact, Terms, and Disclaimer content.
- Submit `https://thejobinfo.in/sitemap.xml` in Search Console and verify `ads.txt`.
- Check broken links, page usefulness, accessibility, and mobile layouts.
- Re-apply only after review. AdSense approval is not guaranteed. Keep `siteConfig.ads.enabled` false until the owner has approval and has configured ad slots and consent requirements.
