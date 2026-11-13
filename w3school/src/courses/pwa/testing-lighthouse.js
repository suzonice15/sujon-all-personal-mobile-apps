// PWA chapter: Testing & Lighthouse.

export default {
  id: 'testing-lighthouse',
  title: 'Testing & Lighthouse',
  description: 'Audits, installability checks and debugging',
  icon: 'fact-check',
  lessons: [
    {
      id: 'pwa-lighthouse',
      title: 'Lighthouse audits',
      blocks: [
        { type: 'text', value: 'Lighthouse checks performance, accessibility, best practices, SEO and PWA installability. Run it on the production build, on mobile settings, and fix the biggest item first.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `npx lighthouse https://codenest.app \\
  --preset=desktop --view

# In Chrome DevTools: Lighthouse tab -> Analyze` },
        { type: 'note', value: 'A score is a guide, not a goal. A 100 with a broken install flow is still a broken PWA.' },
      ],
    },
    {
      id: 'pwa-install-check',
      title: 'Installability checklist',
      blocks: [
        { type: 'list', items: [
          'HTTPS in production',
          'Manifest with name, icons and start_url',
          'Service worker with a fetch handler',
          'Icons at 192 and 512',
          'Display set to standalone or minimal-ui',
          'Works with the network disabled',
        ] },
        { type: 'text', value: 'Chrome DevTools Application tab shows the manifest, service worker status and cache contents. Use it to see exactly why install is unavailable.' },
        { type: 'note', value: 'Unregister the service worker during debugging. A stale worker can hide the change you just made.' },
      ],
    },
    {
      id: 'pwa-debug',
      title: 'Debugging',
      blocks: [
        { type: 'list', items: [
          'Application -> Service Workers: update, unregister',
          'Application -> Cache Storage: inspect entries',
          'Network tab: check “Offline” to test',
          'Console: registration and fetch errors',
          'Clear storage after cache changes',
        ] },
        { type: 'text', value: 'Most PWA bugs are a stale cache or a service worker controlling an old page. Clear storage and reload before chasing a phantom bug.' },
        { type: 'note', value: 'Test with the network offline, then online again. The transition is where bugs appear.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'testing-lighthouse',
      q: 'What does Lighthouse check?',
      options: ['Only speed', 'Performance, accessibility, best practices, SEO and PWA', 'Only CSS', 'Only fonts'],
      answer: 1,
      explain: 'It audits several categories.',
    },
    {
      chapterId: 'testing-lighthouse',
      q: 'Which icon sizes are needed to install?',
      options: ['16 and 32', '192 and 512', '1024', 'Any'],
      answer: 1,
      explain: '192 and 512 are required.',
    },
    {
      chapterId: 'testing-lighthouse',
      q: 'How do you test offline?',
      options: ['Turn off the server', 'Use the Network tab offline mode', 'Delete the cache', 'Use another browser'],
      answer: 1,
      explain: 'DevTools can simulate offline.',
    },
    {
      chapterId: 'testing-lighthouse',
      q: 'What causes many PWA bugs?',
      options: ['CSS', 'A stale service worker or cache', 'The logo', 'The font'],
      answer: 1,
      explain: 'Clear storage and reload.',
    },
  ],
};
