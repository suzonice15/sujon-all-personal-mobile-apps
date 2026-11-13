// Realtime chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'When realtime is needed and how it works',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'rt-what-is',
      title: 'What is realtime?',
      blocks: [
        { type: 'text', value: 'Realtime means the server pushes updates to clients instead of waiting for a request. Chat, notifications, live dashboards and collaborative editing all need it.' },
        { type: 'list', items: [
          'Push instead of poll',
          'Low latency updates',
          'One connection carries many messages',
          'Server can broadcast to many clients',
          'Needs reconnect and ordering logic',
        ] },
        { type: 'note', value: 'Realtime adds state and failure modes. Use it only where freshness genuinely helps; a dashboard refreshed every 30 seconds may not need a socket.' },
      ],
    },
    {
      id: 'rt-options',
      title: 'The options',
      blocks: [
        { type: 'list', items: [
          'Polling: ask every N seconds, simple but wasteful',
          'Long polling: hold a request until data is ready',
          'Server-Sent Events: one-way server to client',
          'WebSocket: full duplex, the common choice',
          'WebRTC: peer to peer for audio, video and data',
        ] },
        { type: 'text', value: 'Choose the simplest option that meets the latency requirement. SSE is often enough for notifications; WebSockets fit chat and collaboration.' },
        { type: 'note', value: 'A WebSocket is not automatically faster than polling for rare events. It is faster when events are frequent and small.' },
      ],
    },
    {
      id: 'rt-anatomy',
      title: 'Anatomy of a live feature',
      blocks: [
        { type: 'code', lang: 'text', tryIt: false, value: `client --connect--> server
client --message--> server
server --broadcast--> all clients in room
client --reconnect--> server (after a drop)` },
        { type: 'list', items: [
          'Authentication before or during the handshake',
          'Rooms or topics to scope messages',
          'Heartbeat to detect dead connections',
          'Reconnect with backoff',
          'Message ids for ordering and deduplication',
        ] },
        { type: 'note', value: 'Design for disconnects from day one. Mobile networks drop constantly, and a client that never reconnects feels broken.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does realtime mean?',
      options: ['Fast page loads', 'The server pushes updates to clients', 'A database', 'A CSS feature'],
      answer: 1,
      explain: 'Updates arrive without polling.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which is one-way server to client?',
      options: ['WebSocket', 'SSE', 'WebRTC', 'HTTP/2 push only'],
      answer: 1,
      explain: 'SSE is one-way.',
    },
    {
      chapterId: 'getting-started',
      q: 'When is polling enough?',
      options: ['For chat', 'For rare, non-urgent updates', 'For games', 'For collaboration'],
      answer: 1,
      explain: 'Rare updates do not need a socket.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why design for disconnects?',
      options: ['For style', 'Mobile networks drop connections', 'It is required', 'To save memory'],
      answer: 1,
      explain: 'Reconnect logic is essential.',
    },
  ],
};
