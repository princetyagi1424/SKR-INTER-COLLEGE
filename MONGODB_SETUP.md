# MongoDB Setup (Atlas)

1. Open https://www.mongodb.com/atlas and create a free cluster.
2. Database Access → Add user (remember username + password).
3. Network Access → Add IP `0.0.0.0/0` for development (restrict in production).
4. Connect → Drivers → copy URI.

Example `.env`:

```env
DATABASE_URL="mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/skr_college?retryWrites=true&w=majority"
JWT_SECRET="your-long-secret"
BOOTSTRAP_ADMIN_EMAIL="you@email.com"
BOOTSTRAP_ADMIN_PASSWORD="StrongPassword"
```

**Important:** URL-encode special characters in the password (`@` → `%40`, etc.).

Then:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Never commit `.env`. Use `.env.example` only as a template.
