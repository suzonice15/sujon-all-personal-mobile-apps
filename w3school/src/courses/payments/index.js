// Payment Integration course. Stripe, bKash, SSLCommerz, PayPal, webhooks,
// subscriptions, refunds and fraud.

import gettingStarted from './getting-started';
import stripeBasics from './stripe-basics';
import webhooks from './webhooks';
import bdGateways from './bd-gateways';
import paypal from './paypal';
import checkoutUx from './checkout-ux';
import subscriptions from './subscriptions';
import refundsFraud from './refunds-fraud';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  stripeBasics,
  webhooks,
  bdGateways,
  paypal,
  checkoutUx,
  subscriptions,
  refundsFraud,
  projectsInterview,
];

export default {
  id: 'payments',
  title: 'Payment Integration',
  short: 'Payments',
  tagline: 'Accept money safely with Stripe, bKash and PayPal',
  color: '#635BFF',
  icon: 'payments',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
