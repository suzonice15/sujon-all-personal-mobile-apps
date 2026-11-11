// System Design chapter: Caching.

export default {
  id: 'caching',
  title: 'Caching',
  description: 'Layers, eviction and invalidation',
  icon: 'bolt',
  lessons: [
    {
      id: 'sd-cache-layers',
      title: 'Cache layers',
      blocks: [
        { type: 'text', value: 'A cache stores a copy of data closer to the reader. It trades freshness and memory for speed. Most systems use several layers.' },
        { type: 'list', items: [
          'Browser cache - on the user device',
          'CDN - static assets close to the user',
          'Application cache - Redis or memcached',
          'Database cache - query and buffer cache',
          'CPU cache - not your concern at design level',
        ] },
        { type: 'note', value: 'The fastest request is the one that never reaches your server. A CDN and correct Cache-Control headers can remove most static traffic.' },
      ],
    },
    {
      id: 'sd-eviction',
      title: 'Eviction and TTL',
      blocks: [
        { type: 'text', value: 'A cache is finite. Eviction decides what to remove: least recently used, least frequently used or a time to live. TTL bounds staleness and protects memory.' },
        { type: 'code', lang: 'text', tryIt: false, value: `GET course:42
  hit  -> return cached value
  miss -> read database -> SET course:42 with TTL -> return` },
        { type: 'note', value: 'A cache with no TTL and no eviction policy will eventually run out of memory. Set both.' },
      ],
    },
    {
      id: 'sd-invalidation',
      title: 'Invalidation',
      blocks: [
        { type: 'text', value: 'Invalidation is the hard part. Options: write-through (update cache and DB), write-behind (async), or delete the key on write and let the next read refill.' },
        { type: 'list', items: [
          'Delete on write, read-through on miss - simple and common',
          'Short TTL - accepts brief staleness',
          'Versioned keys - a new version starts cold',
          'Event-driven invalidation - accurate but more moving parts',
        ] },
        { type: 'note', value: 'A cache stampede happens when a hot key expires and many requests hit the database at once. Use a lock or serve stale data while one request refills.' },
      ],
    },
    {
      id: 'sd-cache-failure',
      title: 'Cache failure',
      blocks: [
        { type: 'text', value: 'If the cache disappears, the database gets the full load. Protect it with rate limits, a smaller fallback cache and a warm-up plan.' },
        { type: 'list', items: [
          'Cache is not the source of truth',
          'Plan for a cold cache after a deploy',
          'Use consistent hashing to limit reshuffling',
          'Monitor hit rate and latency',
          'Never store the only copy of data in a cache',
        ] },
        { type: 'note', value: 'A cache outage should degrade latency, not destroy correctness. If losing the cache corrupts data, the design is wrong.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'caching',
      q: 'What does a CDN cache?',
      options: ['Database rows', 'Static assets close to users', 'User passwords', 'Queue messages'],
      answer: 1,
      explain: 'A CDN serves images, scripts and other static files from edge locations.',
    },
    {
      chapterId: 'caching',
      q: 'What does TTL control?',
      options: ['How long a cached value lives', 'The cache size', 'The database index', 'The network port'],
      answer: 0,
      explain: 'After the TTL the entry is stale and must be refreshed.',
    },
    {
      chapterId: 'caching',
      q: 'What is a cache stampede?',
      options: ['A cache write', 'Many requests hitting the database when a hot key expires', 'A CDN purge', 'A memory leak'],
      answer: 1,
      explain: 'A lock or stale-while-revalidate prevents the stampede.',
    },
    {
      chapterId: 'caching',
      q: 'What should happen if the cache is lost?',
      options: ['Data is lost', 'Only latency degrades', 'The database is deleted', 'Users are logged out'],
      answer: 1,
      explain: 'The cache is not the source of truth.',
    },
  ],
};
