// DSA chapter: Trees.

export default {
  id: 'trees',
  title: 'Trees',
  description: 'Binary trees, BST operations and traversals',
  icon: 'park',
  lessons: [
    {
      id: 'dsa-tree-basics',
      title: 'Tree basics',
      blocks: [
        { type: 'text', value: 'A tree is a set of nodes connected by edges with no cycles. The top node is the root, each node has children, and a node with no children is a leaf. A binary tree allows at most two children.' },
        { type: 'code', lang: 'js', tryIt: true, value: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);

console.log(root.value, root.left.value, root.right.value);` },
        { type: 'list', items: [
          'Height - the longest path from root to leaf',
          'Depth - the distance from the root to a node',
          'Balanced - left and right heights differ by at most one at every node',
          'Full - every node has zero or two children',
        ] },
      ],
    },
    {
      id: 'dsa-bst',
      title: 'Binary search trees',
      blocks: [
        { type: 'text', value: 'In a binary search tree, every value in the left subtree is smaller and every value in the right subtree is larger. Search and insert follow one path, O(log n) when balanced and O(n) when skewed.' },
        { type: 'code', lang: 'js', tryIt: true, value: `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) { current.left = node; return; }
        current = current.left;
      } else {
        if (!current.right) { current.right = node; return; }
        current = current.right;
      }
    }
  }

  has(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }
}

const tree = new BST();
[10, 5, 15, 3, 7].forEach((value) => tree.insert(value));
console.log(tree.has(7), tree.has(12));` },
        { type: 'note', value: 'Inserting already sorted values creates a skewed tree that behaves like a linked list. Self-balancing trees such as AVL and red-black fix this by rotating nodes.' },
      ],
    },
    {
      id: 'dsa-traversals',
      title: 'Traversals',
      blocks: [
        { type: 'text', value: 'Depth-first traversals visit a node and its subtrees in different orders. In-order on a BST produces sorted values. Breadth-first visits level by level with a queue.' },
        { type: 'code', lang: 'js', tryIt: true, value: `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function inorder(node, out = []) {
  if (!node) return out;
  inorder(node.left, out);
  out.push(node.value);
  inorder(node.right, out);
  return out;
}

function preorder(node, out = []) {
  if (!node) return out;
  out.push(node.value);
  preorder(node.left, out);
  preorder(node.right, out);
  return out;
}

function postorder(node, out = []) {
  if (!node) return out;
  postorder(node.left, out);
  postorder(node.right, out);
  out.push(node.value);
  return out;
}

const root = new Node(10);
root.left = new Node(5);
root.right = new Node(15);
root.left.left = new Node(3);
root.left.right = new Node(7);

console.log('in', inorder(root));
console.log('pre', preorder(root));
console.log('post', postorder(root));` },
        { type: 'code', lang: 'js', tryIt: true, value: `function bfs(root) {
  if (!root) return [];
  const out = [];
  const queue = [root];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    out.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return out;
}

const root = { value: 1, left: { value: 2 }, right: { value: 3 } };
console.log(bfs(root));` },
        { type: 'note', value: 'Recursive traversals use O(h) stack space, where h is the height. BFS uses O(w) queue space, where w is the widest level.' },
      ],
    },
    {
      id: 'dsa-height-balanced',
      title: 'Height and balance',
      blocks: [
        { type: 'text', value: 'Height is the number of edges on the longest path to a leaf. A tree is balanced when every node has left and right heights within one. Balance keeps operations logarithmic.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function height(node) {
  if (!node) return 0;
  return 1 + Math.max(height(node.left), height(node.right));
}

function isBalanced(node) {
  let balanced = true;

  function check(current) {
    if (!current) return 0;
    const left = check(current.left);
    const right = check(current.right);
    if (Math.abs(left - right) > 1) balanced = false;
    return 1 + Math.max(left, right);
  }

  check(node);
  return balanced;
}

const root = { value: 1, left: { value: 2 }, right: null };
console.log(height(root), isBalanced(root));` },
        { type: 'text', value: 'This bottom-up check runs in O(n) because each node is visited once. A naive version that calls height at every node is O(n^2).' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'trees',
      q: 'Which traversal of a BST returns sorted values?',
      options: ['Pre-order', 'In-order', 'Post-order', 'Breadth-first'],
      answer: 1,
      explain: 'In-order visits left subtree, node, right subtree, which is ascending order in a BST.',
    },
    {
      chapterId: 'trees',
      q: 'What is the worst-case search time in a skewed BST?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 2,
      explain: 'A skewed tree is a linked list, so search walks every node.',
    },
    {
      chapterId: 'trees',
      q: 'Which data structure drives level-order traversal?',
      options: ['Stack', 'Queue', 'Heap', 'Set'],
      answer: 1,
      explain: 'BFS processes nodes in the order they are discovered, level by level.',
    },
    {
      chapterId: 'trees',
      q: 'What does a balanced tree guarantee?',
      options: ['Sorted values', 'Logarithmic height', 'No leaves', 'Constant search always'],
      answer: 1,
      explain: 'Balanced trees keep height O(log n), so search and insert stay logarithmic.',
    },
    {
      chapterId: 'trees',
      q: 'How much stack space does a recursive traversal use?',
      options: ['O(1)', 'O(h) where h is height', 'O(n^2)', 'O(log n) always'],
      answer: 1,
      explain: 'The recursion depth follows the tree height.',
    },
  ],
};
