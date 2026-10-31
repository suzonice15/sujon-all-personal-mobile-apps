// Python chapter: Functions. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'functions',
  title: 'Functions',
  description: 'Parameters, *args/**kwargs, scope, closures, lambdas and recursion',
  icon: 'functions',
  lessons: [
    {
      id: 'py-def',
      title: 'Defining Functions',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`def greet(name):
    """Return a friendly greeting."""          # docstring: shown by help(greet)
    return f"Hello, {name}!"

def apply_discount(price, percent=10):        # default value
    return price - price * percent / 100

def log(message):
    print(f"[LOG] {message}")                  # no return -> returns None

print(greet("Sumaiya"))
print(apply_discount(500), apply_discount(500, 25))
result = log("Order placed")
print(result)
print(greet.__doc__)

# Functions are objects: store them, pass them around
operations = {"add": lambda a, b: a + b, "mul": lambda a, b: a * b}
print(operations["mul"](6, 7))` },
        { type: 'note', value: 'A function should do one thing and be named with a verb in snake_case: calculate_total, send_email, is_valid_email.' },
      ],
    },
    {
      id: 'py-arguments',
      title: 'Positional, Keyword, *args and **kwargs',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`def create_user(name, role="student", active=True):
    return f"{name} ({role}, {'active' if active else 'inactive'})"

print(create_user("Rafi"))
print(create_user("Mitu", "teacher"))
print(create_user(name="Ayan", active=False))      # keyword arguments: any order

# *args collects extra positional arguments into a tuple
def total(*prices):
    return sum(prices)
print(total(100, 250, 75))

# **kwargs collects extra keyword arguments into a dict
def build_url(base, **params):
    query = "&".join(f"{k}={v}" for k, v in params.items())
    return f"{base}?{query}" if query else base
print(build_url("/search", q="python", page=2))

# Unpacking when calling
nums = [3, 4]
opts = {"role": "admin", "active": False}
print(total(*nums), create_user("Zara", **opts))

# Keyword-only (after *) and positional-only (before /) parameters
def transfer(amount, /, *, to, note=""):
    return f"Send {amount} to {to} {note}".strip()
print(transfer(500, to="Karim"))
try:
    transfer(500, "Karim")
except TypeError as e:
    print("TypeError:", e)` },
      ],
    },
    {
      id: 'py-mutable-default',
      title: 'The Mutable Default Argument Trap',
      blocks: [
        { type: 'text', value: 'Default values are evaluated ONCE, when the function is defined. A mutable default (list, dict) is therefore shared between every call. This is one of the most famous Python bugs and a favourite interview question.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`def add_item_bad(item, cart=[]):
    cart.append(item)
    return cart

print(add_item_bad("pen"))
print(add_item_bad("book"))        # ['pen', 'book']  surprise!

def add_item(item, cart=None):
    if cart is None:
        cart = []                  # a NEW list on every call
    cart.append(item)
    return cart

print(add_item("pen"))
print(add_item("book"))` },
      ],
    },
    {
      id: 'py-scope',
      title: 'Scope: LEGB, global and nonlocal',
      blocks: [
        { type: 'text', value: 'Python looks up names in four scopes, in order: Local, Enclosing function, Global (module), Built-in. Assigning to a name inside a function makes it local unless you declare otherwise.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`rate = 0.15                     # global

def price_with_tax(price):
    return round(price * (1 + rate), 2)   # reading a global is fine
print(price_with_tax(100))

counter = 0
def increment_bad():
    try:
        counter += 1            # assignment makes counter local -> error
    except UnboundLocalError as e:
        print("UnboundLocalError:", e)
increment_bad()

def increment():
    global counter              # possible, but usually a design smell
    counter += 1
increment()
print(counter)

def make_counter():
    count = 0
    def step():
        nonlocal count          # modify the enclosing function's variable
        count += 1
        return count
    return step

c = make_counter()
print(c(), c(), c())` },
        { type: 'note', value: 'Avoid global state: pass values in as parameters and return results. It makes code easy to test and reason about.' },
      ],
    },
    {
      id: 'py-closures-lambdas',
      title: 'First-Class Functions, Closures and Lambdas',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`# A closure remembers variables from the scope where it was created
def multiplier(factor):
    def multiply(x):
        return x * factor
    return multiply

double, triple = multiplier(2), multiplier(3)
print(double(21), triple(7))

# Lambdas: small anonymous functions (one expression)
square = lambda n: n * n
print(square(9))
print(sorted(["banana", "kiwi", "apple"], key=lambda w: len(w)))

# Higher-order functions
prices = [1200, 450, 15500, 800]
print(list(map(lambda p: p * 1.15, prices)))
print(list(filter(lambda p: p < 1000, prices)))
from functools import reduce
print(reduce(lambda acc, p: acc + p, prices, 0))

# The late-binding closure trap
funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])                      # [2, 2, 2]
funcs = [lambda i=i: i for i in range(3)]        # bind now with a default
print([f() for f in funcs])` },
        { type: 'note', value: 'If a lambda gets long, write a def with a name. Comprehensions ([p * 2 for p in prices]) are usually more readable than map and filter.' },
      ],
    },
    {
      id: 'py-recursion',
      title: 'Recursion',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)
print(factorial(20))

# Walk a nested structure of unknown depth
menu = {"Home": {}, "Courses": {"Python": {"Basics": {}, "Django": {}}, "PHP": {}}}
def show(tree, depth=0):
    for name, children in tree.items():
        print("  " * depth + "- " + name)
        show(children, depth + 1)
show(menu)

# Flatten any nested list
def flatten(items):
    for x in items:
        if isinstance(x, list):
            yield from flatten(x)
        else:
            yield x
print(list(flatten([1, [2, [3, [4]], 5]])))

# Python limits recursion depth (no tail-call optimisation)
import sys
print(sys.getrecursionlimit())
try:
    factorial(100_000)
except RecursionError as e:
    print("RecursionError:", str(e)[:40])` },
        { type: 'note', value: 'For deep data, use a loop with an explicit stack instead of recursion. functools.lru_cache (Decorators chapter) makes recursive algorithms like Fibonacci fast.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'functions', q: 'What does a function without return give back?', options: ['0', 'None', 'An empty string', 'An error'], answer: 1, explain: 'Functions return None by default.' },
    { chapterId: 'functions', q: 'What does *args collect?', options: ['Keyword arguments into a dict', 'Extra positional arguments into a tuple', 'Only the first argument', 'Nothing'], answer: 1, explain: '**kwargs collects keyword arguments into a dict.' },
    { chapterId: 'functions', q: 'Why is def f(x, items=[]) dangerous?', options: ['Lists are slow', 'The same list is shared by every call', 'It is a syntax error', 'items becomes a tuple'], answer: 1, explain: 'Defaults are evaluated once; use items=None.' },
    { chapterId: 'functions', q: 'What does nonlocal do?', options: ['Creates a global variable', 'Lets an inner function assign to a variable of the enclosing function', 'Deletes a variable', 'Imports a variable'], answer: 1, explain: 'It is how closures update their captured state.' },
    { chapterId: 'functions', q: 'In def f(a, /, *, b), how must b be passed?', options: ['Positionally', 'By keyword only', 'Either way', 'It cannot be passed'], answer: 1, explain: 'Parameters after * are keyword-only; those before / are positional-only.' },
    { chapterId: 'functions', q: 'What does [lambda: i for i in range(3)] return when each is called?', options: ['0, 1, 2', '2, 2, 2', '3, 3, 3', 'An error'], answer: 1, explain: 'Closures look up i when called, after the loop ended (late binding).' },
    { chapterId: 'functions', q: 'What is the scope lookup order in Python?', options: ['Global, Local, Built-in', 'Local, Enclosing, Global, Built-in', 'Built-in first', 'Random'], answer: 1, explain: 'LEGB.' },
  ],
};
