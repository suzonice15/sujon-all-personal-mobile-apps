// JavaScript chapter: Control Flow. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'control-flow',
  title: 'Control Flow',
  description: 'Operators, decisions and loops',
  icon: 'alt-route',
  lessons: [
    {
      id: 'js-operators',
      title: 'Operators',
      blocks: [
        { type: 'heading', value: 'Assignment shortcuts' },
        { type: 'code', lang: 'js', tryIt: true, value: `let coins = 10;
coins += 5;   // coins = coins + 5  → 15
coins -= 3;   // → 12
coins *= 2;   // → 24
coins /= 4;   // → 6
coins++;      // → 7
coins--;      // → 6
console.log(coins);` },
        { type: 'heading', value: 'Logical operators' },
        { type: 'list', items: [
          '&& (AND): true only if both sides are true',
          '|| (OR): true if at least one side is true',
          '! (NOT): flips true and false',
        ] },
        { type: 'code', lang: 'js', tryIt: true, value: `const age = 20;
const hasTicket = true;

console.log(age >= 18 && hasTicket); // true
console.log(age < 13 || age > 60);   // false
console.log(!hasTicket);             // false` },
        { type: 'note', value: 'Use parentheses to make the order of operations obvious: (a && b) || c.' },
      ],
    },
    {
      id: 'js-if-else',
      title: 'if, else if and else',
      blocks: [
        { type: 'text', value: 'if runs code only when a condition is true. else if checks another condition, and else catches everything left.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const marks = 74;

if (marks >= 80) {
  console.log('Grade: A+');
} else if (marks >= 70) {
  console.log('Grade: A');
} else if (marks >= 60) {
  console.log('Grade: A-');
} else if (marks >= 33) {
  console.log('Grade: Pass');
} else {
  console.log('Grade: Fail');
}` },
        { type: 'text', value: 'Change marks and run it again. Conditions are checked from top to bottom; the first true one wins.' },
        { type: 'note', value: 'Order matters: check the most specific or highest condition first.' },
      ],
    },
    {
      id: 'js-switch',
      title: 'switch',
      blocks: [
        { type: 'text', value: 'switch compares one value against many exact cases. It is cleaner than a long if/else chain when checking the same variable.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const day = new Date().getDay(); // 0 = Sunday ... 6 = Saturday

switch (day) {
  case 5:
    console.log('Friday: weekend!');
    break;
  case 6:
    console.log('Saturday: weekend!');
    break;
  case 0:
  case 1:
  case 2:
  case 3:
  case 4:
    console.log('A working day. Time to study!');
    break;
  default:
    console.log('Unknown day');
}` },
        { type: 'note', value: 'Without break, execution "falls through" into the next case. That is useful for grouping cases, but a common bug when forgotten.' },
      ],
    },
    {
      id: 'js-conditional-operators',
      title: 'Ternary, ?? and ?.',
      blocks: [
        { type: 'heading', value: 'Ternary operator' },
        { type: 'text', value: 'condition ? valueIfTrue : valueIfFalse is a one-line if/else that produces a value.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const age = 16;
const status = age >= 18 ? 'Adult' : 'Minor';
console.log(status);` },
        { type: 'heading', value: 'Nullish coalescing ??' },
        { type: 'text', value: 'a ?? b gives b only when a is null or undefined. Unlike ||, it keeps valid values like 0 and "".' },
        { type: 'code', lang: 'js', tryIt: true, value: `const savedVolume = 0;
console.log(savedVolume || 50); // 50  (wrong! 0 is falsy)
console.log(savedVolume ?? 50); // 0   (correct)

let nickname = null;
console.log(nickname ?? 'Guest'); // "Guest"` },
        { type: 'heading', value: 'Optional chaining ?.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const user = { name: 'Karim', address: null };

console.log(user.address?.city);          // undefined, no crash
console.log(user.address?.city ?? 'N/A'); // "N/A"
// console.log(user.address.city);        // TypeError!` },
      ],
    },
    {
      id: 'js-loops',
      title: 'Loops: for, while, do...while',
      blocks: [
        { type: 'text', value: 'Loops repeat code. The for loop is best when you know how many times to repeat.' },
        { type: 'code', lang: 'js', tryIt: true, value: `// start; condition; step
for (let i = 1; i <= 5; i++) {
  console.log('Lap', i);
}

// Multiplication table of 7
for (let i = 1; i <= 10; i++) {
  console.log(\`7 x \${i} = \${7 * i}\`);
}` },
        { type: 'heading', value: 'while' },
        { type: 'text', value: 'while repeats as long as a condition stays true. Use it when you do not know the number of steps in advance.' },
        { type: 'code', lang: 'js', tryIt: true, value: `let savings = 1000;
let months = 0;

while (savings < 2000) {
  savings *= 1.1;   // 10% growth per month
  months++;
}
console.log(\`Doubled after \${months} months\`);

let n = 0;
do {
  console.log('do...while runs at least once:', n);
  n++;
} while (n < 0);` },
        { type: 'note', value: 'Always make sure the condition eventually becomes false, or the loop runs forever and freezes the page.' },
      ],
    },
    {
      id: 'js-loop-control',
      title: 'break, continue, for...of and for...in',
      blocks: [
        { type: 'code', lang: 'js', tryIt: true, value: `for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue; // skip even numbers
  if (i > 7) break;          // stop the loop completely
  console.log(i);            // 1, 3, 5, 7
}` },
        { type: 'heading', value: 'for...of: values of an array or string' },
        { type: 'code', lang: 'js', tryIt: true, value: `const fruits = ['mango', 'jackfruit', 'lychee'];
for (const fruit of fruits) {
  console.log(fruit);
}

for (const letter of 'JS') {
  console.log(letter);
}` },
        { type: 'heading', value: 'for...in: keys of an object' },
        { type: 'code', lang: 'js', tryIt: true, value: `const scores = { html: 90, css: 85, js: 70 };
for (const subject in scores) {
  console.log(subject, '→', scores[subject]);
}` },
        { type: 'note', value: 'Use for...of for arrays and for...in for objects. for...in on an array gives index strings, which is rarely what you want.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'control-flow', q: 'What is the value of x after: let x = 5; x += 3;', options: ['5', '3', '8', '53'], answer: 2, explain: 'x += 3 means x = x + 3.' },
    { chapterId: 'control-flow', q: 'What does true && false return?', options: ['true', 'false', 'undefined', 'null'], answer: 1, explain: '&& is true only when both sides are true.' },
    { chapterId: 'control-flow', q: 'What happens if you forget break in a switch case?', options: ['Syntax error', 'The next case also runs', 'The switch restarts', 'Nothing'], answer: 1, explain: 'Execution falls through into the following case.' },
    { chapterId: 'control-flow', q: 'What does 0 ?? 10 return?', options: ['10', '0', 'null', 'undefined'], answer: 1, explain: '?? only replaces null and undefined, so 0 is kept.' },
    { chapterId: 'control-flow', q: 'Which loop always runs at least once?', options: ['for', 'while', 'do...while', 'for...of'], answer: 2, explain: 'do...while checks the condition after the first run.' },
    { chapterId: 'control-flow', q: 'Which statement skips to the next loop iteration?', options: ['break', 'skip', 'return', 'continue'], answer: 3, explain: 'continue jumps to the next iteration; break exits the loop.' },
  ],
};
