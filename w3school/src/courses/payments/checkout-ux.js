// Payments chapter: Checkout UX & Security.

export default {
  id: 'checkout-ux',
  title: 'Checkout UX',
  description: 'Friction, trust and secure card forms',
  icon: 'shopping-cart',
  lessons: [
    {
      id: 'pay-checkout-flow',
      title: 'The checkout flow',
      blocks: [
        { type: 'text', value: 'A good checkout is short and predictable: show the total, collect the minimum information, confirm, then show a clear result. Every extra step loses customers.' },
        { type: 'list', items: [
          'Show the full price including fees before payment',
          'Support guest checkout',
          'Keep the cart summary visible',
          'Show a loading state while paying',
          'Never submit twice on double tap',
          'Show a clear success or failure page',
        ] },
        { type: 'note', value: 'Most abandoned carts are caused by surprise costs and a long form, not by the payment provider.' },
      ],
    },
    {
      id: 'pay-card-form',
      title: 'Card form security',
      blocks: [
        { type: 'text', value: 'Use the provider’s hosted fields or a redirect. The card number goes from the browser to the provider, never to your server. Your server receives a token or a payment id.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Browser -> provider (card data)
Provider -> your server (token / intent id)
Your server -> provider (charge, with secret key)
Provider -> your server (webhook confirmation)` },
        { type: 'note', value: 'If you handle card numbers directly, you take on PCI DSS scope. Use hosted fields to avoid it.' },
      ],
    },
    {
      id: 'pay-trust',
      title: 'Trust signals',
      blocks: [
        { type: 'list', items: [
          'Show the merchant name and logo',
          'Use HTTPS everywhere',
          'Display the amount and currency clearly',
          'Show accepted payment methods',
          'Provide a real support contact',
          'Do not hide fees until the last step',
        ] },
        { type: 'text', value: 'Trust is part of conversion. A clear refund policy and a visible support link reduce hesitation before payment.' },
        { type: 'note', value: 'A payment page that looks different from the rest of the site feels like a scam. Keep the design consistent.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'checkout-ux',
      q: 'What causes most abandoned carts?',
      options: ['Too few fields', 'Surprise costs and a long form', 'Fast loading', 'Clear totals'],
      answer: 1,
      explain: 'Unexpected cost and friction lose buyers.',
    },
    {
      chapterId: 'checkout-ux',
      q: 'Where should card data go?',
      options: ['Your server', 'Directly to the provider', 'The database', 'A cookie'],
      answer: 1,
      explain: 'Hosted fields keep card data off your server.',
    },
    {
      chapterId: 'checkout-ux',
      q: 'Why support guest checkout?',
      options: ['To collect emails', 'To remove the account barrier', 'To increase fees', 'To skip verification'],
      answer: 1,
      explain: 'Forcing an account loses buyers.',
    },
    {
      chapterId: 'checkout-ux',
      q: 'What does PCI DSS apply to?',
      options: ['Every website', 'Systems that handle card data', 'Only banks', 'Only mobile apps'],
      answer: 1,
      explain: 'Handling card data brings compliance scope.',
    },
  ],
};
