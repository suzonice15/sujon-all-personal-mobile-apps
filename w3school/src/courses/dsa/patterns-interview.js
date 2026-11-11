// DSA chapter: Patterns and Interview Practice.

export default {
  id: 'patterns-interview',
  title: 'Patterns & Interview Prep',
  description: 'The handful of patterns behind most questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'dsa-two-pointer-pattern',
      title: 'Two pointers on sorted data',
      blocks: [
        { type: 'text', value: 'If the array is sorted and you need a pair with a target sum, move the left pointer up when the sum is too small and the right pointer down when it is too large. O(n) time and O(1) space.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function pairSum(values, target) {
  let left = 0;
  let right = values.length - 1;

  while (left < right) {
    const sum = values[left] + values[right];
    if (sum === target) return [values[left], values[right]];
    if (sum < target) left++;
    else right--;
  }
  return null;
}

console.log(pairSum([1, 2, 4, 7, 11, 15], 15));
console.log(pairSum([1, 2, 4], 100));` },
        { type: 'note', value: 'Do not sort inside the loop. Sort once, then two pointers. If the problem needs original indices, store them before sorting.' },
      ],
    },
    {
      id: 'dsa-sliding-window',
      title: 'Sliding window',
      blocks: [
        { type: 'text', value: 'A sliding window keeps a contiguous range and moves its ends instead of rebuilding the range. It turns many "subarray or substring" problems from O(n^2) into O(n).' },
        { type: 'code', lang: 'js', tryIt: true, value: `function maxSumWindow(values, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += values[i];

  let best = sum;
  for (let i = k; i < values.length; i++) {
    sum += values[i] - values[i - k];
    best = Math.max(best, sum);
  }
  return best;
}

console.log(maxSumWindow([2, 1, 5, 1, 3, 2], 3));` },
        { type: 'text', value: 'This is a fixed-size window. A variable-size window grows while the condition holds and shrinks when it breaks. Longest substring without repeats is the classic variable window.' },
      ],
    },
    {
      id: 'dsa-prefix-pattern',
      title: 'Prefix sum with a map',
      blocks: [
        { type: 'text', value: 'Count subarrays with a given sum. Keep a running sum; if sum - target was seen before, the elements between those positions form a valid subarray.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function subarraySum(values, target) {
  const seen = new Map([[0, 1]]);
  let sum = 0;
  let count = 0;

  for (const value of values) {
    sum += value;
    count += seen.get(sum - target) || 0;
    seen.set(sum, (seen.get(sum) || 0) + 1);
  }
  return count;
}

console.log(subarraySum([1, 1, 1], 2));
console.log(subarraySum([1, 2, 3, -3, 3], 3));` },
        { type: 'text', value: 'The map starts with {0: 1} so a subarray that starts at index 0 is counted. Forgetting that base case is the most common bug in this pattern.' },
      ],
    },
    {
      id: 'dsa-interview-checklist',
      title: 'Interview checklist',
      blocks: [
        { type: 'list', items: [
          'Clarify input size and constraints before choosing an approach',
          'State the brute force and its complexity first',
          'Name the pattern you are using and why it applies',
          'Write small helper functions instead of one huge block',
          'Test empty input, one element, duplicates and negatives',
          'Analyse time and space at the end',
        ] },
        { type: 'text', value: 'Most interview questions reuse one of these patterns: two pointers, sliding window, prefix sum, hash map, heap for top K, BFS/DFS on a graph, or DP when subproblems overlap.' },
        { type: 'note', value: 'You are allowed to look things up in real work. In an interview, the goal is to show that you can reason and communicate. Think out loud and test your own code.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'patterns-interview',
      q: 'When is two pointers on a sorted array useful?',
      options: ['Finding a pair with a target sum', 'Sorting the array', 'Building a heap', 'Detecting a cycle'],
      answer: 0,
      explain: 'Moving one pointer at a time narrows the sum in O(n).',
    },
    {
      chapterId: 'patterns-interview',
      q: 'What does a sliding window avoid?',
      options: ['Extra memory always', 'Recomputing every subarray from scratch', 'Sorting', 'Recursion'],
      answer: 1,
      explain: 'The window updates by adding and removing one element at each step.',
    },
    {
      chapterId: 'patterns-interview',
      q: 'Why start the prefix map with {0: 1}?',
      options: [
        'To count subarrays starting at index 0',
        'To avoid empty input',
        'To sort the keys',
        'To detect duplicates',
      ],
      answer: 0,
      explain: 'A running sum equal to the target forms a subarray from the start.',
    },
    {
      chapterId: 'patterns-interview',
      q: 'Which pattern fits "K largest elements"?',
      options: ['Two pointers', 'A heap of size K', 'Binary search', 'DFS'],
      answer: 1,
      explain: 'Keep the best K and remove the smallest, O(n log k).',
    },
    {
      chapterId: 'patterns-interview',
      q: 'What should you state before coding in an interview?',
      options: ['The brute force and its complexity', 'The final answer only', 'Nothing', 'The language version'],
      answer: 0,
      explain: 'A baseline solution shows reasoning and gives you something to improve.',
    },
  ],
};
