// Python chapter: Testing. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// pytest runs inside Try it: samples write a test file and call pytest.main().

export default {
  id: 'testing',
  title: 'Testing with pytest',
  description: 'assert, pytest, fixtures, parametrize, mocking, TDD and code quality tools',
  icon: 'fact-check',
  lessons: [
    {
      id: 'py-why-tests',
      title: 'Why Automated Tests',
      blocks: [
        { type: 'text', value: 'A test is code that runs your code and checks the result. With a good test suite you can refactor, upgrade Python or add features and know in seconds that nothing broke. Unit tests check one function or class; integration tests check parts together; end-to-end tests drive the whole app.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`def apply_coupon(total, code):
    if code == "SAVE10":
        return round(total * 0.9)
    if code == "FLAT100":
        return max(0, total - 100)
    return total

# The core idea: arrange, act, assert
assert apply_coupon(1000, "SAVE10") == 900
assert apply_coupon(50, "FLAT100") == 0
assert apply_coupon(1000, "BOGUS") == 1000
print("all checks passed")

try:
    assert apply_coupon(1001, "SAVE10") == 900, "rounding is wrong"
except AssertionError as e:
    print("AssertionError:", e)` },
        { type: 'note', value: 'assert statements are removed when Python runs with -O, so never use assert for input validation in production code. Use it in tests and for internal sanity checks.' },
      ],
    },
    {
      id: 'py-pytest-basics',
      title: 'pytest Basics',
      blocks: [
        { type: 'text', value: 'pytest finds files named test_*.py, runs every function named test_*, and shows a detailed diff when a plain assert fails. Run it with: pytest (or pytest -v, pytest -k name, pytest -x).' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import pathlib, textwrap, pytest

pathlib.Path("cart.py").write_text(textwrap.dedent('''
    class Cart:
        def __init__(self):
            self.items = {}

        def add(self, sku, price, qty=1):
            if qty < 1:
                raise ValueError("qty must be at least 1")
            line = self.items.setdefault(sku, {"price": price, "qty": 0})
            line["qty"] += qty

        def total(self):
            return sum(i["price"] * i["qty"] for i in self.items.values())
'''))

pathlib.Path("test_cart.py").write_text(textwrap.dedent('''
    import pytest
    from cart import Cart

    def test_new_cart_is_empty():
        assert Cart().total() == 0

    def test_adding_same_product_increases_quantity():
        cart = Cart()
        cart.add("KB-01", 1500)
        cart.add("KB-01", 1500, qty=2)
        assert cart.items["KB-01"]["qty"] == 3
        assert cart.total() == 4500

    def test_zero_quantity_is_rejected():
        with pytest.raises(ValueError, match="at least 1"):
            Cart().add("KB-01", 1500, qty=0)

    def test_this_one_fails_on_purpose():
        assert Cart().total() == 1        # see how pytest explains failures
'''))

pytest.main(["-q", "-p", "no:cacheprovider", "test_cart.py"])` , expectErrors: true },
      ],
    },
    {
      id: 'py-fixtures-parametrize',
      title: 'Fixtures and Parametrize',
      blocks: [
        { type: 'text', value: 'Fixtures provide ready-made test objects (a cart, a database connection, a fake API) and clean up after the test. @pytest.mark.parametrize runs one test with many inputs.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import pathlib, textwrap, pytest

pathlib.Path("test_pricing.py").write_text(textwrap.dedent('''
    import sqlite3
    import pytest

    def apply_coupon(total, code):
        return {"SAVE10": round(total * 0.9), "FLAT100": max(0, total - 100)}.get(code, total)

    @pytest.mark.parametrize("total, code, expected", [
        (1000, "SAVE10", 900),
        (1000, "FLAT100", 900),
        (50, "FLAT100", 0),
        (1000, "NOPE", 1000),
    ])
    def test_apply_coupon(total, code, expected):
        assert apply_coupon(total, code) == expected

    @pytest.fixture
    def db():
        conn = sqlite3.connect(":memory:")          # fresh database for every test
        conn.execute("CREATE TABLE users (email TEXT UNIQUE)")
        yield conn                                   # the test runs here
        conn.close()                                 # teardown

    def test_insert_user(db):
        db.execute("INSERT INTO users VALUES ('a@x.com')")
        assert db.execute("SELECT COUNT(*) FROM users").fetchone()[0] == 1

    def test_emails_are_unique(db):
        db.execute("INSERT INTO users VALUES ('a@x.com')")
        with pytest.raises(sqlite3.IntegrityError):
            db.execute("INSERT INTO users VALUES ('a@x.com')")
'''))

pytest.main(["-v", "-p", "no:cacheprovider", "test_pricing.py"])` },
        { type: 'note', value: 'Shared fixtures live in conftest.py; pytest finds them automatically. Fixture scope="session" creates expensive resources once for the whole test run.' },
      ],
    },
    {
      id: 'py-mocking',
      title: 'Mocking with unittest.mock',
      blocks: [
        { type: 'text', value: 'Unit tests must not send real emails or call real payment APIs. A Mock records how it was called and returns whatever you configure; patch() swaps a real object for a mock during a test.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from unittest.mock import Mock, patch
import time

class OrderService:
    def __init__(self, gateway, mailer):
        self.gateway, self.mailer = gateway, mailer

    def pay(self, order_id, email, amount):
        txn = self.gateway.charge(amount, reference=order_id)
        self.mailer.send(email, f"Paid {amount} Tk, transaction {txn}")
        return txn

gateway = Mock()
gateway.charge.return_value = "txn_123"            # stub the answer
mailer = Mock()

txn = OrderService(gateway, mailer).pay("ORD-7", "nadia@example.com", 2500)

assert txn == "txn_123"
gateway.charge.assert_called_once_with(2500, reference="ORD-7")
mailer.send.assert_called_once()
print(mailer.send.call_args)

# Simulate failures with side_effect
gateway.charge.side_effect = ConnectionError("gateway down")
try:
    OrderService(gateway, mailer).pay("ORD-8", "x@y.com", 100)
except ConnectionError as e:
    print("raised:", e)

# patch replaces something temporarily (here: time.time)
def is_weekend_sale():
    return time.gmtime(time.time()).tm_wday in (4, 5)    # Fri/Sat
with patch("time.time", return_value=1_773_388_800):     # a Friday
    print("sale:", is_weekend_sale())` },
        { type: 'note', value: 'Code that receives its dependencies (dependency injection) is easy to test with plain fakes and Mocks. Heavy use of patch() is often a sign the code creates its dependencies internally.' },
      ],
    },
    {
      id: 'py-tdd-quality',
      title: 'TDD, Coverage and Code Quality Tools',
      blocks: [
        { type: 'list', items: [
          'TDD rhythm: RED write a failing test, GREEN make it pass simply, REFACTOR clean up while green.',
          'Coverage: pytest --cov=src shows which lines your tests never run (pip install pytest-cov). Aim for meaningful tests, not 100%.',
          'Ruff: an extremely fast linter and formatter (replaces flake8, isort and black): ruff check . and ruff format .',
          'mypy or Pyright: static type checking in CI.',
          'pre-commit: runs ruff, mypy and tests automatically before every git commit.',
          'Hypothesis: property-based testing that generates hundreds of inputs to find edge cases.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`$ uv add --dev pytest pytest-cov ruff mypy
$ uv run ruff check . --fix && uv run ruff format .
$ uv run mypy src
$ uv run pytest --cov=src --cov-report=term-missing
---------- coverage: platform linux, python 3.14 ----------
Name                  Stmts   Miss  Cover   Missing
src/shop/cart.py         24      2    92%   41-42
src/shop/pricing.py      18      0   100%
TOTAL                    42      2    95%` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'testing', q: 'Which functions does pytest run automatically?', options: ['All functions', 'Functions named test_* in files named test_*.py', 'Functions with @test', 'Only classes'], answer: 1, explain: 'pytest discovers tests by naming convention.' },
    { chapterId: 'testing', q: 'How do you assert that code raises ValueError in pytest?', options: ['assert raises ValueError', 'with pytest.raises(ValueError):', 'try/except and pass', '@pytest.error'], answer: 1, explain: 'The block must raise, or the test fails.' },
    { chapterId: 'testing', q: 'What does a pytest fixture do?', options: ['Fixes bugs', 'Provides reusable setup (and teardown) to tests', 'Formats code', 'Skips tests'], answer: 1, explain: 'Tests request fixtures by naming them as parameters.' },
    { chapterId: 'testing', q: 'What is @pytest.mark.parametrize for?', options: ['Running one test with many sets of inputs', 'Running tests in parallel', 'Marking slow tests', 'Mocking'], answer: 0, explain: 'Each parameter set is reported as its own test.' },
    { chapterId: 'testing', q: 'What does mock.assert_called_once_with(...) check?', options: ['The return value', 'That the mock was called exactly once with those arguments', 'That it was never called', 'The speed'], answer: 1, explain: 'Mocks record every call.' },
    { chapterId: 'testing', q: 'What is Ruff?', options: ['A test runner', 'A fast linter and formatter', 'A web framework', 'A database'], answer: 1, explain: 'It replaces flake8, isort and black.' },
  ],
};
