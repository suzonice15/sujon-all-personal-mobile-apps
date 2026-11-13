// Microservices chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Monolith versus microservices and when to split',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'ms-what-is',
      title: 'What are microservices?',
      blocks: [
        { type: 'text', value: 'Microservices are small, independently deployable services that communicate over a network. Each service owns one business capability, its own data and its own release cycle. The alternative is a monolith: one deployable unit containing everything.' },
        { type: 'list', items: [
          'Independently deployable',
          'Organised around business capabilities',
          'Own their data',
          'Communicate over the network',
          'Can use different languages and databases',
        ] },
        { type: 'note', value: 'Microservices solve an organisational problem as much as a technical one. They let many teams ship without coordinating every release.' },
      ],
    },
    {
      id: 'ms-monolith',
      title: 'Monolith versus microservices',
      blocks: [
        { type: 'text', value: 'A monolith is simpler to build, test and deploy. Microservices add network latency, distributed transactions, operational complexity and debugging across services. Start with a modular monolith unless you have a real reason to split.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Monolith                    Microservices
---------------------------------------------
one deploy                  many deploys
one database                database per service
in-process calls            network calls
simple transactions         sagas and eventual consistency
easy debugging              distributed tracing
scales as a whole           scales per service` },
        { type: 'note', value: 'Most companies that fail with microservices failed because they split too early. A well-structured monolith is a fine place to start.' },
      ],
    },
    {
      id: 'ms-when-split',
      title: 'When to split',
      blocks: [
        { type: 'text', value: 'Split when a part of the system has a different scaling need, a different release cadence, or a clear team boundary. Do not split by technical layer such as controllers and repositories; split by business capability.' },
        { type: 'list', items: [
          'A component needs to scale independently',
          'A team needs to release without waiting for others',
          'A boundary is stable and well understood',
          'Different compliance or data-residency needs',
          'The monolith has become hard to change safely',
        ] },
        { type: 'note', value: 'A good split reduces coordination. A bad split turns every change into a distributed transaction.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is a microservice?',
      options: ['A small function', 'An independently deployable service owning one capability', 'A database table', 'A frontend component'],
      answer: 1,
      explain: 'A microservice owns one business capability.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is a common reason microservices fail?',
      options: ['Too many tests', 'Splitting too early', 'Using containers', 'Writing too little code'],
      answer: 1,
      explain: 'Premature splitting adds complexity without benefit.',
    },
    {
      chapterId: 'getting-started',
      q: 'How should services be split?',
      options: ['By technical layer', 'By business capability', 'By file size', 'Randomly'],
      answer: 1,
      explain: 'Split by business capability, not by layer.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does a microservice own?',
      options: ['Nothing', 'Its data and release cycle', 'The whole database', 'The frontend'],
      answer: 1,
      explain: 'Each service owns its data and deploys independently.',
    },
  ],
};
