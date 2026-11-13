// SQLite chapter: Indexes.

export default {
  id: 'indexes',
  title: 'Indexes',
  description: 'B-tree indexes, query plans and pragmas',
  icon: 'speed',
  lessons: [
    {
      id: 'sq-index-basics',
      title: 'Creating indexes',
      blocks: [
        { type: 'text', value: 'SQLite uses B-tree indexes. Create one on columns used in WHERE, JOIN and ORDER BY. A composite index helps when the leading columns match the filter.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE INDEX idx_courses_price ON courses(price);
CREATE INDEX idx_enroll_course ON enrollments(course_id, user_id);

EXPLAIN QUERY PLAN
SELECT * FROM courses WHERE price > 4000;` },
        { type: 'note', value: 'Explain the plan, not only the query. “SCAN” on a large table is the signal to add or change an index.' },
      ],
    },
    {
      id: 'sq-covering',
      title: 'Covering indexes',
      blocks: [
        { type: 'text', value: 'An index that includes all selected columns lets SQLite answer from the index alone. That avoids a table lookup per row.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE INDEX idx_courses_cover ON courses(price, title);

EXPLAIN QUERY PLAN
SELECT title FROM courses WHERE price > 4000;` },
        { type: 'list', items: [
          'Cover the columns a hot query selects',
          'Composite index order matters',
          'Every index slows writes and uses space',
          'Drop indexes that are never used',
        ] },
      ],
    },
    {
      id: 'sq-pragmas',
      title: 'Useful pragmas',
      blocks: [
        { type: 'text', value: 'PRAGMAs tune the database file. journal_mode WAL improves concurrency; synchronous controls durability; cache_size and foreign_keys matter for correctness and speed.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
PRAGMA synchronous = NORMAL;
PRAGMA cache_size = -20000;   -- about 20 MB` },
        { type: 'note', value: 'Turn foreign_keys on explicitly. SQLite does not enforce foreign keys unless the pragma is enabled in the connection.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'indexes',
      q: 'Which structure do SQLite indexes use?',
      options: ['Hash', 'B-tree', 'Heap', 'Graph'],
      answer: 1,
      explain: 'SQLite uses B-trees.',
    },
    {
      chapterId: 'indexes',
      q: 'What does EXPLAIN QUERY PLAN show?',
      options: ['The schema', 'How the query will run', 'The data', 'The file size'],
      answer: 1,
      explain: 'It shows scans and index use.',
    },
    {
      chapterId: 'indexes',
      q: 'What does WAL improve?',
      options: ['Encryption', 'Concurrency between readers and writers', 'Compression', 'Backups'],
      answer: 1,
      explain: 'WAL reduces reader/writer blocking.',
    },
    {
      chapterId: 'indexes',
      q: 'Are foreign keys enforced by default?',
      options: ['Yes', 'No, enable the pragma', 'Only in STRICT', 'Only on mobile'],
      answer: 1,
      explain: 'Enable PRAGMA foreign_keys.',
    },
  ],
};
