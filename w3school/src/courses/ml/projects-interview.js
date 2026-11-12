// ML chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build an end-to-end model and prepare for ML interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'ml-project-price',
      title: 'Project: house price predictor',
      blocks: [
        { type: 'text', value: 'Build a complete project: load a table, explore it, prepare the features in a pipeline, compare two models with cross-validation, tune one, evaluate once on a held-out test set, and save the result. This covers the whole workflow in one place.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_absolute_error

rng = np.random.default_rng(10)
n = 500
df = pd.DataFrame({
    "size": rng.uniform(600, 2200, n),
    "rooms": rng.integers(1, 5, n),
    "age": rng.uniform(0, 30, n),
    "district": rng.choice(["Gulshan", "Mirpur", "Dhanmondi", "Uttara"], n),
})
df["price"] = (
    4000 * df["size"] + 200000 * df["rooms"] - 40000 * df["age"]
    + df["district"].map({"Gulshan": 900000, "Dhanmondi": 500000, "Uttara": 200000, "Mirpur": 0})
    + rng.normal(0, 150000, n)
)

X = df.drop(columns="price")
y = df["price"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

prep = ColumnTransformer([
    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), ["size", "rooms", "age"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["district"]),
])

candidates = {
    "ridge": make_pipeline(prep, Ridge(alpha=1.0)),
    "boosting": make_pipeline(prep, HistGradientBoostingRegressor(random_state=0)),
}

for name, model in candidates.items():
    scores = cross_val_score(model, X_train, y_train, cv=5, scoring="neg_mean_absolute_error")
    print("%-9s CV MAE %9.0f" % (name, -scores.mean()))

best = candidates["boosting"].fit(X_train, y_train)
test_mae = mean_absolute_error(y_test, best.predict(X_test))
print("final test MAE: %.0f" % test_mae)` },
        { type: 'list', items: [
          'Explain each step in one sentence in your README',
          'Show the baseline before the fancy model',
          'Report the metric in the target unit',
          'Save the pipeline and write a small predict script',
        ] },
        { type: 'note', value: 'A finished, honest project with a clear baseline beats a complicated notebook with a suspicious 99 percent score.' },
      ],
    },
    {
      id: 'ml-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Supervised versus unsupervised learning?',
          'Bias versus variance?',
          'Precision versus recall: which do you optimize and when?',
          'What is data leakage and how do you prevent it?',
          'Why cross-validation instead of one split?',
          'How does gradient descent work?',
          'Random forest versus gradient boosting?',
          'How would you monitor a model in production?',
        ] },
        { type: 'text', value: 'Strong answers name the trade-off and a concrete example. "I would optimize recall for fraud, because a missed case costs more than a false alarm" shows judgment, not only definitions.' },
        { type: 'note', value: 'Be ready to walk through a project from raw data to a saved model, and to explain one mistake you made and how you found it.' },
      ],
    },
    {
      id: 'ml-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1-2: Python basics, NumPy and pandas',
          'Week 3: EDA and linear regression from scratch',
          'Week 4: classification, metrics and the confusion matrix',
          'Week 5: evaluation, cross-validation and pipelines',
          'Week 6: trees and boosting on real tables',
          'Week 7: clustering, PCA and an introduction to neural networks',
          'Week 8: finish one end-to-end project and deploy it',
        ] },
        { type: 'note', value: 'Most real ML skill is data work and evaluation. Spend more time on those than on the newest model architecture.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Why build a baseline model first?',
      options: ['It is always the best model', 'It gives a reference that shows whether a fancy model adds real value', 'It removes the need for a test set', 'It is required by scikit-learn'],
      answer: 1,
      explain: 'A simple baseline shows how much the complex model actually improves.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which score is reported honestly at the very end of the project?',
      options: ['The cross-validation score during tuning', 'The single final test score, used once', 'The training score', 'The best fold score'],
      answer: 1,
      explain: 'The final test set is used once to avoid optimistic bias.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is bias versus variance in one sentence?',
      options: ['Bias is error from wrong assumptions; variance is error from sensitivity to the training data', 'Bias is speed; variance is memory', 'They are the same', 'Bias is the label; variance is the feature'],
      answer: 0,
      explain: 'High bias underfits; high variance overfits.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why report MAE in the target unit?',
      options: ['It is easier for non-experts to judge the error size', 'It is always smaller', 'It hides the error', 'It is required for classification'],
      answer: 0,
      explain: 'An error in Taka or dollars is easy to understand.',
    },
  ],
};
