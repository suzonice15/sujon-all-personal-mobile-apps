// Flask chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a complete Flask API and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'flask-project-api',
      title: 'Project: courses API',
      blocks: [
        { type: 'text', value: 'Build a Flask API with an app factory, blueprints, SQLAlchemy models, migrations, validation, token auth, pagination and tests. This is a complete portfolio backend.' },
        { type: 'code', lang: 'text', tryIt: false, value: `codenest/
  app/
    __init__.py       create_app
    config.py
    extensions.py     db, login_manager
    models.py
    courses/
      routes.py       GET/POST /api/courses
      auth.py         register, login
    errors.py
  migrations/
  tests/
  requirements.txt` },
        { type: 'list', items: [
          'One blueprint per feature',
          'Validation in the view or a schema',
          'Pagination on every list',
          'Consistent error shape',
          'Token auth and ownership checks',
          'Tests for the happy path and the failures',
        ] },
        { type: 'note', value: 'A finished API with tests and a README is worth more than many half-built features.' },
      ],
    },
    {
      id: 'flask-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Flask versus Django?',
          'What is a blueprint?',
          'What is the app factory?',
          'How does Flask handle requests?',
          'How do you structure a growing app?',
          'How do you manage the database session?',
          'How do you authenticate an API?',
          'How do you deploy Flask?',
        ] },
        { type: 'text', value: 'Strong answers name the mechanism and the trade-off. "Flask gives you routing and templates and lets you choose the ORM; Django bundles all of it with more conventions" is a complete answer.' },
        { type: 'note', value: 'Be ready to read a blueprint and app factory and explain how they fit together.' },
      ],
    },
    {
      id: 'flask-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: setup and first routes',
          'Week 2: routes, request data and errors',
          'Week 3: Jinja templates and static files',
          'Week 4: forms and validation',
          'Week 5: SQLAlchemy models and migrations',
          'Week 6: blueprints and the app factory',
          'Week 7: REST APIs and authentication',
          'Week 8: tests and deployment',
        ] },
        { type: 'note', value: 'Learn Python first. Flask is thin; the language and the database are the real work.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Why use a blueprint per feature?',
      options: ['For speed', 'To keep routes and templates modular', 'To enable CSRF', 'To paginate'],
      answer: 1,
      explain: 'Blueprints split a growing app.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should every list endpoint have?',
      options: ['No limit', 'Pagination and a capped page size', 'A stack trace', 'A template'],
      answer: 1,
      explain: 'Bounded lists protect the server.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a Flask portfolio project convincing?',
      options: ['A single file', 'A structured app with auth, migrations, tests and docs', 'A copied tutorial', 'No validation'],
      answer: 1,
      explain: 'A complete, tested project shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first Flask step?',
      options: ['Blueprints', 'One route and one JSON response', 'Deployment', 'Migrations'],
      answer: 1,
      explain: 'Start small and build up.',
    },
  ],
};
