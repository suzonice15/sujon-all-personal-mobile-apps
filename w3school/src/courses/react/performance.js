// React chapter: Performance. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'performance',
  title: 'Performance',
  description: 'Avoid wasted renders and load less code',
  icon: 'speed',
  lessons: [
    {
      id: 'react-rerenders',
      title: 'Why Components Re-render',
      blocks: [
        { type: 'text', value: 'A component re-renders when its state changes, when its parent re-renders, or when a context it reads changes. Re-rendering is usually cheap. Optimize only when something is actually slow.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState, memo } from 'react';

function SlowList({ items }) {
  console.log('SlowList rendered');
  return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;
}
const MemoList = memo(SlowList);      // skips re-render if props are the same

const items = ['HTML', 'CSS', 'JavaScript'];   // defined outside: same array every time

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Clicks: {count}</button>
      <SlowList items={items} />
      <MemoList items={items} />
    </div>
  );
}` },
        { type: 'text', value: 'Tap the button: the console shows only the plain SlowList re-rendering. memo skipped the second one because its props did not change.' },
        { type: 'heading', value: 'Cheap wins before memo' },
        { type: 'list', items: [
          'Move state down: keep state in the small component that uses it, so less re-renders.',
          'Pass children: a parent that wraps <Expensive /> as children does not re-render it when the parent\'s state changes.',
          'Avoid creating new objects and functions in props of memo components (or use useMemo/useCallback).',
        ] },
      ],
    },
    {
      id: 'react-code-splitting',
      title: 'Code Splitting with lazy and Suspense',
      blocks: [
        { type: 'text', value: 'Big apps should not download every page up front. lazy() loads a component\'s code only when it is first shown; Suspense displays a fallback meanwhile.' },
        { type: 'code', lang: 'jsx', value: `import { lazy, Suspense } from 'react';

const AdminDashboard = lazy(() => import('./AdminDashboard'));   // separate file chunk
const Charts = lazy(() => import('./Charts'));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  );
}` },
        { type: 'note', value: 'Split by route first: it gives the biggest gain with the least effort. Most users never open the admin pages.' },
      ],
    },
    {
      id: 'react-transitions',
      title: 'Keeping the UI Responsive: useTransition and useDeferredValue',
      blocks: [
        { type: 'text', value: 'Some updates are urgent (typing), others can wait (filtering a huge list). Concurrent React lets you mark slow updates as non-urgent so typing never feels laggy.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState, useDeferredValue, memo } from 'react';

const BigList = memo(function BigList({ query }) {
  const items = [];
  for (let i = 0; i < 4000; i++) {
    const label = 'Item ' + i;
    if (label.includes(query)) items.push(<li key={i}>{label}</li>);
  }
  return <ul style={{ height: 200, overflow: 'auto' }}>{items}</ul>;
});

export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);   // may lag behind while typing
  const isStale = query !== deferredQuery;

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Type fast, e.g. 12" />
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <BigList query={deferredQuery} />
      </div>
    </div>
  );
}` },
        { type: 'list', items: [
          'useDeferredValue(value): render with an older value while the new one is prepared',
          'useTransition(): const [isPending, startTransition] = useTransition(); startTransition(() => setTab(next))',
        ] },
      ],
    },
    {
      id: 'react-profiling',
      title: 'Measuring: Profiler and Long Lists',
      blocks: [
        { type: 'text', value: 'Never guess where an app is slow; measure. React Developer Tools (a browser extension) has a Profiler tab that records which components rendered, how long each took, and why.' },
        { type: 'list', items: [
          'Record an interaction, then look for components that render often or take long.',
          'Enable "Highlight updates when components render" to see re-renders live.',
          'Test on a real mid-range phone, not only a fast laptop.',
        ] },
        { type: 'heading', value: 'Virtualize long lists' },
        { type: 'code', lang: 'jsx', value: `// npm install @tanstack/react-virtual
import { useVirtualizer } from '@tanstack/react-virtual';

function MessageList({ messages }) {
  const parentRef = useRef(null);
  const rows = useVirtualizer({
    count: messages.length,          // 50,000 messages...
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
  });
  // ...but only the ~15 visible rows are actually rendered
}` },
        { type: 'note', value: 'React Native\'s FlatList (used in this app) applies the same virtualization idea on mobile.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'performance', q: 'Which is NOT a reason a component re-renders?', options: ['Its state changed', 'Its parent re-rendered', 'A context it uses changed', 'A CSS file was loaded'], answer: 3, explain: 'Only state, parent renders and context trigger renders.' },
    { chapterId: 'performance', q: 'What does memo(Component) do?', options: ['Caches API data', 'Skips re-rendering when props are unchanged', 'Makes state global', 'Lazy-loads the component'], answer: 1, explain: 'It compares props shallowly.' },
    { chapterId: 'performance', q: 'What does lazy() enable?', options: ['Slower renders', 'Loading a component\'s code only when needed', 'Lazy state updates', 'Debouncing'], answer: 1, explain: 'Combine it with Suspense for a loading fallback.' },
    { chapterId: 'performance', q: 'What should you do before optimizing?', options: ['Add memo everywhere', 'Measure with the Profiler', 'Rewrite in another framework', 'Remove all state'], answer: 1, explain: 'Optimize what the measurements show is slow.' },
  ],
};
