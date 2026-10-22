// JavaScript chapter: The DOM. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'dom',
  title: 'The DOM',
  description: 'Change the page and react to the user',
  icon: 'touch-app',
  lessons: [
    {
      id: 'js-dom-select',
      title: 'Selecting Elements',
      blocks: [
        { type: 'text', value: 'The DOM (Document Object Model) is the browser\'s live tree of the page. JavaScript reads and changes the page through it, starting from the document object.' },
        { type: 'list', items: [
          'document.getElementById(\'id\'): one element by id',
          'document.querySelector(\'css selector\'): the first match',
          'document.querySelectorAll(\'css selector\'): all matches, as a list',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<h2 id="title">Courses</h2>
<ul>
  <li class="course">HTML</li>
  <li class="course">CSS</li>
  <li class="course">JavaScript</li>
</ul>

<script>
  const title = document.getElementById('title');
  const firstCourse = document.querySelector('.course');
  const allCourses = document.querySelectorAll('.course');

  console.log(title.textContent);
  console.log(firstCourse.textContent);
  console.log('Total:', allCourses.length);
  allCourses.forEach(li => console.log('-', li.textContent));
</script>` },
        { type: 'note', value: 'querySelector accepts any CSS selector, so everything you learned in the CSS course works here: #id, .class, nav > a, input[type="email"].' },
      ],
    },
    {
      id: 'js-dom-change',
      title: 'Changing Content, Styles and Classes',
      blocks: [
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .highlight { background: #fef08a; padding: 4px; border-radius: 4px; }
</style>

<h2 id="heading">Old heading</h2>
<p id="info">Some text</p>
<img id="pic" src="https://picsum.photos/id/20/200/100" alt="Desk">

<script>
  const heading = document.getElementById('heading');
  heading.textContent = 'New heading';     // safe: text only
  heading.style.color = '#2563eb';         // inline style (camelCase)

  const info = document.getElementById('info');
  info.innerHTML = 'Now with <strong>bold</strong> text';
  info.classList.add('highlight');         // add a CSS class
  console.log(info.classList.contains('highlight'));

  const pic = document.getElementById('pic');
  pic.setAttribute('alt', 'A tidy desk');
  pic.src = 'https://picsum.photos/id/26/200/100';
  console.log(pic.getAttribute('alt'));
</script>` },
        { type: 'list', items: [
          'textContent: plain text, safe for user input',
          'innerHTML: parses HTML; never use it with text typed by users (security risk)',
          'classList.add / remove / toggle / contains: the best way to change styles',
          'style.backgroundColor: CSS properties written in camelCase',
        ] },
        { type: 'note', value: 'Prefer toggling classes over setting many inline styles. Keep the look in CSS, the logic in JavaScript.' },
      ],
    },
    {
      id: 'js-dom-create',
      title: 'Creating and Removing Elements',
      blocks: [
        { type: 'code', lang: 'html', tryIt: true, value: `<ul id="list"></ul>

<script>
  const list = document.getElementById('list');
  const tasks = ['Learn arrays', 'Practice loops', 'Build a project'];

  tasks.forEach(task => {
    const li = document.createElement('li');  // 1. create
    li.textContent = task;                    // 2. fill
    list.append(li);                          // 3. insert
  });

  const urgent = document.createElement('li');
  urgent.textContent = 'URGENT: revise closures';
  urgent.style.color = 'crimson';
  list.prepend(urgent);                       // add at the start

  list.lastElementChild.remove();             // remove the last item
  console.log('Items now:', list.children.length);
</script>` },
        { type: 'list', items: [
          'append / prepend: add as the last or first child',
          'before / after: add as a sibling',
          'element.remove(): delete it',
          'element.replaceWith(other): swap it',
        ] },
      ],
    },
    {
      id: 'js-events',
      title: 'Events',
      blocks: [
        { type: 'text', value: 'Events are things that happen: a tap, a key press, a form submit. addEventListener runs your function when the event happens.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<button id="like">❤ Like</button>
<span id="count">0</span>

<p><input id="name" placeholder="Type your name"></p>
<p id="greeting"></p>

<script>
  let likes = 0;
  document.getElementById('like').addEventListener('click', () => {
    likes++;
    document.getElementById('count').textContent = likes;
  });

  document.getElementById('name').addEventListener('input', (event) => {
    const value = event.target.value;
    document.getElementById('greeting').textContent = value ? 'Hello, ' + value + '!' : '';
  });
</script>` },
        { type: 'heading', value: 'Common events' },
        { type: 'list', items: [
          'click: tapped or clicked',
          'input: the value of a field changed (every keystroke)',
          'change: a select, checkbox or field was changed and left',
          'submit: a form was sent',
          'keydown: a key was pressed',
          'DOMContentLoaded: the HTML is fully loaded',
        ] },
        { type: 'note', value: 'The event object (here event) describes what happened. event.target is the element that triggered it.' },
      ],
    },
    {
      id: 'js-event-delegation',
      title: 'Bubbling and Event Delegation',
      blocks: [
        { type: 'text', value: 'An event on a child "bubbles up" to its parents. So instead of adding a listener to every item, add one listener to the parent and check which child was tapped. This is event delegation, and it also works for items added later.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<ul id="menu">
  <li data-page="home">Home</li>
  <li data-page="quiz">Quiz</li>
  <li data-page="profile">Profile</li>
</ul>
<button id="add">Add item</button>

<script>
  const menu = document.getElementById('menu');

  menu.addEventListener('click', (event) => {
    const item = event.target.closest('li');
    if (!item) return;
    console.log('Open page:', item.dataset.page);
  });

  document.getElementById('add').addEventListener('click', () => {
    const li = document.createElement('li');
    li.dataset.page = 'settings';
    li.textContent = 'Settings (new)';
    menu.append(li); // works with the same single listener
  });
</script>` },
        { type: 'heading', value: 'Stopping default behavior' },
        { type: 'code', lang: 'js', value: `link.addEventListener('click', (event) => {
  event.preventDefault();   // do not follow the link
});` },
      ],
    },
    {
      id: 'js-forms',
      title: 'Working with Forms',
      blocks: [
        { type: 'code', lang: 'html', tryIt: true, value: `<form id="signup">
  <input name="email" type="email" placeholder="Email" required>
  <input name="age" type="number" placeholder="Age">
  <label><input name="terms" type="checkbox"> I agree</label>
  <button>Sign up</button>
</form>
<p id="result"></p>

<script>
  const form = document.getElementById('signup');
  const result = document.getElementById('result');

  form.addEventListener('submit', (event) => {
    event.preventDefault();                 // stay on the page

    const data = new FormData(form);
    const email = data.get('email');
    const age = Number(data.get('age'));
    const agreed = form.elements.terms.checked;

    if (!agreed) {
      result.textContent = 'Please accept the terms.';
      result.style.color = 'crimson';
      return;
    }
    result.style.color = 'green';
    result.textContent = 'Welcome! ' + email + (age ? ', age ' + age : '');
    console.log(Object.fromEntries(data));
    form.reset();
  });
</script>` },
        { type: 'list', items: [
          'event.preventDefault() stops the page from reloading on submit.',
          'new FormData(form) reads every named field at once.',
          'Input values are always strings: convert with Number().',
          'checkbox.checked is true or false.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'dom', q: 'Which method selects the first element matching a CSS selector?', options: ['getElementsByClass()', 'querySelector()', 'selectFirst()', 'findElement()'], answer: 1, explain: 'querySelector returns the first match; querySelectorAll returns all.' },
    { chapterId: 'dom', q: 'Which property is safest for inserting user-typed text?', options: ['innerHTML', 'outerHTML', 'textContent', 'insertHTML'], answer: 2, explain: 'textContent never parses HTML, so it cannot inject scripts.' },
    { chapterId: 'dom', q: 'How do you add a CSS class to an element?', options: ['el.class = "x"', 'el.classList.add("x")', 'el.addClass("x")', 'el.style.class = "x"'], answer: 1, explain: 'classList has add, remove, toggle and contains.' },
    { chapterId: 'dom', q: 'Which event fires on every keystroke in a text field?', options: ['change', 'submit', 'input', 'focus'], answer: 2, explain: 'input fires immediately; change fires when leaving the field.' },
    { chapterId: 'dom', q: 'What does event.preventDefault() do on a form submit?', options: ['Deletes the form', 'Stops the page from reloading', 'Validates the form', 'Stops all events'], answer: 1, explain: 'It cancels the browser\'s default action.' },
    { chapterId: 'dom', q: 'What is event delegation?', options: ['One listener on a parent that handles events from its children', 'Removing all events', 'Passing events to a server', 'An error type'], answer: 0, explain: 'Events bubble up, so the parent can handle them for every child.' },
  ],
};
