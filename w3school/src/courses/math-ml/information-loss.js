// Math for ML chapter: Information theory and loss functions.

export default {
  id: 'information-loss',
  title: 'Information & Loss',
  description: 'Entropy, cross-entropy and KL divergence',
  icon: 'hub',
  lessons: [
    {
      id: 'mml-entropy',
      title: 'Entropy: uncertainty in bits',
      blocks: [
        { type: 'text', value: 'Entropy measures how uncertain a distribution is. A fair coin has the most uncertainty for two outcomes, one bit. A very biased coin is predictable and has low entropy. Decision trees use this idea when they choose splits.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

def entropy(p):
    p = np.array(p, dtype=float)
    p = p[p > 0]
    return -np.sum(p * np.log2(p))

print("fair coin:   %.3f bits" % entropy([0.5, 0.5]))
print("biased 0.9:  %.3f bits" % entropy([0.9, 0.1]))
print("certain:     %.3f bits" % entropy([1.0, 0.0]))` },
        { type: 'note', value: 'A split that makes each child group more uniform reduces entropy. That reduction, called information gain, is the signal a decision tree follows.' },
      ],
    },
    {
      id: 'mml-cross-entropy',
      title: 'Cross-entropy and log loss',
      blocks: [
        { type: 'text', value: 'Cross-entropy measures how well predicted probabilities match the true labels. For a binary label, log loss is the average of minus log of the probability given to the correct answer. It punishes confident wrong predictions heavily, which pushes the model to be honest about uncertainty.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

y = np.array([1, 0, 1, 1])                # true labels
p_good = np.array([0.9, 0.1, 0.8, 0.95])  # confident and right
p_bad = np.array([0.1, 0.9, 0.2, 0.05])   # confident and wrong

def log_loss(y, p):
    return -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))

print("good model log loss: %.3f" % log_loss(y, p_good))
print("bad model log loss:  %.3f" % log_loss(y, p_bad))` },
        { type: 'note', value: 'Accuracy only sees whether each prediction is on the right side of 0.5. Log loss also sees how confident the model was, which is why it trains better for classification.' },
      ],
    },
    {
      id: 'mml-kl',
      title: 'KL divergence',
      blocks: [
        { type: 'text', value: 'KL divergence measures how far one distribution Q is from another distribution P. It is zero only when they are identical, and it is not symmetric: KL(P || Q) is usually not equal to KL(Q || P). Variational methods and some generative models use it.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

def kl(p, q):
    p, q = np.array(p, dtype=float), np.array(q, dtype=float)
    return np.sum(p * np.log2(p / q))

p = [0.5, 0.5]
q = [0.9, 0.1]
print("KL(P || Q): %.3f" % kl(p, q))
print("KL(Q || P): %.3f" % kl(q, p))
print("KL(P || P): %.3f" % kl(p, p))` },
        { type: 'note', value: 'KL divergence is not a distance in the strict sense because it is not symmetric. Always state which direction you mean.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'information-loss',
      q: 'What is the entropy of a fair coin in bits?',
      options: ['0', '0.5', '1', '2'],
      answer: 2,
      explain: 'Two equally likely outcomes give exactly one bit.',
    },
    {
      chapterId: 'information-loss',
      q: 'Why does log loss punish confident wrong predictions heavily?',
      options: ['It is a bug', 'Minus log of a tiny probability for the correct answer is very large', 'It ignores them', 'Log is always negative'],
      answer: 1,
      explain: 'The loss grows without bound as the probability for the true label goes to zero.',
    },
    {
      chapterId: 'information-loss',
      q: 'When is KL divergence zero?',
      options: ['Always', 'When the two distributions are identical', 'When the entropy is one', 'Never'],
      answer: 1,
      explain: 'Only identical distributions have zero divergence.',
    },
    {
      chapterId: 'information-loss',
      q: 'Is KL divergence symmetric?',
      options: ['Yes, always', 'No, KL(P || Q) is usually not equal to KL(Q || P)', 'Only for coins', 'It is not defined'],
      answer: 1,
      explain: 'The direction matters, so it is not a true distance.',
    },
  ],
};
