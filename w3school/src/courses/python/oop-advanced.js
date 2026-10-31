// Python chapter: Inheritance, Protocols and Special Methods. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'oop-advanced',
  title: 'Inheritance & Special Methods',
  description: 'super(), MRO, ABCs, duck typing, Protocols, operator overloading and composition',
  icon: 'account-tree',
  lessons: [
    {
      id: 'py-inheritance',
      title: 'Inheritance and super()',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`class User:
    def __init__(self, name, email):
        self.name, self.email = name, email

    def permissions(self):
        return {"read"}

    def describe(self):
        return f"{type(self).__name__} {self.name}: {sorted(self.permissions())}"

class Admin(User):
    def __init__(self, name, email, level="full"):
        super().__init__(name, email)          # run the parent's __init__
        self.level = level

    def permissions(self):
        return super().permissions() | {"write", "delete"}

class Guest(User):
    def permissions(self):
        return set()

for person in [User("Mina", "m@x.com"), Admin("Kamal", "k@x.com"), Guest("Visitor", "")]:
    print(person.describe())                   # the right method runs for each object

print(issubclass(Admin, User), isinstance(Admin("a", "b"), User))` },
      ],
    },
    {
      id: 'py-mro',
      title: 'Multiple Inheritance, Mixins and the MRO',
      blocks: [
        { type: 'text', value: 'Python supports multiple inheritance. The Method Resolution Order (MRO) decides which parent is searched first, and super() follows it. In practice, use it for small "mixin" classes that add one capability.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import json

class JsonMixin:
    def to_json(self):
        return json.dumps(vars(self))

class TimestampMixin:
    def touch(self, now):
        self.updated_at = now

class Product(JsonMixin, TimestampMixin):
    def __init__(self, name, price):
        self.name, self.price = name, price

p = Product("Mouse", 450)
p.touch("2026-03-10")
print(p.to_json())
print([c.__name__ for c in Product.__mro__])

# Cooperative super(): every class calls super() so each runs exactly once
class Base:
    def setup(self): print("Base.setup")
class A(Base):
    def setup(self): print("A.setup"); super().setup()
class B(Base):
    def setup(self): print("B.setup"); super().setup()
class C(A, B):
    def setup(self): print("C.setup"); super().setup()

C().setup()
print([k.__name__ for k in C.mro()])` },
      ],
    },
    {
      id: 'py-abc-protocols',
      title: 'Abstract Base Classes, Duck Typing and Protocols',
      blocks: [
        { type: 'text', value: 'Python prefers duck typing: if an object has the methods you need, use it. An ABC forces subclasses to implement methods. A typing.Protocol describes the needed methods without requiring inheritance at all (static duck typing, checked by mypy).' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from abc import ABC, abstractmethod
from typing import Protocol, runtime_checkable

class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount: int, reference: str) -> str: ...

    def refund(self, reference: str) -> str:          # shared code is allowed
        return f"refund requested for {reference}"

class Bkash(PaymentGateway):
    def charge(self, amount, reference):
        return f"bKash charged {amount} for {reference}"

try:
    PaymentGateway()
except TypeError as e:
    print("TypeError:", e)
print(Bkash().charge(1500, "ORD-1"), "|", Bkash().refund("ORD-1"))

@runtime_checkable
class Notifier(Protocol):
    def send(self, to: str, message: str) -> None: ...

class SmsNotifier:                 # no inheritance needed
    def send(self, to, message):
        print(f"SMS to {to}: {message}")

class Logger:
    def write(self, text): ...

def notify_all(notifier: Notifier, users):
    for u in users:
        notifier.send(u, "Your order shipped")

notify_all(SmsNotifier(), ["01712345678"])
print(isinstance(SmsNotifier(), Notifier), isinstance(Logger(), Notifier))` },
      ],
    },
    {
      id: 'py-operator-overloading',
      title: 'Operator Overloading and Comparisons',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from functools import total_ordering
import math

@total_ordering                      # define __eq__ and __lt__, get <=, >, >= free
class Version:
    def __init__(self, text):
        self.parts = tuple(int(p) for p in text.split("."))
    def __eq__(self, other):
        return self.parts == other.parts
    def __lt__(self, other):
        return self.parts < other.parts
    def __hash__(self):
        return hash(self.parts)
    def __repr__(self):
        return "v" + ".".join(map(str, self.parts))

versions = [Version("1.10.0"), Version("1.2.3"), Version("1.9.9")]
print(sorted(versions), max(versions), Version("2.0") >= Version("1.99"))

class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __add__(self, o):  return Vector(self.x + o.x, self.y + o.y)
    def __sub__(self, o):  return Vector(self.x - o.x, self.y - o.y)
    def __mul__(self, k):  return Vector(self.x * k, self.y * k)
    __rmul__ = __mul__                               # 3 * v as well as v * 3
    def __abs__(self):     return math.hypot(self.x, self.y)
    def __bool__(self):    return bool(self.x or self.y)
    def __repr__(self):    return f"Vector({self.x}, {self.y})"

v = Vector(3, 4)
print(v + Vector(1, 1), v * 2, 3 * v, abs(v), bool(Vector(0, 0)))` },
      ],
    },
    {
      id: 'py-container-protocol',
      title: 'Making Objects Behave Like Containers',
      blocks: [
        { type: 'text', value: 'Implement __len__, __getitem__, __contains__, __iter__ and __call__ and your object works with len(), [], in, for loops and ().' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`class Playlist:
    def __init__(self, name, songs=None):
        self.name = name
        self._songs = list(songs or [])

    def __len__(self):            return len(self._songs)
    def __getitem__(self, index): return self._songs[index]      # also enables slicing and iteration
    def __contains__(self, song): return song in self._songs
    def __iter__(self):           return iter(self._songs)
    def __call__(self, song):     self._songs.append(song); return self   # p("song")
    def __repr__(self):           return f"Playlist({self.name!r}, {len(self)} songs)"

p = Playlist("Study", ["Lo-fi 1", "Rain", "Piano"])
p("Ocean")("Forest")
print(p, len(p), p[0], p[-1], p[1:3])
print("Rain" in p, [s.upper() for s in p])

# __slots__ saves memory when you create millions of small objects
class Pixel:
    __slots__ = ("x", "y", "color")
    def __init__(self, x, y, color):
        self.x, self.y, self.color = x, y, color

px = Pixel(1, 2, "red")
try:
    px.alpha = 0.5
except AttributeError as e:
    print("AttributeError:", e)` },
      ],
    },
    {
      id: 'py-composition',
      title: 'Composition Over Inheritance',
      blocks: [
        { type: 'text', value: 'Deep inheritance trees are fragile. Most of the time an object should HAVE helpers (composition) rather than BE a subclass of them. Pass dependencies in through __init__ (dependency injection) so you can swap them in tests.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`class ConsoleMailer:
    def send(self, to, subject):
        print(f"email to {to}: {subject}")

class FakeMailer:                       # for tests
    def __init__(self):
        self.sent = []
    def send(self, to, subject):
        self.sent.append((to, subject))

class InMemoryUsers:
    def __init__(self):
        self.rows = {7: "nadia@example.com"}
    def email_of(self, user_id):
        return self.rows[user_id]

class WelcomeService:
    def __init__(self, users, mailer):  # composed of collaborators
        self.users = users
        self.mailer = mailer

    def welcome(self, user_id):
        self.mailer.send(self.users.email_of(user_id), "Welcome to CodeNest!")

WelcomeService(InMemoryUsers(), ConsoleMailer()).welcome(7)

fake = FakeMailer()
WelcomeService(InMemoryUsers(), fake).welcome(7)
print(fake.sent)` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'oop-advanced', q: 'What does super().__init__(...) do in a subclass?', options: ['Creates a new parent object', 'Runs the next __init__ in the MRO (usually the parent\'s)', 'Deletes the parent', 'Calls __init__ twice'], answer: 1, explain: 'super() follows the method resolution order.' },
    { chapterId: 'oop-advanced', q: 'What happens when you instantiate an ABC that has abstract methods?', options: ['It works normally', 'TypeError', 'The methods return None', 'A warning'], answer: 1, explain: 'Abstract methods must be implemented by a concrete subclass.' },
    { chapterId: 'oop-advanced', q: 'What is duck typing?', options: ['Checking types with isinstance everywhere', 'Using any object that has the needed methods, regardless of its class', 'A testing library', 'Multiple inheritance'], answer: 1, explain: '"If it walks like a duck and quacks like a duck..."' },
    { chapterId: 'oop-advanced', q: 'What does typing.Protocol describe?', options: ['A network protocol', 'Methods an object must have, without requiring inheritance', 'An abstract class that must be subclassed', 'A decorator'], answer: 1, explain: 'Protocols enable static duck typing checked by mypy.' },
    { chapterId: 'oop-advanced', q: 'Which method makes len(obj) work?', options: ['__size__', '__len__', '__count__', '__length__'], answer: 1, explain: 'Built-in functions call the matching dunder method.' },
    { chapterId: 'oop-advanced', q: 'What does @functools.total_ordering need from you?', options: ['All six comparison methods', '__eq__ and one of __lt__, __le__, __gt__, __ge__', 'Only __hash__', '__repr__'], answer: 1, explain: 'It fills in the rest.' },
    { chapterId: 'oop-advanced', q: 'Why prefer composition over deep inheritance?', options: ['It uses less memory', 'It keeps classes loosely coupled and easy to test and change', 'Python forbids inheritance', 'It is faster to type'], answer: 1, explain: 'Inject collaborators instead of inheriting behaviour.' },
  ],
};
