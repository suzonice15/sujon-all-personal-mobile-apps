// Machine Learning interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is the difference between supervised and unsupervised learning?',
      a: 'Supervised learning trains on labeled examples to predict labels. Unsupervised learning finds structure in unlabeled data, such as clusters or lower-dimensional representations.',
      level: 'basic',
    },
    {
      q: 'What is a feature and what is a label?',
      a: 'A feature is an input variable the model uses. A label is the target value the model learns to predict in supervised learning.',
      level: 'basic',
    },
    {
      q: 'Why split data before any preparation?',
      a: 'So the test set stays unseen. Preparation fitted on all the data leaks information from the test set and inflates the score.',
      level: 'intermediate',
    },
    {
      q: 'What is reinforcement learning?',
      a: 'An agent learns a policy by taking actions and receiving rewards. It is used in games and robotics where the correct answer is not given directly.',
      level: 'basic',
    },
  ],
  numpy: [
    {
      q: 'Why are NumPy operations fast?',
      a: 'They are vectorized and run in compiled code over contiguous memory, which avoids slow Python loops for each element.',
      level: 'basic',
    },
    {
      q: 'What is broadcasting?',
      a: 'NumPy stretches a smaller array to match the shape of a larger one during an operation, so you can subtract a mean from every row without a loop.',
      level: 'intermediate',
    },
    {
      q: 'What does the shape (100, 5) mean for a feature matrix?',
      a: '100 examples (rows) and 5 features (columns).',
      level: 'basic',
    },
    {
      q: 'Why set a random seed?',
      a: 'It makes random operations repeatable, so experiments and results can be reproduced and compared fairly.',
      level: 'basic',
    },
  ],
  'pandas-eda': [
    {
      q: 'How do you handle missing values?',
      a: 'Drop rows or columns when missing data is rare and random, or impute with a statistic such as the median computed on training data. Flag missingness when it carries information.',
      level: 'intermediate',
    },
    {
      q: 'Why use the median instead of the mean for imputation?',
      a: 'The median is robust to outliers. A few extreme values can pull the mean far from typical values.',
      level: 'basic',
    },
    {
      q: 'What does correlation tell you and what does it not?',
      a: 'It measures how strongly two variables move together linearly. It does not prove causation and it misses nonlinear relationships.',
      level: 'intermediate',
    },
    {
      q: 'What is exploratory data analysis for?',
      a: 'Understanding distributions, relationships, outliers and data quality before choosing features and models.',
      level: 'basic',
    },
  ],
  'linear-regression': [
    {
      q: 'What is mean squared error?',
      a: 'The average of the squared differences between predictions and true values. Squaring penalizes large errors more and keeps the function differentiable.',
      level: 'basic',
    },
    {
      q: 'How does gradient descent work?',
      a: 'It computes the gradient of the cost with respect to each weight and moves the weights a small step against it. The learning rate sets the step size.',
      level: 'basic',
    },
    {
      q: 'Why scale features before gradient descent?',
      a: 'Features on very different scales make the cost surface elongated, so one learning rate cannot suit all weights and convergence slows or oscillates.',
      level: 'intermediate',
    },
    {
      q: 'What does R squared measure?',
      a: 'The fraction of variance in the target explained by the model. 1 is perfect and 0 means no better than predicting the mean.',
      level: 'intermediate',
    },
  ],
  classification: [
    {
      q: 'Why is logistic regression a classifier?',
      a: 'It outputs a probability through the sigmoid function and predicts a class by comparing the probability with a threshold.',
      level: 'basic',
    },
    {
      q: 'Precision versus recall?',
      a: 'Precision is the fraction of predicted positives that are correct. Recall is the fraction of actual positives that are found. The right balance depends on the cost of each error.',
      level: 'intermediate',
    },
    {
      q: 'When is accuracy misleading?',
      a: 'When classes are imbalanced. A model that always predicts the majority class can have high accuracy while failing on the rare class that matters.',
      level: 'basic',
    },
    {
      q: 'What does changing the decision threshold do?',
      a: 'It trades precision for recall. A lower threshold finds more positives and creates more false alarms; a higher threshold does the opposite.',
      level: 'advanced',
    },
  ],
  evaluation: [
    {
      q: 'What is overfitting?',
      a: 'The model learns noise and specific details of the training data, so it performs well on training data and poorly on new data.',
      level: 'basic',
    },
    {
      q: 'Why use cross-validation?',
      a: 'It evaluates the model on several different splits, giving an average and a spread instead of one possibly lucky score.',
      level: 'intermediate',
    },
    {
      q: 'Ridge versus Lasso?',
      a: 'Both add a penalty on the weights. Ridge (L2) shrinks weights smoothly; Lasso (L1) can drive some weights exactly to zero and so selects features.',
      level: 'intermediate',
    },
    {
      q: 'How do you tune hyperparameters without touching the test set?',
      a: 'Use cross-validation on the training data, or a separate validation split, and evaluate on the untouched test set only once at the end.',
      level: 'advanced',
    },
  ],
  'feature-pipelines': [
    {
      q: 'What is data leakage?',
      a: 'When information that will not be available at prediction time enters training, causing an overly optimistic evaluation that fails in production.',
      level: 'basic',
    },
    {
      q: 'Why use a Pipeline?',
      a: 'It applies the same preprocessing steps during fitting and prediction, fits them only on training data, and keeps the workflow reproducible.',
      level: 'intermediate',
    },
    {
      q: 'What is one-hot encoding?',
      a: 'Converting a categorical feature into one binary column per category, so a model can use it without assuming an order.',
      level: 'basic',
    },
    {
      q: 'What does handle_unknown="ignore" protect against?',
      a: 'A crash when production data contains a category that was not seen during training.',
      level: 'advanced',
    },
  ],
  'trees-ensembles': [
    {
      q: 'What does a decision tree do?',
      a: 'It splits the data with threshold questions on features, choosing splits that best separate the target, until it reaches leaves that make predictions.',
      level: 'basic',
    },
    {
      q: 'Why does a random forest outperform one tree?',
      a: 'Averaging many trees trained on different samples and feature subsets reduces variance while keeping most of the signal.',
      level: 'intermediate',
    },
    {
      q: 'Random forest versus gradient boosting?',
      a: 'A forest builds independent trees in parallel and averages them. Boosting builds trees sequentially, each correcting the previous errors, and is often more accurate but easier to overfit.',
      level: 'advanced',
    },
    {
      q: 'Are tree models sensitive to feature scale?',
      a: 'No. Splits depend on thresholds and their order, which do not change when a feature is rescaled.',
      level: 'intermediate',
    },
  ],
  unsupervised: [
    {
      q: 'How does k-means work?',
      a: 'It assigns each point to the nearest of k centres, moves each centre to the mean of its points, and repeats until assignments stop changing.',
      level: 'basic',
    },
    {
      q: 'How do you choose k?',
      a: 'Use the elbow in inertia, the silhouette score and domain sense. There is no single correct k without a clear business question.',
      level: 'intermediate',
    },
    {
      q: 'What does PCA do?',
      a: 'It finds orthogonal directions of maximum variance and projects the data onto the top components, reducing dimensions while keeping most of the information.',
      level: 'intermediate',
    },
    {
      q: 'Why fit PCA only on training data?',
      a: 'Like any preprocessing, fitting on all data would leak information. Fit on training data and apply the same transform to the test data.',
      level: 'advanced',
    },
  ],
  'neural-networks': [
    {
      q: 'What is an activation function for?',
      a: 'It adds non-linearity, so stacked layers can represent complex functions instead of collapsing into a single linear map.',
      level: 'basic',
    },
    {
      q: 'What is backpropagation?',
      a: 'An efficient application of the chain rule that computes the gradient of the loss with respect to every weight, layer by layer.',
      level: 'intermediate',
    },
    {
      q: 'Why are neural networks not always the best choice for tabular data?',
      a: 'They need a lot of data and tuning, while gradient boosting usually performs very well on tabular problems with less effort.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between an epoch and a batch?',
      a: 'A batch is a subset of examples used for one weight update. An epoch is one full pass over all the training data.',
      level: 'basic',
    },
  ],
  'deploy-ethics': [
    {
      q: 'What is concept drift?',
      a: 'When the relationship between inputs and the target changes over time, so a model trained on old patterns becomes less accurate.',
      level: 'intermediate',
    },
    {
      q: 'Why save the whole pipeline?',
      a: 'So the same preprocessing runs at prediction time. Saving only the estimator leads to silently wrong inputs.',
      level: 'intermediate',
    },
    {
      q: 'How can a model be unfair?',
      a: 'It can learn bias from historical data, use a feature that proxies a protected attribute, or perform much worse for one group even with good overall accuracy.',
      level: 'basic',
    },
    {
      q: 'How do you monitor a deployed model?',
      a: 'Log inputs and predictions, compare live distributions with training data, track metrics once true outcomes arrive, and alert when performance drops.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you approach a new prediction problem?',
      a: 'Define the question and the cost of errors, build a simple baseline, prepare features in a pipeline, compare a few models with cross-validation, then evaluate once on a test set.',
      level: 'intermediate',
    },
    {
      q: 'What is bias versus variance?',
      a: 'Bias is error from overly simple assumptions that cause underfitting. Variance is error from sensitivity to the training sample that causes overfitting. The goal is a balance.',
      level: 'basic',
    },
    {
      q: 'How would you explain a model to a non-technical manager?',
      a: 'Describe what it predicts, how accurate it is in the units that matter, where it fails, and what human review still applies.',
      level: 'intermediate',
    },
    {
      q: 'What is the best way to build ML skill?',
      a: 'Finish small end-to-end projects with real data, explain each decision, and spend time on data quality and evaluation, not only on new algorithms.',
      level: 'basic',
    },
  ],
};
