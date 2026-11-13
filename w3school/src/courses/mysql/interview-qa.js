// MySQL interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is MySQL?',
      a: 'The most widely used open-source relational database, known for speed, reliability and a huge ecosystem.',
      level: 'basic',
    },
    {
      q: 'What is the default storage engine?',
      a: 'InnoDB, which supports ACID transactions, foreign keys and row-level locking.',
      level: 'basic',
    },
    {
      q: 'AUTO_INCREMENT versus a sequence?',
      a: 'AUTO_INCREMENT generates a new integer per row automatically. A sequence is a separate object that can be shared across tables.',
      level: 'intermediate',
    },
    {
      q: 'Why avoid MyISAM?',
      a: 'It lacks transactions, foreign keys and crash recovery. InnoDB is the only engine for transactional data.',
      level: 'basic',
    },
  ],
  'data-types': [
    {
      q: 'Which type should you use for money?',
      a: 'DECIMAL, which is exact. FLOAT and DOUBLE have rounding errors.',
      level: 'basic',
    },
    {
      q: 'INT versus BIGINT?',
      a: 'INT is 4 bytes and holds up to about 2 billion. BIGINT is 8 bytes and holds up to about 9 quintillion.',
      level: 'basic',
    },
    {
      q: 'DATETIME versus TIMESTAMP?',
      a: 'DATETIME stores a wall-clock time without a zone. TIMESTAMP converts to UTC on storage and back to the session zone on read.',
      level: 'intermediate',
    },
    {
      q: 'How do you extract a field from a JSON column?',
      a: 'Use the -> or ->> operators with a JSON path, such as payload ->> "$.user".',
      level: 'intermediate',
    },
  ],
  'sql-fundamentals': [
    {
      q: 'WHERE versus HAVING?',
      a: 'WHERE filters rows before grouping. HAVING filters groups after aggregation.',
      level: 'basic',
    },
    {
      q: 'INNER JOIN versus LEFT JOIN?',
      a: 'INNER JOIN keeps only matching rows. LEFT JOIN keeps all left rows and fills missing matches with NULL.',
      level: 'basic',
    },
    {
      q: 'What is a subquery?',
      a: 'A query nested inside another query. It can appear in SELECT, FROM or WHERE.',
      level: 'basic',
    },
    {
      q: 'Why qualify column names in a join?',
      a: 'Both tables may have a column with the same name, which causes an ambiguity error.',
      level: 'basic',
    },
  ],
  indexes: [
    {
      q: 'What is a clustered index in InnoDB?',
      a: 'The primary key, which determines the physical order of rows. Secondary indexes store the primary key value.',
      level: 'intermediate',
    },
    {
      q: 'What is a covering index?',
      a: 'An index that includes all columns a query needs, so MySQL answers from the index alone.',
      level: 'intermediate',
    },
    {
      q: 'What does a FULLTEXT index do?',
      a: 'It enables natural language and boolean mode full-text search on text columns.',
      level: 'basic',
    },
    {
      q: 'Why is a wide primary key bad?',
      a: 'Every secondary index stores the primary key value, so a wide key makes all indexes larger.',
      level: 'advanced',
    },
  ],
  innodb: [
    {
      q: 'What is MVCC in InnoDB?',
      a: 'Multi-Version Concurrency Control. An UPDATE creates a new row version, so readers see a consistent snapshot without locking writers.',
      level: 'intermediate',
    },
    {
      q: 'What is a row-level lock?',
      a: 'A lock on an individual row during UPDATE or DELETE, released at commit or rollback. It allows concurrent access to different rows.',
      level: 'basic',
    },
    {
      q: 'What does FOR UPDATE SKIP LOCKED do?',
      a: 'It locks rows for update but skips rows already locked, which is useful for job queues.',
      level: 'intermediate',
    },
    {
      q: 'Why is an auto-increment primary key efficient?',
      a: 'It gives sequential inserts, which avoid page splits and fragmentation.',
      level: 'advanced',
    },
  ],
  'query-performance': [
    {
      q: 'What does EXPLAIN show?',
      a: 'The plan MySQL chooses, including access type, indexes used and estimated rows.',
      level: 'basic',
    },
    {
      q: 'What is access type ALL?',
      a: 'A full table scan. It reads every row and is often slow on large tables.',
      level: 'basic',
    },
    {
      q: 'Why avoid functions on indexed columns in WHERE?',
      a: 'The function prevents the index from being used, causing a full scan.',
      level: 'intermediate',
    },
    {
      q: 'What is the slow query log?',
      a: 'A log of queries that take longer than a threshold, used to find and fix slow queries.',
      level: 'basic',
    },
  ],
  replication: [
    {
      q: 'What does the binary log store?',
      a: 'Every change to the data, which replicas read to stay in sync.',
      level: 'basic',
    },
    {
      q: 'What is GTID?',
      a: 'A unique ID for each transaction across the cluster, which simplifies failover.',
      level: 'intermediate',
    },
    {
      q: 'ROW versus STATEMENT binlog format?',
      a: 'ROW logs actual row changes and is safest. STATEMENT logs the SQL, which can be non-deterministic.',
      level: 'intermediate',
    },
    {
      q: 'What does semi-synchronous replication do?',
      a: 'It waits for at least one replica to receive the write before committing, trading speed for durability.',
      level: 'advanced',
    },
  ],
  partitioning: [
    {
      q: 'What is range partitioning?',
      a: 'Splitting a table by a value range, such as by year, so queries on that range touch only relevant partitions.',
      level: 'basic',
    },
    {
      q: 'Why must the partition key be in the primary key?',
      a: 'MySQL requires the partition key to be part of every unique key, including the primary key.',
      level: 'intermediate',
    },
    {
      q: 'Why drop a partition instead of deleting rows?',
      a: 'Dropping is instant and creates no bloat, unlike DELETE.',
      level: 'intermediate',
    },
    {
      q: 'What is partition pruning?',
      a: 'The planner skips partitions that cannot contain matching rows, speeding up queries.',
      level: 'advanced',
    },
  ],
  security: [
    {
      q: 'What does % mean in a MySQL user host?',
      a: 'Any host. Restrict it in production to localhost or a specific IP.',
      level: 'basic',
    },
    {
      q: 'What is a role in MySQL 8?',
      a: 'A named set of privileges granted to users, making permission management easier.',
      level: 'basic',
    },
    {
      q: 'Why require SSL for remote connections?',
      a: 'To encrypt data in transit between the client and the server.',
      level: 'basic',
    },
    {
      q: 'What does least privilege mean?',
      a: 'Give each user only the access it needs, and nothing more.',
      level: 'basic',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you structure a MySQL project?',
      a: 'Use InnoDB, add constraints and indexes, keep queries simple, and monitor with performance_schema.',
      level: 'intermediate',
    },
    {
      q: 'What makes a MySQL portfolio project convincing?',
      a: 'A normalized schema with constraints, indexes, a tuned query with its EXPLAIN plan, and a documented backup strategy.',
      level: 'basic',
    },
    {
      q: 'How do you debug a slow query?',
      a: 'Check EXPLAIN, look for full table scans and missing indexes, then fix the query or add an index.',
      level: 'intermediate',
    },
    {
      q: 'What is the best first MySQL step for a beginner?',
      a: 'Install MySQL, connect with the mysql client, and run basic SELECT and JOIN queries.',
      level: 'basic',
    },
  ],
};
