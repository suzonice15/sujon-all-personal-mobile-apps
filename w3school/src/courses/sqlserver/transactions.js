// SQL Server chapter: Transactions & Locking.

export default {
  id: 'transactions',
  title: 'Transactions & Locking',
  description: 'ACID, isolation levels and deadlocks',
  icon: 'sync',
  lessons: [
    {
      id: 'ss-transactions',
      title: 'Transactions',
      blocks: [
        { type: 'text', value: 'A transaction groups changes so they all commit or all roll back. Use TRY/CATCH with XACT_ABORT for predictable rollback, and keep transactions short.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `SET XACT_ABORT ON;

BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE dbo.Accounts SET Balance = Balance - 100 WHERE Id = 1;
    UPDATE dbo.Accounts SET Balance = Balance + 100 WHERE Id = 2;

    COMMIT;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK;
    THROW;
END CATCH;` },
        { type: 'note', value: 'A long transaction holds locks and blocks other work. Do slow external calls outside the transaction.' },
      ],
    },
    {
      id: 'ss-isolation',
      title: 'Isolation levels',
      blocks: [
        { type: 'text', value: 'SQL Server offers READ UNCOMMITTED, READ COMMITTED (default), REPEATABLE READ, SNAPSHOT and SERIALIZABLE. Higher isolation prevents more anomalies but increases blocking.' },
        { type: 'list', items: [
          'READ COMMITTED: no dirty reads',
          'SNAPSHOT: row versioning, fewer readers blocked',
          'SERIALIZABLE: strictest, most blocking',
          'Use SNAPSHOT for read-heavy apps when enabled',
          'Set the level deliberately per need',
        ] },
        { type: 'note', value: 'SNAPSHOT isolation requires ALLOW_SNAPSHOT_ISOLATION on the database. It avoids reader/writer blocking at the cost of tempdb version storage.' },
      ],
    },
    {
      id: 'ss-deadlocks',
      title: 'Deadlocks',
      blocks: [
        { type: 'text', value: 'A deadlock happens when two sessions wait on each other. SQL Server picks a victim and rolls it back. Prevent by accessing tables in a consistent order and keeping transactions short.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `-- Both sessions should update tables in the same order
BEGIN TRANSACTION;
UPDATE dbo.Accounts SET Balance = Balance - 10 WHERE Id = 1;
UPDATE dbo.Ledger SET Amount = Amount - 10 WHERE AccountId = 1;
COMMIT;` },
        { type: 'note', value: 'Catch deadlock error 1205 and retry the transaction once. Do not retry in an endless loop.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'transactions',
      q: 'What does a transaction guarantee?',
      options: ['Speed', 'All changes commit or none', 'Encryption', 'Compression'],
      answer: 1,
      explain: 'It is atomic.',
    },
    {
      chapterId: 'transactions',
      q: 'What is the default isolation level?',
      options: ['SERIALIZABLE', 'READ COMMITTED', 'SNAPSHOT', 'READ UNCOMMITTED'],
      answer: 1,
      explain: 'READ COMMITTED is the default.',
    },
    {
      chapterId: 'transactions',
      q: 'How do you reduce deadlocks?',
      options: ['Longer transactions', 'Consistent access order and short transactions', 'More indexes', 'Disable logging'],
      answer: 1,
      explain: 'Order and brevity prevent cycles.',
    },
    {
      chapterId: 'transactions',
      q: 'What error signals a deadlock victim?',
      options: ['1205', '500', '404', '2627'],
      answer: 0,
      explain: '1205 is the deadlock victim.',
    },
  ],
};
