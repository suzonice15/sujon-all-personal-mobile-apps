// SQLite chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What SQLite is, the CLI and your first table',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'sq-what-is',
      title: 'What is SQLite?',
      blocks: [
        { type: 'text', value: 'SQLite is an embedded relational database. It is a single file, needs no server, and runs inside the application process. It powers phones, browsers, desktop apps and many small websites.' },
        { type: 'list', items: [
          'One file, no server process',
          'Full SQL with transactions',
          'Excellent for local and mobile data',
          'Not built for many concurrent writers',
          'Public domain and extremely stable',
        ] },
        { type: 'note', value: 'SQLite is the right default for an app database. It is the wrong choice for a busy multi-user server with heavy concurrent writes.' },
      ],
    },
    {
      id: 'sq-cli',
      title: 'The CLI',
      blocks: [
        { type: 'text', value: 'The sqlite3 command opens or creates a database file. Dot commands handle schema inspection; SQL handles data.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `sqlite3 codenest.db

.tables
.schema courses
.headers on
.mode column

SELECT * FROM courses;` },
        { type: 'note', value: 'A database is just a file. Copying it while writes are in progress can corrupt it; use the backup command or a transaction.' },
      ],
    },
    {
      id: 'sq-first-table',
      title: 'Your first table',
      blocks: [
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price INTEGER NOT NULL CHECK (price >= 0)
);

INSERT INTO courses (title, price) VALUES ('SQL', 5000), ('SQLite', 3000);

SELECT * FROM courses;` },
        { type: 'note', value: 'INTEGER PRIMARY KEY is an alias for the rowid and is the fastest key. AUTOINCREMENT is rarely needed and adds overhead.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is SQLite?',
      options: ['A client-server database', 'An embedded single-file database', 'A web server', 'A cache'],
      answer: 1,
      explain: 'It is an embedded database.',
    },
    {
      chapterId: 'getting-started',
      q: 'When is SQLite a poor fit?',
      options: ['A mobile app', 'A busy server with many concurrent writers', 'A desktop app', 'A test database'],
      answer: 1,
      explain: 'It is not built for heavy concurrent writes.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does INTEGER PRIMARY KEY alias?',
      options: ['A normal column', 'The rowid', 'A view', 'An index only'],
      answer: 1,
      explain: 'It maps to the rowid.',
    },
    {
      chapterId: 'getting-started',
      q: 'Is AUTOINCREMENT required?',
      options: ['Yes', 'No, it adds overhead and is rarely needed', 'Only on mobile', 'Only for text keys'],
      answer: 1,
      explain: 'A plain INTEGER PRIMARY KEY auto-assigns.',
    },
  ],
};
