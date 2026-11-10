# SKR Inter College — Implementation Status

Last updated: 24 Oct 2026

## Live site
https://skr-inter-college.vercel.app/

## Stack
- Next.js 15 App Router + TypeScript + Tailwind 4
- Prisma + MongoDB Atlas
- JWT sessions (jose) + bcrypt
- Deployed on Vercel

## Route status

| Route | Status |
|-------|--------|
| `/` | Working |
| `/about` | Working |
| `/academics` | Working |
| `/admissions` | Working (info page) |
| `/apply-now` | Working + API persists to DB |
| `/notices` | Working |
| `/gallery` | Working |
| `/contact` | Working |
| `/downloads` | Working (placeholder content) |
| `/disclosures` | Working |
| `/privacy` | Working |
| `/terms` | Working |
| `/safeguarding` | Working |
| `/login` | Working |
| `/admin/dashboard` | Working (auth required) |
| `/admin/students/import` | Present — needs end-to-end retest |
| `/teacher/dashboard` | Working (auth required) |
| `/student/dashboard` | Working (auth required) |
| `/parent/dashboard` | Working (auth required) |

## Auth accounts (demo / bootstrap)

Credentials are no longer documented here. The Super Admin account is created
from `BOOTSTRAP_ADMIN_EMAIL` / `BOOTSTRAP_ADMIN_PASSWORD` environment
variables (set in Vercel, not in this repo); demo teacher/student/parent
accounts get randomly generated passwords printed once when `npm run db:seed`
is run. See `README.md`.

> ⚠️ This file previously listed a real admin email and a weak password in
> plaintext. If that password is still in use on the live site, change it
> immediately — anyone who has ever viewed this public repository (including
> its git history) has seen it.

## Feature checklist

| Feature | Status |
|---------|--------|
| Public site + fixed 404s | Working and tested |
| Admission enquiry form → DB | Working |
| Role-based login + JWT | Working |
| Bulk student import UI/API | Present but unverified |
| Exam marks → PDF report cards | Missing / incomplete |
| Fees & payments | Schema only |
| Library | Schema only |
| Windows .exe / Android APK | Not built (out of scope for current sprint) |
| Full LMS | Partial |

## Next priorities
1. Retest Excel import end-to-end
2. Marks entry + approval + PDF report cards
3. Admin admissions list UI
4. Notices CMS from admin
5. Fee invoices
