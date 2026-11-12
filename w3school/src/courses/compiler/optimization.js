// Compiler chapter: Optimisation.

export default {
  id: 'optimization',
  title: 'Optimisation',
  description: 'Constant folding, dead code and inlining',
  icon: 'speed',
  lessons: [
    {
      id: 'compiler-constant-folding',
      title: 'Constant folding',
      blocks: [
        { type: 'text', value: 'If both operands are constants, compute the result at compile time. The program does less work and the code gets smaller.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function fold(node) {
  if (node.type === 'number') return node;
  if (node.type === 'binary') {
    const left = fold(node.left);
    const right = fold(node.right);
    if (left.type === 'number' && right.type === 'number') {
      const value = node.op === '+' ? left.value + right.value : left.value * right.value;
      return { type: 'number', value };
    }
    return { type: 'binary', op: node.op, left, right };
  }
  return node;
}

const ast = {
  type: 'binary', op: '+',
  left: { type: 'number', value: 2 },
  right: { type: 'binary', op: '*', left: { type: 'number', value: 3 }, right: { type: 'number', value: 4 } }
};

console.log(JSON.stringify(fold(ast)));` },
        { type: 'note', value: 'Folding must respect language semantics: overflow, floating point and side effects. Do not fold an expression that can throw.' },
      ],
    },
    {
      id: 'compiler-dead-code',
      title: 'Dead code elimination',
      blocks: [
        { type: 'text', value: 'If a value is never used and has no side effect, remove it. Dead code comes from macros, generic code and earlier optimisations.' },
        { type: 'code', lang: 'text', tryIt: false, value: `t1 = 2 + 3      // unused
t2 = x * 4      // used
return t2

-> remove t1` },
        { type: 'note', value: 'A function call may have side effects. Remove it only if the compiler can prove purity or the result is unused and the call is marked pure.' },
      ],
    },
    {
      id: 'compiler-inlining-loops',
      title: 'Inlining and loops',
      blocks: [
        { type: 'text', value: 'Inlining replaces a small function call with its body, removing call overhead and enabling further optimisation. Loop optimisation removes repeated work from the body.' },
        { type: 'list', items: [
          'Inlining small hot functions',
          'Loop-invariant code motion',
          'Strength reduction: x * 2 -> x << 1',
          'Loop unrolling for fewer branches',
          'Vectorisation for parallel data',
        ] },
        { type: 'note', value: 'Optimisation is a trade-off. Inlining too much grows the binary and can hurt instruction cache performance.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'optimization',
      q: 'What is constant folding?',
      options: ['Computing constants at compile time', 'Removing functions', 'Adding loops', 'Linking'],
      answer: 0,
      explain: 'It evaluates constant expressions early.',
    },
    {
      chapterId: 'optimization',
      q: 'When is dead code removal unsafe?',
      options: ['When the code has side effects', 'When it is fast', 'When it is short', 'Never'],
      answer: 0,
      explain: 'A call may change state even if the result is unused.',
    },
    {
      chapterId: 'optimization',
      q: 'What does inlining do?',
      options: ['Replaces a call with the function body', 'Removes a loop', 'Adds a database', 'Encrypts code'],
      answer: 0,
      explain: 'It removes call overhead and enables more optimisation.',
    },
  ],
};
