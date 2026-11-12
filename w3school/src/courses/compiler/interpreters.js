// Compiler chapter: Interpreters.

export default {
  id: 'interpreters',
  title: 'Interpreters',
  description: 'Tree-walking and bytecode VMs',
  icon: 'play-circle',
  lessons: [
    {
      id: 'compiler-tree-walk',
      title: 'Tree-walking',
      blocks: [
        { type: 'text', value: 'A tree-walking interpreter evaluates the AST directly. It is the simplest way to run a language and the fastest to build.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function evaluate(node, env) {
  if (node.type === 'number') return node.value;
  if (node.type === 'variable') return env[node.name];
  if (node.type === 'binary') {
    const a = evaluate(node.left, env);
    const b = evaluate(node.right, env);
    return node.op === '+' ? a + b : a * b;
  }
  throw new Error('Unknown node: ' + node.type);
}

const ast = {
  type: 'binary', op: '+',
  left: { type: 'variable', name: 'x' },
  right: { type: 'number', value: 3 }
};

console.log(evaluate(ast, { x: 4 }));` },
        { type: 'note', value: 'Tree-walking is flexible but revisits the tree structure on every run. A bytecode VM can be faster for repeated execution.' },
      ],
    },
    {
      id: 'compiler-bytecode',
      title: 'Bytecode',
      blocks: [
        { type: 'text', value: 'Bytecode is a compact instruction list for a virtual machine. It is easier to cache and optimise than an AST, and it separates parsing from execution.' },
        { type: 'code', lang: 'text', tryIt: false, value: `PUSH 2
PUSH 3
ADD
PRINT` },
        { type: 'note', value: 'A stack machine pushes and pops operands. A register machine keeps values in virtual registers and often uses fewer instructions.' },
      ],
    },
    {
      id: 'compiler-vm',
      title: 'A tiny stack VM',
      blocks: [
        { type: 'text', value: 'A VM loop reads an opcode, updates the stack and the instruction pointer. It is the same idea as a CPU, but in software.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const program = [
  { op: 'PUSH', value: 2 },
  { op: 'PUSH', value: 3 },
  { op: 'ADD' },
  { op: 'PRINT' }
];

const stack = [];
for (const ins of program) {
  if (ins.op === 'PUSH') stack.push(ins.value);
  if (ins.op === 'ADD') {
    const b = stack.pop();
    const a = stack.pop();
    stack.push(a + b);
  }
  if (ins.op === 'PRINT') console.log(stack.pop());
}` },
        { type: 'note', value: 'Check the stack depth and the operand types. A malformed program should fail with a clear message, not corrupt memory.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'interpreters',
      q: 'What does a tree-walking interpreter do?',
      options: ['Evaluates the AST directly', 'Compiles to machine code', 'Links files', 'Parses regex'],
      answer: 0,
      explain: 'It walks the AST and evaluates nodes.',
    },
    {
      chapterId: 'interpreters',
      q: 'What is bytecode?',
      options: ['A compact instruction list for a VM', 'A database', 'A source file', 'A network packet'],
      answer: 0,
      explain: 'It is executed by a virtual machine.',
    },
    {
      chapterId: 'interpreters',
      q: 'How does a stack VM evaluate?',
      options: ['Push and pop operands', 'Use only registers', 'Read a database', 'Open a socket'],
      answer: 0,
      explain: 'Operands live on a stack.',
    },
  ],
};
