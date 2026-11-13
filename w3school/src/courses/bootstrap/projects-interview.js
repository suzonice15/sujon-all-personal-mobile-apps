// Bootstrap chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a responsive dashboard and prepare',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'bs-project',
      title: 'Project: a responsive dashboard',
      blocks: [
        { type: 'text', value: 'Build a dashboard with a navbar, a responsive card grid, a table, a modal for deletion and a form with validation. Then theme it with Sass variables and test on mobile.' },
        { type: 'list', items: [
          'Navbar with a mobile collapse',
          'Cards that stack and align',
          'A responsive table or stacked cards',
          'A delete confirmation modal',
          'A validated form',
          'A custom primary colour',
        ] },
        { type: 'note', value: 'A finished dashboard with a theme and mobile testing is a strong portfolio piece.' },
      ],
    },
    {
      id: 'bs-interview',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'How does the Bootstrap grid work?',
          'Container versus container-fluid?',
          'How do you customize Bootstrap?',
          'Utilities versus custom CSS?',
          'How does dark mode work in 5.3?',
          'What are the downsides of Bootstrap?',
          'How do you keep markup readable?',
          'How do you test responsiveness?',
        ] },
        { type: 'text', value: 'Strong answers name the trade-off. “Bootstrap is fast for internal tools; a unique brand often needs a custom design system” is a complete answer.' },
        { type: 'note', value: 'Be ready to read a grid snippet and say how it behaves at each breakpoint.' },
      ],
    },
    {
      id: 'bs-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: setup and the basics',
          'Week 2: grid and responsive helpers',
          'Week 3: navbar, cards and alerts',
          'Week 4: forms and validation',
          'Week 5: utilities and flex',
          'Week 6: modals, dropdowns and toasts',
          'Week 7: Sass theming and dark mode',
          'Week 8: build and test the dashboard',
        ] },
        { type: 'note', value: 'Learn CSS layout first. Bootstrap is faster once you understand what the classes do.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which classes create a responsive card grid?',
      options: ['container and table', 'row and col-* breakpoints', 'nav and tabs', 'modal and toast'],
      answer: 1,
      explain: 'The grid uses rows and columns.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you theme Bootstrap?',
      options: ['Inline styles', 'Override Sass variables before import', 'A CSS reset', 'A new framework'],
      answer: 1,
      explain: 'Sass variables change the theme.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should you test at 360px?',
      options: ['Nothing', 'Stacking, navigation and tap targets', 'Only colours', 'Only fonts'],
      answer: 1,
      explain: 'Mobile layout needs real testing.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first Bootstrap step?',
      options: ['Sass theme', 'A container with a responsive row', 'Modals', 'Dark mode'],
      answer: 1,
      explain: 'Start with the grid.',
    },
  ],
};
