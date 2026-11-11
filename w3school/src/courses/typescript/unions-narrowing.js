// TypeScript chapter: Unions and Narrowing.

export default {
  id: 'unions-narrowing',
  title: 'Unions & Narrowing',
  description: 'Model alternatives and prove the type before using it',
  icon: 'alt-route',
  lessons: [
    {
      id: 'ts-union-basics',
      title: 'Union types',
      blocks: [
        { type: 'text', value: 'A union says a value can be one of several types. Write the types separated by a pipe. The compiler allows only operations that are valid for every member until you narrow the value.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `let id: string | number = 10;
console.log(id);

id = 'ABC-10';
console.log(id);` },
        { type: 'text', value: 'Unions are common for values that arrive in different shapes, such as an id that may be a number or a string from an API.' },
        { type: 'note', value: 'Calling id.toUpperCase() directly is an error, because number has no toUpperCase. That error is useful: you must check the actual type first.' },
      ],
    },
    {
      id: 'ts-literal-types',
      title: 'Literal types',
      blocks: [
        { type: 'text', value: 'A literal type accepts one exact value. Joining literals gives a small set of allowed strings, which is perfect for status values and roles.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `type Status = 'pending' | 'approved' | 'rejected';

function label(status: Status): string {
  return 'Status: ' + status;
}

console.log(label('approved'));` },
        { type: 'text', value: 'Passing "aproved" with a typo is now a compile error, and the editor offers the three valid values as autocomplete.' },
        { type: 'note', value: 'Use an object of constants when you need the values at runtime, for example const STATUS = { pending: "pending", ... } as const. The type can then be derived with typeof.' },
      ],
    },
    {
      id: 'ts-narrowing',
      title: 'Narrowing',
      blocks: [
        { type: 'text', value: 'Narrowing is how you prove the type inside a branch. typeof handles primitives, instanceof handles classes, and the in operator checks whether a property exists.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `function format(value: string | number): string {
  if (typeof value === 'number') {
    return value.toFixed(1);
  }
  return value.toUpperCase();
}

console.log(format(12.345));
console.log(format('ok'));` },
        { type: 'code', lang: 'ts', tryIt: true, value: `interface Cat { meow(): string }
interface Dog { bark(): string }

function speak(animal: Cat | Dog): string {
  if ('meow' in animal) return animal.meow();
  return animal.bark();
}

console.log(speak({ meow: () => 'meow' }));
console.log(speak({ bark: () => 'woof' }));` },
        { type: 'note', value: 'After an if/else, the remaining type is never. If it is not never, you forgot a case. That is how exhaustive checks work.' },
      ],
    },
    {
      id: 'ts-discriminated-unions',
      title: 'Discriminated unions',
      blocks: [
        { type: 'text', value: 'A discriminated union gives every member a shared literal property, usually called kind or type. Switch on that property and TypeScript narrows the whole object.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.side ** 2;
    default: {
      const unreachable: never = shape;
      return unreachable;
    }
  }
}

console.log(area({ kind: 'circle', radius: 2 }).toFixed(2));
console.log(area({ kind: 'square', side: 3 }));` },
        { type: 'text', value: 'This pattern is everywhere in real apps: API responses, form states, redux actions, navigation params. It is the safest way to model "one of these possibilities".' },
        { type: 'note', value: 'Adding a new kind to the union immediately breaks the never assignment in default, so the compiler shows every place that must be updated.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'unions-narrowing',
      q: 'What does string | number mean?',
      options: ['Both at once', 'Either a string or a number', 'A string and a number', 'Neither'],
      answer: 1,
      explain: 'A union means the value is one of the listed types.',
    },
    {
      chapterId: 'unions-narrowing',
      q: 'Which operator checks a primitive type at runtime?',
      options: ['typeof', 'instanceof', 'in', 'keyof'],
      answer: 0,
      explain: 'typeof returns a string such as "string" or "number" and narrows the type.',
    },
    {
      chapterId: 'unions-narrowing',
      q: 'What is a literal type?',
      options: ['A type that accepts one exact value', 'A type with no value', 'A string variable', 'A runtime check'],
      answer: 0,
      explain: 'For example the type "approved" accepts only that exact string.',
    },
    {
      chapterId: 'unions-narrowing',
      q: 'What is a discriminated union?',
      options: [
        'A union with a shared literal property used for narrowing',
        'A union of two primitives',
        'A type that changes at runtime',
        'An interface with optional fields',
      ],
      answer: 0,
      explain: 'A common kind/type field lets a switch narrow each member precisely.',
    },
    {
      chapterId: 'unions-narrowing',
      q: 'Why assign the last case to never?',
      options: [
        'To make the code run faster',
        'To make the compiler report a missing case',
        'To allow any type',
        'To remove the value',
      ],
      answer: 1,
      explain: 'If a new union member is added, the assignment fails and points to the unhandled case.',
    },
  ],
};
