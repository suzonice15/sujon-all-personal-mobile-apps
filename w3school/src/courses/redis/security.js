// Redis chapter: Security.

export default {
  id: 'security',
  title: 'Security',
  description: 'Authentication, ACLs, TLS and network protection',
  icon: 'lock',
  lessons: [
    {
      id: 'redis-auth',
      title: 'Authentication and ACLs',
      blocks: [
        { type: 'text', value: 'Redis 6 introduced ACLs: per-user permissions on commands and keys. Always set a password, restrict dangerous commands, and never expose Redis to the public internet.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# redis.conf
requirepass "a-long-random-password"

# Create a read-only user
ACL SETUSER reader on >readerpass ~* +@read -@dangerous
ACL LIST` },
        { type: 'note', value: 'Rename or disable FLUSHALL, FLUSHDB, CONFIG and DEBUG in production to prevent accidental or malicious damage.' },
      ],
    },
    {
      id: 'redis-tls-network',
      title: 'TLS and network protection',
      blocks: [
        { type: 'text', value: 'Enable TLS for connections over untrusted networks. Bind Redis to localhost or a private network, and use a firewall to block port 6379 from the internet.' },
        { type: 'code', lang: 'text', tryIt: false, value: `# redis.conf
bind 127.0.0.1
protected-mode yes
port 0
tls-port 6379
tls-cert-file /etc/redis/redis.crt
tls-key-file /etc/redis/redis.key` },
        { type: 'list', items: [
          'Bind to localhost or a private IP',
          'Enable protected mode',
          'Use TLS for remote connections',
          'Firewall port 6379 from the public internet',
          'Rotate passwords and keys regularly',
        ] },
      ],
    },
    {
      id: 'redis-memory-limits',
      title: 'Memory limits and eviction',
      blocks: [
        { type: 'text', value: 'Set a maxmemory limit so Redis cannot consume all RAM. Choose an eviction policy that matches your use case: allkeys-lru evicts the least recently used keys, which is the common choice for a cache.' },
        { type: 'code', lang: 'text', tryIt: false, value: `maxmemory 2gb
maxmemory-policy allkeys-lru` },
        { type: 'list', items: [
          'noeviction - return errors when memory is full',
          'allkeys-lru - evict least recently used keys',
          'volatile-lru - evict LRU keys that have a TTL',
          'allkeys-lfu - evict least frequently used keys',
        ] },
        { type: 'note', value: 'Without a maxmemory limit, Redis can consume all available RAM and crash the server.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'security',
      q: 'What do ACLs provide?',
      options: ['Faster queries', 'Per-user permissions on commands and keys', 'Encryption', 'Replication'],
      answer: 1,
      explain: 'ACLs restrict which commands and keys each user can access.',
    },
    {
      chapterId: 'security',
      q: 'Which eviction policy is common for a cache?',
      options: ['noeviction', 'allkeys-lru', 'volatile-ttl', 'random'],
      answer: 1,
      explain: 'allkeys-lru evicts the least recently used keys.',
    },
    {
      chapterId: 'security',
      q: 'Why set a maxmemory limit?',
      options: ['To speed up queries', 'To prevent Redis from consuming all RAM', 'To enable replication', 'To compress data'],
      answer: 1,
      explain: 'Without a limit, Redis can crash the server.',
    },
    {
      chapterId: 'security',
      q: 'Why rename FLUSHALL in production?',
      options: ['It is slow', 'To prevent accidental or malicious data deletion', 'It is deprecated', 'It uses too much memory'],
      answer: 1,
      explain: 'Renaming dangerous commands reduces risk.',
    },
  ],
};
