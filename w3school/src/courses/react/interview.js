// React chapter: Interview Preparation. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'interview',
  title: 'Interview Preparation',
  description: 'The React questions employers ask most',
  icon: 'work',
  lessons: [
    {
      id: 'react-interview-concepts',
      title: 'Top React Interview Questions',
      blocks: [
        { type: 'heading', value: '1. What is the virtual DOM?' },
        { type: 'text', value: 'A lightweight JavaScript description of the UI. On each update React builds a new one, compares it with the previous (reconciliation), and applies only the differences to the real DOM.' },
        { type: 'heading', value: '2. State vs props' },
        { type: 'text', value: 'Props are inputs passed from a parent and are read-only. State is data a component owns and changes over time; updating it re-renders the component.' },
        { type: 'heading', value: '3. Why are keys important in lists?' },
        { type: 'text', value: 'Keys let React match items between renders. Without stable keys, React may reuse the wrong elements, causing lost input values, wrong animations and slower updates.' },
        { type: 'heading', value: '4. Controlled vs uncontrolled components' },
        { type: 'text', value: 'Controlled: React state holds the input value (value + onChange). Uncontrolled: the DOM holds it and you read it with a ref or FormData when needed.' },
        { type: 'heading', value: '5. What does useEffect\'s dependency array do?' },
        { type: 'text', value: 'It tells React when to re-run the effect: never again ([]), when listed values change ([a, b]), or after every render (omitted). The cleanup runs before re-running and on unmount.' },
        { type: 'heading', value: '6. useMemo vs useCallback vs memo' },
        { type: 'text', value: 'useMemo caches a computed value, useCallback caches a function, memo skips re-rendering a component whose props did not change. Use them when measurements show a real cost.' },
        { type: 'heading', value: '7. How do you avoid prop drilling?' },
        { type: 'text', value: 'Composition (passing components as children), context for app-wide values, or a state library like Zustand or Redux Toolkit for complex shared state.' },
        { type: 'heading', value: '8. What causes a component to re-render?' },
        { type: 'text', value: 'Its own state changes, its parent re-renders, or a context it consumes changes. Props changing is a consequence of the parent re-rendering.' },
      ],
    },
    {
      id: 'react-interview-coding',
      title: 'Live Coding Tasks',
      blocks: [
        { type: 'text', value: 'Common live tasks: a counter with limits, a searchable list, a fetch with loading/error, an accordion, a star rating, a timer. Here is a frequently asked one: an accessible star rating with hover preview.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

function StarRating({ max = 5, value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }, (_, i) => {
        const star = i + 1;
        const filled = star <= (hover || value);
        return (
          <button
            key={star}
            role="radio"
            aria-checked={value === star}
            aria-label={star + ' star' + (star > 1 ? 's' : '')}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            style={{ fontSize: 30, background: 'none', border: 0, color: filled ? '#f59e0b' : '#cbd5e1', cursor: 'pointer' }}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  const [rating, setRating] = useState(3);
  return (
    <div>
      <StarRating value={rating} onChange={setRating} />
      <p>You rated: {rating} / 5</p>
    </div>
  );
}` },
        { type: 'list', items: [
          'Talk through your plan before typing: state, props, events.',
          'Start with the simplest working version, then add polish (hover, accessibility).',
          'Mention trade-offs: "I would extract this into a hook if we reuse it".',
        ] },
        { type: 'note', value: 'Congratulations! You have finished the React course. Take the React Full Test in the Quiz tab, then build a portfolio app with React Router, TanStack Query and TypeScript.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'interview', q: 'What is reconciliation in React?', options: ['Merging Git branches', 'Comparing the new virtual DOM with the old one to find minimal changes', 'Fetching data again', 'Combining CSS files'], answer: 1, explain: 'React then updates only what changed.' },
    { chapterId: 'interview', q: 'What is an uncontrolled input?', options: ['An input with a bug', 'An input whose value is kept by the DOM and read with a ref or FormData', 'A disabled input', 'An input outside a form'], answer: 1, explain: 'Controlled inputs keep the value in React state.' },
    { chapterId: 'interview', q: 'Which tool caches a function between renders?', options: ['useMemo', 'useCallback', 'memo', 'useRef'], answer: 1, explain: 'useCallback(fn, deps) returns the same function until deps change.' },
  ],
};
