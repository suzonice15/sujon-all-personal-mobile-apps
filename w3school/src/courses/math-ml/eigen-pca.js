// Math for ML chapter: Eigenvectors and PCA intuition.

export default {
  id: 'eigen-pca',
  title: 'Eigenvectors & PCA',
  description: 'Directions that matter and why PCA works',
  icon: 'explore',
  lessons: [
    {
      id: 'mml-eigen',
      title: 'Eigenvectors and eigenvalues',
      blocks: [
        { type: 'text', value: 'A matrix usually rotates and stretches a vector. An eigenvector is a special direction that only gets stretched, not rotated. The eigenvalue is the stretch factor: A v = lambda v.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

A = np.array([[2.0, 0.0],
              [0.0, 3.0]])

values, vectors = np.linalg.eig(A)
print("eigenvalues:", values)

v = vectors[:, 0]
print("A @ v:", A @ v)
print("lambda * v:", values[0] * v)   # the same vector: only stretched` },
        { type: 'note', value: 'Eigenvectors show the directions along which data varies. That is why they matter for PCA, covariance and many stability questions.' },
      ],
    },
    {
      id: 'mml-covariance',
      title: 'Covariance matrix',
      blocks: [
        { type: 'text', value: 'The covariance matrix describes how features vary together. Its diagonal holds each feature variance, and off-diagonal entries hold covariances. Its eigenvectors point along the main directions of spread.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

rng = np.random.default_rng(0)
size = rng.normal(1000, 200, 300)
price = 4 * size + rng.normal(0, 300, 300)     # strongly related to size

data = np.column_stack([size, price])
cov = np.cov(data, rowvar=False)
print("covariance matrix:")
print(cov.round(1))

values, vectors = np.linalg.eigh(cov)
print("main direction:", vectors[:, -1].round(3))` },
        { type: 'note', value: 'Use np.linalg.eigh for symmetric matrices like covariance. It is more stable and returns sorted eigenvalues.' },
      ],
    },
    {
      id: 'mml-pca-math',
      title: 'Why PCA works',
      blocks: [
        { type: 'text', value: 'PCA centers the data, computes the covariance matrix, and keeps the eigenvectors with the largest eigenvalues. Those directions carry the most variance, so projecting onto them keeps the most information with fewer features.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

rng = np.random.default_rng(0)
size = rng.normal(1000, 200, 300)
price = 4 * size + rng.normal(0, 300, 300)
X = np.column_stack([size, price])

Xc = X - X.mean(axis=0)                       # center each column
cov = Xc.T @ Xc / (len(Xc) - 1)
values, vectors = np.linalg.eigh(cov)
order = np.argsort(values)[::-1]             # largest variance first

explained = values[order] / values.sum()
print("variance ratio:", explained.round(3))
projected = Xc @ vectors[:, order[:1]]        # keep the top component
print("reduced shape:", projected.shape)` },
        { type: 'note', value: 'Always center the data before PCA. Without centering, the first component points toward the mean instead of the spread.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'eigen-pca',
      q: 'What is an eigenvector?',
      options: ['A vector that is only stretched, not rotated, by the matrix', 'A random vector', 'The largest vector in the data', 'A column of ones'],
      answer: 0,
      explain: 'A v = lambda v: the direction stays the same.',
    },
    {
      chapterId: 'eigen-pca',
      q: 'What do the diagonal entries of a covariance matrix hold?',
      options: ['Means', 'Each feature variance', 'Labels', 'Learning rates'],
      answer: 1,
      explain: 'Diagonal entries are the variance of each feature.',
    },
    {
      chapterId: 'eigen-pca',
      q: 'Why keep the eigenvectors with the largest eigenvalues in PCA?',
      options: ['They are the smallest', 'They carry the most variance, so the most information', 'They are always integers', 'They remove outliers'],
      answer: 1,
      explain: 'Large eigenvalues mean high variance along that direction.',
    },
    {
      chapterId: 'eigen-pca',
      q: 'Why center the data before PCA?',
      options: ['To make it bigger', 'So the components describe spread, not the offset from zero', 'To remove the labels', 'It is optional'],
      answer: 1,
      explain: 'Centering makes the covariance measure spread around the mean.',
    },
  ],
};
