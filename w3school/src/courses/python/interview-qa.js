// Python interview questions, grouped by chapter id (see src/courses/index.js).
// Questions with tryIt: true open their code in the Try it editor.

export default {
  'getting-started': [
    { level: 'basic', q: 'What are the main features of Python?', a: 'Readable syntax with significant indentation, dynamic typing with optional type hints, automatic memory management, a large standard library, and a huge package ecosystem (PyPI). It is interpreted by CPython, which compiles code to bytecode for a virtual machine.' },
    { level: 'basic', q: 'Is Python compiled or interpreted?', a: 'Both: CPython compiles source to bytecode (cached in __pycache__ as .pyc files) and then interprets that bytecode. Other implementations exist, such as PyPy with a JIT compiler.' },
    { level: 'intermediate', q: 'What is PEP 8?', a: 'The official style guide: 4-space indentation, snake_case for functions and variables, CapWords for classes, UPPER_CASE for constants, spaces around operators, and readable line lengths. Tools like Ruff enforce it automatically.' },
    { level: 'intermediate', q: 'What does if __name__ == "__main__": do?', a: 'It runs the block only when the file is executed directly, not when it is imported as a module. This lets a file be both a reusable module and a script.' },
  ],
  'variables-types': [
    { level: 'basic', q: 'What is the difference between mutable and immutable types?', a: 'Immutable objects (int, float, str, tuple, frozenset) cannot change after creation; operations create new objects. Mutable objects (list, dict, set, most class instances) change in place, so every reference sees the change.', code: String.raw`a = [1, 2]
b = a
b.append(3)
print(a)          # [1, 2, 3]
s = "hi"
t = s
t += "!"
print(s, t)       # hi hi!`, lang: 'python', tryIt: true },
    { level: 'basic', q: 'What is the difference between is and ==?', a: '== checks whether two objects have equal values (calls __eq__). is checks whether they are the same object (identity). Use is for None and singletons only.' },
    { level: 'intermediate', q: 'Why is 0.1 + 0.2 != 0.3?', a: 'Floats are binary IEEE-754 numbers and cannot represent most decimal fractions exactly. Compare with math.isclose(), or use decimal.Decimal (or integer cents) for money.' },
    { level: 'intermediate', q: 'Which values are falsy?', a: 'False, None, zero of any numeric type (0, 0.0, 0j), empty sequences and collections ("", [], (), {}, set(), range(0)), and objects whose __bool__ returns False or __len__ returns 0.' },
  ],
  strings: [
    { level: 'basic', q: 'How do you reverse a string?', a: 'Use slicing with a negative step: s[::-1]. reversed(s) returns an iterator, so "".join(reversed(s)) also works.' },
    { level: 'intermediate', q: 'Why is repeated string concatenation slow, and what should you use instead?', a: 'Strings are immutable, so s += piece may create a new string each time, giving O(n²) behaviour in a loop. Collect pieces in a list and call "".join(pieces) once.' },
    { level: 'intermediate', q: 'What is the difference between str and bytes?', a: 'str is a sequence of Unicode characters; bytes is a sequence of raw 8-bit values. Convert with s.encode("utf-8") and b.decode("utf-8"). Files opened in text mode give str; binary mode ("rb") gives bytes.' },
    { level: 'advanced', q: 'What are f-string features beyond inserting variables?', a: 'Any expression in braces, format specs ({x:,.2f}, {n:05d}, {p:.1%}, {d:%Y-%m-%d}), conversions (!r, !s), the = debug specifier ({total=}), and since 3.12 nested quotes and multi-line expressions.' },
  ],
  'operators-control': [
    { level: 'basic', q: 'What do and / or return?', a: 'They short-circuit and return one of the operands, not necessarily a bool: a or b returns a if a is truthy, otherwise b; a and b returns a if a is falsy, otherwise b. That is why name or "Guest" works as a default.' },
    { level: 'intermediate', q: 'What is the for-else construct?', a: 'The else block of a for or while loop runs only if the loop completed without break. It is useful for search loops: break when found, else handle "not found".' },
    { level: 'intermediate', q: 'What is structural pattern matching?', a: 'match/case (3.10+) matches values, types, sequences and mappings against patterns, binds parts to variables, and supports guards (case x if x > 0). It is more powerful than a switch statement.' },
    { level: 'advanced', q: 'What is the walrus operator?', a: ':= assigns a value inside an expression and returns it, e.g. while (chunk := f.read(8192)): or if (m := pattern.search(text)): print(m.group()). It avoids repeating a computation.' },
  ],
  'lists-tuples': [
    { level: 'basic', q: 'What is the difference between a list and a tuple?', a: 'Lists are mutable and usually hold a variable number of similar items. Tuples are immutable, slightly faster and smaller, hashable (if their items are), and usually hold a fixed structure like a coordinate or a record.' },
    { level: 'intermediate', q: 'sort() vs sorted()?', a: 'list.sort() sorts in place and returns None; it only works on lists. sorted(iterable) returns a new sorted list from any iterable. Both accept key= and reverse= and are stable.' },
    { level: 'intermediate', q: 'Shallow copy vs deep copy?', a: 'A shallow copy (list.copy(), list(x), x[:], copy.copy) creates a new outer container but shares the inner objects. copy.deepcopy recursively copies everything, so nested objects become independent.', code: String.raw`import copy
a = [[1], [2]]
s, d = a.copy(), copy.deepcopy(a)
a[0].append(99)
print(s, d)`, lang: 'python', tryIt: true },
    { level: 'advanced', q: 'Why is [[0] * 3] * 3 a bug?', a: 'The outer * repeats a reference to the SAME inner list three times, so changing grid[0][0] changes every row. Build it with a comprehension: [[0] * 3 for _ in range(3)].' },
  ],
  'dicts-sets': [
    { level: 'basic', q: 'How do dictionaries work internally?', a: 'A dict is a hash table: hash(key) chooses a slot, and == confirms the key. Lookups, inserts and deletes are O(1) on average. Since Python 3.7 dicts preserve insertion order.' },
    { level: 'intermediate', q: 'What are the requirements for a dict key?', a: 'It must be hashable: its hash must never change and equal objects must have equal hashes. Immutable built-ins (str, int, tuple of hashables, frozenset) qualify; lists, dicts and sets do not.' },
    { level: 'intermediate', q: 'When would you use defaultdict and Counter?', a: 'defaultdict(list) or defaultdict(int) creates missing values automatically for grouping or counting. Counter counts hashable items and offers most_common(), arithmetic between counters and missing keys counting as 0.' },
    { level: 'advanced', q: 'How do you remove duplicates from a list while keeping order?', a: 'list(dict.fromkeys(items)) works because dict keys are unique and ordered. A set loses order. For unhashable items, keep a seen collection of a hashable key.', code: String.raw`items = ["b", "a", "b", "c", "a"]
print(list(dict.fromkeys(items)))`, lang: 'python', tryIt: true },
  ],
  functions: [
    { level: 'basic', q: 'Explain *args and **kwargs.', a: '*args collects extra positional arguments into a tuple and **kwargs collects extra keyword arguments into a dict. They make flexible APIs and wrappers (decorators) possible. In calls, * and ** unpack.' },
    { level: 'intermediate', q: 'What is a closure?', a: 'An inner function that remembers variables from its enclosing function even after the outer function returned. Used for factories, callbacks and decorators. Use nonlocal to rebind a captured variable.' },
    { level: 'intermediate', q: 'What is the LEGB rule?', a: 'Name lookup order: Local, Enclosing function scopes, Global (module), Built-in. Assigning to a name in a function makes it local unless declared global or nonlocal.' },
    { level: 'advanced', q: 'Why do lambdas created in a loop all return the same value?', a: 'Closures look up variables when called (late binding), and after the loop the variable holds its last value. Bind the current value with a default argument: lambda i=i: i, or use functools.partial.' },
  ],
  comprehensions: [
    { level: 'basic', q: 'What is a list comprehension?', a: 'A concise expression that builds a list: [expr for item in iterable if condition]. It is usually faster and clearer than appending in a loop. Dict and set comprehensions use {}.' },
    { level: 'intermediate', q: 'Iterable vs iterator?', a: 'An iterable can produce an iterator via iter() (lists, strings, dicts). An iterator has __next__, returns items one by one, raises StopIteration when finished and is single-use. Every iterator is also iterable.' },
    { level: 'intermediate', q: 'What is a generator and why use one?', a: 'A function with yield (or a generator expression) that produces values lazily. It uses constant memory regardless of the sequence size, can represent infinite sequences, and enables pipelines.' },
    { level: 'advanced', q: 'What does yield from do?', a: 'It delegates to another iterable or generator, yielding all its values (and passing send/throw through). It simplifies recursive generators such as tree walkers.' },
  ],
  'modules-packages': [
    { level: 'basic', q: 'Module vs package?', a: 'A module is a single .py file. A package is a directory of modules, usually with an __init__.py, imported with dotted names (shop.models).' },
    { level: 'intermediate', q: 'Why use a virtual environment?', a: 'It isolates a project\'s installed packages and versions from other projects and the system Python, making installs reproducible. Create with python -m venv .venv or uv.' },
    { level: 'intermediate', q: 'What happens when you import a module?', a: 'Python checks sys.modules; if absent, it finds the module along sys.path, compiles it to bytecode (cached as .pyc), executes it once, stores it in sys.modules and binds the name.' },
    { level: 'advanced', q: 'How do you avoid circular imports?', a: 'Restructure so shared code lives in a third module, import inside functions where needed, import modules rather than names (import a; a.func), or use TYPE_CHECKING blocks for type-only imports.' },
  ],
  files: [
    { level: 'basic', q: 'Why use with open(...)?', a: 'The context manager closes the file automatically when the block ends, even if an exception occurs, avoiding leaked file handles and unflushed data.' },
    { level: 'intermediate', q: 'How do you read a huge file efficiently?', a: 'Iterate the file object line by line (for line in f), or read fixed-size chunks in binary mode in a loop. Never f.read() the whole thing into memory.' },
    { level: 'intermediate', q: 'json.load vs json.loads?', a: 'json.load reads from a file object; json.loads parses a string. Similarly json.dump writes to a file and json.dumps returns a string.' },
    { level: 'advanced', q: 'Why prefer pathlib over os.path?', a: 'pathlib gives object-oriented paths: / to join, .name/.suffix/.parent, read_text/write_text, glob/rglob, and it works the same on Windows and Unix.' },
  ],
  errors: [
    { level: 'basic', q: 'Explain try/except/else/finally.', a: 'try contains code that may fail; except handles specific exceptions; else runs only if no exception occurred; finally always runs for cleanup.' },
    { level: 'intermediate', q: 'How do you create a custom exception?', a: 'Subclass Exception (or a more specific built-in), optionally with extra attributes. Build a small hierarchy (AppError -> PaymentError) so callers can catch broadly or precisely.' },
    { level: 'intermediate', q: 'What is the difference between raise and raise X from e?', a: 'A bare raise inside except re-raises the current exception with its traceback. raise New(...) from e chains exceptions, storing the cause in __cause__ so tracebacks show both.' },
    { level: 'advanced', q: 'What are ExceptionGroup and except*?', a: 'ExceptionGroup (3.11+) bundles several exceptions, e.g. from concurrent tasks or validation. except* ValueError handles the matching exceptions inside a group while others continue to propagate.' },
  ],
  'oop-basics': [
    { level: 'basic', q: 'What is self?', a: 'The instance a method is called on. Python passes it automatically as the first argument: obj.method(x) becomes Class.method(obj, x).' },
    { level: 'intermediate', q: '__str__ vs __repr__?', a: '__repr__ is an unambiguous developer representation (ideally valid code), used in the REPL, logs and containers. __str__ is a readable user-facing representation used by print() and str(); it falls back to __repr__.' },
    { level: 'intermediate', q: 'classmethod vs staticmethod?', a: 'A classmethod receives the class (cls) and is used for alternative constructors and class-level operations that respect subclasses. A staticmethod receives nothing special; it is a plain function namespaced in the class.' },
    { level: 'advanced', q: 'When would you use a dataclass?', a: 'For classes that mainly hold data: it generates __init__, __repr__ and __eq__ from annotated fields, supports defaults (field(default_factory=list)), ordering, frozen immutable instances and slots.' },
  ],
  'oop-advanced': [
    { level: 'intermediate', q: 'What is the MRO?', a: 'The Method Resolution Order, computed with the C3 linearisation, defines the order in which base classes are searched for attributes. super() follows the MRO, which makes cooperative multiple inheritance work. See Class.__mro__.' },
    { level: 'intermediate', q: 'ABC vs Protocol?', a: 'An abstract base class requires explicit inheritance and blocks instantiation until abstract methods are implemented. A typing.Protocol describes required methods structurally: any class with those methods matches, without inheriting (static duck typing).' },
    { level: 'advanced', q: 'What is duck typing?', a: 'Using an object based on the methods and behaviour it has, not its type: if it has .read(), treat it as a file. Python embraces it; isinstance checks are used sparingly.' },
    { level: 'advanced', q: 'What do __slots__ do?', a: 'They declare a fixed set of attributes and remove the per-instance __dict__, saving memory and speeding attribute access for many small objects, at the cost of not being able to add arbitrary attributes.' },
  ],
  decorators: [
    { level: 'basic', q: 'What is a decorator?', a: 'A callable that takes a function (or class) and returns a replacement, usually a wrapper that adds behaviour. @deco above def f is shorthand for f = deco(f).' },
    { level: 'intermediate', q: 'Write a timing decorator.', a: 'Define a wrapper(*args, **kwargs) that records time.perf_counter() before and after calling the function, decorate it with functools.wraps(func), and return it.', code: String.raw`import functools, time
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        t = time.perf_counter()
        try:
            return func(*args, **kwargs)
        finally:
            print(f"{func.__name__}: {(time.perf_counter() - t) * 1000:.2f} ms")
    return wrapper

@timer
def work(n): return sum(range(n))
print(work(100_000))`, lang: 'python', tryIt: true },
    { level: 'intermediate', q: 'Why use functools.wraps?', a: 'It copies __name__, __doc__, __module__, __qualname__ and __wrapped__ from the original function to the wrapper, so debugging, logging, documentation and introspection still work.' },
    { level: 'advanced', q: 'How does lru_cache work and when is it unsafe?', a: 'It stores results keyed by the (hashable) arguments and evicts the least recently used entries beyond maxsize. It is unsafe for functions with side effects or results that change over time, and arguments must be hashable.' },
  ],
  typing: [
    { level: 'basic', q: 'Are type hints enforced at runtime?', a: 'No. They are annotations used by type checkers (mypy, Pyright), editors and libraries. To validate data at runtime use pydantic or explicit checks.' },
    { level: 'intermediate', q: 'What is Optional[int]?', a: 'A type that is either int or None. In modern Python write int | None.' },
    { level: 'intermediate', q: 'What is TypedDict used for?', a: 'Describing the expected keys and value types of a dictionary, for example JSON payloads, so type checkers catch missing keys and wrong types.' },
    { level: 'advanced', q: 'What are generics?', a: 'Type parameters that link types: def first[T](xs: list[T]) -> T says the return type equals the element type. Classes can be generic too (class Stack[T]). Bounds and constraints restrict T.' },
  ],
  stdlib: [
    { level: 'basic', q: 'Naive vs aware datetimes?', a: 'Naive datetimes have no time zone and are ambiguous. Aware datetimes carry tzinfo (zoneinfo.ZoneInfo("Asia/Dhaka") or timezone.utc). Store aware UTC and convert for display.' },
    { level: 'intermediate', q: 'random vs secrets?', a: 'random is a fast pseudo-random generator for simulations and games, reproducible with seed() and predictable. secrets uses the OS cryptographic source and must be used for tokens, passwords and OTPs.' },
    { level: 'intermediate', q: 're.match vs re.search vs re.fullmatch?', a: 'match anchors at the start of the string, search finds the first match anywhere, fullmatch requires the entire string to match. Use raw strings for patterns.' },
    { level: 'advanced', q: 'Why use enum.Enum instead of string constants?', a: 'Enums restrict values to a defined set, give readable names, support iteration and methods, and catch typos at once: Status("shiped") raises ValueError. StrEnum and IntEnum interoperate with strings and ints.' },
  ],
  testing: [
    { level: 'basic', q: 'Why pytest over unittest?', a: 'Plain assert statements with detailed failure output, fixtures with dependency injection, parametrize, a rich plugin ecosystem, and less boilerplate. It also runs unittest-style tests.' },
    { level: 'intermediate', q: 'What is a fixture?', a: 'A function decorated with @pytest.fixture that provides setup (and teardown after yield) to tests that request it by parameter name. Scopes (function, module, session) control how often it runs; shared fixtures go in conftest.py.' },
    { level: 'intermediate', q: 'What is mocking and when should you use it?', a: 'Replacing a real dependency with a fake object that records calls and returns configured values (unittest.mock.Mock, patch). Use it for slow or external things like HTTP APIs, email and time, not for your own simple code.' },
    { level: 'advanced', q: 'How do you test code that depends on the current time?', a: 'Inject a clock or "now" parameter, or patch time/datetime (freezegun or time-machine libraries) so tests are deterministic.' },
  ],
  concurrency: [
    { level: 'basic', q: 'Threading vs multiprocessing vs asyncio?', a: 'Threads: concurrent I/O within one process, limited by the GIL for CPU work. Processes: real parallelism on several cores for CPU-bound work, with higher overhead. asyncio: a single-threaded event loop running many cooperative coroutines, ideal for many concurrent network connections.' },
    { level: 'intermediate', q: 'What is the GIL and why does it exist?', a: 'The Global Interpreter Lock ensures only one thread runs Python bytecode at a time in CPython. It simplifies memory management (reference counting) and C extensions. I/O and many C libraries release it. Python 3.13+ offers an experimental free-threaded build.' },
    { level: 'intermediate', q: 'What is a race condition and how do you prevent it?', a: 'When the result depends on the timing of concurrent operations on shared data, like two threads doing counter += 1. Prevent it with locks, queues (message passing), immutable data or atomic operations.' },
    { level: 'advanced', q: 'How do you call blocking code from async code?', a: 'Run it in a thread with await asyncio.to_thread(func, *args) (or loop.run_in_executor), or use an async-native library. Calling it directly blocks the whole event loop.' },
  ],
  advanced: [
    { level: 'intermediate', q: 'How do you write a context manager?', a: 'Implement __enter__ and __exit__ in a class, or decorate a generator with contextlib.contextmanager: code before yield is setup, after yield is cleanup (in try/finally).' },
    { level: 'advanced', q: 'What is a descriptor?', a: 'An object defining __get__, __set__ or __delete__ that controls attribute access when stored on a class. property, methods, classmethod, staticmethod and ORM fields are descriptors.' },
    { level: 'advanced', q: 'What is a metaclass?', a: 'The class of a class (type by default). It customises class creation. Most needs are better met with class decorators or __init_subclass__.' },
    { level: 'advanced', q: 'How does Python garbage collection work?', a: 'Reference counting frees objects immediately when their count reaches zero; a generational cycle collector (gc module) finds groups of objects that refer to each other. weakref allows references that do not keep objects alive.' },
  ],
  databases: [
    { level: 'basic', q: 'How do you prevent SQL injection in Python?', a: 'Always pass values as parameters: cursor.execute("SELECT * FROM users WHERE email = ?", (email,)), or use an ORM. Never format SQL with f-strings. Allow-list identifiers like column names.' },
    { level: 'intermediate', q: 'What is a database transaction?', a: 'A group of statements that commit together or roll back together (atomicity). In sqlite3, "with conn:" commits on success and rolls back on exception. SQLAlchemy uses session.commit() and session.rollback() or session.begin() blocks.' },
    { level: 'intermediate', q: 'What is the N+1 problem in ORMs?', a: 'Loading N parent rows, then lazily running one query per row for related data. Fix with eager loading: selectinload/joinedload in SQLAlchemy, select_related/prefetch_related in Django.' },
    { level: 'advanced', q: 'Why use migrations?', a: 'Schema changes become versioned code (Alembic, Django migrations) that every developer and server applies in order, can be reviewed, and can be rolled back.' },
  ],
  'web-apis': [
    { level: 'basic', q: 'What are the main HTTP methods and status codes?', a: 'GET read, POST create, PUT replace, PATCH update, DELETE remove. 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Validation error, 429 Too Many Requests, 500 Server Error.' },
    { level: 'intermediate', q: 'Why is FastAPI popular?', a: 'It uses type hints for validation (pydantic), serialization and automatic OpenAPI docs, supports async natively, has dependency injection, and is fast. It reduces boilerplate and errors.' },
    { level: 'intermediate', q: 'WSGI vs ASGI?', a: 'WSGI is the synchronous interface between Python web apps and servers (Flask, Django with gunicorn). ASGI is its async successor supporting websockets and long-lived connections (FastAPI, Starlette, Django async, uvicorn).' },
    { level: 'advanced', q: 'How do you secure an API?', a: 'HTTPS, authentication (OAuth2/JWT or session cookies), authorization checks per object, input validation, rate limiting, CORS restricted to known origins, secrets in environment variables, and logging and monitoring.' },
  ],
  django: [
    { level: 'basic', q: 'Explain Django\'s MVT architecture.', a: 'Model (data and ORM), View (handles the request and returns a response), Template (presentation). URLconf routes URLs to views. Django calls it MVT because the framework itself acts as the controller.' },
    { level: 'intermediate', q: 'select_related vs prefetch_related?', a: 'select_related follows ForeignKey and OneToOne relations with a SQL JOIN in one query. prefetch_related runs a separate query for many-to-many and reverse relations and joins them in Python.' },
    { level: 'intermediate', q: 'How does Django protect against CSRF?', a: 'CsrfViewMiddleware requires a secret token in POST forms ({% csrf_token %}) and AJAX headers, checked against the user\'s CSRF cookie, so other sites cannot submit forms on the user\'s behalf.' },
    { level: 'advanced', q: 'What are Django signals and when should you avoid them?', a: 'Signals (post_save, pre_delete...) let decoupled code react to events. Overuse hides control flow and makes debugging hard; prefer explicit service functions for business logic.' },
  ],
  'data-analysis': [
    { level: 'basic', q: 'Why is NumPy faster than Python lists for numbers?', a: 'Arrays store one data type contiguously in memory, and operations are vectorized loops in compiled C, avoiding per-element Python overhead.' },
    { level: 'intermediate', q: 'loc vs iloc?', a: 'loc selects by labels (index values and column names, end inclusive in slices); iloc selects by integer positions (end exclusive). Use loc for assignments with boolean masks.' },
    { level: 'intermediate', q: 'How do you handle missing data in pandas?', a: 'Detect with isna(), then dropna() rows or columns, or fillna() with a constant, mean/median or forward fill, depending on the meaning of the data. pd.to_numeric(errors="coerce") turns bad values into NaN first.' },
    { level: 'advanced', q: 'merge vs join vs concat?', a: 'merge combines DataFrames on key columns like SQL joins (inner, left, right, outer). join is a convenience for joining on the index. concat stacks DataFrames vertically or side by side.' },
  ],
  visualization: [
    { level: 'basic', q: 'Which chart would you use to compare categories, show a trend, and show a distribution?', a: 'Bar chart for categories, line chart for trends over time, histogram (or box plot) for distributions. Scatter plots show relationships between two variables.' },
    { level: 'intermediate', q: 'Why use the object-oriented matplotlib API (fig, ax)?', a: 'It makes it explicit which axes you draw on, which matters for subplots and reusable plotting functions, instead of relying on the global current-figure state of plt.' },
    { level: 'advanced', q: 'How do you avoid misleading charts?', a: 'Start bar axes at zero, label axes with units, avoid 3D and too many pie slices, use consistent scales across compared charts, and annotate the key message.' },
  ],
  'machine-learning': [
    { level: 'basic', q: 'Supervised vs unsupervised learning?', a: 'Supervised learning trains on labelled examples to predict labels (regression, classification). Unsupervised learning finds structure in unlabelled data (clustering, dimensionality reduction).' },
    { level: 'intermediate', q: 'What is overfitting and how do you prevent it?', a: 'The model memorises training data and performs poorly on new data. Prevent it with more data, simpler models or regularisation, cross-validation, early stopping, and evaluating on a held-out test set.' },
    { level: 'intermediate', q: 'Precision vs recall?', a: 'Precision: of the predicted positives, the fraction that are correct. Recall: of the actual positives, the fraction found. The trade-off depends on whether false alarms or missed cases are more costly; F1 combines them.' },
    { level: 'advanced', q: 'What is data leakage?', a: 'Information from the test set or the future leaking into training (for example scaling on the full dataset before splitting, or using a feature that is only known after the outcome). It produces unrealistically good scores. Pipelines and proper splits prevent it.' },
  ],
  automation: [
    { level: 'basic', q: 'How do you accept command-line options in a script?', a: 'Use argparse (or Typer/Click): define positional arguments and options with types, defaults and choices; it generates --help and validates input.' },
    { level: 'intermediate', q: 'How do you scrape a website responsibly?', a: 'Check the terms and robots.txt, prefer an official API, set a descriptive User-Agent, throttle requests, cache results, handle errors, and use a headless browser (Playwright) only when the page needs JavaScript.' },
    { level: 'intermediate', q: 'How do you run a Python script every day?', a: 'cron on Linux/macOS, Task Scheduler on Windows, a scheduler library inside a long-running process, or a cloud scheduler such as GitHub Actions on: schedule. Use the virtual environment\'s interpreter and log every run.' },
  ],
  algorithms: [
    { level: 'basic', q: 'What is the time complexity of common list and dict operations?', a: 'list: index, append and pop() O(1); insert(0), pop(0), membership and remove O(n). dict and set: get, set, delete and membership O(1) on average. sort: O(n log n).' },
    { level: 'intermediate', q: 'How would you find the k largest items efficiently?', a: 'heapq.nlargest(k, items) runs in O(n log k), better than sorting everything (O(n log n)) when k is small.' },
    { level: 'intermediate', q: 'BFS vs DFS?', a: 'BFS uses a queue (collections.deque), explores level by level and finds shortest paths in unweighted graphs. DFS uses recursion or a stack, goes deep first and suits topological sorting and cycle detection.' },
    { level: 'advanced', q: 'Implement two-sum in O(n).', a: 'Walk the list once, storing each value\'s index in a dict; for each number check whether target - number is already in the dict.', code: String.raw`def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return seen[target - n], i
        seen[n] = i
print(two_sum([2, 7, 11, 15], 18))`, lang: 'python', tryIt: true },
  ],
  'performance-deploy': [
    { level: 'basic', q: 'How do you find out why a Python program is slow?', a: 'Measure: timeit for snippets, cProfile or py-spy/Scalene for whole programs, plus database query logs. Optimise the proven bottleneck only.' },
    { level: 'intermediate', q: 'How can you speed up CPU-heavy Python code?', a: 'Better algorithms and data structures first, then vectorization with NumPy, caching, multiprocessing, a newer Python version, and finally Numba, Cython or Rust extensions for hot loops.' },
    { level: 'advanced', q: 'How do you deploy a FastAPI or Django app to production?', a: 'Package it in Docker with locked dependencies, configure with environment variables, run several uvicorn/gunicorn workers behind Nginx or a load balancer with HTTPS, run migrations on deploy, use background workers for slow tasks, and monitor with logs, metrics and Sentry.' },
  ],
  security: [
    { level: 'basic', q: 'How should passwords be stored?', a: 'Hashed with a slow, salted algorithm: Argon2id (argon2-cffi), bcrypt, or PBKDF2 with many iterations. Never plain text, and never fast hashes like md5 or sha256 alone.' },
    { level: 'intermediate', q: 'Which Python features are dangerous with untrusted input?', a: 'eval/exec, pickle.loads, yaml.load (use safe_load), subprocess with shell=True, string-built SQL, and building file paths from user input without checking they stay inside a base directory.' },
    { level: 'intermediate', q: 'How do you keep secrets out of source code?', a: 'Read them from environment variables or a secrets manager, use .env files only locally and gitignored, rotate keys, and scan repositories with tools like gitleaks.' },
    { level: 'advanced', q: 'How do you verify a webhook is genuine?', a: 'The sender signs the body with a shared secret (HMAC-SHA256). Recompute the signature over the raw body and compare with hmac.compare_digest, and check a timestamp to prevent replay attacks.' },
  ],
  projects: [
    { level: 'intermediate', q: 'Walk me through a Python project you built.', a: 'Describe the problem, the architecture (modules, data model, API), key decisions and trade-offs, how you tested it, a difficult bug you fixed, and what you would improve. Show the code on GitHub.' },
    { level: 'advanced', q: 'How would you scale the library API to many users?', a: 'Move to PostgreSQL with indexes and transactions, run multiple stateless workers, add caching (Redis) for hot reads, use row locking or constraints so two loans cannot take the last copy, background jobs for notifications, and monitoring.' },
  ],
  interview: [
    { level: 'basic', q: 'What are Python\'s key data structures and their complexities?', a: 'list (dynamic array: O(1) append and index, O(n) search), tuple (immutable list), dict and set (hash tables: O(1) average operations), deque (O(1) at both ends), heapq (O(log n) push/pop).' },
    { level: 'intermediate', q: 'What is new in recent Python versions that you use?', a: 'Pattern matching (3.10), better error messages, ExceptionGroups and TaskGroup (3.11), the type parameter syntax and f-string improvements (3.12), the free-threaded build and new REPL (3.13), and template strings (3.14). Mention what you actually used.' },
    { level: 'advanced', q: 'How do you keep a large Python codebase maintainable?', a: 'Clear package structure, type hints checked in CI, tests with good coverage of behaviour, linting and formatting (Ruff), dependency injection instead of globals, small functions, documentation of decisions, and regular dependency upgrades.' },
  ],
};
