// Agile chapter: Backlog & Stories.

export default {
  id: 'backlog',
  title: 'Backlog & Stories',
  description: 'User stories, acceptance criteria and slicing',
  icon: 'view-list',
  lessons: [
    {
      id: 'agile-user-story',
      title: 'User stories',
      blocks: [
        { type: 'text', value: 'A user story describes a need from the user’s point of view: as a role, I want something, so that I get a benefit. It is a placeholder for a conversation, not a full spec.' },
        { type: 'code', lang: 'text', tryIt: false, value: `As a student,
I want to resume a course where I stopped,
so that I do not lose my place.` },
        { type: 'note', value: 'If the “so that” is missing, the item may be a task, not a user need. That is a useful filter.' },
      ],
    },
    {
      id: 'agile-acceptance',
      title: 'Acceptance criteria',
      blocks: [
        { type: 'text', value: 'Acceptance criteria define when a story is done and testable. Write them as clear, observable conditions. They become the tests and the review checklist.' },
        { type: 'code', lang: 'text', tryIt: false, value: `- Progress is saved when a lesson is completed
- Reload returns to the last lesson
- A logged-out user sees the login screen
- The API returns 401 for an anonymous request` },
        { type: 'note', value: '“Works well” is not a criterion. A reviewer cannot check it and a test cannot assert it.' },
      ],
    },
    {
      id: 'agile-slicing',
      title: 'Slicing work',
      blocks: [
        { type: 'text', value: 'Break big items into thin vertical slices that deliver value end to end. Do not split by technical layer; a slice should be demoable.' },
        { type: 'list', items: [
          'Vertical slice: UI, API and data for one case',
          'Keep slices small enough for a few days',
          'Every slice should be demoable',
          'Avoid “backend done, frontend later” as a slice',
          'Split by scenario, not by layer',
        ] },
        { type: 'note', value: 'A slice you can show to a user is easier to validate than a layer nobody can see.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'backlog',
      q: 'What shape does a user story have?',
      options: ['A bug report', 'As a role, I want X, so that Y', 'A task list', 'A database schema'],
      answer: 1,
      explain: 'It states role, need and benefit.',
    },
    {
      chapterId: 'backlog',
      q: 'What are acceptance criteria for?',
      options: ['Styling', 'Defining when a story is done and testable', 'Hiring', 'Budgeting'],
      answer: 1,
      explain: 'They make done observable.',
    },
    {
      chapterId: 'backlog',
      q: 'What is a vertical slice?',
      options: ['Only the backend', 'A thin end-to-end piece of value', 'Only the UI', 'A database table'],
      answer: 1,
      explain: 'It delivers value end to end.',
    },
    {
      chapterId: 'backlog',
      q: 'Why avoid splitting by layer?',
      options: ['It is slower to type', 'No slice is demoable until every layer is done', 'It is illegal', 'It uses more RAM'],
      answer: 1,
      explain: 'Layer slices delay feedback.',
    },
  ],
};
