// MongoDB chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Design a course schema and write real queries',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'mongo-project-schema',
      title: 'Project: course app schema',
      blocks: [
        { type: 'text', value: 'Model users, courses, lessons and enrollments. Embed lessons in a course because they are read together and bounded. Reference users and courses from enrollments.' },
        { type: 'code', lang: 'text', tryIt: false, value: `users
  { _id, name, email, passwordHash, createdAt }

courses
  { _id, title, slug, price, level,
    lessons: [{ id, title, minutes }],
    teacherId }

enrollments
  { _id, studentId, courseId, score, enrolledAt }` },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.enrollments.createIndex({ studentId: 1, courseId: 1 }, { unique: true })
db.enrollments.createIndex({ courseId: 1 })
db.courses.createIndex({ slug: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })` },
        { type: 'note', value: 'The unique pair index makes enrollment idempotent and prevents a student from enrolling twice.' },
      ],
    },
    {
      id: 'mongo-project-queries',
      title: 'Project: real queries',
      blocks: [
        { type: 'text', value: 'Answer the questions a real dashboard asks: average score per course, top students, courses a student has not taken, and revenue.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `// Average score per course
db.enrollments.aggregate([
  { $group: { _id: '$courseId', avg: { $avg: '$score' }, students: { $sum: 1 } } },
  { $sort: { avg: -1 } }
])

// Top 5 students by total score
db.enrollments.aggregate([
  { $group: { _id: '$studentId', total: { $sum: '$score' } } },
  { $sort: { total: -1 } },
  { $limit: 5 },
  { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
  { $unwind: '$user' },
  { $project: { _id: 0, name: '$user.name', total: 1 } }
])` },
        { type: 'note', value: 'Put $match first and $limit before $lookup when possible. Every stage before a join affects how much work the join does.' },
      ],
    },
    {
      id: 'mongo-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'When would you choose MongoDB over PostgreSQL?',
          'How do you model one-to-many and many-to-many?',
          'What is the 16 MB document limit and why does it matter?',
          'How do indexes affect writes?',
          'What is the ESR rule?',
          'How do you make an upsert safe under concurrency?',
          'How do transactions work in MongoDB?',
          'How do you paginate efficiently?',
          'How do you secure an Atlas cluster?',
          'How do you debug a slow aggregation?',
        ] },
        { type: 'text', value: 'Strong answers tie the model to the query. "Embed because the lessons are always read with the course and the list is bounded" is better than "embedding is faster".' },
        { type: 'note', value: 'Be ready to design a schema live and explain which indexes support the queries you propose.' },
      ],
    },
    {
      id: 'mongo-checklist',
      title: 'Production checklist',
      blocks: [
        { type: 'list', items: [
          'Unique indexes on natural keys such as email and slug',
          'Indexes matched to real queries, checked with explain',
          'Validation on critical collections',
          'Least-privilege database user',
          'IP allow-list and TLS',
          'Backups with a tested restore',
          'Monitoring and slow-query alerts',
          'Connection string in a secret store',
        ] },
        { type: 'text', value: 'MongoDB is easy to start and easy to misuse. The checklist covers the mistakes that hurt in production.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Why embed lessons in a course?',
      options: ['They are read together and bounded', 'They are shared by many courses', 'They grow without limit', 'They need their own collection'],
      answer: 0,
      explain: 'Embedding avoids a join for data used together.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which index prevents duplicate enrollments?',
      options: ['A single index on studentId', 'A unique compound index on studentId and courseId', 'A text index', 'A TTL index'],
      answer: 1,
      explain: 'The pair must be unique.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Where should $limit go in a pipeline with $lookup?',
      options: ['After the lookup always', 'Before the lookup when possible', 'Never', 'Before $match'],
      answer: 1,
      explain: 'Reducing the input makes the join cheaper.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should a production review check?',
      options: ['Only the UI', 'Indexes, validation, access control and backups', 'The color scheme', 'The file names'],
      answer: 1,
      explain: 'Those are the common production failure points.',
    },
  ],
};
