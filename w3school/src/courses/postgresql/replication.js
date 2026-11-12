// PostgreSQL chapter: Replication & High Availability.

export default {
  id: 'replication',
  title: 'Replication & HA',
  description: 'Streaming replication, failover and backups',
  icon: 'cloud-sync',
  lessons: [
    {
      id: 'pg-streaming-replication',
      title: 'Streaming replication',
      blocks: [
        { type: 'text', value: 'Streaming replication sends WAL (write-ahead log) records from a primary to one or more standbys in real time. Standbys can serve read queries, which offloads the primary.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# On the primary: postgresql.conf
wal_level = replica
max_wal_senders = 5

# Create a replication user
CREATE ROLE replicator WITH REPLICATION LOGIN PASSWORD 'secret';

# On the standby
pg_basebackup -h primary -U replicator -D /var/lib/postgresql/data -P -R` },
        { type: 'note', value: 'Replication lag is the delay between a write on the primary and its appearance on the standby. Monitor it and alert when it grows.' },
      ],
    },
    {
      id: 'pg-failover',
      title: 'Failover',
      blocks: [
        { type: 'text', value: 'When the primary fails, a standby is promoted to become the new primary. Tools such as Patroni or repmgr automate detection and promotion. After failover, the old primary must be rebuilt as a standby.' },
        { type: 'list', items: [
          'Automatic failover detects failure and promotes a standby',
          'Manual failover gives you control but is slower',
          'Synchronous replication waits for the standby before committing',
          'Asynchronous replication is faster but can lose the last writes',
        ] },
        { type: 'note', value: 'Test failover regularly. An untested failover is a guess, and guesses fail at the worst time.' },
      ],
    },
    {
      id: 'pg-backups',
      title: 'Backups and point-in-time recovery',
      blocks: [
        { type: 'text', value: 'pg_dump creates a logical backup. pg_basebackup creates a physical copy. Continuous archiving of WAL files lets you restore to any point in time, which is essential for recovering from mistakes.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Logical backup
pg_dump -Fc courses > courses.dump

# Restore
pg_restore -d courses courses.dump

# Physical base backup
pg_basebackup -D /backup/base -Fp -Xs -P -R` },
        { type: 'list', items: [
          'Test restores regularly; an untested backup is unverified',
          'Store backups off-site and encrypted',
          'Combine base backups with WAL archiving for point-in-time recovery',
          'Document your recovery time objective and recovery point objective',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'replication',
      q: 'What does streaming replication send?',
      options: ['SQL queries', 'WAL records', 'Full tables', 'User passwords'],
      answer: 1,
      explain: 'It streams write-ahead log records.',
    },
    {
      chapterId: 'replication',
      q: 'What is replication lag?',
      options: ['The time to build an index', 'The delay between a write on the primary and its arrival on the standby', 'A network error', 'A backup size'],
      answer: 1,
      explain: 'Lag measures how far behind the standby is.',
    },
    {
      chapterId: 'replication',
      q: 'What does synchronous replication do?',
      options: ['Waits for the standby before committing', 'Skips the standby', 'Deletes old rows', 'Compresses data'],
      answer: 0,
      explain: 'It trades speed for durability.',
    },
    {
      chapterId: 'replication',
      q: 'What is point-in-time recovery?',
      options: ['Restoring only the last hour', 'Restoring to any moment using base backup plus WAL', 'Deleting all data', 'Copying files manually'],
      answer: 1,
      explain: 'WAL archiving enables recovery to any point.',
    },
  ],
};
