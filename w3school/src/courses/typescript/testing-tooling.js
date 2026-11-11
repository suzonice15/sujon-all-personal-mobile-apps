// TypeScript chapter: Testing and Tooling.

export default {
  id: 'testing-tooling',
  title: 'Testing & Tooling',
  description: 'Keep a typed project healthy in CI',
  icon: 'construction',
  lessons: [
    {
      id: 'ts-typecheck-ci',
      title: 'Type-check in CI',
      blocks: [
        { type: 'text', value: 'Most bundlers strip types without checking them. A build can succeed while the project has type errors. Run the checker separately so CI fails on real mistakes.' },
        { type: 'code', lang: 'text', tryIt: false, value: `# package.json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "jest",
    "lint": "eslint src"
  }
}

# CI runs all three
npm run typecheck && npm run lint && npm test` },
        { type: 'text', value: 'Keep the type-check fast. Enable incremental in tsconfig so tsc reuses information from the previous run, and exclude generated folders from include.' },
        { type: 'note', value: 'A green build with type errors is a false sense of safety. Type-checking is the step that proves the contracts still hold.' },
      ],
    },
    {
      id: 'ts-running-files',
      title: 'Running TypeScript in Node',
      blocks: [
        { type: 'text', value: 'Node cannot run .ts files directly in older versions. Use tsx or ts-node during development. tsx is fast and needs almost no configuration.' },
        { type: 'code', lang: 'text', tryIt: false, value: `# Run a script once
npx tsx scripts/seed.ts

# Watch mode while developing
npx tsx watch scripts/seed.ts

# With ts-node instead
npx ts-node scripts/seed.ts` },
        { type: 'text', value: 'Node 22.6+ can strip types itself with --experimental-strip-types, but it does not type-check and some syntax is unsupported. A dedicated runner is still the safer default.' },
        { type: 'note', value: 'Keep application code and scripts in separate tsconfig projects when they need different module settings. Mixing browser and Node globals in one config causes confusing errors.' },
      ],
    },
    {
      id: 'ts-jest',
      title: 'Testing typed code with Jest',
      blocks: [
        { type: 'text', value: 'Jest runs JavaScript, so TypeScript tests need a transform. ts-jest type-checks while it compiles, which catches mistakes in tests as well as in the code under test.' },
        { type: 'code', lang: 'text', tryIt: false, value: `// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
};

// math.test.ts
import { add } from '../src/math';

test('adds numbers', () => {
  expect(add(2, 3)).toBe(5);
});` },
        { type: 'text', value: 'For React components, add a DOM environment and Testing Library. The types for queries and events make tests read like user actions instead of implementation details.' },
        { type: 'note', value: 'Do not mock types. Mock behaviour. If a test needs any casts to compile, the production code probably has a design problem worth fixing.' },
      ],
    },
    {
      id: 'ts-eslint-prettier',
      title: 'ESLint and Prettier',
      blocks: [
        { type: 'text', value: 'TypeScript catches type mistakes. ESLint catches code smells such as unused variables, floating promises and unsafe any. Prettier handles formatting so reviews focus on logic.' },
        { type: 'code', lang: 'text', tryIt: false, value: `# Install the typed lint setup
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# .eslintrc.cjs
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-floating-promises': 'error'
  }
};` },
        { type: 'text', value: 'Typed lint rules need type information, so pass parserOptions.project. That unlocks rules such as no-floating-promises that plain ESLint cannot check.' },
        { type: 'note', value: 'Formatting arguments waste review time. Let Prettier decide and agree as a team. Keep lint rules focused on correctness, not personal style.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'testing-tooling',
      q: 'Why run tsc --noEmit in CI?',
      options: [
        'Bundlers may strip types without checking them',
        'It makes the app faster',
        'It generates documentation',
        'It replaces tests',
      ],
      answer: 0,
      explain: 'Many build tools only remove types, so a separate check is needed to catch type errors.',
    },
    {
      chapterId: 'testing-tooling',
      q: 'Which tool runs a .ts file directly in Node during development?',
      options: ['tsx', 'webpack', 'Babel only', 'npm'],
      answer: 0,
      explain: 'tsx (or ts-node) compiles and runs TypeScript files without a separate build step.',
    },
    {
      chapterId: 'testing-tooling',
      q: 'What does ts-jest add over a plain transform?',
      options: ['Type-checking while compiling tests', 'A browser', 'A database', 'Automatic deployment'],
      answer: 0,
      explain: 'ts-jest type-checks the test and source files as it compiles them.',
    },
    {
      chapterId: 'testing-tooling',
      q: 'Which ESLint rule needs type information to work?',
      options: ['no-floating-promises', 'no-console', 'semi', 'quotes'],
      answer: 0,
      explain: 'no-floating-promises inspects the return type, so it needs parserOptions.project.',
    },
  ],
};
