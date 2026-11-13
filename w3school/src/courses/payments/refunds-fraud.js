// Payments chapter: Refunds & Fraud.

export default {
  id: 'refunds-fraud',
  title: 'Refunds & Fraud',
  description: 'Refund flows, disputes and risk checks',
  icon: 'gpp-bad',
  lessons: [
    {
      id: 'pay-refunds',
      title: 'Refunds',
      blocks: [
        { type: 'text', value: 'A refund returns money to the customer. Partial refunds are common. Record who refunded, why and how much. Update the order status and notify the customer.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const refund = await stripe.refunds.create({
  payment_intent: paymentIntentId,
  amount: 250000,              // partial refund
  reason: 'requested_by_customer',
});

// Store refund.id, amount and the order it belongs to` },
        { type: 'note', value: 'Refunding is not deleting. Keep the original payment record for accounting and disputes.' },
      ],
    },
    {
      id: 'pay-disputes',
      title: 'Disputes and chargebacks',
      blocks: [
        { type: 'text', value: 'A chargeback is a card payment reversed by the bank after a dispute. You can respond with evidence: delivery proof, communication and policy. Win rate depends on records, so keep them.' },
        { type: 'list', items: [
          'Respond before the deadline',
          'Upload delivery and usage evidence',
          'Show the refund policy the customer accepted',
          'Track dispute rate; too many can lose the account',
          'Prevent by clear descriptions and support',
        ] },
        { type: 'note', value: 'A clear descriptor on the card statement prevents many “I did not buy this” disputes.' },
      ],
    },
    {
      id: 'pay-fraud',
      title: 'Fraud checks',
      blocks: [
        { type: 'text', value: 'Fraud costs more than the refund. Use provider risk tools, 3D Secure for high-risk regions, velocity limits and manual review for large orders. Do not block legitimate customers with clumsy rules.' },
        { type: 'list', items: [
          'Enable the provider radar or risk rules',
          'Require 3D Secure where supported',
          'Limit attempts per card and per IP',
          'Review unusually large or fast orders',
          'Verify high-value orders by phone or email',
          'Never store card data to “check later”',
        ] },
        { type: 'note', value: 'A declined fraud attempt is cheaper than a chargeback. Add friction at the risk point, not for everyone.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'refunds-fraud',
      q: 'What must you keep after a refund?',
      options: ['Nothing', 'The original payment record and refund details', 'The card number', 'The customer PIN'],
      answer: 1,
      explain: 'Records are needed for accounting and disputes.',
    },
    {
      chapterId: 'refunds-fraud',
      q: 'What is a chargeback?',
      options: ['A discount', 'A payment reversed by the bank after a dispute', 'A refund you issue', 'A subscription'],
      answer: 1,
      explain: 'The bank reverses the payment.',
    },
    {
      chapterId: 'refunds-fraud',
      q: 'What helps win a dispute?',
      options: ['A guess', 'Delivery proof, communication and policy records', 'A lower price', 'A new website'],
      answer: 1,
      explain: 'Evidence decides disputes.',
    },
    {
      chapterId: 'refunds-fraud',
      q: 'What reduces fraud risk?',
      options: ['Storing cards', '3D Secure, velocity limits and provider risk rules', 'Ignoring large orders', 'Disabling HTTPS'],
      answer: 1,
      explain: 'Layered checks reduce fraud.',
    },
  ],
};
