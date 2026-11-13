// Realtime chapter: Presence & Rooms.

export default {
  id: 'presence-rooms',
  title: 'Presence & Rooms',
  description: 'Who is online, typed indicators and rooms',
  icon: 'groups',
  lessons: [
    {
      id: 'rt-rooms',
      title: 'Rooms',
      blocks: [
        { type: 'text', value: 'A room is a logical group of sockets. Broadcast to a room instead of every client. In Socket.IO, join and leave manage membership and the adapter handles multi-server delivery.' },
        { type: 'code', lang: 'js', tryIt: false, value: `socket.on('course:join', async ({ courseId }) => {
  if (!(await canAccess(socket.data.user, courseId))) {
    return socket.emit('error', { code: 'FORBIDDEN' });
  }
  socket.join('course:' + courseId);
});

io.to('course:1').emit('course:updated', { id: 1 });` },
        { type: 'note', value: 'Check access before joining a room. A room name from the client is untrusted input.' },
      ],
    },
    {
      id: 'rt-presence',
      title: 'Presence',
      blocks: [
        { type: 'text', value: 'Presence tracks who is online. Keep a count per room in Redis with an expiry, so a server crash does not leave ghost users. Broadcast joins and leaves.' },
        { type: 'code', lang: 'js', tryIt: false, value: `await redis.sadd('room:1:users', userId);
await redis.expire('room:1:users', 3600);

io.to('room:1').emit('presence', {
  userId,
  online: await redis.scard('room:1:users'),
});` },
        { type: 'list', items: [
          'Track users, not sockets, for the count',
          'Remove on disconnect and timeout',
          'Debounce rapid join and leave events',
          'Never expose private user data in presence',
        ] },
      ],
    },
    {
      id: 'rt-typing',
      title: 'Typing indicators',
      blocks: [
        { type: 'text', value: 'Typing indicators are high-frequency, low-value messages. Throttle them, send only the state change, and expire them after a few seconds.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Client: at most once per second
if (now - lastSent > 1000) {
  socket.emit('typing', { roomId });
  lastSent = now;
}

// Server: broadcast to others, auto-expire
socket.to('room:' + roomId).emit('typing', { userId });
setTimeout(() => socket.to('room:' + roomId).emit('typing:stop', { userId }), 3000);` },
        { type: 'note', value: 'A typing event per keystroke will melt the server. Throttle on the client and expire on the server.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'presence-rooms',
      q: 'What is a room?',
      options: ['A database table', 'A logical group of sockets for broadcast', 'A server', 'A token'],
      answer: 1,
      explain: 'Rooms scope messages.',
    },
    {
      chapterId: 'presence-rooms',
      q: 'What must happen before joining a room?',
      options: ['Nothing', 'Check access for the user', 'Encrypt the message', 'Clear the cache'],
      answer: 1,
      explain: 'Room names are untrusted input.',
    },
    {
      chapterId: 'presence-rooms',
      q: 'Why expire presence keys?',
      options: ['For style', 'To avoid ghost users after a crash', 'To save disk', 'To enable TLS'],
      answer: 1,
      explain: 'Expiry cleans stale presence.',
    },
    {
      chapterId: 'presence-rooms',
      q: 'How should typing indicators be sent?',
      options: ['On every keystroke', 'Throttled and expired', 'Never', 'Once a day'],
      answer: 1,
      explain: 'Throttle high-frequency events.',
    },
  ],
};
