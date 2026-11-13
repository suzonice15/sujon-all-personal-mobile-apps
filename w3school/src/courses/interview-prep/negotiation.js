// Interview Prep chapter: Salary Negotiation.

export default {
  id: 'negotiation',
  title: 'Salary & Offer',
  description: 'Research, ask and decide without fear',
  icon: 'attach-money',
  lessons: [
    {
      id: 'ip-research',
      title: 'Research the range',
      blocks: [
        { type: 'text', value: 'Know the market range for the role, level and city before the first call. Use salary surveys, local job posts and peers. Have a target, a walk-away number and a range.' },
        { type: 'list', items: [
          'Target: what you want',
          'Walk-away: the lowest you will accept',
          'Range: target to target plus 15 percent',
          'Total compensation: base, bonus, equity, benefits',
          'Local cost of living and taxes',
        ] },
        { type: 'note', value: 'A number without research is a guess. Two hours of research can change an offer by a month of salary.' },
      ],
    },
    {
      id: 'ip-negotiate',
      title: 'Negotiating',
      blocks: [
        { type: 'text', value: 'Negotiate after an offer, not before. Be polite, specific and appreciative. Ask for the range and the level first, then state your number with a reason.' },
        { type: 'code', lang: 'text', tryIt: false, value: `"Thank you, I am excited about the role.

Based on the scope and my experience with payments,
I was expecting a base around X. Is there flexibility
on the base or the level?"` },
        { type: 'list', items: [
          'Negotiate the whole package, not only base',
          'Ask for the level if the base is capped',
          'Get the offer in writing',
          'Do not bluff another offer',
          'Be ready to accept or decline clearly',
        ] },
        { type: 'note', value: 'A company that withdraws an offer for a polite negotiation was not a safe place to work.' },
      ],
    },
    {
      id: 'ip-decide',
      title: 'Deciding',
      blocks: [
        { type: 'text', value: 'Compare offers on total compensation, growth, manager, stability and commute or remote policy. Money matters, but a bad manager costs more than a small salary gap.' },
        { type: 'list', items: [
          'Total compensation, not base alone',
          'Learning and promotion path',
          'Manager and team quality',
          'Stability and funding',
          'Remote, hours and leave',
        ] },
        { type: 'note', value: 'Ask for a day to decide. A rushed decision is rarely a good one.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'negotiation',
      q: 'When should you negotiate?',
      options: ['Before applying', 'After an offer', 'During the coding test', 'Never'],
      answer: 1,
      explain: 'Negotiate once there is an offer.',
    },
    {
      chapterId: 'negotiation',
      q: 'What is a walk-away number?',
      options: ['The first offer', 'The lowest salary you will accept', 'The highest salary', 'The bonus'],
      answer: 1,
      explain: 'It is your minimum.',
    },
    {
      chapterId: 'negotiation',
      q: 'What should you compare?',
      options: ['Only base', 'Total compensation and growth', 'The logo', 'The office chair'],
      answer: 1,
      explain: 'Consider the whole package.',
    },
    {
      chapterId: 'negotiation',
      q: 'Why get the offer in writing?',
      options: ['For decoration', 'To confirm the terms before resigning', 'To share online', 'To pay tax'],
      answer: 1,
      explain: 'Written terms prevent surprises.',
    },
  ],
};
