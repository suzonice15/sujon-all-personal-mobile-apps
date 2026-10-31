// Vue chapter: Styling and Animation. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'styling-animation',
  title: 'Styling and Animation',
  description: 'Scoped CSS and built-in transitions',
  icon: 'animation',
  lessons: [
    {
      id: 'vue-scoped-css',
      title: 'Scoped CSS, CSS Modules and v-bind in CSS',
      blocks: [
        { type: 'text', value: 'In a .vue file, <style scoped> applies only to that component: Vue adds a unique attribute to its elements and rewrites the selectors. You can even use reactive values inside CSS with v-bind().' },
        { type: 'code', lang: 'vue', value: `<script setup>
import { ref } from 'vue';
const accent = ref('#42b883');
</script>

<template>
  <button class="btn">Scoped button</button>
  <p :class="$style.note">From a CSS module</p>
  <input type="color" v-model="accent" />
</template>

<style scoped>
.btn { background: v-bind(accent); color: white; }   /* reactive CSS value */
.btn :deep(.icon) { width: 16px; }                    /* reach into child components */
</style>

<style module>
.note { color: #64748b; }
</style>` },
        { type: 'list', items: [
          'scoped: styles cannot leak out to other components',
          ':deep(): style elements rendered by child components',
          'module: class names available as $style.name',
          'v-bind() in CSS: use a ref or computed value directly',
          'Tailwind CSS also works great with Vue',
        ] },
      ],
    },
    {
      id: 'vue-transitions',
      title: '<Transition> and <TransitionGroup>',
      blocks: [
        { type: 'text', value: 'Vue has animation built in. Wrap an element that appears or disappears in <Transition>, and Vue adds classes at each step so CSS can animate enter and leave, including removal from the DOM.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref } from 'vue';

const show = ref(true);
const items = ref(['HTML', 'CSS', 'JavaScript']);
let n = 0;
const add = () => items.value.splice(Math.floor(Math.random() * (items.value.length + 1)), 0, 'Topic ' + ++n);
const remove = i => items.value.splice(i, 1);
</script>

<template>
  <button @click="show = !show">Toggle</button>
  <Transition name="fade">
    <p v-if="show" class="box">I fade and slide in and out</p>
  </Transition>

  <button @click="add">Add item</button>
  <TransitionGroup name="list" tag="ul">
    <li v-for="(item, i) in items" :key="item" @click="remove(i)">{{ item }} (tap to remove)</li>
  </TransitionGroup>
</template>

<style>
.box { background: #dcfce7; padding: 10px; border-radius: 8px; }
.fade-enter-active, .fade-leave-active { transition: opacity .35s, transform .35s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }

.list-enter-active, .list-leave-active { transition: all .4s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(30px); }
.list-move { transition: transform .4s ease; }   /* animates the other items moving */
</style>` },
        { type: 'list', items: [
          'v-enter-from → v-enter-active → v-enter-to while appearing',
          'v-leave-from → v-leave-active → v-leave-to while disappearing',
          'name="fade" changes the prefix to fade-',
          'mode="out-in" waits for the old element to leave before the new one enters',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'styling-animation', q: 'What does <style scoped> do?', options: ['Makes styles global', 'Limits styles to the current component', 'Loads Tailwind', 'Minifies CSS'], answer: 1, explain: 'Vue rewrites selectors with a unique attribute.' },
    { chapterId: 'styling-animation', q: 'How do you use a reactive value inside <style>?', options: ['{{ color }}', 'v-bind(color)', 'var(color)', '$color'], answer: 1, explain: 'Vue turns it into a CSS variable that updates.' },
    { chapterId: 'styling-animation', q: 'Which class is applied while an element is leaving with <Transition name="fade">?', options: ['fade-in', 'fade-leave-active', 'leave-fade', 'v-hide'], answer: 1, explain: 'Classes follow the pattern name-enter/leave-from/active/to.' },
  ],
};
