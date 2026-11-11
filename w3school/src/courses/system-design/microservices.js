// System Design chapter: Microservices.

export default {
  id: 'microservices',
  title: 'Microservices',
  description: 'Boundaries, gateways and observability',
  icon: 'hub',
  lessons: [
    {
      id: 'sd-monolith-micro',
      title: 'Monolith or microservices?',
      blocks: [
        { type: 'text', value: 'A monolith is one deployable unit. Microservices split the system into independently deployable services. Microservices solve organisational scale, not just technical scale.' },
        { type: 'list', items: [
          'Monolith: simple deploys, one database, easy local dev',
          'Microservices: independent teams and scaling',
          'Microservices add network calls, latency and failure modes',
          'A modular monolith is often the right first step',
        ] },
        { type: 'note', value: 'Do not start with microservices for a small team. Split when a module has a different scaling or release need, or when team ownership demands it.' },
      ],
    },
    {
      id: 'sd-gateway-discovery',
      title: 'API gateway and discovery',
      blocks: [
        { type: 'text', value: 'An API gateway is the single entry point: routing, auth, rate limits and TLS. Service discovery lets services find each other as instances come and go.' },
        { type: 'code', lang: 'text', tryIt: false, value: `client -> API gateway -> auth -> route
  /courses -> course-service
  /orders  -> order-service

service registry:
  course-service -> 10.0.1.5:3001, 10.0.1.6:3001` },
        { type: 'note', value: 'A gateway can become a bottleneck and a single point of failure. Run it highly available and keep its logic thin.' },
      ],
    },
    {
      id: 'sd-observability',
      title: 'Observability',
      blocks: [
        { type: 'text', value: 'In a distributed system you cannot debug by reading one log file. You need logs, metrics and traces correlated by a request id.' },
        { type: 'list', items: [
          'Structured logs with request and trace ids',
          'Metrics: rate, errors, duration, saturation',
          'Distributed traces across service calls',
          'Health checks and alerting',
          'Dashboards per service and per dependency',
        ] },
        { type: 'note', value: 'Without a request id, a failure that crosses three services is almost impossible to follow. Add it at the gateway and propagate it everywhere.' },
      ],
    },
    {
      id: 'sd-service-boundaries',
      title: 'Service boundaries',
      blocks: [
        { type: 'text', value: 'A service should own its data and expose behaviour through an API. Boundaries based on business capabilities age better than boundaries based on technical layers.' },
        { type: 'list', items: [
          'One team owns one service',
          'Each service owns its database',
          'Avoid sharing tables between services',
          'Prefer asynchronous events for cross-service side effects',
          'Design for failure: timeouts, retries and circuit breakers',
        ] },
        { type: 'note', value: 'A shared database is a distributed monolith. It couples every service to the same schema and deploy.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'microservices',
      q: 'What is a modular monolith?',
      options: ['One deployable unit with clear internal modules', 'Many services', 'A database', 'A load balancer'],
      answer: 0,
      explain: 'It keeps deployment simple while enforcing boundaries.',
    },
    {
      chapterId: 'microservices',
      q: 'What does an API gateway do?',
      options: ['Stores data', 'Routes, authenticates and rate-limits requests', 'Runs tests', 'Builds images'],
      answer: 1,
      explain: 'It is the single entry point for clients.',
    },
    {
      chapterId: 'microservices',
      q: 'Why are traces important?',
      options: ['They show one request across services', 'They store passwords', 'They replace logs', 'They make code faster'],
      answer: 0,
      explain: 'A trace follows a request through every service call.',
    },
    {
      chapterId: 'microservices',
      q: 'Why should each service own its database?',
      options: ['To reduce coupling', 'To save disk', 'To enable DNS', 'To avoid indexes'],
      answer: 0,
      explain: 'A shared schema couples deployments and teams.',
    },
  ],
};
