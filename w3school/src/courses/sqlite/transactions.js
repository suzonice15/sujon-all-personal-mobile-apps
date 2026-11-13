// SQLite chapter: Transactions & Concurrency.

export default {
  id: 'transactions',
  title: 'Transactions & Concurrency',
  description: 'Atomic writes, WAL and busy timeouts',
  icon: 'sync',
  lessons: [
    {
      id: 'sq-transactions',
      title: 'Transactions',
      blocks: [
        { type: 'text', value: 'A transaction groups writes so they commit together. Use BEGIN, then COMMIT or ROLLBACK. Batch many inserts in one transaction for a large speed gain.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `BEGIN;
INSERT INTO courses (title, price) VALUES ('A', 1000);
INSERT INTO courses (title, price) VALUES ('B', 2000);
COMMIT;` },
        { type: 'note', value: 'One insert per transaction is very slow. Batch writes inside a single transaction.' },
      ],
    },
    {
      id: 'sq-wal-concurrency',
      title: 'WAL and concurrency',
      blocks: [
        { type: 'text', value: 'By default, a writer blocks readers. WAL mode lets readers continue while a writer works, which suits apps. There is still only one writer at a time.' },
        { type: 'list', items: [
          'Enable WAL for app databases',
          'One writer at a time remains',
          'Set a busy timeout so writes wait briefly',
          'Keep transactions short',
          'Checkpoint the WAL on long-running apps',
        ] },
        { type: 'code', lang: 'sql', tryIt: false, value: `PRAGMA journal_mode = WAL;
PRAGMA busy_timeout = 5000;` },
      ],
    },
    {
      id: 'sq-locking',
      title: 'Locking and errors',
      blocks: [
        { type: 'text', value: 'A concurrent write can return SQLITE_BUSY. Handle it by retrying with a short backoff or by queueing writes through one connection.' },
        { type: 'code', lang: 'js', tryIt: false, value: `try {
  await db.run('INSERT INTO courses (title, price) VALUES (?, ?)', ['X', 1000]);
} catch (err) {
  if (String(err).includes('SQLITE_BUSY')) {
    await retryWithBackoff();
  } else {
    throw err;
  }
}` },
        { type: 'note', value: 'Do not retry forever. A persistent lock usually means a transaction was left open.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'transactions',
      q: 'Why batch inserts in a transaction?',
      options: ['For style', 'It is much faster than one transaction per insert', 'To encrypt', 'To index'],
      answer: 1,
      explain: 'Batching avoids per-write commit cost.',
    },
    {
      chapterId: 'transactions',
      q: 'What does WAL allow?',
      options: ['Many writers', 'Readers while a writer works', 'No locking', 'Encryption'],
      answer: 1,
      explain: 'Readers do not block on the writer.',
    },
    {
      chapterId: 'transactions',
      q: 'How many writers at once?',
      options: ['Unlimited', 'One', 'Two', 'None'],
      answer: 1,
      explain: 'SQLite allows one writer.',
    },
    {
      chapterId: 'transactions',
      q: 'What does SQLITE_BUSY mean?',
      options: ['The file is corrupt', 'A lock is held', 'The query is invalid', 'The disk is full'],
      answer: 1,
      explain: 'Retry with backoff.',
    },
  ],
};
