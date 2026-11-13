// Agile chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Write a backlog and run a retro',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'agile-project-backlog',
      title: 'Project: a sprint backlog',
      blocks: [
        { type: 'text', value: 'Take a small feature, write three user stories with acceptance criteria, estimate them, and plan one sprint with a goal. Then run a short retro on the exercise itself.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Sprint goal: students can resume a course

Story 1: save progress on lesson complete  (3)
Story 2: resume from the dashboard        (5)
Story 3: 401 for anonymous progress API   (2)

Acceptance: reload returns to the last lesson` },
        { type: 'list', items: [
          'One clear sprint goal',
          'Small stories with testable criteria',
          'Estimates agreed by the team',
          'One improvement from the retro',
        ] },
        { type: 'note', value: 'A real backlog exercise with a goal and criteria teaches more than reading the Scrum Guide once.' },
      ],
    },
    {
      id: 'agile-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Agile versus waterfall?',
          'What are the Scrum roles?',
          'What happens in each Scrum event?',
          'How do you write a good user story?',
          'How do you estimate work?',
          'What is velocity and what is it not?',
          'How do you handle mid-sprint changes?',
          'How do you improve a struggling team?',
        ] },
        { type: 'text', value: 'Strong answers show judgement, not jargon. “We protect the sprint goal; urgent work replaces a story instead of adding to the pile” is a complete answer.' },
        { type: 'note', value: 'Be ready to describe one retro action you actually applied and what changed.' },
      ],
    },
    {
      id: 'agile-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: Agile values and the delivery cycle',
          'Week 2: roles and responsibilities',
          'Week 3: Scrum events',
          'Week 4: user stories and acceptance criteria',
          'Week 5: estimation and planning poker',
          'Week 6: velocity, cycle time and flow',
          'Week 7: run one sprint end to end',
          'Week 8: retro and process improvement',
        ] },
        { type: 'note', value: 'Agile is learned by running a real sprint with a real team, not by memorizing terms.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What should every story have?',
      options: ['An estimate only', 'Clear acceptance criteria', 'A screenshot', 'A price'],
      answer: 1,
      explain: 'Criteria make done testable.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you handle urgent mid-sprint work?',
      options: ['Add it on top', 'Replace a story with it', 'Ignore it', 'Cancel the sprint'],
      answer: 1,
      explain: 'Protect the sprint capacity.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a retro action stick?',
      options: ['Many actions', 'One owned, measurable change', 'A longer meeting', 'No owner'],
      answer: 1,
      explain: 'One owned change is applied.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first Agile step?',
      options: ['Buy a tool', 'Write a goal and three small stories', 'Hire a coach', 'Change all meetings'],
      answer: 1,
      explain: 'Start with a real small backlog.',
    },
  ],
};
