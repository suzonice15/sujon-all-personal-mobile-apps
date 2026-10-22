// JavaScript chapter: Asynchronous JavaScript. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'async',
  title: 'Asynchronous JavaScript',
  description: 'Timers, promises, async/await and fetch',
  icon: 'schedule',
  lessons: [
    {
      id: 'js-timers',
      title: 'Timers: setTimeout and setInterval',
      blocks: [
        { type: 'text', value: 'Some work takes time: waiting, downloading, reading files. JavaScript does not stop and wait. It schedules the work and keeps going. Timers are the simplest example.' },
        { type: 'code', lang: 'js', tryIt: true, value: `console.log('1. Start');

setTimeout(() => {
  console.log('3. Runs after 1 second');
}, 1000);

console.log('2. This runs before the timer!');

let seconds = 0;
const timer = setInterval(() => {
  seconds++;
  console.log('Tick', seconds);
  if (seconds === 3) {
    clearInterval(timer);   // stop repeating
    console.log('Done');
  }
}, 500);` },
        { type: 'note', value: 'The delay is a minimum, not a promise. A busy page can run the callback a little later.' },
      ],
    },
    {
      id: 'js-promises',
      title: 'Promises',
      blocks: [
        { type: 'text', value: 'A Promise represents a value that will be ready later. It is pending, then either fulfilled (success) or rejected (failure). You react with .then() and .catch().' },
        { type: 'code', lang: 'js', tryIt: true, value: `function orderFood(item) {
  return new Promise((resolve, reject) => {
    console.log('Ordering', item, '...');
    setTimeout(() => {
      if (item === 'pizza') reject(new Error('Pizza is sold out'));
      else resolve(item + ' is ready!');
    }, 800);
  });
}

orderFood('biryani')
  .then(message => console.log(message))
  .catch(error => console.log('Problem:', error.message))
  .finally(() => console.log('Order finished'));

orderFood('pizza')
  .then(message => console.log(message))
  .catch(error => console.log('Problem:', error.message));` },
        { type: 'heading', value: 'Running promises together' },
        { type: 'code', lang: 'js', tryIt: true, value: `const wait = (ms, value) => new Promise(r => setTimeout(() => r(value), ms));

Promise.all([wait(500, 'A'), wait(300, 'B'), wait(100, 'C')])
  .then(results => console.log('All done:', results)); // keeps order

Promise.race([wait(500, 'slow'), wait(100, 'fast')])
  .then(winner => console.log('First:', winner));` },
      ],
    },
    {
      id: 'js-async-await',
      title: 'async and await',
      blocks: [
        { type: 'text', value: 'async/await lets you write promise code that reads like normal top-to-bottom code. await pauses the async function until the promise settles, without freezing the page.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function cookDinner() {
  console.log('Washing rice...');
  await wait(500);
  console.log('Cooking rice...');
  await wait(500);
  console.log('Frying fish...');
  await wait(500);
  return 'Dinner is served!';
}

cookDinner().then(result => console.log(result));
console.log('(This prints first, the page is not blocked)');` },
        { type: 'heading', value: 'Parallel vs one by one' },
        { type: 'code', lang: 'js', tryIt: true, value: `const wait = (ms, v) => new Promise(r => setTimeout(() => r(v), ms));

async function main() {
  let start = Date.now();
  await wait(400);
  await wait(400);                            // one after the other
  console.log('sequential:', Date.now() - start, 'ms'); // ~800

  start = Date.now();
  await Promise.all([wait(400), wait(400)]);  // both at once
  console.log('parallel:', Date.now() - start, 'ms');   // ~400
}
main();` },
        { type: 'note', value: 'await only works inside an async function (or at the top level of a module).' },
      ],
    },
    {
      id: 'js-fetch',
      title: 'Fetching Data from an API',
      blocks: [
        { type: 'text', value: 'fetch() downloads data from a URL and returns a promise. Most APIs return JSON. This example uses a free public test API.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<button id="load">Load users</button>
<ul id="users"></ul>

<script>
  async function loadUsers() {
    const list = document.getElementById('users');
    list.textContent = 'Loading...';
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const users = await response.json();

      list.textContent = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.name + ' — ' + user.email;
        list.append(li);
      });
    } catch (error) {
      list.textContent = 'Could not load: ' + error.message;
    }
  }
  document.getElementById('load').addEventListener('click', loadUsers);
</script>` },
        { type: 'heading', value: 'Sending data' },
        { type: 'code', lang: 'js', value: `const response = await fetch('https://api.example.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Hello', body: 'My first post' }),
});
const created = await response.json();` },
        { type: 'note', value: 'fetch only rejects on network failure. A 404 or 500 still "succeeds", so always check response.ok.' },
      ],
    },
    {
      id: 'js-errors',
      title: 'Error Handling',
      blocks: [
        { type: 'text', value: 'try runs code that might fail; catch handles the error instead of crashing; finally always runs. throw creates your own errors.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function withdraw(balance, amount) {
  if (amount <= 0) throw new Error('Amount must be positive');
  if (amount > balance) throw new RangeError('Insufficient balance');
  return balance - amount;
}

try {
  console.log(withdraw(500, 200));
  console.log(withdraw(500, 900));   // throws
  console.log('never runs');
} catch (error) {
  console.log(error.name + ': ' + error.message);
} finally {
  console.log('Transaction attempt logged');
}` },
        { type: 'heading', value: 'Custom error classes' },
        { type: 'code', lang: 'js', tryIt: true, value: `class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

try {
  throw new ValidationError('email', 'Email is required');
} catch (e) {
  if (e instanceof ValidationError) console.log(\`\${e.field}: \${e.message}\`);
  else throw e; // not ours, pass it on
}` },
        { type: 'note', value: 'Catch only errors you can handle. Swallowing every error silently hides real bugs.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'async', q: 'What prints first? console.log("A"); setTimeout(() => console.log("B"), 0); console.log("C");', options: ['A B C', 'A C B', 'B A C', 'C A B'], answer: 1, explain: 'Timer callbacks run after the current code finishes, even with 0 ms.' },
    { chapterId: 'async', q: 'Which method handles a rejected promise?', options: ['.then()', '.catch()', '.done()', '.error()'], answer: 1, explain: '.catch() runs when the promise is rejected.' },
    { chapterId: 'async', q: 'Where can you use await?', options: ['Anywhere', 'Only inside async functions (or module top level)', 'Only in loops', 'Only with setTimeout'], answer: 1, explain: 'await needs an async context.' },
    { chapterId: 'async', q: 'Does fetch reject when the server returns 404?', options: ['Yes, always', 'No, you must check response.ok', 'Only for POST', 'Only in Chrome'], answer: 1, explain: 'fetch only rejects on network errors.' },
    { chapterId: 'async', q: 'Which block always runs, error or not?', options: ['try', 'catch', 'finally', 'throw'], answer: 2, explain: 'finally runs after try/catch in every case.' },
    { chapterId: 'async', q: 'What does Promise.all do?', options: ['Runs promises one by one', 'Waits for all promises and returns their results in order', 'Returns the fastest result', 'Cancels promises'], answer: 1, explain: 'It fulfills when every promise fulfills, or rejects on the first failure.' },
  ],
};
