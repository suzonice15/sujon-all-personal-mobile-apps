// Math for ML chapter: Probability basics.

export default {
  id: 'probability',
  title: 'Probability',
  description: 'Events, conditional probability and independence',
  icon: 'casino',
  lessons: [
    {
      id: 'mml-prob-basics',
      title: 'Events and the sample space',
      blocks: [
        { type: 'text', value: 'Probability measures how likely an event is, from 0 (impossible) to 1 (certain). The sample space is the set of all possible outcomes. For two dice it has 36 equally likely outcomes, so the probability of a sum of 7 is 6 out of 36.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

rng = np.random.default_rng(1)
rolls = rng.integers(1, 7, size=(100_000, 2))
sums = rolls.sum(axis=1)

print("simulated P(sum = 7): %.4f" % np.mean(sums == 7))
print("exact P(sum = 7):     %.4f" % (6 / 36))` },
        { type: 'note', value: 'Simulation is a powerful check. When a probability is hard to compute by hand, simulate it many times and compare.' },
      ],
    },
    {
      id: 'mml-conditional',
      title: 'Conditional probability',
      blocks: [
        { type: 'text', value: 'Conditional probability P(A given B) is the chance of A once you know B happened. It equals P(A and B) divided by P(B). Models are conditional probability machines: they estimate the chance of the label given the features.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

rng = np.random.default_rng(2)
d1 = rng.integers(1, 7, 200_000)
d2 = rng.integers(1, 7, 200_000)

first_is_six = d1 == 6
sum_at_least_10 = (d1 + d2) >= 10

p_given = np.mean(sum_at_least_10[first_is_six])
print("simulated P(sum >= 10 | first = 6): %.3f" % p_given)
print("exact: 3/6 = 0.500 (second die must be 4, 5 or 6)")` },
        { type: 'note', value: 'P(A given B) is usually not equal to P(B given A). Confusing the two is one of the most common reasoning errors, and it leads straight into Bayes theorem.' },
      ],
    },
    {
      id: 'mml-independence',
      title: 'Independence',
      blocks: [
        { type: 'text', value: 'Two events are independent when knowing one tells you nothing about the other: P(A and B) equals P(A) times P(B). Mutually exclusive events cannot both happen, so their probability of both is zero. Those two ideas are often confused.' },
        { type: 'list', items: [
          'Two fair coin flips are independent',
          'Drawing an ace and then another ace without replacement is not independent',
          'Mutually exclusive: rolling a 2 and a 5 on one die, both at once, is impossible',
          'Assuming independence when it does not hold makes models overconfident',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'probability',
      q: 'What is the probability of a sum of 7 with two fair dice?',
      options: ['1/6', '1/12', '1/36', '7/36'],
      answer: 0,
      explain: 'Six of the 36 outcomes sum to 7, which is 6/36 = 1/6.',
    },
    {
      chapterId: 'probability',
      q: 'What does P(A given B) mean?',
      options: ['P(A) times P(B)', 'The probability of A once B is known to have happened', 'P(B given A)', 'The sum of A and B'],
      answer: 1,
      explain: 'It is the conditional probability of A given B.',
    },
    {
      chapterId: 'probability',
      q: 'When are two events independent?',
      options: ['When they cannot both happen', 'When P(A and B) equals P(A) times P(B)', 'When they have the same probability', 'When they are always true'],
      answer: 1,
      explain: 'Independence means knowing one does not change the other.',
    },
    {
      chapterId: 'probability',
      q: 'Are mutually exclusive events independent?',
      options: ['Always', 'Never, unless both have zero probability', 'Only in simulations', 'Yes, always'],
      answer: 1,
      explain: 'If one happens, the other cannot, so knowing one changes the other.',
    },
  ],
};
