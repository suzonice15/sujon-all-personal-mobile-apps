// Vue chapter: Projects. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'projects',
  title: 'Projects',
  description: 'Build three real Vue apps',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'vue-project-structure',
      title: 'Structuring a Vue Project',
      blocks: [
        { type: 'code', lang: 'text', value: `src/
├── main.js
├── App.vue
├── router/index.js
├── stores/           Pinia stores: auth.js, cart.js
├── composables/      useFetch.js, useDebounce.js
├── components/
│   ├── ui/           BaseButton.vue, BaseModal.vue (generic)
│   └── course/       CourseCard.vue, LessonList.vue (feature)
├── views/            one component per route: HomeView.vue
├── services/api.js   all network calls
└── assets/` },
        { type: 'list', items: [
          'Component files in PascalCase, multi-word names: CourseCard.vue, not Card.vue.',
          'Prefix generic UI components with Base: BaseButton, BaseInput.',
          'Views are thin: they combine components and stores; logic lives in composables and stores.',
          'Follow the official Vue Style Guide; ESLint plugin vue enforces it.',
        ] },
      ],
    },
    {
      id: 'vue-project-tasks',
      title: 'Project 1: Task Manager',
      blocks: [
        { type: 'text', value: 'A complete task manager: add, edit in place, complete, filter and clear tasks, with counts from computed properties and automatic saving through a watcher.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, computed, watch, nextTick } from 'vue';

const tasks = ref(JSON.parse(localStorage.getItem('vue-tasks') || '[]'));
const text = ref('');
const filter = ref('all');
const editingId = ref(null);
const draft = ref('');

watch(tasks, value => localStorage.setItem('vue-tasks', JSON.stringify(value)), { deep: true });

const visible = computed(() =>
  tasks.value.filter(t => (filter.value === 'all' ? true : filter.value === 'done' ? t.done : !t.done)));
const left = computed(() => tasks.value.filter(t => !t.done).length);

function add() {
  if (!text.value.trim()) return;
  tasks.value.push({ id: Date.now(), text: text.value.trim(), done: false });
  text.value = '';
}
async function startEdit(task) {
  editingId.value = task.id;
  draft.value = task.text;
  await nextTick();
  document.querySelector('.edit-input')?.focus();
}
function saveEdit(task) {
  task.text = draft.value.trim() || task.text;
  editingId.value = null;
}
const remove = id => { tasks.value = tasks.value.filter(t => t.id !== id); };
const clearDone = () => { tasks.value = tasks.value.filter(t => !t.done); };
</script>

<template>
  <div class="app">
    <h2>Tasks</h2>
    <form @submit.prevent="add">
      <input v-model="text" placeholder="Add a task" />
      <button>Add</button>
    </form>
    <p>
      <button v-for="f in ['all', 'open', 'done']" :key="f" :class="{ on: filter === f }" @click="filter = f">{{ f }}</button>
    </p>
    <ul>
      <li v-for="task in visible" :key="task.id">
        <input type="checkbox" v-model="task.done" />
        <input v-if="editingId === task.id" class="edit-input" v-model="draft"
               @keyup.enter="saveEdit(task)" @blur="saveEdit(task)" />
        <span v-else :class="{ done: task.done }" @dblclick="startEdit(task)">{{ task.text }}</span>
        <button @click="remove(task.id)">✕</button>
      </li>
    </ul>
    <p>{{ left }} left · <button @click="clearDone">Clear done</button></p>
    <small>Double-tap a task to edit it.</small>
  </div>
</template>

<style>
.app { max-width: 420px; margin: auto; font-family: sans-serif; }
li { display: flex; gap: 8px; align-items: center; padding: 6px; border-bottom: 1px solid #e2e8f0; list-style: none; }
li span { flex: 1; }
.done { text-decoration: line-through; color: #94a3b8; }
button.on { background: #2f855a; color: white; }
</style>` },
      ],
    },
    {
      id: 'vue-project-search',
      title: 'Project 2: Live Country Search',
      blocks: [
        { type: 'text', value: 'Search a real public API while typing, with a debounced watcher, request cancellation, loading and error states and a details card.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, watch } from 'vue';

const query = ref('');
const results = ref([]);
const loading = ref(false);
const error = ref('');
const selected = ref(null);
let timer;
let controller;

watch(query, q => {
  clearTimeout(timer);
  timer = setTimeout(() => search(q.trim()), 400);   // debounce
});

async function search(q) {
  controller?.abort();                                // cancel the previous request
  if (q.length < 2) { results.value = []; return; }
  controller = new AbortController();
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch('https://restcountries.com/v3.1/name/' + encodeURIComponent(q) +
      '?fields=name,flags,capital,population,cca3', { signal: controller.signal });
    if (res.status === 404) { results.value = []; return; }
    if (!res.ok) throw new Error('HTTP ' + res.status);
    results.value = (await res.json()).slice(0, 10);
  } catch (e) {
    if (e.name !== 'AbortError') error.value = e.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <input v-model="query" placeholder="Search a country, e.g. bang" style="width: 100%; padding: 10px" />
  <p v-if="loading">Searching...</p>
  <p v-else-if="error" style="color: crimson">{{ error }}</p>
  <p v-else-if="query.length >= 2 && !results.length">No results.</p>

  <div v-if="selected" style="background: #f0fdf4; padding: 10px; border-radius: 10px; margin: 8px 0">
    <img :src="selected.flags.png" alt="" width="80" />
    <h3>{{ selected.name.common }}</h3>
    <p>Capital: {{ selected.capital?.[0] ?? 'N/A' }} · Population: {{ selected.population.toLocaleString() }}</p>
    <button @click="selected = null">Close</button>
  </div>

  <ul style="list-style: none; padding: 0">
    <li v-for="c in results" :key="c.cca3" @click="selected = c" style="display: flex; gap: 8px; padding: 6px; cursor: pointer">
      <img :src="c.flags.png" alt="" width="32" /> {{ c.name.common }}
    </li>
  </ul>
</template>` },
      ],
    },
    {
      id: 'vue-project-shop',
      title: 'Project 3: Shop with a Shared Store',
      blocks: [
        { type: 'text', value: 'A mini shop: product grid with category filter, a shared cart store used by several components, quantity controls and a checkout modal rendered with Teleport. In a real project the store would be a Pinia store in stores/cart.js.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, reactive, computed, defineComponent } from 'vue';

const PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', price: 850, category: 'Accessories' },
  { id: 2, name: 'Mechanical Keyboard', price: 4200, category: 'Accessories' },
  { id: 3, name: '24" Monitor', price: 14500, category: 'Displays' },
  { id: 4, name: 'USB-C Hub', price: 1900, category: 'Accessories' },
  { id: 5, name: 'Portable SSD 1TB', price: 9800, category: 'Storage' },
];

// Shared store (with Pinia: defineStore('cart', () => { ... }))
const cart = reactive({
  qty: {},
  add(id) { this.qty[id] = (this.qty[id] || 0) + 1; },
  remove(id) { if (this.qty[id] > 1) this.qty[id]--; else delete this.qty[id]; },
  clear() { this.qty = {}; },
});
const lines = computed(() => Object.entries(cart.qty).map(([id, qty]) => ({ ...PRODUCTS.find(p => p.id === Number(id)), qty })));
const total = computed(() => lines.value.reduce((s, l) => s + l.price * l.qty, 0));
const count = computed(() => lines.value.reduce((s, l) => s + l.qty, 0));

const ProductCard = defineComponent({
  props: { product: Object },
  setup() { return { cart }; },
  template: \`
    <div class="card">
      <strong>{{ product.name }}</strong>
      <p>{{ product.price.toLocaleString() }} tk</p>
      <button v-if="!cart.qty[product.id]" @click="cart.add(product.id)">Add to cart</button>
      <span v-else><button @click="cart.remove(product.id)">−</button> {{ cart.qty[product.id] }} <button @click="cart.add(product.id)">+</button></span>
    </div>\`,
});

const category = ref('All');
const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
const shown = computed(() => (category.value === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === category.value)));
const checkout = ref(false);

function placeOrder() {
  console.log('Order placed:', total.value, 'tk');
  cart.clear();
  checkout.value = false;
}
</script>

<template>
  <header class="top">
    <h2>TechShop</h2>
    <button :disabled="!count" @click="checkout = true">🛒 {{ count }} · {{ total.toLocaleString() }} tk</button>
  </header>
  <p><button v-for="c in categories" :key="c" :class="{ on: c === category }" @click="category = c">{{ c }}</button></p>
  <div class="grid">
    <ProductCard v-for="p in shown" :key="p.id" :product="p" />
  </div>

  <Teleport to="body">
    <div v-if="checkout" class="backdrop" @click.self="checkout = false">
      <div class="modal">
        <h3>Checkout</h3>
        <p v-for="l in lines" :key="l.id">{{ l.name }} × {{ l.qty }}: {{ (l.price * l.qty).toLocaleString() }} tk</p>
        <h4>Total: {{ total.toLocaleString() }} tk</h4>
        <button @click="placeOrder">Place order</button> <button @click="checkout = false">Cancel</button>
      </div>
    </div>
  </Teleport>
</template>

<style>
.top { display: flex; justify-content: space-between; align-items: center; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; }
.card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; }
button.on { font-weight: bold; }
.backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: grid; place-items: center; }
.modal { background: white; padding: 16px; border-radius: 12px; width: 280px; }
</style>` },
        { type: 'note', value: 'Great work: you have built three real Vue apps. Add Vue Router, Pinia and TypeScript to them and put them in your portfolio.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'projects', q: 'Why use multi-word component names like CourseCard?', options: ['They load faster', 'To avoid clashing with current and future HTML elements', 'Vue requires three words', 'For SEO'], answer: 1, explain: 'A name like Card could collide with a native element.' },
    { chapterId: 'projects', q: 'In the task manager, why use watch with { deep: true }?', options: ['To watch the URL', 'So editing a task\'s properties also triggers saving', 'To animate tasks', 'It is required by localStorage'], answer: 1, explain: 'A shallow watcher only reacts when the array is replaced.' },
    { chapterId: 'projects', q: 'In the search app, why abort the previous request?', options: ['To save battery only', 'So an outdated response cannot replace newer results', 'Vue requires it', 'To avoid CSS bugs'], answer: 1, explain: 'This prevents race conditions while typing.' },
  ],
};
