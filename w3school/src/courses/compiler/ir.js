// Compiler chapter: Intermediate Representation.

export default {
  id: 'ir',
  title: 'Intermediate Representation',
  description: 'Three-address code and SSA',
  icon: 'code',
  lessons: [
    {
      id: 'compiler-three-address',
      title: 'Three-address code',
      blocks: [
        { type: 'text', value: 'An IR is a simple language between the AST and machine code. Three-address code uses one operation and at most three operands per instruction.' },
        { type: 'code', lang: 'text', tryIt: false, value: `t1 = 3 * 4
t2 = 2 + t1
result = t2` },
        { type: 'note', value: 'The IR is explicit about order. That makes optimisation and code generation much easier than walking a complex AST.' },
      ],
    },
    {
      id: 'compiler-ssa',
      title: 'SSA',
      blocks: [
        { type: 'text', value: 'Static Single Assignment gives every value one definition. A new assignment creates a new name. Phi nodes merge values at control-flow joins.' },
        { type: 'code', lang: 'text', tryIt: false, value: `x1 = 1
if cond:
  x2 = 2
else:
  x3 = 3
x4 = phi(x2, x3)` },
        { type: 'note', value: 'SSA makes data flow explicit, which simplifies constant propagation, dead code elimination and register allocation.' },
      ],
    },
    {
      id: 'compiler-ir-tradeoffs',
      title: 'Choosing an IR',
      blocks: [
        { type: 'list', items: [
          'Tree IR - close to the AST, easy to generate',
          'Linear IR - close to machine code, easy to optimise',
          'Stack IR - simple for a bytecode VM',
          'SSA - best for optimisation',
          'LLVM IR - a mature, reusable backend',
        ] },
        { type: 'text', value: 'You do not need the perfect IR. You need one that makes the next step simple and keeps source locations for errors.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'ir',
      q: 'Why use an IR?',
      options: ['To hide errors', 'To simplify optimisation and codegen', 'To run the parser', 'To store data'],
      answer: 1,
      explain: 'A simple IR is easier to transform.',
    },
    {
      chapterId: 'ir',
      q: 'What does SSA mean?',
      options: ['Every value has one definition', 'A single stack', 'A syntax error', 'A register'],
      answer: 0,
      explain: 'Static Single Assignment.',
    },
    {
      chapterId: 'ir',
      q: 'What is a phi node for?',
      options: ['Merging values at a join', 'Printing', 'Parsing', 'Linking'],
      answer: 0,
      explain: 'It selects a value based on the incoming path.',
    },
  ],
};
