// SQL chapter: Transactions and ACID.

export default {
  id: 'transactions-acid',
  title: 'Transactions & ACID',
  description: 'Keep related changes consistent when things fail',
  icon: 'sync-alt',
  lessons: [
    {
      id: 'sql-transactions',
      title: 'BEGIN, COMMIT and ROLLBACK',
      blocks: [
        { type: 'text', value: 'A transaction groups several statements into one unit. Either every statement succeeds and is saved with COMMIT, or a failure rolls everything back as if nothing happened.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `BEGIN;

UPDATE courses SET price = price - 500 WHERE id = 1;
UPDATE courses SET price = price + 500 WHERE id = 2;

COMMIT;

SELECT id, title, price FROM courses ORDER BY id;` },
        { type: 'text', value: 'If the second statement fails, the first one must not stay applied. Otherwise money or points appear out of nowhere.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `BEGIN;

UPDATE courses SET price = 100 WHERE id = 1;
ROLLBACK;

SELECT id, title, price FROM courses WHERE id = 1;` },
        { type: 'note', value: 'Keep transactions short. A long transaction holds locks, blocks other writes and can make the whole app feel slow.' },
      ],
    },
    {
      id: 'sql-acid',
      title: 'ACID',
      blocks: [
        { type: 'list', items: [
          'Atomicity - all statements succeed or none do',
          'Consistency - constraints stay valid before and after',
          'Isolation - concurrent transactions do not see each other half-done',
          'Durability - committed data survives a crash',
        ] },
        { type: 'text', value: 'A bank transfer is the classic example. Subtract from one account and add to another inside one transaction. Atomicity guarantees the money is never lost between the two steps.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `BEGIN;

UPDATE courses SET price = price - 1000 WHERE id = 3;
UPDATE courses SET price = price + 1000 WHERE id = 4;

COMMIT;

SELECT id, title, price FROM courses WHERE id IN (3, 4);` },
        { type: 'note', value: 'Durability depends on the database and the disk. SQLite with the default journal mode is durable after COMMIT; a phone that loses power mid-transaction recovers to the last committed state.' },
      ],
    },
    {
      id: 'sql-isolation-locks',
      title: 'Isolation and locks',
      blocks: [
        { type: 'text', value: 'When two users read and write at the same time, the database uses isolation levels to decide what they can see. Stronger isolation is safer but slower because transactions wait for each other.' },
        { type: 'list', items: [
          'READ UNCOMMITTED - can see uncommitted changes (rarely used)',
          'READ COMMITTED - sees only committed rows',
          'REPEATABLE READ - the same row looks the same for the whole transaction',
          'SERIALIZABLE - behaves as if transactions ran one after another',
        ] },
        { type: 'text', value: 'SQLite is simpler: one writer at a time. Readers can continue while a write transaction is open, but two writers block each other. That is fine for a phone app and a small server.' },
        { type: 'note', value: 'In mobile apps, wrap multi-step writes in a transaction. In server apps, also think about retries: a deadlock or busy database can reject a transaction, and the correct response is usually to retry once with a short delay.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'transactions-acid',
      q: 'Which statement saves a transaction?',
      options: ['BEGIN', 'COMMIT', 'ROLLBACK', 'SAVE'],
      answer: 1,
      explain: 'COMMIT makes the changes permanent. ROLLBACK discards them.',
    },
    {
      chapterId: 'transactions-acid',
      q: 'What does atomicity mean?',
      options: ['Every statement runs in parallel', 'All statements succeed or none are applied', 'Data is encrypted', 'Queries are cached'],
      answer: 1,
      explain: 'The transaction is all-or-nothing.',
    },
    {
      chapterId: 'transactions-acid',
      q: 'What does durability guarantee?',
      options: ['Committed data survives a crash', 'Queries never fail', 'Reads are always fast', 'Indexes are rebuilt'],
      answer: 0,
      explain: 'Once committed, the data is written safely enough to survive a power loss or crash.',
    },
    {
      chapterId: 'transactions-acid',
      q: 'Why keep transactions short?',
      options: [
        'Long transactions use more disk',
        'They hold locks and block other writers',
        'SQL has a 1 second limit',
        'They cannot contain UPDATE',
      ],
      answer: 1,
      explain: 'Locks held for a long time increase waiting and reduce throughput.',
    },
    {
      chapterId: 'transactions-acid',
      q: 'A transfer subtracts from account A and adds to account B. Where should both statements run?',
      options: ['In separate transactions', 'In one transaction', 'In two connections', 'In a SELECT'],
      answer: 1,
      explain: 'One transaction makes the pair atomic, so money cannot disappear if the second statement fails.',
    },
  ],
};
