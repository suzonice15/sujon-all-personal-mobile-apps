// Vue chapter: Composables. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'composables',
  title: 'Composables',
  description: 'Reusable stateful logic with the Composition API',
  icon: 'extension',
  lessons: [
    {
      id: 'vue-composables',
      title: 'Writing Composables',
      blocks: [
        { type: 'text', value: 'A composable is a function that uses Vue\'s reactivity APIs to share stateful logic between components. By convention its name starts with use. It is Vue\'s equivalent of React custom hooks.' },
        { type: 'code', lang: 'js', value: `// composables/useCounter.js
import { ref, computed } from 'vue';

export function useCounter(initial = 0, { min = -Infinity, max = Infinity } = {}) {
  const count = ref(initial);
  const isMax = computed(() => count.value >= max);
  const increment = () => { if (count.value < max) count.value++; };
  const decrement = () => { if (count.value > min) count.value--; };
  const reset = () => { count.value = initial; };
  return { count, isMax, increment, decrement, reset };   // return refs, not .value
}` },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

function useCounter(initial = 0, { min = -Infinity, max = Infinity } = {}) {
  const count = ref(initial);
  const isMax = computed(() => count.value >= max);
  const increment = () => { if (count.value < max) count.value++; };
  const decrement = () => { if (count.value > min) count.value--; };
  return { count, isMax, increment, decrement };
}

function useWindowWidth() {
  const width = ref(window.innerWidth);
  const update = () => { width.value = window.innerWidth; };
  onMounted(() => window.addEventListener('resize', update));
  onUnmounted(() => window.removeEventListener('resize', update));
  return width;
}

const { count, isMax, increment, decrement } = useCounter(1, { min: 1, max: 10 });
const tickets = useCounter(0, { min: 0, max: 4 });
const width = useWindowWidth();
</script>

<template>
  <p>Quantity: <button @click="decrement">−</button> {{ count }} <button @click="increment" :disabled="isMax">+</button></p>
  <p>Tickets: <button @click="tickets.decrement">−</button> {{ tickets.count.value }} <button @click="tickets.increment">+</button> (max 4)</p>
  <p>Window width: {{ width }}px</p>
</template>` },
        { type: 'note', value: 'Each call creates independent state. Return an object of refs so callers can destructure without losing reactivity.' },
      ],
    },
    {
      id: 'vue-use-fetch',
      title: 'A useFetch Composable',
      blocks: [
        { type: 'text', value: 'Data fetching is the most common composable. It returns data, error and loading refs, and refetches whenever a reactive URL changes.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, watchEffect, toValue } from 'vue';

function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  watchEffect(async (onCleanup) => {
    const controller = new AbortController();
    onCleanup(() => controller.abort());          // cancel when the URL changes
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(toValue(url), { signal: controller.signal });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      data.value = await res.json();
    } catch (e) {
      if (e.name !== 'AbortError') error.value = e.message;
    } finally {
      loading.value = false;
    }
  });

  return { data, error, loading };
}

const userId = ref(1);
const { data: posts, error, loading } = useFetch(() => 'https://jsonplaceholder.typicode.com/posts?_limit=3&userId=' + userId.value);
</script>

<template>
  <button v-for="id in 3" :key="id" @click="userId = id" :disabled="id === userId">User {{ id }}</button>
  <p v-if="loading">Loading...</p>
  <p v-else-if="error" style="color: crimson">{{ error }}</p>
  <ul v-else><li v-for="p in posts" :key="p.id">{{ p.title }}</li></ul>
</template>` },
        { type: 'note', value: 'toValue() accepts a plain value, a ref or a getter function. Accepting all three makes composables flexible for callers.' },
      ],
    },
    {
      id: 'vue-vueuse',
      title: 'VueUse: 200+ Ready-made Composables',
      blocks: [
        { type: 'text', value: 'VueUse is a huge collection of tested composables for common needs. Before writing your own, check whether VueUse already has it.' },
        { type: 'code', lang: 'text', value: `npm install @vueuse/core` },
        { type: 'code', lang: 'vue', value: `<script setup>
import { useLocalStorage, useDark, useToggle, useDebounceFn, useOnline, useClipboard } from '@vueuse/core';

const name = useLocalStorage('name', '');           // persisted ref
const isDark = useDark();                           // syncs a .dark class on <html>
const toggleDark = useToggle(isDark);
const online = useOnline();
const { copy, copied } = useClipboard();
const search = useDebounceFn(q => api.search(q), 400);
</script>

<template>
  <input v-model="name" @input="search(name)" />
  <button @click="toggleDark()">{{ isDark ? 'Light' : 'Dark' }} mode</button>
  <span>{{ online ? 'Online' : 'Offline' }}</span>
  <button @click="copy('CODENEST')">{{ copied ? 'Copied!' : 'Copy coupon' }}</button>
</template>` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'composables', q: 'What is a composable?', options: ['A CSS file', 'A function that reuses stateful logic with Vue\'s reactivity APIs', 'A component with a template', 'A router plugin'], answer: 1, explain: 'Like React custom hooks.' },
    { chapterId: 'composables', q: 'Why should a composable return refs instead of their .value?', options: ['Refs are smaller', 'So callers can destructure without losing reactivity', 'Vue requires it', 'For TypeScript only'], answer: 1, explain: 'A plain value would be a snapshot.' },
    { chapterId: 'composables', q: 'What does toValue() do?', options: ['Converts to a number', 'Reads a plain value, ref or getter uniformly', 'Creates a ref', 'Fetches data'], answer: 1, explain: 'It lets composables accept flexible inputs.' },
    { chapterId: 'composables', q: 'What is VueUse?', options: ['A UI kit', 'A collection of ready-made composables', 'A testing tool', 'A Vue version'], answer: 1, explain: 'useLocalStorage, useDark, useClipboard and many more.' },
  ],
};
