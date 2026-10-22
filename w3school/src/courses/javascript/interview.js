// JavaScript chapter: Interview Preparation. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'interview',
  title: 'Interview Preparation',
  description: 'The questions employers ask most, with answers',
  icon: 'work',
  lessons: [
    {
      id: 'js-interview-core',
      title: 'Top Core Questions',
      blocks: [
        { type: 'text', value: 'These questions come up in almost every JavaScript interview. Practise answering each one out loud in two or three sentences, with a small example.' },
        { type: 'heading', value: '1. var vs let vs const' },
        { type: 'text', value: 'var is function-scoped and hoisted with the value undefined. let and const are block-scoped and cannot be used before their declaration. const cannot be reassigned, but an object it holds can still change.' },
        { type: 'heading', value: '2. == vs ===' },
        { type: 'text', value: '== converts types before comparing (5 == "5" is true). === compares value and type without conversion. Always use ===.' },
        { type: 'heading', value: '3. What is a closure?' },
        { type: 'text', value: 'A function that remembers the variables of the scope where it was created, even after that scope has finished. Used for private state, factories and callbacks.' },
        { type: 'heading', value: '4. null vs undefined' },
        { type: 'text', value: 'undefined means a value was never assigned. null is an intentional "no value" set by the programmer.' },
        { type: 'heading', value: '5. Explain the event loop' },
        { type: 'text', value: 'JavaScript is single-threaded. Synchronous code runs on the call stack; when it is empty, all microtasks (promises) run, then the next task (timer, event). That is why promise callbacks run before setTimeout(fn, 0).' },
        { type: 'heading', value: '6. How does this work?' },
        { type: 'text', value: 'It depends on how the function is called: the object before the dot for methods, undefined for plain calls in strict mode, inherited from the surrounding scope for arrow functions, or set explicitly with call, apply or bind.' },
        { type: 'code', lang: 'js', tryIt: true, value: `// Classic trick question: what does this print?
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var:', i), 0);   // 3, 3, 3
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let:', j), 0);   // 0, 1, 2
}
// var has one shared i; let creates a new j for each loop iteration.` },
      ],
    },
    {
      id: 'js-interview-coding',
      title: 'Common Coding Challenges',
      blocks: [
        { type: 'text', value: 'Interviewers often ask you to write small functions live. Explain your thinking as you code, start simple, then improve.' },
        { type: 'code', lang: 'js', tryIt: true, value: `// 1. Reverse a string
const reverse = s => [...s].reverse().join('');
console.log(reverse('CodeNest'));

// 2. Is it a palindrome? (ignore case and spaces)
const isPalindrome = s => {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === [...clean].reverse().join('');
};
console.log(isPalindrome('Never odd or even')); // true

// 3. Count how often each item appears
const countBy = arr => arr.reduce((acc, x) => ({ ...acc, [x]: (acc[x] || 0) + 1 }), {});
console.log(countBy(['a', 'b', 'a', 'c', 'a']));

// 4. FizzBuzz
for (let n = 1; n <= 15; n++) {
  console.log(n % 15 === 0 ? 'FizzBuzz' : n % 3 === 0 ? 'Fizz' : n % 5 === 0 ? 'Buzz' : n);
}

// 5. Two numbers that add up to a target (O(n) with a Map)
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return null;
}
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]

// 6. Chunk an array
const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) },
  (_, i) => arr.slice(i * size, i * size + size));
console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1,2],[3,4],[5]]` },
        { type: 'note', value: 'Also prepare to write debounce, a simple Promise.all, deep clone and flatten from memory. You have already built all of them in this course.' },
      ],
    },
    {
      id: 'js-interview-tips',
      title: 'Getting Your First JavaScript Job',
      blocks: [
        { type: 'heading', value: 'Build a portfolio' },
        { type: 'list', items: [
          '3 to 5 real projects beat 20 tutorial copies. Extend the to-do, quiz and weather projects with your own features.',
          'Put the code on GitHub with a clear README and screenshots.',
          'Deploy them for free (GitHub Pages, Netlify, Vercel) so recruiters can click a link.',
        ] },
        { type: 'heading', value: 'What to learn next' },
        { type: 'list', items: [
          'Git and GitHub: required in every job',
          'A framework: React is the most in-demand',
          'TypeScript: JavaScript with types, used by most companies',
          'Node.js and a database if you want to build back-ends',
        ] },
        { type: 'heading', value: 'In the interview' },
        { type: 'list', items: [
          'Think out loud; interviewers grade your reasoning, not just the answer.',
          'Ask clarifying questions before coding: inputs, edge cases, expected output.',
          'Test your solution with an example, including an empty or tricky input.',
          'It is fine to say "I do not know, but here is how I would find out".',
        ] },
        { type: 'note', value: 'Consistency wins. One hour of coding every day for six months will take you further than any shortcut.' },
        { type: 'note', value: 'Congratulations! You have finished the JavaScript course. Take the JavaScript Full Test in the Quiz tab, then build your own project from scratch.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'interview', q: 'Why does a var loop with setTimeout print 3, 3, 3?', options: ['setTimeout is broken', 'All callbacks share one function-scoped i', 'var is block-scoped', 'The loop runs backwards'], answer: 1, explain: 'let creates a new binding per iteration, so it prints 0, 1, 2.' },
    { chapterId: 'interview', q: 'What is the difference between null and undefined?', options: ['No difference', 'undefined = never assigned; null = intentionally empty', 'null is a string', 'undefined is an error'], answer: 1, explain: 'null is set on purpose by the programmer.' },
    { chapterId: 'interview', q: 'What does twoSum([2, 7, 11, 15], 9) return in the lesson?', options: ['[1, 2]', '[0, 1]', '[2, 7]', 'null'], answer: 1, explain: 'Indexes 0 and 1 hold 2 and 7, which add up to 9.' },
    { chapterId: 'interview', q: 'What should you do before coding an interview problem?', options: ['Start typing immediately', 'Ask clarifying questions about inputs and edge cases', 'Search the internet', 'Write tests in another language'], answer: 1, explain: 'Understanding the problem first prevents wasted effort.' },
  ],
};
