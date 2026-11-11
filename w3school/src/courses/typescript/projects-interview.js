// TypeScript chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Projects & Interview Prep',
  description: 'Build typed utilities and answer real interview questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'ts-project-store',
      title: 'Project: typed course store',
      blocks: [
        { type: 'text', value: 'Build a small in-memory store with typed methods. This mirrors the data layer of a real app: add, find, filter and total, all checked by the compiler.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `interface Course {
  id: number;
  title: string;
  price: number;
}

class CourseStore {
  private items: Course[] = [];

  add(course: Course): void {
    this.items.push(course);
  }

  find(id: number): Course | undefined {
    return this.items.find((course) => course.id === id);
  }

  under(maxPrice: number): Course[] {
    return this.items.filter((course) => course.price <= maxPrice);
  }

  total(): number {
    return this.items.reduce((sum, course) => sum + course.price, 0);
  }
}

const store = new CourseStore();
store.add({ id: 1, title: 'SQL', price: 5000 });
store.add({ id: 2, title: 'TypeScript', price: 5500 });
store.add({ id: 3, title: 'Git', price: 2000 });

console.log(store.find(2)?.title);
console.log(store.under(5000).map((course) => course.title));
console.log(store.total());` },
        { type: 'note', value: 'Notice optional chaining with ?. after find returns Course | undefined. The compiler forces you to handle the missing case instead of crashing at runtime.' },
      ],
    },
    {
      id: 'ts-project-result',
      title: 'Project: a Result type',
      blocks: [
        { type: 'text', value: 'A Result type models success and failure without throwing. It is a discriminated union, so the compiler forces you to handle both branches.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function parseAge(input: string): Result<number> {
  const value = Number(input);
  if (!Number.isInteger(value) || value < 0) {
    return { ok: false, error: 'Age must be a positive whole number' };
  }
  return { ok: true, value };
}

for (const input of ['21', 'abc', '-5']) {
  const result = parseAge(input);
  console.log(input, '->', result.ok ? result.value : result.error);
}` },
        { type: 'text', value: 'This pattern is common in validation, API clients and parsers. It makes failure explicit in the type instead of hiding it in exceptions or a nullable value.' },
        { type: 'note', value: 'Discriminated unions plus exhaustive checks are the backbone of safe TypeScript. Once you are comfortable with Result, many other patterns become obvious.' },
      ],
    },
    {
      id: 'ts-project-api-client',
      title: 'Project: typed API client',
      blocks: [
        { type: 'text', value: 'A typed API client keeps the response shape in one place. Every screen that fetches data then gets autocomplete and error checking for free.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface Course {
  id: number;
  title: string;
  price: number;
}

async function getCourse(id: number): Promise<ApiEnvelope<Course>> {
  const response = await fetch('https://example.com/api/courses/' + id);
  if (!response.ok) {
    return { success: false, data: {} as Course, message: 'Request failed' };
  }
  return (await response.json()) as ApiEnvelope<Course>;
}

const result = await getCourse(1);
if (result.success) {
  console.log(result.data.title);
}` },
        { type: 'text', value: 'At a real boundary, validate the JSON with a schema library (Zod, Valibot) instead of trusting a cast. A cast is a promise to the compiler that the data matches; the network makes no such promise.' },
        { type: 'note', value: 'This is the most important lesson of the course: types do not validate runtime data. Use types for your own code and a validator at the edges where data enters.' },
      ],
    },
    {
      id: 'ts-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'text', value: 'TypeScript interviews test reasoning more than syntax. Practise explaining why a type is safe, not just what keyword to write.' },
        { type: 'list', items: [
          'What is the difference between any, unknown and never?',
          'Explain structural typing with an example.',
          'When do you use an interface and when a type alias?',
          'What does strictNullChecks change?',
          'How do generics preserve type information?',
          'What is a discriminated union and why is it useful?',
          'What is the difference between Partial, Pick and Omit?',
          'How do you validate data coming from an API?',
          'Why can TypeScript not catch every runtime bug?',
          'How do you migrate a JavaScript project to TypeScript safely?',
        ] },
        { type: 'code', lang: 'ts', tryIt: true, value: `// A small exercise: make this function type-safe
type User = { id: number; name: string; email?: string };

function label(user: User): string {
  return user.email ? user.name + ' <' + user.email + '>' : user.name;
}

console.log(label({ id: 1, name: 'Ayesha' }));
console.log(label({ id: 2, name: 'Rahim', email: 'rahim@example.com' }));` },
        { type: 'note', value: 'A strong answer mentions trade-offs: strictness versus velocity, validation at the boundary, and the fact that types are erased at runtime.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What does find return when nothing matches?',
      options: ['null', 'undefined', 'an empty object', 'an error'],
      answer: 1,
      explain: 'Array.find returns undefined, so the type is T | undefined and must be checked.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a Result type safe?',
      options: [
        'It is a discriminated union, so both branches must be handled',
        'It uses any',
        'It throws exceptions',
        'It is optional',
      ],
      answer: 0,
      explain: 'The ok: true / ok: false discriminant lets the compiler narrow and force handling of failure.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why is casting API JSON with as risky?',
      options: [
        'It is slow',
        'It trusts data that may not match at runtime',
        'It removes all types',
        'It is not allowed in strict mode',
      ],
      answer: 1,
      explain: 'A cast only tells the compiler to believe you. If the server sends a different shape, the app can crash.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What does structural typing mean?',
      options: [
        'Types are compared by shape, not by name',
        'Types are compared by class name',
        'Only interfaces are allowed',
        'Every object needs a constructor',
      ],
      answer: 0,
      explain: 'If the shape matches, the value is compatible, regardless of where it was defined.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the safest way to handle unknown API data?',
      options: [
        'Cast it with as',
        'Validate it with a schema at the boundary',
        'Use any',
        'Ignore errors',
      ],
      answer: 1,
      explain: 'Runtime validation proves the shape. Types alone disappear at runtime.',
    },
  ],
};
