// Python chapter: Projects. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Each project is a complete program that runs in Try it; extend it with the challenges.

export default {
  id: 'projects',
  title: 'Projects',
  description: 'Complete programs that combine everything you learned',
  icon: 'construction',
  lessons: [
    {
      id: 'py-project-expenses',
      title: 'Project 1: Expense Tracker',
      blocks: [
        { type: 'text', value: 'Dataclasses, enums, JSON storage, grouping and a formatted report: a small but complete command-line app.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from dataclasses import dataclass, asdict
from datetime import date
from enum import StrEnum
from collections import defaultdict
from pathlib import Path
import json

class Category(StrEnum):
    FOOD = "food"
    TRANSPORT = "transport"
    BILLS = "bills"
    FUN = "fun"

@dataclass
class Expense:
    day: date
    amount: int
    category: Category
    note: str = ""

class ExpenseBook:
    def __init__(self, path: Path):
        self.path = path
        self.items: list[Expense] = []
        if path.exists():
            for raw in json.loads(path.read_text(encoding="utf-8")):
                self.items.append(Expense(date.fromisoformat(raw["day"]), raw["amount"], Category(raw["category"]), raw["note"]))

    def add(self, day, amount, category, note=""):
        if amount <= 0:
            raise ValueError("amount must be positive")
        self.items.append(Expense(day, amount, Category(category), note))

    def save(self):
        self.path.write_text(json.dumps([asdict(e) for e in self.items], default=str, indent=1), encoding="utf-8")

    def monthly_report(self, year, month):
        rows = [e for e in self.items if (e.day.year, e.day.month) == (year, month)]
        by_cat = defaultdict(int)
        for e in rows:
            by_cat[e.category] += e.amount
        total = sum(by_cat.values())
        lines = [f"Report {year}-{month:02d}", "-" * 30]
        for cat, amount in sorted(by_cat.items(), key=lambda kv: -kv[1]):
            bar = "#" * round(20 * amount / total)
            lines.append(f"{cat:<10}{amount:>7,} Tk  {bar}")
        lines.append(f"{'TOTAL':<10}{total:>7,} Tk")
        return "\n".join(lines)

book = ExpenseBook(Path("expenses.json"))
book.add(date(2026, 3, 1), 450, "food", "lunch")
book.add(date(2026, 3, 2), 120, "transport", "rickshaw")
book.add(date(2026, 3, 5), 2200, "bills", "internet")
book.add(date(2026, 3, 8), 900, "fun", "cinema")
book.add(date(2026, 3, 9), 650, "food", "groceries")
book.save()

print(ExpenseBook(Path("expenses.json")).monthly_report(2026, 3))     # reloaded from disk` },
        { type: 'list', items: [
          'Challenge: add an argparse interface: add, list, report --month 2026-03.',
          'Challenge: a monthly budget per category with a warning when it is exceeded.',
          'Challenge: store data in SQLite instead of JSON.',
        ] },
      ],
    },
    {
      id: 'py-project-library-api',
      title: 'Project 2: Library REST API (FastAPI + SQLite)',
      blocks: [
        { type: 'text', value: 'A real API: SQLite storage, pydantic validation, borrowing rules, proper status codes and tests. In production run it with uvicorn and swap SQLite for PostgreSQL.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import sqlite3
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import httpx

db = sqlite3.connect(":memory:", check_same_thread=False)
db.row_factory = sqlite3.Row
db.executescript("""
CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author TEXT NOT NULL, copies INTEGER NOT NULL);
CREATE TABLE loans (id INTEGER PRIMARY KEY, book_id INTEGER REFERENCES books(id), member TEXT, returned INTEGER DEFAULT 0);
""")

class BookIn(BaseModel):
    title: str = Field(min_length=1)
    author: str = Field(min_length=1)
    copies: int = Field(ge=1, le=100)

class LoanIn(BaseModel):
    member: str = Field(min_length=2)

app = FastAPI(title="Library API")

def available(book_id):
    row = db.execute("""SELECT b.copies - COUNT(l.id) AS free FROM books b
                        LEFT JOIN loans l ON l.book_id = b.id AND l.returned = 0
                        WHERE b.id = ? GROUP BY b.id""", (book_id,)).fetchone()
    if row is None:
        raise HTTPException(404, "Book not found")
    return row["free"]

@app.post("/books", status_code=201)
async def add_book(book: BookIn):
    cur = db.execute("INSERT INTO books (title, author, copies) VALUES (?, ?, ?)", (book.title, book.author, book.copies))
    db.commit()
    return {"id": cur.lastrowid, **book.model_dump()}

@app.get("/books/{book_id}")
async def get_book(book_id: int):
    free = available(book_id)
    return {**dict(db.execute("SELECT * FROM books WHERE id = ?", (book_id,)).fetchone()), "available": free}

@app.post("/books/{book_id}/loans", status_code=201)
async def borrow(book_id: int, loan: LoanIn):
    if available(book_id) < 1:
        raise HTTPException(409, "No copies available")
    cur = db.execute("INSERT INTO loans (book_id, member) VALUES (?, ?)", (book_id, loan.member))
    db.commit()
    return {"loan_id": cur.lastrowid}

@app.post("/loans/{loan_id}/return")
async def return_book(loan_id: int):
    cur = db.execute("UPDATE loans SET returned = 1 WHERE id = ? AND returned = 0", (loan_id,))
    db.commit()
    if cur.rowcount == 0:
        raise HTTPException(404, "Active loan not found")
    return {"returned": True}

async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://lib") as c:
    async def call(method, url, **kw):
        r = await c.request(method, url, **kw)
        print(f"{method:<4} {url:<22} {r.status_code}  {r.json()}")
        return r.json()
    book = await call("POST", "/books", json={"title": "Clean Code", "author": "R. Martin", "copies": 1})
    await call("POST", "/books", json={"title": "", "author": "x", "copies": 0})
    loan = await call("POST", f"/books/{book['id']}/loans", json={"member": "Nadia"})
    await call("POST", f"/books/{book['id']}/loans", json={"member": "Rafi"})
    await call("GET", f"/books/{book['id']}")
    await call("POST", f"/loans/{loan['loan_id']}/return")
    await call("GET", f"/books/{book['id']}")
    await call("GET", "/books/99")` },
        { type: 'list', items: [
          'Challenge: add authentication so only librarians can add books.',
          'Challenge: due dates and a "late returns" report.',
          'Challenge: move to SQLAlchemy models and write pytest tests for every endpoint.',
        ] },
      ],
    },
    {
      id: 'py-project-sales-analysis',
      title: 'Project 3: Sales Data Analysis Report',
      blocks: [
        { type: 'text', value: 'A data analyst\'s everyday task: generate (or load) sales data, clean it, answer business questions with pandas, and present a chart.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

rng = np.random.default_rng(2026)
n = 2000
products = {"Keyboard": 1500, "Mouse": 450, "Monitor": 15500, "Headphones": 2999, "Webcam": 3500}
df = pd.DataFrame({
    "date": pd.to_datetime("2026-01-01") + pd.to_timedelta(rng.integers(0, 181, n), unit="D"),
    "city": rng.choice(["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi"], n, p=[.45, .2, .12, .12, .11]),
    "product": rng.choice(list(products), n, p=[.25, .3, .1, .2, .15]),
    "qty": rng.integers(1, 4, n),
    "channel": rng.choice(["web", "app"], n, p=[.4, .6]),
})
df["revenue"] = df["qty"] * df["product"].map(products)

print(f"Orders: {len(df):,}  Revenue: {df.revenue.sum():,} Tk  Avg order: {df.revenue.mean():,.0f} Tk")

monthly = df.set_index("date").resample("ME")["revenue"].sum()
monthly.index = monthly.index.strftime("%b")
print("\nMonthly revenue:\n", (monthly / 1000).round(0).astype(int).to_string())

print("\nTop products:\n", df.groupby("product")["revenue"].sum().sort_values(ascending=False).head(3).to_string())
share = df.groupby("channel")["revenue"].sum() / df.revenue.sum() * 100
print("\nChannel share %:\n", share.round(1).to_string())
best_city = df.groupby("city")["revenue"].sum().idxmax()
print("\nBest city:", best_city)

fig, (a, b) = plt.subplots(1, 2, figsize=(10, 4))
(monthly / 1000).plot.bar(ax=a, rot=0, color="#2563EB", title="Revenue per month (thousand Tk)")
df.pivot_table(index="city", columns="channel", values="revenue", aggfunc="sum").div(1000).plot.barh(ax=b, title="Revenue by city and channel (k Tk)")
fig.tight_layout()
plt.show()` },
        { type: 'list', items: [
          'Challenge: find the weekday with the highest sales and the month-over-month growth.',
          'Challenge: export a multi-sheet Excel report.',
          'Challenge: build an interactive dashboard with Streamlit.',
        ] },
      ],
    },
    {
      id: 'py-project-spam',
      title: 'Project 4: SMS Spam Classifier',
      blocks: [
        { type: 'text', value: 'A complete small machine-learning project: text features with TF-IDF, a classifier in a pipeline, evaluation, and predictions on new messages.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

spam = ["WIN a FREE iPhone now! Click http://win.example", "Congratulations, you won 50000 Tk cash, reply YES",
        "URGENT: your account is blocked, send your PIN", "Free recharge 500 Tk, click this link today",
        "Claim your lottery prize now, limited offer", "You have been selected for a cash reward, call now",
        "Cheap loans approved instantly, no documents", "Exclusive deal: 90% off, buy now, free gift",
        "Your bKash wallet won a bonus, share the OTP", "Winner! Get a free trip, click to claim"] * 3
ham = ["Are we still meeting at 5 pm?", "Please send me the class notes", "Mom, I reached Dhaka safely",
       "The PHP assignment is due tomorrow", "Can you pick up bread on the way home?", "Meeting moved to Monday",
       "Thanks for the birthday wishes!", "Your order #1042 has been shipped", "Let's study Python together tonight",
       "Call me when you are free"] * 3
texts, labels = spam + ham, [1] * len(spam) + [0] * len(ham)

X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.3, stratify=labels, random_state=0)
model = make_pipeline(TfidfVectorizer(lowercase=True, ngram_range=(1, 2)), MultinomialNB())
model.fit(X_train, y_train)
print(classification_report(y_test, model.predict(X_test), target_names=["ham", "spam"]))

for msg in ["Free cash prize, click now to claim!", "Can we meet tomorrow for the project?", "Your OTP is needed to claim the reward"]:
    p = model.predict_proba([msg])[0][1]
    print(f"{p:5.0%} spam  {msg}")` },
        { type: 'note', value: 'This tiny dataset is for learning only. Real spam filters train on hundreds of thousands of labelled messages and are evaluated continuously as spammers change their wording.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'projects', q: 'In the library API, which status code means "no copies available"?', options: ['404', '409', '422', '500'], answer: 1, explain: '409 Conflict: the request conflicts with the current state.' },
    { chapterId: 'projects', q: 'Why does the expense tracker store categories as an Enum?', options: ['It is faster', 'Only valid categories can exist, and typos raise errors', 'Enums are required by JSON', 'To save memory'], answer: 1, explain: 'Category("fod") raises ValueError immediately.' },
    { chapterId: 'projects', q: 'What does TfidfVectorizer do in the spam project?', options: ['Trains the classifier', 'Turns text into numeric features based on word importance', 'Removes spam', 'Splits the data'], answer: 1, explain: 'Models need numbers; TF-IDF weights words by how informative they are.' },
    { chapterId: 'projects', q: 'In the sales project, what does resample("ME") do?', options: ['Shuffles rows', 'Groups the time series by month end', 'Removes duplicates', 'Plots the data'], answer: 1, explain: 'Then .sum() gives monthly revenue.' },
  ],
};
