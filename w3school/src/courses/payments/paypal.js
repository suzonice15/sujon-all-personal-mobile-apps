// Payments chapter: PayPal.

export default {
  id: 'paypal',
  title: 'PayPal',
  description: 'Orders, capture and global buyers',
  icon: 'account-balance-wallet',
  lessons: [
    {
      id: 'pay-paypal-order',
      title: 'Creating an order',
      blocks: [
        { type: 'text', value: 'PayPal uses an order with an intent. Create it on the server, let the buyer approve it, then capture it. Use the sandbox for testing and the live client id in production.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const order = await paypal.orders.create({
  intent: 'CAPTURE',
  purchase_units: [{
    reference_id: 'ord_123',
    amount: { currency_code: 'USD', value: '49.00' },
  }],
});

// Send order.id to the client for approval` },
        { type: 'note', value: 'The amount is set on the server. Never accept an amount from the client for a real charge.' },
      ],
    },
    {
      id: 'pay-paypal-capture',
      title: 'Capture and verify',
      blocks: [
        { type: 'text', value: 'After the buyer approves, capture the order on the server. The capture response contains the final status. Store the capture id and verify the amount before fulfilling.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const capture = await paypal.orders.capture(orderId);

const unit = capture.purchase_units[0];
const amount = unit.payments.captures[0].amount;

if (capture.status !== 'COMPLETED' || amount.value !== '49.00') {
  throw new Error('Payment mismatch');
}` },
        { type: 'note', value: 'Compare the captured amount with your expected total. A mismatch is a bug or an attack, and both require stopping.' },
      ],
    },
    {
      id: 'pay-paypal-notes',
      title: 'PayPal notes',
      blocks: [
        { type: 'list', items: [
          'Use the JS SDK for the buyer approval UI',
          'Sandbox and live have separate credentials',
          'Handle pending, completed and denied states',
          'Store the capture id for refunds and support',
          'PayPal is global; check currency and fees per country',
        ] },
        { type: 'text', value: 'PayPal adds buyer trust for international customers. Many local Bangladeshi customers still prefer bKash, so supporting both is common.' },
        { type: 'note', value: 'Never assume a redirect means success. Always capture and verify on the server.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'paypal',
      q: 'What must happen after buyer approval?',
      options: ['Nothing', 'Capture the order on the server', 'Delete the order', 'Redirect to home'],
      answer: 1,
      explain: 'Capture completes the payment.',
    },
    {
      chapterId: 'paypal',
      q: 'Where should the amount be set?',
      options: ['In the client', 'On the server', 'In the URL', 'In a cookie'],
      answer: 1,
      explain: 'The server controls the amount.',
    },
    {
      chapterId: 'paypal',
      q: 'Why compare the captured amount?',
      options: ['For style', 'To catch a mismatch or tampering', 'To paginate', 'To refund'],
      answer: 1,
      explain: 'A mismatch must stop fulfilment.',
    },
    {
      chapterId: 'paypal',
      q: 'Which environment should you test in?',
      options: ['Live', 'Sandbox', 'Production', 'Local only'],
      answer: 1,
      explain: 'Sandbox is for testing.',
    },
  ],
};
