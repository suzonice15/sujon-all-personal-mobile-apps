// PWA chapter: Service Workers.

export default {
  id: 'service-workers',
  title: 'Service Workers',
  description: 'Lifecycle, caching and intercepting requests',
  icon: 'sync',
  lessons: [
    {
      id: 'pwa-sw-lifecycle',
      title: 'The lifecycle',
      blocks: [
        { type: 'text', value: 'A service worker is a background script. It installs, waits to activate, then controls pages. It can be replaced only after the old one releases control, which is why updates need care.' },
        { type: 'list', items: [
          'install: precache the app shell',
          'activate: clean old caches and claim clients',
          'fetch: intercept network requests',
          'skipWaiting: activate a new worker immediately',
          'clients.claim: control open pages',
        ] },
        { type: 'note', value: 'A new service worker does not take over open tabs automatically. Plan the update UX so users do not run an old version for days.' },
      ],
    },
    {
      id: 'pwa-sw-register',
      title: 'Register and cache',
      blocks: [
        { type: 'code', lang: 'js', tryIt: false, value: `// main.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

// sw.js
const CACHE = 'codenest-v1';
const ASSETS = ['/', '/index.html', '/app.css', '/app.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
});` },
        { type: 'note', value: 'Precache only the app shell. Caching every asset on install delays activation and wastes bandwidth.' },
      ],
    },
    {
      id: 'pwa-sw-fetch',
      title: 'Intercepting fetch',
      blocks: [
        { type: 'text', value: 'The fetch handler decides how each request is answered: from cache, from network, or a mix. The strategy depends on the asset.' },
        { type: 'code', lang: 'js', tryIt: false, value: `self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});` },
        { type: 'list', items: [
          'Cache-first: static assets',
          'Network-first: fresh data with a cache fallback',
          'Stale-while-revalidate: fast and fresh eventually',
          'Never cache non-GET requests',
          'Skip cross-origin or analytics requests',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'service-workers',
      q: 'What is a service worker?',
      options: ['A UI component', 'A background script that intercepts requests', 'A database', 'A build tool'],
      answer: 1,
      explain: 'It runs outside the page and handles fetch.',
    },
    {
      chapterId: 'service-workers',
      q: 'What does skipWaiting do?',
      options: ['Deletes the cache', 'Activates a new worker immediately', 'Stops the server', 'Clears storage'],
      answer: 1,
      explain: 'It skips the waiting phase.',
    },
    {
      chapterId: 'service-workers',
      q: 'Which requests should you cache?',
      options: ['POST requests', 'GET requests for app assets', 'All requests', 'Payments'],
      answer: 1,
      explain: 'Static GET assets are safe to cache.',
    },
    {
      chapterId: 'service-workers',
      q: 'What is cache-first good for?',
      options: ['Live data', 'Static assets that rarely change', 'Authentication', 'Payments'],
      answer: 1,
      explain: 'Static assets match cache-first.',
    },
  ],
};
