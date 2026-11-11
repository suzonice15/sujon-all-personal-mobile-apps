// System Design chapter: Queues.

export default {
  id: 'queues',
  title: 'Queues & Async Work',
  description: 'Decouple producers and consumers',
  icon: 'queue',
  lessons: [
    {
      id: 'sd-queue-basics',
      title: 'Why a queue?',
      blocks: [
        { type: 'text', value: 'A queue decouples a producer from a consumer. The API can accept a request quickly and a worker does the slow work later. Queues absorb spikes and isolate failures.' },
        { type: 'list', items: [
          'Email and notification sending',
          'Image and video processing',
          'Report generation',
          'Payment reconciliation',
          'Fan-out to many consumers',
        ] },
        { type: 'note', value: 'A queue changes the user experience: the action becomes asynchronous. The UI must show "processing" and later a result.' },
      ],
    },
    {
      id: 'sd-retries-dlq',
      title: 'Retries and dead letters',
      blocks: [
        { type: 'text', value: 'A consumer can fail. Retry with backoff a limited number of times, then move the message to a dead-letter queue for inspection.' },
        { type: 'code', lang: 'text', tryIt: false, value: `attempt 1 -> fail -> wait 2s
attempt 2 -> fail -> wait 4s
attempt 3 -> fail -> dead-letter queue
operator inspects -> fix -> replay` },
        { type: 'note', value: 'Without a DLQ, a poison message retries forever and blocks the queue. Without a limit, it can melt the downstream service.' },
      ],
    },
    {
      id: 'sd-idempotency',
      title: 'Idempotency',
      blocks: [
        { type: 'text', value: 'A queue delivers at least once in most systems, so a consumer may see the same message twice. The consumer must be idempotent: the second delivery must not duplicate the effect.' },
        { type: 'code', lang: 'text', tryIt: false, value: `message: { id: "evt_123", type: "coins.add", amount: 10 }

consumer:
  if processed(id) return
  apply effect
  mark processed(id) in the same transaction` },
        { type: 'note', value: 'Store the processed id and apply the effect in one transaction. A separate check-then-write has a race window.' },
      ],
    },
    {
      id: 'sd-queue-choice',
      title: 'Choosing a queue',
      blocks: [
        { type: 'list', items: [
          'SQS - managed, simple, at-least-once',
          'RabbitMQ - flexible routing, acknowledgements',
          'Kafka - durable log, replay, high throughput',
          'Redis Streams - lightweight, good for small systems',
          'Cloud Pub/Sub - managed fan-out',
        ] },
        { type: 'text', value: 'Use a simple managed queue unless you need replay or very high throughput. Kafka is a log, not just a queue; that changes how you design consumers.' },
        { type: 'note', value: 'Monitor queue depth, age of the oldest message and consumer lag. A growing queue is an early warning.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'queues',
      q: 'What is the main benefit of a queue?',
      options: ['It makes the database faster', 'It decouples producer and consumer', 'It encrypts data', 'It removes the need for retries'],
      answer: 1,
      explain: 'The producer does not wait for the consumer.',
    },
    {
      chapterId: 'queues',
      q: 'What is a dead-letter queue for?',
      options: ['Messages that keep failing', 'The fastest messages', 'A cache', 'A database backup'],
      answer: 0,
      explain: 'It holds poison messages for inspection.',
    },
    {
      chapterId: 'queues',
      q: 'Why must consumers be idempotent?',
      options: ['Queues may deliver a message twice', 'It makes them faster', 'It reduces storage', 'It enables HTTPS'],
      answer: 0,
      explain: 'At-least-once delivery can duplicate a message.',
    },
    {
      chapterId: 'queues',
      q: 'Which metric signals a backlog?',
      options: ['Queue depth and consumer lag', 'Disk color', 'DNS TTL', 'Image size'],
      answer: 0,
      explain: 'Growing depth or lag means consumers cannot keep up.',
    },
  ],
};
