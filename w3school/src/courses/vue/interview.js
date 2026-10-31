// Vue chapter: Interview Preparation. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'interview',
  title: 'Interview Preparation',
  description: 'The Vue questions employers ask most',
  icon: 'work',
  lessons: [
    {
      id: 'vue-interview-concepts',
      title: 'Top Vue Interview Questions',
      blocks: [
        { type: 'heading', value: '1. Options API vs Composition API' },
        { type: 'text', value: 'The Options API groups code by option type (data, methods, computed). The Composition API (setup, <script setup>) groups code by feature and makes logic reusable through composables. New projects use the Composition API.' },
        { type: 'heading', value: '2. ref vs reactive' },
        { type: 'text', value: 'ref works with any value and is accessed with .value in script. reactive only works with objects and loses reactivity when replaced or destructured. ref is the recommended default.' },
        { type: 'heading', value: '3. computed vs watch' },
        { type: 'text', value: 'computed derives a cached value from reactive state and must be pure. watch runs side effects (saving, fetching) when sources change.' },
        { type: 'heading', value: '4. v-if vs v-show' },
        { type: 'text', value: 'v-if creates and destroys the element; v-show toggles CSS display. Use v-show for things toggled often, v-if for things that rarely change or are expensive.' },
        { type: 'heading', value: '5. How does Vue 3 reactivity work?' },
        { type: 'text', value: 'Reactive objects are wrapped in Proxies. Reading a property inside an effect (render, computed, watcher) tracks it; writing triggers the effects that depend on it. Vue 2 used Object.defineProperty, which could not detect new properties.' },
        { type: 'heading', value: '6. How do components communicate?' },
        { type: 'text', value: 'Props down, events up; v-model for two-way binding; slots for passing template content; provide/inject for deep descendants; Pinia for app-wide state.' },
        { type: 'heading', value: '7. What is the key attribute for?' },
        { type: 'text', value: 'It identifies list items so Vue can reuse and move the right DOM nodes. Changing a component\'s key forces it to be recreated with fresh state.' },
        { type: 'heading', value: '8. What is nextTick?' },
        { type: 'text', value: 'Vue batches DOM updates. nextTick waits until the pending update has been applied, so you can work with the new DOM.' },
      ],
    },
    {
      id: 'vue-interview-coding',
      title: 'Live Coding Task: Accessible Accordion',
      blocks: [
        { type: 'text', value: 'A common live task: build a reusable accordion where only one panel is open at a time, with correct ARIA attributes. Explain your plan before typing.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref } from 'vue';

const faqs = [
  { q: 'Is CodeNest free?', a: 'Yes, every course is free to learn.' },
  { q: 'Do I need a computer?', a: 'No. You can learn and practise right on your phone.' },
  { q: 'Which course should I start with?', a: 'HTML, then CSS, then JavaScript, then Vue or React.' },
];
const openIndex = ref(0);
const toggle = i => { openIndex.value = openIndex.value === i ? -1 : i; };
</script>

<template>
  <div v-for="(item, i) in faqs" :key="item.q" class="item">
    <button :id="'q' + i" :aria-expanded="openIndex === i" :aria-controls="'a' + i" @click="toggle(i)">
      {{ openIndex === i ? '▾' : '▸' }} {{ item.q }}
    </button>
    <div :id="'a' + i" role="region" :aria-labelledby="'q' + i" v-show="openIndex === i" class="answer">
      {{ item.a }}
    </div>
  </div>
</template>

<style>
.item { border-bottom: 1px solid #e2e8f0; }
.item button { width: 100%; text-align: left; background: none; border: 0; padding: 12px; font-size: 16px; }
.answer { padding: 0 12px 12px; color: #475569; }
</style>` },
        { type: 'list', items: [
          'Start simple, then mention improvements: allow multiple open panels via a prop, animate with <Transition>, extract into a reusable component with slots.',
          'Explain trade-offs out loud; interviewers value reasoning.',
        ] },
        { type: 'note', value: 'Congratulations! You have finished the Vue.js course. Take the Vue Full Test in the Quiz tab, then build a portfolio app with Vue Router, Pinia and TypeScript.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'interview', q: 'Which API do new Vue projects use?', options: ['Options API only', 'Composition API with <script setup>', 'Class components', 'jQuery'], answer: 1, explain: 'It groups logic by feature and enables composables.' },
    { chapterId: 'interview', q: 'What limitation of Vue 2 reactivity did Proxies fix?', options: ['Speed of CSS', 'Detecting newly added properties', 'Template syntax', 'Routing'], answer: 1, explain: 'Object.defineProperty could not observe properties added later.' },
    { chapterId: 'interview', q: 'What happens when you change a component\'s key?', options: ['Nothing', 'Vue recreates it with fresh state', 'It is hidden', 'Its props are deleted'], answer: 1, explain: 'A new key means a new component instance.' },
  ],
};
