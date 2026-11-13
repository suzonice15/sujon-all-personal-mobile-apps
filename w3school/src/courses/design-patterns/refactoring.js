// Design Patterns chapter: Refactoring.

export default {
  id: 'refactoring',
  title: 'Refactoring',
  description: 'Improving design without changing behaviour',
  icon: 'build',
  lessons: [
    {
      id: 'dp-refactor-basics',
      title: 'What refactoring is',
      blocks: [
        { type: 'text', value: 'Refactoring changes the structure of code without changing what it does. It is how you move from a working mess to a clean design, one safe step at a time. Tests are the safety net.' },
        { type: 'list', items: [
          'Small, behaviour-preserving steps',
          'Run the tests after every step',
          'Refactor before adding a feature, not after',
          'Keep commits small and focused',
          'Stop if the tests fail and fix before continuing',
        ] },
        { type: 'note', value: 'Without tests, refactoring is just rewriting with extra risk. Write tests first when the code is fragile.' },
      ],
    },
    {
      id: 'dp-extract',
      title: 'Extract method and class',
      blocks: [
        { type: 'text', value: 'Extract Method moves a block of code into a named method. Extract Class moves a group of fields and methods into a new class. Both reduce size and give the code a clearer vocabulary.' },
        { type: 'code', lang: 'java', tryIt: false, value: `// Before: one long method
void process(Order order) {
    if (order.items().isEmpty()) throw new IllegalArgumentException();
    double total = 0;
    for (var item : order.items()) total += item.price() * item.qty();
    if (order.coupon() != null) total -= order.coupon().discount();
    // ...
}

// After: named steps
void process(Order order) {
    validate(order);
    double total = calculateTotal(order);
    applyCoupon(order, total);
}` },
        { type: 'note', value: 'A good extracted method has a name that explains the intent. If you cannot name it, the block may be doing too much.' },
      ],
    },
    {
      id: 'dp-pattern-refactor',
      title: 'Refactoring to patterns',
      blocks: [
        { type: 'text', value: 'A pattern is introduced when a real smell appears. A long if/else on a mode becomes a Strategy. Repeated conditionals on object creation become a Factory. Mushrooming optional parameters become a Builder.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Smell                          Refactor to
-----------------------------------------------
long switch on mode           Strategy or State
many optional constructor args Builder
repeated creation if/else     Factory
wrapper after wrapper         Decorator
team copies one block         Template Method` },
        { type: 'list', items: [
          'Refactor to a pattern only when the smell is real',
          'Keep the tests green through every step',
          'Name the pattern in the code',
          'If the pattern adds more code than it removes, reconsider',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'refactoring',
      q: 'What does refactoring change?',
      options: ['Behaviour', 'Structure without changing behaviour', 'The database', 'The tests'],
      answer: 1,
      explain: 'Refactoring preserves behaviour.',
    },
    {
      chapterId: 'refactoring',
      q: 'What is a safety net for refactoring?',
      options: ['A backup', 'Automated tests', 'A code review only', 'A new branch'],
      answer: 1,
      explain: 'Tests catch behaviour changes.',
    },
    {
      chapterId: 'refactoring',
      q: 'What smell suggests a Strategy?',
      options: ['Many optional constructor args', 'A long switch on a mode', 'A wrapper', 'A comment'],
      answer: 1,
      explain: 'Strategy replaces conditional behaviour.',
    },
    {
      chapterId: 'refactoring',
      q: 'When should you stop a refactor?',
      options: ['When tests fail and you cannot fix them quickly', 'After one line', 'Only at the end', 'Never'],
      answer: 0,
      explain: 'Keep the code working at every step.',
    },
  ],
};
