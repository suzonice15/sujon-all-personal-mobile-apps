// Vue chapter: Components. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Runnable multi-component demos define children with defineComponent() in the
// same file; in a real project each one is its own .vue file.

export default {
  id: 'components',
  title: 'Components',
  description: 'Props, events, v-model, slots and provide/inject',
  icon: 'widgets',
  lessons: [
    {
      id: 'vue-props',
      title: 'Props',
      blocks: [
        { type: 'text', value: 'Props pass data from a parent to a child component. Declare them with defineProps. Props are read-only in the child.' },
        { type: 'code', lang: 'vue', value: `<!-- CourseCard.vue -->
<script setup>
const props = defineProps({
  title: { type: String, required: true },
  lessons: { type: Number, default: 0 },
  color: { type: String, default: '#42b883' },
  isNew: Boolean,
});
</script>

<template>
  <div class="card" :style="{ borderLeftColor: color }">
    <h3>{{ title }} <small v-if="isNew">NEW</small></h3>
    <p>{{ lessons }} lessons</p>
  </div>
</template>` },
        { type: 'code', lang: 'vue', value: `<!-- App.vue -->
<script setup>
import CourseCard from './components/CourseCard.vue';
</script>

<template>
  <CourseCard title="HTML" :lessons="52" color="#e44d26" />
  <CourseCard title="Vue" :lessons="60" is-new />
</template>` },
        { type: 'text', value: 'Try it with both components in one file:' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { defineComponent } from 'vue';

const CourseCard = defineComponent({
  props: {
    title: { type: String, required: true },
    lessons: { type: Number, default: 0 },
    color: { type: String, default: '#42b883' },
    isNew: Boolean,
  },
  template: \`
    <div :style="{ borderLeft: '6px solid ' + color, padding: '10px', margin: '8px 0', background: '#f8fafc', borderRadius: '8px' }">
      <strong>{{ title }}</strong> <small v-if="isNew" style="color: crimson">NEW</small>
      <div>{{ lessons }} lessons</div>
    </div>\`,
});
</script>

<template>
  <CourseCard title="HTML" :lessons="52" color="#e44d26" />
  <CourseCard title="CSS" :lessons="56" color="#2965f1" />
  <CourseCard title="Vue" :lessons="60" is-new />
</template>` },
        { type: 'note', value: 'Use :lessons="52" (with a colon) for numbers, booleans and variables. Without the colon, the value is always a string.' },
      ],
    },
    {
      id: 'vue-emits',
      title: 'Emitting Events',
      blocks: [
        { type: 'text', value: 'A child talks back to its parent by emitting events. The parent listens with @event-name. Data flows down through props, and events flow up.' },
        { type: 'code', lang: 'vue', value: `<!-- TodoItem.vue -->
<script setup>
defineProps({ todo: Object });
const emit = defineEmits(['toggle', 'remove']);
</script>

<template>
  <li>
    <input type="checkbox" :checked="todo.done" @change="emit('toggle', todo.id)" />
    {{ todo.text }}
    <button @click="emit('remove', todo.id)">✕</button>
  </li>
</template>` },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, defineComponent } from 'vue';

const TodoItem = defineComponent({
  props: { todo: Object },
  emits: ['toggle', 'remove'],
  template: \`
    <li>
      <label :style="{ textDecoration: todo.done ? 'line-through' : 'none' }">
        <input type="checkbox" :checked="todo.done" @change="$emit('toggle', todo.id)" /> {{ todo.text }}
      </label>
      <button @click="$emit('remove', todo.id)">✕</button>
    </li>\`,
});

const todos = ref([
  { id: 1, text: 'Learn props', done: true },
  { id: 2, text: 'Learn emits', done: false },
]);
const toggle = id => { const t = todos.value.find(t => t.id === id); t.done = !t.done; };
const remove = id => { todos.value = todos.value.filter(t => t.id !== id); };
</script>

<template>
  <ul>
    <TodoItem v-for="t in todos" :key="t.id" :todo="t" @toggle="toggle" @remove="remove" />
  </ul>
  <p>{{ todos.filter(t => !t.done).length }} left</p>
</template>` },
      ],
    },
    {
      id: 'vue-component-v-model',
      title: 'v-model on Components (defineModel)',
      blocks: [
        { type: 'text', value: 'Your own components can support v-model, just like inputs. Since Vue 3.4, defineModel() does it in one line: it returns a ref that is synced with the parent\'s value.' },
        { type: 'code', lang: 'vue', value: `<!-- RatingInput.vue -->
<script setup>
const rating = defineModel({ type: Number, default: 0 });
</script>

<template>
  <span v-for="star in 5" :key="star" @click="rating = star">
    {{ star <= rating ? '★' : '☆' }}
  </span>
</template>

<!-- Parent -->
<RatingInput v-model="courseRating" />` },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, defineComponent } from 'vue';

// Without defineModel (works everywhere): a modelValue prop + update:modelValue event
const RatingInput = defineComponent({
  props: { modelValue: Number },
  emits: ['update:modelValue'],
  template: \`
    <span>
      <span v-for="star in 5" :key="star" @click="$emit('update:modelValue', star)"
            style="font-size: 28px; cursor: pointer; color: #f59e0b">{{ star <= modelValue ? '★' : '☆' }}</span>
    </span>\`,
});

const courseRating = ref(3);
</script>

<template>
  <RatingInput v-model="courseRating" />
  <p>Your rating: {{ courseRating }} / 5</p>
  <button @click="courseRating = 5">Set to 5 from the parent</button>
</template>` },
      ],
    },
    {
      id: 'vue-slots',
      title: 'Slots',
      blocks: [
        { type: 'text', value: 'Slots let a parent pass template content into a child, like React\'s children. Named slots fill several places; scoped slots let the child pass data back to the slot content.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { defineComponent } from 'vue';

const Card = defineComponent({
  template: \`
    <section style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px; margin-bottom: 10px">
      <header style="font-weight: bold"><slot name="header">Default title</slot></header>
      <slot />
      <footer style="color: #64748b; font-size: 13px"><slot name="footer" /></footer>
    </section>\`,
});

const DataList = defineComponent({
  props: { items: Array },
  template: \`<ul><li v-for="(item, i) in items" :key="i"><slot :item="item" :index="i" /></li></ul>\`,
});

const courses = [{ title: 'HTML', lessons: 52 }, { title: 'Vue', lessons: 60 }];
</script>

<template>
  <Card>
    <template #header>Profile</template>
    <p>Any content goes into the default slot.</p>
    <template #footer>Updated today</template>
  </Card>

  <Card>
    <p>Only default content: the header falls back to "Default title".</p>
  </Card>

  <DataList :items="courses">
    <template #default="{ item, index }">
      {{ index + 1 }}. <strong>{{ item.title }}</strong> ({{ item.lessons }} lessons)
    </template>
  </DataList>
</template>` },
        { type: 'note', value: 'Scoped slots are how UI libraries build flexible tables and lists: the component owns the logic, you decide how each row looks.' },
      ],
    },
    {
      id: 'vue-provide-inject',
      title: 'provide and inject',
      blocks: [
        { type: 'text', value: 'provide() makes a value available to every descendant; inject() reads it, no matter how deep. It solves prop drilling, like React context.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, provide, inject, defineComponent } from 'vue';

const ThemedButton = defineComponent({
  setup() {
    const theme = inject('theme');
    return { theme };
  },
  template: \`<button :style="{ background: theme === 'dark' ? '#e2e8f0' : '#0f172a', color: theme === 'dark' ? '#0f172a' : 'white', border: 0, padding: '8px 14px', borderRadius: '8px' }"><slot /></button>\`,
});

const Toolbar = defineComponent({
  template: \`<div><ThemedButton>Save</ThemedButton> <ThemedButton>Share</ThemedButton></div>\`,
});

const theme = ref('light');
provide('theme', theme);   // a ref keeps it reactive for injectors
</script>

<template>
  <div :style="{ background: theme === 'dark' ? '#0f172a' : 'white', padding: '16px' }">
    <Toolbar />
    <p><button @click="theme = theme === 'light' ? 'dark' : 'light'">Toggle theme</button></p>
  </div>
</template>` },
        { type: 'note', value: 'Provide a ref (not a plain value) so injectors stay reactive. For large shared state, use Pinia instead.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'components', q: 'How does a child component declare props in <script setup>?', options: ['props()', 'defineProps()', 'useProps()', 'this.props'], answer: 1, explain: 'defineProps is a compiler macro; no import needed.' },
    { chapterId: 'components', q: 'How does a child send data back to its parent?', options: ['By changing the prop', 'By emitting an event', 'With v-html', 'With a global variable'], answer: 1, explain: 'Props down, events up.' },
    { chapterId: 'components', q: 'What does defineModel() return?', options: ['A computed', 'A ref synced with the parent\'s v-model', 'An event', 'A slot'], answer: 1, explain: 'Assigning to it updates the parent.' },
    { chapterId: 'components', q: 'How do you fill a named slot called header?', options: ['<slot header>', '<template #header>', '<header slot>', 'v-slot="header" on the child'], answer: 1, explain: '#header is shorthand for v-slot:header.' },
    { chapterId: 'components', q: 'Why provide a ref instead of a plain value?', options: ['Refs are faster', 'So injected values stay reactive', 'Plain values are not allowed', 'For TypeScript'], answer: 1, explain: 'A plain value would never update in descendants.' },
  ],
};
