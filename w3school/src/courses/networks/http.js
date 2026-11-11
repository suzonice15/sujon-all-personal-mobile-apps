// Networks chapter: HTTP.

export default {
  id: 'http',
  title: 'HTTP',
  description: 'Requests, responses, methods, headers and cookies',
  icon: 'http',
  lessons: [
    {
      id: 'net-http-message',
      title: 'Request and response',
      blocks: [
        { type: 'text', value: 'HTTP is a text protocol. A request has a method, a path, headers and an optional body. A response has a status line, headers and an optional body.' },
        { type: 'code', lang: 'text', tryIt: false, value: `GET /api/courses/1 HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer <token>

HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=60

{"id":1,"title":"SQL","price":5000}` },
        { type: 'note', value: 'HTTP is stateless. Each request must carry the information the server needs, usually a token or a cookie.' },
      ],
    },
    {
      id: 'net-http-methods-status',
      title: 'Methods and status codes',
      blocks: [
        { type: 'list', items: [
          'GET - read, safe and idempotent',
          'POST - create, not idempotent',
          'PUT - replace, idempotent',
          'PATCH - partial update, idempotent in practice',
          'DELETE - remove, idempotent',
        ] },
        { type: 'code', lang: 'text', tryIt: false, value: `2xx success     200 OK, 201 Created, 204 No Content
3xx redirect    301 Moved, 304 Not Modified
4xx client      400 Bad Request, 401, 403, 404, 429
5xx server      500 Internal Error, 502, 503, 504` },
        { type: 'note', value: 'Do not return 200 for a failed validation. The status code is part of the API contract and clients branch on it.' },
      ],
    },
    {
      id: 'net-http-headers-cache',
      title: 'Headers and caching',
      blocks: [
        { type: 'text', value: 'Headers describe the body and the connection. Cache-Control, ETag and Last-Modified control caching. Content-Type tells the client how to parse the body.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Content-Type: application/json
Authorization: Bearer <token>
Cache-Control: public, max-age=3600
ETag: "abc123"
If-None-Match: "abc123"

-> 304 Not Modified (no body)` },
        { type: 'note', value: 'A CDN caches based on headers and URL. Authenticated responses need careful cache rules so one user does not see another user\'s data.' },
      ],
    },
    {
      id: 'net-http-cookies',
      title: 'Cookies',
      blocks: [
        { type: 'text', value: 'A cookie is a small key-value pair the server asks the client to send on future requests. Flags control security: HttpOnly, Secure and SameSite.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800` },
        { type: 'note', value: 'HttpOnly blocks JavaScript access, Secure requires HTTPS, and SameSite reduces cross-site request forgery. Set all three for a session cookie.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'http',
      q: 'Which method is idempotent?',
      options: ['POST', 'PUT', 'PATCH by definition', 'CONNECT'],
      answer: 1,
      explain: 'Repeating a PUT reaches the same state; a POST may create duplicates.',
    },
    {
      chapterId: 'http',
      q: 'What does 404 mean?',
      options: ['Server error', 'Not found', 'Redirect', 'Unauthorized'],
      answer: 1,
      explain: 'The resource does not exist.',
    },
    {
      chapterId: 'http',
      q: 'Which header sets a cache lifetime?',
      options: ['Content-Type', 'Cache-Control', 'Host', 'Cookie'],
      answer: 1,
      explain: 'Cache-Control controls caching behaviour and max-age.',
    },
    {
      chapterId: 'http',
      q: 'What does HttpOnly prevent?',
      options: ['HTTPS', 'JavaScript reading the cookie', 'Caching', 'Compression'],
      answer: 1,
      explain: 'It hides the cookie from document.cookie.',
    },
  ],
};
