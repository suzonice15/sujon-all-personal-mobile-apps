// jQuery chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a small app and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'jq-project',
      title: 'Project: a course list',
      blocks: [
        { type: 'text', value: 'Build a small page that loads courses with AJAX, renders a list, adds a form with validation and deletes items with delegation. Then migrate one part to native JavaScript.' },
        { type: 'list', items: [
          'GET the list and render with text()',
          'POST a new course and disable the button',
          'Delegate delete clicks',
          'Show loading and error states',
          'Migrate one function to fetch',
        ] },
        { type: 'note', value: 'A small working app plus one successful native migration is a strong answer about legacy skills.' },
      ],
    },
    {
      id: 'jq-interview',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Why was jQuery created?',
          'What does $() return?',
          'Event delegation and why it matters?',
          'How do you prevent XSS in jQuery?',
          'How do you handle AJAX errors?',
          'jQuery versus native DOM?',
          'When would you migrate off jQuery?',
          'What are the risks of old plugins?',
        ] },
        { type: 'text', value: 'Strong answers are honest about trade-offs. “jQuery normalized browsers back then; today native APIs cover most of it, but legacy apps still need care” is complete.' },
        { type: 'note', value: 'Be ready to read a fragment and spot an XSS risk or a missing delegation.' },
      ],
    },
    {
      id: 'jq-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: setup and selectors',
          'Week 2: events and delegation',
          'Week 3: DOM and forms',
          'Week 4: AJAX',
          'Week 5: effects and accessibility',
          'Week 6: plugins and security',
          'Week 7: migrate one component to native JS',
        ] },
        { type: 'note', value: 'Learn modern JavaScript first. jQuery is easiest to read once you know what it replaces.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'How do you render user text safely?',
      options: ['html()', 'text()', 'append HTML', 'eval()'],
      answer: 1,
      explain: 'text() avoids XSS.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you handle delete on future items?',
      options: ['Direct bind', 'Delegate from a stable parent', 'Inline onclick with HTML', 'Poll'],
      answer: 1,
      explain: 'Delegate with .on(selector).',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the modern replacement for $.get?',
      options: ['fetch', 'XMLHttpRequest only', 'alert', 'document.write'],
      answer: 0,
      explain: 'fetch is the native API.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first step?',
      options: ['Rewrite the app', 'Load a list with AJAX and render it', 'Add plugins', 'Animate everything'],
      answer: 1,
      explain: 'Start with one working flow.',
    },
  ],
};
