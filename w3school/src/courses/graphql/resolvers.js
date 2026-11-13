// GraphQL chapter: Resolvers.

export default {
  id: 'resolvers',
  title: 'Resolvers',
  description: 'How data is fetched and the N+1 problem',
  icon: 'functions',
  lessons: [
    {
      id: 'gql-resolver-basics',
      title: 'What a resolver does',
      blocks: [
        { type: 'text', value: 'A resolver is a function that returns the value for a field. The schema says what can be queried; resolvers say how to get it. Every field can have its own resolver.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const resolvers = {
  Query: {
    courses: () => db.course.findMany(),
    course: (_, { id }) => db.course.findUnique({ where: { id } }),
  },
  Course: {
    lessons: (course) => db.lesson.findMany({ where: { courseId: course.id } }),
  },
};` },
        { type: 'note', value: 'A resolver receives (parent, args, context, info). The parent is the object the field belongs to, args are the field arguments.' },
      ],
    },
    {
      id: 'gql-n-plus-one',
      title: 'The N+1 problem',
      blocks: [
        { type: 'text', value: 'If a query asks for courses and their lessons, a naive resolver runs one query for courses and one per course for lessons. That is N+1 queries. DataLoader batches and caches the lesson lookups into one query.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import DataLoader from 'dataloader';

const lessonLoader = new DataLoader(async (courseIds) => {
  const lessons = await db.lesson.findMany({
    where: { courseId: { in: courseIds } },
  });
  return courseIds.map(id => lessons.filter(l => l.courseId === id));
});

const resolvers = {
  Course: {
    lessons: (course) => lessonLoader.load(course.id),
  },
};` },
        { type: 'note', value: 'DataLoader deduplicates and batches within one request. Create a new loader per request so caches do not leak between users.' },
      ],
    },
    {
      id: 'gql-context',
      title: 'Context and shared state',
      blocks: [
        { type: 'text', value: 'The context is built once per request and passed to every resolver. It holds the database connection, the current user and loaders. It is the right place for request-scoped state.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    db,
    user: getUserFromToken(req.headers.authorization),
    loaders: { lessons: new DataLoader(...) },
  }),
});` },
        { type: 'list', items: [
          'context is built per request',
          'Put the database and the current user there',
          'Create loaders per request to avoid cross-user caching',
          'Never store mutable state in the resolvers themselves',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'resolvers',
      q: 'What does a resolver return?',
      options: ['A database table', 'The value for a field', 'An index', 'A CSS class'],
      answer: 1,
      explain: 'A resolver provides the value for one field.',
    },
    {
      chapterId: 'resolvers',
      q: 'What is the N+1 problem in GraphQL?',
      options: ['One query for the list and one per item for a related field', 'A missing index', 'A slow mutation', 'A cache miss'],
      answer: 0,
      explain: 'Naive resolvers run one query per parent item.',
    },
    {
      chapterId: 'resolvers',
      q: 'What does DataLoader do?',
      options: ['Deletes data', 'Batches and caches lookups within one request', 'Creates tables', 'Compresses responses'],
      answer: 1,
      explain: 'It batches lookups to avoid N+1.',
    },
    {
      chapterId: 'resolvers',
      q: 'Where should request-scoped state live?',
      options: ['In a global variable', 'In the context object', 'In the schema', 'In the client'],
      answer: 1,
      explain: 'Context is built per request.',
    },
  ],
};
