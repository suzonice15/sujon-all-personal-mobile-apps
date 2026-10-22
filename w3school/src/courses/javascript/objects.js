// JavaScript chapter: Objects. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'objects',
  title: 'Objects',
  description: 'Group related data, JSON, Map and Set',
  icon: 'data-object',
  lessons: [
    {
      id: 'js-objects',
      title: 'Object Basics',
      blocks: [
        { type: 'text', value: 'An object groups related values under named keys (properties). It is how JavaScript represents real-world things: a user, a product, a lesson.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const student = {
  name: 'Nadia',
  age: 21,
  courses: ['HTML', 'CSS'],
  'favourite color': 'teal',  // keys with spaces need quotes
};

console.log(student.name);                // dot notation
console.log(student['favourite color']);  // bracket notation

student.age = 22;            // update
student.city = 'Rajshahi';   // add
delete student.courses;      // remove
console.log(student);

const key = 'name';
console.log(student[key]);   // brackets allow a variable key
console.log('age' in student); // true` },
      ],
    },
    {
      id: 'js-object-methods',
      title: 'Methods and this',
      blocks: [
        { type: 'text', value: 'A function stored in an object is called a method. Inside it, this refers to the object the method was called on.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const account = {
  owner: 'Karim',
  balance: 500,
  deposit(amount) {
    this.balance += amount;
    return this.balance;
  },
  summary() {
    return \`\${this.owner} has \${this.balance} tk\`;
  },
};

account.deposit(250);
console.log(account.summary()); // "Karim has 750 tk"` },
        { type: 'note', value: 'Write methods with the short syntax deposit() { }. An arrow function here would not get the right this.' },
      ],
    },
    {
      id: 'js-object-techniques',
      title: 'Modern Object Techniques',
      blocks: [
        { type: 'heading', value: 'Shorthand and destructuring' },
        { type: 'code', lang: 'js', tryIt: true, value: `const name = 'Rahim';
const age = 24;
const user = { name, age };   // same as { name: name, age: age }
console.log(user);

const { name: userName, age: userAge, city = 'Dhaka' } = user;
console.log(userName, userAge, city); // city uses the default

function printUser({ name, age }) {   // destructure parameters
  console.log(\`\${name} (\${age})\`);
}
printUser(user);` },
        { type: 'heading', value: 'Spread and looping' },
        { type: 'code', lang: 'js', tryIt: true, value: `const defaults = { theme: 'light', fontSize: 16 };
const saved = { theme: 'dark' };
const settings = { ...defaults, ...saved }; // later keys win
console.log(settings);

console.log(Object.keys(settings));    // ["theme", "fontSize"]
console.log(Object.values(settings));  // ["dark", 16]
for (const [key, value] of Object.entries(settings)) {
  console.log(key, '=', value);
}` },
      ],
    },
    {
      id: 'js-json',
      title: 'JSON',
      blocks: [
        { type: 'text', value: 'JSON (JavaScript Object Notation) is the text format used to send data between apps and servers. It looks like an object, but keys and strings must use double quotes.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const lesson = { id: 7, title: 'Closures', done: true, tags: ['js', 'functions'] };

// Object → JSON text (to save or send)
const text = JSON.stringify(lesson);
console.log(text);
console.log(JSON.stringify(lesson, null, 2)); // pretty printed

// JSON text → object (after receiving)
const back = JSON.parse(text);
console.log(back.title);

try {
  JSON.parse("{ title: 'oops' }"); // invalid JSON
} catch (e) {
  console.log('Invalid JSON:', e.message);
}` },
        { type: 'note', value: 'JSON cannot store functions, undefined or Dates as Dates. Dates become strings and must be converted back.' },
      ],
    },
    {
      id: 'js-map-set',
      title: 'Map and Set',
      blocks: [
        { type: 'heading', value: 'Set: unique values' },
        { type: 'code', lang: 'js', tryIt: true, value: `const tags = new Set(['js', 'css', 'js', 'html', 'css']);
console.log(tags.size);         // 3 (duplicates removed)
tags.add('react');
console.log(tags.has('css'));   // true

// Remove duplicates from an array in one line
const unique = [...new Set([1, 2, 2, 3, 3, 3])];
console.log(unique);` },
        { type: 'heading', value: 'Map: key-value pairs with any key type' },
        { type: 'code', lang: 'js', tryIt: true, value: `const visits = new Map();
visits.set('home', 10);
visits.set('quiz', 4);
visits.set('home', visits.get('home') + 1);

console.log(visits.get('home')); // 11
console.log(visits.size);        // 2
for (const [page, count] of visits) {
  console.log(page, count);
}` },
        { type: 'note', value: 'Use a Map when keys are added and removed often, or are not strings. Use a plain object for fixed, known fields.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'objects', q: 'How do you read a property whose key is stored in a variable k?', options: ['obj.k', 'obj[k]', 'obj->k', 'obj{k}'], answer: 1, explain: 'Bracket notation evaluates the variable.' },
    { chapterId: 'objects', q: 'Inside an object method, what does this refer to?', options: ['The window', 'The function itself', 'The object the method was called on', 'Nothing'], answer: 2, explain: 'this is the object before the dot when calling.' },
    { chapterId: 'objects', q: 'What does { ...a, ...b } do when both have the same key?', options: ['Error', 'a wins', 'b wins', 'Both are kept'], answer: 2, explain: 'Later spreads overwrite earlier keys.' },
    { chapterId: 'objects', q: 'Which method turns an object into a JSON string?', options: ['JSON.parse()', 'JSON.stringify()', 'Object.toJSON()', 'String(obj)'], answer: 1, explain: 'stringify converts to text; parse converts back.' },
    { chapterId: 'objects', q: 'What is the easiest way to remove duplicates from an array?', options: ['[...new Set(arr)]', 'arr.unique()', 'arr.filter()', 'new Map(arr)'], answer: 0, explain: 'A Set only keeps unique values.' },
  ],
};
