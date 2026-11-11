// TypeScript chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Why TypeScript exists and how a typed file works',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'ts-why',
      title: 'Why TypeScript?',
      blocks: [
        { type: 'text', value: 'JavaScript only finds many mistakes while the program is running. A typo in a property name, a number where text was expected, or a missing argument may crash a screen that a user is already looking at.' },
        { type: 'text', value: 'TypeScript adds a type system on top of JavaScript. You describe the shape of your data, and the compiler reports mistakes while you type, before the app ships.' },
        { type: 'list', items: [
          'Catches typos and wrong argument types at build time',
          'Editors give accurate autocomplete and inline documentation',
          'Refactoring becomes safe: rename a field and every usage is checked',
          'The output is plain JavaScript, so every browser and React Native still runs it',
        ] },
        { type: 'note', value: 'TypeScript does not make your program faster. The types disappear at build time. The benefit is fewer bugs and a much better editing experience.' },
      ],
    },
    {
      id: 'ts-first-file',
      title: 'Your first typed file',
      blocks: [
        { type: 'text', value: 'A .ts file looks like JavaScript with optional type annotations after each name. Here every variable is declared with the type it must hold.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `let course: string = 'TypeScript';
let lessons: number = 12;
let published: boolean = true;

console.log(course + ' has ' + lessons + ' lessons.');
console.log('Published:', published);` },
        { type: 'text', value: 'If you later write course = 42, the compiler stops the build with an error. That error is the whole point: it appears now, not in production.' },
        { type: 'note', value: 'A type annotation is the part after the colon: string, number, boolean. You do not have to annotate everything; the next lesson shows why.' },
      ],
    },
    {
      id: 'ts-inference',
      title: 'Type inference',
      blocks: [
        { type: 'text', value: 'TypeScript can usually guess the type from the value. Inference keeps code short and still catches mistakes, so prefer it for local variables and annotate function boundaries.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `let city = 'Dhaka';        // inferred as string
let age = 21;              // inferred as number
const isStudent = true;    // inferred as the literal true

console.log(city.toUpperCase());
console.log(age + 1);
console.log(isStudent);` },
        { type: 'text', value: 'A const holding a primitive gets the narrow literal type, while let gets the wider primitive type. This matters later when you build union types.' },
        { type: 'note', value: 'Annotate the outside of a function (parameters and return value) and let inference handle the inside. That gives a stable contract and short code.' },
      ],
    },
    {
      id: 'ts-how-it-runs',
      title: 'How TypeScript runs',
      blocks: [
        { type: 'text', value: 'The browser and React Native cannot run TypeScript directly. A compiler removes the types and produces JavaScript.' },
        { type: 'list', items: [
          'tsc - the official compiler, configured by tsconfig.json',
          'ts-node or tsx - run a .ts file directly in Node during development',
          'Vite, Metro and Next.js - compile TypeScript as part of the build',
          'The editor - shows errors instantly through the TypeScript language server',
        ] },
        { type: 'code', lang: 'ts', tryIt: false, value: `# Compile the project
npx tsc

# Type-check without writing files
npx tsc --noEmit

# Run a single file during development
npx tsx src/index.ts` },
        { type: 'note', value: 'If a build tool supports TypeScript, it usually only strips types and does not type-check. Run tsc --noEmit in CI so type errors cannot reach production.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does TypeScript add to JavaScript?',
      options: ['A new runtime', 'A static type system', 'A database', 'A CSS engine'],
      answer: 1,
      explain: 'TypeScript adds types that are checked at build time. The runtime is still JavaScript.',
    },
    {
      chapterId: 'getting-started',
      q: 'What happens to types when TypeScript is compiled?',
      options: ['They are shipped to the browser', 'They are removed', 'They become comments only', 'They are converted to CSS'],
      answer: 1,
      explain: 'Types exist only during development. The emitted JavaScript has no type annotations.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which command type-checks without writing output files?',
      options: ['npx tsc --noEmit', 'npx tsc --watch', 'npx tsx', 'npm test'],
      answer: 0,
      explain: '--noEmit runs the checker and reports errors without producing JavaScript files.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why is inference useful?',
      options: ['It removes the need for a compiler', 'It keeps code short while still checking types', 'It makes JavaScript run faster', 'It disables strict mode'],
      answer: 1,
      explain: 'The compiler infers types from values, so you write less while keeping type safety.',
    },
  ],
};
