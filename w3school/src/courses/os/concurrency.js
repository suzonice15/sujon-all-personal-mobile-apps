// OS chapter: Concurrency.

export default {
  id: 'concurrency',
  title: 'Concurrency',
  description: 'Races, locks, semaphores and deadlock',
  icon: 'sync',
  lessons: [
    {
      id: 'os-races',
      title: 'Race conditions',
      blocks: [
        { type: 'text', value: 'A race condition happens when two threads access shared data and the result depends on timing. The fix is synchronization around the critical section.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <pthread.h>

int counter = 0;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void *worker(void *arg) {
    for (int i = 0; i < 100000; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}` },
        { type: 'note', value: 'Without the lock, ++ is not atomic. The lost update is small and intermittent, which makes races hard to reproduce.' },
      ],
    },
    {
      id: 'os-locks-semaphores',
      title: 'Locks and semaphores',
      blocks: [
        { type: 'list', items: [
          'Mutex - one owner at a time',
          'Semaphore - a counter permits N owners',
          'Condition variable - wait for a state change',
          'Spinlock - busy wait, only for very short critical sections',
          'Read-write lock - many readers or one writer',
        ] },
        { type: 'text', value: 'Hold a lock for the shortest time possible. Never call a slow network or disk operation while holding a lock that other threads need.' },
        { type: 'note', value: 'A lock does not make code correct by itself. You still need a consistent rule for which data it protects.' },
      ],
    },
    {
      id: 'os-deadlock',
      title: 'Deadlock',
      blocks: [
        { type: 'text', value: 'Deadlock needs four conditions: mutual exclusion, hold and wait, no preemption, and circular wait. Break one and deadlock is impossible.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Thread A: lock X, then wait for Y
Thread B: lock Y, then wait for X
-> circular wait -> deadlock

Fix: acquire locks in a global order.` },
        { type: 'list', items: [
          'Acquire locks in a consistent order',
          'Use timeouts and retries',
          'Avoid holding multiple locks',
          'Prefer message passing over shared state',
          'Detect and break cycles in a distributed system',
        ] },
        { type: 'note', value: 'Starvation is different: a thread is runnable but never scheduled because others keep winning.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'concurrency',
      q: 'What is a race condition?',
      options: ['A fast loop', 'A result that depends on timing of shared access', 'A deadlock', 'A cache miss'],
      answer: 1,
      explain: 'Unsynchronized shared access causes it.',
    },
    {
      chapterId: 'concurrency',
      q: 'What does a mutex allow?',
      options: ['Many owners', 'One owner at a time', 'No owners', 'Only readers'],
      answer: 1,
      explain: 'It provides mutual exclusion.',
    },
    {
      chapterId: 'concurrency',
      q: 'How do you break a deadlock cycle?',
      options: ['Acquire locks in a global order', 'Add more locks', 'Retry forever', 'Disable threads'],
      answer: 0,
      explain: 'A consistent order prevents circular wait.',
    },
  ],
};
