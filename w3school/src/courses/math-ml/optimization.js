// Math for ML chapter: Optimization.

export default {
  id: 'optimization',
  title: 'Optimization',
  description: 'Gradient descent math, learning rates and convexity',
  icon: 'terrain',
  lessons: [
    {
      id: 'mml-gd-math',
      title: 'The gradient descent update',
      blocks: [
        { type: 'text', value: 'Gradient descent repeats one rule: new weight equals old weight minus learning rate times gradient. The learning rate is the step size. Each step moves the weights downhill on the cost surface.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`# Minimize f(x) = (x - 3)^2, whose minimum is at x = 3
def grad(x):
    return 2 * (x - 3)

for lr in [0.1, 0.5, 1.1]:
    x = 0.0
    for _ in range(20):
        x = x - lr * grad(x)
    print("lr=%.1f  x after 20 steps = %.4f" % (lr, x))` },
        { type: 'note', value: 'For f(x) = (x - 3)^2, each step multiplies the distance to 3 by (1 - 2 lr). When lr is above 1, that factor has magnitude above 1, so the steps grow and the method diverges.' },
      ],
    },
    {
      id: 'mml-convex',
      title: 'Convex functions and local minima',
      blocks: [
        { type: 'text', value: 'A convex function has one bowl shape: any local minimum is the global minimum. Linear and logistic regression with the usual cost are convex, so gradient descent finds the best answer. Neural network losses are not convex and have many local minima and saddle points.' },
        { type: 'list', items: [
          'Convex: one minimum, gradient descent is guaranteed to reach it with a good step size',
          'Non-convex: many valleys, the result depends on the start and the path',
          'Saddle point: the gradient is zero but it is not a minimum',
          'In practice, many good minima of a deep network work about equally well',
        ] },
      ],
    },
    {
      id: 'mml-sgd',
      title: 'Stochastic and mini-batch gradients',
      blocks: [
        { type: 'text', value: 'Computing the gradient on the full dataset is expensive. Stochastic gradient descent uses one example per step, and mini-batch gradient descent uses a small group. The gradient is noisier, but each step is much cheaper, and the noise often helps escape poor regions.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

rng = np.random.default_rng(0)
x = np.linspace(0, 1, 500)
y = 2 * x + 1 + rng.normal(0, 0.05, 500)

w, b = 0.0, 0.0
lr, batch = 0.5, 32
for step in range(800):
    idx = rng.choice(len(x), batch, replace=False)
    err = (w * x[idx] + b) - y[idx]
    w -= lr * 2 * np.mean(err * x[idx])
    b -= lr * 2 * np.mean(err)

print("w=%.2f (true 2)  b=%.2f (true 1)" % (w, b))` },
        { type: 'note', value: 'Adam, RMSProp and similar optimizers adapt the step size per weight. They are the default in deep learning, but the basic gradient idea underneath is the same.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'optimization',
      q: 'In the update w = w - lr * gradient, what does lr control?',
      options: ['The number of features', 'The step size', 'The label values', 'The test split'],
      answer: 1,
      explain: 'The learning rate scales how far each step moves.',
    },
    {
      chapterId: 'optimization',
      q: 'For f(x) = (x - 3)^2 with a learning rate above 1, what happens?',
      options: ['It converges quickly', 'It diverges', 'It stays at zero', 'It becomes convex'],
      answer: 1,
      explain: 'The steps overshoot and grow each time.',
    },
    {
      chapterId: 'optimization',
      q: 'Why is a convex cost useful?',
      options: ['It has many local minima', 'Any local minimum is the global minimum', 'It needs no gradient', 'It is always negative'],
      answer: 1,
      explain: 'Gradient descent can reach the best answer for convex problems.',
    },
    {
      chapterId: 'optimization',
      q: 'What is the main benefit of mini-batch gradient descent?',
      options: ['Exact gradients every step', 'Cheaper steps on large data', 'No learning rate needed', 'It removes noise entirely'],
      answer: 1,
      explain: 'Using a small batch makes each step much cheaper.',
    },
  ],
};
