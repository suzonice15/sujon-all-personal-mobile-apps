// SQLite chapter: FTS, JSON & Tuning.

export default {
  id: 'fts-json',
  title: 'FTS, JSON & Tuning',
  description: 'Full-text search, JSON queries and maintenance',
  icon: 'search',
  lessons: [
    {
      id: 'sq-fts',
      title: 'Full-text search',
      blocks: [
        { type: 'text', value: 'LIKE %term% cannot use an index. FTS5 builds an inverted index for fast text search, ranking and snippets.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `CREATE VIRTUAL TABLE course_fts\nUSING fts5(title, body);\n\nINSERT INTO course_fts (title, body)\nVALUES ('SQL joins', 'Learn inner and left joins');\n\nSELECT title, rank\nFROM course_fts\nWHERE course_fts MATCH 'joins'\nORDER BY rank;` },
        { type: 'list', items: [
          'FTS5 for searching text columns',
          'MATCH instead of LIKE for terms',
          'Rank orders by relevance',
          'Keep the FTS table in sync with triggers',
          'Rebuild the index after bulk changes',
        ] },
        { type: 'note', value: 'FTS5 supports tokenizers and prefixes. A prefix query is “joins*”, not “%joins%”.' },
      ],
    },
    {
      id: 'sq-json',
      title: 'JSON functions',
      blocks: [
        { type: 'text', value: 'JSON is stored as text. Use json_extract, json_each and generated columns to query and index it without parsing in the app.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE events (\n  id INTEGER PRIMARY KEY,\n  payload TEXT NOT NULL\n);\n\nINSERT INTO events (payload)\nVALUES ('{"type":"enroll","course":3}');\n\nSELECT json_extract(payload, '$.type') AS kind\nFROM events\nWHERE json_extract(payload, '$.course') = 3;` },
        { type: 'code', lang: 'sql', tryIt: false, value: `ALTER TABLE events\nADD COLUMN course_id INTEGER\nGENERATED ALWAYS AS (json_extract(payload, '$.course')) VIRTUAL;\n\nCREATE INDEX idx_events_course ON events(course_id);` },
        { type: 'note', value: 'A generated column plus an index gives JSON fields real index performance.' },
      ],
    },
    {
      id: 'sq-maintenance',
      title: 'Tuning and maintenance',
      blocks: [
        { type: 'text', value: 'SQLite needs little tuning, but a few pragmas and a periodic maintenance step prevent slow queries and a growing file.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `PRAGMA journal_mode = WAL;\nPRAGMA synchronous = NORMAL;\nPRAGMA foreign_keys = ON;\nPRAGMA busy_timeout = 5000;\n\nANALYZE;\nVACUUM;\nPRAGMA optimize;` },
        { type: 'list', items: [
          'Run ANALYZE after large data changes',
          'VACUUM reclaims free pages',
          'Checkpoint the WAL on long-running apps',
          'Use EXPLAIN QUERY PLAN before adding indexes',
          'Keep one writer connection in the app',
        ] },
        { type: 'note', value: 'VACUUM rewrites the file and needs free disk space. Do not run it in a tight loop.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'fts-json',
      q: 'Why use FTS5 instead of LIKE?',
      options: ['It is simpler', 'It uses an inverted index for fast search', 'It encrypts', 'It stores JSON'],
      answer: 1,
      explain: 'FTS5 indexes terms.',
    },
    {
      chapterId: 'fts-json',
      q: 'How is JSON stored in SQLite?',
      options: ['Binary tree', 'Text', 'A separate table', 'A blob index'],
      answer: 1,
      explain: 'JSON is text plus functions.',
    },
    {
      chapterId: 'fts-json',
      q: 'What does a generated column enable?',
      options: ['Faster writes', 'Indexing a JSON field', 'Encryption', 'Backups'],
      answer: 1,
      explain: 'You can index the extracted value.',
    },
    {
      chapterId: 'fts-json',
      q: 'What does VACUUM do?',
      options: ['Encrypts', 'Reclaims free pages and rewrites the file', 'Creates an index', 'Deletes rows'],
      answer: 1,
      explain: 'It compacts the database file.',
    },
  ],
};
