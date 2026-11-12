// C# chapter: Async and Await.

export default {
  id: 'async-await',
  title: 'Async & Await',
  description: 'Keep apps responsive while waiting for I/O',
  icon: 'sync',
  lessons: [
    {
      id: 'cs-why-async',
      title: 'Why async matters',
      blocks: [
        { type: 'text', value: 'Waiting for a network, a database or a file takes time. If the app blocks that thread, the UI freezes. async/await lets the thread do other work while it waits.' },
        { type: 'list', items: [
          'Synchronous - the thread waits and does nothing',
          'Asynchronous - the thread is released while I/O happens',
          'async marks a method that may wait',
          'await pauses the method without blocking the thread',
        ] },
        { type: 'note', value: 'Async is about not wasting a thread while waiting. It does not make the network faster.' },
      ],
    },
    {
      id: 'cs-task-await',
      title: 'Task and await',
      blocks: [
        { type: 'text', value: 'A Task represents work that will finish later. await waits for the result without blocking. An async method returns Task or Task<T>.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        using var client = new HttpClient();
        string body = await client.GetStringAsync("https://example.com");
        Console.WriteLine(body.Length);
    }
}` },
        { type: 'note', value: 'The method name usually ends with Async by convention: GetStringAsync, ReadAsync, SaveAsync. It makes the call site obvious.' },
      ],
    },
    {
      id: 'cs-whenall',
      title: 'Task.WhenAll',
      blocks: [
        { type: 'text', value: 'When independent operations can run together, start them all and await them once. This reduces total waiting time.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        using var client = new HttpClient();

        var first = client.GetStringAsync("https://example.com/a");
        var second = client.GetStringAsync("https://example.com/b");

        string[] results = await Task.WhenAll(first, second);
        Console.WriteLine(results.Length);
    }
}` },
        { type: 'note', value: 'Only parallelise independent work. Running two writes to the same record at once creates races, not speed.' },
      ],
    },
    {
      id: 'cs-async-mistakes',
      title: 'Common mistakes',
      blocks: [
        { type: 'list', items: [
          'async void - cannot be awaited and exceptions are hard to catch',
          'Using .Result or .Wait() in UI code can deadlock',
          'Forgetting await makes the method return a Task, not the value',
          'Not passing CancellationToken leaves long work unstoppable',
          'Blocking Thread.Sleep instead of await Task.Delay',
        ] },
        { type: 'code', lang: 'csharp', tryIt: false, value: `// Good
await Task.Delay(1000);

// Bad in async code: blocks the thread
Thread.Sleep(1000);

// Bad: can deadlock in a UI app
var text = client.GetStringAsync(url).Result;` },
        { type: 'note', value: 'Use async all the way down. Mixing sync and async is where most deadlocks and freezes come from.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'async-await',
      q: 'What does await do?',
      options: ['Blocks the thread', 'Pauses the method without blocking the thread', 'Starts a new process', 'Deletes a task'],
      answer: 1,
      explain: 'It releases the thread while the work completes.',
    },
    {
      chapterId: 'async-await',
      q: 'What type does an async method usually return?',
      options: ['void always', 'Task or Task<T>', 'int', 'string'],
      answer: 1,
      explain: 'Task represents the pending work.',
    },
    {
      chapterId: 'async-await',
      q: 'Why avoid async void?',
      options: ['It is slower', 'It cannot be awaited and exceptions are hard to catch', 'It is not valid C#', 'It blocks the thread'],
      answer: 1,
      explain: 'Only event handlers should normally use async void.',
    },
    {
      chapterId: 'async-await',
      q: 'What does Task.WhenAll do?',
      options: ['Cancels tasks', 'Waits for several tasks together', 'Creates a thread', 'Blocks the UI'],
      answer: 1,
      explain: 'It runs independent work concurrently and awaits all of it.',
    },
  ],
};
