// Agile chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Agile is and why small cycles work',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'agile-what-is',
      title: 'What is Agile?',
      blocks: [
        { type: 'text', value: 'Agile is a way of working in short cycles with frequent feedback. Instead of one big plan and a late release, you ship small increments, learn from users and adjust. Scrum and Kanban are two common frameworks.' },
        { type: 'list', items: [
          'Short iterations with a working increment',
          'Frequent feedback from users and stakeholders',
          'Plans change as you learn',
          'Cross-functional teams own delivery',
          'Continuous improvement',
        ] },
        { type: 'note', value: 'Agile is not “no planning”. It is planning at a useful horizon and updating the plan often.' },
      ],
    },
    {
      id: 'agile-waterfall',
      title: 'Agile versus waterfall',
      blocks: [
        { type: 'text', value: 'Waterfall plans the whole project up front and delivers at the end. Agile delivers in slices and learns between them. Waterfall can be right when requirements are fixed and change is expensive, such as some regulated hardware.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Waterfall:  design -> build -> test -> release
Agile:      plan -> build -> test -> release -> learn
            (repeat every 1-2 weeks)` },
        { type: 'note', value: 'The framework matters less than short feedback and honest measurement.' },
      ],
    },
    {
      id: 'agile-mindset',
      title: 'The mindset',
      blocks: [
        { type: 'list', items: [
          'Working software over long documentation',
          'Responding to change over following a fixed plan',
          'Collaboration over handoffs',
          'Small batches over big releases',
          'Transparency over optimistic status reports',
        ] },
        { type: 'text', value: 'A team that says “we are 90 percent done” for three sprints is not Agile, even with the right meetings.' },
        { type: 'note', value: 'Rituals without honesty become theatre. The value is in the feedback, not the ceremony.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is Agile?',
      options: ['A tool', 'Working in short cycles with frequent feedback', 'A programming language', 'A database'],
      answer: 1,
      explain: 'Agile is an iterative way of working.',
    },
    {
      chapterId: 'getting-started',
      q: 'When is waterfall reasonable?',
      options: ['For every project', 'When requirements are fixed and change is expensive', 'Never', 'Only for websites'],
      answer: 1,
      explain: 'Fixed scope can suit waterfall.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is the core of Agile?',
      options: ['More meetings', 'Short feedback and honest measurement', 'A big plan', 'A Gantt chart'],
      answer: 1,
      explain: 'Feedback drives improvement.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is “Agile theatre”?',
      options: ['A play', 'Rituals without honesty or change', 'A planning tool', 'A sprint'],
      answer: 1,
      explain: 'Ceremony without feedback helps nobody.',
    },
  ],
};
