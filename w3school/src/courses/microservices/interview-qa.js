// Microservices interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is a microservice?',
      a: 'A small, independently deployable service that owns one business capability and its own data.',
      level: 'basic',
    },
    {
      q: 'Monolith versus microservices?',
      a: 'A monolith is one deployable unit with simple in-process calls. Microservices are many small services with network calls, independent deploys and more operational complexity.',
      level: 'basic',
    },
    {
      q: 'What is a common reason microservices fail?',
      a: 'Splitting too early, before the domain and team boundaries are understood.',
      level: 'intermediate',
    },
    {
      q: 'How should services be split?',
      a: 'By business capability and bounded context, not by technical layer.',
      level: 'intermediate',
    },
  ],
  'service-design': [
    {
      q: 'What is a bounded context?',
      a: 'A boundary inside which one domain model and language are consistent, usually owned by one team.',
      level: 'intermediate',
    },
    {
      q: 'What is a service contract?',
      a: 'The published API surface: endpoints, request and response shapes, status codes and error formats.',
      level: 'basic',
    },
    {
      q: 'Which API changes are usually safe?',
      a: 'Additive changes such as a new optional field. Removing or renaming a field breaks clients.',
      level: 'intermediate',
    },
    {
      q: 'What is a consumer-driven contract test?',
      a: 'A test where the consumer defines the contract it expects, and the provider runs it to prove compatibility.',
      level: 'advanced',
    },
  ],
  communication: [
    {
      q: 'Sync versus async communication?',
      a: 'Sync waits for a response and is simple but couples availability. Async uses a broker and decouples, but adds eventual consistency and ordering concerns.',
      level: 'basic',
    },
    {
      q: 'When use gRPC?',
      a: 'For fast, typed internal service-to-service calls. Use REST at the edge for browsers and third parties.',
      level: 'intermediate',
    },
    {
      q: 'Why must consumers be idempotent?',
      a: 'At-least-once delivery can deliver the same message twice. Reprocessing must not double-charge or double-ship.',
      level: 'intermediate',
    },
    {
      q: 'What is a dead-letter queue?',
      a: 'A queue that stores messages that repeatedly fail, so they can be inspected without blocking the stream.',
      level: 'intermediate',
    },
  ],
  'api-gateway': [
    {
      q: 'What does an API gateway do?',
      a: 'It is the single entry point for clients: routing, authentication, rate limiting, TLS termination and logging.',
      level: 'basic',
    },
    {
      q: 'What is a BFF?',
      a: 'A backend for frontend, a gateway tailored to one client type with the responses that client needs.',
      level: 'intermediate',
    },
    {
      q: 'Why keep the gateway thin?',
      a: 'Business logic in the gateway becomes a shared monolith that every team must change together.',
      level: 'intermediate',
    },
    {
      q: 'How do you avoid a single point of failure at the gateway?',
      a: 'Run several instances behind a load balancer and health-check them.',
      level: 'basic',
    },
  ],
  discovery: [
    {
      q: 'Why is service discovery needed?',
      a: 'Service instances move and scale, so their addresses change. Discovery tracks healthy instances and resolves names.',
      level: 'basic',
    },
    {
      q: 'What does a health check do?',
      a: 'It removes unhealthy instances from the load balancer rotation.',
      level: 'basic',
    },
    {
      q: 'Why prefer stateless services?',
      a: 'Stateless instances are interchangeable, which makes scaling and failover simple.',
      level: 'intermediate',
    },
    {
      q: 'What is consistent hashing used for?',
      a: 'Keeping a given key on the same instance as much as possible, for caches and sharding.',
      level: 'advanced',
    },
  ],
  'data-management': [
    {
      q: 'Why a database per service?',
      a: 'Each service owns its data and changes independently. A shared database couples services.',
      level: 'basic',
    },
    {
      q: 'What is a saga?',
      a: 'A sequence of local transactions with compensating actions, used instead of a distributed transaction.',
      level: 'intermediate',
    },
    {
      q: 'What is CQRS?',
      a: 'Command Query Responsibility Segregation: separate write and read models, often with a projection optimised for queries.',
      level: 'advanced',
    },
    {
      q: 'What is event sourcing?',
      a: 'Storing every change as an event; current state is rebuilt from the event log.',
      level: 'advanced',
    },
  ],
  resilience: [
    {
      q: 'Why does every call need a timeout?',
      a: 'A hanging dependency ties up threads and can take the whole service down.',
      level: 'basic',
    },
    {
      q: 'How does a circuit breaker work?',
      a: 'It counts failures and opens to fail fast, then half-opens to test recovery before closing.',
      level: 'intermediate',
    },
    {
      q: 'Why add jitter to retries?',
      a: 'To spread retries over time and avoid a thundering herd on a recovering service.',
      level: 'intermediate',
    },
    {
      q: 'What is a bulkhead?',
      a: 'Isolating resources, such as connection pools, so one failing dependency cannot exhaust everything.',
      level: 'intermediate',
    },
  ],
  observability: [
    {
      q: 'Why add a request id to logs?',
      a: 'To follow one request across services and correlate log lines.',
      level: 'basic',
    },
    {
      q: 'What is distributed tracing?',
      a: 'Recording spans for each step of a request across services, with timing and parent links, to find where time is spent.',
      level: 'intermediate',
    },
    {
      q: 'What should you alert on?',
      a: 'User-facing symptoms: error rate, latency and availability. Not every CPU spike.',
      level: 'intermediate',
    },
    {
      q: 'Why propagate trace context?',
      a: 'Without it, every service starts a new trace and the request cannot be followed end to end.',
      level: 'advanced',
    },
  ],
  deployment: [
    {
      q: 'Why pin container image versions?',
      a: 'So two deploys run the exact same code and builds are reproducible.',
      level: 'basic',
    },
    {
      q: 'What is the difference between readiness and liveness?',
      a: 'Readiness gates traffic; liveness restarts a stuck container.',
      level: 'intermediate',
    },
    {
      q: 'What is a canary release?',
      a: 'Sending a small share of traffic to the new version and watching metrics before widening.',
      level: 'intermediate',
    },
    {
      q: 'Why use feature flags?',
      a: 'To deploy code without exposing it, separating deploy from release.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you design a learning platform with microservices?',
      a: 'Courses, enrollments, payments and notifications as services, each with its own database, an API gateway, events for side effects and resilience patterns.',
      level: 'intermediate',
    },
    {
      q: 'How do you handle a distributed transaction?',
      a: 'With a saga: local transactions plus compensating actions, accepting eventual consistency.',
      level: 'advanced',
    },
    {
      q: 'When should you not use microservices?',
      a: 'For a small product with one team. A modular monolith is simpler and cheaper.',
      level: 'basic',
    },
    {
      q: 'What is the best first microservices step?',
      a: 'Build two small services with one database each and connect them through an API and an event.',
      level: 'basic',
    },
  ],
};
