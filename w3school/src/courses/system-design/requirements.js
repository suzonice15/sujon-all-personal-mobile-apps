// System Design chapter: Requirements.

export default {
  id: 'requirements',
  title: 'Requirements',
  description: 'Clarify the problem before drawing boxes',
  icon: 'checklist',
  lessons: [
    {
      id: 'sd-functional-requirements',
      title: 'Functional requirements',
      blocks: [
        { type: 'text', value: 'Start with the core user actions. Write them as short statements: a user can shorten a URL, open it, and see click counts. Then define what is out of scope.' },
        { type: 'list', items: [
          'Who are the users?',
          'What are the top 3-5 actions?',
          'What is read-heavy or write-heavy?',
          'What is out of scope for this version?',
          'What data must never be lost?',
        ] },
        { type: 'note', value: 'Saying what you are not building is as important as saying what you are. Scope control keeps the design focused.' },
      ],
    },
    {
      id: 'sd-non-functional',
      title: 'Non-functional requirements',
      blocks: [
        { type: 'text', value: 'These decide the architecture. A 100 ms latency target and a 99.99% availability target lead to different designs than a nightly batch job.' },
        { type: 'list', items: [
          'Latency: p50, p95, p99 targets',
          'Availability: 99.9% vs 99.99%',
          'Durability: can we lose a write?',
          'Consistency: must reads see the latest write?',
          'Scale: current and 10x traffic',
          'Cost and operational budget',
        ] },
        { type: 'note', value: '99.9% allows about 43 minutes of downtime per month. 99.99% allows about 4 minutes. Each nine is dramatically more expensive.' },
      ],
    },
    {
      id: 'sd-api-contract',
      title: 'The API contract',
      blocks: [
        { type: 'text', value: 'Define the endpoints, request/response shapes, status codes and auth before the internals. The API is the contract clients depend on.' },
        { type: 'code', lang: 'text', tryIt: false, value: `POST /api/v1/urls
  { "longUrl": "https://example.com/very/long/path" }
  -> 201 { "shortUrl": "https://cn/abc123", "code": "abc123" }

GET /abc123
  -> 302 Location: https://example.com/very/long/path

GET /api/v1/urls/abc123/stats
  -> 200 { "clicks": 42, "createdAt": "..." }` },
        { type: 'note', value: 'Include pagination, idempotency keys for writes and a version prefix. These are hard to add later without breaking clients.' },
      ],
    },
    {
      id: 'sd-data-model',
      title: 'The data model',
      blocks: [
        { type: 'text', value: 'List the entities and the access patterns. The query patterns decide the indexes and whether to embed or reference data.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Url
  code (unique), longUrl, ownerId, createdAt, expiresAt
Click
  urlCode, clickedAt, country, referrer

Access patterns:
  read by code (hot path)
  list by owner (dashboard)
  count clicks by code` },
        { type: 'note', value: 'The hot path deserves the most attention. For a URL shortener, the redirect read is millions of times more frequent than the create.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'requirements',
      q: 'What is a functional requirement?',
      options: ['A feature the system must do', 'A latency target', 'A cost limit', 'A database index'],
      answer: 0,
      explain: 'It describes behaviour, not quality attributes.',
    },
    {
      chapterId: 'requirements',
      q: 'What does 99.9% availability allow per month?',
      options: ['About 43 minutes', 'About 7 hours', 'About 4 minutes', 'No downtime'],
      answer: 0,
      explain: '30 days is about 43,200 minutes; 0.1% is about 43 minutes.',
    },
    {
      chapterId: 'requirements',
      q: 'Why define the API before internals?',
      options: ['It is shorter', 'Clients depend on the contract', 'It enables caching', 'It removes indexes'],
      answer: 1,
      explain: 'The API is the stable interface between clients and services.',
    },
    {
      chapterId: 'requirements',
      q: 'What decides the data model?',
      options: ['The access patterns', 'The logo', 'The programming language', 'The server vendor'],
      answer: 0,
      explain: 'Queries and writes drive indexes and embedding decisions.',
    },
  ],
};
