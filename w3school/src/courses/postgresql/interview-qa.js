// PostgreSQL interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is PostgreSQL?',
      a: 'An open-source object-relational database known for correctness, rich types, advanced indexing and extensibility.',
      level: 'basic',
    },
    {
      q: 'What does MVCC do?',
      a: 'It keeps multiple versions of a row so readers see a consistent snapshot without locking writers, and writers do not block readers.',
      level: 'intermediate',
    },
    {
      q: 'TIMESTAMPTZ versus TIMESTAMP?',
      a: 'TIMESTAMPTZ stores a timestamp with a time zone and converts it for the session. TIMESTAMP stores a naive timestamp with no zone.',
      level: 'basic',
    },
    {
      q: 'What is a sequence?',
      a: 'A database object that generates unique numbers. SERIAL columns use a sequence behind the scenes.',
      level: 'basic',
    },
  ],
  'sql-fundamentals': [
    {
      q: 'What is the difference between WHERE and HAVING?',
      a: 'WHERE filters rows before grouping. HAVING filters groups after aggregation.',
      level: 'basic',
    },
    {
      q: 'INNER JOIN versus LEFT JOIN?',
      a: 'INNER JOIN keeps only matching rows. LEFT JOIN keeps all left rows and fills missing matches with NULL.',
      level: 'basic',
    },
    {
      q: 'What is a window function?',
      a: 'A function that computes a value per row over a related set of rows, such as ROW_NUMBER or AVG over a partition, without collapsing rows.',
      level: 'intermediate',
    },
    {
      q: 'What does DISTINCT ON do?',
      a: 'It returns the first row for each distinct value of the given expression, according to the ORDER BY clause.',
      level: 'advanced',
    },
  ],
  'data-types': [
    {
      q: 'Why use JSONB instead of JSON?',
      a: 'JSONB stores data in a binary, decomposed form that is faster to query and can be indexed with GIN. JSON stores the original text.',
      level: 'intermediate',
    },
    {
      q: 'What is an array type useful for?',
      a: 'Storing a small, bounded list of values of one type in a column, such as tags. Large or queryable lists are better in a separate table.',
      level: 'basic',
    },
    {
      q: 'What does an exclusion constraint do?',
      a: 'It rejects rows that conflict on a condition, such as overlapping time ranges for the same room.',
      level: 'advanced',
    },
    {
      q: 'Why use UUID for primary keys?',
      a: 'They are globally unique without a central counter, which helps in distributed systems and avoids exposing record counts.',
      level: 'intermediate',
    },
  ],
  indexes: [
    {
      q: 'When is a B-tree index used?',
      a: 'For equality, range and ORDER BY queries on scalar values. It is the default index type.',
      level: 'basic',
    },
    {
      q: 'GIN versus GiST?',
      a: 'GIN is for values with multiple elements, such as JSONB, arrays and full-text vectors. GiST is a generalized tree for ranges, geometry and nearest-neighbour search.',
      level: 'intermediate',
    },
    {
      q: 'What is a partial index?',
      a: 'An index that covers only rows matching a condition, saving space and speeding up queries on a subset.',
      level: 'intermediate',
    },
    {
      q: 'What is a covering index?',
      a: 'An index that includes extra columns so the query can be answered from the index alone, without touching the table.',
      level: 'advanced',
    },
  ],
  'query-performance': [
    {
      q: 'What does EXPLAIN ANALYZE show?',
      a: 'The chosen plan with actual execution time and row counts, not just estimated costs.',
      level: 'basic',
    },
    {
      q: 'What is an Index Only Scan?',
      a: 'A scan that answers the query entirely from the index, without reading the table heap.',
      level: 'intermediate',
    },
    {
      q: 'What is the N+1 problem?',
      a: 'Loading a list and then one query per item for a related entity. The fix is a join or a batched query.',
      level: 'intermediate',
    },
    {
      q: 'What does VACUUM do?',
      a: 'It reclaims space from dead rows and prevents transaction ID wraparound. Autovacuum does this in the background.',
      level: 'basic',
    },
  ],
  transactions: [
    {
      q: 'What isolation level does PostgreSQL default to?',
      a: 'Read Committed. Each statement sees the latest committed data.',
      level: 'basic',
    },
    {
      q: 'What happens in a serializable conflict?',
      a: 'The transaction may fail with a serialization error. The application must retry it.',
      level: 'advanced',
    },
    {
      q: 'What does FOR UPDATE SKIP LOCKED do?',
      a: 'It locks rows for update but skips rows already locked by another transaction, which is useful for job queues.',
      level: 'intermediate',
    },
    {
      q: 'Why do deadlocks happen?',
      a: 'Two transactions wait on each other\'s locks. PostgreSQL detects the cycle and aborts one transaction.',
      level: 'intermediate',
    },
  ],
  'schema-design': [
    {
      q: 'What is third normal form?',
      a: 'Non-key columns depend only on the primary key, not on each other, which removes update anomalies.',
      level: 'basic',
    },
    {
      q: 'When should you partition a table?',
      a: 'When it is very large and queries filter on the partition key, so only relevant partitions are scanned.',
      level: 'intermediate',
    },
    {
      q: 'What does ON DELETE CASCADE do?',
      a: 'It deletes child rows when the parent row is deleted.',
      level: 'basic',
    },
    {
      q: 'Why denormalize?',
      a: 'To speed up reads on large, stable data. It trades write complexity and update anomalies for read performance.',
      level: 'advanced',
    },
  ],
  replication: [
    {
      q: 'What does streaming replication send?',
      a: 'WAL records from the primary to the standby in real time.',
      level: 'basic',
    },
    {
      q: 'What is replication lag?',
      a: 'The delay between a write on the primary and its appearance on the standby. It must be monitored.',
      level: 'intermediate',
    },
    {
      q: 'Synchronous versus asynchronous replication?',
      a: 'Synchronous waits for the standby before committing, which is safer but slower. Asynchronous commits immediately and risks losing recent writes.',
      level: 'intermediate',
    },
    {
      q: 'What is point-in-time recovery?',
      a: 'Restoring a base backup plus WAL archives to any moment in time, which lets you recover from mistakes.',
      level: 'advanced',
    },
  ],
  security: [
    {
      q: 'What is a role in PostgreSQL?',
      a: 'A user or group with privileges. Roles can own objects and be granted access to them.',
      level: 'basic',
    },
    {
      q: 'What is row-level security?',
      a: 'A policy that filters rows per user at the database level, so a user cannot see another user\'s rows even if the app has a bug.',
      level: 'intermediate',
    },
    {
      q: 'Why use pgcrypto?',
      a: 'For column-level encryption of sensitive values, such as national ID numbers or secrets.',
      level: 'intermediate',
    },
    {
      q: 'What does least privilege mean for database roles?',
      a: 'Give each role only the access it needs, and revoke default PUBLIC privileges in production.',
      level: 'basic',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you find a slow query?',
      a: 'Use EXPLAIN ANALYZE to read the plan, look for Seq Scans on large tables and high actual times, then add indexes or rewrite.',
      level: 'intermediate',
    },
    {
      q: 'How would you design a schema for a learning platform?',
      a: 'Normalize users, courses, enrollments and progress; add foreign keys and unique constraints; index foreign keys; partition large event tables.',
      level: 'intermediate',
    },
    {
      q: 'What makes a database portfolio project convincing?',
      a: 'A normalized schema with constraints, indexes, a tuned query with its EXPLAIN plan, and a documented backup strategy.',
      level: 'basic',
    },
    {
      q: 'What is the best first PostgreSQL step for a beginner?',
      a: 'Install it, connect with psql, and run SELECT and JOIN queries on a sample database.',
      level: 'basic',
    },
  ],
};
