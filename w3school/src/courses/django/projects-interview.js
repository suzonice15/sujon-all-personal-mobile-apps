// Django chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a complete courses API and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'dj-project-api',
      title: 'Project: courses API',
      blocks: [
        { type: 'text', value: 'Build a Django project with a courses app: models, migrations, admin, a DRF viewset, authentication, pagination and tests. This is a complete, portfolio-ready backend.' },
        { type: 'code', lang: 'text', tryIt: false, value: `codenest/
  settings.py
  urls.py
  courses/
    models.py       Course, Lesson
    serializers.py  CourseSerializer
    views.py        CourseViewSet
    urls.py
    admin.py
    tests.py
  requirements.txt` },
        { type: 'list', items: [
          'Explicit serializer fields',
          'Permissions on every viewset',
          'Pagination and filtering',
          'select_related and prefetch_related',
          'Tests for list, detail and create',
          'Environment-based settings',
        ] },
        { type: 'note', value: 'A finished API with tests and a README is worth more than many half-built features.' },
      ],
    },
    {
      id: 'dj-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is Django and why use it?',
          'Project versus app?',
          'How do migrations work?',
          'select_related versus prefetch_related?',
          'What is the N+1 problem?',
          'How does authentication work?',
          'How do you secure a Django app?',
          'How do you deploy Django?',
        ] },
        { type: 'text', value: 'Strong answers name the mechanism and the trade-off. "select_related joins a foreign key in one query; prefetch_related runs a second query and batches" is a complete answer.' },
        { type: 'note', value: 'Be ready to read a model, a view and a queryset and spot the N+1 or the missing permission.' },
      ],
    },
    {
      id: 'dj-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: setup, project layout and first view',
          'Week 2: models, migrations and relationships',
          'Week 3: views, URLs and templates',
          'Week 4: forms, validation and CSRF',
          'Week 5: admin, auth and permissions',
          'Week 6: ORM performance and indexes',
          'Week 7: DRF serializers, viewsets and pagination',
          'Week 8: tests, settings and deployment',
        ] },
        { type: 'note', value: 'Build one app end to end. Django rewards knowing the whole flow, not isolated features.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Why use select_related?',
      options: ['To paginate', 'To fetch a foreign key in the same query', 'To create migrations', 'To run tests'],
      answer: 1,
      explain: 'It avoids a query per row for a foreign key.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should every viewset have?',
      options: ['No permissions', 'An explicit permission class', 'A custom template', 'A migration'],
      answer: 1,
      explain: 'Permissions should be a deliberate choice.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a Django portfolio project convincing?',
      options: ['Many empty apps', 'A tested API with auth, pagination and deployment', 'A copied tutorial', 'Only the admin'],
      answer: 1,
      explain: 'A complete, tested project shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first Django step?',
      options: ['DRF', 'Build one app with a model, view and template', 'Deployment', 'Caching'],
      answer: 1,
      explain: 'Start with the core flow and build up.',
    },
  ],
};
