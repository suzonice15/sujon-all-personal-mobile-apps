// Python chapter: Data Analysis with NumPy and pandas. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Try it downloads numpy/pandas automatically the first time a sample imports them.

export default {
  id: 'data-analysis',
  title: 'Data Analysis: NumPy & pandas',
  description: 'Arrays, vectorization, DataFrames, cleaning, grouping, merging and time series',
  icon: 'analytics',
  lessons: [
    {
      id: 'py-numpy',
      title: 'NumPy Arrays and Vectorization',
      blocks: [
        { type: 'text', value: 'NumPy arrays store numbers of one type in a compact block of memory, and operations run in optimised C code on the whole array at once (vectorization). That is often 50-100x faster than Python loops, and it is the foundation of pandas, scikit-learn and PyTorch.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np

prices = np.array([1200, 450, 15500, 800, 2300])
print(prices, prices.dtype, prices.shape)

print(prices * 1.05)                    # every element, no loop
print(prices[prices > 1000])            # boolean filtering
print(prices.sum(), prices.mean(), prices.max(), prices.argmax())

m = np.arange(1, 13).reshape(3, 4)      # 3 rows, 4 columns
print(m)
print(m[1, 2], m[:, 0], m[0, :], m.T.shape)
print(m.sum(axis=0), m.mean(axis=1))    # per column, per row

# Broadcasting: shapes are stretched to match
discounts = np.array([0.0, 0.1, 0.2, 0.0])
print(m * (1 - discounts))

rng = np.random.default_rng(42)
marks = rng.normal(70, 10, size=1000).round()
print(marks[:5], f"mean={marks.mean():.1f} std={marks.std():.1f}")
print(np.percentile(marks, [25, 50, 75]))

# Speed: vectorized vs Python loop
import time
big = rng.random(1_000_000)
t = time.perf_counter(); s1 = sum(x * 2 for x in big); loop = time.perf_counter() - t
t = time.perf_counter(); s2 = (big * 2).sum(); vec = time.perf_counter() - t
print(f"loop {loop:.3f}s vs numpy {vec:.4f}s (~{loop / vec:.0f}x faster)")` },
      ],
    },
    {
      id: 'py-pandas-basics',
      title: 'pandas DataFrames',
      blocks: [
        { type: 'text', value: 'A DataFrame is a table with labelled columns, like a spreadsheet or SQL table in Python. Each column is a Series. pandas reads CSV, Excel, JSON and SQL, and is the everyday tool of data analysts.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import pandas as pd
import io

csv = io.StringIO("""order_id,date,city,product,qty,price
1,2026-01-05,Dhaka,Keyboard,2,1500
2,2026-01-06,Sylhet,Mouse,5,450
3,2026-01-06,Dhaka,Monitor,1,15500
4,2026-02-10,Khulna,Mouse,3,450
5,2026-02-11,Dhaka,Keyboard,1,1500
6,2026-02-15,Sylhet,Monitor,2,15500
""")
df = pd.read_csv(csv, parse_dates=["date"])     # pd.read_csv("orders.csv") for a file

print(df.head(3))
print(df.shape, list(df.columns))
print(df.dtypes)

df["revenue"] = df["qty"] * df["price"]          # new column, vectorized
print(df[["product", "revenue"]].head(3))
print(df["revenue"].sum(), df["revenue"].mean())
print(df.describe()[["qty", "revenue"]].round(1))` },
      ],
    },
    {
      id: 'py-pandas-select',
      title: 'Selecting and Filtering',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import pandas as pd

df = pd.DataFrame({
    "name": ["Nadia", "Rafi", "Mim", "Arif", "Tania"],
    "dept": ["IT", "HR", "IT", "Sales", "IT"],
    "salary": [85000, 52000, 78000, 61000, 92000],
    "years": [5, 2, 4, 3, 7],
})

print(df["name"].tolist())                       # one column (Series)
print(df[df["dept"] == "IT"])                    # boolean filter
print(df[(df["salary"] > 60000) & (df["years"] < 5)])   # & | ~ with parentheses
print(df.query("dept == 'IT' and years >= 5"))

print(df.loc[2, "name"], df.loc[df["salary"].idxmax(), "name"])   # label based
print(df.iloc[0:2, 0:2])                         # position based

print(df.sort_values(["dept", "salary"], ascending=[True, False]))
print(df.nlargest(2, "salary")[["name", "salary"]])
print(df["dept"].value_counts())` },
        { type: 'note', value: 'Use .loc[row, column] to change values: df.loc[df["dept"] == "HR", "salary"] *= 1.1. Chained indexing like df[df.x > 0]["y"] = 1 does not modify df.' },
      ],
    },
    {
      id: 'py-pandas-cleaning',
      title: 'Cleaning Messy Data',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import pandas as pd
import numpy as np

raw = pd.DataFrame({
    "name": [" Nadia ", "RAFI", "mim", None, "Arif", "Arif"],
    "phone": ["01712-345678", "8801812345678", "n/a", "01912345678", "01612345678", "01612345678"],
    "age": ["24", "31", "", "19", "abc", "abc"],
    "city": ["Dhaka", "dhaka", "Sylhet", "Khulna", None, None],
})

df = raw.drop_duplicates().copy()
print(df.isna().sum().to_dict())

df["name"] = df["name"].str.strip().str.title()
df["city"] = df["city"].str.title().fillna("Unknown")
df["age"] = pd.to_numeric(df["age"], errors="coerce")       # bad values -> NaN
df["age"] = df["age"].fillna(df["age"].median()).astype(int)
df["phone"] = (df["phone"].str.replace(r"\D", "", regex=True)
                          .str.replace(r"^880", "0", regex=True)
                          .where(lambda s: s.str.fullmatch(r"01[3-9]\d{8}"), np.nan))
df = df.dropna(subset=["name"])
print(df)` },
      ],
    },
    {
      id: 'py-pandas-groupby',
      title: 'Grouping, Pivot Tables and Merging',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import pandas as pd

orders = pd.DataFrame({
    "customer_id": [1, 2, 1, 3, 2, 1],
    "month": ["Jan", "Jan", "Feb", "Feb", "Feb", "Mar"],
    "category": ["Books", "Tech", "Tech", "Books", "Tech", "Books"],
    "amount": [500, 15500, 1500, 300, 450, 800],
})
customers = pd.DataFrame({"customer_id": [1, 2, 3, 4], "name": ["Nadia", "Rafi", "Mim", "Arif"],
                          "city": ["Dhaka", "Sylhet", "Dhaka", "Khulna"]})

print(orders.groupby("category")["amount"].sum())
print(orders.groupby("customer_id").agg(orders=("amount", "size"), total=("amount", "sum"), avg=("amount", "mean")))

print(orders.pivot_table(index="month", columns="category", values="amount", aggfunc="sum", fill_value=0))

merged = orders.merge(customers, on="customer_id", how="left")     # like a SQL JOIN
print(merged.groupby("city")["amount"].sum().sort_values(ascending=False))

never_ordered = customers[~customers["customer_id"].isin(orders["customer_id"])]
print("No orders:", never_ordered["name"].tolist())` },
      ],
    },
    {
      id: 'py-pandas-time',
      title: 'Time Series and Exporting',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import pandas as pd
import numpy as np

rng = np.random.default_rng(1)
days = pd.date_range("2026-01-01", periods=90, freq="D")
sales = pd.Series(rng.integers(20, 60, size=90) * 100, index=days, name="sales")

print(sales.head(3))
print(sales.resample("ME").sum())                          # monthly totals
print(sales.rolling(7).mean().round(0).tail(3))             # 7-day moving average
print(sales.groupby(sales.index.day_name()).mean().round(0).sort_values(ascending=False).head(3))
print(sales["2026-02-01":"2026-02-05"])

monthly = sales.resample("ME").sum().to_frame()
monthly["growth_%"] = (monthly["sales"].pct_change() * 100).round(1)
print(monthly)

print(monthly.to_csv())                                     # .to_csv("report.csv"), .to_excel(), .to_json()
print(monthly.reset_index().to_dict("records")[0])` },
        { type: 'note', value: 'For very large data, look at Polars (a fast DataFrame library written in Rust) and DuckDB (SQL over files). The concepts you learned here transfer directly.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'data-analysis', q: 'Why are NumPy operations fast?', options: ['They use threads in Python', 'They run vectorized in compiled C code over typed arrays', 'They cache results', 'They skip calculations'], answer: 1, explain: 'No Python loop per element.' },
    { chapterId: 'data-analysis', q: 'What does m.sum(axis=0) compute on a 2D array?', options: ['The total', 'The sum of each column', 'The sum of each row', 'The first row'], answer: 1, explain: 'axis=0 collapses rows, leaving one value per column.' },
    { chapterId: 'data-analysis', q: 'How do you combine two conditions in a pandas filter?', options: ['df[a and b]', 'df[(a) & (b)]', 'df[a && b]', 'df.filter(a, b)'], answer: 1, explain: 'Use & / | / ~ with parentheses around each condition.' },
    { chapterId: 'data-analysis', q: 'What is the pandas equivalent of a SQL JOIN?', options: ['concat', 'merge', 'append', 'pivot'], answer: 1, explain: 'df.merge(other, on="key", how="left").' },
    { chapterId: 'data-analysis', q: 'What does pd.to_numeric(col, errors="coerce") do with invalid values?', options: ['Raises an error', 'Turns them into NaN', 'Deletes the row', 'Keeps them as strings'], answer: 1, explain: 'Then fill or drop the NaN values.' },
    { chapterId: 'data-analysis', q: 'Which method computes monthly totals of a daily time series?', options: ['groupby("month")', 'resample("ME").sum()', 'rolling(30)', 'shift(30)'], answer: 1, explain: 'resample groups by calendar period (ME = month end).' },
  ],
};
