/* SKR College PWA service worker — v4 force-update */
const CACHE = "skr-app-v4";
const PRECACHE = ["/", "/manifest.json", "/icons/icon-192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE))
  );
  // Do NOT skipWaiting here — wait for user to tap Update
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const path = url.pathname;
  const noCache =
    path.startsWith("/api/") ||
    path.startsWith("/admin") ||
    path.startsWith("/teacher") ||
    path.startsWith("/student") ||
    path.startsWith("/parent") ||
    path.startsWith("/login") ||
    req.mode === "navigate";

  if (noCache) {
    event.respondWith(
      fetch(req, { credentials: "same-origin", cache: "no-store" }).catch(async () => {
        if (req.mode === "navigate" && !path.startsWith("/login") && !path.startsWith("/api/")) {
          const cached = await caches.match("/");
          if (cached) return cached;
        }
        return new Response("Offline", { status: 503, statusText: "Offline" });
      })
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      if (cached) return cached;
      try {
        const res = await fetch(req);
        if (
          res &&
          res.ok &&
          (path.startsWith("/icons") ||
            path.startsWith("/_next/static") ||
            path.match(/\.(png|jpg|jpeg|webp|svg|css|js|woff2?)$/))
        ) {
          cache.put(req, res.clone());
        }
        return res;
      } catch {
        return cached || new Response("Offline", { status: 503 });
      }
    })
  );
});
