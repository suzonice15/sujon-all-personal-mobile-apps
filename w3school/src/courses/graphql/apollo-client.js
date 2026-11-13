// GraphQL chapter: Apollo Client.

export default {
  id: 'apollo-client',
  title: 'Apollo Client',
  description: 'Querying, caching and mutations in React',
  icon: 'blur-circular',
  lessons: [
    {
      id: 'gql-client-setup',
      title: 'Setting up Apollo Client',
      blocks: [
        { type: 'text', value: 'Apollo Client is the most popular GraphQL client for React. It manages the cache, handles loading and error states, and updates the UI when data changes.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CourseList />
    </ApolloProvider>
  );
}` },
        { type: 'note', value: 'The InMemoryCache stores query results by type and id, so repeated queries are instant.' },
      ],
    },
    {
      id: 'gql-use-query',
      title: 'useQuery and useMutation',
      blocks: [
        { type: 'text', value: 'useQuery runs a query when the component mounts and returns data, loading and error. useMutation returns a function to trigger a mutation and its result.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const GET_COURSES = gql\`
  query { courses { id title price } }
\`;

function CourseList() {
  const { loading, error, data } = useQuery(GET_COURSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.courses.map(c => <li key={c.id}>{c.title} - {c.price}</li>)}
    </ul>
  );
}` },
        { type: 'code', lang: 'js', tryIt: false, value: `const CREATE_COURSE = gql\`
  mutation Create($title: String!, $price: Int!) {
    createCourse(title: $title, price: $price) { id title }
  }
\`;

function AddCourse() {
  const [create, { loading }] = useMutation(CREATE_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
  });
  return <button onClick={() => create({ variables: { title: 'New', price: 100 } })}>Add</button>;
}` },
        { type: 'note', value: 'refetchQueries re-runs a query after a mutation. For better performance, update the cache directly with update or cache.modify.' },
      ],
    },
    {
      id: 'gql-cache',
      title: 'Caching and optimistic updates',
      blocks: [
        { type: 'text', value: 'Apollo caches by __typename and id. After a mutation, update the cache so the UI reflects the change without a refetch. Optimistic updates show the result instantly and roll back on error.' },
        { type: 'list', items: [
          'InMemoryCache keys by __typename and id',
          'update function modifies the cache after a mutation',
          'optimisticResponse shows the result before the server replies',
          'fetchPolicy controls when to use the cache or the network',
        ] },
        { type: 'note', value: 'A cache that is never invalidated shows stale data. Use refetchQueries or update carefully, and test the cache behaviour.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'apollo-client',
      q: 'What does useQuery return?',
      options: ['A function to run the query', 'data, loading and error', 'A mutation', 'A subscription'],
      answer: 1,
      explain: 'useQuery returns the result state.',
    },
    {
      chapterId: 'apollo-client',
      q: 'How does the cache key entities?',
      options: ['By query name', 'By __typename and id', 'By URL', 'By timestamp'],
      answer: 1,
      explain: 'The cache uses type and id as the key.',
    },
    {
      chapterId: 'apollo-client',
      q: 'What is an optimistic update?',
      options: ['A slower query', 'Showing the result before the server replies', 'A cache miss', 'A retry'],
      answer: 1,
      explain: 'It gives instant feedback and rolls back on error.',
    },
    {
      chapterId: 'apollo-client',
      q: 'What does refetchQueries do after a mutation?',
      options: ['Deletes the cache', 'Re-runs the listed queries', 'Retries the mutation', 'Logs the result'],
      answer: 1,
      explain: 'It refreshes affected queries.',
    },
  ],
};
