// Freelancing chapter: Scaling.

export default {
  id: 'scaling',
  title: 'Scaling',
  description: 'From solo freelancer to agency and passive income',
  icon: 'trending-up',
  lessons: [
    {
      id: 'fl-raising-rates',
      title: 'Raising your rates',
      blocks: [
        { type: 'text', value: 'Raise your rate when you are fully booked, when you have strong testimonials, or when you add a new skill. Raise it for new clients first; existing clients can be grandfathered or moved to the new rate at renewal.' },
        { type: 'list', items: [
          'Raise when demand exceeds your capacity',
          'Raise for new clients first',
          'Give existing clients notice before a rate change',
          'Justify the increase with new skills or results',
          'Do not apologize for your price',
        ] },
        { type: 'note', value: 'A 20 percent rate increase on a fully booked schedule can mean less work for more money. That is the goal.' },
      ],
    },
    {
      id: 'fl-subcontracting',
      title: 'Subcontracting and agencies',
      blocks: [
        { type: 'text', value: 'When demand exceeds your time, subcontract to other freelancers. You become the project manager and quality checker. This turns your solo practice into an agency.' },
        { type: 'list', items: [
          'Start with one trusted subcontractor',
          'Keep the client relationship yourself',
          'Review all work before delivery',
          'Pay subcontractors on time and fairly',
          'Document processes so others can follow them',
        ] },
        { type: 'note', value: 'Subcontracting multiplies your capacity but adds management work. Only do it when you are consistently turning away work.' },
      ],
    },
    {
      id: 'fl-passive',
      title: 'Passive income',
      blocks: [
        { type: 'text', value: 'Passive income comes from work you do once and sell many times: courses, templates, plugins, e-books. It is not truly passive at first, but it decouples income from hours.' },
        { type: 'list', items: [
          'Courses on Udemy, Skillshare or your own site',
          'Templates and themes on marketplaces',
          'Plugins and extensions',
          'E-books and guides',
          'YouTube tutorials with ad revenue',
        ] },
        { type: 'note', value: 'Passive income takes months to build and years to mature. Start it alongside client work, not instead of it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'scaling',
      q: 'When should you raise your rate?',
      options: ['When you are fully booked or have new skills', 'Every week', 'Never', 'When a client complains'],
      answer: 0,
      explain: 'Raise when demand exceeds capacity or skills grow.',
    },
    {
      chapterId: 'scaling',
      q: 'What does subcontracting let you do?',
      options: ['Work less for less money', 'Take on more work than you can do alone', ' Fire your clients', ' Remove the need for contracts'],
      answer: 1,
      explain: 'Subcontracting multiplies capacity.',
    },
    {
      chapterId: 'scaling',
      q: 'What is passive income?',
      options: ['Income from one client', 'Income from work done once and sold many times', 'Income from a full-time job', 'Income from loans'],
      answer: 1,
      explain: 'Passive income decouples earnings from hours.',
    },
    {
      chapterId: 'scaling',
      q: 'How should you start passive income?',
      options: ['Quit client work', 'Build it alongside client work', 'Wait until retirement', 'Only with a large team'],
      answer: 1,
      explain: 'Start small alongside your main work.',
    },
  ],
};
