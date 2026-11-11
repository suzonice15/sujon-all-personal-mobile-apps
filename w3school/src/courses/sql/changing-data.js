// SQL chapter: Changing Data.

export default {
  id: 'changing-data',
  title: 'Changing Data',
  description: 'Insert, update and delete rows safely',
  icon: 'edit',
  lessons: [
    {
      id: 'sql-insert',
      title: 'INSERT',
      blocks: [
        { type: 'text', value: 'INSERT adds a row. Always list the columns explicitly. If the table changes later, a query that relies on column order breaks without warning.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `INSERT INTO students (name, age, city)
VALUES ('Farhan', 20, 'Rajshahi');

SELECT * FROM students WHERE name = 'Farhan';` },
        { type: 'text', value: 'Multiple rows can be inserted in one statement. This is much faster than one INSERT per row because the database writes once.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `INSERT INTO courses (title, price) VALUES
  ('Node.js', 6500),
  ('TypeScript', 5500);

SELECT * FROM courses WHERE title IN ('Node.js', 'TypeScript');` },
        { type: 'note', value: 'If the id column is INTEGER PRIMARY KEY, SQLite fills it automatically. You do not need to supply an id.' },
      ],
    },
    {
      id: 'sql-update',
      title: 'UPDATE',
      blocks: [
        { type: 'text', value: 'UPDATE changes existing rows. The WHERE clause decides which rows change. Without WHERE, every row in the table is updated.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `UPDATE students
SET city = 'Dhaka'
WHERE name = 'Tanvir';

SELECT name, city FROM students WHERE name = 'Tanvir';` },
        { type: 'text', value: 'You can update several columns at once. Values can also be calculated from the current row.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `UPDATE courses
SET price = price + 500
WHERE title = 'SQL';

SELECT title, price FROM courses WHERE title = 'SQL';` },
        { type: 'note', value: 'A safe habit: run the same WHERE as a SELECT first, check how many rows it returns, then turn it into an UPDATE. A missing WHERE in production is one of the most expensive mistakes in software.' },
      ],
    },
    {
      id: 'sql-delete',
      title: 'DELETE',
      blocks: [
        { type: 'text', value: 'DELETE removes rows. Like UPDATE, it uses WHERE to choose them. WITHOUT WHERE it removes every row but keeps the table.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `DELETE FROM enrollments
WHERE score < 65;

SELECT * FROM enrollments ORDER BY id;` },
        { type: 'text', value: 'DELETE cannot be undone unless it runs inside a transaction that you roll back. Chapter 11 covers that.' },
        { type: 'note', value: 'DELETE FROM students removes all rows. To remove the table itself, use DROP TABLE. To remove rows and reclaim disk space in one step, some databases offer TRUNCATE.' },
      ],
    },
    {
      id: 'sql-upsert-transaction',
      title: 'UPSERT and multiple changes',
      blocks: [
        { type: 'text', value: 'Sometimes you want "insert if missing, otherwise update". This is called an upsert. SQLite and PostgreSQL support ON CONFLICT; MySQL uses ON DUPLICATE KEY UPDATE.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `INSERT INTO students (id, name, age, city)
VALUES (2, 'Rahim', 23, 'Chattogram')
ON CONFLICT(id) DO UPDATE SET
  age = excluded.age,
  city = excluded.city;

SELECT * FROM students WHERE id = 2;` },
        { type: 'text', value: 'The special table excluded holds the row you tried to insert. Upserts are useful for sync jobs: run the same request twice and the result is still correct.' },
        { type: 'note', value: 'Wrap several related changes in a transaction so they succeed or fail together. The next chapters show the full pattern.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'changing-data',
      q: 'Which statement adds a new row?',
      options: ['INSERT', 'UPDATE', 'SELECT', 'ALTER'],
      answer: 0,
      explain: 'INSERT creates rows. UPDATE changes existing rows.',
    },
    {
      chapterId: 'changing-data',
      q: 'What happens if you run UPDATE without WHERE?',
      options: ['Nothing changes', 'Only the first row changes', 'Every row is updated', 'The table is deleted'],
      answer: 2,
      explain: 'The WHERE clause limits the rows. Without it the update applies to the whole table.',
    },
    {
      chapterId: 'changing-data',
      q: 'What is an upsert?',
      options: ['Insert only', 'Insert or update if the row already exists', 'Delete then insert', 'Copy a table'],
      answer: 1,
      explain: 'UPSERT combines insert and update in one statement using a unique key.',
    },
    {
      chapterId: 'changing-data',
      q: 'Which statement removes rows but keeps the table?',
      options: ['DROP TABLE', 'DELETE', 'ALTER TABLE', 'CREATE TABLE'],
      answer: 1,
      explain: 'DELETE removes rows. DROP TABLE removes the table itself.',
    },
    {
      chapterId: 'changing-data',
      q: 'Why should you list columns in INSERT?',
      options: [
        'It runs faster',
        'It keeps working when the table gains columns',
        'It is required by SQLite',
        'It creates indexes automatically',
      ],
      answer: 1,
      explain: 'Without a column list, the insert depends on the physical order of columns and breaks when the schema changes.',
    },
  ],
};
