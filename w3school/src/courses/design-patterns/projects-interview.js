// Design Patterns chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Refactor a real codebase and prepare for interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'dp-project-refactor',
      title: 'Project: refactor a messy module',
      blocks: [
        { type: 'text', value: 'Take a small module with a God class, long if/else chains and duplicated code. Add tests, then refactor step by step: extract methods, extract classes, introduce Strategy for the conditionals, and a Factory for creation.' },
        { type: 'list', items: [
          'Write a test for the current behaviour first',
          'Extract methods with clear names',
          'Split the God class by responsibility',
          'Replace long conditionals with Strategy',
          'Introduce a Factory where creation repeats',
          'Run the tests after every step',
        ] },
        { type: 'note', value: 'A before-and-after with tests and a short write-up is a strong portfolio piece. It shows you can improve code safely.' },
      ],
    },
    {
      id: 'dp-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is the difference between a pattern and an algorithm?',
          'Explain SOLID with one example each',
          'Singleton versus dependency injection?',
          'Strategy versus State?',
          'When would you use a Facade?',
          'What is the difference between Adapter and Decorator?',
          'How do you decide when to introduce a pattern?',
          'What is an anti-pattern you have seen?',
        ] },
        { type: 'text', value: 'Strong answers name the problem the pattern solves, not only its structure. "Strategy removes a long switch on a discount mode and lets me add a new discount without editing the checkout" is a complete answer.' },
        { type: 'note', value: 'Be ready to refactor a small class live. Interviewers care more about judgment than memorized diagrams.' },
      ],
    },
    {
      id: 'dp-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: SOLID principles and simple refactoring',
          'Week 2: creational patterns',
          'Week 3: structural patterns',
          'Week 4: behavioral patterns',
          'Week 5: anti-patterns and refactoring to patterns',
          'Week 6: architecture patterns',
          'Week 7: testing and test doubles',
          'Week 8: refactor one real module end to end',
        ] },
        { type: 'note', value: 'Patterns become useful only when you connect them to a real pain point. Refactor real code as you learn.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What should you do before refactoring a module?',
      options: ['Delete it', 'Write a test for its current behaviour', 'Rewrite everything', 'Add more features'],
      answer: 1,
      explain: 'Tests protect behaviour during refactoring.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which pattern replaces a long switch on a mode?',
      options: ['Factory', 'Strategy', 'Decorator', 'Composite'],
      answer: 1,
      explain: 'Strategy puts each case behind an interface.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a design-pattern answer strong?',
      options: ['Only the diagram', 'The problem it solves and the trade-off', 'A list of patterns', 'The book author'],
      answer: 1,
      explain: 'Explain the problem and trade-off.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first step in learning patterns?',
      options: ['Memorize all 23', 'Connect each pattern to a real pain point', 'Avoid refactoring', 'Use every pattern'],
      answer: 1,
      explain: 'Patterns are tools for real problems.',
    },
  ],
};
