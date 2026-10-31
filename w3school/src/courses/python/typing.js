// Python chapter: Type Hints. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'typing',
  title: 'Type Hints & Static Typing',
  description: 'Annotations, generics, TypedDict, Protocol, mypy and pydantic',
  icon: 'spellcheck',
  lessons: [
    {
      id: 'py-type-hints',
      title: 'Why and How to Annotate',
      blocks: [
        { type: 'text', value: 'Type hints describe what types a function expects and returns. Python does not enforce them at runtime, but editors use them for autocompletion and tools like mypy or Pyright find bugs before you run the code. Every professional Python codebase uses them.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`def total_price(prices: list[float], discount: float = 0.0) -> float:
    return sum(prices) * (1 - discount)

def find_user(user_id: int) -> dict[str, str] | None:      # union with None (3.10+)
    users = {7: {"name": "Nadia"}}
    return users.get(user_id)

name: str = "CodeNest"
scores: dict[str, int] = {"Nadia": 91}
coords: tuple[float, float] = (23.8, 90.4)
tags: set[str] = {"python"}

print(total_price([100, 250], 0.1), find_user(7), find_user(1))
print(total_price.__annotations__)

# Hints are NOT checked at runtime:
print(total_price(["a", "b"]) if False else "a type checker would flag total_price(['a'])")` },
        { type: 'code', lang: 'text', value: String.raw`$ pip install mypy
$ mypy app.py
app.py:12: error: Argument 1 to "total_price" has incompatible type "list[str]"; expected "list[float]"
app.py:20: error: Item "None" of "dict[str, str] | None" has no attribute "get"
Found 2 errors in 1 file` },
      ],
    },
    {
      id: 'py-typing-tools',
      title: 'Optional, Callable, Literal, TypedDict, Final',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from collections.abc import Callable, Iterable, Iterator
from typing import Literal, TypedDict, NotRequired, Final, Any

MAX_RETRIES: Final = 3                      # must not be reassigned

Mode = Literal["light", "dark"]             # only these exact values
def set_theme(mode: Mode) -> str:
    return f"theme={mode}"

def apply(func: Callable[[int], int], values: Iterable[int]) -> list[int]:
    return [func(v) for v in values]

def countdown(n: int) -> Iterator[int]:
    while n:
        yield n
        n -= 1

class Order(TypedDict):                    # the shape of a dict (e.g. JSON)
    id: int
    customer: str
    coupon: NotRequired[str]

def describe(order: Order) -> str:
    return f"#{order['id']} for {order['customer']}"

print(set_theme("dark"), apply(lambda x: x * 2, [1, 2, 3]), list(countdown(3)))
print(describe({"id": 1042, "customer": "Rafi"}))

type Matrix = list[list[float]]             # type alias statement (3.12+)
def size(m: Matrix) -> tuple[int, int]:
    return len(m), len(m[0])
print(size([[1.0, 2.0], [3.0, 4.0]]))` },
        { type: 'note', value: 'Prefer the built-in generics (list[int], dict[str, int]) and the | operator (int | None) over the older List, Dict and Optional from typing.' },
      ],
    },
    {
      id: 'py-generics',
      title: 'Generics',
      blocks: [
        { type: 'text', value: 'Generic functions and classes work with any type while keeping the relationship between types: "a Stack of int returns int from pop()". Python 3.12 added a short syntax with square brackets.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`def first[T](items: list[T]) -> T | None:          # T is a type parameter
    return items[0] if items else None

class Stack[T]:
    def __init__(self) -> None:
        self._items: list[T] = []
    def push(self, item: T) -> None:
        self._items.append(item)
    def pop(self) -> T:
        return self._items.pop()
    def __len__(self) -> int:
        return len(self._items)

s = Stack[int]()
s.push(1); s.push(2)
print(s.pop(), len(s), first(["a", "b"]), first([]))

# Bounded type parameter: T must support comparison
from typing import Protocol
class Comparable(Protocol):
    def __lt__(self, other: "Comparable", /) -> bool: ...

def biggest[T: Comparable](items: list[T]) -> T:
    return max(items)

print(biggest([3, 9, 4]), biggest(["pear", "apple"]))` },
      ],
    },
    {
      id: 'py-pydantic',
      title: 'Runtime Validation with pydantic',
      blocks: [
        { type: 'text', value: 'Type hints are not checked at runtime, but data from users and APIs must be. pydantic builds models from type hints that parse, convert and validate data, with clear error messages. FastAPI is built on it.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from pydantic import BaseModel, Field, ValidationError, field_validator

class Student(BaseModel):
    name: str = Field(min_length=2)
    age: int = Field(ge=10, le=100)
    email: str
    courses: list[str] = []

    @field_validator("email")
    @classmethod
    def email_has_at(cls, v: str) -> str:
        if "@" not in v:
            raise ValueError("must contain @")
        return v.lower()

s = Student(name="Nadia", age="24", email="Nadia@Example.com", courses=["python"])
print(s)                          # "24" was converted to int 24
print(s.model_dump())
print(s.model_dump_json())

try:
    Student(name="X", age=5, email="nope")
except ValidationError as e:
    for err in e.errors():
        print(f"{err['loc'][0]}: {err['msg']}")

print(Student.model_validate_json('{"name": "Rafi", "age": 30, "email": "r@x.com"}').age)` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'typing', q: 'Does Python enforce type hints when the program runs?', options: ['Yes, always', 'No; tools like mypy check them before running', 'Only for int', 'Only in classes'], answer: 1, explain: 'Hints are metadata; runtime validation needs libraries like pydantic.' },
    { chapterId: 'typing', q: 'How do you write "an int or None" in modern Python?', options: ['int?', 'int | None', 'Maybe[int]', 'int or None'], answer: 1, explain: 'The | union syntax works since Python 3.10.' },
    { chapterId: 'typing', q: 'What does Literal["light", "dark"] mean?', options: ['Any string', 'Only one of those exact values', 'A list of two strings', 'A constant'], answer: 1, explain: 'Type checkers reject other values.' },
    { chapterId: 'typing', q: 'What does TypedDict describe?', options: ['A class with methods', 'The keys and value types of a dictionary', 'A sorted dict', 'A database table'], answer: 1, explain: 'Useful for typing JSON-like dicts.' },
    { chapterId: 'typing', q: 'In def first[T](items: list[T]) -> T, what is T?', options: ['A variable', 'A type parameter (generic)', 'A tuple', 'A typo'], answer: 1, explain: 'It links the input and output types.' },
    { chapterId: 'typing', q: 'What does pydantic add on top of type hints?', options: ['Faster code', 'Runtime parsing and validation of data', 'Compilation to C', 'Database access'], answer: 1, explain: 'It converts and validates input, raising ValidationError with details.' },
  ],
};
