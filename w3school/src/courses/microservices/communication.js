// Microservices chapter: Communication.

export default {
  id: 'communication',
  title: 'Communication',
  description: 'Synchronous and asynchronous, REST, gRPC and messaging',
  icon: 'sync-alt',
  lessons: [
    {
      id: 'ms-sync-async',
      title: 'Synchronous versus asynchronous',
      blocks: [
        { type: 'text', value: 'A synchronous call waits for the response. It is simple but couples the caller to the availability and latency of the callee. An asynchronous message is queued and processed later, which decouples services but adds eventual consistency and ordering concerns.' },
        { type: 'list', items: [
          'Synchronous: request and response, easy to reason about',
          'Asynchronous: events and messages through a broker',
          'Sync fits queries; async fits side effects',
          'Async needs idempotency and retries',
          'Mixing both is normal',
        ] },
        { type: 'note', value: 'Use a synchronous call when the caller needs the answer now. Use a message when the work can happen later.' },
      ],
    },
    {
      id: 'ms-rest-grpc',
      title: 'REST and gRPC',
      blocks: [
        { type: 'text', value: 'REST uses HTTP and JSON and is easy to debug. gRPC uses HTTP/2 and Protocol Buffers, is faster and has a typed contract, which suits internal service-to-service calls.' },
        { type: 'code', lang: 'text', tryIt: false, value: `service Courses {
  rpc GetCourse (CourseRequest) returns (Course);
  rpc ListCourses (Empty) returns (CourseList);
}

message CourseRequest { string id = 1; }
message Course { string id = 1; string title = 2; int32 price = 3; }` },
        { type: 'note', value: 'Use gRPC inside the cluster and REST at the edge when browsers or third parties need the API.' },
      ],
    },
    {
      id: 'ms-messaging',
      title: 'Messaging patterns',
      blocks: [
        { type: 'text', value: 'A message broker such as Kafka, RabbitMQ or SQS carries events between services. Producers publish; consumers subscribe. Design messages to be idempotent, because delivery can happen more than once.' },
        { type: 'list', items: [
          'Event: something happened, past tense',
          'Command: do this action',
          'Topic: a stream of related events',
          'Consumer group: competing consumers on a topic',
          'Idempotency key: safe reprocessing of duplicates',
          'Dead-letter queue: park messages that keep failing',
        ] },
        { type: 'note', value: 'At-least-once delivery is the usual guarantee. Your consumer must handle the same message twice without double-charging or double-shipping.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'communication',
      q: 'When is an asynchronous message better?',
      options: ['When the caller needs the answer now', 'When the work can happen later', 'For all queries', 'For login only'],
      answer: 1,
      explain: 'Async fits work that can be deferred.',
    },
    {
      chapterId: 'communication',
      q: 'What does gRPC use?',
      options: ['HTTP/1 and JSON', 'HTTP/2 and Protocol Buffers', 'FTP', 'SMTP'],
      answer: 1,
      explain: 'gRPC uses HTTP/2 with Protobuf.',
    },
    {
      chapterId: 'communication',
      q: 'Why must consumers be idempotent?',
      options: ['Messages are always unique', 'Delivery can happen more than once', 'It is faster', 'It is required by Kafka'],
      answer: 1,
      explain: 'At-least-once delivery can duplicate messages.',
    },
    {
      chapterId: 'communication',
      q: 'What is a dead-letter queue for?',
      options: ['Fast delivery', 'Parking messages that keep failing', 'Storing backups', 'Caching'],
      answer: 1,
      explain: 'It holds poison messages for inspection.',
    },
  ],
};
