// JavaScript chapter: Performance and Security. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'performance-security',
  title: 'Performance and Security',
  description: 'Fast DOM code, memory leaks and XSS',
  icon: 'security',
  lessons: [
    {
      id: 'js-dom-performance',
      title: 'Fast DOM Updates',
      blocks: [
        { type: 'text', value: 'Touching the DOM is the slowest part of most web apps. Each change can make the browser recalculate layout (reflow) and repaint. Batch your changes.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<button id="slow">Add 3000 items one by one</button>
<button id="fast">Add 3000 items in one batch</button>
<p id="time"></p>
<ul id="list" style="height:120px;overflow:auto"></ul>

<script>
  const list = document.getElementById('list');
  const time = document.getElementById('time');

  document.getElementById('slow').onclick = () => {
    list.textContent = '';
    const start = performance.now();
    for (let i = 0; i < 3000; i++) {
      const li = document.createElement('li');
      li.textContent = 'Item ' + i;
      list.append(li);
      list.offsetHeight;            // forces layout each time (a common mistake)
    }
    time.textContent = 'One by one: ' + Math.round(performance.now() - start) + ' ms';
  };

  document.getElementById('fast').onclick = () => {
    list.textContent = '';
    const start = performance.now();
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 3000; i++) {
      const li = document.createElement('li');
      li.textContent = 'Item ' + i;
      fragment.append(li);           // not in the page yet: no layout
    }
    list.append(fragment);           // one insert, one layout
    time.textContent = 'Batched: ' + Math.round(performance.now() - start) + ' ms';
  };
</script>` },
        { type: 'list', items: [
          'Build many elements in a DocumentFragment, then insert once.',
          'Do not read layout values (offsetHeight, getBoundingClientRect) between writes.',
          'Change classes instead of many inline styles.',
          'For very long lists, render only the visible rows (virtualization).',
        ] },
      ],
    },
    {
      id: 'js-memory-leaks',
      title: 'Memory Leaks',
      blocks: [
        { type: 'text', value: 'JavaScript frees memory automatically when nothing refers to a value anymore (garbage collection). A leak happens when your code keeps references by accident, so memory keeps growing until the app slows down or crashes.' },
        { type: 'heading', value: 'The usual causes' },
        { type: 'list', items: [
          'Timers that are never cleared (setInterval keeps running forever)',
          'Event listeners added again and again but never removed',
          'Caches and arrays that only ever grow',
          'Keeping references to removed DOM elements',
        ] },
        { type: 'code', lang: 'js', value: `// Leaky: every time the screen opens, another interval and listener pile up
function openChatScreen() {
  setInterval(checkMessages, 5000);
  window.addEventListener('resize', layoutChat);
}

// Fixed: return a cleanup function and call it when leaving
function openChatScreenFixed() {
  const timer = setInterval(checkMessages, 5000);
  const controller = new AbortController();
  window.addEventListener('resize', layoutChat, { signal: controller.signal });

  return function close() {
    clearInterval(timer);
    controller.abort();     // removes every listener using this signal
  };
}` },
        { type: 'note', value: 'React\'s useEffect cleanup function exists exactly for this. In DevTools, the Memory panel shows whether memory keeps growing.' },
      ],
    },
    {
      id: 'js-xss',
      title: 'Security: XSS and Safe Code',
      blocks: [
        { type: 'text', value: 'Cross-Site Scripting (XSS) is the most common web security bug: user-supplied text gets inserted as HTML, and an attacker\'s script runs in other users\' browsers, stealing sessions or data.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<p>Pretend an attacker typed this as their "name":</p>
<input id="name" style="width:100%">
<button id="unsafe">Show with innerHTML (unsafe)</button>
<button id="safe">Show with textContent (safe)</button>
<p id="out"></p>

<script>
  // The image fails to load, so its onerror code runs: here it just turns the page red.
  document.getElementById('name').value =
    '<img src=x onerror="document.body.style.background=\\'crimson\\'">';

  const out = document.getElementById('out');
  const value = () => document.getElementById('name').value;

  document.getElementById('unsafe').onclick = () => {
    out.innerHTML = 'Hello ' + value();   // the onerror script runs!
  };
  document.getElementById('safe').onclick = () => {
    out.textContent = 'Hello ' + value(); // shown as plain text
  };
</script>` },
        { type: 'heading', value: 'Rules that prevent most security bugs' },
        { type: 'list', items: [
          'Insert user data with textContent, never innerHTML.',
          'Never use eval() or new Function() with user input.',
          'Validate input on the server too; browser checks can be bypassed.',
          'Never put API secrets in front-end code; anyone can read it.',
          'Store login tokens in httpOnly cookies, not localStorage.',
          'Use a Content Security Policy (CSP) header to block injected scripts.',
        ] },
        { type: 'note', value: 'If you must render user HTML (like rich comments), clean it with a sanitizer library such as DOMPurify first.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'performance-security', q: 'What is the efficient way to add 1000 elements to the page?', options: ['Append each one directly', 'Build them in a DocumentFragment and append once', 'Use innerHTML += in a loop', 'Use setTimeout for each'], answer: 1, explain: 'One insert means one layout calculation.' },
    { chapterId: 'performance-security', q: 'Which is a common cause of memory leaks?', options: ['Using const', 'Intervals and listeners that are never removed', 'Using arrow functions', 'Short variable names'], answer: 1, explain: 'They keep references alive forever.' },
    { chapterId: 'performance-security', q: 'How do you safely show text typed by a user?', options: ['innerHTML', 'eval()', 'textContent', 'document.write()'], answer: 2, explain: 'textContent never interprets HTML.' },
    { chapterId: 'performance-security', q: 'Where should secret API keys be kept?', options: ['In the JavaScript file', 'In localStorage', 'On the server, never in front-end code', 'In an HTML comment'], answer: 2, explain: 'Everything sent to the browser can be read by anyone.' },
  ],
};
