// PWA chapter: Background Sync.

export default {
  id: 'background-sync',
  title: 'Background Sync',
  description: 'Queue work and retry when the network returns',
  icon: 'sync',
  lessons: [
    {
      id: 'pwa-sync-queue',
      title: 'The outbox pattern',
      blocks: [
        { type: 'text', value: 'When the user submits data offline, store it locally and register a sync. The service worker retries when the network returns. This is an outbox: write locally, send later.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Page: save locally and request a sync
await saveToOutbox({ id, type: 'lesson-complete', payload });

const registration = await navigator.serviceWorker.ready;
await registration.sync.register('sync-progress');` },
        { type: 'note', value: 'Every queued item needs an id so the server can deduplicate a retry.' },
      ],
    },
    {
      id: 'pwa-sync-handler',
      title: 'The sync handler',
      blocks: [
        { type: 'text', value: 'The service worker listens for sync and replays the outbox. On success it removes the item. On failure it throws so the browser retries later.' },
        { type: 'code', lang: 'js', tryIt: false, value: `self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(flushOutbox());
  }
});

async function flushOutbox() {
  const items = await readOutbox();
  for (const item of items) {
    const res = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('retry later');
    await removeFromOutbox(item.id);
  }
}` },
        { type: 'note', value: 'Throwing keeps the sync registered for retry. Swallowing the error silently loses the user’s work.' },
      ],
    },
    {
      id: 'pwa-sync-limits',
      title: 'Limits',
      blocks: [
        { type: 'list', items: [
          'Background Sync is not supported on all browsers',
          'iOS support is limited; fall back to a retry on next open',
          'The browser decides when to retry',
          'Periodic Sync is even less widely supported',
          'Always keep a manual “retry” in the UI',
        ] },
        { type: 'text', value: 'Treat sync as an enhancement. A user who stays in the app should still see a retry button that works.' },
        { type: 'note', value: 'An outbox plus a visible pending state is good UX even without Background Sync.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'background-sync',
      q: 'What is the outbox pattern?',
      options: ['A database backup', 'Write locally and send later', 'A cache strategy', 'A push service'],
      answer: 1,
      explain: 'Queue work for retry.',
    },
    {
      chapterId: 'background-sync',
      q: 'What must each queued item have?',
      options: ['A colour', 'A unique id for deduplication', 'A password', 'A font'],
      answer: 1,
      explain: 'Ids make retries safe.',
    },
    {
      chapterId: 'background-sync',
      q: 'What should the sync handler do on failure?',
      options: ['Delete the item', 'Throw so the browser retries', 'Ignore it', 'Crash'],
      answer: 1,
      explain: 'Throwing keeps the retry alive.',
    },
    {
      chapterId: 'background-sync',
      q: 'Why keep a manual retry?',
      options: ['For style', 'Background Sync is not universally supported', 'It is required', 'To skip tests'],
      answer: 1,
      explain: 'Provide a fallback path.',
    },
  ],
};
