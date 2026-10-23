// Python chapter: Databases. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// sqlite3 and SQLAlchemy both run inside Try it (SQLite in memory).

export default {
  id: 'databases',
  title: 'Databases: SQL & SQLAlchemy',
  description: 'sqlite3, parameterized queries, transactions, SQLAlchemy ORM and migrations',
  icon: 'storage',
  lessons: [
    {
      id: 'py-sqlite3',
      title: 'SQL with sqlite3',
      blocks: [
        { type: 'text', value: 'SQLite is a full SQL database in a single file, built into Python. It is perfect for learning, tests, mobile apps and small sites. The same DB-API code (connect, execute, fetch) works with PostgreSQL (psycopg) and MySQL drivers.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import sqlite3

conn = sqlite3.connect(":memory:")          # or "shop.db" for a file
conn.row_factory = sqlite3.Row              # rows behave like dicts

conn.execute("""
    CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL CHECK (price >= 0),
        stock INTEGER NOT NULL DEFAULT 0
    )
""")
conn.executemany(
    "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
    [("Keyboard", 1500, 12), ("Mouse", 450, 0), ("Monitor", 15500, 4)],
)
conn.commit()

for row in conn.execute("SELECT * FROM products ORDER BY price"):
    print(dict(row))

row = conn.execute("SELECT name, price FROM products WHERE id = ?", (3,)).fetchone()
print(row["name"], row["price"])
print(conn.execute("SELECT COUNT(*), SUM(price * stock) FROM products").fetchone()[:])

cur = conn.execute("UPDATE products SET stock = stock + ? WHERE name = ?", (5, "Mouse"))
print(cur.rowcount, "row updated")
conn.close()` },
      ],
    },
    {
      id: 'py-sql-injection',
      title: 'Parameterized Queries (Stop SQL Injection)',
      blocks: [
        { type: 'text', value: 'NEVER build SQL with f-strings or + from user input. Pass values separately with placeholders (? in sqlite3, %s in psycopg, :name in both). The driver then treats input strictly as data.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, role TEXT)")
db.executemany("INSERT INTO users (email, role) VALUES (?, ?)", [("a@x.com", "user"), ("admin@x.com", "admin")])

attack = "' OR '1'='1"                     # typed into a login form

unsafe = f"SELECT * FROM users WHERE email = '{attack}'"
print("Unsafe query returns", len(db.execute(unsafe).fetchall()), "users!")

safe = db.execute("SELECT * FROM users WHERE email = ?", (attack,)).fetchall()
print("Safe query returns", len(safe), "users")

# Named placeholders
row = db.execute("SELECT id, email FROM users WHERE role = :role", {"role": "admin"}).fetchone()
print(row)

# Placeholders work for VALUES only. Allow-list identifiers such as sort columns:
sort = "email; DROP TABLE users"
column = sort if sort in {"email", "role", "id"} else "id"
print(db.execute(f"SELECT email FROM users ORDER BY {column}").fetchall())` },
      ],
    },
    {
      id: 'py-transactions',
      title: 'Transactions',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE accounts (owner TEXT PRIMARY KEY, balance INTEGER CHECK (balance >= 0))")
db.executemany("INSERT INTO accounts VALUES (?, ?)", [("Rahim", 1000), ("Karim", 200)])
db.commit()

def transfer(frm, to, amount):
    try:
        with db:                              # commits on success, rolls back on exception
            db.execute("UPDATE accounts SET balance = balance - ? WHERE owner = ?", (amount, frm))
            db.execute("UPDATE accounts SET balance = balance + ? WHERE owner = ?", (amount, to))
        print(f"transferred {amount}")
    except sqlite3.IntegrityError as e:
        print("rolled back:", e)

def balances():
    return dict(db.execute("SELECT owner, balance FROM accounts"))

transfer("Rahim", "Karim", 300)
print(balances())
transfer("Karim", "Rahim", 5000)              # violates CHECK (balance >= 0)
print(balances())                             # unchanged: no money lost` },
        { type: 'note', value: 'Any operation made of several writes (order + order lines + stock) must be one transaction. In PostgreSQL/MySQL also lock rows you read before updating (SELECT ... FOR UPDATE) when many users act at once.' },
      ],
    },
    {
      id: 'py-sqlalchemy-core',
      title: 'SQLAlchemy 2.0 ORM: Models and Queries',
      blocks: [
        { type: 'text', value: 'SQLAlchemy is the standard Python database toolkit. Its ORM maps classes to tables, and you query with Python instead of SQL strings, safely and portably across SQLite, PostgreSQL and MySQL.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from sqlalchemy import create_engine, ForeignKey, String, select, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, Session

class Base(DeclarativeBase):
    pass

class Author(Base):
    __tablename__ = "authors"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    posts: Mapped[list["Post"]] = relationship(back_populates="author")

class Post(Base):
    __tablename__ = "posts"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    views: Mapped[int] = mapped_column(default=0)
    author_id: Mapped[int] = mapped_column(ForeignKey("authors.id"))
    author: Mapped[Author] = relationship(back_populates="posts")

engine = create_engine("sqlite:///:memory:")      # postgresql+psycopg://user:pass@host/db in production
Base.metadata.create_all(engine)

with Session(engine) as session:
    nadia = Author(name="Nadia", posts=[Post(title="PDO tips", views=120), Post(title="Async Python", views=300)])
    rafi = Author(name="Rafi", posts=[Post(title="Enums", views=80)])
    session.add_all([nadia, rafi])
    session.commit()

    popular = session.scalars(select(Post).where(Post.views > 100).order_by(Post.views.desc())).all()
    print([(p.title, p.author.name) for p in popular])

    stmt = select(Author.name, func.count(Post.id), func.sum(Post.views)).join(Post).group_by(Author.name)
    for name, count, views in session.execute(stmt):
        print(f"{name}: {count} posts, {views} views")

    post = session.get(Post, 3)
    post.views += 1                       # change tracked automatically
    session.commit()
    print(post.title, post.views)` },
      ],
    },
    {
      id: 'py-n-plus-one',
      title: 'Avoiding N+1 Queries and Using Migrations',
      blocks: [
        { type: 'text', value: 'Lazy-loading related objects in a loop runs one extra query per row (the N+1 problem). Load relationships up front with selectinload or joinedload.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from sqlalchemy import create_engine, ForeignKey, select, event
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, Session, selectinload

class Base(DeclarativeBase): pass
class Customer(Base):
    __tablename__ = "customers"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    orders: Mapped[list["Order"]] = relationship()
class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True)
    total: Mapped[int]
    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"))

engine = create_engine("sqlite:///:memory:")
Base.metadata.create_all(engine)
queries = []
event.listen(engine, "before_cursor_execute", lambda *args: queries.append(args[2]))

with Session(engine) as s:
    s.add_all([Customer(name=f"C{i}", orders=[Order(total=i * 100)]) for i in range(1, 6)])
    s.commit()

with Session(engine) as s:
    queries.clear()
    for c in s.scalars(select(Customer)):
        sum(o.total for o in c.orders)           # each access triggers a query
    print("lazy loading:", len(queries), "queries")

with Session(engine) as s:
    queries.clear()
    for c in s.scalars(select(Customer).options(selectinload(Customer.orders))):
        sum(o.total for o in c.orders)
    print("selectinload:", len(queries), "queries")` },
        { type: 'code', lang: 'text', value: String.raw`# Alembic: versioned schema migrations for SQLAlchemy
$ pip install alembic
$ alembic init migrations
$ alembic revision --autogenerate -m "add phone to customers"
$ alembic upgrade head          # apply
$ alembic downgrade -1          # undo the last one` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'databases', q: 'How do you prevent SQL injection in Python?', options: ['f-strings with quotes', 'Parameterized queries with placeholders', 'str.replace("\'", "")', 'Using SQLite'], answer: 1, explain: 'db.execute("... WHERE email = ?", (email,)).' },
    { chapterId: 'databases', q: 'What does "with conn:" do for a sqlite3 connection?', options: ['Closes it', 'Commits on success and rolls back on exception', 'Opens a new file', 'Nothing'], answer: 1, explain: 'It wraps the block in a transaction.' },
    { chapterId: 'databases', q: 'What does sqlite3.Row as row_factory give you?', options: ['Faster queries', 'Rows accessible by column name', 'Automatic joins', 'JSON output'], answer: 1, explain: 'row["name"] instead of row[1].' },
    { chapterId: 'databases', q: 'What is an ORM?', options: ['A database engine', 'A layer mapping classes and objects to tables and rows', 'A query language', 'A backup tool'], answer: 1, explain: 'SQLAlchemy and the Django ORM are examples.' },
    { chapterId: 'databases', q: 'How do you fix N+1 queries in SQLAlchemy?', options: ['Add more indexes', 'Eager load with selectinload/joinedload', 'Use raw SQL only', 'Increase the pool size'], answer: 1, explain: 'Related rows are loaded in one or two queries instead of one per row.' },
    { chapterId: 'databases', q: 'What is Alembic used for?', options: ['Caching', 'Versioned database schema migrations', 'Testing', 'Logging'], answer: 1, explain: 'Schema changes become code you can apply and roll back.' },
  ],
};
