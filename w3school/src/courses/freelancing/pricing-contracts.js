// Freelancing chapter: Pricing & Contracts.

export default {
  id: 'pricing-contracts',
  title: 'Pricing & Contracts',
  description: 'Rates, contracts and invoices',
  icon: 'attach-money',
  lessons: [
    {
      id: 'fl-pricing',
      title: 'How to price your work',
      blocks: [
        { type: 'text', value: 'Price by value, not by hours, when you can. A fixed price for a defined outcome is easier for the client to accept and rewards you for being fast. Hourly is safer when the scope is unclear.' },
        { type: 'list', items: [
          'Fixed price: best when the scope is clear',
          'Hourly: best when the scope is unclear or changing',
          'Value-based: price by the value delivered, not the time spent',
          'Start with a rate you can defend, then raise it',
          'Never work for free except for a real portfolio piece',
        ] },
        { type: 'note', value: 'Your rate should cover your costs, your time and a margin for the months with no work. Charge more than you think; you can always discount.' },
      ],
    },
    {
      id: 'fl-contracts',
      title: 'Contracts',
      blocks: [
        { type: 'text', value: 'A contract protects both sides. It states what you will deliver, when, for how much and what happens if things change. Even a short written agreement prevents most disputes.' },
        { type: 'list', items: [
          'Scope: exactly what is included',
          'Deliverables and milestones',
          'Timeline and deadlines',
          'Payment terms: amount, schedule, method',
          'Revision policy: how many rounds are included',
          'Change requests: how extra work is billed',
          'Ownership: who owns the code and assets',
        ] },
        { type: 'note', value: 'A contract is not about distrust. It is about making sure both sides agree before work starts.' },
      ],
    },
    {
      id: 'fl-invoices',
      title: 'Invoices and payments',
      blocks: [
        { type: 'text', value: 'Invoice clearly and on time. State the work done, the amount, the payment method and the due date. Ask for a deposit before starting, and use milestones for larger projects.' },
        { type: 'list', items: [
          'Ask for 30-50 percent upfront for new clients',
          'Use milestones for projects over a few weeks',
          'Invoice on completion of each milestone',
          'Keep records of every payment and expense',
          'Use a simple tool: Wave, Stripe, or a spreadsheet',
        ] },
        { type: 'note', value: 'A deposit filters out non-serious clients and protects you if the project is cancelled.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'pricing-contracts',
      q: 'When is fixed price better than hourly?',
      options: ['When the scope is unclear', 'When the scope is clear and defined', 'Always', 'Never'],
      answer: 1,
      explain: 'Fixed price works when the deliverables are clear.',
    },
    {
      chapterId: 'pricing-contracts',
      q: 'Why ask for a deposit?',
      options: ['To make the client angry', 'To filter non-serious clients and protect your time', ' It is illegal not to', 'To skip the contract'],
      answer: 1,
      explain: 'A deposit shows commitment on both sides.',
    },
    {
      chapterId: 'pricing-contracts',
      q: 'What should a contract include?',
      options: ['Only the price', 'Scope, deliverables, timeline, payment and revisions', 'Your resume', 'A portfolio link'],
      answer: 1,
      explain: 'A contract defines the full agreement.',
    },
    {
      chapterId: 'pricing-contracts',
      q: 'What is value-based pricing?',
      options: ['Charging by the hour', 'Pricing by the value delivered, not the time spent', 'Always charging the lowest price', 'Charging by lines of code'],
      answer: 1,
      explain: 'Value-based pricing ties price to the client\'s outcome.',
    },
  ],
};
