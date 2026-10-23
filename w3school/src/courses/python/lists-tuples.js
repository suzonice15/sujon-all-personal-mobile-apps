// Python chapter: Lists and Tuples. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'lists-tuples',
  title: 'Lists & Tuples',
  description: 'Ordered collections: methods, slicing, sorting, copying, unpacking',
  icon: 'view-list',
  lessons: [
    {
      id: 'py-lists',
      title: 'Lists',
      blocks: [
        { type: 'text', value: 'A list is an ordered, mutable collection that can hold any objects. It is the most used data structure in Python.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`fruits = ["mango", "banana", "jackfruit"]
print(fruits[0], fruits[-1], len(fruits))

fruits.append("lychee")          # add to the end
fruits.insert(1, "guava")        # add at a position
fruits.extend(["papaya", "kiwi"])
print(fruits)

fruits.remove("banana")          # remove by value (first match)
last = fruits.pop()              # remove and return the last item
second = fruits.pop(1)           # remove by index
del fruits[0]
print(fruits, last, second)

print("mango" in fruits, fruits.index("lychee"), fruits.count("papaya"))

# Lists hold anything, including other lists
matrix = [[1, 2, 3], [4, 5, 6]]
print(matrix[1][2])
mixed = [1, "two", 3.0, None, [5]]
print(mixed)` },
      ],
    },
    {
      id: 'py-list-slicing',
      title: 'Slicing and Modifying Ranges',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`nums = list(range(10))
print(nums[2:5], nums[:3], nums[7:], nums[::2], nums[::-1])

# Slice assignment replaces a range (it can even change the length)
nums[2:5] = ["a", "b"]
print(nums)

del nums[::2]                     # delete every second item
print(nums)

# Useful built-ins
scores = [78, 91, 64, 85, 91]
print(len(scores), sum(scores), min(scores), max(scores), sum(scores) / len(scores))
print(sorted(scores), sorted(scores, reverse=True))
print(list(reversed(scores)))
print(any(s < 65 for s in scores), all(s >= 60 for s in scores))` },
      ],
    },
    {
      id: 'py-sorting',
      title: 'Sorting with key Functions',
      blocks: [
        { type: 'text', value: 'list.sort() sorts in place and returns None; sorted() returns a new list and works on any iterable. The key argument tells Python what to sort by. Python\'s sort is stable: equal items keep their original order.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`students = [
    {"name": "Rina", "age": 25, "gpa": 3.8},
    {"name": "Asif", "age": 31, "gpa": 3.5},
    {"name": "Mim", "age": 19, "gpa": 3.8},
]

by_age = sorted(students, key=lambda s: s["age"])
print([s["name"] for s in by_age])

# Several keys: GPA descending, then name ascending
ranked = sorted(students, key=lambda s: (-s["gpa"], s["name"]))
print([s["name"] for s in ranked])

words = ["banana", "Apple", "cherry", "apple"]
print(sorted(words))                    # uppercase first (Unicode order)
print(sorted(words, key=str.lower))     # case-insensitive
print(sorted(words, key=len))

from operator import itemgetter
print([s["name"] for s in sorted(students, key=itemgetter("gpa", "age"))])

nums = [5, 2, 9]
result = nums.sort()
print(result, nums)                     # sort() returns None!` },
      ],
    },
    {
      id: 'py-copying',
      title: 'Copying: Shallow vs Deep',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import copy

original = [[1, 2], [3, 4]]
alias = original                 # same object
shallow = original.copy()        # new outer list, SAME inner lists (also list(x), x[:])
deep = copy.deepcopy(original)   # everything copied

original[0].append(99)
print(alias)     # changed
print(shallow)   # inner list changed too!
print(deep)      # independent

# The classic trap: multiplying a list of lists
grid = [[0] * 3] * 3
grid[0][0] = 1
print(grid)                      # every row changed: they are the same list

grid = [[0] * 3 for _ in range(3)]
grid[0][0] = 1
print(grid)                      # correct` },
        { type: 'note', value: 'Default arguments have the same trap: def add(item, items=[]) shares ONE list between all calls. Use items=None and create the list inside the function.' },
      ],
    },
    {
      id: 'py-tuples',
      title: 'Tuples and Unpacking',
      blocks: [
        { type: 'text', value: 'A tuple is an immutable ordered collection. Use it for fixed groups of values (coordinates, records, multiple return values) and as dictionary keys.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`point = (23.81, 90.41)
single = (42,)                    # the comma makes a tuple, not the parentheses
print(type(single), point[0])

lat, lng = point                  # unpacking
print(lat, lng)

first, *middle, last = [1, 2, 3, 4, 5]   # extended unpacking
print(first, middle, last)

def min_max(values):
    return min(values), max(values)       # returns a tuple
low, high = min_max([7, 2, 9, 4])
print(low, high)

# Tuples are hashable, so they can be dict keys and set members
distances = {("Dhaka", "Sylhet"): 241, ("Dhaka", "Khulna"): 272}
print(distances[("Dhaka", "Sylhet")])

# Named tuples: tuples with field names
from collections import namedtuple
Product = namedtuple("Product", "name price stock")
p = Product("Mouse", 450, 12)
print(p.name, p.price, p, p._replace(stock=0))

try:
    point[0] = 0
except TypeError as e:
    print("TypeError:", e)` },
      ],
    },
    {
      id: 'py-list-as-structures',
      title: 'Lists as Stacks and Queues',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`# Stack (LIFO): append and pop from the end are O(1)
history = []
for page in ["home", "courses", "python", "quiz"]:
    history.append(page)
print("Back to:", history.pop(), "-> now on", history[-1])

# Queue (FIFO): use collections.deque; list.pop(0) is O(n)
from collections import deque
queue = deque(["job A", "job B"])
queue.append("job C")
while queue:
    print("Processing", queue.popleft())

# deque with maxlen keeps only the last N items (recent searches)
recent = deque(maxlen=3)
for term in ["php", "python", "sql", "react"]:
    recent.append(term)
print(list(recent))

# bisect: keep a list sorted while inserting
import bisect
prices = [100, 250, 400, 900]
bisect.insort(prices, 300)
print(prices, bisect.bisect_left(prices, 400))` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'lists-tuples', q: 'What does nums.sort() return?', options: ['The sorted list', 'None (it sorts in place)', 'A new list', 'True'], answer: 1, explain: 'Use sorted(nums) when you need a new list.' },
    { chapterId: 'lists-tuples', q: 'How do you create a one-element tuple?', options: ['(42)', '(42,)', '[42]', 'tuple 42'], answer: 1, explain: 'The trailing comma makes it a tuple.' },
    { chapterId: 'lists-tuples', q: 'What does first, *rest = [1, 2, 3] give for rest?', options: ['2', '[2, 3]', '(2, 3)', '3'], answer: 1, explain: 'Starred unpacking collects the remaining items into a list.' },
    { chapterId: 'lists-tuples', q: 'After b = a.copy() with a = [[1]], what happens when you do a[0].append(2)?', options: ['b is unaffected', 'b[0] also changes', 'b becomes empty', 'An error'], answer: 1, explain: 'copy() is shallow: inner lists are shared.' },
    { chapterId: 'lists-tuples', q: 'Which structure is best for a FIFO queue?', options: ['list with pop(0)', 'collections.deque', 'tuple', 'set'], answer: 1, explain: 'deque.popleft() is O(1); list.pop(0) is O(n).' },
    { chapterId: 'lists-tuples', q: 'How do you sort a list of dicts by the "age" key?', options: ['sorted(rows, "age")', 'sorted(rows, key=lambda r: r["age"])', 'rows.sort("age")', 'sort_by(rows, age)'], answer: 1, explain: 'key receives each item and returns the value to sort by.' },
    { chapterId: 'lists-tuples', q: 'Why can a tuple be a dict key but a list cannot?', options: ['Tuples are faster', 'Tuples are immutable and hashable', 'Lists are too big', 'Dicts only accept tuples'], answer: 1, explain: 'Dictionary keys must be hashable, which requires immutability.' },
  ],
};
