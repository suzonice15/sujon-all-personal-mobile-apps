// PostgreSQL chapter: Query Performance.

export default {
  id: 'query-performance',
  title: 'Query Performance',
  description: 'EXPLAIN, query plans and optimization',
  icon: 'speed',
  lessons: [
    {
      id: 'pg-explain',
      title: 'Reading EXPLAIN',
      blocks: [
        { type: 'text', value: 'EXPLAIN shows the plan PostgreSQL chooses. EXPLAIN ANALYZE actually runs the query and shows real timing. Use BUFFERS to see cache hits and disk reads.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT c.title, COUNT(e.id) AS enrollments
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id, c.title;` },
        { type: 'list', items: [
          'Seq Scan - reads the whole table',
          'Index Scan - uses an index and reads the table',
          'Index Only Scan - answers from the index alone',
          'Hash Join, Merge Join, Nested Loop - join strategies',
        ] },
        { type: 'note', value: 'A Seq Scan is not always bad. On a small table it is faster than an index scan. Trust the planner and the measured time.' },
      ],
    },
    {
      id: 'pg-n-plus-one',
      title: 'N+1 and batching',
      blocks: [
        { type: 'text', value: 'The N+1 problem: load a list, then one query per item for a related entity. The fix is a JOIN or a single query with IN (...). Batching turns many small queries into one.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `-- Bad: one query per course
SELECT * FROM courses;
-- then for each course: SELECT * FROM enrollments WHERE course_id = ?;

-- Good: one query with a join
SELECT c.id, c.title, COUNT(e.id) AS n
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id, c.title;` },
        { type: 'note', value: 'ORMs often cause N+1 by lazy loading. Check the generated SQL in your logs before you assume the query is efficient.' },
      ],
    },
    {
      id: 'pg-analyze-vacuum',
      title: 'ANALYZE and VACUUM',
      blocks: [
        { type: 'text', value: 'ANALYZE collects statistics so the planner chooses good plans. VACUUM reclaims space from deleted or updated rows and prevents transaction ID wraparound. Autovacuum does both in the background.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ANALYZE courses;
VACUUM (VERBOSE, ANALYZE) courses;

-- Check table bloat and dead tuples
SELECT relname, n_dead_tup, n_live_tup, last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;` },
        { type: 'note', value: 'A table with millions of dead tuples is a sign that autovacuum is not keeping up. Tune autovacuum or run a manual VACUUM FULL during maintenance.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'query-performance',
      q: 'What does EXPLAIN ANALYZE do?',
      options: ['Runs the query and shows the plan with real timing', 'Only shows the plan', 'Deletes rows', 'Creates an index'],
      answer: 0,
      explain: 'ANALYZE executes the query and reports actual time.',
    },
    {
      chapterId: 'query-performance',
      q: 'What is an Index Only Scan?',
      options: ['A scan that reads the table', 'A scan that answers the query from the index alone', 'A full table scan', 'A join'],
      answer: 1,
      explain: 'It avoids touching the table heap.',
    },
    {
      chapterId: 'query-performance',
      q: 'What is the N+1 problem?',
      options: ['A slow sort', 'One query per item instead of one batched query', 'A missing index', 'A deadlock'],
      answer: 1,
      explain: 'It is many small queries instead of one.',
    },
    {
      chapterId: 'query-performance',
      q: 'What does VACUUM do?',
      options: ['Backs up the database', 'Reclaims space from dead rows and prevents wraparound', 'Creates indexes', 'Deletes users'],
      answer: 1,
      explain: 'It cleans up dead tuples.',
    },
  ],
};
