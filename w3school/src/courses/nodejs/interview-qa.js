// Node.js interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Node.js?',
      a: 'A JavaScript runtime built on V8 that runs outside the browser, with an event loop and modules for files, HTTP and networking.',
      level: 'basic',
    },
    {
      q: 'Why is Node good for I/O?',
      a: 'Its non-blocking event loop handles many connections without a thread per request.',
      level: 'basic',
    },
    {
      q: 'What is the event loop?',
      a: 'The loop that takes callbacks from queues and runs them when the call stack is empty.',
      level: 'intermediate',
    },
    {
      q: 'What is npm?',
      a: 'The package manager for Node. It installs dependencies and records them in package.json.',
      level: 'basic',
    },
  ],
  modules: [
    {
      q: 'CommonJS versus ES modules?',
      a: 'CommonJS uses require and module.exports and loads synchronously. ES modules use import and export and support top-level await and static analysis.',
      level: 'basic',
    },
    {
      q: 'What does __dirname give you?',
      a: 'The directory of the current module. In ES modules use import.meta.url and fileURLToPath.',
      level: 'intermediate',
    },
    {
      q: 'What is a built-in module?',
      a: 'A module shipped with Node, such as fs, path or http, loaded without installing anything.',
      level: 'basic',
    },
    {
      q: 'Why avoid circular imports?',
      a: 'They can leave a module with an unfinished export, causing undefined values at runtime.',
      level: 'advanced',
    },
  ],
  'npm-packages': [
    {
      q: 'Dependencies versus devDependencies?',
      a: 'Dependencies are needed at runtime. devDependencies are only needed for development, testing and build tools.',
      level: 'basic',
    },
    {
      q: 'What does package-lock.json do?',
      a: 'It pins the exact dependency tree so installs are reproducible.',
      level: 'basic',
    },
    {
      q: 'What is a semver range like ^1.4.2?',
      a: 'It allows updates that do not change the left-most non-zero version, so ^1.4.2 accepts 1.x but not 2.0.',
      level: 'intermediate',
    },
    {
      q: 'Why run npm audit?',
      a: 'It reports known vulnerabilities in the dependency tree so you can upgrade or patch them.',
      level: 'intermediate',
    },
  ],
  'fs-path': [
    {
      q: 'readFile versus createReadStream?',
      a: 'readFile loads the whole file into memory. createReadStream processes it in chunks and keeps memory flat.',
      level: 'basic',
    },
    {
      q: 'Why use path.join?',
      a: 'It builds paths correctly for the current platform and avoids separator bugs.',
      level: 'basic',
    },
    {
      q: 'What is fs.promises?',
      a: 'The promise-based API of the fs module, used with async and await.',
      level: 'intermediate',
    },
    {
      q: 'Why check the file size before reading into memory?',
      a: 'A huge file can exhaust memory and crash the process.',
      level: 'intermediate',
    },
  ],
  'http-server': [
    {
      q: 'What does http.createServer do?',
      a: 'It creates a server that calls your handler for each request with a request and response object.',
      level: 'basic',
    },
    {
      q: 'Why set the status code before the body?',
      a: 'Headers are sent with the first write, so the status cannot change afterward.',
      level: 'basic',
    },
    {
      q: 'How do you parse a JSON body with the raw http module?',
      a: 'Collect the request stream chunks, then JSON.parse the joined string, with a size limit.',
      level: 'intermediate',
    },
    {
      q: 'What is a graceful shutdown?',
      a: 'Stop accepting new connections, finish in-flight requests, then exit the process.',
      level: 'advanced',
    },
  ],
  'streams-buffers': [
    {
      q: 'What is a Buffer?',
      a: 'A fixed-size chunk of binary data used for files, network packets and crypto.',
      level: 'basic',
    },
    {
      q: 'What is backpressure?',
      a: 'A signal that a writable stream cannot keep up, so the producer should slow down or wait for drain.',
      level: 'intermediate',
    },
    {
      q: 'Why use pipeline?',
      a: 'It chains streams, handles errors and cleans up every stream when one fails.',
      level: 'intermediate',
    },
    {
      q: 'Transform versus duplex stream?',
      a: 'A transform stream reads and writes as part of a pipeline. A duplex stream has independent read and write sides.',
      level: 'advanced',
    },
  ],
  'workers-performance': [
    {
      q: 'What blocks the event loop?',
      a: 'Synchronous CPU work such as a long loop, a sync file read or expensive crypto.',
      level: 'basic',
    },
    {
      q: 'When use a worker thread?',
      a: 'For CPU-bound work that would otherwise block the single JS thread.',
      level: 'intermediate',
    },
    {
      q: 'Microtasks versus timers?',
      a: 'Promise microtasks run before the next timer phase.',
      level: 'intermediate',
    },
    {
      q: 'How do you find a memory leak?',
      a: 'Take heap snapshots over time with --inspect and compare retained objects.',
      level: 'advanced',
    },
  ],
  'project-interview': [
    {
      q: 'How do you read a huge file safely?',
      a: 'Stream it with createReadStream and process chunks, instead of readFile.',
      level: 'basic',
    },
    {
      q: 'What does readline do?',
      a: 'It turns a stream into line events, which is handy for logs and CSVs.',
      level: 'basic',
    },
    {
      q: 'What makes a Node project convincing?',
      a: 'A working tool with error handling, tests and a README that explains how to run it.',
      level: 'basic',
    },
    {
      q: 'What is the best first Node step?',
      a: 'Write small scripts with fs and http before adding a framework.',
      level: 'basic',
    },
  ],
};
