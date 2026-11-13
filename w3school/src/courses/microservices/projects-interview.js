// Microservices chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Design a small system and prepare for interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'ms-project-design',
      title: 'Project: design a learning platform',
      blocks: [
        { type: 'text', value: 'Design a learning platform with courses, enrollments, payments and notifications. Decide which parts are services, which data each owns, how they communicate and how they stay resilient.' },
        { type: 'code', lang: 'text', tryIt: false, value: `client -> API gateway -> courses service   (PostgreSQL)
                    -> enrollments service (PostgreSQL)
                    -> payments service    (PostgreSQL)
                    -> notifications       (queue -> worker)

events: course.published, enrollment.created, payment.succeeded` },
        { type: 'list', items: [
          'One database per service',
          'Synchronous calls for reads, events for side effects',
          'Idempotent consumers',
          'Circuit breakers and timeouts',
          'Traces and structured logs',
          'Containers with health checks',
        ] },
        { type: 'note', value: 'A design with clear boundaries, data ownership and failure behaviour is a strong interview answer, even if the system is small.' },
      ],
    },
    {
      id: 'ms-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Monolith versus microservices?',
          'How do you find service boundaries?',
          'How do services communicate?',
          'How do you handle a distributed transaction?',
          'What is a saga and a compensating action?',
          'How do you prevent cascading failures?',
          'How do you debug a slow request across services?',
          'When would you not use microservices?',
        ] },
        { type: 'text', value: 'Strong answers name the trade-off. "A shared database is simple but couples releases; a database per service adds consistency work but lets teams ship independently" is a complete answer.' },
        { type: 'note', value: 'Be ready to draw a small architecture with services, data ownership, events and failure handling.' },
      ],
    },
    {
      id: 'ms-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: monolith versus microservices, trade-offs',
          'Week 2: bounded contexts and contracts',
          'Week 3: sync and async communication',
          'Week 4: API gateway and discovery',
          'Week 5: data ownership, sagas and CQRS',
          'Week 6: resilience patterns',
          'Week 7: observability and deployment',
          'Week 8: design and document one system end to end',
        ] },
        { type: 'note', value: 'Most microservice skill comes from operating a small system, not from reading about large ones. Build two services and connect them.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Why one database per service?',
      options: ['It is faster', 'So each service owns its data and can change independently', 'It uses less disk', 'It is required'],
      answer: 1,
      explain: 'Data ownership enables independent releases.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you handle a failed step in a saga?',
      options: ['Ignore it', 'Run a compensating action', 'Delete the database', 'Retry forever'],
      answer: 1,
      explain: 'Compensations undo earlier steps.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you debug a slow request?',
      options: ['Read the CSS', 'Use distributed tracing to find the slow span', 'Restart everything', 'Add more servers'],
      answer: 1,
      explain: 'Tracing shows where time is spent.',
    },
    {
      chapterId: 'projects-interview',
      q: 'When should you avoid microservices?',
      options: ['For large teams', 'For a small product with one team', 'For high traffic', 'For independent components'],
      answer: 1,
      explain: 'A small team is often better served by a monolith.',
    },
  ],
};
