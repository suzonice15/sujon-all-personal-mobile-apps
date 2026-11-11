// DSA chapter: Dynamic Programming.

export default {
  id: 'dynamic-programming',
  title: 'Dynamic Programming',
  description: 'Turn repeated subproblems into a table',
  icon: 'grid-on',
  lessons: [
    {
      id: 'dsa-dp-idea',
      title: 'The DP idea',
      blocks: [
        { type: 'text', value: 'Dynamic programming solves a problem by combining answers to smaller subproblems. It works when a problem has overlapping subproblems and an optimal substructure.' },
        { type: 'list', items: [
          'Define the state: what does dp[i] mean?',
          'Write the transition: how does dp[i] use earlier states?',
          'Set the base cases',
          'Choose the order: memoized recursion or a bottom-up loop',
        ] },
        { type: 'code', lang: 'js', tryIt: true, value: `function fib(n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

console.log(fib(10));
console.log(fib(50));` },
        { type: 'note', value: 'If the transition only needs the last two values, you can replace the array with two variables and reduce space from O(n) to O(1).' },
      ],
    },
    {
      id: 'dsa-climbing-stairs',
      title: 'Climbing stairs',
      blocks: [
        { type: 'text', value: 'You can climb one or two steps at a time. How many ways to reach step n? The last move came from n-1 or n-2, so ways(n) = ways(n-1) + ways(n-2).' },
        { type: 'code', lang: 'js', tryIt: true, value: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev = 1;
  let current = 2;

  for (let i = 3; i <= n; i++) {
    const next = prev + current;
    prev = current;
    current = next;
  }
  return current;
}

console.log(climbStairs(5));
console.log(climbStairs(10));` },
        { type: 'text', value: 'This is Fibonacci in disguise. Recognising that the state is just "ways to reach i" makes the code short and O(n) time with O(1) space.' },
      ],
    },
    {
      id: 'dsa-coin-change',
      title: 'Coin change',
      blocks: [
        { type: 'text', value: 'Find the fewest coins that add up to an amount. dp[amount] is the minimum coins for that amount, and the transition tries every coin. This is unbounded knapsack.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let value = 1; value <= amount; value++) {
    for (const coin of coins) {
      if (coin <= value) {
        dp[value] = Math.min(dp[value], dp[value - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChange([1, 2, 5], 11));
console.log(coinChange([2], 3));` },
        { type: 'text', value: 'Time is O(amount * coins) and space is O(amount). The Infinity default marks amounts that cannot be formed.' },
        { type: 'note', value: 'A greedy solution (always take the largest coin) fails for some coin systems. DP tries every combination and is guaranteed correct.' },
      ],
    },
    {
      id: 'dsa-knapsack',
      title: '0/1 knapsack',
      blocks: [
        { type: 'text', value: 'Each item has a weight and a value. You may take each item at most once and the bag holds a maximum weight. Maximise the total value.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function knapsack(items, capacity) {
  const dp = new Array(capacity + 1).fill(0);

  for (const item of items) {
    for (let w = capacity; w >= item.weight; w--) {
      dp[w] = Math.max(dp[w], dp[w - item.weight] + item.value);
    }
  }
  return dp[capacity];
}

const items = [
  { weight: 1, value: 6 },
  { weight: 2, value: 10 },
  { weight: 3, value: 12 },
];

console.log(knapsack(items, 5));` },
        { type: 'text', value: 'The loop runs backwards so each item is used at most once. For unbounded knapsack, run it forwards and items can be reused. That one direction change is the whole difference.' },
        { type: 'note', value: 'If you cannot explain what dp[i] means in one sentence, stop and redefine the state. Most DP bugs are state bugs, not loop bugs.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'dynamic-programming',
      q: 'What two properties make a problem suitable for DP?',
      options: [
        'Overlapping subproblems and optimal substructure',
        'Sorting and searching',
        'Recursion and loops',
        'Hashing and caching',
      ],
      answer: 0,
      explain: 'DP reuses subproblem answers and builds an optimal solution from optimal parts.',
    },
    {
      chapterId: 'dynamic-programming',
      q: 'What does dp[i] usually represent?',
      options: ['The input at index i', 'The answer for the subproblem of size i', 'The number of loops', 'The array length'],
      answer: 1,
      explain: 'The state definition is the most important part of a DP solution.',
    },
    {
      chapterId: 'dynamic-programming',
      q: 'Why does 0/1 knapsack loop backwards over capacity?',
      options: [
        'To sort the items',
        'So each item is used at most once',
        'To save memory',
        'To avoid recursion',
      ],
      answer: 1,
      explain: 'Forward iteration would reuse the same item multiple times.',
    },
    {
      chapterId: 'dynamic-programming',
      q: 'What is the space complexity of the iterative Fibonacci with two variables?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
      answer: 0,
      explain: 'Only the previous two values are kept.',
    },
    {
      chapterId: 'dynamic-programming',
      q: 'What does Infinity in coin change mark?',
      options: ['A valid amount', 'An amount that cannot be formed', 'The largest coin', 'The number of coins'],
      answer: 1,
      explain: 'It starts as unreachable and is replaced when a combination is found.',
    },
  ],
};
