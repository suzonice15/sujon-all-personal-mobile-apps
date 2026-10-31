// Python chapter: Variables and Data Types. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'variables-types',
  title: 'Variables & Data Types',
  description: 'Names, numbers, booleans, None, conversion and mutability',
  icon: 'data-object',
  lessons: [
    {
      id: 'py-variables',
      title: 'Variables Are Names',
      blocks: [
        { type: 'text', value: 'A variable is a name that points to a value (an object). You create it by assigning with =. There is no declaration keyword, and the same name can later point to a value of another type.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`city = "Dhaka"
population = 23_000_000      # underscores make big numbers readable
area_km2 = 306.4
is_capital = True

print(city, population, area_km2, is_capital)
print(type(city), type(population), type(area_km2), type(is_capital))

# Multiple assignment and swapping
x, y = 10, 20
x, y = y, x
print(x, y)

# Same value for several names
a = b = 0
print(a, b)` },
        { type: 'list', items: [
          'Use snake_case for variables and functions: total_price, user_name.',
          'UPPER_CASE for constants by convention: MAX_RETRIES = 3 (Python does not enforce it).',
          'Names can contain letters, digits and _, but cannot start with a digit or be a keyword (class, if, for...).',
        ] },
      ],
    },
    {
      id: 'py-numbers',
      title: 'Numbers: int, float, complex',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`# int has unlimited size
print(2 ** 100)
print(7 / 2)        # 3.5  true division always gives float
print(7 // 2)       # 3    floor division
print(-7 // 2)      # -4   (floors toward minus infinity!)
print(7 % 3)        # 1    remainder
print(divmod(17, 5))  # (3, 2)

# float is binary floating point
print(0.1 + 0.2)              # 0.30000000000000004
print(round(0.1 + 0.2, 2))
print(abs(-4.5), round(2.675, 2))   # 2.67, not 2.68: floats cannot store 2.675 exactly

# Exact decimals for money
from decimal import Decimal
print(Decimal("0.10") + Decimal("0.20"))

# Other bases and complex numbers
print(0b1010, 0o17, 0xFF, bin(10), hex(255))
z = 3 + 4j
print(abs(z))` },
        { type: 'note', value: 'For money use Decimal or whole numbers of the smallest unit (paisa), never float. 0.1 + 0.2 != 0.3 surprises everyone once.' },
      ],
    },
    {
      id: 'py-bool-none',
      title: 'Booleans, Truthiness and None',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`print(True and False, True or False, not True)
print(5 > 3, 5 == 5.0, "a" < "b")

# Falsy values: False, None, 0, 0.0, "" , [], {}, set(), ()
for value in [0, 1, "", "0", [], [0], None, {}]:
    print(repr(value), "->", bool(value))

# None means "no value"
result = None
if result is None:          # always compare with None using "is"
    print("No result yet")

# bool is a subclass of int
print(True + True, sum([True, False, True]))` },
        { type: 'note', value: 'Use "is None" / "is not None", never "== None". is checks identity (the same object); == checks equality.' },
      ],
    },
    {
      id: 'py-conversion',
      title: 'Type Conversion',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`print(int("42") + 1)
print(float("3.5") * 2)
print(str(100) + " Tk")
print(int(9.99))            # 9: truncates toward zero
print(int("ff", 16))        # 255: parse hexadecimal
print(bool("False"))        # True! any non-empty string
print(list("abc"), tuple([1, 2]), set([1, 1, 2]))

# Invalid conversions raise ValueError
try:
    int("12abc")
except ValueError as e:
    print("ValueError:", e)

# Python never mixes str and int silently
try:
    print("Age: " + 30)
except TypeError as e:
    print("TypeError:", e)
print("Age: " + str(30), f"Age: {30}")` },
      ],
    },
    {
      id: 'py-mutability',
      title: 'Objects, Identity and Mutability',
      blocks: [
        { type: 'text', value: 'Everything in Python is an object with an identity (id), a type and a value. Immutable objects (int, float, str, tuple, frozenset) cannot change; "changing" them creates a new object. Mutable objects (list, dict, set) change in place, and every name pointing at them sees the change.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`a = [1, 2, 3]
b = a              # b is the SAME list, not a copy
b.append(4)
print(a)           # [1, 2, 3, 4]
print(a is b)      # True

c = a.copy()       # a new list
c.append(5)
print(a, c, a is c)

s = "hello"
t = s
t += " world"      # creates a new string; s is unchanged
print(s, "|", t)

# == compares values, is compares identity
x = [1, 2]
y = [1, 2]
print(x == y, x is y)
print(id(x) != id(y))` },
        { type: 'note', value: 'This is the source of many bugs: passing a list to a function lets the function modify your list. Copy it (list.copy(), copy.deepcopy()) when you need independence.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'variables-types', q: 'What does 7 // 2 return?', options: ['3.5', '3', '4', '1'], answer: 1, explain: '// is floor division.' },
    { chapterId: 'variables-types', q: 'What does 7 / 2 return in Python 3?', options: ['3', '3.5', '4', 'An error'], answer: 1, explain: '/ always performs true division and returns a float.' },
    { chapterId: 'variables-types', q: 'Which value is truthy?', options: ['0', '""', '[]', '"0"'], answer: 3, explain: 'Any non-empty string is truthy, even "0".' },
    { chapterId: 'variables-types', q: 'How should you check for None?', options: ['x == None', 'x is None', 'x === None', 'isNone(x)'], answer: 1, explain: 'None is a singleton; compare identity with is.' },
    { chapterId: 'variables-types', q: 'After b = a with a list a, then b.append(1), what happens to a?', options: ['Nothing', 'a also has the new item', 'a becomes None', 'An error'], answer: 1, explain: 'Both names refer to the same mutable list.' },
    { chapterId: 'variables-types', q: 'Which type is immutable?', options: ['list', 'dict', 'tuple', 'set'], answer: 2, explain: 'Tuples (and str, int, frozenset) cannot be changed in place.' },
    { chapterId: 'variables-types', q: 'What is the best type for exact money calculations?', options: ['float', 'Decimal (or integer paisa)', 'complex', 'str'], answer: 1, explain: 'Binary floats cannot represent most decimal fractions exactly.' },
  ],
};
