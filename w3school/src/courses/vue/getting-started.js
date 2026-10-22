// Vue chapter: Getting Started. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Vue is, project setup and your first component',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'vue-intro',
      title: 'What is Vue?',
      blocks: [
        { type: 'text', value: 'Vue is a progressive JavaScript framework for building user interfaces. It is known for being easy to learn, very well documented and fast. It powers sites of companies like Alibaba, GitLab, Nintendo and many startups.' },
        { type: 'list', items: [
          'Declarative rendering: describe the UI in a template, Vue keeps the page in sync with your data.',
          'Reactivity: change a value and everything that uses it updates automatically.',
          'Single File Components: template, logic and styles of a component live in one .vue file.',
          'Progressive: use it for one widget on a page, or for a full app with routing and state management.',
        ] },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref } from 'vue';

const message = ref('Hello, Vue!');
const count = ref(0);
</script>

<template>
  <h1>{{ message }}</h1>
  <button @click="count++">Clicked {{ count }} times</button>
</template>

<style>
h1 { color: #42b883; }
</style>` },
        { type: 'text', value: 'Tap "Try it yourself". The preview downloads Vue the first time, so you need internet.' },
        { type: 'note', value: 'Know JavaScript well first: objects, arrays (map, filter), destructuring, modules and promises. Vue uses them everywhere.' },
      ],
    },
    {
      id: 'vue-setup',
      title: 'Creating a Vue Project',
      blocks: [
        { type: 'text', value: 'The official way to start is create-vue, which sets up a Vite project. It asks whether you want TypeScript, Vue Router, Pinia, testing and ESLint.' },
        { type: 'code', lang: 'text', value: `npm create vue@latest my-app
cd my-app
npm install
npm run dev` },
        { type: 'code', lang: 'text', value: `my-app/
├── index.html          contains <div id="app">
├── vite.config.js
└── src/
    ├── main.js         creates the app and mounts it
    ├── App.vue         root component
    ├── components/     your components
    └── assets/` },
        { type: 'code', lang: 'js', value: `// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';

createApp(App).mount('#app');` },
        { type: 'note', value: 'Install the "Vue - Official" extension in VS Code for syntax highlighting, autocomplete and type checking inside .vue files.' },
      ],
    },
    {
      id: 'vue-sfc',
      title: 'Single File Components',
      blocks: [
        { type: 'text', value: 'A .vue file has up to three blocks. <script setup> is the modern, recommended way to write component logic: every top-level variable and function is automatically available in the template.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref } from 'vue';

const name = ref('Nadia');
const lessons = 12;

function greet() {
  alertMessage.value = 'Keep going, ' + name.value + '!';
}
const alertMessage = ref('');
</script>

<template>
  <div class="card">
    <h2>Welcome back, {{ name }}</h2>
    <p>You finished {{ lessons }} lessons.</p>
    <button @click="greet">Motivate me</button>
    <p v-if="alertMessage">{{ alertMessage }}</p>
  </div>
</template>

<style scoped>
.card { padding: 16px; border-radius: 12px; background: #f0fdf4; }
h2 { margin-top: 0; }
</style>` },
        { type: 'list', items: [
          '<script setup>: logic. Imports, state and functions.',
          '<template>: the HTML-like markup with Vue syntax.',
          '<style scoped>: CSS that only applies to this component.',
        ] },
      ],
    },
    {
      id: 'vue-template-syntax',
      title: 'Template Syntax',
      blocks: [
        { type: 'text', value: 'Templates are valid HTML extended with Vue features. Double curly braces show text; directives (attributes starting with v-) add behavior.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref } from 'vue';

const user = ref({ name: 'Rahim', avatar: 'https://picsum.photos/id/64/80/80', isPro: true });
const html = '<em>Rendered as HTML</em>';
const disabled = ref(false);
</script>

<template>
  <img :src="user.avatar" :alt="user.name" style="border-radius: 50%" />
  <p>Name: {{ user.name.toUpperCase() }}</p>
  <p>Status: {{ user.isPro ? 'Pro member' : 'Free member' }}</p>
  <p v-html="html"></p>
  <button :disabled="disabled" @click="disabled = true">Click once</button>
</template>` },
        { type: 'list', items: [
          '{{ expression }}: show a value as text (any JavaScript expression).',
          'v-bind:src or the shorthand :src binds an attribute to data.',
          'v-on:click or the shorthand @click listens to events.',
          'v-html renders raw HTML. Never use it with user input (XSS risk).',
        ] },
      ],
    },
    {
      id: 'vue-vs-react',
      title: 'Vue Compared to React',
      blocks: [
        { type: 'text', value: 'If you completed the React course, most ideas transfer directly. The biggest difference is how updates happen.' },
        { type: 'list', items: [
          'React re-runs the component function on every state change; Vue tracks exactly which data each part of the template uses and updates only that.',
          'React uses JSX; Vue uses HTML templates (JSX is also supported).',
          'React: useState and setters. Vue: ref() and you simply assign count.value++.',
          'React effects need dependency arrays; Vue computed and watch track dependencies automatically.',
          'Both have components, props, events, context-like injection, routers and state libraries.',
        ] },
        { type: 'code', lang: 'vue', value: `<!-- Vue -->
<script setup>
import { ref, computed } from 'vue';
const count = ref(0);
const double = computed(() => count.value * 2);   // no dependency array needed
</script>

<template>
  <button @click="count++">{{ count }} × 2 = {{ double }}</button>
</template>` },
        { type: 'note', value: 'Neither is "better". Learn one deeply; the second takes a few weeks. Many job listings accept either.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'getting-started', q: 'Which command creates a new Vue project the official way?', options: ['npm create vue@latest', 'npx create-react-app', 'vue new app', 'npm install vue-app'], answer: 0, explain: 'create-vue scaffolds a Vite-based project.' },
    { chapterId: 'getting-started', q: 'Which block holds a component\'s logic in modern Vue?', options: ['<script setup>', '<logic>', '<template>', '<vue>'], answer: 0, explain: 'Top-level bindings in <script setup> are usable in the template.' },
    { chapterId: 'getting-started', q: 'What does :src="url" mean?', options: ['A comment', 'Bind the src attribute to the url value', 'A CSS rule', 'A slot'], answer: 1, explain: ':src is shorthand for v-bind:src.' },
    { chapterId: 'getting-started', q: 'What is @click shorthand for?', options: ['v-bind:click', 'v-on:click', 'v-model:click', 'v-if:click'], answer: 1, explain: '@ is the shorthand for v-on.' },
    { chapterId: 'getting-started', q: 'Why is v-html dangerous with user input?', options: ['It is slow', 'It can run injected scripts (XSS)', 'It breaks CSS', 'It is deprecated'], answer: 1, explain: 'Use {{ }} for user text; it is escaped automatically.' },
  ],
};
