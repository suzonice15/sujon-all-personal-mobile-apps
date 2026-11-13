// Microservices chapter: Service Design.

export default {
  id: 'service-design',
  title: 'Service Design',
  description: 'Bounded contexts, contracts and versioning',
  icon: 'account-tree',
  lessons: [
    {
      id: 'ms-bounded-context',
      title: 'Bounded contexts',
      blocks: [
        { type: 'text', value: 'A bounded context is a boundary inside which one model and one language are consistent. In an e-commerce system, "product" means something different in the catalog, the cart and the warehouse. Each context can model it differently.' },
        { type: 'list', items: [
          'One team usually owns one bounded context',
          'The same word can mean different things in different contexts',
          'Contexts communicate through explicit contracts',
          'A context should be small enough to own and test',
          'Do not share a domain model across services',
        ] },
        { type: 'note', value: 'Bounded contexts come from domain-driven design. They are a better guide for service boundaries than technical layers.' },
      ],
    },
    {
      id: 'ms-contracts',
      title: 'Service contracts',
      blocks: [
        { type: 'text', value: 'A service contract defines what a caller can rely on: endpoints, request and response shapes, status codes and error formats. Treat it like an API you publish to other teams.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `openapi: 3.0.0
paths:
  /courses/{id}:
    get:
      summary: Get a course
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string }
      responses:
        '200': { description: Found }
        '404': { description: Not found }` },
        { type: 'note', value: 'Publish the contract as a file in the repo. It makes breaking changes visible in review.' },
      ],
    },
    {
      id: 'ms-versioning',
      title: 'Versioning and compatibility',
      blocks: [
        { type: 'text', value: 'Services change. Add fields instead of removing them, keep old endpoints until clients migrate, and version the API when you must break it. Backward compatibility is cheaper than a coordinated release.' },
        { type: 'list', items: [
          'Additive changes are usually safe',
          'Removing or renaming a field breaks clients',
          'Deprecate with a timeline and a migration path',
          'Use consumer-driven contract tests',
          'Never change meaning silently; change the field name',
        ] },
        { type: 'note', value: 'A service that changes its response shape without notice forces every client team to react at once. That is the coordination you were trying to avoid.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'service-design',
      q: 'What is a bounded context?',
      options: ['A database', 'A boundary where one model and language are consistent', 'A deployment', 'A testing tool'],
      answer: 1,
      explain: 'A context keeps one model consistent.',
    },
    {
      chapterId: 'service-design',
      q: 'What is a service contract?',
      options: ['A legal document', 'What callers can rely on: endpoints, shapes and errors', 'A database schema', 'A deployment script'],
      answer: 1,
      explain: 'It defines the API surface.',
    },
    {
      chapterId: 'service-design',
      q: 'Which change is usually safe?',
      options: ['Removing a field', 'Adding a new optional field', 'Renaming a field', 'Changing a status code'],
      answer: 1,
      explain: 'Additive changes are usually backward compatible.',
    },
    {
      chapterId: 'service-design',
      q: 'Why publish the OpenAPI file in the repo?',
      options: ['It is required', 'To make breaking changes visible in review', 'To generate CSS', 'To cache responses'],
      answer: 1,
      explain: 'The contract becomes reviewable.',
    },
  ],
};
