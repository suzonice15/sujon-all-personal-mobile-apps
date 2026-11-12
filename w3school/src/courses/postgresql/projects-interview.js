// PostgreSQL chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Design a schema, tune queries and prepare for interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'pg-project-schema',
      title: 'Project: design a courses database',
      blocks: [
        { type: 'text', value: 'Design a schema for a learning platform: users, courses, enrollments, lessons and progress. Normalize it, add constraints, indexes and a partitioned events table.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    price INT NOT NULL CHECK (price >= 0)
);

CREATE TABLE enrollments (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, course_id)
);

CREATE INDEX idx_enrollments_course ON enrollments(course_id);` },
        { type: 'note', value: 'A finished schema with constraints and indexes is a strong portfolio piece. Explain why each index exists.' },
      ],
    },
    {
      id: 'pg-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'B-tree versus GIN versus GiST?',
          'How does MVCC work?',
          'Read Committed versus Repeatable Read?',
          'How do you find a slow query?',
          'What is the N+1 problem?',
          'When would you partition a table?',
          'How do you prevent overlapping bookings?',
          'How do you back up and restore?',
        ] },
        { type: 'text', value: 'Strong answers use the mechanism and a number. "A B-tree index speeds up equality and range queries; a Seq Scan on a million rows is slow because it reads every page" is a complete answer.' },
        { type: 'note', value: 'Be ready to read an EXPLAIN plan and say which node is the bottleneck.' },
      ],
    },
    {
      id: 'pg-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: install, psql, basic SELECT and JOIN',
          'Week 2: data types, constraints and normalization',
          'Week 3: indexes and EXPLAIN',
          'Week 4: transactions, isolation and locking',
          'Week 5: partitioning and replication',
          'Week 6: security and backups',
          'Week 7: design and tune one real schema',
        ] },
        { type: 'note', value: 'Measure before you optimize. A query that looks slow may be fine; one that looks fine may be reading a million rows.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Why add an index on enrollments(course_id)?',
      options: ['To sort users', 'To speed up queries that filter enrollments by course', 'To encrypt data', 'To back up faster'],
      answer: 1,
      explain: 'Indexes speed up filtered lookups.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should you check first for a slow query?',
      options: ['The logo', 'The EXPLAIN ANALYZE plan', 'The user count', 'The table colour'],
      answer: 1,
      explain: 'The plan shows where time is spent.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a database portfolio project convincing?',
      options: ['Many empty tables', 'A normalized schema with constraints, indexes and a tuned query', 'A copied dump', 'A single table'],
      answer: 1,
      explain: 'A working, explained schema shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first PostgreSQL step for a beginner?',
      options: ['Replication', 'Install, connect with psql and run basic SELECT and JOIN', 'Partitioning', 'Row-level security'],
      answer: 1,
      explain: 'Start with the basics and build up.',
    },
  ],
};
