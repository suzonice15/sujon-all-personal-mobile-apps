// System Design chapter: Databases.

export default {
  id: 'databases',
  title: 'Databases',
  description: 'SQL, NoSQL, replication and sharding',
  icon: 'storage',
  lessons: [
    {
      id: 'sd-sql-nosql',
      title: 'SQL versus NoSQL',
      blocks: [
        { type: 'text', value: 'Both are valid depending on the access pattern. Choose by how the data is read and written, not by which is newer.' },
        { type: 'list', items: [
          'SQL: joins, constraints, transactions, strong schema',
          'Document: nested data, flexible schema',
          'Key-value: very fast simple lookups',
          'Wide-column: huge write volume',
          'Graph: relationship-heavy queries',
        ] },
        { type: 'text', value: 'Choose by access pattern, not by popularity. A relational database handles most products for a long time.' },
        { type: 'note', value: 'Polyglot persistence adds operational cost. Use more than one database only when the access pattern truly demands it.' },
      ],
    },
    {
      id: 'sd-replication',
      title: 'Replication',
      blocks: [
        { type: 'text', value: 'Replication copies data to other nodes. A primary accepts writes and replicas serve reads or stand by for failover. Replication improves read scale and availability.' },
        { type: 'code', lang: 'text', tryIt: false, value: `primary --replicate--> replica 1
                 \\------> replica 2
writes -> primary
reads  -> replicas (may be slightly stale)` },
        { type: 'note', value: 'Replicas lag. A read immediately after a write may miss the new value. Route critical reads to the primary or use a consistency token.' },
      ],
    },
    {
      id: 'sd-sharding',
      title: 'Sharding',
      blocks: [
        { type: 'text', value: 'Sharding splits data across nodes by a key. It scales writes and storage beyond one machine, but cross-shard queries and transactions become harder.' },
        { type: 'list', items: [
          'Range sharding - simple, can create hot spots',
          'Hash sharding - even distribution, hard range queries',
          'Directory sharding - a lookup service maps keys',
          'Choose a key with high cardinality and even access',
          'Resharding is expensive; plan for growth',
        ] },
        { type: 'note', value: 'Do not shard early. Exhaust indexes, caching and read replicas first. Sharding changes the entire application model.' },
      ],
    },
    {
      id: 'sd-cap-indexes',
      title: 'CAP and indexes',
      blocks: [
        { type: 'text', value: 'CAP says that during a network partition a system chooses consistency or availability. Most real systems are tunable and choose per operation.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Consistency: every read sees the latest write
Availability: every request gets a response
Partition tolerance: the system survives a network split` },
        { type: 'text', value: 'Indexes are the difference between a scan and a lookup. Every query pattern needs a matching index; every extra index costs write throughput.' },
        { type: 'note', value: 'A database that is fast in development with 1,000 rows may be unusable with 10 million. Test with realistic data and read query plans.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'databases',
      q: 'When is a relational database a good default?',
      options: ['When you need joins and transactions', 'When you need no schema', 'Only for images', 'Never'],
      answer: 0,
      explain: 'SQL databases excel at relational data and correctness.',
    },
    {
      chapterId: 'databases',
      q: 'What does a read replica help with?',
      options: ['Write throughput', 'Read scale and availability', 'Encryption', 'DNS'],
      answer: 1,
      explain: 'Replicas serve reads, offloading the primary.',
    },
    {
      chapterId: 'databases',
      q: 'What is a risk of sharding?',
      options: ['Cross-shard queries become harder', 'It removes indexes', 'It disables replication', 'It breaks DNS'],
      answer: 0,
      explain: 'Queries and transactions may need to span shards.',
    },
    {
      chapterId: 'databases',
      q: 'What does CAP trade off during a network partition?',
      options: ['A cache policy', 'Consistency and availability under a partition', 'A backup format', 'A shard key'],
      answer: 1,
      explain: 'Under a partition you trade consistency or availability.',
    },
  ],
};
