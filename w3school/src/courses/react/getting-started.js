// React chapter: Getting Started. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What React is, setup, JSX and your first component',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'react-intro',
      title: 'What is React?',
      blocks: [
        { type: 'text', value: 'React is a JavaScript library for building user interfaces out of small, reusable pieces called components. It was created at Facebook and today powers Facebook, Instagram, WhatsApp Web, Netflix, Airbnb and thousands of other apps.' },
        { type: 'list', items: [
          'Declarative: you describe what the screen should look like for the current data; React updates the page for you.',
          'Component-based: a page is a tree of components such as Header, ProductCard and CartButton.',
          'Learn once, write anywhere: the same ideas build websites (React) and mobile apps (React Native, which this app is built with).',
        ] },
        { type: 'code', lang: 'jsx', tryIt: true, value: `export default function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>This whole page is a React component.</p>
    </div>
  );
}` },
        { type: 'text', value: 'Try it needs internet here: the preview downloads React the first time you run it.' },
        { type: 'note', value: 'Before React, make sure you are comfortable with JavaScript: functions, arrays (map, filter), objects, destructuring, modules and promises. React uses all of them constantly.' },
      ],
    },
    {
      id: 'react-setup',
      title: 'Creating a React Project',
      blocks: [
        { type: 'text', value: 'Real React projects are created with a build tool. Vite is the fastest and most popular choice. You need Node.js installed (nodejs.org).' },
        { type: 'code', lang: 'text', value: `npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev` },
        { type: 'text', value: 'Open the address it prints (usually http://localhost:5173). Every time you save a file, the page updates instantly.' },
        { type: 'heading', value: 'The important files' },
        { type: 'code', lang: 'text', value: `my-app/
├── index.html        the single HTML page with <div id="root">
├── package.json      dependencies and scripts
└── src/
    ├── main.jsx      starts React and renders <App />
    ├── App.jsx       your root component
    └── App.css` },
        { type: 'code', lang: 'jsx', value: `// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);` },
        { type: 'note', value: 'For full websites with routing and server rendering, many teams use a framework built on React such as Next.js. You will meet it at the end of this course.' },
      ],
    },
    {
      id: 'react-jsx',
      title: 'JSX',
      blocks: [
        { type: 'text', value: 'JSX lets you write HTML-like markup inside JavaScript. It is not HTML: it is converted to JavaScript function calls, so a few rules are different.' },
        { type: 'list', items: [
          'Return a single root element (wrap siblings in a <div> or an empty <> </> fragment).',
          'Close every tag, including <img /> and <br />.',
          'Use className instead of class, and htmlFor instead of for.',
          'Attributes are camelCase: onClick, tabIndex, strokeWidth.',
          'Put any JavaScript expression inside { curly braces }.',
        ] },
        { type: 'code', lang: 'jsx', tryIt: true, value: `export default function App() {
  const name = 'Nadia';
  const lessons = 12;
  const avatar = 'https://picsum.photos/id/64/80/80';

  return (
    <>
      <img src={avatar} alt="" style={{ borderRadius: '50%' }} />
      <h2 className="title">Welcome back, {name}!</h2>
      <p>You have finished {lessons} lessons. {lessons >= 10 ? 'Amazing!' : 'Keep going!'}</p>
      <p>Today is {new Date().toLocaleDateString()}</p>
    </>
  );
}` },
        { type: 'note', value: 'The style attribute takes an object, so it has double braces: style={{ color: "red" }}. The outer braces mean "JavaScript", the inner ones are the object.' },
      ],
    },
    {
      id: 'react-components',
      title: 'Components',
      blocks: [
        { type: 'text', value: 'A component is a JavaScript function that returns JSX. Its name must start with a capital letter, and you use it like an HTML tag. Build big screens by combining small components.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `function Avatar() {
  return <img src="https://picsum.photos/id/1027/60/60" alt="" style={{ borderRadius: 30 }} />;
}

function Badge() {
  return <span style={{ background: '#16a34a', color: 'white', padding: '2px 8px', borderRadius: 99 }}>PRO</span>;
}

function ProfileCard() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, border: '1px solid #e2e8f0', borderRadius: 12 }}>
      <Avatar />
      <div>
        <strong>Rahim Uddin</strong> <Badge />
        <div>Frontend developer</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <ProfileCard />
      <br />
      <ProfileCard />
    </div>
  );
}` },
        { type: 'list', items: [
          'One component per file is the usual convention: ProfileCard.jsx.',
          'Export it (export default) and import it where you need it.',
          'Never define a component inside another component; it is recreated on every render.',
        ] },
      ],
    },
    {
      id: 'react-rendering',
      title: 'How React Renders',
      blocks: [
        { type: 'text', value: 'React keeps a virtual description of your UI. When data changes, React calls your component functions again (a re-render), compares the new result with the old one, and changes only the parts of the real page that differ.' },
        { type: 'list', items: [
          'Trigger: the initial render, or a state update.',
          'Render: React calls your components to get the new JSX.',
          'Commit: React applies the minimal changes to the DOM.',
        ] },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  console.log('App rendered with count =', count);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add one</button>
    </div>
  );
}` },
        { type: 'text', value: 'Tap the button and watch the console: the component function runs again each time, but only the number on the page actually changes.' },
        { type: 'note', value: 'Components must be pure during rendering: given the same inputs, return the same JSX, and never change outside variables while rendering. StrictMode renders twice in development to help you catch mistakes.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'getting-started', q: 'What is React?', options: ['A database', 'A JavaScript library for building user interfaces', 'A CSS framework', 'A programming language'], answer: 1, explain: 'React builds UIs from components.' },
    { chapterId: 'getting-started', q: 'Which tool is commonly used to create a new React project today?', options: ['Vite', 'jQuery', 'Bootstrap', 'XAMPP'], answer: 0, explain: 'npm create vite@latest sets up a fast React project.' },
    { chapterId: 'getting-started', q: 'In JSX, which attribute replaces class?', options: ['class', 'className', 'cssClass', 'styleClass'], answer: 1, explain: 'class is a reserved word in JavaScript.' },
    { chapterId: 'getting-started', q: 'How must a component name start?', options: ['With a lowercase letter', 'With a capital letter', 'With an underscore', 'With "use"'], answer: 1, explain: 'Lowercase tags are treated as HTML elements.' },
    { chapterId: 'getting-started', q: 'What triggers a re-render of a component?', options: ['A CSS change', 'A state update', 'A console.log', 'Scrolling'], answer: 1, explain: 'Setting state tells React to render again.' },
  ],
};
