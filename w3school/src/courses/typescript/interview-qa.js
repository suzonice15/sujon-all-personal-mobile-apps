// TypeScript interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced', code?, lang? }

export default {
  'getting-started': [
    {
      q: 'What is TypeScript?',
      a: 'A superset of JavaScript that adds optional static types. The compiler checks the types and emits plain JavaScript, so it runs anywhere JavaScript runs.',
      level: 'basic',
    },
    {
      q: 'Does TypeScript run in the browser?',
      a: 'No. Browsers and devices run JavaScript. TypeScript must be compiled or transpiled first, usually by tsc, Vite, Metro or another build tool.',
      level: 'basic',
    },
    {
      q: 'What is type inference?',
      a: 'The compiler works out a type from the value or context when you do not write an annotation, for example let age = 21 is inferred as number.',
      level: 'basic',
    },
    {
      q: 'Why is TypeScript useful on a team?',
      a: 'Types document contracts, catch mistakes during editing, make refactors safe and improve autocomplete. The cost is a build step and some extra syntax.',
      level: 'basic',
    },
  ],
  'basic-types': [
    {
      q: 'What is the difference between any and unknown?',
      a: 'any disables checking for the value. unknown is safe: you must narrow it with typeof, instanceof or a validator before using it. Prefer unknown for external data.',
      level: 'intermediate',
    },
    {
      q: 'What is the never type?',
      a: 'A type with no possible value. It describes functions that always throw or loop forever, and it is used in exhaustive checks where a branch is unreachable.',
      level: 'advanced',
    },
    {
      q: 'What is a tuple?',
      a: 'An array with a fixed length and a type for each position, for example [string, number]. It is useful for small fixed groups such as coordinates or [value, error].',
      level: 'basic',
    },
    {
      q: 'Why avoid String, Number and Boolean as types?',
      a: 'They refer to wrapper objects, not primitives. Use string, number and boolean. Wrapper types behave unexpectedly in comparisons and assignments.',
      level: 'intermediate',
    },
  ],
  functions: [
    {
      q: 'What is the difference between an optional parameter and a default parameter?',
      a: 'An optional parameter has type T | undefined and may be omitted. A default parameter is also optional but receives a value when omitted, so inside the function it is T.',
      level: 'basic',
    },
    {
      q: 'What is a rest parameter?',
      a: 'A parameter written ...values: T[] that collects all remaining arguments into an array. It must be last in the parameter list.',
      level: 'basic',
    },
    {
      q: 'What is function overloading?',
      a: 'Declaring several call signatures for one function so different argument combinations get precise return types, followed by a single implementation signature.',
      level: 'intermediate',
    },
    {
      q: 'What is a higher-order function?',
      a: 'A function that takes another function as an argument or returns one. Typing it means typing the callback signature, for example (value: number) => number.',
      level: 'basic',
    },
  ],
  'objects-interfaces': [
    {
      q: 'What is the difference between an interface and a type alias?',
      a: 'Both describe shapes. Interfaces can be extended and merged by declaration merging. Type aliases can represent unions, tuples and primitives and cannot be reopened.',
      level: 'intermediate',
    },
    {
      q: 'What is structural typing?',
      a: 'Compatibility is decided by shape, not by name. An object with the required properties is accepted even if it was not declared with that interface.',
      level: 'intermediate',
    },
    {
      q: 'What does readonly do?',
      a: 'It prevents reassignment of a property at compile time. It does not freeze the object at runtime; use Object.freeze for that.',
      level: 'basic',
    },
    {
      q: 'What is an index signature?',
      a: 'A declaration such as [key: string]: number that types objects whose property names are not known in advance, like a dictionary.',
      level: 'intermediate',
    },
  ],
  'unions-narrowing': [
    {
      q: 'What is a discriminated union?',
      a: 'A union where each member has a shared literal property, for example kind: "circle" or kind: "square". Switching on that property narrows the whole object.',
      level: 'intermediate',
    },
    {
      q: 'How do you narrow a union?',
      a: 'Use typeof for primitives, instanceof for classes, in for property presence, or a discriminant property. After the check, the compiler knows the narrower type.',
      level: 'basic',
    },
    {
      q: 'What does an exhaustive check look like?',
      a: 'In the default branch of a switch, assign the value to a variable of type never. If a new union member is added, the assignment fails and reveals the missing case.',
      level: 'advanced',
    },
    {
      q: 'Why are literal types useful for status values?',
      a: 'They limit the value to a known set such as "pending" | "approved" | "rejected", catching typos and giving autocomplete. They replace many runtime checks.',
      level: 'basic',
    },
  ],
  generics: [
    {
      q: 'What problem do generics solve?',
      a: 'They let code work with many types while preserving the relationship between inputs and outputs, without falling back to any and losing type safety.',
      level: 'basic',
    },
    {
      q: 'What is a generic constraint?',
      a: 'A restriction written with extends, for example T extends { id: number }. It guarantees the operations used inside the function are valid for T.',
      level: 'intermediate',
    },
    {
      q: 'What is keyof T?',
      a: 'The union of the property names of T. Combined with T[K] it lets a function read a property and return its exact type.',
      level: 'intermediate',
    },
    {
      q: 'When should you not use a generic?',
      a: 'When only one concrete type is used, or when the type parameter appears only once and does not link inputs to outputs. A specific type is simpler and clearer.',
      level: 'advanced',
    },
  ],
  'classes-oop': [
    {
      q: 'What is the difference between private and #private?',
      a: 'private is a compile-time check; the field still exists at runtime. #private is real JavaScript privacy and cannot be accessed from outside the class at runtime.',
      level: 'advanced',
    },
    {
      q: 'What is an abstract class?',
      a: 'A class that cannot be instantiated. It can share implementation and declare abstract methods that subclasses must implement.',
      level: 'intermediate',
    },
    {
      q: 'What does implements do?',
      a: 'It tells the compiler that a class satisfies an interface. The class must provide every member of the interface or compilation fails.',
      level: 'basic',
    },
    {
      q: 'What is a static member?',
      a: 'A member that belongs to the class itself rather than to instances, accessed as ClassName.member. Useful for factories, constants and counters.',
      level: 'basic',
    },
  ],
  'utility-types': [
    {
      q: 'What is the difference between Pick and Omit?',
      a: 'Pick<T, K> keeps only the listed keys. Omit<T, K> removes them. Pick is an allow-list, which is usually safer for public types.',
      level: 'intermediate',
    },
    {
      q: 'What does Partial<T> do?',
      a: 'It makes every property optional, producing T with all keys mapped to T[K] | undefined. Common for drafts and patch payloads.',
      level: 'basic',
    },
    {
      q: 'What does Record<K, V> describe?',
      a: 'An object type whose keys are K and whose values are V, for example Record<string, number> for a dictionary of scores.',
      level: 'basic',
    },
    {
      q: 'What is a mapped type?',
      a: 'A type built by iterating over the keys of another type, for example { [K in keyof T]: boolean }. Partial, Required and Readonly are mapped types.',
      level: 'advanced',
    },
  ],
  'modules-config': [
    {
      q: 'What does strict: true enable?',
      a: 'A group of checks including strictNullChecks, noImplicitAny, strictFunctionTypes and strictPropertyInitialization. It is the recommended baseline for new code.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between import type and import?',
      a: 'import type imports only the type and is removed from the output. A normal import may also bring runtime code, which matters for bundling and side effects.',
      level: 'intermediate',
    },
    {
      q: 'What is a declaration file?',
      a: 'A .d.ts file that describes the types of JavaScript code. Libraries use it so consumers get type checking and autocomplete.',
      level: 'basic',
    },
    {
      q: 'Why use noEmit in a modern build?',
      a: 'The bundler writes the JavaScript, so tsc only needs to check types. noEmit keeps the type-check step separate and fast.',
      level: 'intermediate',
    },
  ],
  'ts-with-react': [
    {
      q: 'How do you type component props?',
      a: 'Define a props type and annotate the component parameter, for example function Card({ title }: { title: string }). Optional props use ? and children use ReactNode.',
      level: 'basic',
    },
    {
      q: 'Why does useState need a generic sometimes?',
      a: 'When the initial value is null or an empty array, TypeScript infers a narrow or never type. The generic says what the state will hold later.',
      level: 'intermediate',
    },
    {
      q: 'How do you type a change event?',
      a: 'Use ChangeEvent<HTMLInputElement> from React for an input, or let an inline JSX handler infer the type from context.',
      level: 'basic',
    },
    {
      q: 'What is a generic component used for?',
      a: 'Components such as lists and tables whose item type varies. The caller gets autocomplete and the render function is checked against the item type.',
      level: 'advanced',
    },
  ],
  'testing-tooling': [
    {
      q: 'Why can a build succeed with type errors?',
      a: 'Many bundlers strip types without checking them. Run tsc --noEmit separately in CI to catch type errors.',
      level: 'basic',
    },
    {
      q: 'What does ts-jest do?',
      a: 'It compiles TypeScript for Jest and type-checks test and source files, so tests fail on type errors as well as assertion failures.',
      level: 'intermediate',
    },
    {
      q: 'Why do typed lint rules need parserOptions.project?',
      a: 'Rules such as no-floating-promises inspect types, which requires a TypeScript program. Without the project setting they cannot run.',
      level: 'advanced',
    },
    {
      q: 'How do you run a TypeScript script during development?',
      a: 'Use tsx or ts-node, for example npx tsx scripts/seed.ts. They compile on the fly and run the result in Node.',
      level: 'basic',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you migrate a JavaScript project to TypeScript?',
      a: 'Start with allowJs and checkJs off, rename a few files, enable strict flags one at a time, add types at module boundaries first, and keep tsc --noEmit in CI. Avoid a big rewrite.',
      level: 'advanced',
    },
    {
      q: 'How do you validate API data safely?',
      a: 'Use a runtime schema validator such as Zod or Valibot at the boundary. Types disappear at runtime, so a cast alone cannot protect against a different response shape.',
      level: 'intermediate',
    },
    {
      q: 'What is a Result type and why use it?',
      a: 'A discriminated union of { ok: true, value } and { ok: false, error }. It makes failure explicit in the type, so callers must handle both branches.',
      level: 'intermediate',
    },
    {
      q: 'What are the limits of TypeScript?',
      a: 'Types are erased at runtime, external data is not validated, and some dynamic patterns are hard to type. Types improve confidence but do not replace tests or runtime checks.',
      level: 'advanced',
    },
  ],
};
