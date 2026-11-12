// Redis chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Redis is, installation and redis-cli basics',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'redis-what-is',
      title: 'What is Redis?',
      blocks: [
        { type: 'text', value: 'Redis is an in-memory data store. It keeps data in RAM, so reads and writes are extremely fast, often under a millisecond. It is used as a cache, a session store, a rate limiter, a message broker and a real-time leaderboard.' },
        { type: 'list', items: [
          'In-memory: data lives in RAM for sub-millisecond latency',
          'Rich data structures: strings, lists, sets, sorted sets, hashes, streams',
          'Persistence: optional disk snapshots and append-only logs',
          'Replication and clustering for high availability',
          'Single-threaded command processing, so atomic operations are easy',
          'Used by almost every large web application',
        ] },
        { type: 'note', value: 'Redis is not a replacement for a primary database. It is a complement: the database is the source of truth, Redis is the fast layer on top.' },
      ],
    },
    {
      id: 'redis-install-cli',
      title: 'Install and connect',
      blocks: [
        { type: 'text', value: 'Install Redis from the official packages or use Docker. redis-cli is the command-line client. It connects to localhost:6379 by default.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Docker
docker run --name redis -p 6379:6379 -d redis:7

# Connect
redis-cli

# Basic commands
SET name "Ayesha"
GET name
DEL name
EXISTS name
KEYS user:*` },
        { type: 'note', value: 'KEYS scans the whole keyspace and blocks the server. In production use SCAN instead, which iterates incrementally.' },
      ],
    },
    {
      id: 'redis-strings-ttl',
      title: 'Strings and TTL',
      blocks: [
        { type: 'text', value: 'A Redis string can hold text, a number or binary data up to 512 MB. The EXPIRE command sets a time to live, after which the key is deleted automatically. TTL is the foundation of caching.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `SET session:abc "user:42" EX 3600   # expires in 1 hour
GET session:abc
TTL session:abc                    # seconds remaining

SET counter 0
INCR counter                       # atomic increment
INCRBY counter 5

SETNX lock:job "worker-1"          # set only if the key does not exist` },
        { type: 'note', value: 'SETNX is the building block of distributed locks. Always pair it with an expiry so a crashed worker cannot hold the lock forever.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is Redis primarily used for?',
      options: ['A primary relational database', 'An in-memory data store for caching and messaging', 'A search engine only', 'A file system'],
      answer: 1,
      explain: 'Redis is an in-memory store used as a cache, session store, rate limiter and broker.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why should you avoid KEYS in production?',
      options: ['It is slow and blocks the server', 'It deletes data', 'It is deprecated', 'It only works on strings'],
      answer: 0,
      explain: 'KEYS scans the whole keyspace. Use SCAN instead.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does EX 3600 do in SET key value EX 3600?',
      options: ['Sets the value to 3600', 'Sets a 3600 second expiry', 'Creates 3600 copies', 'Compresses the value'],
      answer: 1,
      explain: 'EX sets the time to live in seconds.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does SETNX do?',
      options: ['Sets a key to a number', 'Sets the key only if it does not already exist', 'Deletes the key', 'Increments the value'],
      answer: 1,
      explain: 'SETNX is set-if-not-exists.',
    },
  ],
};
