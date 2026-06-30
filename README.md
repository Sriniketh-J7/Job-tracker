# 🗂️ Job Tracker — Setup Guide
A modern Job Application Tracker that helps job seekers organize, monitor, and manage their job applications in one place. Track application status, store resumes, maintain interview notes, and never lose sight of your job search.

It includes dashboard, database and an extension making it easy to use. 

## Step 1 — Supabase Setup
1. Go to https://supabase.com → create a free account → new project
2. Go to **SQL Editor** → New Query → paste the contents of `supabase_schema.sql` → Run
3. Go to **Project Settings → API** → copy:
   - Project URL (looks like `https://abcxyz.supabase.co`)
   - `anon` public key 

## Step 2 — Fill in your credentials
Open **both** these files and paste your Supabase URL and anon key:
- `dashboard/src/config.js` → also set your dashboard password here
- `extension/config.js` → also edit your resume versions list here

## Step 3 — Deploy Dashboard to Vercel
1. Go to https://vercel.com → sign up (free)
2. Install Vercel CLI: `npm i -g vercel`
3. In terminal:
   ```
   cd dashboard
   npm install
   npm run build
   vercel --prod
   ```
4. Vercel gives you a URL like `https://job-tracker-xyz.vercel.app` — that's your dashboard

## Step 4 — Load Chrome Extension
1. Open Chrome → go to `chrome://extensions`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked** → select the `extension/` folder
4. Pin the extension to your toolbar

## Step 5 — Add an icon (required by Chrome)
- Drop any 48x48 PNG named `icon.png` into the `extension/` folder
- You can use any emoji-to-PNG converter online for a quick icon

---

## How to use
1. Go to any job listing / careers page
2. Click the extension icon in your toolbar
3. Fields auto-fill — review and edit anything that's wrong
4. Pick your resume version from the dropdown
5. Hit **Confirm & Save**
6. Open your dashboard URL to see all applications, update statuses, filter, edit, delete

---

## Resume versions
Edit `extension/config.js` → `RESUME_VERSIONS` array to add/remove your resume names.

## Add new resume versions
Just add a new string to the `RESUME_VERSIONS` array in `extension/config.js` and reload the extension.
