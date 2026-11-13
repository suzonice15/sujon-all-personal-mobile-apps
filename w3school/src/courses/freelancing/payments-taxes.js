// Freelancing chapter: Payments & Taxes.

export default {
  id: 'payments-taxes',
  title: 'Payments & Taxes',
  description: 'Getting paid, payment methods and taxes',
  icon: 'account-balance',
  lessons: [
    {
      id: 'fl-payment-methods',
      title: 'Payment methods',
      blocks: [
        { type: 'text', value: 'Getting paid across borders needs a reliable method. Each has fees, speed and availability. Choose one or two and stick with them.' },
        { type: 'list', items: [
          'PayPal - widely accepted, higher fees, easy to set up',
          'Stripe - low fees, developer-friendly, needs a business entity in some countries',
          'Wise - low fees, good exchange rates, bank transfer',
          'Payoneer - popular in South Asia, connects to local banks',
          'Bank wire - slow, high fees, good for large amounts',
          'Crypto - fast, volatile, not accepted by all clients',
        ] },
        { type: 'note', value: 'Check which methods your clients can use before you agree on terms. A client who cannot pay you is not a client.' },
      ],
    },
    {
      id: 'fl-taxes',
      title: 'Taxes and records',
      blocks: [
        { type: 'text', value: 'Freelance income is taxable in most countries. Keep records of every payment and expense. Set aside a portion of each payment for tax so you are not surprised at the end of the year.' },
        { type: 'list', items: [
          'Track every payment and expense in a spreadsheet',
          'Set aside 20-30 percent of income for tax',
          'Register as a freelancer or sole proprietor if required',
          'Invoice with your tax ID when clients need it',
          'Consult a local accountant once income grows',
        ] },
        { type: 'note', value: 'Tax rules vary by country. This is general guidance; check the rules where you live.' },
      ],
    },
    {
      id: 'fl-expenses',
      title: 'Managing money',
      blocks: [
        { type: 'text', value: 'Separate personal and business money. A separate account makes taxes, expenses and profit clear. Pay yourself a salary and keep a buffer for slow months.' },
        { type: 'list', items: [
          'Open a separate bank account for freelance income',
          'Pay yourself a fixed monthly amount',
          'Keep 3-6 months of expenses as a buffer',
          'Track recurring costs: hosting, tools, subscriptions',
          'Review finances monthly',
        ] },
        { type: 'note', value: 'A buffer of 3-6 months of expenses lets you say no to bad clients and take time to find good ones.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'payments-taxes',
      q: 'Which payment method has low fees and good exchange rates?',
      options: ['PayPal', 'Wise', 'Bank wire', 'Crypto'],
      answer: 1,
      explain: 'Wise offers low fees and fair exchange rates.',
    },
    {
      chapterId: 'payments-taxes',
      q: 'How much of freelance income should you set aside for tax?',
      options: ['Nothing', '5 percent', '20-30 percent', 'All of it'],
      answer: 2,
      explain: 'Setting aside 20-30 percent avoids a year-end surprise.',
    },
    {
      chapterId: 'payments-taxes',
      q: 'Why separate personal and business money?',
      options: ['It is required by law everywhere', 'It makes taxes, expenses and profit clear', 'It earns more interest', 'It removes the need for records'],
      answer: 1,
      explain: 'Separation keeps finances clear.',
    },
    {
      chapterId: 'payments-taxes',
      q: 'How large should your financial buffer be?',
      options: ['One week', '3-6 months of expenses', 'One year', 'Nothing'],
      answer: 1,
      explain: 'A 3-6 month buffer lets you be selective about clients.',
    },
  ],
};
