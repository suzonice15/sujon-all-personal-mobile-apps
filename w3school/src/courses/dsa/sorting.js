// DSA chapter: Sorting.

export default {
  id: 'sorting',
  title: 'Sorting',
  description: 'From bubble sort to merge sort and quick sort',
  icon: 'sort',
  lessons: [
    {
      id: 'dsa-quadratic-sorts',
      title: 'Simple sorts',
      blocks: [
        { type: 'text', value: 'Bubble, selection and insertion sort are easy to write and O(n^2) in the average case. They are useful for teaching and for very small arrays, not for large data.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function bubbleSort(values) {
  const arr = [...values];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(bubbleSort([5, 2, 9, 1, 5, 6]));` },
        { type: 'text', value: 'Insertion sort is actually O(n) on nearly sorted data, which is why real sorting libraries use it for small subarrays.' },
        { type: 'note', value: 'Never write your own sort in production unless you have a measured reason. JavaScript\'s Array.sort is highly optimised and stable.' },
      ],
    },
    {
      id: 'dsa-merge-sort',
      title: 'Merge sort',
      blocks: [
        { type: 'text', value: 'Merge sort splits the array in half, sorts each half, then merges the two sorted halves. It is O(n log n) time and O(n) space, and it is stable.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function mergeSort(values) {
  if (values.length <= 1) return values;

  const middle = Math.floor(values.length / 2);
  const left = mergeSort(values.slice(0, middle));
  const right = mergeSort(values.slice(middle));
  return merge(left, right);
}

function merge(left, right) {
  const out = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]);
    else out.push(right[j++]);
  }
  while (i < left.length) out.push(left[i++]);
  while (j < right.length) out.push(right[j++]);
  return out;
}

console.log(mergeSort([8, 3, 5, 1, 9, 2]));` },
        { type: 'text', value: 'The <= comparison keeps equal elements in their original order, so merge sort is stable. That matters when sorting objects by one field and keeping a previous order.' },
      ],
    },
    {
      id: 'dsa-quick-sort',
      title: 'Quick sort',
      blocks: [
        { type: 'text', value: 'Quick sort picks a pivot, partitions smaller and larger values, then sorts each side. Average time is O(n log n) and extra space is O(log n) for the recursion.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function quickSort(values) {
  if (values.length <= 1) return values;

  const pivot = values[values.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < values.length - 1; i++) {
    if (values[i] <= pivot) left.push(values[i]);
    else right.push(values[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([7, 2, 9, 4, 3, 8]));` },
        { type: 'text', value: 'This version allocates new arrays and is not in place. It is easy to read. The in-place partition version is faster but more error-prone.' },
        { type: 'note', value: 'Already sorted input with the last element as pivot is the worst case, O(n^2). Random or median pivots avoid that trap.' },
      ],
    },
    {
      id: 'dsa-choosing-sort',
      title: 'Choosing a sort',
      blocks: [
        { type: 'list', items: [
          'Small array - insertion sort is fine',
          'Need stability - merge sort or a stable library sort',
          'Average speed, in place - quick sort',
          'Guaranteed O(n log n) - merge sort or heap sort',
          'Nearly sorted data - insertion sort or a library sort',
        ] },
        { type: 'text', value: 'In practice, use the built-in sort. Understand the algorithms so you can reason about complexity, stability and the trade-offs when the built-in is not enough.' },
        { type: 'note', value: 'JavaScript Array.sort converts elements to strings by default. Always pass a comparator for numbers: values.sort((a, b) => a - b).' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'sorting',
      q: 'What is the average time of bubble sort?',
      options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
      answer: 2,
      explain: 'The nested loops compare and swap pairs, giving quadratic work.',
    },
    {
      chapterId: 'sorting',
      q: 'Which sort is stable and O(n log n)?',
      options: ['Quick sort', 'Merge sort', 'Selection sort', 'Bubble sort'],
      answer: 1,
      explain: 'Merge sort preserves the order of equal elements and runs in O(n log n).',
    },
    {
      chapterId: 'sorting',
      q: 'What causes quick sort worst-case O(n^2)?',
      options: ['Random pivots', 'A bad pivot choice on sorted input', 'Using recursion', 'Small arrays'],
      answer: 1,
      explain: 'Always picking the smallest or largest value as pivot splits off one element at a time.',
    },
    {
      chapterId: 'sorting',
      q: 'Why does Array.sort need a comparator for numbers?',
      options: [
        'It sorts strings by default',
        'It only sorts arrays of strings',
        'It reverses the array',
        'It throws an error',
      ],
      answer: 0,
      explain: 'Default comparison converts values to strings, so 10 can come before 2.',
    },
  ],
};
