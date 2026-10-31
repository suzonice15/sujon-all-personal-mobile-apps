// Python chapter: Interview Preparation. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'interview',
  title: 'Interview Preparation',
  description: 'The Python questions employers ask most, with answers and coding challenges',
  icon: 'work',
  lessons: [
    {
      id: 'py-interview-core',
      title: 'Top Core Questions',
      blocks: [
        { type: 'text', value: 'Answer each one out loud in two or three sentences, then show a tiny example. Interviewers want to see that you understand, not that you memorised.' },
        { type: 'heading', value: '1. list vs tuple vs set vs dict' },
        { type: 'text', value: 'list: ordered, mutable. tuple: ordered, immutable, hashable if its items are. set: unordered unique items with O(1) membership. dict: key-value map with O(1) lookup that keeps insertion order.' },
        { type: 'heading', value: '2. Mutable vs immutable, and the default argument trap' },
        { type: 'text', value: 'Mutable objects (list, dict, set) change in place and every name pointing to them sees it. Default arguments are evaluated once, so def f(x, items=[]) shares one list between calls: use None and create it inside.' },
        { type: 'heading', value: '3. is vs ==' },
        { type: 'text', value: '== compares values (__eq__); is compares identity (the same object in memory). Use is only for None, True and False.' },
        { type: 'heading', value: '4. What are *args and **kwargs?' },
        { type: 'text', value: '*args collects extra positional arguments into a tuple; **kwargs collects extra keyword arguments into a dict. In a call, * and ** unpack sequences and dicts.' },
        { type: 'heading', value: '5. What is the GIL?' },
        { type: 'text', value: 'The Global Interpreter Lock lets only one thread execute Python bytecode at a time in standard CPython. Threads still help for I/O-bound work; use multiprocessing or native code for CPU-bound work. Python 3.13+ has an optional free-threaded build.' },
        { type: 'heading', value: '6. Generators vs lists' },
        { type: 'text', value: 'A list holds all values in memory; a generator produces them one at a time on demand (lazy), using almost no memory, and can be iterated only once.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`# Classic "what does this print?" questions: predict first, then run
def add(item, items=[]):
    items.append(item)
    return items
print(add(1), add(2))                     # [1, 2] [1, 2]  (shared default list!)

a = [1, 2, 3]
b = a
b += [4]
print(a)                                  # [1, 2, 3, 4]: += mutates lists in place

t = (1, 2)
t2 = t
t2 += (3,)
print(t, t2)                              # tuples are immutable: t2 is a new tuple

print([lambda: i for i in range(3)][0]())  # 2: closures bind late
print(0.1 + 0.2 == 0.3, round(0.1 + 0.2, 10) == 0.3)
print(bool([]), bool([0]), bool("False"), [] is [], None == False)
x = 10
def f():
    return x * 2
x = 20
print(f())                                # 40: looks up x when called` },
      ],
    },
    {
      id: 'py-interview-coding',
      title: 'Common Coding Challenges',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from collections import Counter

# 1. Palindrome (ignore case and punctuation)
def is_palindrome(s):
    clean = [c.lower() for c in s if c.isalnum()]
    return clean == clean[::-1]
print(is_palindrome("A man, a plan, a canal: Panama"))

# 2. Anagrams
def are_anagrams(a, b):
    return Counter(a.replace(" ", "").lower()) == Counter(b.replace(" ", "").lower())
print(are_anagrams("Listen", "Silent"), are_anagrams("Python", "Java"))

# 3. First non-repeating character
def first_unique(s):
    counts = Counter(s)
    return next((c for c in s if counts[c] == 1), None)
print(first_unique("swiss"))

# 4. Group anagrams
def group_anagrams(words):
    groups = {}
    for w in words:
        groups.setdefault("".join(sorted(w)), []).append(w)
    return list(groups.values())
print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))

# 5. Flatten arbitrarily nested lists
def flatten(items):
    for x in items:
        yield from flatten(x) if isinstance(x, list) else [x]
print(list(flatten([1, [2, [3, [4, [5]]]], 6])))

# 6. Merge overlapping intervals (meeting times)
def merge(intervals):
    out = []
    for start, end in sorted(intervals):
        if out and start <= out[-1][1]:
            out[-1][1] = max(out[-1][1], end)
        else:
            out.append([start, end])
    return out
print(merge([[1, 3], [8, 10], [2, 6], [9, 12], [15, 18]]))

# 7. Valid brackets
def balanced(s):
    pairs, stack = {")": "(", "]": "[", "}": "{"}, []
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif ch in pairs and (not stack or stack.pop() != pairs[ch]):
            return False
    return not stack
print(balanced("{[()()]}"), balanced("([)]"))` },
      ],
    },
    {
      id: 'py-interview-senior',
      title: 'Senior-Level Topics',
      blocks: [
        { type: 'list', items: [
          'How does Python manage memory? (reference counting, cycle GC, small-object allocator)',
          'Explain decorators, and write a retry decorator with arguments.',
          'Explain context managers; when would you write one?',
          'Threads vs processes vs asyncio: choose for a web scraper, an image resizer and a chat server.',
          'How do you make a slow Django or FastAPI endpoint fast? (profile, fix N+1, indexes, caching, async I/O, background jobs)',
          'How do you structure a large Python project? (src layout, packages, dependency injection, typing, tests, CI)',
          'What happens when you type "python app.py"? (compile to bytecode, .pyc cache, the interpreter loop)',
          'Descriptors and the MRO: how does super() work with multiple inheritance?',
          'How do you deploy and monitor a Python service? (Docker, workers, env config, logs, metrics, Sentry)',
          'Data questions: how would you clean a messy CSV of 10 million rows? (chunks, dtypes, Polars/DuckDB)',
        ] },
        { type: 'note', value: 'Prepare two or three stories about projects you built: the problem, your design, a hard bug, the result. The projects in this course are great material: put them on GitHub with a clear README.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'interview', q: 'What does def add(x, items=[]) do across calls?', options: ['Creates a new list every call', 'Shares one list between calls', 'Raises an error', 'Returns None'], answer: 1, explain: 'Defaults are evaluated once at definition time.' },
    { chapterId: 'interview', q: 'After a = [1]; b = a; b += [2], what is a?', options: ['[1]', '[1, 2]', '[2]', 'An error'], answer: 1, explain: '+= extends the same list object in place.' },
    { chapterId: 'interview', q: 'Which is O(1) on average?', options: ['x in list', 'list.insert(0, x)', 'x in set', 'sorted(list)'], answer: 2, explain: 'Sets and dicts are hash tables.' },
    { chapterId: 'interview', q: 'What does Counter("hello")["l"] return?', options: ['1', '2', '3', 'KeyError'], answer: 1, explain: 'Counter counts occurrences; missing keys return 0.' },
    { chapterId: 'interview', q: 'Which tool is best for 10,000 concurrent websocket connections?', options: ['multiprocessing', 'asyncio', 'One thread per connection', 'time.sleep'], answer: 1, explain: 'An event loop handles many mostly-idle connections cheaply.' },
  ],
};
