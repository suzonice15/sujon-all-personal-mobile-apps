// System Design chapter: Case Study - URL Shortener.

export default {
  id: 'case-study-url',
  title: 'Case Study: URL Shortener',
  description: 'Design a read-heavy redirect service',
  icon: 'link',
  lessons: [
    {
      id: 'sd-url-requirements',
      title: 'Requirements and estimation',
      blocks: [
        { type: 'text', value: 'A URL shortener maps a short code to a long URL. The redirect is the hot path: read-heavy, latency sensitive and must be highly available.' },
        { type: 'list', items: [
          'Create a short URL from a long URL',
          'Redirect a short code to the original',
          'Track click counts and basic stats',
          'Optional expiry and custom aliases',
          '100:1 read-to-write ratio is typical',
        ] },
        { type: 'code', lang: 'text', tryIt: false, value: `100M new URLs/day? No: assume 1M/day
1M writes/day ~= 12 writes/s
100:1 reads ~= 1,200 reads/s average
Peak 5x ~= 6,000 reads/s
Storage: 1M * 500 bytes ~= 500 MB/day` },
        { type: 'note', value: 'The redirect must be fast and available. The create path can be slower and can tolerate a queue.' },
      ],
    },
    {
      id: 'sd-url-api',
      title: 'API and data model',
      blocks: [
        { type: 'code', lang: 'text', tryIt: false, value: `POST /api/v1/urls
  { "longUrl": "https://example.com/..." }
  -> 201 { "code": "abc123", "shortUrl": "https://cn/abc123" }

GET /abc123
  -> 302 Location: https://example.com/...

Table urls:
  code PK, longUrl, ownerId, createdAt, expiresAt, clicks` },
        { type: 'text', value: 'Generate the code with a counter encoded in base62, a random string with a collision check, or a hash. A counter is short and predictable; random is harder to enumerate.' },
        { type: 'note', value: 'A unique index on code is mandatory. Two writers must never create the same code.' },
      ],
    },
    {
      id: 'sd-url-scale',
      title: 'Scaling and caching',
      blocks: [
        { type: 'text', value: 'The redirect is a key-value lookup by code. Cache the hottest codes in Redis or at the edge. The database stores the full record.' },
        { type: 'code', lang: 'text', tryIt: false, value: `GET /abc123
  -> edge cache hit? return 302
  -> Redis hit? return 302
  -> database lookup -> cache -> 302

writes: API -> unique code -> DB -> invalidate/update cache` },
        { type: 'list', items: [
          'Read replicas for the database',
          'Cache negative lookups briefly',
          'Rate limit the create endpoint',
          'Use a CDN for the redirect if possible',
          'Partition by code if the table grows huge',
        ] },
        { type: 'note', value: 'A click counter updated on every redirect would overload the database. Buffer counts and flush them in batches, or write an event to a queue.' },
      ],
    },
    {
      id: 'sd-url-failure',
      title: 'Failure modes',
      blocks: [
        { type: 'list', items: [
          'Cache down: database takes the load; rate limit and degrade',
          'Code collision: retry generation, unique index protects',
          'Hot URL: cache it and consider a short TTL',
          'Abuse: rate limit creation, scan for malicious URLs',
          'Expired link: return 410 Gone or a clear page',
          'Database failover: promote a replica, retry idempotent reads',
        ] },
        { type: 'note', value: 'The redirect path should not depend on the analytics path. If click tracking fails, the redirect must still work.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'case-study-url',
      q: 'Which operation is the hot path?',
      options: ['Creating a URL', 'Redirecting a code', 'Generating a report', 'Deleting a URL'],
      answer: 1,
      explain: 'Reads outnumber writes heavily.',
    },
    {
      chapterId: 'case-study-url',
      q: 'Why is a unique index on code required?',
      options: ['To sort codes', 'To prevent collisions', 'To enable HTTPS', 'To count clicks'],
      answer: 1,
      explain: 'Two writers must not create the same code.',
    },
    {
      chapterId: 'case-study-url',
      q: 'How should click counts be handled at scale?',
      options: ['Update the row on every redirect', 'Buffer or queue events and batch updates', 'Never count', 'Store in the cache only'],
      answer: 1,
      explain: 'Per-request updates would overload the database.',
    },
    {
      chapterId: 'case-study-url',
      q: 'What should happen if analytics fails?',
      options: ['Redirect fails', 'Redirect still works', 'The database shuts down', 'Users are logged out'],
      answer: 1,
      explain: 'The core redirect must be independent of analytics.',
    },
  ],
};
