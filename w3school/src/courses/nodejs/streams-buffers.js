// Node.js chapter: Streams & Buffers.

export default {
  id: 'streams-buffers',
  title: 'Streams & Buffers',
  description: 'Handle large data without loading it all in memory',
  icon: 'waves',
  lessons: [
    {
      id: 'node-buffers',
      title: 'Buffers',
      blocks: [
        { type: 'text', value: 'A Buffer is a fixed-size chunk of binary data. Node uses buffers for files, network packets and crypto. Strings are converted to buffers when they are written to a stream.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const buf = Buffer.from('CodeNest', 'utf8');

console.log(buf.length);
console.log(buf.toString('hex'));
console.log(buf.toString('base64'));
console.log(Buffer.byteLength('hello'));` },
        { type: 'note', value: 'Buffer.alloc(n) creates a zero-filled buffer. Buffer.allocUnsafe(n) is faster but may contain old memory, so never expose it without filling it.' },
      ],
    },
    {
      id: 'node-streams-intro',
      title: 'Streams',
      blocks: [
        { type: 'text', value: 'A stream processes data piece by piece instead of all at once. Readable streams produce chunks, writable streams consume them, and transform streams change them. This keeps memory flat for large files.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

await pipeline(
  createReadStream('big.log'),
  createGzip(),
  createWriteStream('big.log.gz'),
);

console.log('compressed');` },
        { type: 'note', value: 'Use pipeline instead of manually chaining pipe. pipeline handles errors and cleans up every stream when one fails.' },
      ],
    },
    {
      id: 'node-backpressure',
      title: 'Backpressure',
      blocks: [
        { type: 'text', value: 'When a writable stream cannot keep up, it signals backpressure. Respecting it prevents memory from growing without limit. pipeline and async iteration handle this for you.' },
        { type: 'list', items: [
          'write() returns false when the buffer is full',
          'Wait for the drain event before writing more',
          'pipeline handles backpressure automatically',
          'for await (const chunk of stream) is the simplest read loop',
          'Never load a huge file with readFile if you only need to stream it',
        ] },
        { type: 'code', lang: 'js', tryIt: false, value: `import { createReadStream } from 'node:fs';

let lines = 0;
for await (const chunk of createReadStream('big.log')) {
  lines += chunk.toString().split('\\n').length - 1;
}
console.log('lines:', lines);` },
        { type: 'note', value: 'Reading a 2 GB file with readFile can crash the process. Stream it and keep memory flat.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'streams-buffers',
      q: 'What is a Buffer?',
      options: ['A string', 'A fixed-size chunk of binary data', 'A stream', 'A promise'],
      answer: 1,
      explain: 'Buffers hold raw bytes.',
    },
    {
      chapterId: 'streams-buffers',
      q: 'Why stream a large file instead of reading it all?',
      options: ['It is prettier', 'It processes chunks and keeps memory flat', 'It compresses automatically', 'It avoids async'],
      answer: 1,
      explain: 'Streams avoid loading the whole file.',
    },
    {
      chapterId: 'streams-buffers',
      q: 'Why prefer pipeline over manual pipe?',
      options: ['It is shorter', 'It handles errors and cleans up all streams', 'It is faster', 'It compresses data'],
      answer: 1,
      explain: 'pipeline manages error and cleanup.',
    },
    {
      chapterId: 'streams-buffers',
      q: 'What does write() returning false mean?',
      options: ['The stream is broken', 'The internal buffer is full and you should wait for drain', 'The data was lost', 'The file is closed'],
      answer: 1,
      explain: 'It signals backpressure.',
    },
  ],
};
