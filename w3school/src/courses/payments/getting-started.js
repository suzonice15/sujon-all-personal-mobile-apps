// Payments chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'How online payments work and what to choose',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'pay-how-it-works',
      title: 'How a payment works',
      blocks: [
        { type: 'text', value: 'A payment moves money from the customer to your account through a provider. The provider handles card networks, security, settlement and often tax. Your app creates the payment, shows a checkout, and receives a confirmation.' },
        { type: 'list', items: [
          'Customer: pays with a card, wallet or local method',
          'Provider: Stripe, bKash, SSLCommerz, PayPal',
          'Your server: creates the payment and verifies it',
          'Webhook: the provider tells you the final status',
          'Settlement: money arrives in your bank after fees',
        ] },
        { type: 'note', value: 'Never mark an order paid from the browser alone. The server must verify the payment with the provider or a webhook.' },
      ],
    },
    {
      id: 'pay-choose',
      title: 'Choosing a provider',
      blocks: [
        { type: 'text', value: 'Pick a provider your customers can actually use. Global customers expect cards and PayPal. Bangladesh customers often need bKash, Nagad or SSLCommerz. Fees, settlement time and support matter as much as the API.' },
        { type: 'list', items: [
          'Stripe: cards, wallets, subscriptions, strong docs',
          'bKash: mobile wallet, widely used in Bangladesh',
          'SSLCommerz: aggregator with local methods',
          'PayPal: global, buyer protection',
          'Check fees, settlement time and refund rules',
        ] },
        { type: 'note', value: 'Supporting two providers is common: a global one and a local one. Keep the checkout logic provider-agnostic.' },
      ],
    },
    {
      id: 'pay-security',
      title: 'Security rules',
      blocks: [
        { type: 'text', value: 'Never store raw card numbers. Use hosted fields, redirects or tokens so the provider handles sensitive data. Keep secret keys on the server, verify webhooks and use idempotency keys.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Client  -> public key / client secret (short-lived)
Server  -> secret key (never in the app)
Webhook -> verified signature (never trust the body alone)` },
        { type: 'list', items: [
          'No card data in your database',
          'Secret keys only on the server',
          'Verify webhook signatures',
          'Use idempotency keys for retries',
          'Log payment events without sensitive data',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'When is an order considered paid?',
      options: ['When the browser shows success', 'After the server verifies with the provider or a webhook', 'When the user clicks pay', 'When the cart is empty'],
      answer: 1,
      explain: 'The server must verify the payment.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which provider is common for Bangladesh mobile wallets?',
      options: ['Stripe', 'bKash', 'PayPal', 'Square'],
      answer: 1,
      explain: 'bKash is a widely used local wallet.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why use hosted fields or a redirect?',
      options: ['It is faster', 'So card data never touches your server', 'To avoid fees', 'To skip webhooks'],
      answer: 1,
      explain: 'The provider handles sensitive card data.',
    },
    {
      chapterId: 'getting-started',
      q: 'Where should the secret key live?',
      options: ['In the mobile app', 'On the server', 'In the HTML', 'In Git'],
      answer: 1,
      explain: 'Secret keys must stay server-side.',
    },
  ],
};
