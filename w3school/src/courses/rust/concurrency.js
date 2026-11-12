// Rust chapter: Concurrency.

export default {
  id: 'concurrency',
  title: 'Concurrency & Async',
  description: 'Threads, channels, Arc, Mutex and async',
  icon: 'sync',
  lessons: [
    {
      id: 'rust-threads',
      title: 'Threads and channels',
      blocks: [
        { type: 'text', value: 'std::thread::spawn starts a new OS thread. Channels send messages between threads. The borrow checker prevents data races, so many Rust concurrency bugs are caught at compile time.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `use std::thread;
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        tx.send("hello from the thread").unwrap();
    });

    println!("{}", rx.recv().unwrap());
}` },
        { type: 'note', value: 'move transfers ownership of the closure variables into the thread. The compiler checks that the data lives long enough for the thread.' },
      ],
    },
    {
      id: 'rust-shared-state',
      title: 'Shared state with Arc and Mutex',
      blocks: [
        { type: 'text', value: 'Arc is an atomic reference counter for sharing ownership across threads. Mutex gives one thread at a time access to the inner data. Combining them, Arc<Mutex<T>>, is the standard way to share mutable state.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        }));
    }

    for h in handles { h.join().unwrap(); }
    println!("result: {}", *counter.lock().unwrap());
}` },
        { type: 'note', value: 'The Mutex lock is released when the guard goes out of scope. Poisoning: if a thread panics while holding the lock, the next lock call returns an error.' },
      ],
    },
    {
      id: 'rust-async',
      title: 'Async and await',
      blocks: [
        { type: 'text', value: 'async functions return a Future. await suspends until the future is ready, without blocking the thread. An async runtime such as Tokio drives the futures and schedules them on a thread pool.' },
        { type: 'code', lang: 'rust', tryIt: false, value: `// Cargo.toml: tokio = { version = "1", features = ["full"] }

use tokio::time::{sleep, Duration};

async fn fetch_title() -> String {
    sleep(Duration::from_millis(100)).await;
    "Rust".to_string()
}

#[tokio::main]
async fn main() {
    let title = fetch_title().await;
    println!("{}", title);
}` },
        { type: 'note', value: 'Futures are lazy: nothing runs until an executor polls them. await is the point where the runtime can switch to another task.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'concurrency',
      q: 'What does Arc provide?',
      options: ['A mutex', 'Atomic reference counting for shared ownership across threads', 'A channel', 'A thread pool'],
      answer: 1,
      explain: 'Arc lets multiple threads share ownership safely.',
    },
    {
      chapterId: 'concurrency',
      q: 'What does Mutex guarantee?',
      options: ['No locking needed', 'Only one thread at a time accesses the inner data', 'Data is copied', 'Threads never wait'],
      answer: 1,
      explain: 'Mutex gives exclusive access to the inner value.',
    },
    {
      chapterId: 'concurrency',
      q: 'What is a Future in async Rust?',
      options: ['A thread', 'A value that may be ready later', 'A macro', 'A mutex'],
      answer: 1,
      explain: 'A Future represents a computation that may complete later.',
    },
    {
      chapterId: 'concurrency',
      q: 'What does await do?',
      options: ['Blocks the thread forever', 'Suspends until the future is ready without blocking the thread', 'Starts a new thread', 'Panics on error'],
      answer: 1,
      explain: 'await yields control so other tasks can run.',
    },
  ],
};
