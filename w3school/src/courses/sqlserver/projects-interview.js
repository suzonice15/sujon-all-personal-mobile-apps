// SQL Server chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Design a schema and tune a query',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'ss-project',
      title: 'Project: courses database',
      blocks: [
        { type: 'text', value: 'Design a schema for courses and enrollments: keys, constraints, two useful indexes and a report query. Then read its execution plan and improve it.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `CREATE TABLE dbo.Enrollments (
    Id INT IDENTITY PRIMARY KEY,
    UserId INT NOT NULL,
    CourseId INT NOT NULL,
    EnrolledAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_Enrollment UNIQUE (UserId, CourseId)
);

CREATE INDEX IX_Enrollments_Course ON dbo.Enrollments (CourseId) INCLUDE (UserId);` },
        { type: 'list', items: [
          'Primary key and a unique constraint',
          'Foreign keys for integrity',
          'Index foreign keys used in joins',
          'A covering index for the report',
          'A plan with seeks instead of scans',
        ] },
        { type: 'note', value: 'A schema with constraints and a tuned query is a strong portfolio piece for a database role.' },
      ],
    },
    {
      id: 'ss-interview',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Clustered versus nonclustered index?',
          'What is a covering index?',
          'How do transactions and isolation work?',
          'What causes a deadlock?',
          'How do you read an execution plan?',
          'What is parameter sniffing?',
          'How do you find a slow query?',
          'SQL Server versus PostgreSQL?',
        ] },
        { type: 'text', value: 'Strong answers name the mechanism and a number. “A clustered index defines the row order; a random GUID key fragments it, so I prefer a sequential key” is complete.' },
        { type: 'note', value: 'Be ready to read a plan and point at the most expensive operator.' },
      ],
    },
    {
      id: 'ss-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: setup and first tables',
          'Week 2: data types and constraints',
          'Week 3: queries, joins and CTEs',
          'Week 4: indexes',
          'Week 5: transactions and isolation',
          'Week 6: execution plans and tuning',
          'Week 7: design and tune a real schema',
        ] },
        { type: 'note', value: 'Learn SQL basics first. SQL Server specifics matter once the query logic is clear.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which index helps a foreign key join?',
      options: ['The primary key only', 'An index on the foreign key column', 'No index', 'A view'],
      answer: 1,
      explain: 'The join column needs an index.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What does a seek indicate?',
      options: ['A full scan', 'The index was used to find rows', 'A sort', 'A deadlock'],
      answer: 1,
      explain: 'A seek is targeted access.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What proves an index is useful?',
      options: ['It exists', 'Seeks in the plan and real workload gains', 'It has a nice name', 'It is new'],
      answer: 1,
      explain: 'Measure the workload.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first step?',
      options: ['Buy a bigger server', 'Write the schema with keys and constraints', 'Add ten indexes', 'Change isolation'],
      answer: 1,
      explain: 'Start with a correct schema.',
    },
  ],
};
