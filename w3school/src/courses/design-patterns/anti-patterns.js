// Design Patterns chapter: Anti-Patterns.

export default {
  id: 'anti-patterns',
  title: 'Anti-Patterns',
  description: 'Common mistakes and how to avoid them',
  icon: 'warning',
  lessons: [
    {
      id: 'dp-god-object',
      title: 'God object and spaghetti code',
      blocks: [
        { type: 'text', value: 'A God object knows and does everything. It is the hardest class to test, change and understand. Spaghetti code has no clear structure, so every change breaks something unexpected.' },
        { type: 'list', items: [
          'Split the God object by responsibility',
          'Extract methods with clear names',
          'Move related data into small classes',
          'Add tests before refactoring',
          'Use the Single Responsibility principle as a guide',
        ] },
        { type: 'note', value: 'A class named Manager, Helper or Util is a warning sign. Push the behaviour to the object that owns the data.' },
      ],
    },
    {
      id: 'dp-coupling',
      title: 'Tight coupling and global state',
      blocks: [
        { type: 'text', value: 'Tight coupling means a change in one class forces changes in many others. Global state (singletons, static fields) hides dependencies and makes tests share data,' },
        { type: 'list', items: [
          'Depend on interfaces, not concrete classes',
          'Pass dependencies through constructors',
          'Avoid mutable global variables',
          'Keep modules small and focused',
          'Use events or messages for cross-module communication',
        ] },
        { type: 'note', value: 'A test that only passes when run after another test is a symptom of global state.' },
      ],
    },
    {
      id: 'dp-premature',
      title: 'Premature optimization and abstraction',
      blocks: [
        { type: 'text', value: 'Premature optimization adds complexity for a speed gain nobody measured. Premature abstraction adds interfaces and patterns for a change that may never happen. Both make the code harder to read.' },
        { type: 'list', items: [
          'Measure before you optimize',
          'Add abstraction when the second use case appears',
          'Prefer simple code until the pain is real',
          'Keep the code easy to change, not perfectly general',
          'Review complexity in code review',
        ] },
        { type: 'note', value: 'A simple solution that works today beats a complex one that might fit tomorrow.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'anti-patterns',
      q: 'What is a God object?',
      options: ['A class that does everything', 'A database', 'A test', 'A design pattern'],
      answer: 0,
      explain: 'It knows and does too much.',
    },
    {
      chapterId: 'anti-patterns',
      q: 'Why is global state a problem?',
      options: ['It is slower', 'It hides dependencies and makes tests share data', 'It uses too much memory', 'It is not supported'],
      answer: 1,
      explain: 'Global state makes behaviour unpredictable.',
    },
    {
      chapterId: 'anti-patterns',
      q: 'When should you add abstraction?',
      options: ['Before the first use', 'When the second use case appears', 'Never', 'Only in large teams'],
      answer: 1,
      explain: 'Abstraction pays off when there is a real second case.',
    },
    {
      chapterId: 'anti-patterns',
      q: 'What should you do before optimizing?',
      options: ['Rewrite everything', 'Measure the actual performance', 'Add more code', 'Remove tests'],
      answer: 1,
      explain: 'Measure first, then change the slow part.',
    },
  ],
};
