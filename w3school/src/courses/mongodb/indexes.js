// MongoDB chapter: Indexes.

export default {
  id: 'indexes',
  title: 'Indexes',
  description: 'Single, compound, unique and TTL indexes',
  icon: 'speed',
  lessons: [
    {
      id: 'mongo-single-index',
      title: 'Single-field indexes',
      blocks: [
        { type: 'text', value: 'An index speeds up reads on the indexed field. Without one, MongoDB scans every document. Every extra index adds work to writes and uses memory.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.createIndex({ title: 1 })
db.courses.find({ title: 'SQL' }).explain('executionStats')

db.courses.getIndexes()
db.courses.dropIndex('title_1')` },
        { type: 'note', value: 'explain tells you whether the query used an index (IXSCAN) or scanned the collection (COLLSCAN). Read it before adding indexes.' },
      ],
    },
    {
      id: 'mongo-compound-index',
      title: 'Compound indexes',
      blocks: [
        { type: 'text', value: 'A compound index covers several fields. The order matters: it supports queries that use a prefix of the index. Equality fields first, then sort, then range.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.createIndex({ level: 1, price: -1 })

// Uses the index
db.courses.find({ level: 'beginner', price: { $gte: 3000 } })

// Does not use it well (missing the prefix)
db.courses.find({ price: { $gte: 3000 } })` },
        { type: 'note', value: 'The ESR rule: Equality, Sort, Range. It is a good default for designing compound indexes.' },
      ],
    },
    {
      id: 'mongo-unique-ttl',
      title: 'Unique and TTL indexes',
      blocks: [
        { type: 'text', value: 'A unique index rejects duplicates. A TTL index removes documents after a time, which is useful for sessions, OTPs and caches.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.users.createIndex({ email: 1 }, { unique: true })
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })` },
        { type: 'note', value: 'A TTL monitor runs in the background, so deletion is not immediate. Do not use TTL for anything that must happen at an exact second.' },
      ],
    },
    {
      id: 'mongo-index-cost',
      title: 'Index cost',
      blocks: [
        { type: 'list', items: [
          'Indexes speed up reads on the indexed pattern',
          'Every write updates every index',
          'Indexes use RAM and disk',
          'Low-cardinality fields are poor single indexes',
          'Unused indexes are pure cost; review them',
          'Build large indexes in the background where possible',
        ] },
        { type: 'text', value: 'Index for the queries you actually run. A collection with ten indexes and one query is a smell.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'indexes',
      q: 'What does COLLSCAN mean?',
      options: ['The query used an index', 'The collection was scanned', 'The index was rebuilt', 'The query failed'],
      answer: 1,
      explain: 'COLLSCAN reads every document.',
    },
    {
      chapterId: 'indexes',
      q: 'What is the ESR rule?',
      options: ['Equality, Sort, Range', 'Every, Single, Row', 'Embed, Shard, Replicate', 'Extract, Sort, Reduce'],
      answer: 0,
      explain: 'Order compound index fields as equality, sort, then range.',
    },
    {
      chapterId: 'indexes',
      q: 'What does a TTL index do?',
      options: ['Encrypts documents', 'Removes documents after a time', 'Speeds up writes', 'Creates a backup'],
      answer: 1,
      explain: 'MongoDB deletes expired documents in the background.',
    },
    {
      chapterId: 'indexes',
      q: 'What is the cost of an extra index?',
      options: ['Nothing', 'Slower writes and more memory', 'Only slower reads', 'More collections'],
      answer: 1,
      explain: 'Every write must update the index.',
    },
  ],
};
