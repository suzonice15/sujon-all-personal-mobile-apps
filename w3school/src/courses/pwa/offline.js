// PWA chapter: Offline Strategies.

export default {
  id: 'offline',
  title: 'Offline Strategies',
  description: 'Caching strategies, fallbacks and updates',
  icon: 'cloud-off',
  lessons: [
    {
      id: 'pwa-strategies',
      title: 'Caching strategies',
      blocks: [
        { type: 'text', value: 'Different content needs different freshness. Static assets can be cache-first. API data is often network-first with a cached fallback. Use the strategy per route, not one for everything.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Network-first for API data
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (!url.pathname.startsWith('/api/')) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open('api').then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});` },
        { type: 'note', value: 'Never cache personalized API responses in a shared cache without a key that includes the user.' },
      ],
    },
    {
      id: 'pwa-offline-page',
      title: 'Offline fallbacks',
      blocks: [
        { type: 'text', value: 'When the network fails, show a useful page instead of a browser error. Cache an offline page and serve it for navigation requests that miss.' },
        { type: 'code', lang: 'js', tryIt: false, value: `self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match('/offline.html')
    )
  );
});` },
        { type: 'list', items: [
          'A clear “you are offline” message',
          'Cached content the user can still read',
          'A retry button',
          'Do not block the whole app',
        ] },
      ],
    },
    {
      id: 'pwa-updates',
      title: 'Handling updates',
      blocks: [
        { type: 'text', value: 'When you deploy a new service worker, users may keep the old one. Show a “new version available” prompt, then activate and reload. Version your cache names and delete old ones.' },
        { type: 'code', lang: 'js', tryIt: false, value: `self.addEventListener('activate', (event) => {
  const keep = ['codenest-v2'];
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !keep.includes(k)).map((k) => caches.delete(k)))
    )
  );
});` },
        { type: 'note', value: 'A stale app is a support ticket. Show the update prompt and keep the new cache name in sync with the release.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'offline',
      q: 'Which strategy suits static assets?',
      options: ['Network-first', 'Cache-first', 'No cache', 'Random'],
      answer: 1,
      explain: 'Static assets are cache-first.',
    },
    {
      chapterId: 'offline',
      q: 'Why avoid caching personalized API data in a shared cache?',
      options: ['It is slow', 'It can leak one user data to another', 'It breaks HTTPS', 'It uses disk'],
      answer: 1,
      explain: 'Shared caches must be keyed per user.',
    },
    {
      chapterId: 'offline',
      q: 'What should an offline fallback show?',
      options: ['A blank page', 'A useful message with cached content', 'A stack trace', 'Nothing'],
      answer: 1,
      explain: 'Explain the state and keep what works.',
    },
    {
      chapterId: 'offline',
      q: 'Why version cache names?',
      options: ['For style', 'To delete old caches cleanly on activate', 'To enable HTTPS', 'To compress'],
      answer: 1,
      explain: 'Versioned caches are easy to clean.',
    },
  ],
};
