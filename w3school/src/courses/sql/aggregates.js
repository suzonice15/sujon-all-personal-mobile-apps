// SQL chapter: Aggregates.

export default {
  id: 'aggregates',
  title: 'Aggregating Data',
  description: 'Count, sum and group rows to answer real questions',
  icon: 'functions',
  lessons: [
    {
      id: 'sql-aggregate-functions',
      title: 'COUNT, SUM, AVG, MIN and MAX',
      blocks: [
        { type: 'text', value: 'Aggregate functions turn many rows into one summary value. They are the heart of reports and dashboards.' },
        { type: 'list', items: [
          'COUNT(*) counts rows; COUNT(column) ignores NULLs',
          'SUM(column) adds numeric values',
          'AVG(column) returns the mean',
          'MIN(column) and MAX(column) return the smallest and largest values',
        ] },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT COUNT(*) AS total_students
FROM students;` },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT AVG(score) AS average_score,
       MAX(score) AS best_score,
       MIN(score) AS lowest_score
FROM enrollments;` },
        { type: 'note', value: 'AVG ignores NULL values. If some scores are NULL, the average is calculated only from the non-NULL rows, which may or may not be what you want.' },
      ],
    },
    {
      id: 'sql-group-by',
      title: 'GROUP BY',
      blocks: [
        { type: 'text', value: 'GROUP BY splits rows into buckets, then runs an aggregate once per bucket. "Average score per course" is one aggregate grouped by course_id.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT course_id, COUNT(*) AS students, AVG(score) AS average_score
FROM enrollments
GROUP BY course_id
ORDER BY course_id;` },
        { type: 'text', value: 'A rule to remember: every column in SELECT that is not inside an aggregate must also appear in GROUP BY. This query is invalid in strict SQL because name is not grouped.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT city, COUNT(*) AS students
FROM students
GROUP BY city
ORDER BY students DESC;` },
        { type: 'note', value: 'SQLite is lenient and lets some non-grouped columns through. MySQL with ONLY_FULL_GROUP_BY and PostgreSQL reject them. Write standard SQL so your query works everywhere.' },
      ],
    },
    {
      id: 'sql-having',
      title: 'HAVING',
      blocks: [
        { type: 'text', value: 'WHERE filters rows before grouping. HAVING filters groups after aggregation. You cannot use an aggregate such as COUNT(*) in WHERE.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT city, COUNT(*) AS students
FROM students
GROUP BY city
HAVING COUNT(*) >= 2;` },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT course_id, AVG(score) AS average_score
FROM enrollments
GROUP BY course_id
HAVING AVG(score) >= 80
ORDER BY average_score DESC;` },
        { type: 'list', items: [
          'FROM - pick the table',
          'WHERE - filter individual rows',
          'GROUP BY - build buckets',
          'HAVING - filter the buckets',
          'SELECT - choose columns and aggregates',
          'ORDER BY - sort the final result',
          'LIMIT - cut the output',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'aggregates',
      q: 'Which function counts rows?',
      options: ['COUNT', 'SUM', 'TOTAL', 'GROUP'],
      answer: 0,
      explain: 'COUNT(*) counts rows. SUM adds values.',
    },
    {
      chapterId: 'aggregates',
      q: 'Which clause filters groups after aggregation?',
      options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
      answer: 1,
      explain: 'WHERE filters rows before grouping. HAVING filters the groups produced by GROUP BY.',
    },
    {
      chapterId: 'aggregates',
      q: 'What must every non-aggregated SELECT column have when using GROUP BY?',
      options: ['An alias', 'A WHERE condition', 'An entry in GROUP BY', 'An ORDER BY'],
      answer: 2,
      explain: 'Standard SQL requires non-aggregated columns to be grouped, otherwise the result is ambiguous.',
    },
    {
      chapterId: 'aggregates',
      q: 'What does SELECT city, COUNT(*) FROM students GROUP BY city return?',
      options: ['Every student', 'One row per city with its student count', 'Only the largest city', 'The total number of students'],
      answer: 1,
      explain: 'GROUP BY city creates one bucket per city and COUNT(*) counts the rows inside each bucket.',
    },
    {
      chapterId: 'aggregates',
      q: 'Which query finds courses whose average score is at least 80?',
      options: [
        'SELECT course_id FROM enrollments WHERE AVG(score) >= 80',
        'SELECT course_id, AVG(score) FROM enrollments GROUP BY course_id HAVING AVG(score) >= 80',
        'SELECT course_id FROM enrollments ORDER BY AVG(score) >= 80',
        'SELECT course_id FROM enrollments LIMIT 80',
      ],
      answer: 1,
      explain: 'Aggregates are filtered with HAVING after GROUP BY, not with WHERE.',
    },
  ],
};
