// ML chapter: Linear Regression.

export default {
  id: 'linear-regression',
  title: 'Linear Regression',
  description: 'Cost functions, gradient descent and a real model',
  icon: 'show-chart',
  lessons: [
    {
      id: 'ml-line-cost',
      title: 'A line, an error and a cost',
      blocks: [
        { type: 'text', value: 'Linear regression predicts with a weighted sum: price = w * size + b. Training means finding the w and b that make the errors smallest. The usual measure is the mean squared error (MSE): the average of the squared differences between prediction and truth.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

size = np.array([600, 900, 1200, 1500, 1800], dtype=float)
price = np.array([2.1, 3.4, 5.0, 6.3, 7.4])     # millions of Tk

def mse(w, b):
    pred = w * size + b
    return np.mean((pred - price) ** 2)

print("cost with w=0.004, b=0:", round(mse(0.004, 0), 3))
print("cost with w=0.001, b=0:", round(mse(0.001, 0), 3))` },
        { type: 'note', value: 'Squaring makes big errors count much more than small ones, and keeps the function smooth so we can use calculus to improve it.' },
      ],
    },
    {
      id: 'ml-gradient-descent',
      title: 'Gradient descent from scratch',
      blocks: [
        { type: 'text', value: 'Gradient descent moves w and b a small step in the direction that lowers the cost. The learning rate sets the step size: too big and it overshoots, too small and it is painfully slow.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

size = np.array([600, 900, 1200, 1500, 1800], dtype=float) / 1000   # in thousand sq ft
price = np.array([2.1, 3.4, 5.0, 6.3, 7.4])

w, b = 0.0, 0.0
lr = 0.1

for step in range(2000):
    pred = w * size + b
    error = pred - price
    grad_w = 2 * np.mean(error * size)
    grad_b = 2 * np.mean(error)
    w -= lr * grad_w
    b -= lr * grad_b

print("w = %.3f, b = %.3f" % (w, b))
print("final MSE = %.4f" % np.mean((w * size + b - price) ** 2))` },
        { type: 'list', items: [
          'Gradient: the slope of the cost with respect to each weight',
          'Update: weight minus learning rate times gradient',
          'Repeat until the cost stops improving',
          'Scale your features first so one step size works for all of them',
        ] },
      ],
    },
    {
      id: 'ml-sklearn-regression',
      title: 'Fitting a real model with scikit-learn',
      blocks: [
        { type: 'text', value: 'scikit-learn does the same job in a few lines. Always evaluate on a held-out test set, and report an error in the same unit as the target so people can judge it.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

rng = np.random.default_rng(7)
n = 300
size = rng.uniform(600, 2200, n)
rooms = rng.integers(1, 5, n)
age = rng.uniform(0, 30, n)
price = 4000 * size + 250_000 * rooms - 60_000 * age + rng.normal(0, 300_000, n)

X = np.column_stack([size, rooms, age])
X_train, X_test, y_train, y_test = train_test_split(X, price, test_size=0.2, random_state=0)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)

print("coefficients:", model.coef_.round(0))
print("MAE: %s Tk" % format(round(mean_absolute_error(y_test, pred)), ","))
print("R2: %.3f" % r2_score(y_test, pred))` },
        { type: 'note', value: 'Coefficients tell you the effect of each feature while the others are held fixed. They are only meaningful if the features are on comparable scales or you look at them with that in mind.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'linear-regression',
      q: 'What does mean squared error measure?',
      options: ['The average squared gap between predictions and truth', 'The number of rows', 'The model size', 'The training time'],
      answer: 0,
      explain: 'MSE averages the squared errors.',
    },
    {
      chapterId: 'linear-regression',
      q: 'What happens if the learning rate is too large?',
      options: ['Training is slower', 'The updates overshoot and the cost can diverge', 'The model gets more accurate', 'Nothing changes'],
      answer: 1,
      explain: 'Steps that are too big jump past the minimum.',
    },
    {
      chapterId: 'linear-regression',
      q: 'What is a gradient?',
      options: ['A colour in the chart', 'The slope of the cost with respect to a weight', 'The training data', 'A test score'],
      answer: 1,
      explain: 'It tells gradient descent which way and how much to move each weight.',
    },
    {
      chapterId: 'linear-regression',
      q: 'Why scale features before gradient descent?',
      options: ['To make them prettier', 'So one learning rate works for all weights', 'To remove labels', 'To shrink the dataset'],
      answer: 1,
      explain: 'Features on very different scales make the cost surface lopsided.',
    },
  ],
};
