// Node.js chapter: The HTTP Server.

export default {
  id: 'http-server',
  title: 'HTTP & Servers',
  description: 'Requests, responses and a JSON API without a framework',
  icon: 'http',
  lessons: [
    {
      id: 'node-http-basics',
      title: 'The built-in http module',
      blocks: [
        { type: 'text', value: 'An HTTP server listens on a port, receives a request and writes a response. Node\'s http module is enough to build a small API and to understand what Express adds.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello from Node' }));
});

server.listen(3000, () => {
  console.log('Server on http://localhost:3000');
});` },
        { type: 'text', value: 'The handler runs for every request. req contains the method, URL, headers and body stream. res is where you set the status, headers and body.' },
        { type: 'note', value: 'Always end the response. A handler that never calls res.end leaves the client waiting until it times out.' },
      ],
    },
    {
      id: 'node-http-json',
      title: 'Reading a JSON body',
      blocks: [
        { type: 'text', value: 'The request body is a stream. Collect the chunks, check the size limit, then parse. Never trust the body without validation.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { createServer } from 'node:http';

async function readJson(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 1_000_000) throw new Error('Body too large');
  }
  return JSON.parse(body || '{}');
}

const server = createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/courses') {
    const data = await readJson(req);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ id: 1, ...data }));
    return;
  }
  res.writeHead(404).end();
});

server.listen(3000);` },
        { type: 'text', value: 'Express does this with express.json(), but the underlying idea is the same: read the stream, limit its size, parse and validate.' },
      ],
    },
    {
      id: 'node-http-status',
      title: 'Status codes and headers',
      blocks: [
        { type: 'list', items: [
          '200 OK - normal success',
          '201 Created - a new resource was stored',
          '204 No Content - success with no body',
          '400 Bad Request - invalid input',
          '401 Unauthorized - missing or bad credentials',
          '403 Forbidden - authenticated but not allowed',
          '404 Not Found - the resource does not exist',
          '409 Conflict - duplicate or state conflict',
          '500 Internal Server Error - a bug on the server',
        ] },
        { type: 'text', value: 'The status code is part of the API contract. A client should be able to react without parsing the message text.' },
        { type: 'note', value: 'Never send 200 with { success: false } for a failed validation. Use 400 and let the client handle it. Consistent codes make every client simpler.' },
      ],
    },
    {
      id: 'node-cors',
      title: 'CORS in one minute',
      blocks: [
        { type: 'text', value: 'A browser blocks a request from one origin to another unless the server allows it. The server must send Access-Control-Allow-Origin and handle the preflight OPTIONS request.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true` },
        { type: 'note', value: 'CORS is a browser rule, not server security. Mobile apps and curl ignore it. Use authentication and authorization for real protection.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'http-server',
      q: 'Which module creates an HTTP server without Express?',
      options: ['node:http', 'node:fs', 'node:path', 'node:os'],
      answer: 0,
      explain: 'createServer from node:http handles requests and responses.',
    },
    {
      chapterId: 'http-server',
      q: 'Which status code means a new resource was created?',
      options: ['200', '201', '204', '301'],
      answer: 1,
      explain: '201 Created is the correct response after a successful POST that stores data.',
    },
    {
      chapterId: 'http-server',
      q: 'What must a handler always do?',
      options: ['Call res.end', 'Log the request', 'Open a database', 'Restart the server'],
      answer: 0,
      explain: 'Without ending the response, the client waits until timeout.',
    },
    {
      chapterId: 'http-server',
      q: 'What is CORS?',
      options: ['A database rule', 'A browser rule for cross-origin requests', 'A Node module', 'An encryption method'],
      answer: 1,
      explain: 'Browsers enforce CORS; the server opts in with response headers.',
    },
  ],
};
