// Python chapter: Errors and Exceptions. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'errors',
  title: 'Errors & Exceptions',
  description: 'try/except/else/finally, raising, custom exceptions, groups and logging',
  icon: 'error-outline',
  lessons: [
    {
      id: 'py-reading-tracebacks',
      title: 'Reading a Traceback',
      blocks: [
        { type: 'text', value: 'When an exception is not handled, Python prints a traceback: the chain of calls that led to the error, most recent call LAST. Read it from the bottom: the last line names the exception and message, the line above shows where it happened in your code.' },
        { type: 'code', lang: 'python', tryIt: true, expectErrors: true, value: String.raw`def average(values):
    return sum(values) / len(values)

def report(scores):
    return f"Average: {average(scores):.1f}"

print(report([80, 90]))
print(report([]))            # crashes: read the traceback below` },
        { type: 'list', items: [
          'ZeroDivisionError, TypeError, ValueError, KeyError, IndexError, AttributeError, NameError, FileNotFoundError are the ones you will meet daily.',
          'The ^^^ markers (Python 3.11+) point at the exact expression that failed.',
          'A SyntaxError is reported before the program even starts.',
        ] },
      ],
    },
    {
      id: 'py-try-except',
      title: 'try, except, else, finally',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`def parse_age(text):
    try:
        age = int(text)
    except ValueError:
        print(f"  {text!r} is not a number")
        return None
    else:                       # runs only if NO exception happened
        print(f"  parsed {age}")
        return age
    finally:                    # ALWAYS runs: cleanup
        print("  (finished parsing)")

for value in ["42", "forty-two"]:
    print(value, "->", parse_age(value))

# Catch several types, and use the exception object
def safe_divide(a, b):
    try:
        return a / b
    except (ZeroDivisionError, TypeError) as e:
        print(f"{type(e).__name__}: {e}")
        return None

safe_divide(1, 0)
safe_divide(1, "x")

# Look before you leap vs easier to ask forgiveness
config = {"debug": True}
if "port" in config:                 # LBYL
    port = config["port"]
try:                                 # EAFP: the Pythonic style
    port = config["port"]
except KeyError:
    port = 8000
print(port)` },
        { type: 'note', value: 'Never write a bare "except:" or "except Exception: pass". It hides real bugs, even KeyboardInterrupt with a bare except. Catch the specific exceptions you expect.' },
      ],
    },
    {
      id: 'py-raise',
      title: 'Raising Exceptions',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError(f"amount must be positive, got {amount}")
    if amount > balance:
        raise RuntimeError("insufficient balance")
    return balance - amount

for amount in [300, -5, 5000]:
    try:
        print("New balance:", withdraw(1000, amount))
    except (ValueError, RuntimeError) as e:
        print("Rejected:", e)

# Re-raise after logging, keeping the original traceback
def load_order(order_id):
    try:
        return {"1": "Keyboard"}[order_id]
    except KeyError:
        print(f"log: order {order_id} not found")
        raise                                  # same exception continues upward

try:
    load_order("9")
except KeyError as e:
    print("Caller handled KeyError", e)

# Chain exceptions with "from" to keep the cause
def read_settings(text):
    import json
    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        raise RuntimeError("settings file is corrupt") from e

try:
    read_settings("{oops")
except RuntimeError as e:
    print(e, "<- caused by:", type(e.__cause__).__name__)` },
      ],
    },
    {
      id: 'py-custom-exceptions',
      title: 'Custom Exception Hierarchies',
      blocks: [
        { type: 'text', value: 'Define your own exceptions for business errors. A small hierarchy lets callers catch exactly what they care about: one specific error, or every error from your app.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`class ShopError(Exception):
    """Base class for all shop errors."""

class OutOfStock(ShopError):
    def __init__(self, sku, wanted, available):
        super().__init__(f"only {available} of {sku} left, {wanted} requested")
        self.sku, self.wanted, self.available = sku, wanted, available

class PaymentDeclined(ShopError):
    pass

STOCK = {"KB-01": 3}

def place_order(sku, qty):
    available = STOCK.get(sku, 0)
    if qty > available:
        raise OutOfStock(sku, qty, available)
    return f"Order for {qty} x {sku} placed"

for qty in [2, 5]:
    try:
        print(place_order("KB-01", qty))
    except OutOfStock as e:
        print(f"Stock problem with {e.sku}: {e}")
    except ShopError as e:
        print("Other shop error:", e)

print(issubclass(OutOfStock, ShopError), issubclass(ShopError, Exception))` },
      ],
    },
    {
      id: 'py-exception-groups',
      title: 'Exception Groups and Notes',
      blocks: [
        { type: 'text', value: 'Python 3.11 added ExceptionGroup for several errors at once (common with concurrent tasks and validation) and except* to handle each type in the group. add_note() attaches extra context to any exception.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`def validate(user):
    errors = []
    if not user.get("name"):
        errors.append(ValueError("name is required"))
    if "@" not in user.get("email", ""):
        errors.append(ValueError("email is invalid"))
    if not isinstance(user.get("age"), int):
        errors.append(TypeError("age must be an integer"))
    if errors:
        raise ExceptionGroup("invalid user", errors)

try:
    validate({"name": "", "email": "nope", "age": "20"})
except* ValueError as group:
    for e in group.exceptions:
        print("Value problem:", e)
except* TypeError as group:
    for e in group.exceptions:
        print("Type problem:", e)

try:
    int("abc")
except ValueError as e:
    e.add_note("while reading row 17 of students.csv")
    print(e, e.__notes__)` },
      ],
    },
    {
      id: 'py-logging',
      title: 'Logging Instead of print',
      blocks: [
        { type: 'text', value: 'print() is for users; logging is for developers and operations. Loggers have levels (DEBUG, INFO, WARNING, ERROR, CRITICAL), can write to files or services, and include timestamps and tracebacks.' },
        { type: 'code', lang: 'python', tryIt: true, expectErrors: true, value: String.raw`import logging, sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)-8s %(name)s: %(message)s",
    datefmt="%H:%M:%S",
    stream=sys.stdout,
)
log = logging.getLogger("shop.checkout")       # one logger per module: logging.getLogger(__name__)

log.debug("cart contents: %s", ["KB-01"])     # hidden: below INFO
log.info("order placed id=%s total=%d", 1042, 2599)
log.warning("payment slow: %.1f s", 4.2)

try:
    1 / 0
except ZeroDivisionError:
    log.exception("failed to compute discount")   # ERROR + full traceback

log.setLevel(logging.DEBUG)
log.debug("now debug messages appear")` },
        { type: 'note', value: 'Pass values as arguments (log.info("id=%s", order_id)), not with f-strings: the message is only formatted if the level is enabled, and log tools can group identical messages.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'errors', q: 'When does the else block of a try statement run?', options: ['Always', 'Only if an exception occurred', 'Only if no exception occurred', 'Never'], answer: 2, explain: 'else runs when the try block finished without an exception.' },
    { chapterId: 'errors', q: 'What does finally guarantee?', options: ['The exception is ignored', 'Its code runs whether or not an exception happened', 'The function returns None', 'A retry'], answer: 1, explain: 'Use it for cleanup.' },
    { chapterId: 'errors', q: 'Why is a bare except: bad?', options: ['It is slow', 'It catches everything, hiding bugs and even KeyboardInterrupt', 'It is a syntax error', 'It only catches ValueError'], answer: 1, explain: 'Catch the specific exceptions you expect.' },
    { chapterId: 'errors', q: 'What does raise ... from e do?', options: ['Deletes e', 'Chains the new exception to its cause e', 'Re-raises e', 'Ignores e'], answer: 1, explain: 'The traceback shows both, and __cause__ holds e.' },
    { chapterId: 'errors', q: 'What is the Pythonic EAFP style?', options: ['Check everything before acting', 'Try the operation and handle the exception', 'Avoid exceptions entirely', 'Use assert everywhere'], answer: 1, explain: '"Easier to ask forgiveness than permission."' },
    { chapterId: 'errors', q: 'Which is the right way to log a caught exception with its traceback?', options: ['print(e)', 'log.exception("msg") inside except', 'log.info(e)', 'raise e'], answer: 1, explain: 'logger.exception logs at ERROR level and includes the traceback.' },
    { chapterId: 'errors', q: 'What handles individual exceptions inside an ExceptionGroup?', options: ['except', 'except*', 'finally', 'with'], answer: 1, explain: 'except* matches exceptions of a type within the group.' },
  ],
};
