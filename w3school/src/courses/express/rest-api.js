// Node.js chapter: REST API Design.

export default {
  id: 'rest-api',
  title: 'REST API Design',
  description: 'Resources, methods, status codes and pagination',
  icon: 'api',
  lessons: [
    {
      id: 'node-rest-resources',
      title: 'Resources and methods',
      blocks: [
        { type: 'text', value: 'REST models the API as resources. The URL names the resource and the HTTP method names the action. Keep nouns in the path and let the method express the verb.' },
        { type: 'list', items: [
          'GET /courses - list',
          'GET /courses/:id - read one',
          'POST /courses - create',
          'PUT /courses/:id - replace',
          'PATCH /courses/:id - partial update',
          'DELETE /courses/:id - remove',
        ] },
        { type: 'text', value: 'Avoid verbs in URLs such as /getCourses or /createCourse. A predictable shape makes the API easy to learn and cache.' },
        { type: 'note', value: 'Nest only when the child cannot exist alone: /courses/:id/lessons is fine. Do not nest deeply; flat URLs with filters are easier to evolve.' },
      ],
    },
    {
      id: 'node-rest-crud',
      title: 'CRUD routes',
      blocks: [
        { type: 'text', value: 'A resource usually needs five routes. Keep the handler thin: validate, call a service, return the result with the right status.' },
        { type: 'code', lang: 'js', tryIt: false, value: `router.get('/', async (req, res) => {
  res.json(await courseService.list(req.query));
});

router.get('/:id', async (req, res) => {
  const course = await courseService.find(req.params.id);
  if (!course) return res.status(404).json({ error: 'Not found' });
  res.json(course);
});

router.post('/', async (req, res) => {
  const course = await courseService.create(req.body);
  res.status(201).json(course);
});

router.patch('/:id', async (req, res) => {
  const course = await courseService.update(req.params.id, req.body);
  if (!course) return res.status(404).json({ error: 'Not found' });
  res.json(course);
});

router.delete('/:id', async (req, res) => {
  await courseService.remove(req.params.id);
  res.status(204).end();
});` },
      ],
    },
    {
      id: 'node-rest-pagination',
      title: 'Pagination, filtering and sorting',
      blocks: [
        { type: 'text', value: 'Lists must be paginated. Return the page metadata with the data so the client knows whether another page exists.' },
        { type: 'code', lang: 'text', tryIt: false, value: `GET /api/courses?page=2&limit=20&sort=price&order=desc&minPrice=1000

{
  "data": [ ... ],
  "page": 2,
  "limit": 20,
  "total": 143,
  "hasMore": true
}` },
        { type: 'list', items: [
          'Whitelist sortable fields; never pass raw user input into ORDER BY',
          'Cap limit to a sane maximum, for example 100',
          'Use cursor pagination for very large tables',
          'Return total only when the client needs it; COUNT is expensive',
        ] },
        { type: 'note', value: 'A query parameter is still user input. Validate types and ranges before it reaches the database.' },
      ],
    },
    {
      id: 'node-rest-version-idempotency',
      title: 'Versioning and idempotency',
      blocks: [
        { type: 'text', value: 'APIs change. Version the path (/api/v1) or use a header. Keep old versions long enough for clients to migrate.' },
        { type: 'text', value: 'GET, PUT and DELETE should be idempotent: calling them twice leaves the same state. POST is not, so a retried payment or order needs an idempotency key.' },
        { type: 'code', lang: 'js', tryIt: false, value: `app.post('/api/orders', async (req, res) => {
  const key = req.headers['idempotency-key'];
  if (!key) return res.status(400).json({ error: 'Missing idempotency key' });

  const existing = await orders.findByKey(key);
  if (existing) return res.json(existing);

  const order = await orders.create({ ...req.body, key });
  res.status(201).json(order);
});` },
        { type: 'note', value: 'Retries are normal on mobile networks. Without idempotency, a flaky connection can create two orders or charge twice.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'rest-api',
      q: 'Which method creates a resource?',
      options: ['GET', 'POST', 'DELETE', 'HEAD'],
      answer: 1,
      explain: 'POST creates; the response is usually 201 Created.',
    },
    {
      chapterId: 'rest-api',
      q: 'Which route shape is RESTful?',
      options: ['/getCourses', '/courses/:id', '/course/create', '/api?action=list'],
      answer: 1,
      explain: 'Nouns in the path and actions in the HTTP method.',
    },
    {
      chapterId: 'rest-api',
      q: 'Why paginate a list endpoint?',
      options: ['To make URLs longer', 'To limit response size and database work', 'To enable CORS', 'To avoid authentication'],
      answer: 1,
      explain: 'Returning every row is slow and can exhaust memory on both sides.',
    },
    {
      chapterId: 'rest-api',
      q: 'What is an idempotency key for?',
      options: ['Caching GET requests', 'Making retried writes safe', 'Sorting results', 'Encrypting data'],
      answer: 1,
      explain: 'The server recognizes a repeated request and returns the first result instead of creating a duplicate.',
    },
  ],
};
