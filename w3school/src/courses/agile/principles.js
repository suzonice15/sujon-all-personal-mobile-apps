// Agile chapter: Principles.

export default {
  id: 'principles',
  title: 'Agile Principles',
  description: 'The four values and the working principles',
  icon: 'rule',
  lessons: [
    {
      id: 'agile-values',
      title: 'The four values',
      blocks: [
        { type: 'list', items: [
          'Individuals and interactions over processes and tools',
          'Working software over comprehensive documentation',
          'Customer collaboration over contract negotiation',
          'Responding to change over following a plan',
        ] },
        { type: 'text', value: 'The right side still has value; the left side is valued more. That nuance matters. Documentation and process are not banned, they are not the goal.' },
        { type: 'note', value: 'A team with great tools and no communication is slower than a small team that talks daily.' },
      ],
    },
    {
      id: 'agile-delivery',
      title: 'Deliver early and often',
      blocks: [
        { type: 'text', value: 'Ship a small usable increment every iteration. Early delivery gives real feedback and reduces the risk of building the wrong thing. Working software is the primary measure of progress.' },
        { type: 'list', items: [
          'Small increments over big releases',
          'A working slice end to end',
          'Feedback from real users',
          'Sustainable pace, not death marches',
          'Simplicity: maximise the work not done',
        ] },
        { type: 'note', value: 'A feature that is 90 percent done delivers zero value. Finish small things.' },
      ],
    },
    {
      id: 'agile-improve',
      title: 'Improve continuously',
      blocks: [
        { type: 'text', value: 'Reflect regularly and change one thing. A team that inspects but never adapts is not improving. Keep improvements small and measurable.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Retro action: "add a 5-minute PR review slot each morning"
Measure: average review time this sprint vs last
Owner: Rahim
Review: next retro` },
        { type: 'note', value: 'One applied improvement per sprint beats ten action items that nobody owns.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'principles',
      q: 'What is valued more than comprehensive documentation?',
      options: ['A plan', 'Working software', 'A contract', 'A tool'],
      answer: 1,
      explain: 'Working software is the primary measure.',
    },
    {
      chapterId: 'principles',
      q: 'Why deliver early?',
      options: ['To look fast', 'To get feedback and reduce risk', 'To avoid testing', 'To skip planning'],
      answer: 1,
      explain: 'Early feedback reduces risk.',
    },
    {
      chapterId: 'principles',
      q: 'What does “maximise the work not done” mean?',
      options: ['Work more hours', 'Build only what is needed', 'Skip tests', 'Avoid users'],
      answer: 1,
      explain: 'Simplicity is a value.',
    },
    {
      chapterId: 'principles',
      q: 'What makes a retro useful?',
      options: ['Many action items', 'One applied, owned improvement', 'A long meeting', 'No follow-up'],
      answer: 1,
      explain: 'Applied change is the point.',
    },
  ],
};
