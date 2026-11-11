// SQL chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Projects & Interview Prep',
  description: 'Build a schema and answer real interview questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'sql-project-school',
      title: 'Project: school database',
      blocks: [
        { type: 'text', value: 'Design a small school database. It needs students, teachers, courses, classes and enrollments. Write the schema on paper first: which table owns which fact, and which column points to which primary key?' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE teachers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT
);

CREATE TABLE school_students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER CHECK (age >= 5)
);

CREATE TABLE school_courses (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  teacher_id INTEGER REFERENCES teachers(id),
  price INTEGER DEFAULT 0
);

CREATE TABLE school_enrollments (
  student_id INTEGER NOT NULL REFERENCES school_students(id),
  course_id INTEGER NOT NULL REFERENCES school_courses(id),
  score INTEGER CHECK (score BETWEEN 0 AND 100),
  PRIMARY KEY (student_id, course_id)
);

INSERT INTO teachers (name, subject) VALUES ('Nadia', 'Web');
INSERT INTO school_courses (title, teacher_id, price) VALUES ('SQL', 1, 5000), ('React', 1, 7000);
INSERT INTO school_students (name, age) VALUES ('Ayesha', 20), ('Rahim', 22);
INSERT INTO school_enrollments VALUES (1, 1, 92), (1, 2, 88), (2, 1, 75);

SELECT s.name, c.title, e.score
FROM school_enrollments e
JOIN school_students s ON s.id = e.student_id
JOIN school_courses c ON c.id = e.course_id
ORDER BY e.score DESC;` },
        { type: 'note', value: 'Checklist: every table has a primary key, every relationship has a foreign key, no column repeats data from another table, and every business rule has a CHECK or NOT NULL.' },
      ],
    },
    {
      id: 'sql-project-analytics',
      title: 'Project: sales analytics',
      blocks: [
        { type: 'text', value: 'Analytics queries answer questions for a dashboard. Practice turning a sentence into SQL. Example: "What is the total revenue per course, and which courses earn above average?"' },
        { type: 'code', lang: 'sql', tryIt: true, value: `WITH revenue AS (
  SELECT c.id, c.title, COUNT(e.id) * c.price AS total
  FROM courses c
  JOIN enrollments e ON e.course_id = c.id
  GROUP BY c.id, c.title, c.price
)
SELECT title, total
FROM revenue
ORDER BY total DESC;` },
        { type: 'code', lang: 'sql', tryIt: true, value: `WITH course_scores AS (
  SELECT course_id, AVG(score) AS avg_score
  FROM enrollments
  GROUP BY course_id
)
SELECT c.title, course_scores.avg_score
FROM course_scores
JOIN courses c ON c.id = course_scores.course_id
WHERE course_scores.avg_score > (
  SELECT AVG(score) FROM enrollments
)
ORDER BY course_scores.avg_score DESC;` },
        { type: 'text', value: 'Notice the pattern: one CTE per business concept, join them at the end, filter last. This reads like the question itself.' },
      ],
    },
    {
      id: 'sql-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'text', value: 'Interviewers rarely ask for syntax. They give a scenario and watch how you break it into tables, joins and aggregates. Practise explaining your query out loud.' },
        { type: 'list', items: [
          'Find the second highest score in a table.',
          'Find students who took every course.',
          'Find duplicate emails in a users table.',
          'Find the top 3 courses by enrollment count.',
          'Explain the difference between WHERE and HAVING.',
          'Explain why an index speeds up reads but slows writes.',
          'What is the difference between INNER JOIN and LEFT JOIN?',
          'How would you store a many-to-many relationship?',
        ] },
        { type: 'code', lang: 'sql', tryIt: true, value: `-- Second highest score
SELECT MAX(score) AS second_highest
FROM enrollments
WHERE score < (SELECT MAX(score) FROM enrollments);

-- Top 3 courses by enrollment count
SELECT course_id, COUNT(*) AS students
FROM enrollments
GROUP BY course_id
ORDER BY students DESC
LIMIT 3;` },
        { type: 'code', lang: 'sql', tryIt: true, value: `-- Students who took every course
SELECT s.name
FROM students s
JOIN enrollments e ON e.student_id = s.id
GROUP BY s.id, s.name
HAVING COUNT(DISTINCT e.course_id) = (SELECT COUNT(*) FROM courses);` },
        { type: 'note', value: 'The best answer is not always the cleverest query. Mention constraints, indexes and edge cases such as NULLs and duplicates. That is what separates a junior answer from an expert one.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which column should hold the link in a one-to-many relationship?',
      options: ['The parent primary key', 'A foreign key on the many side', 'A text copy of the parent name', 'No column'],
      answer: 1,
      explain: 'The many side stores a foreign key pointing to the parent primary key.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you find the second highest score?',
      options: [
        'ORDER BY score LIMIT 1',
        'MAX(score) WHERE score < (SELECT MAX(score) ...)',
        'AVG(score)',
        'COUNT(score)',
      ],
      answer: 1,
      explain: 'Take the maximum of all scores below the overall maximum.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which query finds students enrolled in every course?',
      options: [
        'GROUP BY student and HAVING COUNT(DISTINCT course_id) = total courses',
        'ORDER BY score LIMIT 5',
        'SELECT DISTINCT student_id',
        'JOIN students and courses without a condition',
      ],
      answer: 0,
      explain: 'Group by student, count distinct courses, and compare with the total number of courses.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should you mention when answering a query performance question?',
      options: ['Only the syntax', 'Indexes, row counts, query plans and edge cases', 'The font used in the editor', 'The database brand only'],
      answer: 1,
      explain: 'Experts discuss indexes, data size, plans, NULLs and duplicates, not just syntax.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why does a dashboard query often use a CTE?',
      options: [
        'To make each business step readable and reusable',
        'Because CTEs always run faster',
        'Because dashboards cannot use joins',
        'To create a permanent table',
      ],
      answer: 0,
      explain: 'CTEs name each step of the calculation, so the final query mirrors the business question.',
    },
  ],
};
