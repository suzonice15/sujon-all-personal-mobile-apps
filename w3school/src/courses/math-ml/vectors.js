// Math for ML chapter: Vectors.

export default {
  id: 'vectors',
  title: 'Vectors',
  description: 'Lengths, dot products and similarity',
  icon: 'arrow-outward',
  lessons: [
    {
      id: 'mml-vectors',
      title: 'What is a vector?',
      blocks: [
        { type: 'text', value: 'A vector is an ordered list of numbers. A flat with size 1200, 3 rooms and age 5 is a vector with three components. In ML, every example is a vector of features, so vectors are the basic data unit.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

flat = np.array([1200, 3, 5])   # size, rooms, age
print("components:", flat)
print("number of features:", flat.size)

# Adding and scaling work element by element
print("scaled by 2:", flat * 2)
print("plus another flat:", flat + np.array([300, 1, 2]))` },
        { type: 'note', value: 'Features on different scales can dominate distance calculations. Size in square feet is much bigger than rooms, so scaling often matters before comparing vectors.' },
      ],
    },
    {
      id: 'mml-dot-norm',
      title: 'Dot product and length',
      blocks: [
        { type: 'text', value: 'The dot product multiplies matching components and adds the results. It is the core operation of a linear model: the prediction is the dot product of weights and features. The norm is the length of a vector, the square root of its dot product with itself.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

a = np.array([3.0, 4.0])
b = np.array([1.0, 2.0])

print("dot product:", a @ b)              # 3*1 + 4*2 = 11
print("length of a:", np.linalg.norm(a)) # sqrt(3^2 + 4^2) = 5
print("length check:", np.sqrt(a @ a))

# A linear model: prediction = weights . features + bias
weights = np.array([0.5, 2.0])
features = np.array([10.0, 3.0])
bias = 1.0
print("prediction:", weights @ features + bias)` },
        { type: 'note', value: 'Read the dot product as "how much do these two vectors point the same way, weighted by size". That reading explains most of linear algebra in ML.' },
      ],
    },
    {
      id: 'mml-similarity',
      title: 'Cosine similarity',
      blocks: [
        { type: 'text', value: 'Cosine similarity measures the angle between two vectors and ignores their length. It is 1 when they point the same way, 0 when they are unrelated, and -1 when they are opposite. Search engines and recommenders use it to compare documents and users.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

def cosine(u, v):
    return (u @ v) / (np.linalg.norm(u) * np.linalg.norm(v))

# Word counts for three course descriptions: python, data, design
python_course = np.array([5, 4, 0])
data_course = np.array([3, 6, 0])
design_course = np.array([0, 1, 7])

print("python vs data:  %.3f" % cosine(python_course, data_course))
print("python vs design: %.3f" % cosine(python_course, design_course))

# Doubling a vector does not change its similarity
print("python vs 2x python: %.3f" % cosine(python_course, 2 * python_course))` },
        { type: 'note', value: 'Cosine ignores length on purpose. A long article and a short one about the same topic should look similar.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'vectors',
      q: 'What does a feature vector represent in ML?',
      options: ['A single number', 'One example described by its features', 'The model weights only', 'A chart'],
      answer: 1,
      explain: 'Each example is a vector of feature values.',
    },
    {
      chapterId: 'vectors',
      q: 'For a = [3, 4], what is the length of a?',
      options: ['5', '7', '12', '25'],
      answer: 0,
      explain: 'The length is the square root of 3 squared plus 4 squared, which is 5.',
    },
    {
      chapterId: 'vectors',
      q: 'What does cosine similarity of 1 mean?',
      options: ['The vectors are opposite', 'The vectors point the same way', 'The vectors are unrelated', 'The vectors are empty'],
      answer: 1,
      explain: 'A cosine of 1 means the angle between them is zero.',
    },
    {
      chapterId: 'vectors',
      q: 'Why does cosine similarity ignore vector length?',
      options: ['It is a bug', 'It compares direction, so a long and a short document on one topic still match', 'Lengths are always equal', 'It uses the sum instead'],
      answer: 1,
      explain: 'Cosine measures the angle, not the magnitude.',
    },
  ],
};
