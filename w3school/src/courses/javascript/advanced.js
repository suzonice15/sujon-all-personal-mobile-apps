// JavaScript chapter: Advanced Concepts. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'advanced',
  title: 'Advanced Concepts',
  description: 'How JavaScript really works under the hood',
  icon: 'psychology',
  lessons: [
    {
      id: 'js-event-loop',
      title: 'The Event Loop',
      blocks: [
        { type: 'text', value: 'JavaScript runs on a single thread: one thing at a time. The event loop is how it still handles timers, clicks and network responses without freezing.' },
        { type: 'list', items: [
          'Call stack: the code running right now.',
          'Microtask queue: promise callbacks (.then, await). Run as soon as the stack is empty.',
          'Task queue: timers, events and other callbacks. One runs per loop turn, after all microtasks.',
        ] },
        { type: 'code', lang: 'js', tryIt: true, value: `console.log('1. script start');

setTimeout(() => console.log('5. timeout (task)'), 0);

Promise.resolve()
  .then(() => console.log('3. promise (microtask)'))
  .then(() => console.log('4. another microtask'));

console.log('2. script end');` },
        { type: 'text', value: 'Order: synchronous code first, then every microtask, then the next task. That is why the promise beats a 0 ms timer.' },
        { type: 'note', value: 'A long synchronous loop blocks everything: no clicks, no rendering. Split heavy work into chunks or move it to a Web Worker.' },
      ],
    },
    {
      id: 'js-prototypes',
      title: 'Prototypes',
      blocks: [
        { type: 'text', value: 'Every object has a hidden link to another object, its prototype. When a property is not found on the object, JavaScript looks up the prototype chain. Classes are built on top of this system.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const animal = {
  eat() { return this.name + ' is eating'; },
};

const cat = Object.create(animal); // cat's prototype is animal
cat.name = 'Mini';
console.log(cat.eat());                       // found on the prototype
console.log(Object.getPrototypeOf(cat) === animal); // true
console.log(cat.hasOwnProperty('eat'));       // false

class Dog { bark() { return 'Woof'; } }
const d = new Dog();
console.log(Object.getPrototypeOf(d) === Dog.prototype); // true

// Array methods live on Array.prototype
console.log([1, 2].map === Array.prototype.map); // true` },
        { type: 'note', value: 'Never add methods to built-in prototypes like Array.prototype in real projects. It can break other code.' },
      ],
    },
    {
      id: 'js-this-binding',
      title: 'this, call, apply and bind',
      blocks: [
        { type: 'text', value: 'The value of this depends on how a function is called, not where it is written.' },
        { type: 'list', items: [
          'obj.method(): this is obj',
          'A plain function call: this is undefined (in strict mode)',
          'Arrow functions: this is taken from the surrounding code',
          'call / apply / bind: you choose this explicitly',
        ] },
        { type: 'code', lang: 'js', tryIt: true, value: `const user = {
  name: 'Nadia',
  greet(greeting, mark) { return greeting + ', ' + this.name + mark; },
};

console.log(user.greet('Hi', '!'));

const other = { name: 'Rahim' };
console.log(user.greet.call(other, 'Hello', '.'));    // args one by one
console.log(user.greet.apply(other, ['Hey', '?']));   // args as array

const bound = user.greet.bind(other);  // new function, this fixed forever
console.log(bound('Salam', '!'));

const lost = user.greet;
try { lost('Hi', '!'); } catch (e) { console.log('Lost this:', e.message); }` },
        { type: 'note', value: 'Passing obj.method as a callback loses this. Use an arrow wrapper () => obj.method() or obj.method.bind(obj).' },
      ],
    },
    {
      id: 'js-debounce-throttle',
      title: 'Debounce and Throttle',
      blocks: [
        { type: 'text', value: 'Some events fire dozens of times per second: typing, scrolling, resizing. Debounce and throttle limit how often your function runs, which keeps apps fast and saves API calls.' },
        { type: 'list', items: [
          'Debounce: run only after the events stop for a while (search as you type).',
          'Throttle: run at most once per time period (scroll position tracking).',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<input id="search" placeholder="Type quickly...">
<p>Events: <b id="raw">0</b> · Searches sent: <b id="sent">0</b></p>

<script>
  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  function throttle(fn, interval) {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= interval) {
        last = now;
        fn(...args);
      }
    };
  }

  let raw = 0, sent = 0;
  const search = debounce(value => {
    sent++;
    document.getElementById('sent').textContent = sent;
    console.log('Searching for:', value);
  }, 500);

  document.getElementById('search').addEventListener('input', e => {
    raw++;
    document.getElementById('raw').textContent = raw;
    search(e.target.value);
  });
</script>` },
        { type: 'text', value: 'Type a word quickly: many input events, but only one search is sent after you pause. Both helpers are closures, using what you learned in the Functions chapter.' },
      ],
    },
    {
      id: 'js-regex',
      title: 'Regular Expressions',
      blocks: [
        { type: 'text', value: 'A regular expression (regex) is a pattern for matching text. It is used for validation, searching and replacing.' },
        { type: 'list', items: [
          '\\d a digit, \\w a letter/digit/underscore, \\s a space, . any character',
          '+ one or more, * zero or more, ? optional, {3} exactly three',
          '^ start of text, $ end of text, [abc] any of a, b, c',
          'Flags: g (all matches), i (ignore case)',
        ] },
        { type: 'code', lang: 'js', tryIt: true, value: `const phone = /^01[3-9]\\d{8}$/;          // Bangladeshi mobile number
console.log(phone.test('01712345678'));   // true
console.log(phone.test('0171234'));       // false

const email = /^[^\\s@]+@[^\\s@]+\\.[a-z]{2,}$/i;
console.log(email.test('rahim@example.com')); // true

const text = 'Order 12 mangoes and 7 lychees';
console.log(text.match(/\\d+/g));            // ["12", "7"]
console.log(text.replace(/\\d+/g, n => n * 2)); // doubles every number

const date = '2026-10-20';
const [, year, month, day] = date.match(/(\\d{4})-(\\d{2})-(\\d{2})/);
console.log(day, month, year);` },
        { type: 'note', value: 'Regex is powerful but hard to read. Add a comment explaining each pattern, and test it with sites like regex101.com.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'advanced', q: 'Which runs first: a resolved promise\'s .then() or setTimeout(fn, 0)?', options: ['setTimeout', 'The promise callback', 'They run at the same time', 'It is random'], answer: 1, explain: 'Microtasks (promises) run before the next task (timers).' },
    { chapterId: 'advanced', q: 'What happens when a property is not found on an object?', options: ['An error is thrown', 'JavaScript looks it up the prototype chain', 'It returns null', 'It is created automatically'], answer: 1, explain: 'If the chain ends without finding it, the result is undefined.' },
    { chapterId: 'advanced', q: 'What does bind() return?', options: ['The result of the function', 'A new function with this permanently set', 'undefined', 'A promise'], answer: 1, explain: 'call and apply run immediately; bind returns a new function.' },
    { chapterId: 'advanced', q: 'Which technique waits until the user stops typing before searching?', options: ['Throttle', 'Debounce', 'Memoize', 'Polling'], answer: 1, explain: 'Debounce restarts its timer on every event.' },
    { chapterId: 'advanced', q: 'What does the regex /^\\d{3}$/ match?', options: ['Any text with 3 digits in it', 'Exactly three digits and nothing else', 'Three letters', 'One digit three times anywhere'], answer: 1, explain: '^ and $ anchor the pattern to the whole text.' },
  ],
};
