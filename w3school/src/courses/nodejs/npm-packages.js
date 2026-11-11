// Node.js chapter: npm and Packages.

export default {
  id: 'npm-packages',
  title: 'npm & Packages',
  description: 'Manage dependencies, scripts and lockfiles',
  icon: 'inventory-2',
  lessons: [
    {
      id: 'node-package-json',
      title: 'package.json',
      blocks: [
        { type: 'text', value: 'package.json is the identity card of a Node project. It lists the name, entry point, scripts and dependencies. npm reads it for every install and run command.' },
        { type: 'code', lang: 'text', tryIt: false, value: `{
  "name": "codenest-api",
  "version": "1.0.0",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js",
    "test": "node --test"
  },
  "dependencies": {
    "express": "^5.1.0"
  },
  "devDependencies": {
    "supertest": "^7.0.0"
  }
}` },
        { type: 'list', items: [
          'dependencies - needed at runtime',
          'devDependencies - only for development and tests',
          'scripts - commands run with npm run',
          'engines - the Node versions the project supports',
        ] },
      ],
    },
    {
      id: 'node-semver',
      title: 'Semantic versioning',
      blocks: [
        { type: 'text', value: 'A version has three parts: major.minor.patch. A major change may break your code. A minor change adds features compatibly. A patch fixes bugs.' },
        { type: 'code', lang: 'text', tryIt: false, value: `^1.4.2   -> >=1.4.2 <2.0.0   (minor and patch updates)
~1.4.2   -> >=1.4.2 <1.5.0   (patch updates only)
1.4.2    -> exactly 1.4.2
*        -> any version (avoid)` },
        { type: 'text', value: 'The caret is npm\'s default. It allows compatible updates, which is convenient but can still surprise you. Commit the lockfile so every environment installs the same versions.' },
        { type: 'note', value: 'Run npm audit and update dependencies deliberately. Do not upgrade a major version in the middle of a release without reading the changelog.' },
      ],
    },
    {
      id: 'node-lockfile',
      title: 'Lockfiles and reproducible installs',
      blocks: [
        { type: 'text', value: 'package-lock.json records the exact resolved version of every package, including transitive dependencies. npm ci installs exactly that tree and fails if the lockfile is out of sync.' },
        { type: 'code', lang: 'text', tryIt: false, value: `npm install        # update package.json and the lockfile
npm ci             # clean, exact install for CI
npm outdated       # show available updates
npm audit          # report known vulnerabilities` },
        { type: 'text', value: 'Always commit the lockfile. It is the difference between "works on my machine" and a reproducible build.' },
        { type: 'note', value: 'Never edit the lockfile by hand. Delete node_modules and the lockfile only when you intentionally want to rebuild the dependency tree.' },
      ],
    },
    {
      id: 'node-npx',
      title: 'npx and local binaries',
      blocks: [
        { type: 'text', value: 'npx runs a package binary without a global install. It uses the local node_modules version first, which keeps the project self-contained.' },
        { type: 'code', lang: 'text', tryIt: false, value: `npx nodemon src/server.js
npx eslint .
npx prettier --write .
npx create-express-app my-api` },
        { type: 'list', items: [
          'Prefer local dev dependencies over global installs',
          'Commit scripts so the team runs the same command',
          'Use npm run for anything the project needs repeatedly',
          'Pin the Node version with .nvmrc or engines',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'npm-packages',
      q: 'Which field lists runtime packages?',
      options: ['dependencies', 'devDependencies', 'scripts', 'engines'],
      answer: 0,
      explain: 'dependencies are installed in production; devDependencies are for development only.',
    },
    {
      chapterId: 'npm-packages',
      q: 'What does ^1.4.2 allow?',
      options: ['Only 1.4.2', 'Any 1.x version from 1.4.2', 'Any 2.x version', 'Any version'],
      answer: 1,
      explain: 'The caret allows minor and patch updates within the same major version.',
    },
    {
      chapterId: 'npm-packages',
      q: 'What is npm ci for?',
      options: ['Installing exact locked versions', 'Updating all packages', 'Publishing a package', 'Running tests'],
      answer: 0,
      explain: 'npm ci performs a clean install from the lockfile, ideal for CI.',
    },
    {
      chapterId: 'npm-packages',
      q: 'Why commit package-lock.json?',
      options: ['To make installs reproducible', 'To increase download speed', 'To publish the app', 'To replace package.json'],
      answer: 0,
      explain: 'It pins the exact dependency tree for every environment.',
    },
  ],
};
