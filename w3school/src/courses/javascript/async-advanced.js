// JavaScript chapter: Advanced Async. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'async-advanced',
  title: 'Advanced Async',
  description: 'Promise combinators, cancellation, retries and workers',
  icon: 'sync',
  lessons: [
    {
      id: 'js-promise-combinators',
      title: 'allSettled, any and race',
      blocks: [
        { type: 'text', value: 'Promise.all fails as soon as one promise fails. The other combinators handle different real-world needs.' },
        { type: 'list', items: [
          'Promise.all: all must succeed; results in order',
          'Promise.allSettled: wait for every promise, success or failure',
          'Promise.any: the first one that succeeds wins',
          'Promise.race: the first one to finish (success or failure) wins',
        ] },
        { type: 'code', lang: 'js', tryIt: true, value: `const ok = (ms, v) => new Promise(r => setTimeout(() => r(v), ms));
const fail = (ms, msg) => new Promise((_, rej) => setTimeout(() => rej(new Error(msg)), ms));

async function demo() {
  const settled = await Promise.allSettled([ok(100, 'profile'), fail(50, 'ads down'), ok(80, 'lessons')]);
  settled.forEach(r => console.log(r.status, r.status === 'fulfilled' ? r.value : r.reason.message));

  const fastestMirror = await Promise.any([fail(30, 'mirror A'), ok(90, 'mirror B'), ok(60, 'mirror C')]);
  console.log('Downloaded from:', fastestMirror);

  try {
    await Promise.all([ok(50, 'x'), fail(20, 'one failed')]);
  } catch (e) {
    console.log('Promise.all rejected:', e.message);
  }
}
demo();` },
        { type: 'note', value: 'Use allSettled for dashboards that load many independent widgets: one broken widget should not blank the whole page.' },
      ],
    },
    {
      id: 'js-abort-timeout',
      title: 'Cancelling and Timeouts with AbortController',
      blocks: [
        { type: 'text', value: 'Users change their mind: they type a new search, leave a screen, or the network hangs. AbortController lets you cancel fetch requests and other async work.' },
        { type: 'code', lang: 'js', value: `const controller = new AbortController();

fetch('/api/search?q=html', { signal: controller.signal })
  .then(res => res.json())
  .catch(err => {
    if (err.name === 'AbortError') console.log('Request cancelled');
  });

controller.abort(); // cancel it

// Built-in timeout: give up after 5 seconds
fetch('/api/slow', { signal: AbortSignal.timeout(5000) });` },
        { type: 'heading', value: 'A cancellable delay' },
        { type: 'code', lang: 'js', tryIt: true, value: `function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(id);
      reject(new Error('Cancelled'));
    });
  });
}

const controller = new AbortController();
delay(2000, controller.signal)
  .then(() => console.log('Finished'))
  .catch(e => console.log(e.message));

setTimeout(() => controller.abort(), 300);` },
        { type: 'note', value: 'Cancel the previous search request before sending a new one. Otherwise a slow old response can overwrite newer results.' },
      ],
    },
    {
      id: 'js-retry',
      title: 'Retries with Exponential Backoff',
      blocks: [
        { type: 'text', value: 'Networks fail now and then, especially on mobile. Production apps retry failed requests, waiting longer each time (1s, 2s, 4s...) so a struggling server is not flooded.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const sleep = ms => new Promise(r => setTimeout(r, ms));

async function withRetry(task, { retries = 3, baseDelay = 200 } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await task();
    } catch (error) {
      if (attempt >= retries) throw error;
      const wait = baseDelay * 2 ** attempt;
      console.log(\`Attempt \${attempt + 1} failed (\${error.message}), retrying in \${wait} ms\`);
      await sleep(wait);
    }
  }
}

// Fake request that fails twice, then works
let calls = 0;
const flakyRequest = async () => {
  calls++;
  if (calls < 3) throw new Error('Network error');
  return 'Data loaded';
};

withRetry(flakyRequest).then(result => console.log(result, 'after', calls, 'calls'));` },
        { type: 'note', value: 'Only retry errors that can succeed later (timeouts, 503). Retrying a 400 "bad request" will fail every time.' },
      ],
    },
    {
      id: 'js-web-workers',
      title: 'Web Workers',
      blocks: [
        { type: 'text', value: 'Heavy calculations block the single main thread and freeze the page. A Web Worker runs JavaScript on a separate thread. The page and the worker talk by sending messages.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<button id="run">Count primes up to 5 million</button>
<button onclick="this.textContent = 'Still responsive! ' + Date.now() % 1000">Tap me while it runs</button>
<p id="out"></p>

<script>
  // Normally the worker code lives in its own file: new Worker('worker.js')
  const workerCode = \`
    self.onmessage = (e) => {
      const limit = e.data;
      let count = 0;
      for (let n = 2; n <= limit; n++) {
        let prime = true;
        for (let d = 2; d * d <= n; d++) if (n % d === 0) { prime = false; break; }
        if (prime) count++;
      }
      self.postMessage(count);
    };
  \`;
  const blob = new Blob([workerCode], { type: 'text/javascript' });
  const worker = new Worker(URL.createObjectURL(blob));

  worker.onmessage = (e) => {
    document.getElementById('out').textContent = 'Primes found: ' + e.data;
  };

  document.getElementById('run').addEventListener('click', () => {
    document.getElementById('out').textContent = 'Working in the background...';
    worker.postMessage(5000000);
  });
</script>` },
        { type: 'list', items: [
          'Workers cannot touch the DOM; they send results back with postMessage.',
          'Good uses: image processing, parsing big files, encryption, heavy math.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'async-advanced', q: 'Which combinator waits for every promise even if some fail?', options: ['Promise.all', 'Promise.race', 'Promise.allSettled', 'Promise.any'], answer: 2, explain: 'allSettled reports each result with a status.' },
    { chapterId: 'async-advanced', q: 'Which combinator returns the first successful result?', options: ['Promise.any', 'Promise.race', 'Promise.all', 'Promise.resolve'], answer: 0, explain: 'any ignores rejections until one fulfills.' },
    { chapterId: 'async-advanced', q: 'How do you cancel a fetch request?', options: ['fetch.cancel()', 'Pass an AbortController signal and call abort()', 'Set a timeout of 0', 'It cannot be cancelled'], answer: 1, explain: 'The request rejects with an AbortError.' },
    { chapterId: 'async-advanced', q: 'In exponential backoff with base 200 ms, the third wait is...', options: ['200 ms', '400 ms', '600 ms', '800 ms'], answer: 3, explain: '200, 400, 800: the delay doubles each attempt.' },
    { chapterId: 'async-advanced', q: 'What can a Web Worker NOT do?', options: ['Run loops', 'Send messages', 'Access the DOM directly', 'Do math'], answer: 2, explain: 'Workers have no DOM; they post results to the page.' },
  ],
};
