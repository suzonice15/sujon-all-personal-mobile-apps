// Math for ML chapter: Bayes theorem.

export default {
  id: 'bayes',
  title: 'Bayes Theorem',
  description: 'Updating beliefs with evidence and naive Bayes',
  icon: 'psychology',
  lessons: [
    {
      id: 'mml-bayes-rule',
      title: 'Bayes theorem',
      blocks: [
        { type: 'text', value: 'Bayes theorem flips a conditional probability: P(A given B) equals P(B given A) times P(A), divided by P(B). It lets you update a belief with new evidence. Medical tests are the classic example, because a positive result is often less conclusive than it looks.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`prevalence = 0.01          # 1 in 100 people have the disease
sensitivity = 0.90           # P(positive | disease)
false_pos = 0.09             # P(positive | no disease)

p_pos = sensitivity * prevalence + false_pos * (1 - prevalence)
posterior = sensitivity * prevalence / p_pos    # P(disease | positive)

print("P(positive) = %.4f" % p_pos)
print("P(disease | positive) = %.3f" % posterior)` },
        { type: 'note', value: 'Even with a 90 percent accurate test, a positive result here means only about a 9 percent chance of disease. The base rate matters a lot.' },
      ],
    },
    {
      id: 'mml-naive-bayes',
      title: 'Naive Bayes for spam',
      blocks: [
        { type: 'text', value: 'Naive Bayes applies Bayes theorem to text. It multiplies the probability of each word given the class, and assumes the words are independent given the class. That assumption is wrong, but the method works well for spam filtering because the ranking of spam versus ham stays roughly right.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`p_spam = 0.4
p_ham = 0.6

p_free_spam, p_free_ham = 0.60, 0.05
p_meet_spam, p_meet_ham = 0.10, 0.50

# Email contains both "free" and "meeting"
score_spam = p_spam * p_free_spam * p_meet_spam
score_ham = p_ham * p_free_ham * p_meet_ham

posterior_spam = score_spam / (score_spam + score_ham)
print("P(spam | free, meeting) = %.3f" % posterior_spam)` },
        { type: 'note', value: 'Work in log probabilities in real code. Multiplying many small probabilities underflows to zero, while adding their logs stays accurate.' },
      ],
    },
    {
      id: 'mml-prior-posterior',
      title: 'Prior, likelihood and posterior',
      blocks: [
        { type: 'text', value: 'The prior is what you believe before seeing data. The likelihood is how probable the data is under each hypothesis. The posterior combines them: posterior is proportional to likelihood times prior. Bayesian models keep the whole posterior, not just one best answer.' },
        { type: 'list', items: [
          'Prior: P(disease) before the test',
          'Likelihood: P(positive | disease)',
          'Posterior: P(disease | positive) after the test',
          'More evidence moves the posterior; a strong prior resists small evidence',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'bayes',
      q: 'What does Bayes theorem let you compute?',
      options: ['P(B given A) from P(A given B) only', 'P(A given B) from P(B given A), P(A) and P(B)', 'The mean of the data', 'The sample size'],
      answer: 1,
      explain: 'It reverses a conditional probability using the base rates.',
    },
    {
      chapterId: 'bayes',
      q: 'Why can a positive result from a 90 percent accurate test still be unlikely to mean disease?',
      options: ['Tests are random', 'The disease is rare, so false positives are a large share of positives', 'The test is always wrong', 'The sensitivity is zero'],
      answer: 1,
      explain: 'The base rate is so low that false positives outnumber true positives.',
    },
    {
      chapterId: 'bayes',
      q: 'What is the naive assumption in naive Bayes?',
      options: ['The labels are random', 'Features are independent given the class', 'The prior is always 0.5', 'The data is normal'],
      answer: 1,
      explain: 'Words are treated as independent once the class is known.',
    },
    {
      chapterId: 'bayes',
      q: 'Why use log probabilities in real naive Bayes code?',
      options: ['To make the numbers bigger', 'To avoid numerical underflow when multiplying many small numbers', 'To remove the prior', 'Logs are required by Python'],
      answer: 1,
      explain: 'Summing logs keeps very small products from becoming zero.',
    },
  ],
};
