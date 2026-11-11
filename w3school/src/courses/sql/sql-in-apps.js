// SQL chapter: SQL in Real Apps.

export default {
  id: 'sql-in-apps',
  title: 'SQL in Real Apps',
  description: 'Connect SQL to code safely and keep schemas in sync',
  icon: 'devices',
  lessons: [
    {
      id: 'sql-sqlite-mobile',
      title: 'SQLite in mobile apps',
      blocks: [
        { type: 'text', value: 'SQLite is a full SQL database inside a single file. It needs no server, so it is perfect for offline data on a phone. This app uses react-native-sqlite-storage for lessons, progress, coins and sync queues.' },
        { type: 'list', items: [
          'Fast local reads with no network',
          'Data survives app restarts',
          'A queue of changes can sync when the internet returns',
          'One file per app, private to the app sandbox',
        ] },
        { type: 'code', lang: 'sql', tryIt: true, value: `SELECT name, city
FROM students
WHERE city = 'Dhaka'
ORDER BY name
LIMIT 10;` },
        { type: 'note', value: 'SQLite is not a replacement for your server database. Treat the phone as a cache plus an outbox: store locally, sync to the server, and resolve conflicts with clear rules.' },
      ],
    },
    {
      id: 'sql-injection',
      title: 'SQL injection and parameters',
      blocks: [
        { type: 'text', value: 'Never paste user input into a SQL string. An email like x@x.com\' OR \'1\'=\'1 can turn a login query into "return every user". This is SQL injection, one of the oldest and most damaging bugs on the web.' },
        { type: 'text', value: 'Wrong: string concatenation. The input becomes part of the SQL itself.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Never do this
const sql = "SELECT * FROM users WHERE email = '" + email + "'";
db.executeSql(sql);` },
        { type: 'text', value: 'Right: placeholders. The database receives the SQL and the values separately, so the value can never change the structure of the query.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Parameterized query
const [res] = await db.executeSql(
  'SELECT id, name FROM users WHERE email = ? AND password_hash = ?',
  [email, passwordHash]
);` },
        { type: 'note', value: 'The same rule applies in PHP with PDO, in Node with pg or mysql2, and in Python with the DB-API. Placeholders are the standard, not an optional nicety.' },
      ],
    },
    {
      id: 'sql-migrations',
      title: 'Migrations',
      blocks: [
        { type: 'text', value: 'A migration is a versioned script that changes the schema. Instead of editing tables by hand, every environment runs the same ordered list of migrations and ends up identical.' },
        { type: 'list', items: [
          'Create tables and indexes in the first migration',
          'Add columns in later migrations; never rewrite history',
          'Record which migrations have run',
          'Make each migration safe to run once, and test it on a copy',
        ] },
        { type: 'text', value: 'This app already follows the pattern: db.js creates the first schema, migrations.js adds columns only when they are missing, and courseProgress creates its own tables once.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE IF NOT EXISTS schema_migrations (
  version INTEGER PRIMARY KEY,
  applied_at TEXT DEFAULT (datetime('now', 'localtime'))
);

INSERT INTO schema_migrations (version) VALUES (1);
SELECT * FROM schema_migrations;` },
        { type: 'note', value: 'Never edit a migration that has already run in production. Add a new one. Editing history leaves some devices with a schema that no code expects.' },
      ],
    },
    {
      id: 'sql-pagination',
      title: 'Pagination and sync patterns',
      blocks: [
        { type: 'text', value: 'Lists should load a page at a time. OFFSET pagination is fine for small data; cursor pagination stays fast when the table is large.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `-- Cursor pagination: first page
SELECT id, name
FROM students
ORDER BY id
LIMIT 2;

-- Next page: pass the last id you received (2)
SELECT id, name
FROM students
WHERE id > 2
ORDER BY id
LIMIT 2;` },
        { type: 'text', value: 'For offline sync, add a synced flag and push unsynced rows when the network returns. The server must be idempotent: receiving the same record twice should not double the points or coins.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE outbox (
  id INTEGER PRIMARY KEY,
  payload TEXT NOT NULL,
  synced INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now', 'localtime'))
);

INSERT INTO outbox (payload) VALUES ('{"type":"coin","amount":10}');

SELECT * FROM outbox WHERE synced = 0;` },
        { type: 'note', value: 'Sync bugs are data bugs. Add a unique server id to each synced row so retries cannot create duplicates.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'sql-in-apps',
      q: 'Why is SQLite a good fit for a mobile app?',
      options: ['It needs a server', 'It runs locally in a single file', 'It has no SQL support', 'It only works online'],
      answer: 1,
      explain: 'SQLite is embedded, serverless and file-based, so it works offline on a phone.',
    },
    {
      chapterId: 'sql-in-apps',
      q: 'What is SQL injection?',
      options: [
        'A slow query',
        'User input changing the structure of a SQL statement',
        'A missing index',
        'A database backup',
      ],
      answer: 1,
      explain: 'When input is concatenated into SQL, it can alter the query, for example bypassing a login.',
    },
    {
      chapterId: 'sql-in-apps',
      q: 'How do you prevent SQL injection?',
      options: ['Escape quotes manually', 'Use parameterized queries', 'Hide the SQL code', 'Use SELECT *'],
      answer: 1,
      explain: 'Placeholders send SQL and values separately, so values cannot change the query structure.',
    },
    {
      chapterId: 'sql-in-apps',
      q: 'Why should a migration that already ran never be edited?',
      options: [
        'It runs faster when old',
        'Some devices would end up with a different schema than the code expects',
        'SQLite forbids edits',
        'It deletes data',
      ],
      answer: 1,
      explain: 'Migrations are history. Changing one that already ran makes environments diverge. Add a new migration instead.',
    },
    {
      chapterId: 'sql-in-apps',
      q: 'Which pagination stays fast on very large tables?',
      options: ['LIMIT with a large OFFSET', 'Cursor pagination with WHERE id > last_id', 'SELECT *', 'ORDER BY without LIMIT'],
      answer: 1,
      explain: 'A cursor uses the index to jump straight to the next rows; a large OFFSET still scans the skipped rows.',
    },
  ],
};
