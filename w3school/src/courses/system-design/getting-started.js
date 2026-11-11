// System Design chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Components, trade-offs and back-of-the-envelope math',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'sd-what-is',
      title: 'What is system design?',
      blocks: [
        { type: 'text', value: 'System design is choosing components and how they communicate so a system meets its requirements under load and failure. There is no single correct answer, only trade-offs.' },
        { type: 'list', items: [
          'Clients, APIs, services, databases, caches and queues',
          'Functional requirements: what the system does',
          'Non-functional requirements: scale, latency, availability, cost',
          'Failure modes: what happens when a component dies',
        ] },
        { type: 'note', value: 'Interviewers care about your reasoning more than the diagram. State assumptions, compare options and justify the choice.' },
      ],
    },
    {
      id: 'sd-estimation',
      title: 'Back-of-the-envelope estimation',
      blocks: [
        { type: 'text', value: 'Rough numbers expose design problems early. Estimate users, requests per second, storage per year and bandwidth. Exact values do not matter; the order of magnitude does.' },
        { type: 'code', lang: 'text', tryIt: false, value: `10 million users, 10% daily active = 1M DAU
Each user makes 10 requests/day = 10M requests/day
10M / 86,400 s ~= 116 requests/s average
Peak is often 3-5x average ~= 350-600 req/s

Storage: 1M new records/day * 1 KB = 1 GB/day
= 365 GB/year before replication` },
        { type: 'note', value: 'Use 100,000 seconds per day as a shortcut. 1M requests per day is about 12 requests per second.' },
      ],
    },
    {
      id: 'sd-tradeoffs',
      title: 'Trade-offs',
      blocks: [
        { type: 'list', items: [
          'Latency versus consistency',
          'Availability versus strong consistency (CAP)',
          'Cost versus redundancy',
          'Simplicity versus flexibility',
          'Build versus buy',
        ] },
        { type: 'text', value: 'Every added component adds a failure mode. A single database is simple but a single point of failure; a distributed system is resilient but much harder to operate.' },
        { type: 'note', value: 'Start simple and add complexity only for a requirement you can name. "We may need it later" is not a requirement.' },
      ],
    },
    {
      id: 'sd-components',
      title: 'The common building blocks',
      blocks: [
        { type: 'list', items: [
          'DNS and CDN for name resolution and static content',
          'Load balancer to spread traffic',
          'API servers, stateless and horizontally scaled',
          'Cache to absorb repeated reads',
          'Database with replication and sharding',
          'Queue for asynchronous work',
          'Object storage for files and images',
          'Monitoring and logging for operations',
        ] },
        { type: 'code', lang: 'text', tryIt: false, value: `client -> DNS -> CDN -> load balancer
       -> API service -> cache -> database
                      -> queue -> worker -> database` },
        { type: 'note', value: 'Most designs reuse this shape. The interesting part is where the data lives, what is cached, and what happens when a component fails.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is a non-functional requirement?',
      options: ['A feature', 'Scale, latency and availability', 'A UI color', 'A database table'],
      answer: 1,
      explain: 'It describes qualities of the system, not a feature.',
    },
    {
      chapterId: 'getting-started',
      q: '1 million requests per day is roughly how many per second?',
      options: ['1', '12', '120', '1000'],
      answer: 1,
      explain: '1,000,000 / 86,400 is about 12.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why avoid unnecessary components?',
      options: ['They cost money only', 'Each one adds a failure mode and operational cost', 'They slow the compiler', 'They are not allowed'],
      answer: 1,
      explain: 'Complexity has a reliability and maintenance cost.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does CAP describe?',
      options: ['A caching policy', 'Consistency, availability and partition tolerance trade-offs', 'A network cable', 'A database schema'],
      answer: 1,
      explain: 'Under a network partition you must choose consistency or availability.',
    },
  ],
};
