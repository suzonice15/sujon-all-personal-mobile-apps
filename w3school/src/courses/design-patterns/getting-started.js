// Design Patterns chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What patterns are and why they matter',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'dp-what-are',
      title: 'What are design patterns?',
      blocks: [
        { type: 'text', value: 'A design pattern is a named, reusable solution to a common problem in software design. It is not code you copy; it is a way of structuring code that other developers recognize and trust.' },
        { type: 'list', items: [
          'Patterns are vocabulary: "use a strategy here" saves a long explanation',
          'They are solutions to recurring problems, not rules',
          'They make code easier to change and test',
          'They come from experience, not theory alone',
          'Overusing patterns is as bad as ignoring them',
        ] },
        { type: 'note', value: 'A pattern is a tool, not a goal. If a plain function is clearer, use the function. Patterns earn their place by removing a real problem.' },
      ],
    },
    {
      id: 'dp-categories',
      title: 'The three categories',
      blocks: [
        { type: 'text', value: 'The classic Gang of Four book groups patterns into three families by what they solve: how objects are created, how they are composed, and how they communicate.' },
        { type: 'list', items: [
          'Creational: how objects are created (Singleton, Factory, Builder)',
          'Structural: how objects are composed (Adapter, Decorator, Facade)',
          'Behavioral: how objects communicate (Strategy, Observer, Command)',
        ] },
        { type: 'note', value: 'Learn the problem each family solves first. The pattern names become useful only when you can connect them to a real pain point.' },
      ],
    },
    {
      id: 'dp-when-use',
      title: 'When to use a pattern',
      blocks: [
        { type: 'text', value: 'Use a pattern when the problem it solves actually appears. Introduce it when you feel the pain: repeated conditionals, hard-to-test classes, or code that changes in many places for one reason.' },
        { type: 'list', items: [
          'Start simple; refactor to a pattern when the pain is real',
          'Name the pattern in a comment or class name so others recognize it',
          'Prefer composition over inheritance',
          'A pattern should reduce code, not add ceremony',
          'If a pattern makes the code harder to read, stop',
        ] },
        { type: 'note', value: 'Premature abstraction is a common failure. A simple solution that works today beats a pattern that might help next year.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is a design pattern?',
      options: ['A library', 'A named, reusable solution to a common design problem', 'A language feature', 'A database schema'],
      answer: 1,
      explain: 'Patterns are reusable design solutions with names.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which family is the Factory pattern in?',
      options: ['Creational', 'Structural', 'Behavioral', 'Architectural'],
      answer: 0,
      explain: 'Factory is a creational pattern.',
    },
    {
      chapterId: 'getting-started',
      q: 'When should you introduce a pattern?',
      options: ['At the start of every project', 'When the problem it solves actually appears', 'Never', 'Only in large teams'],
      answer: 1,
      explain: 'Patterns solve real pain, not hypothetical pain.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is premature abstraction?',
      options: ['Writing too much code', 'Adding a pattern before the problem exists', 'Using interfaces', 'Testing early'],
      answer: 1,
      explain: 'Abstraction without a real need adds ceremony.',
    },
  ],
};
