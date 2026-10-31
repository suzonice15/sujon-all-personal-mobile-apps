// React chapter: React Internals. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'internals',
  title: 'React Internals',
  description: 'How React decides what to keep, update and batch',
  icon: 'memory',
  lessons: [
    {
      id: 'react-preserve-reset-state',
      title: 'Preserving and Resetting State',
      blocks: [
        { type: 'text', value: 'State belongs to a position in the UI tree, not to a component function. React keeps state as long as the same component stays at the same position. Change the type or the key and React throws the old state away.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

function Counter({ label }) {
  const [count, setCount] = useState(0);
  return <p>{label}: {count} <button onClick={() => setCount(count + 1)}>+1</button></p>;
}

function ChatInput({ contact }) {
  const [text, setText] = useState('');
  return <input value={text} onChange={e => setText(e.target.value)} placeholder={'Message ' + contact} />;
}

export default function App() {
  const [player, setPlayer] = useState('Rahim');
  const [contact, setContact] = useState('Nadia');

  return (
    <div>
      <h4>Same position → state is kept</h4>
      <Counter label={player} />
      <button onClick={() => setPlayer(player === 'Rahim' ? 'Karim' : 'Rahim')}>Switch player</button>

      <h4>Different key → state resets</h4>
      <ChatInput key={contact} contact={contact} />
      <button onClick={() => setContact(contact === 'Nadia' ? 'Sara' : 'Nadia')}>Switch contact</button>
    </div>
  );
}` },
        { type: 'text', value: 'Type a message, then switch contact: the draft disappears because the key changed. Click the counter, then switch player: the count stays because it is the same Counter at the same place.' },
        { type: 'note', value: 'Giving a component key={id} is the cleanest way to reset all its state when the thing it displays changes. No effects needed.' },
      ],
    },
    {
      id: 'react-batching-fiber',
      title: 'Batching, Fiber and Concurrent Rendering',
      blocks: [
        { type: 'heading', value: 'Automatic batching' },
        { type: 'text', value: 'React groups several state updates that happen together (in an event, a timeout or a promise) into a single re-render.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

export default function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  console.log('render', a, b);

  function update() {
    setA(x => x + 1);
    setB(x => x + 1);   // both updates → one render
    setTimeout(() => { setA(x => x + 1); setB(x => x + 1); }, 300); // also batched
  }

  return <button onClick={update}>Update a={a} b={b}</button>;
}` },
        { type: 'heading', value: 'Fiber' },
        { type: 'text', value: 'Internally, React represents each element as a "fiber": a unit of work. Because rendering is split into small units, React can pause, prioritize urgent updates (typing) over slow ones (a big list), and throw away work that became outdated. This is what makes useTransition and Suspense possible.' },
        { type: 'list', items: [
          'Render phase: pure, can be paused or restarted, may run more than once.',
          'Commit phase: applies DOM changes synchronously, then runs layout effects, then effects.',
          'This is why render code must be pure: React may call it and discard the result.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'internals', q: 'When does React keep a component\'s state between renders?', options: ['Always', 'When the same component stays at the same position with the same key', 'Only with useRef', 'Never'], answer: 1, explain: 'Changing position, type or key resets it.' },
    { chapterId: 'internals', q: 'What is the cleanest way to reset a form when the selected user changes?', options: ['A useEffect that clears every field', 'Give the form key={userId}', 'Reload the page', 'Use a global variable'], answer: 1, explain: 'A new key creates a fresh component with fresh state.' },
    { chapterId: 'internals', q: 'What is automatic batching?', options: ['Loading files together', 'Combining several state updates into one re-render', 'Caching API calls', 'Grouping CSS'], answer: 1, explain: 'Since React 18 it also applies inside timeouts and promises.' },
  ],
};
