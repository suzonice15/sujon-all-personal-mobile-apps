// TypeScript chapter: Basic Types.

export default {
  id: 'basic-types',
  title: 'Basic Types',
  description: 'Primitives, arrays, tuples and the special types',
  icon: 'category',
  lessons: [
    {
      id: 'ts-primitives',
      title: 'Primitives',
      blocks: [
        { type: 'text', value: 'The three most common types are string for text, number for every numeric value (there is no separate int or float), and boolean for true or false.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `let studentName: string = 'Ayesha';
let age: number = 21;
let active: boolean = true;

console.log(studentName, age, active);` },
        { type: 'text', value: 'Use lower case type names. String with a capital S is the wrapper object and almost never what you want. The same applies to Number and Boolean.' },
        { type: 'note', value: 'number covers integers, decimals, Infinity and NaN. For money, store integer paisa or cents, or use a decimal library. Floating point rounding is a JavaScript issue, not a TypeScript one.' },
      ],
    },
    {
      id: 'ts-arrays-tuples',
      title: 'Arrays and tuples',
      blocks: [
        { type: 'text', value: 'An array type is written as number[] or Array<number>. Every element must be the same type. A tuple fixes the length and the type at each position.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `const scores: number[] = [85, 92, 78];
const names: Array<string> = ['Ayesha', 'Rahim'];

const topStudent: [string, number] = ['Ayesha', 92];

console.log(scores, names);
console.log(topStudent[0], topStudent[1]);` },
        { type: 'text', value: 'Tuples are useful for a function that returns two values, such as [value, error] or [latitude, longitude]. They are less useful for ordinary lists.' },
        { type: 'note', value: 'A tuple does not stop you from pushing extra items in older TypeScript versions with certain settings. Prefer a small object with named fields when the data has meaning.' },
      ],
    },
    {
      id: 'ts-any-unknown-never',
      title: 'any, unknown and never',
      blocks: [
        { type: 'text', value: 'any disables type checking for a value. unknown is the safe version: you must narrow it before using it. never means a value that can never exist, such as a function that always throws.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `let loose: any = 'hello';
console.log(loose.toUpperCase());

let safe: unknown = 'hello';
if (typeof safe === 'string') {
  console.log(safe.toUpperCase());
}

function fail(message: string): never {
  throw new Error(message);
}

console.log('The program continues');` },
        { type: 'text', value: 'Treat any as a temporary escape hatch. In a strict project, unknown forces you to prove the type before using it, which prevents runtime crashes.' },
        { type: 'note', value: 'unknown is the correct type for data coming from JSON, localStorage, a network response or user input. Parse and validate it before trusting it.' },
      ],
    },
    {
      id: 'ts-annotate-or-infer',
      title: 'Annotate or infer?',
      blocks: [
        { type: 'text', value: 'Annotate when the type is part of a public contract: function parameters, return values, exported constants and object shapes. Infer when the type is obvious from the value.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `// Obvious: infer
const count = 3;
const label = 'students';

// Contract: annotate
function repeat(text: string, times: number): string {
  return text.repeat(times);
}

console.log(label, count, repeat('ha', 3));` },
        { type: 'list', items: [
          'Do annotate function parameters, because the compiler cannot know the caller',
          'Do annotate exported functions so callers get a stable contract',
          'Do not annotate a variable that is initialised with an obvious literal',
          'Avoid any; prefer unknown plus a check',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'basic-types',
      q: 'Which type holds true or false?',
      options: ['string', 'number', 'boolean', 'boolean[]'],
      answer: 2,
      explain: 'boolean is the primitive type for true and false.',
    },
    {
      chapterId: 'basic-types',
      q: 'How do you type an array of numbers?',
      options: ['number[]', 'array<number>', 'numbers', 'int[]'],
      answer: 0,
      explain: 'number[] and Array<number> are both valid. int[] is not a TypeScript type.',
    },
    {
      chapterId: 'basic-types',
      q: 'What is the difference between any and unknown?',
      options: [
        'They are identical',
        'unknown must be narrowed before use; any disables checking',
        'any is only for numbers',
        'unknown is removed at runtime',
      ],
      answer: 1,
      explain: 'unknown is safe because you must prove the type. any opts out of checking entirely.',
    },
    {
      chapterId: 'basic-types',
      q: 'What does the never type describe?',
      options: ['An empty string', 'A value that cannot exist', 'A nullable value', 'An unknown value'],
      answer: 1,
      explain: 'never is used for functions that always throw or for impossible branches in exhaustive checks.',
    },
    {
      chapterId: 'basic-types',
      q: 'Which tuple type fits a coordinate pair?',
      options: ['number[]', '[number, number]', 'Array<number>', '{ x: number }'],
      answer: 1,
      explain: 'A tuple fixes both the length and the position types: exactly two numbers.',
    },
  ],
};
