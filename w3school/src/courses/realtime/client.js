// Realtime chapter: Client.

export default {
  id: 'client',
  title: 'The Client',
  description: 'Connect, send, reconnect and clean up',
  icon: 'devices',
  lessons: [
    {
      id: 'rt-client-browser',
      title: 'The browser WebSocket',
      blocks: [
        { type: 'text', value: 'The browser WebSocket API is small: create, listen, send, close. It does not reconnect or retry for you, so production code wraps it.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const socket = new WebSocket('wss://api.example.com/ws');

socket.addEventListener('open', () => {
  socket.send(JSON.stringify({ type: 'subscribe', room: 'course:1' }));
});

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  handle(message);
});

socket.addEventListener('close', () => scheduleReconnect());` },
        { type: 'note', value: 'Always handle onerror and onclose. A socket that fails silently leaves the UI frozen on old data.' },
      ],
    },
    {
      id: 'rt-reconnect',
      title: 'Reconnect with backoff',
      blocks: [
        { type: 'text', value: 'Reconnect with exponential backoff and jitter. Reset the delay after a successful connection. If the server supports resume, send the last message id after reconnecting.' },
        { type: 'code', lang: 'js', tryIt: false, value: `let attempt = 0;

function scheduleReconnect() {
  attempt += 1;
  const delay = Math.min(30000, 2 ** attempt * 500) + Math.random() * 300;
  setTimeout(connect, delay);
}

function connect() {
  const socket = new WebSocket(URL);
  socket.addEventListener('open', () => { attempt = 0; });
  // ...
}` },
        { type: 'note', value: 'Without jitter, every client reconnects at the same moment after a deploy and stampedes the server.' },
      ],
    },
    {
      id: 'rt-cleanup',
      title: 'React and cleanup',
      blocks: [
        { type: 'text', value: 'In React, create the socket in an effect and close it in the cleanup. Avoid reconnecting on every render. Keep the connection in a ref or a module-level singleton.' },
        { type: 'code', lang: 'js', tryIt: false, value: `useEffect(() => {
  const socket = new WebSocket(URL);
  socketRef.current = socket;

  socket.addEventListener('message', onMessage);

  return () => {
    socket.removeEventListener('message', onMessage);
    socket.close();
  };
}, []);` },
        { type: 'list', items: [
          'One connection per tab, not per component',
          'Close on unmount',
          'Remove listeners to avoid leaks',
          'Show a connection status in the UI',
          'Queue messages while disconnected',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'client',
      q: 'Does the browser WebSocket reconnect automatically?',
      options: ['Yes', 'No, you must implement it', 'Only on mobile', 'Only on HTTPS'],
      answer: 1,
      explain: 'Reconnect is your responsibility.',
    },
    {
      chapterId: 'client',
      q: 'Why add jitter to reconnect delays?',
      options: ['For style', 'To avoid all clients reconnecting at once', 'To encrypt', 'To cache'],
      answer: 1,
      explain: 'Jitter spreads the load.',
    },
    {
      chapterId: 'client',
      q: 'How many connections per tab?',
      options: ['One per component', 'One', 'One per message', 'Ten'],
      answer: 1,
      explain: 'Share one connection.',
    },
    {
      chapterId: 'client',
      q: 'What must you do on unmount?',
      options: ['Nothing', 'Close the socket and remove listeners', 'Restart the app', 'Clear the database'],
      answer: 1,
      explain: 'Cleanup prevents leaks.',
    },
  ],
};
