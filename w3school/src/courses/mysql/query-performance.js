// MySQL chapter: Query Performance.

export default {
  id: 'query-performance',
  title: 'Query Performance',
  description: 'EXPLAIN, slow query log and optimization',
  icon: 'speed',
  lessons: [
    {
      id: 'mysql-explain',
      title: 'Reading EXPLAIN',
      blocks: [
        { type: 'text', value: 'EXPLAIN shows the plan MySQL chooses. EXPLAIN ANALYZE actually runs the query and shows real timing in MySQL 8.0.18 and later. Use it to find slow steps.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `EXPLAIN SELECT c.title, COUNT(e.id) AS enrollments
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id, c.title;` },
        { type: 'list', items: [
          'ALL - full table scan',
          'index - full index scan',
          'range - index range scan',
          'ref - index lookup by value',
          'eq_ref - one row by primary or unique key',
          'const - single row at plan time',
        ] },
        { type: 'note', value: 'A full table scan is not always bad. On a small table it is faster than an index scan. Trust the measured time.' },
      ],
    },
    {
      id: 'mysql-slow-log',
      title: 'Slow query log',
      blocks: [
        { type: 'text', value: 'The slow query log records queries that take longer than a threshold. Enable it in development and staging, and review it regularly in production.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `-- Enable at runtime
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;   -- seconds

-- Check the log file location
SHOW VARIABLES LIKE 'slow_query_log_file';

-- Or use performance_schema
SELECT * FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC LIMIT 10;` },
        { type: 'note', value: 'performance_schema is always on and has low overhead. Use it for ongoing monitoring instead of the slow log.' },
      ],
    },
    {
      id: 'mysql-optimization',
      title: 'Common optimizations',
      blocks: [
        { type: 'text', value: 'Most slow queries come from missing indexes, N+1 patterns, or selecting too many columns. Fix the query first, then add indexes, then tune the server.' },
        { type: 'list', items: [
          'Add indexes for columns in WHERE and JOIN',
          'Avoid SELECT *; list only the columns you need',
          'Fix N+1 by using a JOIN or IN (...)',
          'Use LIMIT for pagination',
          'Avoid functions on indexed columns in WHERE',
          'Analyze tables with ANALYZE TABLE to update statistics',
        ] },
        { type: 'code', lang: 'sql', tryIt: true, value: `-- Bad: function on an indexed column
SELECT * FROM courses WHERE YEAR(created_at) = 2025;

-- Good: range on the column
SELECT * FROM courses
WHERE created_at >= '2025-01-01'
  AND created_at < '2026-01-01';` },
        { type: 'note', value: 'A function on a column prevents index use. Rewrite the condition so the column stands alone.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'query-performance',
      q: 'What does EXPLAIN ANALYZE do in MySQL 8?',
      options: ['Only shows the plan', 'Runs the query and shows real timing', 'Deletes rows', 'Creates an index'],
      answer: 1,
      explain: 'ANALYZE executes the query and reports actual time.',
    },
    {
      chapterId: 'query-performance',
      q: 'What does access type ALL mean?',
      options: ['Index scan', 'Full table scan', 'Single row', 'Join'],
      answer: 1,
      explain: 'ALL means a full table scan.',
    },
    {
      chapterId: 'query-performance',
      q: 'Why avoid functions on indexed columns in WHERE?',
      options: ['They are slow to type', 'They prevent index use', 'They delete data', 'They are deprecated'],
      answer: 1,
      explain: 'The index cannot be used when the column is wrapped in a function.',
    },
    {
      chapterId: 'query-performance',
      q: 'Which tool gives ongoing query statistics with low overhead?',
      options: ['Slow query log', 'performance_schema', 'SHOW PROCESSLIST', 'EXPLAIN only'],
      answer: 1,
      explain: 'performance_schema is always on and cheap.',
    },
  ],
};
