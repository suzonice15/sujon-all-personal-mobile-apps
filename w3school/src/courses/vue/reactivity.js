// Vue chapter: Reactivity. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'reactivity',
  title: 'Reactivity',
  description: 'ref, reactive, computed and watchers',
  icon: 'bolt',
  lessons: [
    {
      id: 'vue-ref',
      title: 'ref()',
      blocks: [
        { type: 'text', value: 'ref() creates reactive state. It wraps a value in an object with a .value property. In <script> you read and write .value; in the template Vue unwraps it for you.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref } from 'vue';

const count = ref(0);
const name = ref('');
const todos = ref(['Learn ref', 'Learn computed']);

function increment() {
  count.value++;                 // .value in script
}
function addTodo() {
  todos.value.push('Task ' + (todos.value.length + 1));   // arrays can be mutated
}
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
  <p><input v-model="name" placeholder="Your name" /> Hello, {{ name || 'stranger' }}!</p>
  <button @click="addTodo">Add todo</button>
  <ul><li v-for="t in todos" :key="t">{{ t }}</li></ul>
</template>` },
        { type: 'note', value: 'Unlike React, you change Vue state directly (count.value++, todos.value.push()). Vue detects the change and updates the page.' },
      ],
    },
    {
      id: 'vue-reactive',
      title: 'reactive() and Its Limits',
      blocks: [
        { type: 'text', value: 'reactive() makes an object itself reactive, with no .value. It only works for objects, arrays, Maps and Sets, and it loses reactivity if you replace or destructure it.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { reactive, toRefs } from 'vue';

const form = reactive({ email: '', plan: 'free', agree: false });

// ❌ const { email } = form;  → email would be a plain string, not reactive
const { plan } = toRefs(form);  // ✅ toRefs keeps each property connected

function reset() {
  Object.assign(form, { email: '', plan: 'free', agree: false }); // keep the same object
}
</script>

<template>
  <input v-model="form.email" placeholder="Email" />
  <select v-model="form.plan"><option>free</option><option>pro</option></select>
  <label><input type="checkbox" v-model="form.agree" /> Agree</label>
  <p>Plan via toRefs: {{ plan }}</p>
  <pre>{{ form }}</pre>
  <button @click="reset">Reset</button>
</template>` },
        { type: 'note', value: 'The Vue team recommends ref() as the primary way to declare state: it works with any value type and survives destructuring when returned from composables.' },
      ],
    },
    {
      id: 'vue-computed',
      title: 'Computed Properties',
      blocks: [
        { type: 'text', value: 'A computed property derives a value from other reactive state. Vue caches the result and only recalculates when one of its dependencies changes.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, computed } from 'vue';

const items = ref([
  { name: 'Notebook', price: 120, qty: 2 },
  { name: 'Pen', price: 20, qty: 5 },
]);
const coupon = ref('');

const subtotal = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0));
const discount = computed(() => (coupon.value === 'SAVE10' ? subtotal.value * 0.1 : 0));
const total = computed(() => subtotal.value - discount.value);
</script>

<template>
  <div v-for="item in items" :key="item.name">
    {{ item.name }}: <input type="number" min="0" v-model.number="item.qty" style="width: 60px" />
  </div>
  <input v-model="coupon" placeholder="Coupon (try SAVE10)" />
  <p>Subtotal: {{ subtotal }} tk</p>
  <p v-if="discount">Discount: −{{ discount }} tk</p>
  <h3>Total: {{ total }} tk</h3>
</template>` },
        { type: 'note', value: 'Computed getters must be pure: no API calls, no changing other state. For side effects, use a watcher.' },
      ],
    },
    {
      id: 'vue-watchers',
      title: 'watch and watchEffect',
      blocks: [
        { type: 'text', value: 'Watchers run side effects when reactive data changes: saving to storage, fetching data, logging. watch() watches specific sources; watchEffect() tracks whatever it uses.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, watch, watchEffect } from 'vue';

const query = ref('');
const results = ref([]);
const theme = ref(localStorage.getItem('theme') || 'light');

// watch a specific source; receives new and old values
watch(query, (newQuery, oldQuery) => {
  console.log('query changed from', oldQuery, 'to', newQuery);
  results.value = ['HTML', 'CSS', 'JavaScript', 'Vue'].filter(c => c.toLowerCase().includes(newQuery.toLowerCase()));
}, { immediate: true });

// watchEffect runs immediately and re-runs when anything it reads changes
watchEffect(() => {
  localStorage.setItem('theme', theme.value);
});
</script>

<template>
  <input v-model="query" placeholder="Search courses" />
  <ul><li v-for="r in results" :key="r">{{ r }}</li></ul>
  <button @click="theme = theme === 'light' ? 'dark' : 'light'">Theme: {{ theme }}</button>
</template>` },
        { type: 'list', items: [
          '{ immediate: true }: also run once at the start',
          '{ deep: true }: watch nested changes inside an object',
          'Return a cleanup with onWatcherCleanup (or the third argument) to cancel old requests',
          'Prefer computed for derived values; use watchers only for side effects',
        ] },
      ],
    },
    {
      id: 'vue-reactivity-deep',
      title: 'How Vue Reactivity Works',
      blocks: [
        { type: 'text', value: 'Vue wraps reactive objects in JavaScript Proxies (you met Proxy in the JavaScript course). When a template or computed reads a property, Vue records it as a dependency. When the property is set, Vue re-runs exactly the effects that depend on it.' },
        { type: 'code', lang: 'js', tryIt: true, value: `// A tiny version of Vue's reactivity, to see the idea
let activeEffect = null;
const deps = new Map();

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      if (activeEffect) {
        if (!deps.has(key)) deps.set(key, new Set());
        deps.get(key).add(activeEffect);     // track
      }
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      deps.get(key)?.forEach(effect => effect()); // trigger
      return true;
    },
  });
}

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

const state = reactive({ price: 100, qty: 2 });
effect(() => console.log('Total is', state.price * state.qty));

state.qty = 3;      // logs automatically
state.price = 150;  // logs again` },
        { type: 'note', value: 'Because tracking happens through property access, destructuring a reactive object breaks it: the variables are plain values with no Proxy behind them.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'reactivity', q: 'How do you change a ref named count inside <script setup>?', options: ['count = 5', 'count.value = 5', 'setCount(5)', 'count.set(5)'], answer: 1, explain: 'Refs hold their value in .value; templates unwrap it automatically.' },
    { chapterId: 'reactivity', q: 'What happens if you destructure a reactive() object?', options: ['Nothing special', 'The variables lose reactivity', 'Vue throws an error', 'It becomes a ref'], answer: 1, explain: 'Use toRefs() to destructure while keeping reactivity.' },
    { chapterId: 'reactivity', q: 'What is special about computed properties?', options: ['They run on every render', 'They are cached until a dependency changes', 'They can fetch data', 'They need a dependency array'], answer: 1, explain: 'Vue tracks dependencies automatically.' },
    { chapterId: 'reactivity', q: 'When should you use a watcher instead of computed?', options: ['For derived values', 'For side effects like saving or fetching', 'Never', 'For CSS'], answer: 1, explain: 'Computed is for values; watchers are for effects.' },
    { chapterId: 'reactivity', q: 'What JavaScript feature does Vue 3 use to track reactive objects?', options: ['Object.observe', 'Proxy', 'setInterval', 'Web Workers'], answer: 1, explain: 'Proxies intercept get and set operations.' },
  ],
};
