// Math for ML chapter: Calculus.

export default {
  id: 'calculus',
  title: 'Calculus',
  description: 'Derivatives, the chain rule and gradients',
  icon: 'trending-up',
  lessons: [
    {
      id: 'mml-derivative',
      title: 'Derivatives as slopes',
      blocks: [
        { type: 'text', value: 'The derivative of a function is its slope at a point: how much the output changes when the input changes a tiny bit. For f(x) = x squared, the slope at x is 2x. A derivative tells a model which way to move to increase or decrease the cost.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`def f(x):
    return x ** 2

x = 3.0
h = 1e-6
numeric = (f(x + h) - f(x)) / h     # approximate slope
analytic = 2 * x                     # exact derivative of x^2

print("numeric slope:", round(numeric, 4))
print("analytic slope:", analytic)` },
        { type: 'note', value: 'A numeric slope with a tiny h is a useful check. When you derive a gradient by hand, compare it with a numeric one before you trust it.' },
      ],
    },
    {
      id: 'mml-gradient',
      title: 'Partial derivatives and gradients',
      blocks: [
        { type: 'text', value: 'When a function has several inputs, a partial derivative changes one input and holds the others fixed. The gradient collects all partial derivatives into a vector. It points in the direction of steepest increase, so moving against it decreases the cost fastest.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

def f(x, y):
    return x ** 2 + 3 * y

def numeric_grad(fn, x, y, h=1e-6):
    dx = (fn(x + h, y) - fn(x, y)) / h
    dy = (fn(x, y + h) - fn(x, y)) / h
    return np.array([dx, dy])

point = (2.0, 5.0)
print("numeric gradient:", numeric_grad(f, *point).round(4))
print("analytic gradient:", np.array([2 * point[0], 3.0]))` },
        { type: 'note', value: 'In a linear regression with many weights, the gradient has one entry per weight. Gradient descent updates every weight with its own entry.' },
      ],
    },
    {
      id: 'mml-chain',
      title: 'The chain rule',
      blocks: [
        { type: 'text', value: 'The chain rule handles a function inside another function: if y depends on u and u depends on x, then dy/dx = dy/du times du/dx. Backpropagation in neural networks is the chain rule applied layer by layer.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import math

def sigmoid(z):
    return 1 / (1 + math.exp(-z))

def sigmoid_derivative(z):
    s = sigmoid(z)
    return s * (1 - s)                # the known shortcut

z = 0.5
h = 1e-6
numeric = (sigmoid(z + h) - sigmoid(z)) / h
print("numeric:", round(numeric, 6))
print("shortcut:", round(sigmoid_derivative(z), 6))` },
        { type: 'note', value: 'The sigmoid derivative s(1 - s) is cheap to compute from the forward pass value. That is why it was popular in early neural networks.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'calculus',
      q: 'What does a derivative measure?',
      options: ['The area under a curve', 'The slope, or how much the output changes with a small input change', 'The number of features', 'The dataset size'],
      answer: 1,
      explain: 'The derivative is the local rate of change.',
    },
    {
      chapterId: 'calculus',
      q: 'What is the derivative of x squared at x = 3?',
      options: ['3', '6', '9', '2'],
      answer: 1,
      explain: 'The derivative of x squared is 2x, which is 6 at x = 3.',
    },
    {
      chapterId: 'calculus',
      q: 'Which direction does the gradient point?',
      options: ['Steepest decrease', 'Steepest increase', 'Random direction', 'Toward zero always'],
      answer: 1,
      explain: 'The gradient points uphill, so we step the opposite way to decrease the cost.',
    },
    {
      chapterId: 'calculus',
      q: 'What is backpropagation built on?',
      options: ['The chain rule', 'The Pythagorean theorem', 'Matrix inversion only', 'Random search'],
      answer: 0,
      explain: 'Backpropagation applies the chain rule through the layers.',
    },
  ],
};
