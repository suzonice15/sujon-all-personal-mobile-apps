// Vue chapter: Performance. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'performance',
  title: 'Performance',
  description: 'Render less, react less, load less',
  icon: 'speed',
  lessons: [
    {
      id: 'vue-render-performance',
      title: 'Rendering Performance',
      blocks: [
        { type: 'text', value: 'Vue is fast by default because it only updates what depends on changed data. For large apps, a few tools help further.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, shallowRef, computed } from 'vue';

// shallowRef: only replacing .value triggers updates, not deep changes
const bigList = shallowRef(Array.from({ length: 3000 }, (_, i) => ({ id: i, name: 'Row ' + i })));
const query = ref('');
const filtered = computed(() => bigList.value.filter(r => r.name.includes(query.value)).slice(0, 50));
const clicks = ref(0);

function replaceList() {
  bigList.value = bigList.value.map(r => ({ ...r, name: r.name + '!' }));  // new array → update
}
</script>

<template>
  <input v-model="query" placeholder="Filter 3000 rows" />
  <button @click="replaceList">Replace list</button>
  <button @click="clicks++">Unrelated clicks: {{ clicks }}</button>
  <p v-once>Rendered once, never updated: {{ new Date().toLocaleTimeString() }}</p>
  <ul style="height: 140px; overflow: auto">
    <li v-for="row in filtered" :key="row.id">{{ row.name }}</li>
  </ul>
</template>` },
        { type: 'list', items: [
          'shallowRef / shallowReactive: skip deep tracking for large, immutable data',
          'v-once: render static content once',
          'v-memo="[deps]": skip re-rendering a list item unless its deps change',
          'computed caches results; avoid calling expensive methods in templates',
          'Virtualize very long lists (vue-virtual-scroller, @tanstack/vue-virtual)',
        ] },
      ],
    },
    {
      id: 'vue-bundle-performance',
      title: 'Loading Less Code',
      blocks: [
        { type: 'list', items: [
          'Lazy-load routes: component: () => import("./views/Admin.vue")',
          'defineAsyncComponent for heavy widgets such as charts and editors',
          'Import only what you use from libraries (tree shaking): import { debounce } from "lodash-es"',
          'Check bundle size with rollup-plugin-visualizer',
          'Use the Vue DevTools Performance tab to find slow components',
        ] },
        { type: 'code', lang: 'js', value: `const routes = [
  { path: '/', component: Home },                                   // in the main bundle
  { path: '/admin', component: () => import('./views/Admin.vue') },  // separate chunk
  { path: '/reports', component: () => import('./views/Reports.vue') },
];` },
        { type: 'note', value: 'Measure on a real mid-range phone. What feels instant on a laptop can be slow on a budget Android device.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'performance', q: 'When does a shallowRef trigger updates?', options: ['On any nested change', 'Only when .value is replaced', 'Never', 'Every second'], answer: 1, explain: 'It skips deep tracking for large data.' },
    { chapterId: 'performance', q: 'What does v-once do?', options: ['Runs an event once', 'Renders the content once and never updates it', 'Loads a component once', 'Caches API calls'], answer: 1, explain: 'Useful for static content.' },
    { chapterId: 'performance', q: 'How do you lazy-load a route component?', options: ['component: Admin', 'component: () => import("./Admin.vue")', 'lazy: true', 'v-lazy'], answer: 1, explain: 'A dynamic import creates a separate chunk.' },
  ],
};
