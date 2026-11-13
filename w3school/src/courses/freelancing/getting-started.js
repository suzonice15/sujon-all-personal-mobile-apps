// Freelancing chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What freelancing is, platforms and the right mindset',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'fl-what-is',
      title: 'What is freelancing?',
      blocks: [
        { type: 'text', value: 'Freelancing means selling your skills to clients one project at a time, without a full-time employer. You choose the work, set the price and manage the delivery. It rewards skill, communication and reliability more than credentials.' },
        { type: 'list', items: [
          'You are the product: your skills, your communication, your reliability',
          'Clients buy outcomes, not hours',
          'Income is uneven at first; it stabilizes with repeat clients',
          'You are responsible for finding work, doing it and getting paid',
          'The best freelancers are great communicators, not only great coders',
        ] },
        { type: 'note', value: 'Freelancing is a business, not just a job. Treat it like one from day one: track time, money and clients.' },
      ],
    },
    {
      id: 'fl-platforms',
      title: 'Platforms',
      blocks: [
        { type: 'text', value: 'Marketplaces connect you with clients. Each has a different audience, fee structure and style. Start on one platform and master it before spreading out.' },
        { type: 'list', items: [
          'Upwork - large, professional, hourly and fixed-price, higher fees',
          'Fiverr - gig-based, buyer-driven, good for small, defined tasks',
          'Toptal - vetted, high rates, hard to get in',
          'Freelancer.com - bidding, many small jobs',
          'Direct outreach - email, LinkedIn, cold DMs to businesses',
          'Local clients - shops, schools, small businesses in your area',
        ] },
        { type: 'note', value: 'Direct clients pay better and have less competition. Marketplaces are a good place to start and build a portfolio.' },
      ],
    },
    {
      id: 'fl-mindset',
      title: 'The right mindset',
      blocks: [
        { type: 'text', value: 'Clients hire people they trust. Trust comes from clear communication, meeting deadlines and being honest about what you can do. Overpromising and underdelivering is the fastest way to lose a client.' },
        { type: 'list', items: [
          'Reply within 24 hours, even if only to say you are working on it',
          'Never promise a date you cannot meet',
          'Say no to work you cannot do well',
          'Under-promise and over-deliver',
          'Ask questions before you start, not after',
        ] },
        { type: 'note', value: 'A client who trusts you will hire you again and refer you. One bad experience can cost you years of referrals.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What do clients actually buy?',
      options: ['Hours of your time', 'Outcomes and solutions', 'Your degree', 'Your tools'],
      answer: 1,
      explain: 'Clients pay for results, not effort.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which platform is gig-based and buyer-driven?',
      options: ['Upwork', 'Fiverr', 'Toptal', 'LinkedIn'],
      answer: 1,
      explain: 'Fiverr lets buyers purchase predefined gigs.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is the fastest way to lose a client?',
      options: ['Replying within 24 hours', 'Overpromising and underdelivering', 'Asking questions', 'Saying no to bad-fit work'],
      answer: 1,
      explain: 'Broken promises destroy trust.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why start on one platform?',
      options: ['It is cheaper', 'You can master it before spreading out', 'Other platforms are scams', 'It is required'],
      answer: 1,
      explain: 'Focus builds reputation faster.',
    },
  ],
};
