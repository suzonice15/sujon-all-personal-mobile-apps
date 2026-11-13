// Agile chapter: Roles.

export default {
  id: 'roles',
  title: 'Scrum Roles',
  description: 'Product owner, scrum master and developers',
  icon: 'groups',
  lessons: [
    {
      id: 'agile-roles',
      title: 'The three roles',
      blocks: [
        { type: 'text', value: 'Scrum defines three accountabilities: the product owner owns value and the backlog, the scrum master owns the process, and the developers build the increment. The team is cross-functional and self-managing.' },
        { type: 'list', items: [
          'Product owner: what and why, backlog order',
          'Scrum master: process, removal of blockers, coaching',
          'Developers: design, build, test and deliver',
          'Stakeholders: feedback, not daily control',
          'One product owner, not a committee',
        ] },
        { type: 'note', value: 'A scrum master is not a project manager with a new title. The role is coaching and removing blockers, not assigning tasks.' },
      ],
    },
    {
      id: 'agile-po',
      title: 'The product owner',
      blocks: [
        { type: 'text', value: 'The product owner decides what is most valuable and keeps the backlog ordered. They talk to users and stakeholders, say no to low-value work, and accept or reject the increment.' },
        { type: 'list', items: [
          'Owns the backlog order',
          'Clarifies the why for each item',
          'Accepts or rejects the increment',
          'Protects the team from mid-sprint changes',
          'Measures outcomes, not only output',
        ] },
        { type: 'note', value: 'A product owner who only writes tickets is a backlog clerk. The job is decisions about value.' },
      ],
    },
    {
      id: 'agile-team',
      title: 'A healthy team',
      blocks: [
        { type: 'list', items: [
          'Cross-functional: the team can deliver end to end',
          'Self-managing: decides how to do the work',
          'Small: usually 3 to 9 people',
          'Stable: members stay together',
          'Psychological safety: people can admit mistakes',
          'Shared definition of done',
        ] },
        { type: 'text', value: 'A team that cannot say “we do not know” will hide problems until they are expensive.' },
        { type: 'note', value: 'Stability beats constant reshuffling. A team needs time to learn how to work together.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'roles',
      q: 'Who owns the backlog order?',
      options: ['Scrum master', 'Product owner', 'Stakeholders', 'Developers'],
      answer: 1,
      explain: 'The product owner orders the backlog by value.',
    },
    {
      chapterId: 'roles',
      q: 'What is the scrum master for?',
      options: ['Assigning tasks', 'Coaching the process and removing blockers', 'Writing code only', 'Approving leave'],
      answer: 1,
      explain: 'The role is process and coaching.',
    },
    {
      chapterId: 'roles',
      q: 'How large is a Scrum team usually?',
      options: ['1-2', '3-9', '20-50', 'Any size'],
      answer: 1,
      explain: 'Small teams communicate better.',
    },
    {
      chapterId: 'roles',
      q: 'Why is psychological safety important?',
      options: ['For comfort', 'So problems are raised early', 'To avoid work', 'To reduce salary'],
      answer: 1,
      explain: 'Hidden problems become expensive.',
    },
  ],
};
