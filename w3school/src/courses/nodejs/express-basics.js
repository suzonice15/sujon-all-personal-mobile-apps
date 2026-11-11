// Node.js chapter: Express Basics.

export default {
  id: 'express-basics',
  title: 'Express Basics',
  description: 'Routes, parameters and JSON responses',
  icon: 'route',
  lessons: [
    {
      id: 'node-express-hello',
      title: 'Hello Express',
      blocks: [
        { type: 'text', value: 'Express is a small framework on top of Node\'s http module. It adds routing, middleware, body parsing and a clean request/response API.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express' });
});

app.listen(3000, () => console.log('http://localhost:3000'));` },
        { type: 'text', value: 'express.json() parses JSON bodies and fills req.body. Without it, req.body is undefined and validation fails in confusing ways.' },
      ],
    },
    {
      id: 'node-express-routes',
      title: 'Routes and parameters',
      blocks: [
        { type: 'text', value: 'A route combines a method and a path. Path parameters use a colon. Query parameters arrive in req.query and are always strings.' },
        { type: 'code', lang: 'js', tryIt: false, value: `app.get('/api/courses', (req, res) => {
  const { page = '1', limit = '10' } = req.query;
  res.json({ page: Number(page), limit: Number(limit) });
});

app.get('/api/courses/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid course id' });
  }
  res.json({ id, title: 'SQL' });
});

app.post('/api/courses', (req, res) => {
  res.status(201).json({ id: 1, ...req.body });
});` },
        { type: 'note', value: 'Route order matters. /api/courses/all must be declared before /api/courses/:id, otherwise "all" is treated as an id.' },
      ],
    },
    {
      id: 'node-express-responses',
      title: 'Responses and errors',
      blocks: [
        { type: 'text', value: 'Choose the status code deliberately. res.json sends JSON; res.status sets the code; res.send sends text or a buffer. Return early after an error so the rest of the handler does not run.' },
        { type: 'code', lang: 'js', tryIt: false, value: `app.get('/api/courses/:id', async (req, res, next) => {
  try {
    const course = await findCourse(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    next(error);
  }
});` },
        { type: 'list', items: [
          '200 for a normal read',
          '201 for a created resource',
          '204 for a delete with no body',
          '400 for invalid input',
          '404 for a missing resource',
          '500 for an unexpected server error',
        ] },
      ],
    },
    {
      id: 'node-express-structure',
      title: 'Project structure',
      blocks: [
        { type: 'text', value: 'Keep the entry file small. Routes, controllers, services and data access belong in separate folders so each file has one job.' },
        { type: 'code', lang: 'text', tryIt: false, value: `src/
  server.js          // starts the server
  app.js             // express app, middleware, routes
  routes/
    courses.js       // URL definitions
  controllers/
    courseController.js
  services/
    courseService.js // business rules
  db/
    pool.js          // database connection` },
        { type: 'note', value: 'Separating app.js from server.js makes testing easy: tests import the app without opening a port.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'express-basics',
      q: 'What does express.json() do?',
      options: ['Parses JSON request bodies into req.body', 'Serves JSON files', 'Formats the response', 'Creates a database'],
      answer: 0,
      explain: 'It reads the body stream, parses JSON and sets req.body.',
    },
    {
      chapterId: 'express-basics',
      q: 'Where do path parameters appear?',
      options: ['req.query', 'req.params', 'req.body', 'req.headers'],
      answer: 1,
      explain: 'Colon segments such as :id are available in req.params.',
    },
    {
      chapterId: 'express-basics',
      q: 'What status code fits a missing resource?',
      options: ['200', '201', '404', '500'],
      answer: 2,
      explain: '404 Not Found tells the client the resource does not exist.',
    },
    {
      chapterId: 'express-basics',
      q: 'Why split app.js from server.js?',
      options: ['To test the app without opening a port', 'To reduce code size', 'To enable CORS', 'To use TypeScript'],
      answer: 0,
      explain: 'Tests can import the configured app and send requests in memory.',
    },
  ],
};
