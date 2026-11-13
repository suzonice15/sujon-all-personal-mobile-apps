// MySQL chapter: InnoDB Engine.

export default {
  id: 'innodb',
  title: 'InnoDB Engine',
  description: 'Transactions, MVCC, row locking and clustered index',
  icon: 'sync',
  lessons: [
    {
      id: 'mysql-innodb-mvcc',
      title: 'MVCC in InnoDB',
      blocks: [
        { type: 'text', value: 'InnoDB uses Multi-Version Concurrency Control. An UPDATE creates a new version of the row and marks the old one as deleted. Readers see a consistent snapshot without locking writers.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `BEGIN;
UPDATE courses SET price = price + 500 WHERE id = 1;
-- other sessions still see the old price until this commits
COMMIT;` },
        { type: 'note', value: 'Dead rows are cleaned up by the purge thread. Heavy updates create bloat, which is why monitoring matters on write-heavy tables.' },
      ],
    },
    {
      id: 'mysql-innodb-locking',
      title: 'Row-level locking',
      blocks: [
        { type: 'text', value: 'InnoDB locks rows, not tables, during UPDATE and DELETE. You can lock explicitly with SELECT ... FOR UPDATE. Locks are released at commit or rollback.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `BEGIN;
SELECT * FROM courses WHERE id = 1 FOR UPDATE;
-- other sessions that try to update this row wait here
UPDATE courses SET price = 7000 WHERE id = 1;
COMMIT;` },
        { type: 'list', items: [
          'FOR UPDATE - locks rows for update',
          'FOR SHARE - allows reads but blocks writes',
          'SKIP LOCKED - skips locked rows, useful for job queues',
          'Deadlocks happen when two transactions wait on each other',
        ] },
        { type: 'note', value: 'Lock rows in a consistent order across transactions to avoid deadlocks. If you cannot, add a retry loop for deadlock errors.' },
      ],
    },
    {
      id: 'mysql-innodb-clustered',
      title: 'Clustered index',
      blocks: [
        { type: 'text', value: 'InnoDB stores rows in the order of the primary key. The primary key is the clustered index. Secondary indexes store the primary key value, so lookups go through the primary key. This makes the primary key choice important.' },
        { type: 'list', items: [
          'Primary key is the clustered index: rows are stored in PK order',
          'Secondary indexes store the PK value, not a row pointer',
          'A wide primary key makes all secondary indexes larger',
          'Use an auto-increment integer or a UUID for the primary key',
          'An auto-increment PK gives sequential inserts, which is cache-friendly',
        ] },
        { type: 'note', value: 'Choose the primary key carefully. A random UUID causes page splits and fragmentation; an auto-increment integer is sequential and efficient.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'innodb',
      q: 'What does InnoDB use for concurrency?',
      options: ['Table-level locks only', 'MVCC with row-level locking', 'File-level locks', 'No concurrency control'],
      answer: 1,
      explain: 'InnoDB uses MVCC and row-level locks.',
    },
    {
      chapterId: 'innodb',
      q: 'What is a clustered index?',
      options: ['A separate index file', 'The primary key stored with the row data', 'A full-text index', 'A hash index'],
      answer: 1,
      explain: 'InnoDB stores rows in primary key order.',
    },
    {
      chapterId: 'innodb',
      q: 'What does FOR UPDATE SKIP LOCKED do?',
      options: ['Locks every row', 'Skips rows that are already locked', 'Deletes locked rows', 'Commits early'],
      answer: 1,
      explain: 'It is useful for job queues where workers pick unlocked rows.',
    },
    {
      chapterId: 'innodb',
      q: 'Why is an auto-increment primary key efficient?',
      options: ['It is random', 'It gives sequential inserts, which is cache-friendly', 'It is smaller', 'It encrypts data'],
      answer: 1,
      explain: 'Sequential inserts avoid page splits.',
    },
  ],
};
