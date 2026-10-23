// Python chapter: Machine Learning with scikit-learn. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// scikit-learn runs inside Try it (it downloads about 10 MB the first time).

export default {
  id: 'machine-learning',
  title: 'Machine Learning with scikit-learn',
  description: 'The ML workflow, regression, classification, pipelines, evaluation and clustering',
  icon: 'smart-toy',
  lessons: [
    {
      id: 'py-ml-intro',
      title: 'What Machine Learning Is',
      blocks: [
        { type: 'text', value: 'Machine learning finds patterns in examples instead of following rules you wrote. You give a model features (inputs, X) and, for supervised learning, the correct answers (labels, y). It learns a function that predicts y for new X.' },
        { type: 'list', items: [
          'Regression: predict a number (house price, delivery time, next month\'s sales).',
          'Classification: predict a category (spam or not, which course a student will pick, fraud or not).',
          'Clustering (unsupervised): group similar things without labels (customer segments).',
          'The workflow: collect data -> clean -> split into train/test -> train -> evaluate on test data -> tune -> deploy -> monitor.',
          'Golden rule: never evaluate on the data you trained on. Test data must stay unseen.',
        ] },
      ],
    },
    {
      id: 'py-ml-regression',
      title: 'Regression: Predicting Numbers',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

# Synthetic flat prices in Dhaka: price depends on size, rooms and distance to the centre
rng = np.random.default_rng(42)
n = 400
size = rng.uniform(600, 2200, n)            # square feet
rooms = rng.integers(1, 5, n)
distance = rng.uniform(1, 20, n)            # km
price = 4000 * size + 300_000 * rooms - 150_000 * distance + rng.normal(0, 400_000, n)

X = np.column_stack([size, rooms, distance])
X_train, X_test, y_train, y_test = train_test_split(X, price, test_size=0.2, random_state=0)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)

print("coefficients:", model.coef_.round(0))
print(f"MAE: {mean_absolute_error(y_test, pred):,.0f} Tk   R2: {r2_score(y_test, pred):.3f}")

new_flat = [[1200, 3, 5]]
print(f"Predicted price: {model.predict(new_flat)[0]:,.0f} Tk")` },
        { type: 'note', value: 'MAE (mean absolute error) is in the same unit as the target, so it is easy to explain. R2 = 1.0 is perfect; 0 means no better than always predicting the average.' },
      ],
    },
    {
      id: 'py-ml-classification',
      title: 'Classification and Evaluation',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

data = load_breast_cancer()
X, y = data.data, data.target                      # 569 tumours, 30 features, 0 = malignant, 1 = benign
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, stratify=y, random_state=1)

for model in [LogisticRegression(max_iter=5000), RandomForestClassifier(n_estimators=200, random_state=1)]:
    model.fit(X_train, y_train)
    print(f"{type(model).__name__}: accuracy {accuracy_score(y_test, model.predict(X_test)):.3f}")

forest = model
pred = forest.predict(X_test)
print(confusion_matrix(y_test, pred))
print(classification_report(y_test, pred, target_names=data.target_names))

top = sorted(zip(forest.feature_importances_, data.feature_names), reverse=True)[:3]
print("Most important features:", [str(name) for _, name in top])
print("Probability benign for the first 3 test samples:", forest.predict_proba(X_test[:3])[:, 1].round(2))` },
        { type: 'list', items: [
          'Accuracy can lie when classes are imbalanced (99% "not fraud" is easy). Look at precision and recall.',
          'Precision: of the items predicted positive, how many really were? Recall: of the real positives, how many did we find?',
          'stratify=y keeps the class balance the same in train and test splits.',
        ] },
      ],
    },
    {
      id: 'py-ml-pipelines',
      title: 'Pipelines, Preprocessing and Cross-Validation',
      blocks: [
        { type: 'text', value: 'Real data has text categories and different scales. A Pipeline chains preprocessing and the model, so exactly the same steps run during training and prediction, and nothing from the test data leaks into training.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score, GridSearchCV

rng = np.random.default_rng(0)
n = 600
df = pd.DataFrame({
    "hours_per_week": rng.uniform(0, 20, n),
    "quizzes_done": rng.integers(0, 30, n).astype(float),
    "device": rng.choice(["android", "ios", "web"], n),
    "city": rng.choice(["Dhaka", "Chattogram", "Sylhet", "Khulna"], n),
})
df.loc[rng.choice(n, 30, replace=False), "quizzes_done"] = np.nan          # missing values
logit = 0.25 * df["hours_per_week"] + 0.1 * df["quizzes_done"].fillna(10) - 4 + (df["device"] == "web") * 0.5
df["completed"] = (rng.random(n) < 1 / (1 + np.exp(-logit))).astype(int)

X, y = df.drop(columns="completed"), df["completed"]

preprocess = ColumnTransformer([
    ("num", Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler())]),
     ["hours_per_week", "quizzes_done"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["device", "city"]),
])
pipe = Pipeline([("prep", preprocess), ("model", LogisticRegression(max_iter=1000))])

scores = cross_val_score(pipe, X, y, cv=5)                   # 5 different train/test splits
print("CV accuracy:", scores.round(3), "mean", scores.mean().round(3))

search = GridSearchCV(pipe, {"model__C": [0.01, 0.1, 1, 10]}, cv=5)
search.fit(X, y)
print("best C:", search.best_params_, "score", round(search.best_score_, 3))

student = pd.DataFrame([{"hours_per_week": 12, "quizzes_done": 20, "device": "web", "city": "Sylhet"}])
print("Chance to complete the course:", search.predict_proba(student)[0][1].round(2))` },
        { type: 'note', value: 'Save a trained pipeline with joblib.dump(pipe, "model.joblib") and load it in your FastAPI app with joblib.load() to serve predictions.' },
      ],
    },
    {
      id: 'py-ml-clustering',
      title: 'Clustering and Overfitting',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split

# Customer segments from spending (no labels!)
rng = np.random.default_rng(5)
budget = rng.normal([[500, 2]], [[150, 1]], (60, 2))
regular = rng.normal([[3000, 8]], [[600, 2]], (60, 2))
vip = rng.normal([[12000, 20]], [[2000, 4]], (30, 2))
X = np.vstack([budget, regular, vip])                     # [monthly spend, orders]

km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(StandardScaler().fit_transform(X))
for label in range(3):
    group = X[km.labels_ == label]
    print(f"segment {label}: {len(group):3d} customers, avg spend {group[:, 0].mean():7,.0f} Tk, avg orders {group[:, 1].mean():.1f}")

# Overfitting: a very deep tree memorises training data
x = rng.uniform(0, 10, 200).reshape(-1, 1)
y = np.sin(x).ravel() + rng.normal(0, 0.3, 200)
x_tr, x_te, y_tr, y_te = train_test_split(x, y, random_state=0)
for depth in [2, 4, 20]:
    tree = DecisionTreeRegressor(max_depth=depth, random_state=0).fit(x_tr, y_tr)
    print(f"depth {depth:2d}: train R2 {tree.score(x_tr, y_tr):.2f}  test R2 {tree.score(x_te, y_te):.2f}")` },
        { type: 'note', value: 'Next steps: deep learning with PyTorch, and building AI features with LLM APIs (for example the Anthropic or OpenAI Python SDKs) plus embeddings for search. The data skills from this chapter are the foundation for all of them.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'machine-learning', q: 'Predicting a house price is which kind of task?', options: ['Classification', 'Regression', 'Clustering', 'Sorting'], answer: 1, explain: 'The target is a continuous number.' },
    { chapterId: 'machine-learning', q: 'Why split data into train and test sets?', options: ['To train faster', 'To measure performance on data the model has never seen', 'To save memory', 'It is required by Python'], answer: 1, explain: 'Scores on training data are overly optimistic.' },
    { chapterId: 'machine-learning', q: 'A model scores 99% on training data but 60% on test data. This is...', options: ['Underfitting', 'Overfitting', 'A perfect model', 'Data leakage prevention'], answer: 1, explain: 'It memorised the training data instead of learning general patterns.' },
    { chapterId: 'machine-learning', q: 'What does recall measure?', options: ['Speed of the model', 'Of all real positives, how many the model found', 'Of predicted positives, how many were right', 'The training time'], answer: 1, explain: 'High recall matters when missing a positive is costly (disease, fraud).' },
    { chapterId: 'machine-learning', q: 'Why use an sklearn Pipeline?', options: ['To make plots', 'To apply identical preprocessing in training and prediction and avoid leakage', 'To use threads', 'To download data'], answer: 1, explain: 'Scaling, encoding and the model are fitted together.' },
    { chapterId: 'machine-learning', q: 'Which algorithm groups customers without labels?', options: ['LinearRegression', 'LogisticRegression', 'KMeans', 'RandomForestClassifier'], answer: 2, explain: 'KMeans is unsupervised clustering.' },
  ],
};
