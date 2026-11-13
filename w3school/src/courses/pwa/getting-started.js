// PWA chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What a PWA is and the three building blocks',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'pwa-what-is',
      title: 'What is a PWA?',
      blocks: [
        { type: 'text', value: 'A Progressive Web App is a website that can be installed on a device and work offline. It uses standard web technology: a manifest, a service worker and HTTPS. There is no app store required.' },
        { type: 'list', items: [
          'Installable to the home screen',
          'Works offline or on a poor network',
          'Loads fast with a cached app shell',
          'Can receive push notifications',
          'One codebase for web and mobile',
        ] },
        { type: 'note', value: 'A PWA is not a native app. It has limited access to device APIs, but for many products the install and offline experience is enough.' },
      ],
    },
    {
      id: 'pwa-three-parts',
      title: 'The three building blocks',
      blocks: [
        { type: 'list', items: [
          'HTTPS: required for service workers and install',
          'Manifest: name, icons, colours, display mode',
          'Service worker: a script that intercepts network requests',
        ] },
        { type: 'code', lang: 'text', tryIt: false, value: `index.html + manifest.webmanifest + sw.js
     |              |                  |
   UI          install info       offline cache` },
        { type: 'note', value: 'Without HTTPS, the service worker will not register except on localhost. That is a security rule, not a bug.' },
      ],
    },
    {
      id: 'pwa-when',
      title: 'When to use a PWA',
      blocks: [
        { type: 'text', value: 'A PWA fits content sites, dashboards, booking tools and internal apps. It is a poor fit when you need deep native APIs such as Bluetooth, advanced camera control or background location.' },
        { type: 'list', items: [
          'Good: offline reading, forms, dashboards, catalogs',
          'Good: one codebase for web and mobile',
          'Poor: heavy 3D games, deep hardware access',
          'Poor: strict app-store-only distribution',
          'Check install and offline needs first',
        ] },
        { type: 'note', value: 'Do not build a PWA only to avoid the app store. Build it when install and offline genuinely help users.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What are the three PWA building blocks?',
      options: ['HTML, CSS, JS', 'HTTPS, manifest and service worker', 'React, Vue, Angular', 'Docker, Nginx, Node'],
      answer: 1,
      explain: 'Those three enable install and offline.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why is HTTPS required?',
      options: ['For speed', 'Service workers and install need a secure context', 'For SEO', 'For fonts'],
      answer: 1,
      explain: 'A secure context is required.',
    },
    {
      chapterId: 'getting-started',
      q: 'When is a PWA a poor fit?',
      options: ['For a catalog', 'When deep native APIs are needed', 'For a dashboard', 'For offline reading'],
      answer: 1,
      explain: 'Some hardware APIs are not available.',
    },
    {
      chapterId: 'getting-started',
      q: 'Does a PWA need an app store?',
      options: ['Yes', 'No, it installs from the browser', 'Only on iOS', 'Only on Android'],
      answer: 1,
      explain: 'The browser handles install.',
    },
  ],
};
