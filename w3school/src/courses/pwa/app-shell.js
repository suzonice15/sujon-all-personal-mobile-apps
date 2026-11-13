// PWA chapter: App Shell & Performance.

export default {
  id: 'app-shell',
  title: 'App Shell & Performance',
  description: 'Fast first paint and a shell that feels native',
  icon: 'speed',
  lessons: [
    {
      id: 'pwa-app-shell',
      title: 'The app shell',
      blocks: [
        { type: 'text', value: 'The app shell is the minimal HTML, CSS and JavaScript needed to render the frame: header, navigation and a loading state. Cache it so the app opens instantly, then fill content from the network.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<body>
  <header class="app-bar">CodeNest</header>
  <main id="app">
    <div class="skeleton">Loading…</div>
  </main>
</body>` },
        { type: 'note', value: 'The shell should not include user-specific data. Cache one shell for everyone and hydrate the content.' },
      ],
    },
    {
      id: 'pwa-performance',
      title: 'Performance',
      blocks: [
        { type: 'list', items: [
          'Precache the shell and critical CSS',
          'Lazy load routes and images',
          'Compress and serve modern image formats',
          'Use font-display swap',
          'Measure with Lighthouse on a slow network',
          'Keep the main-thread work small',
        ] },
        { type: 'text', value: 'A PWA that loads slowly is worse than a normal site, because users installed it expecting an app.' },
        { type: 'note', value: 'Test on a mid-range Android phone on 3G, not only on a fast desktop.' },
      ],
    },
    {
      id: 'pwa-native-feel',
      title: 'Native feel',
      blocks: [
        { type: 'list', items: [
          'Standalone display mode, no browser chrome',
          'Smooth transitions and skeleton screens',
          'Respect safe-area insets on notched phones',
          'Touch targets at least 44px',
          'Keep scroll position and state',
          'Handle back navigation',
        ] },
        { type: 'text', value: 'The install is a promise of an app-like experience. Broken back navigation or a flash of white breaks that promise.' },
        { type: 'note', value: 'Test the installed app, not only the browser tab. They behave differently.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'app-shell',
      q: 'What is the app shell?',
      options: ['The whole app', 'The cached frame: header, nav and loading state', 'A database', 'A server'],
      answer: 1,
      explain: 'It gives an instant first paint.',
    },
    {
      chapterId: 'app-shell',
      q: 'Should the shell contain user data?',
      options: ['Yes', 'No, keep it shared', 'Only emails', 'Only photos'],
      answer: 1,
      explain: 'User data must not be cached in a shared shell.',
    },
    {
      chapterId: 'app-shell',
      q: 'What device should you test on?',
      options: ['A fast desktop only', 'A mid-range phone on a slow network', 'A server', 'A simulator only'],
      answer: 1,
      explain: 'Real devices reveal real performance.',
    },
    {
      chapterId: 'app-shell',
      q: 'Why respect safe-area insets?',
      options: ['For style', 'So content is not hidden by notches or system bars', 'To enable HTTPS', 'To cache'],
      answer: 1,
      explain: 'Insets keep content visible.',
    },
  ],
};
