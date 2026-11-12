// Redis chapter: Data Structures.

export default {
  id: 'data-structures',
  title: 'Data Structures',
  description: 'Lists, sets, sorted sets and hashes',
  icon: 'view-list',
  lessons: [
    {
      id: 'redis-lists',
      title: 'Lists',
      blocks: [
        { type: 'text', value: 'A Redis list is a linked list of strings. Use it for queues, recent activity feeds and timelines. LPUSH and RPUSH add to either end; LPOP and RPOP remove. LINDEX reads by position.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `LPUSH recent:ayesha "Read SQL lesson"
LPUSH recent:ayesha "Completed quiz"
LRANGE recent:ayesha 0 9        # latest 10, newest first

# A simple queue
RPUSH queue:emails "welcome@example.com"
LPOP queue:emails` },
        { type: 'note', value: 'Lists can grow very large. Trim them with LTRIM to keep only the recent N items, which is the standard pattern for activity feeds.' },
      ],
    },
    {
      id: 'redis-sets',
      title: 'Sets and sorted sets',
      blocks: [
        { type: 'text', value: 'A set holds unique strings with fast membership tests and set operations such as union and intersection. A sorted set (ZSET) attaches a score to each member and keeps them ordered by score. Sorted sets power leaderboards and priority queues.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `SADD tags:course:sql "database" "backend"
SISMEMBER tags:course:sql "database"   # 1
SINTER tags:course:sql tags:course:python

# Leaderboard
ZADD leaderboard 92 "Ayesha" 78 "Rahim" 88 "Nusrat"
ZREVRANGE leaderboard 0 2 WITHSCORES   # top 3, highest first
ZINCRBY leaderboard 5 "Rahim"          # add 5 to Rahim's score` },
        { type: 'note', value: 'Sorted sets use a skip list plus a hash table, so both score-based range queries and member lookups are fast.' },
      ],
    },
    {
      id: 'redis-hashes',
      title: 'Hashes',
      blocks: [
        { type: 'text', value: 'A hash is a map of field to value, stored under one key. It is the natural way to store an object such as a user profile or a session, without serializing to a string.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `HSET user:42 name "Ayesha" score 92 city "Dhaka"
HGET user:42 name
HGETALL user:42
HINCRBY user:42 score 3

# Store a session as a hash
HSET session:abc user_id 42 expires 1700000000
EXPIRE session:abc 3600` },
        { type: 'note', value: 'Hashes are memory efficient for small objects. For large objects or nested data, serialize to JSON and store as a string.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'data-structures',
      q: 'Which data structure is best for a leaderboard?',
      options: ['String', 'List', 'Set', 'Sorted set (ZSET)'],
      answer: 3,
      explain: 'A sorted set keeps members ordered by score.',
    },
    {
      chapterId: 'data-structures',
      q: 'What command adds to the end of a list?',
      options: ['LPUSH', 'RPUSH', 'SADD', 'ZADD'],
      answer: 1,
      explain: 'RPUSH appends to the right end.',
    },
    {
      chapterId: 'data-structures',
      q: 'What does HINCRBY do?',
      options: ['Deletes a field', 'Increments a numeric field in a hash', 'Sets a TTL', 'Sorts the hash'],
      answer: 1,
      explain: 'It increments a hash field by a number.',
    },
    {
      chapterId: 'data-structures',
      q: 'Why use a hash for a user profile?',
      options: ['It is the only option', 'It stores fields without serializing to a string', 'It is slower', 'It removes duplicates'],
      answer: 1,
      explain: 'A hash maps fields to values under one key.',
    },
  ],
};
