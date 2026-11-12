// Redis chapter: Persistence and Replication.

export default {
  id: 'persistence-replication',
  title: 'Persistence & Replication',
  description: 'RDB, AOF, replication and failover',
  icon: 'cloud-sync',
  lessons: [
    {
      id: 'redis-rdb-aof',
      title: 'RDB and AOF',
      blocks: [
        { type: 'text', value: 'Redis can persist data to disk. RDB takes point-in-time snapshots. AOF (append-only file) logs every write. You can use both for durability and fast recovery.' },
        { type: 'code', lang: 'text', tryIt: false, value: `# redis.conf
save 900 1          # snapshot if 1 key changed in 900s
save 300 10
save 60 10000

appendonly yes
appendfsync everysec   # fsync once per second` },
        { type: 'list', items: [
          'RDB: compact snapshots, fast restart, can lose the last minutes',
          'AOF: durable, replays writes, larger files',
          'appendfsync always: safest, slowest',
          'appendfsync everysec: good balance, loses at most one second',
          'Use both for safety and speed',
        ] },
      ],
    },
    {
      id: 'redis-replication',
      title: 'Replication',
      blocks: [
        { type: 'text', value: 'A replica copies data from a primary in real time. Replicas serve reads and provide failover. Replication is asynchronous by default, so a failover can lose the last writes.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# On the replica
REPLICAOF primary_host 6379

# Check replication status
INFO replication` },
        { type: 'note', value: 'Use WAIT after a critical write to ensure at least one replica has it before you continue.' },
      ],
    },
    {
      id: 'redis-sentinel',
      title: 'Sentinel for failover',
      blocks: [
        { type: 'text', value: 'Redis Sentinel monitors primaries and replicas. When a primary fails, Sentinel promotes a replica and reconfigures the others. Clients ask Sentinel for the current primary address.' },
        { type: 'list', items: [
          'Sentinel: monitoring, notification and automatic failover',
          'Needs at least three Sentinel instances for quorum',
          'Clients connect through Sentinel, not directly to the primary',
          'Failover is automatic but not instant; expect a few seconds',
        ] },
        { type: 'note', value: 'Sentinel handles failover but not sharding. For sharding, use Redis Cluster.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'persistence-replication',
      q: 'What does RDB do?',
      options: ['Logs every write', 'Takes point-in-time snapshots', 'Replicates to a standby', 'Compresses keys'],
      answer: 1,
      explain: 'RDB saves snapshots at intervals.',
    },
    {
      chapterId: 'persistence-replication',
      q: 'What does AOF do?',
      options: ['Takes snapshots', 'Logs every write command', 'Deletes old keys', 'Indexes data'],
      answer: 1,
      explain: 'AOF appends each write to a log.',
    },
    {
      chapterId: 'persistence-replication',
      q: 'What does appendfsync everysec mean?',
      options: ['Fsync on every command', 'Fsync once per second', 'No fsync', 'Fsync on shutdown only'],
      answer: 1,
      explain: 'It fsyncs once per second for a balance of speed and safety.',
    },
    {
      chapterId: 'persistence-replication',
      q: 'What does Redis Sentinel do?',
      options: ['Shards data', 'Monitors and performs automatic failover', 'Backs up to disk', 'Compresses values'],
      answer: 1,
      explain: 'Sentinel handles monitoring and failover.',
    },
  ],
};
