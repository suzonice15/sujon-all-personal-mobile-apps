// Design Patterns chapter: Architecture Patterns.

export default {
  id: 'architecture',
  title: 'Architecture Patterns',
  description: 'Layers, MVC, MVVM and clean architecture',
  icon: 'account-tree',
  lessons: [
    {
      id: 'dp-layered',
      title: 'Layered architecture',
      blocks: [
        { type: 'text', value: 'Layered architecture splits an application into layers: presentation, application, domain and infrastructure. Each layer depends inward, and the domain does not know about the database or the web.' },
        { type: 'code', lang: 'text', tryIt: false, value: `presentation  controllers, views, DTOs
application   use cases, services
domain        entities, business rules
infrastructure database, HTTP clients, queues` },
        { type: 'note', value: 'The dependency rule is the key: inner layers must not import outer layers. That is what keeps the domain testable and portable.' },
      ],
    },
    {
      id: 'dp-mvc-mvvm',
      title: 'MVC and MVVM',
      blocks: [
        { type: 'text', value: 'MVC separates the model, the view and the controller. MVVM separates the model, the view and the view model, where the view model exposes state and commands to a declarative view. Both keep UI code out of business logic.' },
        { type: 'list', items: [
          'Model: data and business rules',
          'View: what the user sees',
          'Controller: handles input and updates the model (MVC)',
          'View model: exposes state and commands (MVVM)',
          'The goal is the same: separate UI from logic',
        ] },
        { type: 'note', value: 'The pattern name matters less than the separation. A screen that mixes database queries, business rules and layout is the real problem.' },
      ],
    },
    {
      id: 'dp-clean-hex',
      title: 'Clean and hexagonal architecture',
      blocks: [
        { type: 'text', value: 'Clean architecture and hexagonal architecture put the domain at the center and treat the database, web and external services as adapters around it. The application can be tested and changed without touching those details.' },
        { type: 'list', items: [
          'Domain at the center, independent of frameworks',
          'Use cases orchestrate the domain',
          'Adapters connect to the outside world',
          'Dependencies point inward',
          'Swap the database or the UI without rewriting the core',
        ] },
        { type: 'note', value: 'Full clean architecture is overkill for a small app. Use the dependency rule and clear layers; add ceremony only when the project grows.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'architecture',
      q: 'In a layered architecture, which way do dependencies point?',
      options: ['Outward', 'Inward toward the domain', 'Both ways', 'Randomly'],
      answer: 1,
      explain: 'Inner layers must not depend on outer ones.',
    },
    {
      chapterId: 'architecture',
      q: 'What does the view model do in MVVM?',
      options: ['Draws the UI', 'Exposes state and commands to the view', 'Stores data', 'Handles HTTP'],
      answer: 1,
      explain: 'The view model holds view state and logic.',
    },
    {
      chapterId: 'architecture',
      q: 'What is at the center of clean architecture?',
      options: ['The database', 'The web framework', 'The domain', 'The UI'],
      answer: 2,
      explain: 'The domain is independent of frameworks.',
    },
    {
      chapterId: 'architecture',
      q: 'When is clean architecture overkill?',
      options: ['For large systems', 'For a small app with simple needs', 'For teams', 'Never'],
      answer: 1,
      explain: 'Small apps often need less ceremony.',
    },
  ],
};
