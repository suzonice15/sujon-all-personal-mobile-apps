// Design Patterns interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is a design pattern?',
      a: 'A named, reusable solution to a common design problem. It is a way of structuring code that others recognize.',
      level: 'basic',
    },
    {
      q: 'What are the three pattern families?',
      a: 'Creational (how objects are created), structural (how they are composed) and behavioral (how they communicate).',
      level: 'basic',
    },
    {
      q: 'When should you use a pattern?',
      a: 'When the problem it solves actually appears. Start simple and refactor to a pattern when the pain is real.',
      level: 'basic',
    },
    {
      q: 'Why is premature abstraction a problem?',
      a: 'It adds interfaces and ceremony for a change that may never happen, making the code harder to read.',
      level: 'intermediate',
    },
  ],
  solid: [
    {
      q: 'What is the Single Responsibility principle?',
      a: 'A class should have one reason to change. It is about responsibilities, not lines of code.',
      level: 'basic',
    },
    {
      q: 'What is the Open/Closed principle?',
      a: 'Code should be open for extension but closed for modification. Add behaviour without editing working code.',
      level: 'basic',
    },
    {
      q: 'What does Liskov Substitution require?',
      a: 'A subtype must be usable anywhere its parent is used, without breaking behaviour.',
      level: 'intermediate',
    },
    {
      q: 'What is Dependency Inversion?',
      a: 'High-level code should depend on abstractions, not on concrete details, so implementations can be swapped and tested.',
      level: 'intermediate',
    },
  ],
  creational: [
    {
      q: 'What does Singleton guarantee?',
      a: 'Exactly one instance, with a global access point.',
      level: 'basic',
    },
    {
      q: 'Why is Singleton often an anti-pattern?',
      a: 'It hides dependencies, creates global state and makes testing hard.',
      level: 'intermediate',
    },
    {
      q: 'When is Builder useful?',
      a: 'When a constructor has many parameters or the object has optional parts.',
      level: 'basic',
    },
    {
      q: 'What does a Factory hide?',
      a: 'Object creation. The caller asks for a type, not a concrete class.',
      level: 'basic',
    },
  ],
  structural: [
    {
      q: 'Adapter versus Decorator?',
      a: 'Adapter changes the interface to make an incompatible class usable. Decorator keeps the interface and adds behaviour.',
      level: 'intermediate',
    },
    {
      q: 'What does a Facade do?',
      a: 'It gives a simple interface to a complex subsystem.',
      level: 'basic',
    },
    {
      q: 'What does a Proxy do?',
      a: 'It stands in for another object and controls access, for example for caching or lazy loading.',
      level: 'intermediate',
    },
    {
      q: 'What is the Composite pattern?',
      a: 'It treats a group of objects and a single object the same way, which models trees such as file systems.',
      level: 'intermediate',
    },
  ],
  behavioral: [
    {
      q: 'Strategy versus State?',
      a: 'Strategy swaps interchangeable algorithms chosen by the caller. State changes behaviour based on the object\'s internal state and transitions.',
      level: 'intermediate',
    },
    {
      q: 'What does Observer do?',
      a: 'It notifies many listeners when an event happens, so the sender does not know who is listening.',
      level: 'basic',
    },
    {
      q: 'What is Command useful for?',
      a: 'Turning a request into an object, which enables queuing, logging, undo and retry.',
      level: 'intermediate',
    },
    {
      q: 'What does Template Method define?',
      a: 'The skeleton of an algorithm, with some steps left for subclasses to implement.',
      level: 'intermediate',
    },
  ],
  'anti-patterns': [
    {
      q: 'What is a God object?',
      a: 'A class that knows and does everything. It is hard to test, change and understand.',
      level: 'basic',
    },
    {
      q: 'Why is global state a problem?',
      a: 'It hides dependencies and makes tests share data, so behaviour depends on execution order.',
      level: 'intermediate',
    },
    {
      q: 'When should you add abstraction?',
      a: 'When the second real use case appears, not before.',
      level: 'basic',
    },
    {
      q: 'What is premature optimization?',
      a: 'Adding complexity for a speed gain nobody measured.',
      level: 'basic',
    },
  ],
  refactoring: [
    {
      q: 'What does refactoring change?',
      a: 'The structure of code without changing its behaviour.',
      level: 'basic',
    },
    {
      q: 'What is the safety net for refactoring?',
      a: 'Automated tests that catch any behaviour change.',
      level: 'basic',
    },
    {
      q: 'What smell suggests a Strategy?',
      a: 'A long switch or if/else chain on a mode.',
      level: 'intermediate',
    },
    {
      q: 'When should you stop a refactor?',
      a: 'When the tests fail and you cannot fix them quickly. Keep the code working at every step.',
      level: 'intermediate',
    },
  ],
  architecture: [
    {
      q: 'In a layered architecture, which way do dependencies point?',
      a: 'Inward, toward the domain. Inner layers must not import outer ones.',
      level: 'basic',
    },
    {
      q: 'What does the view model do in MVVM?',
      a: 'It exposes state and commands to the view and keeps UI logic out of the view.',
      level: 'intermediate',
    },
    {
      q: 'What is at the center of clean architecture?',
      a: 'The domain, independent of frameworks, databases and UI.',
      level: 'intermediate',
    },
    {
      q: 'When is clean architecture overkill?',
      a: 'For a small app with simple needs. Use the dependency rule without full ceremony.',
      level: 'advanced',
    },
  ],
  'testing-patterns': [
    {
      q: 'What makes code testable?',
      a: 'Small units, injected dependencies and no hidden global state.',
      level: 'basic',
    },
    {
      q: 'Stub versus mock?',
      a: 'A stub returns canned data. A mock records calls and lets you assert on them.',
      level: 'intermediate',
    },
    {
      q: 'What is a fake?',
      a: 'A working lightweight implementation, such as an in-memory repository.',
      level: 'basic',
    },
    {
      q: 'What does too many mocks indicate?',
      a: 'The design is too coupled; tests break on refactors rather than behaviour changes.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you refactor a God class?',
      a: 'Write tests, extract methods by responsibility, then split into small classes with clear names.',
      level: 'intermediate',
    },
    {
      q: 'How do you decide when to introduce a pattern?',
      a: 'When a real smell appears, such as a long conditional or repeated creation. If the pattern adds more code than it removes, reconsider.',
      level: 'intermediate',
    },
    {
      q: 'What makes a design-pattern answer strong?',
      a: 'Explaining the problem the pattern solves and the trade-off, with an example, not only the structure.',
      level: 'basic',
    },
    {
      q: 'What is the best first step in learning patterns?',
      a: 'Connect each pattern to a real pain point in code you have written or read.',
      level: 'basic',
    },
  ],
};
