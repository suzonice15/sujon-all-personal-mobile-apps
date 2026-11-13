// Realtime chapter: Scaling.

export default {
  id: 'scaling',
  title: 'Scaling Realtime',
  description: 'Adapters, sticky sessions and fan-out',
  icon: 'hub',
  lessons: [
    {
      id: 'rt-scaling-problem',
      title: 'The scaling problem',
      blocks: [
        { type: 'text', value: 'One server holds all sockets in memory. Add a second server and a client on server A cannot see a message broadcast on server B. You need a shared channel between instances.' },
        { type: 'code', lang: 'text', tryIt: false, value: `client -> LB -> server A (socket in memory)
client -> LB -> server B (socket in memory)

message on A must reach clients on B -> shared pub/sub` },
        { type: 'note', value: 'A single realtime server is fine until it is not. Plan the adapter before the second instance.' },
      ],
    },
    {
      id: 'rt-redis-adapter',
      title: 'Redis and other adapters',
      blocks: [
        { type: 'text', value: 'Redis pub/sub is the common adapter: every instance publishes and subscribes to channels, so a broadcast reaches every instance. Other options are NATS, Kafka or a managed realtime service.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const pub = createClient({ url: REDIS_URL });
const sub = pub.duplicate();
await Promise.all([pub.connect(), sub.connect()]);

io.adapter(createAdapter(pub, sub));` },
        { type: 'note', value: 'The adapter is not a database. It carries live messages; do not use it as your source of truth.' },
      ],
    },
    {
      id: 'rt-sticky',
      title: 'Sticky sessions and fallbacks',
      blocks: [
        { type: 'text', value: 'A plain WebSocket can go to any instance. But long polling and some transports need the same client on the same instance during the handshake. Sticky sessions handle that.' },
        { type: 'list', items: [
          'Prefer WebSocket-only transport at scale',
          'Use sticky sessions for polling transports',
          'Terminate TLS at the load balancer',
          'Set idle timeouts higher than the heartbeat interval',
          'Keep the adapter and all instances in the same region',
        ] },
        { type: 'note', value: 'A load balancer with a 30-second idle timeout will kill a quiet WebSocket. Raise it above your heartbeat.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'scaling',
      q: 'Why do multiple realtime servers need an adapter?',
      options: ['For speed', 'A message on one server must reach clients on others', 'To encrypt', 'To cache'],
      answer: 1,
      explain: 'The adapter shares broadcasts.',
    },
    {
      chapterId: 'scaling',
      q: 'Which is a common adapter?',
      options: ['Redis pub/sub', 'MySQL', 'S3', 'Nginx only'],
      answer: 0,
      explain: 'Redis pub/sub is common.',
    },
    {
      chapterId: 'scaling',
      q: 'Why sticky sessions?',
      options: ['For style', 'Some transports need the same instance during handshake', 'To cache', 'To encrypt'],
      answer: 1,
      explain: 'Polling needs affinity.',
    },
    {
      chapterId: 'scaling',
      q: 'Why raise the load balancer idle timeout?',
      options: ['To save money', 'A quiet WebSocket can be killed too early', 'To compress', 'To enable TLS'],
      answer: 1,
      explain: 'Keep it above the heartbeat.',
    },
  ],
};
