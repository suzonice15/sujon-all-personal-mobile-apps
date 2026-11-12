// PostgreSQL chapter: Transactions & Concurrency.

export default {
  id: 'transactions',
  title: 'Transactions & Concurrency',
  description: 'MVCC, isolation levels and locking',
  icon: 'sync',
  lessons: [
    {
      id: 'pg-mvcc',
      title: 'MVCC',
      blocks: [
        { type: 'text', value: 'PostgreSQL uses Multi-Version Concurrency Control. An UPDATE does not overwrite the row; it creates a new version and marks the old one dead. Readers see a consistent snapshot without locking writers, and writers do not block readers.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `BEGIN;
UPDATE courses SET price = price + 500 WHERE id = 1;
-- other sessions still see the old price until this commits
COMMIT;` },
        { type: 'note', value: 'Dead rows are cleaned up by VACUUM. Heavy updates create bloat, which is why autovacuum tuning matters on write-heavy tables.' },
      ],
    },
    {
      id: 'pg-isolation',
      title: 'Isolation levels',
      blocks: [
        { type: 'text', value: 'Isolation levels control what a transaction can see from concurrent transactions. PostgreSQL supports Read Committed (the default), Repeatable Read and Serializable. Higher isolation prevents more anomalies but can cause retries.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `BEGIN ISOLATION LEVEL SERIALIZABLE;
SELECT * FROM courses WHERE price < 5000;
-- another transaction cannot change these rows until commit
COMMIT;` },
        { type: 'list', items: [
          'Read Committed - each statement sees the latest committed data',
          'Repeatable Read - the whole transaction sees one snapshot',
          'Serializable - transactions run as if one after another',
          'Serializable may fail with a serialization error; retry the transaction',
        ] },
      ],
    },
    {
      id: 'pg-locking',
      title: 'Locking',
      blocks: [
        { type: 'text', value: 'PostgreSQL locks rows automatically during UPDATE and DELETE. You can lock explicitly with SELECT ... FOR UPDATE to reserve rows. Locks are released at commit or rollback.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `BEGIN;
SELECT * FROM courses WHERE id = 1 FOR UPDATE;
-- other sessions that try to update this row wait here
UPDATE courses SET price = 7000 WHERE id = 1;
COMMIT;` },
        { type: 'list', items: [
          'FOR UPDATE - locks rows for update',
          'FOR SHARE - allows reads but blocks writes',
          'FOR UPDATE SKIP LOCKED - skips locked rows, useful for job queues',
          'Deadlocks happen when two transactions wait on each other; PostgreSQL detects and aborts one',
        ] },
        { type: 'note', value: 'Lock rows in a consistent order across transactions to avoid deadlocks. If you cannot, add a retry loop for deadlock errors.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'transactions',
      q: 'What does MVCC let readers do?',
      options: ['Block writers', 'Read a consistent snapshot without locking', 'Delete dead rows', 'Create indexes'],
      answer: 1,
      explain: 'Readers see a snapshot without waiting for writers.',
    },
    {
      chapterId: 'transactions',
      q: 'What is the default isolation level in PostgreSQL?',
      options: ['Serializable', 'Read Committed', 'Repeatable Read', 'Read Uncommitted'],
      answer: 1,
      explain: 'Read Committed is the default.',
    },
    {
      chapterId: 'transactions',
      q: 'What happens when a serializable transaction conflicts?',
      options: ['It waits forever', 'It may fail with a serialization error that you retry', 'It ignores the conflict', 'The database restarts'],
      answer: 1,
      explain: 'Serializable transactions can fail and must be retried.',
    },
    {
      chapterId: 'transactions',
      q: 'What does FOR UPDATE SKIP LOCKED do?',
      options: ['Locks every row', 'Skips rows that are already locked', 'Deletes locked rows', 'Commits early'],
      answer: 1,
      explain: 'It is useful for job queues where workers pick unlocked rows.',
    },
  ],
};
