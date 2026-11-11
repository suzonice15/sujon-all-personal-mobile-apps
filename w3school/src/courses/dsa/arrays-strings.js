// DSA chapter: Arrays and Strings.

export default {
  id: 'arrays-strings',
  title: 'Arrays & Strings',
  description: 'Two pointers, prefix sums and common string tricks',
  icon: 'view-column',
  lessons: [
    {
      id: 'dsa-two-pointers',
      title: 'Two pointers',
      blocks: [
        { type: 'text', value: 'Two pointers walk through an array from both ends or at different speeds. They turn many nested-loop problems into a single pass.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function reverseInPlace(values) {
  let left = 0;
  let right = values.length - 1;

  while (left < right) {
    [values[left], values[right]] = [values[right], values[left]];
    left++;
    right--;
  }
  return values;
}

console.log(reverseInPlace([1, 2, 3, 4, 5]));` },
        { type: 'text', value: 'Each element is touched once, so the time is O(n) and the extra space is O(1). A second array would also be O(n) time but O(n) space.' },
        { type: 'note', value: 'Two pointers usually need sorted input or a symmetric property. If the input is not sorted, sort it first (O(n log n)) only when the problem allows reordering.' },
      ],
    },
    {
      id: 'dsa-prefix-sums',
      title: 'Prefix sums',
      blocks: [
        { type: 'text', value: 'A prefix sum array stores the running total. It answers "sum from index i to j" in O(1) after O(n) preprocessing, instead of adding the range every time.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function prefixSums(values) {
  const out = [];
  let sum = 0;
  for (const value of values) {
    sum += value;
    out.push(sum);
  }
  return out;
}

const values = [2, 4, 6, 8];
const prefix = prefixSums(values);
console.log(prefix);

// Sum from index 1 to 3: prefix[3] - prefix[0]
console.log(prefix[3] - prefix[0]);` },
        { type: 'text', value: 'The same idea works with counts and frequencies, for example "how many students scored above 80 in this range".' },
        { type: 'note', value: 'For range sums, subtract prefix[j] - prefix[i - 1]. Watch the index when i is 0; use a leading zero in the prefix array to avoid the special case.' },
      ],
    },
    {
      id: 'dsa-strings',
      title: 'Strings',
      blocks: [
        { type: 'text', value: 'A string is a sequence of characters. In JavaScript strings are immutable, so building a result with += in a loop can be O(n^2). Collect parts in an array and join once.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function isPalindrome(text) {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = [...clean].reverse().join('');
  return clean === reversed;
}

console.log(isPalindrome('A man, a plan, a canal: Panama'));
console.log(isPalindrome('hello'));` },
        { type: 'text', value: 'This solution is O(n) time and O(n) space. A two-pointer version compares characters from both ends and uses O(1) extra space.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function isPalindromeTwoPointers(text) {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log(isPalindromeTwoPointers('Racecar'));` },
      ],
    },
    {
      id: 'dsa-array-costs',
      title: 'Array costs',
      blocks: [
        { type: 'list', items: [
          'Read or write by index - O(1)',
          'Search unsorted - O(n)',
          'Search sorted - O(log n) with binary search',
          'Push at the end - usually O(1), occasionally O(n) when the array grows',
          'Insert or delete in the middle - O(n) because elements shift',
        ] },
        { type: 'text', value: 'Choosing an array is about access patterns. Need fast index access? Array. Need fast insert and delete in the middle? Linked list or a tree.' },
        { type: 'note', value: 'A JavaScript array is a dynamic array. The language hides the resizing, but the cost is still there. Do not remove from the front in a large loop; that is O(n) per removal.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'arrays-strings',
      q: 'What is the time complexity of reversing an array in place?',
      options: ['O(1)', 'O(n)', 'O(n^2)', 'O(log n)'],
      answer: 1,
      explain: 'Each element is swapped once, so the work grows linearly.',
    },
    {
      chapterId: 'arrays-strings',
      q: 'What does a prefix sum array help with?',
      options: ['Sorting', 'Range sum queries in O(1)', 'Removing duplicates', 'Reversing'],
      answer: 1,
      explain: 'After O(n) preprocessing, any range sum is a subtraction of two prefix values.',
    },
    {
      chapterId: 'arrays-strings',
      q: 'Why build strings with an array and join?',
      options: [
        'Strings are immutable, so repeated += can be O(n^2)',
        'join is the only way to print',
        'Arrays are always faster',
        'It saves memory',
      ],
      answer: 0,
      explain: 'Each += may create a new string; collecting parts and joining once is linear.',
    },
    {
      chapterId: 'arrays-strings',
      q: 'Which operation is O(n) on an array?',
      options: ['Reading index 5', 'Pushing at the end', 'Inserting at the front', 'Reading length'],
      answer: 2,
      explain: 'Inserting at the front shifts every existing element.',
    },
  ],
};
