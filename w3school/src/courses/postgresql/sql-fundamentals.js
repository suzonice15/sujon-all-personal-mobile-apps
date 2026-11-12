// PostgreSQL chapter: SQL Fundamentals.

export default {
  id: 'sql-fundamentals',
  title: 'SQL Fundamentals',
  description: 'SELECT, JOIN, GROUP BY and window functions',
  icon: 'table-chart',
  lessons: [
    {
      id: 'pg-select-where',
      title: 'SELECT and WHERE',
      blocks: [
        { type: 'text', value: 'SELECT reads rows from a table. WHERE filters rows. PostgreSQL supports standard SQL plus many extensions such as ILIKE for case-insensitive matching.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT title, price FROM courses
WHERE price >= 5000
  AND title ILIKE '%sql%'
ORDER BY price DESC
LIMIT 10;` },
        { type: 'note', value: 'ILIKE is PostgreSQL-specific. Use LOWER(title) LIKE LOWER(...) for portability.' },
      ],
    },
    {
      id: 'pg-joins',
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
      id: 'pg-group-window',
      title: 'GROUP BY and window functions',
      blocks: [
        { type: 'text', value: 'GROUP BY collapses rows into groups and computes aggregates such as COUNT, SUM and AVG. Window functions compute a value per row over a related set of rows, without collapsing them.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT title, price,
       ROW_NUMBER() OVER (ORDER BY price DESC) AS rank,
       AVG(price) OVER () AS avg_price
FROM courses;` },
        { type: 'list', items: [
          'GROUP BY aggregates many rows into one',
          'Window functions keep one row per input',
          'OVER () defines the window of rows',
          'PARTITION BY groups rows inside the window',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'sql-fundamentals',
      q: 'What does ILIKE do?',
      options: ['Case-sensitive match', 'Case-insensitive match', 'Index lookup', 'Inserts a row'],
      answer: 1,
      explain: 'ILIKE is PostgreSQL case-insensitive LIKE.',
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
      q: 'What is a window function?',
      options: ['A function that creates a new table', 'A function that computes a value per row over a related set', 'A join', 'An index'],
      answer: 1,
      explain: 'It keeps one row per input while aggregating over a window.',
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
