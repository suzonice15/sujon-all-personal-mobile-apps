// SQL Server interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is SQL Server?',
      a: 'A relational database from Microsoft with T-SQL, strong tooling and enterprise features. Azure SQL is the managed version.',
      level: 'basic',
    },
    {
      q: 'What is IDENTITY?',
      a: 'An auto-incrementing column, commonly used for the primary key.',
      level: 'basic',
    },
    {
      q: 'Why NVARCHAR instead of VARCHAR?',
      a: 'NVARCHAR stores Unicode, so non-Latin text is not corrupted.',
      level: 'basic',
    },
    {
      q: 'Why not expose port 1433?',
      a: 'It is the database port. Exposing it lets the internet attempt connections. Use a private network and a firewall.',
      level: 'basic',
    },
  ],
  'data-types': [
    {
      q: 'Which type for money?',
      a: 'DECIMAL with a fixed scale. FLOAT loses precision.',
      level: 'basic',
    },
    {
      q: 'Why store UTC?',
      a: 'It avoids ambiguity across time zones and daylight saving. Convert for display.',
      level: 'intermediate',
    },
    {
      q: 'NEWID versus NEWSEQUENTIALID?',
      a: 'NEWSEQUENTIALID produces increasing values, which reduces clustered index fragmentation.',
      level: 'intermediate',
    },
    {
      q: 'What does NULL mean?',
      a: 'Unknown. It is not zero or an empty string, and comparisons need IS NULL.',
      level: 'basic',
    },
  ],
  queries: [
    {
      q: 'What does TOP do?',
      a: 'Limits the rows returned. Pair it with ORDER BY for deterministic results.',
      level: 'basic',
    },
    {
      q: 'What is a CTE?',
      a: 'A named query that improves readability and lets you filter a window result.',
      level: 'intermediate',
    },
    {
      q: 'What does ROW_NUMBER do?',
      a: 'Numbers rows within a partition, often used to pick the top row per group.',
      level: 'intermediate',
    },
    {
      q: 'Why is MERGE risky?',
      a: 'Concurrency edge cases can produce incorrect writes. Prefer explicit statements for simple upserts.',
      level: 'advanced',
    },
  ],
  indexes: [
    {
      q: 'Clustered versus nonclustered?',
      a: 'Clustered defines the physical row order. Nonclustered is a separate structure pointing at rows.',
      level: 'basic',
    },
    {
      q: 'What is a covering index?',
      a: 'An index that includes all columns a query needs, so no table lookup is required.',
      level: 'intermediate',
    },
    {
      q: 'When use a filtered index?',
      a: 'For a small, common subset such as active rows, making the index smaller and faster.',
      level: 'intermediate',
    },
    {
      q: 'How do you find unused indexes?',
      a: 'Query sys.dm_db_index_usage_stats and look for high updates with zero seeks and scans.',
      level: 'advanced',
    },
  ],
  transactions: [
    {
      q: 'What does a transaction guarantee?',
      a: 'Atomicity: all changes commit or none do, with consistency, isolation and durability.',
      level: 'basic',
    },
    {
      q: 'What is the default isolation level?',
      a: 'READ COMMITTED.',
      level: 'basic',
    },
    {
      q: 'What causes a deadlock?',
      a: 'Two sessions waiting on locks each other holds. Avoid with consistent access order and short transactions.',
      level: 'intermediate',
    },
    {
      q: 'What does SNAPSHOT isolation do?',
      a: 'It uses row versioning so readers do not block writers, at the cost of tempdb version storage.',
      level: 'advanced',
    },
  ],
  performance: [
    {
      q: 'How do you read an execution plan?',
      a: 'Look for scans, key lookups, expensive sorts and large gaps between estimated and actual rows.',
      level: 'intermediate',
    },
    {
      q: 'What is parameter sniffing?',
      a: 'A cached plan built for the first parameter values, which may be bad for other values.',
      level: 'advanced',
    },
    {
      q: 'What does OPTION (RECOMPILE) do?',
      a: 'Builds a plan for the current parameter values, at the cost of compilation time.',
      level: 'intermediate',
    },
    {
      q: 'Where should tuning start?',
      a: 'With the top queries by total cost, not with server settings.',
      level: 'basic',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you design a courses schema?',
      a: 'Tables with primary keys, foreign keys, a unique enrollment constraint, indexes on join columns and a covering index for reports.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between a seek and a scan?',
      a: 'A seek navigates the index to matching rows. A scan reads the whole structure.',
      level: 'basic',
    },
    {
      q: 'How do you prove an index helps?',
      a: 'Compare the execution plan and actual workload timing before and after.',
      level: 'intermediate',
    },
    {
      q: 'What is the best first step?',
      a: 'Create the schema with correct keys and constraints before adding indexes.',
      level: 'basic',
    },
  ],
  'backup-security': [
    {
      q: 'How do you know a backup works?',
      a: 'You restored it successfully. Run a restore drill regularly and record how long it took.',
      level: 'basic',
    },
    {
      q: 'What is the difference between a login and a user?',
      a: 'A login authenticates at the server. A user maps that login into a specific database.',
      level: 'basic',
    },
    {
      q: 'Why grant permissions to roles?',
      a: 'Roles keep permissions consistent and auditable. Granting to individuals drifts and is hard to review.',
      level: 'intermediate',
    },
    {
      q: 'How does row-level security help multi-tenancy?',
      a: 'It filters rows in the engine based on the session context, so even a direct query cannot read another tenant’s data.',
      level: 'advanced',
    },
  ],
};
