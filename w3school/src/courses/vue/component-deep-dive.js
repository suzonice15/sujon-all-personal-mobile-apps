// Vue chapter: Component Deep Dive. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'component-deep-dive',
  title: 'Component Deep Dive',
  description: 'Attributes, exposed methods, generics and plugins',
  icon: 'widgets',
  lessons: [
    {
      id: 'vue-fallthrough-attrs',
      title: 'Fallthrough Attributes ($attrs)',
      blocks: [
        { type: 'text', value: 'Attributes passed to a component that are not declared as props or emits (class, style, id, aria-*, event listeners) "fall through" to its root element automatically. This is how wrapper components like BaseButton stay flexible.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { defineComponent } from 'vue';

// Root element receives class, style, disabled, @click... automatically
const BaseButton = defineComponent({
  props: { variant: { type: String, default: 'primary' } },
  template: \`<button :class="['btn', 'btn-' + variant]"><slot /></button>\`,
});

// Put attributes on an inner element instead of the root
const BaseInput = defineComponent({
  inheritAttrs: false,
  props: { label: String },
  template: \`
    <label class="field">
      {{ label }}
      <input v-bind="$attrs" />
    </label>\`,
});
</script>

<template>
  <BaseButton class="wide" @click="console.log('clicked')" title="Saves your work">Save</BaseButton>
  <BaseButton variant="danger" disabled>Delete</BaseButton>
  <BaseInput label="Email" type="email" placeholder="you@example.com" autofocus />
</template>

<style>
.btn { border: 0; padding: 8px 14px; border-radius: 8px; color: white; margin: 4px; }
.btn-primary { background: #2f855a; }
.btn-danger { background: #dc2626; }
.btn:disabled { opacity: .5; }
.wide { width: 140px; }
.field { display: block; margin-top: 10px; }
</style>` },
        { type: 'note', value: 'Without inheritAttrs: false, BaseInput would put type and placeholder on the <label>, not the <input>. In <script setup> use defineOptions({ inheritAttrs: false }) and useAttrs().' },
      ],
    },
    {
      id: 'vue-define-expose',
      title: 'Component Refs and defineExpose',
      blocks: [
        { type: 'text', value: 'A parent can hold a ref to a child component. With <script setup>, components are closed by default; defineExpose chooses what the parent may call, such as focus() or reset().' },
        { type: 'code', lang: 'vue', value: `<!-- SearchBox.vue -->
<script setup>
import { ref, useTemplateRef } from 'vue';
const query = ref('');
const input = useTemplateRef('input');

defineExpose({
  focus: () => input.value.focus(),
  clear: () => { query.value = ''; },
});
</script>

<template><input ref="input" v-model="query" /></template>

<!-- Parent.vue -->
<script setup>
import { useTemplateRef } from 'vue';
import SearchBox from './SearchBox.vue';
const search = useTemplateRef('search');
</script>

<template>
  <SearchBox ref="search" />
  <button @click="search.focus()">Focus</button>
  <button @click="search.clear()">Clear</button>
</template>` },
        { type: 'note', value: 'Prefer props and events. Use exposed methods only for imperative actions like focus, scroll or play.' },
      ],
    },
    {
      id: 'vue-generic-components',
      title: 'Generic Components and Typed Slots',
      blocks: [
        { type: 'text', value: 'With the generic attribute, a component\'s props and slots can be typed by the data you pass in, like TypeScript generics. A reusable select or table knows the exact shape of its items.' },
        { type: 'code', lang: 'vue', value: `<!-- DataTable.vue -->
<script setup lang="ts" generic="T extends { id: string | number }">
defineProps<{
  rows: T[];
  columns: { key: keyof T; label: string }[];
}>();

defineSlots<{
  cell(props: { row: T; key: keyof T }): any;
}>();
</script>

<template>
  <table>
    <thead><tr><th v-for="c in columns" :key="String(c.key)">{{ c.label }}</th></tr></thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td v-for="c in columns" :key="String(c.key)">
          <slot name="cell" :row="row" :key="c.key">{{ row[c.key] }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>` },
        { type: 'note', value: 'Your editor now autocompletes row fields inside the cell slot and flags a column key that does not exist on T.' },
      ],
    },
    {
      id: 'vue-plugins',
      title: 'Writing Plugins',
      blocks: [
        { type: 'text', value: 'A plugin adds app-wide features: global components, directives, provided services or configuration. Vue Router and Pinia are plugins. A plugin is an object with an install(app, options) method.' },
        { type: 'code', lang: 'js', value: `// plugins/toast.js
import { reactive } from 'vue';
import ToastContainer from './ToastContainer.vue';

export const toastPlugin = {
  install(app, { duration = 3000 } = {}) {
    const toasts = reactive([]);
    const toast = {
      show(message, type = 'info') {
        const id = Date.now();
        toasts.push({ id, message, type });
        setTimeout(() => toasts.splice(toasts.findIndex(t => t.id === id), 1), duration);
      },
      success: m => toast.show(m, 'success'),
      error: m => toast.show(m, 'error'),
    };
    app.provide('toast', toast);                  // inject('toast') in components
    app.component('ToastContainer', ToastContainer);
    app.provide('toasts', toasts);
  },
};

// main.js
createApp(App).use(toastPlugin, { duration: 2500 }).mount('#app');

// any component
const toast = inject('toast');
toast.success('Lesson saved!');` },
        { type: 'note', value: 'Wrap inject in a composable (export const useToast = () => inject("toast")) so components get a clean, typed API.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'component-deep-dive', q: 'Where do undeclared attributes like class and id go by default?', options: ['They are dropped', 'To the component\'s root element', 'To every child', 'Into props'], answer: 1, explain: 'This is called attribute fallthrough.' },
    { chapterId: 'component-deep-dive', q: 'How do you put $attrs on an inner element instead of the root?', options: ['inheritAttrs: false and v-bind="$attrs"', 'v-attrs', 'emits: ["attrs"]', 'It is impossible'], answer: 0, explain: 'Turn off automatic inheritance, then bind them where you want.' },
    { chapterId: 'component-deep-dive', q: 'What does defineExpose do?', options: ['Exports a component', 'Chooses what a parent can access through a template ref', 'Shows hidden props', 'Exposes CSS'], answer: 1, explain: '<script setup> components are closed by default.' },
    { chapterId: 'component-deep-dive', q: 'What does a Vue plugin need?', options: ['A template', 'An install(app, options) method', 'A store', 'A router'], answer: 1, explain: 'app.use(plugin) calls install.' },
  ],
};
