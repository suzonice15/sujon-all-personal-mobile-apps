// Payments chapter: bKash & SSLCommerz.

export default {
  id: 'bd-gateways',
  title: 'bKash & SSLCommerz',
  description: 'Local payment methods for Bangladesh',
  icon: 'phone-android',
  lessons: [
    {
      id: 'pay-bkash',
      title: 'bKash',
      blocks: [
        { type: 'text', value: 'bKash is a mobile wallet used by millions in Bangladesh. The checkout flow creates a payment, redirects the customer to bKash, then bKash redirects back and calls a callback. Verify the result on the server.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// 1. Create a payment on the server
const payment = await bkash.createPayment({
  amount: '5000',
  currency: 'BDT',
  intent: 'sale',
  merchantInvoiceNumber: 'ord_123',
  callbackURL: 'https://api.example.com/bkash/callback',
});

// 2. Redirect the customer
res.redirect(payment.bkashURL);` },
        { type: 'note', value: 'Never mark an order paid from the redirect query string. Call the bKash execute or query endpoint to confirm.' },
      ],
    },
    {
      id: 'pay-sslcommerz',
      title: 'SSLCommerz',
      blocks: [
        { type: 'text', value: 'SSLCommerz is an aggregator that supports cards, bKash, Nagad, Rocket and bank transfers. It is a common choice when you want many local methods through one integration.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const session = await sslcommerz.init({
  total_amount: 5000,
  currency: 'BDT',
  tran_id: 'ord_123',
  success_url: 'https://api.example.com/pay/success',
  fail_url: 'https://api.example.com/pay/fail',
  cancel_url: 'https://api.example.com/pay/cancel',
  cus_name: 'Ayesha',
  cus_email: 'a@example.com',
});

res.redirect(session.GatewayPageURL);` },
        { type: 'note', value: 'Verify the transaction with the validation API using the transaction id. The redirect parameters are not proof of payment.' },
      ],
    },
    {
      id: 'pay-bd-patterns',
      title: 'Local payment patterns',
      blocks: [
        { type: 'list', items: [
          'Store the transaction id from the provider',
          'Verify with the provider API before fulfilling',
          'Handle success, failure and cancel separately',
          'Support refunds where the provider allows it',
          'Show the amount and merchant name clearly',
          'Log every step without card or PIN data',
        ] },
        { type: 'text', value: 'Mobile wallet flows often involve a PIN entered on the provider page. Your app must never see or store that PIN.' },
        { type: 'note', value: 'Test with sandbox credentials. A live payment test costs real money and should be one small transaction at the end.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'bd-gateways',
      q: 'What is bKash?',
      options: ['A card network', 'A mobile wallet in Bangladesh', 'A bank', 'A web framework'],
      answer: 1,
      explain: 'bKash is a mobile wallet.',
    },
    {
      chapterId: 'bd-gateways',
      q: 'What does SSLCommerz aggregate?',
      options: ['Only cards', 'Cards and local methods such as bKash and Nagad', 'Only bank transfers', 'Only crypto'],
      answer: 1,
      explain: 'It supports many local methods.',
    },
    {
      chapterId: 'bd-gateways',
      q: 'How do you confirm a wallet payment?',
      options: ['Trust the redirect', 'Query or execute with the provider API', 'Check the amount in the URL', 'Wait for an email'],
      answer: 1,
      explain: 'The provider API confirms the transaction.',
    },
    {
      chapterId: 'bd-gateways',
      q: 'Why must your app never see the wallet PIN?',
      options: ['It is slow', 'It is entered on the provider page and is sensitive', 'It is optional', 'It is encrypted'],
      answer: 1,
      explain: 'Never handle the customer PIN.',
    },
  ],
};
