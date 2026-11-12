// Redis chapter: Pub/Sub and Messaging.

export default {
  id: 'pubsub',
  title: 'Pub/Sub & Streams',
  description: 'Publish, subscribe and consume event streams',
  icon: 'rss-feed',
  lessons: [
    {
      id: 'redis-pubsub',
      title: 'Pub/Sub',
      blocks: [
        { type: 'text', value: 'Redis Pub/Sub lets publishers send messages to channels and subscribers receive them in real time. It is fire-and-forget: messages are not stored, so a subscriber that is offline misses them.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Subscriber
SUBSCRIBE news:courses

# Publisher (in another terminal)
PUBLISH news:courses "New course: Redis"` },
        { type: 'code', lang: 'python', tryIt: false, value: `import redis

r = redis.Redis()
pubsub = r.pubsub()
pubsub.subscribe("news:courses")

for message in pubsub.listen():
    if message["type"] == "message":
        print(message["data"])` },
        { type: 'note', value: 'Pub/Sub is great for live notifications. For reliable delivery, use Streams instead.' },
      ],
    },
    {
      id: 'redis-streams',
      title: 'Streams',
      blocks: [
        { type: 'text', value: 'A Redis Stream is an append-only log of messages. Each message has an ID and fields. Consumer groups let multiple workers share the work, and messages are acknowledged after processing.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `XADD events * type signup user 42
XADD events * type purchase course 7

# Read all messages
XRANGE events - +

# Create a consumer group
XGROUP CREATE events processors $ MKSTREAM

# A worker reads and acknowledges
XREADGROUP GROUP processors worker-1 COUNT 10 BLOCK 2000 STREAMS events >
XACK events processors 1700000000000-0` },
        { type: 'note', value: 'Streams are the Redis answer to Kafka for small and medium workloads. They persist messages and support consumer groups.' },
      ],
    },
    {
      id: 'redis-stream-patterns',
      title: 'When to use which',
      blocks: [
        { type: 'list', items: [
          'Pub/Sub: live notifications, chat, real-time dashboards. Fire-and-forget.',
          'Streams: event logs, job queues, reliable delivery. Messages persist.',
          'Lists: simple queues with blocking pop. Good for small systems.',
          'Sorted sets: priority queues and leaderboards.',
        ] },
        { type: 'text', value: 'Choose the structure that matches the delivery guarantee you need. If a missed message is a problem, do not use Pub/Sub.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'pubsub',
      q: 'What is the delivery guarantee of Redis Pub/Sub?',
      options: ['Messages are stored until acknowledged', 'Fire-and-forget: offline subscribers miss messages', 'Exactly once', 'At least once with retries'],
      answer: 1,
      explain: 'Pub/Sub does not store messages.',
    },
    {
      chapterId: 'pubsub',
      q: 'What is a Redis Stream?',
      options: ['A pub/sub channel', 'An append-only log of messages with IDs', 'A sorted set', 'A hash'],
      answer: 1,
      explain: 'Streams persist messages and support consumer groups.',
    },
    {
      chapterId: 'pubsub',
      q: 'What does XACK do?',
      options: ['Adds a message', 'Acknowledges that a message was processed', 'Deletes the stream', 'Creates a group'],
      answer: 1,
      explain: 'It marks a message as handled.',
    },
    {
      chapterId: 'pubsub',
      q: 'When should you use a Stream instead of Pub/Sub?',
      options: ['When you need real-time only', 'When missed messages are unacceptable', 'When you have one subscriber', 'When messages are small'],
      answer: 1,
      explain: 'Streams persist and redeliver; Pub/Sub does not.',
    },
  ],
};
