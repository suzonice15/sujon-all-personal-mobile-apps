// CodeIgniter chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a courses app and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'ci-project',
      title: 'Project: courses app',
      blocks: [
        { type: 'text', value: 'Build a small MVC app: a courses table with migrations, a model, a list and detail page, a create form with validation, login with sessions and a JSON API route. Then deploy it.' },
        { type: 'code', lang: 'text', tryIt: false, value: `app/
  Controllers/Courses.php
  Models/CourseModel.php
  Views/courses/list.php, form.php
  Filters/AuthFilter.php
  Config/Routes.php
  Database/Migrations/..._AddCourses.php` },
        { type: 'list', items: [
          'Migrations for the schema',
          'Model with allowedFields',
          'Validation and CSRF on forms',
          'Session login with a hash',
          'Auth filter on protected routes',
          'Tests for list, create and 404',
        ] },
        { type: 'note', value: 'A small finished app with auth, validation and tests is a strong portfolio piece.' },
      ],
    },
    {
      id: 'ci-interview',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'CodeIgniter versus Laravel?',
          'How does routing work?',
          'What are filters?',
          'How do migrations work?',
          'How do you prevent SQL injection?',
          'How do you handle authentication?',
          'How do you secure a CodeIgniter app?',
          'How do you deploy it?',
        ] },
        { type: 'text', value: 'Strong answers compare trade-offs. “CodeIgniter is smaller and boots faster; Laravel has more built-in features and conventions” is a complete answer.' },
        { type: 'note', value: 'Be ready to read a controller and spot the missing validation or ownership check.' },
      ],
    },
    {
      id: 'ci-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: setup and first route',
          'Week 2: routing, controllers and filters',
          'Week 3: models and the query builder',
          'Week 4: views and layouts',
          'Week 5: forms and validation',
          'Week 6: auth and security',
          'Week 7: testing and deployment',
          'Week 8: build and deploy the courses app',
        ] },
        { type: 'note', value: 'Learn PHP first. CodeIgniter is thin; the language and SQL are the real work.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which file defines routes?',
      options: ['app/Config/Routes.php', 'routes.json', 'index.php', 'public/routes.php'],
      answer: 0,
      explain: 'Routes live in app/Config/Routes.php.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should a model limit?',
      options: ['Rows', 'Allowed fields for mass assignment', 'Views', 'Routes'],
      answer: 1,
      explain: 'allowedFields protects sensitive columns.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a CodeIgniter project convincing?',
      options: ['A single controller', 'Migrations, auth, validation and tests', 'A copied tutorial', 'No CSRF'],
      answer: 1,
      explain: 'A complete app shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first step?',
      options: ['Deploy', 'A route, controller and view', 'Migrations', 'Auth'],
      answer: 1,
      explain: 'Start with the MVC flow.',
    },
  ],
};
