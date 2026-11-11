// MongoDB chapter: Schema Design.

export default {
  id: 'schema-design',
  title: 'Schema Design',
  description: 'Embed or reference, one-to-many and patterns',
  icon: 'account-tree',
  lessons: [
    {
      id: 'mongo-embed-reference',
      title: 'Embed or reference',
      blocks: [
        { type: 'text', value: 'Embed when the data is read together, bounded and owned by the parent. Reference when it is large, shared, changes independently or is queried on its own.' },
        { type: 'list', items: [
          'Embed: course lessons, address inside a user',
          'Reference: author of many courses, a shared category',
          'Embed: bounded arrays, usually under a few hundred items',
          'Reference: unbounded growth such as a chat history',
        ] },
        { type: 'note', value: 'A document has a 16 MB limit. An unbounded array will hit it eventually. Reference or bucket the data before that happens.' },
      ],
    },
    {
      id: 'mongo-one-to-many',
      title: 'One-to-many',
      blocks: [
        { type: 'text', value: 'One course has many lessons: embed them if they are always read with the course and the list is bounded. One teacher has many courses: reference the teacher id.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `// Embedded lessons
{ _id: 1, title: 'JavaScript', lessons: [{ id: 1, title: 'Variables' }] }

// Referenced teacher
{ _id: 1, title: 'JavaScript', teacherId: ObjectId('...') }` },
        { type: 'note', value: 'Ask two questions: is the child always read with the parent, and can the child list grow without limit? The answers decide the model.' },
      ],
    },
    {
      id: 'mongo-many-to-many',
      title: 'Many-to-many',
      blocks: [
        { type: 'text', value: 'Students and courses are many-to-many. Use a junction collection that stores one document per pair, with extra fields such as score or enrolledAt.' },
        { type: 'code', lang: 'text', tryIt: false, value: `// enrollments
{ studentId: 1, courseId: 2, score: 92, enrolledAt: ISODate("...") }

// Index the pair and each side
db.enrollments.createIndex({ studentId: 1, courseId: 1 }, { unique: true })
db.enrollments.createIndex({ courseId: 1 })` },
        { type: 'note', value: 'The unique compound index prevents duplicate enrollments. It also makes retried requests idempotent.' },
      ],
    },
    {
      id: 'mongo-patterns',
      title: 'Schema patterns',
      blocks: [
        { type: 'list', items: [
          'Bucket - group time-series points into one document',
          'Subset - keep the latest N items embedded',
          'Computed - store a total that is updated with writes',
          'Extended reference - copy a few fields to avoid a lookup',
          'Outlier - handle the rare huge document separately',
        ] },
        { type: 'text', value: 'Patterns are solutions to measured problems. Start with a straightforward model, measure, then apply a pattern for the specific access shape.' },
        { type: 'note', value: 'Every duplicated field is a consistency risk. If you copy data, define how it is updated when the source changes.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'schema-design',
      q: 'When should you embed?',
      options: ['When data is read together and bounded', 'When it grows without limit', 'When it is shared by many parents', 'Always'],
      answer: 0,
      explain: 'Embedding avoids a join for data used together.',
    },
    {
      chapterId: 'schema-design',
      q: 'What limits an embedded array?',
      options: ['The 16 MB document limit', 'The collection size', 'The index count', 'The network speed'],
      answer: 0,
      explain: 'A document cannot exceed 16 MB.',
    },
    {
      chapterId: 'schema-design',
      q: 'How do you model many-to-many?',
      options: ['Embed everything', 'A junction collection with one document per pair', 'A single array in one side', 'No model needed'],
      answer: 1,
      explain: 'A junction collection stores the pair and relationship data.',
    },
    {
      chapterId: 'schema-design',
      q: 'What does a unique compound index on the pair prevent?',
      options: ['Slow reads', 'Duplicate relationships', 'Array growth', 'Backups'],
      answer: 1,
      explain: 'It makes the pair unique and retries idempotent.',
    },
  ],
};
