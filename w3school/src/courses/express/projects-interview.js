// Express chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a complete Express API and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'express-project-api',
      title: 'Project: courses API',
      blocks: [
        { type: 'text', value: 'Build a small REST API with five routes, validation, a service layer, error handling and tests. The goal is a clean shape, not size.' },
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
      id: 'express-project-testing',
      title: 'Testing the API',
      blocks: [
        { type: 'text', value: 'Test behaviour through HTTP. Supertest sends real requests to the in-memory app and checks status, body and headers. Use a separate test database and reset it between tests.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import request from 'supertest';
import app from '../src/app.js';

test('rejects an invalid course', async () => {
  const response = await request(app)
    .post('/api/v1/courses')
    .send({ title: '', price: -1 });

  expect(response.status).toBe(400);
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
          'Assert the status code, not only the body',
          'Reset the database between tests',
        ] },
      ],
    },
    {
      id: 'express-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'How does Express middleware work?',
          'How do you structure an Express project?',
          'How do you handle async errors?',
          'What is the N+1 problem?',
          'JWT versus session: trade-offs?',
          'How do you prevent SQL injection?',
          'How do you make a write endpoint idempotent?',
          'How do you deploy and monitor an Express API?',
        ] },
        { type: 'text', value: 'Strong answers name the mechanism and a concrete example. "The error middleware takes four arguments, so Express knows it is the error handler" is a complete answer.' },
        { type: 'note', value: 'Be ready to read a route and middleware chain and explain the order in which they run.' },
      ],
    },
    {
      id: 'express-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: first server, routing and responses',
          'Week 2: middleware and error handling',
          'Week 3: REST resource design',
          'Week 4: validation and error shape',
          'Week 5: authentication and sessions',
          'Week 6: databases and transactions',
          'Week 7: deployment, logging and health checks',
          'Week 8: build and test a complete API',
        ] },
        { type: 'note', value: 'Learn the Node.js course first. Express is thin on top of the http module and the event loop.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Why export app.js separately from server.js?',
      options: ['To test without opening a port', 'To reduce bundle size', 'To enable CORS', 'To use TypeScript'],
      answer: 0,
      explain: 'Supertest imports the app and sends in-memory requests.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should an API test assert?',
      options: ['Only the body', 'Status code, body and important headers', 'The source code', 'The logs'],
      answer: 1,
      explain: 'The status code is part of the contract.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which feature makes a retried POST safe?',
      options: ['Pagination', 'An idempotency key', 'A faster database', 'CORS'],
      answer: 1,
      explain: 'The server recognises the repeated key.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes an Express portfolio project convincing?',
      options: ['Many unused routes', 'A tested API with validation, auth and a README', 'A copied tutorial', 'No error handling'],
      answer: 1,
      explain: 'A complete, tested API shows real skill.',
    },
  ],
};
