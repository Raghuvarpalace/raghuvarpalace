// Minimal service worker — its only job is to satisfy browser install
// criteria (a registered service worker with a fetch handler). It does
// a plain network passthrough, so it never interferes with data
// freshness, caching, or the Supabase-backed content on this site.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
