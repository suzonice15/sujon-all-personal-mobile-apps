// Node.js chapter: Workers & Performance.

export default {
  id: 'workers-performance',
  title: 'Workers & Performance',
  description: 'The event loop, worker threads and profiling',
  icon: 'speed',
  lessons: [
    {
      id: 'node-event-loop-order',
      title: 'The event loop',
      blocks: [
        { type: 'text', value: 'Node runs JavaScript on one thread. The event loop takes callbacks from queues and runs them when the stack is empty. A long synchronous task blocks every request, which is why CPU-heavy work belongs in a worker.' },
        { type: 'code', lang: 'js', tryIt: true, value: `console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// Order: 1, 4, 3, 2
// Microtasks (promises) run before the next timer.` },
        { type: 'note', value: 'Microtasks run before timers. An infinite promise chain can starve timers and I/O just like a busy loop.' },
      ],
    },
    {
      id: 'node-worker-threads',
      title: 'Worker threads',
      blocks: [
        { type: 'text', value: 'A worker thread runs JavaScript in parallel with its own event loop. Use it for CPU-bound work such as image processing, compression or heavy calculations, not for I/O that is already async.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { Worker } from 'node:worker_threads';

export function runInWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./hash-worker.js', import.meta.url), {
      workerData: data,
    });
    worker.once('message', resolve);
    worker.once('error', reject);
    worker.once('exit', code => {
      if (code !== 0) reject(new Error('worker exited ' + code));
    });
  });
}` },
        { type: 'note', value: 'Workers have their own memory. Sending large objects copies them unless you use transferable buffers.' },
      ],
    },
    {
      id: 'node-profiling',
      title: 'Finding the slow part',
      blocks: [
        { type: 'text', value: 'Measure before optimizing. Use the built-in profiler, clinic or the Chrome DevTools inspector to find the hot function. Logs and metrics tell you which route is slow; the profiler tells you why.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# CPU profile
node --prof app.js
node --prof-process isolate-*.log > report.txt

# Heap snapshot for memory leaks
node --inspect app.js
# then open chrome://inspect` },
        { type: 'list', items: [
          'Measure the real workload, not a guess',
          'Check for synchronous file or crypto calls',
          'Cache expensive repeated work',
          'Move CPU-heavy work to a worker',
          'Set a memory limit and watch the heap',
        ] },
        { type: 'note', value: 'A slow endpoint is often a slow database query, not slow JavaScript. Profile before adding complexity.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'workers-performance',
      q: 'What blocks every request in Node?',
      options: ['Async I/O', 'A long synchronous task on the event loop', 'A promise', 'A stream'],
      answer: 1,
      explain: 'Single-threaded JS means a busy loop blocks the loop.',
    },
    {
      chapterId: 'workers-performance',
      q: 'When should you use a worker thread?',
      options: ['For every request', 'For CPU-bound work', 'For reading files', 'For HTTP calls'],
      answer: 1,
      explain: 'Workers handle CPU-heavy tasks in parallel.',
    },
    {
      chapterId: 'workers-performance',
      q: 'Which runs first after synchronous code?',
      options: ['setTimeout callbacks', 'Promise microtasks', 'setImmediate', 'I/O callbacks'],
      answer: 1,
      explain: 'Microtasks run before timers.',
    },
    {
      chapterId: 'workers-performance',
      q: 'What should you do before optimizing?',
      options: ['Rewrite in another language', 'Measure and profile the real workload', 'Add more workers', 'Disable logging'],
      answer: 1,
      explain: 'Measure first, then fix the hot spot.',
    },
  ],
};
