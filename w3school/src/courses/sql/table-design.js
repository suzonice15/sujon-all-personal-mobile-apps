// SQL chapter: Designing Tables.

export default {
  id: 'table-design',
  title: 'Designing Tables',
  description: 'Create schemas, choose types and normalise data',
  icon: 'table-chart',
  lessons: [
    {
      id: 'sql-create-table',
      title: 'CREATE TABLE and data types',
      blocks: [
        { type: 'text', value: 'CREATE TABLE defines the columns, their types and their rules. A good schema prevents bad data from entering the database in the first place.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE teachers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  salary INTEGER DEFAULT 0,
  hired_on TEXT
);

SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'teachers';` },
        { type: 'list', items: [
          'INTEGER - whole numbers, ids, counts',
          'TEXT - any text, also used for dates in ISO format',
          'REAL - decimal numbers',
          'BLOB - binary data such as images',
        ] },
        { type: 'note', value: 'SQLite is flexible about types, but other databases are strict. Choosing the correct type now keeps the schema portable and the data clean.' },
      ],
    },
    {
      id: 'sql-constraints',
      title: 'Constraints',
      blocks: [
        { type: 'text', value: 'Constraints are rules the database enforces on every write. They are the last line of defence, even if a bug in the app skips validation.' },
        { type: 'list', items: [
          'NOT NULL - the column must have a value',
          'UNIQUE - no two rows may share the value',
          'PRIMARY KEY - unique and not null, identifies the row',
          'FOREIGN KEY - the value must exist in another table',
          'CHECK - a custom condition, for example age >= 0',
          'DEFAULT - value used when none is supplied',
        ] },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  stock INTEGER NOT NULL DEFAULT 0
);

INSERT INTO books (title, price) VALUES ('SQL Basics', 450);
SELECT * FROM books;` },
        { type: 'note', value: 'A constraint violation fails the whole statement. Catch that error in the app and show a friendly message instead of crashing.' },
      ],
    },
    {
      id: 'sql-alter-drop',
      title: 'ALTER and DROP',
      blocks: [
        { type: 'text', value: 'Schemas change over time. ALTER TABLE adds, renames or removes columns. DROP TABLE deletes the table and all of its rows permanently.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE notes (
  id INTEGER PRIMARY KEY,
  body TEXT
);

ALTER TABLE notes ADD COLUMN created_at TEXT;

SELECT name FROM pragma_table_info('notes');` },
        { type: 'text', value: 'Older SQLite versions do not support DROP COLUMN. The portable pattern is: create a new table, copy the data, drop the old table, rename the new one. This is also how many production migrations work.' },
        { type: 'note', value: 'Never run ALTER or DROP on a production database by hand. Put every change in a migration file, review it, and run it in order so every environment has the same schema.' },
      ],
    },
    {
      id: 'sql-normalization',
      title: 'Normalisation',
      blocks: [
        { type: 'text', value: 'Normalisation removes repeated data so there is one source of truth. If a student name is copied into ten tables, renaming the student means ten updates and one missed row is a bug.' },
        { type: 'list', items: [
          '1NF - every column holds one value; no lists inside a cell',
          '2NF - every non-key column depends on the whole primary key',
          '3NF - no column depends on another non-key column',
        ] },
        { type: 'text', value: 'Bad design: one enrollments table that also repeats the student name and the course title.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `-- Avoid: duplicated data
CREATE TABLE enrollments_bad (
  id INTEGER PRIMARY KEY,
  student_name TEXT,   -- repeated
  student_city TEXT,   -- repeated
  course_title TEXT,   -- repeated
  score INTEGER
);` },
        { type: 'text', value: 'Good design: ids only. students, courses and enrollments each own their facts, and joins bring them together when needed.' },
        { type: 'note', value: 'Denormalisation is sometimes correct for reporting or performance, but it should be a deliberate choice with a plan to keep the copies in sync. Start normalised.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'table-design',
      q: 'Which constraint prevents duplicate values?',
      options: ['NOT NULL', 'UNIQUE', 'DEFAULT', 'CHECK'],
      answer: 1,
      explain: 'UNIQUE rejects a second row with the same value in that column.',
    },
    {
      chapterId: 'table-design',
      q: 'What does a CHECK constraint do?',
      options: ['Creates an index', 'Enforces a condition on every write', 'Joins two tables', 'Formats output'],
      answer: 1,
      explain: 'CHECK validates a rule, for example price >= 0, before the row is saved.',
    },
    {
      chapterId: 'table-design',
      q: 'What does 1NF require?',
      options: ['Every column holds a single value', 'Every table has a foreign key', 'Every column is indexed', 'Every row has a timestamp'],
      answer: 0,
      explain: 'First normal form forbids repeating groups or lists inside a single column.',
    },
    {
      chapterId: 'table-design',
      q: 'What does DROP TABLE do?',
      options: ['Deletes rows but keeps the table', 'Removes the table and its data', 'Renames the table', 'Creates a backup'],
      answer: 1,
      explain: 'DROP TABLE removes the structure and all rows. DELETE only removes rows.',
    },
    {
      chapterId: 'table-design',
      q: 'Why avoid repeating a student name in many tables?',
      options: [
        'It makes queries shorter',
        'It creates inconsistent copies that are hard to update',
        'SQL cannot store text twice',
        'It uses more indexes',
      ],
      answer: 1,
      explain: 'Duplicated data drifts out of sync. One source of truth, referenced by id, keeps the database consistent.',
    },
  ],
};
