// Go chapter: Concurrency.

export default {
  id: 'concurrency',
  title: 'Concurrency',
  description: 'Goroutines, channels, select and context',
  icon: 'sync',
  lessons: [
    {
      id: 'go-goroutines',
      title: 'Goroutines',
      blocks: [
        { type: 'text', value: 'A goroutine is a lightweight thread managed by the Go runtime. Start one with go f(). They are cheap; thousands can run at once.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    wg.Add(2)

    go func() {
        defer wg.Done()
        fmt.Println("first")
    }()

    go func() {
        defer wg.Done()
        fmt.Println("second")
    }()

    wg.Wait()
}` },
        { type: 'note', value: 'main does not wait for goroutines. Use a WaitGroup or a channel to know when they finish.' },
      ],
    },
    {
      id: 'go-channels',
      title: 'Channels',
      blocks: [
        { type: 'text', value: 'A channel sends values between goroutines. An unbuffered send blocks until someone receives. A buffered channel can hold a few values before blocking.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func main() {
    results := make(chan int, 2)

    go func() { results <- 10 }()
    go func() { results <- 20 }()

    fmt.Println(<-results)
    fmt.Println(<-results)
    close(results)
}` },
        { type: 'note', value: 'The sender closes a channel, never the receiver. Sending on a closed channel panics.' },
      ],
    },
    {
      id: 'go-select',
      title: 'select',
      blocks: [
        { type: 'text', value: 'select waits on several channel operations and runs the first one that is ready. A default case makes it non-blocking.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import (
    "fmt"
    "time"
)

func main() {
    fast := make(chan string)
    slow := make(chan string)

    go func() { time.Sleep(10 * time.Millisecond); fast <- "fast" }()
    go func() { time.Sleep(50 * time.Millisecond); slow <- "slow" }()

    select {
    case msg := <-fast:
        fmt.Println(msg)
    case msg := <-slow:
        fmt.Println(msg)
    case <-time.After(100 * time.Millisecond):
        fmt.Println("timeout")
    }
}` },
        { type: 'note', value: 'select with time.After is the standard way to add a timeout to a channel operation.' },
      ],
    },
    {
      id: 'go-context-mutex',
      title: 'Context and mutex',
      blocks: [
        { type: 'text', value: 'context carries cancellation and deadlines across API calls. sync.Mutex protects shared state. Never copy a mutex after use.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import (
    "context"
    "fmt"
    "sync"
    "time"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
    defer cancel()

    var mu sync.Mutex
    count := 0

    var wg sync.WaitGroup
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            mu.Lock()
            count++
            mu.Unlock()
        }()
    }
    wg.Wait()

    select {
    case <-ctx.Done():
        fmt.Println("done", count)
    }
}` },
        { type: 'note', value: 'Pass ctx as the first parameter to functions that do I/O. Check ctx.Err() or select on ctx.Done() in long operations.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'concurrency',
      q: 'How do you start a goroutine?',
      options: ['go f()', 'async f()', 'thread f()', 'new f()'],
      answer: 0,
      explain: 'The go keyword runs the call concurrently.',
    },
    {
      chapterId: 'concurrency',
      q: 'What does an unbuffered send do?',
      options: ['Returns immediately', 'Blocks until a receiver is ready', 'Panics', 'Creates a file'],
      answer: 1,
      explain: 'Send and receive must meet.',
    },
    {
      chapterId: 'concurrency',
      q: 'Who should close a channel?',
      options: ['The receiver', 'The sender', 'The runtime', 'Anyone'],
      answer: 1,
      explain: 'The sender owns the channel lifetime.',
    },
    {
      chapterId: 'concurrency',
      q: 'What is context for?',
      options: ['Styling', 'Cancellation and deadlines', 'Logging only', 'Compiling'],
      answer: 1,
      explain: 'It propagates cancellation across calls.',
    },
  ],
};
