// Microservices chapter: Data Management.

export default {
  id: 'data-management',
  title: 'Data Management',
  description: 'Database per service, sagas, CQRS and events',
  icon: 'storage',
  lessons: [
    {
      id: 'ms-db-per-service',
      title: 'Database per service',
      blocks: [
        { type: 'text', value: 'Each service owns its data and exposes it through its API, never through a shared database. A shared database couples services and lets one team break another with a schema change.' },
        { type: 'code', lang: 'text', tryIt: false, value: `catalog    -> PostgreSQL
cart       -> Redis
orders     -> PostgreSQL
payments   -> PostgreSQL
search     -> Elasticsearch
analytics  -> ClickHouse` },
        { type: 'note', value: 'Polyglot persistence means using the database that fits each service. It also means more operational work, so use it deliberately.' },
      ],
    },
    {
      id: 'ms-saga',
      title: 'Sagas and eventual consistency',
      blocks: [
        { type: 'text', value: 'There is no distributed transaction across services. A saga is a sequence of local transactions, each with a compensating action if a later step fails. The system becomes eventually consistent.' },
        { type: 'code', lang: 'text', tryIt: false, value: `1. Create order        (orders)
2. Reserve stock       (inventory)
3. Charge payment      (payments)
4. Send confirmation   (notifications)

If step 3 fails:
- release stock        (compensation)
- cancel order         (compensation)` },
        { type: 'list', items: [
          'Each step is a local transaction',
          'Compensating actions undo earlier steps',
          'Sagas can be orchestrated or choreographed',
          'Design for retries and duplicates',
          'Users may see a temporary pending state',
        ] },
      ],
    },
    {
      id: 'ms-cqrs-events',
      title: 'CQRS and event sourcing',
      blocks: [
        { type: 'text', value: 'CQRS separates the write model from the read model. Writes go to a normalised store; reads come from a denormalised projection optimised for queries. Event sourcing stores every change as an event, and state is rebuilt from the log.' },
        { type: 'list', items: [
          'CQRS: separate read and write models',
          'Event sourcing: store events, not just current state',
          'Read models can be rebuilt from events',
          'Greater complexity; use only when needed',
          'Events become the audit trail',
        ] },
        { type: 'note', value: 'CQRS and event sourcing are powerful but complex. Most systems do not need them. Start with a normal database and add projections where reads are slow.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'data-management',
      q: 'Why not share one database across services?',
      options: ['It is slower', 'It couples services and lets one team break another', 'It uses too much disk', 'It is not allowed'],
      answer: 1,
      explain: 'A shared database creates tight coupling.',
    },
    {
      chapterId: 'data-management',
      q: 'What is a saga?',
      options: ['A database backup', 'A sequence of local transactions with compensations', 'A message queue', 'A load balancer'],
      answer: 1,
      explain: 'A saga coordinates steps without a distributed transaction.',
    },
    {
      chapterId: 'data-management',
      q: 'What does CQRS separate?',
      options: ['Users and admins', 'Read and write models', 'Frontend and backend', 'Dev and prod'],
      answer: 1,
      explain: 'CQRS separates reads from writes.',
    },
    {
      chapterId: 'data-management',
      q: 'What is event sourcing?',
      options: ['Caching events', 'Storing every change as an event and rebuilding state', 'Deleting old data', 'A backup strategy'],
      answer: 1,
      explain: 'The event log is the source of truth.',
    },
  ],
};
