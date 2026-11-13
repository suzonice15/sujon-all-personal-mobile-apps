// Node.js chapter: Middleware.

export default {
  id: 'middleware',
  title: 'Middleware',
  description: 'The chain that runs before your route',
  icon: 'link',
  lessons: [
    {
      id: 'node-middleware-chain',
      title: 'How the chain works',
      blocks: [
        { type: 'text', value: 'Middleware is a function (req, res, next). It can read the request, change it, end the response, or call next() to pass control to the next function in the chain.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const middlewares = [
  (req, next) => { req.user = 'Ayesha'; next(); },
  (req, next) => { req.role = 'student'; next(); },
  (req, next) => { req.requestId = 'req-1'; next(); },
];

const req = {};
let index = 0;

function next() {
  if (index < middlewares.length) {
    middlewares[index++](req, next);
  }
}

next();
console.log(req);` },
        { type: 'text', value: 'Express runs middleware in registration order. If one calls next(), the next one runs. If one sends a response and does not call next(), the chain stops there.' },
        { type: 'note', value: 'Forgetting to call next() is the classic middleware bug: the request hangs until it times out.' },
      ],
    },
    {
      id: 'node-middleware-express',
      title: 'Writing Express middleware',
      blocks: [
        { type: 'text', value: 'A logger, an authenticator and a rate limiter are all middleware. Register global middleware with app.use and route-specific middleware as an extra argument.' },
        { type: 'code', lang: 'js', tryIt: false, value: `function logger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    console.log(req.method, req.url, res.statusCode, Date.now() - start + 'ms');
  });
  next();
}

function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing token' });
  req.user = verifyToken(token);
  next();
}

app.use(logger);
app.get('/api/me', requireAuth, (req, res) => res.json(req.user));` },
        { type: 'text', value: 'Order matters: body parsing before validation, authentication before authorization, and the 404 handler after every route.' },
      ],
    },
    {
      id: 'node-error-middleware',
      title: 'Error middleware',
      blocks: [
        { type: 'text', value: 'Express recognizes error middleware by its four parameters: (err, req, res, next). It must be registered last. Throw or call next(error) from a route, and this one formats the response.' },
        { type: 'code', lang: 'js', tryIt: false, value: `app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? 'Internal server error' : err.message,
  });
});` },
        { type: 'text', value: 'Do not leak stack traces or database messages to clients. Log the details on the server and send a safe message to the user.' },
        { type: 'note', value: 'An async route that throws does not automatically reach the error middleware in older Express versions. Wrap it or use a helper such as express-async-errors.' },
      ],
    },
    {
      id: 'node-body-limits',
      title: 'Body limits and security middleware',
      blocks: [
        { type: 'list', items: [
          'express.json({ limit: "100kb" }) stops huge JSON bodies',
          'helmet sets security-related HTTP headers',
          'cors controls which origins may call the API',
          'express-rate-limit slows brute force and abuse',
          'compression reduces response size for text',
        ] },
        { type: 'code', lang: 'js', tryIt: false, value: `import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

app.use(helmet());
app.use(cors({ origin: ['https://app.example.com'] }));
app.use(rateLimit({ windowMs: 60_000, max: 100 }));
app.use(express.json({ limit: '100kb' }));` },
        { type: 'note', value: 'Security middleware is a baseline, not a complete defence. Validate input, use parameterized queries and keep dependencies updated.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'middleware',
      q: 'What does next() do?',
      options: ['Ends the response', 'Passes control to the next middleware', 'Restarts the server', 'Parses the body'],
      answer: 1,
      explain: 'next() advances the chain. Without it the request can hang.',
    },
    {
      chapterId: 'middleware',
      q: 'How does Express recognize error middleware?',
      options: ['By its name', 'By four parameters', 'By the HTTP method', 'By a decorator'],
      answer: 1,
      explain: 'The signature (err, req, res, next) marks it as error handling.',
    },
    {
      chapterId: 'middleware',
      q: 'Where should the 404 handler go?',
      options: ['First', 'After all routes', 'Inside every route', 'Before body parsing'],
      answer: 1,
      explain: 'It runs only when no earlier route matched.',
    },
    {
      chapterId: 'middleware',
      q: 'Why set a body size limit?',
      options: ['To speed up JSON parsing', 'To prevent memory abuse from huge requests', 'To enable CORS', 'To create indexes'],
      answer: 1,
      explain: 'A large body can exhaust memory; a limit rejects it early.',
    },
  ],
};
