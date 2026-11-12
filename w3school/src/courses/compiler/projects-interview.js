// Compiler chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a calculator compiler and VM',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'compiler-project-calculator',
      title: 'Project: calculator compiler',
      blocks: [
        { type: 'text', value: 'Build a calculator that lexes, parses, evaluates and reports errors with positions. It is small enough to finish and deep enough to teach every phase.' },
        { type: 'code', lang: 'text', tryIt: false, value: `1. tokenize('2 + 3 * 4')
2. parse(tokens) -> AST
3. typeCheck(ast)
4. evaluate(ast)
5. print result
6. on error: line, column, message` },
        { type: 'list', items: [
          'Numbers, + - * / and parentheses',
          'Correct precedence and associativity',
          'Unary minus',
          'Division by zero error',
          'Clear message for a bad token',
          'Tests for each case',
        ] },
        { type: 'note', value: 'A finished calculator with tests is a strong portfolio piece. It proves you understand the pipeline, not just the syntax.' },
      ],
    },
    {
      id: 'compiler-project-vm',
      title: 'Project: add a bytecode VM',
      blocks: [
        { type: 'text', value: 'Compile the AST to a small instruction list and run it in a stack VM. Compare the tree-walker and the VM on speed and clarity.' },
        { type: 'code', lang: 'text', tryIt: false, value: `AST:     2 + 3 * 4
bytecode:
  PUSH 2
  PUSH 3
  PUSH 4
  MUL
  ADD
  PRINT` },
        { type: 'note', value: 'The VM is a second implementation of the same semantics. If the results differ, one of them has a bug. That comparison is the real lesson.' },
      ],
    },
    {
      id: 'compiler-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Compiler versus interpreter?',
          'What are the phases of a compiler?',
          'What does a lexer do?',
          'How do you handle operator precedence?',
          'What is an AST and why use one?',
          'What is semantic analysis?',
          'What is three-address code?',
          'What is constant folding?',
          'What is a stack VM?',
          'Why is error reporting important?',
        ] },
        { type: 'text', value: 'Strong answers trace one expression through every phase. Pick "2 + 3 * 4" and explain the tokens, tree, IR and result. That shows real understanding.' },
        { type: 'note', value: 'Be ready to write a small tokenizer or evaluator live. The practical round is usually a tiny language feature, not a full compiler.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which phase turns characters into tokens?',
      options: ['Parser', 'Lexer', 'Optimiser', 'Linker'],
      answer: 1,
      explain: 'The lexer produces tokens.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why compare a tree-walker and a VM?',
      options: ['To find semantic bugs', 'To make the code longer', 'To skip tests', 'To link'],
      answer: 0,
      explain: 'Two implementations should agree.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a compiler project strong?',
      options: ['Only a lexer', 'A complete pipeline with tests and clear errors', 'A large grammar', 'A logo'],
      answer: 1,
      explain: 'Depth and correctness beat size.',
    },
  ],
};
