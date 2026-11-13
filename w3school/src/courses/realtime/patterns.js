// Realtime chapter: Patterns.

export default {
  id: 'patterns',
  title: 'Realtime Patterns',
  description: 'Pub/sub, SSE, polling and offline queues',
  icon: 'view-quilt',
  lessons: [
    {
      id: 'rt-pubsub',
      title: 'Publish and subscribe',
      blocks: [
        { type: 'text', value: 'Pub/sub decouples producers from consumers. The server publishes an event to a topic; interested clients receive it. Topics map naturally to rooms and channels.' },
        { type: 'code', lang: 'text', tryIt: false, value: `event: lesson.completed
topic: course:42
payload: { lessonId: 7, userId: 3 }` },
        { type: 'list', items: [
          'Name events in the past tense',
          'Keep payloads small and stable',
          'Version the event shape when it changes',
          'Consumers must handle unknown fields',
        ] },
        { type: 'note', value: 'Events are a contract. Changing a payload without a version breaks every consumer at once.' },
      ],
    },
    {
      id: 'rt-sse-polling',
      title: 'SSE and polling',
      blocks: [
        { type: 'text', value: 'Server-Sent Events are one-way and reconnect automatically. They are simpler than WebSockets for notifications and feeds. Polling is simplest of all but wastes requests.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const source = new EventSource('/api/events');

source.addEventListener('lesson.completed', (event) => {
  const data = JSON.parse(event.data);
  updateProgress(data);
});

source.onerror = () => {
  // EventSource reconnects automatically
};` },
        { type: 'note', value: 'SSE uses plain HTTP, so it passes proxies and needs no special server. Use it when you only need server-to-client updates.' },
      ],
    },
    {
      id: 'rt-offline-queue',
      title: 'Offline and ordering',
      blocks: [
        { type: 'text', value: 'A mobile client loses the connection often. Queue outgoing messages, reconnect with backoff, and reconcile state on reconnect. Ordering matters for actions like messages and edits.' },
        { type: 'list', items: [
          'Queue sends while offline',
          'Send a sequence number or timestamp',
          'Server deduplicates by message id',
          'Request missed events after reconnect',
          'Show a connection status',
        ] },
        { type: 'note', value: 'Without a resume mechanism, a client that reconnects after five minutes will silently miss updates.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'patterns',
      q: 'What does pub/sub decouple?',
      options: ['Producers from consumers', 'CSS from HTML', 'Users from passwords', 'Servers from disks'],
      answer: 0,
      explain: 'Producers do not know consumers.',
    },
    {
      chapterId: 'patterns',
      q: 'What is SSE good for?',
      options: ['Two-way chat', 'One-way server updates', 'File uploads', 'Payments'],
      answer: 1,
      explain: 'SSE is one-way.',
    },
    {
      chapterId: 'patterns',
      q: 'Why queue messages offline?',
      options: ['For style', 'To send them after reconnect', 'To encrypt', 'To cache images'],
      answer: 1,
      explain: 'Queues prevent lost writes.',
    },
    {
      chapterId: 'patterns',
      q: 'What does the server need to deduplicate?',
      options: ['A colour', 'A message id', 'A password', 'A font'],
      answer: 1,
      explain: 'Ids make retries safe.',
    },
  ],
};
