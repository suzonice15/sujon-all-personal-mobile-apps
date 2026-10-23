// Python chapter: Algorithms and Data Structures. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'algorithms',
  title: 'Algorithms & Data Structures',
  description: 'Big-O, searching, sorting, heaps, graphs, Dijkstra, DP and interview patterns',
  icon: 'account-tree',
  lessons: [
    {
      id: 'py-complexity',
      title: 'Big-O of Python Operations',
      blocks: [
        { type: 'list', items: [
          'list: index, append, pop() O(1); insert(0, x), pop(0), "x in list", remove O(n).',
          'dict / set: lookup, insert, delete, "in" O(1) on average.',
          'deque: append and popleft O(1). heapq: push and pop O(log n).',
          'sorted() / list.sort(): O(n log n) (Timsort, very fast on partly sorted data).',
          'String concatenation in a loop is O(n²): collect pieces in a list and "".join() once.',
        ] },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import time

emails = [f"user{i % 9_000}@x.com" for i in range(10_000)]

t = time.perf_counter()
dupes = [e for i, e in enumerate(emails) if e in emails[:i]]           # O(n²)
slow = time.perf_counter() - t

t = time.perf_counter()
seen, dupes2 = set(), []
for e in emails:                                                       # O(n)
    if e in seen:
        dupes2.append(e)
    seen.add(e)
fast = time.perf_counter() - t

print(len(dupes), len(dupes2), f"O(n²): {slow:.2f}s  O(n): {fast:.4f}s")` },
      ],
    },
    {
      id: 'py-search-sort',
      title: 'Binary Search and Sorting Algorithms',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import bisect

def binary_search(items, target):
    lo, hi = 0, len(items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if items[mid] == target:
            return mid
        if items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

ids = list(range(0, 1_000_000, 3))
print(binary_search(ids, 777_777), binary_search(ids, 5))
print(bisect.bisect_left(ids, 777_777))          # the standard library does the same

def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    return out + left[i:] + right[j:]

def quick_sort(a):
    if len(a) < 2:
        return a
    pivot, *rest = a
    return quick_sort([x for x in rest if x < pivot]) + [pivot] + quick_sort([x for x in rest if x >= pivot])

data = [38, 27, 43, 3, 9, 82, 10, 3]
print(merge_sort(data), quick_sort(data), sorted(data) == merge_sort(data))` },
      ],
    },
    {
      id: 'py-heaps-lru',
      title: 'Heaps, Top-K and LRU Cache',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import heapq
from collections import OrderedDict

scores = {"Nadia": 91, "Rafi": 78, "Mim": 85, "Arif": 95, "Tania": 88}
print(heapq.nlargest(3, scores.items(), key=lambda kv: kv[1]))

# Priority queue: smallest priority first
tasks = []
heapq.heappush(tasks, (2, "resize image"))
heapq.heappush(tasks, (1, "process payment"))
heapq.heappush(tasks, (3, "send newsletter"))
while tasks:
    print(heapq.heappop(tasks))

# Merge sorted streams efficiently
print(list(heapq.merge([1, 4, 9], [2, 3, 10], [5])))

class LRUCache:
    def __init__(self, capacity):
        self.capacity, self.data = capacity, OrderedDict()
    def get(self, key):
        if key not in self.data:
            return None
        self.data.move_to_end(key)                 # mark as most recently used
        return self.data[key]
    def put(self, key, value):
        self.data[key] = value
        self.data.move_to_end(key)
        if len(self.data) > self.capacity:
            self.data.popitem(last=False)          # evict least recently used

cache = LRUCache(2)
cache.put("a", 1); cache.put("b", 2); cache.get("a"); cache.put("c", 3)
print(list(cache.data))` },
      ],
    },
    {
      id: 'py-graphs',
      title: 'Graphs: BFS, DFS, Topological Sort and Dijkstra',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from collections import deque
import heapq
from graphlib import TopologicalSorter

routes = {"A": ["B", "C"], "B": ["D"], "C": ["D", "E"], "D": ["F"], "E": ["F"], "F": []}

def bfs_path(graph, start, goal):                   # shortest path by number of hops
    queue, seen = deque([[start]]), {start}
    while queue:
        path = queue.popleft()
        if path[-1] == goal:
            return path
        for nxt in graph[path[-1]]:
            if nxt not in seen:
                seen.add(nxt)
                queue.append(path + [nxt])
print("BFS:", bfs_path(routes, "A", "F"))

def dfs(graph, node, seen=None):
    seen = seen or []
    seen.append(node)
    for nxt in graph[node]:
        if nxt not in seen:
            dfs(graph, nxt, seen)
    return seen
print("DFS order:", dfs(routes, "A"))

prereq = {"laravel": {"php", "sql"}, "php": {"html"}, "vue": {"js", "css"}, "css": {"html"}, "js": {"html"}}
print("Study order:", list(TopologicalSorter(prereq).static_order()))

# Dijkstra: cheapest path with weighted edges (km between cities)
roads = {
    "Dhaka": {"Cumilla": 100, "Mymensingh": 120},
    "Cumilla": {"Chattogram": 150, "Sylhet": 230},
    "Mymensingh": {"Sylhet": 190},
    "Chattogram": {"Cox's Bazar": 150},
    "Sylhet": {}, "Cox's Bazar": {},
}

def dijkstra(graph, source):
    dist, prev = {source: 0}, {}
    heap = [(0, source)]
    while heap:
        d, node = heapq.heappop(heap)
        if d > dist.get(node, float("inf")):
            continue
        for nxt, w in graph[node].items():
            if d + w < dist.get(nxt, float("inf")):
                dist[nxt], prev[nxt] = d + w, node
                heapq.heappush(heap, (d + w, nxt))
    return dist, prev

dist, prev = dijkstra(roads, "Dhaka")
target = "Cox's Bazar"
path = [target]
while path[-1] != "Dhaka":
    path.append(prev[path[-1]])            # walk back to the start
print(f"Dhaka -> {target}: {dist[target]} km via", " -> ".join(reversed(path)))
print({city: km for city, km in sorted(dist.items(), key=lambda kv: kv[1])})` },
      ],
    },
    {
      id: 'py-dp-patterns',
      title: 'Dynamic Programming and Interview Patterns',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from functools import cache

# 1. Coin change (fewest notes)
def min_coins(coins, amount):
    best = [0] + [float("inf")] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                best[a] = min(best[a], best[a - c] + 1)
    return best[amount] if best[amount] != float("inf") else -1
print("Notes for 1,786 Tk:", min_coins([1, 2, 5, 10, 20, 50, 100, 200, 500, 1000], 1786))

# 2. Longest common subsequence with memoized recursion
def lcs(a, b):
    @cache
    def go(i, j):
        if i == len(a) or j == len(b):
            return ""
        if a[i] == b[j]:
            return a[i] + go(i + 1, j + 1)
        return max(go(i + 1, j), go(i, j + 1), key=len)
    return go(0, 0)
print("LCS:", lcs("PYTHONIC", "PHOTONIC"))

# 3. Two pointers: pair with a given sum in a sorted list
def pair_sum(nums, target):
    i, j = 0, len(nums) - 1
    while i < j:
        s = nums[i] + nums[j]
        if s == target: return nums[i], nums[j]
        i, j = (i + 1, j) if s < target else (i, j - 1)
    return None
print("Pair:", pair_sum([1, 3, 4, 6, 8, 11], 14))

# 4. Sliding window: best 3-day sales
def best_window(values, k):
    window = sum(values[:k]); best = window
    for i in range(k, len(values)):
        window += values[i] - values[i - k]
        best = max(best, window)
    return best
print("Best 3 days:", best_window([5, 1, 9, 7, 2, 8, 6], 3))

# 5. Hash map: two sum (indices)
def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return seen[target - n], i
        seen[n] = i
print("Two sum:", two_sum([2, 7, 11, 15], 18))` },
        { type: 'note', value: 'Practise on LeetCode or HackerRank in Python. Most interview problems are a variation of: hash map, two pointers, sliding window, BFS/DFS, binary search, heap, or dynamic programming.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'algorithms', q: 'What is the cost of x in some_list?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 2, explain: 'Lists are scanned; use a set for O(1) membership.' },
    { chapterId: 'algorithms', q: 'Which module gives a priority queue?', options: ['queue only', 'heapq', 'bisect', 'array'], answer: 1, explain: 'heapq implements a binary min-heap on a list.' },
    { chapterId: 'algorithms', q: 'Which algorithm finds the cheapest route in a weighted graph with non-negative weights?', options: ['BFS', 'DFS', 'Dijkstra', 'Binary search'], answer: 2, explain: 'BFS only works when every edge has the same cost.' },
    { chapterId: 'algorithms', q: 'What does graphlib.TopologicalSorter produce?', options: ['The shortest path', 'An order that respects all dependencies', 'A sorted list of numbers', 'A tree'], answer: 1, explain: 'Useful for build steps, migrations and prerequisites.' },
    { chapterId: 'algorithms', q: 'Why is building a string with += in a loop slow?', options: ['Strings are mutable', 'Each += can copy the whole string, giving O(n²)', 'It uses too many threads', 'It is not slow'], answer: 1, explain: 'Collect pieces in a list and join once.' },
    { chapterId: 'algorithms', q: 'What do dynamic programming solutions store?', options: ['Random values', 'Answers to overlapping sub-problems', 'Only the input', 'Nothing'], answer: 1, explain: 'With a table (bottom-up) or memoization (top-down, @cache).' },
  ],
};
