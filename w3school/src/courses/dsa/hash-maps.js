// DSA chapter: Hash Maps and Sets.

export default {
  id: 'hash-maps',
  title: 'Hash Maps & Sets',
  description: 'Trade memory for speed and turn O(n^2) into O(n)',
  icon: 'tag',
  lessons: [
    {
      id: 'dsa-map-set',
      title: 'Map and Set',
      blocks: [
        { type: 'text', value: 'A hash map stores key-value pairs with average O(1) lookup, insert and delete. A Set stores unique values. They are the first tool to reach for when you need to remember something you have seen.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const ages = new Map();
ages.set('Ayesha', 21);
ages.set('Rahim', 22);

console.log(ages.get('Ayesha'));
console.log(ages.has('Nusrat'));
console.log(ages.size);

const seen = new Set([1, 2, 2, 3, 3]);
console.log([...seen]);` },
        { type: 'note', value: 'Hash maps are average O(1). A bad hash or too many collisions can degrade to O(n). In JavaScript, object keys are strings, so use Map when keys are numbers or objects.' },
      ],
    },
    {
      id: 'dsa-frequency',
      title: 'Frequency counting',
      blocks: [
        { type: 'text', value: 'Count how often each value appears. This solves anagrams, duplicates, majority element and many string questions with one pass.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function frequency(values) {
  const counts = new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return counts;
}

console.log(frequency(['a', 'b', 'a', 'c', 'b', 'a']));` },
        { type: 'text', value: 'Time is O(n) and space is O(k), where k is the number of distinct values. That is usually much smaller than n.' },
        { type: 'note', value: 'If the values are small integers, an array of counts is faster than a Map and uses less memory. Choose the structure that fits the data range.' },
      ],
    },
    {
      id: 'dsa-two-sum',
      title: 'Two sum',
      blocks: [
        { type: 'text', value: 'Find two numbers that add to a target. The brute force checks every pair in O(n^2). A hash map stores each number as you go, so you only need to look up target - current.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function twoSum(values, target) {
  const seen = new Map();

  for (let i = 0; i < values.length; i++) {
    const need = target - values[i];
    if (seen.has(need)) {
      return [seen.get(need), i];
    }
    seen.set(values[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 3], 6));` },
        { type: 'text', value: 'One pass, O(n) time and O(n) space. If the array is sorted, two pointers solve it in O(n) time and O(1) space.' },
      ],
    },
    {
      id: 'dsa-grouping',
      title: 'Grouping with keys',
      blocks: [
        { type: 'text', value: 'Group items that share a property. Build a canonical key for each item, then append it to the list for that key. Grouping anagrams is the classic example.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function groupAnagrams(words) {
  const groups = new Map();

  for (const word of words) {
    const key = [...word].sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
}

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));` },
        { type: 'text', value: 'Sorting each word costs O(k log k), where k is the word length. With n words the total is O(n * k log k). A count array of 26 letters can make the key in O(k).' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'hash-maps',
      q: 'What is the average lookup time of a hash map?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      answer: 0,
      explain: 'Hashing jumps to the bucket directly, so lookup is constant on average.',
    },
    {
      chapterId: 'hash-maps',
      q: 'What does a Set store?',
      options: ['Key-value pairs', 'Unique values', 'Sorted values only', 'Numbers only'],
      answer: 1,
      explain: 'A Set keeps one copy of each value.',
    },
    {
      chapterId: 'hash-maps',
      q: 'How does the hash map improve two sum?',
      options: [
        'It sorts the array',
        'It stores seen values so the complement is O(1) to find',
        'It removes duplicates',
        'It uses recursion',
      ],
      answer: 1,
      explain: 'Checking target - current against the map replaces the inner loop.',
    },
    {
      chapterId: 'hash-maps',
      q: 'What is usually the space cost of frequency counting?',
      options: ['O(1)', 'O(k) distinct values', 'O(n^2)', 'O(log n)'],
      answer: 1,
      explain: 'You store one entry per distinct value, not per occurrence.',
    },
  ],
};
