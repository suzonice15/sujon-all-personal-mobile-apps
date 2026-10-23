// Python chapter: Object-Oriented Python. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'oop-basics',
  title: 'Object-Oriented Python',
  description: 'Classes, __init__, attributes, methods, properties and dataclasses',
  icon: 'category',
  lessons: [
    {
      id: 'py-classes',
      title: 'Classes and Objects',
      blocks: [
        { type: 'text', value: 'A class bundles data (attributes) with behaviour (methods). Each object created from it has its own attribute values. self is the object a method is called on; Python passes it automatically.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`class BankAccount:
    bank_name = "CodeNest Bank"          # class attribute: shared by all accounts

    def __init__(self, owner, balance=0):
        self.owner = owner               # instance attributes: per object
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("amount must be positive")
        self.balance += amount
        return self.balance

    def describe(self):
        return f"{self.owner} has {self.balance} Tk at {self.bank_name}"

a = BankAccount("Rahim")
b = BankAccount("Sadia", 500)
a.deposit(750)
print(a.describe())
print(b.describe())
print(isinstance(a, BankAccount), type(b).__name__)
print(vars(a))                         # the instance's attributes` },
        { type: 'note', value: 'Class names use CapWords (BankAccount); methods and attributes use snake_case.' },
      ],
    },
    {
      id: 'py-dunder-basics',
      title: '__repr__, __str__ and __eq__',
      blocks: [
        { type: 'text', value: 'Special ("dunder") methods let your objects work with Python\'s built-in operations. __repr__ is for developers (debugging), __str__ for users, __eq__ for ==.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`class Money:
    def __init__(self, amount, currency="BDT"):
        self.amount = amount
        self.currency = currency

    def __repr__(self):
        return f"Money({self.amount!r}, {self.currency!r})"

    def __str__(self):
        return f"{self.amount:,.2f} {self.currency}"

    def __eq__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        return (self.amount, self.currency) == (other.amount, other.currency)

    def __add__(self, other):
        if self.currency != other.currency:
            raise ValueError("currency mismatch")
        return Money(self.amount + other.amount, self.currency)

price = Money(1500.5)
print(price)                 # __str__
print(repr(price))           # __repr__
print([price])               # containers use __repr__
print(price == Money(1500.5), price + Money(99.5))` },
      ],
    },
    {
      id: 'py-encapsulation',
      title: 'Encapsulation and Properties',
      blocks: [
        { type: 'text', value: 'Python has no private keyword. A single underscore (_balance) means "internal, do not touch". @property lets you expose a computed or validated attribute while keeping the simple obj.value syntax.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price               # goes through the setter below

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("price cannot be negative")
        self._price = value

    @property
    def price_with_vat(self):           # computed, read-only
        return round(self._price * 1.05, 2)

p = Product("Headphones", 1800)
print(p.price, p.price_with_vat)
p.price = 2000
print(p.price_with_vat)
try:
    p.price = -5
except ValueError as e:
    print("ValueError:", e)
try:
    p.price_with_vat = 1
except AttributeError as e:
    print("AttributeError:", e)

# Name mangling with two underscores (rarely needed)
class Secret:
    def __init__(self):
        self.__token = "abc"
print(hasattr(Secret(), "__token"), Secret()._Secret__token)` },
      ],
    },
    {
      id: 'py-class-static-methods',
      title: 'Class Methods and Static Methods',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from datetime import date

class Student:
    count = 0

    def __init__(self, name, birth_year):
        self.name = name
        self.birth_year = birth_year
        Student.count += 1

    @classmethod
    def from_csv_row(cls, row):          # alternative constructor: receives the class
        name, year = row.split(",")
        return cls(name.strip(), int(year))

    @staticmethod
    def is_valid_name(name):             # utility: no self, no cls
        return name.replace(" ", "").isalpha()

    def age(self, today=None):
        today = today or date(2026, 3, 10)
        return today.year - self.birth_year

s1 = Student("Nadia", 2002)
s2 = Student.from_csv_row("Rafi Ahmed, 2004")
print(s2.name, s2.age(), Student.count)
print(Student.is_valid_name("Mim Akter"), Student.is_valid_name("R2D2"))` },
        { type: 'note', value: 'classmethods are perfect for named constructors (from_json, from_row); subclasses calling them get instances of the subclass because cls is the class that was called.' },
      ],
    },
    {
      id: 'py-dataclasses',
      title: 'Dataclasses',
      blocks: [
        { type: 'text', value: 'For classes that mainly hold data, @dataclass writes __init__, __repr__ and __eq__ for you from type-annotated fields. frozen=True makes instances immutable (and hashable); slots=True saves memory.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from dataclasses import dataclass, field, asdict, replace

@dataclass
class OrderLine:
    sku: str
    price: int
    qty: int = 1

    @property
    def total(self):
        return self.price * self.qty

@dataclass
class Order:
    id: int
    customer: str
    lines: list[OrderLine] = field(default_factory=list)   # safe mutable default

    def add(self, sku, price, qty=1):
        self.lines.append(OrderLine(sku, price, qty))

    @property
    def total(self):
        return sum(line.total for line in self.lines)

o = Order(1042, "Nadia")
o.add("KB-01", 1500)
o.add("MS-02", 450, 2)
print(o)
print(o.total, asdict(o)["lines"][1])

@dataclass(frozen=True, slots=True)
class Point:
    lat: float
    lng: float

dhaka = Point(23.81, 90.41)
print(dhaka, dhaka == Point(23.81, 90.41), {dhaka: "Dhaka"})
print(replace(dhaka, lat=24.0))          # copy with a change
try:
    dhaka.lat = 0
except Exception as e:
    print(type(e).__name__, e)` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'oop-basics', q: 'What is self in a method?', options: ['A keyword for the class', 'The object the method was called on', 'A global variable', 'The parent class'], answer: 1, explain: 'Python passes the instance as the first argument.' },
    { chapterId: 'oop-basics', q: 'Which method initialises a new object?', options: ['__new__ only', '__init__', '__start__', 'constructor()'], answer: 1, explain: '__init__ sets up the instance attributes.' },
    { chapterId: 'oop-basics', q: 'Which special method should give an unambiguous developer-friendly representation?', options: ['__str__', '__repr__', '__format__', '__print__'], answer: 1, explain: '__repr__ is used in the REPL, logs and inside containers.' },
    { chapterId: 'oop-basics', q: 'What does @property allow?', options: ['Making a class abstract', 'Accessing a method like an attribute, with optional validation on set', 'Private attributes', 'Static methods'], answer: 1, explain: 'obj.price runs the getter; obj.price = x runs the setter.' },
    { chapterId: 'oop-basics', q: 'What does a @classmethod receive as its first argument?', options: ['self', 'cls (the class)', 'Nothing', 'The module'], answer: 1, explain: 'It is ideal for alternative constructors.' },
    { chapterId: 'oop-basics', q: 'Why use field(default_factory=list) in a dataclass?', options: ['It is faster', 'Each instance gets its own new list instead of a shared one', 'It makes the field private', 'It is required for all fields'], answer: 1, explain: 'Same reason as the mutable default argument trap.' },
    { chapterId: 'oop-basics', q: 'What does @dataclass(frozen=True) do?', options: ['Makes instances immutable', 'Speeds up the class', 'Hides fields', 'Prevents subclassing'], answer: 0, explain: 'Assigning to a field raises FrozenInstanceError; instances become hashable.' },
  ],
};
