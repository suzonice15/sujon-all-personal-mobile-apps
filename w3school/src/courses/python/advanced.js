// Python chapter: Advanced Python. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'advanced',
  title: 'Advanced Python',
  description: 'Context managers, descriptors, metaclasses, introspection and memory internals',
  icon: 'psychology',
  lessons: [
    {
      id: 'py-context-managers',
      title: 'Context Managers and with',
      blocks: [
        { type: 'text', value: 'A context manager runs setup code when a with block starts and cleanup code when it ends, even if an exception happens. Files, locks, database transactions and timers are all context managers. Write your own with __enter__/__exit__ or with contextlib.contextmanager.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import time
from contextlib import contextmanager, suppress, ExitStack

class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self                          # bound to the "as" name
    def __exit__(self, exc_type, exc, tb):
        self.ms = (time.perf_counter() - self.start) * 1000
        print(f"block took {self.ms:.2f} ms")
        return False                         # False: do not swallow exceptions

with Timer() as t:
    sum(range(500_000))

@contextmanager
def transaction(db):
    print("BEGIN")
    try:
        yield db
        print("COMMIT")
    except Exception:
        print("ROLLBACK")
        raise

db = {"balance": 100}
with transaction(db):
    db["balance"] -= 30
try:
    with transaction(db):
        raise ValueError("payment failed")
except ValueError as e:
    print("caught:", e)

with suppress(FileNotFoundError):            # ignore one specific exception
    open("missing.txt")
print("still running")

with ExitStack() as stack:                   # a dynamic number of context managers
    files = [stack.enter_context(open(f"f{i}.txt", "w")) for i in range(3)]
    print(len(files), "files open")
print(all(f.closed for f in files))` },
      ],
    },
    {
      id: 'py-descriptors',
      title: 'Descriptors: How Properties Work',
      blocks: [
        { type: 'text', value: 'A descriptor is an object with __get__/__set__ placed on a class. property, classmethod, staticmethod, and the fields of Django and SQLAlchemy models are all descriptors. Write one when the same validation repeats across many attributes.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`class Positive:
    def __set_name__(self, owner, name):         # called when the class is created
        self.private = "_" + name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private)

    def __set__(self, obj, value):
        if value <= 0:
            raise ValueError(f"{self.private[1:]} must be positive, got {value}")
        setattr(obj, self.private, value)

class Product:
    price = Positive()
    stock = Positive()

    def __init__(self, name, price, stock):
        self.name, self.price, self.stock = name, price, stock

p = Product("Mouse", 450, 12)
print(p.price, p.stock)
for field, bad in [("price", -1), ("stock", 0)]:
    try:
        setattr(p, field, bad)
    except ValueError as e:
        print("ValueError:", e)
print(type(Product.__dict__["price"]).__name__)` },
      ],
    },
    {
      id: 'py-metaprogramming',
      title: '__init_subclass__, Metaclasses and Dynamic Attributes',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`# __init_subclass__: run code whenever someone subclasses you (simpler than a metaclass)
class Plugin:
    registry = {}
    def __init_subclass__(cls, name=None, **kwargs):
        super().__init_subclass__(**kwargs)
        Plugin.registry[name or cls.__name__.lower()] = cls

class CsvExporter(Plugin, name="csv"): ...
class PdfExporter(Plugin, name="pdf"): ...
print(Plugin.registry)

# A metaclass customises class creation itself (frameworks use this; you rarely need it)
class UpperAttrs(type):
    def __new__(mcls, name, bases, ns):
        ns = {k if k.startswith("__") else k.upper(): v for k, v in ns.items()}
        return super().__new__(mcls, name, bases, ns)

class Config(metaclass=UpperAttrs):
    debug = True
    port = 8000
print(Config.DEBUG, Config.PORT, hasattr(Config, "debug"))

# __getattr__ is called only for MISSING attributes
class Settings:
    def __init__(self, data):
        self._data = data
    def __getattr__(self, name):
        try:
            return self._data[name]
        except KeyError:
            raise AttributeError(name) from None

s = Settings({"theme": "dark", "lang": "bn"})
print(s.theme, s.lang, getattr(s, "missing", "default"))

# Build a class at runtime with type(name, bases, namespace)
Point = type("Point", (), {"__init__": lambda self, x, y: setattr(self, "xy", (x, y))})
print(Point(1, 2).xy)` },
        { type: 'note', value: '"Metaclasses are deeper magic than 99% of users should ever worry about" (Tim Peters). Reach for decorators, __init_subclass__ or descriptors first.' },
      ],
    },
    {
      id: 'py-introspection',
      title: 'Introspection and Bytecode',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import inspect, dis

def transfer(amount: int, to: str, *, note: str = "") -> bool:
    """Send money to someone."""
    return amount > 0

sig = inspect.signature(transfer)
print(sig)
for name, param in sig.parameters.items():
    default = "none" if param.default is inspect.Parameter.empty else repr(param.default)
    print(f"  {name}: {param.kind.name}, default={default}, type={param.annotation.__name__}")
print(inspect.getdoc(transfer), "|", transfer.__module__, "|", callable(transfer))
print(inspect.getsource(transfer).splitlines()[0])

class Shape:
    def area(self): ...
print([m for m, _ in inspect.getmembers(Shape, inspect.isfunction)])

# CPython compiles code to bytecode for its virtual machine
def add(a, b):
    return a + b
dis.dis(add)` },
      ],
    },
    {
      id: 'py-memory',
      title: 'Memory, References and Garbage Collection',
      blocks: [
        { type: 'text', value: 'CPython frees an object as soon as nothing refers to it (reference counting). A cycle detector (gc) cleans up objects that refer to each other. weakref lets you refer to an object without keeping it alive, which is perfect for caches.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import sys, gc, weakref

print(sys.getsizeof(0), sys.getsizeof(10**100), sys.getsizeof("a"), sys.getsizeof("a" * 100))
print(sys.getsizeof([]), sys.getsizeof([1, 2, 3]), sys.getsizeof({}), sys.getsizeof(()))

data = [1, 2, 3]
alias = data
print("references:", sys.getrefcount(data) - 1)      # -1 for the argument itself

# Small ints and some strings are cached (interned): an implementation detail!
a, b = 256, 256
print(a is b)

# Reference cycles are cleaned by the garbage collector
class Node:
    def __init__(self):
        self.other = None
x, y = Node(), Node()
x.other, y.other = y, x
del x, y
print("collected:", gc.collect() >= 0)

# Weak references do not keep objects alive
class Image:
    def __init__(self, name): self.name = name
cache = weakref.WeakValueDictionary()
img = Image("logo.png")
cache["logo"] = img
print("logo" in cache)
del img
gc.collect()
print("logo" in cache)` },
        { type: 'note', value: 'Never rely on "is" for numbers or strings: caching small ints and interning strings are CPython implementation details. Use == for values.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'advanced', q: 'Which methods make a class usable in a with statement?', options: ['__open__ and __close__', '__enter__ and __exit__', '__start__ and __stop__', '__with__'], answer: 1, explain: 'Or write a generator with @contextmanager.' },
    { chapterId: 'advanced', q: 'If __exit__ returns True, what happens to an exception from the block?', options: ['It is re-raised', 'It is suppressed', 'It is logged', 'The program exits'], answer: 1, explain: 'Return False (or None) to let exceptions propagate.' },
    { chapterId: 'advanced', q: 'What is a descriptor?', options: ['A docstring', 'An object with __get__/__set__ that controls attribute access on a class', 'A metaclass', 'A file handle'], answer: 1, explain: 'property and ORM fields are descriptors.' },
    { chapterId: 'advanced', q: 'When is __getattr__ called?', options: ['For every attribute access', 'Only when normal lookup fails to find the attribute', 'Only for methods', 'Never'], answer: 1, explain: '__getattribute__ is the one called for every access.' },
    { chapterId: 'advanced', q: 'What is the simplest way to run code whenever a class is subclassed?', options: ['A metaclass', '__init_subclass__', '__new__', 'A decorator on every subclass'], answer: 1, explain: 'It is called on the parent each time a subclass is created.' },
    { chapterId: 'advanced', q: 'How does CPython mainly free memory?', options: ['Only a periodic garbage collector', 'Reference counting, plus a cycle collector', 'Manual free()', 'It never frees memory'], answer: 1, explain: 'Objects are freed when their reference count reaches zero.' },
  ],
};
