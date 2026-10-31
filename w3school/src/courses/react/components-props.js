// React chapter: Components and Props. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'components-props',
  title: 'Components and Props',
  description: 'Pass data, render lists and show things conditionally',
  icon: 'widgets',
  lessons: [
    {
      id: 'react-props',
      title: 'Props',
      blocks: [
        { type: 'text', value: 'Props are the inputs of a component, passed like HTML attributes. They let the same component show different data. Props are read-only: a component must never change its own props.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `function CourseCard({ title, lessons, color = '#2563eb', isNew }) {
  return (
    <div style={{ borderLeft: '6px solid ' + color, padding: 12, margin: '8px 0', background: '#f8fafc', borderRadius: 8 }}>
      <h3 style={{ margin: 0 }}>{title} {isNew && <small style={{ color: 'crimson' }}>NEW</small>}</h3>
      <p style={{ margin: 0 }}>{lessons} lessons</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <CourseCard title="HTML" lessons={52} color="#e44d26" />
      <CourseCard title="CSS" lessons={56} color="#2965f1" />
      <CourseCard title="React" lessons={60} isNew />
    </div>
  );
}` },
        { type: 'list', items: [
          'Destructure props in the parameter list: function Card({ title }).',
          'Give defaults with = in the destructuring: color = "#2563eb".',
          'Strings can use quotes; everything else needs braces: lessons={52}.',
          'A prop with no value, like isNew, is true.',
        ] },
      ],
    },
    {
      id: 'react-children',
      title: 'The children Prop and Composition',
      blocks: [
        { type: 'text', value: 'Whatever you put between a component\'s opening and closing tags arrives as the children prop. It lets you build wrapper components like cards, modals and layouts.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `function Card({ title, children }) {
  return (
    <section style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14, marginBottom: 12 }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </section>
  );
}

function Layout({ sidebar, children }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <aside style={{ width: 100, background: '#f1f5f9', padding: 8 }}>{sidebar}</aside>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <Layout sidebar={<p>Menu</p>}>
      <Card title="Profile">
        <p>Any content can go inside a card.</p>
        <button>Edit</button>
      </Card>
      <Card title="Stats">
        <ul><li>12 lessons</li><li>3 quizzes</li></ul>
      </Card>
    </Layout>
  );
}` },
        { type: 'note', value: 'Composition (passing components as children or props) is how React shares layout and behavior. You rarely need inheritance.' },
      ],
    },
    {
      id: 'react-conditional',
      title: 'Conditional Rendering',
      blocks: [
        { type: 'code', lang: 'jsx', tryIt: true, value: `function Status({ user }) {
  // 1. Early return
  if (!user) return <p>Please log in.</p>;

  return (
    <div>
      {/* 2. Ternary: one thing or another */}
      <p>{user.isPro ? '⭐ Pro member' : 'Free member'}</p>

      {/* 3. && : show or nothing */}
      {user.messages > 0 && <p>You have {user.messages} new messages</p>}
    </div>
  );
}

export default function App() {
  return (
    <>
      <Status user={null} />
      <Status user={{ isPro: true, messages: 3 }} />
      <Status user={{ isPro: false, messages: 0 }} />
    </>
  );
}` },
        { type: 'note', value: 'Careful with && and numbers: {count && <p>...</p>} shows a "0" on screen when count is 0. Write {count > 0 && ...} instead.' },
      ],
    },
    {
      id: 'react-lists-keys',
      title: 'Rendering Lists and Keys',
      blocks: [
        { type: 'text', value: 'Turn an array of data into an array of elements with map(). Each item needs a key: a stable, unique id that helps React track which item is which when the list changes.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `const students = [
  { id: 'a1', name: 'Rahim', marks: 82 },
  { id: 'b2', name: 'Nadia', marks: 95 },
  { id: 'c3', name: 'Karim', marks: 45 },
];

export default function App() {
  const passed = students.filter(s => s.marks >= 50);
  return (
    <div>
      <h3>All students</h3>
      <ul>
        {students.map(s => (
          <li key={s.id}>{s.name}: {s.marks}</li>
        ))}
      </ul>
      <h3>Passed ({passed.length})</h3>
      <ol>
        {passed.map(s => <li key={s.id}>{s.name}</li>)}
      </ol>
    </div>
  );
}` },
        { type: 'list', items: [
          'Use an id from your data as the key, not the array index, when items can be added, removed or reordered.',
          'Keys only need to be unique among siblings, not across the whole app.',
          'The key goes on the outermost element returned from map.',
        ] },
      ],
    },
    {
      id: 'react-thinking',
      title: 'Thinking in React',
      blocks: [
        { type: 'text', value: 'Experienced React developers build every screen with the same steps:' },
        { type: 'list', items: [
          '1. Break the UI into a component hierarchy (draw boxes around parts of a design).',
          '2. Build a static version with props only, no state.',
          '3. Find the minimal state: data that changes over time and cannot be computed from other data.',
          '4. Decide which component owns each piece of state: the closest common parent of everyone that needs it.',
          '5. Pass data down with props and changes up with callback functions.',
        ] },
        { type: 'code', lang: 'text', value: `ProductPage
├── SearchBar          (owns nothing, receives query + onChange)
├── FilterChips
└── ProductList
    └── ProductCard ×N
State: query, selectedCategory → owned by ProductPage
Derived (not state!): filteredProducts = products.filter(...)` },
        { type: 'note', value: 'If a value can be calculated from props or other state, do not store it in state. Calculate it during render. This avoids a whole class of "out of sync" bugs.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'components-props', q: 'Can a component change its own props?', options: ['Yes, any time', 'No, props are read-only', 'Only in StrictMode', 'Only strings'], answer: 1, explain: 'Props come from the parent; use state for values that change.' },
    { chapterId: 'components-props', q: 'What is the children prop?', options: ['A list of child components in the file', 'The content placed between a component\'s tags', 'An array of numbers', 'A React hook'], answer: 1, explain: '<Card>Hello</Card> gives Card children="Hello".' },
    { chapterId: 'components-props', q: 'Why might {count && <p>Hi</p>} show a 0?', options: ['React bug', 'When count is 0, the 0 itself is rendered', 'Because of keys', 'It never does'], answer: 1, explain: 'Use {count > 0 && ...} with numbers.' },
    { chapterId: 'components-props', q: 'What is the best key for list items?', options: ['Math.random()', 'The array index always', 'A stable unique id from the data', 'No key is needed'], answer: 2, explain: 'Stable ids let React match items across renders.' },
    { chapterId: 'components-props', q: 'Where should shared state live?', options: ['In every component', 'In the closest common parent of the components that need it', 'In a global variable', 'In CSS'], answer: 1, explain: 'This is called lifting state up.' },
  ],
};
