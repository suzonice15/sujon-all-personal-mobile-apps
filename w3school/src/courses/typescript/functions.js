// TypeScript chapter: Functions.

export default {
  id: 'functions',
  title: 'Functions',
  description: 'Parameters, return types, callbacks and overloads',
  icon: 'functions',
  lessons: [
    {
      id: 'ts-function-basics',
      title: 'Parameters and return types',
      blocks: [
        { type: 'text', value: 'A function signature is a contract. The parameters say what the caller must provide and the return type says what the caller will receive. TypeScript checks both.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));` },
        { type: 'text', value: 'If you leave out the return type, TypeScript infers it from the return statements. Annotating it makes mistakes visible: returning a string from a function declared to return number fails to compile.' },
        { type: 'note', value: 'A missing argument is a compile error, and an extra argument is also an error. That is stricter than JavaScript, where both are silently allowed.' },
      ],
    },
    {
      id: 'ts-optional-default-rest',
      title: 'Optional, default and rest parameters',
      blocks: [
        { type: 'text', value: 'Put a question mark after a parameter name to make it optional. Provide a default value to make it optional and give it a fallback. Use ... to collect any number of remaining arguments.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `function greet(name: string, title?: string): string {
  return title ? title + ' ' + name : name;
}

function total(...values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}

console.log(greet('Ayesha'));
console.log(greet('Rahim', 'Mr.'));
console.log(total(10, 20, 30));` },
        { type: 'text', value: 'Optional parameters must come after required ones. A default value also makes the parameter optional at the call site.' },
        { type: 'note', value: 'With strictNullChecks, an optional parameter has the type string | undefined inside the function. Handle the undefined case instead of assuming a value.' },
      ],
    },
    {
      id: 'ts-function-types',
      title: 'Function types and callbacks',
      blocks: [
        { type: 'text', value: 'Functions are values, so they have types too. A function type describes the parameters and the return value, and it can be reused for every callback with the same shape.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `type Mapper = (value: number) => number;

const double: Mapper = (value) => value * 2;

function applyAll(values: number[], fn: Mapper): number[] {
  return values.map(fn);
}

console.log(applyAll([1, 2, 3], double));` },
        { type: 'text', value: 'Inline arrow functions get their parameter types from the expected type. That is called contextual typing and it removes a lot of noise.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `const scores = [85, 92, 78];

// value is inferred as number from the array
const doubled = scores.map((value) => value * 2);

console.log(doubled);` },
      ],
    },
    {
      id: 'ts-overloads',
      title: 'Overloads',
      blocks: [
        { type: 'text', value: 'An overload lets one function accept different combinations of arguments while keeping a precise return type. Write the allowed signatures first, then one implementation that handles them all.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return typeof value === 'number' ? value.toFixed(2) : value.trim();
}

console.log(format(3.14159));
console.log(format('  hello  '));` },
        { type: 'text', value: 'Use overloads when the return type actually depends on the input, for example an API that returns a string for one option and a number for another. Otherwise a union parameter is simpler.' },
        { type: 'note', value: 'The implementation signature is not callable from outside. Only the listed overloads are visible to callers.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'functions',
      q: 'How do you mark a parameter as optional?',
      options: ['name!', 'name?', 'optional name', 'name = optional'],
      answer: 1,
      explain: 'A question mark after the name makes the parameter optional.',
    },
    {
      chapterId: 'functions',
      q: 'What does ...values: number[] collect?',
      options: ['The first argument', 'All remaining arguments as an array', 'A single number', 'A tuple of two values'],
      answer: 1,
      explain: 'A rest parameter gathers the remaining arguments into an array.',
    },
    {
      chapterId: 'functions',
      q: 'What is contextual typing?',
      options: [
        'The compiler infers parameter types from the expected function type',
        'Types are read from a config file',
        'The browser guesses types at runtime',
        'A function returns its own type',
      ],
      answer: 0,
      explain: 'When an arrow function is passed where a function type is expected, its parameters get types from that context.',
    },
    {
      chapterId: 'functions',
      q: 'When are overloads useful?',
      options: [
        'When the return type depends on the arguments',
        'For every function with two parameters',
        'Only in class methods',
        'To make code run faster',
      ],
      answer: 0,
      explain: 'Overloads express several precise signatures, especially when different inputs produce different output types.',
    },
    {
      chapterId: 'functions',
      q: 'With strictNullChecks, what is the type of an optional string parameter inside the function?',
      options: ['string', 'string | undefined', 'any', 'unknown'],
      answer: 1,
      explain: 'Optional means it may be undefined, so the type includes undefined.',
    },
  ],
};
