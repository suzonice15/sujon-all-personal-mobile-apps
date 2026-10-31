// React chapter: Hooks Deep Dive. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'hooks',
  title: 'Hooks Deep Dive',
  description: 'useRef, useMemo, useCallback, useReducer and custom hooks',
  icon: 'extension',
  lessons: [
    {
      id: 'react-hook-rules',
      title: 'Rules of Hooks',
      blocks: [
        { type: 'text', value: 'Hooks are functions whose names start with use. React tracks them by the order they are called, so two rules must always hold:' },
        { type: 'list', items: [
          'Only call hooks at the top level of a component or custom hook. Never inside if, loops or nested functions.',
          'Only call hooks from React components or other custom hooks, not from ordinary functions.',
        ] },
        { type: 'code', lang: 'jsx', value: `// ❌ Hook inside a condition: the order changes between renders
if (isLoggedIn) {
  const [cart, setCart] = useState([]);
}

// ✅ Call it always; use the condition inside
const [cart, setCart] = useState([]);
if (!isLoggedIn) return <Login />;` },
        { type: 'note', value: 'Install eslint-plugin-react-hooks. It catches both rule violations and missing effect dependencies automatically.' },
      ],
    },
    {
      id: 'react-useref',
      title: 'useRef',
      blocks: [
        { type: 'text', value: 'useRef gives you a box ({ current }) that survives re-renders but does not trigger one when it changes. Two main uses: pointing at DOM elements, and remembering values that are not shown on screen (timer ids, previous values).' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useRef, useState, useEffect } from 'react';

export default function App() {
  const inputRef = useRef(null);
  const renders = useRef(0);
  const [text, setText] = useState('');

  renders.current++;            // changing a ref does not re-render

  useEffect(() => {
    inputRef.current.focus();   // focus the input on first load
  }, []);

  return (
    <div>
      <input ref={inputRef} value={text} onChange={e => setText(e.target.value)} placeholder="Auto-focused" />
      <button onClick={() => { setText(''); inputRef.current.focus(); }}>Clear</button>
      <p>This component rendered {renders.current} times.</p>
    </div>
  );
}` },
        { type: 'note', value: 'Do not read or write ref.current during rendering for values shown on screen. If the screen needs it, it belongs in state.' },
      ],
    },
    {
      id: 'react-usememo-usecallback',
      title: 'useMemo and useCallback',
      blocks: [
        { type: 'text', value: 'useMemo remembers the result of an expensive calculation until its inputs change. useCallback remembers a function so the same function object is passed to children between renders.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useMemo, useState } from 'react';

const products = Array.from({ length: 20000 }, (_, i) => ({ id: i, name: 'Product ' + i, price: (i * 37) % 1000 }));

export default function App() {
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);

  const filtered = useMemo(() => {
    console.log('Filtering 20,000 products...');
    return products.filter(p => p.name.includes(query)).slice(0, 5);
  }, [query]); // not re-run when only the theme changes

  return (
    <div style={{ background: dark ? '#0f172a' : 'white', color: dark ? 'white' : 'black', padding: 10 }}>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search e.g. 199" />
      <button onClick={() => setDark(!dark)}>Toggle theme</button>
      <ul>{filtered.map(p => <li key={p.id}>{p.name}: {p.price} tk</li>)}</ul>
    </div>
  );
}` },
        { type: 'text', value: 'Toggle the theme and watch the console: the filter does not run again, because query did not change.' },
        { type: 'code', lang: 'jsx', value: `const handleSelect = useCallback(id => {
  setSelected(id);
}, []);   // same function every render → memo(Child) can skip re-rendering

<ProductList items={items} onSelect={handleSelect} />` },
        { type: 'note', value: 'Do not wrap everything. Use them for genuinely slow calculations, or when passing values to memo() components and effect dependencies. The new React Compiler can add them automatically.' },
      ],
    },
    {
      id: 'react-usereducer',
      title: 'useReducer',
      blocks: [
        { type: 'text', value: 'When state has many related fields or many ways to change, move the update logic into a reducer: a pure function (state, action) => newState. Components just "dispatch" actions describing what happened.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useReducer } from 'react';

const initialCart = { items: [], coupon: null };

function cartReducer(state, action) {
  switch (action.type) {
    case 'added': {
      const existing = state.items.find(i => i.id === action.item.id);
      const items = existing
        ? state.items.map(i => (i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state.items, { ...action.item, qty: 1 }];
      return { ...state, items };
    }
    case 'removed':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'couponApplied':
      return { ...state, coupon: action.code };
    case 'cleared':
      return initialCart;
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}

const menu = [{ id: 1, name: 'Burger', price: 250 }, { id: 2, name: 'Fries', price: 120 }];

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = cart.coupon === 'SAVE10' ? subtotal * 0.9 : subtotal;

  return (
    <div>
      {menu.map(item => (
        <button key={item.id} onClick={() => dispatch({ type: 'added', item })}>Add {item.name}</button>
      ))}
      <ul>
        {cart.items.map(i => (
          <li key={i.id}>
            {i.name} × {i.qty} <button onClick={() => dispatch({ type: 'removed', id: i.id })}>✕</button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: 'couponApplied', code: 'SAVE10' })}>Apply SAVE10</button>
      <button onClick={() => dispatch({ type: 'cleared' })}>Clear</button>
      <h3>Total: {total} tk</h3>
    </div>
  );
}` },
        { type: 'note', value: 'Reducers are pure, so they are easy to test without rendering anything. This is the same idea Redux is built on.' },
      ],
    },
    {
      id: 'react-custom-hooks',
      title: 'Custom Hooks',
      blocks: [
        { type: 'text', value: 'A custom hook is a function starting with use that calls other hooks. It lets you reuse stateful logic between components. Each component that uses it gets its own independent state.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);
  return online;
}

export default function App() {
  const [name, setName] = useLocalStorage('name', '');
  const debouncedName = useDebounce(name);
  const online = useOnline();

  return (
    <div>
      <p>{online ? '🟢 Online' : '🔴 Offline'}</p>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Saved even after Run" />
      <p>Debounced value: {debouncedName}</p>
    </div>
  );
}` },
        { type: 'note', value: 'Custom hooks share logic, not state. Two components calling useLocalStorage("a") each have their own useState inside.' },
      ],
    },
    {
      id: 'react-more-hooks',
      title: 'useLayoutEffect, useImperativeHandle and useSyncExternalStore',
      blocks: [
        { type: 'heading', value: 'useLayoutEffect: measure before the screen paints' },
        { type: 'text', value: 'Same as useEffect but runs synchronously after DOM changes and before the browser paints. Use it only when you must measure layout and adjust immediately (tooltips, popovers), otherwise the user sees a flicker.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useLayoutEffect, useRef, useState } from 'react';

function Tooltip({ text }) {
  const ref = useRef(null);
  const [above, setAbove] = useState(true);

  useLayoutEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    setAbove(rect.top > 60);       // not enough room above? show below instead
  }, []);

  return (
    <span ref={ref} style={{ background: '#0f172a', color: 'white', padding: '4px 8px', borderRadius: 6 }}>
      {text} ({above ? 'above' : 'below'})
    </span>
  );
}

export default function App() {
  return <div style={{ paddingTop: 10 }}><Tooltip text="Near the top" /></div>;
}` },
        { type: 'heading', value: 'useImperativeHandle: expose a small API from a child' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useImperativeHandle, useRef, forwardRef } from 'react';

const VideoPlayer = forwardRef(function VideoPlayer(props, ref) {
  const videoRef = useRef(null);
  useImperativeHandle(ref, () => ({
    play: () => videoRef.current.play(),
    restart: () => { videoRef.current.currentTime = 0; videoRef.current.play(); },
  }));
  return <video ref={videoRef} width="260" muted src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />;
});

export default function App() {
  const player = useRef(null);
  return (
    <div>
      <VideoPlayer ref={player} />
      <p><button onClick={() => player.current.play()}>Play</button> <button onClick={() => player.current.restart()}>Restart</button></p>
    </div>
  );
}` },
        { type: 'heading', value: 'useSyncExternalStore: subscribe to outside data safely' },
        { type: 'code', lang: 'jsx', value: `import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

export function useOnlineStatus() {
  return useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
}` },
        { type: 'note', value: 'useSyncExternalStore is how libraries like Zustand and Redux connect their stores to React without tearing during concurrent rendering.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'hooks', q: 'Where can hooks be called?', options: ['Inside if statements', 'At the top level of components and custom hooks', 'Inside loops', 'In any function'], answer: 1, explain: 'React relies on the call order being the same every render.' },
    { chapterId: 'hooks', q: 'Does changing ref.current trigger a re-render?', options: ['Yes', 'No', 'Only for DOM refs', 'Only in StrictMode'], answer: 1, explain: 'Refs are for values that should not cause renders.' },
    { chapterId: 'hooks', q: 'What does useMemo do?', options: ['Stores state', 'Remembers a calculated value until its dependencies change', 'Fetches data', 'Creates refs'], answer: 1, explain: 'It skips expensive recalculations.' },
    { chapterId: 'hooks', q: 'A reducer function must be...', options: ['Async', 'Pure: (state, action) => newState', 'A class', 'A custom hook'], answer: 1, explain: 'No side effects, no mutation, just compute the next state.' },
    { chapterId: 'hooks', q: 'Do two components using the same custom hook share state?', options: ['Yes, always', 'No, each gets its own state', 'Only with context', 'Only on the first render'], answer: 1, explain: 'Custom hooks share logic, not state.' },
    { chapterId: 'hooks', q: 'When should you use useLayoutEffect instead of useEffect?', options: ['For data fetching', 'When you must measure the DOM and update before the screen paints', 'Always', 'For timers'], answer: 1, explain: 'It prevents visible flicker but blocks painting, so use it sparingly.' },
  ],
};
