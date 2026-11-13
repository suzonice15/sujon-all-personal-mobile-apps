// GraphQL chapter: Mutations.

export default {
  id: 'mutations',
  title: 'Mutations',
  description: 'Create, update and delete with input types',
  icon: 'edit',
  lessons: [
    {
      id: 'gql-mutation-basics',
      title: 'Writing a mutation',
      blocks: [
        { type: 'text', value: 'A mutation changes data on the server. It is defined in the schema like a query, but convention says it does something. The client calls it with arguments and gets back the changed object.' },
        { type: 'code', lang: 'text', tryIt: false, value: `type Mutation {
  createCourse(title: String!, price: Int!): Course!
  updateCourse(id: ID!, price: Int): Course
  deleteCourse(id: ID!): Boolean!
}

mutation {
  createCourse(title: "GraphQL", price: 6000) {
    id
    title
  }
}` },
        { type: 'note', value: 'Mutations run sequentially on the server, one after another, so a later mutation can depend on an earlier result.' },
      ],
    },
    {
      id: 'gql-input-types',
      title: 'Input types',
      blocks: [
        { type: 'text', value: 'An input type groups arguments into one object. It keeps the schema clean when a mutation takes many fields, and it is reusable across mutations.' },
        { type: 'code', lang: 'text', tryIt: false, value: `input CreateCourseInput {
  title: String!
  price: Int!
  level: Level
}

type Mutation {
  createCourse(input: CreateCourseInput!): Course!
}

mutation Create($input: CreateCourseInput!) {
  createCourse(input: $input) {
    id
    title
  }
}` },
        { type: 'note', value: 'Input types can only contain scalars, enums and other input types. They cannot contain output types or fields with arguments.' },
      ],
    },
    {
      id: 'gql-mutation-patterns',
      title: 'Mutation patterns',
      blocks: [
        { type: 'text', value: 'Return the changed object so the client can update its cache. For deletes, return a boolean or the deleted id. Validate input on the server and return errors in the response.' },
        { type: 'list', items: [
          'Return the updated object for updates',
          'Return the new object for creates',
          'Return a boolean or id for deletes',
          'Validate input and return field-level errors',
          'Use optimistic updates on the client for instant feedback',
        ] },
        { type: 'note', value: 'A mutation that returns nothing forces the client to refetch. Returning the changed object lets the cache update in place.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'mutations',
      q: 'What does a mutation do?',
      options: ['Reads data', 'Changes data on the server', 'Defines a type', 'Creates an index'],
      answer: 1,
      explain: 'Mutations write or modify data.',
    },
    {
      chapterId: 'mutations',
      q: 'Why use an input type?',
      options: ['To make queries faster', 'To group many arguments into one reusable object', 'To replace scalars', 'To skip validation'],
      answer: 1,
      explain: 'Input types keep mutations readable.',
    },
    {
      chapterId: 'mutations',
      q: 'What should a mutation return?',
      options: ['Nothing', 'The changed object so the client can update its cache', 'Only a status code', 'The whole database'],
      answer: 1,
      explain: 'Returning the changed object enables cache updates.',
    },
    {
      chapterId: 'mutations',
      q: 'How do mutations run on the server?',
      options: ['In parallel', 'Sequentially, one after another', 'Randomly', 'Only at build time'],
      answer: 1,
      explain: 'Mutations are executed in order.',
    },
  ],
};
