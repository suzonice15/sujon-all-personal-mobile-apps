// TypeScript chapter: Generics.

export default {
  id: 'generics',
  title: 'Generics',
  description: 'Write reusable code that keeps its types',
  icon: 'code-off',
  lessons: [
    {
      id: 'ts-generic-functions',
      title: 'Generic functions',
      blocks: [
        { type: 'text', value: 'A generic function works with many types while preserving the relationship between input and output. Instead of any, you declare a type parameter such as T.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `function first<T>(items: T[]): T | undefined {
  return items[0];
}

console.log(first([10, 20, 30]));
console.log(first(['a', 'b']));` },
        { type: 'text', value: 'The return type follows the input. first([1,2,3]) returns number | undefined, while first(["a"]) returns string | undefined. With any you would lose that information.' },
        { type: 'note', value: 'TypeScript usually infers the type argument from the call, so you rarely write first<number>(...). Write it explicitly when inference needs help.' },
      ],
    },
    {
      id: 'ts-generic-constraints',
      title: 'Constraints',
      blocks: [
        { type: 'text', value: 'A constraint says what a type parameter must be able to do. extends { length: number } allows arrays and strings, because both have a length, while blocking numbers.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest('short', 'longer'));
console.log(longest([1, 2], [1, 2, 3]));` },
        { type: 'text', value: 'Constraints keep a function flexible without giving up safety. Without the constraint, reading .length would be a compile error because T could be anything.' },
        { type: 'note', value: 'keyof is a common constraint: K extends keyof T means K must be one of the keys of T. The next chapters use it for utility types.' },
      ],
    },
    {
      id: 'ts-generic-interfaces',
      title: 'Generic interfaces and classes',
      blocks: [
        { type: 'text', value: 'Interfaces and classes can be generic too. A generic API response is the classic example: the envelope is always the same, the data changes.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `interface ApiResponse<T> {
  success: boolean;
  data: T;
}

function ok<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

console.log(ok({ id: 1, title: 'SQL' }));
console.log(ok([1, 2, 3]));` },
        { type: 'code', lang: 'ts', tryIt: true, value: `class Box<T> {
  constructor(private value: T) {}

  get(): T {
    return this.value;
  }
}

const box = new Box<{ title: string }>({ title: 'SQL' });
console.log(box.get().title);` },
        { type: 'note', value: 'Generic classes are useful for containers such as Box, Stack or Cache. Do not add a type parameter when a concrete type would be clearer.' },
      ],
    },
    {
      id: 'ts-keyof-generics',
      title: 'keyof and indexed access',
      blocks: [
        { type: 'text', value: 'keyof T is the union of the property names of T. T[K] is the type of the value at that key. Together they let a function read any property while keeping the exact return type.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const course = { title: 'SQL', price: 5000 };

console.log(getValue(course, 'title'));
console.log(getValue(course, 'price'));` },
        { type: 'text', value: 'Calling getValue(course, "tiitle") is a compile error, so typos in keys are caught. The return type is string for title and number for price, not a broad union.' },
        { type: 'note', value: 'This is the foundation of libraries such as React Hook Form and many ORMs. Once keyof clicks, utility types become much easier to read.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'generics',
      q: 'What is a type parameter?',
      options: ['A runtime variable', 'A placeholder type filled in by the caller', 'A CSS class', 'A database column'],
      answer: 1,
      explain: 'A type parameter such as T is supplied by the caller or inferred by the compiler.',
    },
    {
      chapterId: 'generics',
      q: 'What does T extends { length: number } mean?',
      options: [
        'T must be a number',
        'T must have a length property',
        'T is optional',
        'T is an array only',
      ],
      answer: 1,
      explain: 'The constraint requires a length property, which arrays and strings have.',
    },
    {
      chapterId: 'generics',
      q: 'What does keyof T produce?',
      options: ['The values of T', 'A union of the property names of T', 'The number of keys', 'A copy of T'],
      answer: 1,
      explain: 'keyof T is the union of the keys, for example "title" | "price".',
    },
    {
      chapterId: 'generics',
      q: 'Why is a generic better than any here?',
      options: [
        'It runs faster',
        'It keeps the input and output types linked',
        'It shortens the code',
        'It disables strict mode',
      ],
      answer: 1,
      explain: 'Generics preserve the relationship between types, while any erases all type information.',
    },
    {
      chapterId: 'generics',
      q: 'When is a generic interface useful?',
      options: [
        'When the shape is the same but the data type changes',
        'Only for arrays',
        'When every value is a string',
        'When you want to disable checking',
      ],
      answer: 0,
      explain: 'Containers and API envelopes reuse the same shape with different payload types.',
    },
  ],
};
