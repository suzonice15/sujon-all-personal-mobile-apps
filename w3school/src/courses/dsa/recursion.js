// DSA chapter: Recursion.

export default {
  id: 'recursion',
  title: 'Recursion',
  description: 'Base cases, the call stack and memoization',
  icon: 'restart-alt',
  lessons: [
    {
      id: 'dsa-recursion-basics',
      title: 'Base case and recursive case',
      blocks: [
        { type: 'text', value: 'A recursive function calls itself with a smaller input. Every recursion needs a base case that stops the calls, and a recursive case that moves toward it.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function factorial(n) {
  if (n <= 1) return 1;       // base case
  return n * factorial(n - 1); // recursive case
}

console.log(factorial(5));
console.log(factorial(1));` },
        { type: 'text', value: 'The call stack holds one frame per pending call. A depth of n uses O(n) stack space, which is why very deep recursion can overflow.' },
        { type: 'note', value: 'Always ask two questions: what is the smallest input, and does each call get closer to it? A missing or wrong base case is the most common recursion bug.' },
      ],
    },
    {
      id: 'dsa-fibonacci',
      title: 'Fibonacci and repeated work',
      blocks: [
        { type: 'text', value: 'The naive Fibonacci recursion repeats the same subproblems many times, giving O(2^n) time. Memoization stores each result so it is calculated once.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function fibSlow(n) {
  if (n <= 1) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}

function fibMemo(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  const value = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, value);
  return value;
}

console.log(fibSlow(20));
console.log(fibMemo(50));` },
        { type: 'text', value: 'Memoized Fibonacci is O(n) time and O(n) space. The iterative version uses O(1) space by keeping only the last two values.' },
        { type: 'note', value: 'Memoization only helps when the same subproblem appears more than once. If every call is unique, it just adds memory overhead.' },
      ],
    },
    {
      id: 'dsa-call-stack',
      title: 'The call stack',
      blocks: [
        { type: 'text', value: 'When a function calls another, the caller pauses and the callee runs. The stack unwinds in reverse order. This is why recursion can replace an explicit stack.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function countdown(n) {
  if (n === 0) {
    console.log('done');
    return;
  }
  console.log(n);
  countdown(n - 1);
  console.log('back', n);
}

countdown(3);` },
        { type: 'text', value: 'The output shows the going-down phase and the coming-back phase. Many tree and backtracking algorithms depend on doing work in one of those phases.' },
        { type: 'note', value: 'For very deep recursion, convert to an explicit loop with your own stack. That avoids the engine call-stack limit and gives you control over memory.' },
      ],
    },
    {
      id: 'dsa-backtracking',
      title: 'Backtracking',
      blocks: [
        { type: 'text', value: 'Backtracking explores choices, undoes a choice, and tries the next one. Subsets, permutations, combinations and puzzles all use the same shape.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function subsets(values) {
  const result = [];

  function walk(index, current) {
    if (index === values.length) {
      result.push([...current]);
      return;
    }
    walk(index + 1, current);          // skip
    current.push(values[index]);
    walk(index + 1, current);          // take
    current.pop();                     // undo
  }

  walk(0, []);
  return result;
}

console.log(subsets([1, 2, 3]));` },
        { type: 'text', value: 'There are 2^n subsets, so the time is O(2^n). Backtracking is not a shortcut; it is a clean way to enumerate an exponential search space.' },
        { type: 'note', value: 'The undo step is the heart of backtracking. If you forget to pop, later branches see the wrong state.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'recursion',
      q: 'What stops a recursive function?',
      options: ['The base case', 'The recursive case', 'The return keyword only', 'The compiler'],
      answer: 0,
      explain: 'The base case is the smallest input that returns without calling itself again.',
    },
    {
      chapterId: 'recursion',
      q: 'Why is naive Fibonacci O(2^n)?',
      options: ['It uses a loop', 'It recalculates the same subproblems', 'It stores every value', 'It sorts the input'],
      answer: 1,
      explain: 'The recursion tree repeats branches, so work grows exponentially.',
    },
    {
      chapterId: 'recursion',
      q: 'What does memoization store?',
      options: ['The input only', 'Results of subproblems', 'The call stack', 'The final answer only'],
      answer: 1,
      explain: 'Caching subproblem results avoids recalculating them.',
    },
    {
      chapterId: 'recursion',
      q: 'What is the key step in backtracking?',
      options: ['Sorting', 'Undoing the last choice', 'Using a hash map', 'Binary search'],
      answer: 1,
      explain: 'You restore the previous state before trying the next branch.',
    },
    {
      chapterId: 'recursion',
      q: 'How much stack space does a recursion of depth n use?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      answer: 2,
      explain: 'Each pending call keeps a frame, so the stack grows linearly with depth.',
    },
  ],
};
