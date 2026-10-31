// JavaScript chapter: Arrays. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'arrays',
  title: 'Arrays',
  description: 'Lists of values and powerful array methods',
  icon: 'view-list',
  lessons: [
    {
      id: 'js-arrays',
      title: 'Array Basics',
      blocks: [
        { type: 'text', value: 'An array is an ordered list of values. Each item has an index, starting at 0.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const cities = ['Dhaka', 'Chattogram', 'Sylhet'];

console.log(cities[0]);       // "Dhaka"
console.log(cities.length);   // 3
console.log(cities.at(-1));   // "Sylhet" (last item)

cities[1] = 'Khulna';         // change an item
console.log(cities);

const mixed = [1, 'two', true, null, [5, 6]];
console.log(mixed[4][0]);     // 5 (nested array)

console.log(Array.isArray(cities)); // true` },
        { type: 'note', value: 'An array declared with const can still change its contents. const only stops you from replacing the whole array with a new one.' },
      ],
    },
    {
      id: 'js-array-methods',
      title: 'Adding, Removing and Slicing',
      blocks: [
        { type: 'code', lang: 'js', tryIt: true, value: `const cart = ['rice', 'oil'];

cart.push('sugar');       // add to the end
cart.unshift('salt');     // add to the start
console.log(cart);        // salt, rice, oil, sugar

const last = cart.pop();  // remove from the end
const first = cart.shift(); // remove from the start
console.log(last, first, cart);

console.log(cart.includes('rice'));  // true
console.log(cart.indexOf('oil'));    // 1
console.log(cart.join(' + '));       // "rice + oil"` },
        { type: 'heading', value: 'slice vs splice' },
        { type: 'code', lang: 'js', tryIt: true, value: `const nums = [10, 20, 30, 40, 50];

// slice(start, end): copy a part, original unchanged
console.log(nums.slice(1, 3)); // [20, 30]
console.log(nums);             // unchanged

// splice(start, deleteCount, ...newItems): changes the original
nums.splice(1, 2, 99);
console.log(nums);             // [10, 99, 40, 50]` },
        { type: 'note', value: 'push, pop, shift, unshift, splice and sort change (mutate) the array. slice, map, filter and concat return a new one.' },
      ],
    },
    {
      id: 'js-array-iteration',
      title: 'forEach, map, filter and reduce',
      blocks: [
        { type: 'text', value: 'These four methods replace most loops in modern code. Each takes a callback that runs for every item.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const prices = [120, 450, 80, 900, 300];

// forEach: do something with each item
prices.forEach((p, i) => console.log(\`Item \${i + 1}: \${p} tk\`));

// map: transform every item into a new array
const withVat = prices.map(p => p * 1.15);
console.log(withVat);

// filter: keep only items that pass a test
const cheap = prices.filter(p => p < 200);
console.log(cheap); // [120, 80]

// reduce: combine all items into one value
const total = prices.reduce((sum, p) => sum + p, 0);
console.log('Total:', total); // 1850` },
        { type: 'heading', value: 'Chaining' },
        { type: 'code', lang: 'js', tryIt: true, value: `const students = [
  { name: 'Rahim', marks: 82 },
  { name: 'Karim', marks: 45 },
  { name: 'Nadia', marks: 91 },
];

const toppers = students
  .filter(s => s.marks >= 80)
  .map(s => s.name.toUpperCase());

console.log(toppers); // ["RAHIM", "NADIA"]` },
      ],
    },
    {
      id: 'js-array-search-sort',
      title: 'find, some, every and sort',
      blocks: [
        { type: 'code', lang: 'js', tryIt: true, value: `const products = [
  { id: 1, name: 'Phone', price: 15000, stock: 4 },
  { id: 2, name: 'Earbuds', price: 1200, stock: 0 },
  { id: 3, name: 'Charger', price: 650, stock: 12 },
];

console.log(products.find(p => p.id === 3));      // first match
console.log(products.findIndex(p => p.id === 2)); // 1
console.log(products.some(p => p.stock === 0));   // true: at least one
console.log(products.every(p => p.price > 500));  // true: all of them` },
        { type: 'heading', value: 'Sorting' },
        { type: 'code', lang: 'js', tryIt: true, value: `const nums = [25, 100, 3, 47];

console.log([...nums].sort());               // [100, 25, 3, 47] wrong!
console.log([...nums].sort((a, b) => a - b)); // ascending
console.log([...nums].sort((a, b) => b - a)); // descending

const names = ['Zara', 'arif', 'Bina'];
console.log([...names].sort((a, b) => a.localeCompare(b)));` },
        { type: 'note', value: 'sort() without a compare function sorts as text, so 100 comes before 25. Always pass (a, b) => a - b for numbers.' },
      ],
    },
    {
      id: 'js-destructuring-spread',
      title: 'Destructuring and Spread',
      blocks: [
        { type: 'heading', value: 'Array destructuring' },
        { type: 'code', lang: 'js', tryIt: true, value: `const rgb = [255, 128, 0];
const [red, green, blue] = rgb;
console.log(red, green, blue);

const [first, ...rest] = [1, 2, 3, 4];
console.log(first, rest); // 1 [2, 3, 4]

// Swap two variables
let a = 'left', b = 'right';
[a, b] = [b, a];
console.log(a, b);` },
        { type: 'heading', value: 'Spread ...' },
        { type: 'code', lang: 'js', tryIt: true, value: `const morning = ['tea', 'bread'];
const lunch = ['rice', 'fish'];

const allFood = [...morning, ...lunch, 'mango'];
console.log(allFood);

const copy = [...morning];  // a real copy
copy.push('egg');
console.log(morning, copy);

console.log(Math.max(...[4, 9, 2])); // spread into arguments` },
        { type: 'note', value: 'Writing const copy = morning does not copy the array. Both names point to the same array. Use [...morning] for a copy.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'arrays', q: 'What is the index of the first item in an array?', options: ['1', '0', '-1', 'It depends'], answer: 1, explain: 'Array indexes start at 0.' },
    { chapterId: 'arrays', q: 'Which method adds an item to the end of an array?', options: ['shift()', 'unshift()', 'push()', 'pop()'], answer: 2, explain: 'push adds to the end; pop removes from the end.' },
    { chapterId: 'arrays', q: 'Which method creates a new array with transformed items?', options: ['forEach', 'map', 'find', 'some'], answer: 1, explain: 'map returns a new array of the callback results.' },
    { chapterId: 'arrays', q: 'What does [5, 10, 15].reduce((s, n) => s + n, 0) return?', options: ['15', '30', '[5, 10, 15]', '0'], answer: 1, explain: 'reduce adds them all: 0 + 5 + 10 + 15.' },
    { chapterId: 'arrays', q: 'Why does [100, 25, 3].sort() give [100, 25, 3]?', options: ['It is already sorted', 'sort compares items as strings by default', 'sort only works on strings', 'It is a bug in the browser'], answer: 1, explain: 'Pass (a, b) => a - b to sort numbers.' },
    { chapterId: 'arrays', q: 'How do you make a real copy of an array arr?', options: ['const copy = arr', 'const copy = [...arr]', 'const copy = arr.copy', 'const copy = &arr'], answer: 1, explain: 'Spread creates a new array; assignment only copies the reference.' },
  ],
};
