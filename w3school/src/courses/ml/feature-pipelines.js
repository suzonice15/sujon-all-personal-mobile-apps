// ML chapter: Feature Engineering and Pipelines.

export default {
  id: 'feature-pipelines',
  title: 'Features & Pipelines',
  description: 'Scaling, encoding and leak-free preprocessing',
  icon: 'tune',
  lessons: [
    {
      id: 'ml-scaling-encoding',
      title: 'Scaling and encoding',
      blocks: [
        { type: 'text', value: 'Many models need numbers on comparable scales. Scaling rescales numeric features. Categories such as district names must become numbers too; one-hot encoding creates one yes-or-no column per category.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder

df = pd.DataFrame({
    "size": [1200, 800, 1500, 950],
    "district": ["Gulshan", "Mirpur", "Dhanmondi", "Mirpur"],
})

scaled = StandardScaler().fit_transform(df[["size"]])
print("scaled size:", scaled.ravel().round(2))

encoder = OneHotEncoder(sparse_output=False)
onehot = encoder.fit_transform(df[["district"]])
print(encoder.get_feature_names_out())
print(onehot)` },
        { type: 'note', value: 'Tree-based models do not need scaling. Linear models, neural networks and distance-based models usually do.' },
      ],
    },
    {
      id: 'ml-pipeline',
      title: 'Pipelines and ColumnTransformer',
      blocks: [
        { type: 'text', value: 'A Pipeline chains preprocessing and a model into one object. Calling fit on the pipeline fits every step on training data only, which prevents data leakage. A ColumnTransformer applies different steps to different columns.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

rng = np.random.default_rng(5)
n = 200
df = pd.DataFrame({
    "size": rng.uniform(600, 2200, n),
    "age": rng.uniform(0, 30, n),
    "district": rng.choice(["Gulshan", "Mirpur", "Dhanmondi"], n),
})
df.loc[rng.choice(n, 10, replace=False), "age"] = np.nan
df["price"] = 4000 * df["size"] - 50000 * df["age"].fillna(10) + rng.normal(0, 200000, n)

X_tr, X_te, y_tr, y_te = train_test_split(df.drop(columns="price"), df["price"], test_size=0.2, random_state=0)

prep = ColumnTransformer([
    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), ["size", "age"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["district"]),
])

model = make_pipeline(prep, LinearRegression()).fit(X_tr, y_tr)
print("test R2: %.3f" % model.score(X_te, y_te))` },
        { type: 'note', value: 'handle_unknown="ignore" stops the app from crashing when production sees a district that was not in training data.' },
      ],
    },
    {
      id: 'ml-leakage',
      title: 'Data leakage',
      blocks: [
        { type: 'text', value: 'Data leakage means information that would not be available at prediction time sneaks into training. It gives a suspiciously high score that collapses in production. Common sources: scaling before the split, using a future value as a feature, or an ID column that encodes the answer.' },
        { type: 'list', items: [
          'Split first, then fit every preprocessing step on training data',
          'Ask: would I know this value when the prediction is made?',
          'Be suspicious of a near-perfect score',
          'Use pipelines so the rules are applied the same way everywhere',
        ] },
        { type: 'note', value: 'A model with 99 percent accuracy on a hard problem is almost always leaking. Find the leak before you celebrate.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'feature-pipelines',
      q: 'What does one-hot encoding do?',
      options: ['Sorts categories', 'Creates one yes-or-no column per category', 'Removes missing values', 'Scales numbers to 0 to 1'],
      answer: 1,
      explain: 'Each category becomes its own binary column.',
    },
    {
      chapterId: 'feature-pipelines',
      q: 'Why use a Pipeline?',
      options: ['To make the code longer', 'To fit all preprocessing on training data only and apply it consistently', 'To remove the target', 'To train on test data'],
      answer: 1,
      explain: 'Pipelines prevent leakage and keep steps in one object.',
    },
    {
      chapterId: 'feature-pipelines',
      q: 'What is data leakage?',
      options: ['A corrupted file', 'Information unavailable at prediction time leaking into training', 'A slow model', 'Missing labels'],
      answer: 1,
      explain: 'Leakage gives an inflated score that fails in production.',
    },
    {
      chapterId: 'feature-pipelines',
      q: 'Which model type usually does NOT need feature scaling?',
      options: ['Logistic regression', 'Neural networks', 'Decision trees', 'k-nearest neighbors'],
      answer: 2,
      explain: 'Trees split on thresholds, so the scale does not change the splits.',
    },
  ],
};
