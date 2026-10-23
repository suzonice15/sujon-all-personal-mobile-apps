// Python chapter: Dictionaries and Sets. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'dicts-sets',
  title: 'Dictionaries & Sets',
  description: 'Key-value maps, sets, Counter, defaultdict and hashing',
  icon: 'data-array',
  lessons: [
    {
      id: 'py-dicts',
      title: 'Dictionaries',
      blocks: [
        { type: 'text', value: 'A dict maps keys to values with very fast lookups (O(1) on average). Keys must be hashable (str, int, tuple...). Since Python 3.7, dicts keep insertion order.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`student = {"name": "Tanvir", "age": 19, "courses": ["Python", "SQL"]}

print(student["name"])
student["email"] = "tanvir@example.com"     # add or update
student["age"] += 1
del student["courses"]
print(student)

# Safe reading
print(student.get("phone"))                 # None instead of KeyError
print(student.get("phone", "not set"))
print("email" in student)

# Loop over keys, values or both
for key, value in student.items():
    print(f"{key}: {value}")
print(list(student.keys()), list(student.values()))

# Removing with a default
phone = student.pop("phone", None)
print(phone, len(student))

try:
    student["missing"]
except KeyError as e:
    print("KeyError:", e)` },
      ],
    },
    {
      id: 'py-dict-patterns',
      title: 'Merging, Defaults and Counting',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`defaults = {"theme": "light", "lang": "en", "font": 14}
user = {"theme": "dark", "font": 16}

settings = defaults | user                   # merge (3.9+): right side wins
print(settings)
settings |= {"lang": "bn"}                   # update in place
print(settings)
print({**defaults, **user})                  # older merge syntax

# setdefault: get the value, or insert a default first
groups = {}
for name, dept in [("A", "IT"), ("B", "HR"), ("C", "IT")]:
    groups.setdefault(dept, []).append(name)
print(groups)

# defaultdict creates missing values automatically
from collections import defaultdict, Counter
by_letter = defaultdict(list)
for word in ["apple", "avocado", "banana", "blueberry", "cherry"]:
    by_letter[word[0]].append(word)
print(dict(by_letter))

# Counter counts things
text = "the cat and the hat and the bat"
counts = Counter(text.split())
print(counts.most_common(2))
print(counts["the"], counts["dog"])          # missing keys count as 0
print(Counter("mississippi"))` },
      ],
    },
    {
      id: 'py-nested-data',
      title: 'Working with Nested Data (JSON-like)',
      blocks: [
        { type: 'text', value: 'API responses and config files are usually dicts inside lists inside dicts. Knowing how to walk, filter and reshape them is a daily skill.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`orders = [
    {"id": 101, "customer": {"name": "Nadia", "city": "Dhaka"}, "items": [{"sku": "KB", "qty": 1, "price": 1500}]},
    {"id": 102, "customer": {"name": "Rafi", "city": "Sylhet"}, "items": [{"sku": "MS", "qty": 2, "price": 450}, {"sku": "PAD", "qty": 1, "price": 300}]},
    {"id": 103, "customer": {"name": "Mim", "city": "Dhaka"}, "items": []},
]

# Total per order
for o in orders:
    total = sum(i["qty"] * i["price"] for i in o["items"])
    print(o["id"], o["customer"]["name"], total)

# Revenue by city
revenue = {}
for o in orders:
    city = o["customer"]["city"]
    revenue[city] = revenue.get(city, 0) + sum(i["qty"] * i["price"] for i in o["items"])
print(revenue)

# Index by id for fast lookup
by_id = {o["id"]: o for o in orders}
print(by_id[102]["customer"]["name"])

# Safe deep access
def dig(data, *keys, default=None):
    for k in keys:
        try:
            data = data[k]
        except (KeyError, IndexError, TypeError):
            return default
    return data

print(dig(orders, 1, "items", 0, "sku"), dig(orders, 2, "items", 0, "sku", default="none"))` },
      ],
    },
    {
      id: 'py-sets',
      title: 'Sets',
      blocks: [
        { type: 'text', value: 'A set is an unordered collection of unique, hashable items. Membership tests are O(1), and set operations express "what is common / different" in one line.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`emails = ["a@x.com", "b@x.com", "a@x.com", "c@x.com"]
unique = set(emails)
print(len(emails), len(unique))

python_students = {"Nadia", "Rafi", "Mim", "Arif"}
php_students = {"Rafi", "Arif", "Tania"}

print(python_students & php_students)      # intersection: both courses
print(python_students | php_students)      # union: any course
print(python_students - php_students)      # only Python
print(python_students ^ php_students)      # exactly one course
print({"Rafi"} <= php_students)            # subset

tags = set()
tags.add("python"); tags.add("backend"); tags.add("python")
tags.discard("missing")                    # no error if absent
print(sorted(tags))

# Remove duplicates but KEEP order
seen = list(dict.fromkeys(["b", "a", "b", "c", "a"]))
print(seen)

frozen = frozenset({1, 2})                 # immutable, can be a dict key
print({frozen: "pair"})
print(set() == {} , type({}))              # {} is an empty DICT, not a set` },
      ],
    },
    {
      id: 'py-hashing',
      title: 'How Hashing Works',
      blocks: [
        { type: 'text', value: 'Dicts and sets are hash tables. Python calls hash(key) to find the slot, then compares with == to confirm. That is why keys must not change: a list could change after insertion and end up in the wrong slot, so lists are unhashable.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`print(hash("python") == hash("python"), hash(42), hash((1, 2)) == hash((1, 2)))

try:
    {[1, 2]: "nope"}
except TypeError as e:
    print("TypeError:", e)

# Objects equal with == must have equal hashes
print(1 == 1.0 == True, hash(1) == hash(1.0) == hash(True))
d = {1: "int"}
d[1.0] = "float"           # same key!
d[True] = "bool"           # same key again!
print(d)

# Membership speed: set vs list
import timeit
big_list = list(range(100_000))
big_set = set(big_list)
t_list = timeit.timeit(lambda: 99_999 in big_list, number=200)
t_set = timeit.timeit(lambda: 99_999 in big_set, number=200)
print(f"list: {t_list:.6f} s")
print(f"set:  {t_set:.6f} s  (about {t_list / t_set:,.0f}x faster)")` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'dicts-sets', q: 'What does d.get("x", 0) return when "x" is missing?', options: ['None', 'KeyError', '0', '"x"'], answer: 2, explain: 'get returns the default instead of raising KeyError.' },
    { chapterId: 'dicts-sets', q: 'What does {"a": 1} | {"a": 2} return?', options: ['{"a": 1}', '{"a": 2}', '{"a": [1, 2]}', 'An error'], answer: 1, explain: 'In a merge the right operand wins.' },
    { chapterId: 'dicts-sets', q: 'What is type({})?', options: ['set', 'dict', 'tuple', 'list'], answer: 1, explain: 'Empty braces make a dict; use set() for an empty set.' },
    { chapterId: 'dicts-sets', q: 'Which gives the items in BOTH sets a and b?', options: ['a | b', 'a & b', 'a - b', 'a ^ b'], answer: 1, explain: '& is intersection.' },
    { chapterId: 'dicts-sets', q: 'Why can a list not be a dict key?', options: ['Lists are too slow', 'Lists are mutable and therefore unhashable', 'Keys must be strings', 'Lists are ordered'], answer: 1, explain: 'A key\'s hash must never change.' },
    { chapterId: 'dicts-sets', q: 'Which tool counts how often each item appears?', options: ['collections.Counter', 'collections.deque', 'dict.fromkeys', 'set.count'], answer: 0, explain: 'Counter(items).most_common(n) gives the top items.' },
    { chapterId: 'dicts-sets', q: 'What is the average time complexity of "x in some_set"?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], answer: 2, explain: 'Sets are hash tables.' },
  ],
};
