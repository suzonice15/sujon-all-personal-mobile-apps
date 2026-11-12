// Compiler chapter: Semantic Analysis.

export default {
  id: 'semantics',
  title: 'Semantic Analysis',
  description: 'Symbols, scopes and type checking',
  icon: 'rule',
  lessons: [
    {
      id: 'compiler-symbols',
      title: 'Symbol tables',
      blocks: [
        { type: 'text', value: 'A symbol table maps names to declarations: type, scope and location. It is how the compiler knows that x refers to a variable and not a function.' },
        { type: 'code', lang: 'text', tryIt: false, value: `scope {
  x -> int, local
  add -> function(int, int) -> int
}` },
        { type: 'note', value: 'Nested scopes need a stack of tables. Lookup walks outward; declaration goes into the current scope.' },
      ],
    },
    {
      id: 'compiler-types',
      title: 'Type checking',
      blocks: [
        { type: 'text', value: 'Type checking verifies that operations make sense: you cannot add a string to a number without conversion. It catches errors before runtime.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function typeOf(node) {
  if (node.type === 'number') return 'number';
  if (node.type === 'string') return 'string';
  if (node.type === 'binary') {
    const left = typeOf(node.left);
    const right = typeOf(node.right);
    if (node.op === '+' && left === 'string' && right === 'string') return 'string';
    if (left === 'number' && right === 'number') return 'number';
    throw new Error('Type error: ' + left + ' ' + node.op + ' ' + right);
  }
  throw new Error('Unknown node');
}

console.log(typeOf({ type: 'binary', op: '+', left: { type: 'number' }, right: { type: 'number' } }));
try {
  typeOf({ type: 'binary', op: '+', left: { type: 'string' }, right: { type: 'number' } });
} catch (e) { console.log(e.message); }` },
        { type: 'note', value: 'A good type error names the expression and the expected type. "Cannot add string and number" is more useful than "invalid AST".' },
      ],
    },
    {
      id: 'compiler-semantic-errors',
      title: 'Semantic errors',
      blocks: [
        { type: 'list', items: [
          'Undeclared variable',
          'Duplicate declaration in the same scope',
          'Wrong argument count or type',
          'Return missing on a path',
          'Assigning to a constant',
          'Using a value before initialisation',
        ] },
        { type: 'text', value: 'Semantic analysis is where a language becomes friendly or hostile. Invest in precise messages and recovery so the user sees several errors, not only the first.' },
        { type: 'note', value: 'The parser checks syntax; semantic analysis checks meaning. A program can be syntactically valid and still nonsensical.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'semantics',
      q: 'What does a symbol table store?',
      options: ['Machine code', 'Names and their declarations', 'Tokens', 'Files'],
      answer: 1,
      explain: 'It maps names to type, scope and location.',
    },
    {
      chapterId: 'semantics',
      q: 'What does type checking catch?',
      options: ['Syntax errors', 'Meaning errors such as adding a string to a number', 'Linker errors', 'Disk errors'],
      answer: 1,
      explain: 'It verifies operations make sense.',
    },
    {
      chapterId: 'semantics',
      q: 'Why recover from errors?',
      options: ['To hide them', 'To report several errors at once', 'To run faster', 'To skip parsing'],
      answer: 1,
      explain: 'Users fix more in one pass.',
    },
  ],
};
