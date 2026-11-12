// Math for ML interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  vectors: [
    {
      q: 'What is a dot product?',
      a: 'The sum of the products of matching components. It measures how much two vectors point in the same direction and is the core of a linear model prediction.',
      level: 'basic',
    },
    {
      q: 'Why use cosine similarity for text?',
      a: 'It compares the direction of word-count vectors and ignores their length, so a long and a short document on the same topic still look similar.',
      level: 'intermediate',
    },
    {
      q: 'What is a norm?',
      a: 'The length of a vector. The L2 norm is the square root of the sum of squares; the L1 norm is the sum of absolute values.',
      level: 'basic',
    },
    {
      q: 'Why normalize features before distance-based methods?',
      a: 'Features with large numbers would dominate the distance. Scaling puts every feature on a comparable range.',
      level: 'intermediate',
    },
  ],
  matrices: [
    {
      q: 'When can two matrices be multiplied?',
      a: 'When the number of columns of the first equals the number of rows of the second. The result has the first matrix rows and the second matrix columns.',
      level: 'basic',
    },
    {
      q: 'What does a neural network layer compute in matrix form?',
      a: 'The output is the input matrix times a weight matrix, plus a bias, followed by an activation function.',
      level: 'intermediate',
    },
    {
      q: 'Why use solve instead of the inverse?',
      a: 'Solving a linear system directly is faster and numerically more stable than computing the inverse and multiplying.',
      level: 'advanced',
    },
    {
      q: 'What is the identity matrix?',
      a: 'A square matrix with ones on the diagonal and zeros elsewhere. Multiplying by it leaves any vector unchanged.',
      level: 'basic',
    },
  ],
  'eigen-pca': [
    {
      q: 'What is an eigenvector?',
      a: 'A nonzero vector whose direction does not change when the matrix is applied; it is only scaled by its eigenvalue.',
      level: 'basic',
    },
    {
      q: 'How does PCA use eigenvectors?',
      a: 'It takes the eigenvectors of the covariance matrix. The ones with the largest eigenvalues are the directions of greatest variance to keep.',
      level: 'intermediate',
    },
    {
      q: 'Why center the data before PCA?',
      a: 'So the covariance measures spread around the mean. Without centering, the first component tends to point at the mean instead of the variation.',
      level: 'intermediate',
    },
    {
      q: 'What does the covariance matrix contain?',
      a: 'Variances on the diagonal and covariances between each pair of features off the diagonal.',
      level: 'basic',
    },
  ],
  calculus: [
    {
      q: 'What is a derivative?',
      a: 'The instantaneous rate of change, or slope, of a function. It tells how the output moves for a small change in the input.',
      level: 'basic',
    },
    {
      q: 'What is the gradient?',
      a: 'The vector of partial derivatives. It points in the direction of steepest increase of the function.',
      level: 'basic',
    },
    {
      q: 'Explain the chain rule.',
      a: 'For nested functions, the derivative of the outer function times the derivative of the inner function. Backpropagation applies it repeatedly through layers.',
      level: 'intermediate',
    },
    {
      q: 'How can you check a gradient implementation?',
      a: 'Compare it with a numeric gradient computed from small finite differences. Large disagreement means a bug.',
      level: 'intermediate',
    },
  ],
  optimization: [
    {
      q: 'What does the learning rate control?',
      a: 'The size of each gradient descent step. Too small is slow; too large can overshoot and diverge.',
      level: 'basic',
    },
    {
      q: 'What is a convex function?',
      a: 'A function with a single bowl shape, so every local minimum is the global minimum. Gradient descent finds the best answer on convex problems.',
      level: 'intermediate',
    },
    {
      q: 'Why use mini-batch gradient descent?',
      a: 'Each step uses a small sample, which is much cheaper than the full dataset and adds noise that can help training on large data.',
      level: 'intermediate',
    },
    {
      q: 'What is a saddle point?',
      a: 'A point where the gradient is zero but it is not a minimum, because the function curves up in some directions and down in others.',
      level: 'advanced',
    },
  ],
  probability: [
    {
      q: 'What is conditional probability?',
      a: 'The probability of A given that B has happened: P(A and B) divided by P(B).',
      level: 'basic',
    },
    {
      q: 'What does independence mean?',
      a: 'Knowing one event does not change the probability of the other, so P(A and B) equals P(A) times P(B).',
      level: 'basic',
    },
    {
      q: 'Are mutually exclusive events independent?',
      a: 'No. If one happens, the other cannot, so knowing one changes the probability of the other.',
      level: 'intermediate',
    },
    {
      q: 'Why are P(A given B) and P(B given A) different?',
      a: 'They answer different questions and depend on different base rates. Bayes theorem links them.',
      level: 'intermediate',
    },
  ],
  bayes: [
    {
      q: 'State Bayes theorem.',
      a: 'P(A given B) equals P(B given A) times P(A), divided by P(B). It updates a belief with evidence.',
      level: 'basic',
    },
    {
      q: 'Why does the base rate matter?',
      a: 'When the condition is rare, false positives can outnumber true positives, so a positive test is much less conclusive than its accuracy suggests.',
      level: 'intermediate',
    },
    {
      q: 'What is the naive assumption in naive Bayes?',
      a: 'Features are conditionally independent given the class. It is usually wrong, but the method still ranks classes well for many text tasks.',
      level: 'intermediate',
    },
    {
      q: 'Why use log probabilities?',
      a: 'Multiplying many small probabilities can underflow to zero. Summing logs keeps the computation numerically stable.',
      level: 'advanced',
    },
  ],
  distributions: [
    {
      q: 'What is expected value?',
      a: 'The long-run average of a random variable: the sum of each value times its probability.',
      level: 'basic',
    },
    {
      q: 'What is the binomial distribution?',
      a: 'The distribution of the number of successes in n independent yes-or-no trials, each with success probability p.',
      level: 'basic',
    },
    {
      q: 'Explain the 68-95-99.7 rule.',
      a: 'For a normal distribution, about 68 percent of values lie within one standard deviation of the mean, 95 percent within two, and 99.7 percent within three.',
      level: 'intermediate',
    },
    {
      q: 'What is variance?',
      a: 'The expected squared distance of a random variable from its mean. Its square root is the standard deviation.',
      level: 'basic',
    },
  ],
  statistics: [
    {
      q: 'Why divide by n minus 1 for sample variance?',
      a: 'Bessel correction. Using the sample mean makes the naive estimate biased low, and dividing by n minus 1 corrects it.',
      level: 'intermediate',
    },
    {
      q: 'What does the central limit theorem say?',
      a: 'The distribution of sample means approaches a normal distribution as the sample size grows, whatever the original distribution, with spread shrinking as one over the square root of n.',
      level: 'intermediate',
    },
    {
      q: 'What is a p-value?',
      a: 'The probability of seeing a result at least as extreme as the observed one if there were no real effect. It is not the probability that the effect is real.',
      level: 'advanced',
    },
    {
      q: 'Correlation versus causation?',
      a: 'Correlation measures how two variables move together. It does not show that one causes the other, because a third factor or chance can explain it.',
      level: 'basic',
    },
  ],
  'information-loss': [
    {
      q: 'What is entropy?',
      a: 'A measure of uncertainty in a distribution, in bits when using log base 2. A fair coin has one bit; a certain outcome has zero.',
      level: 'basic',
    },
    {
      q: 'What is cross-entropy used for?',
      a: 'As the loss for classification. It measures how well predicted probabilities match the true labels, and it penalizes confident wrong answers.',
      level: 'intermediate',
    },
    {
      q: 'Why not use accuracy as the training loss?',
      a: 'Accuracy is not differentiable and ignores how confident the model was. Cross-entropy gives a smooth signal that improves training.',
      level: 'advanced',
    },
    {
      q: 'What is KL divergence?',
      a: 'A measure of how one distribution differs from another. It is zero only when they match and is not symmetric.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you verify a gradient in code?',
      a: 'Compare the analytic gradient with a numeric gradient from finite differences on a small input. They should agree closely.',
      level: 'intermediate',
    },
    {
      q: 'How do you explain a math concept to a non-expert?',
      a: 'Start with the everyday intuition, show a small concrete example with numbers, then give the formula as a summary of the idea.',
      level: 'basic',
    },
    {
      q: 'What is the best way to learn ML math?',
      a: 'Pair each formula with a few lines of NumPy that check it. Running the math is faster than reading it alone.',
      level: 'basic',
    },
    {
      q: 'Which topic do you need most for deep learning?',
      a: 'Linear algebra for the layers, calculus for backpropagation, and probability for the loss functions.',
      level: 'intermediate',
    },
  ],
};
