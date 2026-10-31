// Python chapter: Concurrency. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Try it runs asyncio samples with top-level await (like Jupyter). Threads and processes
// cannot start in the WebAssembly Python of Try it, so those samples are read-only.

export default {
  id: 'concurrency',
  title: 'Concurrency: Threads, Processes, asyncio',
  description: 'The GIL, threading, multiprocessing, concurrent.futures and asyncio',
  icon: 'sync-alt',
  lessons: [
    {
      id: 'py-concurrency-overview',
      title: 'Choosing the Right Tool',
      blocks: [
        { type: 'text', value: 'Concurrency means making progress on several tasks at once. Which tool to use depends on what your program waits for.' },
        { type: 'list', items: [
          'I/O-bound (waiting for network, disk, database): threads or asyncio. While one task waits, others run.',
          'CPU-bound (number crunching, image processing): multiprocessing (several processes, several CPU cores), or NumPy which runs in C.',
          'The GIL (Global Interpreter Lock): in standard CPython only one thread executes Python bytecode at a time, so threads do not speed up pure-Python CPU work. I/O releases the GIL, so threads still help for I/O.',
          'Python 3.13+ offers an optional "free-threaded" build (python3.14t) without the GIL, where threads can use several cores.',
          'asyncio: one thread, an event loop, and thousands of cooperative tasks. Best for many concurrent network connections (web servers, crawlers, chat).',
        ] },
      ],
    },
    {
      id: 'py-threading',
      title: 'Threads and ThreadPoolExecutor',
      blocks: [
        { type: 'code', lang: 'python', value: String.raw`import time
from concurrent.futures import ThreadPoolExecutor, as_completed

def download(url):
    time.sleep(1)                      # stands in for a slow network call (releases the GIL)
    return f"{url}: 200 OK"

urls = [f"https://example.com/page{i}" for i in range(5)]

start = time.perf_counter()
for url in urls:
    download(url)
print(f"sequential: {time.perf_counter() - start:.1f} s")      # about 5.0 s

start = time.perf_counter()
with ThreadPoolExecutor(max_workers=5) as pool:
    futures = [pool.submit(download, url) for url in urls]
    for future in as_completed(futures):
        print(future.result())
print(f"5 threads: {time.perf_counter() - start:.1f} s")       # about 1.0 s` },
        { type: 'code', lang: 'python', value: String.raw`import threading

# Shared data needs a lock, or concurrent updates get lost (a race condition)
counter = 0
lock = threading.Lock()

def add_many():
    global counter
    for _ in range(100_000):
        with lock:                     # only one thread at a time inside this block
            counter += 1

threads = [threading.Thread(target=add_many) for _ in range(4)]
for t in threads: t.start()
for t in threads: t.join()            # wait for all threads to finish
print(counter)                         # always 400000 with the lock` },
        { type: 'note', value: 'These samples need a normal Python on your computer: the WebAssembly Python in Try it cannot start threads. Prefer passing messages through queue.Queue over sharing mutable data between threads.' },
      ],
    },
    {
      id: 'py-multiprocessing',
      title: 'Processes for CPU-Bound Work',
      blocks: [
        { type: 'code', lang: 'python', value: String.raw`import math, time
from concurrent.futures import ProcessPoolExecutor

def count_primes(limit):
    return sum(1 for n in range(2, limit) if all(n % d for d in range(2, math.isqrt(n) + 1)))

if __name__ == "__main__":             # REQUIRED for multiprocessing on Windows and macOS
    jobs = [200_000] * 4

    start = time.perf_counter()
    print([count_primes(j) for j in jobs])
    print(f"1 process:  {time.perf_counter() - start:.1f} s")

    start = time.perf_counter()
    with ProcessPoolExecutor() as pool:        # one worker per CPU core by default
        print(list(pool.map(count_primes, jobs)))
    print(f"4 processes: {time.perf_counter() - start:.1f} s")   # roughly 3-4x faster on 4 cores` },
        { type: 'list', items: [
          'Each process has its own memory and its own GIL, so pure-Python code really runs in parallel.',
          'Arguments and results are pickled and sent between processes: keep them small.',
          'Starting processes is slow (tens of milliseconds); give each one a decent amount of work.',
        ] },
      ],
    },
    {
      id: 'py-asyncio',
      title: 'asyncio: async and await',
      blocks: [
        { type: 'text', value: 'An async def function is a coroutine. await pauses it until the awaited thing (network, timer) is ready, and the event loop runs other coroutines in the meantime. asyncio.gather runs many at once.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import asyncio, time

async def fetch(name, delay):
    print(f"start {name}")
    await asyncio.sleep(delay)              # a non-blocking wait (like a network call)
    print(f"done  {name}")
    return f"{name} data"

async def main():
    start = time.perf_counter()
    results = await asyncio.gather(
        fetch("users", 0.3),
        fetch("orders", 0.2),
        fetch("rates", 0.1),
    )
    print(results)
    print(f"took {time.perf_counter() - start:.1f} s (not 0.6 s)")

# In a normal .py file you write: asyncio.run(main())
# Try it (like Jupyter) runs inside an event loop already, so we await directly:
await main()` },
        { type: 'note', value: 'Never call blocking functions (time.sleep, requests.get, heavy loops) inside async code: they freeze every task. Use async libraries (httpx, asyncpg, aiofiles) or run blocking work with asyncio.to_thread().' },
      ],
    },
    {
      id: 'py-asyncio-patterns',
      title: 'Tasks, Timeouts, Limits and Queues',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import asyncio, random
random.seed(5)

async def call_api(i):
    await asyncio.sleep(random.uniform(0.05, 0.3))
    if i == 3:
        raise ConnectionError(f"request {i} failed")
    return i * 10

async def main():
    # 1. Limit concurrency with a semaphore (e.g. max 3 requests at a time)
    sem = asyncio.Semaphore(3)
    async def limited(i):
        async with sem:
            return await call_api(i)

    # 2. return_exceptions=True: one failure does not cancel the rest
    results = await asyncio.gather(*(limited(i) for i in range(6)), return_exceptions=True)
    print(results)

    # 3. Timeouts
    try:
        async with asyncio.timeout(0.1):
            await asyncio.sleep(1)
    except TimeoutError:
        print("timed out after 0.1 s")

    # 4. TaskGroup (3.11+): structured concurrency, errors are collected
    async with asyncio.TaskGroup() as tg:
        a = tg.create_task(call_api(1))
        b = tg.create_task(call_api(2))
    print(a.result(), b.result())

    # 5. Producer / consumer with a queue
    queue = asyncio.Queue()
    async def producer():
        for job in ["email", "pdf", "sms"]:
            await queue.put(job)
        await queue.put(None)
    async def consumer():
        while (job := await queue.get()) is not None:
            print("processing", job)
    await asyncio.gather(producer(), consumer())

await main()          # asyncio.run(main()) in a normal script` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'concurrency', q: 'Which tool fits CPU-bound pure-Python work best?', options: ['threading', 'asyncio', 'multiprocessing', 'time.sleep'], answer: 2, explain: 'Processes run on several cores, each with its own GIL.' },
    { chapterId: 'concurrency', q: 'What does the GIL limit in standard CPython?', options: ['The number of files', 'Only one thread executes Python bytecode at a time', 'Memory to 4 GB', 'The number of processes'], answer: 1, explain: 'I/O waits release the GIL, so threads still help for I/O.' },
    { chapterId: 'concurrency', q: 'What does await do inside an async function?', options: ['Blocks the whole program', 'Pauses this coroutine so others can run until the result is ready', 'Starts a new thread', 'Creates a process'], answer: 1, explain: 'Cooperative multitasking on one thread.' },
    { chapterId: 'concurrency', q: 'What does asyncio.gather(a(), b(), c()) do?', options: ['Runs them one after another', 'Runs them concurrently and returns all results', 'Runs only the first', 'Creates threads'], answer: 1, explain: 'Total time is roughly the slowest task.' },
    { chapterId: 'concurrency', q: 'Why is time.sleep() bad inside async code?', options: ['It is deprecated', 'It blocks the event loop and freezes all tasks', 'It sleeps too long', 'It raises an error'], answer: 1, explain: 'Use await asyncio.sleep() instead.' },
    { chapterId: 'concurrency', q: 'Why is if __name__ == "__main__": needed with multiprocessing?', options: ['For speed', 'Child processes import the module; without the guard they would start processes again', 'It is a style rule', 'To enable threads'], answer: 1, explain: 'Especially on Windows and macOS (spawn start method).' },
    { chapterId: 'concurrency', q: 'How do you limit asyncio to 3 requests at a time?', options: ['asyncio.Lock()', 'asyncio.Semaphore(3)', 'Three event loops', 'time.sleep(3)'], answer: 1, explain: 'async with sem: allows at most 3 holders.' },
  ],
};
