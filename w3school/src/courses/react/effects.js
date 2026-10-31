// React chapter: Effects. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'effects',
  title: 'Effects',
  description: 'Sync with the outside world using useEffect',
  icon: 'sync',
  lessons: [
    {
      id: 'react-useeffect',
      title: 'useEffect Basics',
      blocks: [
        { type: 'text', value: 'Rendering must be pure, but apps also need side effects: fetching data, timers, subscriptions, changing the page title. useEffect runs that code after React has updated the screen.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useEffect, useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = 'Clicked ' + count + ' times';
    console.log('Effect ran after render, count =', count);
  }, [count]); // re-run only when count changes

  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
}` },
        { type: 'heading', value: 'The dependency array' },
        { type: 'list', items: [
          'useEffect(fn): runs after every render (rarely what you want)',
          'useEffect(fn, []): runs once, after the first render',
          'useEffect(fn, [a, b]): runs after the first render and whenever a or b changes',
        ] },
        { type: 'note', value: 'List every value from the component that the effect uses. The official ESLint plugin (react-hooks/exhaustive-deps) checks this for you.' },
      ],
    },
    {
      id: 'react-effect-cleanup',
      title: 'Cleanup Functions',
      blocks: [
        { type: 'text', value: 'If an effect starts something (a timer, a listener, a connection), return a cleanup function that stops it. React runs the cleanup before the effect runs again and when the component is removed.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useEffect, useState } from 'react';

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    console.log('Timer started');
    return () => {
      clearInterval(id);
      console.log('Timer cleaned up');
    };
  }, []);

  return <h2>⏱ {seconds}s</h2>;
}

function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return <p>Window width: {width}px</p>;
}

export default function App() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'} stopwatch</button>
      {show && <Stopwatch />}
      <WindowWidth />
    </div>
  );
}` },
        { type: 'note', value: 'Missing cleanups cause memory leaks and duplicate timers. In development, StrictMode deliberately runs effects twice to expose them.' },
      ],
    },
    {
      id: 'react-fetching',
      title: 'Fetching Data in an Effect',
      blocks: [
        { type: 'text', value: 'A data request needs three states: loading, error and the data itself. An "ignore" flag in the cleanup prevents a slow old response from overwriting a newer one.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useEffect, useState } from 'react';

function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3&userId=' + userId)
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(data => { if (!ignore) setPosts(data); })
      .catch(err => { if (!ignore) setError(err.message); })
      .finally(() => { if (!ignore) setLoading(false); });

    return () => { ignore = true; };
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'crimson' }}>Error: {error}</p>;
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}

export default function App() {
  const [userId, setUserId] = useState(1);
  return (
    <div>
      {[1, 2, 3].map(id => (
        <button key={id} onClick={() => setUserId(id)} disabled={id === userId}>User {id}</button>
      ))}
      <UserPosts userId={userId} />
    </div>
  );
}` },
        { type: 'note', value: 'In real projects, a data library such as TanStack Query handles caching, retries and race conditions for you. You will learn it in the Data Fetching chapter.' },
      ],
    },
    {
      id: 'react-no-effect',
      title: 'You Might Not Need an Effect',
      blocks: [
        { type: 'text', value: 'Effects are an escape hatch for talking to systems outside React. Overusing them is the most common React mistake: it causes extra renders and bugs.' },
        { type: 'heading', value: 'Do not: derive data with an effect' },
        { type: 'code', lang: 'jsx', value: `// ❌ Extra state + effect, renders twice, can get out of sync
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(first + ' ' + last);
}, [first, last]);` },
        { type: 'code', lang: 'jsx', value: `// ✅ Just calculate it during render
const fullName = first + ' ' + last;` },
        { type: 'heading', value: 'Do not: respond to user events in an effect' },
        { type: 'code', lang: 'jsx', value: `// ❌ Effect watching a flag
useEffect(() => {
  if (submitted) sendAnalytics('signup');
}, [submitted]);

// ✅ Do it in the event handler that caused it
function handleSubmit() {
  sendAnalytics('signup');
}` },
        { type: 'list', items: [
          'Use effects for: fetching, subscriptions, timers, browser APIs, third-party widgets.',
          'Do not use effects for: calculations from props/state, handling clicks or submits.',
          'Expensive calculation? Use useMemo, not an effect.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'effects', q: 'When does useEffect(fn, []) run?', options: ['Before every render', 'After every render', 'Once, after the first render', 'Never'], answer: 2, explain: 'An empty dependency array means no dependency can change.' },
    { chapterId: 'effects', q: 'What should an effect that starts a setInterval return?', options: ['The interval id', 'A cleanup function that clears the interval', 'true', 'Nothing'], answer: 1, explain: 'Cleanup stops the timer when the component unmounts or re-runs.' },
    { chapterId: 'effects', q: 'Why use an ignore flag when fetching in an effect?', options: ['To speed up fetch', 'To avoid setting state from an outdated request', 'To skip errors', 'It is required by React'], answer: 1, explain: 'It prevents race conditions when inputs change quickly.' },
    { chapterId: 'effects', q: 'How should you compute fullName from firstName and lastName state?', options: ['In a useEffect with setFullName', 'Directly during render', 'In a setTimeout', 'With useRef'], answer: 1, explain: 'Derived values do not need state or effects.' },
  ],
};
