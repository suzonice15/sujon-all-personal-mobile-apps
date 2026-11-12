// Go interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Go?',
      a: 'A compiled, statically typed language from Google designed for simple, fast and concurrent software. It produces a single binary and includes a strong standard library.',
      level: 'basic',
    },
    {
      q: 'Why does Go compile so quickly?',
      a: 'The language is small, dependencies are explicit, and the compiler does not allow unused imports or cycles. The design keeps compilation predictable.',
      level: 'intermediate',
    },
    {
      q: 'What is a module?',
      a: 'A collection of packages with a go.mod file that records the module path and dependencies.',
      level: 'basic',
    },
    {
      q: 'Why is gofmt part of the toolchain?',
      a: 'A single standard format removes style debates and keeps diffs focused on logic.',
      level: 'basic',
    },
  ],
  'syntax-types': [
    {
      q: 'var versus :=?',
      a: 'var declares with an explicit type and works at package level. := declares and assigns inside a function and infers the type.',
      level: 'basic',
    },
    {
      q: 'What is a zero value?',
      a: 'The default value of a declared variable: 0 for numbers, false for bool, "" for string, nil for pointers, slices, maps and interfaces.',
      level: 'basic',
    },
    {
      q: 'What is iota?',
      a: 'A counter inside a const block that increments for each line, commonly used to create enum-like constants.',
      level: 'intermediate',
    },
    {
      q: 'Why is Go strict about conversions?',
      a: 'It prevents accidental precision loss and type confusion. You must convert explicitly, and strings and numbers need strconv.',
      level: 'intermediate',
    },
  ],
  'control-flow': [
    {
      q: 'Does Go have a while loop?',
      a: 'No. for condition { } is the while loop. The single for keyword covers classic, conditional and infinite loops.',
      level: 'basic',
    },
    {
      q: 'What does range give for a slice and a map?',
      a: 'For a slice it gives index and value. For a map it gives key and value. Use _ to ignore the part you do not need.',
      level: 'basic',
    },
    {
      q: 'Does switch fall through automatically?',
      a: 'No. Each case ends unless you use fallthrough explicitly, which is rare.',
      level: 'intermediate',
    },
    {
      q: 'What is a variable declared in an if statement scoped to?',
      a: 'The if and its else branches. It is not visible after the statement.',
      level: 'intermediate',
    },
  ],
  functions: [
    {
      q: 'How does Go handle errors?',
      a: 'As ordinary return values, usually the last result. The caller checks err != nil. There are no exceptions for normal failures.',
      level: 'basic',
    },
    {
      q: 'What is a variadic function?',
      a: 'A function whose last parameter is ...T. It accepts any number of arguments, which arrive as a slice.',
      level: 'basic',
    },
    {
      q: 'What does defer do?',
      a: 'It schedules a call to run when the surrounding function returns. Deferred calls run in reverse order and are used for cleanup.',
      level: 'intermediate',
    },
    {
      q: 'What is a closure?',
      a: 'A function value that captures variables from its surrounding scope. The captured variables stay alive as long as the closure does.',
      level: 'intermediate',
    },
  ],
  'structs-methods': [
    {
      q: 'Value receiver versus pointer receiver?',
      a: 'A value receiver gets a copy and cannot modify the original. A pointer receiver can mutate the struct. Be consistent across a type.',
      level: 'intermediate',
    },
    {
      q: 'What is embedding?',
      a: 'Putting a type inside a struct without a field name. Its fields and methods are promoted, giving composition without inheritance.',
      level: 'intermediate',
    },
    {
      q: 'What is a struct tag?',
      a: 'Metadata on a field, such as json:"id" or db:"user_id", read by encoding and ORM libraries via reflection.',
      level: 'basic',
    },
    {
      q: 'Why is positional struct initialization discouraged?',
      a: 'Adding or reordering a field silently breaks the literal. Named fields keep the code correct and readable.',
      level: 'advanced',
    },
  ],
  'interfaces-errors': [
    {
      q: 'How does a type implement an interface?',
      a: 'By defining all the methods. There is no implements keyword; satisfaction is implicit and checked at compile time.',
      level: 'basic',
    },
    {
      q: 'What is the error interface?',
      a: 'A built-in interface with Error() string. A nil error means success.',
      level: 'basic',
    },
    {
      q: 'How do you wrap an error?',
      a: 'fmt.Errorf("context: %w", err) preserves the cause so errors.Is and errors.As can inspect it.',
      level: 'intermediate',
    },
    {
      q: 'When should you panic?',
      a: 'For impossible programmer states or broken startup configuration, not for expected failures such as invalid input or missing records.',
      level: 'advanced',
    },
  ],
  'slices-maps': [
    {
      q: 'What is the difference between a slice and an array?',
      a: 'An array has a fixed size that is part of its type. A slice is a view with a length and capacity and can grow with append.',
      level: 'basic',
    },
    {
      q: 'How do you check whether a map key exists?',
      a: 'Use value, ok := m[key]. ok is false when the key is missing, even if the value type has a zero value.',
      level: 'basic',
    },
    {
      q: 'Why can two slices affect each other?',
      a: 'They may share the same backing array. copy() creates an independent slice.',
      level: 'intermediate',
    },
    {
      q: 'Are maps safe for concurrent use?',
      a: 'No. Concurrent writes can crash. Protect them with a mutex or use sync.Map for specific patterns.',
      level: 'advanced',
    },
  ],
  concurrency: [
    {
      q: 'What is a goroutine?',
      a: 'A lightweight concurrent function managed by the Go runtime. It is much cheaper than an OS thread.',
      level: 'basic',
    },
    {
      q: 'What is an unbuffered channel?',
      a: 'A channel with no buffer. A send blocks until a receiver is ready, which synchronizes the two goroutines.',
      level: 'intermediate',
    },
    {
      q: 'Who closes a channel?',
      a: 'The sender. Closing from the receiver can panic when the sender writes. Sending on a closed channel also panics.',
      level: 'intermediate',
    },
    {
      q: 'What does select do?',
      a: 'It waits on several channel operations and runs the first ready one. A default case makes it non-blocking.',
      level: 'advanced',
    },
  ],
  'packages-testing': [
    {
      q: 'What makes an identifier exported?',
      a: 'A capital first letter. Lowercase names are private to the package.',
      level: 'basic',
    },
    {
      q: 'What is a table-driven test?',
      a: 'A slice of input/expected cases run in a loop with t.Run, which covers many scenarios without duplicating code.',
      level: 'intermediate',
    },
    {
      q: 'How do you detect data races?',
      a: 'Run go test -race ./... or build with -race. The detector reports concurrent unsynchronized access.',
      level: 'advanced',
    },
    {
      q: 'How do you test an HTTP handler?',
      a: 'Use httptest.NewRecorder and httptest.NewRequest, call the handler, then assert the status, headers and body.',
      level: 'intermediate',
    },
  ],
  'http-api': [
    {
      q: 'Which package provides the HTTP server?',
      a: 'net/http. It includes the server, client, mux and common helpers.',
      level: 'basic',
    },
    {
      q: 'Why set Content-Type before writing JSON?',
      a: 'The client needs to know how to parse the body. Without it, some clients treat the response as plain text.',
      level: 'basic',
    },
    {
      q: 'What is middleware?',
      a: 'A function that wraps a handler to add logging, auth, headers or recovery. It composes small concerns around the core handler.',
      level: 'intermediate',
    },
    {
      q: 'Why implement graceful shutdown?',
      a: 'On SIGTERM it stops accepting new requests and lets in-flight work finish, so a deploy does not drop requests.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you structure a Go API project?',
      a: 'cmd for entry points, internal for handlers, services and storage, and a small main that wires dependencies. Keep handlers thin.',
      level: 'intermediate',
    },
    {
      q: 'How do you protect shared state in a handler?',
      a: 'Use a mutex or a channel. HTTP handlers run concurrently, so a plain map or slice is a data race.',
      level: 'intermediate',
    },
    {
      q: 'What should a CLI return on failure?',
      a: 'A non-zero exit code and a clear message on stderr. Scripts and CI depend on the code.',
      level: 'basic',
    },
    {
      q: 'What makes Go code easy to review?',
      a: 'Small functions, explicit errors, small interfaces, consistent formatting and tests for the important behaviour.',
      level: 'advanced',
    },
  ],
};
