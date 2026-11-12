// Redis interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Redis?',
      a: 'An in-memory data store used as a cache, session store, rate limiter, message broker and real-time leaderboard.',
      level: 'basic',
    },
    {
      q: 'Why is Redis fast?',
      a: 'Data lives in RAM and commands are processed single-threaded, so there is no lock contention and no disk seek on the hot path.',
      level: 'basic',
    },
    {
      q: 'Is Redis a replacement for a primary database?',
      a: 'No. It complements the database. The database is the source of truth; Redis is the fast layer on top.',
      level: 'basic',
    },
    {
      q: 'What does a TTL do?',
      a: 'It sets an expiry on a key, after which Redis deletes it automatically. TTL is the foundation of caching.',
      level: 'basic',
    },
  ],
  'data-structures': [
    {
      q: 'Which data structure powers a leaderboard?',
      a: 'A sorted set (ZSET). Members are kept ordered by score, so top-N reads are fast.',
      level: 'basic',
    },
    {
      q: 'List versus set?',
      a: 'A list is an ordered sequence that allows duplicates. A set holds unique values with fast membership tests.',
      level: 'basic',
    },
    {
      q: 'Why store an object as a hash?',
      a: 'A hash maps fields to values under one key, so you can read or update one field without serializing the whole object.',
      level: 'intermediate',
    },
    {
      q: 'What is the maximum size of a Redis string?',
      a: '512 MB. Strings can hold text, numbers or binary data.',
      level: 'intermediate',
    },
  ],
  caching: [
    {
      q: 'How does cache-aside work?',
      a: 'The app checks Redis first. On a miss it reads from the database, writes the result to Redis with a TTL, and returns it.',
      level: 'basic',
    },
    {
      q: 'Cache-aside versus write-through?',
      a: 'Cache-aside fills the cache on a miss. Write-through updates cache and database on every write, so the cache is always fresh but writes are slower.',
      level: 'intermediate',
    },
    {
      q: 'What is the hardest part of caching?',
      a: 'Invalidation: keeping the cache consistent with the database when data changes.',
      level: 'intermediate',
    },
    {
      q: 'What does a low cache hit rate indicate?',
      a: 'The cache is not helping, often because of bad keys, short TTLs or a workload that does not repeat.',
      level: 'intermediate',
    },
  ],
  pubsub: [
    {
      q: 'What is the delivery guarantee of Pub/Sub?',
      a: 'Fire-and-forget. Messages are not stored, so offline subscribers miss them.',
      level: 'basic',
    },
    {
      q: 'What is a Redis Stream?',
      a: 'An append-only log of messages with IDs, consumer groups and acknowledgements. It persists messages.',
      level: 'intermediate',
    },
    {
      q: 'What does XACK do?',
      a: 'It acknowledges that a message was processed, so it is not redelivered.',
      level: 'basic',
    },
    {
      q: 'When use a Stream instead of Pub/Sub?',
      a: 'When missed messages are unacceptable, because Streams persist and redeliver.',
      level: 'intermediate',
    },
  ],
  'sessions-rate-limiting': [
    {
      q: 'Why store sessions in Redis?',
      a: 'App servers stay stateless, any server can read any session, and sessions survive a server restart.',
      level: 'basic',
    },
    {
      q: 'How do you implement a fixed-window rate limiter?',
      a: 'Use INCR on a key per time window and EXPIRE to delete it. Reject when the count exceeds the limit.',
      level: 'intermediate',
    },
    {
      q: 'Why is INCR safe for counters across servers?',
      a: 'Redis processes commands single-threaded, so INCR is atomic without locks.',
      level: 'intermediate',
    },
    {
      q: 'What status code should a rate-limited request return?',
      a: '429 Too Many Requests, with a Retry-After header.',
      level: 'basic',
    },
  ],
  'transactions-lua': [
    {
      q: 'What does MULTI do?',
      a: 'It queues commands that are executed atomically on EXEC. No other client can interleave.',
      level: 'basic',
    },
    {
      q: 'Why use a Lua script?',
      a: 'It runs atomically on the server and can apply logic across keys, which would be racy as separate commands.',
      level: 'intermediate',
    },
    {
      q: 'What does pipelining reduce?',
      a: 'Round-trip latency by sending many commands in one batch.',
      level: 'basic',
    },
    {
      q: 'Why keep Lua scripts short?',
      a: 'They block the server while running, so other commands must wait.',
      level: 'advanced',
    },
  ],
  'persistence-replication': [
    {
      q: 'RDB versus AOF?',
      a: 'RDB takes point-in-time snapshots. AOF logs every write. Use both for safety and fast recovery.',
      level: 'intermediate',
    },
    {
      q: 'What does appendfsync everysec mean?',
      a: 'Fsync the AOF once per second, which loses at most one second of writes on a crash.',
      level: 'intermediate',
    },
    {
      q: 'What does Redis Sentinel do?',
      a: 'It monitors primaries and replicas and performs automatic failover.',
      level: 'basic',
    },
    {
      q: 'Is Redis replication synchronous by default?',
      a: 'No, it is asynchronous. A failover can lose the last writes. Use WAIT for critical writes.',
      level: 'advanced',
    },
  ],
  'cluster-sentinel': [
    {
      q: 'How many hash slots does Redis Cluster use?',
      a: '16384. Each key maps to a slot by hashing.',
      level: 'basic',
    },
    {
      q: 'What is a hash tag?',
      a: 'Braces in a key name that force related keys to the same slot, so multi-key operations work.',
      level: 'intermediate',
    },
    {
      q: 'What is the minimum number of master nodes?',
      a: 'Three, for quorum.',
      level: 'basic',
    },
    {
      q: 'When prefer Sentinel over Cluster?',
      a: 'When one node can hold the data and you only need failover, because Sentinel is simpler.',
      level: 'intermediate',
    },
  ],
  security: [
    {
      q: 'What do ACLs provide?',
      a: 'Per-user permissions on commands and keys, introduced in Redis 6.',
      level: 'basic',
    },
    {
      q: 'Which eviction policy is common for a cache?',
      a: 'allkeys-lru, which evicts the least recently used keys.',
      level: 'basic',
    },
    {
      q: 'Why set a maxmemory limit?',
      a: 'To prevent Redis from consuming all RAM and crashing the server.',
      level: 'basic',
    },
    {
      q: 'Why rename dangerous commands in production?',
      a: 'To prevent accidental or malicious use of FLUSHALL, CONFIG and similar commands.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'What is the first thing to measure after adding a cache?',
      a: 'The cache hit rate and latency, to prove the cache helps.',
      level: 'basic',
    },
    {
      q: 'Why invalidate on write?',
      a: 'To prevent stale data from being served after an update.',
      level: 'intermediate',
    },
    {
      q: 'What makes a Redis portfolio project convincing?',
      a: 'A working cache with a measured hit rate and a rate limiter, plus a clear explanation.',
      level: 'basic',
    },
    {
      q: 'What is the best first Redis step for a beginner?',
      a: 'Install Redis, connect with redis-cli and practice the data structures.',
      level: 'basic',
    },
  ],
};
