// Microservices chapter: API Gateway.

export default {
  id: 'api-gateway',
  title: 'API Gateway',
  description: 'One entry point for routing, auth and limits',
  icon: 'api',
  lessons: [
    {
      id: 'ms-gateway-role',
      title: 'What a gateway does',
      blocks: [
        { type: 'text', value: 'An API gateway is the single entry point for clients. It routes requests to the right service, handles authentication and rate limiting, and can aggregate responses. Clients talk to the gateway, not to every service.' },
        { type: 'list', items: [
          'Routing: map paths to services',
          'Authentication and authorisation',
          'Rate limiting and quotas',
          'SSL termination',
          'Request and response transformation',
          'Logging and metrics in one place',
        ] },
        { type: 'note', value: 'A gateway can become a bottleneck or a single point of failure. Run several instances behind a load balancer.' },
      ],
    },
    {
      id: 'ms-gateway-config',
      title: 'Gateway configuration',
      blocks: [
        { type: 'text', value: 'Most gateways are configured with routes and middleware. The example below uses a common shape: a path prefix, a target service and a set of policies.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `routes:
  - path: /api/courses/**
    service: courses
    policies: [auth, rate-limit]
  - path: /api/enrollments/**
    service: enrollments
    policies: [auth]
  - path: /api/public/**
    service: catalog
    policies: [rate-limit]` },
        { type: 'note', value: 'Keep the gateway thin. Business logic belongs in services, not in routing rules.' },
      ],
    },
    {
      id: 'ms-gateway-patterns',
      title: 'Gateway patterns',
      blocks: [
        { type: 'text', value: 'A gateway can do more than route. A BFF (backend for frontend) tailors responses to one client. Response aggregation combines several services into one call. Offloading authentication keeps each service simpler.' },
        { type: 'list', items: [
          'Edge gateway: one for all clients',
          'BFF: one gateway per client type',
          'Aggregation: one call returns data from many services',
          'Auth offload: the gateway verifies tokens',
          'Avoid turning the gateway into a mini-monolith',
        ] },
        { type: 'note', value: 'If the gateway starts holding business rules, it becomes a shared monolith that every team must change together.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'api-gateway',
      q: 'What is an API gateway?',
      options: ['A database', 'A single entry point that routes and secures requests', 'A cache', 'A message broker'],
      answer: 1,
      explain: 'It is the front door for clients.',
    },
    {
      chapterId: 'api-gateway',
      q: 'What is a BFF?',
      options: ['A backup file', 'A backend for a specific frontend', 'A database format', 'A load balancer'],
      answer: 1,
      explain: 'A BFF tailors the API to one client.',
    },
    {
      chapterId: 'api-gateway',
      q: 'Why keep the gateway thin?',
      options: ['It is faster', 'Business logic in the gateway becomes a shared bottleneck', 'It is required', 'It saves memory'],
      answer: 1,
      explain: 'A fat gateway becomes a monolith.',
    },
    {
      chapterId: 'api-gateway',
      q: 'Why run several gateway instances?',
      options: ['To save money', 'To avoid a single point of failure', 'To cache more', 'To reduce code'],
      answer: 1,
      explain: 'Redundancy removes the single point of failure.',
    },
  ],
};
