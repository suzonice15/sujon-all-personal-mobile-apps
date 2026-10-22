// JavaScript chapter: Best Practices and Projects. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'projects',
  title: 'Best Practices and Projects',
  description: 'Write clean code and build real apps',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'js-best-practices',
      title: 'Clean Code and Debugging',
      blocks: [
        { type: 'heading', value: 'Habits of professional developers' },
        { type: 'list', items: [
          'Use const by default, let when needed, never var.',
          'Always use === and !==.',
          'Give variables and functions clear, descriptive names.',
          'Keep functions small: one job each.',
          'Return early instead of nesting many if blocks.',
          'Do not repeat yourself: move repeated code into a function.',
          'Handle errors: check response.ok, wrap risky code in try/catch.',
        ] },
        { type: 'code', lang: 'js', tryIt: true, value: `// Hard to read: deep nesting
function canEnrollBad(user) {
  if (user) {
    if (user.age >= 13) {
      if (user.verified) {
        return true;
      }
    }
  }
  return false;
}

// Clean: early returns
function canEnroll(user) {
  if (!user) return false;
  if (user.age < 13) return false;
  return user.verified === true;
}

console.log(canEnroll({ age: 15, verified: true }));  // true
console.log(canEnroll({ age: 10, verified: true }));  // false` },
        { type: 'heading', value: 'Debugging' },
        { type: 'list', items: [
          'Read the error message: it names the problem and the line number.',
          'console.log() the values you are unsure about.',
          'Use the debugger statement or breakpoints in DevTools to pause and inspect.',
          'Change one thing at a time, then test again.',
        ] },
      ],
    },
    {
      id: 'js-project-todo',
      title: 'Project 1: To-do App',
      blocks: [
        { type: 'text', value: 'A complete to-do app: add, complete, delete and filter tasks, saved in localStorage. It uses the DOM, events, event delegation, arrays and JSON.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  body { font-family: sans-serif; max-width: 420px; margin: auto; }
  form { display: flex; gap: 6px; }
  input { flex: 1; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; }
  button { padding: 10px 14px; border: 0; border-radius: 8px; background: #a16207; color: white; }
  ul { list-style: none; padding: 0; }
  li { display: flex; align-items: center; gap: 8px; padding: 10px; border-bottom: 1px solid #e2e8f0; }
  li.done span { text-decoration: line-through; color: #94a3b8; }
  li span { flex: 1; }
  .del { background: transparent; color: #dc2626; padding: 4px 8px; }
  .filters button { background: #f1f5f9; color: #0f172a; margin-right: 4px; }
  .filters button.active { background: #0f172a; color: white; }
</style>

<h2>My Tasks</h2>
<form id="form"><input id="text" placeholder="What needs doing?" required><button>Add</button></form>
<p class="filters">
  <button data-filter="all" class="active">All</button>
  <button data-filter="open">Open</button>
  <button data-filter="done">Done</button>
</p>
<ul id="list"></ul>
<p id="summary"></p>

<script>
  let todos = JSON.parse(localStorage.getItem('todos') || '[]');
  let filter = 'all';

  const save = () => localStorage.setItem('todos', JSON.stringify(todos));

  function render() {
    const list = document.getElementById('list');
    list.textContent = '';
    todos
      .filter(t => filter === 'all' || (filter === 'done' ? t.done : !t.done))
      .forEach(t => {
        const li = document.createElement('li');
        li.dataset.id = t.id;
        li.className = t.done ? 'done' : '';
        li.innerHTML = '<input type="checkbox" class="toggle"><span></span><button class="del">✕</button>';
        li.querySelector('span').textContent = t.text;  // safe: user text
        li.querySelector('.toggle').checked = t.done;
        list.append(li);
      });
    const open = todos.filter(t => !t.done).length;
    document.getElementById('summary').textContent = open + ' task(s) left';
  }

  document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('text');
    todos.push({ id: Date.now(), text: input.value.trim(), done: false });
    input.value = '';
    save(); render();
  });

  document.getElementById('list').addEventListener('click', e => {
    const id = Number(e.target.closest('li')?.dataset.id);
    if (e.target.classList.contains('toggle')) {
      todos = todos.map(t => (t.id === id ? { ...t, done: !t.done } : t));
    } else if (e.target.classList.contains('del')) {
      todos = todos.filter(t => t.id !== id);
    } else return;
    save(); render();
  });

  document.querySelector('.filters').addEventListener('click', e => {
    if (!e.target.dataset.filter) return;
    filter = e.target.dataset.filter;
    document.querySelectorAll('.filters button').forEach(b => b.classList.toggle('active', b === e.target));
    render();
  });

  render();
</script>` },
        { type: 'heading', value: 'Challenge' },
        { type: 'list', items: [
          'Double-tap a task to edit its text.',
          'Add a "Clear completed" button.',
          'Show a due date for each task using the Date lesson.',
        ] },
      ],
    },
    {
      id: 'js-project-quiz',
      title: 'Project 2: Quiz Game',
      blocks: [
        { type: 'text', value: 'A small quiz game like the one in this app: questions from an array, shuffled answers, score tracking and a final result.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  body { font-family: sans-serif; max-width: 420px; margin: auto; text-align: center; }
  .opt { display: block; width: 100%; margin: 8px 0; padding: 12px; border: 2px solid #e2e8f0; border-radius: 10px; background: white; font-size: 16px; }
  .opt.right { background: #16a34a; color: white; border-color: #16a34a; }
  .opt.wrong { background: #dc2626; color: white; border-color: #dc2626; }
  #next { margin-top: 10px; padding: 12px 20px; border: 0; border-radius: 10px; background: #a16207; color: white; }
</style>

<p id="progress"></p>
<h3 id="question"></h3>
<div id="options"></div>
<button id="next" hidden>Next</button>

<script>
  const questions = [
    { q: 'Which keyword declares a constant?', options: ['let', 'var', 'const'], answer: 'const' },
    { q: 'What does [1, 2, 3].length return?', options: ['2', '3', '4'], answer: '3' },
    { q: 'Which method adds to the end of an array?', options: ['push', 'shift', 'pop'], answer: 'push' },
  ];
  let index = 0, score = 0;

  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

  function show() {
    const item = questions[index];
    document.getElementById('progress').textContent = 'Question ' + (index + 1) + ' of ' + questions.length;
    document.getElementById('question').textContent = item.q;
    const box = document.getElementById('options');
    box.textContent = '';
    shuffle(item.options).forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'opt';
      btn.textContent = text;
      btn.addEventListener('click', () => choose(btn, item));
      box.append(btn);
    });
    document.getElementById('next').hidden = true;
  }

  function choose(btn, item) {
    const buttons = document.querySelectorAll('.opt');
    buttons.forEach(b => {
      b.disabled = true;
      if (b.textContent === item.answer) b.classList.add('right');
    });
    if (btn.textContent === item.answer) score++;
    else btn.classList.add('wrong');
    document.getElementById('next').hidden = false;
  }

  document.getElementById('next').addEventListener('click', () => {
    index++;
    if (index < questions.length) return show();
    document.getElementById('progress').textContent = '';
    document.getElementById('question').textContent = 'You scored ' + score + ' / ' + questions.length;
    document.getElementById('options').textContent = score === questions.length ? 'Perfect! 🎉' : 'Keep practicing!';
    document.getElementById('next').hidden = true;
  });

  show();
</script>` },
        { type: 'heading', value: 'Challenge' },
        { type: 'list', items: [
          'Add a 15-second timer per question with setInterval.',
          'Save the best score in localStorage.',
          'Load questions from a JSON API with fetch.',
        ] },
      ],
    },
    {
      id: 'js-project-weather',
      title: 'Project 3: Weather App',
      blocks: [
        { type: 'text', value: 'A real weather app using a free public API (Open-Meteo, no key needed). It combines async/await, fetch, error handling, the DOM and Intl date formatting.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  body { font-family: sans-serif; max-width: 420px; margin: auto; }
  select, button { padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1; }
  .now { background: linear-gradient(135deg, #0ea5e9, #6366f1); color: white; border-radius: 14px; padding: 16px; margin: 12px 0; }
  .temp { font-size: 48px; font-weight: bold; }
  .days { display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 8px; }
  .day { background: #f1f5f9; border-radius: 10px; padding: 8px; text-align: center; font-size: 14px; }
</style>

<select id="city">
  <option value="23.81,90.41">Dhaka</option>
  <option value="22.36,91.78">Chattogram</option>
  <option value="24.89,91.87">Sylhet</option>
  <option value="22.85,89.54">Khulna</option>
</select>
<button id="go">Get weather</button>
<div id="out"></div>

<script>
  const out = document.getElementById('out');
  const dayName = new Intl.DateTimeFormat('en', { weekday: 'short' });

  async function getWeather() {
    const select = document.getElementById('city');
    const [lat, lon] = select.value.split(',');
    out.textContent = 'Loading...';
    try {
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon +
        '&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto';
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();

      const days = data.daily.time.map((date, i) =>
        '<div class="day"><b>' + dayName.format(new Date(date)) + '</b><br>' +
        Math.round(data.daily.temperature_2m_max[i]) + '° / ' +
        Math.round(data.daily.temperature_2m_min[i]) + '°</div>'
      ).join('');

      out.innerHTML =
        '<div class="now"><div>' + select.selectedOptions[0].text + ' now</div>' +
        '<div class="temp">' + Math.round(data.current.temperature_2m) + '°C</div>' +
        '<div>Wind ' + data.current.wind_speed_10m + ' km/h</div></div>' +
        '<div class="days">' + days + '</div>';
    } catch (err) {
      out.textContent = 'Could not load weather: ' + err.message;
    }
  }

  document.getElementById('go').addEventListener('click', getWeather);
  document.getElementById('city').addEventListener('change', getWeather);
  getWeather();
</script>` },
        { type: 'heading', value: 'Challenge' },
        { type: 'list', items: [
          'Use the Geolocation API to show the weather where the user is.',
          'Remember the last selected city in localStorage.',
        ] },
        { type: 'note', value: 'Great work: you have built three real apps. The last chapter prepares you for JavaScript job interviews.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'projects', q: 'Which is the cleaner way to handle many invalid cases in a function?', options: ['Deeply nested if blocks', 'Early returns', 'A try/catch around everything', 'Global variables'], answer: 1, explain: 'Returning early keeps the main logic flat and readable.' },
    { chapterId: 'projects', q: 'In the to-do app, why use textContent for the task text?', options: ['It is faster', 'It prevents user text from being run as HTML', 'innerHTML does not work in lists', 'It saves to localStorage'], answer: 1, explain: 'Inserting user input with innerHTML allows script injection (XSS).' },
    { chapterId: 'projects', q: 'Which statement pauses code in DevTools at that line?', options: ['pause;', 'stop;', 'debugger;', 'break;'], answer: 2, explain: 'debugger acts like a breakpoint when DevTools is open.' },
    { chapterId: 'projects', q: 'What does the weather app need to check after fetch?', options: ['response.ok', 'response.done', 'response.valid', 'Nothing'], answer: 0, explain: 'A failed HTTP status still resolves; response.ok tells you if it succeeded.' },
  ],
};
