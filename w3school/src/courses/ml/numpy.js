// ML chapter: NumPy for numerical work.

export default {
  id: 'numpy',
  title: 'NumPy Arrays',
  description: 'Arrays, shapes, vectorized math and random numbers',
  icon: 'calculate',
  lessons: [
    {
      id: 'ml-numpy-arrays',
      title: 'Arrays and shapes',
      blocks: [
        { type: 'text', value: 'A NumPy array stores many numbers of one type in a contiguous block of memory. Models work on arrays: rows are examples, columns are features. The shape tells you how many of each.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

# 4 flats, 3 features each: size, rooms, age
X = np.array([
    [1200, 3, 5],
    [ 800, 2, 12],
    [1500, 4, 1],
    [ 950, 2, 20],
])

print("shape:", X.shape)        # (rows, columns) = (examples, features)
print("first row:", X[0])
print("sizes:", X[:, 0])        # every row, column 0
print("dtype:", X.dtype)` },
        { type: 'note', value: 'Most scikit-learn errors are shape errors. If a call complains about a 1D array, reshape it to (n, 1) with X.reshape(-1, 1).' },
      ],
    },
    {
      id: 'ml-vectorized',
      title: 'Vectorized math and broadcasting',
      blocks: [
        { type: 'text', value: 'Vectorized operations apply to a whole array at once. They run in optimized C code and are often 50 to 100 times faster than a Python loop. Broadcasting stretches smaller arrays to match bigger ones.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

prices = np.array([5_000_000, 7_200_000, 3_800_000])
sizes = np.array([1200, 1800, 900])

# Price per square foot for every flat, no loop
per_sqft = prices / sizes
print(per_sqft.round(0))

# Broadcasting: subtract the mean from every value
centered = per_sqft - per_sqft.mean()
print(centered.round(0))

# Boolean masks select rows
print(prices[per_sqft > 4000])` },
        { type: 'note', value: 'A Python loop over a million rows is slow. Replace loops with array expressions whenever you can; the code is shorter and easier to read.' },
      ],
    },
    {
      id: 'ml-random-stats',
      title: 'Random numbers and summary statistics',
      blocks: [
        { type: 'text', value: 'Simulated data is how you test a model before you have real data. Setting a seed makes the random numbers repeatable, so your results can be reproduced by anyone.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

rng = np.random.default_rng(42)          # the seed makes results repeatable
ages = rng.integers(18, 60, size=10)
heights = rng.normal(loc=165, scale=8, size=10)

print("ages:", ages)
print("mean height: %.1f cm" % heights.mean())
print("std dev: %.1f cm" % heights.std())
print("min, max:", heights.min().round(1), heights.max().round(1))` },
        { type: 'list', items: [
          'mean and median describe the centre',
          'std measures spread around the mean',
          'Use a fixed seed in every experiment you want to repeat',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'numpy',
      q: 'In a feature matrix X with shape (100, 3), what do the rows mean?',
      options: ['Features', 'Examples', 'Labels', 'Weights'],
      answer: 1,
      explain: 'Rows are examples and columns are features.',
    },
    {
      chapterId: 'numpy',
      q: 'Why are vectorized operations faster than Python loops?',
      options: ['They skip the data', 'They run optimized code over the whole array', 'They use more memory', 'They are random'],
      answer: 1,
      explain: 'NumPy runs the work in compiled C code.',
    },
    {
      chapterId: 'numpy',
      q: 'What does a random seed do?',
      options: ['Makes the data bigger', 'Makes random numbers repeatable', 'Speeds up training', 'Removes outliers'],
      answer: 1,
      explain: 'The same seed gives the same random sequence.',
    },
    {
      chapterId: 'numpy',
      q: 'Which fixes a 1D array that scikit-learn rejects as X?',
      options: ['X.sort()', 'X.reshape(-1, 1)', 'X.astype(str)', 'X.flatten() again'],
      answer: 1,
      explain: 'Reshape to a column of examples with one feature.',
    },
  ],
};
