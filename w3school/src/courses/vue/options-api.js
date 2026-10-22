// Vue chapter: Options API and Vue 2 Migration. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'options-api',
  title: 'Options API and Vue 2 Migration',
  description: 'Read and maintain older Vue code with confidence',
  icon: 'history',
  lessons: [
    {
      id: 'vue-options-api',
      title: 'The Options API',
      blocks: [
        { type: 'text', value: 'Before the Composition API, Vue components were written with the Options API: an object with data, computed, methods, watch and lifecycle options, using this. Many existing projects and tutorials still use it, and it is fully supported in Vue 3.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<div id="app">
  <input v-model="name" placeholder="Your name" />
  <p>{{ greeting }}</p>
  <button @click="increment">Clicked {{ count }} times</button>
</div>

<script src="https://unpkg.com/vue@3.5.13/dist/vue.global.js"></script>
<script>
  Vue.createApp({
    data() {
      return { name: '', count: 0 };              // reactive state
    },
    computed: {
      greeting() { return 'Hello, ' + (this.name || 'stranger') + '!'; },
    },
    methods: {
      increment() { this.count++; },
    },
    watch: {
      count(newValue) { if (newValue === 5) console.log('Five clicks!'); },
    },
    mounted() {
      console.log('Mounted with count', this.count);
    },
  }).mount('#app');
</script>` },
        { type: 'list', items: [
          'data() → ref / reactive',
          'computed: {} → computed()',
          'methods: {} → plain functions',
          'watch: {} → watch()',
          'mounted() → onMounted()',
          'this.x → the variable directly',
        ] },
      ],
    },
    {
      id: 'vue-migration',
      title: 'Mixins, Vue 2 and Migrating to Vue 3',
      blocks: [
        { type: 'text', value: 'Vue 2 reached end of life at the end of 2023, so many companies are migrating. In Vue 2, logic was shared with mixins, which caused name clashes and unclear origins. Composables replace them.' },
        { type: 'code', lang: 'js', value: `// Vue 2 mixin: where does "loading" come from? Name clashes are silent.
export const fetchMixin = {
  data() { return { loading: false, items: [] }; },
  methods: {
    async load(url) {
      this.loading = true;
      this.items = await fetch(url).then(r => r.json());
      this.loading = false;
    },
  },
};

// Vue 3 composable: explicit, renamable, no clashes
export function useFetchList(url) {
  const loading = ref(false);
  const items = ref([]);
  async function load() {
    loading.value = true;
    items.value = await fetch(toValue(url)).then(r => r.json());
    loading.value = false;
  }
  return { loading, items, load };
}
// const { items: courses, loading: coursesLoading } = useFetchList('/api/courses');` },
        { type: 'heading', value: 'Main breaking changes from Vue 2 to Vue 3' },
        { type: 'list', items: [
          'new Vue({...}) became createApp(App).mount("#app")',
          'Global APIs (Vue.use, Vue.component) moved to the app instance',
          'Filters were removed: use computed properties or functions',
          'v-model on components uses modelValue / update:modelValue',
          '$on/$off event bus removed: use a small emitter library or Pinia',
          'Vuex is replaced by Pinia; Vue CLI is replaced by Vite',
        ] },
        { type: 'note', value: 'Large apps can migrate gradually with the @vue/compat build, which runs Vue 2 code on Vue 3 and warns about each deprecated feature.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'options-api', q: 'In the Options API, where is reactive state declared?', options: ['methods', 'data()', 'computed', 'props only'], answer: 1, explain: 'data returns the initial state object.' },
    { chapterId: 'options-api', q: 'What replaced mixins in Vue 3?', options: ['Filters', 'Composables', 'Directives', 'Plugins only'], answer: 1, explain: 'Composables are explicit and avoid name clashes.' },
    { chapterId: 'options-api', q: 'How is an app created in Vue 3?', options: ['new Vue()', 'createApp(App).mount("#app")', 'Vue.start()', 'Vue.render()'], answer: 1, explain: 'Global configuration now belongs to the app instance.' },
  ],
};
