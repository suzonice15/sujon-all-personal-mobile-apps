// SQL chapter: Indexes and Performance.

export default {
  id: 'indexes-performance',
  title: 'Indexes & Performance',
  description: 'Make slow queries fast without guessing',
  icon: 'speed',
  lessons: [
    {
      id: 'sql-what-is-index',
      title: 'What is an index?',
      blocks: [
        { type: 'text', value: 'An index is a sorted data structure that lets the database jump to matching rows instead of scanning the whole table. Think of the index at the back of a book: without it you read every page.' },
        { type: 'text', value: 'The cost is write speed and disk space. Every INSERT, UPDATE and DELETE must also update each index. Index the columns you filter, join and sort on, not every column.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE INDEX idx_students_city ON students(city);

SELECT name FROM students WHERE city = 'Dhaka';` },
        { type: 'note', value: 'A primary key and a UNIQUE constraint already create an index. Adding another index on the same column is wasted space.' },
      ],
    },
    {
      id: 'sql-composite-index',
      title: 'Composite indexes and order',
      blocks: [
        { type: 'text', value: 'A composite index covers several columns. Column order matters: an index on (city, age) helps queries that filter by city, or by city and age, but usually not by age alone.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE INDEX idx_students_city_age ON students(city, age);

SELECT name, age
FROM students
WHERE city = 'Dhaka' AND age >= 21;` },
        { type: 'list', items: [
          'Put the equality column first, then the range column',
          'The leftmost columns of the index must appear in the query',
          'One good composite index can replace several single-column indexes',
        ] },
        { type: 'note', value: 'Do not guess. Run EXPLAIN QUERY PLAN before and after adding an index, and keep it only if the plan improves.' },
      ],
    },
    {
      id: 'sql-explain',
      title: 'Reading a query plan',
      blocks: [
        { type: 'text', value: 'EXPLAIN QUERY PLAN shows how SQLite will execute a query. The important word is SCAN versus SEARCH. A SCAN on a large table is a red flag; a SEARCH using an index is usually what you want.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE INDEX idx_enrollments_student ON enrollments(student_id);

EXPLAIN QUERY PLAN
SELECT * FROM enrollments WHERE student_id = 3;` },
        { type: 'text', value: 'The output names the index used. If it says SCAN enrollments, the index was not used and the query reads every row.' },
        { type: 'note', value: 'Plans change as data grows. A query that is fast on 100 rows may be slow on 1,000,000. Check plans with realistic data.' },
      ],
    },
    {
      id: 'sql-common-mistakes',
      title: 'Common performance mistakes',
      blocks: [
        { type: 'list', items: [
          'SELECT * fetches columns the screen never shows; list only what you need',
          'A leading wildcard LIKE \'%text\' cannot use a normal index',
          'Wrapping a column in a function, for example WHERE UPPER(city) = \'DHAKA\', disables its index',
          'N+1 queries: one query for a list, then one more per row. Use a JOIN or an IN query instead',
          'Missing indexes on foreign keys make joins slow',
          'SELECT COUNT(*) on every screen refresh is expensive; cache the number',
        ] },
        { type: 'code', lang: 'sql', tryIt: true, value: `-- Uses the index on city
SELECT name FROM students WHERE city = 'Dhaka';

-- Cannot use the index on city
SELECT name FROM students WHERE UPPER(city) = 'DHAKA';` },
        { type: 'text', value: 'Measure first. Optimising a query that takes 2 ms is wasted effort; fixing a missing index on a 2 second query is not.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'indexes-performance',
      q: 'What is the main benefit of an index?',
      options: ['Less disk usage', 'Faster reads', 'Faster writes', 'Automatic backups'],
      answer: 1,
      explain: 'Indexes speed up lookups. They add work to writes because the index must be updated too.',
    },
    {
      chapterId: 'indexes-performance',
      q: 'For an index on (city, age), which query can use it best?',
      options: [
        'WHERE age = 21',
        'WHERE city = \'Dhaka\' AND age = 21',
        'ORDER BY name',
        'WHERE UPPER(city) = \'DHAKA\'',
      ],
      answer: 1,
      explain: 'The leftmost column city must be used, and adding age continues the index.',
    },
    {
      chapterId: 'indexes-performance',
      q: 'What does a SCAN in EXPLAIN QUERY PLAN usually mean?',
      options: ['The query used an index', 'The table was read row by row', 'The query failed', 'The table was dropped'],
      answer: 1,
      explain: 'A scan reads every row. On a large table that is usually slower than a SEARCH with an index.',
    },
    {
      chapterId: 'indexes-performance',
      q: 'Why is LIKE \'%phone\' hard to index?',
      options: [
        'LIKE is not SQL',
        'The leading wildcard means the match can start anywhere',
        'Text columns cannot be indexed',
        'It always returns no rows',
      ],
      answer: 1,
      explain: 'A normal index is sorted from the start of the value. A leading % forces a scan because the prefix is unknown.',
    },
    {
      chapterId: 'indexes-performance',
      q: 'What is an N+1 query problem?',
      options: [
        'One query returning N rows',
        'One query for a list, then one query per row',
        'N indexes on one table',
        'A query with N joins',
      ],
      answer: 1,
      explain: 'It is the classic loop that runs a query for every row, multiplying database round trips.',
    },
  ],
};
