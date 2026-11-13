// Node.js chapter: Testing & Security.

export default {
  id: 'testing-security',
  title: 'Testing & Security',
  description: 'node:test, input safety and dependency risk',
  icon: 'verified-user',
  lessons: [
    {
      id: 'node-testing',
      title: 'Testing with node:test',
      blocks: [
        { type: 'text', value: 'Node has a built-in test runner. Write a test file, import node:test and node:assert, and run it with node --test. No extra dependency is needed for a small service.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// math.test.js\nimport test from 'node:test';\nimport assert from 'node:assert/strict';\nimport { applyDiscount } from './math.js';\n\ntest('applies a percentage discount', () => {\n  assert.equal(applyDiscount(1000, 10), 900);\n});\n\ntest('rejects a discount above 100', () => {\n  assert.throws(() => applyDiscount(1000, 120));\n});` },
        { type: 'code', lang: 'bash', tryIt: false, value: `node --test\nnode --test --experimental-test-coverage\nnode --test --watch` },
        { type: 'list', items: [
          'Test behaviour, not private helpers',
          'One assertion idea per test',
          'Use assert.rejects for async failures',
          'Keep tests independent of order',
          'Run the same command locally and in CI',
        ] },
        { type: 'note', value: 'A test that needs a real network call will be flaky. Stub the boundary instead.' },
      ],
    },
    {
      id: 'node-input-safety',
      title: 'Input safety',
      blocks: [
        { type: 'text', value: 'Never trust a path, a filename or a command from a request. A path traversal such as ../../etc/passwd and a shell injection are the two most common Node mistakes.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import path from 'node:path';\nimport { execFile } from 'node:child_process';\n\nconst ROOT = path.resolve('uploads');\n\nexport function safePath(name) {\n  const full = path.resolve(ROOT, name);\n  if (!full.startsWith(ROOT + path.sep)) {\n    throw new Error('Path outside uploads');\n  }\n  return full;\n}\n\n// Safe: arguments are not parsed by a shell\nexecFile('convert', ['in.png', 'out.jpg'], (err) => {\n  if (err) console.error(err);\n});` },
        { type: 'list', items: [
          'Never build a shell string with user input',
          'Resolve and check the path prefix',
          'Validate type, length and format',
          'Limit upload size before reading the body',
          'Return a generic error, log the detail',
        ] },
        { type: 'note', value: 'Comparing passwords or tokens with === leaks timing. Use crypto.timingSafeEqual for secrets.' },
      ],
    },
    {
      id: 'node-dependency-security',
      title: 'Dependency and runtime security',
      blocks: [
        { type: 'text', value: 'A Node app is mostly third-party code. Lock versions, audit dependencies and run with the least privilege the process needs.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `npm audit --audit-level=high\nnpm outdated\n\n# Run as a non-root user in production\nnode --max-old-space-size=512 server.js\n\n# Never put secrets in code or images\nexport DATABASE_URL="$(cat /run/secrets/db_url)"` },
        { type: 'list', items: [
          'Commit the lockfile and use npm ci',
          'Audit on every build',
          'Do not run the process as root',
          'Read secrets from the environment or a secret store',
          'Set NODE_ENV=production to skip dev paths',
        ] },
        { type: 'note', value: 'A dependency you do not update is a vulnerability with a delay. Automate updates and review them.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'testing-security',
      q: 'Which module runs built-in tests?',
      options: ['node:assert only', 'node:test', 'node:http', 'node:fs'],
      answer: 1,
      explain: 'node:test is the built-in runner.',
    },
    {
      chapterId: 'testing-security',
      q: 'How do you stop path traversal?',
      options: ['Trust the name', 'Resolve and check the path prefix', 'Use a longer filename', 'Encode the path'],
      answer: 1,
      explain: 'Resolve then verify it stays inside the root.',
    },
    {
      chapterId: 'testing-security',
      q: 'Why use execFile instead of exec with input?',
      options: ['It is faster', 'Arguments are not parsed by a shell', 'It is shorter', 'It caches'],
      answer: 1,
      explain: 'It avoids shell injection.',
    },
    {
      chapterId: 'testing-security',
      q: 'What should production do with secrets?',
      options: ['Hard-code them', 'Read from env or a secret store', 'Commit them', 'Log them'],
      answer: 1,
      explain: 'Secrets never belong in code.',
    },
  ],
};
