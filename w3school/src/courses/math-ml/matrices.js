// Math for ML chapter: Matrices.

export default {
  id: 'matrices',
  title: 'Matrices',
  description: 'Shapes, multiplication, transposes and solving systems',
  icon: 'grid-on',
  lessons: [
    {
      id: 'mml-matrix-shape',
      title: 'Matrices and their shapes',
      blocks: [
        { type: 'text', value: 'A matrix is a grid of numbers. A dataset with 100 examples and 3 features is a 100 by 3 matrix. Each row is an example and each column is a feature. The shape is always written rows by columns.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

X = np.array([
    [1200, 3, 5],
    [ 800, 2, 12],
    [1500, 4, 1],
    [ 950, 2, 20],
])
print("shape:", X.shape)          # (4, 3): 4 examples, 3 features
print("transpose shape:", X.T.shape)
print("second feature for all rows:", X[:, 1])` },
        { type: 'note', value: 'Most shape errors in ML come from mixing up rows and columns. Print the shape before and after every step you are unsure about.' },
      ],
    },
    {
      id: 'mml-matmul',
      title: 'Matrix multiplication',
      blocks: [
        { type: 'text', value: 'To multiply A by B, the number of columns of A must equal the number of rows of B. The result has the rows of A and the columns of B. Each result cell is a dot product of a row from A and a column from B. A neural network layer is exactly this: inputs times a weight matrix.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

X = np.array([[1.0, 2.0],
              [3.0, 4.0],
              [5.0, 6.0]])        # 3 examples, 2 features  -> shape (3, 2)
W = np.array([[0.5],
              [0.1]])             # 2 inputs, 1 output      -> shape (2, 1)

pred = X @ W                      # (3, 2) @ (2, 1) -> (3, 1)
print("shape:", pred.shape)
print(pred.ravel())               # 1*0.5+2*0.1 = 0.7, and so on` },
        { type: 'note', value: 'Matrix multiplication is not commutative: A @ B usually differs from B @ A, and often one of them is not even defined.' },
      ],
    },
    {
      id: 'mml-solve',
      title: 'Identity, inverse and solving equations',
      blocks: [
        { type: 'text', value: 'The identity matrix leaves any vector unchanged, like multiplying by 1. The inverse of A undoes A. Solving a linear system Ax = b means finding x. Linear regression with the normal equation is this same problem.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

A = np.array([[2.0, 1.0],
              [1.0, 3.0]])
b = np.array([8.0, 13.0])

x = np.linalg.solve(A, b)         # better than computing the inverse
print("solution x:", x)          # expect [1, 4]
print("check A @ x:", A @ x)     # should match b

print("identity check:", np.allclose(A @ np.linalg.inv(A), np.eye(2)))` },
        { type: 'note', value: 'Prefer np.linalg.solve over inv(A) @ b. It is faster and more accurate, and it avoids a common source of numerical error.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'matrices',
      q: 'A matrix has shape (100, 3). How many features does it have?',
      options: ['100', '3', '103', '300'],
      answer: 1,
      explain: 'Columns are features; rows are examples.',
    },
    {
      chapterId: 'matrices',
      q: 'What shape does a (3, 2) matrix times a (2, 1) matrix give?',
      options: ['(2, 3)', '(3, 1)', '(2, 2)', '(1, 3)'],
      answer: 1,
      explain: 'Inner dimensions match (2 and 2); the result keeps the outer ones, 3 and 1.',
    },
    {
      chapterId: 'matrices',
      q: 'What does the identity matrix do to a vector?',
      options: ['Doubles it', 'Leaves it unchanged', 'Sets it to zero', 'Sorts it'],
      answer: 1,
      explain: 'Multiplying by the identity returns the same vector.',
    },
    {
      chapterId: 'matrices',
      q: 'Why is np.linalg.solve preferred over computing the inverse?',
      options: ['It is prettier', 'It is faster and more accurate', 'It works only on integers', 'It removes the matrix'],
      answer: 1,
      explain: 'Solving directly avoids the extra work and numerical error of the inverse.',
    },
  ],
};
