// Vue chapter: Accessibility and i18n. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'a11y-i18n',
  title: 'Accessibility and i18n',
  description: 'Apps everyone can use, in every language',
  icon: 'accessibility-new',
  lessons: [
    {
      id: 'vue-accessibility',
      title: 'Accessible Vue Components',
      blocks: [
        { type: 'text', value: 'Single-page apps change content without page loads, so manage focus and announce changes. useId() (Vue 3.5) generates ids for labels and ARIA attributes.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, computed, nextTick, useTemplateRef, useId } from 'vue';

const inputId = useId();
const query = ref('');
const courses = ['HTML', 'CSS', 'JavaScript', 'React', 'Vue'];
const results = computed(() => courses.filter(c => c.toLowerCase().includes(query.value.toLowerCase())));

const dialogOpen = ref(false);
const dialog = useTemplateRef('dialog');
const opener = useTemplateRef('opener');

async function openDialog() {
  dialogOpen.value = true;
  await nextTick();
  dialog.value.focus();            // move focus into the dialog
}
function closeDialog() {
  dialogOpen.value = false;
  opener.value.focus();            // give focus back
}
</script>

<template>
  <label :for="inputId">Search courses</label>
  <input :id="inputId" v-model="query" />
  <p aria-live="polite">{{ results.length }} results</p>
  <ul><li v-for="r in results" :key="r">{{ r }}</li></ul>

  <button ref="opener" @click="openDialog">Delete progress</button>
  <div v-if="dialogOpen" ref="dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-title"
       tabindex="-1" @keydown.esc="closeDialog" style="border: 2px solid #2f855a; padding: 12px; border-radius: 10px; margin-top: 8px">
    <h3 id="dlg-title">Are you sure?</h3>
    <p>Press Esc or Close to cancel.</p>
    <button @click="closeDialog">Close</button>
  </div>
</template>` },
        { type: 'list', items: [
          'eslint-plugin-vuejs-accessibility flags missing labels and alt text.',
          'vue-axe reports violations in the console during development.',
          'Always test with keyboard only, and with TalkBack on Android.',
        ] },
      ],
    },
    {
      id: 'vue-i18n',
      title: 'Internationalization with vue-i18n',
      blocks: [
        { type: 'code', lang: 'js', value: `// i18n.js   (npm install vue-i18n)
import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  legacy: false,                // Composition API mode
  locale: 'bn',
  fallbackLocale: 'en',
  messages: {
    en: { welcome: 'Welcome, {name}!', lessons: 'no lessons | one lesson | {n} lessons' },
    bn: { welcome: 'স্বাগতম, {name}!', lessons: 'কোনো পাঠ নেই | একটি পাঠ | {n}টি পাঠ' },
  },
});

// main.js
createApp(App).use(i18n).mount('#app');` },
        { type: 'code', lang: 'vue', value: `<script setup>
import { useI18n } from 'vue-i18n';
const { t, locale, n, d } = useI18n();
</script>

<template>
  <h1>{{ t('welcome', { name: 'Nadia' }) }}</h1>
  <p>{{ t('lessons', 12) }}</p>
  <button @click="locale = locale === 'bn' ? 'en' : 'bn'">EN / বাংলা</button>
</template>` },
        { type: 'note', value: 'Translate whole sentences with placeholders. Word order differs between languages, so never glue translated fragments together.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'a11y-i18n', q: 'What does useId() provide?', options: ['A user id', 'A unique id for labels and ARIA attributes', 'A database key', 'A route param'], answer: 1, explain: 'It is stable between server and client rendering.' },
    { chapterId: 'a11y-i18n', q: 'Why use aria-live="polite" on a results count?', options: ['To style it', 'So screen readers announce changes without moving focus', 'For SEO', 'To animate it'], answer: 1, explain: 'Live regions announce updates.' },
    { chapterId: 'a11y-i18n', q: 'In vue-i18n, what does t("lessons", 12) handle?', options: ['Only translation', 'Translation with the correct plural form', 'Number formatting only', 'Routing'], answer: 1, explain: 'Plural forms are separated with |.' },
  ],
};
