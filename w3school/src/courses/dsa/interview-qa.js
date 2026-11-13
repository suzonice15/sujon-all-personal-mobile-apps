// DSA interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is the difference between time and space complexity?',
      a: 'Time complexity measures how the number of operations grows with input size. Space complexity measures extra memory used beyond the input. Both are expressed with Big O.',
      level: 'basic',
    },
    {
      q: 'Why drop constants in Big O?',
      a: 'Constants do not change the growth shape. O(2n) and O(n) both grow linearly, so the constant is ignored to compare algorithms by their scaling behaviour.',
      level: 'basic',
    },
    {
      q: 'What is amortized complexity?',
      a: 'The average cost per operation over a sequence, even if some operations are expensive. A dynamic array push is usually O(1) and occasionally O(n), so the amortized cost is O(1).',
      level: 'advanced',
    },
    {
      q: 'How do you decide between a simple and an optimal solution?',
      a: 'Start with the simple correct solution, state its cost, then optimise only if the constraints require it. A working O(n^2) answer beats an unfinished O(n) idea in most interviews.',
      level: 'intermediate',
    },
  ],
  'arrays-strings': [
    {
      q: 'Why are arrays O(1) for index access?',
      a: 'Elements are stored contiguously, so the address is base + index * elementSize. No traversal is needed.',
      level: 'basic',
    },
    {
      q: 'When do two pointers work?',
      a: 'When the data is sorted or has a symmetric property, so moving one pointer predictably improves or worsens the result.',
      level: 'intermediate',
    },
    {
      q: 'How does a prefix sum answer range queries?',
      a: 'Store the running total. The sum from i to j is prefix[j] - prefix[i - 1], which is O(1) after O(n) preprocessing.',
      level: 'intermediate',
    },
    {
      q: 'Why can string concatenation be slow in a loop?',
      a: 'Strings are immutable, so each concatenation may allocate and copy a new string, leading to O(n^2) work. Collect parts and join once.',
      level: 'intermediate',
    },
  ],
  'linked-lists': [
    {
      q: 'When is a linked list better than an array?',
      a: 'When you insert or delete frequently at a known position, or when nodes move between lists, because no elements shift. Arrays usually win for index access and cache locality.',
      level: 'intermediate',
    },
    {
      q: 'How do you reverse a linked list iteratively?',
      a: 'Keep previous, current and next. Each step points current.next to previous, then advances all three. O(n) time, O(1) space.',
      level: 'basic',
    },
    {
      q: 'How does Floyd\'s cycle detection work?',
      a: 'Move a slow pointer one step and a fast pointer two steps. If they meet, there is a cycle. If fast reaches null, there is no cycle.',
      level: 'intermediate',
    },
    {
      q: 'How do you find the middle of a linked list?',
      a: 'Use slow and fast pointers. When fast reaches the end, slow is at the middle. This also works for finding the start of a cycle with an extra pass.',
      level: 'intermediate',
    },
  ],
  'stacks-queues': [
    {
      q: 'Give a real use of a stack.',
      a: 'Undo history, browser back, function calls, expression evaluation and backtracking all use last-in-first-out order.',
      level: 'basic',
    },
    {
      q: 'Give a real use of a queue.',
      a: 'Print jobs, message queues, BFS and rate limiting use first-in-first-out order.',
      level: 'basic',
    },
    {
      q: 'How do you check balanced brackets?',
      a: 'Push openings, pop on closings and compare. The string is valid only if every closing matches and the stack ends empty. O(n) time.',
      level: 'basic',
    },
    {
      q: 'What is a monotonic stack?',
      a: 'A stack kept in sorted order by popping elements that break the order. It answers next-greater or next-smaller questions in O(n).',
      level: 'advanced',
    },
  ],
  'hash-maps': [
    {
      q: 'What is the average and worst-case lookup of a hash map?',
      a: 'Average O(1). Worst case O(n) if many keys collide into the same bucket. Good hash functions and resizing keep it near constant.',
      level: 'intermediate',
    },
    {
      q: 'When do you use a Set instead of a Map?',
      a: 'A Set stores unique values with no associated data, for example tracking visited nodes or detecting duplicates.',
      level: 'basic',
    },
    {
      q: 'How does a hash map solve two sum?',
      a: 'Store each value with its index. For each new value, check whether target - value is already stored. One pass, O(n).',
      level: 'basic',
    },
    {
      q: 'What is a good key for grouping anagrams?',
      a: 'The sorted letters, or a 26-length count signature. Both produce the same key for words made of the same letters.',
      level: 'intermediate',
    },
  ],
  recursion: [
    {
      q: 'What are the two required parts of a recursive function?',
      a: 'A base case that returns without recursing, and a recursive case that moves toward the base case with a smaller input.',
      level: 'basic',
    },
    {
      q: 'What is memoization?',
      a: 'Caching the result of a subproblem so it is calculated once. It turns exponential recursion into polynomial time when subproblems repeat.',
      level: 'intermediate',
    },
    {
      q: 'Why can deep recursion crash?',
      a: 'Each call keeps a stack frame. The stack has a fixed limit, so depth beyond it throws a stack overflow. Convert to iteration or increase the limit carefully.',
      level: 'intermediate',
    },
    {
      q: 'What is backtracking?',
      a: 'A recursive search that makes a choice, explores, then undoes the choice before trying the next. It enumerates combinations, permutations and constraint solutions.',
      level: 'advanced',
    },
  ],
  sorting: [
    {
      q: 'Which sorting algorithms are stable?',
      a: 'Merge sort, insertion sort and bubble sort are stable. Quick sort and heap sort are not stable in their usual forms.',
      level: 'intermediate',
    },
    {
      q: 'What is the lower bound for comparison sorting?',
      a: 'O(n log n). There are n! possible orders, and each comparison gives one bit, so at least log2(n!) comparisons are needed.',
      level: 'advanced',
    },
    {
      q: 'When is insertion sort a good choice?',
      a: 'For small arrays or nearly sorted data, where it is O(n) to O(n^2) but with a very small constant and no extra memory.',
      level: 'intermediate',
    },
    {
      q: 'Why is quick sort often faster than merge sort in practice?',
      a: 'It sorts in place with good cache locality and a small constant factor. Merge sort needs O(n) extra memory and copying.',
      level: 'intermediate',
    },
  ],
  searching: [
    {
      q: 'What is the precondition for binary search?',
      a: 'The data must be sorted, or at least the predicate must be monotonic so one half can be discarded safely.',
      level: 'basic',
    },
    {
      q: 'How many steps does binary search take for one million items?',
      a: 'About 20, because log2(1,000,000) is roughly 20. Linear search could need one million.',
      level: 'intermediate',
    },
    {
      q: 'What is lower bound?',
      a: 'The first index whose value is not less than the target. It is also the insertion point and handles duplicates cleanly.',
      level: 'intermediate',
    },
    {
      q: 'What is binary search on the answer?',
      a: 'Binary searching a range of possible answers when a monotonic predicate separates invalid from valid values, for example the minimum capacity to ship in D days.',
      level: 'advanced',
    },
  ],
  trees: [
    {
      q: 'What is the difference between a tree and a graph?',
      a: 'A tree is a connected graph with no cycles and exactly V-1 edges. A graph may have cycles and disconnected parts.',
      level: 'basic',
    },
    {
      q: 'Which traversal gives sorted output from a BST?',
      a: 'In-order traversal: left subtree, node, right subtree.',
      level: 'basic',
    },
    {
      q: 'Why can a BST degrade to O(n)?',
      a: 'Inserting sorted values creates a skewed tree shaped like a linked list. Self-balancing trees rotate to keep height logarithmic.',
      level: 'intermediate',
    },
    {
      q: 'What is the height of a balanced binary tree with n nodes?',
      a: 'O(log n). A complete tree of height h holds at least 2^h nodes.',
      level: 'advanced',
    },
  ],
  heaps: [
    {
      q: 'What is the difference between a heap and a BST?',
      a: 'A heap guarantees only that parents are smaller (or larger) than children, so the root is the extreme. A BST guarantees full ordering. A heap is cheaper to build and is used for priority queues.',
      level: 'intermediate',
    },
    {
      q: 'How do you find the K largest elements?',
      a: 'Keep a min-heap of size K. Push each value and pop the smallest when the heap exceeds K. O(n log k) time, O(k) space.',
      level: 'intermediate',
    },
    {
      q: 'What is the time to build a heap from n items?',
      a: 'O(n), not O(n log n), because most nodes are near the bottom and sift down only a little. Each push individually would be O(n log n).',
      level: 'advanced',
    },
    {
      q: 'Where is a priority queue used in real systems?',
      a: 'Task scheduling, Dijkstra\'s shortest path, event simulation, rate limiting and merging sorted streams.',
      level: 'basic',
    },
  ],
  graphs: [
    {
      q: 'When do you use BFS instead of DFS?',
      a: 'BFS finds the shortest path in an unweighted graph and explores level by level. DFS is better for connectivity, cycles and topological order.',
      level: 'intermediate',
    },
    {
      q: 'What is the space complexity of BFS?',
      a: 'O(V) for the queue and visited set in the worst case, for example a star-shaped graph.',
      level: 'intermediate',
    },
    {
      q: 'How do you detect a cycle in a directed graph?',
      a: 'Use DFS with three states (unvisited, visiting, done) and report a back edge, or run Kahn\'s topological sort and check that all vertices were processed.',
      level: 'advanced',
    },
    {
      q: 'What is topological sort used for?',
      a: 'Ordering tasks with dependencies, such as build steps, package installation and course prerequisites. It exists only for DAGs.',
      level: 'intermediate',
    },
  ],
  'dynamic-programming': [
    {
      q: 'What is the difference between memoization and tabulation?',
      a: 'Memoization is top-down recursion with a cache. Tabulation is bottom-up iteration that fills a table in dependency order. Both avoid repeated work.',
      level: 'intermediate',
    },
    {
      q: 'How do you define a DP state?',
      a: 'Write one sentence describing exactly what dp[i] means. Every transition and base case must follow from that sentence.',
      level: 'intermediate',
    },
    {
      q: 'Why is 0/1 knapsack different from unbounded knapsack?',
      a: 'In 0/1 each item is used at most once, so capacity is iterated backwards. In unbounded knapsack items can repeat, so it is iterated forwards.',
      level: 'advanced',
    },
    {
      q: 'When is greedy better than DP?',
      a: 'When a local choice is provably optimal for the whole problem, for example interval scheduling by earliest finish time. If you cannot prove it, use DP.',
      level: 'advanced',
    },
  ],
  'patterns-interview': [
    {
      q: 'How do you recognise a sliding window problem?',
      a: 'The question asks about a contiguous subarray or substring, often with a constraint such as longest, shortest, at most K or sum. The window updates incrementally.',
      level: 'intermediate',
    },
    {
      q: 'How do you count subarrays with a given sum?',
      a: 'Track the running sum and a map of how many times each prefix sum occurred. Add the count for sum - target at each step.',
      level: 'advanced',
    },
    {
      q: 'What should you test before submitting an interview solution?',
      a: 'Empty input, one element, duplicates, negative numbers, already sorted data and the largest allowed input. State the complexity after testing.',
      level: 'basic',
    },
    {
      q: 'What is the best way to prepare for DSA interviews?',
      a: 'Practise by pattern, not by memorising solutions. Solve a few problems per pattern, explain the complexity out loud, and revisit mistakes after a few days.',
      level: 'basic',
    },
  ],
  'advanced-structures': [
    {
      q: 'When is a trie better than a hash map?',
      a: 'When you need prefix queries or ordered traversal. A hash map only answers exact keys.',
      level: 'basic',
    },
    {
      q: 'What does Union-Find optimize?',
      a: 'Connectivity queries and merging sets, near constant time with path compression and union by size.',
      level: 'intermediate',
    },
    {
      q: 'How does n & (n - 1) help?',
      a: 'It clears the lowest set bit, which counts bits and tests powers of two without a loop over all bits.',
      level: 'intermediate',
    },
    {
      q: 'What is the limit of bit tricks in JavaScript?',
      a: 'Operators work on 32-bit signed integers. Use BigInt for larger values.',
      level: 'advanced',
    },
  ],
};
