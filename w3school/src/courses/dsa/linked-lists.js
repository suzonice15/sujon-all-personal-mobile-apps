// DSA chapter: Linked Lists.

export default {
  id: 'linked-lists',
  title: 'Linked Lists',
  description: 'Nodes, pointers, reversal and cycle detection',
  icon: 'linear-scale',
  lessons: [
    {
      id: 'dsa-list-basics',
      title: 'Nodes and lists',
      blocks: [
        { type: 'text', value: 'A linked list stores each value in a node that also points to the next node. There is no index math, but inserting after a known node is O(1) because nothing shifts.' },
        { type: 'code', lang: 'js', tryIt: true, value: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = node;
    }
    this.size++;
  }

  toArray() {
    const out = [];
    let current = this.head;
    while (current) {
      out.push(current.value);
      current = current.next;
    }
    return out;
  }
}

const list = new LinkedList();
[10, 20, 30].forEach((value) => list.add(value));
console.log(list.toArray(), list.size);` },
        { type: 'note', value: 'add is O(n) here because it walks to the end. Keeping a tail pointer makes appending O(1).' },
      ],
    },
    {
      id: 'dsa-list-reverse',
      title: 'Reversing a list',
      blocks: [
        { type: 'text', value: 'The classic pointer exercise. Walk the list once and flip each next pointer. Three variables are enough: previous, current and next.' },
        { type: 'code', lang: 'js', tryIt: true, value: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function reverse(head) {
  let previous = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }
  return previous;
}

const a = new Node(1);
a.next = new Node(2);
a.next.next = new Node(3);

let current = reverse(a);
const out = [];
while (current) {
  out.push(current.value);
  current = current.next;
}
console.log(out);` },
        { type: 'text', value: 'Time is O(n) and extra space is O(1). A recursive version is shorter but uses O(n) stack space.' },
      ],
    },
    {
      id: 'dsa-fast-slow',
      title: 'Fast and slow pointers',
      blocks: [
        { type: 'text', value: 'Two pointers at different speeds detect cycles and find the middle. If a fast pointer moves two steps and a slow one moves one, they meet inside a cycle.' },
        { type: 'code', lang: 'js', tryIt: true, value: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

const a = new Node(1);
const b = new Node(2);
const c = new Node(3);
a.next = b;
b.next = c;
c.next = b;

console.log(hasCycle(a));
console.log(hasCycle(new Node(1)));` },
        { type: 'note', value: 'Floyd\'s algorithm runs in O(n) time and O(1) space. A Set of visited nodes also works but uses O(n) memory.' },
      ],
    },
    {
      id: 'dsa-list-vs-array',
      title: 'List versus array',
      blocks: [
        { type: 'list', items: [
          'Array: O(1) index access, O(n) insert/delete in the middle',
          'Linked list: O(n) index access, O(1) insert/delete after a known node',
          'Array: better cache locality, fewer allocations',
          'Linked list: no resizing, natural for queues and adjacency lists',
        ] },
        { type: 'text', value: 'In JavaScript and most modern languages, arrays win for most tasks because the engine is heavily optimised. Use a linked list when the problem is about pointer manipulation or when nodes are moved between lists.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'linked-lists',
      q: 'How do you reach the nth element of a linked list?',
      options: ['Use an index in O(1)', 'Walk from the head in O(n)', 'Binary search', 'Hash it'],
      answer: 1,
      explain: 'There is no index math, so you follow next pointers from the head.',
    },
    {
      chapterId: 'linked-lists',
      q: 'What does reversing a linked list change?',
      options: ['The values', 'The next pointers', 'The head only', 'The length'],
      answer: 1,
      explain: 'Each next pointer is redirected to the previous node.',
    },
    {
      chapterId: 'linked-lists',
      q: 'What do fast and slow pointers detect?',
      options: ['Sorted order', 'A cycle', 'The maximum value', 'Duplicates'],
      answer: 1,
      explain: 'They meet inside a cycle because the fast pointer closes the distance by one each step.',
    },
    {
      chapterId: 'linked-lists',
      q: 'What is the extra space for reversing a list iteratively?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
      answer: 0,
      explain: 'Only a few pointer variables are needed.',
    },
  ],
};
