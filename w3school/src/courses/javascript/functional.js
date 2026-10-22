// JavaScript chapter: Functional Programming. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'functional',
  title: 'Functional Programming',
  description: 'Pure functions, immutability, currying and recursion',
  icon: 'functions',
  lessons: [
    {
      id: 'js-pure-functions',
      title: 'Pure Functions and Immutability',
      blocks: [
        { type: 'text', value: 'A pure function always returns the same output for the same input and changes nothing outside itself (no side effects). Pure code is easy to test, reuse and reason about. React is built on this idea.' },
        { type: 'code', lang: 'js', tryIt: true, value: `// Impure: depends on and changes outside state
let total = 0;
function addToTotal(n) {
  total += n;          // side effect
  return total;
}

// Pure: same input → same output, nothing else touched
const add = (a, b) => a + b;

// Immutable update: create new data instead of changing it
const cart = [{ item: 'pen', qty: 1 }];

const badAdd = (c, item) => { c.push(item); return c; };   // mutates
const goodAdd = (c, item) => [...c, item];                 // new array

const newCart = goodAdd(cart, { item: 'book', qty: 2 });
console.log(cart.length, newCart.length); // 1 2

const updated = newCart.map(line =>
  line.item === 'pen' ? { ...line, qty: line.qty + 1 } : line
);
console.log(updated, cart[0].qty); // original pen qty is still 1` },
        { type: 'list', items: [
          'Non-mutating array methods: map, filter, slice, concat, toSorted, toReversed, with',
          'Mutating methods to avoid in pure code: push, splice, sort, reverse',
        ] },
      ],
    },
    {
      id: 'js-currying-composition',
      title: 'Currying and Composition',
      blocks: [
        { type: 'heading', value: 'Currying' },
        { type: 'text', value: 'Currying turns a function of many arguments into a chain of functions of one argument. It lets you create specialized functions from general ones.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const multiply = a => b => a * b;

const double = multiply(2);
const triple = multiply(3);
console.log(double(10), triple(10)); // 20 30

const tag = name => text => \`<\${name}>\${text}</\${name}>\`;
const bold = tag('b');
console.log(bold('Important'));` },
        { type: 'heading', value: 'Composition' },
        { type: 'text', value: 'Composition chains small functions so the output of one becomes the input of the next.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const pipe = (...fns) => input => fns.reduce((value, fn) => fn(value), input);

const trim = s => s.trim();
const lower = s => s.toLowerCase();
const slug = s => s.replace(/\\s+/g, '-');

const toSlug = pipe(trim, lower, slug);
console.log(toSlug('  Learn JavaScript Fast  ')); // "learn-javascript-fast"` },
      ],
    },
    {
      id: 'js-memoization',
      title: 'Memoization',
      blocks: [
        { type: 'text', value: 'Memoization caches the results of a function, so repeated calls with the same arguments return instantly. It only works safely for pure functions.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

let calls = 0;
const slowSquare = n => { calls++; return n * n; };
const fastSquare = memoize(slowSquare);

fastSquare(9); fastSquare(9); fastSquare(9);
console.log('Real calculations:', calls); // 1

// Classic example: Fibonacci
const fib = memoize(n => (n < 2 ? n : fib(n - 1) + fib(n - 2)));
console.log(fib(80)); // instant; without memoization it would take ages` },
        { type: 'note', value: 'React\'s useMemo and memo apply this same idea to components and values.' },
      ],
    },
    {
      id: 'js-recursion',
      title: 'Recursion',
      blocks: [
        { type: 'text', value: 'A recursive function calls itself on a smaller version of the problem. Every recursion needs a base case that stops it. It is natural for tree-shaped data: folders, menus, comments with replies.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function factorial(n) {
  if (n <= 1) return 1;        // base case
  return n * factorial(n - 1); // smaller problem
}
console.log(factorial(5)); // 120

// Sum every number in a nested structure
const comments = {
  likes: 3,
  replies: [
    { likes: 5, replies: [] },
    { likes: 2, replies: [{ likes: 7, replies: [] }] },
  ],
};

function totalLikes(comment) {
  return comment.likes + comment.replies.reduce((sum, r) => sum + totalLikes(r), 0);
}
console.log(totalLikes(comments)); // 17

// Flatten any depth
const flatten = arr => arr.reduce((acc, x) => acc.concat(Array.isArray(x) ? flatten(x) : x), []);
console.log(flatten([1, [2, [3, [4]]], 5]));` },
        { type: 'note', value: 'Without a base case, recursion never stops and throws "Maximum call stack size exceeded".' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'functional', q: 'Which describes a pure function?', options: ['It uses global variables', 'Same input always gives same output with no side effects', 'It never returns a value', 'It only uses arrow syntax'], answer: 1, explain: 'Pure functions depend only on their inputs.' },
    { chapterId: 'functional', q: 'Which array method does NOT mutate the original array?', options: ['push', 'sort', 'map', 'splice'], answer: 2, explain: 'map returns a new array.' },
    { chapterId: 'functional', q: 'What does multiply(2)(5) return when multiply = a => b => a * b?', options: ['7', '10', 'A function', 'NaN'], answer: 1, explain: 'The curried function receives 2, then 5.' },
    { chapterId: 'functional', q: 'What is memoization?', options: ['Deleting old data', 'Caching function results for repeated inputs', 'Writing comments', 'A loop type'], answer: 1, explain: 'It trades memory for speed.' },
    { chapterId: 'functional', q: 'What must every recursive function have?', options: ['A loop', 'A base case', 'A global variable', 'An async keyword'], answer: 1, explain: 'The base case stops the recursion.' },
  ],
};
