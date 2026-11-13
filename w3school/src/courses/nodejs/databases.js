// Node.js chapter: Databases.

export default {
  id: 'databases',
  title: 'Databases',
  description: 'SQL clients, pooling, transactions and migrations',
  icon: 'storage',
  lessons: [
    {
      id: 'node-db-choice',
      title: 'Choosing a database',
      blocks: [
        { type: 'text', value: 'Use a relational database for structured data and transactions. Use a document store when the shape really varies. The driver matters less than the schema and the query pattern.' },
        { type: 'list', items: [
          'PostgreSQL: default choice for most apps',
          'MySQL/MariaDB: common on shared hosting',
          'MongoDB: flexible documents, careful with joins',
          'Redis: cache, sessions and queues',
          'SQLite: local and single-process apps',
        ] },
        { type: 'note', value: 'Do not pick a database for scale you do not have. A correct schema on Postgres goes very far.' },
      ],
    },
    {
      id: 'node-postgres',
      title: 'Postgres from Node',
      blocks: [
        { type: 'text', value: 'Use a pool, not one connection per request. Always pass values as parameters so the driver escapes them.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import pg from 'pg';\n\nconst pool = new pg.Pool({\n  connectionString: process.env.DATABASE_URL,\n  max: 10,\n  idleTimeoutMillis: 30_000,\n});\n\nexport async function publishedCourses() {\n  const { rows } = await pool.query(\n    'SELECT id, title, price FROM courses WHERE published = $1 ORDER BY title',\n    [true],\n  );\n  return rows;\n}` },
        { type: 'code', lang: 'sql', tryIt: false, value: `CREATE INDEX idx_courses_published_title\n  ON courses (published, title);` },
        { type: 'note', value: 'Never build SQL with string concatenation. The $1 placeholder is what keeps the query safe.' },
      ],
    },
    {
      id: 'node-transactions-migrations',
      title: 'Transactions and migrations',
      blocks: [
        { type: 'text', value: 'A transaction must use the same client for every statement. Take a client from the pool, run BEGIN, COMMIT or ROLLBACK, and always release it.' },
        { type: 'code', lang: 'js', tryIt: false, value: `export async function transfer(fromId, toId, amount) {\n  const client = await pool.connect();\n  try {\n    await client.query('BEGIN');\n    await client.query(\n      'UPDATE accounts SET balance = balance - $1 WHERE id = $2',\n      [amount, fromId],\n    );\n    await client.query(\n      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',\n      [amount, toId],\n    );\n    await client.query('COMMIT');\n  } catch (error) {\n    await client.query('ROLLBACK');\n    throw error;\n  } finally {\n    client.release();\n  }\n}` },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Version the schema as files and run them in order\nmigrations/\n  001_create_courses.sql\n  002_add_published.sql\n\nnpm run migrate` },
        { type: 'note', value: 'A forgotten client.release() drains the pool and hangs the app. Use finally.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'databases',
      q: 'Why use a connection pool?',
      options: ['To cache queries', 'To reuse connections across requests', 'To encrypt data', 'To create tables'],
      answer: 1,
      explain: 'A pool reuses a small set of connections.',
    },
    {
      chapterId: 'databases',
      q: 'How do you pass values safely?',
      options: ['String concatenation', 'Query parameters', 'Template literals in SQL', 'eval'],
      answer: 1,
      explain: 'Parameters prevent injection.',
    },
    {
      chapterId: 'databases',
      q: 'Which client runs the transaction statements?',
      options: ['Any client', 'The same client for all statements', 'A new client per query', 'The pool object only'],
      answer: 1,
      explain: 'A transaction lives on one connection.',
    },
    {
      chapterId: 'databases',
      q: 'Why call client.release()?',
      options: ['To commit', 'To return the connection to the pool', 'To delete data', 'To log'],
      answer: 1,
      explain: 'Leaked clients exhaust the pool.',
    },
  ],
};
