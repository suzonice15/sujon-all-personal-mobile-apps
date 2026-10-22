// React chapter: Context and State Management. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'context-state',
  title: 'Context and State Management',
  description: 'Share data across the app without prop drilling',
  icon: 'hub',
  lessons: [
    {
      id: 'react-context',
      title: 'useContext',
      blocks: [
        { type: 'text', value: 'Passing a prop through many layers that do not use it is called prop drilling. Context lets a parent provide a value that any component below it can read directly. Typical uses: theme, logged-in user, language.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const dark = theme === 'dark';
  return (
    <button style={{ background: dark ? '#e2e8f0' : '#0f172a', color: dark ? '#0f172a' : 'white', border: 0, padding: '8px 14px', borderRadius: 8 }}>
      {children}
    </button>
  );
}

function Toolbar() {               // does not need to know about theme
  return <div><Button>Save</Button> <Button>Share</Button></div>;
}

export default function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ background: theme === 'dark' ? '#0f172a' : 'white', padding: 16 }}>
        <Toolbar />
        <p><label style={{ color: theme === 'dark' ? 'white' : 'black' }}>
          <input type="checkbox" onChange={e => setTheme(e.target.checked ? 'dark' : 'light')} /> Dark mode
        </label></p>
      </div>
    </ThemeContext.Provider>
  );
}` },
        { type: 'note', value: 'When the context value changes, every component reading it re-renders. Keep frequently changing values out of big app-wide contexts.' },
      ],
    },
    {
      id: 'react-context-reducer',
      title: 'Context + Reducer: an App Store',
      blocks: [
        { type: 'text', value: 'Combining useReducer with context gives you a small global store without any library. Wrap it in a provider component and custom hooks for a clean API.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

function cartReducer(items, action) {
  switch (action.type) {
    case 'add': return [...items, action.product];
    case 'remove': return items.filter((_, i) => i !== action.index);
    default: return items;
  }
}

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  return <CartContext.Provider value={{ items, dispatch }}>{children}</CartContext.Provider>;
}

function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}

function Header() {
  const { items } = useCart();
  return <h3>🛒 Cart ({items.length})</h3>;
}

function ProductList() {
  const { dispatch } = useCart();
  return ['Keyboard', 'Mouse', 'Monitor'].map(p => (
    <button key={p} onClick={() => dispatch({ type: 'add', product: p })}>Add {p}</button>
  ));
}

function CartItems() {
  const { items, dispatch } = useCart();
  return <ul>{items.map((p, i) => <li key={i}>{p} <button onClick={() => dispatch({ type: 'remove', index: i })}>✕</button></li>)}</ul>;
}

export default function App() {
  return (
    <CartProvider>
      <Header />
      <ProductList />
      <CartItems />
    </CartProvider>
  );
}` },
      ],
    },
    {
      id: 'react-state-libraries',
      title: 'State Libraries: Zustand and Redux Toolkit',
      blocks: [
        { type: 'text', value: 'For large apps with lots of shared, frequently changing state, teams use a state library. They avoid context re-render problems and add developer tools.' },
        { type: 'heading', value: 'Zustand: tiny and simple' },
        { type: 'code', lang: 'jsx', value: `// store.js   (npm install zustand)
import { create } from 'zustand';

export const useCartStore = create(set => ({
  items: [],
  add: product => set(state => ({ items: [...state.items, product] })),
  clear: () => set({ items: [] }),
}));

// Any component, no provider needed:
const count = useCartStore(state => state.items.length); // re-renders only when count changes
const add = useCartStore(state => state.add);` },
        { type: 'heading', value: 'Redux Toolkit: the industry standard for big teams' },
        { type: 'code', lang: 'jsx', value: `import { createSlice, configureStore } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    added(state, action) { state.items.push(action.payload); }, // Immer allows "mutating" syntax
  },
});

export const { added } = cartSlice.actions;
export const store = configureStore({ reducer: { cart: cartSlice.reducer } });

// In components (react-redux):
// const items = useSelector(state => state.cart.items);
// const dispatch = useDispatch();  dispatch(added(product));` },
        { type: 'list', items: [
          'Local UI state (open/closed, input text): useState',
          'Shared by a few nearby components: lift state up',
          'App-wide but rarely changing (theme, user): context',
          'App-wide and frequently changing: Zustand or Redux Toolkit',
          'Server data (lists from an API): TanStack Query, not a state library',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'context-state', q: 'What problem does context solve?', options: ['Slow rendering', 'Prop drilling through many layers', 'CSS conflicts', 'Network errors'], answer: 1, explain: 'Components can read the value without it being passed down manually.' },
    { chapterId: 'context-state', q: 'Which hook reads a context value?', options: ['useState', 'useContext', 'useReducer', 'useRef'], answer: 1, explain: 'const theme = useContext(ThemeContext).' },
    { chapterId: 'context-state', q: 'What happens when a context value changes?', options: ['Nothing', 'Every component that reads it re-renders', 'The page reloads', 'Only the provider re-renders'], answer: 1, explain: 'Consumers update with the new value.' },
    { chapterId: 'context-state', q: 'What is the best tool for caching data from an API?', options: ['Redux', 'useRef', 'TanStack Query', 'Context'], answer: 2, explain: 'Server state needs caching, refetching and invalidation.' },
  ],
};
