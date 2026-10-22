// JavaScript chapter: Data Types. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'data-types',
  title: 'Data Types',
  description: 'Numbers, strings, booleans and conversions',
  icon: 'category',
  lessons: [
    {
      id: 'js-types',
      title: 'Types of Values',
      blocks: [
        { type: 'text', value: 'Every value in JavaScript has a type. There are seven primitive types and one object type.' },
        { type: 'list', items: [
          'string: text, "hello"',
          'number: 42, 3.14 (whole numbers and decimals share one type)',
          'boolean: true or false',
          'undefined: a variable that has no value yet',
          'null: an intentional "nothing"',
          'bigint: very large whole numbers, 123n',
          'symbol: a unique identifier (advanced)',
          'object: collections such as {}, [] and functions',
        ] },
        { type: 'code', lang: 'js', tryIt: true, value: `console.log(typeof 'hello');   // string
console.log(typeof 42);        // number
console.log(typeof true);      // boolean
console.log(typeof undefined); // undefined
console.log(typeof {});        // object
console.log(typeof []);        // object (arrays are objects)
console.log(typeof null);      // object (a famous old bug!)

let empty;
console.log(empty);            // undefined` },
        { type: 'note', value: 'JavaScript is dynamically typed: the same variable can hold a number now and a string later. That is flexible, but be careful.' },
      ],
    },
    {
      id: 'js-numbers',
      title: 'Numbers and Math',
      blocks: [
        { type: 'code', lang: 'js', tryIt: true, value: `console.log(10 + 3);   // 13
console.log(10 - 3);   // 7
console.log(10 * 3);   // 30
console.log(10 / 3);   // 3.333...
console.log(10 % 3);   // 1  (remainder)
console.log(2 ** 10);  // 1024 (power)

console.log(0.1 + 0.2);            // 0.30000000000000004
console.log((0.1 + 0.2).toFixed(2)); // "0.30"` },
        { type: 'heading', value: 'The Math object' },
        { type: 'code', lang: 'js', tryIt: true, value: `console.log(Math.round(4.6));   // 5
console.log(Math.floor(4.9));   // 4
console.log(Math.ceil(4.1));    // 5
console.log(Math.max(3, 9, 2)); // 9
console.log(Math.sqrt(81));     // 9

// Random whole number from 1 to 6, like a dice
const dice = Math.floor(Math.random() * 6) + 1;
console.log('Dice:', dice);` },
        { type: 'heading', value: 'Special values' },
        { type: 'list', items: [
          'NaN means "Not a Number", the result of invalid math like "abc" * 2',
          'Infinity is the result of dividing by zero',
          'Number.isNaN(x) checks for NaN safely',
        ] },
        { type: 'note', value: 'Computers store decimals in binary, so 0.1 + 0.2 is not exactly 0.3. For money, calculate in whole paisa or use toFixed() for display.' },
      ],
    },
    {
      id: 'js-strings',
      title: 'Strings',
      blocks: [
        { type: 'text', value: 'Strings hold text. They have many built-in methods. Strings never change; methods return a new string.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const text = '  Learn JavaScript  ';

console.log(text.length);            // 20
console.log(text.trim());            // "Learn JavaScript"
console.log(text.toUpperCase());
console.log(text.includes('Java'));  // true
console.log(text.trim().split(' ')); // ["Learn", "JavaScript"]

const word = 'CodeNest';
console.log(word[0]);                // "C"
console.log(word.at(-1));            // "t" (last character)
console.log(word.slice(0, 4));       // "Code"
console.log(word.replace('Nest', 'Lab'));
console.log(word.startsWith('Code'));
console.log('ha'.repeat(3));         // "hahaha"
console.log('5'.padStart(3, '0'));   // "005"` },
        { type: 'heading', value: 'Joining strings' },
        { type: 'code', lang: 'js', tryIt: true, value: `const first = 'Rahim';
const last = 'Uddin';
console.log(first + ' ' + last);` },
      ],
    },
    {
      id: 'js-template-literals',
      title: 'Template Literals',
      blocks: [
        { type: 'text', value: 'Strings written with backticks (`) can contain variables and expressions inside ${ }, and can span multiple lines. They are the modern way to build text.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const name = 'Nadia';
const lessons = 12;

console.log(\`Hi \${name}, you finished \${lessons} lessons!\`);
console.log(\`Next goal: \${lessons + 3} lessons\`);
console.log(\`Status: \${lessons > 10 ? 'On fire' : 'Keep going'}\`);

const card = \`
  Name: \${name}
  Progress: \${lessons}/52
\`;
console.log(card);` },
        { type: 'note', value: 'Inside ${ } you can put any expression: math, function calls, even another template literal.' },
      ],
    },
    {
      id: 'js-booleans',
      title: 'Booleans and Comparisons',
      blocks: [
        { type: 'text', value: 'A boolean is true or false. Comparisons produce booleans, and they drive every decision in a program.' },
        { type: 'code', lang: 'js', tryIt: true, value: `console.log(5 > 3);     // true
console.log(5 <= 3);    // false
console.log(5 === 5);   // true  (equal value AND type)
console.log(5 === '5'); // false (number vs string)
console.log(5 == '5');  // true  (loose: converts types first)
console.log(5 !== 3);   // true` },
        { type: 'heading', value: 'Truthy and falsy' },
        { type: 'text', value: 'In conditions, every value acts as true or false. Only these are falsy: false, 0, "" (empty string), null, undefined and NaN. Everything else is truthy, including "0", [] and {}.' },
        { type: 'code', lang: 'js', tryIt: true, value: `console.log(Boolean(0));      // false
console.log(Boolean(''));     // false
console.log(Boolean('0'));    // true
console.log(Boolean([]));     // true

const username = '';
if (!username) console.log('Please enter a username');` },
        { type: 'note', value: 'Always use === and !==. The loose == has surprising conversion rules that cause bugs.' },
      ],
    },
    {
      id: 'js-type-conversion',
      title: 'Type Conversion',
      blocks: [
        { type: 'text', value: 'Values from inputs and URLs are always strings. Convert them before doing math.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const input = '25';

console.log(input + 5);          // "255" (string joining!)
console.log(Number(input) + 5);  // 30
console.log(parseInt('42px'));   // 42
console.log(parseFloat('3.5kg'));// 3.5
console.log(Number('hello'));    // NaN

console.log(String(99));         // "99"
console.log((99).toString());    // "99"
console.log(Boolean(1));         // true` },
        { type: 'heading', value: 'Automatic conversion' },
        { type: 'code', lang: 'js', tryIt: true, value: `console.log('5' * 2);   // 10  (* converts to number)
console.log('5' - 2);   // 3
console.log('5' + 2);   // "52" (+ prefers strings)
console.log(true + 1);  // 2` },
        { type: 'note', value: 'The + operator joins strings if either side is a string. Convert input with Number() first to avoid "255" bugs.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'data-types', q: 'What does typeof [] return?', options: ['array', 'list', 'object', 'undefined'], answer: 2, explain: 'Arrays are a kind of object. Use Array.isArray() to check for arrays.' },
    { chapterId: 'data-types', q: 'What is the result of 10 % 3?', options: ['3', '1', '3.33', '0'], answer: 1, explain: '% gives the remainder of the division.' },
    { chapterId: 'data-types', q: 'What does "5" + 2 produce?', options: ['7', '"52"', 'NaN', 'Error'], answer: 1, explain: '+ joins strings when one side is a string.' },
    { chapterId: 'data-types', q: 'Which value is truthy?', options: ['0', '""', 'null', '"0"'], answer: 3, explain: 'A non-empty string is truthy, even "0".' },
    { chapterId: 'data-types', q: 'What does 5 === "5" return?', options: ['true', 'false', 'undefined', 'Error'], answer: 1, explain: '=== compares type too: number is not string.' },
    { chapterId: 'data-types', q: 'How do you insert a variable into a template literal?', options: ['{name}', '$name', '${name}', '#{name}'], answer: 2, explain: 'Template literals use ${expression} inside backticks.' },
  ],
};
