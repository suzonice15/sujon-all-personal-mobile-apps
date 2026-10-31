// JavaScript interview questions, grouped by chapter id (see src/courses/index.js).
// Questions with tryIt: true open their code in the Try it editor.

export default {
  'getting-started': [
    { level: 'basic', q: 'What is the difference between var, let and const?', a: 'var is function-scoped, hoisted with the value undefined and can be redeclared. let and const are block-scoped and in the "temporal dead zone" until their declaration line. const cannot be reassigned, but an object or array it holds can still be changed.' },
    { level: 'basic', q: 'Is JavaScript compiled or interpreted?', a: 'Both. Modern engines like V8 parse the code, start running it quickly with an interpreter, and compile frequently used ("hot") code to optimized machine code just in time (JIT).' },
    { level: 'intermediate', q: 'What is hoisting?', a: 'Declarations are processed before code runs. Function declarations are fully hoisted (callable before their line); var is hoisted and initialized to undefined; let, const and class are hoisted but cannot be accessed before their declaration.', code: `console.log(a);   // undefined (var)
var a = 1;
sayHi();          // works: function declarations are hoisted
function sayHi() { console.log('hi'); }
try { console.log(b); } catch (e) { console.log(e.message); } // TDZ error
let b = 2;`, tryIt: true },
    { level: 'intermediate', q: 'What is strict mode?', a: '"use strict" (automatic in modules and classes) turns silent mistakes into errors: assigning to undeclared variables throws, this is undefined in plain function calls, duplicate parameter names are forbidden.' },
  ],
  'data-types': [
    { level: 'basic', q: 'What are the primitive types in JavaScript?', a: 'string, number, bigint, boolean, undefined, null and symbol. Everything else (objects, arrays, functions, dates) is an object. Primitives are immutable and compared by value; objects are compared by reference.' },
    { level: 'basic', q: 'What is the difference between == and ===?', a: '=== compares value and type without conversion. == converts types first, leading to surprises like "" == 0 and null == undefined being true. Always use ===.' },
    { level: 'intermediate', q: 'What is the difference between null and undefined?', a: 'undefined means a value was never assigned (missing argument, missing property, variable without value). null is an intentional "no value" set by the programmer. typeof null is "object", a historical bug.' },
    { level: 'intermediate', q: 'Why is 0.1 + 0.2 !== 0.3?', a: 'Numbers are IEEE-754 binary floating point, and 0.1 cannot be represented exactly, so the result is 0.30000000000000004. Compare with a tolerance (Math.abs(a - b) < Number.EPSILON) or work in integers (paisa instead of taka).' },
    { level: 'intermediate', q: 'Which values are falsy?', a: 'false, 0, -0, 0n, "" (empty string), null, undefined and NaN. Everything else is truthy, including "0", "false", [] and {}.' },
    { level: 'advanced', q: 'What does NaN === NaN return, and how do you check for NaN?', a: 'false: NaN is not equal to anything, including itself. Use Number.isNaN(x) (no type coercion) or Object.is(x, NaN). The global isNaN() converts its argument first, so isNaN("abc") is true.' },
  ],
  'control-flow': [
    { level: 'basic', q: 'What is the difference between || and ???', a: 'a || b returns b whenever a is falsy (0, "", false included). a ?? b returns b only when a is null or undefined, so it keeps valid values like 0 and empty strings.' },
    { level: 'basic', q: 'What does optional chaining (?.) do?', a: 'It stops evaluation and returns undefined if the value before ?. is null or undefined, instead of throwing. user?.address?.city, arr?.[0], callback?.()' },
    { level: 'intermediate', q: 'What is the difference between for...of and for...in?', a: 'for...of iterates the values of iterables (arrays, strings, Maps, Sets). for...in iterates the enumerable string keys of an object, including inherited ones; on arrays it gives index strings and is not recommended.' },
    { level: 'intermediate', q: 'What is short-circuit evaluation?', a: '&& stops at the first falsy value and || at the first truthy value; the remaining operands are never evaluated. It is used for defaults (name || "Guest") and conditional calls (isReady && start()).' },
  ],
  functions: [
    { level: 'basic', q: 'What is the difference between a function declaration and a function expression?', a: 'A declaration (function f() {}) is hoisted and can be called before its line. An expression (const f = function () {} or an arrow) is created when that line runs, so it cannot be called earlier.' },
    { level: 'intermediate', q: 'How are arrow functions different from regular functions?', a: 'They have no own this, arguments, super or new.target: they use the surrounding scope\'s values. They cannot be used as constructors. This makes them ideal for callbacks but wrong for object methods that need this.' },
    { level: 'intermediate', q: 'What is a closure? Give a practical use.', a: 'A function that keeps access to variables from the scope where it was created, even after that scope has returned. Uses: private state, factories, memoization, debounce, event handlers that remember data.', code: `function createCounter() {
  let count = 0;            // private
  return () => ++count;
}
const next = createCounter();
console.log(next(), next(), next()); // 1 2 3`, tryIt: true },
    { level: 'intermediate', q: 'What is a higher-order function?', a: 'A function that takes another function as an argument or returns one. map, filter, reduce, addEventListener and setTimeout are examples.' },
    { level: 'advanced', q: 'What is an IIFE and why was it used?', a: 'An Immediately Invoked Function Expression: (function () { ... })(). It creates a private scope so variables do not leak into the global scope. ES modules and block scope have replaced most uses.' },
  ],
  arrays: [
    { level: 'basic', q: 'What is the difference between map, filter and forEach?', a: 'map returns a new array of transformed items; filter returns a new array of items that passed a test; forEach just runs a function for each item and returns undefined.' },
    { level: 'intermediate', q: 'Which array methods mutate the original array?', a: 'push, pop, shift, unshift, splice, sort, reverse and fill. Non-mutating alternatives: concat, slice, map, filter, and the newer toSorted, toReversed, toSpliced and with.' },
    { level: 'intermediate', q: 'Why does [10, 1, 5].sort() give [1, 10, 5]?', a: 'Without a compare function, sort converts items to strings and compares them as text, so "10" comes before "5". Use sort((a, b) => a - b) for numbers.' },
    { level: 'intermediate', q: 'How does reduce work?', a: 'It walks the array, passing an accumulator and the current item to your callback, and returns the final accumulator. The second argument is the initial value; always provide it to avoid errors on empty arrays.', code: `const cart = [{ price: 100, qty: 2 }, { price: 50, qty: 3 }];
const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log(total); // 350`, tryIt: true },
    { level: 'advanced', q: 'How do you remove duplicates from an array?', a: '[...new Set(arr)] for primitives. For objects by a key: [...new Map(arr.map(o => [o.id, o])).values()] or filter with a Set of seen ids.' },
  ],
  objects: [
    { level: 'basic', q: 'What is the difference between dot and bracket notation?', a: 'Dot notation (obj.name) needs a valid identifier known at write time. Bracket notation (obj[key]) accepts any string, including spaces, and variables or expressions as the key.' },
    { level: 'intermediate', q: 'What is the difference between a shallow and a deep copy?', a: 'A shallow copy ({ ...obj } or Object.assign) copies only the top level; nested objects are still shared. A deep copy duplicates everything; use structuredClone(obj).' },
    { level: 'intermediate', q: 'What is the difference between Map and a plain object?', a: 'Map keys can be any type (objects, functions), it keeps insertion order, has a size property and is optimized for frequent additions and removals. Plain objects have string/symbol keys and inherited prototype properties.' },
    { level: 'intermediate', q: 'What does JSON.stringify skip?', a: 'Functions, undefined values and symbols are omitted (or become null in arrays). Dates become ISO strings, Maps and Sets become {}. Circular references throw an error.' },
    { level: 'advanced', q: 'How does Object.freeze differ from const?', a: 'const prevents reassigning the variable. Object.freeze prevents adding, removing or changing the object\'s properties, but only shallowly: nested objects can still change.' },
  ],
  dom: [
    { level: 'basic', q: 'What is the DOM?', a: 'The Document Object Model: a tree of objects representing the page that JavaScript can read and modify. Changes to the DOM update what the user sees.' },
    { level: 'intermediate', q: 'What is the difference between textContent and innerHTML?', a: 'textContent gets or sets plain text, safe for user input. innerHTML parses a string as HTML; inserting user data with it opens XSS vulnerabilities.' },
    { level: 'intermediate', q: 'Explain event bubbling and capturing.', a: 'An event travels from the window down to the target (capturing), then back up through the ancestors (bubbling). Listeners run in the bubbling phase by default; pass { capture: true } for the capture phase. event.stopPropagation() stops the journey.' },
    { level: 'intermediate', q: 'What is event delegation and why use it?', a: 'Adding one listener to a parent and using event.target (often with closest()) to see which child was clicked. It uses less memory and automatically works for elements added later.' },
    { level: 'advanced', q: 'What is the difference between event.target and event.currentTarget?', a: 'target is the element where the event started (for example the icon inside a button). currentTarget is the element whose listener is running right now (the button with the listener).' },
  ],
  async: [
    { level: 'basic', q: 'What is a Promise?', a: 'An object representing a value that will be available later. It is pending, then fulfilled with a value or rejected with an error. .then(), .catch() and .finally() (or await) handle the outcome.' },
    { level: 'intermediate', q: 'What is the difference between async/await and .then()?', a: 'They are the same mechanism. async/await lets you write promise code top to bottom with try/catch, which is easier to read for sequential steps. An async function always returns a promise.' },
    { level: 'intermediate', q: 'Does fetch reject on HTTP errors like 404?', a: 'No. fetch only rejects on network failures. For 404 or 500 it resolves with response.ok === false, so you must check response.ok (or status) and throw yourself.' },
    { level: 'advanced', q: 'What is the output order and why?', a: 'A, D, C, B. Synchronous code runs first (A, D). Then the microtask queue (promise callbacks: C). Then the next macrotask (setTimeout: B), even with a 0 ms delay.', code: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');`, tryIt: true },
    { level: 'intermediate', q: 'How do you run several async requests in parallel?', a: 'Start them all, then await Promise.all([...]). Awaiting each one in sequence takes the sum of their times; Promise.all takes only as long as the slowest. Use Promise.allSettled if some may fail.' },
  ],
  'classes-modules': [
    { level: 'basic', q: 'What is a class in JavaScript?', a: 'A cleaner syntax for constructor functions and prototypes. It has a constructor, methods shared through the prototype, static members, getters/setters and private #fields.' },
    { level: 'intermediate', q: 'What does super() do?', a: 'In a child class constructor it calls the parent constructor and must be called before using this. super.method() calls the parent\'s version of a method.' },
    { level: 'intermediate', q: 'What is the difference between named and default exports?', a: 'A module can have many named exports (imported with the same names in braces) and at most one default export (imported with any name, no braces). Named exports make refactoring and tree shaking easier.' },
    { level: 'advanced', q: 'How do private class fields work?', a: 'Fields starting with # (#balance) are only accessible inside the class body. Unlike the _underscore convention, access from outside is a syntax error, so the data is truly private.' },
  ],
  tooling: [
    { level: 'basic', q: 'What is the difference between dependencies and devDependencies?', a: 'dependencies are needed at runtime by the app. devDependencies are only needed for development: build tools, test runners, linters. Production installs can skip devDependencies.' },
    { level: 'intermediate', q: 'What do the ^ and ~ symbols in package.json mean?', a: '^1.4.2 allows minor and patch updates (1.x.x). ~1.4.2 allows only patch updates (1.4.x). The exact versions installed are recorded in package-lock.json.' },
    { level: 'intermediate', q: 'What does a bundler like Vite do?', a: 'Resolves imports between files and packages, transforms code (JSX, TypeScript), bundles and minifies it, removes unused code (tree shaking), splits it into chunks and serves a fast dev server with hot module replacement.' },
  ],
  'browser-apis': [
    { level: 'basic', q: 'What is the difference between localStorage, sessionStorage and cookies?', a: 'localStorage persists until cleared (~5MB). sessionStorage is cleared when the tab closes. Cookies are small (~4KB), sent with every request to the server, and can be httpOnly (unreadable by JavaScript), which is safer for auth tokens.' },
    { level: 'intermediate', q: 'Why use IntersectionObserver instead of a scroll listener?', a: 'Scroll listeners fire constantly and often force layout calculations. IntersectionObserver tells you asynchronously when elements enter or leave the viewport, efficiently, which is ideal for lazy loading and infinite scroll.' },
    { level: 'intermediate', q: 'Why use requestAnimationFrame for animations?', a: 'It runs your code right before the next screen repaint, keeping animations smooth and in sync with the display, and it pauses automatically in background tabs to save battery.' },
    { level: 'advanced', q: 'What is a service worker?', a: 'A script running in the background, separate from the page, that can intercept network requests, cache responses, enable offline use and receive push notifications. It only works on https and is the core of a Progressive Web App.' },
  ],
  advanced: [
    { level: 'intermediate', q: 'Explain the event loop.', a: 'JavaScript runs one task at a time on the call stack. When the stack is empty, the event loop runs all pending microtasks (promise callbacks), then takes the next macrotask (timer, event, I/O callback), repeating forever. Rendering happens between tasks.' },
    { level: 'intermediate', q: 'How does this work?', a: 'It depends on the call: obj.method() → obj; a plain function call → undefined in strict mode; new F() → the new object; arrow functions → this of the surrounding scope; call/apply/bind → whatever you pass.' },
    { level: 'advanced', q: 'What is prototypal inheritance?', a: 'Every object has an internal link to a prototype object. When a property is missing, JavaScript looks it up the prototype chain until it reaches null. Classes are syntax built on this mechanism.' },
    { level: 'intermediate', q: 'What is the difference between call, apply and bind?', a: 'call and apply invoke a function immediately with a chosen this; call takes arguments one by one, apply as an array. bind returns a new function with this (and optionally some arguments) permanently fixed.' },
    { level: 'advanced', q: 'Implement debounce.', a: 'Debounce delays calling a function until it has not been called for a given time, using a closure that clears and restarts a timer on every call.', code: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
const log = debounce(v => console.log('search:', v), 300);
log('j'); log('ja'); log('jav'); // only "search: jav" prints`, tryIt: true },
  ],
  'language-features': [
    { level: 'intermediate', q: 'What is a generator?', a: 'A function* that can pause with yield and resume when next() is called, producing values lazily. It returns an iterator, can represent infinite sequences and powers libraries like redux-saga.' },
    { level: 'intermediate', q: 'What makes an object iterable?', a: 'A [Symbol.iterator]() method that returns an iterator: an object with next() returning { value, done }. Iterables work with for...of, spread and destructuring.' },
    { level: 'advanced', q: 'What is the difference between Map and WeakMap?', a: 'WeakMap only accepts objects as keys and holds them weakly: if nothing else references a key, the entry can be garbage-collected. It is not iterable and has no size. Use it for private data or caches attached to objects.' },
    { level: 'advanced', q: 'What is a Proxy used for?', a: 'Intercepting operations on an object (get, set, has, deleteProperty...) through traps. It enables validation, logging, default values and reactivity systems like Vue 3\'s.' },
  ],
  functional: [
    { level: 'basic', q: 'What is a pure function?', a: 'A function that always returns the same output for the same input and has no side effects (no changing outside variables, no network or DOM access). Pure functions are easy to test, cache and reason about.' },
    { level: 'intermediate', q: 'What is currying?', a: 'Transforming f(a, b, c) into f(a)(b)(c): a chain of functions each taking one argument. It lets you create specialized functions from general ones, like const double = multiply(2).' },
    { level: 'intermediate', q: 'What is memoization?', a: 'Caching a function\'s results by its arguments so repeated calls return instantly. It only works safely for pure functions. React\'s useMemo applies the same idea.' },
    { level: 'intermediate', q: 'Why is immutability important in modern apps?', a: 'Creating new objects instead of changing existing ones makes changes easy to detect (a simple reference comparison), prevents accidental shared-state bugs and enables undo, time travel debugging and efficient re-rendering in React.' },
  ],
  'async-advanced': [
    { level: 'intermediate', q: 'Compare Promise.all, allSettled, race and any.', a: 'all: resolves with all results or rejects on the first failure. allSettled: waits for all and reports each status. race: settles with the first to finish, success or failure. any: resolves with the first success, rejects only if all fail.' },
    { level: 'intermediate', q: 'How do you cancel a fetch request?', a: 'Create an AbortController, pass controller.signal to fetch, then call controller.abort(). The fetch promise rejects with an AbortError. AbortSignal.timeout(ms) gives a built-in timeout.' },
    { level: 'advanced', q: 'What is a race condition in the UI and how do you prevent it?', a: 'When an older, slower request finishes after a newer one and overwrites its results (e.g. search as you type). Prevent it by aborting previous requests, ignoring stale responses with a request id or flag, or using a data library that handles it.' },
    { level: 'advanced', q: 'When would you use a Web Worker?', a: 'For CPU-heavy work (image processing, parsing large files, complex calculations) that would otherwise freeze the main thread. Workers run in parallel, have no DOM access and communicate with postMessage.' },
  ],
  'performance-security': [
    { level: 'intermediate', q: 'What causes layout thrashing?', a: 'Alternating DOM writes and layout reads (offsetHeight, getBoundingClientRect) in a loop, forcing the browser to recalculate layout every time. Batch reads first, then writes, or use DocumentFragment and requestAnimationFrame.' },
    { level: 'intermediate', q: 'What are common causes of memory leaks in JavaScript?', a: 'Timers that are never cleared, event listeners that are never removed, ever-growing caches or arrays, closures holding large objects, and references to removed DOM elements.' },
    { level: 'intermediate', q: 'What is XSS and how do you prevent it?', a: 'Cross-Site Scripting: attacker-controlled input runs as script in other users\' browsers. Prevent it by inserting user data with textContent (not innerHTML), sanitizing any HTML you must render (DOMPurify), avoiding eval, and setting a Content Security Policy.' },
    { level: 'advanced', q: 'What is CSRF and how is it mitigated?', a: 'Cross-Site Request Forgery tricks a logged-in user\'s browser into sending an unwanted request with their cookies. Mitigations: SameSite cookies, CSRF tokens on state-changing requests and checking the Origin header.' },
  ],
  patterns: [
    { level: 'intermediate', q: 'What is the observer (pub/sub) pattern?', a: 'Subscribers register interest in events; the publisher notifies all of them when something happens, without knowing who they are. DOM events, Node\'s EventEmitter and state stores use it. Always provide unsubscribe to avoid leaks.' },
    { level: 'intermediate', q: 'What is the module pattern?', a: 'Hiding private state and functions inside a closure (or an ES module) and exposing only a small public API. It prevents global namespace pollution and accidental changes.' },
    { level: 'intermediate', q: 'What is the strategy pattern?', a: 'Encapsulating interchangeable algorithms behind a common interface and choosing one at runtime, for example a map of shipping cost functions instead of a long if/else chain.' },
    { level: 'advanced', q: 'What are the downsides of the singleton pattern?', a: 'It is global state in disguise: hidden dependencies, harder testing (state leaks between tests) and tight coupling. Prefer passing dependencies explicitly or a module that exports one instance.' },
  ],
  testing: [
    { level: 'basic', q: 'What are unit, integration and end-to-end tests?', a: 'Unit tests check one function or component in isolation. Integration tests check several parts working together. End-to-end tests drive the real app in a browser like a user. A healthy suite has many unit tests and few E2E tests (the testing pyramid).' },
    { level: 'intermediate', q: 'What is the difference between toBe and toEqual in Jest?', a: 'toBe checks strict equality (Object.is), right for primitives and identical references. toEqual compares contents recursively, right for objects and arrays.' },
    { level: 'intermediate', q: 'What is mocking?', a: 'Replacing a real dependency (network, timer, module) with a controlled fake so tests are fast, deterministic and can simulate errors. Examples: jest.fn(), vi.mock(), fake timers, MSW for HTTP.' },
    { level: 'intermediate', q: 'What is TDD?', a: 'Test-Driven Development: write a failing test (red), write the minimum code to pass it (green), then refactor while keeping tests green. It leads to testable design and fewer regressions.' },
  ],
  projects: [
    { level: 'intermediate', q: 'How would you structure a vanilla JavaScript app without a framework?', a: 'Keep state in one place, write a render() function that rebuilds the UI from state, update state only through functions, use event delegation for user actions, and persist state (localStorage or an API) after changes.' },
    { level: 'intermediate', q: 'How do you safely display user input in a to-do app?', a: 'Use textContent or createTextNode for the text, never innerHTML with raw input, and validate/trim input before saving.' },
    { level: 'intermediate', q: 'How do you handle errors when calling an API?', a: 'Wrap the call in try/catch, check response.ok, show a clear message with a retry option, log details for debugging, and handle loading and empty states as well as success.' },
  ],
  interview: [
    { level: 'intermediate', q: 'Why does a var loop with setTimeout print the same number?', a: 'var is function-scoped, so all callbacks share one i, which equals the final value by the time they run. let creates a new binding per iteration, so each callback sees its own value.', code: `for (var i = 0; i < 3; i++) setTimeout(() => console.log('var', i));
for (let j = 0; j < 3; j++) setTimeout(() => console.log('let', j));`, tryIt: true },
    { level: 'advanced', q: 'Implement a simple Promise.all.', a: 'Return a new promise that collects each result at its index and resolves when all are done, or rejects on the first error.', code: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let done = 0;
    if (promises.length === 0) resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p).then(value => {
        results[i] = value;
        if (++done === promises.length) resolve(results);
      }, reject);
    });
  });
}
promiseAll([1, Promise.resolve(2), new Promise(r => setTimeout(() => r(3), 100))])
  .then(console.log); // [1, 2, 3]`, tryIt: true },
    { level: 'advanced', q: 'Write a function that deep-flattens an array.', a: 'Use recursion with reduce, or the built-in arr.flat(Infinity).', code: `const flatten = arr => arr.reduce((acc, x) => acc.concat(Array.isArray(x) ? flatten(x) : x), []);
console.log(flatten([1, [2, [3, [4]]], 5])); // [1, 2, 3, 4, 5]
console.log([1, [2, [3, [4]]]].flat(Infinity));`, tryIt: true },
    { level: 'basic', q: 'How should you approach a coding question in an interview?', a: 'Clarify inputs, outputs and edge cases; explain a simple solution first; write it while thinking aloud; test with examples including empty and unusual input; then discuss time/space complexity and improvements.' },
  ],
};
