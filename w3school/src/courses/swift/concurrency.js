// Swift chapter: Concurrency.

export default {
  id: 'concurrency',
  title: 'Concurrency',
  description: 'async and await, tasks and actors',
  icon: 'sync',
  lessons: [
    {
      id: 'swift-async-await',
      title: 'async and await',
      blocks: [
        { type: 'text', value: 'An async function can suspend while waiting for work to finish, such as a network call, without blocking the thread. await marks the suspension point. The compiler checks that async code is called in an async context.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `func fetchTitle() async -> String {
    try? await Task.sleep(nanoseconds: 100_000_000)
    return "Swift"
}

func load() async {
    let title = await fetchTitle()
    print(title)
}

Task {
    await load()
}` },
        { type: 'note', value: 'async functions are not threads. They run on a cooperative thread pool managed by the system, which suspends and resumes them at await points.' },
      ],
    },
    {
      id: 'swift-tasks',
      title: 'Tasks and structured concurrency',
      blocks: [
        { type: 'text', value: 'Task starts concurrent work. TaskGroup runs several tasks together and waits for all of them. Structured concurrency means a parent task waits for its children, so a cancelled parent cancels its children too.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `func fetchAll() async -> [String] {
    await withTaskGroup(of: String.self) { group in
        group.addTask { await fetchTitle() }
        group.addTask { await fetchTitle() }
        var results: [String] = []
        for await title in group {
            results.append(title)
        }
        return results
    }
}` },
        { type: 'note', value: 'Prefer structured concurrency. Detached tasks are harder to cancel and can outlive the scope that created them.' },
      ],
    },
    {
      id: 'swift-actors',
      title: 'Actors and data races',
      blocks: [
        { type: 'text', value: 'An actor is a reference type that protects its mutable state. Only one task at a time can access an actor\'s state, so data races are impossible by construction. Cross-actor calls are async.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `actor Counter {
    private var value = 0

    func increment() { value += 1 }
    func current() -> Int { value }
}

let counter = Counter()
Task {
    await counter.increment()
    print(await counter.current())
}` },
        { type: 'list', items: [
          'Actor methods that touch state are implicitly async',
          'An actor isolates its state from the rest of the program',
          'MainActor runs UI work on the main thread',
          '@MainActor marks code that must run on the main thread',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'concurrency',
      q: 'What does await do?',
      options: ['Blocks the thread', 'Suspends until the async work finishes, without blocking', 'Starts a new thread', 'Cancels the task'],
      answer: 1,
      explain: 'await marks a suspension point.',
    },
    {
      chapterId: 'concurrency',
      q: 'What is an actor?',
      options: ['A function', 'A reference type that isolates its mutable state', 'A protocol', 'A view'],
      answer: 1,
      explain: 'Actors prevent data races by serializing access.',
    },
    {
      chapterId: 'concurrency',
      q: 'What is structured concurrency?',
      options: ['Tasks that never end', 'A parent waits for its child tasks and cancels them together', 'Threads that share memory', 'A build setting'],
      answer: 1,
      explain: 'Parent and child tasks share a lifetime.',
    },
    {
      chapterId: 'concurrency',
      q: 'Which attribute marks code that must run on the main thread?',
      options: ['@MainActor', '@Thread', '@UI', '@Main'],
      answer: 0,
      explain: '@MainActor ensures main-thread execution.',
    },
  ],
};
