// ML chapter: Decision Trees and Ensembles.

export default {
  id: 'trees-ensembles',
  title: 'Trees & Ensembles',
  description: 'Decision trees, random forests and gradient boosting',
  icon: 'account-tree',
  lessons: [
    {
      id: 'ml-decision-tree',
      title: 'Decision trees',
      blocks: [
        { type: 'text', value: 'A decision tree asks a series of yes-or-no questions about the features, such as is size above 1000. Each answer narrows the path to a leaf that gives the prediction. Trees are easy to explain and need almost no preprocessing.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text

iris = load_iris()
X_tr, X_te, y_tr, y_te = train_test_split(iris.data, iris.target, test_size=0.3, random_state=0)

tree = DecisionTreeClassifier(max_depth=3, random_state=0).fit(X_tr, y_tr)
print("test accuracy: %.3f" % tree.score(X_te, y_te))
print(export_text(tree, feature_names=list(iris.feature_names)))` },
        { type: 'note', value: 'A deep tree memorizes the training data. Limit max_depth or min_samples_leaf to keep it general.' },
      ],
    },
    {
      id: 'ml-random-forest',
      title: 'Random forests',
      blocks: [
        { type: 'text', value: 'A random forest trains many trees, each on a random sample of rows and features, then averages their votes. Individual trees overfit in different ways, and averaging cancels much of that noise.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier

X, y = load_breast_cancer(return_X_y=True)

for name, model in [
    ("single tree", DecisionTreeClassifier(random_state=0)),
    ("random forest", RandomForestClassifier(n_estimators=200, random_state=0)),
]:
    scores = cross_val_score(model, X, y, cv=5)
    print("%-14s mean accuracy %.3f" % (name, scores.mean()))` },
        { type: 'list', items: [
          'Bagging: each tree sees a bootstrap sample of rows',
          'Feature sampling: each split considers only some features',
          'Feature importance tells you which inputs the forest relied on',
        ] },
      ],
    },
    {
      id: 'ml-boosting',
      title: 'Gradient boosting',
      blocks: [
        { type: 'text', value: 'Boosting builds trees one after another. Each new tree focuses on the mistakes of the trees before it. Gradient boosting libraries such as XGBoost, LightGBM and scikit-learn HistGradientBoosting are often the strongest choice for tabular data.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import HistGradientBoostingClassifier, RandomForestClassifier

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=2)

forest = RandomForestClassifier(n_estimators=200, random_state=0).fit(X_tr, y_tr)
boost = HistGradientBoostingClassifier(learning_rate=0.1, random_state=0).fit(X_tr, y_tr)

print("forest test accuracy: %.3f" % forest.score(X_te, y_te))
print("boosting test accuracy: %.3f" % boost.score(X_te, y_te))` },
        { type: 'note', value: 'Boosting is powerful but can overfit if you add too many trees or a high learning rate. Tune it with validation data and early stopping.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'trees-ensembles',
      q: 'What does a decision tree split on?',
      options: ['Random numbers', 'Yes-or-no questions about feature thresholds', 'The labels only', 'The test set'],
      answer: 1,
      explain: 'Each node asks a threshold question about one feature.',
    },
    {
      chapterId: 'trees-ensembles',
      q: 'How does a random forest reduce overfitting compared with one tree?',
      options: ['It uses fewer rows', 'It averages many diverse trees', 'It removes features', 'It stops early'],
      answer: 1,
      explain: 'Averaging decorrelated trees cancels much of the noise.',
    },
    {
      chapterId: 'trees-ensembles',
      q: 'How does gradient boosting build its trees?',
      options: ['All at the same time, independently', 'One after another, each correcting earlier errors', 'Randomly', 'It builds none'],
      answer: 1,
      explain: 'Each tree focuses on what the previous trees got wrong.',
    },
    {
      chapterId: 'trees-ensembles',
      q: 'What is the main risk of too many boosting rounds?',
      options: ['Underfitting only', 'Overfitting to the training data', 'Slower prediction only', 'Missing labels'],
      answer: 1,
      explain: 'Boosting can keep fitting noise if it is not controlled.',
    },
  ],
};
