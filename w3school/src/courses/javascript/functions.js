// JavaScript chapter: Functions. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'functions',
  title: 'Functions',
  description: 'Reusable code, scope and closures',
  icon: 'functions',
  lessons: [
    {
      id: 'js-functions',
      title: 'Creating Functions',
      blocks: [
        { type: 'text', value: 'A function is a named block of code you can run whenever you need it. Write it once, use it many times.' },
        { type: 'code', lang: 'js', tryIt: true, value: `// Function declaration
function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('Rahim'));
console.log(greet('Nadia'));

// Function expression (stored in a variable)
const square = function (n) {
  return n * n;
};
console.log(square(9));` },
        { type: 'list', items: [
          'Parameters (name, n) are placeholders in the definition.',
          'Arguments (\'Rahim\', 9) are the real values passed when calling.',
          'return sends a value back and ends the function immediately.',
          'A function without return gives back undefined.',
        ] },
        { type: 'note', value: 'Good functions do one job and have a verb in their name: calculateTotal, formatDate, isValidEmail.' },
      ],
    },
    {
      id: 'js-parameters',
      title: 'Default and Rest Parameters',
      blocks: [
        { type: 'heading', value: 'Default values' },
        { type: 'code', lang: 'js', tryIt: true, value: `function makeTea(sugar = 1, milk = true) {
  return \`Tea with \${sugar} sugar\${milk ? ' and milk' : ''}\`;
}

console.log(makeTea());          // uses both defaults
console.log(makeTea(2));
console.log(makeTea(0, false));` },
        { type: 'heading', value: 'Rest parameters: any number of arguments' },
        { type: 'code', lang: 'js', tryIt: true, value: `function sum(...numbers) {
  let total = 0;
  for (const n of numbers) total += n;
  return total;
}

console.log(sum(1, 2));          // 3
console.log(sum(5, 10, 15, 20)); // 50` },
        { type: 'note', value: 'The rest parameter must be last, and it is a real array, so you can use array methods on it.' },
      ],
    },
    {
      id: 'js-arrow-functions',
      title: 'Arrow Functions',
      blocks: [
        { type: 'text', value: 'Arrow functions are a shorter syntax, used everywhere in modern JavaScript, especially for small callbacks.' },
        { type: 'code', lang: 'js', tryIt: true, value: `// Full form
const add = (a, b) => {
  return a + b;
};

// One expression: braces and return can be dropped
const multiply = (a, b) => a * b;

// One parameter: parentheses are optional
const double = n => n * 2;

// No parameters
const sayHi = () => 'Hi!';

// Returning an object needs parentheses
const makeUser = name => ({ name, active: true });

console.log(add(2, 3), multiply(4, 5), double(8), sayHi());
console.log(makeUser('Karim'));` },
        { type: 'note', value: 'Arrow functions do not have their own "this". That makes them great for callbacks, but not for object methods that use this.' },
      ],
    },
    {
      id: 'js-scope',
      title: 'Scope and Hoisting',
      blocks: [
        { type: 'text', value: 'Scope decides where a variable can be used. let and const are block-scoped: they exist only inside the { } where they were created.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const appName = 'CodeNest'; // global scope

function showLevel() {
  const level = 'Beginner';  // function scope
  if (true) {
    const badge = 'Gold';    // block scope
    console.log(appName, level, badge); // all visible here
  }
  // console.log(badge); // ReferenceError: badge is not defined
}
showLevel();` },
        { type: 'heading', value: 'Hoisting' },
        { type: 'text', value: 'Function declarations are hoisted: you can call them before the line where they are written. let and const are not usable before their line.' },
        { type: 'code', lang: 'js', tryIt: true, value: `console.log(hello()); // works!

function hello() {
  return 'Declarations are hoisted';
}

try {
  console.log(total); // error: cannot access before initialization
} catch (e) {
  console.log(e.message);
}
const total = 10;` },
        { type: 'note', value: 'Keep variables in the smallest scope possible. Fewer globals means fewer accidental name clashes.' },
      ],
    },
    {
      id: 'js-closures',
      title: 'Closures',
      blocks: [
        { type: 'text', value: 'A closure is a function that remembers the variables from where it was created, even after that outer function has finished. It is how JavaScript keeps private state.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function createCounter() {
  let count = 0;            // private: nothing outside can touch it
  return function () {
    count++;
    return count;
  };
}

const counterA = createCounter();
const counterB = createCounter();

console.log(counterA()); // 1
console.log(counterA()); // 2
console.log(counterA()); // 3
console.log(counterB()); // 1  (its own separate count)` },
        { type: 'heading', value: 'A practical example' },
        { type: 'code', lang: 'js', tryIt: true, value: `function makeDiscount(percent) {
  return price => price - price * (percent / 100);
}

const eidSale = makeDiscount(20);
const clearance = makeDiscount(50);
console.log(eidSale(1000));   // 800
console.log(clearance(1000)); // 500` },
        { type: 'note', value: 'Closures appear in interviews all the time. The key idea: a function carries its birthplace\'s variables with it.' },
      ],
    },
    {
      id: 'js-callbacks',
      title: 'Callbacks and Higher-Order Functions',
      blocks: [
        { type: 'text', value: 'In JavaScript, functions are values. You can pass a function into another function (a callback) or return one. A function that does either is called a higher-order function.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function repeat(times, action) {
  for (let i = 1; i <= times; i++) {
    action(i);
  }
}

repeat(3, n => console.log('Push-up', n));

function calculate(a, b, operation) {
  return operation(a, b);
}
console.log(calculate(10, 4, (x, y) => x - y)); // 6
console.log(calculate(10, 4, Math.max));        // 10` },
        { type: 'text', value: 'You will use callbacks constantly: array methods like map and filter, event listeners, and timers all take callback functions.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'functions', q: 'What does a function return if it has no return statement?', options: ['0', 'null', 'undefined', 'An error'], answer: 2, explain: 'Without return, a function gives back undefined.' },
    { chapterId: 'functions', q: 'Which is a valid arrow function that doubles a number?', options: ['n => n * 2', 'n -> n * 2', 'function => n * 2', '(n) { n * 2 }'], answer: 0, explain: 'Arrow functions use =>.' },
    { chapterId: 'functions', q: 'What is ...numbers in function sum(...numbers)?', options: ['A spread error', 'A rest parameter collecting all arguments into an array', 'A default value', 'A comment'], answer: 1, explain: 'Rest parameters gather the remaining arguments into an array.' },
    { chapterId: 'functions', q: 'Where can a const declared inside an if block be used?', options: ['Anywhere', 'In the whole function', 'Only inside that block', 'Only before its line'], answer: 2, explain: 'let and const are block-scoped.' },
    { chapterId: 'functions', q: 'What is a closure?', options: ['A function that closes the program', 'A function that remembers variables from where it was created', 'A loop that ends', 'A syntax error'], answer: 1, explain: 'Closures keep access to their outer scope.' },
    { chapterId: 'functions', q: 'What do we call a function passed into another function?', options: ['A callback', 'A constructor', 'A prototype', 'A module'], answer: 0, explain: 'The receiving function "calls back" the function later.' },
  ],
};
