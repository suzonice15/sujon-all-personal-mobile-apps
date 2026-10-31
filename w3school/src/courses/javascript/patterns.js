// JavaScript chapter: Design Patterns. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'patterns',
  title: 'Design Patterns',
  description: 'Proven ways to structure larger programs',
  icon: 'architecture',
  lessons: [
    {
      id: 'js-module-factory',
      title: 'Module and Factory Patterns',
      blocks: [
        { type: 'text', value: 'Design patterns are reusable solutions to common problems. The module pattern hides private details and exposes a small public API. A factory is a function that builds and returns objects.' },
        { type: 'code', lang: 'js', tryIt: true, value: `// Module pattern with a closure (an IIFE: runs immediately)
const cartModule = (() => {
  const items = [];                       // private
  const priceOf = item => item.price * item.qty;

  return {                                // public API
    add(item) { items.push(item); },
    total() { return items.reduce((sum, i) => sum + priceOf(i), 0); },
    count() { return items.length; },
  };
})();

cartModule.add({ name: 'Pen', price: 20, qty: 3 });
cartModule.add({ name: 'Book', price: 350, qty: 1 });
console.log(cartModule.count(), cartModule.total()); // 2 410
console.log(cartModule.items);                       // undefined: private

// Factory
function createUser(name, role = 'student') {
  return {
    name,
    role,
    canEdit: role === 'teacher',
    describe() { return \`\${name} (\${role})\`; },
  };
}
console.log(createUser('Rahim').describe());
console.log(createUser('Ms. Sara', 'teacher').canEdit);` },
        { type: 'note', value: 'Today ES modules (import/export) give you the module pattern for free: anything not exported stays private to the file.' },
      ],
    },
    {
      id: 'js-observer',
      title: 'Observer (Pub/Sub) Pattern',
      blocks: [
        { type: 'text', value: 'In the observer pattern, objects subscribe to events and get notified when something happens. The publisher does not need to know who is listening. DOM events, Node\'s EventEmitter and state libraries all use it.' },
        { type: 'code', lang: 'js', tryIt: true, value: `class EventBus {
  #handlers = new Map();

  on(event, handler) {
    if (!this.#handlers.has(event)) this.#handlers.set(event, new Set());
    this.#handlers.get(event).add(handler);
    return () => this.#handlers.get(event).delete(handler); // unsubscribe
  }

  emit(event, data) {
    this.#handlers.get(event)?.forEach(handler => handler(data));
  }
}

const bus = new EventBus();

const stopBadge = bus.on('lesson:done', ({ title }) => console.log('🏅 Badge for', title));
bus.on('lesson:done', ({ coins }) => console.log('💰 +' + coins + ' coins'));
bus.on('lesson:done', () => console.log('📊 Progress saved'));

bus.emit('lesson:done', { title: 'Closures', coins: 10 });

stopBadge();  // unsubscribe one listener
bus.emit('lesson:done', { title: 'Promises', coins: 10 });` },
        { type: 'note', value: 'Always provide a way to unsubscribe. Forgotten subscriptions are a classic memory leak.' },
      ],
    },
    {
      id: 'js-strategy-singleton',
      title: 'Strategy and Singleton Patterns',
      blocks: [
        { type: 'heading', value: 'Strategy: swap behavior instead of long if/else chains' },
        { type: 'code', lang: 'js', tryIt: true, value: `const shippingStrategies = {
  standard: weight => 60 + weight * 10,
  express: weight => 120 + weight * 15,
  pickup: () => 0,
};

function shippingCost(method, weight) {
  const strategy = shippingStrategies[method];
  if (!strategy) throw new Error('Unknown method: ' + method);
  return strategy(weight);
}

console.log(shippingCost('standard', 2)); // 80
console.log(shippingCost('express', 2));  // 150
console.log(shippingCost('pickup', 2));   // 0
// Adding a new method = adding one line, no if/else to edit` },
        { type: 'heading', value: 'Singleton: exactly one shared instance' },
        { type: 'code', lang: 'js', tryIt: true, value: `class Settings {
  static #instance = null;
  static get() {
    if (!Settings.#instance) Settings.#instance = new Settings();
    return Settings.#instance;
  }
  theme = 'light';
}

const a = Settings.get();
const b = Settings.get();
a.theme = 'dark';
console.log(b.theme, a === b); // "dark" true` },
        { type: 'note', value: 'Use singletons sparingly. Shared global state makes code harder to test. A module that exports one object is usually enough.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'patterns', q: 'What is the main goal of the module pattern?', options: ['Faster code', 'Hiding private details behind a small public API', 'Making classes', 'Network requests'], answer: 1, explain: 'Only the returned object is public.' },
    { chapterId: 'patterns', q: 'In the observer pattern, what does emit() do?', options: ['Deletes listeners', 'Notifies every subscribed handler', 'Creates a class', 'Throws an error'], answer: 1, explain: 'Each handler for that event is called with the data.' },
    { chapterId: 'patterns', q: 'Which pattern replaces long if/else chains with interchangeable functions?', options: ['Singleton', 'Factory', 'Strategy', 'Observer'], answer: 2, explain: 'Each strategy is a separate function chosen by key.' },
    { chapterId: 'patterns', q: 'What does a singleton guarantee?', options: ['One instance shared everywhere', 'No instances', 'A new instance every call', 'Private methods'], answer: 0, explain: 'Every call returns the same object.' },
  ],
};
