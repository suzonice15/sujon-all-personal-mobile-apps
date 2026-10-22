// React chapter: Projects. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'projects',
  title: 'Projects',
  description: 'Build three real React apps',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'react-project-structure',
      title: 'Structuring a Real Project',
      blocks: [
        { type: 'text', value: 'A clear folder structure keeps a growing app manageable. Group code by feature rather than by file type once the app gets bigger.' },
        { type: 'code', lang: 'text', value: `src/
├── app/              App.jsx, routes, providers
├── components/       shared UI: Button, Modal, Card
├── features/
│   ├── courses/      CourseList.jsx, useCourses.js, api.js
│   ├── quiz/
│   └── auth/
├── hooks/            shared custom hooks
├── lib/              api client, helpers
└── styles/` },
        { type: 'list', items: [
          'Components: PascalCase files (CourseCard.jsx). Hooks: useSomething.js.',
          'Keep components small; split when a file passes ~200 lines.',
          'Keep API calls out of components: put them in api.js or custom hooks.',
          'Use environment variables (import.meta.env.VITE_API_URL) for URLs, never hard-coded secrets.',
        ] },
      ],
    },
    {
      id: 'react-project-todo',
      title: 'Project 1: Task Manager',
      blocks: [
        { type: 'text', value: 'A full task manager with a reducer, filters, edit-in-place, derived counts and localStorage persistence via a custom hook.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useEffect, useReducer, useState } from 'react';

function reducer(tasks, action) {
  switch (action.type) {
    case 'add': return [...tasks, { id: Date.now(), text: action.text, done: false }];
    case 'toggle': return tasks.map(t => (t.id === action.id ? { ...t, done: !t.done } : t));
    case 'edit': return tasks.map(t => (t.id === action.id ? { ...t, text: action.text } : t));
    case 'delete': return tasks.filter(t => t.id !== action.id);
    case 'clearDone': return tasks.filter(t => !t.done);
    default: return tasks;
  }
}

function usePersistentReducer(key, reducerFn, initial) {
  const [state, dispatch] = useReducer(reducerFn, initial, init => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : init;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));   // braces: an effect may only return a cleanup function
  }, [key, state]);
  return [state, dispatch];
}

function TaskItem({ task, dispatch }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);
  const save = () => { dispatch({ type: 'edit', id: task.id, text: draft.trim() || task.text }); setEditing(false); };

  return (
    <li style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 6, borderBottom: '1px solid #e2e8f0' }}>
      <input type="checkbox" checked={task.done} onChange={() => dispatch({ type: 'toggle', id: task.id })} />
      {editing
        ? <input autoFocus value={draft} onChange={e => setDraft(e.target.value)} onBlur={save} onKeyDown={e => e.key === 'Enter' && save()} />
        : <span onDoubleClick={() => setEditing(true)} style={{ flex: 1, textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</span>}
      <button onClick={() => dispatch({ type: 'delete', id: task.id })}>✕</button>
    </li>
  );
}

export default function App() {
  const [tasks, dispatch] = usePersistentReducer('react-tasks', reducer, []);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  const visible = tasks.filter(t => (filter === 'all' ? true : filter === 'done' ? t.done : !t.done));
  const left = tasks.filter(t => !t.done).length;

  return (
    <div style={{ maxWidth: 420, margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>Tasks</h2>
      <form onSubmit={e => { e.preventDefault(); if (text.trim()) { dispatch({ type: 'add', text: text.trim() }); setText(''); } }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Add a task" />
        <button>Add</button>
      </form>
      <p>
        {['all', 'open', 'done'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ fontWeight: filter === f ? 'bold' : 'normal' }}>{f}</button>
        ))}
      </p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {visible.map(t => <TaskItem key={t.id} task={t} dispatch={dispatch} />)}
      </ul>
      <p>{left} left · <button onClick={() => dispatch({ type: 'clearDone' })}>Clear done</button></p>
      <small>Double-tap a task to edit it.</small>
    </div>
  );
}` },
      ],
    },
    {
      id: 'react-project-movies',
      title: 'Project 2: Live Search App',
      blocks: [
        { type: 'text', value: 'Search a real public API as you type. It combines a debounce hook, fetching with cancellation (AbortController), loading and error states, and a details view.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

function useCountrySearch(query) {
  const [state, setState] = useState({ data: [], loading: false, error: null });

  useEffect(() => {
    if (query.length < 2) { setState({ data: [], loading: false, error: null }); return; }
    const controller = new AbortController();
    setState(s => ({ ...s, loading: true, error: null }));

    fetch('https://restcountries.com/v3.1/name/' + encodeURIComponent(query) + '?fields=name,flags,capital,population,cca3',
          { signal: controller.signal })
      .then(res => (res.status === 404 ? [] : res.ok ? res.json() : Promise.reject(new Error('HTTP ' + res.status))))
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => { if (err.name !== 'AbortError') setState({ data: [], loading: false, error: err.message }); });

    return () => controller.abort();   // cancel outdated requests
  }, [query]);

  return state;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const debounced = useDebounce(query, 400);
  const { data, loading, error } = useCountrySearch(debounced);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a country, e.g. bang" style={{ width: '100%', padding: 10 }} />
      {loading && <p>Searching...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {!loading && debounced.length >= 2 && data.length === 0 && !error && <p>No results.</p>}

      {selected && (
        <div style={{ background: '#f1f5f9', padding: 10, borderRadius: 10, margin: '8px 0' }}>
          <img src={selected.flags.png} alt="" width="80" />
          <h3>{selected.name.common}</h3>
          <p>Capital: {selected.capital?.[0] ?? 'N/A'} · Population: {selected.population.toLocaleString()}</p>
          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.slice(0, 10).map(c => (
          <li key={c.cca3} onClick={() => setSelected(c)} style={{ display: 'flex', gap: 8, padding: 6, cursor: 'pointer' }}>
            <img src={c.flags.png} alt="" width="32" /> {c.name.common}
          </li>
        ))}
      </ul>
    </div>
  );
}` },
      ],
    },
    {
      id: 'react-project-shop',
      title: 'Project 3: Shop with Cart',
      blocks: [
        { type: 'text', value: 'A mini e-commerce screen: product grid with category filter, a cart in context with a reducer, quantity controls, derived totals and a checkout modal rendered with a portal.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { createContext, useContext, useMemo, useReducer, useState } from 'react';
import { createPortal } from 'react-dom';

const PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', price: 850, category: 'Accessories' },
  { id: 2, name: 'Mechanical Keyboard', price: 4200, category: 'Accessories' },
  { id: 3, name: '24" Monitor', price: 14500, category: 'Displays' },
  { id: 4, name: 'USB-C Hub', price: 1900, category: 'Accessories' },
  { id: 5, name: 'Portable SSD 1TB', price: 9800, category: 'Storage' },
];

const CartContext = createContext(null);
const useCart = () => useContext(CartContext);

function cartReducer(cart, action) {
  const qty = cart[action.id] || 0;
  switch (action.type) {
    case 'add': return { ...cart, [action.id]: qty + 1 };
    case 'remove': {
      const next = { ...cart };
      if (qty <= 1) delete next[action.id]; else next[action.id] = qty - 1;
      return next;
    }
    case 'clear': return {};
    default: return cart;
  }
}

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, {});
  const value = useMemo(() => {
    const lines = Object.entries(cart).map(([id, qty]) => ({ ...PRODUCTS.find(p => p.id === Number(id)), qty }));
    const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    return { cart, lines, total, count, dispatch };
  }, [cart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function ProductCard({ product }) {
  const { cart, dispatch } = useCart();
  const qty = cart[product.id] || 0;
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 10 }}>
      <strong>{product.name}</strong>
      <p style={{ margin: '4px 0' }}>{product.price.toLocaleString()} tk</p>
      {qty === 0
        ? <button onClick={() => dispatch({ type: 'add', id: product.id })}>Add to cart</button>
        : <span><button onClick={() => dispatch({ type: 'remove', id: product.id })}>−</button> {qty} <button onClick={() => dispatch({ type: 'add', id: product.id })}>+</button></span>}
    </div>
  );
}

function Checkout({ onClose }) {
  const { lines, total, dispatch } = useCart();
  return createPortal(
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', display: 'grid', placeItems: 'center' }}>
      <div style={{ background: 'white', padding: 16, borderRadius: 12, width: 280 }}>
        <h3>Checkout</h3>
        {lines.map(l => <p key={l.id}>{l.name} × {l.qty}: {(l.price * l.qty).toLocaleString()} tk</p>)}
        <h4>Total: {total.toLocaleString()} tk</h4>
        <button onClick={() => { dispatch({ type: 'clear' }); onClose(); console.log('Order placed!'); }}>Place order</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>,
    document.body
  );
}

function Shop() {
  const [category, setCategory] = useState('All');
  const [checkout, setCheckout] = useState(false);
  const { count, total } = useCart();
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const shown = category === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>TechShop</h2>
        <button disabled={!count} onClick={() => setCheckout(true)}>🛒 {count} · {total.toLocaleString()} tk</button>
      </header>
      <p>{categories.map(c => <button key={c} onClick={() => setCategory(c)} style={{ fontWeight: c === category ? 'bold' : 'normal' }}>{c}</button>)}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
        {shown.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      {checkout && <Checkout onClose={() => setCheckout(false)} />}
    </div>
  );
}

export default function App() {
  return <CartProvider><Shop /></CartProvider>;
}` },
        { type: 'note', value: 'Great work: you have built three real apps. Extend them with routing, TanStack Query and TypeScript, then put them in your portfolio.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'projects', q: 'How should a growing React app be organized?', options: ['Everything in App.jsx', 'By feature folders with shared components and hooks', 'One folder per file type only', 'Randomly'], answer: 1, explain: 'Feature folders keep related code together.' },
    { chapterId: 'projects', q: 'In the live search app, why abort the previous fetch?', options: ['To save memory only', 'So an old slow response cannot overwrite newer results', 'React requires it', 'To avoid CORS'], answer: 1, explain: 'This prevents race conditions while typing.' },
    { chapterId: 'projects', q: 'In the shop, why are total and count computed instead of stored in state?', options: ['To use more memory', 'They can be derived from the cart, so they never get out of sync', 'State cannot hold numbers', 'For styling'], answer: 1, explain: 'Derived data belongs in calculations, not state.' },
  ],
};
