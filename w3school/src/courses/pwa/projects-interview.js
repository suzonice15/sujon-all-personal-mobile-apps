// PWA chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Turn an app into an installable PWA',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'pwa-project-app',
      title: 'Project: make an app installable',
      blocks: [
        { type: 'text', value: 'Take a small web app and make it a PWA: add a manifest, register a service worker, cache the shell, add an offline page and an install button. Then run Lighthouse and fix the top issue.' },
        { type: 'list', items: [
          'Manifest with 192 and 512 icons',
          'Service worker precaching the shell',
          'Network-first API with a cache fallback',
          'Offline page for navigation',
          'Install button after first value',
          'Lighthouse PWA checks passing',
        ] },
        { type: 'note', value: 'A PWA you can install, use offline and update cleanly is a strong portfolio piece.' },
      ],
    },
    {
      id: 'pwa-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What are the three PWA building blocks?',
          'How does a service worker lifecycle work?',
          'Cache-first versus network-first?',
          'How do you handle a service worker update?',
          'How do push notifications work?',
          'What is the app shell?',
          'How do you test offline behavior?',
          'When is a PWA a bad choice?',
        ] },
        { type: 'text', value: 'Strong answers name the mechanism and the trade-off. “Cache-first serves instantly but can be stale; network-first is fresh but slower offline” is a complete answer.' },
        { type: 'note', value: 'Be ready to read a manifest and a service worker and spot the install or caching bug.' },
      ],
    },
    {
      id: 'pwa-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: PWA concepts and HTTPS',
          'Week 2: manifest and install',
          'Week 3: service worker lifecycle and caching',
          'Week 4: offline strategies and fallbacks',
          'Week 5: push notifications',
          'Week 6: background sync',
          'Week 7: app shell and performance',
          'Week 8: Lighthouse and real-device testing',
        ] },
        { type: 'note', value: 'Test the installed app on a real phone. The browser tab hides most PWA issues.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What should be precached?',
      options: ['Every image', 'The app shell and critical assets', 'User data', 'API tokens'],
      answer: 1,
      explain: 'Precache the shared shell.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you test an update?',
      options: ['Ignore it', 'Deploy, prompt the user, activate and reload', 'Delete the app', 'Clear the database'],
      answer: 1,
      explain: 'Handle the update prompt.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a PWA portfolio strong?',
      options: ['A manifest only', 'Installable, offline-capable and tested on a phone', 'A copied template', 'No service worker'],
      answer: 1,
      explain: 'A complete, tested PWA shows skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first PWA step?',
      options: ['Push notifications', 'Manifest plus a basic service worker', 'Background sync', 'App shell rewrite'],
      answer: 1,
      explain: 'Start with install and offline basics.',
    },
  ],
};
