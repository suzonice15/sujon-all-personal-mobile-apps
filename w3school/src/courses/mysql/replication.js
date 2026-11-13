// MySQL chapter: Replication.

export default {
  id: 'replication',
  title: 'Replication',
  description: 'Binlog replication, GTID and failover',
  icon: 'cloud-sync',
  lessons: [
    {
      id: 'mysql-binlog',
      title: 'Binary log replication',
      blocks: [
        { type: 'text', value: 'MySQL replication is based on the binary log (binlog). The primary writes every change to the binlog. Replicas connect and read the binlog, applying the same changes. This is asynchronous by default.' },
        { type: 'code', lang: 'text', tryIt: false, value: `# my.cnf on the primary
[mysqld]
server-id=1
log-bin=mysql-bin
binlog-format=ROW

# On the replica
[mysqld]
server-id=2
relay-log=mysql-relay
read-only=1` },
        { type: 'code', lang: 'sql', tryIt: false, value: `-- On the primary
CREATE USER 'replicator'@'%' IDENTIFIED BY 'secret';
GRANT REPLICATION SLAVE ON *.* TO 'replicator'@'%';

-- On the replica
CHANGE REPLICATION SOURCE TO
    SOURCE_HOST='primary',
    SOURCE_USER='replicator',
    SOURCE_PASSWORD='secret',
    SOURCE_AUTO_POSITION=1;
START REPLICA;` },
        { type: 'note', value: 'ROW format is the safest binlog format. It logs the actual row changes instead of the SQL statements.' },
      ],
    },
    {
      id: 'mysql-gtid',
      title: 'GTID',
      blocks: [
        { type: 'text', value: 'Global Transaction Identifiers (GTID) give every transaction a unique ID across the cluster. They make failover and replica promotion much simpler because you do not need to find binlog positions manually.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `-- Enable GTID
SET GLOBAL gtid_mode = ON;
SET GLOBAL enforce_gtid_consistency = ON;

-- Check replica status
SHOW REPLICA STATUS\\G` },
        { type: 'list', items: [
          'GTID identifies each transaction globally',
          'Failover is simpler: point the replica at the new primary',
          'No need to find binlog file and position',
          'Requires GTID mode on all servers in the topology',
        ] },
      ],
    },
    {
      id: 'mysql-failover',
      title: 'Failover',
      blocks: [
        { type: 'text', value: 'When the primary fails, a replica is promoted. MySQL Group Replication and InnoDB Cluster automate this. For manual setups, use a tool such as Orchestrator or MHA.' },
        { type: 'list', items: [
          'Manual failover: promote a replica and reconfigure clients',
          'Semi-synchronous replication: wait for one replica before committing',
          'Group Replication: automatic failover with a quorum',
          'InnoDB Cluster: Group Replication plus MySQL Shell and Router',
        ] },
        { type: 'note', value: 'Test failover regularly. An untested failover is a guess, and guesses fail at the worst time.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'replication',
      q: 'What does the binary log store?',
      options: ['User passwords', 'Every change to the data', 'Index definitions only', 'Backup files'],
      answer: 1,
      explain: 'The binlog records all data changes.',
    },
    {
      chapterId: 'replication',
      q: 'What does GTID provide?',
      options: ['Faster queries', 'A unique ID for each transaction across the cluster', 'Encryption', 'Compression'],
      answer: 1,
      explain: 'GTID simplifies failover and promotion.',
    },
    {
      chapterId: 'replication',
      q: 'Which binlog format is safest?',
      options: ['STATEMENT', 'ROW', 'MIXED', 'NONE'],
      answer: 1,
      explain: 'ROW logs actual row changes.',
    },
    {
      chapterId: 'replication',
      q: 'What does semi-synchronous replication do?',
      options: ['Commits immediately without waiting', 'Waits for at least one replica before committing', 'Skips replication', 'Deletes old logs'],
      answer: 1,
      explain: 'It trades speed for durability.',
    },
  ],
};
