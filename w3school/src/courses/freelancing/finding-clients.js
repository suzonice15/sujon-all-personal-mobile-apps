// Freelancing chapter: Finding Clients.

export default {
  id: 'finding-clients',
  title: 'Finding Clients',
  description: 'Proposals, bidding and outreach',
  icon: 'search',
  lessons: [
    {
      id: 'fl-proposals',
      title: 'Writing proposals',
      blocks: [
        { type: 'text', value: 'A proposal is a short, specific answer to a client\'s problem. Read the job post carefully, address the client by name if possible, and show that you understood the task. Generic proposals are ignored.' },
        { type: 'list', items: [
          'Read the whole job post before writing',
          'Open with one sentence showing you understood the task',
          'Mention one relevant past project',
          'Ask one or two clarifying questions',
          'Keep it short: 4-6 sentences',
          'End with a clear next step',
        ] },
        { type: 'note', value: 'Clients read the first two lines. If those do not show understanding, the rest is not read.' },
      ],
    },
    {
      id: 'fl-bidding',
      title: 'Bidding and rates',
      blocks: [
        { type: 'text', value: 'On marketplaces, price matters but not as much as fit. A higher bid from a specialist with a relevant portfolio beats a low bid from a generalist. Do not race to the bottom on price.' },
        { type: 'list', items: [
          'Bid within the client\'s budget range',
          'Explain what is included and what is not',
          'Offer a small, fixed-price first milestone',
          'Avoid bidding on jobs you cannot do well',
          'Raise your rate as your portfolio grows',
        ] },
        { type: 'note', value: 'A client who hires the cheapest option often gets poor work and leaves a bad review. Position yourself as the safe, reliable choice.' },
      ],
    },
    {
      id: 'fl-outreach',
      title: 'Direct outreach',
      blocks: [
        { type: 'text', value: 'Direct outreach means contacting businesses that are not posting jobs. Find a business with a slow website, a missing feature or a clear problem, and offer a specific fix. This has less competition and better rates.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Subject: Quick idea for [Business Name]'s website

Hi [Name],

I noticed your site loads slowly on mobile and the contact form
does not work on Safari. I am a web developer and I can fix both
in a week for a fixed price.

Here is a similar project I did: [link]

Would you be open to a 15-minute call this week?

Best,
[Your name]` },
        { type: 'note', value: 'Personalized outreach with a real observation beats a generic pitch. Send 10 good emails, not 1000 bad ones.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'finding-clients',
      q: 'What makes a proposal stand out?',
      options: ['A long generic template', 'Showing you understood the task in the first two lines', 'The lowest price', 'A list of all your skills'],
      answer: 1,
      explain: 'Clients skim; understanding shows in the first lines.',
    },
    {
      chapterId: 'finding-clients',
      q: 'Should you always bid the lowest price?',
      options: ['Yes, always', 'No, a higher bid from a specialist can win', 'Only on Fiverr', 'Only on Upwork'],
      answer: 1,
      explain: 'Fit and trust beat the lowest price.',
    },
    {
      chapterId: 'finding-clients',
      q: 'What makes direct outreach effective?',
      options: ['Sending 1000 generic emails', 'A specific observation about the client\'s problem', 'Offering a discount', 'Using a template'],
      answer: 1,
      explain: 'A real observation shows you care.',
    },
    {
      chapterId: 'finding-clients',
      q: 'How long should a proposal be?',
      options: ['One sentence', '4-6 sentences', 'Two pages', 'As long as possible'],
      answer: 1,
      explain: 'Short and specific beats long and generic.',
    },
  ],
};
