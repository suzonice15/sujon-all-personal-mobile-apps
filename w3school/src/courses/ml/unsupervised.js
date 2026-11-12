// ML chapter: Unsupervised Learning.

export default {
  id: 'unsupervised',
  title: 'Clustering & PCA',
  description: 'Find groups and reduce dimensions without labels',
  icon: 'bubble-chart',
  lessons: [
    {
      id: 'ml-kmeans',
      title: 'k-means clustering',
      blocks: [
        { type: 'text', value: 'k-means groups points into k clusters. It places k centres, assigns each point to the nearest centre, moves each centre to the mean of its points, and repeats until nothing changes. You choose k yourself.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(1)
# Three customer groups: (monthly spend, visits per month)
groups = [
    rng.normal([500, 2], [80, 0.5], size=(50, 2)),
    rng.normal([2000, 8], [200, 1], size=(50, 2)),
    rng.normal([1000, 4], [100, 0.8], size=(50, 2)),
]
X = np.vstack(groups)

X_scaled = StandardScaler().fit_transform(X)
km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X_scaled)
print("cluster sizes:", np.bincount(km.labels_))
print("inertia: %.1f" % km.inertia_)` },
        { type: 'note', value: 'Scale the features first. Otherwise the feature with the largest numbers, here spend, decides every cluster on its own.' },
      ],
    },
    {
      id: 'ml-choose-k',
      title: 'Choosing k',
      blocks: [
        { type: 'text', value: 'Inertia is the total squared distance from points to their centres. It always falls as k grows, so you look for an elbow where extra clusters stop helping much. The silhouette score adds a check on how well separated the clusters are.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(1)
X = np.vstack([
    rng.normal([500, 2], [80, 0.5], size=(50, 2)),
    rng.normal([2000, 8], [200, 1], size=(50, 2)),
    rng.normal([1000, 4], [100, 0.8], size=(50, 2)),
])
X_scaled = StandardScaler().fit_transform(X)

for k in range(2, 7):
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X_scaled)
    print("k=%d  inertia=%7.1f  silhouette=%.3f" % (
        k, km.inertia_, silhouette_score(X_scaled, km.labels_)))` },
        { type: 'note', value: 'Clustering always returns clusters, even for random noise. Check that the groups mean something to a person who knows the domain.' },
      ],
    },
    {
      id: 'ml-pca',
      title: 'PCA for reducing dimensions',
      blocks: [
        { type: 'text', value: 'Principal Component Analysis finds new axes that capture the most variance in the data. You can keep the first few components to compress many correlated features into a smaller set, which is useful for visualization and for speeding up models.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np
from sklearn.datasets import load_iris
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

X, y = load_iris(return_X_y=True)
X_scaled = StandardScaler().fit_transform(X)

pca = PCA(n_components=2).fit(X_scaled)
X_2d = pca.transform(X_scaled)

print("shape before:", X.shape, "after:", X_2d.shape)
print("variance kept: %.1f%%" % (100 * pca.explained_variance_ratio_.sum()))` },
        { type: 'list', items: [
          'PCA is unsupervised: it ignores the labels',
          'Components are combinations of the original features, so they are harder to name',
          'Fit PCA on training data only, like any other preprocessing step',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'unsupervised',
      q: 'What does k-means need you to choose beforehand?',
      options: ['The labels', 'The number of clusters k', 'The test set', 'The learning rate'],
      answer: 1,
      explain: 'You must decide k; the algorithm finds the groups.',
    },
    {
      chapterId: 'unsupervised',
      q: 'Why scale features before k-means?',
      options: ['To remove clusters', 'So one large-valued feature does not dominate the distances', 'To add labels', 'To speed up printing'],
      answer: 1,
      explain: 'Distance-based methods are sensitive to feature scale.',
    },
    {
      chapterId: 'unsupervised',
      q: 'What is PCA mainly used for?',
      options: ['Predicting labels', 'Reducing features while keeping most of the variance', 'Encrypting data', 'Deleting duplicates'],
      answer: 1,
      explain: 'PCA projects data onto the directions that carry the most variance.',
    },
    {
      chapterId: 'unsupervised',
      q: 'Why look for an elbow in inertia?',
      options: ['Inertia always reaches zero', 'Extra clusters stop reducing the error much after the elbow', 'The elbow is the label', 'It shows the test score'],
      answer: 1,
      explain: 'The elbow is a sensible trade-off between fewer and better clusters.',
    },
  ],
};
