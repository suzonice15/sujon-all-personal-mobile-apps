// PostgreSQL chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What PostgreSQL is, installation and psql basics',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'pg-what-is',
      title: 'What is PostgreSQL?',
      blocks: [
        { type: 'text', value: 'PostgreSQL is a powerful, open-source object-relational database. It is known for correctness, extensibility and standards compliance. Many large companies use it as their primary database.' },
        { type: 'list', items: [
          'ACID transactions with MVCC',
          'Rich data types: JSONB, arrays, ranges, UUID, geometric types',
          'Advanced indexing: B-tree, hash, GIN, GiST, SP-GiST, BRIN',
          'Full-text search built in',
          'Extensible: custom types, functions, operators and index methods',
          'Runs on every major platform',
        ] },
        { type: 'note', value: 'PostgreSQL is often called "the most advanced open-source database". It is a safe default choice for most new projects.' },
      ],
    },
    {
      id: 'pg-install-psql',
      title: 'Install and connect',
      blocks: [
        { type: 'text', value: 'Install PostgreSQL from the official packages or use Docker. psql is the command-line client. Connect with a connection string or with individual flags.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Docker (easiest for learning)
docker run --name pg -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:16

# Connect
psql -h localhost -U postgres -d postgres

# Or with a connection string
psql "postgresql://postgres:secret@localhost:5432/postgres"

# Inside psql
\\l          -- list databases
\\c courses  -- connect to a database
\\dt         -- list tables
\\d courses  -- describe a table
\\q          -- quit` },
        { type: 'note', value: 'Use \\x for expanded display when rows are wide. Use \\timing on to measure query duration.' },
      ],
    },
    {
      id: 'pg-first-table',
      title: 'Create your first table',
      blocks: [
        { type: 'text', value: 'A table is defined with CREATE TABLE. Choose column types deliberately. PostgreSQL has rich types, so use the one that matches the data instead of stuffing everything into text.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `CREATE TABLE courses (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    price       INTEGER NOT NULL CHECK (price >= 0),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO courses (title, price) VALUES ('SQL', 5000), ('Postgres', 6000);

SELECT * FROM courses;` },
        { type: 'note', value: 'SERIAL creates an auto-incrementing integer. Modern PostgreSQL prefers GENERATED ALWAYS AS IDENTITY, which follows the SQL standard.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What kind of database is PostgreSQL?',
      options: ['A NoSQL document store', 'An object-relational database', 'A key-value cache', 'A search engine'],
      answer: 1,
      explain: 'PostgreSQL is an object-relational database with rich types.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which psql command lists tables?',
      options: ['\\l', '\\dt', '\\d', '\\q'],
      answer: 1,
      explain: '\\dt lists the tables in the current database.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does SERIAL do?',
      options: ['Creates a text column', 'Creates an auto-incrementing integer', 'Encrypts the column', 'Indexes the column'],
      answer: 1,
      explain: 'SERIAL generates a new integer for each row.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does TIMESTAMPTZ store?',
      options: ['A date only', 'A timestamp with time zone', 'A duration', 'A Unix timestamp'],
      answer: 1,
      explain: 'It stores a timestamp and converts it to the session time zone on output.',
    },
  ],
};
