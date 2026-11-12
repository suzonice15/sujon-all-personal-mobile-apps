// ML chapter: pandas and Exploratory Data Analysis.

export default {
  id: 'pandas-eda',
  title: 'pandas & Data Exploration',
  description: 'Load, clean and understand a dataset before modeling',
  icon: 'table-chart',
  lessons: [
    {
      id: 'ml-dataframe',
      title: 'DataFrames and loading data',
      blocks: [
        { type: 'text', value: 'A pandas DataFrame is a table with named columns, like a spreadsheet you can script. Most real ML work starts by loading a CSV file and checking what is inside.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import io
import pandas as pd

csv_text = """size,rooms,age,price
1200,3,5,5200000
800,2,12,3100000
1500,4,1,7400000
950,2,20,3600000
"""

df = pd.read_csv(io.StringIO(csv_text))
print(df.head())
print(df.shape)
print(df.dtypes)
print(df.describe().round(1))` },
        { type: 'note', value: 'Always run head, shape, dtypes and describe first. Most surprises, such as numbers stored as text or impossible values, show up there.' },
      ],
    },
    {
      id: 'ml-cleaning',
      title: 'Missing values and cleaning',
      blocks: [
        { type: 'text', value: 'Real data has gaps and mistakes. You must decide for each problem: drop the row, fill with a value, or flag it. The right choice depends on why the value is missing.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import io
import pandas as pd

csv_text = """size,rooms,age,price
1200,3,5,5200000
800,,12,3100000
1500,4,,7400000
950,2,20,-1
"""
df = pd.read_csv(io.StringIO(csv_text))

print("missing per column:")
print(df.isna().sum())

# Impossible price: treat -1 as missing
df.loc[df["price"] <= 0, "price"] = None

df["rooms"] = df["rooms"].fillna(df["rooms"].median())
df["age"] = df["age"].fillna(df["age"].median())
df = df.dropna(subset=["price"])
print(df)` },
        { type: 'note', value: 'Filling with the median is safer than the mean when there are outliers. Fill using statistics from the training data only, or the test set leaks into training.' },
      ],
    },
    {
      id: 'ml-eda',
      title: 'Exploring relationships',
      blocks: [
        { type: 'text', value: 'Exploratory data analysis looks for patterns before modeling: which features move with the target, how spread out values are, and where the outliers sit. Correlation is a quick first check.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import io
import pandas as pd

csv_text = """size,rooms,age,price
1200,3,5,5200000
800,2,12,3100000
1500,4,1,7400000
950,2,20,3600000
1800,4,3,8900000
600,1,30,2100000
"""
df = pd.read_csv(io.StringIO(csv_text))

print(df.corr(numeric_only=True)["price"].round(2))

print(df.groupby("rooms")["price"].mean().round(0))` },
        { type: 'list', items: [
          'Correlation near 1 or -1 means a strong linear relationship',
          'Correlation does not prove cause; it only shows co-movement',
          'Plot histograms and scatter plots with matplotlib for the full picture',
          'Look for outliers before you trust a mean',
        ] },
        { type: 'note', value: 'Explore on the training data only. Looking at the test set to choose features is a common way to fool yourself.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'pandas-eda',
      q: 'Which pandas call shows the number of missing values per column?',
      options: ['df.isna().sum()', 'df.head()', 'df.sort()', 'df.plot()'],
      answer: 0,
      explain: 'isna marks missing cells and sum counts them per column.',
    },
    {
      chapterId: 'pandas-eda',
      q: 'Why is the median often safer than the mean for filling gaps?',
      options: ['It is faster', 'It is less affected by outliers', 'It is always larger', 'It needs no data'],
      answer: 1,
      explain: 'A few extreme values pull the mean but not the median.',
    },
    {
      chapterId: 'pandas-eda',
      q: 'What is the danger of computing fill values on the full dataset before splitting?',
      options: ['The file gets bigger', 'Information from the test set leaks into training', 'The model becomes slower', 'Nothing bad happens'],
      answer: 1,
      explain: 'Statistics from unseen data make the evaluation too optimistic.',
    },
    {
      chapterId: 'pandas-eda',
      q: 'What does a correlation of 0.95 with price suggest?',
      options: ['Price causes size', 'A strong linear relationship between the two columns', 'The data is wrong', 'No relationship'],
      answer: 1,
      explain: 'High correlation means the values move together, not that one causes the other.',
    },
  ],
};
