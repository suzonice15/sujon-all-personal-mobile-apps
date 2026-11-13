// Express.js chapter: Production & Testing.

export default {
  id: 'production-testing',
  title: 'Production & Testing',
  description: 'Hardening, API tests and graceful shutdown',
  icon: 'verified-user',
  lessons: [
    {
      id: 'express-hardening',
      title: 'Hardening the app',
      blocks: [
        { type: 'text', value: 'Production Express needs security headers, a body size limit, a strict CORS policy, rate limiting and a central error handler. Add them before the routes so every request passes through.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import express from 'express';\nimport helmet from 'helmet';\nimport rateLimit from 'express-rate-limit';\n\nconst app = express();\napp.use(helmet());\napp.use(express.json({ limit: '100kb' }));\napp.use(rateLimit({ windowMs: 60_000, limit: 100 }));\napp.use((req, res, next) => {\n  res.setHeader('Cache-Control', 'no-store');\n  next();\n});` },
        { type: 'list', items: [
          'helmet for security headers',
          'A JSON body limit',
          'A rate limit per IP or user',
          'CORS only for known origins',
          'One error handler last',
        ] },
        { type: 'note', value: 'app.use(express.json()) with no limit lets a client send a gigabyte body. Always set the limit.' },
      ],
    },
    {
      id: 'express-api-tests',
      title: 'API tests with supertest',
      blocks: [
        { type: 'text', value: 'Test the HTTP layer without binding a port. supertest runs the app in-process, so tests are fast and parallel-safe. Seed a test database and reset it between tests.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import request from 'supertest';\nimport { app } from '../app.js';\n\ntest('rejects an invalid course', async () => {\n  const res = await request(app)\n    .post('/api/courses')\n    .send({ title: '' });\n\n  expect(res.status).toBe(400);\n  expect(res.body.error).toMatch(/title/i);\n});\n\ntest('returns 404 for a missing course', async () => {\n  const res = await request(app).get('/api/courses/9999');\n  expect(res.status).toBe(404);\n});` },
        { type: 'list', items: [
          'Assert status and body together',
          'Cover one happy path and each error path',
          'Test auth separately from business logic',
          'Never rely on test order',
          'Keep one seed fixture per test file',
        ] },
        { type: 'note', value: 'A 200 response with the wrong shape is still a broken endpoint. Assert fields, not only the status.' },
      ],
    },
    {
      id: 'express-shutdown',
      title: 'Lifecycle and shutdown',
      blocks: [
        { type: 'text', value: 'Close the HTTP server, then the database pool. Add a timeout so a stuck request cannot block a deploy forever.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const server = app.listen(process.env.PORT || 3000);\n\nprocess.on('SIGTERM', () => {\n  server.close(async () => {\n    await pool.end();\n    process.exit(0);\n  });\n});` },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Check the app answers before sending traffic\ncurl -fsS http://localhost:3000/health/ready\n\n# Tail logs during a deploy\nkubectl logs deploy/api --tail=50 -f` },
        { type: 'note', value: 'An unhandled promise rejection can crash Node. Log it, exit cleanly, and let the orchestrator restart the process.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'production-testing',
      q: 'Why set a JSON body limit?',
      options: ['For speed', 'To stop huge payloads exhausting memory', 'To enable CORS', 'To cache'],
      answer: 1,
      explain: 'A limit protects memory and bandwidth.',
    },
    {
      chapterId: 'production-testing',
      q: 'What does supertest avoid?',
      options: ['Tests', 'Binding a real port', 'Databases', 'Middleware'],
      answer: 1,
      explain: 'It runs the app in-process.',
    },
    {
      chapterId: 'production-testing',
      q: 'What should the error handler do?',
      options: ['Return stack traces', 'Log details and return a safe message', 'Ignore errors', 'Restart the app'],
      answer: 1,
      explain: 'Never leak internals to clients.',
    },
    {
      chapterId: 'production-testing',
      q: 'In what order should shutdown close things?',
      options: ['Database then server', 'Server then database', 'Nothing', 'Only the process'],
      answer: 1,
      explain: 'Stop new requests, then close the pool.',
    },
  ],
};
