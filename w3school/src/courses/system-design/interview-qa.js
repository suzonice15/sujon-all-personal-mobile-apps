// System Design interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is system design?',
      a: 'Choosing components and their communication so a system meets functional and non-functional requirements under load and failure. It is about trade-offs, not one correct answer.',
      level: 'basic',
    },
    {
      q: 'How do you estimate requests per second?',
      a: 'Multiply daily active users by requests per user per day, then divide by 86,400. Multiply by 3-5 for peak traffic.',
      level: 'basic',
    },
    {
      q: 'Why is every component a failure mode?',
      a: 'It can fail, be slow or be misconfigured. Adding a component adds a dependency and an operational cost, so each one must earn its place.',
      level: 'intermediate',
    },
    {
      q: 'What does CAP mean in practice?',
      a: 'During a network partition you must choose consistency or availability for a given operation. Most systems tune this per feature rather than globally.',
      level: 'advanced',
    },
  ],
  requirements: [
    {
      q: 'Functional versus non-functional requirements?',
      a: 'Functional describes what the system does. Non-functional describes qualities: latency, availability, durability, consistency, scale and cost.',
      level: 'basic',
    },
    {
      q: 'What does 99.9% availability mean?',
      a: 'About 43 minutes of downtime per 30-day month. Each extra nine reduces the allowed downtime by roughly ten times.',
      level: 'intermediate',
    },
    {
      q: 'Why define the API before internals?',
      a: 'The API is the contract clients depend on. Changing it later is expensive, so define resources, status codes, pagination and auth early.',
      level: 'intermediate',
    },
    {
      q: 'How do access patterns shape the data model?',
      a: 'They decide indexes, whether to embed or reference, and whether to denormalise. The hot path gets the most attention.',
      level: 'advanced',
    },
  ],
  scalability: [
    {
      q: 'Vertical versus horizontal scaling?',
      a: 'Vertical makes one machine bigger, with a hardware limit. Horizontal adds machines, needs stateless services and shared state, and scales further.',
      level: 'basic',
    },
    {
      q: 'Why should services be stateless?',
      a: 'Any instance can serve any request, so scaling and deploys are simple. State belongs in a database, cache or token.',
      level: 'intermediate',
    },
    {
      q: 'How do you find the bottleneck?',
      a: 'Measure rate, latency, errors and saturation at every layer. The slowest or most saturated component is the next thing to fix.',
      level: 'intermediate',
    },
    {
      q: 'What is a thundering herd?',
      a: 'Many clients retry or reconnect at the same moment after an outage. Jitter, backoff and connection limits spread the load.',
      level: 'advanced',
    },
  ],
  'load-balancing': [
    {
      q: 'L4 versus L7 load balancing?',
      a: 'L4 forwards TCP/UDP by address and port. L7 understands HTTP and can route by path, host or header and terminate TLS.',
      level: 'intermediate',
    },
    {
      q: 'Which balancing algorithm suits uneven requests?',
      a: 'Least connections. Round robin assumes requests take similar time.',
      level: 'basic',
    },
    {
      q: 'Readiness versus liveness?',
      a: 'Readiness gates traffic until the instance can serve. Liveness restarts a stuck process. Both are needed for safe deploys.',
      level: 'intermediate',
    },
    {
      q: 'What is consistent hashing for?',
      a: 'Mapping keys to nodes so that adding or removing a node moves only a small fraction of keys. It is common for caches and shards.',
      level: 'advanced',
    },
  ],
  caching: [
    {
      q: 'Where can you cache?',
      a: 'Browser, CDN, application cache such as Redis, and database buffers. Each layer removes load from the next one.',
      level: 'basic',
    },
    {
      q: 'What is a cache hit rate?',
      a: 'The fraction of requests served from the cache. A low hit rate means wasted memory and unnecessary database load.',
      level: 'intermediate',
    },
    {
      q: 'How do you invalidate a cache?',
      a: 'Delete the key on write and read through on miss, use a short TTL, version keys, or publish invalidation events. Choose by how fresh the data must be.',
      level: 'intermediate',
    },
    {
      q: 'What is a cache stampede and how do you prevent it?',
      a: 'Many requests miss the same hot key at once. Use a lock so one request refills, serve stale data briefly, or add jitter to TTLs.',
      level: 'advanced',
    },
  ],
  databases: [
    {
      q: 'SQL versus NoSQL?',
      a: 'SQL gives joins, constraints and strong transactions. NoSQL offers flexible documents, key-value speed or high write throughput. Choose by access pattern.',
      level: 'intermediate',
    },
    {
      q: 'How does replication help?',
      a: 'It serves reads from replicas, provides failover and improves availability. Replicas lag, so reads may be stale.',
      level: 'intermediate',
    },
    {
      q: 'When do you shard?',
      a: 'When one machine cannot handle the writes or storage and indexes, caching and replicas are exhausted. Sharding complicates queries and transactions.',
      level: 'advanced',
    },
    {
      q: 'Why test with realistic data volume?',
      a: 'A query that is fast on 1,000 rows can be unusable on 10 million. Query plans and index choices change with scale.',
      level: 'basic',
    },
  ],
  queues: [
    {
      q: 'Why use a queue?',
      a: 'To decouple producer and consumer, absorb spikes, retry failures and do slow work asynchronously.',
      level: 'basic',
    },
    {
      q: 'What is a dead-letter queue?',
      a: 'A queue for messages that repeatedly fail, so they can be inspected without blocking the main queue.',
      level: 'intermediate',
    },
    {
      q: 'Why must consumers be idempotent?',
      a: 'Most queues deliver at least once. A duplicate message must not duplicate the effect.',
      level: 'intermediate',
    },
    {
      q: 'What is consumer lag?',
      a: 'How far a consumer is behind the producer. Growing lag means consumers cannot keep up and the queue will grow.',
      level: 'advanced',
    },
  ],
  consistency: [
    {
      q: 'Strong versus eventual consistency?',
      a: 'Strong guarantees every read sees the latest write. Eventual converges over time and is faster and more available.',
      level: 'intermediate',
    },
    {
      q: 'What is a saga?',
      a: 'A sequence of local transactions with compensating actions across services. It replaces a distributed transaction and is eventually consistent.',
      level: 'advanced',
    },
    {
      q: 'What is idempotency?',
      a: 'Repeating an operation has the same effect as doing it once. It is essential for retries and at-least-once delivery.',
      level: 'basic',
    },
    {
      q: 'Why are distributed locks hard?',
      a: 'A crashed owner can leave a lock held, and a paused owner can act after its lease expires. Use leases, fencing tokens or avoid locks with idempotent design.',
      level: 'advanced',
    },
  ],
  microservices: [
    {
      q: 'Monolith versus microservices?',
      a: 'A monolith is one deployable unit, simpler to build and operate. Microservices allow independent deploys and scaling per team, at the cost of network complexity.',
      level: 'intermediate',
    },
    {
      q: 'What does an API gateway do?',
      a: 'It is the single entry point: routing, authentication, rate limiting and TLS termination. It should stay thin to avoid becoming a bottleneck.',
      level: 'basic',
    },
    {
      q: 'What are the three pillars of observability?',
      a: 'Logs, metrics and traces, correlated by a request or trace id.',
      level: 'intermediate',
    },
    {
      q: 'Why is a shared database an anti-pattern?',
      a: 'It couples services to one schema and deploy. Each service should own its data and expose behaviour through an API.',
      level: 'advanced',
    },
  ],
  'case-study-url': [
    {
      q: 'How do you generate a short code?',
      a: 'A base62 counter, a random string with a collision check, or a hash. A unique index on the code is mandatory either way.',
      level: 'intermediate',
    },
    {
      q: 'Why is the redirect path cached?',
      a: 'It is read-heavy and latency sensitive. A cache hit avoids the database entirely.',
      level: 'basic',
    },
    {
      q: 'How do you count clicks without overloading the database?',
      a: 'Write click events to a queue or buffer and update counts in batches. The redirect must not depend on the analytics write.',
      level: 'advanced',
    },
    {
      q: 'What happens when a short code expires?',
      a: 'Return 410 Gone or a clear expired page, and keep the record long enough for analytics and support.',
      level: 'basic',
    },
  ],
  'case-study-feed': [
    {
      q: 'Fan-out on write versus read?',
      a: 'Write fan-out precomputes feeds for fast reads but costs a write per follower. Read fan-out is cheap to write but slower to read. A hybrid handles celebrities.',
      level: 'advanced',
    },
    {
      q: 'Why cap the feed list?',
      a: 'Storing every post forever per user is unbounded. Keep the recent N and fetch older data on demand.',
      level: 'intermediate',
    },
    {
      q: 'Why use a cursor for feed pagination?',
      a: 'New posts shift an offset page. A cursor on createdAt and postId is stable and index-friendly.',
      level: 'intermediate',
    },
    {
      q: 'What should a real-time connection push?',
      a: 'A lightweight event telling the client to fetch the new page, not the full feed. That keeps the socket small and the logic in one place.',
      level: 'basic',
    },
  ],
  interview: [
    {
      q: 'What is the first step in a design interview?',
      a: 'Clarify functional and non-functional requirements and scope. Do not start drawing until the problem is clear.',
      level: 'basic',
    },
    {
      q: 'How do you structure the answer?',
      a: 'Requirements, estimation, API and data model, high-level architecture, deep dive, bottlenecks and trade-offs, summary.',
      level: 'intermediate',
    },
    {
      q: 'How do you handle a question you do not know?',
      a: 'State what you know, make a reasonable assumption and reason from first principles. Honesty plus reasoning beats a confident wrong answer.',
      level: 'intermediate',
    },
    {
      q: 'What separates a senior answer?',
      a: 'Naming the bottleneck, the failure mode and the trade-off, and explaining why the chosen option fits the requirements.',
      level: 'advanced',
    },
  ],
};
