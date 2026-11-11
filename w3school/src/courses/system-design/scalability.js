// System Design chapter: Scalability.

export default {
  id: 'scalability',
  title: 'Scalability',
  description: 'Vertical, horizontal and stateless services',
  icon: 'trending-up',
  lessons: [
    {
      id: 'sd-vertical-horizontal',
      title: 'Vertical versus horizontal',
      blocks: [
        { type: 'text', value: 'Vertical scaling makes one machine bigger. Horizontal scaling adds more machines. Vertical is simpler but has a hard limit and a single point of failure.' },
        { type: 'list', items: [
          'Vertical: more CPU, RAM, faster disk',
          'Horizontal: more instances behind a load balancer',
          'Vertical is limited by hardware and cost',
          'Horizontal needs stateless services and shared state',
        ] },
        { type: 'note', value: 'Start vertical. It is surprising how far one well-tuned server goes. Move to horizontal when you have a measured limit.' },
      ],
    },
    {
      id: 'sd-stateless',
      title: 'Stateless services',
      blocks: [
        { type: 'text', value: 'An API instance should not hold user session data in memory. Any instance must be able to serve any request. State belongs in a database, cache or token.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Bad:  instance memory -> session for user 42
Good: token or shared session store -> any instance` },
        { type: 'note', value: 'Sticky sessions work but make scaling and deploys harder. Prefer stateless services with shared state.' },
      ],
    },
    {
      id: 'sd-autoscaling',
      title: 'Autoscaling',
      blocks: [
        { type: 'text', value: 'Autoscaling adds instances when a metric rises and removes them when it falls. It needs a fast startup, a health check and a sensible cooldown.' },
        { type: 'list', items: [
          'Scale on CPU, memory, request rate or queue depth',
          'Warm up before receiving traffic',
          'Set a minimum for baseline traffic',
          'Set a maximum to protect the budget',
          'Avoid flapping with cooldowns',
        ] },
        { type: 'note', value: 'A slow-starting app reacts too late to a spike. Pre-warm instances or keep a small buffer.' },
      ],
    },
    {
      id: 'sd-bottlenecks',
      title: 'Finding the bottleneck',
      blocks: [
        { type: 'text', value: 'Scaling the wrong layer wastes money. Measure request rate, latency, error rate and saturation for every layer: load balancer, app, cache, database.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Traffic up -> app CPU high? add app instances.
App idle but DB CPU high? add read replicas or indexes.
DB fine but cache miss rate high? fix keys or TTL.
Queue growing? add workers or slow producers.` },
        { type: 'note', value: 'The bottleneck moves. After fixing the app, the database may become the limit. Re-measure after every change.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'scalability',
      q: 'What is horizontal scaling?',
      options: ['A bigger server', 'More server instances', 'A faster disk', 'A larger database'],
      answer: 1,
      explain: 'It adds machines rather than resizing one.',
    },
    {
      chapterId: 'scalability',
      q: 'Why should API services be stateless?',
      options: ['Any instance can serve any request', 'It reduces code', 'It removes the database', 'It enables HTTPS'],
      answer: 0,
      explain: 'Shared state belongs outside the instance.',
    },
    {
      chapterId: 'scalability',
      q: 'What does autoscaling need to work well?',
      options: ['Slow startup', 'Fast startup and a health check', 'Sticky sessions', 'A single instance'],
      answer: 1,
      explain: 'New instances must become ready quickly.',
    },
    {
      chapterId: 'scalability',
      q: 'How do you find the real bottleneck?',
      options: ['Guess', 'Measure each layer', 'Add servers first', 'Rewrite everything'],
      answer: 1,
      explain: 'Metrics show which layer is saturated.',
    },
  ],
};
