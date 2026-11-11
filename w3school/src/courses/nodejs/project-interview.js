// Node.js chapter: Project and Interview Practice.

export default {
  id: 'project-interview',
  title: 'Project & Interview Prep',
  description: 'Build a complete courses API and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'node-project-api',
      title: 'Project: courses API',
      blocks: [
        { type: 'text', value: 'Build a small API with five routes and a real database. The goal is not size, but a clean shape: validation, service layer, error handling and tests.' },
        { type: 'code', lang: 'text', tryIt: false, value: `GET    /api/v1/courses?page=1&limit=20
GET    /api/v1/courses/:id
POST   /api/v1/courses
PATCH  /api/v1/courses/:id
DELETE /api/v1/courses/:id

POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/me` },
        { type: 'code', lang: 'js', tryIt: false, value: `// app.js
import express from 'express';
import courseRoutes from './routes/courses.js';
import { errorHandler, notFound } from './middleware/errors.js';

const app = express();

app.use(express.json({ limit: '100kb' }));
app.use('/api/v1/courses', courseRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;` },
        { type: 'note', value: 'Separate app.js from server.js so tests can import the app without listening on a port. That one decision makes the project testable.' },
      ],
    },
    {
      id: 'node-project-testing',
      title: 'Testing the API',
      blocks: [
        { type: 'text', value: 'Test behaviour through HTTP, not by calling private functions. Supertest sends real requests to the in-memory app and checks status, body and headers.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import request from 'supertest';
import app from '../src/app.js';

test('rejects an invalid course', async () => {
  const response = await request(app)
    .post('/api/v1/courses')
    .send({ title: '', price: -1 });

  expect(response.status).toBe(400);
  expect(response.body.error.details).toBeDefined();
});

test('creates a course', async () => {
  const response = await request(app)
    .post('/api/v1/courses')
    .send({ title: 'SQL', price: 5000 });

  expect(response.status).toBe(201);
  expect(response.body.title).toBe('SQL');
});` },
        { type: 'list', items: [
          'Test the happy path and the validation failures',
          'Test authentication and ownership',
          'Use a separate test database and reset it between tests',
          'Test the status code, not just the body',
        ] },
      ],
    },
    {
      id: 'node-interview-questions',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is the event loop and why does it matter?',
          'When would you use a worker thread?',
          'How do you prevent SQL injection?',
          'What is the difference between authentication and authorization?',
          'How do you structure an Express project?',
          'How do you handle async errors?',
          'What is the N+1 problem and how do you fix it?',
          'How do you deploy and monitor a Node API?',
          'JWT versus session: trade-offs?',
          'How do you make a write endpoint idempotent?',
        ] },
        { type: 'text', value: 'A strong answer explains the trade-off and gives a concrete example from a project. "It depends" without a follow-up is weak; "it depends on X, here is what I would choose and why" is strong.' },
        { type: 'note', value: 'Interviewers often ask you to debug a small API. Practise reading an error stack, finding the failing route and explaining the fix.' },
      ],
    },
    {
      id: 'node-production-project',
      title: 'Extend the project',
      blocks: [
        { type: 'list', items: [
          'Add refresh tokens and logout',
          'Add role-based authorization for admin routes',
          'Add request validation with Zod',
          'Add pagination and filtering',
          'Add rate limiting and helmet',
          'Add integration tests with a test database',
          'Add Docker and a health check',
          'Add structured logging and error tracking',
        ] },
        { type: 'text', value: 'Each item is a small, testable feature. Ship them one at a time and keep the API contract stable. That is how a learning project becomes portfolio work.' },
        { type: 'note', value: 'Document the API with a README or OpenAPI file. A reviewer should be able to run it and call every endpoint without asking you.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'project-interview',
      q: 'Why export app.js separately from server.js?',
      options: ['To test without opening a port', 'To reduce bundle size', 'To enable CORS', 'To use TypeScript'],
      answer: 0,
      explain: 'Supertest can import the app and send requests in memory.',
    },
    {
      chapterId: 'project-interview',
      q: 'What should an API test assert?',
      options: ['Only the response body', 'Status code, body and important headers', 'The source code', 'The server logs'],
      answer: 1,
      explain: 'The status code is part of the contract and should be asserted.',
    },
    {
      chapterId: 'project-interview',
      q: 'Which feature makes a retried POST safe?',
      options: ['Pagination', 'An idempotency key', 'A faster database', 'CORS'],
      answer: 1,
      explain: 'The server recognizes the repeated key and avoids a duplicate write.',
    },
    {
      chapterId: 'project-interview',
      q: 'What belongs in a project README?',
      options: ['Only the title', 'Setup, environment variables, endpoints and examples', 'The full source code', 'Passwords'],
      answer: 1,
      explain: 'A reviewer should be able to run and call the API without asking questions.',
    },
  ],
};
