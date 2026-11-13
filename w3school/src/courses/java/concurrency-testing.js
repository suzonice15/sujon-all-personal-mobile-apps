// Java chapter: Concurrency & Testing.

export default {
  id: 'concurrency-testing',
  title: 'Concurrency & Testing',
  description: 'Executors, thread safety and JUnit',
  icon: 'sync',
  lessons: [
    {
      id: 'java-executors',
      title: 'Threads and executors',
      blocks: [
        { type: 'text', value: 'Create threads through an ExecutorService, not with new Thread per task. A pool bounds concurrency and returns Future handles for results.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.util.concurrent.ExecutorService;\nimport java.util.concurrent.Executors;\nimport java.util.concurrent.Future;\n\npublic class ExecutorDemo {\n    public static void main(String[] args) throws Exception {\n        ExecutorService pool = Executors.newFixedThreadPool(2);\n        try {\n            Future<Integer> result = pool.submit(() -> 21 * 2);\n            System.out.println(result.get());\n        } finally {\n            pool.shutdown();\n        }\n    }\n}` },
        { type: 'list', items: [
          'Bound the pool size',
          'Always shut the pool down',
          'Use Future.get with a timeout for external work',
          'Use virtual threads in Java 21 for blocking I/O',
        ] },
        { type: 'note', value: 'A pool that is never shut down keeps the JVM alive. Tests hang because of this more often than any other reason.' },
      ],
    },
    {
      id: 'java-thread-safety',
      title: 'Thread safety',
      blocks: [
        { type: 'text', value: 'Shared mutable state needs a lock or an atomic type. Prefer immutable objects and concurrent collections over manual synchronization.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.util.concurrent.ConcurrentHashMap;\nimport java.util.concurrent.atomic.AtomicInteger;\n\npublic class ConcurrentDemo {\n    private static final AtomicInteger counter = new AtomicInteger();\n\n    public static void main(String[] args) throws InterruptedException {\n        ConcurrentHashMap<String, Integer> visits = new ConcurrentHashMap<>();\n        Runnable task = () -> {\n            counter.incrementAndGet();\n            visits.merge("home", 1, Integer::sum);\n        };\n\n        Thread a = new Thread(task);\n        Thread b = new Thread(task);\n        a.start();\n        b.start();\n        a.join();\n        b.join();\n\n        System.out.println(counter.get());\n        System.out.println(visits.get("home"));\n    }\n}` },
        { type: 'note', value: 'count++ on a shared int is not atomic. Use AtomicInteger or guard it with a lock.' },
      ],
    },
    {
      id: 'java-junit',
      title: 'Testing with JUnit',
      blocks: [
        { type: 'text', value: 'JUnit 5 is the standard test framework. A test method is annotated with @Test and asserts with Assertions. Maven or Gradle runs the suite.' },
        { type: 'code', lang: 'java', tryIt: false, compile: false, value: `import org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.assertEquals;\nimport static org.junit.jupiter.api.Assertions.assertThrows;\n\nclass PriceTest {\n    @Test\n    void appliesDiscount() {\n        assertEquals(900, Price.apply(1000, 10));\n    }\n\n    @Test\n    void rejectsInvalidPercent() {\n        assertThrows(IllegalArgumentException.class,\n            () -> Price.apply(1000, 120));\n    }\n}` },
        { type: 'code', lang: 'java', tryIt: false, value: `public class AssertDemo {\n    static int apply(int price, int percent) {\n        if (percent < 0 || percent > 100) {\n            throw new IllegalArgumentException("percent");\n        }\n        return price * (100 - percent) / 100;\n    }\n\n    public static void main(String[] args) {\n        if (apply(1000, 10) != 900) throw new AssertionError("discount");\n        try {\n            apply(1000, 120);\n            throw new AssertionError("should reject");\n        } catch (IllegalArgumentException expected) {\n            System.out.println("ok");\n        }\n    }\n}` },
        { type: 'list', items: [
          'One behaviour per test',
          'Test the public API, not private fields',
          'Use assertThrows for error paths',
          'Keep tests fast and independent',
          'Run tests on every commit',
        ] },
        { type: 'note', value: 'A test with a Thread.sleep is a timing guess. Wait on a condition or inject a clock.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'concurrency-testing',
      q: 'Why use an ExecutorService?',
      options: ['To create unlimited threads', 'To bound and reuse threads', 'To avoid exceptions', 'To cache results'],
      answer: 1,
      explain: 'A pool bounds concurrency.',
    },
    {
      chapterId: 'concurrency-testing',
      q: 'Which type is atomic for a counter?',
      options: ['int', 'AtomicInteger', 'String', 'List'],
      answer: 1,
      explain: 'AtomicInteger is thread-safe.',
    },
    {
      chapterId: 'concurrency-testing',
      q: 'What does a ConcurrentHashMap allow?',
      options: ['Only reads', 'Safe concurrent access', 'No null keys only', 'No threads'],
      answer: 1,
      explain: 'It is thread-safe for concurrent use.',
    },
    {
      chapterId: 'concurrency-testing',
      q: 'How do you assert an exception in JUnit 5?',
      options: ['try/catch only', 'assertThrows', 'assertTrue', '@Ignore'],
      answer: 1,
      explain: 'assertThrows checks the exception type.',
    },
  ],
};
