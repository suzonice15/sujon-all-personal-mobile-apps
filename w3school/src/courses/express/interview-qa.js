// Express interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Express?',
      a: 'A minimal web framework for Node.js that adds routing, middleware and request helpers on top of the http module.',
      level: 'basic',
    },
    {
      q: 'How do you start an Express server?',
      a: 'Create the app with express(), register routes, then call app.listen(port).',
      level: 'basic',
    },
    {
      q: 'res.send versus res.json?',
      a: 'send handles strings and buffers. json serializes an object and sets the JSON content type.',
      level: 'basic',
    },
    {
      q: 'What does "type": "module" do in package.json?',
      a: 'It makes the project use ES modules, so import and export work instead of require.',
      level: 'basic',
    },
  ],
  'express-basics': [
    {
      q: 'What is a route?',
      a: 'A method and path pair with a handler, such as app.get("/courses", handler).',
      level: 'basic',
    },
    {
      q: 'What is a route parameter?',
      a: 'A named segment such as /courses/:id, read from req.params.id.',
      level: 'basic',
    },
    {
      q: 'What is the difference between req.query and req.params?',
      a: 'params come from the path. query comes from the query string, such as ?page=2.',
      level: 'intermediate',
    },
    {
      q: 'Why mount routers on a path prefix?',
      a: 'It groups related routes and keeps the route files modular, for example /api/v1/courses.',
      level: 'intermediate',
    },
  ],
  middleware: [
    {
      q: 'How does Express middleware work?',
      a: 'It is a function (req, res, next) that runs in order. It can modify the request, end the response or call next to continue.',
      level: 'basic',
    },
    {
      q: 'How do you write an error handler?',
      a: 'Register a middleware with four arguments (err, req, res, next) after all routes. Express recognises it by the arity.',
      level: 'intermediate',
    },
    {
      q: 'What does express.json() do?',
      a: 'It parses a JSON body and puts the result on req.body, with an optional size limit.',
      level: 'basic',
    },
    {
      q: 'Why order matters in middleware?',
      a: 'Middleware runs in registration order, so authentication must come before routes and error handlers last.',
      level: 'intermediate',
    },
  ],
  'rest-api': [
    {
      q: 'What makes an API RESTful?',
      a: 'Resources identified by URLs, standard methods, stateless requests and correct status codes.',
      level: 'basic',
    },
    {
      q: 'Which status code for a created resource?',
      a: '201 Created, ideally with a Location header.',
      level: 'basic',
    },
    {
      q: 'How do you paginate a list endpoint?',
      a: 'Accept page and limit query parameters, apply them in the query, and return metadata such as total.',
      level: 'intermediate',
    },
    {
      q: 'What is an idempotency key?',
      a: 'A client-supplied key that lets the server recognise a repeated request and avoid a duplicate write.',
      level: 'advanced',
    },
  ],
  'validation-errors': [
    {
      q: 'Where should validation happen?',
      a: 'At the edge before the service runs, and again in the service for business rules. Never trust the client.',
      level: 'basic',
    },
    {
      q: 'What shape should errors have?',
      a: 'A consistent shape with a code, a message and details, so clients can handle errors programmatically.',
      level: 'intermediate',
    },
    {
      q: 'How do you handle async errors in Express?',
      a: 'Wrap handlers in a helper that catches rejected promises and calls next(err), or use Express 5 which forwards rejections.',
      level: 'intermediate',
    },
    {
      q: 'Which status codes do you use and why?',
      a: '400 for invalid input, 401 for unauthenticated, 403 for forbidden, 404 for missing, 409 for conflict and 500 for unexpected errors.',
      level: 'basic',
    },
  ],
  auth: [
    {
      q: 'Authentication versus authorization?',
      a: 'Authentication identifies the caller. Authorization decides what the caller may do.',
      level: 'basic',
    },
    {
      q: 'Why hash passwords?',
      a: 'Hashing with a salt and a slow algorithm protects users if the database leaks. Never store plain text.',
      level: 'basic',
    },
    {
      q: 'JWT versus session?',
      a: 'JWTs are stateless and easy across services but hard to revoke. Sessions are stored server-side and easy to revoke.',
      level: 'intermediate',
    },
    {
      q: 'Why keep JWT lifetimes short?',
      a: 'A stolen token is valid until it expires. Short lifetimes limit the window, with refresh tokens for long sessions.',
      level: 'advanced',
    },
  ],
  database: [
    {
      q: 'Why use parameterized queries?',
      a: 'They bind values safely and prevent SQL injection.',
      level: 'basic',
    },
    {
      q: 'How do you handle a transaction?',
      a: 'Begin, run the statements, commit on success, and roll back on error. Keep the transaction short.',
      level: 'intermediate',
    },
    {
      q: 'What is the N+1 problem?',
      a: 'One query for a list and one per item for a related record. Fix it with a join or a batched query.',
      level: 'intermediate',
    },
    {
      q: 'ORM versus raw SQL?',
      a: 'An ORM is faster to build and safer by default. Raw SQL gives control and can be clearer for complex queries.',
      level: 'intermediate',
    },
  ],
  deployment: [
    {
      q: 'Why read configuration from environment variables?',
      a: 'It keeps secrets out of the repository and lets the same build run in each environment.',
      level: 'basic',
    },
    {
      q: 'What should a health endpoint check?',
      a: 'That the process can serve traffic and its critical dependencies are reachable.',
      level: 'intermediate',
    },
    {
      q: 'Why use a process manager or container?',
      a: 'To restart on crash, run several instances and manage resources. Node should not run as a bare process in production.',
      level: 'intermediate',
    },
    {
      q: 'What belongs in a production checklist?',
      a: 'HTTPS, secrets from the environment, logging, health checks, rate limiting, backups and a rollback plan.',
      level: 'basic',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you structure an Express project?',
      a: 'app.js separate from server.js, routes, controllers, services, middleware and a consistent error handler.',
      level: 'intermediate',
    },
    {
      q: 'How do you test an Express API?',
      a: 'Import the app with Supertest, send real HTTP requests and assert status, body and headers.',
      level: 'intermediate',
    },
    {
      q: 'How do you debug a slow endpoint?',
      a: 'Check the logs and timing, then the database queries and indexes. Measure before changing code.',
      level: 'advanced',
    },
    {
      q: 'What is the best first Express step?',
      a: 'Build one route and one middleware, then add validation, auth and a database.',
      level: 'basic',
    },
  ],
  'production-testing': [
    {
      q: 'Which middleware hardens an Express app?',
      a: 'helmet for headers, a JSON body limit, rate limiting, strict CORS and a central error handler.',
      level: 'basic',
    },
    {
      q: 'Why test with supertest?',
      a: 'It calls the app in-process, so tests are fast, need no port and can run in parallel.',
      level: 'basic',
    },
    {
      q: 'What should an error handler hide?',
      a: 'Stack traces and internal messages. Log the detail and return a safe message with the right status.',
      level: 'intermediate',
    },
    {
      q: 'How do you shut down safely?',
      a: 'Stop the server from accepting connections, finish in-flight requests, close the pool, then exit with a timeout.',
      level: 'advanced',
    },
  ],
};
