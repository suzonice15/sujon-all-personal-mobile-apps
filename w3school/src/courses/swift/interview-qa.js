// Swift & iOS interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Swift?',
      a: 'Apple\'s modern language for iOS, macOS, watchOS and tvOS. It is type safe, fast and removes null pointer crashes through optionals.',
      level: 'basic',
    },
    {
      q: 'What is SwiftUI?',
      a: 'A declarative UI framework. You describe the view tree and SwiftUI rebuilds it efficiently when state changes.',
      level: 'basic',
    },
    {
      q: 'How does Swift manage memory?',
      a: 'Automatic Reference Counting (ARC) frees objects when no references remain. Value types are copied, so they need no reference counting.',
      level: 'intermediate',
    },
    {
      q: 'Why are value types common in Swift?',
      a: 'They are copied on assignment, so they cannot be shared mutably by accident. That removes a whole class of bugs and makes code easier to reason about.',
      level: 'intermediate',
    },
  ],
  'syntax-types': [
    {
      q: 'What is an optional?',
      a: 'A type that may hold a value or nil. String? is an optional string. The compiler forces you to unwrap it safely.',
      level: 'basic',
    },
    {
      q: 'let versus var?',
      a: 'let declares a constant that cannot be reassigned. var declares a variable. Prefer let for safety and clarity.',
      level: 'basic',
    },
    {
      q: 'What does ?? do?',
      a: 'It unwraps an optional and returns a default value when the optional is nil.',
      level: 'basic',
    },
    {
      q: 'Does Swift convert numbers implicitly?',
      a: 'No. You must convert explicitly, for example Double(42). This avoids silent precision loss.',
      level: 'intermediate',
    },
  ],
  'control-flow': [
    {
      q: 'Does a Swift switch fall through?',
      a: 'No. Each case is separate and break is not needed. A switch must be exhaustive or have a default.',
      level: 'basic',
    },
    {
      q: 'What does guard let do?',
      a: 'It unwraps an optional and exits the current scope early if the value is nil, keeping the happy path un-indented.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between ... and ..<?',
      a: '... is a closed range that includes the end value. ..< is a half-open range that excludes it.',
      level: 'basic',
    },
    {
      q: 'What does repeat-while do?',
      a: 'It runs the body first and checks the condition afterward, so the body runs at least once.',
      level: 'basic',
    },
  ],
  'functions-closures': [
    {
      q: 'What does _ before a parameter name do?',
      a: 'It omits the argument label at the call site, so the caller writes add(2, 3) instead of add(a: 2, b: 3).',
      level: 'basic',
    },
    {
      q: 'What is a closure?',
      a: 'An inline function that can capture values from its surrounding scope. Swift infers types and returns the single expression automatically.',
      level: 'basic',
    },
    {
      q: 'What does $0 mean?',
      a: 'Shorthand for the first closure parameter. $1 is the second, and so on.',
      level: 'basic',
    },
    {
      q: 'When can you use trailing closure syntax?',
      a: 'When the closure is the last argument of a function. It moves outside the parentheses and is the style used throughout SwiftUI.',
      level: 'intermediate',
    },
  ],
  'classes-structs': [
    {
      q: 'Struct versus class?',
      a: 'A struct is a value type that is copied on assignment. A class is a reference type that shares one instance. Prefer struct for data and class for identity.',
      level: 'basic',
    },
    {
      q: 'What does mutating do on a struct method?',
      a: 'It allows the method to change a property of the struct. Without it, the method cannot modify self.',
      level: 'intermediate',
    },
    {
      q: 'What does final do on a class?',
      a: 'It prevents further subclassing, which lets the compiler optimize calls to its methods.',
      level: 'intermediate',
    },
    {
      q: 'Why is inheritance single in Swift?',
      a: 'A class can inherit from only one parent. Shared behaviour across unrelated types is done with protocols instead.',
      level: 'basic',
    },
  ],
  'protocols-extensions': [
    {
      q: 'What is a protocol?',
      a: 'A contract of properties and methods a type must provide. Structs, classes and enums can all conform.',
      level: 'basic',
    },
    {
      q: 'Can an extension add a stored property?',
      a: 'No. Extensions add computed properties, methods and protocol conformances, but not stored state.',
      level: 'intermediate',
    },
    {
      q: 'What does a generic type parameter give you?',
      a: 'Compile-time type safety with no runtime cost, because the compiler specializes the code for each concrete type.',
      level: 'intermediate',
    },
    {
      q: 'Why use protocols instead of inheritance?',
      a: 'Protocols compose behaviour across unrelated types and avoid deep class hierarchies. Swift favours small protocols and composition.',
      level: 'advanced',
    },
  ],
  'optionals-collections': [
    {
      q: 'What does optional chaining do?',
      a: 'It calls a member only when the optional holds a value. If any link is nil, the whole expression is nil.',
      level: 'basic',
    },
    {
      q: 'Which collection holds unique values?',
      a: 'Set. It stores hashable values with no duplicates and supports fast membership tests.',
      level: 'basic',
    },
    {
      q: 'What does map do on an array?',
      a: 'It transforms each element into a new array, leaving the original unchanged.',
      level: 'basic',
    },
    {
      q: 'Are Swift arrays reference types?',
      a: 'No. Arrays, dictionaries and sets are value types and are copied on assignment.',
      level: 'intermediate',
    },
  ],
  concurrency: [
    {
      q: 'What does await do?',
      a: 'It suspends the async function until the awaited work finishes, without blocking the thread.',
      level: 'basic',
    },
    {
      q: 'What is an actor?',
      a: 'A reference type that isolates its mutable state. Only one task at a time can access it, so data races are impossible by construction.',
      level: 'intermediate',
    },
    {
      q: 'What is structured concurrency?',
      a: 'A parent task waits for its child tasks and cancels them together. It prevents orphaned work.',
      level: 'advanced',
    },
    {
      q: 'Which attribute marks main-thread code?',
      a: '@MainActor. It ensures the code runs on the main thread, which is required for UI updates.',
      level: 'intermediate',
    },
  ],
  swiftui: [
    {
      q: 'What does body return?',
      a: 'A view tree. SwiftUI rebuilds it efficiently when state changes.',
      level: 'basic',
    },
    {
      q: 'What is @State for?',
      a: 'Local view state. Changing it re-renders the view.',
      level: 'basic',
    },
    {
      q: 'Why conform a model to Identifiable for a List?',
      a: 'To give each row a stable id so SwiftUI can diff and update the list correctly.',
      level: 'intermediate',
    },
    {
      q: 'What replaced NavigationView?',
      a: 'NavigationStack, which supports programmatic navigation and value-based destinations.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'Which property wrapper holds local view state in SwiftUI?',
      a: '@State. It stores local, mutable state and triggers a re-render on change.',
      level: 'basic',
    },
    {
      q: 'What makes an iOS portfolio project convincing?',
      a: 'A working app with a clear data flow, a README and the ability to explain every decision.',
      level: 'basic',
    },
    {
      q: 'What should a Swift interview answer include?',
      a: 'The mechanism and the trade-off, with a concrete example, not only the keyword.',
      level: 'intermediate',
    },
    {
      q: 'What is the best first iOS step for a beginner?',
      a: 'Learn Swift basics, then build one small SwiftUI app with a list and a detail screen, one piece at a time.',
      level: 'basic',
    },
  ],
};
