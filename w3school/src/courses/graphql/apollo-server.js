// GraphQL chapter: Apollo Server.

export default {
  id: 'apollo-server',
  title: 'Apollo Server',
  description: 'Setting up a GraphQL server with Apollo',
  icon: 'dns',
  lessons: [
    {
      id: 'gql-apollo-setup',
      title: 'Setting up Apollo Server',
      blocks: [
        { type: 'text', value: 'Apollo Server is the most popular GraphQL server for Node.js. You give it a schema (typeDefs) and resolvers, and it handles parsing, validation and execution.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = \`#graphql
  type Query { hello: String! }
\`;

const resolvers = {
  Query: { hello: () => 'Hello world' },
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log('Server ready at', url);` },
        { type: 'note', value: 'Apollo Server 4 uses standalone or express middleware. The standalone server is the quickest way to start.' },
      ],
    },
    {
      id: 'gql-error-handling',
      title: 'Error handling',
      blocks: [
        { type: 'text', value: 'GraphQL does not use HTTP status codes for application errors. It returns a 200 with an errors array. Throw a GraphQLError with a code so the client can distinguish cases.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { GraphQLError } from 'graphql';

const resolvers = {
  Query: {
    course: (_, { id }) => {
      const course = db.course.findUnique({ where: { id } });
      if (!course) {
        throw new GraphQLError('Course not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      return course;
    },
  },
};` },
        { type: 'list', items: [
          'Throw GraphQLError for application errors',
          'Use extensions.code for machine-readable error types',
          'Validation errors are returned automatically',
          'Network errors are separate from GraphQL errors',
        ] },
      ],
    },
    {
      id: 'gql-schema-first',
      title: 'Schema-first versus code-first',
      blocks: [
        { type: 'text', value: 'Schema-first writes the schema in SDL and implements resolvers separately. Code-first generates the schema from code, often with decorators. Both are valid; schema-first makes the contract explicit.' },
        { type: 'list', items: [
          'Schema-first: write .graphql files, then resolvers',
          'Code-first: define types in code with decorators or builders',
          'Schema-first is easier to review and share with frontend teams',
          'Code-first keeps schema and code in one place',
        ] },
        { type: 'note', value: 'Pick one style for a project and stay consistent. Mixing both creates confusion.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'apollo-server',
      q: 'What does Apollo Server need to start?',
      options: ['A database only', 'typeDefs and resolvers', 'A REST API', 'A CSS file'],
      answer: 1,
      explain: 'It needs a schema and resolvers.',
    },
    {
      chapterId: 'apollo-server',
      q: 'How does GraphQL report application errors?',
      options: ['With HTTP 404', 'In an errors array in a 200 response', 'By crashing the server', 'With a redirect'],
      answer: 1,
      explain: 'GraphQL returns errors in the response body.',
    },
    {
      chapterId: 'apollo-server',
      q: 'What is schema-first development?',
      options: ['Generating the schema from code', 'Writing the schema in SDL first, then resolvers', 'Skipping the schema', 'Using REST'],
      answer: 1,
      explain: 'The schema is written by hand first.',
    },
    {
      chapterId: 'apollo-server',
      q: 'Why use extensions.code on an error?',
      options: ['To make it longer', 'So the client can distinguish error types', 'To hide the error', 'To retry automatically'],
      answer: 1,
      explain: 'The code lets the client handle errors programmatically.',
    },
  ],
};
