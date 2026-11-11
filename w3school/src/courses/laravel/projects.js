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
  ],
};
