// Microservices chapter: Resilience.

export default {
  id: 'resilience',
  title: 'Resilience',
  description: 'Retries, timeouts, circuit breakers and bulkheads',
  icon: 'shield',
  lessons: [
    {
      id: 'ms-timeout-retry',
      title: 'Timeouts and retries',
      blocks: [
        { type: 'text', value: 'Every network call needs a timeout. Without one, a slow dependency ties up threads until the service dies. Retry transient failures, but with exponential backoff and jitter, and only for idempotent operations.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `async function fetchWithRetry(url, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return res.json();
    } catch (err) {
      const wait = 2 ** i * 100 + Math.random() * 100;
      await new Promise(r => setTimeout(r, wait));
    }
  }
  throw new Error('service unavailable');
}` },
        { type: 'note', value: 'Retrying a non-idempotent write can charge a card twice. Use an idempotency key and retry only safe operations.' },
      ],
    },
    {
      id: 'ms-circuit-breaker',
      title: 'Circuit breakers',
      blocks: [
        { type: 'text', value: 'A circuit breaker stops calling a failing dependency. After too many failures it opens, failing fast for a while, then half-opens to test recovery. It protects the caller and gives the dependency time to recover.' },
        { type: 'code', lang: 'text', tryIt: false, value: `CLOSED  -> calls pass through, failures are counted
OPEN    -> calls fail immediately for a cooldown
HALF-OPEN -> a few trial calls decide whether to close` },
        { type: 'list', items: [
          'Fail fast instead of waiting for a timeout',
          'Prevents cascading failures',
          'Give the dependency time to recover',
          'Pair with a fallback response when possible',
        ] },
      ],
    },
    {
      id: 'ms-bulkhead',
      title: 'Bulkheads and graceful degradation',
      blocks: [
        { type: 'text', value: 'A bulkhead isolates resources so one slow dependency cannot exhaust the pool used by everything else. Graceful degradation returns a reduced result instead of an error, such as a cached catalog when search is down.' },
        { type: 'list', items: [
          'Separate connection pools per dependency',
          'Limit concurrency per downstream service',
          'Return cached or partial data when possible',
          'Show a clear message instead of a blank screen',
          'Load shed when the system is over capacity',
        ] },
        { type: 'note', value: 'The goal is to fail small. One feature down should not take the whole product down.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'resilience',
      q: 'Why does every network call need a timeout?',
      options: ['To save memory', 'To avoid tying up threads on a slow dependency', 'To speed up DNS', 'It is optional'],
      answer: 1,
      explain: 'Timeouts free resources when a dependency hangs.',
    },
    {
      chapterId: 'resilience',
      q: 'What does a circuit breaker do when open?',
      options: ['Retries forever', 'Fails fast without calling the dependency', 'Deletes data', 'Caches responses'],
      answer: 1,
      explain: 'Open means fail fast for a cooldown.',
    },
    {
      chapterId: 'resilience',
      q: 'Why add jitter to retry delays?',
      options: ['To slow it down', 'To avoid many clients retrying at the same moment', 'To encrypt traffic', 'To log errors'],
      answer: 1,
      explain: 'Jitter spreads retries and avoids thundering herds.',
    },
    {
      chapterId: 'resilience',
      q: 'What is a bulkhead?',
      options: ['A database', 'Isolating resources so one failure cannot exhaust everything', 'A load balancer', 'A cache'],
      answer: 1,
      explain: 'Bulkheads contain failure.',
    },
  ],
};
