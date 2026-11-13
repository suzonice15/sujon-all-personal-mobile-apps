// PWA interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is a PWA?',
      a: 'A website that can be installed and work offline using HTTPS, a manifest and a service worker.',
      level: 'basic',
    },
    {
      q: 'What are the three building blocks?',
      a: 'HTTPS, the web app manifest and a service worker.',
      level: 'basic',
    },
    {
      q: 'Why is HTTPS required?',
      a: 'Service workers and install require a secure context.',
      level: 'basic',
    },
    {
      q: 'When is a PWA a poor fit?',
      a: 'When the product needs deep native APIs such as Bluetooth or background location.',
      level: 'intermediate',
    },
  ],
  manifest: [
    {
      q: 'What does the manifest define?',
      a: 'Name, short name, icons, colours, start URL and display mode.',
      level: 'basic',
    },
    {
      q: 'Which icon sizes are required?',
      a: 'At least 192 and 512 pixels, with maskable variants for Android.',
      level: 'basic',
    },
    {
      q: 'What does beforeinstallprompt allow?',
      a: 'Capturing the browser prompt so you can show your own install button at the right time.',
      level: 'intermediate',
    },
    {
      q: 'How do iOS users install?',
      a: 'Through Share, then Add to Home Screen. There is no beforeinstallprompt event.',
      level: 'basic',
    },
  ],
  'service-workers': [
    {
      q: 'What is a service worker?',
      a: 'A background script that intercepts network requests and can serve from cache.',
      level: 'basic',
    },
    {
      q: 'What are the lifecycle phases?',
      a: 'Install, waiting, activate and fetch, with skipWaiting and clients.claim to take control.',
      level: 'intermediate',
    },
    {
      q: 'Why not cache every asset on install?',
      a: 'It delays activation and wastes bandwidth. Precache only the shell and critical assets.',
      level: 'intermediate',
    },
    {
      q: 'Which requests must not be cached?',
      a: 'Non-GET requests such as POST and authenticated mutation calls.',
      level: 'basic',
    },
  ],
  offline: [
    {
      q: 'Cache-first versus network-first?',
      a: 'Cache-first is instant but can be stale. Network-first is fresh but slower when offline.',
      level: 'basic',
    },
    {
      q: 'Why not cache personalized API data in a shared cache?',
      a: 'It can leak one user data to another. Key the cache per user or avoid caching it.',
      level: 'intermediate',
    },
    {
      q: 'What should an offline page do?',
      a: 'Explain the state, show cached content and offer a retry.',
      level: 'basic',
    },
    {
      q: 'How do you handle a service worker update?',
      a: 'Version the cache, prompt the user, activate the new worker and reload.',
      level: 'intermediate',
    },
  ],
  'push-notifications': [
    {
      q: 'When should you ask for notification permission?',
      a: 'After a clear user action, not on first load.',
      level: 'basic',
    },
    {
      q: 'Which VAPID key stays on the server?',
      a: 'The private key. The public key is sent to the browser for the subscription.',
      level: 'intermediate',
    },
    {
      q: 'Which event shows the notification?',
      a: 'The push event in the service worker, via showNotification.',
      level: 'basic',
    },
    {
      q: 'Why remove dead push subscriptions?',
      a: 'Endpoints expire. Sending to them wastes work and can hurt delivery metrics.',
      level: 'intermediate',
    },
  ],
  'background-sync': [
    {
      q: 'What is the outbox pattern?',
      a: 'Save work locally, then send it when the network returns.',
      level: 'basic',
    },
    {
      q: 'Why does each queued item need an id?',
      a: 'So a retry can be deduplicated on the server.',
      level: 'intermediate',
    },
    {
      q: 'What should the sync handler do on failure?',
      a: 'Throw, so the browser keeps the sync registered and retries later.',
      level: 'intermediate',
    },
    {
      q: 'Why keep a manual retry?',
      a: 'Background Sync is not supported everywhere, especially on iOS.',
      level: 'basic',
    },
  ],
  'app-shell': [
    {
      q: 'What is the app shell?',
      a: 'The minimal cached HTML, CSS and JS that renders the frame and a loading state.',
      level: 'basic',
    },
    {
      q: 'Should the shell include user data?',
      a: 'No. Keep one shared shell and hydrate user content.',
      level: 'basic',
    },
    {
      q: 'Why test on a mid-range phone?',
      a: 'Desktop performance hides the real mobile experience.',
      level: 'basic',
    },
    {
      q: 'How do you keep a native feel?',
      a: 'Standalone display, smooth transitions, safe-area insets, large tap targets and working back navigation.',
      level: 'intermediate',
    },
  ],
  'testing-lighthouse': [
    {
      q: 'What does Lighthouse audit?',
      a: 'Performance, accessibility, best practices, SEO and PWA installability.',
      level: 'basic',
    },
    {
      q: 'Why can install be unavailable?',
      a: 'Missing manifest fields, missing icons, no service worker, or no HTTPS.',
      level: 'intermediate',
    },
    {
      q: 'How do you simulate offline?',
      a: 'Use the DevTools Network tab offline mode, or stop the server.',
      level: 'basic',
    },
    {
      q: 'What causes many PWA bugs?',
      a: 'A stale service worker or cache. Unregister and clear storage to test cleanly.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you turn an app into a PWA?',
      a: 'Add a manifest with icons, register a service worker, cache the shell, add an offline page and an install button.',
      level: 'intermediate',
    },
    {
      q: 'What should you precache?',
      a: 'The app shell and critical assets, not every image or user-specific response.',
      level: 'basic',
    },
    {
      q: 'How do you verify a PWA?',
      a: 'Install it on a real phone, test offline, check the update flow and run Lighthouse.',
      level: 'intermediate',
    },
    {
      q: 'What is the best first PWA step?',
      a: 'A manifest and a basic service worker that caches the shell.',
      level: 'basic',
    },
  ],
};
