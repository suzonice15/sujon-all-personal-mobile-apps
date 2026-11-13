// Payments chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a checkout with Stripe and bKash',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'pay-project-checkout',
      title: 'Project: a checkout',
      blocks: [
        { type: 'text', value: 'Build a checkout with a cart, a Stripe Checkout session, a verified webhook and an order status page. Then add a bKash sandbox flow and a refund endpoint. This is a complete, portfolio-ready payments slice.' },
        { type: 'code', lang: 'text', tryIt: false, value: `POST /api/checkout        create session, return url
POST /webhooks/stripe     verify signature, mark paid
GET  /orders/:id          show status
POST /api/refunds         refund with an admin check
GET  /api/health          health endpoint` },
        { type: 'list', items: [
          'Price from the server, never the client',
          'Idempotency key on create and refund',
          'Webhook signature verification',
          'Order status driven by verified events',
          'A clear success and failure page',
        ] },
        { type: 'note', value: 'A checkout that handles failure, retries and refunds is more impressive than one that only handles the happy path.' },
      ],
    },
    {
      id: 'pay-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'How does a card payment work end to end?',
          'Why are webhooks the source of truth?',
          'How do you verify a webhook?',
          'How do you make payment handling idempotent?',
          'Where should the amount be calculated?',
          'How do subscriptions and dunning work?',
          'How do you handle refunds and disputes?',
          'How do you reduce fraud?',
        ] },
        { type: 'text', value: 'Strong answers connect the step to a failure mode. "The webhook is verified with the raw body and the signing secret, so a forged request cannot mark an order paid" is a complete answer.' },
        { type: 'note', value: 'Be ready to draw the flow from checkout to webhook to order status on a whiteboard.' },
      ],
    },
    {
      id: 'pay-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: payment concepts and provider choice',
          'Week 2: Stripe PaymentIntents and Checkout',
          'Week 3: webhooks and idempotency',
          'Week 4: bKash and SSLCommerz sandbox',
          'Week 5: PayPal orders and capture',
          'Week 6: checkout UX and security',
          'Week 7: subscriptions and dunning',
          'Week 8: refunds, disputes and fraud checks',
        ] },
        { type: 'note', value: 'Use sandbox mode for every provider until the final small live test. A live key in development is a real charge.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Where should the price be calculated?',
      options: ['In the client', 'On the server from the cart or product', 'In the URL', 'In a cookie'],
      answer: 1,
      explain: 'Never trust a client amount.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What confirms a payment?',
      options: ['The redirect', 'A verified webhook or provider query', 'A client flag', 'An email'],
      answer: 1,
      explain: 'Verify with the provider.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a payments project convincing?',
      options: ['Only the happy path', 'A checkout with webhooks, failures and refunds', 'A copied tutorial', 'No validation'],
      answer: 1,
      explain: 'Handling failure shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first payments step?',
      options: ['Live keys', 'One small sandbox checkout with a webhook', 'Subscriptions', 'Fraud rules'],
      answer: 1,
      explain: 'Start small in sandbox.',
    },
  ],
};
