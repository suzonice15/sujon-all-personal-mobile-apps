// Realtime chapter: The WebSocket Protocol.

export default {
  id: 'protocol',
  title: 'WebSocket Protocol',
  description: 'Handshake, frames, ping and close codes',
  icon: 'swap-horiz',
  lessons: [
    {
      id: 'rt-handshake',
      title: 'The handshake',
      blocks: [
        { type: 'text', value: 'A WebSocket starts as an HTTP request with an Upgrade header. If the server agrees, the connection switches to a persistent, full-duplex channel.' },
        { type: 'code', lang: 'text', tryIt: false, value: `GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: <random>
Sec-WebSocket-Version: 13

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade` },
        { type: 'note', value: 'Because it starts as HTTP, proxies, auth and rate limiting can apply to the handshake. Use wss:// (TLS) in production.' },
      ],
    },
    {
      id: 'rt-frames',
      title: 'Frames and messages',
      blocks: [
        { type: 'text', value: 'After the handshake, data travels in frames. A message can be split across frames. Text frames carry UTF-8; binary frames carry bytes. Control frames handle ping, pong and close.' },
        { type: 'list', items: [
          'Text frame: JSON or plain text',
          'Binary frame: files, audio, protobuf',
          'Ping and pong: keep the connection alive',
          'Close frame: carries a status code',
          'Frames are ordered on one connection',
        ] },
        { type: 'note', value: 'WebSocket has no built-in request/response correlation. Add your own message id if you need replies.' },
      ],
    },
    {
      id: 'rt-close-codes',
      title: 'Close and heartbeat',
      blocks: [
        { type: 'code', lang: 'text', tryIt: false, value: `1000 normal closure
1001 going away
1006 abnormal closure (no close frame)
1011 server error
4000-4999 application-defined` },
        { type: 'text', value: 'A dead network can leave a socket open with no close frame. Send a ping every 30 seconds and close the connection if no pong arrives.' },
        { type: 'note', value: 'Without a heartbeat, a mobile client that lost signal looks connected until the next write fails.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'protocol',
      q: 'How does a WebSocket start?',
      options: ['With a TCP-only handshake', 'As an HTTP request with Upgrade', 'With a DNS lookup', 'With a POST body'],
      answer: 1,
      explain: 'It upgrades from HTTP.',
    },
    {
      chapterId: 'protocol',
      q: 'Which scheme is secure?',
      options: ['ws://', 'wss://', 'http://', 'ftp://'],
      answer: 1,
      explain: 'wss uses TLS.',
    },
    {
      chapterId: 'protocol',
      q: 'What do ping and pong do?',
      options: ['Encrypt data', 'Keep the connection alive and detect dead peers', 'Compress frames', 'Route messages'],
      answer: 1,
      explain: 'They are heartbeats.',
    },
    {
      chapterId: 'protocol',
      q: 'What does close code 1006 mean?',
      options: ['Normal close', 'Abnormal closure without a close frame', 'Server error', 'Auth failure'],
      answer: 1,
      explain: '1006 is abnormal.',
    },
  ],
};
