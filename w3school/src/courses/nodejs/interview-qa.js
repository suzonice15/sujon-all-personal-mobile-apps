// Node.js interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Node.js and why is it popular for APIs?',
      a: 'A JavaScript runtime built on V8. It is popular because one language covers frontend and backend, the event loop handles many concurrent connections efficiently, and npm provides a huge ecosystem.',
      level: 'basic',
    },
    {
      q: 'Is Node single-threaded?',
      a: 'JavaScript runs on one thread, but Node uses libuv and the operating system for I/O and a thread pool for some operations. Worker threads can run CPU-heavy JavaScript in parallel.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between the call stack, the microtask queue and the timer queue?',
      a: 'The call stack runs synchronous code. Microtasks (promise callbacks) run after the current stack empties, before timers. Timers run in a later phase of the event loop.',
      level: 'advanced',
    },
    {
      q: 'What blocks the event loop?',
      a: 'Synchronous CPU work, synchronous file or network calls, large JSON parsing and expensive regular expressions. Move heavy work to a worker thread, child process or queue.',
      level: 'intermediate',
    },
  ],
  modules: [
    {
      q: 'CommonJS versus ES Modules?',
      a: 'CommonJS uses require and module.exports, loads synchronously and is the legacy default. ESM uses import/export, supports top-level await and is the modern standard. Do not mix casually in one project.',
      level: 'intermediate',
    },
    {
      q: 'How does Node resolve a bare import such as express?',
      a: 'It searches node_modules up the directory tree, reads package.json exports or main, and resolves the entry file. Local paths start with ./ or ../.',
      level: 'intermediate',
    },
    {
      q: 'What happens with circular requires?',
      a: 'The second module receives a partially filled exports object because the first has not finished. Restructure the modules instead of relying on the cycle.',
      level: 'advanced',
    },
    {
      q: 'Why use the node: prefix for built-in modules?',
      a: 'It makes the built-in explicit and prevents a dependency with the same name from shadowing it.',
      level: 'basic',
    },
  ],
  'npm-packages': [
    {
      q: 'What is the difference between dependencies and devDependencies?',
      a: 'dependencies are needed at runtime in production. devDependencies are only for development, testing and building, and are skipped with npm install --omit=dev.',
      level: 'basic',
    },
    {
      q: 'What does a caret range allow?',
      a: 'Compatible updates within the same major version: ^1.4.2 allows 1.x versions from 1.4.2. A tilde allows only patch updates.',
      level: 'basic',
    },
    {
      q: 'Why commit the lockfile?',
      a: 'It pins the exact resolved versions of every dependency, so every environment and CI install the same tree. npm ci uses it for a clean, reproducible install.',
      level: 'intermediate',
    },
    {
      q: 'How do you reduce supply-chain risk from npm packages?',
      a: 'Commit the lockfile, run npm audit, review new dependencies, prefer well-maintained packages, pin major versions and use npm ci in CI.',
      level: 'advanced',
    },
  ],
  'fs-path': [
    {
      q: 'Why avoid synchronous fs calls in a server?',
      a: 'They block the event loop, so no other request is handled until the disk finishes. Use fs/promises or streams in request handlers.',
      level: 'basic',
    },
    {
      q: 'What is the difference between process.cwd() and __dirname?',
      a: 'cwd is the directory where Node was started. __dirname is the directory of the current module. They are often different in production.',
      level: 'intermediate',
    },
    {
      q: 'When should you use a stream?',
      a: 'For large files, uploads, downloads, logs and CSV import, where loading everything into memory would be too expensive.',
      level: 'intermediate',
    },
    {
      q: 'How do you build a cross-platform path?',
      a: 'Use path.join or path.resolve instead of string concatenation, so the correct separator is used on Windows and Linux.',
      level: 'basic',
    },
  ],
  'http-server': [
    {
      q: 'What does an HTTP server do?',
      a: 'It listens on a port, receives requests, runs a handler and writes a status, headers and body back to the client.',
      level: 'basic',
    },
    {
      q: 'Why must a handler call res.end or send a response?',
      a: 'The client waits until the response ends. A handler that never finishes causes a timeout.',
      level: 'basic',
    },
    {
      q: 'What is CORS and is it security?',
      a: 'A browser rule that blocks cross-origin requests unless the server allows them with headers. It is not server security; mobile apps and curl ignore it.',
      level: 'intermediate',
    },
    {
      q: 'Which status code fits a validation failure?',
      a: '400 Bad Request, or 422 when the JSON is valid but business rules fail. Never use 200 with a success:false body for an error.',
      level: 'intermediate',
    },
  ],
  'express-basics': [
    {
      q: 'What does Express add to Node\'s http module?',
      a: 'Routing, middleware, body parsing, a cleaner request/response API and an ecosystem of plugins. The underlying server is still Node.',
      level: 'basic',
    },
    {
      q: 'What does express.json() do?',
      a: 'Reads the JSON request body, parses it and sets req.body. Without it, req.body is undefined.',
      level: 'basic',
    },
    {
      q: 'Where do route parameters and query strings appear?',
      a: 'Path parameters are in req.params. Query strings are in req.query and are always strings.',
      level: 'basic',
    },
    {
      q: 'Why split app.js and server.js?',
      a: 'Tests can import the configured app without opening a port. The server file only starts listening.',
      level: 'intermediate',
    },
  ],
  middleware: [
    {
      q: 'What is middleware?',
      a: 'A function (req, res, next) that runs in order. It can read or modify the request, end the response, or call next() to continue.',
      level: 'basic',
    },
    {
      q: 'How does Express detect error middleware?',
      a: 'By its four parameters: (err, req, res, next). It must be registered after routes.',
      level: 'intermediate',
    },
    {
      q: 'What happens if a middleware never calls next() and never responds?',
      a: 'The request hangs until the client times out. Every branch must either respond or call next().',
      level: 'intermediate',
    },
    {
      q: 'Why limit the body size?',
      a: 'A huge body can exhaust memory and CPU. express.json({ limit: "100kb" }) rejects it early.',
      level: 'basic',
    },
  ],
  'rest-api': [
    {
      q: 'What makes an API RESTful?',
      a: 'Resources identified by URLs, actions expressed by HTTP methods, stateless requests, consistent status codes and a uniform interface. It is a style, not a strict protocol.',
      level: 'intermediate',
    },
    {
      q: 'PUT versus PATCH?',
      a: 'PUT replaces the whole resource. PATCH applies a partial update. Both should be idempotent.',
      level: 'basic',
    },
    {
      q: 'How do you paginate a list endpoint?',
      a: 'Use limit and page or a cursor. Return metadata, cap the limit and avoid a large OFFSET on big tables.',
      level: 'intermediate',
    },
    {
      q: 'Why do writes need idempotency keys?',
      a: 'Mobile networks retry. Without a key, a retried POST can create a duplicate order or charge. The server returns the original result for the same key.',
      level: 'advanced',
    },
  ],
  'validation-errors': [
    {
      q: 'Why validate on the server if the app already validates?',
      a: 'The client is untrusted and can be modified. The server is the only place that can guarantee the data is valid.',
      level: 'basic',
    },
    {
      q: 'What should an error response contain?',
      a: 'A correct status code, a stable machine-readable code, a short safe message and optional field details. Never a stack trace or SQL.',
      level: 'intermediate',
    },
    {
      q: 'How do you handle errors from async handlers?',
      a: 'Wrap the handler so rejected promises are passed to next(error), or use a library that does it. Then one error middleware formats the response.',
      level: 'intermediate',
    },
    {
      q: '400 versus 422?',
      a: '400 for a malformed or invalid request. 422 when the request is syntactically valid but fails business validation. Pick one convention and be consistent.',
      level: 'advanced',
    },
  ],
  auth: [
    {
      q: 'How should passwords be stored?',
      a: 'With a slow, salted password hash such as bcrypt, scrypt or Argon2. Never plain text or a fast hash.',
      level: 'basic',
    },
    {
      q: 'JWT versus session?',
      a: 'JWT is stateless and scales across services but is hard to revoke. Sessions are stored server-side, easy to revoke, and need a shared store for multiple servers.',
      level: 'intermediate',
    },
    {
      q: 'Is a JWT encrypted?',
      a: 'No. The payload is base64url encoded and readable. Only the signature is verified. Never store secrets in it.',
      level: 'intermediate',
    },
    {
      q: 'How do you prevent authorization bugs?',
      a: 'Check ownership and roles on the server for every request. Do not rely on hidden UI. Return 403 when the identity is valid but access is denied.',
      level: 'advanced',
    },
  ],
  database: [
    {
      q: 'Why use a connection pool?',
      a: 'Opening a connection is expensive. A pool reuses a small set of connections and limits the load on the database.',
      level: 'basic',
    },
    {
      q: 'How do you prevent SQL injection?',
      a: 'Use parameterized queries or prepared statements. Never concatenate user input into SQL.',
      level: 'basic',
    },
    {
      q: 'What is the N+1 problem?',
      a: 'One query for a list plus one query per row. It multiplies round trips. Fix it with a join or a batched query.',
      level: 'intermediate',
    },
    {
      q: 'How do you handle a transaction correctly?',
      a: 'Acquire a client, BEGIN, run the statements, COMMIT on success, ROLLBACK on failure, and release the client in finally.',
      level: 'intermediate',
    },
  ],
  deployment: [
    {
      q: 'Where should secrets be stored?',
      a: 'In environment variables or a secret manager, never in the repository. The app should fail fast if a required secret is missing.',
      level: 'basic',
    },
    {
      q: 'What should a health check verify?',
      a: 'That the process is alive and can reach critical dependencies such as the database, not just that the port is open.',
      level: 'intermediate',
    },
    {
      q: 'Why implement graceful shutdown?',
      a: 'On SIGTERM the app should stop accepting new requests, finish in-flight work, close the pool and exit. Otherwise deploys drop requests.',
      level: 'intermediate',
    },
    {
      q: 'What belongs in a production checklist?',
      a: 'HTTPS, secure cookies, helmet, CORS allow-list, rate limiting, body limits, timeouts, pool sizing, structured logs, error tracking, backups and a tested restore.',
      level: 'advanced',
    },
  ],
  'project-interview': [
    {
      q: 'How would you structure a Node API project?',
      a: 'A small server.js that starts the app, an app.js with middleware and routes, then routes, controllers, services and a db layer. Separate concerns so each file has one job.',
      level: 'intermediate',
    },
    {
      q: 'How do you test an Express API?',
      a: 'Import the app, send requests with Supertest, assert status, body and headers, use a separate test database and reset it between tests.',
      level: 'intermediate',
    },
    {
      q: 'How do you make an API safe to retry?',
      a: 'Make GET, PUT and DELETE idempotent, and add an idempotency key to POST endpoints that create orders or payments.',
      level: 'advanced',
    },
    {
      q: 'What would you add to a learning API to make it portfolio-ready?',
      a: 'Authentication, role-based authorization, validation, pagination, tests, Docker, a health check, structured logging, a README and an OpenAPI file.',
      level: 'basic',
    },
  ],
};
