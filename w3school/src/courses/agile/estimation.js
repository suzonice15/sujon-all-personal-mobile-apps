// Agile chapter: Estimation.

export default {
  id: 'estimation',
  title: 'Estimation',
  description: 'Story points, planning poker and uncertainty',
  icon: 'calculate',
  lessons: [
    {
      id: 'agile-points',
      title: 'Story points',
      blocks: [
        { type: 'text', value: 'Story points estimate relative size: effort, complexity and uncertainty together. They are not hours. A team’s points are only comparable to itself.' },
        { type: 'code', lang: 'text', tryIt: false, value: `1  tiny, well understood
2  small
3  small with a question
5  medium
8  large or uncertain
13 too big; split it` },
        { type: 'note', value: 'Points measure size, not productivity. Comparing velocity between teams is meaningless.' },
      ],
    },
    {
      id: 'agile-poker',
      title: 'Planning poker',
      blocks: [
        { type: 'text', value: 'Everyone estimates privately, then reveals at once. The highest and lowest explain their reasoning. The goal is shared understanding, not the average.' },
        { type: 'list', items: [
          'Reveal together to avoid anchoring',
          'Discuss the outliers',
          'Re-estimate after discussion',
          'Split anything above the team’s max',
          'Do not average away a real concern',
        ] },
        { type: 'note', value: 'A wide spread means the story is unclear. Clarify it before estimating again.' },
      ],
    },
    {
      id: 'agile-uncertainty',
      title: 'Uncertainty',
      blocks: [
        { type: 'text', value: 'New work is uncertain. Use a spike to learn, or a range instead of a single number. Do not pretend certainty you do not have.' },
        { type: 'list', items: [
          'Spike: a short investigation with a clear question',
          'Range: 3-5 points rather than 4',
          'Split unknown work',
          'Track actuals to calibrate',
          'Revisit estimates when facts change',
        ] },
        { type: 'note', value: 'An estimate is a forecast, not a promise. Teams that treat it as a promise stop estimating honestly.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'estimation',
      q: 'What do story points measure?',
      options: ['Hours', 'Relative size and uncertainty', 'Lines of code', 'Salary'],
      answer: 1,
      explain: 'Points are relative, not time.',
    },
    {
      chapterId: 'estimation',
      q: 'Why reveal estimates together?',
      options: ['For speed', 'To avoid anchoring on the first number', 'To hide opinions', 'To skip discussion'],
      answer: 1,
      explain: 'Simultaneous reveal reduces bias.',
    },
    {
      chapterId: 'estimation',
      q: 'What does a wide spread mean?',
      options: ['The team is bad', 'The story is unclear', 'The story is small', 'Nothing'],
      answer: 1,
      explain: 'Clarify before estimating.',
    },
    {
      chapterId: 'estimation',
      q: 'What is a spike?',
      options: ['A bug', 'A short investigation to reduce uncertainty', 'A release', 'A meeting'],
      answer: 1,
      explain: 'A spike answers a question.',
    },
  ],
};
