// TypeScript chapter: Utility Types.

export default {
  id: 'utility-types',
  title: 'Utility Types',
  description: 'Transform existing types instead of repeating them',
  icon: 'build',
  lessons: [
    {
      id: 'ts-keyof-indexed',
      title: 'keyof and indexed access',
      blocks: [
        { type: 'text', value: 'Utility types are built from keyof, indexed access and mapped types. Understanding these three makes the rest predictable instead of magic.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `interface Course {
  id: number;
  title: string;
  price: number;
}

type CourseKey = keyof Course;
type TitleType = Course['title'];

const key: CourseKey = 'title';
const title: TitleType = 'SQL';

console.log(key, title);` },
        { type: 'text', value: 'keyof Course is "id" | "title" | "price". Indexed access Course["title"] is string. Both are computed from the interface, so they never drift out of sync.' },
        { type: 'note', value: 'When you change the interface, every derived type updates automatically. That is the main advantage over copying the shape by hand.' },
      ],
    },
    {
      id: 'ts-partial-required-readonly',
      title: 'Partial, Required and Readonly',
      blocks: [
        { type: 'text', value: 'Partial<T> makes every property optional, which is perfect for drafts and update payloads. Required<T> does the opposite. Readonly<T> blocks reassignment.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `interface Course {
  id: number;
  title: string;
  price: number;
}

const draft: Partial<Course> = { title: 'New course' };

const frozen: Readonly<Course> = { id: 1, title: 'SQL', price: 5000 };

console.log(draft);
console.log(frozen.title);` },
        { type: 'text', value: 'A common API pattern is a create payload without an id and an update payload where every field is optional. Utility types express both without duplicating the interface.' },
        { type: 'note', value: 'Partial is shallow. Nested objects keep their required properties. For deep updates use a DeepPartial helper from a library or write one with mapped types.' },
      ],
    },
    {
      id: 'ts-pick-omit-record',
      title: 'Pick, Omit and Record',
      blocks: [
        { type: 'text', value: 'Pick<T, K> keeps only the listed keys. Omit<T, K> removes them. Record<K, V> builds an object type whose keys come from K and whose values are V.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, 'password'>;
type UserSummary = Pick<User, 'id' | 'name'>;
type Roles = Record<string, string[]>;

const summary: UserSummary = { id: 1, name: 'Ayesha' };
const roles: Roles = { admin: ['read', 'write'], viewer: ['read'] };

console.log(summary);
console.log(roles.admin);` },
        { type: 'text', value: 'Omit is the safest way to hide sensitive fields from a public API type. If someone later adds a secret column to User, it is not automatically exposed unless they change the Omit list.' },
        { type: 'note', value: 'Omit<T, K> is not the exact opposite of Pick when K is a union. It removes the listed keys; it does not keep only the others in every edge case. Prefer Pick when you want an allow-list.' },
      ],
    },
    {
      id: 'ts-returntype-parameters',
      title: 'ReturnType, Parameters and Awaited',
      blocks: [
        { type: 'text', value: 'ReturnType<typeof fn> extracts a function return type. Parameters<typeof fn> extracts its parameter tuple. Awaited<T> unwraps a Promise type.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `function createCourse(title: string, price: number) {
  return { title, price, active: true };
}

type Course = ReturnType<typeof createCourse>;
type CourseArgs = Parameters<typeof createCourse>;

const args: CourseArgs = ['SQL', 5000];
const course: Course = createCourse(...args);

console.log(course);` },
        { type: 'text', value: 'These are useful when a type comes from a library or a function you do not want to duplicate. Derive it instead of writing it twice.' },
        { type: 'note', value: 'ReturnType is only as precise as the function signature. An async function returns Promise<T>, so wrap it with Awaited<ReturnType<...>> to get T.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'utility-types',
      q: 'What does Partial<Course> do?',
      options: ['Makes every property optional', 'Removes every property', 'Makes every property readonly', 'Adds an id'],
      answer: 0,
      explain: 'Partial makes all properties optional, useful for drafts and patches.',
    },
    {
      chapterId: 'utility-types',
      q: 'Which utility hides the password field from a User type?',
      options: ['Pick<User, "password">', 'Omit<User, "password">', 'Partial<User>', 'Required<User>'],
      answer: 1,
      explain: 'Omit removes the listed key from the resulting type.',
    },
    {
      chapterId: 'utility-types',
      q: 'What does Record<string, number> describe?',
      options: ['An array of numbers', 'An object with string keys and number values', 'A string or a number', 'A function'],
      answer: 1,
      explain: 'Record builds a dictionary type from a key type and a value type.',
    },
    {
      chapterId: 'utility-types',
      q: 'What does ReturnType<typeof createCourse> give you?',
      options: ['The function itself', 'The type the function returns', 'The parameter names', 'A runtime value'],
      answer: 1,
      explain: 'It extracts the return type of the function type.',
    },
    {
      chapterId: 'utility-types',
      q: 'What does Readonly<T> actually do at runtime?',
      options: ['Freezes the object', 'Nothing; it is a compile-time check', 'Copies the object', 'Deletes the keys'],
      answer: 1,
      explain: 'Readonly only prevents assignment in TypeScript. Use Object.freeze for runtime immutability.',
    },
  ],
};
