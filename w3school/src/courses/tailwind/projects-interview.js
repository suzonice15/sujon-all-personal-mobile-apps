// Tailwind chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a responsive page and prepare',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'tw-project',
      title: 'Project: a course landing page',
      blocks: [
        { type: 'text', value: 'Build a landing page with a header, hero, responsive card grid, a form and dark mode. Extract a Button and Card component, add a brand colour in the config and test at three widths.' },
        { type: 'list', items: [
          'Responsive hero with clear hierarchy',
          'Card grid: 1 / 2 / 3 columns',
          'Reusable Button and Card components',
          'Form with focus and error states',
          'Dark mode with a toggle',
          'Brand colour and radius tokens',
        ] },
        { type: 'note', value: 'A finished page with dark mode and components demonstrates real Tailwind skill.' },
      ],
    },
    {
      id: 'tw-interview',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is utility-first CSS?',
          'How does the build remove unused classes?',
          'How do you reuse styles?',
          'How do breakpoints work?',
          'How do you implement dark mode?',
          'When use arbitrary values?',
          'Tailwind versus Bootstrap?',
          'How do you keep markup readable?',
        ] },
        { type: 'text', value: 'Strong answers name the trade-off. “Utility-first removes the naming problem but can clutter markup, so components own the repeated classes” is complete.' },
        { type: 'note', value: 'Be ready to read a utility class list and describe the resulting layout.' },
      ],
    },
    {
      id: 'tw-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: setup and utility classes',
          'Week 2: spacing, colour and type',
          'Week 3: flex and grid',
          'Week 4: responsive breakpoints',
          'Week 5: components and reuse',
          'Week 6: dark mode',
          'Week 7: config, tokens and plugins',
          'Week 8: build the landing page',
        ] },
        { type: 'note', value: 'Learn CSS first. Tailwind is a faster way to write CSS, not a replacement for understanding it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'How do you build a responsive card grid?',
      options: ['grid-cols-1 md:grid-cols-2 lg:grid-cols-3', 'flex only', 'float', 'table'],
      answer: 0,
      explain: 'Grid with breakpoint columns.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you make styles reusable?',
      options: ['Copy classes', 'Extract components', 'Use inline styles', 'Add !important'],
      answer: 1,
      explain: 'Components own repeated classes.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you verify dark mode?',
      options: ['Assume it works', 'Toggle and check contrast on real screens', 'Only read the code', 'Delete the theme'],
      answer: 1,
      explain: 'Test both themes visually.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first step?',
      options: ['Plugins', 'A simple card with utilities', 'Dark mode', 'Config tokens'],
      answer: 1,
      explain: 'Start with one component.',
    },
  ],
};
