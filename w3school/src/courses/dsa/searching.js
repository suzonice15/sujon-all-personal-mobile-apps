// DSA chapter: Searching.

export default {
  id: 'searching',
  title: 'Searching',
  description: 'Linear search, binary search and search on the answer',
  icon: 'search',
  lessons: [
    {
      id: 'dsa-linear-search',
      title: 'Linear search',
      blocks: [
        { type: 'text', value: 'Check each element until you find the target. It works on any array, sorted or not, and takes O(n) time.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function linearSearch(values, target) {
  for (let i = 0; i < values.length; i++) {
    if (values[i] === target) return i;
  }
  return -1;
}

console.log(linearSearch([4, 8, 15, 16, 23, 42], 15));
console.log(linearSearch([4, 8, 15], 99));` },
        { type: 'text', value: 'Linear search is the right choice for small or unsorted data. Do not binary search an unsorted array; the precondition matters.' },
      ],
    },
    {
      id: 'dsa-binary-search',
      title: 'Binary search',
      blocks: [
        { type: 'text', value: 'Binary search requires a sorted array. Compare the middle element, then discard the half that cannot contain the target. Each step halves the remaining range, so the time is O(log n).' },
        { type: 'code', lang: 'js', tryIt: true, value: `function binarySearch(values, target) {
  let left = 0;
  let right = values.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    if (values[middle] === target) return middle;
    if (values[middle] < target) left = middle + 1;
    else right = middle - 1;
  }
  return -1;
}

const sorted = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(sorted, 7));
console.log(binarySearch(sorted, 2));` },
        { type: 'note', value: 'Use left <= right and middle +- 1. Forgetting the +-1 creates an infinite loop. Test with an empty array, one element, and a missing target.' },
      ],
    },
    {
      id: 'dsa-lower-bound',
      title: 'Lower bound',
      blocks: [
        { type: 'text', value: 'Instead of asking "is this value present?", many problems ask "where does it belong?" The lower bound returns the first index whose value is not less than the target.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function lowerBound(values, target) {
  let left = 0;
  let right = values.length;

  while (left < right) {
    const middle = Math.floor((left + right) / 2);
    if (values[middle] < target) left = middle + 1;
    else right = middle;
  }
  return left;
}

const sorted = [1, 3, 3, 3, 7, 9];
console.log(lowerBound(sorted, 3));
console.log(lowerBound(sorted, 5));
console.log(lowerBound(sorted, 10));` },
        { type: 'text', value: 'The result is the insertion point. With duplicates it points at the first copy, which is useful for range queries and counting.' },
      ],
    },
    {
      id: 'dsa-search-answer',
      title: 'Search on the answer',
      blocks: [
        { type: 'text', value: 'Sometimes you binary search a range of possible answers, not an array. If a predicate is false for small values and true for larger ones, you can find the boundary in O(log range).' },
        { type: 'code', lang: 'js', tryIt: true, value: `// Find the smallest x such that x * x >= target
function smallestSquareAtLeast(target) {
  let low = 0;
  let high = target;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (mid * mid >= target) high = mid;
    else low = mid + 1;
  }
  return low;
}

console.log(smallestSquareAtLeast(50));
console.log(smallestSquareAtLeast(1));` },
        { type: 'text', value: 'The same pattern solves "minimum capacity to ship packages in D days", "smallest divisor" and "minimum speed to finish on time". The hard part is proving the predicate is monotonic.' },
        { type: 'note', value: 'Binary search on the answer is powerful but easy to get wrong. Write the predicate separately, test it on small values, then binary search the boundary.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'searching',
      q: 'What must be true before binary search can run?',
      options: ['The array is sorted', 'The array has unique values', 'The array is small', 'The array contains numbers'],
      answer: 0,
      explain: 'Discarding half only works when the order tells you which half cannot contain the target.',
    },
    {
      chapterId: 'searching',
      q: 'What is the time complexity of binary search?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 1,
      explain: 'Each comparison halves the remaining range.',
    },
    {
      chapterId: 'searching',
      q: 'What does lower bound return?',
      options: ['The last matching index', 'The first index not less than the target', 'The array length always', 'The target value'],
      answer: 1,
      explain: 'It is the insertion point, so with duplicates it points at the first copy.',
    },
    {
      chapterId: 'searching',
      q: 'When can you binary search on the answer?',
      options: [
        'When the predicate is monotonic',
        'When the input is unsorted',
        'When the answer is a string',
        'Always',
      ],
      answer: 0,
      explain: 'You need a false-then-true boundary so discarding half is safe.',
    },
    {
      chapterId: 'searching',
      q: 'What is a common binary search bug?',
      options: ['Using left <= right', 'Forgetting middle +- 1 causing an infinite loop', 'Using Math.floor', 'Returning -1'],
      answer: 1,
      explain: 'If the bounds do not move past the middle, the loop never shrinks.',
    },
  ],
};
