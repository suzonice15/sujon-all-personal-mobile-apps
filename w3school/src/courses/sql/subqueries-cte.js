// SQL chapter: Subqueries and CTEs.

export default {
  id: 'subqueries-cte',
  title: 'Subqueries & CTEs',
  description: 'Build complex questions from smaller ones',
  icon: 'account-tree',
  lessons: [
    {
      id: 'sql-scalar-subquery',
      title: 'Scalar subqueries',
      blocks: [
        { type: 'text', value: 'A subquery is a SELECT inside another query. A scalar subquery returns exactly one value and can be used anywhere a value is allowed.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, age
FROM students
WHERE age > (SELECT AVG(age) FROM students);` },
        { type: 'text', value: 'The inner query runs first and produces one number. The outer query compares every student against it. This is often clearer than calculating the average yourself.' },
        { type: 'note', value: 'If a scalar subquery returns more than one row, most databases raise an error. If it returns zero rows it becomes NULL, and comparisons with NULL match nothing.' },
      ],
    },
    {
      id: 'sql-in-exists',
      title: 'IN and EXISTS',
      blocks: [
        { type: 'text', value: 'IN checks membership in a list of values. EXISTS checks whether the subquery returns at least one row. Both are useful for "does a related row exist?" questions.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name
FROM students
WHERE id IN (SELECT student_id FROM enrollments WHERE score >= 90);` },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT s.name
FROM students s
WHERE EXISTS (
  SELECT 1 FROM enrollments e
  WHERE e.student_id = s.id AND e.score >= 90
);` },
        { type: 'text', value: 'EXISTS usually stops at the first matching row, so it can be faster than IN when the related table is large. IN is easier to read for small lists.' },
      ],
    },
    {
      id: 'sql-derived-tables',
      title: 'Derived tables',
      blocks: [
        { type: 'text', value: 'A subquery in FROM is called a derived table. It behaves like a temporary table for the duration of the query. This keeps each step simple: first calculate the summary, then filter or join it.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT course_id, average_score
FROM (
  SELECT course_id, AVG(score) AS average_score
  FROM enrollments
  GROUP BY course_id
) AS course_stats
WHERE average_score >= 80;` },
        { type: 'note', value: 'Every derived table needs an alias in most databases (the AS course_stats part). Without it the query is rejected.' },
      ],
    },
    {
      id: 'sql-cte',
      title: 'Common Table Expressions (WITH)',
      blocks: [
        { type: 'text', value: 'A CTE names a subquery so it can be read top to bottom. It does the same job as a derived table but is much easier to maintain when the query grows.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `WITH course_stats AS (
  SELECT course_id, AVG(score) AS average_score, COUNT(*) AS students
  FROM enrollments
  GROUP BY course_id
)
SELECT course_id, average_score, students
FROM course_stats
WHERE average_score >= 80
ORDER BY average_score DESC;` },
        { type: 'text', value: 'You can chain several CTEs with commas. Think of each one as a named step in a pipeline.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `WITH totals AS (
  SELECT student_id, SUM(score) AS total_score
  FROM enrollments
  GROUP BY student_id
)
SELECT s.name, t.total_score
FROM totals t
JOIN students s ON s.id = t.student_id
ORDER BY t.total_score DESC;` },
        { type: 'note', value: 'CTEs are not automatically faster than joins. They improve readability first. Check the query plan before assuming a rewrite will speed things up.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'subqueries-cte',
      q: 'What is a scalar subquery?',
      options: ['A query that returns one value', 'A query with no FROM', 'A query that creates a table', 'A query that sorts data'],
      answer: 0,
      explain: 'Scalar means a single value: one row and one column.',
    },
    {
      chapterId: 'subqueries-cte',
      q: 'Which operator checks whether a subquery returns any row?',
      options: ['IN', 'EXISTS', 'BETWEEN', 'LIKE'],
      answer: 1,
      explain: 'EXISTS is true when the subquery returns at least one row.',
    },
    {
      chapterId: 'subqueries-cte',
      q: 'What is a subquery in the FROM clause called?',
      options: ['Scalar subquery', 'Derived table', 'Correlated update', 'View'],
      answer: 1,
      explain: 'A subquery used as a table in FROM is a derived table and needs an alias.',
    },
    {
      chapterId: 'subqueries-cte',
      q: 'Which keyword starts a CTE?',
      options: ['WITH', 'AS', 'FROM', 'LET'],
      answer: 0,
      explain: 'WITH name AS (SELECT ...) defines a Common Table Expression.',
    },
    {
      chapterId: 'subqueries-cte',
      q: 'Why use a CTE instead of a deeply nested subquery?',
      options: ['It always runs faster', 'It makes the query easier to read and maintain', 'It removes the need for indexes', 'It creates a permanent table'],
      answer: 1,
      explain: 'CTEs name each step, so the query reads top to bottom. Performance depends on the plan, not on the syntax alone.',
    },
  ],
};
