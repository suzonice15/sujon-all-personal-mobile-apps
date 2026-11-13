// WebSockets & Realtime interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is realtime in a web app?',
      a: 'The server pushes updates to clients instead of waiting for a poll, so data appears without a refresh.',
      level: 'basic',
    },
    {
      q: 'WebSocket versus SSE?',
      a: 'WebSocket is full duplex. SSE is one-way from server to client over plain HTTP and reconnects automatically.',
      level: 'basic',
    },
    {
      q: 'When is polling enough?',
      a: 'When updates are rare and a short delay is acceptable.',
      level: 'basic',
    },
    {
      q: 'Why is reconnect logic required?',
      a: 'Mobile networks and deploys drop connections; a client that never reconnects shows stale data.',
      level: 'basic',
    },
  ],
  protocol: [
    {
      q: 'How does a WebSocket start?',
      a: 'As an HTTP request with Upgrade: websocket. The server replies 101 Switching Protocols.',
      level: 'basic',
    },
    {
      q: 'What is the difference between a frame and a message?',
      a: 'A message can be split across several frames. Control frames handle ping, pong and close.',
      level: 'intermediate',
    },
    {
      q: 'Why use wss://?',
      a: 'It encrypts the connection with TLS. Production realtime should never use plain ws://.',
      level: 'basic',
    },
    {
      q: 'What does close code 1006 mean?',
      a: 'Abnormal closure: the connection dropped without a close frame, often a network failure.',
      level: 'intermediate',
    },
  ],
  server: [
    {
      q: 'What does the ws library provide?',
      a: 'A minimal WebSocket server: connections, messages and closes. You build rooms and reconnection yourself.',
      level: 'basic',
    },
    {
      q: 'What does Socket.IO add?',
      a: 'Events, rooms, acknowledgements, automatic reconnection and transport fallbacks.',
      level: 'basic',
    },
    {
      q: 'When should authentication happen?',
      a: 'During the handshake, before the socket joins any room.',
      level: 'intermediate',
    },
    {
      q: 'Why use acknowledgements?',
      a: 'They return a result, so the client knows whether an action succeeded.',
      level: 'intermediate',
    },
  ],
  client: [
    {
      q: 'Does the browser WebSocket reconnect automatically?',
      a: 'No. You must implement reconnect, backoff and cleanup.',
      level: 'basic',
    },
    {
      q: 'Why add jitter to backoff?',
      a: 'To avoid every client reconnecting at the same instant after a deploy.',
      level: 'intermediate',
    },
    {
      q: 'How many connections per tab?',
      a: 'One shared connection, not one per component.',
      level: 'basic',
    },
    {
      q: 'What should happen on unmount?',
      a: 'Close the socket and remove listeners to avoid leaks.',
      level: 'basic',
    },
  ],
  scaling: [
    {
      q: 'Why do multiple servers need an adapter?',
      a: 'A broadcast on one instance must reach clients connected to the others.',
      level: 'intermediate',
    },
    {
      q: 'What is a common adapter?',
      a: 'Redis pub/sub. NATS and managed services are alternatives.',
      level: 'basic',
    },
    {
      q: 'Why use sticky sessions?',
      a: 'Some transports, such as long polling, need the same client on the same instance during the handshake.',
      level: 'intermediate',
    },
    {
      q: 'Why raise the load balancer idle timeout?',
      a: 'A quiet WebSocket can be killed before the heartbeat, causing constant reconnects.',
      level: 'advanced',
    },
  ],
  'presence-rooms': [
    {
      q: 'What is a room?',
      a: 'A logical group of sockets used to scope broadcasts.',
      level: 'basic',
    },
    {
      q: 'What must you check before joining?',
      a: 'That the user may access that room. The room name from the client is untrusted.',
      level: 'intermediate',
    },
    {
      q: 'Why expire presence data?',
      a: 'To remove ghost users after a crash or a missed disconnect.',
      level: 'intermediate',
    },
    {
      q: 'How do you handle typing indicators?',
      a: 'Throttle on the client and expire on the server after a few seconds.',
      level: 'basic',
    },
  ],
  patterns: [
    {
      q: 'What does pub/sub decouple?',
      a: 'Producers from consumers. The publisher does not know who receives the event.',
      level: 'basic',
    },
    {
      q: 'When use SSE?',
      a: 'For one-way server-to-client updates such as notifications or feeds.',
      level: 'basic',
    },
    {
      q: 'Why queue messages while offline?',
      a: 'So writes are not lost and can be sent after reconnect.',
      level: 'intermediate',
    },
    {
      q: 'What does the server need to deduplicate retries?',
      a: 'A stable message id per action.',
      level: 'intermediate',
    },
  ],
  'security-reliability': [
    {
      q: 'When do you authenticate a socket?',
      a: 'At the handshake, and re-check permissions for sensitive actions.',
      level: 'basic',
    },
    {
      q: 'Why verify the Origin header?',
      a: 'To block cross-site socket connections from malicious pages.',
      level: 'intermediate',
    },
    {
      q: 'How do you detect a dead connection?',
      a: 'Send a ping and terminate the socket if no pong arrives.',
      level: 'intermediate',
    },
    {
      q: 'Why is fan-out costly?',
      a: 'One broadcast becomes one write per connected client.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you build a live progress feed?',
      a: 'An HTTP write publishes an event, the server fans out to the course room, clients update, and reconnect restores missed events.',
      level: 'intermediate',
    },
    {
      q: 'How do you scale a realtime feature?',
      a: 'Stateless instances, a shared adapter such as Redis, sticky sessions where needed, and a heartbeat above the idle timeout.',
      level: 'advanced',
    },
    {
      q: 'How do you test realtime?',
      a: 'Use two clients on different networks, drop the connection, and check presence and missed events after reconnect.',
      level: 'intermediate',
    },
    {
      q: 'What is the best first realtime step?',
      a: 'One WebSocket that broadcasts a message to all connected clients, then add auth and rooms.',
      level: 'basic',
    },
  ],
};
