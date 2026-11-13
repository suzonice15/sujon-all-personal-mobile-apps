// Agile chapter: Events.

export default {
  id: 'events',
  title: 'Scrum Events',
  description: 'Planning, daily, review and retrospective',
  icon: 'event',
  lessons: [
    {
      id: 'agile-events',
      title: 'The five events',
      blocks: [
        { type: 'text', value: 'Scrum has five events: the sprint, sprint planning, the daily scrum, the sprint review and the retrospective. Each has a purpose; none is a status meeting for managers.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Sprint         1-4 weeks, a fixed container
Planning       what and how for this sprint
Daily           sync, blockers, plan the day
Review         show the increment, collect feedback
Retro          improve the way the team works` },
        { type: 'note', value: 'If an event has no decision or feedback, it is probably not needed in that form.' },
      ],
    },
    {
      id: 'agile-planning-review',
      title: 'Planning and review',
      blocks: [
        { type: 'text', value: 'Planning selects the backlog items for the sprint and agrees a goal. The review shows the finished increment to stakeholders and collects feedback for the next backlog.' },
        { type: 'list', items: [
          'A sprint goal, not only a task list',
          'Pull only what the team can finish',
          'Review shows working software',
          'Feedback becomes backlog items',
          'Do not turn review into a demo for praise',
        ] },
        { type: 'note', value: 'A sprint without a goal becomes a list of tickets. The goal is what the team commits to.' },
      ],
    },
    {
      id: 'agile-daily-retro',
      title: 'Daily and retrospective',
      blocks: [
        { type: 'text', value: 'The daily is for the team to plan the next day and surface blockers, not to report to a manager. The retrospective is for improving the process: what worked, what did not, and one change.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Daily (15 min):
  What I did, what I will do, blockers

Retro (60 min):
  What went well
  What did not
  One change with an owner` },
        { type: 'note', value: 'A daily that runs 45 minutes is a status meeting in disguise. Keep it short and focused.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'events',
      q: 'How long is a sprint usually?',
      options: ['One day', '1-4 weeks', 'Six months', 'One year'],
      answer: 1,
      explain: 'Sprints are short and fixed.',
    },
    {
      chapterId: 'events',
      q: 'What does sprint planning decide?',
      options: ['The company budget', 'The sprint goal and selected backlog items', 'The salary', 'The office layout'],
      answer: 1,
      explain: 'Planning sets the goal and the items.',
    },
    {
      chapterId: 'events',
      q: 'What is the daily for?',
      options: ['Reporting to managers', 'Team sync and blockers', 'Long design debates', 'Salary talk'],
      answer: 1,
      explain: 'It is a short team sync.',
    },
    {
      chapterId: 'events',
      q: 'What is the retrospective for?',
      options: ['Demoing features', 'Improving how the team works', 'Planning the budget', 'Hiring'],
      answer: 1,
      explain: 'The retro improves the process.',
    },
  ],
};
