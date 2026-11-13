// Realtime chapter: Security & Reliability.

export default {
  id: 'security-reliability',
  title: 'Security & Reliability',
  description: 'Auth, origin checks, abuse and heartbeats',
  icon: 'shield',
  lessons: [
    {
      id: 'rt-security',
      title: 'Security',
      blocks: [
        { type: 'text', value: 'A WebSocket is an open connection that can stay for hours. Authenticate at the handshake, verify origin, limit message size and rate, and re-check permissions for every action.' },
        { type: 'list', items: [
          'Use wss:// in production',
          'Verify the Origin header',
          'Authenticate before joining rooms',
          'Limit message size and rate',
          'Validate every payload',
          'Re-authorize sensitive actions',
        ] },
        { type: 'note', value: 'A token valid at connect may expire. Re-check expiry for long-lived connections or close and force a reconnect.' },
      ],
    },
    {
      id: 'rt-reliability',
      title: 'Reliability',
      blocks: [
        { type: 'text', value: 'Connections drop. Use a heartbeat to detect dead sockets, reconnect with backoff, and resume from the last event id. Alert on connection churn and message backlog.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Server: terminate dead sockets
setInterval(() => {
  for (const socket of wss.clients) {
    if (!socket.isAlive) return socket.terminate();
    socket.isAlive = false;
    socket.ping();
  }
}, 30000);

wss.on('connection', (socket) => {
  socket.isAlive = true;
  socket.on('pong', () => { socket.isAlive = true; });
});` },
        { type: 'note', value: 'A heartbeat interval longer than the load balancer idle timeout is useless: the connection is killed before the ping.' },
      ],
    },
    {
      id: 'rt-abuse',
      title: 'Abuse and cost',
      blocks: [
        { type: 'list', items: [
          'Rate limit messages per user and per IP',
          'Cap connections per user',
          'Drop oversized payloads',
          'Authenticate before allocating resources',
          'Monitor fan-out cost for large rooms',
          'Close idle sockets after a timeout',
        ] },
        { type: 'text', value: 'A message broadcast to 100k clients is 100k writes. Large rooms need sampling, batching or a different distribution strategy.' },
        { type: 'note', value: 'Realtime can be expensive. Measure the cost per connected user before scaling a free tier.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'security-reliability',
      q: 'When should you authenticate?',
      options: ['After the first message', 'At the handshake', 'Never', 'After an hour'],
      answer: 1,
      explain: 'Reject before joining rooms.',
    },
    {
      chapterId: 'security-reliability',
      q: 'Why verify the Origin header?',
      options: ['For style', 'To block cross-site socket connections', 'To compress', 'To cache'],
      answer: 1,
      explain: 'Origin checks prevent abuse.',
    },
    {
      chapterId: 'security-reliability',
      q: 'What does a heartbeat detect?',
      options: ['Slow queries', 'Dead connections', 'Disk errors', 'CSS bugs'],
      answer: 1,
      explain: 'Ping/pong finds dead sockets.',
    },
    {
      chapterId: 'security-reliability',
      q: 'Why is fan-out costly?',
      options: ['It is encrypted', 'One message becomes one write per client', 'It uses CSS', 'It stores data'],
      answer: 1,
      explain: 'Large rooms multiply the work.',
    },
  ],
};
