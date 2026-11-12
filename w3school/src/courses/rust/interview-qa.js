// Rust interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'Why is Rust memory safe without a garbage collector?',
      a: 'Ownership and borrowing are checked at compile time. The compiler rejects code that could cause a use-after-free, a double free or a data race.',
      level: 'basic',
    },
    {
      q: 'What is a macro in Rust?',
      a: 'Code that generates code at compile time, called with ! such as println!. Macros can take a variable number of arguments.',
      level: 'basic',
    },
    {
      q: 'Are variables mutable by default?',
      a: 'No. A binding is immutable unless declared with mut, which lets you reassign it.',
      level: 'basic',
    },
    {
      q: 'What does rustup do?',
      a: 'It installs and manages the Rust toolchain, including rustc, cargo and updates, across platforms.',
      level: 'basic',
    },
  ],
  ownership: [
    {
      q: 'What are the three ownership rules?',
      a: 'Each value has one owner. When the owner goes out of scope the value is dropped. Assignment moves ownership unless the type implements Copy.',
      level: 'basic',
    },
    {
      q: 'What is a move?',
      a: 'Transferring ownership of a value to a new binding, after which the old binding is no longer usable. This is how memory is freed without a garbage collector.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between &T and &mut T?',
      a: 'An immutable reference &T allows many readers. A mutable reference &mut T gives one writer exclusive access, and cannot overlap with any other borrow.',
      level: 'basic',
    },
    {
      q: 'What does the borrow checker prevent?',
      a: 'Data races, use-after-free and dangling references, by ensuring borrows do not overlap in unsafe ways.',
      level: 'intermediate',
    },
  ],
  'structs-enums': [
    {
      q: 'What is Option<T>?',
      a: 'An enum representing a value that may be Some(value) or None. It replaces null and the compiler forces you to handle both cases.',
      level: 'basic',
    },
    {
      q: 'What is Result<T, E>?',
      a: 'An enum for recoverable errors: Ok(T) on success and Err(E) on failure. It is how Rust returns errors without exceptions.',
      level: 'basic',
    },
    {
      q: 'Why must match be exhaustive?',
      a: 'So you cannot forget a case. The compiler rejects a match that does not cover every variant.',
      level: 'intermediate',
    },
    {
      q: 'Where do methods of a struct live?',
      a: 'In an impl block attached to the type. Associated functions such as new do not take self.',
      level: 'basic',
    },
  ],
  'error-handling': [
    {
      q: 'What does the ? operator do?',
      a: 'It returns the error early from the current function if the Result is Err, otherwise it unwraps the Ok value. It keeps the happy path flat.',
      level: 'basic',
    },
    {
      q: 'When should you panic?',
      a: 'For unrecoverable bugs and broken invariants. For recoverable errors the caller can handle, return a Result.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between unwrap and expect?',
      a: 'Both panic on Err. expect adds a custom message, which makes the failure easier to diagnose.',
      level: 'basic',
    },
    {
      q: 'Why define a custom error type?',
      a: 'So callers can match on specific failure kinds and handle them differently. Crates such as thiserror reduce the boilerplate.',
      level: 'advanced',
    },
  ],
  collections: [
    {
      q: 'String versus &str?',
      a: 'String owns its data on the heap and can grow. &str is a borrowed slice. Most functions take &str so they work with both.',
      level: 'basic',
    },
    {
      q: 'When does an iterator chain run?',
      a: 'Lazily. Nothing executes until a consumer such as collect or sum asks for a result.',
      level: 'intermediate',
    },
    {
      q: 'Which iterator consumes the original collection?',
      a: 'into_iter takes ownership. iter borrows and iter_mut borrows mutably.',
      level: 'intermediate',
    },
    {
      q: 'Why prefer &str in parameters?',
      a: 'A &str parameter accepts both String and &str, so callers do not have to convert.',
      level: 'basic',
    },
  ],
  traits: [
    {
      q: 'What is a trait?',
      a: 'A shared behaviour contract that types implement. It replaces inheritance with composition of behaviour.',
      level: 'basic',
    },
    {
      q: 'What does a trait bound do?',
      a: 'It constrains a generic type, such as T: Display, requiring the type to implement the trait.',
      level: 'intermediate',
    },
    {
      q: 'Why do generics have zero runtime cost?',
      a: 'They are monomorphized: the compiler generates a separate version for each concrete type used.',
      level: 'advanced',
    },
    {
      q: 'When use a trait object?',
      a: 'When you need to mix different types at runtime, such as a collection of different values behind one trait. It uses dynamic dispatch.',
      level: 'intermediate',
    },
  ],
  concurrency: [
    {
      q: 'What does Arc provide?',
      a: 'Atomic reference counting for shared ownership across threads. It is the thread-safe version of Rc.',
      level: 'basic',
    },
    {
      q: 'What does Mutex guarantee?',
      a: 'Only one thread at a time can access the inner data. The lock is released when the guard goes out of scope.',
      level: 'basic',
    },
    {
      q: 'What is a Future?',
      a: 'A value representing a computation that may complete later. Futures are lazy and need an executor to run.',
      level: 'intermediate',
    },
    {
      q: 'What does await do?',
      a: 'It suspends the current async function until the future is ready, yielding control to other tasks without blocking the thread.',
      level: 'intermediate',
    },
  ],
  'unsafe-memory': [
    {
      q: 'What is Rc<T>?',
      a: 'A single-thread reference-counted pointer for shared ownership. Use Arc for threads.',
      level: 'basic',
    },
    {
      q: 'What can an unsafe block do?',
      a: 'Dereference raw pointers, call unsafe functions, access mutable statics and implement unsafe traits. The safety contract is then your responsibility.',
      level: 'intermediate',
    },
    {
      q: 'Arc versus Rc?',
      a: 'Arc is thread-safe with atomic reference counting. Rc is faster but only safe in one thread.',
      level: 'intermediate',
    },
    {
      q: 'What does #[no_mangle] do?',
      a: 'It keeps the symbol name stable so C code can call the Rust function through FFI.',
      level: 'advanced',
    },
  ],
  cargo: [
    {
      q: 'What is Cargo?',
      a: 'The build system and package manager for Rust. It creates projects, builds, tests, manages dependencies and publishes crates.',
      level: 'basic',
    },
    {
      q: 'What does cargo check do?',
      a: 'Type-checks the code without producing a binary, which is much faster than a full build for feedback.',
      level: 'basic',
    },
    {
      q: 'Are items public by default?',
      a: 'No. Items are private unless marked pub.',
      level: 'basic',
    },
    {
      q: 'What do doc tests do?',
      a: 'Code examples in /// comments are compiled and run by cargo test --doc, so documentation stays correct.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'What makes a Rust project convincing?',
      a: 'A small working tool with tests and documentation, built end to end, with clear error handling.',
      level: 'basic',
    },
    {
      q: 'What is the best way to learn Rust?',
      a: 'Write small programs and read the compiler errors carefully. Each error teaches a rule, and the rules become natural over time.',
      level: 'basic',
    },
    {
      q: 'How do you verify a Rust implementation?',
      a: 'Write unit tests with #[test], use cargo test, and add doc examples that are compiled and run.',
      level: 'intermediate',
    },
    {
      q: 'What is a common beginner mistake?',
      a: 'Taking String by value when &str would do, which forces callers to convert and wastes allocations.',
      level: 'intermediate',
    },
  ],
};
