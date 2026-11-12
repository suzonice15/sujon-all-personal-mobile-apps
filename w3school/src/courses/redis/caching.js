// Redis chapter: Caching Patterns.

export default {
  id: 'caching',
  title: 'Caching Patterns',
  description: 'Cache-aside, write-through, TTL and invalidation',
  icon: 'cached',
  lessons: [
    {
      id: 'redis-cache-aside',
      title: 'Cache-aside',
      blocks: [
        { type: 'text', value: 'The application checks Redis first. On a miss it reads from the database, writes the result to Redis with a TTL, and returns it. This is the most common pattern and keeps Redis simple.' },
        { type: 'code', lang: 'python', tryIt: false, value: `def get_course(course_id):
    key = f"course:{course_id}"
    cached = redis.get(key)
    if cached:
        return json.loads(cached)

    course = db.query("SELECT * FROM courses WHERE id = %s", course_id)
    redis.setex(key, 300, json.dumps(course))   # cache for 5 minutes
    return course` },
        { type: 'note', value: 'Cache-aside can serve stale data until the TTL expires. For data that changes, combine it with explicit invalidation.' },
      ],
    },
    {
      id: 'redis-write-through',
      title: 'Write-through and write-behind',
      blocks: [
        { type: 'text', value: 'Write-through updates Redis and the database together on every write, so the cache is always fresh. Write-behind updates Redis immediately and writes to the database asynchronously, which is faster but risks data loss.' },
        { type: 'list', items: [
          'Cache-aside: app manages both reads and writes',
          'Write-through: every write goes to cache and database',
          'Write-behind: write to cache, queue the database write',
          'Refresh-ahead: refresh a key before it expires',
        ] },
        { type: 'note', value: 'Write-through is simpler and safer. Write-behind is faster but needs a queue and a retry mechanism for failed database writes.' },
      ],
    },
    {
      id: 'redis-ttl-invalidation',
      title: 'TTL and invalidation',
      blocks: [
        { type: 'text', value: 'A TTL makes stale data disappear on its own. For data that must be fresh, delete the cache key when the underlying data changes. Invalidation is the hard part of caching.' },
        { type: 'code', lang: 'python', tryIt: false, value: `def update_course(course_id, new_price):
    db.execute("UPDATE courses SET price = %s WHERE id = %s", new_price, course_id)
    redis.delete(f"course:{course_id}")   # invalidate so the next read refetches

# Set a TTL as a safety net even with invalidation
redis.setex(f"course:{course_id}", 300, json.dumps(course))` },
        { type: 'list', items: [
          'TTL is a safety net, not a strategy',
          'Invalidate on write, not on a timer, for correctness',
          'Tag-based invalidation: delete all keys with a tag',
          'Monitor the hit rate; a low hit rate means the cache is not helping',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'caching',
      q: 'In cache-aside, what happens on a cache miss?',
      options: ['The app returns an error', 'The app reads from the database, caches the result and returns it', 'Redis queries the database', 'The cache is deleted'],
      answer: 1,
      explain: 'The application fills the cache on a miss.',
    },
    {
      chapterId: 'caching',
      q: 'What is the risk of write-behind caching?',
      options: ['It is too slow', 'A crash can lose writes that were not yet saved to the database', 'It needs more memory', 'It disables TTL'],
      answer: 1,
      explain: 'Write-behind queues database writes, so a crash loses them.',
    },
    {
      chapterId: 'caching',
      q: 'Why set a TTL even when you invalidate on write?',
      options: ['TTL is required', 'It acts as a safety net if invalidation is missed', 'It makes writes faster', 'It compresses data'],
      answer: 1,
      explain: 'A TTL prevents stale data from living forever.',
    },
    {
      chapterId: 'caching',
      q: 'What does a low cache hit rate indicate?',
      options: ['The cache is too big', 'The cache is not helping, often because of bad keys or short TTLs', 'Redis is down', 'The database is fast'],
      answer: 1,
      explain: 'A low hit rate means most requests still hit the database.',
    },
  ],
};
