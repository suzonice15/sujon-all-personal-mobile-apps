// ML chapter: Model Evaluation and Generalization.

export default {
  id: 'evaluation',
  title: 'Evaluation & Generalization',
  description: 'Overfitting, cross-validation and regularization',
  icon: 'fact-check',
  lessons: [
    {
      id: 'ml-overfit',
      title: 'Overfitting and underfitting',
      blocks: [
        { type: 'text', value: 'A model that memorizes the training data scores perfectly there and badly on new data. That is overfitting. A model too simple to capture the pattern is underfitting. The goal is to generalize: work well on data it has never seen.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split

rng = np.random.default_rng(0)
x = np.sort(rng.uniform(-3, 3, 40)).reshape(-1, 1)
y = np.sin(x).ravel() + rng.normal(0, 0.2, 40)
x_tr, x_te, y_tr, y_te = train_test_split(x, y, test_size=0.3, random_state=0)

for degree in [1, 4, 15]:
    model = make_pipeline(PolynomialFeatures(degree), LinearRegression())
    model.fit(x_tr, y_tr)
    print("degree %2d  train R2 %.2f  test R2 %.2f" % (
        degree, model.score(x_tr, y_tr), model.score(x_te, y_te)))` },
        { type: 'note', value: 'Degree 15 gets the best training score and a poor test score. That gap between training and test is the signature of overfitting.' },
      ],
    },
    {
      id: 'ml-cross-validation',
      title: 'Cross-validation',
      blocks: [
        { type: 'text', value: 'One test split can be lucky or unlucky. Cross-validation splits the training data into k folds, trains on k-1 and tests on the held-out fold, then repeats so every fold is tested once. The average and the spread give a more reliable score.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_breast_cancer(return_X_y=True)
model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=5000))

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
scores = cross_val_score(model, X, y, cv=cv, scoring="accuracy")
print("fold scores:", scores.round(3))
print("mean %.3f  std %.3f" % (scores.mean(), scores.std()))` },
        { type: 'list', items: [
          'Use the cross-validation mean to compare models and choose settings',
          'Keep a final test set that you touch only once at the end',
          'Put the scaler inside the pipeline so it is fitted per fold',
        ] },
      ],
    },
    {
      id: 'ml-regularization',
      title: 'Regularization',
      blocks: [
        { type: 'text', value: 'Regularization adds a penalty for large weights, which discourages the model from relying on any single feature too heavily. Ridge uses an L2 penalty, which shrinks weights smoothly. Lasso uses an L1 penalty, which can set some weights to exactly zero.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np
from sklearn.linear_model import Ridge, Lasso
from sklearn.model_selection import train_test_split

rng = np.random.default_rng(3)
X = rng.normal(size=(60, 10))
y = 3 * X[:, 0] - 2 * X[:, 1] + rng.normal(0, 0.5, 60)   # only 2 features matter
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0)

for name, model in [("ridge", Ridge(alpha=1.0)), ("lasso", Lasso(alpha=0.1))]:
    model.fit(X_tr, y_tr)
    zeros = int(np.sum(np.isclose(model.coef_, 0)))
    print("%s  test R2 %.2f  zero weights %d" % (name, model.score(X_te, y_te), zeros))` },
        { type: 'note', value: 'alpha controls the strength of the penalty. Tune it with cross-validation rather than picking a number from a blog post.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'evaluation',
      q: 'What is the sign of overfitting?',
      options: ['Low training score and low test score', 'High training score and much lower test score', 'Equal scores everywhere', 'Training takes too long'],
      answer: 1,
      explain: 'The model memorized the training data and did not generalize.',
    },
    {
      chapterId: 'evaluation',
      q: 'What does k-fold cross-validation give you?',
      options: ['One lucky score', 'A score for each fold, so you can see the average and spread', 'A larger dataset', 'A faster model'],
      answer: 1,
      explain: 'Every fold is tested once, giving a more reliable estimate.',
    },
    {
      chapterId: 'evaluation',
      q: 'Which penalty can set some weights to exactly zero?',
      options: ['L2 (Ridge)', 'L1 (Lasso)', 'No penalty', 'Dropout'],
      answer: 1,
      explain: 'L1 regularization performs feature selection.',
    },
    {
      chapterId: 'evaluation',
      q: 'Why should a final test set be used only once?',
      options: ['It is too small', 'Repeated use lets you tune to it and inflates the score', 'It expires', 'It is encrypted'],
      answer: 1,
      explain: 'Once you tune on the test set, it is no longer an honest test.',
    },
  ],
};
