// TypeScript chapter: Modules and Configuration.

export default {
  id: 'modules-config',
  title: 'Modules & Config',
  description: 'Split code into files and configure the compiler',
  icon: 'settings',
  lessons: [
    {
      id: 'ts-import-export',
      title: 'import and export',
      blocks: [
        { type: 'text', value: 'A project is split into modules. A module is any file with a top-level import or export. Export what other files may use, import what you need.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export type Point = { x: number; y: number };

// app.ts
import { add, type Point } from './math';

const point: Point = { x: 2, y: 3 };
console.log(add(point.x, point.y));` },
        { type: 'text', value: 'Use export default for a module that has one main thing, and named exports for utilities. Named exports are easier to rename and refactor.' },
        { type: 'note', value: 'Importing a type with import type removes it from the emitted JavaScript entirely, which keeps bundles smaller and avoids accidental runtime imports.' },
      ],
    },
    {
      id: 'ts-tsconfig',
      title: 'tsconfig.json',
      blocks: [
        { type: 'text', value: 'The compiler reads tsconfig.json to know which files to check, which JavaScript version to output, and how strict to be. A typical React Native or Vite project enables most of these.' },
        { type: 'code', lang: 'text', tryIt: false, value: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "react-jsx",
    "noEmit": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}` },
        { type: 'list', items: [
          'target - the JavaScript version in the output',
          'module / moduleResolution - how imports are resolved',
          'strict - turns on the whole family of strict checks',
          'jsx - how JSX is transformed',
          'noEmit - type-check only, let the bundler write files',
          'skipLibCheck - skip checking dependency type definitions for speed',
        ] },
      ],
    },
    {
      id: 'ts-strict-mode',
      title: 'Strict mode flags',
      blocks: [
        { type: 'text', value: 'strict: true enables a group of checks. Learning what each one does makes error messages much easier to understand.' },
        { type: 'list', items: [
          'strictNullChecks - null and undefined are separate types',
          'noImplicitAny - every value must have a known type',
          'strictFunctionTypes - function parameters are checked strictly',
          'strictPropertyInitialization - class fields must be initialised',
          'noUncheckedIndexedAccess - array and dictionary reads may be undefined',
          'exactOptionalPropertyTypes - optional properties cannot be set to undefined explicitly',
        ] },
        { type: 'text', value: 'Turn strict on for a new project from day one. For an existing project, enable one flag at a time and fix the errors it reveals.' },
        { type: 'note', value: 'Do not silence errors with any or @ts-ignore. Every suppression hides a real bug. Fix the type or prove the value with a runtime check.' },
      ],
    },
    {
      id: 'ts-declaration-files',
      title: 'Declaration files',
      blocks: [
        { type: 'text', value: 'A .d.ts file describes types for JavaScript that has no TypeScript source. Libraries ship these so your editor understands their API.' },
        { type: 'code', lang: 'ts', tryIt: false, value: `// types/course.d.ts
export interface Course {
  id: number;
  title: string;
  price: number;
}

declare module 'legacy-courses' {
  export function list(): Course[];
}` },
        { type: 'text', value: 'For a library without types, install @types/package or write a small declaration file. Do not write types for everything: only what your code actually uses.' },
        { type: 'note', value: 'A common error is "Could not find a declaration file for module X". It means TypeScript can see the JavaScript but not its types. Install @types/x or add a declaration.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'modules-config',
      q: 'Which keyword makes a value available to other files?',
      options: ['export', 'public', 'share', 'provide'],
      answer: 0,
      explain: 'export exposes a value from a module; import brings it in elsewhere.',
    },
    {
      chapterId: 'modules-config',
      q: 'What does strict: true enable?',
      options: ['A group of strict type checks', 'Faster compilation', 'Runtime validation', 'Automatic tests'],
      answer: 0,
      explain: 'strict turns on strictNullChecks, noImplicitAny and related checks together.',
    },
    {
      chapterId: 'modules-config',
      q: 'What is a .d.ts file for?',
      options: ['Describing types for JavaScript', 'Storing data', 'Running tests', 'Compiling CSS'],
      answer: 0,
      explain: 'Declaration files describe the shape of existing JavaScript modules.',
    },
    {
      chapterId: 'modules-config',
      q: 'What does noEmit do?',
      options: ['Type-check without writing files', 'Delete output files', 'Skip type checking', 'Enable watch mode'],
      answer: 0,
      explain: 'noEmit is useful in CI and when the bundler handles the output.',
    },
  ],
};
