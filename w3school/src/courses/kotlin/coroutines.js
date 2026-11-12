// Kotlin chapter: Coroutines.

export default {
  id: 'coroutines',
  title: 'Coroutines',
  description: 'Async work without callback hell',
  icon: 'sync',
  lessons: [
    {
      id: 'kotlin-suspend',
      title: 'suspend functions',
      blocks: [
        { type: 'text', value: 'A suspend function can pause without blocking a thread. The compiler turns it into a state machine. Call it from another suspend function or a coroutine builder.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking

suspend fun fetchTitle(): String {
    delay(100)
    return "Kotlin"
}

fun main() = runBlocking {
    println(fetchTitle())
}` },
        { type: 'note', value: 'suspend does not mean "on another thread". It means the function can yield while waiting. Use withContext(Dispatchers.IO) for blocking I/O.' },
      ],
    },
    {
      id: 'kotlin-scopes',
      title: 'Scopes and builders',
      blocks: [
        { type: 'text', value: 'launch starts a job and returns immediately. async returns a Deferred whose result you await. A CoroutineScope controls lifetime and cancellation.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val a = async { fetch("A") }
    val b = async { fetch("B") }
    println(a.await() + b.await())
}

suspend fun fetch(name: String): String {
    delay(100)
    return name
}` },
        { type: 'note', value: 'On Android, use viewModelScope or lifecycleScope so work is cancelled when the screen goes away. Never use GlobalScope for UI work.' },
      ],
    },
    {
      id: 'kotlin-cancel',
      title: 'Cancellation and dispatchers',
      blocks: [
        { type: 'text', value: 'Coroutines are cooperative: they must check for cancellation or call a suspend function. Dispatchers decide which thread pool runs the work.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch(Dispatchers.Default) {
        repeat(1000) { i ->
            if (!isActive) return@launch
            delay(10)
        }
    }

    delay(50)
    job.cancelAndJoin()
    println("cancelled")
}` },
        { type: 'note', value: 'Dispatchers.IO for blocking I/O, Default for CPU work, Main for UI. Switching context with withContext keeps the code readable.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'coroutines',
      q: 'What does suspend mean?',
      options: ['Runs on another thread', 'Can pause without blocking a thread', 'Stops the app', 'Creates a new process'],
      answer: 1,
      explain: 'It yields while waiting.',
    },
    {
      chapterId: 'coroutines',
      q: 'What does async return?',
      options: ['A Job', 'A Deferred', 'A Thread', 'A String'],
      answer: 1,
      explain: 'You call await() to get the result.',
    },
    {
      chapterId: 'coroutines',
      q: 'Which dispatcher suits blocking I/O?',
      options: ['Main', 'IO', 'Default', 'Unconfined'],
      answer: 1,
      explain: 'Dispatchers.IO is for files and network.',
    },
  ],
};
