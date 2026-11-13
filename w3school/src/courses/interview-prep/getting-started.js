// Interview Prep chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'The process, the timeline and what companies test',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'ip-process',
      title: 'The interview process',
      blocks: [
        { type: 'text', value: 'A typical process has an application screen, a recruiter call, one or two technical rounds, a system design or take-home, and a final team round. Each stage tests something different.' },
        { type: 'list', items: [
          'Screen: does the resume match the role',
          'Recruiter call: motivation, salary range, timeline',
          'Technical: coding and problem solving',
          'Design: structure and trade-offs',
          'Team round: communication and collaboration',
        ] },
        { type: 'note', value: 'Prepare for the stage you are in. A great coding round does not fix a resume that never reaches it.' },
      ],
    },
    {
      id: 'ip-timeline',
      title: 'A realistic timeline',
      blocks: [
        { type: 'text', value: 'Give yourself four to eight weeks. Apply in parallel, keep a tracker, and practise out loud. Interviews are a skill separate from the job.' },
        { type: 'list', items: [
          'Week 1-2: resume and portfolio',
          'Week 3-4: behavioural stories',
          'Week 5-6: coding practice and one project deep dive',
          'Week 7-8: mock interviews and applications',
          'Keep applying while you prepare',
        ] },
        { type: 'note', value: 'Applying early gives feedback. Waiting until you feel ready usually delays the first offer.' },
      ],
    },
    {
      id: 'ip-what-tested',
      title: 'What companies actually test',
      blocks: [
        { type: 'list', items: [
          'Can you write correct, readable code',
          'Can you explain a decision and a trade-off',
          'Can you debug and ask good questions',
          'Can you work with others without friction',
          'Do you understand the role and the product',
        ] },
        { type: 'text', value: 'Most rejections are communication problems, not knowledge gaps. A clear explanation of a simple solution beats a silent complicated one.' },
        { type: 'note', value: 'Practise explaining your own project for ten minutes. That is the most common interview.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does the recruiter call usually cover?',
      options: ['Coding', 'Motivation, salary and timeline', 'System design', 'Testing'],
      answer: 1,
      explain: 'It is a fit and logistics screen.',
    },
    {
      chapterId: 'getting-started',
      q: 'How long should you plan to prepare?',
      options: ['One day', 'Four to eight weeks', 'One year', 'No preparation'],
      answer: 1,
      explain: 'A few weeks of focused practice.',
    },
    {
      chapterId: 'getting-started',
      q: 'What causes most rejections?',
      options: ['Bad luck', 'Communication problems', 'Slow typing', 'The weather'],
      answer: 1,
      explain: 'Explaining clearly matters most.',
    },
    {
      chapterId: 'getting-started',
      q: 'Should you apply while preparing?',
      options: ['No', 'Yes, feedback helps', 'Only after ten projects', 'Only through referrals'],
      answer: 1,
      explain: 'Early applications give real feedback.',
    },
  ],
};
