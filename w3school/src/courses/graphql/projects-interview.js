// GraphQL chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a GraphQL API and prepare for interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'gql-project-api',
      title: 'Project: courses API',
      blocks: [
        { type: 'text', value: 'Build a small GraphQL API with courses, lessons and enrollments. Add queries, mutations, a subscription for new courses, and a DataLoader to avoid N+1.' },
        { type: 'code', lang: 'text', tryIt: false, value: `type Course { id: ID! title: String! price: Int! lessons: [Lesson!]! }
type Lesson { id: ID! title: String! completed: Boolean! }
type Enrollment { id: ID! user: User! course: Course! }

type Query {
  courses: [Course!]!
  course(id: ID!): Course
  myEnrollments: [Enrollment!]!
}

type Mutation {
  createCourse(input: CreateCourseInput!): Course!
  enroll(courseId: ID!): Enrollment!
}

type Subscription {
  courseAdded: Course!
}` },
        { type: 'list', items: [
          'Schema-first design with resolvers per type',
          'DataLoader for lessons and enrollments',
          'Authentication in context',
          'Authorization on mutations',
          'Persisted queries in production',
        ] },
        { type: 'note', value: 'A finished, tested API with a schema and a README is worth more than a long list of half-built features.' },
      ],
    },
    {
      id: 'gql-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'GraphQL versus REST?',
          'What is a resolver?',
          'What is the N+1 problem and how do you fix it?',
          'Query versus mutation versus subscription?',
          'What is a DataLoader?',
          'How do you handle errors in GraphQL?',
          'How do you authenticate and authorize?',
          'How do you protect the server from expensive queries?',
        ] },
        { type: 'text', value: 'Strong answers name the mechanism and the trade-off. "DataLoader batches lesson lookups within one request, so 100 courses cost 2 queries instead of 101" is a complete answer.' },
        { type: 'note', value: 'Be ready to write a small schema with one query and one mutation, and to explain the resolver for a nested field.' },
      ],
    },
    {
      id: 'gql-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: REST basics, then GraphQL concepts',
          'Week 2: schema and types',
          'Week 3: queries, mutations and variables',
          'Week 4: resolvers and DataLoader',
          'Week 5: Apollo Server and error handling',
          'Week 6: Apollo Client and caching',
          'Week 7: auth and query protection',
          'Week 8: build and deploy one complete API',
        ] },
        { type: 'note', value: 'Start with a small schema. A simple API with a few types teaches more than a large one you cannot finish.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What should a GraphQL resolver for a nested field return?',
      options: ['The whole database', 'The value for that field, often fetched with a loader', 'Nothing', 'A CSS class'],
      answer: 1,
      explain: 'The resolver provides the field value.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you avoid N+1 in a list query?',
      options: ['Use a larger query', 'Use DataLoader to batch the related lookups', 'Disable caching', 'Use REST instead'],
      answer: 1,
      explain: 'DataLoader batches per request.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a GraphQL portfolio project convincing?',
      options: ['Many unfinished types', 'A tested API with a schema, resolvers and a README', 'A copied tutorial', 'A large dependency list'],
      answer: 1,
      explain: 'A working, explained API shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first GraphQL step for a beginner?',
      options: ['Subscriptions', 'Build one query and one mutation on a small schema', 'Persisted queries', 'Federation'],
      answer: 1,
      explain: 'Start small and add features one at a time.',
    },
  ],
};
