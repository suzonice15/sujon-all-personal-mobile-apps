// Node.js chapter: Project and Interview Practice.

export default {
  id: 'project-interview',
  title: 'Project & Interview Prep',
  description: 'Build a Node CLI and a raw HTTP service',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'node-project-cli',
      title: 'Project: a file tool',
      blocks: [
        { type: 'text', value: 'Build a command-line tool that reads a log file as a stream and prints counts by status code. It uses the fs module, a readline interface and arguments. Small and useful beats large and unfinished.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

const file = process.argv[2];
if (!file) {
  console.error('usage: node count.js <logfile>');
  process.exit(1);
}

const counts = new Map();
const rl = createInterface({ input: createReadStream(file) });

rl.on('line', line => {
  const match = line.match(/ (\\d{3}) /);
  if (!match) return;
  counts.set(match[1], (counts.get(match[1]) || 0) + 1);
});

rl.on('close', () => {
  console.table([...counts.entries()].sort());
});` },
        { type: 'note', value: 'Streaming keeps memory flat even for a huge log. readline handles line splitting for you.' },
      ],
    },
    {
      id: 'node-project-http',
      title: 'Project: a raw HTTP service',
      blocks: [
        { type: 'text', value: 'Build a small JSON service with only the http module. It shows how routing, body parsing and status codes work under a framework, which makes Express much easier to understand.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { createServer } from 'node:http';

const courses = [{ id: 1, title: 'Node.js', price: 6000 }];

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/courses') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(courses));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(3000, () => console.log('http://localhost:3000'));` },
        { type: 'list', items: [
          'Read the method and URL to route',
          'Set the status code and headers before the body',
          'Parse the body yourself only when needed',
          'Handle unknown routes explicitly',
        ] },
        { type: 'note', value: 'Once you have written this by hand, the value of a framework and its middleware becomes obvious.' },
      ],
    },
    {
      id: 'node-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is the event loop?',
          'Microtasks versus timers?',
          'When would you use a worker thread?',
          'What is backpressure?',
          'How do you read a huge file safely?',
          'What is the difference between require and import?',
          'How do you handle uncaught exceptions?',
          'How do you debug a memory leak?',
        ] },
        { type: 'text', value: 'Strong answers connect the mechanism to a failure: "streaming keeps memory flat, readFile on a 2 GB file can crash the process" is a complete answer.' },
        { type: 'note', value: 'Be ready to write a small script or server with only the built-in modules. It shows you understand the runtime, not only a framework.' },
      ],
    },
    {
      id: 'node-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: runtime, modules and npm',
          'Week 2: files, paths and the fs module',
          'Week 3: HTTP and the raw server',
          'Week 4: streams, buffers and backpressure',
          'Week 5: event loop, workers and profiling',
          'Week 6: build the file tool and the HTTP service',
          'Week 7: take the Express.js course and add a framework',
        ] },
        { type: 'note', value: 'Learn the runtime before the framework. Everything Express does is built on the http module you can write by hand.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'project-interview',
      q: 'Why stream a large log file?',
      options: ['It is shorter code', 'It keeps memory flat', 'It compresses the file', 'It avoids async'],
      answer: 1,
      explain: 'Streaming processes chunks instead of the whole file.',
    },
    {
      chapterId: 'project-interview',
      q: 'What does readline handle for you?',
      options: ['Routing', 'Splitting a stream into lines', 'Compression', 'Authentication'],
      answer: 1,
      explain: 'readline emits one line at a time.',
    },
    {
      chapterId: 'project-interview',
      q: 'What must you set before writing a response body?',
      options: ['The database', 'The status code and headers', 'The port', 'The worker'],
      answer: 1,
      explain: 'Headers and status come before the body.',
    },
    {
      chapterId: 'project-interview',
      q: 'What makes a Node project convincing?',
      options: ['Many dependencies', 'A working tool with tests and a README', 'A copied tutorial', 'No error handling'],
      answer: 1,
      explain: 'A finished, explained project shows real skill.',
    },
  ],
};
