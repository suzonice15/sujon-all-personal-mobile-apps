// Laravel chapter: Projects.

export default {
  id: 'laravel-projects',
  title: 'Projects',
  description: 'Build real apps with Laravel',
  icon: 'construction',
  lessons: [
    {
      id: 'laravel-project-blog',
      title: 'Blog App',
      blocks: [
        { type: 'list', items: ['Models: User, Post, Comment, Tag.', 'Auth with Breeze.', 'CRUD with Form Requests.', 'Blade components + pagination.', 'Image upload with Storage.', 'Policies for ownership.', 'Feature tests.'] },
      ],
    },
    {
      id: 'laravel-project-api',
      title: 'REST API + Sanctum',
      blocks: [
        { type: 'list', items: ['API resources.', 'Token auth.', 'Rate limiting.', 'Queued emails.', 'Pest tests with RefreshDatabase.'] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'laravel-projects', q: 'Good first Laravel project?', options: ['Blog CRUD', 'Kernel driver', 'Compiler', 'Game engine'], answer: 0, explain: 'CRUD blog covers core.' },
    { chapterId: 'laravel-projects', q: 'What should a portfolio project include?', options: ['Auth, tests and a deploy', 'Only HTML', 'No database', 'A single file'], answer: 0, explain: 'A complete flow is what reviewers check.' },
    { chapterId: 'laravel-projects', q: 'Why seed demo data?', options: ['So reviewers can try it immediately', 'Faster tests only', 'To hide bugs', 'To skip migrations'], answer: 0, explain: 'Seeded data makes the app usable on first run.' },
  ],
};
