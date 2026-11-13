// SQLite chapter: Queries.

export default {
  id: 'queries',
  title: 'Queries',
  description: 'SELECT, joins, aggregates and CTEs',
  icon: 'table-chart',
  lessons: [
    {
      id: 'sq-select',
      title: 'SELECT and filtering',
      blocks: [
        { type: 'text', value: 'SQLite supports standard SQL: WHERE, ORDER BY, LIMIT, LIKE and CASE. Use parameters (?) from application code instead of string concatenation.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT title, price FROM courses
WHERE price >= 3000
ORDER BY price DESC
LIMIT 5;` },
        { type: 'note', value: 'LIKE is case-insensitive for ASCII by default. Use COLLATE NOCASE for explicit behavior.' },
      ],
    },
    {
      id: 'sq-joins-aggregates',
      title: 'Joins and aggregates',
      blocks: [
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE enrollments (
    id INTEGER PRIMARY KEY,
    course_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL
);

INSERT INTO enrollments (course_id, user_id) VALUES (1, 10), (1, 11), (2, 10);

SELECT c.title, COUNT(e.id) AS total
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id
ORDER BY total DESC;` },
        { type: 'note', value: 'SQLite allows GROUP BY on a unique column. Other databases often require every selected non-aggregate column; write portable SQL when it might move.' },
      ],
    },
    {
      id: 'sq-cte',
      title: 'CTEs and JSON',
      blocks: [
        { type: 'text', value: 'SQLite supports common table expressions and JSON functions. JSON is stored as text, so query the fields you need instead of parsing in the app.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `WITH cheap AS (
  SELECT * FROM courses WHERE price < 4000
)
SELECT title, price FROM cheap ORDER BY price;

SELECT json_extract('{"a": 1}', '$.a') AS value;` },
        { type: 'note', value: 'JSON in SQLite is text without a schema. Validate the shape in the application before storing it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'queries',
      q: 'How do you filter rows?',
      options: ['WHERE', 'LIMIT', 'ORDER BY', 'GROUP BY'],
      answer: 0,
      explain: 'WHERE filters rows.',
    },
    {
      chapterId: 'queries',
      q: 'What does COUNT do?',
      options: ['Sums values', 'Counts rows', 'Sorts', 'Joins'],
      answer: 1,
      explain: 'COUNT counts rows.',
    },
    {
      chapterId: 'queries',
      q: 'What is a CTE?',
      options: ['A named query', 'An index', 'A trigger', 'A file'],
      answer: 0,
      explain: 'WITH names a query.',
    },
    {
      chapterId: 'queries',
      q: 'How is JSON stored?',
      options: ['As a binary index', 'As text with JSON functions', 'As a table', 'As a blob only'],
      answer: 1,
      explain: 'JSON is text in SQLite.',
    },
  ],
};
