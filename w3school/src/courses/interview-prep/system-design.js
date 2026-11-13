// Interview Prep chapter: System Design.

export default {
  id: 'system-design',
  title: 'System Design Interviews',
  description: 'Requirements, components and trade-offs',
  icon: 'account-tree',
  lessons: [
    {
      id: 'ip-design-structure',
      title: 'A structure that works',
      blocks: [
        { type: 'text', value: 'A design interview is a conversation. Clarify requirements, estimate scale, sketch the core components, then go deeper on the part the interviewer cares about.' },
        { type: 'code', lang: 'text', tryIt: false, value: `1. Requirements: users, features, scale
2. API: main endpoints
3. Data: entities and storage choice
4. High level: client, API, DB, cache
5. Deep dive: the hard part
6. Trade-offs and failure modes` },
        { type: 'note', value: 'Do not start drawing boxes before you know the scale. Ten users and ten million users need different designs.' },
      ],
    },
    {
      id: 'ip-design-scale',
      title: 'Scale numbers',
      blocks: [
        { type: 'text', value: 'Use rough numbers to choose a design. A request per second, a row count and a payload size are enough to reason about caching, indexes and sharding.' },
        { type: 'code', lang: 'text', tryIt: false, value: `10k daily users, 20 requests each = 200k/day
200k / 86400 ≈ 2.3 requests/sec average
Peak is often 5-10x average ≈ 12-23 req/sec` },
        { type: 'list', items: [
          'Start with the average and the peak',
          'Estimate storage per year',
          'Decide what can be cached',
          'Decide what must be strongly consistent',
        ] },
        { type: 'note', value: 'Order-of-magnitude reasoning is enough. Precision is not the point; choosing the right bottleneck is.' },
      ],
    },
    {
      id: 'ip-tradeoffs',
      title: 'Trade-offs',
      blocks: [
        { type: 'list', items: [
          'SQL vs NoSQL: transactions and joins vs flexible shape',
          'Cache: speed vs staleness',
          'Queue: decoupling vs eventual consistency',
          'Replicas: read scale vs lag',
          'Sharding: write scale vs operational cost',
        ] },
        { type: 'text', value: 'Every choice has a failure mode. Say what breaks and how you would detect it. That is what separates a senior answer from a diagram.' },
        { type: 'note', value: 'It is fine to say “I would start with a single database and add a cache when reads hurt”. Simple and honest beats over-engineered.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'system-design',
      q: 'What comes first in a design interview?',
      options: ['Drawing boxes', 'Clarifying requirements and scale', 'Choosing a database', 'Writing code'],
      answer: 1,
      explain: 'Requirements drive the design.',
    },
    {
      chapterId: 'system-design',
      q: 'Why estimate peak traffic?',
      options: ['For billing', 'To size the system for the busiest moment', 'To look smart', 'To skip caching'],
      answer: 1,
      explain: 'Peak traffic drives capacity.',
    },
    {
      chapterId: 'system-design',
      q: 'What is the trade-off of a cache?',
      options: ['Speed vs staleness', 'Cost vs security', 'Size vs colour', 'None'],
      answer: 0,
      explain: 'Caches trade freshness for speed.',
    },
    {
      chapterId: 'system-design',
      q: 'What separates a senior answer?',
      options: ['More boxes', 'Naming the failure mode and detection', 'A bigger diagram', 'Silence'],
      answer: 1,
      explain: 'Discuss failures and monitoring.',
    },
  ],
};
