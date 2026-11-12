// Compiler chapter: Parsing.

export default {
  id: 'parsing',
  title: 'Parsing',
  description: 'Grammar, AST and recursive descent',
  icon: 'account-tree',
  lessons: [
    {
      id: 'compiler-grammar',
      title: 'Grammar',
      blocks: [
        { type: 'text', value: 'A grammar defines which token sequences are valid. A production such as Expr -> Term (+ Term)* describes addition. Precedence and associativity are encoded in the grammar.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Expr   -> Term (('+' | '-') Term)*
Term   -> Factor (('*' | '/') Factor)*
Factor -> NUMBER | '(' Expr ')'` },
        { type: 'note', value: 'This grammar gives * higher precedence than +. A single flat rule would parse 2 + 3 * 4 incorrectly.' },
      ],
    },
    {
      id: 'compiler-ast',
      title: 'The AST',
      blocks: [
        { type: 'text', value: 'The parser produces an abstract syntax tree. Parentheses disappear; the tree structure carries the meaning.' },
        { type: 'code', lang: 'js', tryIt: true, value: `// AST for 2 + 3 * 4
const ast = {
  type: 'binary',
  op: '+',
  left: { type: 'number', value: 2 },
  right: {
    type: 'binary',
    op: '*',
    left: { type: 'number', value: 3 },
    right: { type: 'number', value: 4 }
  }
};

function evaluate(node) {
  if (node.type === 'number') return node.value;
  const a = evaluate(node.left);
  const b = evaluate(node.right);
  return node.op === '+' ? a + b : node.op === '*' ? a * b : 0;
}

console.log(evaluate(ast));` },
        { type: 'note', value: 'If the tree is correct, evaluation, type checking and code generation all become simple recursive functions.' },
      ],
    },
    {
      id: 'compiler-recursive-descent',
      title: 'Recursive descent',
      blocks: [
        { type: 'text', value: 'Recursive descent writes one function per grammar rule. It is readable and easy to debug, which is why many real parsers start there.' },
        { type: 'code', lang: 'js', tryIt: false, value: `let pos = 0;

function parseExpr(tokens) {
  let left = parseTerm(tokens);
  while (tokens[pos] === '+' || tokens[pos] === '-') {
    const op = tokens[pos++];
    const right = parseTerm(tokens);
    left = { type: 'binary', op, left, right };
  }
  return left;
}` },
        { type: 'note', value: 'A recursive descent parser can report "expected )" at an exact token. That is a better error than a generic parse failure.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'parsing',
      q: 'What does a parser produce?',
      options: ['Tokens', 'An AST', 'Machine code', 'A database'],
      answer: 1,
      explain: 'It builds a syntax tree.',
    },
    {
      chapterId: 'parsing',
      q: 'Why separate Expr and Term rules?',
      options: ['To make it longer', 'To encode precedence', 'To skip errors', 'To run faster'],
      answer: 1,
      explain: 'The grammar structure sets precedence.',
    },
    {
      chapterId: 'parsing',
      q: 'What is recursive descent?',
      options: ['One function per grammar rule', 'A regex', 'A linker', 'A register'],
      answer: 0,
      explain: 'Each rule becomes a function.',
    },
  ],
};
