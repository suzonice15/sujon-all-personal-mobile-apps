// GraphQL chapter: Subscriptions.

export default {
  id: 'subscriptions',
  title: 'Subscriptions',
  description: 'Real-time updates over WebSocket',
  icon: 'rss-feed',
  lessons: [
    {
      id: 'gql-subscription-basics',
      title: 'What is a subscription?',
      blocks: [
        { type: 'text', value: 'A subscription is a long-lived query. The client sends it once, and the server pushes a new result whenever the data changes. It uses WebSocket instead of HTTP.' },
        { type: 'code', lang: 'text', tryIt: false, value: `type Subscription {
  courseAdded: Course!
  lessonCompleted(courseId: ID!): Lesson!
}

subscription {
  courseAdded {
    id
    title
  }
}` },
        { type: 'note', value: 'Subscriptions are for live data such as chat, notifications and progress updates. For data that changes rarely, polling or refetching is simpler.' },
      ],
    },
    {
      id: 'gql-subscription-server',
      title: 'Publishing events',
      blocks: [
        { type: 'text', value: 'The server publishes an event when data changes. A resolver for the subscription filters events and returns the ones the client cares about.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Apollo Server
const pubsub = new PubSub();

const resolvers = {
  Mutation: {
    createCourse: async (_, { input }) => {
      const course = await db.course.create({ data: input });
      pubsub.publish('COURSE_ADDED', { courseAdded: course });
      return course;
    },
  },
  Subscription: {
    courseAdded: {
      subscribe: () => pubsub.asyncIterator(['COURSE_ADDED']),
    },
  },
};` },
        { type: 'note', value: 'In production, use a shared pub/sub such as Redis instead of an in-memory one, so events work across multiple server instances.' },
      ],
    },
    {
      id: 'gql-subscription-client',
      title: 'Subscribing from the client',
      blocks: [
        { type: 'text', value: 'Apollo Client opens a WebSocket connection and updates the cache when an event arrives. The UI re-renders automatically.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { useSubscription, gql } from '@apollo/client';

const COURSE_ADDED = gql\`
  subscription { courseAdded { id title } }
\`;

function CourseList() {
  const { data } = useSubscription(COURSE_ADDED);
  // update local state or cache when data arrives
  return <div>{data?.courseAdded.title}</div>;
}` },
        { type: 'list', items: [
          'Subscriptions keep a WebSocket open, which costs resources',
          'Use them only for data that must be live',
          'Handle reconnection and missed events',
          'Clean up the subscription when the component unmounts',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'subscriptions',
      q: 'What transport do subscriptions use?',
      options: ['HTTP polling', 'WebSocket', 'FTP', 'SMTP'],
      answer: 1,
      explain: 'Subscriptions push updates over a WebSocket.',
    },
    {
      chapterId: 'subscriptions',
      q: 'When should you prefer polling over a subscription?',
      options: ['For live chat', 'For data that changes rarely', 'For real-time games', 'For notifications'],
      answer: 1,
      explain: 'Polling is simpler when live updates are not needed.',
    },
    {
      chapterId: 'subscriptions',
      q: 'What does pubsub.publish do?',
      options: ['Deletes data', 'Sends an event to subscribers', 'Creates a table', 'Caches a query'],
      answer: 1,
      explain: 'It broadcasts an event to listeners.',
    },
    {
      chapterId: 'subscriptions',
      q: 'Why use Redis pub/sub in production?',
      options: ['It is faster', 'It works across multiple server instances', 'It replaces the database', 'It is required'],
      answer: 1,
      explain: 'In-memory pub/sub does not scale across instances.',
    },
  ],
};
