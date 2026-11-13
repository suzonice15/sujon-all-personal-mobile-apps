// GraphQL chapter: Schema and Types.

export default {
  id: 'schema-types',
  title: 'Schema & Types',
  description: 'Scalars, objects, enums, interfaces and unions',
  icon: 'category',
  lessons: [
    {
      id: 'gql-scalars',
      title: 'Scalar types',
      blocks: [
        { type: 'text', value: 'GraphQL has built-in scalars: Int, Float, String, Boolean and ID. You can define custom scalars such as Date or Money when the built-in ones are not enough.' },
        { type: 'code', lang: 'text', tryIt: false, value: `scalar Date
scalar Money

type Course {
  id: ID!
  title: String!
  price: Money!
  createdAt: Date!
  published: Boolean!
}` },
        { type: 'note', value: 'A custom scalar needs a parser and a serializer on the server so GraphQL knows how to read and write it.' },
      ],
    },
    {
      id: 'gql-objects-enums',
      title: 'Object types and enums',
      blocks: [
        { type: 'text', value: 'Object types group related fields. Enums define a fixed set of values. Both are the building blocks of a schema.' },
        { type: 'code', lang: 'text', tryIt: false, value: `enum Level { BEGINNER INTERMEDIATE ADVANCED }

type Course {
  id: ID!
  title: String!
  level: Level!
  instructor: User
}

type User {
  id: ID!
  name: String!
  email: String!
}` },
        { type: 'note', value: 'Enums serialize as strings by default. The client and server agree on the allowed values through the schema.' },
      ],
    },
    {
      id: 'gql-interfaces-unions',
      title: 'Interfaces and unions',
      blocks: [
        { type: 'text', value: 'An interface defines fields that several types share. A union groups types that have nothing in common. Both let a field return one of several types.' },
        { type: 'code', lang: 'text', tryIt: false, value: `interface Node {
  id: ID!
}

type Course implements Node { id: ID! title: String! }
type Lesson implements Node { id: ID! title: String! }

union SearchResult = Course | Lesson | User

type Query {
  node(id: ID!): Node
  search(term: String!): [SearchResult!]!
}` },
        { type: 'note', value: 'When a field returns an interface or union, the client uses inline fragments to ask for type-specific fields.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'schema-types',
      q: 'Which of these is a built-in GraphQL scalar?',
      options: ['Date', 'Money', 'String', 'URL'],
      answer: 2,
      explain: 'String is a built-in scalar.',
    },
    {
      chapterId: 'schema-types',
      q: 'What does an enum define?',
      options: ['A function', 'A fixed set of allowed values', 'A database table', 'An array'],
      answer: 1,
      explain: 'An enum lists the allowed values.',
    },
    {
      chapterId: 'schema-types',
      q: 'What is an interface in GraphQL?',
      options: ['A REST endpoint', 'A set of fields shared by several types', 'A database join', 'A cache'],
      answer: 1,
      explain: 'Several types can implement the same interface.',
    },
    {
      chapterId: 'schema-types',
      q: 'When would you use a union?',
      options: ['When types share fields', 'When a field can return one of several unrelated types', 'For numbers only', 'For sorting'],
      answer: 1,
      explain: 'A union groups types with no common fields.',
    },
  ],
};
