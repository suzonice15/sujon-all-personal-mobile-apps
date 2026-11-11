// SQL chapter: Joins.

export default {
  id: 'joins',
  title: 'Joining Tables',
  description: 'Combine related tables without duplicating data',
  icon: 'join-inner',
  lessons: [
    {
      id: 'sql-why-joins',
      title: 'Why joins exist',
      blocks: [
        { type: 'text', value: 'Real data is split across tables so it is not repeated. A student is stored once, a course is stored once, and an enrollment row connects them with two ids.' },
        { type: 'list', items: [
          'students - who the student is',
          'courses - what the course is',
          'enrollments - which student took which course and what score they got',
        ] },
        { type: 'text', value: 'A join follows those ids and puts the matching rows side by side. Without joins you would have to run one query and then a second query for every row, which is slow and awkward.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT students.name, courses.title, enrollments.score
FROM enrollments
JOIN students ON students.id = enrollments.student_id
JOIN courses ON courses.id = enrollments.course_id;` },
      ],
    },
    {
      id: 'sql-inner-join',
      title: 'INNER JOIN',
      blocks: [
        { type: 'text', value: 'INNER JOIN (usually written as just JOIN) keeps only rows that match on both sides. If an enrollment pointed to a deleted student, that enrollment would disappear from the result.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT s.name, c.title, e.score
FROM enrollments e
JOIN students s ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id
WHERE e.score >= 85
ORDER BY e.score DESC;` },
        { type: 'text', value: 'Aliases (s, c, e) keep long queries readable. Once you alias a table, use the alias everywhere in that query.' },
        { type: 'note', value: 'Always put the join condition in ON, not in WHERE. Putting it in WHERE changes an outer join into an inner join and silently drops rows.' },
      ],
    },
    {
      id: 'sql-left-join',
      title: 'LEFT JOIN and RIGHT JOIN',
      blocks: [
        { type: 'text', value: 'LEFT JOIN keeps every row from the left table, even when there is no match on the right. Missing right-side columns come back as NULL. This is how you answer "which students have not enrolled in anything yet?".' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT s.name, e.course_id
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id
ORDER BY s.id;` },
        { type: 'text', value: 'To find only the unmatched rows, add WHERE e.id IS NULL.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT s.name
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id
WHERE e.id IS NULL;` },
        { type: 'text', value: 'RIGHT JOIN is the mirror image: it keeps every row from the right table. Most teams rewrite RIGHT JOIN as LEFT JOIN with the tables swapped, because it is easier to read.' },
      ],
    },
    {
      id: 'sql-self-and-multi',
      title: 'Self joins and many tables',
      blocks: [
        { type: 'text', value: 'A self join joins a table to itself. It is useful for hierarchies, for example an employees table where each row has a manager_id pointing to another employee.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `SELECT worker.name AS employee, boss.name AS manager
FROM employees worker
LEFT JOIN employees boss ON boss.id = worker.manager_id;` },
        { type: 'text', value: 'You can join as many tables as you need, but each join multiplies the work. Join on indexed columns and select only the columns you need.' },
        { type: 'note', value: 'A join on a non-unique column can duplicate rows. If two enrollments match one student, that student appears twice. Use DISTINCT or a GROUP BY only when the duplication is expected, not to hide a wrong join condition.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'joins',
      q: 'Which join keeps only matching rows from both tables?',
      options: ['LEFT JOIN', 'INNER JOIN', 'RIGHT JOIN', 'FULL JOIN'],
      answer: 1,
      explain: 'INNER JOIN returns rows where the ON condition matches on both sides.',
    },
    {
      chapterId: 'joins',
      q: 'Which join keeps every row from the left table?',
      options: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'SELF JOIN'],
      answer: 1,
      explain: 'LEFT JOIN preserves all left rows and fills unmatched right columns with NULL.',
    },
    {
      chapterId: 'joins',
      q: 'How do you find students with no enrollments?',
      options: [
        'INNER JOIN then filter score = 0',
        'LEFT JOIN then WHERE enrollments.id IS NULL',
        'RIGHT JOIN then ORDER BY name',
        'CROSS JOIN then COUNT(*)',
      ],
      answer: 1,
      explain: 'The left join keeps every student; the NULL check keeps only those with no matching enrollment.',
    },
    {
      chapterId: 'joins',
      q: 'What does a self join do?',
      options: ['Joins a table to itself', 'Joins two databases', 'Deletes duplicate rows', 'Creates a new table'],
      answer: 0,
      explain: 'A self join uses the same table twice with different aliases, often for manager or category hierarchies.',
    },
    {
      chapterId: 'joins',
      q: 'Where should the join condition go?',
      options: ['In SELECT', 'In ON', 'In ORDER BY', 'In LIMIT'],
      answer: 1,
      explain: 'The ON clause defines how rows match. Moving it to WHERE can turn an outer join into an inner join and drop rows.',
    },
  ],
};
