// React Native chapter: Networking.

export default {
  id: 'networking',
  title: 'Networking',
  description: 'Fetch, loading states, errors and API clients',
  icon: 'cloud',
  lessons: [
    {
      id: 'rn-fetch',
      title: 'fetch',
      blocks: [
        { type: 'text', value: 'fetch is built into React Native. It returns a promise for the response; you still need to check response.ok and parse the body.' },
        { type: 'code', lang: 'js', tryIt: false, value: `async function getCourses() {
  const response = await fetch('https://api.example.com/courses');
  if (!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }
  return response.json();
}` },
        { type: 'note', value: 'fetch does not reject on HTTP 404 or 500. Check response.ok or you will treat an error page as success.' },
      ],
    },
    {
      id: 'rn-loading-errors',
      title: 'Loading, error and empty states',
      blocks: [
        { type: 'text', value: 'Every network screen has three states besides success: loading, error and empty. Design them explicitly instead of showing a blank screen.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Courses() {
  const [state, setState] = useState({ loading: true, error: null, data: [] });

  useEffect(() => {
    getCourses()
      .then((data) => setState({ loading: false, error: null, data }))
      .catch((error) => setState({ loading: false, error: error.message, data: [] }));
  }, []);

  if (state.loading) return <ActivityIndicator />;
  if (state.error) return <Text>{state.error}</Text>;
  if (state.data.length === 0) return <Text>No courses yet</Text>;

  return <Text>{state.data.length} courses</Text>;
}` },
        { type: 'note', value: 'Use one state object for loading, error and data so they cannot contradict each other.' },
      ],
    },
    {
      id: 'rn-api-client',
      title: 'A small API client',
      blocks: [
        { type: 'text', value: 'Wrap fetch in one module. Add the base URL, headers and error handling once so every screen behaves the same.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const BASE_URL = 'https://api.example.com';

async function request(path, options = {}) {
  const response = await fetch(BASE_URL + path, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message || 'Request failed');
  }
  return body;
}

export const api = {
  get: (path) => request(path),
  post: (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) }),
};` },
        { type: 'note', value: 'Never hardcode tokens in the client. Use the platform secure storage and attach the token in the request headers.' },
      ],
    },
    {
      id: 'rn-offline',
      title: 'Offline and retries',
      blocks: [
        { type: 'text', value: 'Mobile networks fail. Show cached data, queue writes and retry with backoff. A spinner forever is a broken app.' },
        { type: 'list', items: [
          'Cache the last successful response',
          'Show an offline banner instead of an empty screen',
          'Queue writes and sync when online',
          'Retry with exponential backoff and a limit',
          'Do not retry a non-idempotent request without a key',
        ] },
        { type: 'note', value: 'The app itself uses SQLite as a local cache and an outbox for coins and progress. That is the pattern to copy.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'networking',
      q: 'Does fetch reject on a 404?',
      options: ['Yes', 'No, check response.ok', 'Only on Android', 'Only with axios'],
      answer: 1,
      explain: 'fetch resolves for any HTTP response; response.ok tells you if it succeeded.',
    },
    {
      chapterId: 'networking',
      q: 'Why model loading, error and data together?',
      options: ['It is shorter', 'They cannot contradict each other', 'It enables CORS', 'It caches data'],
      answer: 1,
      explain: 'A single state object prevents impossible combinations.',
    },
    {
      chapterId: 'networking',
      q: 'What should an offline screen show?',
      options: ['A blank page', 'Cached data and an offline message', 'A permanent spinner', 'A crash'],
      answer: 1,
      explain: 'Cached data plus a clear banner is the usable failure state.',
    },
    {
      chapterId: 'networking',
      q: 'Why not retry a POST blindly?',
      options: ['It is slower', 'It can create duplicate records', 'It breaks CORS', 'It is always idempotent'],
      answer: 1,
      explain: 'Use an idempotency key or do not retry automatically.',
    },
  ],
};
