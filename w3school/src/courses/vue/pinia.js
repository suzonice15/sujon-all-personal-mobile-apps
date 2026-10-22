// Vue chapter: State Management with Pinia. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'pinia',
  title: 'State Management with Pinia',
  description: 'The official store for shared app state',
  icon: 'hub',
  lessons: [
    {
      id: 'vue-pinia-basics',
      title: 'Pinia Stores',
      blocks: [
        { type: 'text', value: 'Pinia is Vue\'s official state management library. A store holds state shared across the app (cart, user, settings) with devtools support and full TypeScript types.' },
        { type: 'code', lang: 'text', value: `npm install pinia` },
        { type: 'code', lang: 'js', value: `// main.js
import { createPinia } from 'pinia';
createApp(App).use(createPinia()).mount('#app');

// stores/cart.js: a "setup store" written like a composable
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);                                              // state
  const count = computed(() => items.value.reduce((n, i) => n + i.qty, 0));      // getter
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0));

  function add(product) {                                             // action
    const line = items.value.find(i => i.id === product.id);
    if (line) line.qty++;
    else items.value.push({ ...product, qty: 1 });
  }
  function remove(id) {
    items.value = items.value.filter(i => i.id !== id);
  }
  return { items, count, total, add, remove };
});` },
        { type: 'code', lang: 'vue', value: `<script setup>
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();
const { count, total } = storeToRefs(cart);   // destructure state/getters reactively
const { add } = cart;                          // actions can be destructured directly
</script>

<template>
  <button @click="add(product)">Add to cart</button>
  <span>🛒 {{ count }} · {{ total }} tk</span>
</template>` },
        { type: 'note', value: 'Destructuring the store directly breaks reactivity (like reactive objects). Use storeToRefs for state and getters.' },
      ],
    },
    {
      id: 'vue-store-pattern',
      title: 'The Store Pattern in Practice',
      blocks: [
        { type: 'text', value: 'Under the hood a store is reactive state shared between components. This runnable demo builds the same idea with plain Vue so you can see it work; in a real app use Pinia for devtools, SSR safety and plugins.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { reactive, computed, defineComponent } from 'vue';

// A tiny shared store (Pinia gives you this plus devtools and plugins)
const cart = reactive({
  items: [],
  add(product) {
    const line = this.items.find(i => i.id === product.id);
    line ? line.qty++ : this.items.push({ ...product, qty: 1 });
  },
});
const total = computed(() => cart.items.reduce((s, i) => s + i.price * i.qty, 0));

const ProductList = defineComponent({
  setup() {
    const products = [{ id: 1, name: 'Keyboard', price: 1500 }, { id: 2, name: 'Mouse', price: 600 }];
    return { products, cart };
  },
  template: \`<div><button v-for="p in products" :key="p.id" @click="cart.add(p)">Add {{ p.name }}</button></div>\`,
});

const CartBadge = defineComponent({
  setup() { return { cart, total }; },
  template: \`<p>🛒 {{ cart.items.length }} products · {{ total }} tk</p>\`,
});
</script>

<template>
  <CartBadge />
  <ProductList />
  <ul><li v-for="i in cart.items" :key="i.id">{{ i.name }} × {{ i.qty }}</li></ul>
</template>` },
      ],
    },
    {
      id: 'vue-pinia-advanced',
      title: 'Async Actions, Persistence and Testing Stores',
      blocks: [
        { type: 'code', lang: 'js', value: `export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(false);
  const isLoggedIn = computed(() => !!user.value);

  async function login(email, password) {
    loading.value = true;
    try {
      user.value = await api.login(email, password);
    } finally {
      loading.value = false;
    }
  }
  function logout() { user.value = null; }

  return { user, loading, isLoggedIn, login, logout };
});` },
        { type: 'list', items: [
          'Persist state with the pinia-plugin-persistedstate plugin (localStorage).',
          'Stores can use other stores: call useAuthStore() inside an action of another store.',
          'Test stores without components: setActivePinia(createPinia()) in beforeEach, then call actions.',
          'Server data (lists from an API) is often better handled by TanStack Vue Query than by a store.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'pinia', q: 'What is Pinia?', options: ['A CSS library', 'Vue\'s official state management library', 'A router', 'A test runner'], answer: 1, explain: 'It replaced Vuex as the recommended store.' },
    { chapterId: 'pinia', q: 'How should you destructure state from a Pinia store?', options: ['const { count } = store', 'storeToRefs(store)', 'toValue(store)', 'It is not possible'], answer: 1, explain: 'Plain destructuring breaks reactivity.' },
    { chapterId: 'pinia', q: 'In a setup store, what is a computed()?', options: ['State', 'A getter', 'An action', 'A plugin'], answer: 1, explain: 'refs are state, computed are getters, functions are actions.' },
  ],
};
