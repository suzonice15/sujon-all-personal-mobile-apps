// Realtime chapter: Server.

export default {
  id: 'server',
  title: 'The Server',
  description: 'ws, Socket.IO and message handling',
  icon: 'dns',
  lessons: [
    {
      id: 'rt-server-ws',
      title: 'A WebSocket server',
      blocks: [
        { type: 'text', value: 'The ws library is the minimal Node WebSocket implementation. You handle connections, messages and closes. Socket.IO adds rooms, reconnection and fallbacks on top.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket) => {
  socket.send(JSON.stringify({ type: 'welcome' }));

  socket.on('message', (raw) => {
    const message = JSON.parse(raw.toString());
    // handle message
  });

  socket.on('close', () => {
    // clean up presence
  });
});` },
        { type: 'note', value: 'Parse and validate every message. A socket is an untrusted input like any HTTP request.' },
      ],
    },
    {
      id: 'rt-server-socketio',
      title: 'Socket.IO',
      blocks: [
        { type: 'text', value: 'Socket.IO gives you events, rooms, acknowledgements and automatic reconnection. It is a good default for app features that need those conveniences.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { Server } from 'socket.io';

const io = new Server(httpServer, { cors: { origin: APP_ORIGIN } });

io.on('connection', (socket) => {
  socket.join('course:' + socket.data.courseId);

  socket.on('lesson:complete', async (payload, ack) => {
    await markComplete(payload);
    io.to('course:' + payload.courseId).emit('progress:updated', payload);
    ack({ ok: true });
  });
});` },
        { type: 'note', value: 'Use acknowledgements for actions that need a result. A fire-and-forget message cannot tell the client it failed.' },
      ],
    },
    {
      id: 'rt-server-auth',
      title: 'Authenticating the socket',
      blocks: [
        { type: 'text', value: 'Authenticate during the handshake, not after. Read a token from a cookie or the auth payload, verify it, and attach the user to the socket. Reject unauthorised connections before they join rooms.' },
        { type: 'code', lang: 'js', tryIt: false, value: `io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  const user = verifyToken(token);
  if (!user) return next(new Error('unauthorized'));
  socket.data.user = user;
  next();
});` },
        { type: 'list', items: [
          'Verify the token on connect',
          'Re-check permissions for every action',
          'Do not trust a room name from the client without a check',
          'Rate limit messages per socket',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'server',
      q: 'What does ws provide?',
      options: ['Rooms and reconnection', 'A minimal WebSocket server', 'A database', 'A UI'],
      answer: 1,
      explain: 'ws is the low-level server.',
    },
    {
      chapterId: 'server',
      q: 'What does Socket.IO add?',
      options: ['Only TLS', 'Rooms, events, acks and reconnection', 'A database', 'A CSS framework'],
      answer: 1,
      explain: 'It adds app-level conveniences.',
    },
    {
      chapterId: 'server',
      q: 'When should authentication happen?',
      options: ['After the first message', 'During the handshake', 'Never', 'Only on HTTP routes'],
      answer: 1,
      explain: 'Reject before joining rooms.',
    },
    {
      chapterId: 'server',
      q: 'Why use acknowledgements?',
      options: ['For style', 'So the client knows whether an action succeeded', 'To compress', 'To encrypt'],
      answer: 1,
      explain: 'Acks return a result.',
    },
  ],
};
