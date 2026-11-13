// GraphQL chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What GraphQL is, schema and first query',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'gql-what-is',
      title: 'What is GraphQL?',
      blocks: [
        { type: 'text', value: 'GraphQL is a query language for APIs. The client asks for exactly the fields it needs, in one request, and the server returns only those fields. No over-fetching, no under-fetching, and one endpoint for everything.' },
        { type: 'list', items: [
          'Client controls the shape of the response',
          'One endpoint, many queries',
          'Strongly typed schema describes the API',
          'Real-time with subscriptions',
          'Created by Facebook, now an open standard',
        ] },
        { type: 'note', value: 'GraphQL is not a database. It is a layer between the client and your data sources. It can sit in front of REST APIs, databases or microservices.' },
      ],
    },
    {
      id: 'gql-schema',
      title: 'The schema',
      blocks: [
        { type: 'text', value: 'The schema is a contract between client and server. It defines the types, the queries you can run and the mutations you can perform. The server validates every request against it.' },
        { type: 'code', lang: 'text', tryIt: false, value: `type Course {
  id: ID!
  title: String!
  price: Int!
  lessons: [Lesson!]!
}

type Lesson {
  id: ID!
  title: String!
  completed: Boolean!
}

type Query {
  courses: [Course!]!
  course(id: ID!): Course
}

type Mutation {
  createCourse(title: String!, price: Int!): Course!
}` },
        { type: 'note', value: '! means non-null. A field of type [Course!]! is a non-null list of non-null courses.' },
      ],
    },
    {
      id: 'gql-first-query',
      title: 'Your first query',
      blocks: [
        { type: 'text', value: 'A query names the fields it wants. The server returns JSON with the same shape. You can ask for nested fields, and the server resolves them.' },
        { type: 'code', lang: 'text', tryIt: false, value: `query {
  courses {
    title
    price
    lessons {
      title
      completed
    }
  }
}

# Response
{
  "data": {
    "courses": [
      {
        "title": "GraphQL",
        "price": 6000,
        "lessons": [
          { "title": "Intro", "completed": true }
        ]
      }
    ]
  }
}` },
        { type: 'note', value: 'The client asks for exactly what it needs. A mobile app can ask for fewer fields than a web app, and both use the same endpoint.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does GraphQL let the client do?',
      options: ['Define the database schema', 'Ask for exactly the fields it needs', 'Skip validation', 'Replace the server'],
      answer: 1,
      explain: 'The client controls the shape of the response.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does ! mean in a GraphQL type?',
      options: ['Optional', 'Non-null', 'Deprecated', 'Array'],
      answer: 1,
      explain: '! marks a non-null field.',
    },
    {
      chapterId: 'getting-started',
      q: 'How many endpoints does a GraphQL API usually have?',
      options: ['One per resource', 'One for queries and one for mutations', 'One', 'As many as REST'],
      answer: 2,
      explain: 'A single endpoint handles all queries and mutations.',
    },
    {
      chapterId: 'getting-started',
      q: 'Is GraphQL a database?',
      options: ['Yes', 'No, it is an API layer in front of data sources', 'Only for SQL', 'Only for NoSQL'],
      answer: 1,
      explain: 'GraphQL sits between the client and your data sources.',
    },
  ],
};
