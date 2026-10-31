// JavaScript chapter: Tooling and Node.js. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'tooling',
  title: 'Tooling: npm, Node.js and Vite',
  description: 'The tools every JavaScript project uses',
  icon: 'construction',
  lessons: [
    {
      id: 'js-node-npm',
      title: 'Node.js and npm',
      blocks: [
        { type: 'text', value: 'Node.js runs JavaScript outside the browser: on your computer and on servers. It comes with npm, the package manager that installs libraries (packages) from the npm registry, which has over two million of them.' },
        { type: 'code', lang: 'text', value: `node --version          # check Node.js is installed (get it from nodejs.org)
node app.js             # run a JavaScript file

npm init -y             # create package.json
npm install dayjs       # add a dependency (saved in package.json)
npm install -D vitest   # add a dev-only dependency
npm uninstall dayjs
npm run dev             # run a script defined in package.json
npx some-tool           # run a package without installing it globally` },
        { type: 'heading', value: 'package.json' },
        { type: 'code', lang: 'text', value: `{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest"
  },
  "dependencies": { "dayjs": "^1.11.13" },
  "devDependencies": { "vite": "^6.0.0", "vitest": "^2.1.0" }
}` },
        { type: 'list', items: [
          'dependencies: needed when the app runs; devDependencies: only for building and testing.',
          '^1.11.13 allows compatible updates (1.x.x) following semantic versioning.',
          'package-lock.json records exact versions; commit it so everyone installs the same thing.',
          'node_modules/ is never committed: add it to .gitignore and run npm install instead.',
        ] },
      ],
    },
    {
      id: 'js-bundlers-vite',
      title: 'Bundlers, Vite and Linting',
      blocks: [
        { type: 'text', value: 'Browsers can load ES modules directly, but real apps have hundreds of files and npm packages. A build tool resolves imports, transforms code (JSX, TypeScript), and produces small optimized files. Vite is today\'s standard: instant dev server, fast builds.' },
        { type: 'code', lang: 'text', value: `npm create vite@latest my-app      # choose vanilla, react, vue...
cd my-app
npm install
npm run dev                         # dev server with hot reload
npm run build                       # optimized files in dist/` },
        { type: 'list', items: [
          'Bundling: many modules combined into a few files.',
          'Minification: removes spaces and shortens names.',
          'Tree shaking: drops exported code that nothing imports.',
          'Code splitting: dynamic import() creates separate chunks loaded on demand.',
        ] },
        { type: 'heading', value: 'Code quality tools' },
        { type: 'code', lang: 'text', value: `npm install -D eslint prettier
npx eslint .           # finds bugs: unused variables, missing awaits...
npx prettier --write . # formats every file consistently` },
        { type: 'note', value: 'Read the error output of these tools carefully. Most beginner "it does not work" problems are reported clearly by the linter.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'tooling', q: 'What does npm install -D do?', options: ['Deletes a package', 'Installs a dev-only dependency', 'Installs globally', 'Downloads documentation'], answer: 1, explain: 'devDependencies are for building and testing.' },
    { chapterId: 'tooling', q: 'Should node_modules be committed to Git?', options: ['Yes, always', 'No, it is recreated with npm install', 'Only in production', 'Only the .bin folder'], answer: 1, explain: 'Commit package.json and package-lock.json instead.' },
    { chapterId: 'tooling', q: 'What is tree shaking?', options: ['Deleting old branches', 'Removing unused exported code from the bundle', 'Sorting imports', 'A testing method'], answer: 1, explain: 'It keeps bundles small.' },
  ],
};
