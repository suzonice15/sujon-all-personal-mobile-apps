// PostgreSQL chapter: Schema Design.

export default {
  id: 'schema-design',
  title: 'Schema Design',
  description: 'Normalization, constraints, partitioning and migrations',
  icon: 'architecture',
  lessons: [
    {
      id: 'pg-normalization',
      title: 'Normalization',
      blocks: [
        { type: 'text', value: 'Normalization removes duplication. First normal form: one value per cell. Second: every non-key column depends on the whole key. Third: non-key columns depend only on the key, not on each other.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `-- Unnormalized: teacher name repeats for every course
-- Normalized: teachers in their own table
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    teacher_id INT REFERENCES teachers(id)
);` },
        { type: 'note', value: 'Denormalization is sometimes right for read-heavy workloads, but start normalized. Premature denormalization creates update anomalies.' },
      ],
    },
    {
      id: 'pg-constraints',
      title: 'Constraints',
      blocks: [
        { type: 'text', value: 'Constraints enforce rules at the database level, so no application bug can violate them. Use NOT NULL, UNIQUE, CHECK and foreign keys.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INT NOT NULL REFERENCES courses(id),
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, course_id)
);

ALTER TABLE courses
    ADD CONSTRAINT price_non_negative CHECK (price >= 0);` },
        { type: 'note', value: 'ON DELETE CASCADE removes child rows when the parent is deleted. Choose the action deliberately: cascade, restrict or set null.' },
      ],
    },
    {
      id: 'pg-partitioning',
      title: 'Partitioning',
      blocks: [
        { type: 'text', value: 'Partitioning splits a large table into smaller pieces by a key such as date or region. Queries that filter on the partition key touch only the relevant partitions, which is much faster.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE events (
    id BIGSERIAL,
    created_at TIMESTAMPTZ NOT NULL,
    payload JSONB
) PARTITION BY RANGE (created_at);

CREATE TABLE events_2025_01 PARTITION OF events
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE events_2025_02 PARTITION OF events
    FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');` },
        { type: 'list', items: [
          'Range partitioning by date is the most common',
          'List partitioning by region or status',
          'Hash partitioning for even distribution',
          'Drop old partitions instead of deleting rows',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'schema-design',
      q: 'What does third normal form require?',
      options: ['One value per cell', 'Non-key columns depend only on the key', 'No joins allowed', 'All columns indexed'],
      answer: 1,
      explain: 'Non-key columns must depend only on the primary key.',
    },
    {
      chapterId: 'schema-design',
      q: 'What does ON DELETE CASCADE do?',
      options: ['Blocks deletion', 'Deletes child rows when the parent is deleted', 'Sets child rows to null', 'Ignores the delete'],
      answer: 1,
      explain: 'It cascades the deletion to related rows.',
    },
    {
      chapterId: 'schema-design',
      q: 'Why partition a large table?',
      options: ['To encrypt it', 'So queries on the partition key touch only relevant partitions', 'To remove backups', 'To slow down writes'],
      answer: 1,
      explain: 'Partition pruning skips irrelevant partitions.',
    },
    {
      chapterId: 'schema-design',
      q: 'What does a CHECK constraint do?',
      options: ['Indexes a column', 'Rejects rows that violate a condition', 'Backs up data', 'Creates a user'],
      answer: 1,
      explain: 'It enforces a rule on every row.',
    },
  ],
};
