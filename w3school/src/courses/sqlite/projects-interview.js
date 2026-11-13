// SQLite chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a local database for an app',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'sq-project',
      title: 'Project: an offline course app',
      blocks: [
        { type: 'text', value: 'Design a SQLite schema for courses, lessons and progress. Add indexes, write a migration, and build two queries: the next lesson and the completion percentage. Then test with a copied database file.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE progress (
  lesson_id INTEGER PRIMARY KEY,
  completed INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
) STRICT;

CREATE INDEX idx_progress_completed ON progress(completed);` },
        { type: 'list', items: [
          'Keys and constraints',
          'Indexes for the hot queries',
          'A migration path',
          'WAL and busy timeout',
          'A backup before risky changes',
        ] },
        { type: 'note', value: 'A small offline app with migrations and a query plan is a strong portfolio piece.' },
      ],
    },
    {
      id: 'sq-interview',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is SQLite and when use it?',
          'How does type affinity work?',
          'When use STRICT tables?',
          'How do transactions and WAL work?',
          'How many writers are allowed?',
          'How do you handle SQLITE_BUSY?',
          'How do you migrate a mobile schema?',
          'How do you secure local data?',
        ] },
        { type: 'text', value: 'Strong answers name the trade-off. “SQLite is perfect for a local app database and wrong for a busy multi-writer server” is a complete answer.' },
        { type: 'note', value: 'Be ready to read a schema and suggest an index for a given query.' },
      ],
    },
    {
      id: 'sq-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: CLI and first tables',
          'Week 2: types, affinity and STRICT',
          'Week 3: queries and joins',
          'Week 4: indexes and query plans',
          'Week 5: transactions and WAL',
          'Week 6: mobile storage and migrations',
          'Week 7: build and test the offline app',
        ] },
        { type: 'note', value: 'Learn SQL first. SQLite specifics matter once the query logic is clear.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which key is fastest in SQLite?',
      options: ['TEXT primary key', 'INTEGER PRIMARY KEY', 'A random blob', 'A view'],
      answer: 1,
      explain: 'It aliases the rowid.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should a mobile schema have?',
      options: ['No version', 'A migration path', 'Only one table', 'No indexes'],
      answer: 1,
      explain: 'Users update the app, not the data.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes an offline app project strong?',
      options: ['No tests', 'Schema, migrations, indexes and a sync rule', 'A copied tutorial', 'No constraints'],
      answer: 1,
      explain: 'A complete design shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first step?',
      options: ['Encryption', 'A simple schema with a primary key', 'WAL tuning', 'Sync'],
      answer: 1,
      explain: 'Start with the schema.',
    },
  ],
};
