// Angular chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a complete Angular app and prepare for interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'ng-project-app',
      title: 'Project: courses app',
      blocks: [
        { type: 'text', value: 'Build a courses app with a list, a detail route, a reactive form, an HTTP service and a cart using signals. Add lazy loading for the admin area and a couple of tests.' },
        { type: 'code', lang: 'text', tryIt: false, value: `src/app/
  app.routes.ts
  courses/
    course-list.component.ts
    course-detail.component.ts
    course.service.ts
    course-form.component.ts
  cart/
    cart.service.ts        signals for items and count
  admin/
    admin.routes.ts        lazy loaded
  shared/
    short-time.pipe.ts
    highlight.directive.ts` },
        { type: 'list', items: [
          'List and detail routes with a param',
          'Reactive form with validation',
          'HTTP service typed with interfaces',
          'Cart state in a signals service',
          'Lazy-loaded admin feature',
          'Unit test for the service and one component',
        ] },
        { type: 'note', value: 'A finished app with tests and a README is worth more than a list of features you did not complete.' },
      ],
    },
    {
      id: 'ng-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Component versus directive versus pipe?',
          'How does dependency injection work?',
          'How do signals differ from RxJS?',
          'switchMap versus mergeMap?',
          'How do you handle a route parameter change?',
          'Reactive forms versus template-driven?',
          'How do you lazy load a feature?',
          'How do you test a component with a service?',
        ] },
        { type: 'text', value: 'Strong answers name the mechanism and the trade-off. "signals are pull-based and synchronous for template state; RxJS is better for streams of events over time" is a complete answer.' },
        { type: 'note', value: 'Be ready to write a small component with an input, an output and a service call, live.' },
      ],
    },
    {
      id: 'ng-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: setup, CLI and components',
          'Week 2: templates, directives and pipes',
          'Week 3: services and dependency injection',
          'Week 4: routing and guards',
          'Week 5: reactive forms and validation',
          'Week 6: HTTP and RxJS',
          'Week 7: signals and testing',
          'Week 8: build and deploy one complete app',
        ] },
        { type: 'note', value: 'Angular rewards consistency. Learn the Angular way of structuring code before mixing in patterns from React.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which Angular feature splits a feature into its own bundle?',
      options: ['A pipe', 'Lazy loading with loadChildren', 'A service', 'A directive'],
      answer: 1,
      explain: 'Lazy loading creates a separate chunk.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you share cart state cleanly?',
      options: ['In every component', 'In a signals service provided at root', 'In a CSS file', 'In the router'],
      answer: 1,
      explain: 'A shared service centralises state.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes an Angular portfolio project convincing?',
      options: ['Many unused modules', 'A working app with routing, forms, HTTP and tests', 'A copied template', 'Only a landing page'],
      answer: 1,
      explain: 'A complete app shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first Angular step?',
      options: ['NgRx', 'Build one component and a route', 'Lazy loading', 'Testing'],
      answer: 1,
      explain: 'Start small and add features.',
    },
  ],
};
