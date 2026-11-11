// DSA chapter: Heaps.

export default {
  id: 'heaps',
  title: 'Heaps & Priority Queues',
  description: 'Always get the smallest or largest item fast',
  icon: 'vertical-align-top',
  lessons: [
    {
      id: 'dsa-heap-property',
      title: 'The heap property',
      blocks: [
        { type: 'text', value: 'A binary heap is a complete tree stored in an array. In a min-heap every parent is smaller than its children, so the smallest value is always at index 0. Push and pop are O(log n), peek is O(1).' },
        { type: 'list', items: [
          'Parent of i - Math.floor((i - 1) / 2)',
          'Left child - 2 * i + 1',
          'Right child - 2 * i + 2',
          'The tree is complete, so the array has no gaps',
        ] },
        { type: 'code', lang: 'js', tryIt: true, value: `// A min-heap stored in an array
const heap = [1, 3, 2, 7, 4, 5];
console.log('root', heap[0]);
console.log('children of index 1:', heap[3], heap[4]);` },
        { type: 'note', value: 'A heap is not sorted. Only the parent-child order is guaranteed. Do not expect the array to be in ascending order.' },
      ],
    },
    {
      id: 'dsa-heap-implementation',
      title: 'Implementing a min-heap',
      blocks: [
        { type: 'text', value: 'Push appends at the end and bubbles up. Pop swaps the root with the last item, removes it, then bubbles down. Both restore the heap property in O(log n).' },
        { type: 'code', lang: 'js', tryIt: true, value: `class MinHeap {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
    let i = this.items.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.items[parent] <= this.items[i]) break;
      [this.items[parent], this.items[i]] = [this.items[i], this.items[parent]];
      i = parent;
    }
  }

  pop() {
    if (this.items.length === 0) return undefined;
    const top = this.items[0];
    const last = this.items.pop();
    if (this.items.length > 0) {
      this.items[0] = last;
      let i = 0;
      while (true) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let smallest = i;
        if (left < this.items.length && this.items[left] < this.items[smallest]) smallest = left;
        if (right < this.items.length && this.items[right] < this.items[smallest]) smallest = right;
        if (smallest === i) break;
        [this.items[i], this.items[smallest]] = [this.items[smallest], this.items[i]];
        i = smallest;
      }
    }
    return top;
  }

  peek() {
    return this.items[0];
  }
}

const heap = new MinHeap();
[5, 2, 8, 1, 9].forEach((value) => heap.push(value));
console.log(heap.peek());
console.log(heap.pop(), heap.pop(), heap.pop());` },
      ],
    },
    {
      id: 'dsa-top-k',
      title: 'Top K problems',
      blocks: [
        { type: 'text', value: 'To find the K largest values, keep a min-heap of size K. Push each value; when the heap grows past K, pop the smallest. The heap always holds the best K seen so far.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function topK(values, k) {
  const heap = [];

  function push(value) {
    heap.push(value);
    let i = heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (heap[parent] <= heap[i]) break;
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    }
  }

  function pop() {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length > 0) {
      heap[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        let smallest = i;
        if (l < heap.length && heap[l] < heap[smallest]) smallest = l;
        if (r < heap.length && heap[r] < heap[smallest]) smallest = r;
        if (smallest === i) break;
        [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
        i = smallest;
      }
    }
    return top;
  }

  for (const value of values) {
    push(value);
    if (heap.length > k) pop();
  }
  return heap.sort((a, b) => b - a);
}

console.log(topK([3, 1, 5, 12, 2, 11], 3));` },
        { type: 'text', value: 'This is O(n log k) time and O(k) space. A full sort would be O(n log n) and needs O(n) space, which is wasteful when k is small.' },
        { type: 'note', value: 'Use a max-heap of size K for the K smallest values. The direction flips, the pattern stays the same.' },
      ],
    },
    {
      id: 'dsa-heap-sort',
      title: 'Heap sort',
      blocks: [
        { type: 'text', value: 'Build a max-heap, then repeatedly swap the root with the last element and shrink the heap. Each extraction places the next largest value at the end. Time is O(n log n) and space is O(1).' },
        { type: 'code', lang: 'js', tryIt: true, value: `function heapSort(values) {
  const arr = [...values];

  function siftDown(start, end) {
    let root = start;
    while (2 * root + 1 <= end) {
      let child = 2 * root + 1;
      if (child + 1 <= end && arr[child] < arr[child + 1]) child++;
      if (arr[root] < arr[child]) {
        [arr[root], arr[child]] = [arr[child], arr[root]];
        root = child;
      } else return;
    }
  }

  for (let start = Math.floor((arr.length - 2) / 2); start >= 0; start--) {
    siftDown(start, arr.length - 1);
  }
  for (let end = arr.length - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    siftDown(0, end - 1);
  }
  return arr;
}

console.log(heapSort([4, 10, 3, 5, 1]));` },
        { type: 'note', value: 'Heap sort is not stable. When equal items must keep their order, use merge sort or a stable library sort.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'heaps',
      q: 'In a min-heap, where is the smallest value?',
      options: ['At the last index', 'At the root (index 0)', 'In the middle', 'Anywhere'],
      answer: 1,
      explain: 'The heap property puts the minimum at the root.',
    },
    {
      chapterId: 'heaps',
      q: 'What is the time complexity of push in a heap?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 1,
      explain: 'Bubbling up follows one path from a leaf to the root.',
    },
    {
      chapterId: 'heaps',
      q: 'Which heap finds the K largest values efficiently?',
      options: ['A max-heap of size n', 'A min-heap of size K', 'A sorted array', 'A stack'],
      answer: 1,
      explain: 'Keep the best K and pop the smallest when the heap grows past K.',
    },
    {
      chapterId: 'heaps',
      q: 'What is the extra space for heap sort?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
      answer: 0,
      explain: 'It sorts in place using swaps inside the same array.',
    },
    {
      chapterId: 'heaps',
      q: 'Is a heap sorted?',
      options: ['Yes, fully', 'No, only parent-child order is guaranteed', 'Only in a max-heap', 'Only after pop'],
      answer: 1,
      explain: 'A heap guarantees the root is extreme, not a full ordering.',
    },
  ],
};
