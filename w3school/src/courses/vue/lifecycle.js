// Vue chapter: Lifecycle and Template Refs. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'lifecycle',
  title: 'Lifecycle and Template Refs',
  description: 'Run code at the right time and reach DOM elements',
  icon: 'autorenew',
  lessons: [
    {
      id: 'vue-lifecycle',
      title: 'Lifecycle Hooks',
      blocks: [
        { type: 'text', value: 'A component is created, mounted into the page, updated and finally unmounted. Lifecycle hooks run your code at those moments. The most used are onMounted (the DOM is ready) and onUnmounted (clean up).' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, onMounted, onUnmounted, defineComponent } from 'vue';

const Clock = defineComponent({
  setup() {
    const time = ref(new Date().toLocaleTimeString());
    let timer;
    onMounted(() => {
      console.log('Clock mounted');
      timer = setInterval(() => { time.value = new Date().toLocaleTimeString(); }, 1000);
    });
    onUnmounted(() => {
      clearInterval(timer);          // always clean up timers and listeners
      console.log('Clock unmounted, timer cleared');
    });
    return { time };
  },
  template: '<h2>🕒 {{ time }}</h2>',
});

const show = ref(true);
</script>

<template>
  <button @click="show = !show">{{ show ? 'Hide' : 'Show' }} clock</button>
  <Clock v-if="show" />
</template>` },
        { type: 'list', items: [
          'onMounted: DOM is available; start timers, measure elements, init libraries',
          'onUpdated: after a re-render caused by state changes',
          'onBeforeUnmount / onUnmounted: remove listeners, stop timers, close sockets',
          'Fetching data can start directly in <script setup>; you do not need to wait for mounting',
        ] },
      ],
    },
    {
      id: 'vue-template-refs',
      title: 'Template Refs',
      blocks: [
        { type: 'text', value: 'Sometimes you need the real DOM element: to focus an input, play a video or measure size. Put ref="name" on the element and read it after mounting. Vue 3.5 adds useTemplateRef() for this.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, onMounted, useTemplateRef } from 'vue';

const input = useTemplateRef('search');   // matches ref="search"
const box = useTemplateRef('box');
const size = ref('');

onMounted(() => {
  input.value.focus();
  const rect = box.value.getBoundingClientRect();
  size.value = Math.round(rect.width) + ' × ' + Math.round(rect.height) + ' px';
});
</script>

<template>
  <input ref="search" placeholder="Focused automatically" />
  <div ref="box" style="padding: 20px; background: #f0fdf4; margin-top: 10px">Measured box: {{ size }}</div>
</template>` },
        { type: 'note', value: 'Template refs are null before mounting and after unmounting. Access them in onMounted, event handlers or watchers, never directly during setup.' },
      ],
    },
    {
      id: 'vue-nexttick',
      title: 'nextTick and Async Components',
      blocks: [
        { type: 'text', value: 'Vue batches DOM updates. After changing state, the DOM is updated a moment later. await nextTick() waits for that update, so you can work with the new DOM.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, nextTick, useTemplateRef } from 'vue';

const messages = ref(['Hi!', 'How are you?']);
const list = useTemplateRef('list');
const text = ref('');

async function send() {
  if (!text.value.trim()) return;
  messages.value.push(text.value);
  text.value = '';
  await nextTick();                         // wait until the new message is in the DOM
  list.value.scrollTop = list.value.scrollHeight;
}
</script>

<template>
  <div ref="list" style="height: 120px; overflow: auto; border: 1px solid #e2e8f0; padding: 6px">
    <p v-for="(m, i) in messages" :key="i" style="margin: 4px 0">{{ m }}</p>
  </div>
  <input v-model="text" @keyup.enter="send" placeholder="Type and press Enter" />
</template>` },
        { type: 'heading', value: 'Async components: load code only when needed' },
        { type: 'code', lang: 'js', value: `import { defineAsyncComponent } from 'vue';

const AdminPanel = defineAsyncComponent(() => import('./AdminPanel.vue'));
// Its code is downloaded the first time <AdminPanel /> is rendered.` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'lifecycle', q: 'Which hook runs when the component\'s DOM is ready?', options: ['onCreated', 'onMounted', 'onUpdated', 'onReady'], answer: 1, explain: 'Template refs are available from onMounted.' },
    { chapterId: 'lifecycle', q: 'Where should you clear an interval started in onMounted?', options: ['onUpdated', 'onUnmounted', 'In the template', 'It is cleared automatically'], answer: 1, explain: 'Otherwise it keeps running after the component is gone.' },
    { chapterId: 'lifecycle', q: 'What does await nextTick() wait for?', options: ['The next second', 'Vue to finish updating the DOM after state changes', 'A network request', 'The next user click'], answer: 1, explain: 'DOM updates are batched and applied asynchronously.' },
    { chapterId: 'lifecycle', q: 'When is a template ref still null?', options: ['Never', 'Before the component is mounted', 'Inside event handlers', 'Inside onMounted'], answer: 1, explain: 'The element does not exist until mounting.' },
  ],
};
