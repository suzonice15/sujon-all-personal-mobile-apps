// React chapter: Styling. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'styling',
  title: 'Styling React Apps',
  description: 'CSS files, CSS Modules, Tailwind and conditional classes',
  icon: 'palette',
  lessons: [
    {
      id: 'react-css',
      title: 'CSS, Inline Styles and CSS Modules',
      blocks: [
        { type: 'heading', value: '1. Plain CSS files' },
        { type: 'code', lang: 'jsx', value: `import './Button.css';   // global: class names can clash between files

export function Button({ children }) {
  return <button className="btn">{children}</button>;
}` },
        { type: 'heading', value: '2. CSS Modules: scoped class names' },
        { type: 'code', lang: 'jsx', value: `// Button.module.css  →  .primary { background: teal; }
import styles from './Button.module.css';

export function Button({ children }) {
  return <button className={styles.primary}>{children}</button>; // becomes "Button_primary__x7k2"
}` },
        { type: 'heading', value: '3. Inline styles for dynamic values' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

export default function App() {
  const [progress, setProgress] = useState(40);
  return (
    <div>
      <div style={{ height: 12, background: '#e2e8f0', borderRadius: 6 }}>
        <div style={{ width: progress + '%', height: 12, background: '#0f766e', borderRadius: 6, transition: 'width 0.3s' }} />
      </div>
      <input type="range" value={progress} onChange={e => setProgress(Number(e.target.value))} />
    </div>
  );
}` },
        { type: 'note', value: 'Use classes for the look, and inline styles only for values computed at runtime (like a progress width).' },
      ],
    },
    {
      id: 'react-conditional-classes',
      title: 'Conditional Classes and Tailwind CSS',
      blocks: [
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

function Tab({ label, active, onClick }) {
  const className = ['tab', active ? 'tab--active' : ''].join(' ');
  return <button className={className} onClick={onClick}>{label}</button>;
}

export default function App() {
  const [active, setActive] = useState('Lessons');
  return (
    <>
      <style>{\`
        .tab { padding: 8px 14px; border: 0; background: #f1f5f9; margin-right: 4px; border-radius: 8px; }
        .tab--active { background: #0f766e; color: white; }
      \`}</style>
      {['Lessons', 'Quiz', 'Notes'].map(t => (
        <Tab key={t} label={t} active={t === active} onClick={() => setActive(t)} />
      ))}
      <p>Showing: {active}</p>
    </>
  );
}` },
        { type: 'text', value: 'Libraries such as clsx make this shorter: className={clsx("tab", active && "tab--active")}.' },
        { type: 'heading', value: 'Tailwind CSS' },
        { type: 'text', value: 'Tailwind is the most popular styling approach in new React projects: small utility classes applied directly in JSX, with no separate CSS file.' },
        { type: 'code', lang: 'jsx', value: `export function CourseCard({ title, lessons, isNew }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500">{lessons} lessons</p>
      {isNew && <span className="mt-2 inline-block rounded-full bg-teal-100 px-2 text-xs text-teal-800">NEW</span>}
    </div>
  );
}` },
        { type: 'note', value: 'Pick one approach per project and stay consistent. Mixing four styling systems makes code hard to maintain.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'styling', q: 'What do CSS Modules solve?', options: ['Slow CSS', 'Class name clashes between components', 'Missing fonts', 'Animations'], answer: 1, explain: 'Class names are made unique per file automatically.' },
    { chapterId: 'styling', q: 'When are inline styles a good choice?', options: ['For all styling', 'For values computed at runtime, like a progress width', 'Never', 'Only for fonts'], answer: 1, explain: 'Static look belongs in classes.' },
    { chapterId: 'styling', q: 'What is Tailwind CSS?', options: ['A React hook', 'A utility-first CSS framework', 'A state library', 'A router'], answer: 1, explain: 'Small classes like p-4 and text-lg are combined in JSX.' },
  ],
};
