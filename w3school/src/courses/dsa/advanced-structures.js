// DSA chapter: Advanced Structures.

export default {
  id: 'advanced-structures',
  title: 'Advanced Structures',
  description: 'Tries, union-find and bit tricks',
  icon: 'account-tree',
  lessons: [
    {
      id: 'dsa-trie',
      title: 'Tries',
      blocks: [
        { type: 'text', value: 'A trie stores strings character by character. Prefix search is O(length of the prefix), which makes it the right structure for autocomplete, spell check and routing tables.' },
        { type: 'code', lang: 'js', tryIt: true, value: `class Trie {\n  constructor() {\n    this.root = {};\n  }\n\n  insert(word) {\n    let node = this.root;\n    for (const ch of word) {\n      node[ch] = node[ch] || {};\n      node = node[ch];\n    }\n    node.end = true;\n  }\n\n  startsWith(prefix) {\n    let node = this.root;\n    for (const ch of prefix) {\n      node = node[ch];\n      if (!node) return false;\n    }\n    return true;\n  }\n}\n\nconst trie = new Trie();\ntrie.insert('sql');\ntrie.insert('sqlite');\n\nconsole.log(trie.startsWith('sq'));\nconsole.log(trie.startsWith('java'));` },
        { type: 'note', value: 'A trie trades memory for speed. For a huge dictionary, a compressed trie or a ternary search tree uses less space.' },
      ],
    },
    {
      id: 'dsa-union-find',
      title: 'Union-Find',
      blocks: [
        { type: 'text', value: 'Union-Find tracks connected components. It answers “are these two connected?” almost in constant time. It powers network connectivity, Kruskal’s algorithm and grouping problems.' },
        { type: 'code', lang: 'js', tryIt: true, value: `class DSU {\n  constructor(n) {\n    this.parent = Array.from({ length: n }, (_, i) => i);\n    this.size = Array(n).fill(1);\n  }\n\n  find(x) {\n    while (this.parent[x] !== x) {\n      this.parent[x] = this.parent[this.parent[x]];\n      x = this.parent[x];\n    }\n    return x;\n  }\n\n  union(a, b) {\n    let ra = this.find(a);\n    let rb = this.find(b);\n    if (ra === rb) return false;\n    if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];\n    this.parent[rb] = ra;\n    this.size[ra] += this.size[rb];\n    return true;\n  }\n}\n\nconst dsu = new DSU(5);\ndsu.union(0, 1);\ndsu.union(3, 4);\n\nconsole.log(dsu.find(0) === dsu.find(1));\nconsole.log(dsu.find(0) === dsu.find(3));` },
        { type: 'note', value: 'Path compression plus union by size gives near-constant amortized time.' },
      ],
    },
    {
      id: 'dsa-bit-tricks',
      title: 'Bit manipulation',
      blocks: [
        { type: 'text', value: 'Bit operations solve some problems in one pass: counting set bits, checking a power of two, and finding the single number in a list of pairs.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function countBits(n) {\n  let count = 0;\n  while (n) {\n    n &= n - 1;\n    count++;\n  }\n  return count;\n}\n\nfunction isPowerOfTwo(n) {\n  return n > 0 && (n & (n - 1)) === 0;\n}\n\nfunction singleNumber(nums) {\n  return nums.reduce((acc, n) => acc ^ n, 0);\n}\n\nconsole.log(countBits(13));\nconsole.log(isPowerOfTwo(64));\nconsole.log(singleNumber([4, 1, 2, 1, 2]));` },
        { type: 'list', items: [
          'n & (n - 1) clears the lowest set bit',
          'n & -n isolates the lowest set bit',
          'XOR removes pairs',
          'Shift by 1 is not a division for negatives',
          'Use bit tricks only when they stay readable',
        ] },
        { type: 'note', value: 'JavaScript bitwise operators work on 32-bit signed integers. Beyond that, use BigInt.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'advanced-structures',
      q: 'What makes a trie fast for prefixes?',
      options: ['Sorting', 'Character-by-character traversal', 'Hashing', 'Binary search'],
      answer: 1,
      explain: 'It walks the prefix once.',
    },
    {
      chapterId: 'advanced-structures',
      q: 'What does Union-Find track?',
      options: ['Sorted order', 'Connected components', 'Hash buckets', 'Tree height only'],
      answer: 1,
      explain: 'It groups connected elements.',
    },
    {
      chapterId: 'advanced-structures',
      q: 'What does n & (n - 1) do?',
      options: ['Sets a bit', 'Clears the lowest set bit', 'Doubles n', 'Reverses bits'],
      answer: 1,
      explain: 'It removes the lowest set bit.',
    },
    {
      chapterId: 'advanced-structures',
      q: 'Why does XOR find a single number?',
      options: ['It sorts', 'Pairs cancel to zero', 'It counts bits', 'It hashes'],
      answer: 1,
      explain: 'x ^ x is zero.',
    },
  ],
};
