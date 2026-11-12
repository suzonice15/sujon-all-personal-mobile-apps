// Redis chapter: Sessions and Rate Limiting.

export default {
  id: 'sessions-rate-limiting',
  title: 'Sessions & Rate Limiting',
  description: 'Session stores, counters and sliding windows',
  icon: 'speed',
  lessons: [
    {
      id: 'redis-sessions',
      title: 'Session store',
      blocks: [
        { type: 'text', value: 'Storing sessions in Redis keeps the app servers stateless. Any server can read any session, and a session survives a server restart. Use a hash for the session data and set a TTL.' },
        { type: 'code', lang: 'python', tryIt: false, value: `import redis, json

r = redis.Redis()

def create_session(user_id):
    sid = generate_id()
    r.hset(f"session:{sid}", mapping={"user_id": user_id, "created": now()})
    r.expire(f"session:{sid}", 3600)
    return sid

def get_user(sid):
    data = r.hgetall(f"session:{sid}")
    return int(data[b"user_id"]) if data else None` },
        { type: 'note', value: 'Use a separate Redis database or key prefix for sessions so they do not collide with cache keys.' },
      ],
    },
    {
      id: 'redis-rate-limiting',
      title: 'Rate limiting',
      blocks: [
        { type: 'text', value: 'A fixed-window counter increments a key per time window. A sliding window is more accurate but uses more memory. Both are simple with INCR and EXPIRE.' },
        { type: 'code', lang: 'python', tryIt: false, value: `def allow_request(user_id, limit=100, window=60):
    key = f"rate:{user_id}:{int(time.time()) // window}"
    count = r.incr(key)
    if count == 1:
        r.expire(key, window)
    return count <= limit` },
        { type: 'list', items: [
          'Fixed window: simple, but allows bursts at window boundaries',
          'Sliding window: smoother, uses a sorted set of timestamps',
          'Token bucket: allows bursts up to a capacity',
          'Always return 429 Too Many Requests with a Retry-After header',
        ] },
      ],
    },
    {
      id: 'redis-counters',
      title: 'Counters and leaderboards',
      blocks: [
        { type: 'text', value: 'INCR is atomic, so counters are safe across many servers without locks. Sorted sets make leaderboards: ZINCRBY adds to a score and ZREVRANGE reads the top N.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `INCR page:views:home
INCRBY page:views:home 5

ZINCRBY leaderboard 10 "Ayesha"
ZREVRANGE leaderboard 0 9 WITHSCORES   # top 10
ZREVRANK leaderboard "Ayesha"          # position (0-based)` },
        { type: 'note', value: 'Redis is single-threaded, so INCR and ZINCRBY are atomic without any lock. That is a big reason to use it for counters.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'sessions-rate-limiting',
      q: 'Why store sessions in Redis?',
      options: ['It is cheaper', 'App servers stay stateless and sessions survive restarts', 'It removes the need for a database', 'It is required by HTTP'],
      answer: 1,
      explain: 'Any server can read any session.',
    },
    {
      chapterId: 'sessions-rate-limiting',
      q: 'What makes a fixed-window rate limiter inaccurate?',
      options: ['It is too slow', 'Bursts at window boundaries can exceed the limit', 'It needs a database', 'It only works for one user'],
      answer: 1,
      explain: 'A burst at the boundary can double the allowed rate.',
    },
    {
      chapterId: 'sessions-rate-limiting',
      q: 'Why is INCR safe for counters across many servers?',
      options: ['It uses locks', 'Redis processes commands one at a time, so INCR is atomic', 'It is slow enough to serialize', 'It needs a transaction'],
      answer: 1,
      explain: 'Single-threaded command processing makes INCR atomic.',
    },
    {
      chapterId: 'sessions-rate-limiting',
      q: 'Which status code should a rate-limited request return?',
      options: ['200', '404', '429 Too Many Requests', '500'],
      answer: 2,
      explain: '429 tells the client to slow down.',
    },
  ],
};
