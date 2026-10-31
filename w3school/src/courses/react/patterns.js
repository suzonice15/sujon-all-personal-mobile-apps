// React chapter: Advanced Patterns. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'patterns',
  title: 'Advanced Patterns',
  description: 'Error boundaries, portals, compound components and more',
  icon: 'architecture',
  lessons: [
    {
      id: 'react-error-boundaries',
      title: 'Error Boundaries',
      blocks: [
        { type: 'text', value: 'If a component throws while rendering, React removes the whole app from the screen. An error boundary catches errors below it and shows a fallback instead, so one broken widget does not crash everything.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { Component, useState } from 'react';

class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.log('Report to monitoring service:', error.message);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ background: '#fee2e2', padding: 10, borderRadius: 8 }}>
          Something went wrong in this widget.
          <button onClick={() => this.setState({ error: null })}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function BuggyCounter() {
  const [n, setN] = useState(0);
  if (n === 3) throw new Error('Counter crashed at 3!');
  return <button onClick={() => setN(n + 1)}>Count: {n} (crashes at 3)</button>;
}

export default function App() {
  return (
    <div>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
      <p>The rest of the app keeps working.</p>
    </div>
  );
}` },
        { type: 'note', value: 'Error boundaries are still written as classes (or with the react-error-boundary package). They do not catch errors in event handlers or async code; use try/catch there.' },
      ],
    },
    {
      id: 'react-portals-refs',
      title: 'Portals and forwardRef',
      blocks: [
        { type: 'heading', value: 'Portals: render outside the parent DOM' },
        { type: 'text', value: 'Modals, toasts and tooltips must appear above everything, but a parent with overflow: hidden or a z-index would clip them. createPortal renders children into another DOM node while keeping React behavior (state, context, events).' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';
import { createPortal } from 'react-dom';

function Modal({ onClose, children }) {
  return createPortal(
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'white', padding: 20, borderRadius: 12 }}>
        {children}
        <p><button onClick={onClose}>Close</button></p>
      </div>
    </div>,
    document.body
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ overflow: 'hidden', height: 80, border: '1px dashed gray' }}>
      A clipped container
      <button onClick={() => setOpen(true)}>Open modal</button>
      {open && <Modal onClose={() => setOpen(false)}><h3>Hello from a portal!</h3></Modal>}
    </div>
  );
}` },
        { type: 'heading', value: 'Passing refs to your own components' },
        { type: 'code', lang: 'jsx', value: `// React 19: ref is a normal prop
function TextInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// React 18 and earlier: wrap with forwardRef
const TextInput18 = forwardRef((props, ref) => <input ref={ref} {...props} />);` },
      ],
    },
    {
      id: 'react-compound-components',
      title: 'Compound Components',
      blocks: [
        { type: 'text', value: 'Compound components are a set of components that work together and share state through context, like <select> and <option>. They give users a flexible, readable API. Libraries such as Radix UI and Headless UI are built this way.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

function TabList({ children }) {
  return <div role="tablist" style={{ display: 'flex', gap: 6 }}>{children}</div>;
}

function Tab({ value, children }) {
  const { active, setActive } = useContext(TabsContext);
  const selected = active === value;
  return (
    <button role="tab" aria-selected={selected} onClick={() => setActive(value)}
            style={{ border: 0, padding: '8px 12px', borderRadius: 8, background: selected ? '#0f766e' : '#f1f5f9', color: selected ? 'white' : 'black' }}>
      {children}
    </button>
  );
}

function TabPanel({ value, children }) {
  const { active } = useContext(TabsContext);
  return active === value ? <div role="tabpanel" style={{ padding: 10 }}>{children}</div> : null;
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export default function App() {
  return (
    <Tabs defaultValue="lessons">
      <Tabs.List>
        <Tabs.Tab value="lessons">Lessons</Tabs.Tab>
        <Tabs.Tab value="quiz">Quiz</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="lessons">52 lessons waiting for you.</Tabs.Panel>
      <Tabs.Panel value="quiz">Test yourself with 56 questions.</Tabs.Panel>
    </Tabs>
  );
}` },
      ],
    },
    {
      id: 'react-render-props-hoc',
      title: 'Render Props and Higher-Order Components',
      blocks: [
        { type: 'text', value: 'Before hooks, these two patterns were the main way to share logic. Custom hooks have replaced most uses, but you will meet them in older codebases and some libraries.' },
        { type: 'heading', value: 'Render prop: pass a function that returns UI' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div onPointerMove={e => setPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
         style={{ height: 120, background: '#f1f5f9', borderRadius: 8 }}>
      {render(pos)}
    </div>
  );
}

export default function App() {
  return <MouseTracker render={({ x, y }) => <p style={{ padding: 10 }}>Pointer at {x}, {y} (move or drag here)</p>} />;
}` },
        { type: 'heading', value: 'Higher-order component: a function that wraps a component' },
        { type: 'code', lang: 'jsx', value: `function withLoading(Component) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) return <Spinner />;
    return <Component {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);
<UserListWithLoading isLoading={pending} users={users} />` },
        { type: 'note', value: 'For new code, prefer a custom hook (useMousePosition, useLoading). It is simpler and composes better.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'patterns', q: 'What does an error boundary do?', options: ['Prevents all errors', 'Catches render errors below it and shows a fallback', 'Validates forms', 'Retries fetch requests'], answer: 1, explain: 'It stops one crash from blanking the whole app.' },
    { chapterId: 'patterns', q: 'Why render a modal with createPortal?', options: ['It loads faster', 'To escape parents that clip or stack it, while keeping React behavior', 'It is required for state', 'To avoid CSS'], answer: 1, explain: 'Portals render into another DOM node such as document.body.' },
    { chapterId: 'patterns', q: 'How do compound components usually share state?', options: ['Global variables', 'Context provided by the parent component', 'localStorage', 'URL parameters'], answer: 1, explain: '<Tabs> provides context that <Tab> and <TabPanel> read.' },
    { chapterId: 'patterns', q: 'What has replaced most render props and HOCs in modern React?', options: ['Classes', 'Custom hooks', 'Portals', 'Redux'], answer: 1, explain: 'Custom hooks share logic with less nesting.' },
  ],
};
