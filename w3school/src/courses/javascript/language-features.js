// JavaScript chapter: Advanced Language Features. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'language-features',
  title: 'Advanced Language Features',
  description: 'Iterators, generators, symbols, copying and Proxy',
  icon: 'auto-awesome',
  lessons: [
    {
      id: 'js-iterators',
      title: 'Iterators and Iterables',
      blocks: [
        { type: 'text', value: 'for...of, spread (...) and destructuring all work on iterables: objects that know how to hand out their values one at a time. Arrays, strings, Maps and Sets are iterable. You can make your own objects iterable too.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const it = ['a', 'b'][Symbol.iterator]();
console.log(it.next()); // { value: 'a', done: false }
console.log(it.next()); // { value: 'b', done: false }
console.log(it.next()); // { value: undefined, done: true }

// A custom iterable range
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next: () => current <= last
        ? { value: current++, done: false }
        : { value: undefined, done: true },
    };
  },
};

for (const n of range) console.log(n);
console.log([...range]);         // [1, 2, 3, 4, 5]
console.log(Math.max(...range)); // 5` },
        { type: 'note', value: 'An iterator is any object with a next() method that returns { value, done }. Everything else is built on that simple rule.' },
      ],
    },
    {
      id: 'js-generators',
      title: 'Generators',
      blocks: [
        { type: 'text', value: 'A generator function (function*) can pause with yield and continue later. It is the easiest way to create iterators, and it can even produce infinite sequences, because values are created only when asked for.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function* countdown(from) {
  while (from > 0) {
    yield from;   // pause here and hand out a value
    from--;
  }
  return 'Liftoff!';
}

const gen = countdown(3);
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log([...countdown(5)]);

// Infinite sequence, taken lazily
function* ids() {
  let id = 1000;
  while (true) yield id++;
}
const nextId = ids();
console.log(nextId.next().value, nextId.next().value, nextId.next().value);

// Simple range helper
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) yield i;
}
console.log([...range(0, 20, 5)]); // [0, 5, 10, 15]` },
        { type: 'note', value: 'Generators power many libraries (for example redux-saga) and are the idea behind async/await.' },
      ],
    },
    {
      id: 'js-symbols-weak',
      title: 'Symbols, WeakMap and WeakSet',
      blocks: [
        { type: 'heading', value: 'Symbols' },
        { type: 'text', value: 'A Symbol is a guaranteed-unique value, often used as a hidden object key that can never clash with other keys.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const id = Symbol('id');
const id2 = Symbol('id');
console.log(id === id2);         // false: every symbol is unique

const user = { name: 'Rahim', [id]: 501 };
console.log(user[id]);           // 501
console.log(Object.keys(user));  // ["name"]: symbol keys are hidden
console.log(JSON.stringify(user)); // symbols are skipped` },
        { type: 'heading', value: 'WeakMap and WeakSet' },
        { type: 'text', value: 'They only accept objects as keys and hold them "weakly": when nothing else refers to the object, it can be garbage-collected together with its entry. Perfect for attaching private data or caches to objects without causing memory leaks.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const clickCounts = new WeakMap();

function trackClick(element) {
  clickCounts.set(element, (clickCounts.get(element) || 0) + 1);
  return clickCounts.get(element);
}

const button = { label: 'Buy' }; // stands in for a DOM element
trackClick(button);
console.log(trackClick(button)); // 2
// When button is no longer used anywhere, its count is freed automatically.` },
      ],
    },
    {
      id: 'js-copying',
      title: 'Copying Objects: Shallow vs Deep',
      blocks: [
        { type: 'text', value: 'Objects and arrays are stored by reference. Assigning one to a new variable does not copy it. Spread makes a shallow copy: only the top level is new, nested objects are still shared.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const original = { name: 'Nadia', address: { city: 'Dhaka' }, tags: ['js'] };

const same = original;            // same object
const shallow = { ...original };  // new top level only
const deep = structuredClone(original); // everything new

shallow.name = 'Changed';
shallow.address.city = 'Sylhet';  // also changes original!
deep.tags.push('css');            // does not affect original

console.log(original.name);         // "Nadia"
console.log(original.address.city); // "Sylhet"  (shared!)
console.log(original.tags);         // ["js"]
console.log(same === original);     // true` },
        { type: 'list', items: [
          'structuredClone(): the modern deep copy; works with Dates, Maps, Sets and nested objects',
          'JSON.parse(JSON.stringify(x)): an old trick that loses Dates, undefined and functions',
          'Object.freeze(obj): make an object read-only (shallowly)',
        ] },
        { type: 'note', value: 'Unexpected shared nested objects are one of the most common bugs in state updates, especially in React.' },
      ],
    },
    {
      id: 'js-proxy',
      title: 'Proxy and Reflect',
      blocks: [
        { type: 'text', value: 'A Proxy wraps an object and intercepts operations on it: reading, writing, deleting properties. It is how frameworks like Vue detect changes automatically.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const settings = { volume: 50, theme: 'light' };

const watched = new Proxy(settings, {
  get(target, key) {
    if (!(key in target)) return \`(no setting "\${String(key)}")\`;
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    if (key === 'volume' && (value < 0 || value > 100)) {
      throw new RangeError('Volume must be 0-100');
    }
    console.log(\`\${String(key)} changed: \${target[key]} → \${value}\`);
    return Reflect.set(target, key, value);
  },
});

watched.volume = 80;
watched.theme = 'dark';
console.log(watched.fontSize);
try { watched.volume = 150; } catch (e) { console.log(e.message); }` },
        { type: 'note', value: 'Reflect has one method for every Proxy trap. Using it inside traps performs the default behavior correctly.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'language-features', q: 'What does an iterator\'s next() method return?', options: ['The next value only', 'An object { value, done }', 'A promise', 'An array'], answer: 1, explain: 'done becomes true when there are no more values.' },
    { chapterId: 'language-features', q: 'Which keyword pauses a generator and hands out a value?', options: ['await', 'return', 'yield', 'pause'], answer: 2, explain: 'yield pauses until next() is called again.' },
    { chapterId: 'language-features', q: 'What is special about every Symbol?', options: ['It is a number', 'It is always unique', 'It is visible in Object.keys', 'It is stored in JSON'], answer: 1, explain: 'Symbol("id") !== Symbol("id").' },
    { chapterId: 'language-features', q: 'Which creates a true deep copy including Dates and Maps?', options: ['{ ...obj }', 'Object.assign({}, obj)', 'structuredClone(obj)', 'obj.copy()'], answer: 2, explain: 'Spread and Object.assign only copy the top level.' },
    { chapterId: 'language-features', q: 'What can a Proxy intercept?', options: ['Only function calls', 'Operations like getting and setting properties', 'Network requests', 'CSS changes'], answer: 1, explain: 'Proxy traps include get, set, has, deleteProperty and more.' },
  ],
};
