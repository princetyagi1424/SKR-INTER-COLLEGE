# MongoDB Setup (Atlas)

1. Open https://www.mongodb.com/atlas and create a free cluster.
2. Database Access → Add user (save username + password).
3. Network Access → Add IP `0.0.0.0/0` for development (restrict in production).
4. Connect → Drivers → copy URI. Put database name in the path: `/skr_college`.

Example `.env` (never commit this file):

```env
DATABASE_URL="mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/skr_college?retryWrites=true&w=majority"
JWT_SECRET="your-long-secret-at-least-32-chars"
BOOTSTRAP_ADMIN_EMAIL="you@email.com"
BOOTSTRAP_ADMIN_PASSWORD="StrongPassword"
```

URL-encode special characters in the password (`@` → `%40`, `#` → `%23`, etc.).

Then:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open http://localhost:3000
