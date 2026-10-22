// JavaScript chapter: Classes and Modules. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'classes-modules',
  title: 'Classes and Modules',
  description: 'Object-oriented code and organizing files',
  icon: 'account-tree',
  lessons: [
    {
      id: 'js-classes',
      title: 'Classes',
      blocks: [
        { type: 'text', value: 'A class is a blueprint for creating many similar objects. The constructor sets up each new object; methods are shared by all of them.' },
        { type: 'code', lang: 'js', tryIt: true, value: `class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;
  }

  average() {
    const sum = this.marks.reduce((a, b) => a + b, 0);
    return sum / this.marks.length;
  }

  report() {
    return \`\${this.name}: average \${this.average().toFixed(1)}\`;
  }
}

const s1 = new Student('Rahim', [80, 90, 70]);
const s2 = new Student('Nadia', [95, 88, 92]);
console.log(s1.report());
console.log(s2.report());
console.log(s1 instanceof Student); // true` },
      ],
    },
    {
      id: 'js-inheritance',
      title: 'Inheritance',
      blocks: [
        { type: 'text', value: 'extends creates a class based on another. The child gets all the parent\'s methods and can add or override them. super() calls the parent\'s constructor or methods.' },
        { type: 'code', lang: 'js', tryIt: true, value: `class Shape {
  constructor(name) {
    this.name = name;
  }
  area() {
    return 0;
  }
  describe() {
    return \`\${this.name} with area \${this.area().toFixed(2)}\`;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super('Circle');
    this.radius = radius;
  }
  area() {                      // override
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(w, h) {
    super('Rectangle');
    this.w = w;
    this.h = h;
  }
  area() {
    return this.w * this.h;
  }
}

const shapes = [new Circle(3), new Rectangle(4, 5)];
shapes.forEach(s => console.log(s.describe()));` },
        { type: 'note', value: 'Prefer short inheritance chains. Deep hierarchies become hard to change; often combining small objects works better.' },
      ],
    },
    {
      id: 'js-class-features',
      title: 'Getters, Static and Private Fields',
      blocks: [
        { type: 'code', lang: 'js', tryIt: true, value: `class BankAccount {
  #balance = 0;                 // private: only usable inside the class
  static bankName = 'CodeBank'; // belongs to the class, not each object
  static count = 0;

  constructor(owner) {
    this.owner = owner;
    BankAccount.count++;
  }

  get balance() {               // read like a property
    return this.#balance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error('Invalid amount');
    this.#balance += amount;
    return this;                // allows chaining
  }
}

const acc = new BankAccount('Karim');
acc.deposit(500).deposit(250);
console.log(acc.balance);        // 750
console.log(BankAccount.bankName, BankAccount.count);
// acc.#balance = 1000000;      // SyntaxError: private field` },
        { type: 'list', items: [
          '#field: private data that outside code cannot change',
          'get / set: properties computed by a function',
          'static: shared by the class itself, such as counters and helpers',
        ] },
      ],
    },
    {
      id: 'js-modules',
      title: 'Modules: import and export',
      blocks: [
        { type: 'text', value: 'Modules split code into files. Each file chooses what to export, and other files import only what they need. Every modern project, including this app, is built this way.' },
        { type: 'code', lang: 'js', value: `// math.js
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export default function multiply(a, b) {
  return a * b;
}` },
        { type: 'code', lang: 'js', value: `// app.js
import multiply, { add, PI } from './math.js';
import * as math from './math.js';

console.log(add(2, 3), multiply(4, 5), PI);
console.log(math.add(1, 1));` },
        { type: 'list', items: [
          'Named exports: many per file, imported with { braces } and the same name',
          'Default export: one per file, imported with any name, no braces',
          'In the browser: <script type="module" src="app.js"></script>',
        ] },
        { type: 'note', value: 'Modules run in strict mode and have their own scope, so variables do not leak into other files.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'classes-modules', q: 'Which method runs automatically when you create an object with new?', options: ['init()', 'constructor()', 'create()', 'start()'], answer: 1, explain: 'The constructor sets up each new instance.' },
    { chapterId: 'classes-modules', q: 'Which keyword makes a class inherit from another?', options: ['inherits', 'implements', 'extends', 'super'], answer: 2, explain: 'class Circle extends Shape { }' },
    { chapterId: 'classes-modules', q: 'What does super() do inside a child constructor?', options: ['Deletes the parent', 'Calls the parent constructor', 'Creates a static method', 'Makes fields private'], answer: 1, explain: 'It must be called before using this in a child constructor.' },
    { chapterId: 'classes-modules', q: 'How do you declare a private field?', options: ['private balance', '_balance', '#balance', '$balance'], answer: 2, explain: 'A # prefix makes a field truly private.' },
    { chapterId: 'classes-modules', q: 'How many default exports can a module have?', options: ['None', 'One', 'Two', 'Unlimited'], answer: 1, explain: 'One default export, but any number of named exports.' },
  ],
};
