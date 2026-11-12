// Math for ML chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Apply the math and prepare for interview questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'mml-project-linear',
      title: 'Project: linear regression by hand',
      blocks: [
        { type: 'text', value: 'Implement linear regression with only NumPy: the cost, the gradient, and the update loop. Then compare your weights with the closed-form solution from the normal equation. Matching numbers prove you understand the math.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

rng = np.random.default_rng(8)
X = np.column_stack([np.ones(200), rng.uniform(0, 10, 200)])   # bias column + feature
true_w = np.array([3.0, 2.0])
y = X @ true_w + rng.normal(0, 1, 200)

# Closed form: w = (X^T X)^-1 X^T y
w_closed = np.linalg.solve(X.T @ X, X.T @ y)

# Gradient descent on the same cost
w = np.zeros(2)
lr = 0.001
for _ in range(20_000):
    grad = 2 * X.T @ (X @ w - y) / len(y)
    w -= lr * grad

print("closed form: ", w_closed.round(3))
print("gradient:    ", w.round(3))` },
        { type: 'note', value: 'Write the gradient on paper first, then check it numerically. Doing both is the fastest way to find a bug in ML code.' },
      ],
    },
    {
      id: 'mml-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is a dot product and where does it appear in ML?',
          'Why is cosine similarity useful for text?',
          'What is the chain rule and why does backpropagation need it?',
          'What does the learning rate do and what happens when it is too big?',
          'Explain conditional probability with an example',
          'Why does base rate matter in Bayes theorem?',
          'What does the central limit theorem let you do?',
          'What is cross-entropy and why not use accuracy as the loss?',
        ] },
        { type: 'text', value: 'Strong answers give the intuition first, then the formula, then an example from ML. "The dot product measures how much two vectors agree, and a linear model is exactly that" is a complete answer.' },
        { type: 'note', value: 'Be ready to do one small calculation on paper: a conditional probability, a gradient step, or a shape check for a matrix product.' },
      ],
    },
    {
      id: 'mml-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: vectors, dot product and cosine similarity',
          'Week 2: matrices, shapes and matrix multiplication',
          'Week 3: eigenvectors and PCA intuition',
          'Week 4: derivatives, gradients and the chain rule',
          'Week 5: probability, conditional probability and Bayes theorem',
          'Week 6: distributions, statistics and sampling',
          'Week 7: entropy, cross-entropy and the loss functions you use',
        ] },
        { type: 'note', value: 'Work the math with code at the same time. Every formula here has a few lines of NumPy that check it, and running them makes the idea stick.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Why compare gradient descent with the closed-form solution?',
      options: ['To make the code longer', 'To check that the implementation and the math agree', 'To remove the data', 'Closed form is always wrong'],
      answer: 1,
      explain: 'Matching results are strong evidence the gradient and update are correct.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should a strong math answer in an interview start with?',
      options: ['The formula only', 'The intuition, then the formula, then an ML example', 'A random number', 'The library name'],
      answer: 1,
      explain: 'Intuition first makes the formula meaningful.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the first thing to check when a gradient seems wrong?',
      options: ['The font', 'A numeric gradient on a small example', 'The test score', 'The dataset name'],
      answer: 1,
      explain: 'A numeric check pinpoints the mismatch quickly.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which skill matters most for ML math interviews?',
      options: ['Memorizing every formula', 'Explaining the intuition and checking with a small calculation', 'Knowing only one library', 'Avoiding numbers'],
      answer: 1,
      explain: 'Interviewers look for reasoning and clear intuition.',
    },
  ],
};
