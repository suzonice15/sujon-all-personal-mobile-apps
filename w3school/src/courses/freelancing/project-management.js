// Freelancing chapter: Project Management.

export default {
  id: 'project-management',
  title: 'Project Management',
  description: 'Scoping, milestones and delivery',
  icon: 'assignment',
  lessons: [
    {
      id: 'fl-scoping',
      title: 'Scoping a project',
      blocks: [
        { type: 'text', value: 'Scoping means defining exactly what you will build before you start. A clear scope prevents disputes and keeps the project profitable. Write it down and get the client to agree.' },
        { type: 'list', items: [
          'What pages or features are included',
          'What is explicitly not included',
          'What content the client must provide',
          'Browser and device support',
          'Third-party integrations',
          'Hosting and domain responsibilities',
        ] },
        { type: 'note', value: 'A scope that fits on one page is clear. If it takes three pages, the project is too big or too vague.' },
      ],
    },
    {
      id: 'fl-milestones',
      title: 'Milestones and delivery',
      blocks: [
        { type: 'text', value: 'Break the project into milestones with a deliverable and a payment for each. This keeps the client engaged and gives you regular income. Never deliver everything at the end.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Milestone 1: Design mockup (paid 30%)
Milestone 2: Frontend build (paid 30%)
Milestone 3: Backend and integration (paid 25%)
Milestone 4: Launch and handover (paid 15%)` },
        { type: 'list', items: [
          'Each milestone has a clear, testable deliverable',
          'Get client approval before moving to the next milestone',
          'Keep the client involved with weekly demos',
          'Deliver early and often, not once at the end',
        ] },
        { type: 'note', value: 'A client who sees progress weekly is a happy client. A client who sees nothing for a month is an anxious one.' },
      ],
    },
    {
      id: 'fl-tools',
      title: 'Tools',
      blocks: [
        { type: 'text', value: 'Use simple tools. A shared document for scope, a task board for progress and a chat channel for questions. Avoid heavy tools that the client will not use.' },
        { type: 'list', items: [
          'Scope and contract: Google Docs or Notion',
          'Tasks: Trello, Asana or a simple checklist',
          'Communication: email plus one chat channel',
          'Files: Google Drive or a shared folder',
          'Time tracking: Toggl or Clockify for hourly work',
        ] },
        { type: 'note', value: 'The tool does not matter. Consistent use does. Pick what the client will actually open.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'project-management',
      q: 'What is scoping?',
      options: ['Writing code', 'Defining exactly what will be built before starting', 'Testing', 'Deploying'],
      answer: 1,
      explain: 'Scoping defines the deliverables upfront.',
    },
    {
      chapterId: 'project-management',
      q: 'Why use milestones?',
      options: ['To make the project longer', 'To get regular approval and payment', 'To avoid writing a contract', ' To skip testing'],
      answer: 1,
      explain: 'Milestones keep both sides engaged.',
    },
    {
      chapterId: 'project-management',
      q: 'What should a scope document include?',
      options: ['Only the price', 'Features, exclusions, content responsibilities and support', 'Your resume', 'A portfolio link'],
      answer: 1,
      explain: 'A scope lists what is in and what is out.',
    },
    {
      chapterId: 'project-management',
      q: 'How should you deliver a project?',
      options: ['All at once at the end', 'Early and often with weekly demos', 'Only when paid in full', 'Through email only'],
      answer: 1,
      explain: 'Regular delivery keeps clients happy.',
    },
  ],
};
