// Math for ML chapter: Statistics.

export default {
  id: 'statistics',
  title: 'Statistics',
  description: 'Summaries, sampling, the central limit theorem and tests',
  icon: 'query-stats',
  lessons: [
    {
      id: 'mml-summary',
      title: 'Summaries and sample variance',
      blocks: [
        { type: 'text', value: 'Mean and median describe the centre; standard deviation describes the spread. When you estimate spread from a sample, divide by n minus 1 instead of n. That correction, called Bessel correction, removes the bias of using the sample mean.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

data = np.array([2, 4, 4, 4, 5, 5, 7, 9])

print("mean:", data.mean())
print("median:", np.median(data))
print("population std (ddof=0):", round(data.std(), 4))
print("sample std (ddof=1):", round(data.std(ddof=1), 4))` },
        { type: 'note', value: 'NumPy uses ddof=0 by default, which is the population formula. Pass ddof=1 when your data is a sample from a larger population.' },
      ],
    },
    {
      id: 'mml-clt',
      title: 'Sampling and the central limit theorem',
      blocks: [
        { type: 'text', value: 'A sample mean varies from sample to sample. The central limit theorem says that the means of many samples look roughly normal, even when the data itself is not normal, and their spread shrinks with the square root of n.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

rng = np.random.default_rng(6)
# Skewed data: exponential with standard deviation 1
for n in [5, 30, 300]:
    means = rng.exponential(scale=1.0, size=(20_000, n)).mean(axis=1)
    print("n=%3d  std of sample means=%.3f  theory=%.3f" % (n, means.std(), 1 / np.sqrt(n)))` },
        { type: 'note', value: 'Quadrupling the sample size only halves the error of the mean. Collecting more data has diminishing returns.' },
      ],
    },
    {
      id: 'mml-correlation-test',
      title: 'Correlation and a permutation test',
      blocks: [
        { type: 'text', value: 'Correlation measures a linear relationship between two variables and ranges from -1 to 1. To check whether a difference between two groups could be chance, a permutation test shuffles the group labels many times and counts how often a shuffle gives a difference as large as the observed one. That share is the p-value.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

rng = np.random.default_rng(7)
group_a = rng.normal(70, 8, 30)        # scores with course A
group_b = rng.normal(75, 8, 30)        # scores with course B

observed = group_b.mean() - group_a.mean()
pooled = np.concatenate([group_a, group_b])

count = 0
trials = 10_000
for _ in range(trials):
    rng.shuffle(pooled)
    diff = pooled[30:].mean() - pooled[:30].mean()
    if abs(diff) >= abs(observed):
        count += 1

print("observed difference: %.2f" % observed)
print("permutation p-value: %.4f" % (count / trials))` },
        { type: 'note', value: 'A small p-value says the difference is unlikely under no effect. It does not say how big or important the effect is. Report the effect size too.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'statistics',
      q: 'Why divide by n minus 1 for a sample variance?',
      options: ['To make it smaller for no reason', 'To correct the bias from estimating the mean with the same sample', 'Because n is odd', 'It is a typo'],
      answer: 1,
      explain: 'Bessel correction removes the bias of the sample estimate.',
    },
    {
      chapterId: 'statistics',
      q: 'What does the central limit theorem say about sample means?',
      options: ['They are always equal', 'They look roughly normal for large samples, even from non-normal data', 'They have zero spread', 'They equal the median'],
      answer: 1,
      explain: 'Means of many samples approach a normal shape.',
    },
    {
      chapterId: 'statistics',
      q: 'If the sample size grows from 25 to 100, by what factor does the standard error of the mean shrink?',
      options: ['Four', 'Two', 'Ten', 'It does not change'],
      answer: 1,
      explain: 'Standard error scales with 1 over the square root of n, so quadrupling n halves it.',
    },
    {
      chapterId: 'statistics',
      q: 'What does a small p-value tell you?',
      options: ['The effect is large', 'The observed difference is unlikely if there were no real effect', 'The data is correct', 'The model is accurate'],
      answer: 1,
      explain: 'It measures how surprising the data is under the no-effect assumption.',
    },
  ],
};
