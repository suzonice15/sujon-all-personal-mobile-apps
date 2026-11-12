// Math for ML chapter: Probability distributions.

export default {
  id: 'distributions',
  title: 'Distributions',
  description: 'Bernoulli, binomial, normal, expectation and variance',
  icon: 'bar-chart',
  lessons: [
    {
      id: 'mml-random-variables',
      title: 'Random variables and expectation',
      blocks: [
        { type: 'text', value: 'A random variable assigns a number to each outcome. Its expected value is the long-run average: the sum of each value times its probability. Its variance measures spread: the expected squared distance from the mean.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`values = [1, 2, 3, 4, 5, 6]          # one fair die
probs = [1 / 6] * 6

expected = sum(v * p for v, p in zip(values, probs))
variance = sum((v - expected) ** 2 * p for v, p in zip(values, probs))

print("E[X] = %.4f" % expected)            # 3.5
print("Var[X] = %.4f" % variance)          # 35/12 = 2.9167
print("std = %.4f" % variance ** 0.5)` },
        { type: 'note', value: 'The expected value of a single die is 3.5, which no single roll can produce. Expectation is an average, not a typical outcome.' },
      ],
    },
    {
      id: 'mml-bernoulli-binomial',
      title: 'Bernoulli and binomial',
      blocks: [
        { type: 'text', value: 'A Bernoulli variable is one yes-or-no trial with success probability p. A binomial variable counts the successes in n independent trials. Classification labels are often Bernoulli, and counts of clicks or defects are often binomial.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import math
import numpy as np

n, p = 5, 0.5
# P(X = 3) = C(5, 3) * p^3 * (1 - p)^2
exact = math.comb(n, 3) * p ** 3 * (1 - p) ** (n - 3)
print("P(X = 3) exact: %.4f" % exact)

rng = np.random.default_rng(4)
sim = rng.binomial(n, p, size=100_000)
print("P(X = 3) simulated: %.4f" % np.mean(sim == 3))` },
        { type: 'note', value: 'Coin flips and yes-or-no clicks look random, but a binomial model tells you how surprising a given count is.' },
      ],
    },
    {
      id: 'mml-normal',
      title: 'The normal distribution',
      blocks: [
        { type: 'text', value: 'The normal distribution is the bell curve, defined by a mean and a standard deviation. About 68 percent of values fall within one standard deviation of the mean, about 95 percent within two, and about 99.7 percent within three. Many natural measurements and errors are roughly normal.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

rng = np.random.default_rng(5)
x = rng.normal(loc=0, scale=1, size=200_000)

for k in [1, 2, 3]:
    share = np.mean(np.abs(x) <= k)
    print("within %d sd: %.3f" % (k, share))` },
        { type: 'note', value: 'Many models assume normal errors. Check the residuals with a histogram before you trust confidence intervals built on that assumption.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'distributions',
      q: 'What is the expected value of a fair six-sided die?',
      options: ['3', '3.5', '4', '6'],
      answer: 1,
      explain: 'The average of 1 to 6 with equal chance is 3.5.',
    },
    {
      chapterId: 'distributions',
      q: 'What does a binomial distribution count?',
      options: ['The mean', 'The number of successes in n independent trials', 'The largest value', 'The features'],
      answer: 1,
      explain: 'It counts successes across repeated yes-or-no trials.',
    },
    {
      chapterId: 'distributions',
      q: 'About what share of normal values fall within two standard deviations?',
      options: ['68 percent', '95 percent', '99.7 percent', '50 percent'],
      answer: 1,
      explain: 'The 68-95-99.7 rule: two standard deviations covers about 95 percent.',
    },
    {
      chapterId: 'distributions',
      q: 'What does variance measure?',
      options: ['The average value', 'The spread around the mean', 'The number of rows', 'The probability of success'],
      answer: 1,
      explain: 'Variance is the expected squared distance from the mean.',
    },
  ],
};
