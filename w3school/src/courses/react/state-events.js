// React chapter: State and Events. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'state-events',
  title: 'State and Events',
  description: 'Make components interactive with useState',
  icon: 'touch-app',
  lessons: [
    {
      id: 'react-events',
      title: 'Handling Events',
      blocks: [
        { type: 'text', value: 'Pass a function to an event prop such as onClick or onChange. Pass the function itself, do not call it.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `export default function App() {
  function handleClick() {
    console.log('Button tapped!');
  }

  function handleKey(event) {
    if (event.key === 'Enter') console.log('You pressed Enter:', event.target.value);
  }

  return (
    <div>
      <button onClick={handleClick}>Tap me</button>
      <button onClick={() => console.log('Inline arrow works too')}>Inline</button>
      <p><input placeholder="Type and press Enter" onKeyDown={handleKey} /></p>
      <a href="https://example.com" onClick={e => { e.preventDefault(); console.log('Link blocked'); }}>
        A link that does not navigate
      </a>
    </div>
  );
}` },
        { type: 'note', value: 'onClick={handleClick} is correct. onClick={handleClick()} calls it immediately during render. To pass arguments, wrap it: onClick={() => remove(id)}.' },
      ],
    },
    {
      id: 'react-usestate',
      title: 'State with useState',
      blocks: [
        { type: 'text', value: 'State is a component\'s memory. useState returns the current value and a setter function. Calling the setter stores the new value and re-renders the component.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [name, setName] = useState('');

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <p>
        <button onClick={() => setLiked(!liked)}>{liked ? '❤ Liked' : '♡ Like'}</button>
      </p>

      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
      <p>Hello, {name || 'stranger'}!</p>
    </div>
  );
}` },
        { type: 'heading', value: 'State is a snapshot' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

export default function App() {
  const [score, setScore] = useState(0);

  function addThreeWrong() {
    setScore(score + 1);  // all three use the same old score
    setScore(score + 1);
    setScore(score + 1);
  }

  function addThreeRight() {
    setScore(s => s + 1); // updater function: uses the latest value
    setScore(s => s + 1);
    setScore(s => s + 1);
  }

  return (
    <div>
      <h2>{score}</h2>
      <button onClick={addThreeWrong}>+3 (wrong)</button>
      <button onClick={addThreeRight}>+3 (right)</button>
    </div>
  );
}` },
        { type: 'note', value: 'Inside one render, state never changes. When the next value depends on the previous one, use the updater form: setCount(c => c + 1).' },
      ],
    },
    {
      id: 'react-state-objects-arrays',
      title: 'Updating Objects and Arrays',
      blocks: [
        { type: 'text', value: 'Never change state objects or arrays directly. Create a new copy with the change; React compares by reference, so mutating the old one does not trigger a re-render.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

export default function App() {
  const [profile, setProfile] = useState({ name: 'Rahim', city: 'Dhaka' });
  const [tasks, setTasks] = useState([{ id: 1, text: 'Learn props', done: true }]);
  const [text, setText] = useState('');

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);  // add
    setText('');
  };
  const toggle = id => setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t))); // update
  const remove = id => setTasks(tasks.filter(t => t.id !== id));                            // delete

  return (
    <div>
      <input value={profile.city} onChange={e => setProfile({ ...profile, city: e.target.value })} />
      <p>{profile.name} lives in {profile.city}</p>

      <input value={text} onChange={e => setText(e.target.value)} placeholder="New task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <label style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} /> {t.text}
            </label>
            <button onClick={() => remove(t.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}` },
        { type: 'list', items: [
          'Add: [...arr, item]',
          'Remove: arr.filter(x => x.id !== id)',
          'Update one: arr.map(x => x.id === id ? { ...x, changed } : x)',
          'Update an object field: { ...obj, field: value }',
        ] },
      ],
    },
    {
      id: 'react-lifting-state',
      title: 'Lifting State Up',
      blocks: [
        { type: 'text', value: 'When two components need the same data, move the state to their closest common parent. The parent passes the value down as props and a function to change it.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

function TemperatureInput({ label, value, onChange }) {
  return (
    <p>
      {label}: <input type="number" value={value} onChange={e => onChange(e.target.value)} />
    </p>
  );
}

export default function App() {
  const [celsius, setCelsius] = useState('25');  // the single source of truth
  const fahrenheit = celsius === '' ? '' : String(Math.round(Number(celsius) * 9 / 5 + 32));

  return (
    <div>
      <TemperatureInput label="Celsius" value={celsius} onChange={setCelsius} />
      <TemperatureInput
        label="Fahrenheit"
        value={fahrenheit}
        onChange={f => setCelsius(f === '' ? '' : String(Math.round((Number(f) - 32) * 5 / 9)))}
      />
      <p>{Number(celsius) >= 35 ? '🔥 Very hot!' : '🙂 Comfortable'}</p>
    </div>
  );
}` },
        { type: 'note', value: 'Only Celsius is state; Fahrenheit is derived from it. Two pieces of state for the same value would eventually disagree.' },
      ],
    },
    {
      id: 'react-forms',
      title: 'Controlled Forms',
      blocks: [
        { type: 'text', value: 'In a controlled input, React state holds the value and the input shows it. This gives you full control: live validation, formatting and resetting.' },
        { type: 'code', lang: 'jsx', tryIt: true, value: `import { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({ email: '', plan: 'free', agree: false });
  const [submitted, setSubmitted] = useState(null);

  const update = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const emailError = form.email && !form.email.includes('@') ? 'Enter a valid email' : '';
  const canSubmit = form.email && !emailError && form.agree;

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={update} placeholder="Email" />
      {emailError && <p style={{ color: 'crimson' }}>{emailError}</p>}

      <p>
        <select name="plan" value={form.plan} onChange={update}>
          <option value="free">Free</option>
          <option value="pro">Pro</option>
        </select>
      </p>

      <label><input type="checkbox" name="agree" checked={form.agree} onChange={update} /> I agree</label>
      <p><button disabled={!canSubmit}>Sign up</button></p>

      {submitted && <pre>{JSON.stringify(submitted, null, 2)}</pre>}
    </form>
  );
}` },
        { type: 'note', value: 'One update function for every field works because each input has a name matching a key in the state object.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'state-events', q: 'Which is the correct way to attach a click handler?', options: ['onClick={handleClick()}', 'onclick="handleClick"', 'onClick={handleClick}', 'onClick=handleClick'], answer: 2, explain: 'Pass the function; do not call it during render.' },
    { chapterId: 'state-events', q: 'What does useState return?', options: ['Only the value', 'An array: [value, setter]', 'A promise', 'An object with get/set'], answer: 1, explain: 'const [count, setCount] = useState(0).' },
    { chapterId: 'state-events', q: 'Why use setCount(c => c + 1)?', options: ['It is shorter', 'It uses the latest state when updates are queued', 'It avoids re-renders', 'It is required in forms'], answer: 1, explain: 'Updater functions receive the most recent value.' },
    { chapterId: 'state-events', q: 'How do you add an item to an array in state?', options: ['arr.push(item)', 'setArr([...arr, item])', 'arr[arr.length] = item', 'setArr(arr)'], answer: 1, explain: 'Create a new array; never mutate state.' },
    { chapterId: 'state-events', q: 'What is a controlled input?', options: ['An input with no value', 'An input whose value comes from React state', 'An input inside a form tag', 'A disabled input'], answer: 1, explain: 'value={state} plus onChange keeps React in control.' },
  ],
};
