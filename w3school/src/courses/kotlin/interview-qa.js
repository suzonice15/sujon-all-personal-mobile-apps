// Kotlin interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Kotlin?',
      a: 'A modern language for the JVM, Android, JS and native. It is concise, statically typed, null-safe and interoperable with Java.',
      level: 'basic',
    },
    {
      q: 'Why does Android recommend Kotlin?',
      a: 'Less boilerplate, null safety, coroutines and first-class Compose support. It also interoperates with existing Java code.',
      level: 'basic',
    },
    {
      q: 'What is the Kotlin Playground?',
      a: 'A browser-based environment for running small Kotlin programs without installing a toolchain.',
      level: 'basic',
    },
  ],
  'syntax-types': [
    {
      q: 'val versus var?',
      a: 'val is a read-only reference. var can be reassigned. Prefer val; it makes state easier to reason about.',
      level: 'basic',
    },
    {
      q: 'How does null safety work?',
      a: 'A non-null type cannot hold null. A nullable type uses ?. A String? must be handled with ?., ?: or a null check before use.',
      level: 'basic',
    },
    {
      q: 'What does the Elvis operator do?',
      a: '?: returns the right side when the left side is null, for example nickname?.length ?: 0.',
      level: 'intermediate',
    },
  ],
  'control-flow': [
    {
      q: 'Why is if an expression in Kotlin?',
      a: 'It returns a value, so you can assign the result of an if/else directly. when is also an expression.',
      level: 'basic',
    },
    {
      q: 'What is the difference between .. and until?',
      a: '.. includes the end value; until excludes it. 1..3 is 1, 2, 3; 1 until 3 is 1, 2.',
      level: 'basic',
    },
    {
      q: 'When is when exhaustive?',
      a: 'For enums and sealed classes the compiler can require every case. That makes adding a new state a compile error until handled.',
      level: 'intermediate',
    },
  ],
  'functions-lambdas': [
    {
      q: 'What is a single-expression function?',
      a: 'A function written with = instead of a block, for example fun add(a: Int, b: Int) = a + b.',
      level: 'basic',
    },
    {
      q: 'What is an extension function?',
      a: 'A function that adds behaviour to an existing type without modifying it. It is resolved statically and cannot access private members.',
      level: 'intermediate',
    },
    {
      q: 'What is a higher-order function?',
      a: 'A function that takes another function as a parameter or returns one, such as map or filter.',
      level: 'intermediate',
    },
  ],
  'classes-objects': [
    {
      q: 'What does val in a primary constructor do?',
      a: 'It declares and initialises a read-only property on the class.',
      level: 'basic',
    },
    {
      q: 'What does a data class generate?',
      a: 'equals, hashCode, toString, copy and component functions for destructuring.',
      level: 'basic',
    },
    {
      q: 'What is a companion object?',
      a: 'A singleton tied to a class, used for constants and factory methods that behave like Java static members.',
      level: 'intermediate',
    },
  ],
  'inheritance-interfaces': [
    {
      q: 'Why are Kotlin classes final by default?',
      a: 'To prevent accidental inheritance and fragile base classes. You opt in with open when extension is intended.',
      level: 'intermediate',
    },
    {
      q: 'What is a sealed class?',
      a: 'A class whose subclasses are restricted to the same package or file. It models a fixed set of states and enables exhaustive when.',
      level: 'intermediate',
    },
    {
      q: 'Interface versus abstract class?',
      a: 'An interface is a contract and supports multiple implementation. An abstract class can hold state and shared code but allows single inheritance.',
      level: 'intermediate',
    },
  ],
  collections: [
    {
      q: 'listOf versus mutableListOf?',
      a: 'listOf exposes a read-only interface. mutableListOf allows add and remove. Prefer read-only unless mutation is required.',
      level: 'basic',
    },
    {
      q: 'What does map do?',
      a: 'It transforms every element and returns a new list with the results.',
      level: 'basic',
    },
    {
      q: 'When use a Sequence?',
      a: 'For large or chained operations where you want lazy evaluation and no intermediate lists.',
      level: 'advanced',
    },
  ],
  coroutines: [
    {
      q: 'What is a suspend function?',
      a: 'A function that can pause without blocking a thread. It must be called from a coroutine or another suspend function.',
      level: 'basic',
    },
    {
      q: 'launch versus async?',
      a: 'launch starts a job and does not return a result. async returns a Deferred that you await for a value.',
      level: 'intermediate',
    },
    {
      q: 'Why not use GlobalScope?',
      a: 'It is not tied to a lifecycle, so work is not cancelled when the screen or request ends. Use viewModelScope, lifecycleScope or a structured scope.',
      level: 'advanced',
    },
  ],
  'android-intro': [
    {
      q: 'What is an Activity?',
      a: 'A screen host in Android. It has a lifecycle and is recreated on configuration changes.',
      level: 'basic',
    },
    {
      q: 'What is a ViewModel for?',
      a: 'Holding screen state and business logic across configuration changes. It must not hold an Activity or View.',
      level: 'intermediate',
    },
    {
      q: 'How does Compose recomposition work?',
      a: 'A @Composable reads state. When that state changes, Compose re-runs the affected functions and updates the UI.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you build a list screen?',
      a: 'A ViewModel exposes a StateFlow of items, the composable collects it, and a LazyColumn renders each row with a stable key.',
      level: 'intermediate',
    },
    {
      q: 'Why use a data class for UI state?',
      a: 'It gives value equality, copy and readable toString, which makes state comparison and testing simple.',
      level: 'basic',
    },
    {
      q: 'What makes a good Kotlin portfolio project?',
      a: 'One small finished app with real data, loading and error states, a ViewModel and a clean Compose UI. Depth beats a large unfinished feature list.',
      level: 'basic',
    },
  ],
};
