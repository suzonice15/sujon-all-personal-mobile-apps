// SQLite interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is SQLite?',
      a: 'An embedded relational database stored in a single file, with no server process.',
      level: 'basic',
    },
    {
      q: 'When is SQLite a poor fit?',
      a: 'For a busy multi-user server with many concurrent writers.',
      level: 'intermediate',
    },
    {
      q: 'What does INTEGER PRIMARY KEY do?',
      a: 'It aliases the rowid and auto-assigns a unique key.',
      level: 'basic',
    },
    {
      q: 'Why is AUTOINCREMENT rarely needed?',
      a: 'A plain INTEGER PRIMARY KEY reuses freed ids; AUTOINCREMENT adds overhead to prevent that.',
      level: 'intermediate',
    },
  ],
  'types-affinity': [
    {
      q: 'What are the storage classes?',
      a: 'NULL, INTEGER, REAL, TEXT and BLOB.',
      level: 'basic',
    },
    {
      q: 'What is type affinity?',
      a: 'A rule that converts values toward the declared column type on insert.',
      level: 'intermediate',
    },
    {
      q: 'What do STRICT tables do?',
      a: 'They enforce the declared types and reject values of another type.',
      level: 'intermediate',
    },
    {
      q: 'What is the risk of dynamic typing?',
      a: '“5” can silently become 5, or a number can be stored in a text column, causing subtle bugs.',
      level: 'advanced',
    },
  ],
  queries: [
    {
      q: 'How do you filter rows?',
      a: 'With WHERE. ORDER BY sorts and LIMIT caps the result.',
      level: 'basic',
    },
    {
      q: 'What is a CTE?',
      a: 'A named query declared with WITH, useful for readability and filtering window results.',
      level: 'intermediate',
    },
    {
      q: 'How is JSON stored?',
      a: 'As text. Use json_extract and related functions to query it.',
      level: 'intermediate',
    },
    {
      q: 'Why use parameters instead of concatenation?',
      a: 'To prevent SQL injection and handle quoting correctly.',
      level: 'basic',
    },
  ],
  indexes: [
    {
      q: 'What structure does SQLite use for indexes?',
      a: 'B-trees.',
      level: 'basic',
    },
    {
      q: 'What does EXPLAIN QUERY PLAN show?',
      a: 'How the query will run: scans, index use and joins.',
      level: 'intermediate',
    },
    {
      q: 'What does WAL mode improve?',
      a: 'Concurrency: readers can continue while a writer works.',
      level: 'intermediate',
    },
    {
      q: 'Are foreign keys enforced by default?',
      a: 'No. Enable PRAGMA foreign_keys = ON on the connection.',
      level: 'basic',
    },
  ],
  transactions: [
    {
      q: 'Why batch inserts in one transaction?',
      a: 'It avoids a commit per row, which is dramatically faster.',
      level: 'basic',
    },
    {
      q: 'How many writers does SQLite allow?',
      a: 'One writer at a time, even in WAL mode.',
      level: 'basic',
    },
    {
      q: 'What does SQLITE_BUSY mean?',
      a: 'A lock is held by another connection. Retry with a backoff or serialize writes.',
      level: 'intermediate',
    },
    {
      q: 'What is a busy timeout?',
      a: 'A setting that makes a write wait briefly for a lock instead of failing immediately.',
      level: 'intermediate',
    },
  ],
  'embedded-mobile': [
    {
      q: 'How is SQLite used on mobile?',
      a: 'As the local database for app data that must survive restarts, through a platform wrapper.',
      level: 'basic',
    },
    {
      q: 'Is a SQLite file encrypted?',
      a: 'Not by default. Use SQLCipher or store keys in the platform keystore.',
      level: 'intermediate',
    },
    {
      q: 'Where should secrets be stored?',
      a: 'In the platform secure storage such as Keychain or Keystore, never in the database.',
      level: 'basic',
    },
    {
      q: 'Why version the schema?',
      a: 'So existing installs can migrate their data when the app updates.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you design an offline app database?',
      a: 'STRICT tables with keys, indexes for hot queries, user_version migrations, WAL and a sync rule.',
      level: 'intermediate',
    },
    {
      q: 'How do you pick an index?',
      a: 'Look at the WHERE, JOIN and ORDER BY columns, then confirm with EXPLAIN QUERY PLAN.',
      level: 'intermediate',
    },
    {
      q: 'How do you secure local data?',
      a: 'Encrypt sensitive columns or the file, keep keys in the keystore, and never store passwords.',
      level: 'advanced',
    },
    {
      q: 'What is the best first step?',
      a: 'Create a simple schema with an INTEGER PRIMARY KEY.',
      level: 'basic',
    },
  ],
  'fts-json': [
    {
      q: 'Why is FTS5 faster than LIKE?',
      a: 'FTS5 maintains an inverted index of terms, so a search looks up the term instead of scanning every row.',
      level: 'basic',
    },
    {
      q: 'How do you search a JSON field efficiently?',
      a: 'Extract it into a generated column and index that column.',
      level: 'intermediate',
    },
    {
      q: 'What does ANALYZE do?',
      a: 'It gathers statistics so the query planner can choose better indexes.',
      level: 'intermediate',
    },
    {
      q: 'Why should VACUUM be scheduled?',
      a: 'It rewrites the file to reclaim free pages after deletes. It needs temporary free disk space and should not run constantly.',
      level: 'advanced',
    },
  ],
};
