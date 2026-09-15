/* ── Hot & Juicy Podcast service worker ─────────────────────
 * Network-first for pages (fresh content), stale-while-revalidate
 * for assets. Bump CACHE_VERSION whenever shell files change.
 * ────────────────────────────────────────────────────────── */
const CACHE_VERSION = 'hj-v1';

const PRECACHE = [
  '/',
  '/index.html',
  '/about',
  '/contact',
  '/episodes',
  '/blog',
  '/live',
  '/community',
  '/sponsors',
  '/404.html',
  '/css/style.css',
  '/js/main.js',
  '/js/data.js',
  '/manifest.json',
  '/favicon.svg',
  '/images/Logo.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // let fonts/CDN handle themselves

  if (request.mode === 'navigate') {
    // Pages: network first, cache fallback (works offline after first visit)
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('/index.html'))
        )
    );
    return;
  }

  // Assets: stale-while-revalidate
  event.respondWith(
    caches.match(request).then((cached) => {
      const refresh = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || refresh;
    })
  );
});
