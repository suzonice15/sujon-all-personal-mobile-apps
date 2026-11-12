// Redis chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a caching and rate-limiting layer and prepare for interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'redis-project-cache',
      title: 'Project: cache a courses API',
      blocks: [
        { type: 'text', value: 'Add a Redis cache to a courses API. Use cache-aside with a 5-minute TTL, invalidate on update, and add a rate limiter on the search endpoint. Measure the hit rate and the latency improvement.' },
        { type: 'code', lang: 'python', tryIt: false, value: `def get_course(course_id):
    key = f"course:{course_id}"
    cached = redis.get(key)
    if cached:
        return json.loads(cached)

    course = db.query("SELECT * FROM courses WHERE id = %s", course_id)
    redis.setex(key, 300, json.dumps(course))
    return course

def update_course(course_id, new_price):
    db.execute("UPDATE courses SET price = %s WHERE id = %s", new_price, course_id)
    redis.delete(f"course:{course_id}")` },
        { type: 'list', items: [
          'Measure cache hit rate and p95 latency before and after',
          'Invalidate on write, not only on TTL',
          'Add a rate limiter with INCR and EXPIRE',
          'Use a separate key prefix for cache and sessions',
        ] },
        { type: 'note', value: 'A cache that is never measured is a guess. Track hit rate and latency, and remove the cache if it does not help.' },
      ],
    },
    {
      id: 'redis-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'When would you use Redis instead of a database?',
          'Cache-aside versus write-through?',
          'How do you handle cache invalidation?',
          'How does a sorted set power a leaderboard?',
          'What is the difference between Pub/Sub and Streams?',
          'How would you implement a rate limiter?',
          'What is a Lua script used for?',
          'How does Redis Cluster shard data?',
        ] },
        { type: 'text', value: 'Strong answers name the mechanism and the trade-off. "Cache-aside is simple and keeps Redis stateless, but it can serve stale data until the TTL expires" is a complete answer.' },
        { type: 'note', value: 'Be ready to design a caching layer for a given API and to explain the invalidation strategy.' },
      ],
    },
    {
      id: 'redis-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: install Redis, learn the data structures',
          'Week 2: caching patterns and TTL',
          'Week 3: sessions and rate limiting',
          'Week 4: Pub/Sub and Streams',
          'Week 5: transactions, Lua and pipelining',
          'Week 6: persistence, replication and Sentinel',
          'Week 7: clustering and security',
          'Week 8: add a cache layer to one real project',
        ] },
        { type: 'note', value: 'Redis is easy to start and hard to master. Spend time on invalidation and monitoring, not only on commands.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What is the first thing to measure after adding a cache?',
      options: ['The logo size', 'The cache hit rate and latency', 'The database password', 'The number of keys only'],
      answer: 1,
      explain: 'Hit rate and latency prove the cache helps.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why invalidate on write?',
      options: ['To make writes slower', 'To prevent stale data from being served', 'To delete the database', 'To compress values'],
      answer: 1,
      explain: 'Invalidation keeps the cache consistent.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a Redis portfolio project convincing?',
      options: ['Many unused keys', 'A working cache with measured hit rate and a rate limiter', 'A copied tutorial', 'No monitoring'],
      answer: 1,
      explain: 'A measured, working cache shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first Redis step for a beginner?',
      options: ['Clustering', 'Install, connect with redis-cli and practice the data structures', 'Lua scripting', 'Replication'],
      answer: 1,
      explain: 'Start with the basics and build up.',
    },
  ],
};
