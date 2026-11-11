// System Design chapter: Consistency.

export default {
  id: 'consistency',
  title: 'Consistency',
  description: 'Strong, eventual and everything between',
  icon: 'sync-alt',
  lessons: [
    {
      id: 'sd-consistency-models',
      title: 'Consistency models',
      blocks: [
        { type: 'text', value: 'Strong consistency means every read sees the latest committed write. Eventual consistency means replicas converge over time. Most large systems choose per operation.' },
        { type: 'list', items: [
          'Strong - simpler to reason about, slower and less available',
          'Eventual - fast and available, may return stale data',
          'Read-your-writes - a user sees their own update',
          'Monotonic reads - time does not go backwards for a user',
          'Causal - related writes are seen in order',
        ] },
        { type: 'note', value: 'A social feed can be eventually consistent. A bank balance usually cannot. Choose per feature, not for the whole system.' },
      ],
    },
    {
      id: 'sd-transactions-sagas',
      title: 'Transactions and sagas',
      blocks: [
        { type: 'text', value: 'A single database transaction is the simplest consistency tool. Across services, a distributed transaction is expensive, so many systems use a saga: a sequence of local transactions with compensating actions.' },
        { type: 'code', lang: 'text', tryIt: false, value: `order saga:
  create order -> reserve stock -> charge payment -> ship

if charge fails:
  release stock -> cancel order (compensate)` },
        { type: 'note', value: 'A saga is eventually consistent. The system must tolerate intermediate states and make every step idempotent.' },
      ],
    },
    {
      id: 'sd-idempotency-locks',
      title: 'Idempotency and locks',
      blocks: [
        { type: 'text', value: 'Retries are inevitable. An idempotency key lets the server recognize a repeated request and return the original result. Distributed locks coordinate access but are hard to get right.' },
        { type: 'code', lang: 'text', tryIt: false, value: `POST /payments
Idempotency-Key: 7f3c...

server:
  if key exists -> return stored response
  else process, store response with key` },
        { type: 'note', value: 'A lock without a lease can deadlock forever. A lease without fencing can allow two owners. Prefer idempotency and compare-and-set when possible.' },
      ],
    },
    {
      id: 'sd-conflicts',
      title: 'Conflicts',
      blocks: [
        { type: 'list', items: [
          'Last write wins - simple, can lose data',
          'Version numbers - reject stale updates',
          'Merge - combine changes, needs domain rules',
          'CRDTs - automatic merge for specific data types',
          'Server authority - one writer decides',
        ] },
        { type: 'text', value: 'Offline mobile apps must handle conflicts. Decide the rule per field and show the user when a conflict cannot be resolved automatically.' },
        { type: 'note', value: 'The conflict rule is a product decision as much as a technical one. Document it and test it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'consistency',
      q: 'What does strong consistency guarantee?',
      options: ['Every read sees the latest write', 'Reads are always fast', 'Data is never lost', 'No retries are needed'],
      answer: 0,
      explain: 'It gives the simplest mental model at a cost.',
    },
    {
      chapterId: 'consistency',
      q: 'What is a saga?',
      options: ['A single transaction', 'A sequence of local transactions with compensations', 'A cache', 'A load balancer'],
      answer: 1,
      explain: 'It coordinates work across services without a distributed transaction.',
    },
    {
      chapterId: 'consistency',
      q: 'What is an idempotency key for?',
      options: ['Caching reads', 'Making retried writes safe', 'Encrypting data', 'Sorting results'],
      answer: 1,
      explain: 'The server returns the original result for a repeated request.',
    },
    {
      chapterId: 'consistency',
      q: 'What is a risk of last-write-wins?',
      options: ['It is slow', 'It can silently lose data', 'It needs a lock', 'It breaks DNS'],
      answer: 1,
      explain: 'Concurrent writes overwrite each other.',
    },
  ],
};
