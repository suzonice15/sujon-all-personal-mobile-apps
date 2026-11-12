// Compiler chapter: Lexing.

export default {
  id: 'lexing',
  title: 'Lexing',
  description: 'Turn characters into tokens',
  icon: 'text-fields',
  lessons: [
    {
      id: 'compiler-tokens',
      title: 'Tokens',
      blocks: [
        { type: 'text', value: 'A lexer reads characters and emits tokens: numbers, identifiers, keywords, operators and punctuation. Whitespace and comments are usually skipped.' },
        { type: 'code', lang: 'text', tryIt: false, value: `input:  "sum = 12 + 3"
tokens: IDENT(sum) EQ NUMBER(12) PLUS NUMBER(3)` },
        { type: 'note', value: 'A token carries a type, a value and a position. The position is what lets an error point at the right line and column.' },
      ],
    },
    {
      id: 'compiler-regex',
      title: 'Regular expressions',
      blocks: [
        { type: 'text', value: 'Token patterns are regular expressions. A lexer can be a hand-written scanner or a generated one from a specification.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function tokenize(input) {
  const tokens = [];
  const re = /\\s*(\\d+|[A-Za-z_]\\w*|[+\\-*/()=])/g;
  let match;

  while ((match = re.exec(input))) {
    tokens.push(match[1]);
  }
  return tokens;
}

console.log(tokenize('sum = 12 + 3 * (4 - 1)'));` },
        { type: 'note', value: 'Regular expressions cannot handle nested structures such as balanced parentheses. That is why parsing is a separate phase.' },
      ],
    },
    {
      id: 'compiler-lexer-errors',
      title: 'Lexer errors',
      blocks: [
        { type: 'text', value: 'An unexpected character is a lexical error. Report the position and the character. Do not silently skip it.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function scan(input) {
  const tokens = [];
  let i = 0;

  while (i < input.length) {
    const ch = input[i];
    if (/\\s/.test(ch)) { i++; continue; }
    if (/\\d/.test(ch)) {
      let n = '';
      while (i < input.length && /\\d/.test(input[i])) n += input[i++];
      tokens.push({ type: 'number', value: Number(n) });
      continue;
    }
    if ('+-*/()'.includes(ch)) {
      tokens.push({ type: 'op', value: ch });
      i++;
      continue;
    }
    throw new Error('Unexpected character at ' + i + ': ' + ch);
  }
  return tokens;
}

console.log(scan('2 + 3'));
try { scan('2 $ 3'); } catch (e) { console.log(e.message); }` },
        { type: 'note', value: 'A good error message includes the line, the column and the offending text. That is the difference between a usable and a frustrating tool.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'lexing',
      q: 'What does a lexer output?',
      options: ['An AST', 'Tokens', 'Assembly', 'A database'],
      answer: 1,
      explain: 'It emits tokens for the parser.',
    },
    {
      chapterId: 'lexing',
      q: 'Why are regexes not enough for parsing?',
      options: ['They are slow', 'They cannot handle nested structures', 'They are not standard', 'They cannot read text'],
      answer: 1,
      explain: 'Balanced nesting needs a grammar.',
    },
    {
      chapterId: 'lexing',
      q: 'What should a lexical error include?',
      options: ['Only "error"', 'Position and character', 'A stack trace', 'A random guess'],
      answer: 1,
      explain: 'Precise location makes the error fixable.',
    },
  ],
};
