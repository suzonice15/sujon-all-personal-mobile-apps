// Node.js chapter: Modules.

export default {
  id: 'modules',
  title: 'Modules',
  description: 'Split a Node app into files with CommonJS and ESM',
  icon: 'extension',
  lessons: [
    {
      id: 'node-commonjs',
      title: 'CommonJS',
      blocks: [
        { type: 'text', value: 'CommonJS is the original Node module system. A file exports with module.exports and imports with require. It is still the default for .js files.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };

// app.js
const { add } = require('./math');
console.log(add(2, 3));` },
        { type: 'text', value: 'require is synchronous and cached. The first require of a file runs it; later requires return the same object.' },
        { type: 'note', value: 'Do not mix module.exports and exports.someName carelessly. Assigning module.exports replaces the whole export object.' },
      ],
    },
    {
      id: 'node-esm',
      title: 'ES Modules',
      blocks: [
        { type: 'text', value: 'ES Modules use import and export, the same syntax as the browser and modern frontend code. Add "type": "module" to package.json or use the .mjs extension.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// math.mjs
export function add(a, b) {
  return a + b;
}

export default function multiply(a, b) {
  return a * b;
}

// app.mjs
import multiply, { add } from './math.mjs';
console.log(add(2, 3), multiply(2, 3));` },
        { type: 'list', items: [
          'ESM is the modern standard and supports top-level await',
          'CommonJS is still common in older packages',
          'A project can use one system for its own files',
          'Dynamic import() works in both',
        ] },
      ],
    },
    {
      id: 'node-resolution',
      title: 'How modules resolve',
      blocks: [
        { type: 'text', value: 'A path starting with ./ or ../ is a local file. A bare name such as express is looked up in node_modules. Node also checks package.json "exports" and "main".' },
        { type: 'code', lang: 'text', tryIt: false, value: `const local = require('./services/course');   // ./services/course.js
const lib = require('express');                // node_modules/express
const core = require('node:fs');               // built-in module

console.log(require.resolve('express'));       // absolute path` },
        { type: 'text', value: 'Use the node: prefix for built-ins. It makes the import unmistakable and avoids a package with the same name shadowing it.' },
        { type: 'note', value: 'A circular require returns a partially filled exports object. Restructure the modules instead of relying on the cycle.' },
      ],
    },
    {
      id: 'node-module-patterns',
      title: 'Module patterns',
      blocks: [
        { type: 'text', value: 'Keep modules small and focused. Export functions and constants, not mutable global state. A module that exports a configured client is easy to mock in tests.' },
        { type: 'list', items: [
          'One responsibility per file',
          'Export named functions for testability',
          'Keep configuration in one config module',
          'Avoid side effects at import time',
        ] },
        { type: 'code', lang: 'js', tryIt: false, value: `// db.js
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
  query: (text, params) => pool.query(text, params),
};` },
        { type: 'note', value: 'A module that connects to the database when imported is hard to test. Export a factory function and create the connection in the entry file instead.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'modules',
      q: 'Which function imports a module in CommonJS?',
      options: ['import', 'require', 'include', 'load'],
      answer: 1,
      explain: 'CommonJS uses require and module.exports.',
    },
    {
      chapterId: 'modules',
      q: 'How do you enable ES Modules for a Node project?',
      options: ['Add "type": "module" to package.json', 'Rename every file to .js', 'Use require', 'Install a browser'],
      answer: 0,
      explain: 'The type field tells Node to treat .js files as ESM.',
    },
    {
      chapterId: 'modules',
      q: 'Where does require("express") look?',
      options: ['node_modules', 'The current folder only', 'The browser cache', 'A CDN'],
      answer: 0,
      explain: 'Bare names resolve through node_modules and package.json metadata.',
    },
    {
      chapterId: 'modules',
      q: 'Why avoid connecting to a database at import time?',
      options: ['It is slower', 'It makes the module hard to test and configure', 'Node forbids it', 'It uses ESM only'],
      answer: 1,
      explain: 'Side effects at import make tests and multiple environments difficult.',
    },
  ],
};
