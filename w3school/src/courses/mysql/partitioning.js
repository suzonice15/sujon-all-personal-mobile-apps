// MySQL chapter: Partitioning.

export default {
  id: 'partitioning',
  title: 'Partitioning',
  description: 'Range, list, hash and key partitioning',
  icon: 'view-quilt',
  lessons: [
    {
      id: 'mysql-range-partition',
      title: 'Range partitioning',
      blocks: [
        { type: 'text', value: 'Range partitioning splits a table by a column value range, such as by year or month. Queries that filter on the partition key touch only the relevant partitions.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE events (
    id BIGINT AUTO_INCREMENT,
    created_at DATETIME NOT NULL,
    payload JSON,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION pfuture VALUES LESS THAN MAXVALUE
);` },
        { type: 'note', value: 'The partition key must be part of the primary key in MySQL. Plan the key when you create the table.' },
      ],
    },
    {
      id: 'mysql-list-hash',
      title: 'List and hash partitioning',
      blocks: [
        { type: 'text', value: 'List partitioning assigns rows to partitions by a discrete value, such as region. Hash partitioning distributes rows evenly across N partitions by hashing a column.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `-- List partitioning by region
CREATE TABLE orders (
    id INT AUTO_INCREMENT,
    region VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2),
    PRIMARY KEY (id, region)
) PARTITION BY LIST (region) (
    PARTITION p_asia VALUES IN ('BD', 'IN', 'SG'),
    PARTITION p_eu VALUES IN ('UK', 'DE', 'FR'),
    PARTITION p_other VALUES IN (DEFAULT)
);

-- Hash partitioning
CREATE TABLE sessions (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    PRIMARY KEY (id, user_id)
) PARTITION BY HASH (user_id) PARTITIONS 8;` },
        { type: 'note', value: 'List partitioning is great for region or status. Hash partitioning spreads load evenly when there is no natural range.' },
      ],
    },
    {
      id: 'mysql-partition-maintenance',
      title: 'Partition maintenance',
      blocks: [
        { type: 'text', value: 'Drop old partitions instead of deleting rows, which is instant and does not create bloat. Add new partitions before data arrives. Reorganize partitions when ranges change.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `-- Drop an old partition instantly
ALTER TABLE events DROP PARTITION p2024;

-- Add a new partition
ALTER TABLE events ADD PARTITION (
    PARTITION p2026 VALUES LESS THAN (2027)
);

-- Check partition pruning
EXPLAIN SELECT * FROM events WHERE created_at = '2025-06-01';` },
        { type: 'list', items: [
          'Drop old partitions instead of DELETE',
          'Add partitions before data arrives',
          'Partition pruning skips irrelevant partitions',
          'Each partition can have its own indexes',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'partitioning',
      q: 'What is range partitioning?',
      options: ['Splitting by a hash', 'Splitting by a value range such as year', 'Splitting by region list', 'Splitting randomly'],
      answer: 1,
      explain: 'Range partitioning uses value ranges.',
    },
    {
      chapterId: 'partitioning',
      q: 'What must be part of the primary key in MySQL partitioning?',
      options: ['Nothing', 'The partition key', 'The foreign key', 'The index'],
      answer: 1,
      explain: 'The partition key must be in the primary key.',
    },
    {
      chapterId: 'partitioning',
      q: 'Why drop a partition instead of deleting rows?',
      options: ['It is slower', 'It is instant and creates no bloat', 'It keeps the data', 'It is required'],
      answer: 1,
      explain: 'Dropping a partition is instant.',
    },
    {
      chapterId: 'partitioning',
      q: 'What is partition pruning?',
      options: ['Deleting partitions', 'Skipping partitions that cannot contain matching rows', 'Creating indexes', 'Compressing data'],
      answer: 1,
      explain: 'The planner skips irrelevant partitions.',
    },
  ],
};
