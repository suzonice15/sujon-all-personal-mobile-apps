// MySQL chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Design a schema, tune queries and prepare for interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'mysql-project-schema',
      title: 'Project: design a courses database',
      blocks: [
        { type: 'text', value: 'Design a schema for a learning platform: users, courses, enrollments and progress. Use InnoDB, add constraints, indexes and a partitioned events table.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    price INT NOT NULL,
    CHECK (price >= 0)
) ENGINE=InnoDB;

CREATE TABLE enrollments (
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_enrollments_course ON enrollments(course_id);` },
        { type: 'note', value: 'A finished schema with constraints and indexes is a strong portfolio piece. Explain why each index exists.' },
      ],
    },
    {
      id: 'mysql-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'InnoDB versus MyISAM?',
          'Clustered index versus secondary index?',
          'How does MVCC work in InnoDB?',
          'How do you find a slow query?',
          'What is the N+1 problem?',
          'When would you partition a table?',
          'How do you set up replication?',
          'How do you back up and restore?',
        ] },
        { type: 'text', value: 'Strong answers use the mechanism and a number. "InnoDB stores rows in primary key order, so a wide primary key makes all secondary indexes larger" is a complete answer.' },
        { type: 'note', value: 'Be ready to read an EXPLAIN plan and say which step is the bottleneck.' },
      ],
    },
    {
      id: 'mysql-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: install, connect with mysql client, basic SELECT and JOIN',
          'Week 2: data types, constraints and normalization',
          'Week 3: indexes and EXPLAIN',
          'Week 4: InnoDB, transactions and locking',
          'Week 5: replication and partitioning',
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
      options: ['The logo', 'The EXPLAIN plan', 'The user count', 'The table colour'],
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
      q: 'What is the best first MySQL step for a beginner?',
      options: ['Replication', 'Install, connect with the mysql client and run basic SELECT and JOIN', 'Partitioning', 'Row-level security'],
      answer: 1,
      explain: 'Start with the basics and build up.',
    },
  ],
};
