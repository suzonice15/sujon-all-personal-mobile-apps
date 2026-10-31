// JavaScript chapter: Getting Started. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What JavaScript is and your first lines of code',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'js-intro',
      title: 'What is JavaScript?',
      blocks: [
        { type: 'text', value: 'JavaScript is the programming language of the web. HTML gives a page structure, CSS gives it style, and JavaScript gives it behavior: buttons that react, forms that check input, content that updates without reloading.' },
        { type: 'list', items: [
          'It runs in every browser, on every phone and computer.',
          'With Node.js it also runs on servers.',
          'With React Native (the technology behind this app) it builds mobile apps.',
        ] },
        { type: 'code', lang: 'js', tryIt: true, value: `console.log('Hello, JavaScript!');
console.log(2 + 3);` },
        { type: 'text', value: 'Tap "Try it yourself". The Output panel shows everything you print with console.log().' },
        { type: 'note', value: 'JavaScript and Java are completely different languages. The similar name was a marketing decision in 1995.' },
      ],
    },
    {
      id: 'js-where',
      title: 'Where JavaScript Runs',
      blocks: [
        { type: 'text', value: 'In a web page, JavaScript goes inside a <script> element, either written directly or loaded from a .js file.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<p id="msg">Original text</p>

<script>
  document.getElementById('msg').textContent = 'Changed by JavaScript!';
</script>` },
        { type: 'heading', value: 'External file' },
        { type: 'code', lang: 'html', value: `<script src="app.js" defer></script>` },
        { type: 'heading', value: 'The browser console' },
        { type: 'text', value: 'On a computer, press F12 and open the Console tab. You can type JavaScript there and see the result immediately. It is also where errors appear, so keep it open while you code.' },
        { type: 'note', value: 'Put scripts at the end of <body> or use defer, so the HTML exists before your code tries to use it.' },
      ],
    },
    {
      id: 'js-output',
      title: 'Showing Output',
      blocks: [
        { type: 'text', value: 'There are several ways to show results:' },
        { type: 'list', items: [
          'console.log(): print to the console, the main tool for testing and debugging',
          'element.textContent = ...: put text on the page',
          'alert(): a popup message (avoid it in real apps, it blocks the page)',
        ] },
        { type: 'code', lang: 'js', tryIt: true, value: `console.log('A string');
console.log(42, true, null);
console.log('Sum:', 10 + 5);
console.log([1, 2, 3]);
console.log({ name: 'Rahim', age: 24 });

console.warn('This is a warning');
console.error('This is an error');` },
        { type: 'note', value: 'console.log() can take many values separated by commas and prints them on one line.' },
      ],
    },
    {
      id: 'js-syntax',
      title: 'Syntax and Comments',
      blocks: [
        { type: 'text', value: 'A JavaScript program is a list of statements, run from top to bottom. Each statement usually ends with a semicolon.' },
        { type: 'code', lang: 'js', tryIt: true, value: `// A single-line comment

/*
  A multi-line comment.
  Comments are ignored when the code runs.
*/

let price = 100;      // a statement
let tax = price * 0.15;
console.log(price + tax);` },
        { type: 'heading', value: 'Rules to remember' },
        { type: 'list', items: [
          'JavaScript is case-sensitive: myName and myname are different.',
          'Blocks of code are grouped with curly braces { }.',
          'Spaces and line breaks are mostly ignored, so format code for readability.',
          'Strings go in quotes: \'single\', "double" or `backticks`.',
        ] },
      ],
    },
    {
      id: 'js-variables',
      title: 'Variables: let, const and var',
      blocks: [
        { type: 'text', value: 'A variable is a named box that stores a value. Create one with let or const.' },
        { type: 'code', lang: 'js', tryIt: true, value: `let score = 10;      // can change later
score = score + 5;
console.log(score);  // 15

const country = 'Bangladesh';  // cannot be reassigned
console.log(country);

// country = 'India';  // TypeError: Assignment to constant variable` },
        { type: 'list', items: [
          'const: the default choice. Use it for values that will not be reassigned.',
          'let: for values that change, such as counters.',
          'var: the old way. It has confusing scope rules; avoid it in new code.',
        ] },
        { type: 'heading', value: 'Naming rules' },
        { type: 'list', items: [
          'Names can contain letters, digits, _ and $, but cannot start with a digit.',
          'Use camelCase: totalPrice, userName, isLoggedIn.',
          'Reserved words like let, class or return cannot be names.',
          'Choose descriptive names: daysUntilExam is better than d.',
        ] },
        { type: 'note', value: 'Start with const for everything. Switch to let only when you actually need to reassign.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'getting-started', q: 'Which statement prints a value to the console?', options: ['print(x)', 'console.log(x)', 'echo x', 'log.console(x)'], answer: 1, explain: 'console.log() writes to the browser console.' },
    { chapterId: 'getting-started', q: 'Which keyword creates a variable that cannot be reassigned?', options: ['let', 'var', 'const', 'static'], answer: 2, explain: 'const prevents reassignment.' },
    { chapterId: 'getting-started', q: 'How do you write a single-line comment?', options: ['<!-- -->', '# comment', '// comment', '** comment'], answer: 2, explain: 'Two slashes start a single-line comment.' },
    { chapterId: 'getting-started', q: 'Are myName and myname the same variable?', options: ['Yes', 'No, JavaScript is case-sensitive', 'Only inside functions', 'Only with var'], answer: 1, explain: 'JavaScript treats different letter cases as different names.' },
    { chapterId: 'getting-started', q: 'Which variable name is valid?', options: ['2ndPlace', 'total-price', 'totalPrice', 'let'], answer: 2, explain: 'Names cannot start with a digit, contain hyphens, or be reserved words.' },
  ],
};
