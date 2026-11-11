// System Design chapter: Load Balancing.

export default {
  id: 'load-balancing',
  title: 'Load Balancing',
  description: 'Distribute traffic and survive instance failure',
  icon: 'balance',
  lessons: [
    {
      id: 'sd-l4-l7',
      title: 'Layer 4 versus layer 7',
      blocks: [
        { type: 'text', value: 'An L4 balancer forwards TCP or UDP connections by IP and port. An L7 balancer understands HTTP and can route by path, host or header.' },
        { type: 'list', items: [
          'L4: fast, protocol-agnostic, fewer features',
          'L7: path routing, TLS termination, header rules',
          'L7 can retry an idempotent request',
          'L4 preserves the connection end to end',
        ] },
        { type: 'note', value: 'Most web systems use an L7 balancer in front and may use L4 underneath. The right choice depends on what you need to inspect.' },
      ],
    },
    {
      id: 'sd-algorithms',
      title: 'Balancing algorithms',
      blocks: [
        { type: 'list', items: [
          'Round robin - simple, even when requests are uniform',
          'Least connections - better for uneven request times',
          'IP hash - same client to the same instance',
          'Weighted - larger instances get more traffic',
          'Consistent hashing - stable mapping when instances change',
        ] },
        { type: 'text', value: 'Least connections is a good default for APIs. Consistent hashing matters for caches and sharded data.' },
        { type: 'note', value: 'A load balancer that sticks a client to a dead instance is worse than no affinity. Health checks must remove failures quickly.' },
      ],
    },
    {
      id: 'sd-health-checks',
      title: 'Health checks and draining',
      blocks: [
        { type: 'text', value: 'A health check decides whether an instance receives traffic. A readiness check gates traffic; a liveness check restarts a stuck process. Draining lets in-flight requests finish before removal.' },
        { type: 'code', lang: 'text', tryIt: false, value: `readiness: GET /health -> 200 when DB reachable
liveness:  GET /live   -> 200 when process responsive

deploy:
  start new instance -> readiness passes -> add to pool
  -> remove old from pool -> drain -> stop` },
        { type: 'note', value: 'A health endpoint that only checks the process is not enough. It must verify the dependencies needed to serve traffic.' },
      ],
    },
    {
      id: 'sd-failure',
      title: 'Failure handling',
      blocks: [
        { type: 'list', items: [
          'Retry idempotent requests with backoff',
          'Use timeouts on every network call',
          'Circuit breakers stop hammering a failing service',
          'Bulkheads isolate one dependency from the rest',
          'Graceful degradation returns partial data',
        ] },
        { type: 'text', value: 'A retry storm can take down a service that was only briefly slow. Add jitter and a retry budget.' },
        { type: 'note', value: 'The load balancer is a critical component. Run it highly available or use a managed service.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'load-balancing',
      q: 'Which balancer can route by URL path?',
      options: ['L4', 'L7', 'DNS only', 'A switch'],
      answer: 1,
      explain: 'L7 understands HTTP requests.',
    },
    {
      chapterId: 'load-balancing',
      q: 'Which algorithm suits uneven request times?',
      options: ['Round robin', 'Least connections', 'IP hash', 'Random'],
      answer: 1,
      explain: 'It sends work to the least busy instance.',
    },
    {
      chapterId: 'load-balancing',
      q: 'What does a readiness check do?',
      options: ['Restarts the process', 'Gates traffic until the instance is ready', 'Encrypts traffic', 'Balances requests'],
      answer: 1,
      explain: 'Only ready instances receive traffic.',
    },
    {
      chapterId: 'load-balancing',
      q: 'Why add jitter to retries?',
      options: ['To look random', 'To prevent synchronized retry storms', 'To speed up DNS', 'To enable caching'],
      answer: 1,
      explain: 'Jitter spreads retries over time.',
    },
  ],
};
