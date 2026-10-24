# Windows and Android packages

This repository is the single backend (Next.js on Vercel + MongoDB). The website is also a PWA (`public/manifest.json`).

## What is actually built
- Web app and installable PWA: https://skr-inter-college.vercel.app/
- Source of this repo.

## What is not generated in CI
A signed Windows `.exe` and a signed Android `.apk` are not produced by the Vercel build. They must wrap this same site and must not embed database credentials.

### Windows (Electron)
```bash
npm install --save-dev electron electron-builder
```
Point Electron `loadURL` at the production site. Do not bundle `DATABASE_URL` or `JWT_SECRET` into the installer.

### Android (Capacitor)
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "SKR Inter College" com.skrcollege.portal --web-dir public
npx cap add android
```
Set `server.url` to `https://skr-inter-college.vercel.app` so the app uses the same API and database. Signing requires your own keystore; this environment does not hold one.

Private marks, fees and documents must stay behind login. Do not cache authenticated API responses in a service worker.
