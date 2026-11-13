// GraphQL chapter: Authentication and Authorization.

export default {
  id: 'auth-security',
  title: 'Auth & Security',
  description: 'Authentication, authorization and query protection',
  icon: 'lock',
  lessons: [
    {
      id: 'gql-auth-context',
      title: 'Authentication in context',
      blocks: [
        { type: 'text', value: 'Authentication happens in the context function. Read the token from the request header, verify it, and put the user in the context. Resolvers then check context.user.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const user = token ? verifyToken(token) : null;
    return { user, db };
  },
});

const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
      return user;
    },
  },
};` },
        { type: 'note', value: 'Never trust the client. Always verify the token on the server, even for queries that look public.' },
      ],
    },
    {
      id: 'gql-authorization',
      title: 'Authorization',
      blocks: [
        { type: 'text', value: 'Authorization checks what the user may do. Check roles or ownership inside the resolver, and throw when the user is not allowed. Field-level authorization hides fields a user cannot see.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const resolvers = {
  Mutation: {
    deleteCourse: async (_, { id }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
      if (user.role !== 'ADMIN') throw new GraphQLError('Forbidden', { extensions: { code: 'FORBIDDEN' } });
      await db.course.delete({ where: { id } });
      return true;
    },
  },
  Course: {
    secretNotes: (course, _, { user }) => {
      if (user?.role !== 'ADMIN') return null;
      return course.secretNotes;
    },
  },
};` },
        { type: 'note', value: 'Authorize in the resolver, not only in the client. A hidden button is not security.' },
      ],
    },
    {
      id: 'gql-query-protection',
      title: 'Protecting the server',
      blocks: [
        { type: 'text', value: 'GraphQL is flexible, which means a malicious client can ask for deeply nested data and overload the server. Protect it with depth limiting, complexity analysis and rate limiting.' },
        { type: 'list', items: [
          'Depth limiting: reject queries nested too deeply',
          'Complexity analysis: assign a cost to each field and reject expensive queries',
          'Rate limiting: limit requests per user or IP',
          'Persisted queries: only allow pre-approved queries in production',
          'Disable introspection in production to hide the schema',
        ] },
        { type: 'note', value: 'Persisted queries are the strongest protection: the client sends a hash, and the server runs only the query it already knows.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'auth-security',
      q: 'Where does authentication happen in Apollo Server?',
      options: ['In the schema', 'In the context function', 'In the database', 'In the client'],
      answer: 1,
      explain: 'The context function reads and verifies the token.',
    },
    {
      chapterId: 'auth-security',
      q: 'What should a resolver do when the user is not allowed?',
      options: ['Return null silently', 'Throw a GraphQLError with a code', 'Crash the server', 'Redirect'],
      answer: 1,
      explain: 'Throwing with a code lets the client handle it.',
    },
    {
      chapterId: 'auth-security',
      q: 'Why limit query depth?',
      options: ['To make queries faster', 'To prevent clients from overloading the server with nested queries', 'To reduce the schema size', 'To enable caching'],
      answer: 1,
      explain: 'Deep queries can be expensive.',
    },
    {
      chapterId: 'auth-security',
      q: 'What is a persisted query?',
      options: ['A cached result', 'A pre-approved query the client refers to by hash', 'A mutation', 'A subscription'],
      answer: 1,
      explain: 'The server runs only known queries.',
    },
  ],
};
