// SQL chapter: Keys and Relationships.

export default {
  id: 'keys-relationships',
  title: 'Keys & Relationships',
  description: 'Connect tables with primary and foreign keys',
  icon: 'key',
  lessons: [
    {
      id: 'sql-primary-key',
      title: 'Primary keys',
      blocks: [
        { type: 'text', value: 'A primary key uniquely identifies each row. It must be unique and it can never be NULL. Without one, two identical rows cannot be told apart, so an UPDATE might change both.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT id, name, city
FROM students
ORDER BY id;` },
        { type: 'text', value: 'There are two common styles. An integer surrogate key (1, 2, 3) is small and fast. A natural key such as an email or a country code has meaning, but it can change, so it is risky as a primary key.' },
        { type: 'note', value: 'AUTOINCREMENT is rarely needed in SQLite. INTEGER PRIMARY KEY already reuses the row id efficiently. Use AUTOINCREMENT only when you must never reuse a deleted id.' },
      ],
    },
    {
      id: 'sql-foreign-key',
      title: 'Foreign keys',
      blocks: [
        { type: 'text', value: 'A foreign key is a column that points to the primary key of another table. It guarantees the referenced row exists, which is called referential integrity.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE classes (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL
);

CREATE TABLE class_students (
  student_id INTEGER NOT NULL,
  class_id INTEGER NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (class_id) REFERENCES classes(id),
  PRIMARY KEY (student_id, class_id)
);

INSERT INTO classes (title) VALUES ('Web Development');
INSERT INTO class_students VALUES (1, 1);
SELECT * FROM class_students;` },
        { type: 'text', value: 'A foreign key does not automatically create an index in SQLite. If you query "all classes for this student" often, add an index on class_id.' },
        { type: 'note', value: 'SQLite does not enforce foreign keys unless PRAGMA foreign_keys = ON is set for the connection. Many apps enable it once at startup.' },
      ],
    },
    {
      id: 'sql-one-to-many',
      title: 'One-to-many',
      blocks: [
        { type: 'text', value: 'The most common relationship. One course has many enrollments; each enrollment belongs to exactly one course. The foreign key lives on the "many" side.' },
        { type: 'list', items: [
          'courses.id is the primary key',
          'enrollments.course_id is the foreign key',
          'One course row can be referenced by many enrollment rows',
        ] },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT c.title, COUNT(e.id) AS enrollments
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id, c.title
ORDER BY enrollments DESC;` },
        { type: 'note', value: 'The LEFT JOIN matters here: a course with zero enrollments must still appear with a count of 0. An INNER JOIN would hide it.' },
      ],
    },
    {
      id: 'sql-many-to-many',
      title: 'Many-to-many',
      blocks: [
        { type: 'text', value: 'A student can take many courses, and a course can have many students. A plain foreign key cannot express that, so you add a junction table with one row per pair.' },
        { type: 'text', value: 'enrollments is exactly that junction table: student_id plus course_id, with a composite primary key so the same pair cannot appear twice. The score column stores data about the relationship itself.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT s.name, COUNT(e.course_id) AS courses_taken
FROM students s
JOIN enrollments e ON e.student_id = s.id
GROUP BY s.id, s.name
ORDER BY courses_taken DESC, s.name;` },
        { type: 'list', items: [
          'Composite primary key (student_id, course_id) stops duplicates',
          'Extra columns such as score or enrolled_at describe the link',
          'Both foreign keys should be indexed for fast lookups',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'keys-relationships',
      q: 'What must a primary key be?',
      options: ['Unique and not null', 'A text value', 'Always auto-incremented', 'A foreign key'],
      answer: 0,
      explain: 'A primary key identifies one row, so duplicates or missing values are not allowed.',
    },
    {
      chapterId: 'keys-relationships',
      q: 'What does a foreign key guarantee?',
      options: ['The value is unique', 'The referenced row exists', 'The column is indexed', 'The value is positive'],
      answer: 1,
      explain: 'A foreign key enforces referential integrity: it must match a primary key in the referenced table.',
    },
    {
      chapterId: 'keys-relationships',
      q: 'Where does the foreign key live in a one-to-many relationship?',
      options: ['On the "one" side', 'On the "many" side', 'In a separate table', 'Nowhere'],
      answer: 1,
      explain: 'Many rows point to one parent, so the foreign key goes on the many side, for example enrollments.course_id.',
    },
    {
      chapterId: 'keys-relationships',
      q: 'Why does a many-to-many relationship need a junction table?',
      options: [
        'To store extra columns only',
        'Because each side can match many rows, so pairs need their own table',
        'Because SQL forbids two foreign keys in one table',
        'To make queries shorter',
      ],
      answer: 1,
      explain: 'The junction table stores one row per pair, with a composite key preventing duplicates.',
    },
    {
      chapterId: 'keys-relationships',
      q: 'Which query shows courses with zero enrollments?',
      options: [
        'INNER JOIN and GROUP BY',
        'LEFT JOIN from courses and COUNT(e.id)',
        'CROSS JOIN and COUNT(*)',
        'RIGHT JOIN and WHERE count = 0',
      ],
      answer: 1,
      explain: 'LEFT JOIN keeps every course; COUNT(e.id) returns 0 when no enrollment matched.',
    },
  ],
};
