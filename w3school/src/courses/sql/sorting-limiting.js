// SQL chapter: Sorting and Limiting.

export default {
  id: 'sorting-limiting',
  title: 'Sorting & Limiting',
  description: 'Order results and page through large tables',
  icon: 'sort',
  lessons: [
    {
      id: 'sql-order-by',
      title: 'ORDER BY',
      blocks: [
        { type: 'text', value: 'Rows in a table have no guaranteed order. ORDER BY sorts the result. ASC is ascending (the default) and DESC is descending.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, age
FROM students
ORDER BY age DESC;` },
        { type: 'text', value: 'You can sort by several columns. The second column breaks ties in the first.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, city, age
FROM students
ORDER BY city ASC, age DESC;` },
        { type: 'note', value: 'ORDER BY runs after WHERE, so it sorts only the rows that survived the filter.' },
      ],
    },
    {
      id: 'sql-limit-offset',
      title: 'LIMIT and OFFSET',
      blocks: [
        { type: 'text', value: 'A table can hold millions of rows, but a phone screen shows perhaps twenty. LIMIT caps how many rows come back. OFFSET skips rows, which is how pagination works.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, age
FROM students
ORDER BY id
LIMIT 3;` },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, age
FROM students
ORDER BY id
LIMIT 3 OFFSET 3;` },
        { type: 'text', value: 'Always combine LIMIT with ORDER BY. Without a sort the database may return any rows, so page 1 and page 2 can overlap.' },
        { type: 'note', value: 'OFFSET becomes slow on very large tables because the database still scans the skipped rows. For deep pagination use a cursor: WHERE id > last_seen_id ORDER BY id LIMIT 20.' },
      ],
    },
    {
      id: 'sql-distinct',
      title: 'DISTINCT',
      blocks: [
        { type: 'text', value: 'DISTINCT removes duplicate rows from the result. It applies to the whole selected row, not to a single column.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT DISTINCT city
FROM students
ORDER BY city;` },
        { type: 'text', value: 'This returns one row per city. If you select two columns, DISTINCT keeps every unique combination of both.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT DISTINCT city, age
FROM students
ORDER BY city;` },
        { type: 'note', value: 'DISTINCT can hide a design problem. If you expected one row but need DISTINCT to remove duplicates, a join is usually producing extra rows. Fix the join instead of hiding the symptom.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'sorting-limiting',
      q: 'Which clause sorts the result?',
      options: ['ORDER BY', 'GROUP BY', 'WHERE', 'LIMIT'],
      answer: 0,
      explain: 'ORDER BY sorts. GROUP BY groups rows for aggregation and does not guarantee order.',
    },
    {
      chapterId: 'sorting-limiting',
      q: 'What does LIMIT 10 OFFSET 20 return?',
      options: ['Rows 1 to 10', 'Rows 21 to 30', 'Rows 20 to 29', 'The last 10 rows'],
      answer: 1,
      explain: 'OFFSET 20 skips the first 20 rows, then LIMIT 10 returns the next ten.',
    },
    {
      chapterId: 'sorting-limiting',
      q: 'Why should LIMIT usually be paired with ORDER BY?',
      options: [
        'LIMIT only works with ORDER BY',
        'Without ORDER BY the rows returned are not predictable',
        'ORDER BY makes the query faster',
        'LIMIT sorts automatically',
      ],
      answer: 1,
      explain: 'Tables have no guaranteed order. Without ORDER BY the database may return any ten rows and pagination breaks.',
    },
    {
      chapterId: 'sorting-limiting',
      q: 'What does SELECT DISTINCT city return?',
      options: ['Every student row', 'One row per unique city', 'Only the first city', 'The number of cities'],
      answer: 1,
      explain: 'DISTINCT removes duplicate result rows, so each city appears once.',
    },
  ],
};
