// Last Call Invitational — Service Worker v5.4
// FORCE CLEAR - replaces all previous caches
const CACHE = 'lci-v5.4-force';
const ASSETS = [
  '/last-call-invitational/',
  '/last-call-invitational/index.html',
  '/last-call-invitational/manifest.json'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))  // delete ALL caches
    ).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  // Network first — always try to get fresh content
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
