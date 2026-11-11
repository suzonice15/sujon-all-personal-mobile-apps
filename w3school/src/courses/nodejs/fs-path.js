// Node.js chapter: File System and Paths.

export default {
  id: 'fs-path',
  title: 'Files & Paths',
  description: 'Read, write and locate files safely',
  icon: 'folder',
  lessons: [
    {
      id: 'node-fs-promises',
      title: 'fs/promises',
      blocks: [
        { type: 'text', value: 'The fs module reads and writes files. Prefer the promise API so a slow disk does not block other requests. Never use the sync versions inside a request handler.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { readFile, writeFile } from 'node:fs/promises';

const text = await readFile('./data/courses.json', 'utf8');
const courses = JSON.parse(text);

await writeFile('./data/courses.json', JSON.stringify(courses, null, 2));` },
        { type: 'text', value: 'Always pass an encoding such as utf8 for text. Without it readFile returns a Buffer, and JSON.parse fails in a confusing way.' },
        { type: 'note', value: 'Wrap file operations in try/catch. A missing file or a permission error should produce a clear message, not crash the whole process.' },
      ],
    },
    {
      id: 'node-paths',
      title: 'Paths and directories',
      blocks: [
        { type: 'text', value: 'Never build paths with string concatenation. Use path.join and path.resolve so Windows and Linux both work.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFile = path.join(__dirname, '..', 'data', 'courses.json');
console.log(dataFile);` },
        { type: 'text', value: 'process.cwd() is the folder you started Node from. __dirname is the folder of the current module. They are often different, and that difference causes "file not found" bugs.' },
        { type: 'note', value: 'In ESM there is no __dirname by default. Derive it from import.meta.url as shown, or use a helper that is created once per module.' },
      ],
    },
    {
      id: 'node-json-config',
      title: 'JSON files as small storage',
      blocks: [
        { type: 'text', value: 'A JSON file is fine for configuration and small prototypes. It is not a database: concurrent writes can corrupt it, and there is no query or transaction support.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { readFile, writeFile } from 'node:fs/promises';

async function updateSettings(patch) {
  const current = JSON.parse(await readFile('./settings.json', 'utf8'));
  const next = { ...current, ...patch };
  await writeFile('./settings.json', JSON.stringify(next, null, 2));
  return next;
}` },
        { type: 'text', value: 'For real concurrency use a database. For a single-user tool, write to a temporary file and rename it, so a crash does not leave half a file.' },
        { type: 'note', value: 'Two processes writing the same JSON file will lose updates. A database gives you locking and atomic writes for free.' },
      ],
    },
    {
      id: 'node-streams',
      title: 'Streams for large files',
      blocks: [
        { type: 'text', value: 'Loading a 2 GB file into memory will crash the process. Streams process the data in chunks, so memory stays small regardless of file size.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

const stream = createReadStream('./big.log', 'utf8');
const lines = createInterface({ input: stream });

for await (const line of lines) {
  if (line.includes('ERROR')) console.log(line);
}` },
        { type: 'list', items: [
          'Use streams for uploads, downloads, logs and CSV import',
          'Use pipeline() to connect streams and handle errors',
          'Do not collect a whole stream into an array unless you know the size',
          'Compression and encryption can sit in the same pipeline',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'fs-path',
      q: 'Which fs API should a request handler use?',
      options: ['readFileSync', 'fs/promises readFile', 'eval', 'execSync'],
      answer: 1,
      explain: 'The promise API does not block the event loop while the disk works.',
    },
    {
      chapterId: 'fs-path',
      q: 'Why use path.join instead of string concatenation?',
      options: ['It is shorter', 'It handles separators across operating systems', 'It reads the file', 'It creates a database'],
      answer: 1,
      explain: 'path.join inserts the correct separator for the current platform.',
    },
    {
      chapterId: 'fs-path',
      q: 'What is the difference between process.cwd() and __dirname?',
      options: [
        'They are identical',
        'cwd is where Node started; __dirname is the module folder',
        '__dirname is deprecated',
        'cwd is the module folder',
      ],
      answer: 1,
      explain: 'The current working directory and the module directory can differ.',
    },
    {
      chapterId: 'fs-path',
      q: 'Why use a stream for a large file?',
      options: ['It is faster to type', 'It keeps memory usage small', 'It compresses automatically', 'It works without Node'],
      answer: 1,
      explain: 'Chunks are processed incrementally instead of loading everything at once.',
    },
  ],
};
