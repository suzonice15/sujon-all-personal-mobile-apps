// MySQL chapter: SQL Fundamentals.

export default {
  id: 'sql-fundamentals',
  title: 'SQL Fundamentals',
  description: 'SELECT, JOIN, GROUP BY and subqueries',
  icon: 'table-chart',
  lessons: [
    {
      id: 'mysql-select-where',
      title: 'SELECT and WHERE',
      blocks: [
        { type: 'text', value: 'SELECT reads rows from a table. WHERE filters rows. MySQL supports standard SQL plus extensions such as REGEXP for pattern matching.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT title, price FROM courses
WHERE price >= 5000
  AND title LIKE '%SQL%'
ORDER BY price DESC
LIMIT 10;` },
        { type: 'note', value: 'LIKE is case-insensitive by default in MySQL with most collations. Use BINARY for case-sensitive matching.' },
      ],
    },
    {
      id: 'mysql-joins',
      title: 'JOINs',
      blocks: [
        { type: 'text', value: 'A JOIN combines rows from two tables. INNER JOIN keeps only matching rows. LEFT JOIN keeps all rows from the left table, filling missing matches with NULL.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT c.title, e.user_id, e.enrolled_at
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
ORDER BY c.title;` },
        { type: 'note', value: 'Always qualify column names in a join, such as c.title, to avoid ambiguity errors.' },
      ],
    },
    {
      id: 'mysql-group-subqueries',
      title: 'GROUP BY and subqueries',
      blocks: [
        { type: 'text', value: 'GROUP BY collapses rows into groups and computes aggregates. A subquery is a query inside another query. MySQL supports correlated subqueries and derived tables.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT course_id, COUNT(*) AS n, AVG(price) AS avg_price
FROM enrollments e
JOIN courses c ON c.id = e.course_id
GROUP BY course_id
HAVING COUNT(*) > 5;

-- Subquery: courses more expensive than average
SELECT title, price FROM courses
WHERE price > (SELECT AVG(price) FROM courses);` },
        { type: 'note', value: 'HAVING filters groups after aggregation. Use WHERE to filter rows before grouping.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'sql-fundamentals',
      q: 'Which command filters rows before grouping?',
      options: ['HAVING', 'WHERE', 'GROUP BY', 'ORDER BY'],
      answer: 1,
      explain: 'WHERE filters rows; HAVING filters groups.',
    },
    {
      chapterId: 'sql-fundamentals',
      q: 'What does LEFT JOIN keep?',
      options: ['Only matching rows', 'All rows from the left table, with NULL for missing matches', 'All rows from both tables', 'Only the right table'],
      answer: 1,
      explain: 'LEFT JOIN preserves every left row.',
    },
    {
      chapterId: 'sql-fundamentals',
      q: 'What is a subquery?',
      options: ['A query that runs after the main query', 'A query inside another query', 'A join', 'An index'],
      answer: 1,
      explain: 'A subquery is nested inside another query.',
    },
    {
      chapterId: 'sql-fundamentals',
      q: 'Why qualify column names in a join?',
      options: ['For speed', 'To avoid ambiguity errors', 'It is optional', 'To sort results'],
      answer: 1,
      explain: 'Both tables may have a column with the same name.',
    },
  ],
};
