// ML chapter: Neural Networks.

export default {
  id: 'neural-networks',
  title: 'Neural Networks',
  description: 'Neurons, layers, activations and the training loop',
  icon: 'hub',
  lessons: [
    {
      id: 'ml-neuron',
      title: 'A neuron and an activation',
      blocks: [
        { type: 'text', value: 'A neuron computes a weighted sum of its inputs plus a bias, then applies an activation function. Stacking neurons in layers lets the network learn patterns that a single straight line cannot, such as curves and interactions between features.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

def relu(z):
    return np.maximum(0, z)

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

x = np.array([0.5, -1.0, 2.0])          # three input features
w = np.array([0.8, 0.2, -0.5])          # one weight per input
b = 0.1

z = np.dot(w, x) + b                    # weighted sum plus bias
print("pre-activation:", round(z, 3))
print("relu:", round(relu(z), 3), " sigmoid:", round(sigmoid(z), 3))` },
        { type: 'note', value: 'Without a non-linear activation, stacking layers would still collapse into one linear function. The activation is what makes depth useful.' },
      ],
    },
    {
      id: 'ml-forward-training',
      title: 'Forward pass and training',
      blocks: [
        { type: 'text', value: 'A forward pass sends inputs through the layers to get a prediction. Training compares the prediction with the label using a loss, then uses backpropagation to compute how each weight contributed to the error, and updates the weights with gradient descent.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

# Learn y = 2x + 1 with one neuron and gradient descent
x = np.linspace(0, 1, 20)
y = 2 * x + 1

w, b = 0.0, 0.0
lr = 0.5
for epoch in range(500):
    pred = w * x + b
    error = pred - y
    w -= lr * 2 * np.mean(error * x)
    b -= lr * 2 * np.mean(error)

print("learned w=%.2f b=%.2f" % (w, b))` },
        { type: 'list', items: [
          'Loss: a number that says how wrong the prediction is',
          'Backpropagation: the chain rule applied layer by layer',
          'Epoch: one full pass over the training data',
          'Batch size: how many examples are used per update',
        ] },
      ],
    },
    {
      id: 'ml-frameworks',
      title: 'Using a deep learning framework',
      blocks: [
        { type: 'text', value: 'In practice you use a framework such as PyTorch or Keras. It computes gradients automatically and runs on GPUs. The code below shows the shape of a small classifier. It needs a deep learning install, so it is read-only here.' },
        { type: 'code', lang: 'python', tryIt: false, value: `import torch
from torch import nn

model = nn.Sequential(
    nn.Linear(10, 32),
    nn.ReLU(),
    nn.Linear(32, 1),
    nn.Sigmoid(),
)

loss_fn = nn.BCELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

def train_step(X, y):
    optimizer.zero_grad()
    loss = loss_fn(model(X).squeeze(1), y)
    loss.backward()
    optimizer.step()
    return loss.item()` },
        { type: 'note', value: 'Neural networks need much more data than tree models to beat them on tabular problems. For small tables, start with boosting; reach for deep learning for images, text and audio.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'neural-networks',
      q: 'Why does a network need a non-linear activation?',
      options: ['To make it faster', 'Without it, stacked layers collapse into one linear function', 'To store the labels', 'To remove the bias'],
      answer: 1,
      explain: 'Non-linearity lets depth learn curved patterns.',
    },
    {
      chapterId: 'neural-networks',
      q: 'What does backpropagation compute?',
      options: ['The test score', 'How much each weight contributed to the error', 'The dataset size', 'The batch count'],
      answer: 1,
      explain: 'Gradients flow backward through the layers.',
    },
    {
      chapterId: 'neural-networks',
      q: 'What is one epoch?',
      options: ['One weight', 'One full pass over the training data', 'One prediction', 'One layer'],
      answer: 1,
      explain: 'An epoch sees every training example once.',
    },
    {
      chapterId: 'neural-networks',
      q: 'For small tabular data, which is usually the better first choice?',
      options: ['A deep network', 'Gradient boosting', 'A random number generator', 'No model'],
      answer: 1,
      explain: 'Boosting is strong and quick on tabular data.',
    },
  ],
};
