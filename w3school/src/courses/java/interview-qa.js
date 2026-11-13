// Java interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is the difference between JDK, JRE and JVM?',
      a: 'JVM executes bytecode. JRE is the JVM plus core libraries needed to run Java. JDK is the JRE plus the compiler and development tools.',
      level: 'basic',
    },
    {
      q: 'Why is Java called platform independent?',
      a: 'Source compiles to bytecode, and each platform has a JVM that runs that bytecode. The same .class file works on Windows, Linux and macOS.',
      level: 'basic',
    },
    {
      q: 'What is the classpath?',
      a: 'The list of directories and jars where the JVM looks for classes. A wrong classpath is the usual cause of ClassNotFoundException.',
      level: 'intermediate',
    },
    {
      q: 'What is bytecode?',
      a: 'An intermediate instruction set produced by javac. It is not machine code; the JVM interprets or JIT-compiles it for the host CPU.',
      level: 'intermediate',
    },
  ],
  'variables-types': [
    {
      q: 'What are the primitive types in Java?',
      a: 'byte, short, int, long, float, double, char and boolean. They are not objects and cannot be null.',
      level: 'basic',
    },
    {
      q: 'Why is String immutable?',
      a: 'Immutability makes strings safe to share, usable as map keys, and thread-safe. It also allows the string pool to reuse literals.',
      level: 'intermediate',
    },
    {
      q: 'What is autoboxing?',
      a: 'Automatic conversion between a primitive and its wrapper class, for example int to Integer. It can cause subtle bugs when comparing wrapper objects with ==.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between final, finally and finalize?',
      a: 'final prevents reassignment, overriding or extension. finally is a block that always runs. finalize was a deprecated GC hook; use try-with-resources instead.',
      level: 'advanced',
    },
  ],
  'operators-control': [
    {
      q: 'What is integer division?',
      a: 'Dividing two integers drops the fractional part: 7 / 3 is 2. Cast one operand to double for a decimal result.',
      level: 'basic',
    },
    {
      q: 'What does short-circuit evaluation mean?',
      a: 'In a && b, if a is false, b is not evaluated. In a || b, if a is true, b is not evaluated.',
      level: 'basic',
    },
    {
      q: 'What is the difference between break and continue?',
      a: 'break exits the loop. continue skips the rest of the current iteration and moves to the next one.',
      level: 'basic',
    },
    {
      q: 'Why prefer the arrow switch form?',
      a: 'It has no fall-through, so it avoids a whole class of bugs, and it can be used as an expression in modern Java.',
      level: 'intermediate',
    },
  ],
  methods: [
    {
      q: 'Is Java pass-by-value or pass-by-reference?',
      a: 'Pass-by-value always. Primitives are copied. Object references are copied too, but both copies point to the same object, so mutations are visible.',
      level: 'intermediate',
    },
    {
      q: 'What is method overloading?',
      a: 'Several methods with the same name but different parameter lists. The compiler chooses at compile time.',
      level: 'basic',
    },
    {
      q: 'What is recursion and its risk?',
      a: 'A method calling itself with a smaller input and a base case. Deep recursion uses stack space and can throw StackOverflowError.',
      level: 'intermediate',
    },
    {
      q: 'Can you overload by return type only?',
      a: 'No. The parameter list must differ. Return type is not part of the method signature for overloading.',
      level: 'advanced',
    },
  ],
  'arrays-strings': [
    {
      q: 'What is the difference between an array and an ArrayList?',
      a: 'An array has a fixed size and can hold primitives. ArrayList is resizable, holds objects, and provides methods such as add and remove.',
      level: 'basic',
    },
    {
      q: 'Why use StringBuilder?',
      a: 'Strings are immutable, so repeated concatenation creates many objects. StringBuilder appends to one mutable buffer in linear time.',
      level: 'intermediate',
    },
    {
      q: 'How do you compare strings?',
      a: 'Use equals for content and equalsIgnoreCase for case-insensitive comparison. == compares references.',
      level: 'basic',
    },
    {
      q: 'What happens when an array index is out of range?',
      a: 'The JVM throws ArrayIndexOutOfBoundsException at runtime. Validate the index or use a collection with get and a bounds check.',
      level: 'basic',
    },
  ],
  'classes-objects': [
    {
      q: 'What is encapsulation?',
      a: 'Keeping fields private and exposing behaviour through methods, so the class controls its own state and invariants.',
      level: 'basic',
    },
    {
      q: 'What is the difference between a class and an object?',
      a: 'A class is a blueprint. An object is an instance created with new, with its own field values.',
      level: 'basic',
    },
    {
      q: 'Why override hashCode when overriding equals?',
      a: 'HashMap and HashSet use hashCode to find the bucket and equals to confirm. Equal objects must have equal hash codes, otherwise lookups fail.',
      level: 'advanced',
    },
    {
      q: 'What does the static keyword mean?',
      a: 'The member belongs to the class rather than an instance. Static methods cannot use this and cannot access instance fields directly.',
      level: 'intermediate',
    },
  ],
  'inheritance-polymorphism': [
    {
      q: 'What is the difference between overloading and overriding?',
      a: 'Overloading is same name, different parameters, chosen at compile time. Overriding is a subclass replacing a parent method, chosen at runtime by dynamic dispatch.',
      level: 'intermediate',
    },
    {
      q: 'Why is Java single inheritance for classes?',
      a: 'It avoids the diamond problem of ambiguous state. A class can still implement many interfaces, which provides multiple inheritance of type.',
      level: 'intermediate',
    },
    {
      q: 'What does the @Override annotation do?',
      a: 'It asks the compiler to verify that the method really overrides a parent method. A typo becomes a compile error instead of a silent new method.',
      level: 'basic',
    },
    {
      q: 'When should you prefer composition over inheritance?',
      a: 'When the relationship is "has a" rather than "is a", or when the parent implementation is not designed for extension. Composition is more flexible and avoids fragile base classes.',
      level: 'advanced',
    },
  ],
  interfaces: [
    {
      q: 'What is an interface?',
      a: 'A contract of methods a class must provide. It enables polymorphism across unrelated classes and supports multiple implementation.',
      level: 'basic',
    },
    {
      q: 'What is a default method?',
      a: 'An interface method with a body. Implementations inherit it unless they override, which lets libraries evolve without breaking existing classes.',
      level: 'intermediate',
    },
    {
      q: 'Interface versus abstract class?',
      a: 'An interface is a pure contract, though it can have default and static methods. An abstract class can hold state and shared implementation. A class can implement many interfaces but extend one class.',
      level: 'intermediate',
    },
    {
      q: 'Why program to an interface?',
      a: 'Callers depend on behaviour instead of a concrete class, so implementations can be swapped and mocked in tests.',
      level: 'advanced',
    },
  ],
  collections: [
    {
      q: 'ArrayList versus LinkedList?',
      a: 'ArrayList has O(1) index access and good cache locality. LinkedList has O(1) insert or delete at a known node but O(n) index access and higher memory overhead. ArrayList is usually faster in practice.',
      level: 'intermediate',
    },
    {
      q: 'HashMap versus TreeMap?',
      a: 'HashMap is average O(1) and unordered. TreeMap is O(log n) and keeps keys sorted. Use TreeMap when order matters.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between HashSet and TreeSet?',
      a: 'HashSet is fast and unordered. TreeSet keeps sorted order and operations are O(log n).',
      level: 'basic',
    },
    {
      q: 'What happens if you modify a collection while iterating?',
      a: 'Most collections throw ConcurrentModificationException. Use Iterator.remove or collect the changes and apply them after the loop.',
      level: 'advanced',
    },
  ],
  exceptions: [
    {
      q: 'Checked versus unchecked exceptions?',
      a: 'Checked exceptions must be caught or declared and represent recoverable conditions. Unchecked exceptions extend RuntimeException and usually indicate programming bugs.',
      level: 'intermediate',
    },
    {
      q: 'What does finally guarantee?',
      a: 'It runs after try/catch, even when an exception is thrown or the method returns, unless the JVM exits or the thread is killed.',
      level: 'basic',
    },
    {
      q: 'What is try-with-resources?',
      a: 'A try block that automatically closes resources implementing AutoCloseable, in reverse order, even when an exception occurs.',
      level: 'intermediate',
    },
    {
      q: 'When should you create a custom exception?',
      a: 'When callers need to distinguish a domain failure, such as InsufficientFundsException, and handle it differently from a generic error.',
      level: 'advanced',
    },
  ],
  'generics-files': [
    {
      q: 'What is type erasure?',
      a: 'Generic type information is removed at compile time. The JVM sees raw types and inserted casts, so you cannot check T at runtime or create a generic array.',
      level: 'advanced',
    },
    {
      q: 'What is a bounded type parameter?',
      a: 'A constraint such as T extends Comparable<T>, which guarantees the methods the generic code calls are available.',
      level: 'intermediate',
    },
    {
      q: 'What is a stream?',
      a: 'A pipeline over a data source with intermediate operations such as filter and map, ended by a terminal operation such as collect. It is lazy until the terminal operation runs.',
      level: 'intermediate',
    },
    {
      q: 'How do you read a large file safely?',
      a: 'Use Files.lines or a BufferedReader with try-with-resources, so lines are processed incrementally instead of loading the whole file.',
      level: 'basic',
    },
  ],
  'project-interview': [
    {
      q: 'Why not store money in a double?',
      a: 'Floating point cannot represent every decimal exactly, so rounding errors accumulate. Use int paisa or BigDecimal.',
      level: 'basic',
    },
    {
      q: 'What is dependency injection?',
      a: 'Passing dependencies into a class instead of creating them inside. It makes the class testable and the implementation replaceable.',
      level: 'intermediate',
    },
    {
      q: 'How do you test a checked exception with JUnit?',
      a: 'Use assertThrows(InsufficientFundsException.class, () -> account.withdraw(150)) and then assert the state did not change.',
      level: 'basic',
    },
    {
      q: 'What makes a class easy to test?',
      a: 'Small public methods, dependencies passed in, no hidden global state, and behaviour expressed through return values or exceptions instead of side effects.',
      level: 'advanced',
    },
  ],
  'streams-lambdas': [
    {
      q: 'What is a functional interface?',
      a: 'An interface with exactly one abstract method, which a lambda can implement. Function, Predicate, Supplier and Consumer are the common ones.',
      level: 'basic',
    },
    {
      q: 'When does a stream run?',
      a: 'Nothing runs until the terminal operation. Intermediate steps are lazy and can be fused.',
      level: 'intermediate',
    },
    {
      q: 'map versus flatMap?',
      a: 'map transforms one element into one element. flatMap transforms one element into a stream and flattens the results.',
      level: 'intermediate',
    },
    {
      q: 'When not to use a stream?',
      a: 'For a simple loop with side effects or complex control flow, a loop is clearer and often faster. Streams suit transformations and aggregations.',
      level: 'advanced',
    },
  ],
  'concurrency-testing': [
    {
      q: 'Why use ExecutorService instead of new Thread?',
      a: 'A pool bounds concurrency, reuses threads and returns Future results. Spawning a thread per task does not scale.',
      level: 'basic',
    },
    {
      q: 'Why is count++ not thread-safe?',
      a: 'It is a read, add and write. Two threads can interleave and lose an update. Use AtomicInteger or a lock.',
      level: 'intermediate',
    },
    {
      q: 'What is a deadlock?',
      a: 'Two threads each hold a lock the other needs. Prevent it by taking locks in a consistent order and using timeouts.',
      level: 'intermediate',
    },
    {
      q: 'What is a good JUnit test?',
      a: 'One behaviour, a clear assertion, no shared state and no sleeps. Use assertThrows for error paths and inject a clock instead of waiting.',
      level: 'advanced',
    },
  ],
};
