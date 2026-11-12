// Redis chapter: Clustering.

export default {
  id: 'cluster-sentinel',
  title: 'Cluster & Sharding',
  description: 'Redis Cluster, hash slots and scaling',
  icon: 'hub',
  lessons: [
    {
      id: 'redis-cluster',
      title: 'Redis Cluster',
      blocks: [
        { type: 'text', value: 'Redis Cluster shards data across multiple nodes. The keyspace is split into 16384 hash slots, and each node owns a range of slots. A key maps to a slot by hashing the key.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Create a cluster with 3 masters and 3 replicas
redis-cli --cluster create \\
  127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \\
  127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \\
  --cluster-replicas 1

# Check cluster state
redis-cli -p 7000 cluster info
redis-cli -p 7000 cluster nodes` },
        { type: 'note', value: 'A cluster needs at least 3 master nodes for quorum. Each master should have at least one replica.' },
      ],
    },
    {
      id: 'redis-hash-tags',
      title: 'Hash tags and multi-key operations',
      blocks: [
        { type: 'text', value: 'In a cluster, keys on different nodes cannot be used together in a transaction or a Lua script. Hash tags force related keys to the same slot by wrapping part of the key in braces.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# These two keys land on the same slot because of the {user:42} tag
SET {user:42}:profile "Ayesha"
SET {user:42}:session "abc"

# A transaction on related keys works because they are on the same node
MULTI
GET {user:42}:profile
GET {user:42}:session
EXEC` },
        { type: 'note', value: 'Design your key names with hash tags from the start. Retrofitting them later requires moving data between nodes.' },
      ],
    },
    {
      id: 'redis-cluster-limits',
      title: 'Cluster limitations',
      blocks: [
        { type: 'list', items: [
          'Multi-key operations only work on keys in the same slot',
          'Databases (SELECT) are not supported; only database 0',
          'Lua scripts must operate on keys in the same slot',
          'Resharding moves slots between nodes, which takes time',
          'Cluster does not handle failover of the whole cluster, only of individual nodes',
        ] },
        { type: 'text', value: 'For most applications, a single primary with replicas and Sentinel is simpler than a cluster. Use Cluster only when one node cannot hold the data or the write throughput.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'cluster-sentinel',
      q: 'How many hash slots does Redis Cluster use?',
      options: ['1024', '4096', '16384', '65536'],
      answer: 2,
      explain: 'The keyspace is split into 16384 slots.',
    },
    {
      chapterId: 'cluster-sentinel',
      q: 'What is a hash tag?',
      options: ['A comment in a key', 'Braces in a key name that force related keys to the same slot', 'A type of index', 'A password'],
      answer: 1,
      explain: 'Hash tags control slot placement.',
    },
    {
      chapterId: 'cluster-sentinel',
      q: 'What is the minimum number of master nodes for a cluster?',
      options: ['1', '2', '3', '5'],
      answer: 2,
      explain: 'Three masters are needed for quorum.',
    },
    {
      chapterId: 'cluster-sentinel',
      q: 'When should you prefer Sentinel over Cluster?',
      options: ['When you need sharding', 'When one node can hold the data and you only need failover', 'When you have one node', 'When writes are very high'],
      answer: 1,
      explain: 'Sentinel is simpler for failover without sharding.',
    },
  ],
};
