// TypeScript chapter: Objects and Interfaces.

export default {
  id: 'objects-interfaces',
  title: 'Objects & Interfaces',
  description: 'Describe the shape of your data',
  icon: 'data-object',
  lessons: [
    {
      id: 'ts-object-types',
      title: 'Object types',
      blocks: [
        { type: 'text', value: 'An object type lists the properties and their types. It is the most common annotation in real projects because data usually travels as objects.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `const student: { name: string; age: number } = {
  name: 'Ayesha',
  age: 21,
};

console.log(student.name, student.age);` },
        { type: 'text', value: 'The compiler checks that every required property exists and that no unknown property is added. A typo such as nmae is caught immediately.' },
        { type: 'note', value: 'Object types are structural. As long as the shape matches, TypeScript accepts the value, even if it came from a different class or a plain literal.' },
      ],
    },
    {
      id: 'ts-interfaces',
      title: 'Interfaces',
      blocks: [
        { type: 'text', value: 'An interface gives a name to an object shape. Reusing the name keeps function signatures short and lets the editor show the shape on hover.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `interface Course {
  id: number;
  title: string;
  price: number;
  tags?: string[];
}

const sql: Course = {
  id: 1,
  title: 'SQL',
  price: 5000,
};

console.log(sql.title, sql.price);
console.log(sql.tags);` },
        { type: 'text', value: 'A question mark makes a property optional. Optional properties may be missing or undefined, so the compiler forces you to check before using them.' },
        { type: 'note', value: 'Prefer interfaces for object shapes that may be extended, and type aliases for unions, tuples and primitives. Both work for most cases; consistency matters more than the choice.' },
      ],
    },
    {
      id: 'ts-type-alias-readonly',
      title: 'Type aliases and readonly',
      blocks: [
        { type: 'text', value: 'A type alias names any type, not just objects. readonly stops a property from being reassigned after creation, which prevents accidental mutation.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `type Point = { x: number; y: number };

interface Config {
  readonly apiUrl: string;
  retries?: number;
}

const config: Config = { apiUrl: 'https://api.example.com' };
const point: Point = { x: 10, y: 20 };

console.log(config.apiUrl, config.retries);
console.log(point.x + point.y);` },
        { type: 'text', value: 'readonly is checked by the compiler only. It is not a runtime freeze. For real immutability use Object.freeze as well.' },
        { type: 'note', value: 'readonly on an array is ReadonlyArray<T> or readonly T[]. It prevents push and index assignment, which is useful for function parameters you do not want to mutate.' },
      ],
    },
    {
      id: 'ts-index-signatures',
      title: 'Index signatures',
      blocks: [
        { type: 'text', value: 'Sometimes the property names are not known in advance, for example a dictionary of scores by student name. An index signature describes that pattern.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `interface Scores {
  [studentName: string]: number;
}

const scores: Scores = {
  Ayesha: 92,
  Rahim: 78,
};

scores.Nusrat = 88;
console.log(scores.Ayesha, scores.Nusrat);` },
        { type: 'text', value: 'An index signature forces every property to match the value type. If you need mixed values, use a union or a more specific object shape.' },
        { type: 'note', value: 'With noUncheckedIndexedAccess enabled, reading an unknown key returns T | undefined. That is safer and catches missing dictionary entries.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'objects-interfaces',
      q: 'How do you make an interface property optional?',
      options: ['readonly', 'name?', 'optional name', 'name!'],
      answer: 1,
      explain: 'A question mark after the property name marks it optional.',
    },
    {
      chapterId: 'objects-interfaces',
      q: 'What does readonly do?',
      options: ['Encrypts the value', 'Prevents reassignment after creation', 'Makes the value optional', 'Deletes the property'],
      answer: 1,
      explain: 'readonly is a compile-time check that blocks writes to the property.',
    },
    {
      chapterId: 'objects-interfaces',
      q: 'What is an index signature for?',
      options: [
        'Describing objects with dynamic property names',
        'Creating database indexes',
        'Sorting arrays',
        'Importing modules',
      ],
      answer: 0,
      explain: 'It declares the type of values for keys that are not known ahead of time.',
    },
    {
      chapterId: 'objects-interfaces',
      q: 'Is TypeScript object typing structural or nominal?',
      options: ['Structural: shape matters', 'Nominal: class name matters', 'Random', 'Only for interfaces'],
      answer: 0,
      explain: 'If the shape matches, the value is accepted, regardless of where it came from.',
    },
    {
      chapterId: 'objects-interfaces',
      q: 'What happens if you add an unknown property to an object literal typed with an interface?',
      options: ['It is ignored', 'It is a compile error', 'It becomes any', 'It is deleted at runtime'],
      answer: 1,
      explain: 'Object literals are checked for excess properties, which catches typos.',
    },
  ],
};
