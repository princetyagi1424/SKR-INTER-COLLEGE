# S.K.R. INTER COLLEGE & PVT ITI  
## Complete Digital School Ecosystem — ERP + LMS

**Institution:** S.K.R. INTER COLLEGE & PVT ITI  
**Location:** Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra, Uttar Pradesh — PIN 283113  
**Contact:** 9837183726  
**Maps:** https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7  

This is a full-stack, role-based school management platform combining:

1. Public school website (SEO-friendly, bilingual-ready)
2. School ERP (students, staff, classes, attendance, fees)
3. LMS (assignments, resources)
4. Examination & report-card system with PDF generation
5. Excel/CSV bulk student import with preview & validation
6. Student, Parent, Teacher and Admin portals
7. Installable Progressive Web App (PWA)

> **Important:** All demo data is fictional. Never use real student records in development or public demos. Verify official school details (affiliation, principal name, establishment year, fee structure) with the school before publishing them.

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| Backend      | Next.js Route Handlers (API)        |
| Database     | PostgreSQL + Prisma ORM             |
| Auth         | Secure HTTP-only session cookies + JWT (jose), bcrypt password hashing |
| Excel        | SheetJS (xlsx)                      |
| PDF          | PDFKit (report cards)               |
| Validation   | Zod                                 |

---

## Prerequisites (Windows)

1. **Node.js** 18.18+ (LTS recommended) — https://nodejs.org  
2. **PostgreSQL** 14+ — https://www.postgresql.org/download/windows/  
3. **Git** (optional)

Create a PostgreSQL database and user:

```sql
CREATE USER skr_user WITH PASSWORD 'your_secure_password';
CREATE DATABASE skr_college OWNER skr_user;
GRANT ALL PRIVILEGES ON DATABASE skr_college TO skr_user;
```

---

## Local Setup (Windows)

```powershell
# 1. Extract / clone the project
cd path\to\skr-college

# 2. Install dependencies
npm install

# 3. Configure environment
copy .env.example .env
# Edit .env — set DATABASE_URL and JWT_SECRET

# 4. Generate Prisma client & run migrations
npx prisma generate
npx prisma db push
# Or: npx prisma migrate dev --name init

# 5. Seed fictional demo data + Super Admin
npm run db:seed

# 6. Start development server
npm run dev
```

Open http://localhost:3000

### Demo accounts (change immediately)

| Role        | Email                              | Password                   |
|-------------|------------------------------------|----------------------------|
| Super Admin | admin@skrcollege.local             | ChangeMeImmediately123!    |
| Teacher     | teacher.demo@skrcollege.local      | Teacher@123                |
| Student     | skr2025001@student.skrcollege.local| Student@123                |
| Parent      | parent.demo@skrcollege.local       | Parent@123                 |

---

## Production Build

```powershell
npm run build
npm start
```

Set `NODE_ENV=production`, use a strong `JWT_SECRET`, disable `DEMO_MODE`, and remove all demo accounts before go-live.

---

## Core Features Implemented

### Public Website
- Home, About, Academics, Admissions, Notices, Gallery, Contact, Mandatory Disclosures
- Responsive header with mobile menu
- SEO metadata, PWA manifest
- Google Maps directions link

### Authentication & Roles
- Login / logout with secure sessions
- Roles: Super Admin, Principal, School Admin, Admission Officer, Teacher, Exam Controller, Accountant, Student, Parent, Librarian, HR, Staff
- Server-side permission checks on every sensitive API
- Password hashing (bcrypt, cost 12)
- Audit logging for login and bulk operations

### Admin Dashboard
- Live statistics from the database (students, staff, classes, attendance, pending fees, exams)
- Quick links to all modules

### Bulk Student Import (Excel/CSV) — Core Requirement
1. Download template  
2. Upload .xlsx / .xls / .csv  
3. Column mapping (auto-detects common English/Hindi labels)  
4. Preview + validation (required fields, duplicates, class existence)  
5. Confirm import (new records only; never silent overwrite)  
6. Audit record of the import job  

### Student / Parent / Teacher Portals
- Role-specific dashboards
- Students see only their own results and attendance
- Parents see only verified linked children
- Teachers access attendance and marks entry entry points

### Database Schema
Complete Prisma schema covering: Users, Sessions, Students, Guardians, Enrollments, Classes, Sections, Subjects, Staff, Attendance, Timetables, Exams, Marks, Report Cards, Fees, Payments, Assignments, Submissions, Notices, Library, Certificates, Import Jobs, Admissions, Audit Logs, School Settings.

---

## Project Structure

```
skr-college/
├── prisma/
│   ├── schema.prisma      # Full data model
│   └── seed.ts            # Fictional demo seed
├── public/
│   ├── manifest.json      # PWA
│   └── icons/
├── src/
│   ├── app/
│   │   ├── (auth)/login/
│   │   ├── (portals)/
│   │   │   ├── admin/dashboard/
│   │   │   ├── admin/students/import/
│   │   │   ├── teacher/dashboard/
│   │   │   ├── student/dashboard/
│   │   │   └── parent/dashboard/
│   │   ├── (public)/...
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   └── import/students/
│   │   ├── layout.tsx
│   │   ├── page.tsx       # Public home
│   │   └── globals.css
│   ├── components/layout/
│   └── lib/
│       ├── prisma.ts
│       ├── auth.ts
│       └── utils.ts
├── .env.example
├── package.json
├── next.config.ts
└── README.md
```

---

## Security Notes

- All sensitive APIs call `requireAuth()` and check role/ownership server-side.
- Sessions are HTTP-only, Secure (in production), SameSite=Lax cookies.
- File uploads validated by size, extension, and content.
- No passwords in Excel templates or seed output beyond the bootstrap admin.
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
- Do not cache private dashboard API responses in the service worker.

---

## What Still Needs School Configuration

| Item                         | Status                                      |
|------------------------------|---------------------------------------------|
| Official affiliation details | Editable in School Settings; verify before publish |
| Principal / management names | Not fabricated; add via admin               |
| Fee structure                | Module schema ready; configure in admin     |
| Payment gateway (Razorpay etc.) | Integration hooks; needs merchant credentials |
| Email / SMS providers        | Env vars documented; sandbox mode           |
| Real school photographs      | Upload via CMS when available               |
| Hindi content                | Schema supports; content editable           |
| Full exam marks UI + PDF     | Schema + workflow designed; extend UI       |
| Academic year promotion wizard | Schema supports; UI to be completed       |
| Certificate generator        | Schema ready; template PDFs to be added     |

---

## Deployment Outline

1. Provision PostgreSQL (managed or self-hosted).
2. Set production environment variables (never commit secrets).
3. Run `npx prisma migrate deploy`.
4. Run seed **only** in staging; bootstrap Super Admin securely in production.
5. Deploy Next.js (Vercel, Railway, DigitalOcean App Platform, or Node server behind Nginx).
6. Configure domain + HTTPS.
7. Enable daily database backups and test restore.
8. Remove demo accounts and disable `DEMO_MODE`.

---

## Acceptance Tests (Manual)

1. **Bulk Import:** Download template → fill 3–5 rows → map columns → preview → import → verify students appear in admin.
2. **Login roles:** Admin, Teacher, Student, Parent each land on correct dashboard.
3. **Permission:** Student cannot access `/admin/dashboard` (redirect to login).
4. **Public site:** Home, navigation, contact map link work on mobile and desktop.

---

## License & Ownership

Built for **S.K.R. INTER COLLEGE & PVT ITI**.  
Source code is provided for the school’s operational use.  
Do not publish real student personal data in public repositories.

---

## Support

For technical issues during deployment, contact your implementing partner or school IT coordinator.  
Keep a verified privacy/grievance contact for data subjects as required under applicable Indian law.
