// Vue chapter: Vue Internals. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'internals',
  title: 'Vue Internals',
  description: 'How the compiler and scheduler make Vue fast',
  icon: 'memory',
  lessons: [
    {
      id: 'vue-compiler',
      title: 'Virtual DOM and Compiler Optimizations',
      blocks: [
        { type: 'text', value: 'Vue compiles templates into render functions that create a virtual DOM. Because templates are analyzed at build time, the compiler knows which parts can never change and skips them during updates. This is called a compiler-informed virtual DOM.' },
        { type: 'list', items: [
          'Static hoisting: static elements are created once and reused on every render.',
          'Patch flags: each dynamic node is marked with what can change (only text, only class, only props), so updates check only that.',
          'Tree flattening: Vue tracks only the dynamic nodes of a block, skipping the static structure around them.',
        ] },
        { type: 'code', lang: 'vue', value: `<template>
  <div>
    <h1>CodeNest</h1>                 <!-- static: hoisted, never diffed -->
    <p class="intro">Learn to code</p> <!-- static -->
    <p :class="{ active }">{{ msg }}</p> <!-- dynamic: patch flag TEXT | CLASS -->
  </div>
</template>

<!-- Paste a template into play.vuejs.org and open the JS tab to see the compiled output. -->` },
        { type: 'note', value: 'This is a key difference from React, which re-runs component functions and compares the whole result. Vue knows statically what can change.' },
      ],
    },
    {
      id: 'vue-scheduler',
      title: 'The Scheduler, Watch Timing and Effect Scopes',
      blocks: [
        { type: 'text', value: 'State changes do not update the DOM immediately. Vue queues the work and flushes it once per tick, so ten changes cause one render. Watchers have a flush option that controls when they run relative to that render.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, watch, nextTick } from 'vue';

const count = ref(0);
const log = ref([]);
const add = m => log.value.push(m);

watch(count, () => add('flush: pre  (default) → before the DOM update'));
watch(count, () => add('flush: post → after the DOM update, can read new DOM'), { flush: 'post' });
watch(count, () => add('flush: sync → immediately, on every single change'), { flush: 'sync' });

async function update() {
  log.value = [];
  count.value++;
  count.value++;          // two changes, still one render
  add('script continues; DOM not updated yet');
  await nextTick();
  add('after nextTick: DOM shows ' + count.value);
}
</script>

<template>
  <button @click="update">Increment twice ({{ count }})</button>
  <ol><li v-for="(l, i) in log" :key="i">{{ l }}</li></ol>
</template>` },
        { type: 'heading', value: 'Effect scopes' },
        { type: 'code', lang: 'js', value: `import { effectScope, ref, computed, watch } from 'vue';

const scope = effectScope();
scope.run(() => {
  const n = ref(0);
  const doubled = computed(() => n.value * 2);
  watch(doubled, v => console.log(v));
});
scope.stop();   // stops every computed and watcher created inside at once` },
        { type: 'note', value: 'Components create an effect scope automatically, which is why watchers stop on unmount. Libraries like Pinia and VueUse use effectScope directly.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'internals', q: 'What is static hoisting?', options: ['Moving CSS to the top', 'Creating static template parts once and reusing them', 'Loading scripts early', 'Caching API calls'], answer: 1, explain: 'Static nodes are never diffed again.' },
    { chapterId: 'internals', q: 'With flush: "post", when does a watcher run?', options: ['Before the DOM updates', 'After the DOM updates', 'Synchronously on each change', 'Never'], answer: 1, explain: 'Use it when the callback needs the updated DOM.' },
    { chapterId: 'internals', q: 'How many renders do two quick state changes cause?', options: ['Two', 'One, because updates are batched per tick', 'Zero', 'Depends on the browser'], answer: 1, explain: 'The scheduler deduplicates queued updates.' },
  ],
};
