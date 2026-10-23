// Python chapter: Data Visualization. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Try it renders every open matplotlib figure as an image below the output.

export default {
  id: 'visualization',
  title: 'Data Visualization',
  description: 'matplotlib charts: line, bar, scatter, histogram, subplots and styling',
  icon: 'insert-chart',
  lessons: [
    {
      id: 'py-mpl-basics',
      title: 'Your First Charts with matplotlib',
      blocks: [
        { type: 'text', value: 'matplotlib is Python\'s core plotting library; pandas and seaborn are built on it. The modern style: create a Figure and Axes with plt.subplots(), then call methods on the Axes.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
revenue = [120, 135, 128, 160, 182, 210]
costs = [90, 95, 100, 110, 120, 130]

fig, ax = plt.subplots(figsize=(7, 4))
ax.plot(months, revenue, marker="o", label="Revenue")
ax.plot(months, costs, marker="s", linestyle="--", label="Costs")
ax.fill_between(months, costs, revenue, alpha=0.15)
ax.set_title("CodeNest Shop 2026 (thousand Tk)")
ax.set_xlabel("Month")
ax.set_ylabel("Thousand Tk")
ax.grid(alpha=0.3)
ax.legend()

plt.show()          # on a computer this opens a window; save with fig.savefig("chart.png", dpi=150)
print("Profit:", [r - c for r, c in zip(revenue, costs)])` },
      ],
    },
    {
      id: 'py-mpl-chart-types',
      title: 'Bar, Scatter, Histogram and Pie',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(7)
fig, axes = plt.subplots(2, 2, figsize=(9, 7))

courses = ["HTML", "CSS", "JS", "PHP", "Python"]
students = [420, 380, 510, 290, 640]
bars = axes[0, 0].bar(courses, students, color="#2563EB")
axes[0, 0].bar_label(bars)
axes[0, 0].set_title("Students per course")

hours = rng.uniform(1, 20, 80)
score = 40 + hours * 2.5 + rng.normal(0, 6, 80)
axes[0, 1].scatter(hours, score, alpha=0.7, c=score, cmap="viridis")
axes[0, 1].set(title="Study hours vs score", xlabel="hours / week", ylabel="score")

marks = rng.normal(68, 12, 500)
axes[1, 0].hist(marks, bins=20, edgecolor="white")
axes[1, 0].axvline(marks.mean(), color="red", linestyle="--", label=f"mean {marks.mean():.0f}")
axes[1, 0].legend()
axes[1, 0].set_title("Exam marks")

axes[1, 1].pie([45, 30, 15, 10], labels=["bKash", "Card", "Nagad", "Cash"], autopct="%1.0f%%", startangle=90)
axes[1, 1].set_title("Payment methods")

fig.suptitle("Dashboard", fontsize=14, fontweight="bold")
fig.tight_layout()
plt.show()` },
        { type: 'list', items: [
          'Line: change over time. Bar: compare categories. Scatter: relationship between two numbers. Histogram: distribution. Pie: parts of a whole (use sparingly, bars are easier to read).',
          'Always label axes with units, and start bar charts at zero.',
        ] },
      ],
    },
    {
      id: 'py-pandas-plotting',
      title: 'Plotting Straight from pandas',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(3)
days = pd.date_range("2026-01-01", periods=120, freq="D")
df = pd.DataFrame({
    "web": rng.integers(80, 140, 120).cumsum() / 100,
    "app": rng.integers(60, 180, 120).cumsum() / 100,
}, index=days)

fig, (top, bottom) = plt.subplots(2, 1, figsize=(8, 6), sharex=False)
df.plot(ax=top, title="Cumulative signups (thousands)")
top.set_ylabel("thousands")

monthly = df.diff().resample("ME").sum()
monthly.index = monthly.index.strftime("%b")
monthly.plot.bar(ax=bottom, rot=0, title="New signups per month")
fig.tight_layout()
plt.show()

print(monthly.round(1))` },
        { type: 'note', value: 'seaborn (statistical charts) and Plotly (interactive charts in the browser) are the next libraries to learn. For dashboards, look at Streamlit: a few lines of Python become a web app.' },
      ],
    },
    {
      id: 'py-mpl-annotate',
      title: 'Telling a Story: Annotations and Styling',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import matplotlib.pyplot as plt

years = list(range(2018, 2027))
users = [5, 9, 14, 30, 41, 47, 60, 78, 96]

plt.style.use("seaborn-v0_8-whitegrid")
fig, ax = plt.subplots(figsize=(8, 4.5))
ax.plot(years, users, color="#2563EB", linewidth=3)
ax.scatter(years[-1], users[-1], s=80, color="#DC2626", zorder=3)

ax.annotate("Launched mobile app", xy=(2021, 30), xytext=(2018.3, 55),
            arrowprops=dict(arrowstyle="->", color="gray"), fontsize=10)
ax.annotate(f"{users[-1]}k users", xy=(2026, 96), xytext=(2024.4, 92), fontsize=11, fontweight="bold")

for side in ("top", "right"):
    ax.spines[side].set_visible(False)
ax.set_title("Learners grew 19x in eight years", loc="left", fontsize=14, fontweight="bold")
ax.set_ylabel("thousand learners")
ax.set_xticks(years)
plt.show()` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'visualization', q: 'What does fig, ax = plt.subplots() return?', options: ['Two charts', 'A Figure and an Axes to draw on', 'A DataFrame', 'An image file'], answer: 1, explain: 'Draw with ax methods; save with fig.savefig().' },
    { chapterId: 'visualization', q: 'Which chart best shows the distribution of exam marks?', options: ['Pie', 'Histogram', 'Line', 'Scatter'], answer: 1, explain: 'A histogram counts values in bins.' },
    { chapterId: 'visualization', q: 'Which chart shows the relationship between two numeric variables?', options: ['Bar', 'Pie', 'Scatter', 'Histogram'], answer: 2, explain: 'Each point is one observation (x, y).' },
    { chapterId: 'visualization', q: 'How do you save a figure to a file?', options: ['plt.write()', 'fig.savefig("chart.png", dpi=150)', 'ax.export()', 'plt.png()'], answer: 1, explain: 'Formats include png, svg and pdf.' },
    { chapterId: 'visualization', q: 'How do you plot a pandas DataFrame column quickly?', options: ['matplotlib.pandas()', 'df["col"].plot()', 'df.draw()', 'pd.chart(df)'], answer: 1, explain: 'pandas wraps matplotlib: df.plot(), df.plot.bar(), df.plot.hist().' },
  ],
};
