// Python chapter: Comprehensions, Iterators and Generators. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'comprehensions',
  title: 'Comprehensions & Generators',
  description: 'List/dict/set comprehensions, iterators, generators and itertools',
  icon: 'all-inclusive',
  lessons: [
    {
      id: 'py-list-comprehensions',
      title: 'List Comprehensions',
      blocks: [
        { type: 'text', value: 'A comprehension builds a new collection from an iterable in one readable line: [expression for item in iterable if condition].' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`numbers = range(1, 11)

squares = [n * n for n in numbers]
evens = [n for n in numbers if n % 2 == 0]
labels = ["even" if n % 2 == 0 else "odd" for n in numbers]
print(squares, evens, labels[:4], sep="\n")

# Same as this loop, but shorter and faster:
squares_loop = []
for n in numbers:
    squares_loop.append(n * n)
print(squares == squares_loop)

# Real-world cleanup
raw = ["  Nadia ", "", "RAFI", "  mim"]
names = [n.strip().title() for n in raw if n.strip()]
print(names)

# Nested: flatten a matrix, or build pairs
matrix = [[1, 2, 3], [4, 5, 6]]
print([x for row in matrix for x in row])
print([[row[i] for row in matrix] for i in range(3)])   # transpose
print([(size, color) for size in "SM" for color in ("red", "blue")])` },
        { type: 'note', value: 'If a comprehension needs more than one condition and a nested loop, a normal for loop is usually easier to read.' },
      ],
    },
    {
      id: 'py-dict-set-comprehensions',
      title: 'Dict and Set Comprehensions',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`prices = {"tea": 20, "coffee": 120, "juice": 80, "water": 15}

with_vat = {item: round(p * 1.05, 2) for item, p in prices.items()}
cheap = {item: p for item, p in prices.items() if p < 50}
inverted = {p: item for item, p in prices.items()}
print(with_vat, cheap, inverted, sep="\n")

words = ["Python", "php", "PYTHON", "Java", "java"]
print({w.lower() for w in words})                 # set comprehension
print({w: len(w) for w in words})

# Build a lookup from a list of records
users = [{"id": 7, "name": "Nadia"}, {"id": 9, "name": "Rafi"}]
by_id = {u["id"]: u for u in users}
print(by_id[9]["name"])

# Zip two lists into a dict
keys, values = ["name", "city"], ["Mim", "Khulna"]
print(dict(zip(keys, values)))` },
      ],
    },
    {
      id: 'py-iterators',
      title: 'Iterables and Iterators',
      blocks: [
        { type: 'text', value: 'An iterable is anything a for loop can walk (list, str, dict, file, range). for calls iter() to get an iterator, then next() until StopIteration. Iterators are single-use and lazy: they produce one item at a time.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`letters = ["a", "b", "c"]
it = iter(letters)
print(next(it), next(it), next(it))
try:
    next(it)
except StopIteration:
    print("StopIteration: the iterator is exhausted")

# Many built-ins return lazy iterators
squares = map(lambda n: n * n, range(5))
print(squares)                 # nothing computed yet
print(list(squares))           # [0, 1, 4, 9, 16]
print(list(squares))           # [] - already consumed!

# Your own iterator class
class Countdown:
    def __init__(self, start):
        self.current = start
    def __iter__(self):
        return self
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

print(list(Countdown(5)))` },
      ],
    },
    {
      id: 'py-generators',
      title: 'Generators and yield',
      blocks: [
        { type: 'text', value: 'A generator function uses yield instead of return. Calling it gives a generator that pauses at each yield and resumes on the next request. It is the easiest way to write an iterator, and it uses almost no memory even for huge sequences.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`def countdown(n):
    print("starting")
    while n > 0:
        yield n          # pause here, hand out n
        n -= 1
    print("finished")

gen = countdown(3)
print(next(gen))
print(list(gen))

# Infinite sequences are fine: values are produced on demand
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

from itertools import islice
print(list(islice(fibonacci(), 12)))

# Generator expressions: like a list comprehension but lazy (round brackets)
import sys
big_list = [n * n for n in range(1_000_000)]
big_gen = (n * n for n in range(1_000_000))
print(sys.getsizeof(big_list), "bytes vs", sys.getsizeof(big_gen), "bytes")
print(sum(n * n for n in range(1_000_000)))

# Pipelines: each stage pulls one item at a time
lines = ["GET /home 200", "GET /x 404", "POST /login 302", "GET /admin 403"]
codes = (int(line.split()[-1]) for line in lines)
errors = (c for c in codes if c >= 400)
print(list(errors))

# yield from delegates to another iterable
def chain_all(*iterables):
    for it in iterables:
        yield from it
print(list(chain_all([1, 2], "ab", range(3))))` },
      ],
    },
    {
      id: 'py-itertools',
      title: 'itertools: Iterator Superpowers',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import itertools as it

print(list(it.chain([1, 2], [3], (4, 5))))
print(list(it.islice(it.count(10, 5), 4)))              # 10, 15, 20, 25
print(list(it.islice(it.cycle("AB"), 5)))
print(list(it.accumulate([100, 50, -30, 80])))          # running total
print(list(it.pairwise([1, 4, 9, 16])))                 # neighbours
print(list(it.batched(range(10), 3)))                    # chunks (3.12+)

print(list(it.combinations("ABC", 2)))
print(list(it.permutations("ABC", 2)))
print(list(it.product([0, 1], repeat=3))[:4])

# groupby groups CONSECUTIVE items with the same key (sort first!)
sales = [("Dhaka", 500), ("Dhaka", 300), ("Sylhet", 200), ("Dhaka", 100)]
sales.sort(key=lambda s: s[0])
for city, rows in it.groupby(sales, key=lambda s: s[0]):
    print(city, sum(amount for _, amount in rows))

print(list(it.takewhile(lambda x: x < 5, [1, 3, 6, 2])))
print(list(it.dropwhile(lambda x: x < 5, [1, 3, 6, 2])))
print(list(it.zip_longest("abc", [1, 2], fillvalue="-")))` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'comprehensions', q: 'What does [n * 2 for n in range(3)] produce?', options: ['[0, 1, 2]', '[0, 2, 4]', '[2, 4, 6]', '(0, 2, 4)'], answer: 1, explain: 'range(3) is 0, 1, 2; each is doubled.' },
    { chapterId: 'comprehensions', q: 'What does (n for n in range(10)) create?', options: ['A tuple', 'A list', 'A generator', 'A set'], answer: 2, explain: 'Round brackets make a lazy generator expression.' },
    { chapterId: 'comprehensions', q: 'What does yield do in a function?', options: ['Ends the program', 'Pauses the function and hands out a value', 'Imports a module', 'Raises an error'], answer: 1, explain: 'The function becomes a generator that resumes on the next request.' },
    { chapterId: 'comprehensions', q: 'You call list() twice on the same map object. What does the second call return?', options: ['The same list', '[]', 'An error', 'None'], answer: 1, explain: 'Iterators are single-use; the first list() consumed it.' },
    { chapterId: 'comprehensions', q: 'Why must data be sorted before itertools.groupby?', options: ['It is faster', 'groupby only groups consecutive equal keys', 'groupby sorts in reverse', 'It is not necessary'], answer: 1, explain: 'Unsorted data produces several groups for the same key.' },
    { chapterId: 'comprehensions', q: 'What exception tells a for loop that an iterator is finished?', options: ['IndexError', 'StopIteration', 'EOFError', 'KeyError'], answer: 1, explain: 'for catches StopIteration automatically.' },
  ],
};
