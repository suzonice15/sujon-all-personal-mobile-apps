// Realtime chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a live progress feed and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'rt-project-feed',
      title: 'Project: a live progress feed',
      blocks: [
        { type: 'text', value: 'Build a small app where completing a lesson broadcasts an update to everyone in that course room. Add presence, a reconnect banner and a heartbeat. Then run two server instances behind a load balancer with Redis.' },
        { type: 'code', lang: 'text', tryIt: false, value: `POST /api/lessons/:id/complete  (HTTP write)
  -> publish lesson.completed
  -> fan out to room course:<id>
  -> clients update the progress bar

GET /ws  (WebSocket, auth + join room)` },
        { type: 'list', items: [
          'Authenticate at the handshake',
          'Check access before joining a room',
          'Heartbeat and reconnect with backoff',
          'Redis adapter for multiple instances',
          'Presence with an expiry',
          'Rate limit messages',
        ] },
        { type: 'note', value: 'A realtime feature that survives a deploy, a dropped connection and a second server is a strong portfolio piece.' },
      ],
    },
    {
      id: 'rt-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'WebSocket versus SSE versus polling?',
          'How does the WebSocket handshake work?',
          'How do you authenticate a socket?',
          'How do you scale WebSockets across servers?',
          'What is a room and who can join?',
          'How do you detect a dead connection?',
          'How do you handle reconnect and missed events?',
          'How do you prevent message abuse?',
        ] },
        { type: 'text', value: 'Strong answers name the mechanism and the cost. “A broadcast to 10k sockets is 10k writes; large rooms need batching or sampling” is a complete answer.' },
        { type: 'note', value: 'Be ready to draw the flow from an HTTP write to a socket broadcast and explain the adapter.' },
      ],
    },
    {
      id: 'rt-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: realtime options and the WebSocket handshake',
          'Week 2: server with ws and Socket.IO',
          'Week 3: client, reconnect and cleanup',
          'Week 4: rooms, presence and typing',
          'Week 5: Redis adapter and scaling',
          'Week 6: SSE, polling and offline queues',
          'Week 7: security and reliability',
          'Week 8: build and load-test one live feature',
        ] },
        { type: 'note', value: 'Test with two browsers on different networks. Reconnect bugs only appear when the network actually drops.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What publishes the event in a live feature?',
      options: ['The client only', 'The server after the HTTP write succeeds', 'The database', 'The CDN'],
      answer: 1,
      explain: 'The server publishes after the write.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is needed for multiple realtime servers?',
      options: ['A bigger disk', 'A shared adapter such as Redis pub/sub', 'A new logo', 'A CSS reset'],
      answer: 1,
      explain: 'The adapter fans out across instances.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you test reconnect?',
      options: ['Read the docs', 'Drop the network and watch the client recover', 'Restart the laptop', 'Clear cookies'],
      answer: 1,
      explain: 'Real disconnects reveal bugs.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a realtime portfolio project strong?',
      options: ['A demo that only works on localhost', 'Auth, rooms, reconnect and multi-instance support', 'A copied tutorial', 'No heartbeat'],
      answer: 1,
      explain: 'Robustness is the differentiator.',
    },
  ],
};
