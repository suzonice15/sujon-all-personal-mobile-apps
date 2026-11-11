// DSA chapter: Stacks and Queues.

export default {
  id: 'stacks-queues',
  title: 'Stacks & Queues',
  description: 'LIFO, FIFO and the problems they solve',
  icon: 'layers',
  lessons: [
    {
      id: 'dsa-stack',
      title: 'Stacks',
      blocks: [
        { type: 'text', value: 'A stack is last in, first out. Undo history, browser back, and function calls all behave like a stack. Push and pop are O(1).' },
        { type: 'code', lang: 'js', tryIt: true, value: `class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  get size() {
    return this.items.length;
  }
}

const stack = new Stack();
stack.push('a');
stack.push('b');
console.log(stack.peek(), stack.size);
console.log(stack.pop(), stack.size);` },
        { type: 'note', value: 'A stack is just an array with a restricted API. The restriction is the point: it prevents random access and makes the order obvious.' },
      ],
    },
    {
      id: 'dsa-valid-parentheses',
      title: 'Valid parentheses',
      blocks: [
        { type: 'text', value: 'Push every opening bracket. On a closing bracket, pop and check that it matches. The string is valid only if every closing bracket had a partner and the stack is empty at the end.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function isValid(text) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];

  for (const char of text) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else if (pairs[char]) {
      if (stack.pop() !== pairs[char]) return false;
    }
  }
  return stack.length === 0;
}

console.log(isValid('()[]{}'));
console.log(isValid('(]'));
console.log(isValid('([{}])'));` },
        { type: 'text', value: 'Time is O(n) and space is O(n) in the worst case, for example "(((((". This is one of the most common interview questions, so practise explaining the invariant.' },
      ],
    },
    {
      id: 'dsa-queue',
      title: 'Queues',
      blocks: [
        { type: 'text', value: 'A queue is first in, first out. Print jobs, message queues and BFS all use a queue. Do not implement it with shift() on a large array, because shift is O(n).' },
        { type: 'code', lang: 'js', tryIt: true, value: `class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    if (this.head >= this.items.length) return undefined;
    const value = this.items[this.head];
    this.head++;
    return value;
  }

  get size() {
    return this.items.length - this.head;
  }
}

const queue = new Queue();
queue.enqueue('a');
queue.enqueue('b');
console.log(queue.dequeue(), queue.size);` },
        { type: 'note', value: 'The head index makes dequeue O(1), but the consumed part of the array is not freed. For long-running queues, use a ring buffer or reset the array when head grows large.' },
      ],
    },
    {
      id: 'dsa-monotonic-stack',
      title: 'Monotonic stack',
      blocks: [
        { type: 'text', value: 'A monotonic stack keeps its values sorted. It answers "next greater element" style questions in O(n) instead of O(n^2).' },
        { type: 'code', lang: 'js', tryIt: true, value: `function nextGreater(values) {
  const result = new Array(values.length).fill(-1);
  const stack = [];

  for (let i = 0; i < values.length; i++) {
    while (stack.length && values[stack[stack.length - 1]] < values[i]) {
      const index = stack.pop();
      result[index] = values[i];
    }
    stack.push(i);
  }
  return result;
}

console.log(nextGreater([2, 1, 2, 4, 3]));` },
        { type: 'text', value: 'Each index enters and leaves the stack once, so the total work is O(n). The same pattern solves daily temperatures, stock span and largest rectangle in a histogram.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'stacks-queues',
      q: 'What order does a stack use?',
      options: ['FIFO', 'LIFO', 'Random', 'Sorted'],
      answer: 1,
      explain: 'Last in, first out: the most recent push is the first pop.',
    },
    {
      chapterId: 'stacks-queues',
      q: 'Which structure does breadth-first search use?',
      options: ['Stack', 'Queue', 'Heap', 'Tree'],
      answer: 1,
      explain: 'BFS explores level by level, so it uses a queue.',
    },
    {
      chapterId: 'stacks-queues',
      q: 'Why is shift() a poor dequeue on a large array?',
      options: ['It is O(n) because elements shift', 'It returns undefined', 'It reverses the array', 'It is not allowed'],
      answer: 0,
      explain: 'Removing the first element shifts every other element. Use a head index or a deque.',
    },
    {
      chapterId: 'stacks-queues',
      q: 'What is a monotonic stack used for?',
      options: ['Next greater element in O(n)', 'Sorting in O(1)', 'Hashing', 'Storing strings'],
      answer: 0,
      explain: 'It keeps a sorted stack of indices to answer next-greater style questions in linear time.',
    },
  ],
};
