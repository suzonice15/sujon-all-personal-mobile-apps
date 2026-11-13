// Node.js chapter: Databases.

export default {
  id: 'database',
  title: 'Databases',
  description: 'Queries, pooling, transactions and the N+1 trap',
  icon: 'storage',
  lessons: [
    {
      id: 'node-query',
      title: 'Querying from Node',
      blocks: [
        { type: 'text', value: 'The driver sends SQL and returns rows. Use a connection pool rather than one connection per request, so the app reuses a small set of connections.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

export async function findCourse(id) {
  const { rows } = await pool.query(
    'SELECT id, title, price FROM courses WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}` },
        { type: 'text', value: 'The $1 placeholder sends the value separately from the SQL. It prevents SQL injection and handles quoting correctly.' },
        { type: 'note', value: 'Never build SQL with string templates: "WHERE id = " + id is an injection waiting to happen. Placeholders are not optional.' },
      ],
    },
    {
      id: 'node-transactions',
      title: 'Transactions',
      blocks: [
        { type: 'text', value: 'A transaction groups writes so they all succeed or all roll back. Money, inventory and multi-table updates need one.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const client = await pool.connect();
try {
  await client.query('BEGIN');

  await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [100, 1]);
  await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [100, 2]);

  await client.query('COMMIT');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
}` },
        { type: 'text', value: 'Always release the client in finally. A leaked connection eventually exhausts the pool and the whole API stops responding.' },
        { type: 'note', value: 'Keep the transaction short. Do not call an external API or send an email inside it; a slow network should not hold database locks.' },
      ],
    },
    {
      id: 'node-n-plus-one',
      title: 'The N+1 query problem',
      blocks: [
        { type: 'text', value: 'Load a list with one query, then run another query for each row, and you have N+1 queries. It works on ten rows and dies on ten thousand.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Bad: one query per course
const courses = await findCourses();
for (const course of courses) {
  course.lessons = await findLessons(course.id);
}

// Good: one query for the lessons, then group in memory
const courses = await findCourses();
const lessons = await findLessonsForCourses(courses.map(c => c.id));
const byCourse = Map.groupBy(lessons, l => l.course_id);` },
        { type: 'text', value: 'A join is often even better than a second query. Measure the number of round trips, not just the time on your laptop.' },
        { type: 'note', value: 'ORMs hide N+1 behind lazy relations. Enable query logging in development and count the queries per request.' },
      ],
    },
    {
      id: 'node-orm',
      title: 'ORM or raw SQL',
      blocks: [
        { type: 'list', items: [
          'Raw SQL: full control, explicit, great for reports',
          'ORM: typed models, migrations, less boilerplate',
          'Query builder: middle ground, composable SQL',
          'Choose one per project and keep it consistent',
        ] },
        { type: 'text', value: 'An ORM is not a replacement for SQL knowledge. You still need indexes, joins, transactions and query plans when something is slow.' },
        { type: 'note', value: 'For a small API, raw SQL with a thin helper is often simpler than a heavy ORM. For a large team, a typed ORM can prevent whole classes of mistakes.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'database',
      q: 'Why use a connection pool?',
      options: ['To reuse connections instead of opening one per request', 'To store JSON', 'To replace SQL', 'To enable CORS'],
      answer: 0,
      explain: 'Opening a connection is expensive; a pool keeps a small reusable set.',
    },
    {
      chapterId: 'database',
      q: 'What does a parameterized query prevent?',
      options: ['Slow disks', 'SQL injection', 'CORS errors', 'Token expiry'],
      answer: 1,
      explain: 'Values are sent separately, so they cannot change the SQL structure.',
    },
    {
      chapterId: 'database',
      q: 'What must happen in finally after a transaction?',
      options: ['COMMIT', 'Release the client', 'Open a new pool', 'Delete the table'],
      answer: 1,
      explain: 'Leaking a connection exhausts the pool.',
    },
    {
      chapterId: 'database',
      q: 'What is the N+1 problem?',
      options: ['One query for a list plus one per row', 'N indexes on one table', 'A query with N joins', 'N transactions'],
      answer: 0,
      explain: 'It multiplies database round trips and becomes slow as the list grows.',
    },
  ],
};
