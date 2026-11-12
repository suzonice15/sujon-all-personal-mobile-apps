// ML chapter: Classification.

export default {
  id: 'classification',
  title: 'Classification',
  description: 'Logistic regression, probabilities and the confusion matrix',
  icon: 'category',
  lessons: [
    {
      id: 'ml-logistic',
      title: 'Logistic regression and probabilities',
      blocks: [
        { type: 'text', value: 'Despite its name, logistic regression is a classifier. It computes a weighted sum like linear regression, then squashes it with the sigmoid function into a probability between 0 and 1. Above a threshold, such as 0.5, it predicts the positive class.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import math

def sigmoid(z):
    return 1 / (1 + math.exp(-z))

for z in [-4, -1, 0, 1, 4]:
    print(z, round(sigmoid(z), 3))

# A toy spam score: more suspicious words -> higher score
w, b = 1.2, -2.0
for suspicious_words in [0, 1, 2, 3]:
    p = sigmoid(w * suspicious_words + b)
    print("words:", suspicious_words, "spam probability:", round(p, 2))` },
        { type: 'note', value: 'The output is a probability, not just a label. Keep the probability: you can choose a different threshold later for a fraud check, where missing fraud costs more.' },
      ],
    },
    {
      id: 'ml-confusion',
      title: 'The confusion matrix',
      blocks: [
        { type: 'text', value: 'Accuracy alone can hide problems. On a dataset where 99 percent are normal, a model that always says normal has 99 percent accuracy and catches zero fraud. The confusion matrix shows each kind of mistake separately.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score

y_true = np.array([1, 0, 1, 1, 0, 0, 1, 0, 0, 0])
y_pred = np.array([1, 0, 0, 1, 0, 1, 1, 0, 0, 0])

print(confusion_matrix(y_true, y_pred))   # rows: actual, columns: predicted
print("precision:", round(precision_score(y_true, y_pred), 2))
print("recall:   ", round(recall_score(y_true, y_pred), 2))
print("f1:       ", round(f1_score(y_true, y_pred), 2))` },
        { type: 'list', items: [
          'Precision: of the predicted positives, how many were right',
          'Recall: of the actual positives, how many did we find',
          'F1: the harmonic mean of precision and recall',
          'Choose the metric from the cost of each mistake, not habit',
        ] },
      ],
    },
    {
      id: 'ml-classifier-fit',
      title: 'Training a classifier',
      blocks: [
        { type: 'text', value: 'In scikit-learn, every model follows the same pattern: create it, call fit on training data, call predict or predict_proba on new data. Once you know the pattern, swapping models is one line.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

data = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(
    data.data, data.target, test_size=0.25, random_state=1, stratify=data.target
)

clf = LogisticRegression(max_iter=5000)
clf.fit(X_train, y_train)

pred = clf.predict(X_test)
proba = clf.predict_proba(X_test)[:, 1]
print("accuracy: %.3f" % accuracy_score(y_test, pred))
print("first 3 probabilities:", proba[:3].round(3))
print(classification_report(y_test, pred, target_names=data.target_names))` },
        { type: 'note', value: 'stratify=y keeps the class balance the same in train and test. Without it, a rare class can end up almost missing from the test set.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'classification',
      q: 'What does the sigmoid function output?',
      options: ['Any number', 'A value between 0 and 1', 'A category name', 'The gradient'],
      answer: 1,
      explain: 'Sigmoid maps any number into a probability-like range.',
    },
    {
      chapterId: 'classification',
      q: 'Why is accuracy misleading on imbalanced data?',
      options: ['It is always negative', 'A model that predicts the majority class can score high', 'It ignores the labels', 'It needs no test set'],
      answer: 1,
      explain: 'Always predicting the common class can look accurate and still be useless.',
    },
    {
      chapterId: 'classification',
      q: 'What is recall?',
      options: ['Of predicted positives, how many were right', 'Of actual positives, how many were found', 'The average of all errors', 'The training time'],
      answer: 1,
      explain: 'Recall measures how many real positives the model catches.',
    },
    {
      chapterId: 'classification',
      q: 'What does stratify=y do in train_test_split?',
      options: ['Sorts the labels', 'Keeps class proportions the same in both splits', 'Removes classes', 'Doubles the data'],
      answer: 1,
      explain: 'Stratification preserves the class balance in train and test.',
    },
  ],
};
