// Python chapter: Decorators and functools. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'decorators',
  title: 'Decorators & functools',
  description: 'Writing decorators, decorators with arguments, caching and functional tools',
  icon: 'auto-fix-high',
  lessons: [
    {
      id: 'py-decorator-basics',
      title: 'What a Decorator Is',
      blocks: [
        { type: 'text', value: 'A decorator is a function that takes a function and returns a new function that adds behaviour around it. @decorator above a def is just shorthand for func = decorator(func). Frameworks use them everywhere: @app.get("/"), @pytest.fixture, @login_required.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import functools, time

def timer(func):
    @functools.wraps(func)                 # keep the original name and docstring
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = (time.perf_counter() - start) * 1000
        print(f"{func.__name__} took {elapsed:.2f} ms")
        return result
    return wrapper

@timer
def slow_sum(n):
    """Add numbers the slow way."""
    return sum(i for i in range(n))

print(slow_sum(200_000))
print(slow_sum.__name__, "|", slow_sum.__doc__)

# The same thing without the @ syntax
def shout(text):
    return text.upper()
shout = timer(shout)
print(shout("hi"))` },
        { type: 'note', value: 'Always use @functools.wraps in your wrapper. Without it the decorated function loses its __name__, docstring and signature, which breaks debugging, logging and tools.' },
      ],
    },
    {
      id: 'py-decorator-args',
      title: 'Decorators with Arguments',
      blocks: [
        { type: 'text', value: 'A decorator that takes options needs one more level: a function that receives the options and returns the real decorator.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import functools, random

def retry(times=3, exceptions=(Exception,)):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    print(f"  attempt {attempt} failed: {e}")
                    if attempt == times:
                        raise
        return wrapper
    return decorator

random.seed(3)

@retry(times=5, exceptions=(ConnectionError,))
def fetch_rates():
    if random.random() < 0.6:
        raise ConnectionError("gateway timeout")
    return {"USD": 122.5}

print(fetch_rates())

# A registry decorator: collect functions by name (how routers work)
COMMANDS = {}
def command(name):
    def register(func):
        COMMANDS[name] = func
        return func
    return register

@command("hello")
def hello(who): return f"Hello {who}"

@command("add")
def add(a, b): return int(a) + int(b)

for line in ["hello Nadia", "add 2 40"]:
    name, *args = line.split()
    print(COMMANDS[name](*args))` },
      ],
    },
    {
      id: 'py-lru-cache',
      title: 'Caching with lru_cache and cache',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from functools import lru_cache, cache
import time

@cache                                   # unlimited memoization
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

start = time.perf_counter()
print(fib(300))
print(f"{(time.perf_counter() - start) * 1000:.2f} ms")
print(fib.cache_info())

@lru_cache(maxsize=128)                  # keep only the 128 most recently used results
def exchange_rate(currency):
    print(f"  (slow lookup for {currency})")
    return {"USD": 122.5, "EUR": 133.1}[currency]

for c in ["USD", "EUR", "USD", "USD"]:
    print(c, exchange_rate(c))
print(exchange_rate.cache_info())
exchange_rate.cache_clear()` },
        { type: 'note', value: 'Only cache pure functions (same input, same output, no side effects), and remember the arguments must be hashable. For data that changes, use a cache with a time limit (TTL) instead.' },
      ],
    },
    {
      id: 'py-functools-more',
      title: 'partial, singledispatch, reduce and operator',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from functools import partial, reduce, singledispatch
import operator

# partial: pre-fill some arguments
def format_price(amount, currency="BDT", decimals=2):
    return f"{amount:,.{decimals}f} {currency}"
usd = partial(format_price, currency="USD")
whole_taka = partial(format_price, decimals=0)
print(usd(12.5), "|", whole_taka(1999.99))

# singledispatch: one function, different code per argument type
@singledispatch
def to_text(value):
    return str(value)

@to_text.register
def _(value: list):
    return ", ".join(to_text(v) for v in value)

@to_text.register
def _(value: dict):
    return "; ".join(f"{k}={to_text(v)}" for k, v in value.items())

@to_text.register
def _(value: float):
    return f"{value:.2f}"

print(to_text([1, 2.5, {"a": [3, 4.0]}]))

# reduce and the operator module
nums = [3, 5, 7]
print(reduce(operator.mul, nums, 1))
print(sorted([("b", 2), ("a", 9)], key=operator.itemgetter(1)))
print(list(map(operator.attrgetter("real"), [1 + 2j, 3 + 4j])))` },
      ],
    },
    {
      id: 'py-class-decorators',
      title: 'Decorating Classes and Methods',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import functools

# A method decorator that checks permissions (like Django's @permission_required)
def requires(permission):
    def decorator(method):
        @functools.wraps(method)
        def wrapper(self, user, *args, **kwargs):
            if permission not in user["perms"]:
                raise PermissionError(f"{user['name']} needs {permission!r}")
            return method(self, user, *args, **kwargs)
        return wrapper
    return decorator

class ArticleService:
    @requires("publish")
    def publish(self, user, article_id):
        return f"article {article_id} published by {user['name']}"

svc = ArticleService()
print(svc.publish({"name": "Editor", "perms": {"publish"}}, 7))
try:
    svc.publish({"name": "Guest", "perms": set()}, 7)
except PermissionError as e:
    print("PermissionError:", e)

# A class decorator: register model classes
REGISTRY = {}
def model(cls):
    REGISTRY[cls.__name__.lower()] = cls
    return cls

@model
class Product: ...
@model
class Customer: ...
print(REGISTRY)

# cached_property: compute once per instance
from functools import cached_property
class Report:
    @cached_property
    def stats(self):
        print("  computing stats...")
        return {"total": 42}
r = Report()
print(r.stats, r.stats)` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'decorators', q: 'What is @timer above def f() equivalent to?', options: ['timer() = f', 'f = timer(f)', 'f = f(timer)', 'import timer'], answer: 1, explain: 'The decorator receives the function and its result replaces it.' },
    { chapterId: 'decorators', q: 'Why use functools.wraps in a decorator?', options: ['It makes it faster', 'It copies the original function\'s name, docstring and metadata to the wrapper', 'It adds caching', 'It is required syntax'], answer: 1, explain: 'Without it, debugging and tools see "wrapper".' },
    { chapterId: 'decorators', q: 'How many nested functions does a decorator WITH arguments usually have?', options: ['One', 'Two', 'Three (options -> decorator -> wrapper)', 'None'], answer: 2, explain: '@retry(times=3) calls retry first, which returns the actual decorator.' },
    { chapterId: 'decorators', q: 'What does @lru_cache(maxsize=128) do?', options: ['Limits recursion', 'Remembers results for the 128 most recent argument combinations', 'Runs the function 128 times', 'Logs calls'], answer: 1, explain: 'Least-recently-used entries are evicted.' },
    { chapterId: 'decorators', q: 'What does functools.partial create?', options: ['A copy of a list', 'A new callable with some arguments pre-filled', 'A generator', 'A decorator'], answer: 1, explain: 'partial(format_price, currency="USD").' },
    { chapterId: 'decorators', q: 'Which functions are safe to cache?', options: ['Any function', 'Pure functions with hashable arguments', 'Functions that write files', 'Functions using random'], answer: 1, explain: 'Caching side effects or changing data gives wrong results.' },
  ],
};
