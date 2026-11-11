// Node.js chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Node is, how the event loop works and your first script',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'node-what-is',
      title: 'What is Node.js?',
      blocks: [
        { type: 'text', value: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine. It runs JavaScript outside the browser, on a server or on your computer, with access to files, the network and the operating system.' },
        { type: 'list', items: [
          'One language for frontend and backend',
          'Non-blocking I/O: waiting for a file or network does not freeze the server',
          'npm gives access to the largest package ecosystem',
          'Ideal for APIs, real-time apps and tools',
        ] },
        { type: 'note', value: 'Node is not a framework and not a language. Express, Nest and Fastify are frameworks that run on Node. The runtime itself only gives you JavaScript plus system APIs.' },
      ],
    },
    {
      id: 'node-event-loop',
      title: 'The event loop',
      blocks: [
        { type: 'text', value: 'Node runs JavaScript on one thread. Slow work is handed to the system, and callbacks run when the result is ready. The event loop decides the order: synchronous code first, then promise callbacks, then timers.' },
        { type: 'code', lang: 'js', tryIt: true, value: `console.log('1 start');

setTimeout(() => console.log('4 timeout'), 0);

Promise.resolve().then(() => console.log('3 promise'));

console.log('2 end');` },
        { type: 'text', value: 'The output is 1, 2, 3, 4. Synchronous code runs to completion. Promise callbacks run in the microtask queue before timers. That ordering explains many "why is my state not updated yet?" bugs.' },
        { type: 'note', value: 'A CPU-heavy loop blocks the event loop, so no request is served until it finishes. Move heavy work to a worker thread, a child process or a queue.' },
      ],
    },
    {
      id: 'node-first-script',
      title: 'Your first script',
      blocks: [
        { type: 'text', value: 'Create a file, run it with node, and you have a program. No HTML, no browser and no build step are required for plain JavaScript.' },
        { type: 'code', lang: 'text', tryIt: false, value: `// hello.js
const name = process.argv[2] || 'student';
console.log('Hello, ' + name);

// Run it:
// node hello.js Ayesha` },
        { type: 'text', value: 'process.argv holds the command-line arguments. process.env holds environment variables. Both are global in Node and are how a script receives configuration.' },
        { type: 'note', value: 'Use a package.json with "type": "module" to write import/export syntax. Without it, Node treats .js files as CommonJS and expects require.' },
      ],
    },
    {
      id: 'node-blocking',
      title: 'Blocking versus non-blocking',
      blocks: [
        { type: 'text', value: 'Synchronous functions finish before the next line. Asynchronous functions start work and let the rest of the program continue. A server must never block on I/O.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const start = Date.now();

// Simulates CPU work that blocks the event loop
while (Date.now() - start < 30) {}

console.log('blocked for about', Date.now() - start, 'ms');

setTimeout(() => console.log('this runs later'), 0);
console.log('this runs first');` },
        { type: 'list', items: [
          'Good: fs.promises.readFile, fetch, database queries',
          'Bad: fs.readFileSync inside a request handler',
          'Good: streaming a large file instead of loading it into memory',
          'Bad: JSON.parse on a huge payload in the main thread',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is Node.js?',
      options: ['A browser', 'A JavaScript runtime', 'A database', 'A CSS framework'],
      answer: 1,
      explain: 'Node runs JavaScript outside the browser using the V8 engine.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which runs first: a resolved promise callback or a setTimeout with 0?',
      options: ['setTimeout', 'Promise callback', 'They run together', 'Random order'],
      answer: 1,
      explain: 'Microtasks (promises) run before the timer phase of the event loop.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does a blocking operation do?',
      options: ['Runs in the background', 'Stops the event loop until it finishes', 'Uses another thread', 'Restarts the server'],
      answer: 1,
      explain: 'Synchronous CPU or I/O work prevents other callbacks from running.',
    },
    {
      chapterId: 'getting-started',
      q: 'Where do command-line arguments appear in Node?',
      options: ['process.argv', 'window.argv', 'args', 'process.env'],
      answer: 0,
      explain: 'process.argv is an array of the executable and the passed arguments.',
    },
  ],
};
