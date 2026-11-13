// GraphQL interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is GraphQL?',
      a: 'A query language for APIs. The client asks for exactly the fields it needs in one request, and the server returns only those fields.',
      level: 'basic',
    },
    {
      q: 'GraphQL versus REST?',
      a: 'REST uses many endpoints and fixed response shapes. GraphQL uses one endpoint and the client controls the shape, which avoids over- and under-fetching.',
      level: 'basic',
    },
    {
      q: 'What does ! mean in a GraphQL type?',
      a: 'Non-null. The field must return a value and cannot be null.',
      level: 'basic',
    },
    {
      q: 'Is GraphQL a database?',
      a: 'No. It is an API layer that sits in front of data sources such as databases, REST APIs or microservices.',
      level: 'basic',
    },
  ],
  'schema-types': [
    {
      q: 'What are the built-in scalars?',
      a: 'Int, Float, String, Boolean and ID. Custom scalars such as Date can be added.',
      level: 'basic',
    },
    {
      q: 'What is an interface?',
      a: 'A set of fields that several types share. A field can return an interface, and the client uses inline fragments for type-specific fields.',
      level: 'intermediate',
    },
    {
      q: 'What is a union?',
      a: 'A type that can be one of several unrelated types, such as SearchResult = Course | Lesson | User.',
      level: 'intermediate',
    },
    {
      q: 'What is an input type?',
      a: 'A type used only for arguments, grouping many fields into one object. It cannot contain output types or fields with arguments.',
      level: 'intermediate',
    },
  ],
  queries: [
    {
      q: 'What is an alias?',
      a: 'A way to rename a field in the response, useful when querying the same field twice with different arguments.',
      level: 'basic',
    },
    {
      q: 'What is a fragment?',
      a: 'A reusable set of fields that can be spread into queries to avoid repetition.',
      level: 'basic',
    },
    {
      q: 'Why use variables?',
      a: 'They move dynamic values out of the query, making it reusable, cacheable and safe from injection.',
      level: 'intermediate',
    },
    {
      q: 'How does GraphQL avoid over-fetching?',
      a: 'The client lists exactly the fields it needs, and the server returns only those.',
      level: 'basic',
    },
  ],
  mutations: [
    {
      q: 'What does a mutation do?',
      a: 'It changes data on the server. Mutations run sequentially, one after another.',
      level: 'basic',
    },
    {
      q: 'Why return the changed object from a mutation?',
      a: 'So the client can update its cache in place instead of refetching.',
      level: 'intermediate',
    },
    {
      q: 'How do mutations run on the server?',
      a: 'Sequentially, in the order they appear, so a later mutation can depend on an earlier one.',
      level: 'intermediate',
    },
    {
      q: 'What should a mutation validate?',
      a: 'Every input, on the server. The client cannot be trusted.',
      level: 'basic',
    },
  ],
  subscriptions: [
    {
      q: 'What transport do subscriptions use?',
      a: 'WebSocket, which keeps a connection open for the server to push updates.',
      level: 'basic',
    },
    {
      q: 'When should you use a subscription?',
      a: 'For data that must be live, such as chat or notifications. For rarely changing data, polling is simpler.',
      level: 'intermediate',
    },
    {
      q: 'What does pubsub.publish do?',
      a: 'It broadcasts an event to subscribers, who then return the updated data.',
      level: 'basic',
    },
    {
      q: 'Why use Redis pub/sub in production?',
      a: 'In-memory pub/sub does not work across multiple server instances. Redis shares events between them.',
      level: 'advanced',
    },
  ],
  resolvers: [
    {
      q: 'What is a resolver?',
      a: 'A function that returns the value for a field. The schema defines what can be queried; resolvers define how.',
      level: 'basic',
    },
    {
      q: 'What is the N+1 problem?',
      a: 'A query that loads a list and then one query per item for a related field, such as courses and their lessons.',
      level: 'intermediate',
    },
    {
      q: 'What does DataLoader do?',
      a: 'It batches and caches lookups within one request, turning N+1 queries into 2.',
      level: 'intermediate',
    },
    {
      q: 'Where should request-scoped state live?',
      a: 'In the context object, which is built once per request and passed to every resolver.',
      level: 'intermediate',
    },
  ],
  'apollo-server': [
    {
      q: 'What does Apollo Server need to start?',
      a: 'A schema (typeDefs) and resolvers. It handles parsing, validation and execution.',
      level: 'basic',
    },
    {
      q: 'How does GraphQL report application errors?',
      a: 'In an errors array inside a 200 response, with a code in extensions for the client to handle.',
      level: 'intermediate',
    },
    {
      q: 'Schema-first versus code-first?',
      a: 'Schema-first writes the SDL by hand. Code-first generates the schema from code. Schema-first makes the contract explicit.',
      level: 'intermediate',
    },
    {
      q: 'What is a GraphQLError?',
      a: 'An error thrown in a resolver with a message and an extensions object carrying a machine-readable code.',
      level: 'basic',
    },
  ],
  'apollo-client': [
    {
      q: 'What does useQuery return?',
      a: 'data, loading and error, which reflect the current state of the query.',
      level: 'basic',
    },
    {
      q: 'How does the cache key entities?',
      a: 'By __typename and id, so the same entity is reused across queries.',
      level: 'intermediate',
    },
    {
      q: 'What is an optimistic update?',
      a: 'Showing the result of a mutation before the server replies, and rolling back on error.',
      level: 'intermediate',
    },
    {
      q: 'What does refetchQueries do?',
      a: 'It re-runs the listed queries after a mutation, refreshing affected data.',
      level: 'basic',
    },
  ],
  'auth-security': [
    {
      q: 'Where does authentication happen?',
      a: 'In the context function, which reads and verifies the token and puts the user in the context.',
      level: 'basic',
    },
    {
      q: 'How do you authorize a field?',
      a: 'Check the user role or ownership inside the resolver and throw when not allowed.',
      level: 'intermediate',
    },
    {
      q: 'Why limit query depth?',
      a: 'To prevent clients from overloading the server with deeply nested queries.',
      level: 'intermediate',
    },
    {
      q: 'What is a persisted query?',
      a: 'A pre-approved query the client refers to by hash, so the server runs only known queries.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you design a GraphQL API?',
      a: 'Schema-first with types, queries, mutations and subscriptions; resolvers per type; DataLoader for nested fields; auth in context.',
      level: 'intermediate',
    },
    {
      q: 'What makes a GraphQL answer strong in an interview?',
      a: 'It names where code runs, the data flow, the N+1 fix, and a security consideration, with one concrete example.',
      level: 'basic',
    },
    {
      q: 'How do you debug an N+1 problem?',
      a: 'Log the queries, count them for a known query, then add a DataLoader and verify the count drops.',
      level: 'advanced',
    },
    {
      q: 'What is the best first GraphQL step for a beginner?',
      a: 'Build a small schema with one query and one mutation, then add a nested field with a resolver.',
      level: 'basic',
    },
  ],
};
