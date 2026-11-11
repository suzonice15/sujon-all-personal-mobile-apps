// DSA chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What DSA is, how to measure code and how to approach a problem',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'dsa-what-is',
      title: 'What is DSA?',
      blocks: [
        { type: 'text', value: 'A data structure is a way to organise data so that common operations are fast. An algorithm is a step-by-step method for solving a problem. Together they decide whether a program finishes in milliseconds or minutes.' },
        { type: 'list', items: [
          'Arrays and hash maps answer lookups quickly',
          'Stacks and queues manage order',
          'Trees and graphs model relationships',
          'Sorting and searching are the tools you reuse everywhere',
        ] },
        { type: 'text', value: 'Interviewers use DSA because it shows how you reason about trade-offs: time versus memory, simple versus optimal, and correctness under edge cases.' },
        { type: 'note', value: 'You do not need to memorise code. You need to recognise the pattern, estimate the cost, and explain why your solution is correct.' },
      ],
    },
    {
      id: 'dsa-big-o',
      title: 'Big O notation',
      blocks: [
        { type: 'text', value: 'Big O describes how the work grows as the input grows. It ignores constants and small terms, because they matter less on large inputs.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function sumLoop(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

function sumFormula(n) {
  return (n * (n + 1)) / 2;
}

console.log(sumLoop(100));
console.log(sumFormula(100));` },
        { type: 'list', items: [
          'O(1) - constant: one step, regardless of size',
          'O(log n) - binary search halves the problem',
          'O(n) - one pass over the data',
          'O(n log n) - good sorting',
          'O(n^2) - nested loops over the same data',
          'O(2^n) - trying every subset',
        ] },
        { type: 'note', value: 'sumLoop is O(n). sumFormula is O(1). Same answer, very different cost. That is the kind of improvement DSA teaches.' },
      ],
    },
    {
      id: 'dsa-space-complexity',
      title: 'Space complexity',
      blocks: [
        { type: 'text', value: 'Space complexity measures extra memory used beyond the input. An algorithm that builds a new array is O(n) space; one that swaps in place is O(1).' },
        { type: 'code', lang: 'js', tryIt: true, value: `function doubleAll(values) {
  const result = [];
  for (const value of values) {
    result.push(value * 2);
  }
  return result;
}

function doubleInPlace(values) {
  for (let i = 0; i < values.length; i++) {
    values[i] *= 2;
  }
  return values;
}

console.log(doubleAll([1, 2, 3]));
console.log(doubleInPlace([1, 2, 3]));` },
        { type: 'text', value: 'The first version is easier to reason about and does not mutate the input. The second saves memory. Real code often chooses readability first and optimises only when measured.' },
        { type: 'note', value: 'Recursion also uses space: every call sits on the call stack. A recursion depth of n costs O(n) stack space and can overflow on large inputs.' },
      ],
    },
    {
      id: 'dsa-approach',
      title: 'How to approach a problem',
      blocks: [
        { type: 'list', items: [
          'Restate the problem in your own words and ask about edge cases',
          'Work through a small example by hand',
          'Start with the brute force solution and state its complexity',
          'Look for repeated work you can remove with a data structure',
          'Write the code, then test empty, single and large inputs',
          'Explain the final time and space cost',
        ] },
        { type: 'text', value: 'A clear brute force answer is better than a silent struggle for the optimal one. Interviewers score communication and correctness, not just the final trick.' },
        { type: 'note', value: 'When stuck, ask: have I seen this shape before? Sorted input suggests two pointers or binary search. Counting suggests a hash map. Best or top K suggests a heap.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does Big O describe?',
      options: ['Exact runtime in seconds', 'How work grows with input size', 'Memory size only', 'The number of lines of code'],
      answer: 1,
      explain: 'Big O describes growth, ignoring constants and hardware.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which is faster for large n?',
      options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(2^n)'],
      answer: 2,
      explain: 'Logarithmic growth is much slower than linear, quadratic or exponential growth.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is the space complexity of an in-place swap?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
      answer: 0,
      explain: 'It uses a constant number of extra variables.',
    },
    {
      chapterId: 'getting-started',
      q: 'What should you do first when solving a new problem?',
      options: ['Write the optimal code immediately', 'Restate it and try a small example', 'Memorise the answer', 'Open a library'],
      answer: 1,
      explain: 'Understanding the problem and a small example prevents most wrong solutions.',
    },
  ],
};
